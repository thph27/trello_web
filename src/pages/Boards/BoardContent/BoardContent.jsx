import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext,
  PointerSensor,
  // MouseSensor,
  // TouchSensor
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  getFirstCollision
} from '@dnd-kit/core'
import { MouseSensor, TouchSensor } from '~/customLibs/DndKitSensors'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState, useCallback, useRef } from 'react'
import { cloneDeep, isEmpty, over } from 'lodash'
import Column from './ListColumns/Column/Column'
import TrelloCard from './ListColumns/Column/ListCards/Card/Card'
import { generatePlaceholderCard } from '~/utils/formatters'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board, createNewColumn, createNewCard }) {
  // yeu cau chuot di chuyen 10px moi goi event
  const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })

  // nhan giu 250ms va dung sai cua cam ung la 500px
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })

  // const mySensors = useSensors(pointerSensor)
  const mySensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  // Cung 1 thoi diem chi co 1 phan tu dang duoc keo (column or card)
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)
  //  diem va cham cuoi cung (xu li thuat toan phat hien va cham)
  const lastOverId = useRef(null)


  useEffect (() => {
    setOrderedColumns(mapOrder (board?.columns, board?.columnOrderIds, '_id'))

  }, [board])

  const findColumnByCardId = (cardId) => {
    // dung c?.cards thay vi dung c.cardOderIds boi vi can phai lam dữ liệu cho card hoàn chỉnh trước rồi mới tạo ra cardOrderIds mới
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  // Function chung xu li viec cap nhat lai state trong case di chuyen card
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns(prevColumns => {
      // Tim vi tri cua overCard trong column đích (nơi mà activeCard sắp đc thả)
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

      let newCardIndex
      const isBelowOverItem = active.rect.current.translated &&
      active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1
      // clone mang OrderedColumnsState cu ra 1 cai moi de xu li data roi return - cap nhat lai
      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      // Column cu
      if (nextActiveColumn) {
        // Xoa card o cai column active (column cũ, lúc mà kéo card ra khỏi nó để sang column khác)
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
        // Them PlaceholderCard neu Column rong
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }
        // Cap nhat lai mang cardOrderIds
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }

      // Column moi
      if (nextOverColumn) {
        // Ktra xem card dang keo co ton tai o overColumn chua, neu co thi xoa no trc
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
      }
      // phai cap nhat lai chuan du lieu columnId trong card sau khi keo card giua 2 column khac nhau
      const rebuild_activeDraggingCardData = {
        ...activeDraggingCardData,
        columnId: nextOverColumn._id
      }
      // Them card dang keo vao overColumn theo vi tri index moi ()
      nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)

      // Xoa cai PlaceholderCard di neu no dang ton tai
      nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)
      // Cap nhat lai mang cardOrderIds
      nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)

      return nextColumns
    })

  }

  const handleDragStart = (event) => {
    // console.log ('handleDragStart: ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)

    // Neu ma keo card thi ms thuc hien hang dong set value old column
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  const handleDragOver =(event) => {
    // console.log ('handleDragOver: ', event)
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    const { active, over} = event
    // can dam bao khong ton tai active hoac over (khi keo ra khoi pham vi container) thi khong lam j
    if (!active || !over) return

    // La cai card dang duoc keo
    const {id: activeDraggingCardId, data: { current: activeDraggingCardData }} = active
    // la cai dang tuong tac voi cai card dang dc keo
    const {id: overCardId} = over
    // tim 2 cai column theo id

    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return
    // Xu li khi keo card qua 2 column khac nhau, con neu keo trong column ban dau thi o lam j
    // Xu li luc dang keo qua column khac cung luc keo xong thi xu li o handleDragEnd
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData

      )
    }
  }


  const handleDragEnd = (event) => {
    const { active, over} = event
    // can dam bao khong ton tai active hoac over (khi keo ra khoi pham vi container) thi khong lam j
    if (!active || !over) return

    // Xu li keo tha card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // La cai card dang duoc keo
      const {id: activeDraggingCardId, data: { current: activeDraggingCardData }} = active
      // la cai dang tuong tac voi cai card dang dc keo
      const {id: overCardId} = over
      // tim 2 cai column theo id

      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      if (!activeColumn || !overColumn) return

      // Dung activeDragItemData vi set vao state tu buoc handleDragStart chu khong phai activeData trong handleDragEnd vi sau khi di qua onDragOver thi stae cua card da bi cap nhat 1 lan roi
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData

        )
      } else {
        //Lay vi tri cu tu oldColumnWhenDraggingCard
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId)
        // Lay vi tri moi tu overColumn
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)

        const dndOrderedCards = arrayMove (oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)

        setOrderedColumns(prevColumns => {
          // clone mang OrderedColumnsState cu ra 1 cai moi de xu li data roi return - cap nhat lai
          const nextColumns = cloneDeep(prevColumns)
          // Tim toi column dang tha
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)
          // cap nhat lai 2 gia tri moi la card va cardOrderIds trong targetColumn
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)

          return nextColumns
        })

      }
    }

    // Xu li keo tha column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        //Lay vi tri cu tu active
        const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)
        // Lay vi tri moi tu over
        const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)

        const dndOrderedColumns = arrayMove (orderedColumns, oldColumnIndex, newColumnIndex)
        // dung arrayMove cua dnd-kit de sap xep lai mang Columns ban dau
        // 2 cai console log sau nay de dung xu li goi API
        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
        // console.log ('dndOrderedColumns: ', dndOrderedColumns)
        // console.log ('dndOrderedColumnsIds: ', dndOrderedColumnsIds)

        // cap nhat lai state columns ban dau sau khi da keo tha
        setOrderedColumns(dndOrderedColumns)
      }

    }
    // neu vi tri sau khi keo tha khac voi vi tri ban dau

    // Du lieu sau khi keo tha luon phai dua ve gia tri null mac dinh ban dau
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects( {
      styles: {active: {opacity: '0.5' }}})
  }
  // args : arguments: tham số, đối số
  const collisionDetectionStrategy = useCallback((args) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({...args})
    }
    // Tim diem giao nhau, va cham voi con tro va tra ve 1 mang cac va cham
    const pointerIntersections = pointerWithin(args)

    if (!pointerIntersections?.length) return


    // const intersections = pointerIntersections?.length > 0
    //   ? pointerIntersections
    //   : rectIntersection(args)
    // tim overId dau tien trong đám intersections
    let overId = getFirstCollision(pointerIntersections, 'id')
    if (overId) {
      const checkColumn = orderedColumns.find(column => column._id === overId)
      if (checkColumn) {
        overId = closestCorners({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => {
            return (container.id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id))
          })
        }) [0?.id]

      }
      lastOverId.current = overId
      return [{ id: overId }]
    }
    // Neu overId la null thi tra ve mang rong tranh crash
    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }, [activeDragItemType, orderedColumns])


  return (
    <DndContext
      sensors={mySensors}
      // Dung closestCorners se bi bug flikering
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}>

      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
      }}>
        <ListColumns
          columns={orderedColumns}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
        />
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <TrelloCard card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
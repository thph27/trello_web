import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext, PointerSensor, MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import Column from './ListColumns/Column/Column'
import TrelloCard from './ListColumns/Column/ListCards/Card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
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


  useEffect (() => {
    setOrderedColumns(mapOrder (board?.columns, board?.columnOrderIds, '_id'))

  }, [board])
  const handleDragStart = (event) => {
    // console.log ('handleDragStart: ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }

  const handleDragEnd = (event) => {
    // console.log ('handleDragEnd: ', event)
    const { active, over} = event
    if (!over) return

    // neu vi tri sau khi keo tha khac voi vi tri ban dau
    if (active.id !== over.id) {
      //Lay vi tri cu tu active
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
      // Lay vi tri moi tu over
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)

      const dndOrderedColumns = arrayMove (orderedColumns, oldIndex, newIndex)
      // dung arrayMove cua dnd-kit de sap xep lai mang Columns ban dau
      // 2 cai console log sau nay de dung xu li goi API
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
      // console.log ('dndOrderedColumns: ', dndOrderedColumns)
      // console.log ('dndOrderedColumnsIds: ', dndOrderedColumnsIds)

      // cap nhat lai state columns ban dau sau khi da keo tha
      setOrderedColumns(dndOrderedColumns)
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects( {
      styles: {active: {opacity: '0.5' }}})
  }

  return (
    <DndContext
      sensors={mySensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}>

      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumns} />
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
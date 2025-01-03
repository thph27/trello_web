import Box from '@mui/material/Box'
import { toast } from 'react-toastify'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'

function ListColumns({ columns, createNewColumn, createNewCard, deleteColumnDetails }) {
  // SortableContext yeu cau item la 1 mang dang ['id-1', 'id-2'] chu k phai la 1 array cua object [ {id: 'id-01'} ]
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)

  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  const [newColumnTitle, setNewColumnTitle] = useState('')

  const addNewColumn = () => {
    if (!newColumnTitle) {
      toast.error('Please enter Column title')
      return
    }
    // Tao du lieu Column de goi API
    const newColumnData = {
      title: newColumnTitle
    }
    createNewColumn(newColumnData)

    // Dong trang thai them column moi & clear input
    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }

  // SortableContext yeu cau items la 1 mang dang ['id-1', 'id-2']
  return (
    <SortableContext items={ columns?.map(c => c._id) } strategy={ horizontalListSortingStrategy }>
      <Box sx={{
        bgcolor: 'inherit',
        widows: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track' : {m: 2}
      }}>
        {columns?.map(column => <Column
          key={column._id}
          column={column}
          createNewCard={createNewCard}
          deleteColumnDetails={deleteColumnDetails}
        /> )}

        {/* Box Add New Column */}
        {!openNewColumnForm
          ? <Box onClick={toggleOpenNewColumnForm} sx={{
            minWidth: '250px',
            maxWidth: '250px',
            bgcolor: '#ffffff3d',
            mx: 2,
            borderRadius: '6px',
            height: 'fit-content'
          }}>
            <Button
              startIcon={<CreateNewFolderIcon/>}
              sx= {{
                color: 'white',
                width: '100%',
                justifyContent: 'flex-start',
                pl: 2.5,
                py: 1

              }}
            >
              Add new column
            </Button>
          </Box>
          : <Box sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            p: 1,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d',
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}>
            <TextField
              label="Enter column title.."
              type="text"
              size='small'
              variant='outlined'
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
                '& label':{ color:'white'},
                '& input':{ color:'white'},
                '& label.Mui-focused':{ color:'white'},
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor:'white' },
                  '&:hover fieldset': { borderColor:'white' },
                  '&.Mui-focused fieldset': { borderColor:'white' }
                }
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1}}>
              <Button
                onClick={addNewColumn}
                variant='contained' color='success' size='small'
                sx={{
                  boxShadow: 'none',
                  border: '0.5px solid',
                  borderColor: (theme) => theme.palette.success.main,
                  '&:hover': {bgcolor: (theme) => theme.palette.success.main}
                }}
              >Add Column</Button>
              <CloseIcon
                fontSize='small'
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': { color: (theme) => theme.palette.warning.light}
                }}
                onClick= {toggleOpenNewColumnForm}
              />
            </Box>
          </Box>
        }

      </Box>
    </SortableContext>
  )
}

export default ListColumns
import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'


function ListColumns({ columns }) {
  // SortableContext yeu cau item la 1 mang dang ['id-1', 'id-2'] chu k phai la 1 array cua object [ {id: 'id-01'} ]

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
        {columns?.map(column => <Column key={column._id} column={column}/> )}


        {/* Box Add New Column */}
        <Box sx={{
          minWidth: '200px',
          maxWidth: '200px',
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
      </Box>
    </SortableContext>
  )
}

export default ListColumns

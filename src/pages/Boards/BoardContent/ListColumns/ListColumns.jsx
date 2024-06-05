import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'


function ListColumns() {

  return (
    <Box sx={{
      bgcolor: 'inherit',
      widows: '100%',
      height: '100%',
      display: 'flex',
      overflowX: 'auto',
      overflowY: 'hidden',
      '&::-webkit-scrollbar-track' : {m: 2}
    }}>
      <Column />
      <Column />
      <Column />

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
  )
}

export default ListColumns

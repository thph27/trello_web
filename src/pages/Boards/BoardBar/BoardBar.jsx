import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Button, Tooltip } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utils/formatters'

const MENU_STYLES ={
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {color: 'white'},
  '&:hover': {bgcolor: 'primary.50'}
}
function BoardBar({ board }) {
  return (
    <Box sx={{
      backgroundColor:'primary.dark',
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      paddingX: 2,
      overflowX: 'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
    }}>
      <Box sx={{display:'flex', alignItems:'center', gap: 2}}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label= {board?.title}
          onClick={() => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label= { capitalizeFirstLetter(board?.type)}
          onClick={() => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add To Google Drive"
          onClick={() => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />}
          label="Automation"
          onClick={() => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filters"
          onClick={() => {}}
        />
      </Box>
      <Box sx={{display:'flex', alignItems:'center', gap: 2}}>
        <Button
          variant='outlined'
          startIcon={<PersonAddIcon />}
          sx={{
            color:'white',
            borderColor:'white',
            '&:hover': {borderColor:'white'}
          }}
        >
          Invite</Button>
        <AvatarGroup
          max={7}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              fontSize: 14,
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&:first-of-type': {bgcolor: '#a4b0be'}
            }
          }}
        >
          <Tooltip title="Thang Pham">
            <Avatar alt="Thang Pham"
              src="https://th.bing.com/th/id/OIP.0dJxHhAdiN-zpL61XJBmbwHaEK?w=333&h=187&c=7&r=0&o=5&dpr=1.1&pid=1.7" />
          </Tooltip>
          <Tooltip title="Thang Pham">
            <Avatar alt="Thang Pham"
              src="https://th.bing.com/th/id/OIP.-fInE5Lo5ImN-RE9vyI7SAHaEI?w=293&h=181&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
          </Tooltip>
          <Tooltip title="Thang Pham">
            <Avatar alt="Thang Pham"
              src="https://th.bing.com/th/id/OIP.fU3z0jgnmJOUSPEi8g4yhQHaHa?w=186&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
          </Tooltip>
          <Tooltip title="Thang Pham">
            <Avatar alt="Thang Pham"
              src="https://th.bing.com/th/id/OIP.7DI5MPeAFFeQTAE2KRoRRgHaE7?w=297&h=198&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
          </Tooltip>
          <Tooltip title="Thang Pham">
            <Avatar alt="Thang Pham"
              src="https://th.bing.com/th/id/OIP.0dJxHhAdiN-zpL61XJBmbwHaEK?w=333&h=187&c=7&r=0&o=5&dpr=1.1&pid=1.7" />
          </Tooltip>
          <Tooltip title="Thang Pham">
            <Avatar alt="Thang Pham"
              src="https://th.bing.com/th/id/OIP.fLnk_eILwplVquL4wn3t2gHaHa?w=193&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
          </Tooltip>
          <Tooltip title="Thang Pham">
            <Avatar alt="Thang Pham"
              src="https://th.bing.com/th/id/OIP.nBiGxha2IadaAgIdMDOjugHaFj?w=301&h=181&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
          </Tooltip>
          <Tooltip title="Thang Pham">
            <Avatar alt="Thang Pham"
              src="https://th.bing.com/th/id/OIP.0dJxHhAdiN-zpL61XJBmbwHaEK?w=333&h=187&c=7&r=0&o=5&dpr=1.1&pid=1.7" />
          </Tooltip>
          <Tooltip title="Thang Pham">
            <Avatar alt="Thang Pham"
              src="https://th.bing.com/th/id/OIP.-fInE5Lo5ImN-RE9vyI7SAHaEI?w=293&h=181&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
          </Tooltip>
          <Tooltip title="Thang Pham">
            <Avatar alt="Thang Pham"
              src="https://th.bing.com/th/id/OIP.fU3z0jgnmJOUSPEi8g4yhQHaHa?w=186&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
          </Tooltip>
          <Tooltip title="Thang Pham">
            <Avatar alt="Thang Pham"
              src="https://th.bing.com/th/id/OIP.7DI5MPeAFFeQTAE2KRoRRgHaE7?w=297&h=198&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
          </Tooltip>
          <Tooltip title="Thang Pham">
            <Avatar alt="Thang Pham"
              src="https://th.bing.com/th/id/OIP.0dJxHhAdiN-zpL61XJBmbwHaEK?w=333&h=187&c=7&r=0&o=5&dpr=1.1&pid=1.7" />
          </Tooltip>
          <Tooltip title="Thang Pham">
            <Avatar alt="Thang Pham"
              src="https://th.bing.com/th/id/OIP.fLnk_eILwplVquL4wn3t2gHaHa?w=193&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
          </Tooltip>
          <Tooltip title="Thang Pham">
            <Avatar alt="Thang Pham"
              src="https://th.bing.com/th/id/OIP.nBiGxha2IadaAgIdMDOjugHaFj?w=301&h=181&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
          </Tooltip>

        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
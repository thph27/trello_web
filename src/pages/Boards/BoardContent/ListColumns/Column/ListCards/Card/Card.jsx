import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

function TrelloCard({ temporaryHideMedia}) {
  if (temporaryHideMedia) {
    return (
      <Card sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba( 0, 0, 0, 0.2)',
        overflow: 'unset'
      }}>
        <CardContent sx={{p: 1.5, '&:last-child': { p : 1.5} }}>
          <Typography> Card 01 </Typography>
        </CardContent>

      </Card>
    )
  }
  return (
    <Card sx={{
      cursor: 'pointer',
      boxShadow: '0 1px 1px rgba( 0, 0, 0, 0.2)',
      overflow: 'unset'
    }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://th.bing.com/th/id/OIP.0dJxHhAdiN-zpL61XJBmbwHaEK?w=333&h=187&c=7&r=0&o=5&dpr=1.1&pid=1.7"
        title="ThangPham"
      />
      <CardContent sx={{p: 1.5, '&:last-child': { p : 1.5} }}>
        <Typography> ThangPham </Typography>
        <Typography variant="body2" color="text.secondary">
        </Typography>
      </CardContent>
      <CardActions sx={{ p : '0 4px 8px 4px'}}>
        <Button size="small" startIcon={<GroupIcon/>}>17</Button>
        <Button size="small" startIcon={<CommentIcon/>}>12</Button>
        <Button size="small" startIcon={<AttachmentIcon/>}>8</Button>
      </CardActions>
    </Card>
  )
}

export default TrelloCard
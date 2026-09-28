import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

export default function TripCard(CardData) {

    return (
        <Card sx={{ width: 300, height: 450, m: 0.1 }} variant='elevation'>
            <CardMedia
                sx={{ height: 180 }}
                image="/image/Kitz.jpg"
                title="Kitz">
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row-reverse' }}>
                    <Button>
                        <EditRoundedIcon></EditRoundedIcon>
                    </Button>
                </Box>
            </CardMedia>
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>Type</Typography>
                <Typography variant='h4' component="div">Name</Typography>
                <Typography sx={{ color: 'text.secondary' }}>From - To</Typography>
                <Typography variant='body2' sx={{ overflowWrap: "break-word", mt: 1, height: 90 }}>
                    Description
                </Typography>
                <Divider></Divider>
                <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', mt: 2 }}>
                    <Chip label="Countries"></Chip>
                </Stack>
            </CardContent>
        </Card>
    )
}
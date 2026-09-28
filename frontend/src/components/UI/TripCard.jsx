import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

export default function TripCard(CardData) {

    return (
        <Card sx={{ width: 350}}>
            <CardMedia
                sx={{height: 240}}
                image="/image/Kitz.jpg"
                title="Kitz"></CardMedia>
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>Type</Typography>
                <Typography variant='h4' component="div">Name</Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>From - To</Typography>
                <Typography variant='body2' sx={{overflowWrap: "break-word"}}>
                    Countrylist - Countrylist - Countrylist - Countrylist - Countrylist - Countrylist - Countrylist - Countrylist
                </Typography>
            </CardContent>
        </Card>
    )
}
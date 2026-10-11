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
import CardActionArea from '@mui/material/CardActionArea';
import { useAuth } from '../../AuthContext';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

export default function CityCard({ city, onClick, selected, isAdmin, handleDelete }) {

    var cheight = 470;

    if(isAdmin) {
        cheight = 500;
    }

    return (
        <Card sx={{ width: 300, height: cheight || 470, m: 0.1, display: 'grid' }} variant='elevation'>
            <CardActionArea
                onClick={onClick}
                sx={{
                    height: '102%',
                    gridArea: "1 / 1",
                    zIndex: 0,
                    width: 300,
                    backgroundColor: selected
                        ? 'action.selected'
                        : 'transparent',

                    '&:hover': {
                        backgroundColor: selected
                            ? 'action.selectedHover'
                            : 'action.hover',
                    },
                }}
            >
                <CardMedia
                    sx={{ height: 180 }}
                    image="/image/Kitz.jpg"
                    title="Kitz">

                </CardMedia>
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>{city.type || "Village/Town/City/Capital City"}</Typography>
                    <Typography variant='h4' component="div" sx={{
                        fontSize: city.name?.length > 25
                            ? '1.25rem'
                            : city.name?.length > 18
                                ? '1.5rem'
                                : city.name?.length > 12
                                    ? '1.75rem'
                                    : '2.125rem',
                        lineHeight: 1.2,
                        minHeight: '2.55rem',
                    }}>{city.name || "Name"}</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{city.region || "Region"}</Typography>
                    <Typography variant='body2' sx={{ overflowWrap: "break-word", mt: 1, mb: 1, height: 90, overflow: 'auto' }}>
                        {city.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Divider></Divider>
            <Stack direction="row" spacing={1} sx={{ alignItems:"center", padding: 0.5 }}>
                <Chip  label={city.country || "Country"}></Chip>
            </Stack>
                {isAdmin ? (
                    <Button sx={{mt: 0.1}} fullWidth variant='contained' color='error' onClick={handleDelete}><DeleteRoundedIcon></DeleteRoundedIcon>Delete</Button>
                ) : null}
            <Box sx={{ gridArea: "1 / 1", display: "flex", justifyContent: "flex-end", alignItems: "flex-start", zIndex: 1, pointerEvents: "none" }}>
                <Button sx={{ pointerEvents: "auto" }}><EditRoundedIcon color='primary'></EditRoundedIcon></Button>
            </Box>
        </Card>
    )
}
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

export default function CityCard({ city, onClick, selected, isMini = false }) {

    var custom_height = 610;
    if(isMini) {
        custom_height = "auto"
    }

    return (
        <Card sx={{ width: 400, height: custom_height, m: 0.1, display: 'flex', flexDirection: "column" }} variant='elevation'>
            <CardActionArea
                onClick={onClick}
                sx={{
                    flex: 1,
                    zIndex: 0,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    overflow: "hidden",
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
                    sx={{ height: 200, flexShrink: 0 }}
                    image="/image/Kitz.jpg"
                    title="Kitz">

                </CardMedia>
                <CardContent sx={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, width: "100%", boxSizing: "border-box" }}>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>{city.type || "Village/Town/City/Capital City"}</Typography>
                    <Typography variant='h4' component="div" sx={{
                        fontWeight: "bold",
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
                    <Box sx={{ display: "flex" }}>
                        <Typography sx={{ color: 'text.secondary' }}>{city.country || "Country"} - {city.region || "Region"}  </Typography>
                    </Box>
                    {!isMini ? (
                        <Typography variant='body2' sx={{ overflowWrap: "break-word", mt: 0.5, flex: 1, overflowY: 'scroll' }}>
                            {city.description}
                        </Typography>
                    ) : (
                        <></>
                    )}

                </CardContent>
            </CardActionArea>
        </Card>
    )
}
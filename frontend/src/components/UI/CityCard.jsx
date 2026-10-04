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

export default function CityCard({ city, onClick, selected }) {

    return (
        <Card sx={{ width: 300, height: 450, m: 0.1 }} variant='elevation'>
            <CardActionArea
                onClick={onClick}
                sx={{
                    height: '100%',
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
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row-reverse' }}>
                        <Button>
                            <EditRoundedIcon></EditRoundedIcon>
                        </Button>
                    </Box>
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
                    <Divider></Divider>
                    <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', mt: 2 }}>
                        <Chip label={city.country || "Country"}></Chip>
                    </Stack>
                </CardContent>
            </CardActionArea>

        </Card>
    )
}
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

export default function MainHeader() {

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position='static' sx={{ borderRadius: 0.8}}>
                <Toolbar>
                    <Typography variant='h6' sx={{flexGrow: 1}}>Citytrip Planner</Typography>
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        sx={{mr:1}}>
                            <LoginRoundedIcon />
                        </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
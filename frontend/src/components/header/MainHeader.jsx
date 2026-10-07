import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import * as React from 'react'
import AuthDialog from '../UI/AuthDialog';
import { useAuth } from "../../AuthContext";
import Link from '@mui/material/Link';
import { Avatar, Badge, Divider } from '@mui/material';


export default function MainHeader() {

    const [authOpen, setAuthOpen] = React.useState(false);
    const { user, loading, isAuthenticated, hasPermission, logout } = useAuth();
    console.log("MainHeader user:", user);

    return (
        <Box sx={{ height: '7dvh' }}>
            <AppBar position='static' sx={{ borderRadius: 0.8 }}>
                <Toolbar>
                    <Box sx={{ width: '10%' }}>
                        <Typography variant='h5' sx={{ flexGrow: 1, pb: 0, mb: 0, fontWeight: 'bolder' }}>Holid.ai</Typography>
                    </Box>

                    <Box sx={{ width: '80%', display: 'flex', gap: 3, flexGrow: 1, justifyContent: 'space-evenly' }}>
                        <Link href="/" color="inherit" underline="none" sx={{ mr: 2 }}>
                            Home
                        </Link>
                        <Link href="/about-us" color="inherit" underline="none" sx={{ mr: 2 }}>
                            About us
                        </Link>
                        <Link href="/contact-us" color="inherit" underline="none" sx={{ mr: 2 }}>
                            Contact us
                        </Link>
                        <Link href="/impressum" color="inherit" underline="none" sx={{ mr: 2 }}>
                            Impressum
                        </Link>
                        {isAuthenticated && (
                            <>
                                <Divider orientation="vertical" flexItem sx={{
                                    borderColor: 'var(--AppBar-color)',
                                    opacity: 0.6
                                }} />
                                <Link href="/trips" color="inherit" underline="none" sx={{ mr: 2 }}>
                                    Trips
                                </Link>
                                <Link href="/ittinararies" color="inherit" underline="none" sx={{ mr: 2 }}>
                                    Ittinararies
                                </Link>
                            </>
                        )}
                        {hasPermission("CityAdmin") || hasPermission("CountryAdmin") || hasPermission("UserAdmin") ? (
                            <>
                                <Divider orientation="vertical" flexItem sx={{
                                    borderColor: 'var(--AppBar-color)',
                                    opacity: 0.6
                                }} />
                                <Link href="/admin" color="inherit" underline="none" sx={{ mr: 2 }}>Admin</Link>
                            </>

                        ) : null}
                    </Box>
                    <Box sx={{ width: '10%', display: 'flex', gap: 3, flexDirection: 'row-reverse' }}>
                        {!isAuthenticated && (
                            <IconButton
                                size="large"
                                edge="end"
                                color="inherit"
                                sx={{ mr: 1 }}
                                onClick={() => setAuthOpen(true)}>
                                <LoginRoundedIcon />
                            </IconButton>
                        )}


                        {isAuthenticated && (
                            <Avatar sx={{ mr: 1 }}>{user.username.charAt(0)}</Avatar>
                        )}
                    </Box>



                </Toolbar>
            </AppBar>
            <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} />
        </Box>
    )
}
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
        <Box sx={{ height: '7vh' }}>
            <AppBar position='static' sx={{ borderRadius: 0.8 }}>
                <Toolbar>
                    <Typography variant='h6' sx={{ flexGrow: 1 }}>
                        <Badge badgeContent={"prototype"} color="secondary">Holidai</Badge>
                    </Typography>
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
                    <Box sx={{ display: 'flex', gap: 3, flexGrow: 1 }}>
                        <Link href="/" color="inherit" underline="none" sx={{ mr: 2 }}>
                            Home
                        </Link>
                    {hasPermission("CityAdmin") || hasPermission("CountryAdmin") || hasPermission("UserAdmin")  ? (
                        <Divider orientation="vertical" flexItem sx={{ mr: 2 }} />
                    ): null}
                    {hasPermission("CityAdmin") && (
                        <Link href="/admin/cities" color="inherit" underline="none" sx={{ mr: 2 }}>
                            Admin - Cities
                        </Link>
                    )}

                    {hasPermission("CountryAdmin") && (
                        <Link href="/admin/countries" color="inherit" underline="none" sx={{ mr: 2 }}>
                            Admin - Countries
                        </Link>
                    )}
                    {hasPermission("UserAdmin") && (
                        <Link href="/admin/users" color="inherit" underline="none" sx={{ mr: 2 }}>
                            Admin - Users
                        </Link>
                    )}
                    </Box>
                    {isAuthenticated && (
                        <Avatar sx={{ mr: 1 }}>{user.username.charAt(0)}</Avatar>
                    )}


                </Toolbar>
            </AppBar>
            <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} />
        </Box>
    )
}
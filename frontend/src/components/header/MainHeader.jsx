import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import * as React from 'react';
import AuthDialog from '../UI/AuthDialog';
import { useAuth } from '../../AuthContext';
import Link from '@mui/material/Link';
import { Alert, Avatar, Snackbar } from '@mui/material';

export default function MainHeader() {
    const [authOpen, setAuthOpen] = React.useState(false);
    const [snackBarOpen, setSnackBarOpen] = React.useState(false);

    const {
        user,
        loading,
        isAuthenticated,
        hasPermission,
        logout
    } = useAuth();

    const handleAuthClose = () => {
        setAuthOpen(false);

        if (isAuthenticated && user && !user.emailVerified) {
            setSnackBarOpen(true);
        }
    };

    React.useEffect(() => {
        if (!loading && isAuthenticated && user && !user.emailVerified) {
            setSnackBarOpen(true);
        }
    }, [loading, isAuthenticated, user]);

    return (
        <Box sx={{ margin: '0.5%' }}>
            <AppBar position="static" sx={{ borderRadius: 0.8 }}>
                <Toolbar>
                    <Link
                        href="/"
                        color="inherit"
                        underline="none"
                        sx={{ width: '10%' }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                flexGrow: 1,
                                pb: 0,
                                mb: 0,
                                fontWeight: 'bolder'
                            }}
                        >
                            Holid.ai
                        </Typography>
                    </Link>

                    <Box
                        sx={{
                            width: '80%',
                            display: 'flex',
                            gap: 3,
                            flexGrow: 1,
                            justifyContent: 'space-evenly'
                        }}
                    >
                        {isAuthenticated && (
                            <>
                                <Link
                                    href="/trips"
                                    color="inherit"
                                    underline="none"
                                    sx={{ mr: 2 }}
                                >
                                    Trips
                                </Link>

                                <Link
                                    href="/ittinararies"
                                    color="inherit"
                                    underline="none"
                                    sx={{ mr: 2 }}
                                >
                                    Itineraries
                                </Link>
                            </>
                        )}

                        {(hasPermission('CityAdmin') ||
                            hasPermission('CountryAdmin') ||
                            hasPermission('UserAdmin')) && (
                                <Link
                                    href="/admin"
                                    color="inherit"
                                    underline="none"
                                    sx={{ mr: 2 }}
                                >
                                    Admin
                                </Link>
                            )}

                        <Link
                            href="/about-us"
                            color="inherit"
                            underline="none"
                            sx={{ mr: 2 }}
                        >
                            About us
                        </Link>

                        <Link
                            href="/contact-us"
                            color="inherit"
                            underline="none"
                            sx={{ mr: 2 }}
                        >
                            Contact us
                        </Link>

                        <Link
                            href="/impressum"
                            color="inherit"
                            underline="none"
                            sx={{ mr: 2 }}
                        >
                            Impressum
                        </Link>
                    </Box>

                    <Box
                        sx={{
                            width: '10%',
                            display: 'flex',
                            gap: 3,
                            flexDirection: 'row-reverse',
                            alignItems: 'center'
                        }}
                    >
                        {!loading && !isAuthenticated && (
                            <IconButton
                                size="large"
                                edge="end"
                                color="inherit"
                                sx={{ mr: 1 }}
                                onClick={() => setAuthOpen(true)}
                            >
                                <LoginRoundedIcon />
                            </IconButton>
                        )}

                        {!loading && isAuthenticated && user && (
                            <>
                                <Link href="/account" underline="none">
                                    <Avatar sx={{ mr: 1 }}>
                                        {user.username?.charAt(0).toUpperCase()}
                                    </Avatar>
                                </Link>

                                <IconButton
                                    size="large"
                                    edge="end"
                                    color="inherit"
                                    sx={{ mr: 1 }}
                                    onClick={logout}
                                >
                                    <LogoutRoundedIcon />
                                </IconButton>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            <AuthDialog
                open={authOpen}
                onClose={() => setAuthOpen(false)}
            />

            <Snackbar
                open={snackBarOpen}
                autoHideDuration={5000}
                onClose={() => setSnackBarOpen(false)}
            >
                <Alert onClose={() => setSnackBarOpen(false)} severity='info' variant='filled'>
                        Verify your E-Mail address!
                </Alert>
            </Snackbar>
        </Box>
    );
}
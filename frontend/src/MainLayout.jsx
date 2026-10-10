import { useEffect, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Box } from "@mui/material";
import MainHeader from "./Components/Header/MainHeader";

export default function MainLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        if (params.get("emailVerified") === "true") {
            setSnackbarOpen(true);

            navigate("/trips", { replace: true });
        }
    }, [location.search, navigate]);

    return (
        <>
            <Box sx={{ height: "100%", width: "100%" }}>
                <MainHeader />
                <Box>
                    <Outlet />
                </Box>
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity="success"
                    variant="filled"
                >
                    Email verified successfully!
                </Alert>
            </Snackbar>
        </>
    );
}
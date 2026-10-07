import { Outlet } from "react-router-dom";
import MainHeader from "./components/header/MainHeader";
import { Box, Paper } from "@mui/material";

export default function MainLayout() {
    return (
        <Box sx={{height: "100%", width: "100%"}}>
            <MainHeader />
            <Box>
                <Outlet />
            </Box>
        </Box>
    );
}
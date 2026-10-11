import { Box } from "@mui/material"
import AdminDashboard from "../Components/Admin/AdminDashboard"
import MainHeader from "../Components/Header/MainHeader"

export default function Admin() {

    return (
        <Box sx={{ margin: 1 }}>
            <AdminDashboard></AdminDashboard>
        </Box>
    )
}
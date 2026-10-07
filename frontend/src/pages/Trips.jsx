import { Box } from "@mui/material"
import MainHeader from "../components/header/MainHeader"
import TripDashboard from "../components/Trips/TripDashboard"

export default function Trips() {

    return (
        <Box sx={{margin: 1}}>
            <TripDashboard></TripDashboard>
        </Box>
    )
}
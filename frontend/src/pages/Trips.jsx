import { Box } from "@mui/material"
import MainHeader from "../Components/Header/MainHeader"
import TripDashboard from "../Components/Trips/TripDashboard"

export default function Trips() {

    return (
        <Box sx={{margin: 1}}>
            <TripDashboard></TripDashboard>
        </Box>
    )
}
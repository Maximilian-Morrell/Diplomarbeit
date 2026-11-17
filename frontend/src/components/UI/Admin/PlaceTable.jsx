import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { getGeoCategories } from "../../../API/ApiClient";

import LocalGroceryStoreRoundedIcon from '@mui/icons-material/LocalGroceryStoreRounded';
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import LocalBarRoundedIcon from '@mui/icons-material/LocalBarRounded';
import LocalCafeRoundedIcon from '@mui/icons-material/LocalCafeRounded';
import FlatwareRoundedIcon from '@mui/icons-material/FlatwareRounded';
import IcecreamRoundedIcon from '@mui/icons-material/IcecreamRounded';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import VideogameAssetRoundedIcon from '@mui/icons-material/VideogameAssetRounded';
import WaterRoundedIcon from '@mui/icons-material/WaterRounded';
import AttractionsRoundedIcon from '@mui/icons-material/AttractionsRounded';
import TheatersRoundedIcon from '@mui/icons-material/TheatersRounded';
import MuseumRoundedIcon from '@mui/icons-material/MuseumRounded';
import GolfCourseRoundedIcon from '@mui/icons-material/GolfCourseRounded';
import ParkRoundedIcon from '@mui/icons-material/ParkRounded';
import SpaRoundedIcon from '@mui/icons-material/SpaRounded';
import BeachAccessRoundedIcon from '@mui/icons-material/BeachAccessRounded';
import OutdoorGrillRoundedIcon from '@mui/icons-material/OutdoorGrillRounded';
import TourRoundedIcon from '@mui/icons-material/TourRounded';
import DownhillSkiingRoundedIcon from '@mui/icons-material/DownhillSkiingRounded';
import PhishingRoundedIcon from '@mui/icons-material/PhishingRounded';
import SkateboardingRoundedIcon from '@mui/icons-material/SkateboardingRounded';
import IceSkatingRoundedIcon from '@mui/icons-material/IceSkatingRounded';
import StadiumRoundedIcon from '@mui/icons-material/StadiumRounded';
import PoolRoundedIcon from '@mui/icons-material/PoolRounded';
import * as React from "react";

export default function InterestTable(props) {

    const { interests, selectInterest, currentInterest, deleteInterest } = props;

    console.log(interests)
    function SetSelectedType(interest) {
        if (currentInterest?.id === interest.id) {
            console.log("Test")
            selectInterest(null)
        }
        else {
            selectInterest(interest);
        }
    }

    async function RemoveType(interest) {
        await DeleteType(interest.id);
        console.log(interests)
        deleteInterest();
    }
    const [PlaceTypes, setPlaceTypes] = React.useState([]);
    
    React.useEffect(async () => {
        const LoadPlaceTypes = await getGeoCategories();
        setPlaceTypes(LoadPlaceTypes);
    }, [])

    return (
        <Box sx={{ flex: 1, minHeight: 0, m: 1, display: 'flex', flexDirection: 'row', gap: 1 }}>
            <Paper elevation={3} sx={{ display: "flex", flex: 0.5, p: 1, minHeight: 0 }}>
                Test
            </Paper>
            <Paper elevation={3} sx={{ display: "flex", flex: 1, p: 1, minHeight: 0 }}>
                Test
            </Paper>
        </Box>

        // <TableContainer component={Paper}>
        //     <Table sx={{ width: '100%' }}>
        //         <TableHead>
        //             <TableRow>
        //                 <TableCell>ID</TableCell>
        //                 <TableCell>Name</TableCell>
        //                 <TableCell>Description</TableCell>
        //                 <TableCell></TableCell>
        //             </TableRow>
        //         </TableHead>

        //         <TableBody>
        //             {interests.map((interest) => (
        //                 <TableRow key={interest.id} hover onClick={() => SetSelectedType(interest)} sx={{ cursor: "pointer" }} selected={currentInterest?.id === interest.id}>
        //                     <TableCell>{interest.id}</TableCell>
        //                     <TableCell>{interest.name}</TableCell>
        //                     <TableCell>{interest.description}</TableCell>
        //                     <TableCell sx={{ zIndex: 1 }} align="right"><Button variant="contained" color="error" onClick={() => RemoveType(interest)}>Delete</Button></TableCell>

        //                 </TableRow>
        //             ))}
        //         </TableBody>
        //     </Table>
        // </TableContainer>
    )
}
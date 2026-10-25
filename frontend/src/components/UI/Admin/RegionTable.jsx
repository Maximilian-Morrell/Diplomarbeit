import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { DeleteRegion } from "../../../API/ApiClient";

export default function RegionTable(props) {

    const { regions, selectRegion, currentRegion, deleteRegion } = props;

    function SetSelectedRegion(region) {
        if (currentRegion?.id === region.id) {
            console.log("Test")
            selectRegion(null)
        }
        else {
            selectRegion(region);
        }
    }

    async function RemoveRegion(region) {
        await DeleteRegion(region.id);
        console.log(regions)
        deleteRegion();
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ width: '100%' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Amount of Cities</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {regions.map((region) => (
                        <TableRow key={region.id} hover onClick={() => SetSelectedRegion(region)} sx={{ cursor: "pointer" }} selected={currentRegion?.id === region.id}>
                            <TableCell>{region.id}</TableCell>
                            <TableCell>{region.name}</TableCell>
                            <TableCell>{region.country}</TableCell>
                            <TableCell>{region.cities}</TableCell>
                            <TableCell sx={{ zIndex: 1 }} align="right"><Button variant="contained" color="error" onClick={() => RemoveRegion(country)}>Delete</Button></TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
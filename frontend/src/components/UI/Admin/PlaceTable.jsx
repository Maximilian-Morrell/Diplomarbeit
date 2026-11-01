import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { DeleteType } from "../../../API/ApiClient";

export default function PlaceTable(props) {

    const { places, selectPlace, currentPlace, deletePlace } = props;

    console.log(places)
    function SetSelectedType(place) {
        if (currentPlace?.id === place.id) {
            console.log("Test")
            selectPlace(null)
        }
        else {
            selectPlace(place);
        }
    }

    async function RemovePlace(place) {
        await DeleteType(place.id);
        console.log(places)
        deletePlace();
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ width: '100%' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {places.map((place) => (
                        <TableRow key={place.id} hover onClick={() => SetSelectedType(place)} sx={{ cursor: "pointer" }} selected={currentPlace?.id === place.id}>
                            <TableCell>{place.id}</TableCell>
                            <TableCell>{place.name}</TableCell>
                            <TableCell sx={{ zIndex: 1 }} align="right"><Button variant="contained" color="error" onClick={() => RemovePlace(place)}>Delete</Button></TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
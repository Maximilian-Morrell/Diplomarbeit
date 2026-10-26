import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { DeleteType } from "../../../API/ApiClient";

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

    return (
        <TableContainer component={Paper}>
            <Table sx={{ width: '100%' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {interests.map((interest) => (
                        <TableRow key={interest.id} hover onClick={() => SetSelectedType(interest)} sx={{ cursor: "pointer" }} selected={currentInterest?.id === interest.id}>
                            <TableCell>{interest.id}</TableCell>
                            <TableCell>{interest.name}</TableCell>
                            <TableCell>{interest.description}</TableCell>
                            <TableCell sx={{ zIndex: 1 }} align="right"><Button variant="contained" color="error" onClick={() => RemoveType(interest)}>Delete</Button></TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
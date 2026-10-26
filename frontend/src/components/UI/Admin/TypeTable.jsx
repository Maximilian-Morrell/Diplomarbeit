import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { DeleteType } from "../../../API/ApiClient";

export default function TypeTable(props) {

    const { types, selectType, currentType, deleteType } = props;

    console.log(types)
    function SetSelectedType(type) {
        if (currentType?.id === type.id) {
            console.log("Test")
            selectType(null)
        }
        else {
            selectType(type);
        }
    }

    async function RemoveType(type) {
        await DeleteType(type.id);
        console.log(types)
        deleteType();
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
                    {types.map((type) => (
                        <TableRow key={type.id} hover onClick={() => SetSelectedType(type)} sx={{ cursor: "pointer" }} selected={currentType?.id === type.id}>
                            <TableCell>{type.id}</TableCell>
                            <TableCell>{type.name}</TableCell>
                            <TableCell>{type.description}</TableCell>
                            <TableCell sx={{ zIndex: 1 }} align="right"><Button variant="contained" color="error" onClick={() => RemoveType(type)}>Delete</Button></TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
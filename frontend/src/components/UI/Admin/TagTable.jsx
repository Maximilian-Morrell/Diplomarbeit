import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import {DeleteTag } from "../../../API/ApiClient";

export default function TagTable(props) {

    const { tags, selectTag, currentTag, deleteTag } = props;

    function SetSelectedTag(tag) {
        if (currentTag?.id === tag.id) {
            console.log("Test")
            selectTag(null)
        }
        else {
            selectTag(tag);
        }
    }

    async function RemoveTag(tag) {
        await DeleteTag(tag.id);
        console.log(tags)
        deleteTag();
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
                    {tags.map((tag) => (
                        <TableRow key={tag.id} hover onClick={() => SetSelectedRegion(tag)} sx={{ cursor: "pointer" }} selected={currentTag?.id === tag.id}>
                            <TableCell>{tag.id}</TableCell>
                            <TableCell>{tag.name}</TableCell>
                            <TableCell sx={{ zIndex: 1 }} align="right"><Button variant="contained" color="error" onClick={() => RemoveTag(tag)}>Delete</Button></TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
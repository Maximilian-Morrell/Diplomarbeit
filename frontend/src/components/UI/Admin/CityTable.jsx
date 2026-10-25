import { Button, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { DeleteCity } from "../../../API/ApiClient";

export default function CityTable(props) {

    const { cities, selectCity, currentCity, deleteCity } = props;

    console.log(cities)

    function SetSelectedCity(city) {
        if (currentCity?.id === city.id) {
            console.log("Test")
            selectCity(null)
        }
        else {
            console.log(city)
            selectCity(city);
        }
    }

    async function RemoveCity(city) {
        await DeleteCity(city.id);
        console.log(cities)
        deleteCity();
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ width: '100%' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Region</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Permission</TableCell>
                        <TableCell>Tags</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {cities.map((city) => (
                        <TableRow key={city.id} hover onClick={() => SetSelectedCity(city)} sx={{ cursor: "pointer" }} selected={currentCity?.id === city.id}>
                            <TableCell>{city.id}</TableCell>
                            <TableCell>{city.name}</TableCell>
                            <TableCell>{city.country}</TableCell>
                            <TableCell>{city.type}</TableCell>
                            <TableCell>{city.region}</TableCell>
                            <TableCell><Box sx={{ height: 75, overflowWrap: "anywhere", overflow:"scroll", width: "40 %" }}><Typography variant="body2">{city.description}</Typography></Box></TableCell>
                            <TableCell>{city.permission}</TableCell>
                            <TableCell>
                                <Box sx={{overflow: "auto", height: 75, mWidth: "30 %" }}>
                                    {city.tags.map((tag) => (
                                        <Chip sx={{m: 0.5}} label={tag.name} ></Chip>
                                    ))}
                                </Box></TableCell>
                            <TableCell sx={{ zIndex: 1 }} align="right"><Button variant="contained" color="error" onClick={() => RemoveCity(city)}>Delete</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
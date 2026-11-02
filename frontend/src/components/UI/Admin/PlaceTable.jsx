import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    Tab,
    Box
} from "@mui/material";

import { DataGrid } from '@mui/x-data-grid';

import { DeleteType, LoadPlacesFromOpenStreetMap } from "../../../API/ApiClient";
import React from "react";
import OSMLoadPlacesDialog from "./OSMLoadPlacesDialog";

export default function PlaceTable(props) {
    const { city_places, geoCategories, selectPlace, currentPlace, setPlaces } = props;

    const [selectedCity, setSelectedCity] = React.useState(0);
    const [OSMLoadOpen, setOSMLoadOpen] = React.useState(false);
    const [loadCity, setLoadCity] = React.useState(null);

    const activeCity = city_places[selectedCity];

    function SetSelectedType(place) {
        if (currentPlace?.id === place.id) {
            selectPlace(null);
        } else {
            selectPlace(place);
        }
    }

    function LoadPlacesFromOSM(city) {
        setLoadCity(city);
        setOSMLoadOpen(true);
    }

    function handleClose() {
        setOSMLoadOpen(false);
        setLoadCity(null);
    }

    async function handleCreated(cityId, selectedCategories) {
        handleClose();

        const result = await LoadPlacesFromOpenStreetMap(cityId, selectedCategories);

        console.log(result);
        setPlaces(result);
    }

    return (
        <Paper sx={{ width: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>

            {/* City Tabs */}
            <Box sx={{ display: "flex", alignItems: "center", borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={selectedCity}
                    onChange={(e, newValue) => setSelectedCity(newValue)}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ flex: 1 }}
                >
                    {city_places.map((city, index) => (
                        <Tab
                            key={city.city_id}
                            label={city.city}
                            value={index}
                        />
                    ))}
                </Tabs>

                {activeCity && (
                    <Button
                        variant="contained"
                        sx={{ mx: 2, flexShrink: 0 }}
                        onClick={() => LoadPlacesFromOSM({
                            name: activeCity.city,
                            id: activeCity.city_id
                        })}
                    >
                        Load Places from Open Street Map
                    </Button>
                )}
            </Box>

            {/* Places Table */}
            {activeCity && (
                <TableContainer sx={{ maxHeight: 700, overflow: "auto" }}>
                    <Table stickyHeader size="small" sx={{ minWidth: 1000 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Opening Hours</TableCell>
                                <TableCell>Brand</TableCell>
                                <TableCell>Website</TableCell>
                                <TableCell>Place ID</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {activeCity.places?.map((place) => (
                                <TableRow
                                    key={place.id}
                                    hover
                                    selected={currentPlace?.id === place.id}
                                    onClick={() => SetSelectedType(place)}
                                    sx={{ cursor: "pointer" }}
                                >
                                    <TableCell>{place.id}</TableCell>
                                    <TableCell>{place.name}</TableCell>
                                    <TableCell>{place.address}</TableCell>
                                    <TableCell>{place.opening_hours}</TableCell>
                                    <TableCell>{place.brand}</TableCell>
                                    <TableCell>{place.website}</TableCell>
                                    <TableCell>{place.place_id}</TableCell>
                                </TableRow>
                            ))}

                            {(!activeCity.places || activeCity.places.length === 0) && (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        No places found for this city.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <OSMLoadPlacesDialog
                open={OSMLoadOpen}
                onClose={handleClose}
                onOSMLoaded={handleCreated}
                GeoCategories={geoCategories}
                city={loadCity}
            />

        </Paper>
    );
}
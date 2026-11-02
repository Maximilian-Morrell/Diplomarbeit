import {
    Button,
    Paper,
    Tabs,
    Tab,
    Box
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import { LoadPlacesFromOpenStreetMap } from "../../../API/ApiClient";
import React from "react";
import OSMLoadPlacesDialog from "./OSMLoadPlacesDialog";

export default function PlaceTable(props) {

    const GetOffsetKey = (cityID, category) => `osmOffset_${cityID}_${category}`;
    const GetSavedOffset = (cityID, category) => {
        return Number(localStorage.getItem(GetOffsetKey(cityID, category))) || 0;
    };

    const [offset, setOffset] = React.useState(() => {
        return Number(localStorage.getItem("osmOffset")) || 0;
    });

    React.useEffect(() => {
        localStorage.setItem("osmOffset", offset);
    }, [offset]);

    const [hasMore, setHasMore] = React.useState(true);
    const { city_places, geoCategories, selectPlace, currentPlace, setPlaces } = props;

    const [selectedCity, setSelectedCity] = React.useState(0);
    const [OSMLoadOpen, setOSMLoadOpen] = React.useState(false);
    const [loadCity, setLoadCity] = React.useState(null);

    const activeCity = city_places[selectedCity];

    const columns = [
        { field: "id", headerName: "ID", width: 80 },
        { field: "name", headerName: "Name", minWidth: 180, flex: 1 },
        { field: "category", headerName: "Category", minWidth: 180, flex: 1 },
        { field: "suburb", headerName: "Suburb", minWidth: 180, flex: 1 },
        { field: "address", headerName: "Address", minWidth: 200, flex: 1 },
        { field: "opening_hours", headerName: "Opening Hours", minWidth: 180, flex: 1 },
        { field: "brand", headerName: "Brand", minWidth: 130, flex: 1 },
        { field: "website", headerName: "Website", minWidth: 180, flex: 1 },
        { field: "place_id", headerName: "Place ID", minWidth: 150, flex: 1 }
    ];

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
        const storageKey = GetOffsetKey(cityId, selectedCategories);
        const offset = GetSavedOffset(cityId, selectedCategories);
        handleClose();

        const result = await LoadPlacesFromOpenStreetMap(cityId, selectedCategories, offset);

        localStorage.setItem(storageKey, result.nextOffset);

        console.log(result.places);
        setPlaces(result.places);
    }

    return (
        <Paper
            sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                minHeight: 0,
                minWidth: 0,
                width: "100%",
                height: "100%",
                overflow: "hidden"
            }}
        >
            {/* City Tabs */}
            <Box sx={{ display: "flex", alignItems: "center", borderBottom: 1, borderColor: "divider", flexShrink: 0 }}>
                <Tabs
                    value={selectedCity}
                    onChange={(e, newValue) => setSelectedCity(newValue)}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ flex: 1 }}
                >
                    {city_places.map((city, index) => (
                        <Tab key={city.city_id} label={city.city} value={index} />
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

            {/* Places Data Grid */}
            {activeCity && (
                <Box sx={{ flex: 1, minHeight: 0, width: "100%" }}>
                    <DataGrid
                        rows={activeCity.places ?? []}
                        columns={columns}
                        getRowId={(row) => row.id}
                        pageSizeOptions={[10, 25, 50, 100]}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 25,
                                    page: 0
                                }
                            }
                        }}
                        onRowClick={(params) => SetSelectedType(params.row)}
                        rowSelection={false}
                        getRowClassName={(params) =>
                            currentPlace?.id === params.row.id ? "selected-row" : ""
                        }
                        sx={{
                            height: "100%",
                            border: 0,
                            "& .MuiDataGrid-row": {
                                cursor: "pointer"
                            },
                            "& .MuiDataGrid-row.selected-row": {
                                backgroundColor: "action.selected"
                            }
                        }}
                    />
                </Box>
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
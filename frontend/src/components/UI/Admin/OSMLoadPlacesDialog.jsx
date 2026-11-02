import { Box, Button, Dialog, DialogTitle, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { AddNewCountry, UpdateCountry } from "../../../API/ApiClient";

export default function OSMLoadPlacesDialog(props) {
    const { onClose, onOSMLoaded, open, city, GeoCategories } = props;

    const handleClose = () => {
        onClose();
    };

    const [selectedCategories, setSelectedCategories] = React.useState([]);


    const handleSave = async () => {
        console.log("saving")
        try {
            console.log(city)
            onOSMLoaded(city.id, selectedCategories);

        } catch (error) {
            console.error("Failed to create City:", error);
        }
    };

    return (

        <Dialog
            onClose={handleClose}
            open={open}
            sx={{
                '& .MuiDialog-paper': {
                    width: '90vw',
                    height: '90vh',
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                    margin: 0,
                    overflow: 'hidden',
                },
            }}
        >
            <DialogTitle sx={{ flexShrink: 0 }}>
                {city ? "Load Places for " + city?.name : "Load Places for city " + city?.name}
            </DialogTitle>

            <Box sx={{ flex: 1, minHeight: 0, m: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6">Select the Place Types: </Typography>
                <Paper sx={{ flex: 1, overflow: 'auto', p: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {GeoCategories.map((category) => (
                        <Box key={category.geoapify_category} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <input type="checkbox" id={`category-${category.geoapify_category}`} name={`category-${category.geoapify_category}`} value={category.geoapify_category} checked={selectedCategories.includes(category.geoapify_category)} onChange={(e) => {
                                if (e.target.checked) {
                                    setSelectedCategories([...selectedCategories, category.geoapify_category]);
                                } else {
                                    setSelectedCategories(selectedCategories.filter((id) => id !== category.geoapify_category));
                                }
                            }} />
                            <Typography variant="body1">{category.name}</Typography>
                        </Box>
                    ))}
                </Paper>
                <Button onClick={handleSave}>Save</Button>
            </Box>
        </Dialog>
    )
}
import { Box, Button, Dialog, DialogTitle, Paper, Typography, Radio, RadioGroup, FormControlLabel, FormControl } from "@mui/material";
import React from "react";

export default function OSMLoadPlacesDialog(props) {
    const { onClose, onOSMLoaded, open, city, GeoCategories } = props;

    const handleClose = () => {
        onClose();
    };

    const [selectedCategory, setSelectedCategory] = React.useState("");

    const handleSave = async () => {
        console.log("saving");

        try {
            onOSMLoaded(city.id, [selectedCategory]);
        } catch (error) {
            console.error("Failed to load places:", error);
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
                <Typography variant="h6">Select the Place Type:</Typography>

                <Paper sx={{ flex: 1, overflow: 'auto', p: 1 }}>
                    <FormControl>
                        <RadioGroup
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {GeoCategories.map((category) => (
                                <FormControlLabel
                                    key={category.geoapify_category}
                                    value={category.geoapify_category}
                                    control={<Radio />}
                                    label={category.name}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Paper>

                <Button onClick={handleSave} disabled={!selectedCategory}>
                    Save
                </Button>
            </Box>
        </Dialog>
    );
}
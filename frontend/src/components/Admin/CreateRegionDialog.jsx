import { Box, Button, Dialog, DialogTitle, MenuItem, TextField } from "@mui/material";
import React from "react";
import { AddNewRegion, getCountries, UpdateRegion } from "../../API/ApiClient";

export default function CreateRegionDialog(props) {
    const { onClose, onRegionCreated, open, region } = props;

    const handleClose = () => {
        onClose();
    };

    const [formData, setFormData] = React.useState({ name: "", country: "" });



    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((previous) => ({ ...previous, [name]: value }));
    };

    const handleSave = async () => {
        console.log("saving")
        try {
            if (region === null) {
                const regions = await AddNewRegion(formData.name, formData.country);
                console.log(regions)
                if (!regions) return;
            }
            else {
                const regions = await UpdateRegion(formData.name, region.id, formData.country)
                console.log(regions);
                if (!regions) return;
            }

            await onRegionCreated();
            setFormData({ name: "", country: "" })

        } catch (error) {
            console.error("Failed to create Region:", error);
        }
    };

    const [countries, setCountries] = React.useState([])

    React.useEffect(() => {
        const loadCountries = async () => {
            setCountries(await getCountries())
            console.log("Test");
        }

        loadCountries();
    }, [])

    React.useEffect(() => {
        if (region != null) {
            console.log(region)
            setFormData({ name: region.name, country: region.country_id })
        }
    }, [region])

    return (

        <Dialog
            onClose={handleClose}
            open={open}
            sx={{
                '& .MuiDialog-paper': {

                    maxWidth: '90vw',
                    maxHeight: '90vh',
                    margin: 0,
                    overflow: 'hidden',
                },
            }}
        >
            <DialogTitle sx={{ flexShrink: 0 }}>
                {region ? "Update Region" : "New Region"}
            </DialogTitle>

            <Box sx={{ flex: 1, minHeight: 0, m: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField name="name" value={formData.name} onChange={handleChange} label="Name"></TextField>
                <TextField name="country" value={formData.country} onChange={handleChange} label="Country" select>{countries.map((country) => (
                    <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
                ))}</TextField>
                <Button onClick={handleSave}>Save</Button>
            </Box>
        </Dialog>
    )
}
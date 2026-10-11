import { Box, Button, Dialog, DialogTitle, Divider, MenuItem, TextField } from "@mui/material";
import * as React from "react";
import { AddNewCity, getCountries, getPermissions } from "../../API/apiClient";

export default function CreateCityDialog(props) {
    const { onClose, onCityCreated, open } = props;

    const handleClose = () => {
        onClose();
    };

    const [formData, setFormData] = React.useState({ name: "", type: "", region: "", description: "", country: "", permission: "" });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((previous) => ({ ...previous, [name]: value }));
    };

    const [countries, setCountries] = React.useState([])

    React.useEffect(() => {
        const loadCountries = async () => {
            setCountries(await getCountries())
            console.log("Test");
        }

        loadCountries();
    }, [])

    const [permissions, setPermissions] = React.useState([])

    React.useEffect(() => {
        const loadPermissions = async () => {
            setPermissions(await getPermissions());
        }

        loadPermissions();
    }, [])

    const typeOfCities = ["Village", "Town", "Small Town", "Town", "City", "Metropolitan City", "Capital City"]

    const handleSave = async () => {
        console.log("saving")
        try {
            const cities = await AddNewCity(formData.name, formData.type, formData.region, formData.description, formData.country, formData.permission);
            console.log(cities)
            if (!cities) return;
            await onCityCreated();
        } catch (error) {
            console.error("Failed to create city:", error);
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
                New City
            </DialogTitle>

            <Box sx={{ flex: 1, minHeight: 0, m: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField name="name" value={formData.name} onChange={handleChange} label="Name"></TextField>
                <TextField name="type" value={formData.type} onChange={handleChange} label="Type" defaultValue="Village" select>{typeOfCities.map((typeOfCity) => (
                    <MenuItem key={typeOfCity} value={typeOfCity}>{typeOfCity}</MenuItem>
                ))}</TextField>
                <TextField name="region" value={formData.region} onChange={handleChange} label="Region"></TextField>
                <TextField name="description" value={formData.description} onChange={handleChange} label="Description" multiline minRows="4"></TextField>
                <Divider></Divider>
                <TextField name="country" value={formData.country} onChange={handleChange} label="Country" select>{countries.map((country) => (
                    <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
                ))}</TextField>
                <TextField name="permission" value={formData.permission} onChange={handleChange} label="Permission" select>{permissions.map((permission) => (
                    <MenuItem key={permission.id} value={permission.id}>{permission.name}</MenuItem>
                ))}</TextField>
                <Button onClick={handleSave}>Save</Button>
            </Box>
        </Dialog>
    );
}
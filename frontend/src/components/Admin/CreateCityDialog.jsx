import { Box, Button, Chip, Dialog, DialogTitle, Divider, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import * as React from "react";
import { AddNewCity, getCountries, getPermissions, UpdateCity, uploadFile } from "../../API/ApiClient";
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';

export default function CreateCityDialog(props) {
    const { onClose, onCityCreated, open, city } = props;

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

    React.useEffect(() => {
        if (city != null) {
            setFormData({ name: city.name, country: city.country_id, type: city.type, region: city.region_id, description: city.description, country: city.country_id, permission: city.permission_id })
        }
    }, [city])

    const typeOfCities = ["Village", "Town", "Small Town", "Town", "City", "Metropolitan City", "Capital City"]

    const handleSave = async () => {
        console.log("saving")
        try {

            if (city) {
                const cities = await UpdateCity(city.id, formData.name, formData.type, formData.region, formData.description, formData.permission);
                
                if(selectedFile != null) {
                    uploadFile("city", city.id, selectedFile)
                }
                console.log(cities)
                if (!cities) return;
            }
            else {
                const cities = await AddNewCity(formData.name, formData.type, formData.region, formData.description, formData.permission, selectedFile);
                console.log(cities)
                if (!cities) return;
            }

            await onCityCreated();
            setFormData({ name: "", type: "", region: "", description: "", country: "", permission: "" })
        } catch (error) {
            console.error("Failed to create city:", error);
        }
    };

    const [selectedFile, setSelectedFile] = React.useState(null);
    const uploadRef = React.useRef(null);
    function handlePictureUploadBtn(event) {
        const file = event.target.files[0];
        setSelectedFile(file);

        if(!file) return;
    }

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
                {city ? "Update City" : "New City"}
            </DialogTitle>

            <Box sx={{ flex: 1, minHeight: 0, m: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField name="name" value={formData.name} onChange={handleChange} label="Name"></TextField>
                <TextField name="type" value={formData.type} onChange={handleChange} label="Type" defaultValue="Village" select>{typeOfCities.map((typeOfCity) => (
                    <MenuItem key={typeOfCity} value={typeOfCity}>{typeOfCity}</MenuItem>
                ))}</TextField>
                <TextField name="description" value={formData.description} onChange={handleChange} label="Description" multiline minRows="4" maxRows="6"></TextField>
                <Divider></Divider>
                <TextField name="country" value={formData.country} onChange={handleChange} label="Country" select>{countries.map((country) => (
                    <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
                ))}</TextField>
                <TextField name="region" value={formData.region} onChange={handleChange} label="Region" select>{countries.find(c => c.id == formData.country)?.regions.map(region => (
                    <MenuItem key={region.id} value={region.id}>{region.name}</MenuItem>
                ))}</TextField>
                <TextField name="permission" value={formData.permission} onChange={handleChange} label="Permission" select>{permissions.map((permission) => (
                    <MenuItem key={permission.id} value={permission.id}>{permission.name}</MenuItem>
                ))}</TextField>
                <>
                    <input
                        ref={uploadRef}
                        type="file"
                        hidden
                        accept="image/jpg,image/png/image/webp"
                        onChange={handlePictureUploadBtn}
                        />
                    <Button startIcon={<BackupRoundedIcon></BackupRoundedIcon>} variant="contained" onClick={() => uploadRef.current.click()}>Upload Picture</Button>
                </>

                <Button onClick={handleSave}>Save</Button>
            </Box>
        </Dialog>
    );
}
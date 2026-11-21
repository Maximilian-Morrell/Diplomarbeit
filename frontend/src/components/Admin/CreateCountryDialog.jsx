import { Autocomplete, Box, Button, Dialog, DialogTitle, FormControlLabel, Switch, TextField } from "@mui/material";
import React from "react";
import { AddNewCountry, AutoComplete, UpdateCountry } from "../../API/ApiClient";

export default function CreateCountryDialog(props) {
    const { onClose, onCountryCreated, open, country } = props;

    const handleClose = () => {
        onClose();
    };

    const [formData, setFormData] = React.useState({ name: "", loadRegions: true });
    const [countryList, setCountryList] = React.useState([])

    React.useEffect(() => {
        if (country != null) {
            setFormData({ name: country.name, loadRegions: true })
        }
    }, [country])


    const handleChange = (event, newValue) => {
        const { name, value } = event.target;
        setFormData((previous) => ({ ...previous, name: newValue }));
    };

    const handleKeyDown = async (event) => {
        if(event.target.value != "") {
            const results = await AutoComplete("country", event.target.value);
            console.log(results);
            setCountryList(results || [""]);
        }
    }

    const handleSave = async () => {
        console.log("saving")
        try {
            if (country === null) {
                const geoID = countryList[countryList.findIndex(c => c.name === formData.name)].geoID;
                const countries = await AddNewCountry(formData.name, geoID, formData.loadRegions);
                console.log(formData.loadRegions)
                console.log(countries)
                if (!countries) return;
                await onCountryCreated();
                setFormData({ name: "" })
            }
            else {
                const countries = await UpdateCountry(formData.name, country.id)
                console.log(countries);
                if(!countries) return;
                await onCountryCreated();
                setFormData({name: ""})
            }

        } catch (error) {
            console.error("Failed to create Country:", error);
        }
    };

    const changeLoadRegions = (event) => {
        setFormData((previous) => ({ ...previous, loadRegions: event.target.value }));
    }

    return (

        <Dialog
            onClose={handleClose}
            open={open}
            sx={{
                '& .MuiDialog-paper': {

                    width: '20vw',
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                    margin: 0,
                    overflow: 'hidden',
                },
            }}
        >
            <DialogTitle sx={{ flexShrink: 0 }}>
                {country ? "Update Country" : "New Country"}
            </DialogTitle>

            <Box sx={{ flex: 1, minHeight: 0, m: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Autocomplete
                    options={countryList.map((country) => country.name)}
                    onKeyDown={handleKeyDown}
                    name="name"
                    value={formData.name} 
                    onChange={handleChange} 
                    label="Name" 
                    renderInput={(params) => <TextField {...params} label="Name"/>} />
                <FormControlLabel control={<Switch defaultChecked />} label="Load Regions" onChange={changeLoadRegions}/>
                <Button onClick={handleSave}>Save</Button>
            </Box>
        </Dialog>
    )
}
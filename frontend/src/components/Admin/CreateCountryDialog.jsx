import { Autocomplete, Box, Button, Dialog, DialogTitle, FormControlLabel, Switch, TextField } from "@mui/material";
import React from "react";
import { AddNewCountry, AutoComplete, UpdateCountry } from "../../API/ApiClient";

export default function CreateCountryDialog(props) {
    const { onClose, onCountryCreated, open, country } = props;

    const handleClose = () => {
        onClose();
    };

    const [formData, setFormData] = React.useState({ name: "" , countryGeoID: "", loadStates: true});
    const [autoCompleteList, setAutoCompleteList] = React.useState([])

    React.useEffect(() => {
        setAutoCompleteList([])
    }, [])

    React.useEffect(() => {
        if (country != null) {
            setFormData({ name: country.name, countryGeoID: "" })
        }
    }, [country])


    const handleChange = (event, newValue) => {

        const { name, value } = event.target;

        setFormData((previous) => ({ ...previous, name: typeof newValue === "string" ? newValue : newValue?.name || "", countryGeoID: typeof newValue === "object" ? newValue?.id || "" : "" }));
    };

    const handleKeyDown = async (event) => {
        const { value } = event.target;
        if (value != "") {
            const autocompleteData = await AutoComplete("country", value) || [];
            setAutoCompleteList(autocompleteData);
            console.log(autocompleteData);
        }
    }

    const handleChangeSwitch = (event) => {
        setFormData((previous => ({...previous, loadStates: event.target.checked})))
    }

    const handleSave = async () => {
        console.log("saving")
        try {
            if (country === null) {
                const countries = await AddNewCountry(formData.name, formData.countryGeoID, formData.loadStates);
                console.log(countries)
                if (!countries) return;
                await onCountryCreated();
                setFormData({ name: "" })
            }
            else {
                const countries = await UpdateCountry(formData.name, country.id)
                console.log(countries);
                if (!countries) return;
                await onCountryCreated();
                setFormData({ name: "" })
            }

        } catch (error) {
            console.error("Failed to create Country:", error);
        }
    };

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
                {country ? "Update Country" : "New Country"}
            </DialogTitle>

            <Box sx={{ flex: 1, minHeight: 0, m: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Autocomplete
                    name="name"
                    value={autoCompleteList?.find(option => option.id === formData.countryGeoID) || null}
                    onChange={handleChange}
                    label="Name"
                    freeSolo
                    options={autoCompleteList || []}
                    getOptionLabel={(option) =>
                        typeof option === "string" ? option : option.name
                    }
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            onKeyDown={handleKeyDown}
                            label="Country"
                        />
                    )}
                    />
                <FormControlLabel control={<Switch defaultChecked onChange={handleChangeSwitch}></Switch>} label="Load Regions"></FormControlLabel>
                <Button onClick={handleSave}>Save</Button>
            </Box>
        </Dialog>
    )
}
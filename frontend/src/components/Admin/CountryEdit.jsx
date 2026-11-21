import { Autocomplete, Box, Button, FormControlLabel, Switch, TextField } from "@mui/material";
import { AddNewCountry, AutoComplete, UpdateCountry } from "../../API/ApiClient";
import React from "react";

export default function CountryEdit(props) {

    const { country } = props;

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
        if (event.target.value != "") {
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
                if (!countries) return;
                await onCountryCreated();
                setFormData({ name: "" })
            }

        } catch (error) {
            console.error("Failed to create Country:", error);
        }
    };

    const changeLoadRegions = (event) => {
        setFormData((previous) => ({ ...previous, loadRegions: event.target.value }));
    }

    return (
        <Box>
            <Autocomplete
                options={countryList.map((country) => country.name)}
                onKeyDown={handleKeyDown}
                name="name"
                value={formData.name}
                onChange={handleChange}
                label="Name"
                renderInput={(params) => <TextField {...params} label="Name" />} />
            <FormControlLabel control={<Switch defaultChecked />} label="Load Regions" onChange={changeLoadRegions} />
            <Button onClick={handleSave}>Save</Button>
        </Box>
    )
}
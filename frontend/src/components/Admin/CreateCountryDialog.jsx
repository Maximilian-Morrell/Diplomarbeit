import { Box, Button, Dialog, DialogTitle, TextField } from "@mui/material";
import React from "react";
import { AddNewCountry, UpdateCountry } from "../../API/ApiClient";

export default function CreateCountryDialog(props) {
    const { onClose, onCountryCreated, open, country } = props;

    const handleClose = () => {
        onClose();
    };

    const [formData, setFormData] = React.useState({ name: "" });

    React.useEffect(() => {
        if (country != null) {
            setFormData({ name: country.name })
        }
    }, [country])


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((previous) => ({ ...previous, [name]: value }));
    };

    const handleSave = async () => {
        console.log("saving")
        try {
            if (country === null) {
                const countries = await AddNewCountry(formData.name);
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
                <TextField name="name" value={formData.name} onChange={handleChange} label="Name"></TextField>
                <Button onClick={handleSave}>Save</Button>
            </Box>
        </Dialog>
    )
}
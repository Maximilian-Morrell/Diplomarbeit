import { Box, Button, Dialog, DialogTitle, MenuItem, TextField } from "@mui/material";
import React from "react";
import {AddNewInterest, UpdateInterest, } from "../../API/ApiClient";

export default function CreateInterestDialog(props) {
    const { onClose, onInterestCreate, open, interest } = props;

    const handleClose = () => {
        onClose();
    };

    const [formData, setFormData] = React.useState({ name: "", description: "" });

    React.useEffect(() => {
        if (interest != null) {
            setFormData({ name: interest.name, description: interest.description })
        }
    }, [interest])


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((previous) => ({ ...previous, [name]: value }));
    };

    const handleSave = async () => {
        console.log("saving")
        try {
            if (interest === null) {
                const interests = await AddNewInterest(formData.name, formData.description);
                console.log(interests)
                if (!interests) return;
            }
            else {
                const interests = await UpdateInterest(formData.name, formData.description, interest.id)
                console.log(interests);
                if (!interests) return;
            }

            await onInterestCreate();
            setFormData({ name: "", description: "" })

        } catch (error) {
            console.error("Failed to create Type:", error);
        }
    };

    return (

        <Dialog
            onClose={handleClose}
            open={open}
            sx={{
                '& .MuiDialog-paper': {
                    width: '90vw',
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                    margin: 0,
                    overflow: 'hidden',
                },
            }}
        >
            <DialogTitle sx={{ flexShrink: 0 }}>
                {interest ? "Update Interest" : "New Interest"}
            </DialogTitle>

            <Box sx={{ flex: 1, minHeight: 0, m: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField name="name" value={formData.name} onChange={handleChange} label="Name"></TextField>
                <TextField name="description" value={formData.description} onChange={handleChange} label="Description"></TextField>
                <Button onClick={handleSave}>Save</Button>
            </Box>
        </Dialog>
    )
}
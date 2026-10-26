import { Box, Button, Dialog, DialogTitle, MenuItem, TextField } from "@mui/material";
import React from "react";
import {AddNewType, UpdateType } from "../../API/ApiClient";

export default function CreateTypeDialog(props) {
    const { onClose, onTypeCreate, open, type } = props;

    const handleClose = () => {
        onClose();
    };

    const [formData, setFormData] = React.useState({ name: "", description: "" });

    React.useEffect(() => {
        if (type != null) {
            setFormData({ name: type.name, description: type.description })
        }
    }, [type])


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((previous) => ({ ...previous, [name]: value }));
    };

    const handleSave = async () => {
        console.log("saving")
        try {
            if (type === null) {
                const types = await AddNewType(formData.name, formData.description);
                console.log(types)
                if (!types) return;
            }
            else {
                const types = await UpdateType(formData.name, formData.description, type.id)
                console.log(types);
                if (!types) return;
            }

            await onTypeCreate();
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
                {type ? "Update Type" : "New Type"}
            </DialogTitle>

            <Box sx={{ flex: 1, minHeight: 0, m: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField name="name" value={formData.name} onChange={handleChange} label="Name"></TextField>
                <TextField name="description" value={formData.description} onChange={handleChange} label="Description"></TextField>
                <Button onClick={handleSave}>Save</Button>
            </Box>
        </Dialog>
    )
}
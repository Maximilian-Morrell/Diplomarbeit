import { Box, Button, Dialog, DialogTitle, MenuItem, TextField } from "@mui/material";
import React from "react";
import {AddNewTag, UpdateTag } from "../../API/ApiClient";

export default function CreateTagDialog(props) {
    const { onClose, onTagCreated, open, tag } = props;

    const handleClose = () => {
        onClose();
    };

    const [formData, setFormData] = React.useState({ name: "", description: "" });

    React.useEffect(() => {
        if (tag != null) {
            setFormData({ name: tag.name, description: tag.description })
        }
    }, [tag])


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((previous) => ({ ...previous, [name]: value }));
    };

    const handleSave = async () => {
        console.log("saving")
        try {
            if (tag === null) {
                const tags = await AddNewTag(formData.name, formData.description);
                console.log(tags)
                if (!tags) return;
            }
            else {
                const tags = await UpdateTag(formData.name, formData.description, tag.id)
                console.log(tags);
                if (!tags) return;
            }

            await onTagCreated();
            setFormData({ name: "", description: "" })

        } catch (error) {
            console.error("Failed to create Tag:", error);
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
                {tag ? "Update Tag" : "New Tag"}
            </DialogTitle>

            <Box sx={{ flex: 1, minHeight: 0, m: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField name="name" value={formData.name} onChange={handleChange} label="Name"></TextField>
                <TextField name="description" value={formData.description} onChange={handleChange} label="Description"></TextField>
                <Button onClick={handleSave}>Save</Button>
            </Box>
        </Dialog>
    )
}
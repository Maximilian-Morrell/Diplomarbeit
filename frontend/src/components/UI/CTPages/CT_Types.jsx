import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';
import React from "react";
import { Card, Divider, List, ListItem, ListItemButton, ListItemText, Paper } from "@mui/material";

export default function CT_Type({ types, selectedTypes, setSelectedTypes }) {


    function handleTypeSelected(index) {
        console.log(index)
        setSelectedTypes((prev) =>
            prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]
        );
    }

    return (
        <Box sx={{ display: "flex", overflow: 'auto', flexWrap: 'wrap', gap: 2, boxSizing: 'border-box', padding: 1 }}>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", p: 1 }}>
                <Box sx={{ display: "flex" }}>
                    <ChecklistRoundedIcon sx={{ fontSize: 80 }}></ChecklistRoundedIcon>
                    <Box sx={{ ml: 1, display: "flex", flexDirection: "column" }}>
                        <Typography variant="h4" sx={{ fontWeight: "bold" }}>What type of trip do you want?</Typography>
                        <Typography variant="subtitle1" color="textSecondary">Select one or more trip types so we can adjust our recommendations</Typography>
                    </Box>
                </Box>
                <List>
                    {types.map((type) => (
                        <Card sx={{m: 1}}>
                            <ListItemButton
                                key={type.id}
                                selected={selectedTypes.includes(type.id)}
                                onClick={() => handleTypeSelected(type.id)}>
                                <ListItemText
                                    primary={type.name}
                                    secondary={type.description}
                                ></ListItemText>
                            </ListItemButton>

                        </Card>

                    ))}
                </List>
            </Box>
        </Box>
    )
}
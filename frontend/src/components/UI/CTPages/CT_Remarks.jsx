import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NumberSpinner from "../NumberSpinner";
import { Avatar, Button, Paper, TextField } from "@mui/material";
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import EscalatorWarningRoundedIcon from '@mui/icons-material/EscalatorWarningRounded';
import ChildFriendlyRoundedIcon from '@mui/icons-material/ChildFriendlyRounded';
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
import React from "react";
import { blue, green } from "@mui/material/colors";

export default function CT_Remarks(props) {

    const {remarks, setRemarks} = props;

    const handleChange = (event) => {
        const { value } = event.target;

        setRemarks(value);
    }

    return (
        <Box sx={{ display: "flex", flex: 1, overflow: 'auto', flexWrap: 'wrap', gap: 2, boxSizing: 'border-box', padding: 1 }}>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", p: 1 }}>
                <Box sx={{ display: "flex" }}>
                    <AddCommentRoundedIcon sx={{ fontSize: 80 }}></AddCommentRoundedIcon>
                    <Box sx={{ ml: 1, display: "flex", flexDirection: "column" }}>
                        <Typography variant="h4" sx={{ fontWeight: "bold" }}>Any additional remarks?</Typography>
                        <Typography variant="subtitle1" color="textSecondary">Do you have any special request or information you want us to consider?</Typography>
                    </Box>

                </Box>
                <Box sx={{ m: 1, width: "99%", alignItems: "flex-start", display: "flex", gap: 3}}>
                    <TextField fullWidth multiline minRows={26} maxRows={26} onChange={handleChange} value={remarks}></TextField>
                </Box>

            </Box>
        </Box>
    )
}
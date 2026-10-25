import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NumberSpinner from "../../../Components/UI/NumberSpinner";
import { Avatar, Button, Paper } from "@mui/material";
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import EscalatorWarningRoundedIcon from '@mui/icons-material/EscalatorWarningRounded';
import ChildFriendlyRoundedIcon from '@mui/icons-material/ChildFriendlyRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import React from "react";
import { blue, green } from "@mui/material/colors";

export default function CT_Two() {
    const [numberOfAdults, changeNumberOfAdults] = React.useState(1)

    function increaseAdults() {
        changeNumberOfAdults(prev => prev + 1);
    }

    function decreaseAdults() {
        changeNumberOfAdults(prev => Math.max(1, prev - 1));
    }

    const [numberOfTeens, changeNumberOfTeens] = React.useState(0)

    function increaseTeens() {
        changeNumberOfTeens(prev => prev + 1);
    }

    function decreaseTeens() {
        changeNumberOfTeens(prev => Math.max(0, prev - 1));
    }

    const [numberOfChildren, changeNumberOfChildren] = React.useState(0)

    function increaseChildren() {
        changeNumberOfChildren(prev => prev + 1);
    }

    function decreaseChildren() {
        changeNumberOfChildren(prev => Math.max(0, prev - 1));
    }

    return (
        <Box sx={{ display: "flex", overflow: 'auto', flexWrap: 'wrap', gap: 2, boxSizing: 'border-box', padding: 1 }}>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", p: 1 }}>
                <Box sx={{ display: "flex" }}>
                    <GroupsRoundedIcon sx={{ fontSize: 80 }}></GroupsRoundedIcon>
                    <Box sx={{ ml: 1, display: "flex", flexDirection: "column" }}>
                        <Typography variant="h4" sx={{ fontWeight: "bold" }}>Who's travelling?</Typography>
                        <Typography variant="subtitle1" color="textSecondary">Tell us who will be joining your trip. This helps us recommend the best activities and experience for your group.</Typography>
                    </Box>

                </Box>
                <Box sx={{ m: 1, width: "99%", alignItems: "flex-start", display: "flex", gap: 2 }}>
                    <Paper elevation={3} sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", p: 3 }}>
                        <Avatar sx={{ width: 75, height: 75 }}>
                            <PersonRoundedIcon sx={{ fontSize: 70 }}></PersonRoundedIcon>
                        </Avatar>
                        <Typography variant="h6" sx={{ mt: 0.7 }}>Adult (18+)</Typography>
                        <Typography variant="h3" sx={{ fontWeight: "bold" }}>{numberOfAdults}</Typography>
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Button disabled={numberOfAdults === 1} onClick={decreaseAdults} variant="contained"><Typography sx={{ fontWeight: "bold" }}>-</Typography></Button>
                            <Button onClick={increaseAdults} variant="contained"><Typography sx={{ fontWeight: "bold" }}>+</Typography></Button>
                        </Box>
                    </Paper>
                    <Paper elevation={3} sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", p: 3 }}>
                        <Avatar sx={{ width: 75, height: 75, bgcolor: blue[300] }}>
                            <PersonRoundedIcon sx={{ fontSize: 70 }}></PersonRoundedIcon>
                        </Avatar>
                        <Typography variant="h6" sx={{ mt: 0.7 }}>Teens (12 - 18)</Typography>
                        <Typography variant="h3" sx={{ fontWeight: "bold" }}>{numberOfTeens}</Typography>
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Button disabled={numberOfTeens === 0} onClick={decreaseTeens} variant="contained"><Typography sx={{ fontWeight: "bold" }}>-</Typography></Button>
                            <Button onClick={increaseTeens} variant="contained"><Typography sx={{ fontWeight: "bold" }}>+</Typography></Button>
                        </Box>
                    </Paper>
                    <Paper elevation={3} sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", p: 3 }}>
                        <Avatar sx={{ width: 75, height: 75, bgcolor: green[300] }}>
                            <PersonRoundedIcon sx={{ fontSize: 70 }}></PersonRoundedIcon>
                        </Avatar>
                        <Typography variant="h6" sx={{ mt: 0.7 }}>Children (0 - 18)</Typography>
                        <Typography variant="h3" sx={{ fontWeight: "bold" }}>{numberOfChildren}</Typography>
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Button disabled={numberOfChildren === 0} onClick={decreaseChildren} variant="contained"><Typography sx={{ fontWeight: "bold" }}>-</Typography></Button>
                            <Button onClick={increaseChildren} variant="contained"><Typography sx={{ fontWeight: "bold" }}>+</Typography></Button>
                        </Box>
                    </Paper>
                </Box>

            </Box>
        </Box>
    )
}
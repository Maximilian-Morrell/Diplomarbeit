import { Box, Divider, Paper, Stack, TextField, Typography } from "@mui/material";

export default function MainAccount() {

    return (
        <Box>
            <Typography variant="h3" sx={{ fontWeight: "bolder", mb: 2 }}>Account Settings</Typography>

            <Box sx={{ gap: 2, display: "flex", flexDirection: "column" }}>
                <Paper elevation={3} sx={{ p: 0.5 }}>
                    <Stack
                        direction="column"
                        useFlexGap

                        sx={{ flexWrap: "wrap", padding: 1, gap: 1 }}>
                        <Typography variant="subtitle1">Personal Information</Typography>
                        <TextField label="First Name" variant="standard"></TextField>
                        <TextField label="Last Name" variant="standard"></TextField>
                        <TextField label="Username" variant="standard"></TextField>
                        <TextField label="About Me" variant="standard" multiline minRows={2}></TextField>
                    </Stack>
                </Paper>
                <Paper elevation={3} sx={{ p: 0.5 }}>
                    <Stack
                        direction="column"
                        useFlexGap

                        sx={{ flexWrap: "wrap", padding: 1, gap: 1 }}>
                        <Typography variant="subtitle1">Contact Information</Typography>
                        <TextField label="E-Mail" variant="standard"></TextField>
                        <TextField label="Phone" variant="standard"></TextField>
                        <TextField label="Address" variant="standard"></TextField>
                    </Stack>
                </Paper>
            </Box>
        </Box>
    )
}
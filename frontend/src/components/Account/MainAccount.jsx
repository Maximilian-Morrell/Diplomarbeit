import { Box, Button, Divider, Paper, Stack, TextField, Typography } from "@mui/material";
import { useAuth } from "../../AuthContext";



export default function MainAccount() {
    const { user } = useAuth();

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
                        <TextField label="First Name" variant="outlined" value={user.firstName} ></TextField>
                        <TextField label="Last Name" variant="outlined" value={user.lastName}></TextField>
                        <TextField label="Username" variant="outlined" value={user.username}></TextField>
                        <Box sx={{gap: 1, display: "flex", flexDirection: "row", alignItems: "flex-start"}}>
                            <TextField fullWidth error={!user.emailVerified} label="E-Mail" type="email" variant="outlined" value={user.email} helperText={!user.emailVerified ? "Please verify your E-Mail, to unlock your full account!" : ""}></TextField>
                            {!user.emailVerified ? (
                                <Button  sx={{ height: 56, flexShrink: 0 }} variant="contained">Send new Verification E-Mail</Button>
                            ) : null}
                        </Box>

                        <TextField label="About Me" variant="outlined" multiline minRows={2} value={user.bio}></TextField>
                    </Stack>
                </Paper>
                <Paper elevation={3} sx={{ p: 0.5 }}>
                    <Stack
                        direction="column"
                        useFlexGap

                        sx={{ flexWrap: "wrap", padding: 1, gap: 1 }}>
                        <Typography variant="subtitle1">Security</Typography>
                        <TextField label="Change Password" variant="outlined" value={user.password}></TextField>
                        <Button variant="contained">Enable 2FA</Button>

                    </Stack>
                </Paper>
            </Box>
        </Box>
    )
}
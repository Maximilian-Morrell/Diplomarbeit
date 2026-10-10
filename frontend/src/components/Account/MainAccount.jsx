import { useEffect, useState } from "react";
import { Box, Button, Paper, Stack, TextField, Typography, Alert, Snackbar, Divider, Chip } from "@mui/material";
import { useAuth } from "../../AuthContext";

export default function MainAccount() {
    const { user, setUser } = useAuth();

    const [formData, setFormData] = useState({ firstName: "", lastName: "", username: "", email: "", bio: "", birthDay: "" });
    const [saving, setSaving] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    const [passwordSaving, setPasswordSaving] = useState(false);

    useEffect(() => {
        if (!user) return;
        setFormData({ firstName: user.firstName ?? "", lastName: user.lastName ?? "", username: user.username ?? "", email: user.email ?? "", bio: user.bio ?? "", birthDay: user.birthDay ?? "" });
    }, [user]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((previous) => ({ ...previous, [name]: value }));
    };

    const handlePasswordChange = (event) => {
        const { name, value } = event.target;
        setPasswordData((previous) => ({ ...previous, [name]: value }));
    };

    const updateUserHandler = async () => {
        try {
            setSaving(true);
            const data = await updateUser(formData.firstName, formData.lastName, formData.username, formData.email, formData.bio, formData.birthDay);
            setUser(data.user);
            setSnackbar({ open: true, message: data.message || "Account updated successfully.", severity: "success" });
        } catch (error) {
            setSnackbar({ open: true, message: error.message || "Something went wrong.", severity: "error" });
        } finally {
            setSaving(false);
        }
    };

    const changePasswordHandler = async () => {
        if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
            setSnackbar({ open: true, message: "Please fill in all password fields.", severity: "error" });
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setSnackbar({ open: true, message: "The new passwords do not match.", severity: "error" });
            return;
        }

        if (passwordData.newPassword.length < 1) {
            setSnackbar({ open: true, message: "The new password must be at least 1 character.", severity: "error" });
            return;
        }

        try {
            setPasswordSaving(true);
            const data = await changePassword(passwordData.currentPassword, passwordData.newPassword);
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
            setSnackbar({ open: true, message: data.message || "Password changed successfully.", severity: "success" });
        } catch (error) {
            setSnackbar({ open: true, message: error.message || "Something went wrong.", severity: "error" });
        } finally {
            setPasswordSaving(false);
        }
    };

    if (!user) return <Typography>Loading account...</Typography>;

    return (
        <Box>
            <Typography variant="h4" sx={{ fontWeight: "bolder", mb: 1 }}>Account Settings</Typography>
            <Box sx={{ gap: 2, display: "flex", flexDirection: "column" }}>
                <Paper elevation={3} sx={{ m: 0.5, p: 0.5 }}>
                    <Stack direction="column" useFlexGap sx={{ p: 1, gap: 1}}>
                        <Typography variant="subtitle1">Personal Information</Typography>
                        <TextField name="firstName" label="First Name" value={formData.firstName} onChange={handleChange} />
                        <TextField name="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} />
                        <TextField name="username" label="Username" value={formData.username} onChange={handleChange} />
                        <Box sx={{ gap: 1, display: "flex", flexDirection: "row", alignItems: "flex-start" }}>
                            <TextField fullWidth name="email" type="email" label="E-Mail" value={formData.email} onChange={handleChange} error={!user.emailVerified} helperText={!user.emailVerified ? "Please verify your email to unlock your full account." : ""} />
                            {!user.emailVerified && <Button sx={{ height: 56, flexShrink: 0 }} variant="contained">Send new Verification E-Mail</Button>}
                        </Box>
                        <TextField type="date" name="birthDay" value={formData.birthDay} onChange={handleChange} />
                        <TextField name="bio" label="About Me" multiline minRows={2} value={formData.bio} onChange={handleChange} />
                        <Button>Upload Profile Picture</Button>
                        <Divider textAlign="left">Security</Divider>
                        <TextField type="password" name="currentPassword" label="Current password" autoComplete="current-password" value={passwordData.currentPassword} onChange={handlePasswordChange} />
                        <TextField type="password" name="newPassword" label="New password" autoComplete="new-password" value={passwordData.newPassword} onChange={handlePasswordChange} />
                        <TextField type="password" name="confirmPassword" label="Confirm new password" autoComplete="new-password" value={passwordData.confirmPassword} onChange={handlePasswordChange} />
                        <Button fullWidth variant="contained" onClick={changePasswordHandler} disabled={passwordSaving}>{passwordSaving ? "Changing Password..." : "Change Password"}</Button>
                        <Button fullWidth variant="contained" disabled>Enable 2FA</Button>
                    </Stack>
                </Paper>
            </Box>
            <Button fullWidth sx={{mt: 1}} variant="contained" onClick={updateUserHandler} disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button>
            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar((previous) => ({ ...previous, open: false }))} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
                <Alert severity={snackbar.severity} variant="filled" onClose={() => setSnackbar((previous) => ({ ...previous, open: false }))}>{snackbar.message}</Alert>
            </Snackbar>
        </Box>
    );
}
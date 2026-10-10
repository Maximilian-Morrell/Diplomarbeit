import * as React from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from "@mui/material";

import { logIn, signUp } from "../../API/apiClient";
import { useAuth } from "../../AuthContext";

export default function AuthDialog({ open, onClose }) {
    const [mode, setMode] = React.useState(null);

    const { login } = useAuth();

    const [formData, setFormData] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        birthDay: "",
        username: "",
        password: "",
    });

    const handleChange = (field) => (event) => {
        setFormData((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    const reset = () => {
        setMode(null);
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            birthDay: "",
            username: "",
            password: "",
        });
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    const handleSubmit = async () => {
        if (mode === "signup") {
            try {
                console.log("[AuthDialog] Signing up...");

                const result = await signUp(
                    formData.firstName,
                    formData.lastName,
                    formData.email,
                    formData.birthDay,
                    formData.username,
                    formData.password
                );

                console.log(
                    "[AuthDialog] Sign up successful:",
                    result
                );

                login(result.token);

                console.log(
                    "[AuthDialog] Token passed to AuthContext"
                );

                handleClose();

            } catch (error) {
                console.error(
                    "[AuthDialog] Sign up failed:",
                    error
                );
            }
        }

        if (mode === "login") {
            try {
                console.log("[AuthDialog] Logging in...");

                const result = await logIn(
                    formData.email,
                    formData.password
                );

                console.log(
                    "[AuthDialog] Login successful:",
                    result
                );

                login(result.token);

                console.log(
                    "[AuthDialog] Token passed to AuthContext"
                );

                handleClose();

            } catch (error) {
                console.error(
                    "[AuthDialog] Login failed:",
                    error
                );
            }
        }
    };


    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                {mode === "signup"
                    ? "Create account"
                    : mode === "login"
                        ? "Log in"
                        : "Welcome"}
            </DialogTitle>

            <DialogContent>
                {!mode ? (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            pt: 1,
                        }}
                    >
                        <Typography>
                            Choose how you want to continue.
                        </Typography>

                        <Button
                            variant="contained"
                            fullWidth
                            onClick={() => setMode("login")}
                        >
                            Log in
                        </Button>

                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => setMode("signup")}
                        >
                            Sign up
                        </Button>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            pt: 1,
                        }}
                    >
                        {mode === "signup" ? (
                            <>
                                <Typography>Sign Up</Typography>

                                <TextField
                                    fullWidth
                                    label="First Name"
                                    type="text"
                                    value={formData.firstName}
                                    variant="outlined"
                                    onChange={handleChange("firstName")}
                                    autoComplete="firstName"
                                />

                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    type="text"
                                    value={formData.lastName}
                                    variant="outlined"
                                    onChange={handleChange("lastName")}
                                    autoComplete="lastName"
                                />

                                <TextField
                                    fullWidth
                                    label="E-Mail"
                                    type="email"
                                    value={formData.email}
                                    variant="outlined"
                                    onChange={handleChange("email")}
                                    autoComplete="email"
                                />

                                <TextField
                                    fullWidth
                                    label="Username"
                                    type="text"
                                    value={formData.username}
                                    variant="outlined"
                                    onChange={handleChange("username")}
                                    autoComplete="username"
                                />

                                <TextField
                                    fullWidth
                                    label="Birthday"
                                    type="date"
                                    value={formData.birthDay}
                                    variant="outlined"
                                    onChange={handleChange("birthDay")}
                                    autoComplete="birthDay"
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    value={formData.password}
                                    variant="outlined"
                                    onChange={handleChange("password")}
                                    autoComplete="new-password"
                                />


                            </>
                        ) : (
                            <>
                                <Typography>Login</Typography>

                                <TextField
                                    fullWidth
                                    label="E-Mail"
                                    type="text"
                                    value={formData.email}
                                    variant="outlined"
                                    onChange={handleChange("email")}
                                    autoComplete="email"
                                />

                                <TextField
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    value={formData.password}
                                    variant="outlined"
                                    onChange={handleChange("password")}
                                    autoComplete="current-password"
                                />
                            </>
                        )}

                    </Box>
                )}
            </DialogContent>

            {mode && (
                <DialogActions
                    sx={{
                        justifyContent: "space-between",
                        px: 3,
                        pb: 2,
                    }}
                >
                    <Button onClick={() => setMode(null)}>
                        Back
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        {mode === "login"
                            ? "Log in"
                            : "Sign up"}
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
}
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import * as React from 'react'

const steps = ['Select a location', 'Select a type of trip', 'Select specifi disires']

export default function CreateTrip() {

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<>());
    return (
        <Paper sx={{ width: 1000, height: 1000 }}>
            <Typography variant='h2' sx={{ textAlign: 'center' }}>New Trip</Typography>

        </Paper>
    )
}
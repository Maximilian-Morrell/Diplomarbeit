import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import * as React from 'react'
import PropTypes from 'prop-types';
import Box from "@mui/material/Box";
import { flex, maxHeight } from "@mui/system";
import Button from "@mui/material/Button";
import CT_Two from "./CTPages/CT_Two";
import CT_One from "./CTPages/CT_One";
import CT_Three from "./CTPages/CT_Three";
import CT_Four from "./CTPages/CT_Four";

const steps = ['Select a City', 'Select a type of trip', 'Select specifi disires', "Finalise"]

export default function CreateTrip(props) {

    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = React.useCallback((step) => {
        return step === 2;
    }, []);

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // Check if someone is trying to skip a nonskippable step
            throw new Error("You can't skip this step")
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    }

    const handleReset = () => {
        setActiveStep(0);
    }


    return (
        <Dialog onClose={handleClose} open={open} sx={{
            '& .MuiDialog-paper': {
                width: '90vw',
                height: '90vh',
                maxWidth: '90vw',
                maxHeight: '90vh',
                margin: 0,
            },
        }}>
            <DialogTitle>New Trip</DialogTitle>
            <Box sx={{ flex: 1, m: 1, display: 'flex', flexDirection: 'column' }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepOptional(index)) {
                            labelProps.optional = (
                                <Typography variant="caption">Optional</Typography>
                            );
                        }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>
                                Reset
                            </Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Box sx={{ ml: 3, mt: 1, mr: 3, flex: 1, p: '1vh'}}>
                            {activeStep === 0 ? (

                                <CT_One></CT_One>

                            ) : activeStep === 1 ? (
                                <CT_Two></CT_Two>
                            ) : activeStep === 2 ? (
                                <CT_Three></CT_Three>
                            ) : (
                                <CT_Four></CT_Four>
                            )}
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {isStepOptional(activeStep) && (
                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                    Skip
                                </Button>
                            )}
                            <Button onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>

        </Dialog>
    )
}


CreateTrip.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};
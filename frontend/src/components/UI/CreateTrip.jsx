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
import CT_Two from "./CTPages/CT_Travellers";
import CT_One from "./CTPages/CT_City";
import CT_Three from "./CTPages/CT_Dates";
import CT_Four from "./CTPages/CT_Types";
import { getCities, getIntersts, getTypes } from "../../API/ApiClient";
import CT_City from "./CTPages/CT_City";
import CT_Travellers from "./CTPages/CT_Travellers";
import CT_Dates from "./CTPages/CT_Dates";
import CT_Type from "./CTPages/CT_Types";
import CT_Activites from "./CTPages/CT_Activities";
import CT_Finalise from "./CTPages/CT_Finalise";
import dayjs from 'dayjs';


const steps = ['Select a City', "Travellers", "Dates", 'Trip Types', 'Activity Types', "Finalise"]

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
        return step === 4;
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

    const [selectedCity, setSelectedCity] = React.useState(-1);
    const [cities, setCities] = React.useState([]);

    React.useEffect(() => {
        getCities().then((data) => {
            setCities(data)
            console.log(data)
        });
    }, []);

    const [numberOfAdults, changeNumberOfAdults] = React.useState(1)
    const [numberOfTeens, changeNumberOfTeens] = React.useState(0)
    const [numberOfChildren, changeNumberOfChildren] = React.useState(0)

    const [arrivalDate, setArrivalDate] = React.useState(dayjs());
    const [depatureDate, setDepatureDate] = React.useState(dayjs().add(1, "day"));

    const [types, setTypes] = React.useState([])
    const [selectedTypes, setSelectedTypes] = React.useState([])

    const [activites, setActivities] = React.useState([]);
    const [selectedActivites, setSelectedActivites] = React.useState([])

    const loadActivites = async () => {
        try {
            setActivities(await getIntersts())
        } catch (error) {
            console.error(error)
        }
    }

    const loadTypes = async () => {
        try {
            setTypes(await getTypes())
        } catch(err) {
            console.error(err);
        }
    }

    React.useEffect(() => {
        loadTypes();
        loadActivites();
    }, [])

    return (
        <Dialog
            onClose={handleClose}
            open={open}
            sx={{
                '& .MuiDialog-paper': {
                    width: '97vw',
                    height: '97vh',
                    maxWidth: '97vw',
                    maxHeight: '97vh',
                    margin: 0,
                    overflow: 'hidden',
                },
            }}

        >
            <DialogTitle sx={{ flexShrink: 0 }}>
                New Trip
            </DialogTitle>

            <Box
                sx={{
                    flex: 1,
                    minHeight: 0,
                    m: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}

            >
                {/* Stepper - always visible */}
                <Box sx={{ flexShrink: 0 }}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};

                            if (isStepOptional(index)) {
                                labelProps.optional = (
                                    <Typography variant="caption">
                                        Optional
                                    </Typography>
                                );
                            }

                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }

                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>
                                        {label}{index === 0 && selectedCity !== null && selectedCity !== undefined ? ": " + cities[selectedCity]?.name : ""}
                                    </StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                </Box>

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
                    <React.Fragment
                        style={{
                            minHeight: 0,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {/* ONLY THIS AREA SCROLLS */}
                        <Box
                            sx={{
                                ml: 3,
                                mt: 1,
                                mr: 3,
                                p: 1,
                                flex: 1,
                                minHeight: 0,
                                overflowY: 'auto',
                            }}
                        >
                            {activeStep === 0 ? (
                                <CT_City
                                    selectedCity={selectedCity}
                                    setSelectedCity={setSelectedCity}
                                    cities={cities}
                                />
                            ) : activeStep === 1 ? (
                                <CT_Travellers
                                    numberOfAdults={numberOfAdults}
                                    changeNumberOfAdults={changeNumberOfAdults}
                                    numberOfTeens={numberOfTeens}
                                    changeNumberOfTeens={changeNumberOfTeens}
                                    numberOfChildren={numberOfChildren}
                                    changeNumberOfChildren={changeNumberOfChildren}
                                />
                            ) : activeStep === 2 ? (
                                <CT_Dates 
                                city={cities[selectedCity]?.name} 
                                arrivalDate={arrivalDate}
                                setArrivalDate={setArrivalDate}
                                depatureDate={depatureDate}
                                setDepatureDate={setDepatureDate}
                                />
                            ) : activeStep === 3 ? (
                                <CT_Type
                                    types={types}
                                    selectedTypes={selectedTypes}
                                    setSelectedTypes={setSelectedTypes}
                                />
                            ) : activeStep === 4 ? (
                                <CT_Activites 
                                    activities={activites}
                                    selectedActivites={selectedActivites}
                                    setSelectedInterests={setSelectedActivites}
                                />
                            ) : (
                                <CT_Finalise
                                    city={cities[selectedCity]}
                                    numberOfAdults={numberOfAdults}
                                    numberOfTeens={numberOfTeens}
                                    numberOfChildren={numberOfChildren}
                                    arrivalDate={arrivalDate}
                                    depatureDate={depatureDate}
                                    selectedTypes={selectedTypes}
                                    types={types}
                                    activities={activites}
                                    selectedActivites={selectedActivites}
                                />
                            )}
                        </Box>

                        {/* Buttons - always visible */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                pt: 2,
                                flexShrink: 0,
                            }}
                        >
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
                                <Button
                                    color="inherit"
                                    onClick={handleSkip}
                                    sx={{ mr: 1 }}
                                >
                                    Skip
                                </Button>
                            )}

                            <Button onClick={handleNext}>
                                {activeStep === steps.length - 1
                                    ? 'Finish'
                                    : 'Next'}
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
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import CityCard from "../Cards/CityCard";
import { Avatar, Card, Divider, Paper } from "@mui/material";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { blue, green } from "@mui/material/colors";
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';
import FlightLandRoundedIcon from '@mui/icons-material/FlightLandRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';
import AttractionsRoundedIcon from '@mui/icons-material/AttractionsRounded';
import dayjs from 'dayjs';

export default function CT_Finalise(props) {

    const { city, numberOfAdults, numberOfTeens, numberOfChildren, depatureDate, arrivalDate, selectedTypes, types, selectedActivites, activities } = props;

    console.log(activities)

    return (
        <Box sx={{ display: "flex", overflow: 'auto', flexWrap: 'wrap', gap: 2, boxSizing: 'border-box', padding: 1 }}>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", p: 1 }}>
                <Box sx={{ display: "flex" }}>
                    <AssignmentTurnedInRoundedIcon sx={{ fontSize: 80 }}></AssignmentTurnedInRoundedIcon>
                    <Box sx={{ ml: 1, display: "flex", flexDirection: "column" }}>
                        <Typography variant="h4" sx={{ fontWeight: "bold" }}>Is that correct?</Typography>
                        <Typography variant="subtitle1" color="textSecondary">Check one final time if all the information is correct, before generating a trip.</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", m: 1, gap: 2 }}>
                    <CityCard sx={{ flex: 1 }} city={city}></CityCard>
                    <Box sx={{ display: "flex", flexDirection: "column", flex: 1, gap: 2 }}>
                        <Box sx={{ flex: 1, display: "flex", gap: 2 }}>
                            <Paper elevation={1} sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", p: 3 }}>
                                <Avatar sx={{ width: 75, height: 75 }}>
                                    <PersonRoundedIcon sx={{ fontSize: 70 }}></PersonRoundedIcon>
                                </Avatar>
                                <Typography variant="h6" sx={{ mt: 0.7 }}>Adult (18+)</Typography>
                                <Typography variant="h3" sx={{ fontWeight: "bold" }}>{numberOfAdults}</Typography>
                            </Paper>
                            <Paper elevation={1} sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", p: 3 }}>
                                <Avatar sx={{ width: 75, height: 75, bgcolor: blue[300] }}>
                                    <PersonRoundedIcon sx={{ fontSize: 70 }}></PersonRoundedIcon>
                                </Avatar>
                                <Typography variant="h6" sx={{ mt: 0.7 }}>Teens (12 - 18)</Typography>
                                <Typography variant="h3" sx={{ fontWeight: "bold" }}>{numberOfTeens}</Typography>
                            </Paper>
                            <Paper elevation={1} sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", p: 3 }}>
                                <Avatar sx={{ width: 75, height: 75, bgcolor: green[300] }}>
                                    <PersonRoundedIcon sx={{ fontSize: 70 }}></PersonRoundedIcon>
                                </Avatar>
                                <Typography variant="h6" sx={{ mt: 0.7 }}>Children (0 - 18)</Typography>
                                <Typography variant="h3" sx={{ fontWeight: "bold" }}>{numberOfChildren}</Typography>
                            </Paper>
                        </Box>
                        <Paper sx={{ display: "flex", flex: 1, justifyContent: "center" }}>
                            <Box sx={{ display: "flex", flex: 1, justifyContent: "center" }}>
                                <Box sx={{ display: "flex", flexDirection: "column", flex: 1, alignItems: "center", justifyContent: "center" }}>
                                    <FlightTakeoffRoundedIcon sx={{ fontSize: 60 }}></FlightTakeoffRoundedIcon>
                                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>{dayjs(arrivalDate).format("DD.MM.YYYY")}</Typography>
                                </Box>
                                <Divider orientation="vertical"></Divider>
                                <Box sx={{ display: "flex", flexDirection: "column", flex: 1, alignItems: "center", justifyContent: "center" }}>
                                    <FlightLandRoundedIcon sx={{ fontSize: 60 }}></FlightLandRoundedIcon>
                                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>{dayjs(depatureDate).format("DD.MM.YYYY")}</Typography>
                                </Box>
                                <Divider orientation="vertical"></Divider>
                                <Box sx={{ display: "flex", flexDirection: "column", flex: 1, alignItems: "center", justifyContent: "center" }}>
                                    <LightModeRoundedIcon sx={{ fontSize: 60 }}></LightModeRoundedIcon>
                                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>{(depatureDate - arrivalDate) / (1000 * 3600 * 24)} {(depatureDate - arrivalDate) / (1000 * 3600 * 24) > 1 ? "Days" : "Day"}</Typography>
                                </Box>
                            </Box>
                        </Paper>
                        <Box sx={{ display: "flex", flex: 1, gap: 2 }}>
                            <Paper sx={{ flex: 1, display: "flex", flexDirection: "column", p: 1 }}>
                                <Box sx={{ display: "flex" }}>
                                    <ChecklistRoundedIcon sx={{ fontSize: 32 }}></ChecklistRoundedIcon>
                                    <Typography variant="h6" sx={{fontWeight: "bold"}}>Trip types</Typography>
                                </Box>
                                <Box sx={{ flex: 1, display: "flex", flexDirection: "column", ml: 2 }}>
                                    {selectedTypes.map(id => (
                                        <Typography> - {types.find(t => t.id == id).name}</Typography>
                                    ))}
                                </Box>
                            </Paper>
                            <Paper sx={{ flex: 1, display: "flex", flexDirection: "column", p: 1 }}>
                                <Box sx={{ display: "flex" }}>
                                    <AttractionsRoundedIcon sx={{ fontSize: 32 }}></AttractionsRoundedIcon>
                                    <Typography variant="h6" sx={{fontWeight: "bold"}}>Activity types</Typography>
                                </Box>
                                <Box sx={{ flex: 1, display: "flex", flexDirection: "column", ml: 2 }}>
                                    {selectedActivites.map(id => (
                                        <Typography> - {activities.find(t => t.id == id).name}</Typography>
                                    ))}
                                </Box>
                            </Paper>
                        </Box>

                    </Box>

                </Box>
            </Box>
        </Box>
    )
}
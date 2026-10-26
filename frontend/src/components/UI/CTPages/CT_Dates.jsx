import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import React from "react";

export default function CT_Dates(props) {

    const { city, arrivalDate, setArrivalDate, depatureDate, setDepatureDate } = props;


    const [stay, setStay] = React.useState(1);

    function changeArrival(newDate) {
        setArrivalDate(newDate);
        if (newDate >= depatureDate) {
            setDepatureDate(dayjs(newDate).add(1, "day"))
        }

        setStay((depatureDate - newDate) / (1000 * 3600 * 24))
    }

    function changeDepature(newDate) {
        setDepatureDate(newDate);
        setStay((newDate - arrivalDate) / (1000 * 3600 * 24))
    }

    return (
        <Box sx={{ display: "flex", overflow: 'auto', flexWrap: 'wrap', gap: 2, boxSizing: 'border-box', padding: 1 }}>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", p: 1 }}>
                <Box sx={{ display: "flex" }}>
                    <CalendarMonthRoundedIcon sx={{ fontSize: 80 }}></CalendarMonthRoundedIcon>
                    <Box sx={{ ml: 1, display: "flex", flexDirection: "column" }}>
                        <Typography variant="h4" sx={{ fontWeight: "bold" }}>When are you planing to go?</Typography>
                        <Typography variant="subtitle1" color="textSecondary">Tell us when you are planing to go to {city}. This way we can adjust our recommendation to fit the time of year you want to be there.</Typography>
                    </Box>

                </Box>
                <Box sx={{ pt: 3, m: 1, width: "99%", alignItems: "flex-start", display: "flex", gap: 2 }}>

                    <DatePicker label="Arrival" sx={{ flex: 1 }} disablePast value={arrivalDate} onChange={changeArrival}></DatePicker>
                    <DatePicker label="Depature" sx={{ flex: 1 }} disablePast minDate={arrivalDate.add(1, "day")} value={depatureDate} onChange={changeDepature}></DatePicker>
                </Box>
                <Typography color="textSecondary" sx={{ textAlign: "end", pr: 2 }}>Current stay: {stay} {stay > 1 ? "Days" : "Day"}</Typography>
            </Box>
        </Box>
    )
}
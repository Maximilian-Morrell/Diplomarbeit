import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { DatePicker } from "@mui/x-date-pickers";

export default function CT_Three(props) {

    const { city } = props;

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
                    <DatePicker label="Arrival" sx={{ flex: 1 }}></DatePicker>
                    <DatePicker label="Depature" sx={{ flex: 1 }}></DatePicker>
                </Box>
            </Box>
        </Box>
    )
}
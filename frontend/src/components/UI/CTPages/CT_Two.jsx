import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NumberSpinner from "../../../Components/UI/NumberSpinner";

export default function CT_Two() {
    return (
        <Box sx={{ display: "flex", overflow: 'auto', flexWrap: 'wrap', gap: 2, boxSizing: 'border-box', padding: 1 }}>
            <NumberSpinner size="small" label="Adults (18+)" min={1}></NumberSpinner>
            <NumberSpinner size="small" label="Teens (12-18)" min={0}></NumberSpinner>
            <NumberSpinner size="small" label="Children (0-12)" min={0}></NumberSpinner>
        </Box>
    )
}
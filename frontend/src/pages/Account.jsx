import { Box } from "@mui/material";
import MainAccount from "../Components/Account/MainAccount";

export default function Account() {
    return (
        <Box sx={{margin: 1, flex: 1, minHeight: 0, overflow: "hidden"}}>
            <MainAccount></MainAccount>
        </Box>
    )
}
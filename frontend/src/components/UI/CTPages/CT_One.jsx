import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MultiSelect from "../MultiSelect";
import * as React from 'react'
import CityCard from "../CityCard";

export default function CT_One() {
    const Cities = [
        'Kitzbühel',
        'Kufstein',
        'Tux',
    ]


    const [selectedCities, setSelectedCities] = React.useState([]);

    return (
        <Box sx={{ display: "flex", overflow: 'auto', flexWrap: 'wrap', justifyContent: 'space-evenly', gap: 2, boxSizing: 'border-box' }}>
            <CityCard></CityCard><CityCard></CityCard><CityCard></CityCard><CityCard></CityCard><CityCard></CityCard><CityCard></CityCard><CityCard></CityCard><CityCard></CityCard><CityCard></CityCard><CityCard></CityCard><CityCard></CityCard><CityCard></CityCard>
            <CityCard></CityCard><CityCard></CityCard><CityCard></CityCard><CityCard></CityCard><CityCard></CityCard><CityCard></CityCard><CityCard></CityCard><CityCard></CityCard><CityCard></CityCard><CityCard></CityCard><CityCard></CityCard><CityCard></CityCard>

        </Box>
    )
}
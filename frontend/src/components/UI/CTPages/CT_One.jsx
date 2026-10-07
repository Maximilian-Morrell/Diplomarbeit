import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MultiSelect from "../MultiSelect";
import * as React from 'react'
import CityCard from "../CityCard";
import CardActionArea from "@mui/material/CardActionArea";

export default function CT_One({ selectedCity, setSelectedCity, cities }) {


    return (
        <Box sx={{ display: "flex", overflow: 'auto', flexWrap: 'wrap', justifyContent: 'space-evenly', gap: 2, boxSizing: 'border-box', padding: 1 }}>
            {cities.map((city, index) => (
                <CityCard key={city.id} city={city} onClick={() => {
                    setSelectedCity(index);
                }} selectedCity={selectedCity} selected={selectedCity === index}></CityCard>
            ))}
        </Box>
    )
}
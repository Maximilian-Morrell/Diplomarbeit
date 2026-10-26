import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MultiSelect from "../MultiSelect";
import * as React from 'react'
import CityCard from "../Cards/CityCard"
import CardActionArea from "@mui/material/CardActionArea";
import { FormControl, Input, Paper, TextField } from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

export default function CT_City({ selectedCity, setSelectedCity, cities }) {


    return (
        <Box sx={{ height: "100%" }}>
            <Box sx={{ display: "flex", mb: 2 }}>
                <SearchRoundedIcon sx={{ fontSize: 80 }}></SearchRoundedIcon>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="h4" sx={{ fontWeight: "bold", p: 0, m: 0 }}>Where do you want to go?</Typography>
                    <Typography variant="h6"  color="textSecondary" sx={{ fontWeight: "normal" }}>Search for a city </Typography>
                </Box>
            </Box>
            <TextField variant="standard" sx={{ ml: 1, width: "100%" }} fullWidth label="City search" placeholder="Search for a city..." slotProps={{
                input: {
                    startAdornment: (
                        <SearchRoundedIcon></SearchRoundedIcon>
                    )
                }
            }}></TextField>
            <Typography variant="h6" sx={{ ml: 1, mt: 3 }}>Cities</Typography>
            <Box sx={{ display: "flex", overflow: 'auto', flexWrap: 'wrap', gap: 2, boxSizing: 'border-box', padding: 1 }}>
                {cities.map((city, index) => (
                    <CityCard key={city.id} city={city} isMini onClick={() => {
                        setSelectedCity(index);
                    }} selectedCity={selectedCity} selected={selectedCity === index}></CityCard>
                ))}
            </Box>
        </Box>

    )
}
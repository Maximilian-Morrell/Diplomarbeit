import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MultiSelect from "../MultiSelect";
import * as React from 'react'
import CityCard from "../Cards/CityCard"
import CardActionArea from "@mui/material/CardActionArea";
import { FormControl, Input, Paper, TextField } from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';

export default function CT_City({ selectedCity, setSelectedCity, cities }) {


    return (
        <Box sx={{ display: "flex", flex: 1, overflow: 'auto', gap: 2, boxSizing: 'border-box', padding: 1 }}>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", p: 1, gap: 3 }}>
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    <Box sx={{ display: "flex" }}>
                        <LocationCityRoundedIcon sx={{ fontSize: 80 }}></LocationCityRoundedIcon>
                        <Box sx={{ ml: 1, display: "flex", flexDirection: "column" }}>
                            <Typography variant="h4" sx={{ fontWeight: "bold" }}>Where do you want to go?</Typography>
                            <Typography variant="subtitle1" color="textSecondary">Search for a city or select one from the list below</Typography>
                        </Box>
                    </Box>
                    <TextField variant="standard" sx={{ ml: 1, width: "100%" }} fullWidth label="City search" placeholder="Search for a city..." slotProps={{
                        input: {
                            startAdornment: (
                                <SearchRoundedIcon></SearchRoundedIcon>
                            )
                        }
                    }}></TextField>
                </Box>

                <Box sx={{ m: 1, width: "99%", alignItems: "flex-start", display: "flex", gap: 2 }}>
                    <Box sx={{ display: "flex", overflow: 'auto', flexWrap: 'wrap', gap: 2, boxSizing: 'border-box', padding: 1 }}>
                        {cities.map((city, index) => (
                            <CityCard key={city.id} city={city} isMini onClick={() => {
                                setSelectedCity(index);
                            }} selectedCity={selectedCity} selected={selectedCity === index}></CityCard>
                        ))}
                    </Box>
                </Box>

            </Box>
        </Box>

    )
}
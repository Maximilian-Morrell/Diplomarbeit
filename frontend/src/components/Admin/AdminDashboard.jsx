
import * as React from "react";
import { useAuth } from "../../AuthContext";
import { Box, Button, Divider, Tab, Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TabPanel from "@mui/lab/TabPanel";
import List from "../UI/List";
import { getCities, getCountries } from "../../API/ApiClient";
import CityCard from "../UI/CityCard";
import CreateCityDialog from "./CreateCityDialog";
import CountryTable from "../UI/Admin/CountryTable";
import CreateCountryDialog from "./CreateCountryDialog";
import CityTable from "../UI/Admin/CityTable";

export default function AdminDashboard() {
    const [value, setValue] = React.useState("0");
    const [cities, setCities] = React.useState([]);
    const [countries, setCountries] = React.useState([]);
    const { user, hasPermission } = useAuth();
    const [CityOpen, setCityOpen] = React.useState(false);
    const [CountryOpen, setCountryOpen] = React.useState(false);

    const loadCities = async () => {
        try {
            setCities(await getCities());
        } catch (error) {
            console.error("Failed to load cities:", error);
        }
    };

    const loadCountries = async () => {
        try {
            setCountries(await getCountries(true));
        }
        catch (error) {
            console.error("Failed to load countries: ", error)
        }
    };

    React.useEffect(() => {
        loadCities();
        loadCountries();
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClickOpen = () => {
        if (value === "0") setCityOpen(true);
        if (value === "1") setCountryOpen(true);
    };

    const handleClose = () => {
        setCityOpen(false);
        setCountryOpen(false);
    };


    const handleCityCreated = async () => {
        await loadCities();
        setCityOpen(false);
    };

    const handleCountryCreated = async () => {
        await loadCountries();
        setCountryOpen(false);
    };

    const deletedCountry = async () => {
        await loadCountries();
    }

    const deleteCity = async () => {
        await loadCities();
    }

    const [selectedCountry, setSelectedCountry] = React.useState(null);
    const [selectedCity, setSelectedCity] = React.useState(null);

    return (
        <Box>
            <Typography variant="h1" sx={{ fontWeight: "700", fontSize: 60 }}>Admin Dashboard</Typography>
            <TabContext value={value}>
                <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                    <TabList onChange={handleChange} aria-label="tabs" sx={{ borderColor: "divider", flexGrow: 1 }}>
                        {hasPermission("PlacesAdmin") && <Tab label="Cities" value="0" />}
                        {hasPermission("PlacesAdmin") && <Tab label="Countries" value="1" />}
                        {hasPermission("PlacesAdmin") && <Tab label="Tags" value="2" />}
                        {hasPermission("UserAdmin") && <Tab label="Users" value="3" />}
                    </TabList>
                    <Button onClick={handleClickOpen} disabled={!user.emailVerified}>
                        <AddRoundedIcon />
                        <Typography>{value === "0" && selectedCity != null? "Edit City" : value === "0" ? "New City" : value === "1" && selectedCountry != null ? "Edit Country" : value === "1" ? "New Country" : value === "2" ? "New Tag" : "New User"}</Typography>
                    </Button>
                </Box>
                <Box>
                    <TabPanel value="0" tabIndex={0} sx={{ height: "750px", overflowY: "auto", boxSizing: "border-box" }}>
                        <CityTable cities={cities} currentCity={selectedCity} selectCity={setSelectedCity} deleteCity={deleteCity}></CityTable>
                    </TabPanel>
                    <TabPanel value="1" tabIndex={0} sx={{ height: "750px", overflowY: "auto", boxSizing: "border-box" }}>
                        <CountryTable countries={countries} currentCountry={selectedCountry} selectCountry={setSelectedCountry} deletedCountry={deletedCountry}></CountryTable>
                    </TabPanel>
                    <TabPanel value="3" tabIndex={0} sx={{ height: "750px", overflowY: "auto", boxSizing: "border-box" }}>
                        <List Type={2} />
                    </TabPanel>
                </Box>
            </TabContext>
            <CreateCityDialog open={CityOpen} onClose={handleClose} onCityCreated={handleCityCreated} city={selectedCity}/>
            <CreateCountryDialog open={CountryOpen} onClose={handleClose} onCountryCreated={handleCountryCreated} country={selectedCountry}/>
        </Box>
    );
}

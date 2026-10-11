
import * as React from "react";
import { useAuth } from "../../AuthContext";
import { Box, Button, Tab, Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TabPanel from "@mui/lab/TabPanel";
import List from "../UI/List";
import { getCities } from "../../API/apiClient";
import CityCard from "../UI/CityCard";
import CreateCityDialog from "./CreateCityDialog";

export default function AdminDashboard() {
    const [value, setValue] = React.useState("0");
    const [cities, setCities] = React.useState([]);
    const { user, hasPermission } = useAuth();
    const [CityOpen, setCityOpen] = React.useState(false);

    const loadCities = async () => {
        try {
            setCities(await getCities());
        } catch (error) {
            console.error("Failed to load cities:", error);
        }
    };

    React.useEffect(() => {
        loadCities();
    }, []);

    
    const handleDeleteCity = async (id) => {
        console.log(id)
    }

    const cityItems = cities.map((city) => <CityCard key={city.id} city={city} isAdmin={true} handleDelete={handleDeleteCity}/>);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClickOpen = () => {
        if (value === "0") setCityOpen(true);
    };

    const handleClose = () => {
        setCityOpen(false);
    };


    const handleCityCreated = async () => {
        await loadCities();
        setCityOpen(false);
    };

    return (
        <Box>
            <Typography variant="h1" sx={{ fontWeight: "700", fontSize: 60 }}>Admin Dashboard</Typography>
            <TabContext value={value}>
                <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                    <TabList onChange={handleChange} aria-label="tabs" sx={{ borderColor: "divider", flexGrow: 1 }}>
                        {hasPermission("CityAdmin") && <Tab label="Cities" value="0" />}
                        {hasPermission("UserAdmin") && <Tab label="Users" value="1" />}
                        {hasPermission("CountryAdmin") && <Tab label="Countries" value="2" />}
                    </TabList>
                    <Button onClick={handleClickOpen} disabled={!user.emailVerified}>
                        <AddRoundedIcon />
                        <Typography>{value === "0" ? "New City" : value === "1" ? "New User" : "New Country"}</Typography>
                    </Button>
                </Box>
                <Box>
                    <TabPanel value="0" tabIndex={0} sx={{ height: "750px", overflowY: "auto", boxSizing: "border-box" }}>
                        <List Type={0}>{cityItems}</List>
                    </TabPanel>
                    <TabPanel value="1" tabIndex={0} sx={{ height: "750px", overflowY: "auto", boxSizing: "border-box" }}>
                        <List Type={1} />
                    </TabPanel>
                    <TabPanel value="2" tabIndex={0} sx={{ height: "750px", overflowY: "auto", boxSizing: "border-box" }}>
                        <List Type={2} />
                    </TabPanel>
                </Box>
            </TabContext>
            <CreateCityDialog open={CityOpen} onClose={handleClose} onCityCreated={handleCityCreated} />
        </Box>
    );
}


import * as React from "react";
import { useAuth } from "../../AuthContext";
import { Box, Button, Divider, Skeleton, Tab, Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TabPanel from "@mui/lab/TabPanel";
import List from "../UI/List";
import { getCities, getCountries, getIntersts, getRegions, getTypes, getUsers } from "../../API/ApiClient";
import CreateCityDialog from "./CreateCityDialog";
import CountryTable from "../UI/Admin/CountryTable";
import CreateCountryDialog from "./CreateCountryDialog";
import CityTable from "../UI/Admin/CityTable";
import CreateRegionDialog from "./CreateRegionDialog";
import RegionTable from "../UI/Admin/RegionTable";
import CreateTagDialog from "./CreateTypeDialog";
import TagTable from "../UI/Admin/TypeTable";
import CreateTypeDialog from "./CreateTypeDialog";
import TypeTable from "../UI/Admin/TypeTable";
import InterestTable from "../UI/Admin/InterestTable";
import CreateInterestDialog from "./CreateInterstDialog";

export default function AdminDashboard() {
    const [value, setValue] = React.useState("0");
    const [cities, setCities] = React.useState([]);
    const [countries, setCountries] = React.useState([]);
    const [regions, setRegions] = React.useState([]);
    const [types, setTypes] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [interests, setInterests] = React.useState([]);
    const { user, hasPermission } = useAuth();
    const [CityOpen, setCityOpen] = React.useState(false);
    const [CountryOpen, setCountryOpen] = React.useState(false);
    const [RegionOpen, setRegionOpen] = React.useState(false);
    const [TypeOpen, setTypeOpen] = React.useState(false);
    const [UserOpen, setUserOpen] = React.useState(false);
    const [InterestOpen, setInterestOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    const loadData = async () => {
        try {
            setCities(await getCities());
            setCountries(await getCountries(true));
            setRegions(await getRegions(true));
            setTypes(await getTypes());
            setUsers(await getUsers())
            setInterests(await getIntersts())
            console.log(interests)
            return true;
        } catch (error) {
            console.error("Failed to load data:", error);
            return null;
        }
    };

    React.useEffect(() => {
        loadData().finally(() => etLoading(false));

    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClickOpen = () => {
        if (value === "0") setCountryOpen(true);
        if (value === "1") setRegionOpen(true);
        if (value === "3") setTypeOpen(true);
        if (value === "2") setCityOpen(true);
        if (value === "4") setUserOpen(true);
        if (value === "5") setInterestOpen(true);
    };

    const handleClose = () => {
        setCountryOpen(false);
        setRegionOpen(false);
        setTypeOpen(false);
        setCityOpen(false);
        setUserOpen(false);
        setInterestOpen(false);
    };

    const handleCreated = async () => {
        await loadData();
        handleClose();
    };

    const handleDelete = async () => {
        await loadData();
    }


    const [selectedCountry, setSelectedCountry] = React.useState(null);
    const [selectedRegion, setSelectedRegion] = React.useState(null);
    const [selectedType, setSelectedType] = React.useState(null);
    const [selectedCity, setSelectedCity] = React.useState(null);
    const [selectedUser, setSelectedUser] = React.useState(null);
    const [selectedInterest, setSelectedInterst] = React.useState(null);

    return (
        <Box>
            <Typography variant="h1" sx={{ fontWeight: "700", fontSize: 60 }}>Admin Dashboard</Typography>
            <TabContext value={value}>
                <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                    <TabList onChange={handleChange} aria-label="tabs" sx={{ borderColor: "divider", flexGrow: 1 }}>
                        {hasPermission("PlacesAdmin") && <Tab label="Countries" value="0" />}
                        {hasPermission("PlacesAdmin") && <Tab label="Regions" value="1" />}
                        {hasPermission("PlacesAdmin") && <Tab label="Cities" value="2" />}
                        {hasPermission("PlacesAdmin") && <Tab label="Types" value="3" />}
                        {hasPermission("UserAdmin") && <Tab label="Users" value="4" />}
                        {hasPermission("PlacesAdmin") && <Tab label="Interests" value="5" />}
                    </TabList>
                    <Button onClick={handleClickOpen} disabled={!user.emailVerified}>
                        <AddRoundedIcon />
                        <Typography>{
                            value === "0" && selectedCountry != null ? "Edit Country" : value === "0" ? "New Country" :
                                value === "1" && selectedRegion != null ? "Edit Region" : value === "1" ? "New Region" :
                                    value === "2" && selectedCity != null ? "Edit City" : value === "2" ? "New City" :
                                        value === "3" && selectedType != null ? "Edit Type" : value === "3" ? "New Type" :
                                            value === "4" && selectedUser != null ? "Edit User" : value === "4" ? "New User" :
                                                value === "5" && selectedInterest != null ? "Edit Interest" : "New Interest"
                        }</Typography>
                    </Button>
                </Box>
                <Box>
                    <TabPanel value="0" tabIndex={0} sx={{ height: "750px", overflowY: "auto", boxSizing: "border-box" }}>
                        <CountryTable countries={countries} currentCountry={selectedCountry} selectCountry={setSelectedCountry} deletedCountry={handleDelete}></CountryTable>
                    </TabPanel>
                    <TabPanel value="1" tabIndex={0} sx={{ height: "750px", overflowY: "auto", boxSizing: "border-box" }}>
                        <RegionTable regions={regions} currentRegion={selectedRegion} selectRegion={setSelectedRegion} deleteRegion={handleDelete}></RegionTable>
                    </TabPanel>
                    <TabPanel value="2" tabIndex={0} sx={{ height: "750px", overflowY: "auto", boxSizing: "border-box" }}>
                        <CityTable cities={cities} currentCity={selectedCity} selectCity={setSelectedCity} deleteCity={handleDelete}></CityTable>
                    </TabPanel>
                    <TabPanel value="3" tabIndex={0} sx={{ height: "750px", overflowY: "auto", boxSizing: "border-box" }}>
                        <TypeTable types={types} currentType={selectedType} selectType={setSelectedType} deleteType={handleDelete}></TypeTable>
                    </TabPanel>
                    <TabPanel value="4" tabIndex={0} sx={{ height: "750px", overflowY: "auto", boxSizing: "border-box" }}>
                        <Typography>Users</Typography>
                    </TabPanel>
                    <TabPanel value="5" tabIndex={0} sx={{ height: "750px", overflowY: "auto", boxSizing: "border-box" }}>
                        <InterestTable interests={interests} currentInterest={selectedInterest} selectInterest={setSelectedInterst} deleteInterest={handleDelete}></InterestTable>
                    </TabPanel>
                </Box>
            </TabContext>
            <CreateCityDialog open={CityOpen} onClose={handleClose} onCityCreated={handleCreated} city={selectedCity} />
            <CreateRegionDialog open={RegionOpen} onClose={handleClose} onRegionCreated={handleCreated} region={selectedRegion} />
            <CreateCountryDialog open={CountryOpen} onClose={handleClose} onCountryCreated={handleCreated} country={selectedCountry} />
            <CreateTypeDialog open={TypeOpen} onClose={handleClose} onTypeCreate={handleCreated} type={selectedType} />
            <CreateInterestDialog open={InterestOpen} onClose={handleClose} onInterestCreate={handleCreated} interest={selectedInterest} />
        </Box>
    );
}

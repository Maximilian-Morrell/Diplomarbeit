
import * as React from "react";
import { useAuth } from "../../AuthContext";
import { Box, Button, Divider, Tab, Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TabPanel from "@mui/lab/TabPanel";
import List from "../UI/List";
import { getCities, getCountries, getRegions, getTags, getUsers } from "../../API/ApiClient";
import CityCard from "../UI/CityCard";
import CreateCityDialog from "./CreateCityDialog";
import CountryTable from "../UI/Admin/CountryTable";
import CreateCountryDialog from "./CreateCountryDialog";
import CityTable from "../UI/Admin/CityTable";
import CreateRegionDialog from "./CreateRegionDialog";
import RegionTable from "../UI/Admin/RegionTable";
import CreateTagDialog from "./CreateTagDialog";
import TagTable from "../UI/Admin/TagTable";

export default function AdminDashboard() {
    const [value, setValue] = React.useState("0");
    const [cities, setCities] = React.useState([]);
    const [countries, setCountries] = React.useState([]);
    const [regions, setRegions] = React.useState([]);
    const [tags, setTags] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const { user, hasPermission } = useAuth();
    const [CityOpen, setCityOpen] = React.useState(false);
    const [CountryOpen, setCountryOpen] = React.useState(false);
    const [RegionOpen, setRegionOpen] = React.useState(false);
    const [TagOpen, setTagOpen] = React.useState(false);
    const [UserOpen, setUserOpen] = React.useState(false);

    const loadData = async () => {
        try {
            setCities(await getCities());
            setCountries(await getCountries(true));
            setRegions(await getRegions(true));
            setTags(await getTags());
            setUsers(await getUsers())
        } catch (error) {
            console.error("Failed to load data:", error);
        }
    };

    React.useEffect(() => {
        loadData();
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClickOpen = () => {
        if (value === "0") setCountryOpen(true);
        if (value === "1") setRegionOpen(true);
        if (value === "2") setTagOpen(true);
        if (value === "3") setCityOpen(true);
        if (value === "4") setUserOpen(true);
    };

    const handleClose = () => {
        setCountryOpen(false);
        setRegionOpen(false);
        setTagOpen(false);
        setCityOpen(false);
        setUserOpen(false);
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
    const [selectedTag, setSelectedTag] = React.useState(null);
    const [selectedCity, setSelectedCity] = React.useState(null);
    const [selectedUser, setSelectedUser] = React.useState(null);

    return (
        <Box>
            <Typography variant="h1" sx={{ fontWeight: "700", fontSize: 60 }}>Admin Dashboard</Typography>
            <TabContext value={value}>
                <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                    <TabList onChange={handleChange} aria-label="tabs" sx={{ borderColor: "divider", flexGrow: 1 }}>
                        {hasPermission("PlacesAdmin") && <Tab label="Countries" value="0" />}
                        {hasPermission("PlacesAdmin") && <Tab label="Regions" value="1" />}
                        {hasPermission("PlacesAdmin") && <Tab label="Tags" value="2" />}
                        {hasPermission("PlacesAdmin") && <Tab label="Cities" value="3" />}
                        {hasPermission("UserAdmin") && <Tab label="Users" value="4" />}
                    </TabList>
                    <Button onClick={handleClickOpen} disabled={!user.emailVerified}>
                        <AddRoundedIcon />
                        <Typography>{
                            value === "0" && selectedCountry != null ? "Edit Country" : value === "0" ? "New Country" :
                                value === "1" && selectedRegion != null ? "Edit Region" : value === "1" ? "New Region" :
                                    value === "2" && selectedTag != null ? "Edit Tag" : value === "2" ? "New Tag" :
                                        value === "3" && selectedCity != null ? "Edit City" : value === "3" ? "New City" :
                                            value === "4" && selectedUser != null ? "Edit User" : "New User"
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
                        <TagTable tags={tags} currentTag={selectedTag} selectTag={setSelectedTag} deleteTag={handleDelete}></TagTable>
                    </TabPanel>
                    <TabPanel value="3" tabIndex={0} sx={{ height: "750px", overflowY: "auto", boxSizing: "border-box" }}>
                        <CityTable cities={cities} currentCity={selectedCity} selectCity={setSelectedCity} deleteCity={handleDelete}></CityTable>
                    </TabPanel>
                    <TabPanel value="4" tabIndex={0} sx={{ height: "750px", overflowY: "auto", boxSizing: "border-box" }}>
                        <Typography>Users</Typography>
                    </TabPanel>
                </Box>
            </TabContext>
            <CreateCityDialog open={CityOpen} onClose={handleClose} onCityCreated={handleCreated} city={selectedCity} />
            <CreateRegionDialog open={RegionOpen} onClose={handleClose} onRegionCreated={handleCreated} region={selectedRegion} />
            <CreateCountryDialog open={CountryOpen} onClose={handleClose} onCountryCreated={handleCreated} country={selectedCountry} />
            <CreateTagDialog open={TagOpen} onClose={handleClose} onTagCreated={handleCreated} tag={selectedTag} />
        </Box>
    );
}

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import List from '../UI/List';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Button from '@mui/material/Button'
import Backdrop from '@mui/material/Backdrop';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import CreateTrip from '../UI/CreateTrip';
import { getUser } from '../../API/apiClient';
import { useAuth } from '../../AuthContext';
import  Tooltip  from '@mui/material/Tooltip';



export default function TripDashboard() {

    document.title = "Holidai: Dashboard"
    const [value, setValue] = React.useState('0');
    const { user } = useAuth();

    const handleChange = (event, newValue) => {
        setValue(newValue);

    };

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <Box >
            <Typography variant='h1' sx={{ fontWeight: '700', fontSize: 60 }}>Trips</Typography>
            <TabContext value={value}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <TabList
                        onChange={handleChange}
                        aria-label="tabs"
                        sx={{ borderColor: 'divider', flexGrow: 1 }}>
                        <Tab label="Planned" value="0"></Tab>
                        <Tab label="Trip history" value="1"></Tab>
                    </TabList>
                    <Tooltip describeChild title={!user.emailVerified ? "Verify your E-Mail" : "Test"}>
                        <span>
                            <Button onClick={handleClickOpen} disabled={!user.emailVerified}>
                                <AddRoundedIcon></AddRoundedIcon>
                                <Typography>New Trip</Typography>
                            </Button>
                        </span>
                    </Tooltip>
                </Box>
                <Box>
                    <TabPanel value="0" tabIndex={0} sx={{ height: '750px', overflowY: 'auto', boxSizing: 'border-box' }}>
                        <List Type={0} />
                    </TabPanel>
                    <TabPanel value="1" tabIndex={0} sx={{ height: '750px', overflowY: 'auto', boxSizing: 'border-box' }}>
                        <List Type={1} />
                    </TabPanel>
                </Box>
            </TabContext>
            <CreateTrip open={open} onClose={handleClose}></CreateTrip>
        </Box>
    );
}
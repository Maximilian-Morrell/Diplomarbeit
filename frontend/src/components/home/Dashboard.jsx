import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import List from '../UI/List';



export default function Dashboard() {

    document.title = "Holidai: Dashboard"
    const [value, setValue] = React.useState('0');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ marginTop: 2, width: '100%'}}>
            <Typography variant='h1' sx={{ fontWeight: '700', fontSize: 60 }}>Trips</Typography>
            <TabContext value={value}>
                <TabList
                onChange={handleChange}
                aria-label="tabs"
                sx={{borderColor: 'divider'}}>
                    <Tab label="Planned" value="0"></Tab>
                    <Tab label="Trip history" value="1"></Tab>
                </TabList>
                <TabPanel value="0" tabIndex={0}>
                    <List Type={0}/>
                </TabPanel>
                <TabPanel value="1" tabIndex={0}>
                    <List Type={1}/>
                </TabPanel>
            </TabContext>
        </Box>
    );
}
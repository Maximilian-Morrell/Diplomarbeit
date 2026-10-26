import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AttractionsRoundedIcon from '@mui/icons-material/AttractionsRounded';
import { Card, List, ListItemButton, ListItemText } from "@mui/material";

export default function CT_Activites(props) {
    const {setSelectedInterests, activities, selectedActivites} = props;

    function handleActivitiesSelected(index) {
        console.log(index)
        setSelectedInterests((prev) =>
            prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]
        );
    }

    return (
        <Box sx={{ display: "flex", overflow: 'auto', flexWrap: 'wrap', gap: 2, boxSizing: 'border-box', padding: 1 }}>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", p: 1 }}>
                <Box sx={{ display: "flex" }}>
                    <AttractionsRoundedIcon sx={{ fontSize: 80 }}></AttractionsRoundedIcon>
                    <Box sx={{ ml: 1, display: "flex", flexDirection: "column" }}>
                        <Typography variant="h4" sx={{ fontWeight: "bold" }}>What do you want to do during your trip?</Typography>
                        <Typography variant="subtitle1" color="textSecondary">Select one or more activity types so we can adjust our recommendations</Typography>
                    </Box>
                </Box>
                <List>
                    {activities.map((activity) => (
                        <Card sx={{ m: 1 }}>
                            <ListItemButton
                                key={activity.id}
                                selected={selectedActivites.includes(activity.id)}
                                onClick={() => handleActivitiesSelected(activity.id)}>
                                <ListItemText
                                    primary={activity.name}
                                    secondary={activity.description}
                                ></ListItemText>
                            </ListItemButton>

                        </Card>

                    ))}
                </List>
            </Box>
        </Box>
    )
}
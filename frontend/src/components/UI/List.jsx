import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TripCard from './TripCard';
import Pagination from '@mui/material/Pagination';
import * as React from 'react';


export default function List(Children) {

    const [page, setPage] = React.useState(1);

    return (
        <Box sx={{ width: '100%', display: "flex", flexWrap: "wrap", gap: 1}}>
            <TripCard></TripCard>
            <TripCard></TripCard>
            <TripCard></TripCard>
            <TripCard></TripCard>
            <TripCard></TripCard>
            <TripCard></TripCard>
            <TripCard></TripCard>
            <TripCard></TripCard>
            <TripCard></TripCard>
            <TripCard></TripCard>
            <TripCard></TripCard>
            <TripCard></TripCard>
            <TripCard></TripCard>
            <TripCard></TripCard>
            <TripCard></TripCard>
        </Box>
    )
}
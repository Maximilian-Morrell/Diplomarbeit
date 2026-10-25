import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { DeleteCountry } from "../../../API/ApiClient";

export default function CountryTable(props) {

    const { countries, selectCountry, currentCountry, deletedCountry } = props;
    console.log(countries)

    function SetSelectedCountry(country) {
        if (currentCountry?.id === country.id) {
            console.log("Test")
            selectCountry(null)
        }
        else {
            selectCountry(country);
        }
    }

    async function RemoveCountry(country) {
        await DeleteCountry(country.id);
        console.log(countries)
        deletedCountry();
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ width: '100%' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Amount of Cities</TableCell>
                        <TableCell>Amount of Regions</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {countries.map((country) => (
                        <TableRow key={country.id} hover onClick={() => SetSelectedCountry(country)} sx={{ cursor: "pointer" }} selected={currentCountry?.id === country.id}>
                            <TableCell>{country.id}</TableCell>
                            <TableCell>{country.name}</TableCell>
                            <TableCell>{country.cities}</TableCell>
                            <TableCell>{country.regions.length}</TableCell>
                            <TableCell sx={{ zIndex: 1 }} align="right"><Button variant="contained" color="error" onClick={() => RemoveCountry(country)}>Delete</Button></TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
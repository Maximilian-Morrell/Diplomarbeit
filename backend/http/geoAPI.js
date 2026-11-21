import express from "express";
import { AddPlace, GetCity, GetCountry, GetGeoCategoryByTag, GetPlacesByCity, GetPlacesForList, GetRegion } from "../db/dbServer.js";


const router = express.Router();

router.get('/AutoComplete', async (req, res) => {
    const searchQuery = req.query.searchQuery;
    const type = req.query.type;

    const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${searchQuery}&type=${type}&format=json&apiKey=${process.env.GEOAPIFY_API_KEY}`
    )

    const data = await response.json();
    const results = data.results;
    const responseData = []
    for(var result of results) {
        const resultObject = {
            name: result.name,
            country: result.country,
            state: result.state,
            geoID: result.place_id
        }
        responseData.push(resultObject);
    }
    console.log(responseData);
    res.json(responseData);
})

router.post("/LoadPlaces", async (req, res) => {
    try {
        const city = await GetCity(req.query.cityID);
        const region = await GetRegion(city.region_id);
        const country = await GetCountry(region.country_id);

        const { categories } = req.body;
        const offset = Math.max(0, Number(req.body.offset) || 0);
        const limit = 250;

        if (!categories) {
            return res.status(400).json({
                message: "Categories are required."
            });
        }

        // Get Geoapify city ID
        const cityResponse = await fetch(
            `https://api.geoapify.com/v1/geocode/search?city=${encodeURIComponent(city.name)}&country=${encodeURIComponent(country.name)}&apiKey=${process.env.GEOAPIFY_API_KEY}`
        );

        if (!cityResponse.ok) {
            throw new Error("Failed to retrieve city information from Geoapify.");
        }

        const cityData = await cityResponse.json();
        const cityIDResult = cityData.features?.[0]?.properties?.place_id;

        if (!cityIDResult) {
            throw new Error("Could not find city in Geoapify.");
        }

        // Fetch places with offset
        const placesResponse = await fetch(
            `https://api.geoapify.com/v2/places?apiKey=${process.env.GEOAPIFY_API_KEY}&categories=${encodeURIComponent(categories)}&filter=place:${cityIDResult}&limit=${limit}&offset=${offset}`
        );

        if (!placesResponse.ok) {
            throw new Error("Failed to retrieve places from Geoapify.");
        }

        const placesData = await placesResponse.json();
        const features = placesData.features || [];

        // Insert places
        const category = await GetGeoCategoryByTag(categories);

        for (const place of features) {
            const {
                name,
                address_line2,
                opening_hours,
                website,
                brand,
                place_id,
                lon,
                lat
            } = place.properties;

            const suburbFields = [
                "suburb",
                "neighbourhood",
                "quarter",
                "city_district",
                "district",
                "borough",
                "city_block"
            ];

            const suburb = suburbFields
                .map(field => place.properties[field])
                .find(value => value) || "";

            await AddPlace(
                name,
                address_line2,
                opening_hours,
                brand,
                website,
                place_id,
                city.id,
                suburb,
                category.id,
                lon,
                lat
            );
        }

        const updatedPlaceList = await GetPlacesForList();

        res.status(200).json({
            places: updatedPlaceList,
            nextOffset: offset + features.length,
            hasMore: features.length === limit,
            loadedCount: features.length
        });

    } catch (err) {
        console.error("LoadPlaces error:", err);

        return res.status(500).json({
            message: "An error occurred while processing the request."
        });
    }
});



export default router;
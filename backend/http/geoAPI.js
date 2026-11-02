import express from "express";
import { AddPlace, GetCity, GetCountry, GetGeoCategoryByTag, GetPlacesByCity, GetPlacesForList, GetRegion } from "../db/dbServer.js";


const router = express.Router();


router.post("/LoadPlaces", async (req, res) => {
    try {
        console.log("Test route hit")

        const city = await GetCity(req.query.cityID);
        const region = await GetRegion(city.region_id);
        const country = await GetCountry(region.country_id);
        const { categories } = req.body;
        const offset = Number(req.body.offset) || 0;

        const cityID = await fetch(`https://api.geoapify.com/v1/geocode/search?city=${city.name}&country=${country.name}&apiKey=${process.env.GEOAPIFY_API_KEY}`);
        const cityData = await cityID.json();
        const cityIDResult = cityData.features[0].properties.place_id;
        console.log("City ID:", cityIDResult);

        const cityGeoData = await fetch(`https://api.geoapify.com/v2/places?apiKey=${process.env.GEOAPIFY_API_KEY}&categories=${categories}&filter=place:${cityIDResult}&limit=250&offset=${offset}`, {
            method: "GET",
            headers: {
                "User-Agent": "HolidayCityPlanerAdmin/1.0"
            }
        })
        const cityGeoDataResult = await cityGeoData.json();
        console.log(cityGeoDataResult);
        for (const place of cityGeoDataResult.features) {
            const { name, address_line2, opening_hours, website, brand, place_id } = place.properties;
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

            const category = await GetGeoCategoryByTag(categories);
            await AddPlace(name, address_line2, opening_hours, brand, website, place_id, city.id, suburb, category.id);
        }

        const updatedPlaceList = await GetPlacesForList();
        res.status(200).json({
            places: updatedPlaceList, 
            nextOffset: offset + cityGeoDataResult.features.length,
            hasMore: cityGeoDataResult.features.length === 250
        });
        console.log("Places loaded successfully:", updatedPlaceList);
        console.log(cityGeoDataResult);

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "An error occurred while processing the request."
        });
    }
})



export default router;
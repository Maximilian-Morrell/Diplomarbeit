import express from "express";
import { AddPlace, GetCity, GetCountry, GetPlacesByCity, GetPlacesForList, GetRegion } from "../db/dbServer.js";


const router = express.Router();


router.post("/LoadPlaces", async (req, res) => {
    try {
        console.log("Test route hit")

        const city = await GetCity(req.query.cityID);
        const region = await GetRegion(city.region_id);
        const country = await GetCountry(region.country_id);
        const { categories } = req.body;
        var categoryString = "";
        for (const category of categories) {
            categoryString += category + ",";
        }

        const cityID = await fetch(`https://api.geoapify.com/v1/geocode/search?city=${city.name}&country=${country.name}&apiKey=${process.env.GEOAPIFY_API_KEY}`);
        const cityData = await cityID.json();
        const cityIDResult = cityData.features[0].properties.place_id;
        console.log("City ID:", cityIDResult);

        const cityGeoData = await fetch(`https://api.geoapify.com/v2/places?apiKey=${process.env.GEOAPIFY_API_KEY}&categories=${categoryString.slice(0, -1)}&filter=place:${cityIDResult}&limit=250`, {
            method: "GET",
            headers: {
                "User-Agent": "HolidayCityPlanerAdmin/1.0"
            }
        })
        const cityGeoDataResult = await cityGeoData.json();
        console.log(cityGeoDataResult);
        for (const place of cityGeoDataResult.features) {
            const { name, address_line2, opening_hours, website, brand, place_id} = place.properties;
            await AddPlace(name, address_line2, opening_hours, brand, website, place_id, city.id);
        }

        const updatedPlaceList = await GetPlacesForList();
        res.status(200).json({ places: updatedPlaceList });
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
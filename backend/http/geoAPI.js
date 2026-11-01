import express from "express";


const router = express.Router();


router.get("/test", async (req, res) => {
    try {
        console.log("Test route hit")

        const cityID = await fetch(`https://api.geoapify.com/v1/geocode/search?city=${req.query.city}&country=${req.query.country}&apiKey=${process.env.GEOAPIFY_API_KEY}`);
        const cityData = await cityID.json();
        const cityIDResult = cityData.features[0].properties.place_id;
        console.log("City ID:", cityIDResult);

        const cityGeoData = await fetch(`https://api.geoapify.com/v2/places?apiKey=${process.env.GEOAPIFY_API_KEY}&categories=entertainment.activity_park&filter=place:${cityIDResult}`, {
            method: "GET",
            headers: {
                "User-Agent": "HolidayCityPlanerAdmin/1.0"
            }
        })
        const cityGeoDataResult = await cityGeoData.json();
        console.log("City Geo Data:", cityGeoDataResult);
        return res.status(200).json({
            message: "Test route hit successfully.",
            cityID: cityIDResult,
            cityGeoData: cityGeoDataResult
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "An error occurred while processing the request."
        });
    }
})



export default router;
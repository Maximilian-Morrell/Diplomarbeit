import express from 'express'
import { GetCities, GetCountries, GetCountry, GetCity, GetUser, newVerificationEMail, GetPermissions } from '../db/dbServer.js';
import { AuthMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router();

router.get('/', async (req, res) => {
    res.json({
        message: "Get is working!"
    })
})

router.get('/permissions', async (req, res) => {
    const permissions = await GetPermissions();
    res.json(permissions);
}) 

router.get('/countries', async (req, res) => {
    const countries = await GetCountries();
    res.json(countries);
})


router.get('/cities', async (req, res) => {
    const cities = await GetCities();
    for (const city of cities) {
        const country = await GetCountry(city.country_id);
        city.country = country.name;
    }
    res.json(cities);
})

router.get('/city/:id', async (req, res) => {
    const city = await GetCity(req.params.id);
    console.log(city);
    const country = await GetCountry(city.country_id);
    city.country = country.name;
    res.json(city);
})

router.get('/users', AuthMiddleware, async (req, res) => {
    const users = await GetUsers();
    res.json(users)
})

router.get('/user/:id', AuthMiddleware, async (req, res) => {
    const user = await GetUser(req.params.id);
    res.json(user)
})

router.get('/me', AuthMiddleware, async (req, res) => {
    try {
        const user = await GetUser(req.user.id);


        res.json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            birthDay: user.birthDay,
            username: user.username,
            bio: user.bio,
            TFA_Enabled: Boolean(user.TFA_Enabled),
            emailVerified: Boolean(user.emailVerified),
            permissions: user.permissions
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({
            message: 'Failed to fetch user data'
        })
    }
})

router.get("/me/permissions", AuthMiddleware, async (req, res) => {
    try {
        console.log(req.user);
        const user = await GetUser(req.user.id);

        res.json({
            permissions: user.permissions
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to load permissions"
        });
    }
});

router.get("/newVerificationLink", AuthMiddleware, async (req, res) => {
    try {
        newVerificationEMail(req.user.id)
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Failed to send new verification Link"
        });
    }
})

export default router;
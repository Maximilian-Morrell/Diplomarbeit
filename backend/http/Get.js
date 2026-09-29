import express from 'express'
import { GetCountries } from '../db/dbServer.js';

const router = express.Router();

router.get('/', async (req, res) => {
    res.json({
        message: "Get is working!"
    })
})

router.get('/countries', async (req, res) => {
    const countries = await GetCountries();
    res.json(countries);
})


router.get('/cities', async (req, res) => {
    const countries = await GetCountries();
    res.json(countries);
})

export default router;
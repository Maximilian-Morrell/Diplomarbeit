import express from 'express'
import { AddCity, AddCountry, AddInterest, AddRegion, AddType, AddUser, LogIn } from '../db/dbServer.js';
import { AuthMiddleware, GenerateToken } from '../middleware/authMiddleware.js'
import jwt from 'jsonwebtoken';
import "dotenv/config";



const router = express.Router();

router.post('/sign-up', async (req, res) => {
    const {firstName, lastName, email, birthDay, userName, password } = req.body;
    const user = await AddUser(firstName, lastName, email, birthDay, userName, password);

    if(!user) {
        return res.status(500).json({ message: 'Failed to add user' });
    }

    const token = GenerateToken(user);
    console.log("Generated token:", token);
    res.json({ token : token });
})

router.post('/log-in', async (req, res) => {
    console.log(req.body)
    try {
        const { email, password } = req.body;
        const user = await LogIn(email, password);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log("User logged in:", user);
        const token = GenerateToken(user);
        res.json({ token : token });
    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ message: 'Failed to sign in' });
    }
})

router.post("/city", AuthMiddleware, async (req, res) => {
    try {
        const { name, type, region, description, permission } = req.body;
        const city = await AddCity(name, type, region, description, permission);
        res.json({city: city});
    } catch (error) {
        console.error('Error creating city:', error);
        res.status(500).json({ message: 'Failed to create City' });
    }
})

router.post("/region", AuthMiddleware, async (req, res) => {
    try {
        const { name, country_id } = req.body;
        const regions = await AddRegion(name, country_id);
        res.json({regions: regions});
    } catch (error) {
        console.error('Error creating region:', error);
        res.status(500).json({ message: 'Failed to region City' });
    }
})

router.post("/type", AuthMiddleware, async (req, res) => {
    try {
        const { name, description } = req.body;
        const types = await AddType(name, description);
        res.json({types: types});
    } catch (error) {
        console.error('Error creating type:', error);
        res.status(500).json({ message: 'Failed to create Type' });
    }
})

router.post("/country", AuthMiddleware, async (req, res) => {
    try {
        const { name } = req.body;
        const countries = await AddCountry(name);
        res.json({countries: countries});
    } catch (error) {
        console.error('Error creating country', error);
        res.status(500).json({ message: 'Failed to create Country' });
    }
})

router.post("/interest", AuthMiddleware, async (req, res) => {
    try {
        const { name, description } = req.body;
        const countries = await AddInterest(name, description);
        res.json({countries: true});
    } catch (error) {
        console.error('Error creating country', error);
        res.status(500).json({ message: 'Failed to create Country' });
    }
})


export default router;
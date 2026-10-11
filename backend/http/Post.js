import express from 'express'
import { AddCity, AddUser, LogIn } from '../db/dbServer.js';
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
        const { name, type, region, description, country, permission } = req.body;
        const cities = await AddCity(name, type, region, description, country, permission);
        res.json({cities: cities});
    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ message: 'Failed to create City' });
    }
})

export default router;
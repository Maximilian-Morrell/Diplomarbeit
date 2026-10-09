import express from 'express'
import { AddUser, LogIn } from '../db/dbServer.js';
import { AuthMiddleware, GenerateToken } from '../middleware/authMiddleware.js'
import jwt from 'jsonwebtoken';
import "dotenv/config";
import RegisterEMail from '../mail/mailserver.js';



const router = express.Router();

router.post('/sign-up', async (req, res) => {
    const {firstName, lastName, email, birthDay, userName, password } = req.body;
    const user = await AddUser(firstName, lastName, email, birthDay, userName, password);
    RegisterEMail(user);

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


export default router;
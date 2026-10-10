import express from 'express'
import { AddUser, GetUser, UpdateUser } from '../db/dbServer.js';
import { AuthMiddleware, } from '../middleware/authMiddleware.js'
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

router.put("/me", AuthMiddleware, async (req, res) => {
    const user = await GetUser(req.user.id);
    const {firstName, lastName, username, email, bio} = req.body;
    const changeEMail = email != user.email;

    UpdateUser(user.id, changeEMail, firstName, lastName, username, email, bio)
})


export default router;
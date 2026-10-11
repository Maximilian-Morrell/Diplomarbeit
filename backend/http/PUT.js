import express from 'express'
import { AddUser, GetUser, UpdateUser, UpdateUserPassword } from '../db/dbServer.js';
import { AuthMiddleware, } from '../middleware/authMiddleware.js'
import jwt from 'jsonwebtoken';
import "dotenv/config";



const router = express.Router();


router.put("/me", AuthMiddleware, async (req, res) => {
    try {
        const user = await GetUser(req.user.id);
        const { firstName, lastName, username, email, bio, birthDay } = req.body;
        const changeEMail = email != user.email;

        const result = await UpdateUser(user.id, changeEMail, firstName, lastName, username, email, bio, birthDay, user.email)
        console.log("Test")
        console.log(result)
        res.status(200).json({user: result});

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update user' });
    }

})

router.put("/me/password", AuthMiddleware, async (req, res) => {
    try {
        const { currentPassword, newPassword, } = req.body;

        const result = await UpdateUserPassword(req.user.id, currentPassword, newPassword)
        console.log(result)
        res.status(200).json({result: result});

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update user password' });
    }

})


export default router;
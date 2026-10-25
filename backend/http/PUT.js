import express from 'express'
import { GetUser, UpdateCity, UpdateCountry, UpdateRegion, UpdateUser, UpdateUserPassword, UpdateTag, ModifyTagsForCity } from '../db/dbServer.js';
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

}
)

router.put("/country", AuthMiddleware, async (req, res) => {
    try {
        const {id, name} = req.body;

        const result = await UpdateCountry(id, name);
        res.status(200).json({result: result})

    } catch(err) {
        console.error(err);
        res.status(500).json({message: 'Failed to update country'});
    }
})

router.put("/city", AuthMiddleware, async (req, res) => {
    try {
        const { id, name, type, region, description, permission, tags } = req.body;
        const cities = await UpdateCity(name, type, region, description, permission, id);
        await ModifyTagsForCity(id, tags);
        res.json({cities: cities});
    } catch (error) {
        console.error('Error updating city:', error);
        res.status(500).json({ message: 'Failed to update City' });
    }
})

router.put("/region", AuthMiddleware, async (req, res) => {
    try {
        const { id, name, country_id } = req.body;
        const regions = await UpdateRegion(name, id, country_id);
        res.json({regions: regions});
    } catch (error) {
        console.error('Error updating region:', error);
        res.status(500).json({ message: 'Failed to update Region' });
    }
})

router.put("/tag", AuthMiddleware, async (req, res) => {
    try {
        const { id, name } = req.body;
        const tags = await UpdateTag(name, id);
        res.json({tags: tags});
    } catch (error) {
        console.error('Error updating tag:', error);
        res.status(500).json({ message: 'Failed to update Tag' });
    }
})

export default router;
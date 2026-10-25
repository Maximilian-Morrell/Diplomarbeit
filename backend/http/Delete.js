import express from "express";
import { AuthMiddleware } from '../middleware/authMiddleware.js';
import { DeleteCity, DeleteCountry, DeleteRegion, DeleteTag } from "../db/dbServer.js";

const router = express.Router();

router.delete("/country", AuthMiddleware, async (req, res) => {
    try {
        const { id } = req.body;

        const result = await DeleteCountry(id);
        res.status(200).json({ result: result })

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete country' });
    }
})

router.delete("/city", AuthMiddleware, async (req, res) => {
    try {
        const { id } = req.body;

        const result = await DeleteCity(id);
        res.status(200).json({ result: result })

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete country' });
    }
})

router.delete("/region", AuthMiddleware, async (req, res) => {
    try {
        const { id } = req.body;

        const result = await DeleteRegion(id);
        res.status(200).json({ result: result })

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete region' });
    }
})

router.delete("/tag", AuthMiddleware, async (req, res) => {
    try {
        const { id } = req.body;

        const result = await DeleteTag(id);
        res.status(200).json({ result: result })

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete region' });
    }
})

export default router;
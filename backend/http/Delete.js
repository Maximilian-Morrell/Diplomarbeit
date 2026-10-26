import express from "express";
import { AuthMiddleware } from '../middleware/authMiddleware.js';
import { DeleteCity, DeleteCountry, DeleteInterest, DeleteRegion, DeleteType, hasCityImage } from "../db/dbServer.js";
import fs from "fs/promises";
import path from "path";

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

        const oldImageURL = await hasCityImage(id)

        if (oldImageURL.picture_url != null) {
            console.log(oldImageURL.picture_url)
            console.log(path.join(process.cwd(), oldImageURL.picture_url))
            await fs.rm(path.join(process.cwd(), oldImageURL.picture_url))
        }

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

router.delete("/type", AuthMiddleware, async (req, res) => {
    try {
        const { id } = req.body;

        const result = await DeleteType(id);
        res.status(200).json({ result: result })

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete type' });
    }
})

router.delete("/interest", AuthMiddleware, async (req, res) => {
    try {
        const { id } = req.body;

        const result = await DeleteInterest(id);
        res.status(200).json({ result: result })

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete interest' });
    }
})

export default router;
import express from "express";
import { AuthMiddleware } from '../middleware/authMiddleware.js';
import { GenerateTrip } from "../AI/aiServer.js";


const router = express.Router();

router.get("/request", AuthMiddleware, async (req, res) => {
    try {


    } catch (err) {

    }
})

router.post("/generate-trip", async (req, res) => {
    res.setHeader("Content-Type", "application/x-ndjson; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Cache-Control", "no-cache");

    await GenerateTrip(req.body, res);
});



export default router;
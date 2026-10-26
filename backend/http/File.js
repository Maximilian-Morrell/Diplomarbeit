import express from "express";
import path from "path";
import fs from "fs/promises";
import { randomUUID } from "crypto";
import { AuthMiddleware } from "../middleware/authMiddleware.js";
import { hasCityImage, UpdateCityImage } from "../db/dbServer.js";

const router = express.Router();

const uploadDir = process.env.UPLOAD_DIR || "./uploads";



router.post("/post/city", AuthMiddleware, async (req, res) => {

    try {
        const cityID = req.query.id;


        const chunks = [];
        let size = 0;

        for await (const chunk of req) {
            size += chunk.length;

            if (size > 100 * 1024 * 1024 * 1024) {
                res.status(413).json({ message: "Image to big" });
                req.destroy();
                return;
            }

            chunks.push(chunk);
        }

        if (size === 0) {
            return res.status(400).json({ message: "No image provided." });
        }


        const basePath = path.join(uploadDir, "/admin/city")
        await fs.mkdir(basePath, { recursive: true });


        console.log(req);
        const fileName = `${randomUUID()}${req.query.fileType}`
        const filePath = path.join(basePath, fileName);
        await fs.writeFile(filePath, Buffer.concat(chunks));
        const imageUrl = path.posix.join("uploads", "admin", "city", fileName);

        const oldImageURL = await hasCityImage(cityID)

        if (oldImageURL.picture_url != null) {
            console.log(oldImageURL.picture_url)
            console.log(path.join(process.cwd(), oldImageURL.picture_url))
            await fs.rm(path.join(process.cwd(), oldImageURL.picture_url))
        }


        const imageResult = await UpdateCityImage(cityID, imageUrl);

        res.status(201).json({
            message: "File uploaded successfully.",
            filename: filePath
        });
    } catch (err) {
        console.error(err);
    }

});

export default router;

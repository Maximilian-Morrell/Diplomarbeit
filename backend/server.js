// Imports
import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { CheckDB } from "./db/dbServer.js";
import GetRouter from './http/Get.js'
import PostRouter from './http/Post.js'

// Setup
const app = express();
const port = process.env.BACKEND_PORT || 3000;
app.use(express.json());

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


app.use("/image", express.static("./public/images"))
app.use('/get', GetRouter)
app.use('/post', PostRouter)

// Routing
app.get("/", async (req, res) => {
    console.log("Testing")
    res.sendStatus(700);
});

// Start Server
app.listen(port, "0.0.0.0", () => {
    console.log(`Backend running on Port ${port}`);
    // Check DB
    CheckDB();
});
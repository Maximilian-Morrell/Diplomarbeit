// Imports
import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Setup
const app = express();
const port = process.env.BACKEND_PORT || 3000;
app.use(express.json());

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


app.use("/image", express.static("./public/images"))

// Routing
app.get("/", (req, res) => {
    console.log("Testing")
    res.sendStatus(700);
});

// Start Server
app.listen(port, "0.0.0.0", () => {
    console.log(`Backend running on Port ${port}`);
});
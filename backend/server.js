// Imports
import "dotenv/config";
import express from "express";

// Setup
const app = express();
const port = process.env.BACKEND_PORT || 3000;
app.use(express.json());

// Routing
app.get("/", (req, res) => {
    console.log("Testing")
    res.sendStatus(700);
});

// Start Server
app.listen(port, "0.0.0.0", () => {
    console.log(`Backend running on Port ${port}`);
});
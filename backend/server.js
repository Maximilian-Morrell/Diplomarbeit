// Imports
import "dotenv/config";
import express from "express";

// Setup
const app = express();
const PORT = process.env.BACKEND_PORT;
app.use(express.json);

// Routing
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Backend running on Port ${PORT}`);
});
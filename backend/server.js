// Imports
import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { CheckDB, GetUserByVerificationToken, VerifyUser } from "./db/dbServer.js";
import GetRouter from './http/Get.js'
import PostRouter from './http/Post.js'
import crypto from 'crypto'
import { EMailVerificationSuccessful } from "./mail/mailserver.js";

// Setup
const app = express();
const port = process.env.BACKEND_PORT || 3000;
app.use(express.json());

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


app.use("/image", express.static("./public/images"))
app.use('/get', GetRouter)
app.use('/post', PostRouter)

app.use('/verify-email', async (req, res) => {
    console.log("Verification process beginning")
    const { token } = req.query;

    if(!token) {
        return res.status(400).send("Invalid verification link.")
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const user = await GetUserByVerificationToken(tokenHash);

    if(!user) {
        return res.status(400).send("Invalid verification link.")
    }

    if(new Date() > new Date(user.emailVerificationExpires)) {
        return res.status(400).send("Verification link expired.");
    }

    const success = await VerifyUser(user.id);

    if(success) {
        EMailVerificationSuccessful(user);
        res.redirect(process.env.FRONTEND_URL + "/?emailVerified=true")
    }
    else {
        return res.status(500).send("Something went wrong");
    }
})

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
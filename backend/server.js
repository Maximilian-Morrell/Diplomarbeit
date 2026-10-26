// Imports
import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { CheckDB, GetUserByVerificationToken, VerifyUser } from "./db/dbServer.js";
import GetRouter from './http/Get.js'
import PostRouter from './http/Post.js'
import PutRouter from './http/PUT.js'
import DeleteRouter from "./http/Delete.js"
import FilesRouter from "./http/File.js"
import crypto from 'crypto'
import { EMailVerificationSuccessful } from "./mail/mailserver.js";

// Setup
const app = express();
const port = process.env.BACKEND_PORT || 3000;
app.use((req, res, next) => {
    if(req.originalUrl.startsWith("/files")) {
        return next();
    }

    express.json({limit: "10gb"})(req, res, next);
})


app.use('/uploads', express.static("./uploads"))
app.use('/get', GetRouter)
app.use('/post', PostRouter)
app.use("/put", PutRouter)
app.use("/delete", DeleteRouter)
app.use("/files", FilesRouter)

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
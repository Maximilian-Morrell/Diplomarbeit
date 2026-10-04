import jwt from "jsonwebtoken";

export const AuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch {
        return res.status(401).json({ error: "Invalid token" });
    }
}


export const GenerateToken = (user) => {
    return jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET, { expiresIn: '30d' });
}
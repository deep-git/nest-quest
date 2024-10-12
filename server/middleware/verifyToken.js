import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    dotenv.config();

    if (!token) {
        return res.status(401).json({ message: "Not authenticated!" });
    }

    // If there exists token, verify.
    // When logging in, creating token using secret key. The cookies session time might be expired or the user might change their JWT token

    // decrypt token, return either error or user info "payload"
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) {
            return res.status(403).json({ message: "Token is not Valid!" });
        }

        req.userId = payload.id;

        next();
    });
}
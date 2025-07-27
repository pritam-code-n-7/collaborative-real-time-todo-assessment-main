import jwt from "jsonwebtoken";

export const authMiddleware = async () => {
    const auth = req.headers["authorization"];
    console.log(auth);

    if (!auth) {
        res.status(403).json({ success: false, message: "JWT token is required." });
        return;
    }

    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET)
        req.user = decoded;
        console.log(decoded);

        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ success: false, message: "JWT token is wrong or expired" });
    }
};
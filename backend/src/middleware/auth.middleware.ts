import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

interface DecodedUser {
    // Add properties according to your JWT payload, e.g.:
    id: string;
    email?: string;
    // Add other fields as needed
}

interface AuthenticatedRequest extends Request {
    user?: DecodedUser | string | object;
}

export const authMiddleware = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const auth = req.headers["authorization"];
    console.log(auth);

    if (!auth) {
        res.status(403).json({ success: false, message: "JWT token is required." });
        return;
    }

    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET as string) as DecodedUser;
        req.user = decoded;
        console.log(decoded);

        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ success: false, message: "JWT token is wrong or expired" });
    }
};
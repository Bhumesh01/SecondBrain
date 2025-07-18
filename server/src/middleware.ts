import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_PASSWORD = "bhumesh01";

interface CustomRequest extends Request {
    userId?: string;
}

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];

    if (!header) {
        return res.status(401).json({ message: "No authorization header provided" });
    }

    try {
        interface JwtPayload {
            id: string; 
        }

        const decode = jwt.verify(header, JWT_PASSWORD) as JwtPayload;

        if (decode) {
            req.userId = decode.id;
            next(); 
        } else {
            return res.status(401).json({ message: "Invalid token" });
        }
    } catch (error) {
        return res.status(403).json({ message: "Unauthorized" });
    }
};
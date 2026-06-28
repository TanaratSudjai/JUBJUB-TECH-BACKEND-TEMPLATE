import type { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { AuthRequest, JwtPayload } from '../models/Auth.js';
import { ResponseHandler } from '../utils/ResponseHandler.js';

const responseHandler = new ResponseHandler();

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        responseHandler.UNAUTHORIZED(res, 'Access denied. No token provided.');
        return;
    }

    // 2. ตรวจสอบความถูกต้องของ Token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        console.error('JWT_SECRET is not defined');
        responseHandler.ERROR(res, 'Internal server error.');
        return;
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            responseHandler.FORBIDDEN(res, 'Invalid or expired token.');
            return;
        }

        // 3. แนบข้อมูล User ใส่ Request
        req.user = decoded as JwtPayload;
        next();
    });
};

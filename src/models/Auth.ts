import type { Request } from 'express';

export interface JwtPayload {
    userId: number;
    email: string;
    roleId?: number | null;
}

export interface AuthRequest extends Request {
    user?: JwtPayload;
}

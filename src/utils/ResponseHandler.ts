import type { Response } from 'express';
import { z } from 'zod';

export class ResponseHandler {
    // 2xx Success Responses
    public SUCCESS(res: Response, data: any, statusCode: number = 200): Response {
        return res.status(statusCode).json({
            error: null,
            data: data
        });
    }

    public CREATED(res: Response, data: any): Response {
        return res.status(201).json({
            error: null,
            data: data
        });
    }

    // 4xx & 5xx Error Responses
    public ERROR(res: Response, error: string = 'Server Error', statusCode: number = 500): Response {
        return res.status(statusCode).json({
            error: error,
            data: null
        });
    }

    public BAD_REQUEST(res: Response, error: string = 'Bad Request'): Response {
        return res.status(400).json({
            error: error,
            data: null
        });
    }

    public ZOD_ERROR(res: Response, error: z.ZodError): Response {
        const message = error.issues?.[0]?.message || 'Validation Error';
        return res.status(400).json({
            error: message,
            data: null
        });
    }

    public UNAUTHORIZED(res: Response, error: string = 'Unauthorized'): Response {
        return res.status(401).json({
            error: error,
            data: null
        });
    }

    public FORBIDDEN(res: Response, error: string = 'Forbidden'): Response {
        return res.status(403).json({
            error: error,
            data: null
        });
    }

    public NOT_FOUND(res: Response, error: string = 'Not Found'): Response {
        return res.status(404).json({
            error: error,
            data: null
        });
    }
}

import type { Response } from 'express';

export const ResponseHandler = {
    // 2xx Success Responses
    SUCCESS: (res: Response, data: any, statusCode: number = 200) => {
        return res.status(statusCode).json({
            error: null,
            data: data
        });
    },
    CREATED: (res: Response, data: any) => {
        return res.status(201).json({
            error: null,
            data: data
        });
    },

    // 4xx & 5xx Error Responses
    ERROR: (res: Response, error: string = 'Server Error', statusCode: number = 500) => {
        return res.status(statusCode).json({
            error: error,
            data: null
        });
    },
    BAD_REQUEST: (res: Response, error: string = 'Bad Request') => {
        return res.status(400).json({
            error: error,
            data: null
        });
    },
    UNAUTHORIZED: (res: Response, error: string = 'Unauthorized') => {
        return res.status(401).json({
            error: error,
            data: null
        });
    },
    FORBIDDEN: (res: Response, error: string = 'Forbidden') => {
        return res.status(403).json({
            error: error,
            data: null
        });
    },
    NOT_FOUND: (res: Response, error: string = 'Not Found') => {
        return res.status(404).json({
            error: error,
            data: null
        });
    }
};

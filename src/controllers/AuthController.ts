import type { Request, Response } from 'express';
import { z } from 'zod';
import { AuthService } from '../services/AuthService.js';
import { loginSchema } from '../validations/authValidation.js';
import { ResponseHandler } from '../utils/ResponseHandler.js';

export class AuthController {
    private authService: AuthService;
    private responseHandler: ResponseHandler;

    constructor() {
        this.authService = new AuthService();
        this.responseHandler = new ResponseHandler();
    }

    public login = async (req: Request, res: Response): Promise<void> => {
        try {
            const validatedData = loginSchema.parse({
                body: req.body,
            });
            const result = await this.authService.login(validatedData.body);

            this.responseHandler.SUCCESS(res, result);

        } catch (error) {
            if (error instanceof z.ZodError) {
                this.responseHandler.ZOD_ERROR(res, error);
                return;
            }
            if (error instanceof Error) {
                this.responseHandler.UNAUTHORIZED(res, error.message);
                return;
            }

            this.responseHandler.ERROR(res, 'An unexpected error occurred');
        }
    };
}

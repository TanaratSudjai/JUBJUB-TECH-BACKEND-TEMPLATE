import type { Request, Response } from 'express';
import { z } from 'zod';
import { UserService } from '../services/UserService.js';
import { ResponseHandler } from '../utils/ResponseHandler.js';
import { paginationSchema } from '../validations/commonValidation.js';
import { registerSchema } from '../validations/userValidation.js';

// ชั้นรับ Request จากฝั่ง Client และตอบ Response กลับไป
export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    // ต้องใช้ arrow function เพื่อป้องกันปัญหา this context loss
    public getAllUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            // Validate data using Zod
            const query = paginationSchema.parse(req.query);

            const result = await this.userService.getAllUsers(query.page, query.limit);
            ResponseHandler.SUCCESS(res, result);
        } catch (error) {
            if (error instanceof z.ZodError) {
                ResponseHandler.ZOD_ERROR(res, error);
                return;
            }
            ResponseHandler.ERROR(res, 'Server Error', 500);
        }
    };

    public getUserById = async (req: Request, res: Response): Promise<void> => {
        try {


            // const idStr = req.params.id as string;
            // const id = parseInt(idStr, 10);

            const id = Number(req.params.id);
            const user = await this.userService.getUserById(id);

            if (!user) {
                ResponseHandler.NOT_FOUND(res, 'User not found');
                return;
            }
            ResponseHandler.SUCCESS(res, user);
        } catch (error) {
            ResponseHandler.ERROR(res, 'Server Error', 500);
        }
    };

    public getUserWithRole = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = Number(req.params.id);
            const user = await this.userService.getUserWithRole(id);

            if (!user) {
                ResponseHandler.NOT_FOUND(res, 'User or Role not found');
                return;
            }
            ResponseHandler.SUCCESS(res, user);
        } catch (error) {
            ResponseHandler.ERROR(res, 'Server Error', 500);
        }
    };

    public registerUser = async (req: Request, res: Response): Promise<void> => {
        try {
            // Validate body
            const body = registerSchema.parse(req.body);

            const result = await this.userService.registerUser(body);
            ResponseHandler.CREATED(res, result);
        } catch (error) {
            if (error instanceof z.ZodError) {
                ResponseHandler.ZOD_ERROR(res, error);
                return;
            }
            if (error instanceof Error && error.message === 'Email is already registered') {
                ResponseHandler.BAD_REQUEST(res, error.message);
                return;
            }
            ResponseHandler.ERROR(res, 'Server Error', 500);
        }
    };
}

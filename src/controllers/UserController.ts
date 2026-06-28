import type { Request, Response } from 'express';
import { z } from 'zod';
import { UserService } from '../services/UserService.js';
import { ResponseHandler } from '../utils/ResponseHandler.js';
import { paginationSchema } from '../validations/commonValidation.js';

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
                ResponseHandler.BAD_REQUEST(res, error.issues?.[0]?.message || 'Validation Error');
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
}

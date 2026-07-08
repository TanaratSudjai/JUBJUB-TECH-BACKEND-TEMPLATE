import type { Request, Response } from 'express';
import { z } from 'zod';
import { UserService } from '../services/UserService.js';
import { ResponseHandler } from '../utils/ResponseHandler.js';
import { paginationSchema } from '../validations/commonValidation.js';


// ชั้นรับ Request จากฝั่ง Client และตอบ Response กลับไป
export class UserController {
    private userService: UserService;
    private responseHandler: ResponseHandler;

    constructor() {
        this.userService = new UserService();
        this.responseHandler = new ResponseHandler();
    }

    // ต้องใช้ arrow function เพื่อป้องกันปัญหา this context loss
    public getAllUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            // Validate data using Zod
            const query = paginationSchema.parse(req.query);

            const result = await this.userService.getAllUsers(query.page, query.limit);
            this.responseHandler.SUCCESS(res, result);
        } catch (error) {
            if (error instanceof z.ZodError) {
                this.responseHandler.ZOD_ERROR(res, error);
                return;
            }
            this.responseHandler.ERROR(res, 'Server Error');
        }
    };
}

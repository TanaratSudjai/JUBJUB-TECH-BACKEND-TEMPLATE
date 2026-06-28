import type { Request, Response } from 'express';
import { z } from 'zod';
import { UserService } from '../services/UserService.js';
import { ResponseHandler } from '../utils/ResponseHandler.js';
import { paginationSchema } from '../validations/commonValidation.js';
import { registerSchema } from '../validations/userValidation.js';

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
            this.responseHandler.ERROR(res, 'Server Error', 500);
        }
    };

    public getUserById = async (req: Request, res: Response): Promise<void> => {
        try {


            // const idStr = req.params.id as string;
            // const id = parseInt(idStr, 10);

            const id = Number(req.params.id);
            const user = await this.userService.getUserById(id);

            if (!user) {
                this.responseHandler.NOT_FOUND(res, 'User not found');
                return;
            }
            this.responseHandler.SUCCESS(res, user);
        } catch (error) {
            this.responseHandler.ERROR(res, 'Server Error', 500);
        }
    };

    public getUserWithRole = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = Number(req.params.id);
            const user = await this.userService.getUserWithRole(id);

            if (!user) {
                this.responseHandler.NOT_FOUND(res, 'User or Role not found');
                return;
            }
            this.responseHandler.SUCCESS(res, user);
        } catch (error) {
            this.responseHandler.ERROR(res, 'Server Error', 500);
        }
    };

    public registerUser = async (req: Request, res: Response): Promise<void> => {
        try {
            // Validate body
            const body = registerSchema.parse(req.body);

            const result = await this.userService.registerUser(body);
            this.responseHandler.CREATED(res, result);
        } catch (error) {
            if (error instanceof z.ZodError) {
                this.responseHandler.ZOD_ERROR(res, error);
                return;
            }
            if (error instanceof Error && error.message === 'Email is already registered') {
                this.responseHandler.BAD_REQUEST(res, error.message);
                return;
            }
            this.responseHandler.ERROR(res, 'Server Error', 500);
        }
    };
}

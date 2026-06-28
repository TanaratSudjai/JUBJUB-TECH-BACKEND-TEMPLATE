import type { Request, Response } from 'express';
import { UserService } from '../services/UserService.js';

// ชั้นรับ Request จากฝั่ง Client และตอบ Response กลับไป
export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    // ต้องใช้ arrow function เพื่อป้องกันปัญหา this context loss
    public getAllUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json({ error: null, data: users });
        } catch (error) {
            res.status(500).json({ error: 'Server Error', data: null });
        }
    };

    public getUserById = async (req: Request, res: Response): Promise<void> => {
        try {


            // const idStr = req.params.id as string;
            // const id = parseInt(idStr, 10);

            const id = Number(req.params.id);
            const user = await this.userService.getUserById(id);

            if (!user) {
                res.status(404).json({ error: 'User not found', data: null });
                return;
            }
            res.status(200).json({ error: null, data: user });
        } catch (error) {
            res.status(500).json({ error: 'Server Error', data: null });
        }
    };
}

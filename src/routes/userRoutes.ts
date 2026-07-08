import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';
// import { authenticateToken } from '../middlewares/AuthMiddleware.js';

// routes/userRoutes.ts
// ชั้นจับคู่ URL กับฟังก์ชันใน Controller
const router = Router();
const userController = new UserController();

// กำหนด Endpoints
// ต้องมี Token ถึงจะดูข้อมูล User ได้
router.get('/', userController.getAllUsers);

export default router;

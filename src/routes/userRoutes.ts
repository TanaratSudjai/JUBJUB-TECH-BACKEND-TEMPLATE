import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';
import { authenticateToken } from '../middlewares/AuthMiddleware.js';

// routes/userRoutes.ts
// ชั้นจับคู่ URL กับฟังก์ชันใน Controller
const router = Router();
const userController = new UserController();

// กำหนด Endpoints
// ต้องมี Token ถึงจะดูข้อมูล User ได้
router.get('/', authenticateToken, userController.getAllUsers);
router.get('/:id', authenticateToken, userController.getUserById);
router.get('/:id/role', authenticateToken, userController.getUserWithRole);

// ส่วนการสมัครสมาชิกไม่ต้องใช้ Token
router.post('/register', userController.registerUser);

export default router;

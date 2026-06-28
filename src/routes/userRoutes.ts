import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';

// routes/userRoutes.ts
// ชั้นจับคู่ URL กับฟังก์ชันใน Controller
const router = Router();
const userController = new UserController();

// กำหนด Endpoints
router.get('/', userController.getAllUsers);
router.post('/register', userController.registerUser);
router.get('/:id', userController.getUserById);

export default router;

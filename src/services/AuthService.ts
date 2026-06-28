import { UserRepository } from '../repositories/UserRepository.js';
import type { LoginInput } from '../validations/authValidation.js';
import type { User } from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from '../models/Auth.js';

export class AuthService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async login(data: LoginInput): Promise<{ token: string; user: Omit<User, 'user_password'> }> {
        // 1. ค้นหาผู้ใช้จากอีเมล
        const user = await this.userRepository.findByEmail(data.email);
        if (!user || !user.user_password) {
            throw new Error('Invalid email or password');
        }

        // 2. ตรวจสอบรหัสผ่าน
        const isPasswordValid = await bcrypt.compare(data.password, user.user_password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        // 3. สร้าง JWT Token
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }

        const payload: JwtPayload = {
            userId: user.user_id as number,
            email: user.user_email,
            roleId: user.role_id ?? null
        };

        const token = jwt.sign(payload, jwtSecret, { expiresIn: '1d' });

        // 4. ลบ Password ออกจาก User Object ก่อนส่งกลับ
        const { user_password, ...userWithoutPassword } = user;

        return {
            token,
            user: userWithoutPassword
        };
    }
}

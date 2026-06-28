import { UserRepository } from '../repositories/UserRepository.js';
import type { User, UserWithRole } from '../models/User.js';
import type { RegisterInput } from '../validations/userValidation.js';
import bcrypt from 'bcrypt';

// ชั้น Business Logic (ประมวลผลข้อมูล)
export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async getAllUsers(page: number, limit: number): Promise<{ users: User[], total: number }> {
        // อาจจะมีการกรองข้อมูลหรือประมวลผลเพิ่มเติมตรงนี้
        return await this.userRepository.findAll(page, limit);
    }

    public async getUserById(id: number): Promise<User | null> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            return null;
        }
        return user;
    }

    public async getUserWithRole(id: number): Promise<UserWithRole | null> {
        const userWithRole = await this.userRepository.findUserWithRole(id);
        if (!userWithRole) {
            return null;
        }
        return userWithRole;
    }

    public async registerUser(data: RegisterInput): Promise<Omit<User, 'user_password'>> {
        // 1. ตรวจสอบว่าอีเมลนี้มีในระบบหรือยัง
        const existingUser = await this.userRepository.findByEmail(data.userEmail);
        if (existingUser) {
            throw new Error('Email is already registered');
        }

        // 2. เข้ารหัสรหัสผ่าน
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.userPassword, saltRounds);

        // 3. สร้าง User Object เพื่อส่งให้ Repository
        const newUser: User = {
            user_name: data.userName,
            user_email: data.userEmail,
            user_password: hashedPassword,
        };

        const createdUser = await this.userRepository.create(newUser);

        // 4. ลบ Password ออกก่อนส่งกลับไป
        const { user_password, ...userWithoutPassword } = createdUser;
        return userWithoutPassword;
    }
}

import { UserRepository } from '../repositories/UserRepository.js';
import type { User } from '../models/User.js';

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
}

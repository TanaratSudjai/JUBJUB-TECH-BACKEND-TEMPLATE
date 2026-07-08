import { UserRepository } from '../repositories/UserRepository.js';
import type { User } from '../models/User.js';

// ชั้น Business Logic (ประมวลผลข้อมูล)
export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async getAllUsers(page: number, limit: number): Promise<{ users: User[], total: number }> {
        return await this.userRepository.findAll(page, limit);
    }
}

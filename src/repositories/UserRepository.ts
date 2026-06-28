import type { User } from '../models/User.js';

export class UserRepository {
    // จำลองฐานข้อมูลเป็น Array 
    private users: User[] = [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' }
    ];

    public async findAll(): Promise<User[]> {
        // ในสถานการณ์จริงจะเป็นเช่น: return await db.query('SELECT * FROM users');
        return this.users;
    }

    public async findById(id: number): Promise<User | undefined> {
        return this.users.find(u => u.id === id);
    }
}

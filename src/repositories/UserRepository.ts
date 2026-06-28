import type { User } from '../models/User.js';

export class UserRepository {
    // จำลองฐานข้อมูลเป็น Array 
    private users: User[] = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`
    }));

    public async findAll(page: number, limit: number): Promise<{ users: User[], total: number }> {
        // ในสถานการณ์จริงจะเป็นเช่น: return await db.query('SELECT id, name, email FROM users LIMIT $1 OFFSET $2', [limit, offset]);
        const offset = (page - 1) * limit;
        const paginatedUsers = this.users.slice(offset, offset + limit);

        return {
            users: paginatedUsers,
            total: this.users.length
        };
    }

    public async findById(id: number): Promise<User | undefined> {
        return this.users.find(u => u.id === id);
    }
}

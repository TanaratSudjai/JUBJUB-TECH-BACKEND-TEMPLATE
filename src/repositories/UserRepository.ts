import type { User } from '../models/User.js';
import { pool } from '../config/database.js';

export class UserRepository {

    public async findAll(page: number, limit: number): Promise<{ users: User[], total: number }> {
        const offset = (page - 1) * limit;

        const [countResult]: any = await pool.query('SELECT COUNT(*) as count FROM users');
        const total = parseInt(countResult[0].count, 10);

        const [rows]: any = await pool.query(
            `
            SELECT 
                user_id, 
                user_name, 
                user_email, 
                user_phone, 
                user_age, 
                user_avatar, 
                user_status, 
                created_at, 
                created_by, 
                updated_at, 
                updated_by, 
                deleted_at, 
                deleted_by 
            FROM users 
            ORDER BY user_id ASC 
            LIMIT ? OFFSET ?
            `,
            [limit, offset]
        );

        return {
            users: rows as User[],
            total
        };
    }
}

import type { User } from '../models/User.js';
import { pool } from '../config/database.js';

export class UserRepository {

    public async findAll(page: number, limit: number): Promise<{ users: User[], total: number }> {
        const offset = (page - 1) * limit;

        const countResult = await pool.query('SELECT COUNT(*) FROM users');
        const total = parseInt(countResult.rows[0].count, 10);

        const result = await pool.query(
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
            LIMIT $1 OFFSET $2
            `,
            [limit, offset]
        );

        return {
            users: result.rows,
            total
        };
    }

    public async findById(id: number): Promise<User | undefined> {
        const result = await pool.query(
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
            WHERE user_id = $1
            `,
            [id]
        );
        return result.rows[0];
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const result = await pool.query(
            `
            SELECT 
                user_id, 
                user_name, 
                user_email, 
                user_password, 
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
            WHERE user_email = $1
            `,
            [email]
        );
        return result.rows[0];
    }

    public async create(user: User): Promise<User> {
        const result = await pool.query(
            `
            INSERT INTO users (user_name, user_email, user_password) 
            VALUES ($1, $2, $3) 
            RETURNING 
                user_id, 
                user_name, 
                user_email, 
                user_phone, 
                user_age, 
                user_avatar, 
                user_status, 
                created_at
            `,
            [user.user_name, user.user_email, user.user_password]
        );
        return result.rows[0];
    }
}

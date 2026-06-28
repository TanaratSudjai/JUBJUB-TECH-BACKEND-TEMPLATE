import type { User, UserWithRole } from '../models/User.js';
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

    public async findUserWithRole(id: number): Promise<UserWithRole | undefined> {
        const result = await pool.query(
            `
            SELECT 
                u.user_id, 
                u.role_id,
                u.user_name, 
                u.user_email, 
                u.user_phone, 
                u.user_age, 
                u.user_avatar, 
                u.user_status, 
                u.created_at, 
                u.created_by, 
                u.updated_at, 
                u.updated_by, 
                u.deleted_at, 
                u.deleted_by,
                r.role_name,
                r.role_description
            FROM users u 
            JOIN roles r ON u.role_id = r.role_id 
            WHERE u.user_id = $1
            `,
            [id]
        );
        return result.rows[0];
    }
}

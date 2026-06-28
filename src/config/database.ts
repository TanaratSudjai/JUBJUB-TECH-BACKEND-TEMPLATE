import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

export const pool = new Pool({
    host: process.env.DB_HOST ?? 'localhost',
    user: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? '123456',
    database: process.env.DB_NAME ?? 'ba_tung',
    port: Number(process.env.DB_PORT ?? '5432'),
});

export let dbError: string | null = null;

export const connectDB = async () => {
    try {
        const client = await pool.connect();
        console.log(`[DB] Connected to ${pool.options.database} at ${pool.options.host}`);
        client.release();
        dbError = null;
    } catch (err: any) {
        console.error('[DB] Connection error', err);
        dbError = err.message || 'การเชื่อมต่อฐานข้อมูล มีปัญหาน๊า ไปแก้ที่ config/database.ts น๊าาา ~';
    }
};

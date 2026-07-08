import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const pool = mysql.createPool({
    host: process.env.DB_HOST ?? 'localhost',
    user: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME ?? 'ba_tung',
    port: Number(process.env.DB_PORT ?? '3306'),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export let dbError: string | null = null;

export const connectDB = async () => {
    try {
        const connection = await pool.getConnection();
        console.log(`[DB] Connected to database at ${process.env.DB_HOST ?? 'localhost'}`);
        connection.release();
        dbError = null;
    } catch (err: any) {
        console.error('[DB] Connection error', err);
        dbError = err.message || 'การเชื่อมต่อฐานข้อมูล มีปัญหาน๊า ไปแก้ที่ config/database.ts น๊าาา ~';
    }
};

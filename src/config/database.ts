import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

export const pool = new Pool({
    host: process.env.DB_HOST ?? 'localhost',
    user: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? '123456',
    database: process.env.DB_NAME ?? 'ba_tung'
});

export const connectDB = async () => {
    try {
        const client = await pool.connect();
        console.log(`[DB] Connected to ${pool.options.database} at ${pool.options.host}`);
        client.release();
    } catch (err) {
        console.error('[DB] Connection error', err);
    }
};

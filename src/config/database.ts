
export const dbConfig = {
    host: process.env.DB_HOST ?? 'localhost',
    user: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWORD ?? '123456',
    database: process.env.DB_NAME ?? 'ba_tung'
};

export const connectDB = () => {
    console.log(`[DB] Connected to ${dbConfig.database} at ${dbConfig.host}`);
};

export const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'my_database'
};

export const connectDB = () => {
    console.log(`[DB] Connected to ${dbConfig.database} at ${dbConfig.host}`);
};

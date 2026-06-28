import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/database.js';
import userRoutes from './routes/userRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Connect to Database
connectDB();

// Middleware
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);

// Serve static files from the root directory so we can access start.png
app.use(express.static(path.join(__dirname, '..')));

app.get('/', (req: Request, res: Response) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome!</title>
        <style>
            body {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                font-family: 'Comic Sans MS', 'Arial', sans-serif;
                text-align: center;
            }
            .container {
                background: white;
                padding: 40px;
            }
            h1 {
                font-size: 2.5rem;
                margin-bottom: 20px;
            }
            img {
                max-width: 300px;
                transition: transform 0.3s ease-in-out;
            }
            img:hover {
                transform: scale(1.05);
            }
            p {
                font-size: 1.2rem;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <img src="/start.png" alt="Start Image">
            <p>API RUNNING เเล้วจ๊าาาาา ~</p>
        </div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/database.js';
import { RouteLoader } from './utils/routeLoader.js';
import { HomeController } from './controllers/HomeController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ?? '5001';

// Connect to Database
connectDB();

// Middleware
app.use(express.json());

// Auto-load API Routes
await RouteLoader.loadRoutes(app);

// Serve static files from the root directory so we can access start.png
app.use(express.static(path.join(__dirname, '..')));

// render home controller for html 
app.get('/', HomeController.renderStatusPage);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

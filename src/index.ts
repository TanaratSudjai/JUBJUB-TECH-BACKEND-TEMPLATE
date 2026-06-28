import 'dotenv/config';
import express, { type Express } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/database.js';
import { RouteLoader } from './utils/routeLoader.js';
import { HomeController } from './controllers/HomeController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Server {
    private app: Express;
    private port: string | number;
    private homeController: HomeController;
    private routeLoader: RouteLoader;

    constructor() {
        this.app = express();
        this.port = process.env.PORT ?? '5001';
        this.homeController = new HomeController();
        this.routeLoader = new RouteLoader();
    }

    public async serverSetup(): Promise<void> {
        // 1. Connect to Database
        await connectDB();

        // 2. Setup Middleware
        this.app.use(express.json());
        this.app.use(express.static(path.join(__dirname, '..')));

        // 3. Load Routes
        await this.routeLoader.loadRoutes(this.app);

        // 4. Setup Home Page
        this.app.get('/', this.homeController.renderStatusPage);
    }

    public serverStart(): void {
        this.app.listen(this.port, () => {
            console.log(`Server is running at http://localhost:${this.port}`);
        });
    }
}

const server = new Server();
await server.serverSetup();
server.serverStart();

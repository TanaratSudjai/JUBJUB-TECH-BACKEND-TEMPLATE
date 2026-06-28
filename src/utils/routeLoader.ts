import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { Express } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class RouteLoader {
    public static async loadRoutes(app: Express): Promise<void> {
        // อ้างอิง Path ไปที่โฟลเดอร์ ../routes เพราะไฟล์นี้อยู่ในโฟลเดอร์ utils
        const routesPath = path.join(__dirname, '..', 'routes');
        const routeFiles = fs.readdirSync(routesPath).filter((file: string) => file.endsWith('.ts') || file.endsWith('.js'));

        for (const file of routeFiles) {
            // ดึงชื่อข้างหน้า Routes เช่น userRoutes.ts -> user
            const routePrefix = file.replace(/Routes\.(ts|js)$/, '');

            // ทำให้เป็นพหูพจน์ (เติม s) หากยังไม่มี s ต่อท้าย เพื่อคงรูปแบบ /api/users
            const pathName = routePrefix.endsWith('s') ? routePrefix : `${routePrefix}s`;

            // Dynamic import (ต้องใช้ .js สำหรับ ts-node/esm)
            const importPath = `../routes/${file.replace('.ts', '.js')}`;
            const routeModule = await import(importPath);

            app.use(`/api/${pathName}`, routeModule.default);
            console.log(`[Router] Loaded /api/${pathName} from ${file}`);
        }
    }
}

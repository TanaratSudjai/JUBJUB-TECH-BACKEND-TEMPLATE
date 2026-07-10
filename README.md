# Create Thod Full Dev (Backend Template)

เทมเพลต Backend ที่พัฒนาด้วย **Node.js**, **Express**, และ **TypeScript** โดยมีการตั้งค่าเครื่องมือและไลบรารีพื้นฐานต่างๆ ไว้ให้เรียบร้อยแล้ว เช่น การเชื่อมต่อฐานข้อมูล (PostgreSQL) และการตรวจสอบข้อมูล (Data Validation ด้วย Zod) เพื่อช่วยให้คุณสามารถเริ่มต้นพัฒนาโปรเจกต์ใหม่ได้อย่างรวดเร็ว

## Tech Stack

- **Node.js & Express.js**: เฟรมเวิร์กสำหรับสร้าง Web API ที่มีความรวดเร็วและใช้งานง่าย
- **TypeScript**: ส่วนขยายของ JavaScript ที่มีการระบุชนิดตัวแปร (Type) ช่วยลดข้อผิดพลาดในการเขียนโค้ด
- **PostgreSQL (pg)**: ระบบจัดการฐานข้อมูลแบบเชิงสัมพันธ์ (Relational Database)
- **Zod**: ไลบรารีสำหรับสร้าง Schema และทำ Data Validation
- **Nodemon**: เครื่องมือที่ช่วยรีสตาร์ทเซิร์ฟเวอร์โดยอัตโนมัติเมื่อมีการแก้ไขโค้ด

---

## การติดตั้งและการเริ่มต้นโปรเจกต์ใหม่ (Installation)

คุณไม่จำเป็นต้อง Clone โปรเจกต์นี้ด้วยตัวเองอีกต่อไป เพียงแค่ใช้คำสั่ง `npx` เพื่อสร้างโปรเจกต์ใหม่:

```bash
npx create-thod-full-dev <ชื่อโปรเจกต์ของคุณ>
```

ระบบจะทำการสร้างโฟลเดอร์ คัดลอกเทมเพลต และติดตั้ง Dependencies ต่างๆ ให้โดยอัตโนมัติ จากนั้นให้รันคำสั่ง:

```bash
cd <ชื่อโปรเจกต์ของคุณ>
npm run dev
```

เซิร์ฟเวอร์จะรันอยู่ที่ `http://localhost:5001` (หรือพอร์ตที่คุณตั้งในไฟล์ `.env`) คุณสามารถเปิดดูในเบราว์เซอร์เพื่อตรวจสอบหน้า Welcome Page ได้

---

## การตั้งค่า Environment Variables

หลังจากสร้างโปรเจกต์เสร็จ ระบบจะคัดลอกไฟล์ `example.env` เป็นไฟล์ `.env` ให้โดยอัตโนมัติ ให้คุณเข้าไปแก้ไขไฟล์ `.env` เพื่อตั้งค่าการเชื่อมต่อ Database ของคุณ:

```ini
DB_HOST=127.0.0.1
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=5432
PORT=5001
```
*(ห้าม Commit ไฟล์ `.env` ขึ้น Git เด็ดขาด)*

---

## การรันโปรเจกต์ (Running the Project)

**โหมด Development:**
คำสั่งนี้จะรันเซิร์ฟเวอร์และรีสตาร์ทโดยอัตโนมัติเมื่อมีการแก้ไขไฟล์ (ใช้ `nodemon` และ `ts-node`):
```bash
npm run dev
```

**โหมด Production:**
คำสั่งสำหรับการรันเซิร์ฟเวอร์แบบปกติ:
```bash
npm start
```

---

## โครงสร้างโปรเจกต์ (Project Structure)

- `bin/` - สคริปต์สำหรับระบบ `create-thod-full-dev`
- `src/` - เก็บซอร์สโค้ดหลักของแอปพลิเคชัน
  - `config/` - การตั้งค่าต่างๆ เช่น การเชื่อมต่อฐานข้อมูล
  - `controllers/` - ชั้นรับ Request และจัดการ Response
  - `services/` - ชั้นที่เก็บ Business Logic ทั้งหมด
  - `repositories/` - ชั้นสำหรับติดต่อฐานข้อมูล (Query)
  - `models/` - TypeScript Interface / Types
  - `validations/` - Zod Schemas
  - `routes/` - จัดการ Route ของ API (Auto-loaded)
  - `index.ts` - ไฟล์หลักสำหรับรันแอปพลิเคชัน

---

## วิธีเริ่มเขียน API ใหม่ (How to add a new API)

โปรเจกต์นี้ใช้โครงสร้าง **OOP (Object-Oriented Programming)** แบบ **Controller-Service-Repository** โดยมีกฎเหล็กว่าแต่ละ Layer จะต้องแยกความรับผิดชอบกันอย่างชัดเจน:

### 1. สร้าง Model และ Validation (Zod)
- **Model** (`src/models/`): สร้าง TypeScript Interface สำหรับกำหนดรูปร่างของ Data (เช่น `Product.ts`)
- **Validation** (`src/validations/`): สร้าง Zod Schema เพื่อตรวจสอบข้อมูล Request ขาเข้า (เช่น `productValidation.ts`)

### 2. สร้าง Repository (`src/repositories/`)
- สร้างไฟล์ Class เพื่อจัดการ Database Query 
- **ข้อห้าม:** ห้ามใส่ Business Logic ลงใน Repository ให้เน้นการ Query ข้อมูลและ Return ออกมา
```typescript
import { pool } from '../config/database.js';

export class ProductRepository {
    public async findAll() {
        const result = await pool.query('SELECT id, name, price FROM products');
        return result.rows;
    }
}
```

### 3. สร้าง Service (`src/services/`)
- สร้างไฟล์ Class เพื่อจัดการ **Business Logic** ทั้งหมด
- เรียกใช้งาน Repository ภายใน Class นี้
- **ข้อห้าม:** ห้ามยุ่งเกี่ยวกับ `req` หรือ `res` ในชั้นนี้ หากเกิดข้อผิดพลาดให้โยน Error (`throw new Error(...)`) กลับไป
```typescript
import { ProductRepository } from '../repositories/ProductRepository.js';

export class ProductService {
    private productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    public async getProducts() {
        // สามารถใส่ Logic คัดกรองหรือตรวจสอบเงื่อนไขตรงนี้ได้
        return await this.productRepository.findAll();
    }
}
```

### 4. สร้าง Controller (`src/controllers/`)
- สร้างไฟล์ Class เพื่อรับ HTTP Request, ตรวจสอบ Validation เบื้องต้น, แล้วโยนข้อมูลให้ Service ประมวลผล
- ตอบกลับ Client โดยเรียกใช้ `ResponseHandler` แบบ OOP
```typescript
import type { Request, Response } from 'express';
import { ProductService } from '../services/ProductService.js';
import { ResponseHandler } from '../utils/ResponseHandler.js';

export class ProductController {
    private productService: ProductService;
    private responseHandler: ResponseHandler;

    constructor() {
        this.productService = new ProductService();
        this.responseHandler = new ResponseHandler();
    }

    public getProducts = async (req: Request, res: Response): Promise<void> => {
        try {
            const products = await this.productService.getProducts();
            this.responseHandler.SUCCESS(res, products);
        } catch (error) {
            this.responseHandler.ERROR(res, 'เกิดข้อผิดพลาดในการดึงข้อมูล');
        }
    };
}
```

### 5. ลงทะเบียน Route (`src/routes/`)
- สร้างไฟล์ Route (เช่น `productRoutes.ts`) แล้วผูก Path เข้ากับฟังก์ชันใน Controller
```typescript
import { Router } from 'express';
import { ProductController } from '../controllers/ProductController.js';

const router = Router();
const productController = new ProductController();

router.get('/', productController.getProducts);

export default router;
```
*(หมายเหตุ: เมื่อสร้างไฟล์ Route ใหม่ ระบบ `RouteLoader` ใน `index.ts` จะจัดการดึงไฟล์ Route ของคุณไปทำงานโดยอัตโนมัติ ไม่ต้องไปตั้งค่าเพิ่ม)*

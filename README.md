# JUBJUB-TECH-BACKEND-TEMPLATE (ba-tung-backend)

เทมเพลต Backend ที่พัฒนาด้วย **Node.js**, **Express**, และ **TypeScript** โดยมีการตั้งค่าเครื่องมือและไลบรารีพื้นฐานต่างๆ ไว้ให้เรียบร้อยแล้ว เช่น การเชื่อมต่อฐานข้อมูลและการตรวจสอบข้อมูล (Data Validation) เพื่อช่วยให้คุณสามารถเริ่มต้นพัฒนา Backend ได้อย่างรวดเร็ว

## Tech Stack

- **Node.js & Express.js**: เฟรมเวิร์กสำหรับสร้าง Web API ที่มีความรวดเร็วและใช้งานง่าย
- **TypeScript**: ส่วนขยายของ JavaScript ที่มีการระบุชนิดตัวแปร (Type) ช่วยลดข้อผิดพลาดในการเขียนโค้ด
- **PostgreSQL (pg)**: ระบบจัดการฐานข้อมูลแบบเชิงสัมพันธ์ (Relational Database)
- **Zod**: ไลบรารีสำหรับสร้าง Schema และทำ Data Validation สำหรับ TypeScript
- **Nodemon**: เครื่องมือที่ช่วยรีสตาร์ทเซิร์ฟเวอร์โดยอัตโนมัติเมื่อมีการบันทึกไฟล์

## โครงสร้างโปรเจกต์ (Project Structure)

- `src/` - เก็บซอร์สโค้ดหลักของแอปพลิเคชัน
  - `config/` - การตั้งค่าต่างๆ เช่น การเชื่อมต่อฐานข้อมูล
  - `routes/` - จัดการ Route ของ API (เช่น User routes)
  - `index.ts` - ไฟล์หลักสำหรับรันแอปพลิเคชัน

## สิ่งที่ต้องมีก่อนติดตั้ง (Prerequisites)

ก่อนเริ่มต้นใช้งานโปรเจกต์ โปรดตรวจสอบว่าคุณได้ติดตั้งซอฟต์แวร์เหล่านี้แล้ว:
- [Node.js](https://nodejs.org/) (แนะนำให้ใช้เวอร์ชัน 16 หรือสูงกว่า)
- [PostgreSQL](https://www.postgresql.org/)

## การติดตั้ง (Installation)

1. Clone โปรเจกต์ลงมาที่เครื่องของคุณ:
   ```bash
   git clone https://github.com/TanaratSudjai/JUBJUB-TECH-BACKEND-TEMPLATE.git
   cd train-jubjub-backend
   ```

2. ติดตั้ง Dependencies ต่างๆ:
   ```bash
   npm install
   ```

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

เซิร์ฟเวอร์จะรันอยู่ที่ `http://localhost:3000` คุณสามารถเปิดดูในเบราว์เซอร์เพื่อตรวจสอบหน้า Welcome Page ได้

## API Endpoints พื้นฐาน

- `GET /` : หน้า HTML เบื้องต้นสำหรับทดสอบว่าเซิร์ฟเวอร์ทำงานอยู่
- `GET /api/users` : Route หลักสำหรับการจัดการข้อมูล User

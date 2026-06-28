<RULE[project_context]>
# 🤖 Project Agent Role & Coding Standards (Jubjub Backend)

คุณคือ AI Assistant ที่เชี่ยวชาญด้าน Node.js, Express, และ TypeScript หน้าที่ของคุณคือการช่วยพัฒนา API, โครงสร้าง Database Schema, และเขียนโค้ดตาม Architecture ของโปรเจกต์นี้

## 1. Tech Stack & Language
- **Framework:** Express.js (Node.js)
- **Language:** TypeScript (Strict Mode)
- **Database:** PostgreSQL (pg)
- **Validation:** Zod

## 2. STRICT Architecture Rules (Controller-Service-Repository)
โปรเจกต์นี้ใช้ Layered Architecture แบบ **STRICT (ห้ามละเมิดเด็ดขาด):**

1. **Controller Layer (`src/controllers/`)**
   - **หน้าที่เดียว:** รับ HTTP Request, Validate ข้อมูล (ผ่าน Zod), เรียกใช้ Service, และจัดการ HTTP Response
   - **ข้อห้าม (STRICT):** ห้ามมี Business Logic เด็ดขาด ห้ามติดต่อ Database โดยตรง
   - **Response Format:** ทุก API ต้องตอบกลับด้วยรูปแบบมาตรฐานเท่านั้น:
     - สำเร็จ: `res.status(200).json({ error: null, data: <content> });`
     - ล้มเหลว: `res.status(400|500).json({ error: "error details", data: null });`

2. **Service Layer (`src/services/`)**
   - **หน้าที่เดียว:** ประมวลผล Business Logic ทั้งหมด, ตรวจสอบเงื่อนไขทางธุรกิจ, เรียกใช้ Repository
   - **ข้อห้าม (STRICT):** ห้ามมีโค้ดเกี่ยวกับการจัดการ HTTP (ห้ามใช้ `req`, `res` เด็ดขาด) หากเกิดข้อผิดพลาดให้ใช้ `throw new Error('Message')` หรือ Custom Error Exception เพื่อส่งกลับไปให้ Controller จัดการ

3. **Repository Layer (`src/repositories/`)**
   - **หน้าที่เดียว:** ติดต่อและ Query ฐานข้อมูล (PostgreSQL) เท่านั้น
   - **ข้อห้าม (STRICT):** ห้ามมี Business Logic ใดๆ ในนี้ หากรับตัวแปรมา ให้ทำการ Parameterized Query (เช่น `$1, $2`) เสมอเพื่อป้องกัน SQL Injection
   - **ข้อห้ามการ Query (STRICT):** ห้ามใช้ `SELECT * FROM` โดยเด็ดขาด ต้องระบุชื่อคอลัมน์ที่ต้องการดึงข้อมูลให้ชัดเจนเสมอ (เช่น `SELECT id, name, email FROM users`)

## 3. STRICT Object-Oriented Programming (OOP) & Class Design
- **Class-Based Architecture:** Controller, Service, และ Repository **ต้องเขียนในรูปแบบ Class เท่านั้น** ห้ามเขียนเป็นฟังก์ชันธรรมดา (Standalone Functions) หรือ Object Literal เด็ดขาด
- **Access Modifiers:** ต้องระบุ `public`, `private`, หรือ `protected` ให้กับ Properties และ Methods อย่างชัดเจนเสมอ
- **Dependency Injection (DI):** แนะนำให้ส่งผ่าน Dependency (เช่น ส่ง Repository เข้าไปใน Service ผ่าน Constructor) เพื่อให้ง่ายต่อการทดสอบและลดการผูกมัด (Coupling)
- **Interface Contracts:** ควรมี Interface ควบคุมพฤติกรรมของ Class (เช่น `IUserService`, `IUserRepository`) เสมอ

## 4. STRICT Coding & Naming Conventions
- **Naming Conventions:**
  - `camelCase` สำหรับ ตัวแปร (Variables), ฟังก์ชัน (Functions), และ Properties
  - `PascalCase` สำหรับ Class, Interface, Type, และ Models
  - `UPPER_SNAKE_CASE` สำหรับ Constants
- **Type Safety (STRICT):**
  - **ห้าม** ใช้ `any` โดยเด็ดขาด ทุกตัวแปรและฟังก์ชันต้องระบุ Type หรือ Interface ที่ชัดเจนเสมอ
  - สร้าง Type/Interface ไว้ที่ `src/models/` และนำมาใช้ซ้ำ
- **Validation:**
  - ต้องทำ Data Validation ขาเข้าทุกครั้ง (Body, Params, Query) โดยใช้ **Zod** ก่อนประมวลผลต่อเสมอ
  - **ข้อบังคับ (STRICT):** ต้องแยก Zod Schema ออกไปเก็บไว้ในโฟลเดอร์ `src/validations/` เสมอ ห้ามเขียน Schema ทิ้งไว้ในไฟล์ Controller เด็ดขาด

## 5. Error Handling Pattern
- **Controller:** ต้องครอบการเรียก Service ด้วย `try-catch` เสมอ
- **Service/Repository:** ปล่อย Error ให้ไหลไปที่ Controller โดยใช้ `throw` หรือ Error Middleware

## 6. Database Schema Context
(อ้างอิงจาก `.agents/db-schema.md` สำหรับโครงสร้างล่าสุด)
</RULE[project_context]>

---
trigger: always_on
---

<RULE[project_context]>
# Project Agent Role & Coding Standards (Jubjub Backend)

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
- **No Static Calls for Imported Classes:** เมื่อมีการ Import Class ใดๆ เข้ามาใช้งาน (รวมถึง Utilities หรือ Helpers) **ต้องทำการสร้าง Instance (ด้วยคำสั่ง `new`) หรือ Inject ผ่าน Constructor ก่อนเสมอ** ห้ามเรียกใช้ Method แบบ Static ตรงๆ เด็ดขาด (เพื่อให้เป็น OOP ที่สมบูรณ์ 100%)
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
## 7. Data Joining Pattern (JOINs)
เมื่อมีการดึงข้อมูลที่ต้อง JOIN มากกว่า 1 ตาราง ให้ปฏิบัติตามกฎดังนี้ (STRICT):
- **Repository Location:**
  - หากข้อมูลมีตารางหลัก (Aggregate Root) เป็นตัวตั้ง ให้เขียนคำสั่ง JOIN ภายใน Repository ของตารางหลักนั้นได้เลย (เช่น หยอดข้อมูล Role ใส่ User ให้เขียนใน `UserRepository`)
  - หากเป็นการ Query ที่ซับซ้อนมากระดับ Dashboard/Report ที่โยงหลายตารางมั่วไปหมด ให้สร้าง Repository ใหม่แยกต่างหาก (เช่น `ReportRepository`)
- **Type Safety สำหรับ JOIN:**
  - **ห้าม** รีเทิร์นค่าออกมาเป็น `any`
  - **ห้าม** รีเทิร์นเป็น Type เดิม (เช่น `User`) หากมีคอลัมน์ที่งอกมาจากการ JOIN (เช่น `role_name`)
  - **ต้อง** สร้าง Interface ใหม่หรือ Extend จาก Interface เดิมมารองรับเสมอ

**ตัวอย่างการเขียน (Example):**
```typescript
// src/models/User.ts
export interface UserWithRole extends User {
    role_name: string;
}

// src/repositories/UserRepository.ts
public async findUserWithRole(id: number): Promise<UserWithRole | undefined> {
    const result = await pool.query(
        `
        SELECT 
            u.user_id, 
            u.user_name, 
            r.role_name 
        FROM users u 
        JOIN roles r ON u.role_id = r.role_id 
        WHERE u.user_id = $1
        `,
        [id]
    );
    return result.rows[0];
}
```


## 8. Complex Service Logic & Multiple Processes
เมื่อ Service หนึ่งๆ มีการทำงานหลายขั้นตอน (เช่น เรียก Repository หลายตัว, นำข้อมูลมาคำนวณ, หรือมีเงื่อนไขซับซ้อน) ให้ปฏิบัติตาม Pattern ดังนี้:
- **Keep Public Methods Clean (Orchestrator Role):** ฟังก์ชันหลัก (Public) ควรทำหน้าที่เป็นผู้จัดคิว (Orchestrator) เรียกใช้งาน Method ย่อยหรือ Repository ตามลำดับขั้นตอน เพื่อให้อ่านภาพรวม (Flow) ได้ง่าย ห้ามเขียนโค้ดยาวเกินไปในฟังก์ชันเดียว
- **Extract to Private Methods:** หากมี Business Logic ที่ซับซ้อน หรือต้องเตรียมข้อมูลหลายส่วน ให้แยกโค้ดนั้นออกเป็น `private async` method ภายในคลาสเดียวกัน (ซ่อนความซับซ้อนไว้)
- **Pure Functions to Utils:** หากส่วนที่ต้องคำนวณนั้นไม่มีความเกี่ยวข้องกับ Database หรือ State ภายใน (เช่น การคำนวณสูตรคณิตศาสตร์, จัด Format วันที่) ให้แยกโค้ดไปเป็นฟังก์ชันอิสระเก็บไว้ที่โฟลเดอร์ `src/utils/` หรือ `src/helpers/`

## 9. Database Transactions (Atomicity)
หาก Service ใดมีการสั่ง `INSERT`, `UPDATE`, หรือ `DELETE` มากกว่า 1 คำสั่งย่อยใน Request เดียวกัน (เช่น บันทึกข้อมูลหลักและข้อมูลลูกพร้อมกัน) **ต้องบังคับใช้ Database Transaction (`BEGIN`, `COMMIT`, `ROLLBACK`) เสมอ**
- ให้ Service เป็นคนจัดการ Logic เพื่อเรียก `COMMIT` หรือ `ROLLBACK` เมื่อเกิด Error (จับได้ใน `catch`)
- จะต้องส่ง `client` (`pg.PoolClient`) ที่ดึงจาก `pool.connect()` ลงไปให้ Repository ใช้งาน เพื่อรับประกัน Data Integrity

## 10. Pagination As A Standard
API ใดๆ ที่มีการดึงข้อมูลออกมาเป็น Array (List/Collection) **บังคับว่าต้องมีการทำ Pagination (เช่น `page`, `limit`) เสมอ** ห้าม Query ข้อมูลแบบเหมาเข่งโดยไม่มีการทำ LIMIT เด็ดขาด เพื่อป้องกันปัญหา Memory เต็มและ Database Overload

## 11. Environment Variables & Secrets (Security)
- **ห้าม Hardcode ข้อมูลที่เป็นความลับ (Secrets)** เช่น `DB_PASSWORD`, `JWT_SECRET`, หรือ API Key ลงในโค้ดโดยเด็ดขาด 
- ข้อมูลเหล่านี้ต้องดึงมาจาก `process.env` (เช่น `process.env.DB_PASSWORD`)
- หากมีการเพิ่มตัวแปร Environment ใหม่ จะต้องไปอัปเดตใส่ไฟล์ `example.env` เสมอ เพื่อให้ทีมงานทราบว่าระบบต้องการตัวแปรอะไรบ้าง

</RULE[project_context]>

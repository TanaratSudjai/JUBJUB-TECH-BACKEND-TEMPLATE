# 📚 Documentation Guidelines

## API Documentation
การพัฒนา API ทุกครั้งต้องมีการระบุรายละเอียดที่ชัดเจน ดังนี้:
- **Endpoint:** Method และ Path (เช่น `GET /api/users`)
- **Description:** หน้าที่ของ API นี้
- **Request:** 
  - `Headers`: สิ่งที่จำเป็นต้องแนบมา (เช่น Authorization token)
  - `Params / Query`: พารามิเตอร์ต่างๆ
  - `Body`: โครงสร้าง JSON พร้อมชนิดข้อมูล
- **Response:**
  - `Success (200)`: รูปแบบ `{ error: null, data: <content> }`
  - `Error (400, 500, etc.)`: รูปแบบ `{ error: "error details" }`

## Code Comments
- **JSDoc / TSDoc:** ใช้สำหรับอธิบาย Function, Class, หรือ Interface ที่ซับซ้อน
- **Inline Comments:** อธิบายเฉพาะ Logic ที่เข้าใจยาก หรือเหตุผลเบื้องหลังการตัดสินใจ (Why, not What)

## Update Process
เมื่อมีการเปลี่ยนแปลงโครงสร้าง Database หรือเพิ่ม Feature ใหม่ จะต้องอัปเดตไฟล์ `docs.md` และ `db-schema.md` เสมอ

---

## 📝 Example: ตัวอย่างการเขียน API Docs และ JSDoc

### 📌 ตัวอย่าง API Docs (สำหรับการสื่อสารกับ Frontend)
**Endpoint:** `POST /api/users`
**Description:** สร้างบัญชีผู้ใช้งานใหม่ในระบบ
**Request:**
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25
}
```
**Response:**
- **Success (201 Created):**
```json
{
  "error": null,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```
- **Error (400 Bad Request):**
```json
{
  "error": "Email is already taken",
  "data": null
}
```

### 📌 ตัวอย่าง Code Comments (JSDoc สำหรับ Class/Function)
```typescript
/**
 * ดึงข้อมูลผู้ใช้งานตาม ID
 * @param {number} userId - รหัสผู้ใช้งานที่ต้องการค้นหา
 * @returns {Promise<User | null>} คืนค่าข้อมูล User หากพบ หรือ null หากไม่พบ
 * @throws {DatabaseError} หากการเชื่อมต่อ Database มีปัญหา
 */
public async getUserById(userId: number): Promise<User | null> {
    // ใช้ parameterized query ป้องกัน SQL Injection
    return await this.userRepository.findById(userId);
}
```

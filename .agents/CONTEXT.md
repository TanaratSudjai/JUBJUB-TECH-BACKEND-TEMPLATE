# 📌 Project Context

## Overview
โปรเจกต์ JUBJUB-TECH-BACKEND เป็น Backend API สำหรับให้บริการข้อมูลและจัดการ Business Logic ของระบบ โดยถูกออกแบบให้รองรับการสเกลและมีการแยก Layer การทำงานอย่างชัดเจน

## Key Objectives
- ให้บริการ RESTful API ที่มีความเสถียรและปลอดภัย
- จัดการข้อมูลอย่างมีประสิทธิภาพผ่าน Layered Architecture
- สร้างโครงสร้างพื้นฐานที่พร้อมสำหรับการพัฒนาต่อยอด

## System Architecture
- **Controller Layer:** รับ Request, Validate เบื้องต้น, ส่งต่อให้ Service และคืนค่า Response กลับไปยัง Client
- **Service Layer:** ศูนย์กลางของ Business Logic ทั้งหมด ดำเนินการและตัดสินใจตามเงื่อนไขทางธุรกิจ
- **Repository Layer:** รับผิดชอบการติดต่อกับ Database หรือ External Services โดยตรง ซ่อนความซับซ้อนของ Query ไว้
- **Model / Entity:** กำหนดโครงสร้างข้อมูลที่ใช้สื่อสารภายในระบบ

---

## 📝 Example: การเขียนรายละเอียดระบบ (System Details)
*(คุณสามารถแก้ไขเนื้อหาด้านล่างนี้ให้ตรงกับระบบจริงของคุณได้เลย)*

### 📌 System: ระบบจัดการพนักงาน (Employee Management System)
**1. เป้าหมายของระบบ (System Goal):**
ระบบถูกสร้างขึ้นเพื่อจัดการข้อมูลพนักงานของบริษัท Jubjub Tech รวมถึงคำนวณวันลาและจัดเก็บประวัติการทำงาน 

**2. ผู้ใช้งานหลัก (Target Users):**
- **Admin:** สามารถเพิ่ม/ลบพนักงาน และอนุมัติวันลา
- **Employee:** สามารถดูข้อมูลส่วนตัว และกดขอวันลาได้

**3. การเชื่อมต่อภายนอก (External Integrations):**
- เชื่อมต่อกับ AWS S3 สำหรับเก็บรูปภาพ Profile ของพนักงาน
- ส่งแจ้งเตือนผ่าน LINE Notify เมื่อมีการขอลาหยุด

**4. ข้อจำกัดทางเทคนิค (Technical Constraints):**
- API ต้องรองรับผู้ใช้งานพร้อมกันอย่างน้อย 1,000 Concurrent Users
- รูปภาพที่อัปโหลดต้องมีขนาดไม่เกิน 2MB

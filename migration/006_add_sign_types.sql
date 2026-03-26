-- ============================================================
-- Migration: 006_add_sign_types.sql
-- Description: เพิ่มประเภทงานบล็อคพ่นสีและตัดอะไหล่
-- Database: PostgreSQL
-- ============================================================

-- --------------------------------------------------------
-- อัปเดต Enum sign_type เพื่อรองรับงานใหม่
-- --------------------------------------------------------

-- PostgreSQL ไม่สามารถเพิ่มค่าใน ENUM โดยตรงได้ ต้องสร้างใหม่
-- แต่ถ้าใช้วิธี ALTER TYPE ... ADD VALUE ได้ถ้าไม่มีข้อมูลในระบบ

-- วิธีที่ 1: ถ้ายังไม่มีข้อมูล (แนะนำ)
ALTER TYPE sign_type ADD VALUE IF NOT EXISTS 'block-paint';
ALTER TYPE sign_type ADD VALUE IF NOT EXISTS 'cut-parts';

-- --------------------------------------------------------
-- หมายเหตุ:
-- ถ้ามีข้อมูลอยู่แล้วและ ALTER TYPE ไม่ได้ ให้ใช้วิธีสร้าง ENUM ใหม่:
--
-- 1. สร้าง ENUM ใหม่ชั่วคราว
-- CREATE TYPE sign_type_new AS ENUM (
--     'plate', 'non-lit', 'lit', 'lightbox', 'vinyl', 'metal', 'facade',
--     'block-paint', 'cut-parts'
-- );
--
-- 2. แก้ไข column ให้ใช้ ENUM ใหม่
-- ALTER TABLE sign_quotes ALTER COLUMN sign_type TYPE sign_type_new 
--     USING sign_type::text::sign_type_new;
--
-- 3. ลบ ENUM เก่า
-- DROP TYPE sign_type;
--
-- 4. เปลี่ยนชื่อ ENUM ใหม่
-- ALTER TYPE sign_type_new RENAME TO sign_type;
-- --------------------------------------------------------

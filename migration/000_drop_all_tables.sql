-- ============================================================
-- Migration: 000_drop_all_tables.sql
-- Description: ลบตารางทั้งหมดสำหรับการสร้างใหม่ (ใช้ระวัง!)
-- รันคำสั่งนี้ก่อนเพื่อลบข้อมูลเก่าทั้งหมด
-- ============================================================

-- ปิดการตรวจสอบ foreign key ชั่วคราว
SET session_replication_role = 'replica';

-- ลบตาราง (เรียงลำดับตาม dependency)
DROP TABLE IF EXISTS quote_items CASCADE;
DROP TABLE IF EXISTS quote_logs CASCADE;
DROP TABLE IF EXISTS settings CASCADE;
DROP TABLE IF EXISTS sign_quotes CASCADE;

-- ลบ ENUM types
DROP TYPE IF EXISTS quote_status CASCADE;
DROP TYPE IF EXISTS design_file_type CASCADE;
DROP TYPE IF EXISTS light_color_type CASCADE;
DROP TYPE IF EXISTS border_material_type CASCADE;
DROP TYPE IF EXISTS install_method_type CASCADE;
DROP TYPE IF EXISTS wall_type CASCADE;
DROP TYPE IF EXISTS mount_type CASCADE;
DROP TYPE IF EXISTS site_photo_type CASCADE;
DROP TYPE IF EXISTS log_action_type CASCADE;
DROP TYPE IF EXISTS item_type CASCADE;
DROP TYPE IF EXISTS sign_type CASCADE;

-- ลบ Functions
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS generate_quote_code() CASCADE;

-- เปิดการตรวจสอบ foreign key กลับมา
SET session_replication_role = 'origin';

-- แสดงข้อความยืนยัน
SELECT 'All tables dropped successfully' AS status;

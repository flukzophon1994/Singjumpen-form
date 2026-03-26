-- ============================================================
-- Migration: 004_create_settings.sql
-- Description: ตารางเก็บการตั้งค่าระบบ
-- Updated: 2026-03-26
-- ============================================================

-- --------------------------------------------------------
-- Table: settings
-- --------------------------------------------------------

CREATE TABLE settings (
    id SERIAL PRIMARY KEY,
    
    -- ชื่อการตั้งค่า
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    
    -- ค่าการตั้งค่า
    setting_value TEXT,
    
    -- ประเภทข้อมูล (string, number, boolean, json)
    value_type VARCHAR(20) DEFAULT 'string',
    
    -- คำอธิบาย
    description TEXT,
    
    -- กลุ่มการตั้งค่า
    category VARCHAR(50) DEFAULT 'general',
    
    -- สถานะ
    is_active BOOLEAN DEFAULT TRUE,
    
    -- เวลาบันทึก
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------
-- Trigger: อัพเดท updated_at
-- --------------------------------------------------------

CREATE TRIGGER update_settings_updated_at
    BEFORE UPDATE ON settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- --------------------------------------------------------
-- Initial Settings
-- --------------------------------------------------------

INSERT INTO settings (setting_key, setting_value, value_type, description, category) VALUES
    -- ข้อมูลบริษัท
    ('company_name', 'SingJumpen สิงห์จัมป์เอ็น', 'string', 'ชื่อบริษัท', 'company'),
    ('company_email', 'shopitart@gmail.com', 'string', 'อีเมลติดต่อ', 'company'),
    ('company_line', '@singjumpen', 'string', 'Line ID', 'company'),
    ('company_phone', '', 'string', 'เบอร์โทรศัพท์', 'company'),
    ('company_address', '', 'string', 'ที่อยู่บริษัท', 'company'),
    
    -- การตั้งค่าใบเสนอราคา
    ('quote_valid_days', '30', 'number', 'จำนวนวันที่ใบเสนอราคามีผล', 'quote'),
    ('production_days', '7-10', 'string', 'ระยะเวลาผลิต (วันทำการ)', 'quote'),
    ('quote_prefix', 'Q', 'string', 'คำนำหน้ารหัสใบเสนอราคา', 'quote'),
    
    -- การตั้งค่าการแจ้งเตือน
    ('enable_notifications', 'true', 'boolean', 'เปิดใช้งานการแจ้งเตือน', 'system'),
    ('notification_email', '', 'string', 'อีเมลสำหรับรับแจ้งเตือน', 'system'),
    ('notification_line', '', 'string', 'Line Token สำหรับแจ้งเตือน', 'system'),
    
    -- การตั้งค่าการแสดงผล
    ('enable_example_images', 'true', 'boolean', 'เปิดใช้งานรูปตัวอย่าง', 'display'),
    ('default_sign_type', 'plate', 'string', 'ประเภทงานเริ่มต้น', 'display'),
    
    -- การตั้งค่าราคา (เก็บเป็น JSON)
    ('price_settings', '{"minimum_order": 1000, "vat_rate": 7}', 'json', 'ตั้งค่าราคา', 'pricing');

-- --------------------------------------------------------
-- Comments
-- --------------------------------------------------------

COMMENT ON TABLE settings IS 'ตารางเก็บการตั้งค่าระบบ';
COMMENT ON COLUMN settings.value_type IS 'ประเภทข้อมูล: string, number, boolean, json';

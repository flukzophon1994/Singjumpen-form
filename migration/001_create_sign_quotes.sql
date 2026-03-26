-- ============================================================
-- Migration: 001_create_sign_quotes.sql
-- Description: สร้างตารางเก็บข้อมูลฟอร์มขอใบเสนอราคาป้าย SingJumpen
-- Database: PostgreSQL
-- Updated: 2026-03-26 - รองรับ 7 ประเภทป้าย + รูปตัวอย่าง + ข้อมูลหน้างานใหม่
-- ============================================================

-- --------------------------------------------------------
-- Enum Types
-- --------------------------------------------------------

-- สถานะของใบเสนอราคา
CREATE TYPE quote_status AS ENUM (
    'pending',      -- รอดำเนินการ
    'contacted',    -- ติดต่อกลับแล้ว
    'quoted',       -- ออกใบเสนอราคาแล้ว
    'accepted',     -- ลูกค้ายอมรับ
    'rejected',     -- ลูกค้าปฏิเสธ
    'completed',    -- งานเสร็จสิ้น
    'cancelled'     -- ยกเลิก
);

-- ประเภทงานป้าย
CREATE TYPE sign_type AS ENUM (
    'plate',        -- ป้ายแผ่น / เนมเพลท / ป้ายหน้าห้อง
    'non-lit',      -- งานอักษรไม่ไฟ
    'lit',          -- งานอักษรไฟ
    'lightbox',     -- งานกล่องไฟ
    'vinyl',        -- งานป้ายไวนิล
    'metal',        -- งานเหล็ก / รั้ว / ประตู
    'facade'        -- งานฟาซาด / บังตา / ลายฉลุ
);

-- ประเภทไฟล์ออกแบบ
CREATE TYPE design_file_type AS ENUM (
    'have',         -- มีไฟล์แล้ว
    'no'            -- ให้ร้านออกแบบ
);

-- สีไฟ
CREATE TYPE light_color_type AS ENUM (
    'coolwhite',    -- ขาว
    'warmwhite',    -- วอร์มไวท์
    'rgb'           -- RGB
);

-- วัสดุขอบตัวอักษร
CREATE TYPE border_material_type AS ENUM (
    'zinc',         -- ขอบซิงค์
    'alu',          -- ขอบอะลูมิเนียม
    'ss-silver',    -- สแตนเลสเงินเงา
    'ss-hairline',  -- สแตนเลสเงิน Hairline
    'gold-hairline',-- สแตนเลสทอง Hairline
    'gold-mirror'   -- สแตนเลสทอง Mirror
);

-- วิธีเข้าถึงจุดติดตั้ง
CREATE TYPE install_method_type AS ENUM (
    'stand',        -- ยืนติดได้เลย
    'ladder',       -- ใช้บันได
    'scaffold',     -- ตั้งนั่งร้าน 3 ชั้น
    'crane',        -- รถกระเช้า / เครน
    'ready'         -- มีนั่งร้านพร้อมแล้ว
);

-- ประเภทผนัง/พื้นผิว
CREATE TYPE wall_type AS ENUM (
    'metalsheet',   -- เมทัลชีท
    'steelframe',   -- โครงเหล็ก
    'marble',       -- พื้นหินอ่อน
    'slat',         -- พื้นระแนง
    'ready',        -- มีโครงเหล็กรอแล้ว
    'composite'     -- คอมโพสิต
);

-- ลักษณะการติดตั้ง
CREATE TYPE mount_type AS ENUM (
    'wall',         -- แนบผนัง
    'roof',         -- ทำโครงเหล็กตั้งบนหลังคา
    'floor'         -- ทำโครงเหล็กยึดกับพื้น
);

-- รูปถ่ายหน้างาน
CREATE TYPE site_photo_type AS ENUM (
    'yes',          -- มีรูป
    'visit'         -- ให้ร้านไปดูหน้างาน
);

-- --------------------------------------------------------
-- Main Table: sign_quotes
-- --------------------------------------------------------

CREATE TABLE sign_quotes (
    -- Primary Key
    id BIGSERIAL PRIMARY KEY,
    
    -- Reference Code (สำหรับแสดงให้ลูกค้า)
    quote_code VARCHAR(20) UNIQUE NOT NULL,
    
    -- =====================================================
    -- Section 1: ข้อมูลติดต่อ
    -- =====================================================
    
    -- ผู้ติดต่อ
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    line_id VARCHAR(100),
    
    -- ข้อมูลร้าน/ลูกค้า
    shop_name VARCHAR(255) NOT NULL,
    address TEXT,
    
    -- =====================================================
    -- Section 2: เลือกประเภทงาน
    -- =====================================================
    
    sign_type sign_type NOT NULL,
    sign_type_example VARCHAR(10),  -- รูปตัวอย่างที่เลือก (1, 2, 3)
    
    -- =====================================================
    -- Section 3: รายละเอียดตามประเภทงาน (JSON เก็บข้อมูลเฉพาะ)
    -- =====================================================
    
    -- ข้อมูลเฉพาะแต่ละประเภท (JSONB เก็บข้อมูลแบบยืดหยุ่น)
    type_details JSONB DEFAULT '{}'::jsonb,
    
    -- ฟิลด์เดิมที่ยังใช้งาน (สำหรับ backward compatibility)
    design_file design_file_type,
    design_file_url VARCHAR(500),
    design_note TEXT,
    sign_text TEXT,
    logo_included BOOLEAN DEFAULT FALSE,
    sign_width_cm DECIMAL(10, 2),
    sign_height_cm DECIMAL(10, 2),
    letter_height VARCHAR(50),
    light_color light_color_type,
    light_color_custom VARCHAR(100),
    border_material border_material_type,
    timer_included BOOLEAN DEFAULT FALSE,
    
    -- =====================================================
    -- Section 4: ข้อมูลการติดตั้ง (หน้างาน)
    -- =====================================================
    
    -- สถานที่ติดตั้ง
    install_site_name VARCHAR(255),
    install_gps VARCHAR(100),
    install_contact_name VARCHAR(255),
    install_contact_phone VARCHAR(50),
    
    -- ลักษณะหน้างาน
    install_site_type VARCHAR(50),      -- ประเภทสถานที่
    install_site_type_other VARCHAR(100),
    install_height_detail VARCHAR(50),  -- ความสูงติดตั้ง
    install_height VARCHAR(100),
    
    -- การเข้าหน้างาน
    install_access TEXT,                -- การเข้าถึง (comma-separated)
    install_method install_method_type,
    
    -- ผนัง/พื้นผิว
    wall_type wall_type,
    mount_type mount_type,
    
    -- อุปกรณ์ติดตั้ง
    install_equipment TEXT,             -- อุปกรณ์ที่ใช้ (comma-separated)
    install_equipment_other VARCHAR(100),
    
    -- ป้ายเก่า
    old_sign_exists BOOLEAN DEFAULT FALSE,
    
    -- รูปหน้างาน (เก็บ URL หลายรูป)
    site_photo site_photo_type,
    site_photo_url VARCHAR(500),
    site_photo_front_url VARCHAR(500),      -- หน้างานด้านหน้า
    site_photo_install_url VARCHAR(500),    -- บริเวณติดตั้ง
    site_photo_power_url VARCHAR(500),      -- จุดไฟ/ปลั๊ก
    site_photo_surface_url VARCHAR(500),    -- พื้นที่ติดตั้ง
    
    -- =====================================================
    -- Section 5: งบประมาณ & กำหนดการ
    -- =====================================================
    
    budget_amount DECIMAL(12, 2),
    budget_custom VARCHAR(100),
    include_installation BOOLEAN DEFAULT TRUE,
    deadline DATE,
    additional_notes TEXT,
    
    -- =====================================================
    -- Metadata
    -- =====================================================
    
    status quote_status DEFAULT 'pending',
    
    -- ไฟล์แนบ (เก็บเป็น JSON array ของ URLs)
    attachments JSONB DEFAULT '[]'::jsonb,
    
    -- Tracking
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- ผู้รับผิดชอบ
    assigned_to VARCHAR(255),
    
    -- หมายเหตุภายใน
    internal_notes TEXT
);

-- --------------------------------------------------------
-- Indexes
-- --------------------------------------------------------

CREATE INDEX idx_sign_quotes_email ON sign_quotes(email);
CREATE INDEX idx_sign_quotes_phone ON sign_quotes(phone);
CREATE INDEX idx_sign_quotes_status ON sign_quotes(status);
CREATE INDEX idx_sign_quotes_sign_type ON sign_quotes(sign_type);
CREATE INDEX idx_sign_quotes_created_at ON sign_quotes(created_at DESC);
CREATE INDEX idx_sign_quotes_quote_code ON sign_quotes(quote_code);
CREATE INDEX idx_sign_quotes_type_details ON sign_quotes USING GIN (type_details);

-- --------------------------------------------------------
-- Comments
-- --------------------------------------------------------

COMMENT ON TABLE sign_quotes IS 'ตารางเก็บข้อมูลฟอร์มขอใบเสนอราคาป้าย';
COMMENT ON COLUMN sign_quotes.quote_code IS 'รหัสอ้างอิงใบเสนอราคา (เช่น Q-2024-0001)';
COMMENT ON COLUMN sign_quotes.sign_type IS 'ประเภทงานป้าย (7 ประเภท)';
COMMENT ON COLUMN sign_quotes.sign_type_example IS 'รูปตัวอย่างที่เลือก (1, 2, 3)';
COMMENT ON COLUMN sign_quotes.type_details IS 'ข้อมูลเฉพาะแต่ละประเภทงาน (JSONB)';
COMMENT ON COLUMN sign_quotes.install_access IS 'การเข้าถึงหน้างาน (car, bigcar, parkfar, stair, elevator, permission)';
COMMENT ON COLUMN sign_quotes.install_equipment IS 'อุปกรณ์ติดตั้ง (ladder, scaffold, crane, drill, weld, electric, other)';
COMMENT ON COLUMN sign_quotes.attachments IS 'ไฟล์แนบ (รูปหน้างาน, ไฟล์ออกแบบ) เก็บเป็น array ของ URLs';

-- --------------------------------------------------------
-- Trigger: อัพเดท updated_at อัตโนมัติ
-- --------------------------------------------------------

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_sign_quotes_updated_at
    BEFORE UPDATE ON sign_quotes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- --------------------------------------------------------
-- Function: สร้าง Quote Code อัตโนมัติ
-- --------------------------------------------------------

CREATE OR REPLACE FUNCTION generate_quote_code()
RETURNS TRIGGER AS $$
DECLARE
    year_part TEXT;
    sequence_num INTEGER;
    new_code TEXT;
BEGIN
    year_part := TO_CHAR(CURRENT_DATE, 'YYYY');
    
    -- หาเลขลำดับสูงสุดในปีนี้
    SELECT COALESCE(MAX(CAST(SUBSTRING(quote_code FROM '-([0-9]+)$') AS INTEGER)), 0) + 1
    INTO sequence_num
    FROM sign_quotes
    WHERE quote_code LIKE 'Q-' || year_part || '-%';
    
    new_code := 'Q-' || year_part || '-' || LPAD(sequence_num::TEXT, 4, '0');
    NEW.quote_code := new_code;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_quote_code
    BEFORE INSERT ON sign_quotes
    FOR EACH ROW
    WHEN (NEW.quote_code IS NULL)
    EXECUTE FUNCTION generate_quote_code();

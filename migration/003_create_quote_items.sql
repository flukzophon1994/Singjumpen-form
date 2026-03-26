-- ============================================================
-- Migration: 003_create_quote_items.sql
-- Description: สร้างตารางเก็บรายการใบเสนอราคา (หลังจากออกใบเสนอราคาแล้ว)
-- Updated: 2026-03-26 - รองรับ 7 ประเภทงาน
-- ============================================================

-- --------------------------------------------------------
-- Enum Types
-- --------------------------------------------------------

CREATE TYPE item_type AS ENUM (
    'letter',        -- ตัวอักษร
    'frame',         -- โครงเหล็ก
    'installation',  -- ค่าติดตั้ง
    'design',        -- ค่าออกแบบ
    'transport',     -- ค่าขนส่ง
    'timer',         -- Timer เปิด-ปิด
    'material',      -- วัสดุ
    'labor',         -- ค่าแรง
    'other'          -- อื่นๆ
);

-- ประเภทงานสำหรับรายการ
CREATE TYPE quote_item_sign_type AS ENUM (
    'plate',        -- ป้ายแผ่น / เนมเพลท
    'non-lit',      -- งานอักษรไม่ไฟ
    'lit',          -- งานอักษรไฟ
    'lightbox',     -- งานกล่องไฟ
    'vinyl',        -- งานป้ายไวนิล
    'metal',        -- งานเหล็ก / รั้ว / ประตู
    'facade',       -- งานฟาซาด / บังตา
    'general'       -- ทั่วไป
);

-- --------------------------------------------------------
-- Table: quote_items
-- --------------------------------------------------------

CREATE TABLE quote_items (
    id BIGSERIAL PRIMARY KEY,
    
    -- อ้างอิงถึง sign_quotes
    quote_id BIGINT NOT NULL REFERENCES sign_quotes(id) ON DELETE CASCADE,
    
    -- รายละเอียดรายการ
    item_type item_type NOT NULL,
    sign_type quote_item_sign_type DEFAULT 'general',
    description TEXT NOT NULL,
    
    -- จำนวนและหน่วย
    quantity DECIMAL(10, 2) NOT NULL DEFAULT 1,
    unit VARCHAR(50) NOT NULL DEFAULT 'ชิ้น',
    
    -- ราคา
    unit_price DECIMAL(12, 2) NOT NULL,
    total_price DECIMAL(12, 2) NOT NULL,
    
    -- ลำดับแสดง
    sort_order INTEGER DEFAULT 0,
    
    -- หมายเหตุ
    notes TEXT,
    
    -- สถานะรายการ
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Tracking
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------
-- Indexes
-- --------------------------------------------------------

CREATE INDEX idx_quote_items_quote_id ON quote_items(quote_id);
CREATE INDEX idx_quote_items_item_type ON quote_items(item_type);
CREATE INDEX idx_quote_items_sign_type ON quote_items(sign_type);

-- --------------------------------------------------------
-- Trigger: อัพเดท updated_at
-- --------------------------------------------------------

CREATE TRIGGER update_quote_items_updated_at
    BEFORE UPDATE ON quote_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- --------------------------------------------------------
-- Comments
-- --------------------------------------------------------

COMMENT ON TABLE quote_items IS 'รายการในใบเสนอราคา (สร้างหลังจากออกใบเสนอราคาแล้ว)';
COMMENT ON COLUMN quote_items.sign_type IS 'ประเภทงานที่เกี่ยวข้อง (สำหรับจัดกลุ่มรายการ)';

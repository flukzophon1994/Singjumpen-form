-- ============================================================
-- Migration: 002_create_quote_logs.sql
-- Description: สร้างตารางเก็บประวัติการเปลี่ยนแปลงสถานะ
-- Updated: 2026-03-26
-- ============================================================

-- --------------------------------------------------------
-- Enum Type
-- --------------------------------------------------------

CREATE TYPE log_action_type AS ENUM (
    'created',           -- สร้างรายการใหม่
    'status_changed',    -- เปลี่ยนสถานะ
    'contacted',         -- ติดต่อกลับ
    'quote_sent',        -- ส่งใบเสนอราคา
    'note_added',        -- เพิ่มหมายเหตุ
    'assigned',          -- มอบหมายงาน
    'file_attached',     -- แนบไฟล์
    'modified',          -- แก้ไขข้อมูล
    'example_selected'   -- เลือกตัวอย่างงาน
);

-- --------------------------------------------------------
-- Table: quote_logs
-- --------------------------------------------------------

CREATE TABLE quote_logs (
    id BIGSERIAL PRIMARY KEY,
    
    -- อ้างอิงถึง sign_quotes
    quote_id BIGINT NOT NULL REFERENCES sign_quotes(id) ON DELETE CASCADE,
    
    -- ประเภทการกระทำ
    action log_action_type NOT NULL,
    
    -- คำอธิบาย
    description TEXT,
    
    -- สถานะเก่า -> ใหม่ (กรณีเปลี่ยนสถานะ)
    old_status VARCHAR(50),
    new_status VARCHAR(50),
    
    -- ผู้ดำเนินการ (system หรือ username)
    performed_by VARCHAR(255) DEFAULT 'system',
    
    -- เวลาบันทึก
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- ข้อมูลเพิ่มเติม (เก็บเป็น JSON)
    metadata JSONB DEFAULT '{}'::jsonb
);

-- --------------------------------------------------------
-- Indexes
-- --------------------------------------------------------

CREATE INDEX idx_quote_logs_quote_id ON quote_logs(quote_id);
CREATE INDEX idx_quote_logs_created_at ON quote_logs(created_at DESC);
CREATE INDEX idx_quote_logs_action ON quote_logs(action);

-- --------------------------------------------------------
-- Comments
-- --------------------------------------------------------

COMMENT ON TABLE quote_logs IS 'ประวัติการเปลี่ยนแปลงและกิจกรรมของใบเสนอราคา';
COMMENT ON COLUMN quote_logs.metadata IS 'ข้อมูลเพิ่มเติม เช่น {sign_type: "plate", example: "1"}';

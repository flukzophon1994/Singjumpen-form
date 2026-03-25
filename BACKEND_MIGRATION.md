# Backend Database Migration

## Columns ที่ต้องเพิ่มในตาราง `quotes`

```sql
-- เพิ่ม column สำหรับเก็บ URL ไฟล์จาก Cloudinary
ALTER TABLE quotes 
ADD COLUMN design_file_url VARCHAR(500) NULL COMMENT 'URL ไฟล์ออกแบบจาก Cloudinary';

ALTER TABLE quotes 
ADD COLUMN site_photo_url VARCHAR(500) NULL COMMENT 'URL รูปถ่ายหน้างานจาก Cloudinary';
```

---

## ตัวอย่าง Schema ที่อัปเดตแล้ว

```sql
CREATE TABLE quotes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  
  -- ข้อมูลติดต่อ (มีอยู่แล้ว)
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  line_id VARCHAR(100),
  shop_name VARCHAR(255),
  address TEXT,
  
  -- รายละเอียดป้าย (มีอยู่แล้ว)
  design_file VARCHAR(50),
  design_note TEXT,
  sign_text TEXT,
  logo_included VARCHAR(10),
  sign_width_cm VARCHAR(50),
  sign_height_cm VARCHAR(50),
  letter_height VARCHAR(100),
  light_color VARCHAR(50),
  light_color_custom VARCHAR(100),
  border_material VARCHAR(100),
  timer_included VARCHAR(10),
  
  -- การติดตั้ง (มีอยู่แล้ว)
  install_height VARCHAR(50),
  install_method VARCHAR(100),
  wall_type VARCHAR(100),
  mount_type VARCHAR(100),
  old_sign_exists VARCHAR(10),
  site_photo VARCHAR(50),
  
  -- งบประมาณ (มีอยู่แล้ว)
  budget_amount VARCHAR(100),
  include_installation VARCHAR(10),
  deadline DATE,
  additional_notes TEXT,
  
  -- ✅ Columns ใหม่ - เพิ่มเข้ามา
  design_file_url VARCHAR(500) NULL,
  site_photo_url VARCHAR(500) NULL,
  
  -- Metadata (มีอยู่แล้ว)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## API Endpoint ที่ต้องอัปเดต

### `POST /api/quotes`

รับเพิ่มจาก request body:
```json
{
  "design_file_url": "https://res.cloudinary.com/.../design.pdf",
  "site_photo_url": "https://res.cloudinary.com/.../photo.jpg"
}
```

บันทึกลง database ในคอลัมน์ `design_file_url` และ `site_photo_url`

---

## ตัวอย่างโค้ด Backend (Node.js/Express)

```javascript
// Routes
app.post('/api/quotes', async (req, res) => {
  const {
    email, name, phone, line_id, shop_name, address,
    design_file, design_note, sign_text, logo_included,
    sign_width_cm, sign_height_cm, letter_height,
    light_color, light_color_custom, border_material, timer_included,
    install_height, install_method, wall_type, mount_type,
    old_sign_exists, site_photo,
    budget_amount, include_installation, deadline, additional_notes,
    // ✅ รับข้อมูลใหม่
    design_file_url,
    site_photo_url
  } = req.body;

  const query = `
    INSERT INTO quotes (
      email, name, phone, line_id, shop_name, address,
      design_file, design_note, sign_text, logo_included,
      sign_width_cm, sign_height_cm, letter_height,
      light_color, light_color_custom, border_material, timer_included,
      install_height, install_method, wall_type, mount_type,
      old_sign_exists, site_photo,
      budget_amount, include_installation, deadline, additional_notes,
      design_file_url, site_photo_url
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    email, name, phone, line_id, shop_name, address,
    design_file, design_note, sign_text, logo_included,
    sign_width_cm, sign_height_cm, letter_height,
    light_color, light_color_custom, border_material, timer_included,
    install_height, install_method, wall_type, mount_type,
    old_sign_exists, site_photo,
    budget_amount, include_installation, deadline, additional_notes,
    design_file_url,  // ✅ เพิ่ม
    site_photo_url    // ✅ เพิ่ม
  ];

  try {
    const [result] = await db.execute(query, values);
    
    // ส่ง email แจ้งเตือน (ถ้ามีการตั้งค่า)
    // สามารถส่งลิงก์ดาวน์โหลดไฟล์ไปในอีเมลได้
    
    res.status(201).json({
      success: true,
      message: 'บันทึกข้อมูลสำเร็จ',
      id: result.insertId
    });
  } catch (error) {
    console.error('Error saving quote:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล'
    });
  }
});
```

---

## สรุป

| Column | Type | คำอธิบาย |
|--------|------|---------|
| `design_file_url` | `VARCHAR(500)` | URL ไฟล์ออกแบบจาก Cloudinary (https://...) |
| `site_photo_url` | `VARCHAR(500)` | URL รูปถ่ายหน้างานจาก Cloudinary (https://...) |

**หมายเหตุ:** 
- ใช้ `VARCHAR(500)` เพราะ URL จาก Cloudinary ยาวได้มาก
- ตั้งเป็น `NULL` เพราะไม่ใช่ทุกคนจะแนบไฟล์

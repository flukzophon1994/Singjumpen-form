# EmailJS Setup Guide

## ตัวแปรที่ใช้ได้ใน Template

| ตัวแปร | คำอธิบาย |
|---------|----------|
| `{{to_email}}` | อีเมลผู้รับ |
| `{{to_name}}` | ชื่อผู้รับ |
| `{{from_name}}` | ชื่อผู้ส่ง |
| `{{subject}}` | หัวข้ออีเมล |
| `{{message}}` | ข้อความแบบเต็ม (รายละเอียดทั้งหมด) |
| `{{customer_name}}` | ชื่อลูกค้า |
| `{{customer_email}}` | อีเมลลูกค้า |
| `{{customer_phone}}` | เบอร์โทรลูกค้า |
| `{{shop_name}}` | ชื่อร้าน |
| `{{budget}}` | งบประมาณ |
| `{{deadline}}` | วันที่ต้องการ |

---

## Template แบบ HTML (แนะนำ)

```html
<div style="font-family: 'Sarabun', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #333; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">
    📋 ใบขอใบเสนอราคา - ป้ายร้าน
  </h2>
  
  <p style="color: #666;">เรียน {{to_name}},</p>
  
  <p>เราได้รับข้อมูลของคุณแล้ว รายละเอียดดังนี้:</p>
  
  <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
    <pre style="margin: 0; white-space: pre-wrap; font-family: inherit;">{{message}}</pre>
  </div>
  
  <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
  
  <h3 style="color: #333;">ข้อมูลสรุป</h3>
  <table style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>ชื่อ:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">{{customer_name}}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>อีเมล:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">{{customer_email}}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>เบอร์โทร:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">{{customer_phone}}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>ชื่อร้าน:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">{{shop_name}}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>งบประมาณ:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">{{budget}}</td>
    </tr>
    <tr>
      <td style="padding: 8px;"><strong>วันที่ต้องการ:</strong></td>
      <td style="padding: 8px;">{{deadline}}</td>
    </tr>
  </table>
  
  <div style="margin-top: 30px; padding: 15px; background: #e8f4fd; border-radius: 5px;">
    <p style="margin: 0; color: #0066cc;">
      <strong>📞 ทีมงานจะติดต่อกลับภายใน 1-3 วันทำการ</strong>
    </p>
  </div>
  
  <p style="color: #999; font-size: 12px; margin-top: 30px;">
    อีเมลนี้ส่งจาก {{from_name}}
  </p>
</div>
```

---

## Template แบบ Plain Text

```
เรียน {{to_name}},

เราได้รับข้อมูลขอใบเสนอราคาของคุณแล้ว

{{message}}

---
ทีมงานจะติดต่อกลับภายใน 1-3 วันทำการ

ติดต่อเรา:
📞 092-969-6595 (จอย) / 065-695-9956 (ณรงค์)
💬 Line: @singjumpen
✉️ {{from_name}}
```

---

## วิธีสร้าง Template ใน EmailJS

1. เข้าไปที่ https://dashboard.emailjs.com/admin/templates
2. คลิก "Create New Template"
3. เลือก "HTML" หรือ "Text"
4. วางโค้ด template ด้านบน
5. คลิก "Save"
6. คัดลอก Template ID (เช่น `template_xxxxxx`)
7. นำไปใส่ใน `src/services/emailService.ts`

---

## การตั้งค่าในโปรเจกต์

แก้ไขไฟล์ `src/services/emailService.ts`:

```typescript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_xxxxxx',     // จาก EmailJS Dashboard
  TEMPLATE_ID: 'template_xxxxxx',   // จากที่สร้างข้างต้น
  PUBLIC_KEY: 'xxxxxxxxxxxxxx',     // จาก Account > API Keys
};
```

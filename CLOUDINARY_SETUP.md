# วิธีตั้งค่า Cloudinary

## ขั้นตอนที่ 1: สมัคร Cloudinary

1. เข้าไปที่ https://cloudinary.com
2. สมัครบัญชีฟรี (Free tier)
3. เข้า Dashboard

## ขั้นตอนที่ 2: หา Cloud Name

ใน Dashboard จะเห็น **Cloud Name** (เช่น `dxk5z9h5z`)

## ขั้นตอนที่ 3: สร้าง Upload Preset

1. ไปที่ **Settings** (เฟืองมุมขวาบน)
2. เลือกแท็บ **Upload**
3. เลื่อนลงมาหา **Upload presets**
4. คลิก **"Add upload preset"**
5. ตั้งค่าดังนี้:
   - **Upload preset name**: `singjumpen_unsigned`
   - **Signing Mode**: `Unsigned` ⭐ สำคัญ!
   - **Folder**: `singjumpen-quotes`
   - คลิก **Save**

## ขั้นตอนที่ 4: สร้างไฟล์ .env

ในโฟลเดอร์โปรเจกต์ (เดียวกับ package.json) สร้างไฟล์ `.env`:

```bash
# สร้างไฟล์ .env
touch .env
```

แล้วใส่ค่า (แก้ไขตามของคุณ):

```env
VITE_CLOUDINARY_CLOUD_NAME=dxk5z9h9z
VITE_CLOUDINARY_UPLOAD_PRESET=singjumpen_unsigned
```

## ขั้นตอนที่ 5: รีสตาร์ทเซิร์ฟเวอร์

```bash
npm run dev
```

## ขั้นตอนที่ 6: ทดสอบ

ลองส่งฟอร์มพร้อมแนบไฟล์ ควรจะเห็น:
- ไฟล์อัปโหลดไป Cloudinary
- URL ปรากฏในอีเมล

---

## โครงสร้างโฟลเดอร์ใน Cloudinary

```
singjumpen-quotes/
├── designs/     # ไฟล์ออกแบบ
└── photos/      # รูปถ่ายหน้างาน
```

---

## แก้ไขปัญหาเบื้องต้น

| ปัญหา | แก้ไข |
|-------|--------|
| "Cloudinary not configured" | ตรวจสอบว่ามีไฟล์ `.env` และค่าถูกต้อง |
| "Upload preset not found" | ตรวจสอบชื่อ Upload Preset ใน Cloudinary |
| "Invalid cloud name" | ตรวจสอบ Cloud Name ในหน้า Dashboard |
| อัปโหลดไม่ผ่าน | ตรวจสอบว่า Upload Preset ตั้งเป็น **Unsigned** |

---

## ตัวอย่างค่าที่ถูกต้อง

```env
VITE_CLOUDINARY_CLOUD_NAME=dxabc123def
VITE_CLOUDINARY_UPLOAD_PRESET=singjumpen_unsigned
```

**หมายเหตุ**: ไม่ต้องมีเครื่องหมายคำพูด `""`

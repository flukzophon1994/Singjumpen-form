# 🏪 Sign Quote Request Form

> แบบฟอร์มขอใบเสนอราคาป้ายไฟ LED สำหรับร้านค้าออนไลน์

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

## 📋 รายละเอียดโปรเจกต์

ระบบแบบฟอร์มออนไลน์แบบหลายขั้นตอน (Multi-step Form) สำหรับลูกค้าที่ต้องการขอใบเสนอราคาป้ายไฟ LED โดยลูกค้าสามารถกรอกข้อมูลรายละเอียดป้าย ข้อมูลการติดตั้ง และงบประมาณได้ครบถ้วน

## ✨ ฟีเจอร์หลัก

- 📝 **แบบฟอร์ม 4 ขั้นตอน** พร้อม Progress Bar
  - ขั้นตอนที่ 1: ข้อมูลติดต่อ
  - ขั้นตอนที่ 2: รายละเอียดป้าย (ขนาด, สีไฟ, วัสดุขอบ)
  - ขั้นตอนที่ 3: ข้อมูลการติดตั้ง
  - ขั้นตอนที่ 4: งบประมาณและกำหนดส่งมอบ
- 🎨 **UI สวยงาม** ด้วย shadcn/ui + Tailwind CSS
- 📱 **Responsive Design** รองรับทุกขนาดหน้าจอ
- 🔄 **State Management** ด้วย React Hooks
- ✅ **Form Validation** พร้อม User Experience ที่ดี
- 🧪 **Testing** ครบถ้วนด้วย Vitest และ Playwright

## 🛠️ เทคโนโลยีที่ใช้

| เทคโนโลยี | รายละเอียด |
|-----------|-----------|
| **Framework** | React 18.3 + TypeScript 5.8 |
| **Build Tool** | Vite 5.4 |
| **Styling** | Tailwind CSS 3.4 |
| **UI Components** | shadcn/ui + Radix UI |
| **Routing** | React Router DOM 6 |
| **State Management** | TanStack Query 5 |
| **Form Handling** | React Hook Form + Zod |
| **Icons** | Lucide React |
| **Testing** | Vitest + Playwright |
| **Linting** | ESLint 9 |

## 📁 โครงสร้างโปรเจกต์

```
Singjumpen-form/
├── src/
│   ├── components/
│   │   ├── sign-form/          # Components ของแบบฟอร์ม
│   │   │   ├── HeroHeader.tsx  # ส่วนหัวของเพจ
│   │   │   ├── ProgressBar.tsx # แสดงความคืบหน้า
│   │   │   ├── NavBar.tsx      # แถบนำทาง ถัดไป/กลับ
│   │   │   ├── Section1Contact.tsx    # ขั้นตอนที่ 1
│   │   │   ├── Section2Details.tsx    # ขั้นตอนที่ 2
│   │   │   ├── Section3Install.tsx    # ขั้นตอนที่ 3
│   │   │   ├── Section4Budget.tsx     # ขั้นตอนที่ 4
│   │   │   ├── SuccessScreen.tsx      # หน้าสำเร็จ
│   │   │   └── useSignForm.ts         # Custom Hook จัดการ State
│   │   └── ui/                 # shadcn/ui components
│   ├── pages/
│   │   ├── Index.tsx           # หน้าหลัก
│   │   └── NotFound.tsx        # หน้า 404
│   ├── hooks/                  # Custom React Hooks
│   ├── lib/                    # Utility functions
│   └── test/                   # Test files
├── public/                     # Static assets
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md
```

## 🚀 การติดตั้งและรัน

### ความต้องการระบบ

- Node.js 18+
- Bun หรือ npm/pnpm/yarn

### ขั้นตอนการติดตั้ง

```bash
# 1. Clone โปรเจกต์
git clone <repository-url>
cd Singjumpen-form

# 2. ติดตั้ง dependencies (ใช้ Bun)
bun install

# หรือใช้ npm
npm install
```

### คำสั่งที่ใช้งาน

```bash
# รัน Development Server
bun run dev
# หรือ
npm run dev

# Build สำหรับ Production
bun run build
# หรือ
npm run build

# Build โหมด Development
bun run build:dev

# รัน Tests
bun run test
# หรือ
npm run test

# รัน Tests แบบ Watch Mode
bun run test:watch

# Preview Production Build
bun run preview

# รัน ESLint
bun run lint
```

## 🧪 การทดสอบ

โปรเจกต์นี้มีระบบทดสอบครบถ้วน:

- **Unit Tests** - Vitest สำหรับทดสอบ Components และ Functions
- **E2E Tests** - Playwright สำหรับทดสอบการทำงานแบบ End-to-End

```bash
# รันทุก Tests
bun run test

# รัน Vitest แบบ Watch Mode
bun run test:watch

# รัน Playwright Tests
npx playwright test
```

## 📝 ข้อมูลฟอร์มที่รองรับ

### ขั้นตอนที่ 1: ข้อมูลติดต่อ
- อีเมล
- ชื่อ-นามสกุล
- เบอร์โทรศัพท์
- Line ID
- ชื่อร้านค้า
- ที่อยู่ร้านค้า

### ขั้นตอนที่ 2: รายละเอียดป้าย
- ไฟล์ออกแบบ (มี/ไม่มี)
- ข้อความบนป้าย
- โลโก้ (ใส่/ไม่ใส่)
- ขนาดป้าย (กว้าง x สูง)
- ความสูงตัวอักษร
- สีแสงไฟ (ขาว Cool/Warm, RGB, กำหนดเอง)
- วัสดุขอบป้าย (ซิงค์, อะลูมิเนียม, สแตนเลสต่างๆ)
- Timer (ต้องการ/ไม่ต้องการ)

### ขั้นตอนที่ 3: ข้อมูลการติดตั้ง
- ความสูงที่ติดตั้ง
- วิธีการติดตั้ง (ยืนติด/บันได/นั่งร้าน/รถกระเช้า)
- ประเภทผนัง (เมทัลชีท/โครงเหล็ก/หินอ่อน/ฯลฯ)
- วิธียึดติด (แนบผนัง/โครงหลังคา/ยึดพื้น)
- ป้ายเก่า (มี/ไม่มี)
- รูปหน้างาน (มี/ให้ร้านไปดู)

### ขั้นตอนที่ 4: งบประมาณ
- งบประมาณที่ต้องการ
- รวมติดตั้งหรือไม่
- กำหนดส่งมอบ
- หมายเหตุเพิ่มเติม

## 🤝 การมีส่วนร่วม

หากต้องการมีส่วนร่วมในโปรเจกต์นี้:

1. Fork โปรเจกต์
2. สร้าง Branch ใหม่ (`git checkout -b feature/AmazingFeature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add some AmazingFeature'`)
4. Push ไปยัง Branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request

## 📄 License

โปรเจกต์นี้อยู่ภายใต้ [MIT License](LICENSE)

---

<p align="center">
  สร้างด้วย ❤️ โดย Singjumpen
</p>

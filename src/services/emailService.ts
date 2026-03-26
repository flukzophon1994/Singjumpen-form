import emailjs from '@emailjs/browser';
import type { SignFormData } from '@/components/sign-form/useSignForm';

// EmailJS Configuration
// คุณต้องสมัครบัญชีที่ https://www.emailjs.com/ และสร้าง Service, Template
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_u4i563w',      // แก้ไขตามที่ได้จาก EmailJS
  TEMPLATE_ID: 'template_yguaynx',   // แก้ไขตามที่ได้จาก EmailJS
  PUBLIC_KEY: '1XB8vE9XqVNMJ2SmH',              // แก้ไขตามที่ได้จาก EmailJS
};

export interface EmailData {
  to_email: string;
  to_name: string;
  from_name: string;
  subject: string;
  message: string;
  [key: string]: string;
}

// Extended SignFormData with URL fields
type SignFormDataWithUrls = SignFormData & {
  design_file_url?: string;
  site_photo_url?: string;
  sitePhotoFrontUrl?: string;
  sitePhotoInstallUrl?: string;
  sitePhotoPowerUrl?: string;
  sitePhotoSurfaceUrl?: string;
  signTypeExampleUrl?: string;
};

/**
 * แปลงข้อมูลฟอร์มเป็นรูปแบบข้อความสำหรับส่งอีเมล
 */
// Helper function to format date to Thai format
const formatThaiDate = (dateStr: string): string => {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  
  const thaiMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  const day = date.getDate();
  const month = thaiMonths[date.getMonth()];
  const year = date.getFullYear() + 543; // Convert to Buddhist year
  
  return `${day} ${month} ${year}`;
};

// Label mappings matching Section5Budget.tsx
const plateTypeLabels: Record<string, string> = {
  acrylic: 'ป้ายอะคริลิค',
  etched: 'ป้ายกัดกรด',
  machine: 'ป้ายเนมเพลทเครื่องจักร',
  room: 'ป้ายหน้าห้อง',
};

const nonLitTypeLabels: Record<string, string> = {
  pvc: 'อักษรพลาสวูด',
  acrylic: 'อักษรอะคริลิค',
  'metal-rim': 'อักษรโลหะยกขอบ',
  'ss-silver-gloss': 'อักษรสแตนเลสเงินเงา',
  'ss-silver-hairline': 'อักษรสแตนเลสเงินแฮร์ไลน์',
  'ss-gold-gloss': 'อักษรสแตนเลสทองเงา',
  'ss-gold-hairline': 'อักษรสแตนเลสทองแฮร์ไลน์',
  'ss-acrylic': 'อักษรสแตนเลสรองหลังอะคริลิค',
};

const litTypeLabels: Record<string, string> = {
  'aluminum-rim': 'อักษรไฟสว่างหน้า ขอบอะลูมิเนียม',
  'zinc-rim': 'อักษรไฟสว่างหน้า ขอบซิงค์พ่นสี',
  'ss-silver-gloss': 'อักษรไฟสว่างหน้า ขอบสแตนเลสเงินเงา',
  'ss-silver-hairline': 'อักษรไฟสว่างหน้า ขอบสแตนเลสเงินแฮร์ไลน์',
  'ss-gold-gloss': 'อักษรไฟสว่างหน้า ขอบสแตนเลสทองเงา',
  'ss-gold-hairline': 'อักษรไฟสว่างหน้า ขอบสแตนเลสทองแฮร์ไลน์',
  'front-lit': 'อักษรด้านหน้า (Front Lit)',
  'back-lit': 'อักษรด้านหลัง (Back Lit)',
  'side-lit': 'อักษรขอบ (Side Lit)',
  neon: 'อักษรนีออน (Neon)',
};

const lightboxTypeLabels: Record<string, string> = {
  fabric: 'กล่องไฟผ้า',
  acrylic: 'กล่องไฟอะคริลิค',
  'round-acrylic': 'กล่องไฟอะคริลิคกลม',
  'round-fabric': 'กล่องไฟผ้ากลม',
};

const vinylTypeLabels: Record<string, string> = {
  banner: 'ป้ายไวนิลธรรมดา',
  'backlit-banner': 'ป้ายไวนิล Backlit',
  sticker: 'สติ๊กเกอร์ติดกระจก',
  'floor-sticker': 'สติ๊กเกอร์ติดพื้น',
  'vehicle-wrap': 'สติ๊กเกอร์ติดรถ',
};

const metalTypeLabels: Record<string, string> = {
  fence: 'รั้วเหล็ก',
  gate: 'ประตูเหล็ก',
  'steel-structure': 'โครงสร้างเหล็ก',
  railing: 'ราวบันได',
  canopy: 'กันสาด',
};

const facadeTypeLabels: Record<string, string> = {
  cnc: 'ฟาซาดลายฉลุ CNC',
  slat: 'บังตา/ระแนง',
  composite: 'คอมโพสิต',
};

const materialLabels: Record<string, string> = {
  'acrylic-clear': 'อะคริลิคใส',
  'acrylic-white': 'อะคริลิคขาว',
  'acrylic-black': 'อะคริลิคดำ',
  'acrylic-color': 'อะคริลิคสี',
  stainless: 'สแตนเลส',
  aluminum: 'อลูมิเนียม',
  brass: 'ทองเหลือง',
  'stainless-silver': 'สแตนเลสเงิน',
  'stainless-gold': 'สแตนเลสทอง',
  'stainless-black': 'สแตนเลสดำ',
  'stainless-rose': 'สแตนเลสโรสโกลด์',
  pvc: 'พลาสวูด',
  steel: 'เหล็ก',
};

const thicknessLabels: Record<string, string> = {
  '2mm': '2 มิลลิเมตร',
  '3mm': '3 มิลลิเมตร',
  '5mm': '5 มิลลิเมตร',
  '8mm': '8 มิลลิเมตร',
  '10mm': '10 มิลลิเมตร',
  '15mm': '15 มิลลิเมตร',
  '20mm': '20 มิลลิเมตร',
};

const finishLabels: Record<string, string> = {
  'silver-gloss': 'เงินเงา',
  'silver-hairline': 'เงินแฮร์ไลน์',
  'gold-gloss': 'ทองเงา',
  'gold-hairline': 'ทองแฮร์ไลน์',
  'black-matte': 'ดำด้าน',
  white: 'ขาว',
  custom: 'สีพ่นตามแบบ',
  mirror: 'กระจกเงา',
  brush: 'แฮร์ไลน์',
  paint: 'พ่นสี',
  'raw-metal': 'โลหะดิบ',
};

const installLabels: Record<string, string> = {
  nut: 'เจาะรูน็อต',
  tape: 'ติดกาวสองหน้า',
  silicone: 'ติดกาวซิลิโคน',
  standoff: 'รองเสาลอย',
  pickup: 'ไม่ติดตั้ง รับเฉพาะชิ้นงาน',
  wall: 'ติดผนัง',
  hanging: 'แขวน',
  standing: 'ตั้งพื้น',
};

const detailLabels: Record<string, string> = {
  'uv-print': 'พิมพ์ UV',
  screen: 'สกรีน',
  sticker: 'สติ๊กเกอร์ติด',
  etched: 'กัดกรด',
  engrave: 'กัดลาย',
  laser: 'ยิงเลเซอร์',
  carve: 'แกะสลัก',
};

const lightColorLabels: Record<string, string> = {
  'cool-white': 'ขาว (Cool White)',
  'warm-white': 'วอร์มไวท์',
  rgb: 'RGB',
  red: 'แดง',
  green: 'เขียว',
  blue: 'น้ำเงิน',
  daylight: 'Daylight',
  'milky-white': 'ขาวนม',
};

const systemLabels: Record<string, string> = {
  'led-module': 'LED Module',
  'led-strip': 'LED Strip',
  neon: 'นีออน',
  'led-pixel': 'LED Pixel',
};

const lightboxMaterialLabels: Record<string, string> = {
  fabric: 'ผ้า',
  acrylic: 'อะคริลิค',
  'pet-g': 'PET-G',
};

const printQualityLabels: Record<string, string> = {
  standard: 'มาตรฐาน',
  high: 'สูง (High Resolution)',
  'photo-grade': 'ระดับภาพถ่าย',
};

const heightDetailLabels: Record<string, string> = {
  'under2m': 'ต่ำกว่า 2 เมตร',
  '2-3m': '2–3 เมตร',
  '3-5m': '3–5 เมตร',
  'over5m': '5 เมตรขึ้นไป',
};

const installSiteTypeLabels: Record<string, string> = {
  house: 'บ้าน',
  shophouse: 'อาคารพาณิชย์',
  shop: 'ร้านค้า',
  factory: 'โรงงาน',
  mall: 'ห้าง',
  office: 'ออฟฟิศ',
  condo: 'คอนโด',
  other: 'อื่น ๆ',
};

const formatFormDataToEmail = (data: SignFormDataWithUrls): string => {
  const budgetDisplay = data.budgetCustom || (data.budget && data.budget !== 'other' ? `${parseInt(data.budget).toLocaleString()} บาท` : '—');
  
  const radioLabels: Record<string, Record<string, string>> = {
    signType: {
      plate: 'ป้ายแผ่น / เนมเพลท / ป้ายหน้าห้อง',
      'non-lit': 'งานอักษรไม่ไฟ',
      lit: 'งานอักษรไฟ',
      lightbox: 'งานกล่องไฟ',
      vinyl: 'งานป้ายไวนิล',
      metal: 'งานเหล็ก / รั้ว / ประตู',
      facade: 'งานฟาซาด / บังตา / ลายฉลุ',
      'block-paint': 'งานบล็อคพ่นสี',
      'cut-parts': 'งานตัดอะไหล่',
    },
    designFile: { have: 'มีไฟล์แล้ว', no: 'ให้ร้านออกแบบ' },
    logo: { yes: 'ใส่โลโก้', no: 'ไม่ใส่โลโก้' },
    lightColor: { coolwhite: 'ขาว (Cool White)', warmwhite: 'วอร์มไวท์', rgb: 'RGB' },
    borderMaterial: { zinc: 'ขอบซิงค์', alu: 'ขอบอะลูมิเนียม', 'ss-silver': 'สแตนเลสเงินเงา', 'ss-hairline': 'สแตนเลสเงิน Hairline', 'gold-hairline': 'สแตนเลสทอง Hairline', 'gold-mirror': 'สแตนเลสทอง Mirror' },
    timer: { yes: 'ต้องการ Timer', no: 'ไม่ต้องการ' },
    installMethod: { stand: 'ยืนติดได้เลย', ladder: 'ใช้บันได', scaffold: 'นั่งร้าน 3 ชั้น', crane: 'รถกระเช้า/เครน', ready: 'มีนั่งร้านพร้อม' },
    wallType: { metalsheet: 'เมทัลชีท', steelframe: 'โครงเหล็ก', marble: 'หินอ่อน', slat: 'ระแนง', ready: 'มีโครงเหล็กรอแล้ว', composite: 'คอมโพสิต' },
    mountType: { wall: 'แนบผนัง', roof: 'โครงเหล็กบนหลังคา', floor: 'โครงเหล็กยึดพื้น' },
    oldSign: { yes: 'มี ต้องรื้อก่อน', no: 'ไม่มี' },
    sitePhoto: { yes: 'มีรูป จะส่งให้', visit: 'ให้ร้านไปดูหน้างาน' },
    includeInstall: { yes: 'รวมค่าติดตั้ง', no: 'นำไปติดเอง' },
  };

  const getLabel = (field: string, value: string): string => {
    return radioLabels[field]?.[value] || value || '—';
  };

  // สร้างรายการไฟล์แนบ
  const attachmentsList: string[] = [];
  if (data.design_file_url) attachmentsList.push(`📎 ไฟล์ออกแบบ: ${data.design_file_url}`);
  if (data.signTypeExampleUrl) attachmentsList.push(`📎 รูปตัวอย่างที่เลือก: ${data.signTypeExampleUrl}`);
  if (data.site_photo_url) attachmentsList.push(`📎 รูปหน้างาน: ${data.site_photo_url}`);
  if (data.sitePhotoFrontUrl) attachmentsList.push(`📎 รูปหน้างานด้านหน้า: ${data.sitePhotoFrontUrl}`);
  if (data.sitePhotoInstallUrl) attachmentsList.push(`📎 รูปบริเวณติดตั้ง: ${data.sitePhotoInstallUrl}`);
  if (data.sitePhotoPowerUrl) attachmentsList.push(`📎 รูปจุดไฟ/ปลั๊ก: ${data.sitePhotoPowerUrl}`);
  if (data.sitePhotoSurfaceUrl) attachmentsList.push(`📎 รูปพื้นที่ติดตั้ง: ${data.sitePhotoSurfaceUrl}`);

  // รายละเอียดตามประเภทงาน - แสดงแบบสรุปเหมือน Section5Budget
  let typeSpecificDetails = '';
  
  if (data.signType === 'plate') {
    typeSpecificDetails = `
📋 รายละเอียดป้ายแผ่น/เนมเพลท
----------------------------------------------
ประเภท: ${plateTypeLabels[data.plateType] || data.plateType || '—'}
ข้อความ/เนื้อหา: ${data.plateContent || '—'}
ขนาด: ${data.plateWidth && data.plateHeight ? `${data.plateWidth} × ${data.plateHeight} เซนติเมตร` : '—'}
จำนวน: ${data.plateQuantity ? `${data.plateQuantity} ชิ้น` : '—'}
วัสดุ: ${materialLabels[data.plateMaterial] || data.plateMaterial || '—'}
ความหนา: ${data.plateThickness || '—'}
รายละเอียดงาน: ${detailLabels[data.plateDetail] || data.plateDetail || '—'}
สี/ฟินิช: ${finishLabels[data.plateFinish] || data.plateFinish || '—'}
วิธีติดตั้ง: ${installLabels[data.plateInstall] || data.plateInstall || '—'}
หมายเหตุ: ${data.plateNote || '—'}
`;
  } else if (data.signType === 'non-lit') {
    typeSpecificDetails = `
📋 รายละเอียดงานอักษรไม่ไฟ
----------------------------------------------
ประเภท: ${nonLitTypeLabels[data.nonLitType] || data.nonLitType || '—'}
ข้อความ: ${data.nonLitText || '—'}
จำนวน: ${data.nonLitQuantity ? `${data.nonLitQuantity} ชิ้น` : '—'}
ความสูงตัวอักษร: ${data.nonLitLetterHeight ? `${data.nonLitLetterHeight} เซนติเมตร` : '—'}
วัสดุ: ${materialLabels[data.nonLitMaterial] || data.nonLitMaterial || '—'}
ฟินิช: ${finishLabels[data.nonLitFinish] || data.nonLitFinish || '—'}
วิธีติดตั้ง: ${installLabels[data.nonLitInstall] || data.nonLitInstall || '—'}
หมายเหตุ: ${data.nonLitNote || '—'}
`;
  } else if (data.signType === 'lit') {
    typeSpecificDetails = `
📋 รายละเอียดงานอักษรไฟ
----------------------------------------------
ประเภท: ${litTypeLabels[data.litType] || data.litType || '—'}
ข้อความ: ${data.litText || '—'}
โลโก้: ${data.litLogo || '—'}
จำนวน: ${data.litQuantity ? `${data.litQuantity} ชิ้น` : '—'}
ความสูงตัวอักษร: ${data.litLetterHeight ? `${data.litLetterHeight} เซนติเมตร` : '—'}
สีอะคริลิค: ${data.litAcrylicColor || '—'}
สีไฟ: ${lightColorLabels[data.litLightColor] || data.litLightColor || '—'}
ระบบไฟ: ${systemLabels[data.litSystem] || data.litSystem || '—'}
วิธีติดตั้ง: ${installLabels[data.litInstall] || data.litInstall || '—'}
หมายเหตุ: ${data.litNote || '—'}
`;
  } else if (data.signType === 'lightbox') {
    typeSpecificDetails = `
📋 รายละเอียดงานกล่องไฟ
----------------------------------------------
ประเภท: ${lightboxTypeLabels[data.lightboxType] || data.lightboxType || '—'}
ข้อความ/เนื้อหา: ${data.lightboxContent || '—'}
ขนาด: ${data.lightboxWidth && data.lightboxHeight ? `${data.lightboxWidth} × ${data.lightboxHeight} × ${data.lightboxDepth || '-'} เซนติเมตร` : '—'}
จำนวน: ${data.lightboxQuantity ? `${data.lightboxQuantity} ชิ้น` : '—'}
วัสดุหน้า: ${lightboxMaterialLabels[data.lightboxFaceMaterial] || data.lightboxFaceMaterial || '—'}
วัสดุเฟรม: ${data.lightboxFrameMaterial || '—'}
สีไฟ: ${lightColorLabels[data.lightboxLightColor] || data.lightboxLightColor || '—'}
หมายเหตุ: ${data.lightboxNote || '—'}
`;
  } else if (data.signType === 'vinyl') {
    typeSpecificDetails = `
📋 รายละเอียดงานป้ายไวนิล
----------------------------------------------
ประเภท: ${vinylTypeLabels[data.vinylType] || data.vinylType || '—'}
ข้อความ/เนื้อหา: ${data.vinylContent || '—'}
ขนาด: ${data.vinylWidth && data.vinylHeight ? `${data.vinylWidth} × ${data.vinylHeight} เซนติเมตร` : '—'}
จำนวน: ${data.vinylQuantity ? `${data.vinylQuantity} ชิ้น` : '—'}
วัสดุ: ${data.vinylMaterialType || '—'}
คุณภาพการพิมพ์: ${printQualityLabels[data.vinylPrintQuality] || data.vinylPrintQuality || '—'}
การติดตั้ง: ${installLabels[data.vinylInstallType] || data.vinylInstallType || '—'}
หมายเหตุ: ${data.vinylNote || '—'}
`;
  } else if (data.signType === 'metal') {
    typeSpecificDetails = `
📋 รายละเอียดงานเหล็ก/รั้ว/ประตู
----------------------------------------------
ประเภท: ${metalTypeLabels[data.metalType] || data.metalType || '—'}
ข้อความ/เนื้อหา: ${data.metalContent || '—'}
ขนาด: ${data.metalWidth && data.metalHeight ? `${data.metalWidth} × ${data.metalHeight} เซนติเมตร` : '—'}
จำนวน: ${data.metalQuantity ? `${data.metalQuantity} ชิ้น` : '—'}
วัสดุ: ${materialLabels[data.metalMaterial] || data.metalMaterial || '—'}
ฟินิช: ${finishLabels[data.metalFinish] || data.metalFinish || '—'}
การชุบ/เคลือบ: ${data.metalCoating || '—'}
วิธีติดตั้ง: ${installLabels[data.metalInstallType] || data.metalInstallType || '—'}
อุปกรณ์เสริม: ${data.metalAccessories || '—'}
หมายเหตุ: ${data.metalNote || '—'}
`;
  } else if (data.signType === 'facade') {
    typeSpecificDetails = `
📋 รายละเอียดงานฟาซาด/บังตา/ลายฉลุ
----------------------------------------------
ประเภท: ${facadeTypeLabels[data.facadeType] || data.facadeType || '—'}
ข้อความ/เนื้อหา: ${data.facadeContent || '—'}
ขนาด: ${data.facadeWidth && data.facadeHeight ? `${data.facadeWidth} × ${data.facadeHeight} เซนติเมตร` : '—'}
จำนวน: ${data.facadeQuantity ? `${data.facadeQuantity} ชิ้น` : '—'}
วัสดุ: ${materialLabels[data.facadeMaterial] || data.facadeMaterial || '—'}
ลายฉลุ: ${data.facadePattern || '—'}
การติดตั้ง: ${installLabels[data.facadeInstallType] || data.facadeInstallType || '—'}
หมายเหตุ: ${data.facadeNote || '—'}
`;
  } else if (data.signType === 'install-only') {
    typeSpecificDetails = `
📋 รายละเอียดงานติดตั้งอย่างเดียว
----------------------------------------------
ประเภทบริการ: ${data.installOnlyType || '—'}
รายละเอียดงาน: ${data.installOnlyDetails || '—'}
ขนาด/ปริมาณ: ${data.installOnlySize || '—'}
`;
  } else if (data.signType === 'block-paint') {
    typeSpecificDetails = `
📋 รายละเอียดงานบล็อคพ่นสี
----------------------------------------------
ขนาด: ${data.blockPaintWidth && data.blockPaintLength ? `${data.blockPaintWidth} × ${data.blockPaintLength} เซนติเมตร` : '—'}
จำนวน: ${data.blockPaintQuantity ? `${data.blockPaintQuantity} ชิ้น` : '—'}
วัสดุ: ${data.blockPaintMaterial === 'other' ? data.blockPaintMaterialOther : data.blockPaintMaterial || '—'}
ข้อความ: ${data.blockPaintText || '—'}
หมายเหตุ: ${data.blockPaintNote || '—'}
`;
  } else if (data.signType === 'cut-parts') {
    typeSpecificDetails = `
📋 รายละเอียดงานตัดอะไหล่
----------------------------------------------
จำนวน: ${data.cutPartsQuantity ? `${data.cutPartsQuantity} ชิ้น` : '—'}
วัสดุ: ${data.cutPartsMaterial || '—'}
ความหนา: ${data.cutPartsThickness ? `${data.cutPartsThickness} มม.` : '—'}
ส่งแบบ: ${data.cutPartsInputType === 'file' ? 'ส่งไฟล์' : data.cutPartsInputType === 'sample' ? 'ส่งงานจริง' : '—'}
ร้านทำแบบ: ${data.cutPartsDesignBy === 'shop-design' ? 'ร้านทำแบบให้' : data.cutPartsDesignBy === 'customer-design' ? 'แจ้ง ก ย' : '—'}
หมายเหตุ: ${data.cutPartsNote || '—'}
`;
  }

  // ข้อมูลติดตั้งหน้างานใหม่
  const installSiteDetails = data.installSiteName || data.installGps || data.installContactName || data.installContactPhone || data.installSiteType
    ? `
📍 ข้อมูลสถานที่ติดตั้ง
----------------------------------------------
ชื่อสถานที่: ${data.installSiteName || '—'}
พิกัด GPS: ${data.installGps || '—'}
ผู้ประสานงาน: ${data.installContactName || '—'}
เบอร์ติดต่อ: ${data.installContactPhone || '—'}
ประเภทสถานที่: ${data.installSiteType === 'other' ? data.installSiteTypeOther : getLabel('installSiteType', data.installSiteType)}
ความสูงติดตั้ง: ${data.installHeightDetail || '—'}
การเข้าหน้างาน: ${data.installAccess || '—'}
อุปกรณ์ที่ใช้: ${data.installEquipment || '—'}
`
    : '';

  return `
==============================================
📋 ใบขอใบเสนอราคา - ป้ายร้าน Singjumpen
==============================================

📞 ข้อมูลติดต่อ
----------------------------------------------
ชื่อ-นามสกุล: ${data.name || '—'}
อีเมล: ${data.email || '—'}
เบอร์โทร: ${data.phone || '—'}
LINE ID: ${data.lineId || '—'}
ชื่อร้าน/บริษัท: ${data.shopName || '—'}

📍 ที่อยู่
----------------------------------------------
${data.address || '—'}

🏷️ ประเภทงาน
----------------------------------------------
ประเภท: ${getLabel('signType', data.signType)}
${data.signTypeExample ? `ตัวอย่างที่เลือก: แบบที่ ${data.signTypeExample}` : ''}
${typeSpecificDetails}
${installSiteDetails}
${data.signType !== 'block-paint' && data.signType !== 'cut-parts' ? `
🔧 ข้อมูลการติดตั้ง
----------------------------------------------
ความสูงจากพื้น: ${data.installHeight || '—'}
วิธีเข้าถึง: ${getLabel('installMethod', data.installMethod)}
ผนัง/พื้นผิว: ${getLabel('wallType', data.wallType)}
ลักษณะติดตั้ง: ${getLabel('mountType', data.mountType)}
ป้ายเก่า: ${getLabel('oldSign', data.oldSign)}
รูปหน้างาน: ${getLabel('sitePhoto', data.sitePhoto)}
` : ''}

📎 ไฟล์แนบ (Cloudinary URLs)
----------------------------------------------
${attachmentsList.length > 0 ? attachmentsList.join('\n') : 'ไม่มีไฟล์แนบ'}

💰 งบประมาณและกำหนดการ
----------------------------------------------
งบประมาณ: ${budgetDisplay}
ค่าติดตั้ง: ${getLabel('includeInstall', data.includeInstall)}
วันที่ต้องการ: ${formatThaiDate(data.deadline)}
หมายเหตุ: ${data.note || '—'}

==============================================
ส่งเมื่อ: ${new Date().toLocaleString('th-TH')}
==============================================
`;
};

/**
 * ส่งอีเมลด้วย EmailJS
 */
export const sendQuoteEmail = async (
  formData: SignFormData,
  recipientEmail: string = '' // อีเมลผู้รับ (ถ้าไม่ระบุจะใช้อีเมลจากฟอร์ม)
): Promise<{ success: boolean; message: string }> => {
  try {
    // ตรวจสอบว่ามีการตั้งค่า EmailJS หรือไม่
    if (
      EMAILJS_CONFIG.SERVICE_ID === 'service_your_service_id' ||
      EMAILJS_CONFIG.TEMPLATE_ID === 'template_your_template_id' ||
      EMAILJS_CONFIG.PUBLIC_KEY === 'your_public_key'
    ) {
      console.warn('⚠️ EmailJS ยังไม่ได้ตั้งค่า กรุณาอัปเดต EMAILJS_CONFIG ใน src/services/emailService.ts');
      return {
        success: false,
        message: 'ยังไม่ได้ตั้งค่า EmailJS กรุณาตั้งค่า SERVICE_ID, TEMPLATE_ID และ PUBLIC_KEY',
      };
    }

    const data = formData as SignFormDataWithUrls;
    const toEmail = recipientEmail || formData.email;
    const emailContent = formatFormDataToEmail(data);

    const templateParams = {
      to_email: toEmail,
      to_name: formData.name,
      from_name: 'Singjumpen Sign Form',
      subject: `ใบขอใบเสนอราคา - ${formData.shopName || formData.name}`,
      message: emailContent,
      // ส่งข้อมูลแยกเป็น fields สำหรับใช้ใน template
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      shop_name: formData.shopName,
      sign_type: formData.signType,
      budget: formData.budget === 'other' ? formData.budgetCustom : `${parseInt(formData.budget || '0').toLocaleString()} บาท`,
      deadline: formatThaiDate(formData.deadline),
      // URL ไฟล์จาก Cloudinary - ทุกรูปและไฟล์
      design_file_url: data.design_file_url || '',
      site_photo_url: data.site_photo_url || '',
      site_photo_front_url: data.sitePhotoFrontUrl || '',
      site_photo_install_url: data.sitePhotoInstallUrl || '',
      site_photo_power_url: data.sitePhotoPowerUrl || '',
      site_photo_surface_url: data.sitePhotoSurfaceUrl || '',
      sign_type_example_url: data.signTypeExampleUrl || '',
      // รูปตัวอย่างที่เลือก
      sign_type_example: formData.signTypeExample,
      // ข้อมูลการจัดส่ง (สำหรับงานไม่มีติดตั้ง)
      delivery_method: data.deliveryMethod || '',
      delivery_method_label: data.deliveryMethod === 'pickup' ? 'รับที่ร้าน' : data.deliveryMethod === 'delivery' ? 'จัดส่ง' : data.deliveryMethod === 'lalamove' ? 'เรียก Lalamove' : '',
      delivery_name: data.deliveryName || data.deliveryPickupName || data.deliveryLalamoveName || '',
      delivery_phone: data.deliveryPhone || data.deliveryPickupPhone || data.deliveryLalamovePhone || '',
      delivery_address: data.deliveryAddress || data.deliveryLalamoveAddress || '',
      delivery_gps: data.deliveryGps || '',
      delivery_note: data.deliveryNote || data.deliveryPickupNote || data.deliveryLalamoveNote || '',
      // Flag สำหรับตรวจสอบว่าเป็นงานไม่มีติดตั้งหรือไม่
      is_delivery_only: data.signType === 'block-paint' || data.signType === 'cut-parts' ? 'true' : 'false',
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    console.log('✅ Email sent successfully:', response);
    return {
      success: true,
      message: 'ส่งอีเมลสำเร็จ',
    };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการส่งอีเมล',
    };
  }
};

/**
 * ตรวจสอบว่า EmailJS ได้รับการตั้งค่าหรือยัง
 */
export const isEmailJSConfigured = (): boolean => {
  return (
    EMAILJS_CONFIG.SERVICE_ID !== 'service_your_service_id' &&
    EMAILJS_CONFIG.TEMPLATE_ID !== 'template_your_template_id' &&
    EMAILJS_CONFIG.PUBLIC_KEY !== 'your_public_key'
  );
};

export default {
  sendQuoteEmail,
  isEmailJSConfigured,
  EMAILJS_CONFIG,
};

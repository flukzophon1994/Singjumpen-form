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

const formatFormDataToEmail = (data: SignFormDataWithUrls): string => {
  const size = data.signWidth && data.signHeight ? `${data.signWidth} × ${data.signHeight} cm` : '—';
  const budgetDisplay = data.budgetCustom || (data.budget && data.budget !== 'other' ? `${parseInt(data.budget).toLocaleString()} บาท` : '—');
  const letterHeight = data.letterHeight === 'ระบุเอง' ? data.letterHeightCustom : data.letterHeight;
  
  const radioLabels: Record<string, Record<string, string>> = {
    signType: {
      plate: 'ป้ายแผ่น / เนมเพลท / ป้ายหน้าห้อง',
      'non-lit': 'งานอักษรไม่ไฟ',
      lit: 'งานอักษรไฟ',
      lightbox: 'งานกล่องไฟ',
      vinyl: 'งานป้ายไวนิล',
      metal: 'งานเหล็ก / รั้ว / ประตู',
      facade: 'งานฟาซาด / บังตา / ลายฉลุ',
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

  // รายละเอียดตามประเภทงาน
  let typeSpecificDetails = '';
  
  if (data.signType === 'plate') {
    typeSpecificDetails = `
📋 รายละเอียดป้ายแผ่น/เนมเพลท
----------------------------------------------
ประเภท: ${data.plateType || '—'}
ข้อความ/เนื้อหา: ${data.plateContent || '—'}
ขนาด: ${data.plateWidth || '—'} × ${data.plateHeight || '—'} cm
จำนวน: ${data.plateQuantity || '—'} ชิ้น
วัสดุ: ${data.plateMaterial || '—'}
ความหนา: ${data.plateThickness || '—'}
รายละเอียดงาน: ${data.plateDetail || '—'}
สี/ฟินิช: ${data.plateFinish || '—'}
วิธีติดตั้ง: ${data.plateInstall || '—'}
หมายเหตุ: ${data.plateNote || '—'}
`;
  } else if (data.signType === 'non-lit') {
    typeSpecificDetails = `
📋 รายละเอียดงานอักษรไม่ไฟ
----------------------------------------------
ประเภท: ${data.nonLitType || '—'}
ข้อความ: ${data.nonLitText || '—'}
จำนวน: ${data.nonLitQuantity || '—'} ชิ้น
ความสูงตัวอักษร: ${data.nonLitLetterHeight || '—'}
วัสดุ: ${data.nonLitMaterial || '—'}
ฟินิช: ${data.nonLitFinish || '—'}
วิธีติดตั้ง: ${data.nonLitInstall || '—'}
หมายเหตุ: ${data.nonLitNote || '—'}
`;
  } else if (data.signType === 'lit') {
    typeSpecificDetails = `
📋 รายละเอียดงานอักษรไฟ
----------------------------------------------
ประเภท: ${data.litType || '—'}
ข้อความ: ${data.litText || '—'}
โลโก้: ${data.litLogo || '—'}
จำนวน: ${data.litQuantity || '—'} ชิ้น
ความสูงตัวอักษร: ${data.litLetterHeight || '—'}
สีอะคริลิค: ${data.litAcrylicColor || '—'}
สีไฟ: ${data.litLightColor || '—'}
ระบบไฟ: ${data.litSystem || '—'}
วิธีติดตั้ง: ${data.litInstall || '—'}
หมายเหตุ: ${data.litNote || '—'}
`;
  } else if (data.signType === 'lightbox') {
    typeSpecificDetails = `
📋 รายละเอียดงานกล่องไฟ
----------------------------------------------
ประเภท: ${data.lightboxType || '—'}
ข้อความ/เนื้อหา: ${data.lightboxContent || '—'}
ขนาด: ${data.lightboxWidth || '—'} × ${data.lightboxHeight || '—'} × ${data.lightboxDepth || '—'} cm
จำนวน: ${data.lightboxQuantity || '—'} ชิ้น
วัสดุหน้า: ${data.lightboxFaceMaterial || '—'}
วัสดุเฟรม: ${data.lightboxFrameMaterial || '—'}
สีไฟ: ${data.lightboxLightColor || '—'}
หมายเหตุ: ${data.lightboxNote || '—'}
`;
  } else if (data.signType === 'vinyl') {
    typeSpecificDetails = `
📋 รายละเอียดงานป้ายไวนิล
----------------------------------------------
ประเภท: ${data.vinylType || '—'}
ข้อความ/เนื้อหา: ${data.vinylContent || '—'}
ขนาด: ${data.vinylWidth || '—'} × ${data.vinylHeight || '—'} cm
จำนวน: ${data.vinylQuantity || '—'} ชิ้น
วัสดุ: ${data.vinylMaterialType || '—'}
คุณภาพการพิมพ์: ${data.vinylPrintQuality || '—'}
การติดตั้ง: ${data.vinylInstallType || '—'}
หมายเหตุ: ${data.vinylNote || '—'}
`;
  } else if (data.signType === 'metal') {
    typeSpecificDetails = `
📋 รายละเอียดงานเหล็ก/รั้ว/ประตู
----------------------------------------------
ประเภท: ${data.metalType || '—'}
ข้อความ/เนื้อหา: ${data.metalContent || '—'}
ขนาด: ${data.metalWidth || '—'} × ${data.metalHeight || '—'} cm
จำนวน: ${data.metalQuantity || '—'} ชิ้น
วัสดุ: ${data.metalMaterial || '—'}
ความหนา: ${data.metalThickness || '—'}
ฟินิช: ${data.metalFinish || '—'}
การชุบ/เคลือบ: ${data.metalCoating || '—'}
วิธีติดตั้ง: ${data.metalInstallType || '—'}
อุปกรณ์เสริม: ${data.metalAccessories || '—'}
หมายเหตุ: ${data.metalNote || '—'}
`;
  } else if (data.signType === 'facade') {
    typeSpecificDetails = `
📋 รายละเอียดงานฟาซาด/บังตา/ลายฉลุ
----------------------------------------------
ประเภท: ${data.facadeType || '—'}
ข้อความ/เนื้อหา: ${data.facadeContent || '—'}
ขนาด: ${data.facadeWidth || '—'} × ${data.facadeHeight || '—'} cm
จำนวน: ${data.facadeQuantity || '—'} ชิ้น
วัสดุ: ${data.facadeMaterial || '—'}
ความหนา: ${data.facadeThickness || '—'}
ลายฉลุ/ดีไซน์: ${data.facadePattern || '—'}
สี/ฟินิช: ${data.facadeFinish || '—'}
โครงสร้าง: ${data.facadeStructure || '—'}
หมายเหตุ: ${data.facadeNote || '—'}
`;
  } else if (data.signType === 'install-only') {
    typeSpecificDetails = `
📋 รายละเอียดงานติดตั้งอย่างเดียว
----------------------------------------------
ประเภทบริการ: ${data.installOnlyType || '—'}
รายละเอียดงาน: ${data.installOnlyDetails || '—'}
ขนาด/ปริมาณ: ${data.installOnlySize || '—'}
ความสูงจากพื้น: ${data.installOnlyHeight || '—'}
วิธีเข้าถึง: ${data.installOnlyAccess || '—'}
ผนัง/พื้นผิว: ${data.installOnlyWall || '—'}
มีไฟรอไว้: ${data.installOnlyHasPower || '—'}
ระยะจากจุดไฟ: ${data.installOnlyPowerDistance || '—'} เมตร
วันที่ต้องการ: ${formatThaiDate(data.installOnlyDate)}
ช่วงเวลา: ${data.installOnlyTime || '—'}
หมายเหตุ: ${data.installOnlyNote || '—'}
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
🔧 ข้อมูลการติดตั้ง
----------------------------------------------
ความสูงจากพื้น: ${data.installHeight || '—'}
วิธีเข้าถึง: ${getLabel('installMethod', data.installMethod)}
ผนัง/พื้นผิว: ${getLabel('wallType', data.wallType)}
ลักษณะติดตั้ง: ${getLabel('mountType', data.mountType)}
ป้ายเก่า: ${getLabel('oldSign', data.oldSign)}
รูปหน้างาน: ${getLabel('sitePhoto', data.sitePhoto)}

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

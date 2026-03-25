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

/**
 * แปลงข้อมูลฟอร์มเป็นรูปแบบข้อความสำหรับส่งอีเมล
 */
const formatFormDataToEmail = (data: SignFormData): string => {
  const size = data.signWidth && data.signHeight ? `${data.signWidth} × ${data.signHeight} cm` : '—';
  const budgetDisplay = data.budgetCustom || (data.budget && data.budget !== 'other' ? `${parseInt(data.budget).toLocaleString()} บาท` : '—');
  const letterHeight = data.letterHeight === 'ระบุเอง' ? data.letterHeightCustom : data.letterHeight;
  
  const radioLabels: Record<string, Record<string, string>> = {
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

📍 สถานที่ติดตั้ง
----------------------------------------------
ที่อยู่: ${data.address || '—'}

🎨 รายละเอียดป้าย
----------------------------------------------
ไฟล์ออกแบบ: ${getLabel('designFile', data.designFile)}
${(data as SignFormData & { design_file_url?: string }).design_file_url ? `📎 ดาวน์โหลดไฟล์: ${(data as SignFormData & { design_file_url?: string }).design_file_url}` : ''}
หมายเหตุการออกแบบ: ${data.designNote || '—'}
ข้อความบนป้าย: ${data.signText || '—'}
โลโก้: ${getLabel('logo', data.logo)}
ขนาดป้าย: ${size}
ความสูงตัวอักษร: ${letterHeight || '—'}
สีไฟ: ${getLabel('lightColor', data.lightColor)}
สีไฟ (กำหนดเอง): ${data.lightColorCustom || '—'}
ขอบตัวอักษร: ${getLabel('borderMaterial', data.borderMaterial)}
Timer: ${getLabel('timer', data.timer)}

🔧 การติดตั้ง
----------------------------------------------
ความสูงจากพื้น: ${data.installHeight || '—'}
วิธีเข้าถึง: ${getLabel('installMethod', data.installMethod)}
ผนัง/พื้นผิว: ${getLabel('wallType', data.wallType)}
ลักษณะติดตั้ง: ${getLabel('mountType', data.mountType)}
ป้ายเก่า: ${getLabel('oldSign', data.oldSign)}
รูปหน้างาน: ${getLabel('sitePhoto', data.sitePhoto)}
${(data as SignFormData & { site_photo_url?: string }).site_photo_url ? `📎 ดาวน์โหลดรูป: ${(data as SignFormData & { site_photo_url?: string }).site_photo_url}` : ''}

💰 งบประมาณและกำหนดการ
----------------------------------------------
งบประมาณ: ${budgetDisplay}
ค่าติดตั้ง: ${getLabel('includeInstall', data.includeInstall)}
วันที่ต้องการ: ${data.deadline || '—'}
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

    const toEmail = recipientEmail || formData.email;
    const emailContent = formatFormDataToEmail(formData);

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
      budget: formData.budget === 'other' ? formData.budgetCustom : `${parseInt(formData.budget || '0').toLocaleString()} บาท`,
      deadline: formData.deadline,
      // URL ไฟล์จาก Cloudinary
      design_file_url: formData.design_file_url || '',
      site_photo_url: formData.site_photo_url || '',
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

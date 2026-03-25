import { useState } from 'react';
import { sendQuoteEmail, isEmailJSConfigured } from '@/services/emailService';
import { uploadMultipleFiles, isCloudinaryConfigured } from '@/services/cloudinaryService';

export interface SignFormData {
  email: string;
  name: string;
  phone: string;
  lineId: string;
  shopName: string;
  address: string;
  designFile: string;
  designFileUpload: File | null;
  design_file_url?: string;
  designNote: string;
  signText: string;
  logo: string;
  signWidth: string;
  signHeight: string;
  letterHeight: string;
  letterHeightCustom: string;
  lightColor: string;
  lightColorCustom: string;
  borderMaterial: string;
  timer: string;
  installHeight: string;
  installMethod: string;
  wallType: string;
  mountType: string;
  oldSign: string;
  sitePhoto: string;
  sitePhotoUpload: File | null;
  site_photo_url?: string;
  budget: string;
  budgetCustom: string;
  includeInstall: string;
  deadline: string;
  note: string;
}

const initialData: SignFormData = {
  email: '', name: '', phone: '', lineId: '', shopName: '', address: '',
  designFile: '', designFileUpload: null, designNote: '', signText: '', logo: '',
  signWidth: '', signHeight: '', letterHeight: '', letterHeightCustom: '', lightColor: '', lightColorCustom: '',
  borderMaterial: '', timer: '', installHeight: '', installMethod: '',
  wallType: '', mountType: '', oldSign: '', sitePhoto: '', sitePhotoUpload: null,
  budget: '', budgetCustom: '', includeInstall: '', deadline: '', note: '',
};

export const useSignForm = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<SignFormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const update = (field: keyof SignFormData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const updateFile = (field: 'designFileUpload' | 'sitePhotoUpload', file: File | null) => {
    setData(prev => ({ ...prev, [field]: file }));
  };

  const goTo = (n: number) => {
    if (n <= step) setStep(n);
  };

  // Convert camelCase to snake_case for API
  const toSnakeCase = (str: string) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

  const submitForm = async () => {
    // Prevent double submission
    if (isSubmitting || submitted) return;
    
    setIsSubmitting(true);
    setSubmitError(null);
    setEmailError(null);
    
    try {
      // อัปโหลดไฟล์ไป Cloudinary ก่อน (ถ้ามีการตั้งค่าและมีไฟล์)
      let designFileUrl = '';
      let sitePhotoUrl = '';
      
      if (isCloudinaryConfigured()) {
        const filesToUpload: { file: File; type: 'design' | 'photo' }[] = [];
        
        if (data.designFileUpload) {
          filesToUpload.push({ file: data.designFileUpload, type: 'design' });
        }
        if (data.sitePhotoUpload) {
          filesToUpload.push({ file: data.sitePhotoUpload, type: 'photo' });
        }
        
        if (filesToUpload.length > 0) {
          console.log('📤 Uploading files to Cloudinary...');
          const uploadResults = await uploadMultipleFiles(filesToUpload);
          
          if (uploadResults.error) {
            console.warn('⚠️ File upload failed:', uploadResults.error);
            // ไม่ throw error เพื่อให้ส่งฟอร์มต่อได้ แค่ไม่มี URL
          } else {
            designFileUrl = uploadResults.designUrl || '';
            sitePhotoUrl = uploadResults.photoUrl || '';
            console.log('✅ Files uploaded successfully');
          }
        }
      } else {
        console.log('ℹ️ Cloudinary not configured, skipping file upload');
      }

      // Determine budget amount: use custom if "other" is selected, otherwise use selected budget
      const budgetAmount = data.budget === 'other' ? data.budgetCustom : data.budget;
      
      // Determine letter height: use custom if "ระบุเอง" is selected, otherwise use selected value
      const letterHeightValue = data.letterHeight === 'ระบุเอง' ? data.letterHeightCustom : data.letterHeight;
      
      // สร้างข้อมูลสำหรับส่ง API (ใช้ JSON)
      const apiData = {
        email: data.email,
        name: data.name,
        phone: data.phone,
        line_id: data.lineId,
        shop_name: data.shopName,
        address: data.address,
        design_file: data.designFile,
        design_file_url: designFileUrl,  // URL จาก Cloudinary
        design_note: data.designNote,
        sign_text: data.signText,
        logo_included: data.logo,
        sign_width_cm: data.signWidth,
        sign_height_cm: data.signHeight,
        letter_height: letterHeightValue,
        light_color: data.lightColor,
        light_color_custom: data.lightColorCustom,
        border_material: data.borderMaterial,
        timer_included: data.timer,
        install_height: data.installHeight,
        install_method: data.installMethod,
        wall_type: data.wallType,
        mount_type: data.mountType,
        old_sign_exists: data.oldSign,
        site_photo: data.sitePhoto,
        site_photo_url: sitePhotoUrl,  // URL จาก Cloudinary
        budget_amount: budgetAmount,
        include_installation: data.includeInstall,
        deadline: data.deadline,
        additional_notes: data.note,
      };

      const response = await fetch('http://192.168.202.155:3000/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error Response:', errorData);
        const errorMessage = errorData.message || errorData.error || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }
      
      // บันทึกข้อมูลสำเร็จ ต่อไปส่งอีเมล
      setSubmitted(true);
      
      // ส่งอีเมลด้วย EmailJS (ถ้าได้ตั้งค่าไว้)
      // สร้าง data object พร้อม URL สำหรับส่งอีเมล
      const emailData = {
        ...data,
        design_file_url: designFileUrl,
        site_photo_url: sitePhotoUrl,
      };
      
      if (isEmailJSConfigured()) {
        try {
          const emailResult = await sendQuoteEmail(emailData);
          if (emailResult.success) {
            setEmailSent(true);
            console.log('✅ Email notification sent successfully');
          } else {
            setEmailError(emailResult.message);
            console.warn('⚠️ Email sending failed:', emailResult.message);
          }
        } catch (emailErr) {
          console.error('❌ Email sending error:', emailErr);
          setEmailError('ไม่สามารถส่งอีเมลแจ้งเตือนได้');
        }
      } else {
        console.log('ℹ️ EmailJS not configured, skipping email notification');
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการส่งข้อมูล');
    } finally {
      setIsSubmitting(false);
    }
  };

  const next = () => {
    // #region agent log
    fetch('http://127.0.0.1:7908/ingest/bc630f05-7678-40d7-a0c3-f1e3125dc587',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'e7c16c'},body:JSON.stringify({sessionId:'e7c16c',runId:'pre-fix',hypothesisId:'H1',location:'useSignForm.ts:next:entry',message:'next invoked',data:{step,submitted,requiredSnapshot:{email:!!data.email,name:!!data.name,phone:!!data.phone,shopName:!!data.shopName,signText:!!data.signText,installHeight:!!data.installHeight,budget:!!data.budget,deadline:!!data.deadline}},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    if (step < 4) setStep(step + 1);
    if (step < 4) {
      // #region agent log
      fetch('http://127.0.0.1:7908/ingest/bc630f05-7678-40d7-a0c3-f1e3125dc587',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'e7c16c'},body:JSON.stringify({sessionId:'e7c16c',runId:'pre-fix',hypothesisId:'H2',location:'useSignForm.ts:next:step-advance',message:'advance step without submit',data:{fromStep:step,toStep:step+1},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
    } else {
      // #region agent log
      fetch('http://127.0.0.1:7908/ingest/bc630f05-7678-40d7-a0c3-f1e3125dc587',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'e7c16c'},body:JSON.stringify({sessionId:'e7c16c',runId:'pre-fix',hypothesisId:'H3',location:'useSignForm.ts:next:submit-branch',message:'setSubmitted called',data:{step,willSubmit:true,hasNetworkSubmit:false},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      submitForm();
    }
    // #region agent log
    fetch('http://127.0.0.1:7908/ingest/bc630f05-7678-40d7-a0c3-f1e3125dc587',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'e7c16c'},body:JSON.stringify({sessionId:'e7c16c',runId:'pre-fix',hypothesisId:'H4',location:'useSignForm.ts:next:exit',message:'next completed',data:{stepAtExit:step,submittedAtExit:submitted},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prev = () => {
    if (step > 1) setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { step, data, update, updateFile, goTo, next, prev, submitted, isSubmitting, submitError, emailSent, emailError };
};

export const radioLabels: Record<string, Record<string, string>> = {
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

export const getLabel = (field: string, value: string) => {
  return radioLabels[field]?.[value] || value || '—';
};

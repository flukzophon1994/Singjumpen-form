import { useState } from 'react';
import { sendQuoteEmail, isEmailJSConfigured } from '@/services/emailService';
import { uploadMultipleFiles, isCloudinaryConfigured, uploadToCloudinary } from '@/services/cloudinaryService';

export interface SignFormData {
  email: string;
  name: string;
  phone: string;
  lineId: string;
  shopName: string;
  address: string;
  signType: string;
  signTypeExample: string; // รูปตัวอย่างที่เลือก (1, 2, 3)
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
  // Plate fields (ป้ายแผ่น/เนมเพลท)
  plateType: string;
  plateContent: string;
  plateWidth: string;
  plateHeight: string;
  plateQuantity: string;
  plateMaterial: string;
  plateMaterialColor: string;
  plateMaterialOther: string;
  plateThickness: string;
  plateThicknessOther: string;
  plateDetail: string;
  plateFinish: string;
  plateFinishCustom: string;
  plateInstall: string;
  plateNote: string;
  // เนมเพลทเครื่องจักร
  plateModel: string;
  plateSerial: string;
  plateVoltage: string;
  plateWatt: string;
  plateProdDate: string;
  plateLogo: string;
  plateWarning: string;
  plateDataSame: string;
  // NonLit fields (งานอักษรไม่ไฟ)
  nonLitType: string;
  nonLitText: string;
  nonLitQuantity: string;
  nonLitLetterHeight: string;
  nonLitThickness: string;
  nonLitTotalLength: string;
  nonLitMaterial: string;
  nonLitMaterialOther: string;
  nonLitFinish: string;
  nonLitFinishColor: string;
  nonLitMaterialThickness: string;
  nonLitMaterialThicknessOther: string;
  nonLitAcrylicColor: string;
  nonLitAcrylicThickness: string;
  nonLitBackingShape: string;
  nonLitInstall: string;
  nonLitExtras: string;
  nonLitNote: string;
  // Lit fields (งานอักษรไฟ)
  litType: string;
  litText: string;
  litLogo: string;
  litQuantity: string;
  litLetterHeight: string;
  litRimThickness: string;
  litTotalLength: string;
  litAcrylicColor: string;
  litAcrylicColorOther: string;
  litLightColor: string;
  litSystem: string;
  litUsage: string;
  litInstall: string;
  litHasPower: string;
  litPowerDistance: string;
  litWiring: string;
  litNote: string;
  // Lightbox fields (งานกล่องไฟ)
  lightboxType: string;
  lightboxContent: string;
  lightboxWidth: string;
  lightboxHeight: string;
  lightboxDepth: string;
  lightboxFaceMaterial: string;
  lightboxFrameMaterial: string;
  lightboxFrameFinish: string;
  lightboxLightType: string;
  lightboxLightColor: string;
  lightboxLightPosition: string;
  lightboxPrint: string;
  lightboxPrintType: string;
  lightboxQuantity: string;
  lightboxInstallType: string;
  lightboxNote: string;
  // Vinyl fields (งานป้ายไวนิล)
  vinylType: string;
  vinylContent: string;
  vinylWidth: string;
  vinylHeight: string;
  vinylMaterialType: string;
  vinylMaterialSpec: string;
  vinylPrintQuality: string;
  vinylFinish: string;
  vinylEyelet: string;
  vinylQuantity: string;
  vinylInstallType: string;
  vinylInstallNote: string;
  vinylSurface: string;
  vinylNote: string;
  // Metal fields (งานเหล็ก/รั้ว/ประตู)
  metalType: string;
  metalContent: string;
  metalWidth: string;
  metalHeight: string;
  metalMaterial: string;
  metalThickness: string;
  metalFinish: string;
  metalCoating: string;
  metalGateType: string;
  metalGateOpen: string;
  metalFenceHeight: string;
  metalQuantity: string;
  metalInstallType: string;
  metalNote: string;
  metalAccessories: string;
  metalSurfacePrep: string;
  // Facade fields (งานฟาซาด/บังตา/ลายฉลุ)
  facadeType: string;
  facadeContent: string;
  facadeWidth: string;
  facadeHeight: string;
  facadeMaterial: string;
  facadeThickness: string;
  facadePattern: string;
  facadeFinish: string;
  facadeCoating: string;
  facadeBacking: string;
  facadeQuantity: string;
  facadeInstallType: string;
  facadeNote: string;
  facadeStructure: string;
  facadeMaintenance: string;
  // InstallOnly fields (งานติดตั้งอย่างเดียว)
  installOnlyType: string;
  installOnlyContent: string;
  installOnlyWidth: string;
  installOnlyHeight: string;
  installOnlyCurrentSign: string;
  installOnlyDismantle: string;
  installOnlySurface: string;
  installOnlyAccess: string;
  installOnlyWorkHeight: string;
  installOnlyPower: string;
  installOnlyQuantity: string;
  installOnlyDeadline: string;
  installOnlyNote: string;
  installOnlyPhotos: string;
  // Additional InstallOnly fields
  installOnlyTypeOther: string;
  installOnlyDetails: string;
  installOnlySize: string;
  installOnlyHasPower: string;
  installOnlyPowerDistance: string;
  installOnlyDate: string;
  installOnlyTime: string;
  installOnlyPhoto: string;
  installOnlyWall: string;
  // Section4Install new fields
  installSiteName: string;
  installGps: string;
  installContactName: string;
  installContactPhone: string;
  installSiteType: string;
  installSiteTypeOther: string;
  installHeightDetail: string;
  installAccess: string;
  installEquipment: string;
  installEquipmentOther: string;
  sitePhotoTypes: string;
  // Multiple photo uploads for each type
  sitePhotoFront: File | null;
  sitePhotoInstall: File | null;
  sitePhotoPower: File | null;
  sitePhotoSurface: File | null;
  sitePhotoFrontUrl: string;
  sitePhotoInstallUrl: string;
  sitePhotoPowerUrl: string;
  sitePhotoSurfaceUrl: string;
  // Example image URL (uploaded to Cloudinary)
  signTypeExampleUrl: string;
}

const initialData: SignFormData = {
  email: '', name: '', phone: '', lineId: '', shopName: '', address: '', signType: '', signTypeExample: '',
  designFile: '', designFileUpload: null, designNote: '', signText: '', logo: '',
  signWidth: '', signHeight: '', letterHeight: '', letterHeightCustom: '', lightColor: '', lightColorCustom: '',
  borderMaterial: '', timer: '', installHeight: '', installMethod: '',
  wallType: '', mountType: '', oldSign: '', sitePhoto: '', sitePhotoUpload: null,
  budget: '', budgetCustom: '', includeInstall: '', deadline: '', note: '',
  // Plate fields
  plateType: '', plateContent: '', plateWidth: '', plateHeight: '', plateQuantity: '', plateMaterial: '',
  plateMaterialColor: '', plateMaterialOther: '', plateThickness: '', plateThicknessOther: '', plateDetail: '',
  plateFinish: '', plateFinishCustom: '', plateInstall: '', plateNote: '',
  plateModel: '', plateSerial: '', plateVoltage: '', plateWatt: '', plateProdDate: '', plateLogo: '',
  plateWarning: '', plateDataSame: '',
  // NonLit fields
  nonLitType: '', nonLitText: '', nonLitQuantity: '', nonLitLetterHeight: '',
  nonLitThickness: '', nonLitTotalLength: '', nonLitMaterial: '', nonLitMaterialOther: '',
  nonLitFinish: '', nonLitFinishColor: '', nonLitMaterialThickness: '', nonLitMaterialThicknessOther: '',
  nonLitAcrylicColor: '', nonLitAcrylicThickness: '', nonLitBackingShape: '', nonLitInstall: '', nonLitExtras: '',
  nonLitNote: '',
  // Lit fields
  litType: '', litText: '', litLogo: '', litQuantity: '', litLetterHeight: '',
  litRimThickness: '', litTotalLength: '', litAcrylicColor: '', litAcrylicColorOther: '',
  litLightColor: '', litSystem: '', litUsage: '', litInstall: '', litHasPower: '',
  litPowerDistance: '', litWiring: '', litNote: '',
  // Lightbox fields
  lightboxType: '', lightboxContent: '', lightboxWidth: '', lightboxHeight: '', lightboxDepth: '',
  lightboxFaceMaterial: '', lightboxFrameMaterial: '', lightboxFrameFinish: '', lightboxLightType: '',
  lightboxLightColor: '', lightboxLightPosition: '', lightboxPrint: '', lightboxPrintType: '',
  lightboxQuantity: '', lightboxInstallType: '', lightboxNote: '',
  // Vinyl fields
  vinylType: '', vinylContent: '', vinylWidth: '', vinylHeight: '', vinylMaterialType: '',
  vinylMaterialSpec: '', vinylPrintQuality: '', vinylFinish: '', vinylEyelet: '', vinylQuantity: '',
  vinylInstallType: '', vinylInstallNote: '', vinylSurface: '', vinylNote: '',
  // Metal fields
  metalType: '', metalContent: '', metalWidth: '', metalHeight: '', metalMaterial: '', metalThickness: '',
  metalFinish: '', metalCoating: '', metalGateType: '', metalGateOpen: '', metalFenceHeight: '',
  metalQuantity: '', metalInstallType: '', metalNote: '', metalAccessories: '', metalSurfacePrep: '',
  // Facade fields
  facadeType: '', facadeContent: '', facadeWidth: '', facadeHeight: '', facadeMaterial: '', facadeThickness: '',
  facadePattern: '', facadeFinish: '', facadeCoating: '', facadeBacking: '', facadeQuantity: '',
  facadeInstallType: '', facadeNote: '', facadeStructure: '', facadeMaintenance: '',
  // InstallOnly fields
  installOnlyType: '', installOnlyContent: '', installOnlyWidth: '', installOnlyHeight: '',
  installOnlyCurrentSign: '', installOnlyDismantle: '', installOnlySurface: '', installOnlyAccess: '',
  installOnlyWorkHeight: '', installOnlyPower: '', installOnlyQuantity: '', installOnlyDeadline: '',
  installOnlyNote: '', installOnlyPhotos: '',
  // Additional InstallOnly fields
  installOnlyTypeOther: '', installOnlyDetails: '', installOnlySize: '', installOnlyHasPower: '',
  installOnlyPowerDistance: '', installOnlyDate: '', installOnlyTime: '', installOnlyPhoto: '',
  installOnlyWall: '',
  // Section4Install new fields
  installSiteName: '', installGps: '', installContactName: '', installContactPhone: '',
  installSiteType: '', installSiteTypeOther: '', installHeightDetail: '', installAccess: '', installEquipment: '',
  installEquipmentOther: '', sitePhotoTypes: '',
  // Multiple photo uploads
  sitePhotoFront: null, sitePhotoInstall: null, sitePhotoPower: null, sitePhotoSurface: null,
  sitePhotoFrontUrl: '', sitePhotoInstallUrl: '', sitePhotoPowerUrl: '', sitePhotoSurfaceUrl: '',
  // Example image URL
  signTypeExampleUrl: '',
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

  const updateFile = (field: 'designFileUpload' | 'sitePhotoUpload' | 'sitePhotoFront' | 'sitePhotoInstall' | 'sitePhotoPower' | 'sitePhotoSurface', file: File | null) => {
    setData(prev => ({ ...prev, [field]: file }));
  };

  const goTo = (n: number) => {
    if (n <= step) setStep(n);
  };

  // Convert camelCase to snake_case for API
  const toSnakeCase = (str: string) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

  /**
   * อัปโหลดรูปตัวอย่างไปยัง Cloudinary
   */
  const uploadExampleImage = async (): Promise<string> => {
    if (!data.signType || !data.signTypeExample) return '';
    
    try {
      // สร้าง path ของรูปตัวอย่าง
      const exampleNum = data.signTypeExample;
      const paths: Record<string, string> = {
        plate: `/assets/01-sign-nameplates/sign 0${exampleNum}.jpg`,
        'non-lit': `/assets/02-non-lit-lettering/nonlit letter 0${exampleNum}.jpg`,
        lit: `/assets/03-illuminated-lettering/illuminate letter 0${exampleNum}.jpg`,
        lightbox: `/assets/04-lightboxes/lightbox 0${exampleNum}.jpg`,
        vinyl: `/assets/05-vinyl-banners/vinyl 0${exampleNum}.jpg`,
        metal: `/assets/06-steelwork-gates/gate 0${exampleNum}.jpg`,
        facade: `/assets/07-facade-cnc-patterns/facade 0${exampleNum}.jpg`,
      };
      
      const imagePath = paths[data.signType];
      if (!imagePath) return '';
      
      // ดึงรูปจาก public folder
      const response = await fetch(imagePath);
      if (!response.ok) {
        console.warn('Could not fetch example image:', imagePath);
        return '';
      }
      
      const blob = await response.blob();
      const fileName = `${data.signType}_example_${exampleNum}.jpg`;
      const file = new File([blob], fileName, { type: 'image/jpeg' });
      
      // อัปโหลดไป Cloudinary
      const result = await uploadToCloudinary(file, 'singjumpen-quotes/examples');
      
      if (result.success && result.secureUrl) {
        console.log('✅ Example image uploaded:', result.secureUrl);
        return result.secureUrl;
      }
      
      return '';
    } catch (error) {
      console.error('❌ Error uploading example image:', error);
      return '';
    }
  };

  /**
   * อัปโหลดไฟล์ทั้งหมดไปยัง Cloudinary ก่อนส่ง
   */
  const uploadAllFiles = async (): Promise<{
    designFileUrl: string;
    sitePhotoUrl: string;
    sitePhotoFrontUrl: string;
    sitePhotoInstallUrl: string;
    sitePhotoPowerUrl: string;
    sitePhotoSurfaceUrl: string;
    exampleImageUrl: string;
  }> => {
    const results = {
      designFileUrl: '',
      sitePhotoUrl: '',
      sitePhotoFrontUrl: '',
      sitePhotoInstallUrl: '',
      sitePhotoPowerUrl: '',
      sitePhotoSurfaceUrl: '',
      exampleImageUrl: '',
    };

    if (!isCloudinaryConfigured()) {
      console.log('ℹ️ Cloudinary not configured, skipping file uploads');
      return results;
    }

    const uploadPromises: Promise<void>[] = [];

    // อัปโหลดไฟล์ออกแบบ
    if (data.designFileUpload) {
      uploadPromises.push(
        uploadToCloudinary(data.designFileUpload, 'singjumpen-quotes/designs').then(result => {
          if (result.success && result.secureUrl) {
            results.designFileUrl = result.secureUrl;
          }
        })
      );
    }

    // อัปโหลดรูปหน้างาน (เก่า)
    if (data.sitePhotoUpload) {
      uploadPromises.push(
        uploadToCloudinary(data.sitePhotoUpload, 'singjumpen-quotes/photos').then(result => {
          if (result.success && result.secureUrl) {
            results.sitePhotoUrl = result.secureUrl;
          }
        })
      );
    }

    // อัปโหลดรูปหน้างานใหม่ (หลายรูป)
    if (data.sitePhotoFront) {
      uploadPromises.push(
        uploadToCloudinary(data.sitePhotoFront, 'singjumpen-quotes/photos').then(result => {
          if (result.success && result.secureUrl) {
            results.sitePhotoFrontUrl = result.secureUrl;
          }
        })
      );
    }

    if (data.sitePhotoInstall) {
      uploadPromises.push(
        uploadToCloudinary(data.sitePhotoInstall, 'singjumpen-quotes/photos').then(result => {
          if (result.success && result.secureUrl) {
            results.sitePhotoInstallUrl = result.secureUrl;
          }
        })
      );
    }

    if (data.sitePhotoPower) {
      uploadPromises.push(
        uploadToCloudinary(data.sitePhotoPower, 'singjumpen-quotes/photos').then(result => {
          if (result.success && result.secureUrl) {
            results.sitePhotoPowerUrl = result.secureUrl;
          }
        })
      );
    }

    if (data.sitePhotoSurface) {
      uploadPromises.push(
        uploadToCloudinary(data.sitePhotoSurface, 'singjumpen-quotes/photos').then(result => {
          if (result.success && result.secureUrl) {
            results.sitePhotoSurfaceUrl = result.secureUrl;
          }
        })
      );
    }

    // อัปโหลดรูปตัวอย่าง
    uploadPromises.push(
      uploadExampleImage().then(url => {
        results.exampleImageUrl = url;
      })
    );

    // รอให้ทุกไฟล์อัปโหลดเสร็จ
    await Promise.all(uploadPromises);

    console.log('✅ All files uploaded:', results);
    return results;
  };

  const submitForm = async () => {
    // Prevent double submission
    if (isSubmitting || submitted) return;
    
    setIsSubmitting(true);
    setSubmitError(null);
    setEmailError(null);
    
    try {
      // อัปโหลดไฟล์ทั้งหมดไป Cloudinary ก่อน
      console.log('📤 Uploading all files to Cloudinary...');
      const uploadResults = await uploadAllFiles();
      
      // อัปเดต state ด้วย URL ที่ได้รับ
      setData(prev => ({
        ...prev,
        design_file_url: uploadResults.designFileUrl,
        site_photo_url: uploadResults.sitePhotoUrl,
        sitePhotoFrontUrl: uploadResults.sitePhotoFrontUrl,
        sitePhotoInstallUrl: uploadResults.sitePhotoInstallUrl,
        sitePhotoPowerUrl: uploadResults.sitePhotoPowerUrl,
        sitePhotoSurfaceUrl: uploadResults.sitePhotoSurfaceUrl,
        signTypeExampleUrl: uploadResults.exampleImageUrl,
      }));

      // Determine budget amount: use custom if "other" is selected, otherwise use selected budget
      const budgetAmount = data.budget === 'other' ? data.budgetCustom : data.budget;
      
      // Determine letter height: use custom if "ระบุเอง" is selected, otherwise use selected value
      const letterHeightValue = data.letterHeight === 'ระบุเอง' ? data.letterHeightCustom : data.letterHeight;
      
      // Determine sign text based on sign type
      const getSignText = (): string => {
        switch (data.signType) {
          case 'plate':
            return data.plateContent || data.signText;
          case 'non-lit':
            return data.nonLitText || data.signText;
          case 'lit':
            return data.litText || data.signText;
          case 'lightbox':
            return data.lightboxContent || data.signText;
          case 'vinyl':
            return data.vinylContent || data.signText;
          case 'metal':
            return data.metalContent || data.signText;
          case 'facade':
            return data.facadeContent || data.signText;
          case 'install-only':
            return data.installOnlyDetails || data.signText;
          default:
            return data.signText;
        }
      };
      
      // Helper function to convert string to boolean
      const toBoolean = (value: string): boolean | null => {
        if (value === 'yes' || value === 'true') return true;
        if (value === 'no' || value === 'false') return false;
        return null;
      };
      
      // สร้างข้อมูลสำหรับส่ง API (ใช้ JSON)
      const apiData = {
        sign_type: data.signType,
        email: data.email,
        name: data.name,
        phone: data.phone,
        line_id: data.lineId,
        shop_name: data.shopName,
        address: data.address,
        design_file: data.designFile || null,
        design_file_url: uploadResults.designFileUrl || null,
        design_note: data.designNote || null,
        sign_text: getSignText() || '-',
        logo_included: toBoolean(data.logo),
        sign_width_cm: data.signWidth || null,
        sign_height_cm: data.signHeight || null,
        letter_height: letterHeightValue || null,
        light_color: data.lightColor || null,
        light_color_custom: data.lightColorCustom || null,
        border_material: data.borderMaterial || null,
        timer_included: toBoolean(data.timer),
        install_height: data.installHeight || null,
        install_method: data.installMethod || null,
        wall_type: data.wallType || null,
        mount_type: data.mountType || null,
        old_sign_exists: toBoolean(data.oldSign),
        site_photo: data.sitePhoto || null,
        site_photo_url: uploadResults.sitePhotoUrl || null,
        budget_amount: budgetAmount || null,
        include_installation: toBoolean(data.includeInstall),
        deadline: data.deadline || null,
        additional_notes: data.note || null,
        // รูปตัวอย่าง
        sign_type_example: data.signTypeExample || null,
        sign_type_example_url: uploadResults.exampleImageUrl || null,
        // รูปหน้างานเพิ่มเติม
        site_photo_front_url: uploadResults.sitePhotoFrontUrl || null,
        site_photo_install_url: uploadResults.sitePhotoInstallUrl || null,
        site_photo_power_url: uploadResults.sitePhotoPowerUrl || null,
        site_photo_surface_url: uploadResults.sitePhotoSurfaceUrl || null,
      };

      const response = await fetch('https://Singjumpen.com/api/quotes', {
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
        design_file_url: uploadResults.designFileUrl,
        site_photo_url: uploadResults.sitePhotoUrl,
        sitePhotoFrontUrl: uploadResults.sitePhotoFrontUrl,
        sitePhotoInstallUrl: uploadResults.sitePhotoInstallUrl,
        sitePhotoPowerUrl: uploadResults.sitePhotoPowerUrl,
        sitePhotoSurfaceUrl: uploadResults.sitePhotoSurfaceUrl,
        signTypeExampleUrl: uploadResults.exampleImageUrl,
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
    if (step < 5) setStep(step + 1);
    if (step < 5) {
      // Just advance step
    } else {
      submitForm();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prev = () => {
    if (step > 1) setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { step, data, update, updateFile, goTo, next, prev, submitted, isSubmitting, submitError, emailSent, emailError };
};

export const radioLabels: Record<string, Record<string, string>> = {
  signType: { plate: 'ป้ายแผ่น / เนมเพลท / ป้ายหน้าห้อง', 'non-lit': 'งานอักษรไม่ไฟ', lit: 'งานอักษรไฟ', lightbox: 'งานกล่องไฟ', vinyl: 'งานป้ายไวนิล', metal: 'งานเหล็ก / รั้ว / ประตู', facade: 'งานฟาซาด / บังตา / ลายฉลุ' },
  designFile: { have: 'มีไฟล์แล้ว', no: 'ให้ร้านออกแบบ' },
  logo: { yes: 'ใส่โลโก้', no: 'ไม่ใส่โลโก้' },
  lightColor: { coolwhite: 'ขาว (Cool White)', warmwhite: 'วอร์มไวท์', rgb: 'RGB' },
  borderMaterial: { zinc: 'ขอบซิงค์', alu: 'ขอบอะลูมิเนียม', 'ss-silver': 'สแตนเลสเงินเงา', 'ss-hairline': 'สแตนเลสเงิน Hairline', 'gold-hairline': 'สแตนเลสทอง Hairline', 'gold-mirror': 'สแตนเลสทอง Mirror' },
  timer: { yes: 'ต้องการ Timer', no: 'ไม่ต้องการ' },
  installMethod: { stand: 'ยืนติดได้เลย', ladder: 'ใช้บันได', scaffold: 'นั่งร้าน 3 ชั้น', crane: 'รถกระเช้า/เครน', ready: 'มีนั่งร้านพร้อม' },
  wallType: { metalsheet: 'เมทัลชีท', steelframe: 'โครงเหล็ก', marble: 'หินอ่อน', slat: 'ระแนง', ready: 'มีโครงเหล็กรอแล้ว', composite: 'คอมโพสิต' },
  mountType: { wall: 'แนบผนัง', roof: 'โครงเหล็กบนหลังคา', floor: 'โครงเหล็กยึดพื้น' },
  oldSign: { yes: 'มี ต้องรื้อก่อน', no: 'ไม่มี' },
  sitePhoto: { yes: 'มีรูป', visit: 'ให้ร้านไปดูหน้างาน' },
  includeInstall: { yes: 'รวมค่าติดตั้ง', no: 'นำไปติดเอง' },
  installSiteType: { house: 'บ้าน', shophouse: 'อาคารพาณิชย์', shop: 'ร้านค้า', factory: 'โรงงาน', mall: 'ห้าง', office: 'ออฟฟิศ', condo: 'คอนโด', other: 'อื่น ๆ' },
};

export const getLabel = (field: string, value: string) => {
  return radioLabels[field]?.[value] || value || '—';
};

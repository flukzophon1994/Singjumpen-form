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
  // Block Paint fields (งานบล็อคพ่นสี)
  blockPaintWidth: string;
  blockPaintLength: string;
  blockPaintMaterial: string;
  blockPaintMaterialOther: string;
  blockPaintText: string;
  blockPaintQuantity: string;
  blockPaintNote: string;
  // Cut Parts fields (งานตัดอะไหล่)
  cutPartsMaterial: string;
  cutPartsThickness: string;
  cutPartsThicknessOther: string;
  cutPartsInputType: string;
  cutPartsDesignBy: string;
  cutPartsQuantity: string;
  cutPartsNote: string;
  // Delivery fields (สำหรับงานที่ไม่มีติดตั้ง)
  deliveryMethod: string;
  deliveryName: string;
  deliveryPhone: string;
  deliveryAddress: string;
  deliveryGps: string;
  deliveryNote: string;
  deliveryLalamoveName: string;
  deliveryLalamovePhone: string;
  deliveryLalamoveAddress: string;
  deliveryLalamoveNote: string;
  deliveryPickupName: string;
  deliveryPickupPhone: string;
  deliveryPickupNote: string;
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
  // Block Paint fields
  blockPaintWidth: '', blockPaintLength: '', blockPaintMaterial: '', blockPaintMaterialOther: '',
  blockPaintText: '', blockPaintQuantity: '', blockPaintNote: '',
  // Cut Parts fields
  cutPartsMaterial: '', cutPartsThickness: '', cutPartsThicknessOther: '',
  cutPartsInputType: '', cutPartsDesignBy: '', cutPartsQuantity: '', cutPartsNote: '',
  // Delivery fields
  deliveryMethod: '', deliveryName: '', deliveryPhone: '', deliveryAddress: '',
  deliveryGps: '', deliveryNote: '', deliveryLalamoveName: '', deliveryLalamovePhone: '',
  deliveryLalamoveAddress: '', deliveryLalamoveNote: '', deliveryPickupName: '',
  deliveryPickupPhone: '', deliveryPickupNote: '',
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
        'block-paint': `/assets/08-block-paint/block paint 0${exampleNum}.jpg`,
        'cut-parts': `/assets/09-cut-parts/cut parts 0${exampleNum}.jpg`,
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
          case 'block-paint':
            return data.blockPaintText || data.signText;
          case 'cut-parts':
            return data.cutPartsNote || data.signText;
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
      
      // สร้าง type_details ตามประเภทงาน - ใช้ค่าภาษาไทยสำหรับบันทึกลง database
      const getTypeDetails = (): Record<string, unknown> => {
        switch (data.signType) {
          case 'plate':
            return {
              plate_type: getLabel('plateType', data.plateType),
              plate_content: data.plateContent,
              plate_width: data.plateWidth,
              plate_height: data.plateHeight,
              plate_quantity: data.plateQuantity,
              plate_material: getLabel('plateMaterial', data.plateMaterial),
              plate_material_color: data.plateMaterialColor,
              plate_material_other: data.plateMaterialOther,
              plate_thickness: getLabel('plateThickness', data.plateThickness),
              plate_thickness_other: data.plateThicknessOther,
              plate_detail: getLabel('plateDetail', data.plateDetail),
              plate_finish: getLabel('plateFinish', data.plateFinish),
              plate_finish_custom: data.plateFinishCustom,
              plate_install: getLabel('plateInstall', data.plateInstall),
              plate_note: data.plateNote,
              // เนมเพลทเครื่องจักร
              plate_model: data.plateModel,
              plate_serial: data.plateSerial,
              plate_voltage: data.plateVoltage,
              plate_watt: data.plateWatt,
              plate_prod_date: data.plateProdDate,
              plate_logo: data.plateLogo,
              plate_warning: data.plateWarning,
              plate_data_same: getLabel('plateDataSame', data.plateDataSame),
            };
          case 'non-lit':
            return {
              non_lit_type: getLabel('nonLitType', data.nonLitType),
              non_lit_text: data.nonLitText,
              non_lit_quantity: data.nonLitQuantity,
              non_lit_letter_height: data.nonLitLetterHeight,
              non_lit_thickness: data.nonLitThickness,
              non_lit_total_length: data.nonLitTotalLength,
              non_lit_material: getLabel('nonLitMaterial', data.nonLitMaterial),
              non_lit_material_other: data.nonLitMaterialOther,
              non_lit_finish: getLabel('nonLitFinish', data.nonLitFinish),
              non_lit_finish_color: data.nonLitFinishColor,
              non_lit_material_thickness: getLabel('nonLitMaterialThickness', data.nonLitMaterialThickness),
              non_lit_material_thickness_other: data.nonLitMaterialThicknessOther,
              non_lit_acrylic_color: data.nonLitAcrylicColor,
              non_lit_acrylic_thickness: getLabel('nonLitAcrylicThickness', data.nonLitAcrylicThickness),
              non_lit_backing_shape: getLabel('nonLitBackingShape', data.nonLitBackingShape),
              non_lit_install: getLabel('nonLitInstall', data.nonLitInstall),
              non_lit_extras: getLabel('nonLitExtras', data.nonLitExtras),
              non_lit_note: data.nonLitNote,
            };
          case 'lit':
            return {
              lit_type: getLabel('litType', data.litType),
              lit_text: data.litText,
              lit_logo: data.litLogo,
              lit_quantity: data.litQuantity,
              lit_letter_height: data.litLetterHeight,
              lit_rim_thickness: data.litRimThickness,
              lit_total_length: data.litTotalLength,
              lit_acrylic_color: getLabel('litAcrylicColor', data.litAcrylicColor),
              lit_acrylic_color_other: data.litAcrylicColorOther,
              lit_light_color: getLabel('litLightColor', data.litLightColor),
              lit_system: getLabel('litSystem', data.litSystem),
              lit_usage: getLabel('litUsage', data.litUsage),
              lit_install: getLabel('litInstall', data.litInstall),
              lit_has_power: data.litHasPower === 'yes' ? 'มี' : data.litHasPower === 'no' ? 'ไม่มี' : null,
              lit_power_distance: data.litPowerDistance,
              lit_wiring: data.litWiring === 'yes' ? 'ต้องการ' : data.litWiring === 'no' ? 'ไม่ต้องการ' : null,
              lit_note: data.litNote,
            };
          case 'lightbox':
            return {
              lightbox_type: getLabel('lightboxType', data.lightboxType),
              lightbox_content: data.lightboxContent,
              lightbox_width: data.lightboxWidth,
              lightbox_height: data.lightboxHeight,
              lightbox_depth: data.lightboxDepth,
              lightbox_face_material: getLabel('lightboxFace', data.lightboxFaceMaterial),
              lightbox_frame_material: getLabel('lightboxFrame', data.lightboxFrameMaterial),
              lightbox_frame_finish: data.lightboxFrameFinish,
              lightbox_light_type: data.lightboxLightType,
              lightbox_light_color: getLabel('lightboxLightSystem', data.lightboxLightColor),
              lightbox_light_position: data.lightboxLightPosition,
              lightbox_print: data.lightboxPrint,
              lightbox_print_type: data.lightboxPrintType,
              lightbox_quantity: data.lightboxQuantity,
              lightbox_install_type: data.lightboxInstallType,
              lightbox_note: data.lightboxNote,
            };
          case 'vinyl':
            return {
              vinyl_type: getLabel('vinylType', data.vinylType),
              vinyl_content: data.vinylContent,
              vinyl_width: data.vinylWidth,
              vinyl_height: data.vinylHeight,
              vinyl_material_type: getLabel('vinylMaterialType', data.vinylMaterialType),
              vinyl_material_spec: data.vinylMaterialSpec,
              vinyl_print_quality: getLabel('vinylPrintQuality', data.vinylPrintQuality),
              vinyl_finish: getLabel('vinylFinish', data.vinylFinish),
              vinyl_eyelet: data.vinylEyelet,
              vinyl_quantity: data.vinylQuantity,
              vinyl_install_type: getLabel('vinylInstallType', data.vinylInstallType),
              vinyl_install_note: data.vinylInstallNote,
              vinyl_surface: getLabel('vinylSurface', data.vinylSurface),
              vinyl_note: data.vinylNote,
            };
          case 'metal':
            return {
              metal_type: getLabel('metalType', data.metalType),
              metal_content: data.metalContent,
              metal_width: data.metalWidth,
              metal_height: data.metalHeight,
              metal_material: getLabel('metalMaterial', data.metalMaterial),
              metal_thickness: getLabel('metalThickness', data.metalThickness),
              metal_finish: data.metalFinish,
              metal_coating: getLabel('metalCoating', data.metalCoating),
              metal_gate_type: data.metalGateType,
              metal_gate_open: data.metalGateOpen,
              metal_fence_height: data.metalFenceHeight,
              metal_quantity: data.metalQuantity,
              metal_install_type: getLabel('metalInstallType', data.metalInstallType),
              metal_note: data.metalNote,
              metal_accessories: getLabel('metalAccessories', data.metalAccessories),
              metal_surface_prep: getLabel('metalSurfacePrep', data.metalSurfacePrep),
            };
          case 'facade':
            return {
              facade_type: getLabel('facadeType', data.facadeType),
              facade_content: data.facadeContent,
              facade_width: data.facadeWidth,
              facade_height: data.facadeHeight,
              facade_material: data.facadeMaterial,
              facade_thickness: data.facadeThickness,
              facade_pattern: data.facadePattern,
              facade_finish: data.facadeFinish,
              facade_coating: data.facadeCoating,
              facade_backing: data.facadeBacking,
              facade_quantity: data.facadeQuantity,
              facade_install_type: data.facadeInstallType,
              facade_note: data.facadeNote,
              facade_structure: data.facadeStructure,
              facade_maintenance: data.facadeMaintenance,
            };
          case 'block-paint':
            return {
              block_paint_width: data.blockPaintWidth,
              block_paint_length: data.blockPaintLength,
              block_paint_material: getLabel('blockPaintMaterial', data.blockPaintMaterial),
              block_paint_material_other: data.blockPaintMaterialOther,
              block_paint_text: data.blockPaintText,
              block_paint_quantity: data.blockPaintQuantity,
              block_paint_note: data.blockPaintNote,
              // ข้อมูลการจัดส่ง
              delivery_method: getLabel('deliveryMethod', data.deliveryMethod),
              delivery_name: data.deliveryName || data.deliveryPickupName || data.deliveryLalamoveName,
              delivery_phone: data.deliveryPhone || data.deliveryPickupPhone || data.deliveryLalamovePhone,
              delivery_address: data.deliveryAddress || data.deliveryLalamoveAddress,
              delivery_gps: data.deliveryGps,
              delivery_note: data.deliveryNote || data.deliveryPickupNote || data.deliveryLalamoveNote,
            };
          case 'cut-parts':
            return {
              cut_parts_material: getLabel('cutPartsMaterial', data.cutPartsMaterial),
              cut_parts_thickness: getLabel('cutPartsThickness', data.cutPartsThickness),
              cut_parts_thickness_other: data.cutPartsThicknessOther,
              cut_parts_input_type: getLabel('cutPartsInputType', data.cutPartsInputType),
              cut_parts_design_by: getLabel('cutPartsDesignBy', data.cutPartsDesignBy),
              cut_parts_quantity: data.cutPartsQuantity,
              cut_parts_note: data.cutPartsNote,
              // ข้อมูลการจัดส่ง
              delivery_method: getLabel('deliveryMethod', data.deliveryMethod),
              delivery_name: data.deliveryName || data.deliveryPickupName || data.deliveryLalamoveName,
              delivery_phone: data.deliveryPhone || data.deliveryPickupPhone || data.deliveryLalamovePhone,
              delivery_address: data.deliveryAddress || data.deliveryLalamoveAddress,
              delivery_gps: data.deliveryGps,
              delivery_note: data.deliveryNote || data.deliveryPickupNote || data.deliveryLalamoveNote,
            };
          case 'install-only':
            return {
              install_only_type: data.installOnlyType,
              install_only_type_other: data.installOnlyTypeOther,
              install_only_details: data.installOnlyDetails,
              install_only_size: data.installOnlySize,
              install_only_has_power: data.installOnlyHasPower === 'yes' ? 'มี' : data.installOnlyHasPower === 'no' ? 'ไม่มี' : null,
              install_only_power_distance: data.installOnlyPowerDistance,
              install_only_date: data.installOnlyDate,
              install_only_time: data.installOnlyTime,
              install_only_note: data.installOnlyNote,
            };
          default:
            return {};
        }
      };

      // สร้างข้อมูลสำหรับส่ง API (ใช้ JSON)
      // ส่งค่า code สำหรับ ENUM columns และค่าภาษาไทยใน type_details
      const apiData = {
        sign_type: data.signType,  // ENUM: plate, non-lit, lit, etc.
        email: data.email,
        name: data.name,
        phone: data.phone,
        line_id: data.lineId,
        shop_name: data.shopName || '-',
        address: data.address,
        design_file: data.designFile || null,  // ENUM: have, no
        design_file_url: uploadResults.designFileUrl || null,
        design_note: data.designNote || null,
        sign_text: getSignText() || '-',
        logo_included: toBoolean(data.logo),  // BOOLEAN
        sign_width_cm: data.signWidth || null,
        sign_height_cm: data.signHeight || null,
        letter_height: letterHeightValue || null,
        light_color: data.lightColor || null,  // ENUM: coolwhite, warmwhite, rgb
        light_color_custom: data.lightColorCustom || null,
        border_material: data.borderMaterial || null,  // ENUM
        timer_included: toBoolean(data.timer),  // BOOLEAN
        install_height: data.installHeight || null,
        install_method: data.installMethod || null,  // ENUM
        wall_type: data.wallType || null,  // ENUM
        mount_type: data.mountType || null,  // ENUM
        old_sign_exists: toBoolean(data.oldSign),  // BOOLEAN
        site_photo: data.sitePhoto || null,  // ENUM: yes, visit
        site_photo_url: uploadResults.sitePhotoUrl || null,
        budget_amount: budgetAmount || null,
        include_installation: toBoolean(data.includeInstall),  // BOOLEAN
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
        // ข้อมูลเฉพาะตามประเภทงาน (JSONB) - เก็บค่าภาษาไทย
        type_details: {
          ...getTypeDetails(),
          // เพิ่มค่าภาษาไทยสำหรับ reference
          sign_type_thai: getLabel('signType', data.signType),
          design_file_thai: getLabel('designFile', data.designFile),
          light_color_thai: getLabel('lightColor', data.lightColor),
          border_material_thai: getLabel('borderMaterial', data.borderMaterial),
          install_method_thai: getLabel('installMethod', data.installMethod),
          wall_type_thai: getLabel('wallType', data.wallType),
          mount_type_thai: getLabel('mountType', data.mountType),
          old_sign_thai: data.oldSign === 'yes' ? 'มี ต้องรื้อก่อน' : 'ไม่มี',
          logo_thai: data.logo === 'yes' ? 'ใส่โลโก้' : 'ไม่ใส่โลโก้',
          timer_thai: data.timer === 'yes' ? 'ต้องการ Timer' : 'ไม่ต้องการ',
          include_install_thai: data.includeInstall === 'yes' ? 'รวมค่าติดตั้ง' : 'นำไปติดเอง',
        },
        // ข้อมูลสถานที่ติดตั้งใหม่
        install_site_name: data.installSiteName || null,
        install_gps: data.installGps || null,
        install_contact_name: data.installContactName || null,
        install_contact_phone: data.installContactPhone || null,
        install_site_type: data.installSiteType || null,  // VARCHAR
        install_site_type_other: data.installSiteTypeOther || null,
        install_height_detail: data.installHeightDetail || null,
        install_access: data.installAccess || null,
        install_equipment: data.installEquipment || null,
        install_equipment_other: data.installEquipmentOther || null,
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
  // Section 2 Type - ประเภทป้าย
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
    'install-only': 'งานติดตั้งอย่างเดียว'
  },
  
  // Section 2 Details
  designFile: { have: 'มีไฟล์แล้ว', no: 'ให้ร้านออกแบบ' },
  logo: { yes: 'ใส่โลโก้', no: 'ไม่ใส่โลโก้' },
  lightColor: { coolwhite: 'ขาว (Cool White)', warmwhite: 'วอร์มไวท์', rgb: 'RGB' },
  borderMaterial: { zinc: 'ขอบซิงค์', alu: 'ขอบอะลูมิเนียม', 'ss-silver': 'สแตนเลสเงินเงา', 'ss-hairline': 'สแตนเลสเงิน Hairline', 'gold-hairline': 'สแตนเลสทอง Hairline', 'gold-mirror': 'สแตนเลสทอง Mirror' },
  timer: { yes: 'ต้องการ Timer', no: 'ไม่ต้องการ' },
  
  // Section 4 Install
  installMethod: { stand: 'ยืนติดได้เลย', ladder: 'ใช้บันได', scaffold: 'นั่งร้าน 3 ชั้น', crane: 'รถกระเช้า/เครน', ready: 'มีนั่งร้านพร้อม' },
  wallType: { metalsheet: 'เมทัลชีท', steelframe: 'โครงเหล็ก', marble: 'หินอ่อน', slat: 'ระแนง', ready: 'มีโครงเหล็กรอแล้ว', composite: 'คอมโพสิต' },
  mountType: { wall: 'แนบผนัง', roof: 'โครงเหล็กบนหลังคา', floor: 'โครงเหล็กยึดพื้น' },
  oldSign: { yes: 'มี ต้องรื้อก่อน', no: 'ไม่มี' },
  sitePhoto: { yes: 'มีรูป', visit: 'ให้ร้านไปดูหน้างาน' },
  includeInstall: { yes: 'รวมค่าติดตั้ง', no: 'นำไปติดเอง' },
  installSiteType: { house: 'บ้าน', shophouse: 'อาคารพาณิชย์', shop: 'ร้านค้า', factory: 'โรงงาน', mall: 'ห้าง', office: 'ออฟฟิศ', condo: 'คอนโด', other: 'อื่น ๆ' },
  
  // Section 3 Plate - ป้ายแผ่น
  plateType: { acrylic: 'ป้ายอะคริลิค', etched: 'ป้ายกัดกรด', machine: 'ป้ายเนมเพลทติดเครื่องจักร', room: 'ป้ายหน้าห้อง' },
  plateMaterial: {
    'acrylic-clear': 'อะคริลิคใส',
    'acrylic-white': 'อะคริลิคขาว',
    'acrylic-black': 'อะคริลิคดำ',
    'acrylic-color': 'อะคริลิคสี',
    stainless: 'สแตนเลส',
    aluminum: 'อลูมิเนียม',
    brass: 'ทองเหลือง',
    other: 'อื่น ๆ'
  },
  plateThickness: {
    '2 มม.': '2 มิลลิเมตร',
    '3 มม.': '3 มิลลิเมตร',
    '5 มม.': '5 มิลลิเมตร',
    '10 มม.': '10 มิลลิเมตร'
  },
  plateDetail: {
    'uv-print': 'พิมพ์ UV',
    screen: 'สกรีน',
    sticker: 'สติ๊กเกอร์ติด',
    etched: 'กัดกรด',
    engrave: 'กัดลาย',
    laser: 'ยิงเลเซอร์',
    carve: 'แกะสลัก',
    other: 'อื่น ๆ'
  },
  plateFinish: {
    'silver-gloss': 'เงินเงา',
    'silver-hairline': 'เงินแฮร์ไลน์',
    'gold-gloss': 'ทองเงา',
    'gold-hairline': 'ทองแฮร์ไลน์',
    'black-matte': 'ดำด้าน',
    white: 'ขาว',
    custom: 'สีพ่นตามแบบ'
  },
  plateInstall: { nut: 'เจาะรูน็อต', tape: 'ติดกาวสองหน้า', silicone: 'ติดกาวซิลิโคน', standoff: 'รองเสาลอย', pickup: 'ไม่ติดตั้ง รับเฉพาะชิ้นงาน' },
  plateDataSame: { same: 'เหมือนกัน', different: 'เปลี่ยนเลข/เปลี่ยนข้อมูลแต่ละชิ้น' },
  
  // Section 3 NonLit - งานอักษรไม่ไฟ
  nonLitType: {
    pvc: 'อักษรพลาสวูด',
    acrylic: 'อักษรอะคริลิค',
    'metal-rim': 'อักษรโลหะยกขอบ',
    'ss-silver-gloss': 'อักษรสแตนเลสเงินเงา',
    'ss-silver-hairline': 'อักษรสแตนเลสเงินแฮร์ไลน์',
    'ss-gold-gloss': 'อักษรสแตนเลสทองเงา',
    'ss-gold-hairline': 'อักษรสแตนเลสทองแฮร์ไลน์',
    'ss-acrylic': 'อักษรสแตนเลสรองหลังอะคริลิค'
  },
  nonLitMaterial: { pvc: 'พลาสวูด', acrylic: 'อะคริลิค', stainless: 'สแตนเลส', steel: 'เหล็ก', other: 'อื่น ๆ' },
  nonLitFinish: {
    'silver-gloss': 'เงินเงา',
    'silver-hairline': 'เงินแฮร์ไลน์',
    'gold-gloss': 'ทองเงา',
    'gold-hairline': 'ทองแฮร์ไลน์',
    paint: 'พ่นสี',
    'clear-coat': 'เคลือบใส'
  },
  nonLitMaterialThickness: { '3 มม.': '3 มิลลิเมตร', '5 มม.': '5 มิลลิเมตร', '10 มม.': '10 มิลลิเมตร', '15 มม.': '15 มิลลิเมตร', '20 มม.': '20 มิลลิเมตร', 'อื่น ๆ': 'อื่น ๆ' },
  nonLitBackingShape: { 'follow-letter': 'ตรงตามทรงตัวอักษร', square: 'แผ่นสี่เหลี่ยม', diecut: 'แผ่นไดคัทตามโลโก้' },
  nonLitInstall: { wall: 'ติดผนัง', glass: 'ติดกระจก', 'steel-frame': 'ติดโครงเหล็ก', composite: 'ติดคอมโพสิต', wood: 'ติดไม้', pickup: 'ไม่ติดตั้ง รับเฉพาะชิ้นงาน' },
  nonLitExtras: { layout: 'แบบวางตำแหน่งติดตั้ง', template: 'Template เจาะติดตั้ง', frame: 'โครงรองหลัง', spacer: 'เว้นระยะลอยจากผนัง' },
  
  // Section 3 Lit - งานอักษรไฟ
  litType: {
    'aluminum-rim': 'อักษรไฟสว่างหน้า ขอบอะลูมิเนียม',
    'zinc-rim': 'อักษรไฟสว่างหน้า ขอบซิงค์พ่นสี',
    'ss-silver-gloss': 'อักษรไฟสว่างหน้า ขอบสแตนเลสเงินเงา',
    'ss-silver-hairline': 'อักษรไฟสว่างหน้า ขอบสแตนเลสเงินแฮร์ไลน์',
    'ss-gold-gloss': 'อักษรไฟสว่างหน้า ขอบสแตนเลสทองเงา',
    'ss-gold-hairline': 'อักษรไฟสว่างหน้า ขอบสแตนเลสทองแฮร์ไลน์'
  },
  litAcrylicColor: { 'milky-white': 'ขาวนม', white: 'ขาว', black: 'ดำ', red: 'สีแดง', blue: 'สีน้ำเงิน', green: 'สีเขียว', yellow: 'สีเหลือง', other: 'อื่น ๆ' },
  litLightColor: { 'warm-white': 'Warm White', daylight: 'Daylight', 'cool-white': 'Cool White', red: 'แดง', blue: 'น้ำเงิน', green: 'เขียว', yellow: 'เหลือง', rgb: 'RGB เปลี่ยนสี' },
  litSystem: { 'led-module': 'LED Module', 'led-strip': 'LED Strip', adapter: 'Adapter', transformer: 'หม้อแปลง', timer: 'Timer', remote: 'รีโมท', app: 'แอปควบคุม' },
  litUsage: { indoor: 'ภายใน', 'outdoor-covered': 'ภายนอก มีหลังคา', 'outdoor-exposed': 'ภายนอก โดนแดด/ฝน' },
  litInstall: { wall: 'ติดผนัง', frame: 'ติดโครง', composite: 'ติดคอมโพสิต', storefront: 'ติดหน้าร้าน', mall: 'ติดในห้าง', 'no-install': 'ไม่ติดตั้ง' },
  litHasPower: { yes: 'มี', no: 'ไม่มี' },
  litWiring: { yes: 'ต้องการ', no: 'ไม่ต้องการ' },
  
  // Section 3 Lightbox - งานกล่องไฟ
  lightboxType: { round: 'กล่องไฟวงกลม', square: 'กล่องไฟสี่เหลี่ยม', diecut: 'กล่องไฟไดคัท' },
  lightboxSides: { '1-side': '1 หน้า', '2-side': '2 หน้า' },
  lightboxFrame: { steel: 'เหล็ก', stainless: 'สแตนเลส', aluminum: 'อลูมิเนียม', zinc: 'ซิงค์', other: 'อื่น ๆ' },
  lightboxFace: { acrylic: 'อะคริลิค', flex: 'Flex', 'translucent-sticker': 'สติ๊กเกอร์โปร่งแสง', 'uv-print': 'พิมพ์ UV', perforated: 'เจาะทะลุ', 'diecut-logo': 'ไดคัทโลโก้' },
  lightboxLightSystem: { 'led-module': 'LED Module', 'led-strip': 'LED Strip', 'warm-white': 'Warm White', daylight: 'Daylight', rgb: 'RGB' },
  lightboxPosition: { storefront: 'ติดหน้าร้าน', projecting: 'ติดยื่นออกจากผนัง', hanging: 'แขวน', floor: 'ตั้งพื้น', pole: 'ติดเสา' },
  lightboxBracket: { yes: 'ต้องการ', no: 'ไม่ต้องการ' },
  
  // Section 3 Vinyl - งานป้ายไวนิล
  vinylType: { banner: 'ป้ายไวนิลธรรมดา', 'backlit-banner': 'ป้ายไวนิล Backlit', sticker: 'สติ๊กเกอร์ติดกระจก', 'floor-sticker': 'สติ๊กเกอร์ติดพื้น', 'vehicle-wrap': 'สติ๊กเกอร์ติดรถ' },
  vinylMaterialType: { 'vinyl-440g': 'ไวนิล 440g', 'vinyl-340g': 'ไวนิล 340g', 'vinyl-280g': 'ไวนิล 280g', backlit: 'Backlit', 'sticker-matte': 'สติ๊กเกอร์ด้าน', 'sticker-gloss': 'สติ๊กเกอร์เงา', 'sticker-clear': 'สติ๊กเกอร์ใส', other: 'อื่น ๆ' },
  vinylPrintQuality: { standard: 'มาตรฐาน', high: 'สูง (High Res)', photo: 'ระดับภาพถ่าย' },
  vinylFinish: { hem: 'พับขอบ', eyelets: 'ตอกตาไก่', holes: 'เจาะรู', sew: 'เย็บขอบ', 'aluminum-frame': 'เข้าคิ้วอลูมิเนียม', other: 'อื่น ๆ' },
  vinylInstallType: { install: 'ติดตั้ง', 'no-install': 'ไม่ติดตั้ง' },
  vinylSurface: { wall: 'ผนัง', glass: 'กระจก', floor: 'พื้น', vehicle: 'รถยนต์' },
  
  // Section 3 Metal - งานเหล็ก
  metalType: { fence: 'รั้วเหล็ก', gate: 'ประตูเหล็ก', 'steel-structure': 'โครงสร้างเหล็ก', railing: 'ราวบันได/ราวกันตก', canopy: 'หลังคาเหล็ก' },
  metalMaterial: { steel: 'เหล็กดำ', galvanized: 'เหล็กกัลวาไนซ์', stainless: 'สแตนเลส', aluminum: 'อลูมิเนียม' },
  metalThickness: { '1.2 มม.': '1.2 มิลลิเมตร', '1.5 มม.': '1.5 มิลลิเมตร', '2.0 มม.': '2.0 มิลลิเมตร', '2.3 มม.': '2.3 มิลลิเมตร', '3.2 มม.': '3.2 มิลลิเมตร', 'อื่น ๆ': 'อื่น ๆ' },
  metalSurfacePrep: { solid: 'ทึบ', slat: 'ระแนง', mesh: 'ตาข่าย', pattern: 'ลายฉลุ', scroll: 'ลายดัด', mixed: 'ผสม' },
  metalCoating: { galvanized: 'ชุบกัลวาไนซ์', paint: 'พ่นสี', 'powder-coat': 'เคลือบผง', none: 'ไม่ชุบ' },
  metalInstallType: { ground: 'ฝังพื้น', wall: 'ยึดผนัง', concrete: 'เทคานคอนกรีต', existing: 'ติดตั้งบนโครงสร้างเดิม' },
  metalAccessories: { lock: 'กุญแจ/ล็อค', hinge: 'บานพับพิเศษ', wheel: 'ล้อเลื่อน', motor: 'มอเตอร์ประตูอัตโนมัติ', intercom: 'กริ่ง/อินเตอร์คอม' },
  
  // Section 3 Facade - งานฟาซาด
  facadeType: { cnc: 'ฟาซาดลายฉลุ CNC', slat: 'บังตา/ระแนง', composite: 'คอมโพสิต', 'block-paint': 'บล็อคพ่นสี', 'cut-parts': 'ตัดอะไหล่' },
  
  // Section 3 Block Paint - งานบล็อคพ่นสี
  blockPaintMaterial: { 'zinc-0.5': 'สังกะสี 0.5 มิลลิเมตร', 'zinc-0.8': 'สังกะสี 0.8 มิลลิเมตร', 'zinc-1.0': 'สังกะสี 1.0 มิลลิเมตร', other: 'อื่น ๆ' },
  
  // Section 3 Cut Parts - งานตัดอะไหล่
  cutPartsMaterial: { steel: 'เหล็ก', stainless: 'สแตนเลส', aluminum: 'อะลูมิเนียม' },
  cutPartsThickness: { '0.5': '0.5 มิลลิเมตร', '0.8': '0.8 มิลลิเมตร', '1.0': '1.0 มิลลิเมตร', '1.2': '1.2 มิลลิเมตร', '1.5': '1.5 มิลลิเมตร', '2.0': '2.0 มิลลิเมตร', '3.0': '3.0 มิลลิเมตร', '5.0': '5.0 มิลลิเมตร' },
  cutPartsInputType: { file: 'ส่งไฟล์', sample: 'ส่งงานจริง' },
  cutPartsDesignBy: { 'shop-design': 'ร้านทำแบบให้', 'customer-design': 'แจ้ง ก ย (ลูกค้ามีแบบ)' },
  
  // Delivery
  deliveryMethod: { pickup: 'รับที่ร้าน', delivery: 'จัดส่ง', lalamove: 'เรียก Lalamove' },
};

export const getLabel = (field: string, value: string) => {
  return radioLabels[field]?.[value] || value || '—';
};

// Helper function to convert values to Thai labels for database storage
export const getThaiLabel = (field: string, value: string): string => {
  if (!value) return '';
  
  // Handle comma-separated values (checkbox groups)
  if (value.includes(',')) {
    return value.split(',')
      .map(v => getLabel(field, v.trim()))
      .filter(v => v && v !== '—')
      .join(', ');
  }
  
  return getLabel(field, value);
};

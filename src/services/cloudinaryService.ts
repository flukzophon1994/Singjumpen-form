/**
 * Cloudinary Service - อัปโหลดไฟล์ไปยัง Cloudinary
 *
 * ต้องตั้งค่าใน Cloudinary Dashboard:
 * - Cloud Name
 * - Upload Preset (unsigned)
 *
 * ตั้งค่าในไฟล์ .env:
 * VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
 * VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
 */

// ตั้งค่า Cloudinary - อ่านจาก Environment Variables
const CLOUDINARY_CONFIG = {
  CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
  UPLOAD_PRESET: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '',
  FOLDER: 'singjumpen-quotes',
};

export interface UploadResult {
  success: boolean;
  url?: string;
  secureUrl?: string;
  publicId?: string;
  message?: string;
}

/**
 * อัปโหลดไฟล์ไปยัง Cloudinary
 * @param file - ไฟล์ที่จะอัปโหลด
 * @param folder - โฟลเดอร์ย่อย (optional)
 */
export const uploadToCloudinary = async (
  file: File,
  folder?: string
): Promise<UploadResult> => {
  try {
    // ตรวจสอบการตั้งค่า
    if (
      CLOUDINARY_CONFIG.CLOUD_NAME === 'your_cloud_name' ||
      CLOUDINARY_CONFIG.UPLOAD_PRESET === 'your_upload_preset'
    ) {
      return {
        success: false,
        message: 'ยังไม่ได้ตั้งค่า Cloudinary กรุณาตั้งค่า CLOUD_NAME และ UPLOAD_PRESET',
      };
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_CONFIG.UPLOAD_PRESET);
    formData.append('folder', folder || CLOUDINARY_CONFIG.FOLDER);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.CLOUD_NAME}/auto/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Cloudinary upload error:', errorData);
      return {
        success: false,
        message: errorData.error?.message || 'อัปโหลดไฟล์ไม่สำเร็จ',
      };
    }

    const data = await response.json();
    
    console.log('✅ Cloudinary upload success:', data.secure_url);
    
    return {
      success: true,
      url: data.url,
      secureUrl: data.secure_url,
      publicId: data.public_id,
    };
  } catch (error) {
    console.error('❌ Cloudinary upload error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการอัปโหลด',
    };
  }
};

/**
 * อัปโหลดหลายไฟล์พร้อมกัน
 */
export const uploadMultipleFiles = async (
  files: { file: File; type: 'design' | 'photo' }[]
): Promise<{ designUrl?: string; photoUrl?: string; error?: string }> => {
  const results: { designUrl?: string; photoUrl?: string } = {};

  for (const { file, type } of files) {
    const folder = type === 'design' 
      ? `${CLOUDINARY_CONFIG.FOLDER}/designs`
      : `${CLOUDINARY_CONFIG.FOLDER}/photos`;
    
    const result = await uploadToCloudinary(file, folder);
    
    if (!result.success) {
      return { error: result.message };
    }

    if (type === 'design') {
      results.designUrl = result.secureUrl;
    } else {
      results.photoUrl = result.secureUrl;
    }
  }

  return results;
};

/**
 * ตรวจสอบว่า Cloudinary ได้รับการตั้งค่าหรือยัง
 */
export const isCloudinaryConfigured = (): boolean => {
  return (
    CLOUDINARY_CONFIG.CLOUD_NAME !== 'your_cloud_name' &&
    CLOUDINARY_CONFIG.UPLOAD_PRESET !== 'your_upload_preset'
  );
};

export default {
  uploadToCloudinary,
  uploadMultipleFiles,
  isCloudinaryConfigured,
  CLOUDINARY_CONFIG,
};

import { useState } from 'react';

export interface SignFormData {
  email: string;
  name: string;
  phone: string;
  lineId: string;
  shopName: string;
  address: string;
  designFile: string;
  designNote: string;
  signText: string;
  logo: string;
  signWidth: string;
  signHeight: string;
  letterHeight: string;
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
  budget: string;
  budgetCustom: string;
  includeInstall: string;
  deadline: string;
  note: string;
}

const initialData: SignFormData = {
  email: '', name: '', phone: '', lineId: '', shopName: '', address: '',
  designFile: '', designNote: '', signText: '', logo: '',
  signWidth: '', signHeight: '', letterHeight: '', lightColor: '', lightColorCustom: '',
  borderMaterial: '', timer: '', installHeight: '', installMethod: '',
  wallType: '', mountType: '', oldSign: '', sitePhoto: '',
  budget: '', budgetCustom: '', includeInstall: '', deadline: '', note: '',
};

export const useSignForm = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<SignFormData>(initialData);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof SignFormData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const goTo = (n: number) => {
    if (n <= step) setStep(n);
  };

  const next = () => {
    if (step < 4) setStep(step + 1);
    else setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prev = () => {
    if (step > 1) setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { step, data, update, goTo, next, prev, submitted };
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

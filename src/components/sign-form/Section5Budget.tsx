import FormCard from './FormCard';
import { FieldGroup, BudgetCard, ToggleGroup } from './FormFields';
import { SignFormData, getLabel } from './useSignForm';

interface Props {
  data: SignFormData;
  update: (field: keyof SignFormData, value: string) => void;
}

const budgetOptions = [
  { v: '20000', label: '20K' },
  { v: '30000', label: '30K' },
  { v: '40000', label: '40K' },
  { v: '60000', label: '60K' },
  { v: '80000', label: '80K' },
  { v: '100000', label: '100K' },
  { v: '150000', label: '150K' },
  { v: 'other', label: 'ระบุเอง' },
];

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

const Section5Budget = ({ data, update }: Props) => {
  const budgetDisplay = data.budgetCustom || (data.budget && data.budget !== 'other' ? `${parseInt(data.budget) / 1000}K บาท` : '—');

  // Helper to get example image path
  const getExampleImage = (): string => {
    if (!data.signType || !data.signTypeExample) return '—';
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
    return paths[data.signType] || '—';
  };

  // Label mappings for Thai display
  const plateTypeLabels: Record<string, string> = {
    acrylic: 'ป้ายอะคริลิค',
    etched: 'ป้ายกัดกรด',
    machine: 'ป้ายเนมเพลทเครื่องจักร',
    room: 'ป้ายหน้าห้อง',
  };
  const nonLitTypeLabels: Record<string, string> = {
    acrylic: 'อักษรอะคริลิค',
    stainless: 'อักษรสแตนเลส',
    'foam-mirror': 'โฟมปัดเงา',
    brass: 'อักษรทองเหลือง',
    'acrylic-front': 'อะคริลิคหน้าสีข้างใส',
  };
  const litTypeLabels: Record<string, string> = {
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

  // Material labels
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

  const letterHeightLabels: Record<string, string> = {
    'under-10': 'ต่ำกว่า 10 เซนติเมตร',
    '10-20': '10-20 เซนติเมตร',
    '20-30': '20-30 เซนติเมตร',
    '30-50': '30-50 เซนติเมตร',
    '50-80': '50-80 เซนติเมตร',
    'over-80': 'มากกว่า 80 เซนติเมตร',
  };

  const lightColorLabels: Record<string, string> = {
    'cool-white': 'ขาว (Cool White)',
    'warm-white': 'วอร์มไวท์',
    rgb: 'RGB',
    red: 'แดง',
    green: 'เขียว',
    blue: 'น้ำเงิน',
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

  // สร้างข้อมูลสรุปตามประเภทงาน
  const getTypeSpecificRows = (): [string, string][] => {
    switch (data.signType) {
      case 'plate':
        return [
          ['ประเภทป้ายแผ่น', plateTypeLabels[data.plateType] || data.plateType || '—'],
          ['ขนาด', data.plateWidth && data.plateHeight ? `${data.plateWidth} × ${data.plateHeight} เซนติเมตร` : '—'],
          ['จำนวน', data.plateQuantity ? `${data.plateQuantity} ชิ้น` : '—'],
          ['วัสดุ', materialLabels[data.plateMaterial] || data.plateMaterial || '—'],
          ['ความหนา', thicknessLabels[data.plateThickness] || data.plateThickness || '—'],
          ['รายละเอียดงาน', detailLabels[data.plateDetail] || data.plateDetail || '—'],
          ['สี/ฟินิช', finishLabels[data.plateFinish] || data.plateFinish || '—'],
          ['วิธีติดตั้ง', installLabels[data.plateInstall] || data.plateInstall || '—'],
        ];
      case 'non-lit':
        return [
          ['ประเภทอักษรไม่ไฟ', nonLitTypeLabels[data.nonLitType] || data.nonLitType || '—'],
          ['ข้อความ', data.nonLitText || '—'],
          ['จำนวน', data.nonLitQuantity ? `${data.nonLitQuantity} ชิ้น` : '—'],
          ['ความสูงตัวอักษร', letterHeightLabels[data.nonLitLetterHeight] || data.nonLitLetterHeight || '—'],
          ['วัสดุ', materialLabels[data.nonLitMaterial] || data.nonLitMaterial || '—'],
          ['ฟินิช', finishLabels[data.nonLitFinish] || data.nonLitFinish || '—'],
          ['วิธีติดตั้ง', installLabels[data.nonLitInstall] || data.nonLitInstall || '—'],
        ];
      case 'lit':
        return [
          ['ประเภทอักษรไฟ', litTypeLabels[data.litType] || data.litType || '—'],
          ['ข้อความ', data.litText || '—'],
          ['จำนวน', data.litQuantity ? `${data.litQuantity} ชิ้น` : '—'],
          ['ความสูงตัวอักษร', letterHeightLabels[data.litLetterHeight] || data.litLetterHeight || '—'],
          ['สีอะคริลิค', data.litAcrylicColor || '—'],
          ['สีไฟ', lightColorLabels[data.litLightColor] || data.litLightColor || '—'],
          ['ระบบไฟ', systemLabels[data.litSystem] || data.litSystem || '—'],
          ['วิธีติดตั้ง', installLabels[data.litInstall] || data.litInstall || '—'],
        ];
      case 'lightbox':
        return [
          ['ประเภทกล่องไฟ', lightboxTypeLabels[data.lightboxType] || data.lightboxType || '—'],
          ['ขนาด', data.lightboxWidth && data.lightboxHeight ? `${data.lightboxWidth} × ${data.lightboxHeight} × ${data.lightboxDepth || '-'} เซนติเมตร` : '—'],
          ['จำนวน', data.lightboxQuantity ? `${data.lightboxQuantity} ชิ้น` : '—'],
          ['วัสดุหน้า', lightboxMaterialLabels[data.lightboxFaceMaterial] || data.lightboxFaceMaterial || '—'],
          ['วัสดุเฟรม', data.lightboxFrameMaterial || '—'],
          ['สีไฟ', lightColorLabels[data.lightboxLightColor] || data.lightboxLightColor || '—'],
          ['การติดตั้ง', installLabels[data.lightboxInstallType] || data.lightboxInstallType || '—'],
        ];
      case 'vinyl':
        return [
          ['ประเภทไวนิล', vinylTypeLabels[data.vinylType] || data.vinylType || '—'],
          ['ขนาด', data.vinylWidth && data.vinylHeight ? `${data.vinylWidth} × ${data.vinylHeight} เซนติเมตร` : '—'],
          ['จำนวน', data.vinylQuantity ? `${data.vinylQuantity} ชิ้น` : '—'],
          ['วัสดุ', data.vinylMaterialType || '—'],
          ['คุณภาพการพิมพ์', printQualityLabels[data.vinylPrintQuality] || data.vinylPrintQuality || '—'],
          ['การติดตั้ง', installLabels[data.vinylInstallType] || data.vinylInstallType || '—'],
        ];
      case 'metal':
        return [
          ['ประเภทงานเหล็ก', metalTypeLabels[data.metalType] || data.metalType || '—'],
          ['ขนาด', data.metalWidth && data.metalHeight ? `${data.metalWidth} × ${data.metalHeight} เซนติเมตร` : '—'],
          ['จำนวน', data.metalQuantity ? `${data.metalQuantity} ชิ้น` : '—'],
          ['วัสดุ', materialLabels[data.metalMaterial] || data.metalMaterial || '—'],
          ['ฟินิช', finishLabels[data.metalFinish] || data.metalFinish || '—'],
          ['การติดตั้ง', installLabels[data.metalInstallType] || data.metalInstallType || '—'],
        ];
      case 'facade':
        return [
          ['ประเภทงานฟาซาด', facadeTypeLabels[data.facadeType] || data.facadeType || '—'],
          ['ขนาด', data.facadeWidth && data.facadeHeight ? `${data.facadeWidth} × ${data.facadeHeight} เซนติเมตร` : '—'],
          ['จำนวน', data.facadeQuantity ? `${data.facadeQuantity} ชิ้น` : '—'],
          ['วัสดุ', materialLabels[data.facadeMaterial] || data.facadeMaterial || '—'],
          ['ลายฉลุ', data.facadePattern || '—'],
          ['การติดตั้ง', installLabels[data.facadeInstallType] || data.facadeInstallType || '—'],
        ];
      default:
        return [];
    }
  };

  // ข้อมูลทั่วไป (ขั้นตอนที่ 1)
  const contactRows: [string, string][] = [
    ['ชื่อ-นามสกุล', data.name],
    ['อีเมล', data.email],
    ['เบอร์โทร', data.phone],
    ['LINE ID', data.lineId],
    ['ชื่อร้าน/บริษัท', data.shopName],
  ];

  // Helper to get uploaded photo rows as array
  const getPhotoRows = (): { label: string; fileName: string; url?: string }[] => {
    const rows: { label: string; fileName: string; url?: string }[] = [];
    if (data.sitePhotoFront) rows.push({
      label: 'รูปหน้างานด้านหน้า',
      fileName: data.sitePhotoFrontUrl ? `${data.sitePhotoFront.name} (✓)` : data.sitePhotoFront.name,
      url: data.sitePhotoFrontUrl
    });
    if (data.sitePhotoInstall) rows.push({
      label: 'รูปบริเวณติดตั้ง',
      fileName: data.sitePhotoInstallUrl ? `${data.sitePhotoInstall.name} (✓)` : data.sitePhotoInstall.name,
      url: data.sitePhotoInstallUrl
    });
    if (data.sitePhotoPower) rows.push({
      label: 'รูปจุดไฟ/ปลั๊ก',
      fileName: data.sitePhotoPowerUrl ? `${data.sitePhotoPower.name} (✓)` : data.sitePhotoPower.name,
      url: data.sitePhotoPowerUrl
    });
    if (data.sitePhotoSurface) rows.push({
      label: 'รูปพื้นที่ติดตั้ง',
      fileName: data.sitePhotoSurfaceUrl ? `${data.sitePhotoSurface.name} (✓)` : data.sitePhotoSurface.name,
      url: data.sitePhotoSurfaceUrl
    });
    if (data.sitePhotoUpload) rows.push({
      label: 'รูปหน้างาน',
      fileName: data.site_photo_url ? `${data.sitePhotoUpload.name} (✓)` : data.sitePhotoUpload.name,
      url: data.site_photo_url
    });
    if (rows.length === 0) rows.push({ label: 'รูปหน้างาน', fileName: getLabel('sitePhoto', data.sitePhoto) });
    return rows;
  };

  // Helper to get design file info
  const getDesignFile = (): string => {
    if (data.designFileUpload) {
      return data.design_file_url ? `${data.designFileUpload.name} (✓ อัปโหลดแล้ว)` : data.designFileUpload.name;
    }
    return '—';
  };

  // Helper to get example image info
  const getExampleImageInfo = (): string => {
    if (data.signTypeExample && data.signTypeExampleUrl) {
      return `ตัวอย่างที่ ${data.signTypeExample} (✓ อัปโหลดแล้ว)`;
    }
    if (data.signTypeExample) {
      return `ตัวอย่างที่ ${data.signTypeExample}`;
    }
    return '—';
  };

  // ข้อมูลสถานที่ติดตั้ง (ขั้นตอนที่ 4)
  const installRows: [string, string][] = [
    ['ชื่อสถานที่', data.installSiteName || '—'],
    ['ที่อยู่', data.address || '—'],
    ['พิกัด GPS', data.installGps || '—'],
    ['ผู้ประสานงาน', data.installContactName || '—'],
    ['เบอร์ติดต่อหน้างาน', data.installContactPhone || '—'],
    ['ประเภทสถานที่', data.installSiteType === 'other' ? data.installSiteTypeOther : getLabel('installSiteType', data.installSiteType)],
    ['ความสูงติดตั้ง', heightDetailLabels[data.installHeightDetail] || data.installHeightDetail || '—'],
    ['ความสูงจากพื้น', data.installHeight || '—'],
    ['การเข้าหน้างาน', data.installAccess ? data.installAccess.split(',').map(v => {
      const map: Record<string, string> = { car: 'รถเข้าได้', bigcar: 'รถใหญ่เข้าได้', parkfar: 'ต้องจอดไกล', stair: 'ขนของขึ้นบันได', elevator: 'มีลิฟต์', permission: 'ขออนุญาตก่อนเข้า' };
      return map[v] || v;
    }).join(', ') : '—'],
    ['วิธีเข้าถึง', getLabel('installMethod', data.installMethod)],
    ['ผนัง/พื้นผิว', getLabel('wallType', data.wallType)],
    ['ลักษณะติดตั้ง', getLabel('mountType', data.mountType)],
    ['อุปกรณ์ที่ใช้', data.installEquipment ? data.installEquipment.split(',').map(v => {
      const map: Record<string, string> = { ladder: 'บันได', scaffold: 'นั่งร้าน', crane: 'รถกระเช้า', drill: 'สว่านเจาะ', weld: 'เชื่อม', electric: 'ไฟฟ้า', other: 'อื่น ๆ' };
      return map[v] || v;
    }).join(', ') : '—'],
    ['ป้ายเก่า', getLabel('oldSign', data.oldSign)],
  ];

  // รูปหน้างาน (แยกแสดงเป็นรายการ)
  const photoRows = getPhotoRows();

  // ไฟล์ออกแบบ
  const designFileRows: [string, string][] = [
    ['ไฟล์ออกแบบ', getDesignFile()],
  ];

  // ข้อมูลงบประมาณ (ขั้นตอนที่ 5)
  const budgetRows: [string, string][] = [
    ['งบประมาณ', budgetDisplay],
    ['ค่าติดตั้ง', getLabel('includeInstall', data.includeInstall)],
    ['วันที่ต้องการ', formatThaiDate(data.deadline)],
    ['หมายเหตุ', data.note],
  ];

  const typeSpecificRows = getTypeSpecificRows();

  return (
    <div className="animate-slide-in">
      <div className="mb-8">
        <div className="inline-block font-heading text-[10px] font-semibold tracking-[3px] uppercase text-primary bg-primary/10 px-3 py-1 rounded mb-3">
          ขั้นตอนที่ 05 / 05
        </div>
        <div className="font-heading text-[28px] font-bold text-foreground mb-1.5 leading-tight">งบประมาณ & กำหนดการ</div>
        <div className="text-sm text-muted-foreground">ช่วยให้ทีมงานเสนอแผนที่เหมาะสมที่สุดกับงบของคุณ</div>
      </div>

      <FormCard heading="งบประมาณ">
        <FieldGroup label="ช่วงงบประมาณโดยประมาณ" required>
          <div className="grid grid-cols-4 gap-2 max-[380px]:grid-cols-3">
            {budgetOptions.map(o => (
              <BudgetCard key={o.v} amount={o.label} selected={data.budget === o.v} onClick={() => update('budget', o.v)} unit={o.v === 'other' ? '' : 'บาท'} />
            ))}
          </div>
          {data.budget === 'other' && (
            <input type="text" className="form-input mt-2.5" placeholder="ระบุงบประมาณ (บาท)" value={data.budgetCustom} onChange={e => update('budgetCustom', e.target.value)} />
          )}
        </FieldGroup>

        <FieldGroup label="รวมค่าติดตั้ง">
          <ToggleGroup options={[{ label: 'รวมค่าติดตั้งด้วย', value: 'yes' }, { label: 'นำไปติดเอง', value: 'no' }]} value={data.includeInstall} onChange={v => update('includeInstall', v)} />
        </FieldGroup>
      </FormCard>

      <FormCard heading="กำหนดการ">
        <FieldGroup label="วันที่ต้องการให้แล้วเสร็จ" required hint="ระยะเวลาผลิต 7–10 วันทำการหลังชำระเงิน (ไม่รวมเสาร์–อาทิตย์)">
          <input type="date" className="form-input" value={data.deadline} onChange={e => update('deadline', e.target.value)} />
        </FieldGroup>

        <FieldGroup label="หมายเหตุ / ความต้องการเพิ่มเติม">
          <textarea className="form-input min-h-[100px] resize-y" placeholder="รายละเอียดเพิ่มเติม คำถาม หรือความต้องการพิเศษ..." value={data.note} onChange={e => update('note', e.target.value)} />
        </FieldGroup>
      </FormCard>

      {/* Summary - ข้อมูลติดต่อ */}
      <div className="bg-secondary border border-border rounded-xl p-5 mt-5">
        <div className="font-heading text-[11px] font-semibold tracking-[2px] uppercase text-muted-foreground/60 mb-3.5">
          📞 ข้อมูลติดต่อ
        </div>
        {contactRows.map(([k, v]) => (
          <div key={k} className="flex justify-between items-start gap-4 py-2 border-b border-muted last:border-b-0">
            <span className="text-[13px] text-muted-foreground flex-shrink-0">{k}</span>
            <span className="font-heading text-sm font-medium text-foreground/80 text-right">{v || '—'}</span>
          </div>
        ))}
      </div>

      {/* Summary - ประเภทงาน */}
      <div className="bg-secondary border border-border rounded-xl p-5 mt-5">
        <div className="font-heading text-[11px] font-semibold tracking-[2px] uppercase text-muted-foreground/60 mb-3.5">
          🏷️ ประเภทงาน: {getLabel('signType', data.signType)}
        </div>
        {typeSpecificRows.map(([k, v]) => (
          <div key={k} className="flex justify-between items-start gap-4 py-2 border-b border-muted last:border-b-0">
            <span className="text-[13px] text-muted-foreground flex-shrink-0">{k}</span>
            <span className="font-heading text-sm font-medium text-foreground/80 text-right">{v || '—'}</span>
          </div>
        ))}
        {/* รูปตัวอย่างที่เลือก */}
        {data.signTypeExample && getExampleImage() !== '—' && (
          <div className="py-3 border-b border-muted">
            <div className="flex justify-between items-start gap-4 py-2">
              <span className="text-[13px] text-muted-foreground flex-shrink-0">ตัวอย่างที่เลือก</span>
              <span className="font-heading text-sm font-medium text-foreground/80 text-right">{getExampleImageInfo()}</span>
            </div>
            <div className="rounded-lg overflow-hidden border border-border max-w-[200px] mt-2">
              <img
                src={getExampleImage()}
                alt={`ตัวอย่าง ${getLabel('signType', data.signType)}`}
                className="w-full h-auto object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            {data.signTypeExampleUrl && (
              <a
                href={data.signTypeExampleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline mt-1 block"
              >
                ดูรูปที่อัปโหลด
              </a>
            )}
          </div>
        )}
      </div>

      {/* Summary - ข้อมูลการติดตั้ง */}
      <div className="bg-secondary border border-border rounded-xl p-5 mt-5">
        <div className="font-heading text-[11px] font-semibold tracking-[2px] uppercase text-muted-foreground/60 mb-3.5">
          🔧 ข้อมูลการติดตั้ง
        </div>
        {installRows.map(([k, v]) => (
          <div key={k} className="flex justify-between items-start gap-4 py-2 border-b border-muted last:border-b-0">
            <span className="text-[13px] text-muted-foreground flex-shrink-0">{k}</span>
            <span className="font-heading text-sm font-medium text-foreground/80 text-right">{v || '—'}</span>
          </div>
        ))}
        {/* รูปหน้างาน - แยกแสดงเป็นรายการ */}
        {photoRows.map(({ label, fileName, url }) => (
          <div key={label} className="flex justify-between items-start gap-4 py-2 border-b border-muted last:border-b-0">
            <span className="text-[13px] text-muted-foreground flex-shrink-0">{label}</span>
            <div className="text-right">
              <span className="font-heading text-sm font-medium text-foreground/80 block">{fileName || '—'}</span>
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline"
                >
                  ดูรูปที่อัปโหลด
                </a>
              )}
            </div>
          </div>
        ))}
        {/* ไฟล์ออกแบบ */}
        {designFileRows.map(([k, v]) => (
          <div key={k} className="flex justify-between items-start gap-4 py-2 border-b border-muted last:border-b-0">
            <span className="text-[13px] text-muted-foreground flex-shrink-0">{k}</span>
            <div className="text-right">
              <span className="font-heading text-sm font-medium text-foreground/80 block">{v || '—'}</span>
              {data.design_file_url && (
                <a
                  href={data.design_file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline"
                >
                  ดูไฟล์ที่อัปโหลด
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary - งบประมาณ */}
      <div className="bg-secondary border border-border rounded-xl p-5 mt-5">
        <div className="font-heading text-[11px] font-semibold tracking-[2px] uppercase text-muted-foreground/60 mb-3.5">
          💰 งบประมาณ & กำหนดการ
        </div>
        {budgetRows.map(([k, v]) => (
          <div key={k} className="flex justify-between items-start gap-4 py-2 border-b border-muted last:border-b-0">
            <span className="text-[13px] text-muted-foreground flex-shrink-0">{k}</span>
            <span className="font-heading text-sm font-medium text-foreground/80 text-right">{v || '—'}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section5Budget;

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
      'block-paint': `/assets/08-block-paint/block paint 0${exampleNum}.jpg`,
      'cut-parts': `/assets/09-cut-parts/cut parts 0${exampleNum}.jpg`,
    };
    return paths[data.signType] || '—';
  };

  // Check if delivery-only (no installation)
  const isDeliveryOnly = data.signType === 'block-paint' || data.signType === 'cut-parts';

  // Label mappings for Thai display - ใช้ getLabel จาก useSignForm เป็นหลัก
  // เก็บเฉพาะ labels ที่ยังไม่ได้นิยามใน useSignForm
  
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

  // สร้างข้อมูลสรุปตามประเภทงาน
  const getTypeSpecificRows = (): [string, string][] => {
    switch (data.signType) {
      case 'plate':
        return [
          ['ประเภทป้ายแผ่น', getLabel('plateType', data.plateType)],
          ['ขนาด', data.plateWidth && data.plateHeight ? `${data.plateWidth} × ${data.plateHeight} เซนติเมตร` : '—'],
          ['จำนวน', data.plateQuantity ? `${data.plateQuantity} ชิ้น` : '—'],
          ['วัสดุ', getLabel('plateMaterial', data.plateMaterial)],
          ['ความหนา', getLabel('plateThickness', data.plateThickness)],
          ['รายละเอียดงาน', getLabel('plateDetail', data.plateDetail)],
          ['สี/ฟินิช', getLabel('plateFinish', data.plateFinish)],
          ['วิธีติดตั้ง', getLabel('plateInstall', data.plateInstall)],
        ];
      case 'non-lit':
        return [
          ['ประเภทอักษรไม่ไฟ', getLabel('nonLitType', data.nonLitType)],
          ['ข้อความ', data.nonLitText || '—'],
          ['จำนวน', data.nonLitQuantity ? `${data.nonLitQuantity} ชิ้น` : '—'],
          ['ความสูงตัวอักษร', data.nonLitLetterHeight ? `${data.nonLitLetterHeight} เซนติเมตร` : '—'],
          ['วัสดุ', getLabel('nonLitMaterial', data.nonLitMaterial)],
          ['ฟินิช', getLabel('nonLitFinish', data.nonLitFinish)],
          ['วิธีติดตั้ง', getLabel('nonLitInstall', data.nonLitInstall)],
        ];
      case 'lit':
        return [
          ['ประเภทอักษรไฟ', getLabel('litType', data.litType)],
          ['ข้อความ', data.litText || '—'],
          ['จำนวน', data.litQuantity ? `${data.litQuantity} ชิ้น` : '—'],
          ['ความสูงตัวอักษร', data.litLetterHeight ? `${data.litLetterHeight} เซนติเมตร` : '—'],
          ['สีอะคริลิค', getLabel('litAcrylicColor', data.litAcrylicColor)],
          ['สีไฟ', getLabel('litLightColor', data.litLightColor)],
          ['ระบบไฟ', getLabel('litSystem', data.litSystem)],
          ['วิธีติดตั้ง', getLabel('litInstall', data.litInstall)],
        ];
      case 'lightbox':
        return [
          ['ประเภทกล่องไฟ', getLabel('lightboxType', data.lightboxType)],
          ['ขนาด', data.lightboxWidth && data.lightboxHeight ? `${data.lightboxWidth} × ${data.lightboxHeight} × ${data.lightboxDepth || '-'} เซนติเมตร` : '—'],
          ['จำนวน', data.lightboxQuantity ? `${data.lightboxQuantity} ชิ้น` : '—'],
          ['วัสดุหน้า', lightboxMaterialLabels[data.lightboxFaceMaterial] || getLabel('lightboxFace', data.lightboxFaceMaterial)],
          ['วัสดุเฟรม', getLabel('lightboxFrame', data.lightboxFrameMaterial)],
          ['สีไฟ', getLabel('litLightColor', data.lightboxLightColor)],
          ['การติดตั้ง', data.lightboxInstallType || '—'],
        ];
      case 'vinyl':
        return [
          ['ประเภทไวนิล', getLabel('vinylType', data.vinylType)],
          ['ขนาด', data.vinylWidth && data.vinylHeight ? `${data.vinylWidth} × ${data.vinylHeight} เซนติเมตร` : '—'],
          ['จำนวน', data.vinylQuantity ? `${data.vinylQuantity} ชิ้น` : '—'],
          ['วัสดุ', getLabel('vinylMaterialType', data.vinylMaterialType)],
          ['คุณภาพการพิมพ์', printQualityLabels[data.vinylPrintQuality] || getLabel('vinylPrintQuality', data.vinylPrintQuality)],
          ['การติดตั้ง', getLabel('vinylInstallType', data.vinylInstallType)],
        ];
      case 'metal':
        return [
          ['ประเภทงานเหล็ก', getLabel('metalType', data.metalType)],
          ['ขนาด', data.metalWidth && data.metalHeight ? `${data.metalWidth} × ${data.metalHeight} เซนติเมตร` : '—'],
          ['จำนวน', data.metalQuantity ? `${data.metalQuantity} ชิ้น` : '—'],
          ['วัสดุ', getLabel('metalMaterial', data.metalMaterial)],
          ['ฟินิช', data.metalFinish || '—'],
          ['การชุบ/เคลือบ', getLabel('metalCoating', data.metalCoating)],
          ['การติดตั้ง', getLabel('metalInstallType', data.metalInstallType)],
          ['ลักษณะงาน', getLabel('metalSurfacePrep', data.metalSurfacePrep)],
        ];
      case 'facade':
        return [
          ['ประเภทงานฟาซาด', getLabel('facadeType', data.facadeType)],
          ['ขนาด', data.facadeWidth && data.facadeHeight ? `${data.facadeWidth} × ${data.facadeHeight} เซนติเมตร` : '—'],
          ['จำนวน', data.facadeQuantity ? `${data.facadeQuantity} ชิ้น` : '—'],
          ['วัสดุ', data.facadeMaterial || '—'],
          ['ลายฉลุ', data.facadePattern || '—'],
          ['การติดตั้ง', data.facadeInstallType || '—'],
        ];
      case 'block-paint':
        return [
          ['ขนาด', data.blockPaintWidth && data.blockPaintLength ? `${data.blockPaintWidth} × ${data.blockPaintLength} เซนติเมตร` : '—'],
          ['จำนวน', data.blockPaintQuantity ? `${data.blockPaintQuantity} ชิ้น` : '—'],
          ['วัสดุ', data.blockPaintMaterial === 'other' ? data.blockPaintMaterialOther : getLabel('blockPaintMaterial', data.blockPaintMaterial)],
          ['ข้อความ', data.blockPaintText || '—'],
          ['หมายเหตุ', data.blockPaintNote || '—'],
        ];
      case 'cut-parts':
        return [
          ['จำนวน', data.cutPartsQuantity ? `${data.cutPartsQuantity} ชิ้น` : '—'],
          ['วัสดุ', getLabel('cutPartsMaterial', data.cutPartsMaterial)],
          ['ความหนา', data.cutPartsThickness ? `${data.cutPartsThickness} มม.` : '—'],
          ['ส่งแบบ', getLabel('cutPartsInputType', data.cutPartsInputType)],
          ['ร้านทำแบบ', getLabel('cutPartsDesignBy', data.cutPartsDesignBy)],
          ['หมายเหตุ', data.cutPartsNote || '—'],
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
    ['ความสูงติดตั้ง', (() => {
      const heightMap: Record<string, string> = {
        'under2m': 'ต่ำกว่า 2 เมตร',
        '2-3m': '2–3 เมตร',
        '3-5m': '3–5 เมตร',
        'over5m': '5 เมตรขึ้นไป'
      };
      return heightMap[data.installHeightDetail] || data.installHeightDetail || '—';
    })()],
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

  // ข้อมูลการรับสินค้า (สำหรับงานไม่มีติดตั้ง)
  const deliveryRows: [string, string][] = [
    ['วิธีการรับสินค้า', getLabel('deliveryMethod', data.deliveryMethod)],
    ['ชื่อผู้รับ', data.deliveryName || data.deliveryPickupName || data.deliveryLalamoveName || '—'],
    ['เบอร์โทร', data.deliveryPhone || data.deliveryPickupPhone || data.deliveryLalamovePhone || '—'],
    ['ที่อยู่จัดส่ง', data.deliveryAddress || data.deliveryLalamoveAddress || '—'],
    ['พิกัด GPS', data.deliveryGps || '—'],
    ['หมายเหตุ', data.deliveryNote || data.deliveryPickupNote || data.deliveryLalamoveNote || '—'],
  ];

  // ข้อมูลงบประมาณ (ขั้นตอนที่ 5)
  const budgetRows: [string, string][] = [
    ['งบประมาณ', budgetDisplay],
    ...(isDeliveryOnly ? [] : [['ค่าติดตั้ง', getLabel('includeInstall', data.includeInstall)] as [string, string]]),
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

        {!isDeliveryOnly && (
          <FieldGroup label="รวมค่าติดตั้ง">
            <ToggleGroup options={[{ label: 'รวมค่าติดตั้งด้วย', value: 'yes' }, { label: 'นำไปติดเอง', value: 'no' }]} value={data.includeInstall} onChange={v => update('includeInstall', v)} />
          </FieldGroup>
        )}
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

      {/* Summary - ข้อมูลการติดตั้ง หรือ การรับสินค้า */}
      <div className="bg-secondary border border-border rounded-xl p-5 mt-5">
        <div className="font-heading text-[11px] font-semibold tracking-[2px] uppercase text-muted-foreground/60 mb-3.5">
          {isDeliveryOnly ? '📦 การรับสินค้า/จัดส่ง' : '🔧 ข้อมูลการติดตั้ง'}
        </div>
        {isDeliveryOnly ? (
          // แสดงข้อมูลการรับสินค้าสำหรับงานไม่มีติดตั้ง
          <>
            {deliveryRows.map(([k, v]) => (
              <div key={k} className="flex justify-between items-start gap-4 py-2 border-b border-muted last:border-b-0">
                <span className="text-[13px] text-muted-foreground flex-shrink-0">{k}</span>
                <span className="font-heading text-sm font-medium text-foreground/80 text-right">{v || '—'}</span>
              </div>
            ))}
          </>
        ) : (
          // แสดงข้อมูลการติดตั้งสำหรับงานทั่วไป
          <>
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
          </>
        )}
        {/* ไฟล์ออกแบบ - แสดงทั้งสองกรณี */}
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

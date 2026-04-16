import FormCard from './FormCard';
import { FieldGroup, OptionCard, ToggleGroup } from './FormFields';
import { SignFormData } from './useSignForm';

interface Props {
  data: SignFormData;
  update: (field: keyof SignFormData, value: string) => void;
  updateFile?: (field: 'sitePhotoUpload' | 'sitePhotoFront' | 'sitePhotoInstall' | 'sitePhotoPower' | 'sitePhotoSurface', file: File | null) => void;
}

const Section4Install = ({ data, update, updateFile }: Props) => {
  // Helper for checkbox arrays
  const toggleArrayValue = (field: keyof SignFormData, value: string) => {
    const current = (data[field] as string) || '';
    const arr = current ? current.split(',').filter(Boolean) : [];
    if (arr.includes(value)) {
      update(field, arr.filter(v => v !== value).join(','));
    } else {
      update(field, [...arr, value].join(','));
    }
  };

  const isChecked = (field: keyof SignFormData, value: string) => {
    const current = (data[field] as string) || '';
    return current.split(',').filter(Boolean).includes(value);
  };

  // File upload handler for specific photo type
  const handleFileChange = (field: 'sitePhotoFront' | 'sitePhotoInstall' | 'sitePhotoPower' | 'sitePhotoSurface', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (updateFile) {
      updateFile(field, file);
    }
  };

  const removeFile = (field: 'sitePhotoFront' | 'sitePhotoInstall' | 'sitePhotoPower' | 'sitePhotoSurface') => {
    if (updateFile) {
      updateFile(field, null);
    }
  };

  // Photo type config
  const photoTypes = [
    { key: 'front', label: 'แนบรูปหน้างานด้านหน้า', field: 'sitePhotoFront' as const },
    { key: 'installarea', label: 'แนบรูปบริเวณติดตั้งใกล้ ๆ', field: 'sitePhotoInstall' as const },
    { key: 'power', label: 'แนบรูปจุดไฟ / ปลั๊ก / เบรกเกอร์', field: 'sitePhotoPower' as const },
    { key: 'surface', label: 'แนบรูปพื้นที่ขึ้นติดตั้ง', field: 'sitePhotoSurface' as const },
  ];

  // File upload component
  const FileUploadBox = ({ 
    field, 
    label, 
    file 
  }: { 
    field: 'sitePhotoFront' | 'sitePhotoInstall' | 'sitePhotoPower' | 'sitePhotoSurface'; 
    label: string;
    file: File | null;
  }) => (
    <div className="border border-border rounded-lg p-3 bg-muted/30">
      <div className="text-sm font-medium mb-2">{label}</div>
      {!file ? (
        <div className="border-2 border-dashed border-border rounded-lg p-3 text-center hover:bg-muted/50 transition-colors">
          <input
            type="file"
            id={`${field}Input`}
            accept="image/*"
            onChange={(e) => handleFileChange(field, e)}
            className="hidden"
          />
          <label
            htmlFor={`${field}Input`}
            className="cursor-pointer flex flex-col items-center gap-1"
          >
            <span className="text-2xl">📷</span>
            <span className="text-xs text-muted-foreground">คลิกเพื่อเลือกรูป</span>
            <button
              type="button"
              className="mt-1 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-md hover:bg-primary/90 transition-colors"
              onClick={() => document.getElementById(`${field}Input`)?.click()}
            >
              เลือกไฟล์
            </button>
          </label>
        </div>
      ) : (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-2">
          <span className="text-xl">🖼️</span>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-foreground truncate">{file.name}</div>
            <div className="text-[10px] text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</div>
          </div>
          <button
            type="button"
            onClick={() => removeFile(field)}
            className="p-1 text-red-500 hover:bg-red-50 rounded-md transition-colors text-xs"
            title="ลบไฟล์"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="animate-slide-in">
      <div className="mb-8">
        <div className="inline-block font-heading text-[10px] font-semibold tracking-[3px] uppercase text-primary bg-primary/10 px-3 py-1 rounded mb-3">
          ข้อมูลติดตั้ง (2/3)
        </div>
        <div className="font-heading text-[28px] font-bold text-foreground mb-1.5 leading-tight">การติดตั้ง</div>
        <div className="text-sm text-muted-foreground">รายละเอียดหน้างานช่วยให้ประเมินราคาได้ถูกต้องและรวดเร็ว</div>
      </div>

      {/* สถานที่ติดตั้ง */}
      <FormCard heading="สถานที่ติดตั้ง">
        <FieldGroup label="ชื่อสถานที่">
          <input type="text" className="form-input" placeholder="เช่น ร้านกาแฟ ABC, บริษัท XYZ" value={data.installSiteName} onChange={e => update('installSiteName', e.target.value)} />
        </FieldGroup>

        <FieldGroup label="ที่อยู่">
          <textarea className="form-input min-h-[80px] resize-y" placeholder="ระบุที่อยู่เต็มรูปแบบ" value={data.address} onChange={e => update('address', e.target.value)} />
        </FieldGroup>

        <FieldGroup label="พิกัด Google Map">
          <input type="text" className="form-input" placeholder="แชร์ลิงก์ Google Maps หรือพิกัด GPS" value={data.installGps} onChange={e => update('installGps', e.target.value)} />
        </FieldGroup>

        <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
          <FieldGroup label="ผู้ประสานงานหน้างาน">
            <input type="text" className="form-input" placeholder="ชื่อผู้ติดต่อ" value={data.installContactName} onChange={e => update('installContactName', e.target.value)} />
          </FieldGroup>
          <FieldGroup label="เบอร์ติดต่อหน้างาน">
            <input type="text" className="form-input" placeholder="เบอร์โทรศัพท์" value={data.installContactPhone} onChange={e => update('installContactPhone', e.target.value)} />
          </FieldGroup>
        </div>
      </FormCard>

      {/* ลักษณะหน้างาน */}
      <FormCard heading="ลักษณะหน้างาน">
        <FieldGroup label="ประเภทสถานที่">
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { v: 'house', t: 'บ้าน' },
              { v: 'shophouse', t: 'อาคารพาณิชย์' },
              { v: 'shop', t: 'ร้านค้า' },
              { v: 'factory', t: 'โรงงาน' },
              { v: 'mall', t: 'ห้าง' },
              { v: 'office', t: 'ออฟฟิศ' },
              { v: 'condo', t: 'คอนโด' },
              { v: 'other', t: 'อื่น ๆ' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.installSiteType === o.v} onClick={() => update('installSiteType', o.v)} title={o.t} />
            ))}
          </div>
          {data.installSiteType === 'other' && (
            <input type="text" className="form-input mt-2.5" placeholder="ระบุประเภทสถานที่" value={data.installSiteTypeOther} onChange={e => update('installSiteTypeOther', e.target.value)} />
          )}
        </FieldGroup>

        <FieldGroup label="ความสูงติดตั้งโดยประมาณ" required>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { v: 'under2m', t: 'ต่ำกว่า 2 เมตร' },
              { v: '2-3m', t: '2–3 เมตร' },
              { v: '3-5m', t: '3–5 เมตร' },
              { v: 'over5m', t: '5 เมตรขึ้นไป' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.installHeightDetail === o.v} onClick={() => update('installHeightDetail', o.v)} title={o.t} />
            ))}
          </div>
        </FieldGroup>

        <FieldGroup label="ความสูงจากพื้นดิน / พื้นอาคาร" hint="วัดจากพื้นถึงจุดกึ่งกลางที่จะติดป้าย (ถ้ารู้)">
          <input type="text" className="form-input" placeholder="เช่น 3.5 เมตร" value={data.installHeight} onChange={e => update('installHeight', e.target.value)} />
        </FieldGroup>
      </FormCard>

      {/* การเข้าหน้างาน */}
      <FormCard heading="การเข้าหน้างาน">
        <FieldGroup label="การเข้าถึงหน้างาน (เลือกได้หลายข้อ)">
          <div className="space-y-2">
            {[
              { v: 'car', t: 'รถเข้าได้' },
              { v: 'bigcar', t: 'รถใหญ่เข้าได้' },
              { v: 'parkfar', t: 'ต้องจอดไกล' },
              { v: 'stair', t: 'ต้องขนของขึ้นบันได' },
              { v: 'elevator', t: 'มีลิฟต์' },
              { v: 'permission', t: 'ต้องขออนุญาตก่อนเข้าหน้างาน' },
            ].map(o => (
              <label key={o.v} className="flex items-center gap-2.5 p-2.5 rounded-lg border border-border cursor-pointer hover:bg-muted/50 transition-colors">
                <input
                  type="checkbox"
                  checked={isChecked('installAccess', o.v)}
                  onChange={() => toggleArrayValue('installAccess', o.v)}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm">{o.t}</span>
              </label>
            ))}
          </div>
        </FieldGroup>

        <FieldGroup label="วิธีเข้าถึงจุดติดตั้ง">
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'stand', t: 'ยืนติดได้เลย', d: 'ไม่ต้องใช้อุปกรณ์เพิ่ม' },
              { v: 'ladder', t: 'ใช้บันได' },
              { v: 'scaffold', t: 'ตั้งนั่งร้าน 3 ชั้น', d: 'สูงประมาณ 5.1 ม.' },
              { v: 'crane', t: 'รถกระเช้า / เครน' },
              { v: 'ready', t: 'มีนั่งร้านพร้อมแล้ว', d: 'หน้างานเตรียมไว้' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.installMethod === o.v} onClick={() => update('installMethod', o.v)} title={o.t} desc={o.d} />
            ))}
          </div>
        </FieldGroup>
      </FormCard>

      {/* ผนัง/พื้นผิว */}
      <FormCard heading="ผนัง / พื้นผิวที่จะติดตั้ง">
        <FieldGroup label="ประเภทผนัง / พื้นผิว" required>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { v: 'metalsheet', t: 'เมทัลชีท' },
              { v: 'steelframe', t: 'โครงเหล็ก' },
              { v: 'marble', t: 'พื้นหินอ่อน' },
              { v: 'slat', t: 'พื้นระแนง' },
              { v: 'ready', t: 'มีโครงเหล็กรอแล้ว' },
              { v: 'composite', t: 'คอมโพสิต' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.wallType === o.v} onClick={() => update('wallType', o.v)} title={o.t} />
            ))}
          </div>
        </FieldGroup>

        <FieldGroup label="ประเภทการติดตั้ง" required>
          <div className="grid gap-2.5">
            {[
              { v: 'wall', t: 'แนบผนัง', d: 'ติดกับผนังโดยตรง ไม่มีโครงพิเศษ' },
              { v: 'roof', t: 'ทำโครงเหล็กตั้งบนหลังคา', d: 'คิดค่าโครงเหล็กเพิ่มเติม กรุณาส่งภาพหน้างานประกอบ' },
              { v: 'floor', t: 'ทำโครงเหล็กยึดกับพื้น', d: 'เสายื่นหรือฐานติดพื้น' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.mountType === o.v} onClick={() => update('mountType', o.v)} title={o.t} desc={o.d} />
            ))}
          </div>
        </FieldGroup>
      </FormCard>

      {/* อุปกรณ์ติดตั้ง */}
      <FormCard heading="อุปกรณ์ติดตั้งที่อาจต้องใช้">
        <FieldGroup label="อุปกรณ์ที่ต้องใช้ (เลือกได้หลายข้อ)">
          <div className="space-y-2">
            {[
              { v: 'ladder', t: 'บันได' },
              { v: 'scaffold', t: 'นั่งร้าน' },
              { v: 'crane', t: 'รถกระเช้า' },
              { v: 'drill', t: 'สว่านเจาะ' },
              { v: 'weld', t: 'เชื่อม' },
              { v: 'electric', t: 'ไฟฟ้า' },
              { v: 'other', t: 'อื่น ๆ' },
            ].map(o => (
              <label key={o.v} className="flex items-center gap-2.5 p-2.5 rounded-lg border border-border cursor-pointer hover:bg-muted/50 transition-colors">
                <input
                  type="checkbox"
                  checked={isChecked('installEquipment', o.v)}
                  onChange={() => toggleArrayValue('installEquipment', o.v)}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm">{o.t}</span>
              </label>
            ))}
          </div>
          {isChecked('installEquipment', 'other') && (
            <input type="text" className="form-input mt-2.5" placeholder="ระบุอุปกรณ์อื่น ๆ" value={data.installEquipmentOther || ''} onChange={e => update('installEquipmentOther', e.target.value)} />
          )}
        </FieldGroup>
      </FormCard>

      {/* ป้ายเก่า */}
      <FormCard heading="ป้ายเก่า">
        <FieldGroup label="ป้ายเก่าที่ต้องรื้อถอน">
          <ToggleGroup options={[{ label: 'มี ต้องรื้อก่อน', value: 'yes' }, { label: 'ไม่มี', value: 'no' }]} value={data.oldSign} onChange={v => update('oldSign', v)} />
        </FieldGroup>
      </FormCard>

      {/* รูปหน้างาน */}
      <FormCard heading="รูปหน้างาน">
        <FieldGroup label="รูปถ่ายหน้างาน" required hint="เลือกประเภทรูปที่ต้องการแนบ แล้วอัปโหลดรูปสำหรับแต่ละประเภท">
          <div className="space-y-4">
            {/* Step 1: Select photo types */}
            <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
              <OptionCard selected={data.sitePhoto === 'yes'} onClick={() => update('sitePhoto', 'yes')} title="มีรูปแล้ว" desc="เลือกประเภทรูปและอัปโหลด" />
              <OptionCard selected={data.sitePhoto === 'visit'} onClick={() => update('sitePhoto', 'visit')} title="ให้ร้านไปดูหน้างาน" desc="ส่งโลเคชั่นมาให้" />
            </div>

            {/* Step 2: Select photo types and upload */}
            {data.sitePhoto === 'yes' && (
              <div className="cond-block space-y-4">
                <div className="font-heading text-[13px] font-medium">เลือกประเภทรูปที่จะแนบ (ติ๊กเลือกแล้วอัปโหลดรูปได้)</div>
                
                <div className="space-y-3">
                  {photoTypes.map((o) => (
                    <div key={o.key} className="border border-border rounded-lg p-3">
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isChecked('sitePhotoTypes', o.key)}
                          onChange={() => toggleArrayValue('sitePhotoTypes', o.key)}
                          className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                        />
                        <span className="text-sm font-medium">{o.label}</span>
                      </label>
                      
                      {/* Show upload box when checked */}
                      {isChecked('sitePhotoTypes', o.key) && (
                        <div className="mt-3 pl-6">
                          <FileUploadBox 
                            field={o.field} 
                            label={`อัปโหลด${o.label.replace('แนบ', '')}`}
                            file={data[o.field] as File | null}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="text-xs text-muted-foreground pt-2 border-t border-border">
                  หรือส่งรูปมาที่ <span className="font-medium text-primary">shopitart@gmail.com</span> หรือ Line <span className="font-medium text-primary">@singjumpen</span>
                </div>
              </div>
            )}
          </div>
        </FieldGroup>
      </FormCard>
    </div>
  );
};

export default Section4Install;

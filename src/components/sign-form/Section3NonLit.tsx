import FormCard from './FormCard';
import { FieldGroup, OptionCard } from './FormFields';
import { SignFormData } from './useSignForm';

interface Props {
  data: SignFormData;
  update: (field: keyof SignFormData, value: string) => void;
  updateFile: (field: 'designFileUpload', value: File | null) => void;
}

const Section3NonLit = ({ data, update, updateFile }: Props) => {
  const isAcrylicBacking = data.nonLitType === 'stainless-acrylic';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateFile('designFileUpload', e.target.files[0]);
    }
  };

  const removeFile = () => {
    updateFile('designFileUpload', null);
  };

  return (
    <div className="animate-slide-in">
      <div className="mb-8">
        <div className="inline-block font-heading text-[10px] font-semibold tracking-[3px] uppercase text-primary bg-primary/10 px-3 py-1 rounded mb-3">
          ขั้นตอนที่ 03 / 05 • งานอักษรไม่ไฟ
        </div>
        <div className="font-heading text-[28px] font-bold text-foreground mb-1.5 leading-tight">รายละเอียดอักษรไม่ไฟ</div>
        <div className="text-sm text-muted-foreground">กรอกข้อมูลเฉพาะงานอักษรไม่มีไฟ</div>
      </div>

      <FormCard heading="ประเภทอักษร">
        <FieldGroup label="ประเภท" required>
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'pvc', t: 'อักษรพลาสวูด' },
              { v: 'acrylic', t: 'อักษรอะคริลิค' },
              { v: 'metal-rim', t: 'อักษรโลหะยกขอบ' },
              { v: 'ss-silver-gloss', t: 'อักษรสแตนเลสเงินเงา' },
              { v: 'ss-silver-hairline', t: 'อักษรสแตนเลสเงินแฮร์ไลน์' },
              { v: 'ss-gold-gloss', t: 'อักษรสแตนเลสทองเงา' },
              { v: 'ss-gold-hairline', t: 'อักษรสแตนเลสทองแฮร์ไลน์' },
              { v: 'ss-acrylic', t: 'อักษรสแตนเลสรองหลังอะคริลิค' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.nonLitType === o.v} onClick={() => update('nonLitType', o.v)} title={o.t} />
            ))}
          </div>
        </FieldGroup>
      </FormCard>

      <FormCard heading="ข้อความและขนาด">
        <FieldGroup label="ข้อความ / ชื่อร้าน / โลโก้" required>
          <input type="text" className="form-input" placeholder="ข้อความที่ต้องการทำ" value={data.nonLitText} onChange={e => update('nonLitText', e.target.value)} />
        </FieldGroup>

        <FieldGroup label="จำนวนชุด" required>
          <input type="number" className="form-input" placeholder="1" value={data.nonLitQuantity} onChange={e => update('nonLitQuantity', e.target.value)} />
        </FieldGroup>

        <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
          <FieldGroup label="ความสูงตัวอักษร (cm)" required>
            <input type="number" className="form-input" placeholder="0" value={data.nonLitLetterHeight} onChange={e => update('nonLitLetterHeight', e.target.value)} />
          </FieldGroup>
          <FieldGroup label="ความหนา (mm/cm)">
            <input type="text" className="form-input" placeholder="เช่น 3 มม." value={data.nonLitThickness} onChange={e => update('nonLitThickness', e.target.value)} />
          </FieldGroup>
          <FieldGroup label="ความยาวรวมทั้งชุด (cm)">
            <input type="number" className="form-input" placeholder="0" value={data.nonLitTotalLength} onChange={e => update('nonLitTotalLength', e.target.value)} />
          </FieldGroup>
        </div>
      </FormCard>

      <FormCard heading="วัสดุและรายละเอียดผิว">
        <FieldGroup label="วัสดุ" required>
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'pvc', t: 'พลาสวูด' },
              { v: 'acrylic', t: 'อะคริลิค' },
              { v: 'stainless', t: 'สแตนเลส' },
              { v: 'steel', t: 'เหล็ก' },
              { v: 'other', t: 'อื่น ๆ' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.nonLitMaterial === o.v} onClick={() => update('nonLitMaterial', o.v)} title={o.t} />
            ))}
          </div>
          {data.nonLitMaterial === 'other' && (
            <input type="text" className="form-input mt-2.5" placeholder="ระบุวัสดุ" value={data.nonLitMaterialOther} onChange={e => update('nonLitMaterialOther', e.target.value)} />
          )}
        </FieldGroup>

        <FieldGroup label="รายละเอียดผิวงาน">
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'silver-gloss', t: 'เงินเงา' },
              { v: 'silver-hairline', t: 'เงินแฮร์ไลน์' },
              { v: 'gold-gloss', t: 'ทองเงา' },
              { v: 'gold-hairline', t: 'ทองแฮร์ไลน์' },
              { v: 'paint', t: 'พ่นสี' },
              { v: 'clear-coat', t: 'เคลือบใส' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.nonLitFinish === o.v} onClick={() => update('nonLitFinish', o.v)} title={o.t} />
            ))}
          </div>
          {data.nonLitFinish === 'paint' && (
            <input type="text" className="form-input mt-2.5" placeholder="ระบุสีที่ต้องการ" value={data.nonLitFinishColor} onChange={e => update('nonLitFinishColor', e.target.value)} />
          )}
        </FieldGroup>

        <FieldGroup label="ความหนาวัสดุ">
          <div className="grid grid-cols-4 gap-2 max-sm:grid-cols-2">
            {['3 มม.', '5 มม.', '10 มม.', '15 มม.', '20 มม.', 'อื่น ๆ'].map(o => (
              <OptionCard key={o} selected={data.nonLitMaterialThickness === o} onClick={() => update('nonLitMaterialThickness', o)} title={o} />
            ))}
          </div>
          {data.nonLitMaterialThickness === 'อื่น ๆ' && (
            <input type="text" className="form-input mt-2.5" placeholder="ระบุความหนา" value={data.nonLitMaterialThicknessOther} onChange={e => update('nonLitMaterialThicknessOther', e.target.value)} />
          )}
        </FieldGroup>
      </FormCard>

      {/* เฉพาะรองหลังอะคริลิค */}
      {isAcrylicBacking && (
        <FormCard heading="รายละเอียดรองหลังอะคริลิค">
          <FieldGroup label="สีอะคริลิค">
            <input type="text" className="form-input" placeholder="เช่น ขาว, ดำ, ใส" value={data.nonLitAcrylicColor} onChange={e => update('nonLitAcrylicColor', e.target.value)} />
          </FieldGroup>
          <FieldGroup label="ความหนาอะคริลิค">
            <div className="grid grid-cols-3 gap-2">
              {['3 มม.', '5 มม.', '10 มม.', 'อื่น ๆ'].map(o => (
                <OptionCard key={o} selected={data.nonLitAcrylicThickness === o} onClick={() => update('nonLitAcrylicThickness', o)} title={o} />
              ))}
            </div>
          </FieldGroup>
          <FieldGroup label="ต้องการรองหลังทรง">
            <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
              {[
                { v: 'follow-letter', t: 'ตรงตามทรงตัวอักษร' },
                { v: 'square', t: 'แผ่นสี่เหลี่ยม' },
                { v: 'diecut', t: 'แผ่นไดคัทตามโลโก้' },
              ].map(o => (
                <OptionCard key={o.v} selected={data.nonLitBackingShape === o.v} onClick={() => update('nonLitBackingShape', o.v)} title={o.t} />
              ))}
            </div>
          </FieldGroup>
        </FormCard>
      )}

      <FormCard heading="การติดตั้ง">
        <FieldGroup label="วิธีติดตั้ง">
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'wall', t: 'ติดผนัง' },
              { v: 'glass', t: 'ติดกระจก' },
              { v: 'steel-frame', t: 'ติดโครงเหล็ก' },
              { v: 'composite', t: 'ติดคอมโพสิต' },
              { v: 'wood', t: 'ติดไม้' },
              { v: 'pickup', t: 'ไม่ติดตั้ง รับเฉพาะชิ้นงาน' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.nonLitInstall === o.v} onClick={() => update('nonLitInstall', o.v)} title={o.t} />
            ))}
          </div>
        </FieldGroup>
      </FormCard>

      <FormCard heading="ต้องการอะไรเพิ่มเติม">
        <FieldGroup label="เลือกได้หลายข้อ">
          <div className="space-y-2">
            {[
              { v: 'layout', t: 'แบบวางตำแหน่งติดตั้ง' },
              { v: 'template', t: 'Template เจาะติดตั้ง' },
              { v: 'frame', t: 'โครงรองหลัง' },
              { v: 'spacer', t: 'เว้นระยะลอยจากผนัง' },
            ].map(o => (
              <label key={o.v} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border text-primary"
                  checked={data.nonLitExtras?.includes(o.v) || false}
                  onChange={(e) => {
                    const current = data.nonLitExtras || '';
                    const values = current ? current.split(',') : [];
                    if (e.target.checked) {
                      update('nonLitExtras', [...values, o.v].join(','));
                    } else {
                      update('nonLitExtras', values.filter(v => v !== o.v).join(','));
                    }
                  }}
                />
                <span className="text-sm">{o.t}</span>
              </label>
            ))}
          </div>
        </FieldGroup>
      </FormCard>

      <FormCard heading="ไฟล์และหมายเหตุ">
        <FieldGroup label="ไฟล์ออกแบบ / รูปตัวอย่าง">
          {!data.designFileUpload ? (
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:bg-muted/50 transition-colors">
              <input
                type="file"
                id="designFileInput"
                accept=".ai,.eps,.cdr,.dxf,.pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="designFileInput" className="cursor-pointer flex flex-col items-center gap-2">
                <span className="text-3xl">📎</span>
                <span className="text-sm text-muted-foreground">คลิกเพื่อเลือกไฟล์</span>
                <button type="button" className="mt-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors" onClick={() => document.getElementById('designFileInput')?.click()}>
                  Choose File
                </button>
              </label>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-3">
              <span className="text-2xl">📄</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">{data.designFileUpload.name}</div>
                <div className="text-xs text-muted-foreground">{(data.designFileUpload.size / 1024).toFixed(1)} KB</div>
              </div>
              <button type="button" onClick={removeFile} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors" title="ลบไฟล์">✕</button>
            </div>
          )}
        </FieldGroup>
        <FieldGroup label="หมายเหตุเพิ่มเติม">
          <textarea className="form-input min-h-[80px] resize-y" placeholder="รายละเอียดเพิ่มเติม..." value={data.nonLitNote || ''} onChange={e => update('nonLitNote', e.target.value)} />
        </FieldGroup>
      </FormCard>
    </div>
  );
};

export default Section3NonLit;

import FormCard from './FormCard';
import { FieldGroup, OptionCard } from './FormFields';
import { SignFormData } from './useSignForm';

interface Props {
  data: SignFormData;
  update: (field: keyof SignFormData, value: string) => void;
  updateFile?: (field: 'designFileUpload', file: File | null) => void;
}

const Section3Metal = ({ data, update, updateFile }: Props) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (updateFile) {
      updateFile('designFileUpload', file);
    }
  };

  const removeFile = () => {
    if (updateFile) {
      updateFile('designFileUpload', null);
    }
  };

  return (
    <div className="animate-slide-in">
      <div className="mb-8">
        <div className="inline-block font-heading text-[10px] font-semibold tracking-[3px] uppercase text-primary bg-primary/10 px-3 py-1 rounded mb-3">
          ระบุรายละเอียดงาน (2/3) • งานเหล็ก/รั้ว/ประตู
        </div>
        <div className="font-heading text-[28px] font-bold text-foreground mb-1.5 leading-tight">รายละเอียดงานเหล็ก</div>
        <div className="text-sm text-muted-foreground">กรอกข้อมูลเฉพาะงานเหล็ก รั้ว และประตู</div>
      </div>

      <FormCard heading="ประเภทงาน">
        <FieldGroup label="ประเภท" required>
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'fence', t: 'รั้วเหล็ก' },
              { v: 'gate', t: 'ประตูเหล็ก' },
              { v: 'steel-structure', t: 'โครงสร้างเหล็ก' },
              { v: 'railing', t: 'ราวบันได/ราวกันตก' },
              { v: 'canopy', t: 'หลังคาเหล็ก' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.metalType === o.v} onClick={() => update('metalType', o.v)} title={o.t} />
            ))}
          </div>
        </FieldGroup>
      </FormCard>

      <FormCard heading="ขนาดและปริมาณ">
        <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
          <FieldGroup label="ความกว้าง (cm)">
            <input type="number" className="form-input" placeholder="0" value={data.metalWidth} onChange={e => update('metalWidth', e.target.value)} />
          </FieldGroup>
          <FieldGroup label="ความสูง (cm)">
            <input type="number" className="form-input" placeholder="0" value={data.metalHeight} onChange={e => update('metalHeight', e.target.value)} />
          </FieldGroup>
        </div>
        <FieldGroup label="จำนวน (ชิ้น/บาน)">
          <input type="number" className="form-input" placeholder="1" value={data.metalQuantity} onChange={e => update('metalQuantity', e.target.value)} />
        </FieldGroup>
      </FormCard>

      <FormCard heading="วัสดุและลักษณะ">
        <FieldGroup label="วัสดุหลัก">
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'steel', t: 'เหล็กดำ' },
              { v: 'galvanized', t: 'เหล็กกัลวาไนซ์' },
              { v: 'stainless', t: 'สแตนเลส' },
              { v: 'aluminum', t: 'อลูมิเนียม' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.metalMaterial === o.v} onClick={() => update('metalMaterial', o.v)} title={o.t} />
            ))}
          </div>
        </FieldGroup>

        <FieldGroup label="ความหนาเหล็ก">
          <div className="grid grid-cols-3 gap-2">
            {['1.2 มม.', '1.5 มม.', '2.0 มม.', '2.3 มม.', '3.2 มม.', 'อื่น ๆ'].map(o => (
              <OptionCard key={o} selected={data.metalThickness === o} onClick={() => update('metalThickness', o)} title={o} />
            ))}
          </div>
        </FieldGroup>

        <FieldGroup label="ลักษณะงาน">
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'solid', t: 'ทึบ' },
              { v: 'slat', t: 'ระแนง' },
              { v: 'mesh', t: 'ตาข่าย' },
              { v: 'pattern', t: 'ลายฉลุ' },
              { v: 'scroll', t: 'ลายดัด' },
              { v: 'mixed', t: 'ผสม' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.metalSurfacePrep === o.v} onClick={() => update('metalSurfacePrep', o.v)} title={o.t} />
            ))}
          </div>
        </FieldGroup>
      </FormCard>

      <FormCard heading="การชุบ/ทาสี">
        <FieldGroup label="การชุบ/เคลือบ">
          <div className="grid grid-cols-2 gap-2">
            {[
              { v: 'galvanized', t: 'ชุบกัลวาไนซ์' },
              { v: 'paint', t: 'พ่นสี' },
              { v: 'powder-coat', t: 'เคลือบผง' },
              { v: 'none', t: 'ไม่ชุบ' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.metalCoating === o.v} onClick={() => update('metalCoating', o.v)} title={o.t} />
            ))}
          </div>
        </FieldGroup>

        {data.metalCoating === 'paint' && (
          <FieldGroup label="สีที่ต้องการ">
            <input type="text" className="form-input" placeholder="ระบุสี เช่น ดำ, เทา, ขาว" value={data.metalFinish} onChange={e => update('metalFinish', e.target.value)} />
          </FieldGroup>
        )}
      </FormCard>

      <FormCard heading="การติดตั้ง">
        <FieldGroup label="ประเภทการติดตั้ง">
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'ground', t: 'ฝังพื้น' },
              { v: 'wall', t: 'ยึดผนัง' },
              { v: 'concrete', t: 'เทคานคอนกรีต' },
              { v: 'existing', t: 'ติดตั้งบนโครงสร้างเดิม' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.metalInstallType === o.v} onClick={() => update('metalInstallType', o.v)} title={o.t} />
            ))}
          </div>
        </FieldGroup>
      </FormCard>

      <FormCard heading="อุปกรณ์เสริม">
        <FieldGroup label="ต้องการอุปกรณ์">
          <div className="space-y-2">
            {[
              { v: 'lock', t: 'กุญแจ/ล็อค' },
              { v: 'hinge', t: 'บานพับพิเศษ' },
              { v: 'wheel', t: 'ล้อเลื่อน' },
              { v: 'motor', t: 'มอเตอร์ประตูอัตโนมัติ' },
              { v: 'intercom', t: 'กริ่ง/อินเตอร์คอม' },
            ].map(o => (
              <label key={o.v} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border text-primary"
                  checked={data.metalAccessories?.includes(o.v) || false}
                  onChange={(e) => {
                    const current = data.metalAccessories || '';
                    const values = current ? current.split(',') : [];
                    if (e.target.checked) {
                      update('metalAccessories', [...values, o.v].join(','));
                    } else {
                      update('metalAccessories', values.filter(v => v !== o.v).join(','));
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
          <textarea className="form-input min-h-[80px] resize-y" placeholder="รายละเอียดเพิ่มเติม..." value={data.metalNote || ''} onChange={e => update('metalNote', e.target.value)} />
        </FieldGroup>
      </FormCard>
    </div>
  );
};

export default Section3Metal;

import FormCard from './FormCard';
import { FieldGroup, OptionCard } from './FormFields';
import { SignFormData } from './useSignForm';

interface Props {
  data: SignFormData;
  update: (field: keyof SignFormData, value: string) => void;
  updateFile?: (field: 'designFileUpload', file: File | null) => void;
}

const Section3InstallOnly = ({ data, update, updateFile }: Props) => {
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
          ระบุรายละเอียดงาน (2/3) • งานติดตั้งอย่างเดียว
        </div>
        <div className="font-heading text-[28px] font-bold text-foreground mb-1.5 leading-tight">ข้อมูลงานติดตั้ง</div>
        <div className="text-sm text-muted-foreground">กรอกข้อมูลสำหรับงานติดตั้งหรือสำรวจหน้างาน</div>
      </div>

      <FormCard heading="ประเภทงาน">
        <FieldGroup label="บริการที่ต้องการ" required>
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'site-survey', t: 'สำรวจหน้างาน' },
              { v: 'install-only', t: 'ติดตั้งอย่างเดียว' },
              { v: 'remove', t: 'รื้อถอน' },
              { v: 'repair', t: 'ซ่อมแซม' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.installOnlyType === o.v} onClick={() => update('installOnlyType', o.v)} title={o.t} />
            ))}
          </div>
        </FieldGroup>
      </FormCard>

      <FormCard heading="รายละเอียดงาน">
        <FieldGroup label="รายละเอียดงานที่ต้องการ" required>
          <textarea className="form-input min-h-[100px] resize-y" placeholder="อธิบายงานที่ต้องการให้ชัดเจน เช่น ติดตั้งป้ายขนาดเท่าไร, รื้อถอนอะไร, ซ่อมส่วนไหน..." value={data.installOnlyDetails} onChange={e => update('installOnlyDetails', e.target.value)} />
        </FieldGroup>

        <FieldGroup label="ขนาด/ปริมาณงานโดยประมาณ">
          <input type="text" className="form-input" placeholder="เช่น ป้าย 2x3 เมตร 2 ชิ้น, รั้วยาว 10 เมตร..." value={data.installOnlySize} onChange={e => update('installOnlySize', e.target.value)} />
        </FieldGroup>
      </FormCard>

      <FormCard heading="สภาพหน้างาน">
        <FieldGroup label="ความสูงจากพื้น">
          <div className="grid grid-cols-2 gap-2">
            {[
              { v: 'low', t: 'ต่ำ (ไม่เกิน 3 เมตร)' },
              { v: 'medium', t: 'กลาง (3-6 เมตร)' },
              { v: 'high', t: 'สูง (6-10 เมตร)' },
              { v: 'very-high', t: 'สูงมาก (10+ เมตร)' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.installOnlyHeight === o.v} onClick={() => update('installOnlyHeight', o.v)} title={o.t} />
            ))}
          </div>
        </FieldGroup>

        <FieldGroup label="วิธีเข้าถึงจุดติดตั้ง">
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'stand', t: 'ยืนติดได้เลย' },
              { v: 'ladder', t: 'ใช้บันได' },
              { v: 'scaffold', t: 'ตั้งนั่งร้าน' },
              { v: 'crane', t: 'รถกระเช้า/เครน' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.installOnlyAccess === o.v} onClick={() => update('installOnlyAccess', o.v)} title={o.t} />
            ))}
          </div>
        </FieldGroup>

        <FieldGroup label="ผนัง/พื้นผิวที่จะติดตั้ง">
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'concrete', t: 'คอนกรีต' },
              { v: 'brick', t: 'อิฐ' },
              { v: 'metalsheet', t: 'เมทัลชีท' },
              { v: 'steelframe', t: 'โครงเหล็ก' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.installOnlyWall === o.v} onClick={() => update('installOnlyWall', o.v)} title={o.t} />
            ))}
          </div>
        </FieldGroup>
      </FormCard>

      <FormCard heading="ระบบไฟ">
        <FieldGroup label="มีไฟรอไว้หรือไม่">
          <div className="grid grid-cols-2 gap-2">
            {[
              { v: 'yes', t: 'มี' },
              { v: 'no', t: 'ไม่มี' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.installOnlyHasPower === o.v} onClick={() => update('installOnlyHasPower', o.v)} title={o.t} />
            ))}
          </div>
        </FieldGroup>

        <FieldGroup label="ระยะจากจุดไฟถึงป้าย (เมตร)">
          <input type="number" className="form-input" placeholder="0" value={data.installOnlyPowerDistance} onChange={e => update('installOnlyPowerDistance', e.target.value)} />
        </FieldGroup>
      </FormCard>

      <FormCard heading="วันที่และเวลา">
        <FieldGroup label="ต้องการให้ไปหน้างานวันไหน">
          <input type="date" className="form-input" value={data.installOnlyDate} onChange={e => update('installOnlyDate', e.target.value)} />
        </FieldGroup>

        <FieldGroup label="ช่วงเวลาที่สะดวก">
          <div className="grid grid-cols-2 gap-2">
            {[
              { v: 'morning', t: 'ช่วงเช้า (8:00-12:00)' },
              { v: 'afternoon', t: 'ช่วงบ่าย (13:00-17:00)' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.installOnlyTime === o.v} onClick={() => update('installOnlyTime', o.v)} title={o.t} />
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
          <textarea className="form-input min-h-[80px] resize-y" placeholder="รายละเอียดเพิ่มเติม..." value={data.installOnlyNote || ''} onChange={e => update('installOnlyNote', e.target.value)} />
        </FieldGroup>
      </FormCard>
    </div>
  );
};

export default Section3InstallOnly;

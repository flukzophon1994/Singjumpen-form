import FormCard from './FormCard';
import { FieldGroup, OptionCard } from './FormFields';
import { SignFormData } from './useSignForm';

interface Props {
  data: SignFormData;
  update: (field: keyof SignFormData, value: string) => void;
  updateFile: (field: 'designFileUpload', value: File | null) => void;
}

const Section3Lit = ({ data, update, updateFile }: Props) => {
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
          ระบุรายละเอียดงาน (2/3) • งานอักษรไฟ
        </div>
        <div className="font-heading text-[28px] font-bold text-foreground mb-1.5 leading-tight">รายละเอียดอักษรไฟ</div>
        <div className="text-sm text-muted-foreground">กรอกข้อมูลเฉพาะงานอักษรมีไฟ LED</div>
      </div>

      <FormCard heading="ประเภทอักษรไฟ">
        <FieldGroup label="ประเภท" required>
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'aluminum-rim', t: 'อักษรไฟสว่างหน้า ขอบอะลูมิเนียม' },
              { v: 'zinc-rim', t: 'อักษรไฟสว่างหน้า ขอบซิงค์พ่นสี' },
              { v: 'ss-silver-gloss', t: 'อักษรไฟสว่างหน้า ขอบสแตนเลสเงินเงา' },
              { v: 'ss-silver-hairline', t: 'อักษรไฟสว่างหน้า ขอบสแตนเลสเงินแฮร์ไลน์' },
              { v: 'ss-gold-gloss', t: 'อักษรไฟสว่างหน้า ขอบสแตนเลสทองเงา' },
              { v: 'ss-gold-hairline', t: 'อักษรไฟสว่างหน้า ขอบสแตนเลสทองแฮร์ไลน์' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.litType === o.v} onClick={() => update('litType', o.v)} title={o.t} />
            ))}
          </div>
        </FieldGroup>
      </FormCard>

      <FormCard heading="ข้อความและขนาด">
        <FieldGroup label="ข้อความ / โลโก้" required>
          <input type="text" className="form-input" placeholder="ข้อความที่ต้องการทำ" value={data.litText} onChange={e => update('litText', e.target.value)} />
        </FieldGroup>

        <FieldGroup label="โลโก้ (ถ้ามี)">
          <input type="text" className="form-input" placeholder="รายละเอียดโลโก้" value={data.litLogo} onChange={e => update('litLogo', e.target.value)} />
        </FieldGroup>

        <FieldGroup label="จำนวนชุด" required>
          <input type="number" className="form-input" placeholder="1" value={data.litQuantity} onChange={e => update('litQuantity', e.target.value)} />
        </FieldGroup>

        <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
          <FieldGroup label="ความสูงตัวอักษร (cm)" required>
            <input type="number" className="form-input" placeholder="0" value={data.litLetterHeight} onChange={e => update('litLetterHeight', e.target.value)} />
          </FieldGroup>
          <FieldGroup label="ความหนาขอบ (cm)">
            <input type="number" className="form-input" placeholder="0" value={data.litRimThickness} onChange={e => update('litRimThickness', e.target.value)} />
          </FieldGroup>
          <FieldGroup label="ความยาวรวมทั้งชุด (cm)">
            <input type="number" className="form-input" placeholder="0" value={data.litTotalLength} onChange={e => update('litTotalLength', e.target.value)} />
          </FieldGroup>
        </div>
      </FormCard>

      <FormCard heading="สีและระบบไฟ">
        <FieldGroup label="สีหน้าอะคริลิค">
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'milky-white', t: 'ขาวนม' },
              { v: 'white', t: 'ขาว' },
              { v: 'black', t: 'ดำ' },
              { v: 'red', t: 'สีแดง' },
              { v: 'blue', t: 'สีน้ำเงิน' },
              { v: 'green', t: 'สีเขียว' },
              { v: 'yellow', t: 'สีเหลือง' },
              { v: 'other', t: 'อื่น ๆ' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.litAcrylicColor === o.v} onClick={() => update('litAcrylicColor', o.v)} title={o.t} />
            ))}
          </div>
          {data.litAcrylicColor === 'other' && (
            <input type="text" className="form-input mt-2.5" placeholder="ระบุสี" value={data.litAcrylicColorOther} onChange={e => update('litAcrylicColorOther', e.target.value)} />
          )}
        </FieldGroup>

        <FieldGroup label="สีไฟ" required>
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'warm-white', t: 'Warm White' },
              { v: 'daylight', t: 'Daylight' },
              { v: 'cool-white', t: 'Cool White' },
              { v: 'red', t: 'แดง' },
              { v: 'blue', t: 'น้ำเงิน' },
              { v: 'green', t: 'เขียว' },
              { v: 'yellow', t: 'เหลือง' },
              { v: 'rgb', t: 'RGB เปลี่ยนสี' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.litLightColor === o.v} onClick={() => update('litLightColor', o.v)} title={o.t} />
            ))}
          </div>
        </FieldGroup>

        <FieldGroup label="ระบบไฟ">
          <div className="space-y-2">
            {[
              { v: 'led-module', t: 'LED Module' },
              { v: 'led-strip', t: 'LED Strip' },
              { v: 'adapter', t: 'Adapter' },
              { v: 'transformer', t: 'หม้อแปลง' },
              { v: 'timer', t: 'Timer' },
              { v: 'remote', t: 'รีโมท' },
              { v: 'app', t: 'แอปควบคุม' },
            ].map(o => (
              <label key={o.v} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border text-primary"
                  checked={data.litSystem?.includes(o.v) || false}
                  onChange={(e) => {
                    const current = data.litSystem || '';
                    const values = current ? current.split(',') : [];
                    if (e.target.checked) {
                      update('litSystem', [...values, o.v].join(','));
                    } else {
                      update('litSystem', values.filter(v => v !== o.v).join(','));
                    }
                  }}
                />
                <span className="text-sm">{o.t}</span>
              </label>
            ))}
          </div>
        </FieldGroup>
      </FormCard>

      <FormCard heading="การใช้งานและติดตั้ง">
        <FieldGroup label="การใช้งาน">
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'indoor', t: 'ภายใน' },
              { v: 'outdoor-covered', t: 'ภายนอก มีหลังคา' },
              { v: 'outdoor-exposed', t: 'ภายนอก โดนแดด/ฝน' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.litUsage === o.v} onClick={() => update('litUsage', o.v)} title={o.t} />
            ))}
          </div>
        </FieldGroup>

        <FieldGroup label="วิธีติดตั้ง">
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'wall', t: 'ติดผนัง' },
              { v: 'frame', t: 'ติดโครง' },
              { v: 'composite', t: 'ติดคอมโพสิต' },
              { v: 'storefront', t: 'ติดหน้าร้าน' },
              { v: 'mall', t: 'ติดในห้าง' },
              { v: 'no-install', t: 'ไม่ติดตั้ง' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.litInstall === o.v} onClick={() => update('litInstall', o.v)} title={o.t} />
            ))}
          </div>
        </FieldGroup>
      </FormCard>

      <FormCard heading="ระบบไฟหน้างาน">
        <FieldGroup label="มีไฟรอไว้หรือไม่">
          <div className="grid grid-cols-2 gap-2">
            {[
              { v: 'yes', t: 'มี' },
              { v: 'no', t: 'ไม่มี' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.litHasPower === o.v} onClick={() => update('litHasPower', o.v)} title={o.t} />
            ))}
          </div>
        </FieldGroup>

        <FieldGroup label="ระยะจากจุดไฟถึงป้าย (เมตร)">
          <input type="number" className="form-input" placeholder="0" value={data.litPowerDistance} onChange={e => update('litPowerDistance', e.target.value)} />
        </FieldGroup>

        <FieldGroup label="ต้องการให้เดินสายไฟ / เก็บสาย">
          <div className="grid grid-cols-2 gap-2">
            {[
              { v: 'yes', t: 'ต้องการ' },
              { v: 'no', t: 'ไม่ต้องการ' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.litWiring === o.v} onClick={() => update('litWiring', o.v)} title={o.t} />
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
          <textarea className="form-input min-h-[80px] resize-y" placeholder="รายละเอียดเพิ่มเติม..." value={data.litNote || ''} onChange={e => update('litNote', e.target.value)} />
        </FieldGroup>
      </FormCard>
    </div>
  );
};

export default Section3Lit;

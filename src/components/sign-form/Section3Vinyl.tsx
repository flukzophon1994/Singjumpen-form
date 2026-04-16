import FormCard from './FormCard';
import { FieldGroup, OptionCard } from './FormFields';
import { SignFormData } from './useSignForm';

interface Props {
  data: SignFormData;
  update: (field: keyof SignFormData, value: string) => void;
  updateFile?: (field: 'designFileUpload', file: File | null) => void;
}

const Section3Vinyl = ({ data, update, updateFile }: Props) => {
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
          ระบุรายละเอียดงาน (2/3) • งานป้ายไวนิล
        </div>
        <div className="font-heading text-[28px] font-bold text-foreground mb-1.5 leading-tight">รายละเอียดป้ายไวนิล</div>
        <div className="text-sm text-muted-foreground">กรอกข้อมูลเฉพาะงานป้ายไวนิลและสติ๊กเกอร์</div>
      </div>

      <FormCard heading="ประเภทงาน">
        <FieldGroup label="ประเภท" required>
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'banner', t: 'ป้ายไวนิลธรรมดา' },
              { v: 'backlit-banner', t: 'ป้ายไวนิล Backlit' },
              { v: 'sticker', t: 'สติ๊กเกอร์ติดกระจก' },
              { v: 'floor-sticker', t: 'สติ๊กเกอร์ติดพื้น' },
              { v: 'vehicle-wrap', t: 'สติ๊กเกอร์ติดรถ' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.vinylType === o.v} onClick={() => update('vinylType', o.v)} title={o.t} />
            ))}
          </div>
        </FieldGroup>
      </FormCard>

      <FormCard heading="ขนาดและจำนวน">
        <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
          <FieldGroup label="กว้าง (cm)" required>
            <input type="text" className="form-input" placeholder="เช่น 300" value={data.vinylWidth} onChange={e => update('vinylWidth', e.target.value)} />
          </FieldGroup>
          <FieldGroup label="สูง (cm)" required>
            <input type="text" className="form-input" placeholder="เช่น 200" value={data.vinylHeight} onChange={e => update('vinylHeight', e.target.value)} />
          </FieldGroup>
          <FieldGroup label="จำนวน (ชิ้น)" required>
            <input type="number" className="form-input" placeholder="1" value={data.vinylQuantity} onChange={e => update('vinylQuantity', e.target.value)} />
          </FieldGroup>
        </div>
      </FormCard>

      <FormCard heading="วัสดุและการพิมพ์">
        <FieldGroup label="ประเภทวัสดุ">
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'vinyl-440g', t: 'ไวนิล 440g' },
              { v: 'vinyl-340g', t: 'ไวนิล 340g' },
              { v: 'vinyl-280g', t: 'ไวนิล 280g' },
              { v: 'backlit', t: 'Backlit' },
              { v: 'sticker-matte', t: 'สติ๊กเกอร์ด้าน' },
              { v: 'sticker-gloss', t: 'สติ๊กเกอร์เงา' },
              { v: 'sticker-clear', t: 'สติ๊กเกอร์ใส' },
              { v: 'other', t: 'อื่น ๆ' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.vinylMaterialType === o.v} onClick={() => update('vinylMaterialType', o.v)} title={o.t} />
            ))}
          </div>
          {data.vinylMaterialType === 'other' && (
            <input type="text" className="form-input mt-2.5" placeholder="ระบุวัสดุ" value={data.vinylMaterialSpec} onChange={e => update('vinylMaterialSpec', e.target.value)} />
          )}
        </FieldGroup>

        <FieldGroup label="คุณภาพการพิมพ์">
          <div className="grid grid-cols-3 gap-2 max-sm:grid-cols-1">
            {[
              { v: 'standard', t: 'มาตรฐาน' },
              { v: 'high', t: 'สูง (High Res)' },
              { v: 'photo', t: 'ระดับภาพถ่าย' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.vinylPrintQuality === o.v} onClick={() => update('vinylPrintQuality', o.v)} title={o.t} />
            ))}
          </div>
        </FieldGroup>
      </FormCard>

      <FormCard heading="การเสริมงาน">
        <FieldGroup label="เลือกได้หลายข้อ">
          <div className="space-y-2">
            {[
              { v: 'hem', t: 'พับขอบ' },
              { v: 'eyelets', t: 'ตอกตาไก่' },
              { v: 'holes', t: 'เจาะรู' },
              { v: 'sew', t: 'เย็บขอบ' },
              { v: 'aluminum-frame', t: 'เข้าคิ้วอลูมิเนียม' },
              { v: 'other', t: 'อื่น ๆ' },
            ].map(o => (
              <label key={o.v} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border text-primary"
                  checked={data.vinylFinish?.includes(o.v) || false}
                  onChange={(e) => {
                    const current = data.vinylFinish || '';
                    const values = current ? current.split(',') : [];
                    if (e.target.checked) {
                      update('vinylFinish', [...values, o.v].join(','));
                    } else {
                      update('vinylFinish', values.filter(v => v !== o.v).join(','));
                    }
                  }}
                />
                <span className="text-sm">{o.t}</span>
              </label>
            ))}
          </div>
        </FieldGroup>
      </FormCard>

      <FormCard heading="การติดตั้ง">
        <FieldGroup label="การติดตั้ง">
          <div className="grid grid-cols-2 gap-2">
            {[
              { v: 'install', t: 'ติดตั้ง' },
              { v: 'no-install', t: 'ไม่ติดตั้ง' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.vinylInstallType === o.v} onClick={() => update('vinylInstallType', o.v)} title={o.t} />
            ))}
          </div>
        </FieldGroup>

        <FieldGroup label="พื้นผิวที่ติดตั้ง">
          <div className="grid grid-cols-2 gap-2">
            {[
              { v: 'wall', t: 'ผนัง' },
              { v: 'glass', t: 'กระจก' },
              { v: 'floor', t: 'พื้น' },
              { v: 'vehicle', t: 'รถยนต์' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.vinylSurface === o.v} onClick={() => update('vinylSurface', o.v)} title={o.t} />
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
          <textarea className="form-input min-h-[80px] resize-y" placeholder="รายละเอียดเพิ่มเติม..." value={data.vinylNote || ''} onChange={e => update('vinylNote', e.target.value)} />
        </FieldGroup>
      </FormCard>
    </div>
  );
};

export default Section3Vinyl;

import FormCard from './FormCard';
import { FieldGroup, OptionCard } from './FormFields';
import { SignFormData } from './useSignForm';

interface Props {
  data: SignFormData;
  update: (field: keyof SignFormData, value: string) => void;
  updateFile: (field: 'designFileUpload', value: File | null) => void;
}

const Section3Lightbox = ({ data, update, updateFile }: Props) => {
  const isRound = data.lightboxType === 'round';

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
          ระบุรายละเอียดงาน (2/3) • งานกล่องไฟ
        </div>
        <div className="font-heading text-[28px] font-bold text-foreground mb-1.5 leading-tight">รายละเอียดกล่องไฟ</div>
        <div className="text-sm text-muted-foreground">กรอกข้อมูลเฉพาะงานกล่องไฟ</div>
      </div>

      <FormCard heading="ประเภทกล่องไฟ">
        <FieldGroup label="ประเภท" required>
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'round', t: 'กล่องไฟวงกลม' },
              { v: 'square', t: 'กล่องไฟสี่เหลี่ยม' },
              { v: 'diecut', t: 'กล่องไฟไดคัท' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.lightboxType === o.v} onClick={() => update('lightboxType', o.v)} title={o.t} />
            ))}
          </div>
        </FieldGroup>

        <FieldGroup label="รูปแบบ">
          <div className="grid grid-cols-2 gap-2">
            {[
              { v: '1-side', t: '1 หน้า' },
              { v: '2-side', t: '2 หน้า' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.lightboxSides === o.v} onClick={() => update('lightboxSides', o.v)} title={o.t} />
            ))}
          </div>
        </FieldGroup>
      </FormCard>

      <FormCard heading="ขนาด">
        {isRound ? (
          <FieldGroup label="ขนาดวงกลม (cm)" required>
            <div className="grid grid-cols-4 gap-2 max-sm:grid-cols-2">
              {['40', '50', '60', '70', '80', '90', '100', '120'].map(o => (
                <OptionCard key={o} selected={data.lightboxRoundSize === o} onClick={() => update('lightboxRoundSize', o)} title={`${o} cm`} />
              ))}
            </div>
            <input type="text" className="form-input mt-2.5" placeholder="อื่น ๆ (ระบุ)" value={data.lightboxRoundSizeOther} onChange={e => update('lightboxRoundSizeOther', e.target.value)} />
          </FieldGroup>
        ) : (
          <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
            <FieldGroup label="กว้าง (cm)" required>
              <input type="number" className="form-input" placeholder="0" value={data.lightboxWidth} onChange={e => update('lightboxWidth', e.target.value)} />
            </FieldGroup>
            <FieldGroup label="สูง (cm)" required>
              <input type="number" className="form-input" placeholder="0" value={data.lightboxHeight} onChange={e => update('lightboxHeight', e.target.value)} />
            </FieldGroup>
            <FieldGroup label="หนา (cm)">
              <input type="number" className="form-input" placeholder="0" value={data.lightboxDepth} onChange={e => update('lightboxDepth', e.target.value)} />
            </FieldGroup>
          </div>
        )}
      </FormCard>

      <FormCard heading="โครงสร้างและวัสดุ">
        <FieldGroup label="โครงสร้าง">
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'steel', t: 'เหล็ก' },
              { v: 'stainless', t: 'สแตนเลส' },
              { v: 'aluminum', t: 'อลูมิเนียม' },
              { v: 'zinc', t: 'ซิงค์' },
              { v: 'other', t: 'อื่น ๆ' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.lightboxFrame === o.v} onClick={() => update('lightboxFrame', o.v)} title={o.t} />
            ))}
          </div>
          {data.lightboxFrame === 'other' && (
            <input type="text" className="form-input mt-2.5" placeholder="ระบุโครงสร้าง" value={data.lightboxFrameOther} onChange={e => update('lightboxFrameOther', e.target.value)} />
          )}
        </FieldGroup>

        <FieldGroup label="หน้ากล่องไฟ">
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'acrylic', t: 'อะคริลิค' },
              { v: 'flex', t: 'Flex' },
              { v: 'translucent-sticker', t: 'สติ๊กเกอร์โปร่งแสง' },
              { v: 'uv-print', t: 'พิมพ์ UV' },
              { v: 'perforated', t: 'เจาะทะลุ' },
              { v: 'diecut-logo', t: 'ไดคัทโลโก้' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.lightboxFace === o.v} onClick={() => update('lightboxFace', o.v)} title={o.t} />
            ))}
          </div>
        </FieldGroup>
      </FormCard>

      <FormCard heading="ระบบไฟ">
        <FieldGroup label="ระบบไฟ">
          <div className="space-y-2">
            {[
              { v: 'led-module', t: 'LED Module' },
              { v: 'led-strip', t: 'LED Strip' },
              { v: 'warm-white', t: 'Warm White' },
              { v: 'daylight', t: 'Daylight' },
              { v: 'rgb', t: 'RGB' },
            ].map(o => (
              <label key={o.v} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border text-primary"
                  checked={data.lightboxLightSystem?.includes(o.v) || false}
                  onChange={(e) => {
                    const current = data.lightboxLightSystem || '';
                    const values = current ? current.split(',') : [];
                    if (e.target.checked) {
                      update('lightboxLightSystem', [...values, o.v].join(','));
                    } else {
                      update('lightboxLightSystem', values.filter(v => v !== o.v).join(','));
                    }
                  }}
                />
                <span className="text-sm">{o.t}</span>
              </label>
            ))}
          </div>
        </FieldGroup>
      </FormCard>

      <FormCard heading="ตำแหน่งติดตั้ง">
        <FieldGroup label="ตำแหน่ง">
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'storefront', t: 'ติดหน้าร้าน' },
              { v: 'projecting', t: 'ติดยื่นออกจากผนัง' },
              { v: 'hanging', t: 'แขวน' },
              { v: 'floor', t: 'ตั้งพื้น' },
              { v: 'pole', t: 'ติดเสา' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.lightboxPosition === o.v} onClick={() => update('lightboxPosition', o.v)} title={o.t} />
            ))}
          </div>
        </FieldGroup>

        <FieldGroup label="ต้องการโครงยึด">
          <div className="grid grid-cols-2 gap-2">
            {[
              { v: 'yes', t: 'ต้องการ' },
              { v: 'no', t: 'ไม่ต้องการ' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.lightboxBracket === o.v} onClick={() => update('lightboxBracket', o.v)} title={o.t} />
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
          <textarea className="form-input min-h-[80px] resize-y" placeholder="รายละเอียดเพิ่มเติม..." value={data.lightboxNote || ''} onChange={e => update('lightboxNote', e.target.value)} />
        </FieldGroup>
      </FormCard>
    </div>
  );
};

export default Section3Lightbox;

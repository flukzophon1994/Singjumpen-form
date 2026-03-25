import FormCard from './FormCard';
import { FieldGroup, OptionCard, ToggleGroup } from './FormFields';
import { SignFormData } from './useSignForm';

interface Props {
  data: SignFormData;
  update: (field: keyof SignFormData, value: string) => void;
  updateFile?: (field: 'sitePhotoUpload', file: File | null) => void;
}

const Section3Install = ({ data, update, updateFile }: Props) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (updateFile) {
      updateFile('sitePhotoUpload', file);
    }
  };

  const removeFile = () => {
    if (updateFile) {
      updateFile('sitePhotoUpload', null);
    }
  };

  return (
    <div className="animate-slide-in">
      <div className="mb-8">
        <div className="inline-block font-heading text-[10px] font-semibold tracking-[3px] uppercase text-primary bg-primary/10 px-3 py-1 rounded mb-3">
          ขั้นตอนที่ 03 / 04
        </div>
        <div className="font-heading text-[28px] font-bold text-foreground mb-1.5 leading-tight">การติดตั้ง</div>
        <div className="text-sm text-muted-foreground">รายละเอียดหน้างานช่วยให้ประเมินราคาได้ถูกต้องและรวดเร็ว</div>
      </div>

      <FormCard heading="ข้อมูลหน้างาน">
        <FieldGroup label="ความสูงจากพื้นดิน / พื้นอาคาร" required hint="วัดจากพื้นถึงจุดกึ่งกลางที่จะติดป้าย">
          <input type="text" className="form-input" placeholder="เช่น 3.5 เมตร" value={data.installHeight} onChange={e => update('installHeight', e.target.value)} />
        </FieldGroup>

        <FieldGroup label="วิธีเข้าถึงจุดติดตั้ง" required>
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

        <FieldGroup label="ผนัง / พื้นผิวที่จะติดตั้ง" required>
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
      </FormCard>

      <FormCard heading="ลักษณะการติดตั้ง">
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

        <FieldGroup label="ป้ายเก่าที่ต้องรื้อถอน">
          <ToggleGroup options={[{ label: 'มี ต้องรื้อก่อน', value: 'yes' }, { label: 'ไม่มี', value: 'no' }]} value={data.oldSign} onChange={v => update('oldSign', v)} />
        </FieldGroup>

        <FieldGroup label="รูปถ่ายหน้างาน" required hint="ช่วยให้ประเมินราคาได้แม่นยำขึ้น">
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            <OptionCard selected={data.sitePhoto === 'yes'} onClick={() => update('sitePhoto', 'yes')} title="มีรูปแล้ว" desc="แนบรูปภาพ" />
            <OptionCard selected={data.sitePhoto === 'visit'} onClick={() => update('sitePhoto', 'visit')} title="ให้ร้านไปดูหน้างาน" desc="ส่งโลเคชั่นมาให้" />
          </div>

          {data.sitePhoto === 'yes' && (
            <div className="cond-block">
              <div className="font-heading text-[13px] font-medium mb-2">แนบรูปถ่ายหน้างาน</div>
              
              {!data.sitePhotoUpload ? (
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:bg-muted/50 transition-colors">
                  <input
                    type="file"
                    id="sitePhotoInput"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="sitePhotoInput"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <span className="text-3xl">📷</span>
                    <span className="text-sm text-muted-foreground">คลิกเพื่อเลือกรูปภาพ</span>
                    <span className="text-xs text-muted-foreground/60">รองรับ .jpg .jpeg .png .heic</span>
                    <button
                      type="button"
                      className="mt-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors"
                      onClick={() => document.getElementById('sitePhotoInput')?.click()}
                    >
                      Choose File
                    </button>
                  </label>
                </div>
              ) : (
                <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-3">
                  <span className="text-2xl">🖼️</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">
                      {data.sitePhotoUpload.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {(data.sitePhotoUpload.size / 1024).toFixed(1)} KB
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    title="ลบไฟล์"
                  >
                    ✕
                  </button>
                </div>
              )}
              
              <div className="text-xs text-muted-foreground mt-2">
                หรือส่งรูปมาที่ <span className="font-medium text-primary">shopitart@gmail.com</span> หรือ Line <span className="font-medium text-primary">@singjumpen</span>
              </div>
            </div>
          )}
        </FieldGroup>
      </FormCard>
    </div>
  );
};

export default Section3Install;

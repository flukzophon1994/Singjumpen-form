import FormCard from './FormCard';
import { FieldGroup, OptionCard, ToggleGroup } from './FormFields';
import { SignFormData } from './useSignForm';

interface Props {
  data: SignFormData;
  update: (field: keyof SignFormData, value: string) => void;
}

const Section3Install = ({ data, update }: Props) => (
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

      <FieldGroup label="รูปถ่ายหน้างาน" required hint={<>ส่งรูปหน้างานที่ <strong>shopitart@gmail.com</strong> หรือ Line <strong>@singjumpen</strong></>}>
        <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
          <OptionCard selected={data.sitePhoto === 'yes'} onClick={() => update('sitePhoto', 'yes')} title="มีรูป จะส่งให้" desc="ส่งทาง Email / Line" />
          <OptionCard selected={data.sitePhoto === 'visit'} onClick={() => update('sitePhoto', 'visit')} title="ให้ร้านไปดูหน้างาน" desc="ส่งโลเคชั่นมาให้" />
        </div>
      </FieldGroup>
    </FormCard>
  </div>
);

export default Section3Install;

import FormCard from './FormCard';
import { FieldGroup, OptionCard, ToggleGroup } from './FormFields';
import { SignFormData } from './useSignForm';

interface Props {
  data: SignFormData;
  update: (field: keyof SignFormData, value: string) => void;
}

const Section2Details = ({ data, update }: Props) => (
  <div className="animate-slide-in">
    <div className="mb-8">
      <div className="inline-block font-heading text-[10px] font-semibold tracking-[3px] uppercase text-primary bg-primary/10 px-3 py-1 rounded mb-3">
        ขั้นตอนที่ 02 / 04
      </div>
      <div className="font-heading text-[28px] font-bold text-foreground mb-1.5 leading-tight">รายละเอียดป้าย</div>
      <div className="text-sm text-muted-foreground">บอกรายละเอียดที่ต้องการให้ครบ เพื่อออกแบบและเสนอราคาได้แม่นยำ</div>
    </div>

    <FormCard heading="ไฟล์และข้อความ">
      <FieldGroup label="ไฟล์ออกแบบ" required>
        <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
          <OptionCard selected={data.designFile === 'have'} onClick={() => update('designFile', 'have')} title="มีไฟล์แล้ว" desc=".ai, .eps, .cdr, .dxf" />
          <OptionCard selected={data.designFile === 'no'} onClick={() => update('designFile', 'no')} title="ให้ร้านออกแบบ" desc="ออกแบบใหม่ทั้งหมด" />
        </div>

        {data.designFile === 'have' && (
          <div className="cond-block">
            <div className="font-heading text-[13px] font-medium mb-1.5">ส่งไฟล์มาที่อีเมลหลังกรอกฟอร์มเสร็จ</div>
            <div className="font-heading text-base font-semibold text-primary">shopitart@gmail.com</div>
            <div className="text-xs text-muted-foreground mt-1.5">รองรับ .ai .eps .cdr .dxf — กรุณาระบุชื่อร้านในเมล</div>
          </div>
        )}

        {data.designFile === 'no' && (
          <div className="cond-block">
            <div className="font-heading text-[13px] font-medium mb-2">แนวทางที่ต้องการ (ถ้ามี)</div>
            <textarea className="form-input min-h-[80px] resize-y" placeholder="เช่น โลโก้ทันสมัย สีทอง ตัวอักษรหนา ดูหรู ฯลฯ" value={data.designNote} onChange={e => update('designNote', e.target.value)} />
          </div>
        )}
      </FieldGroup>

      <FieldGroup label="ข้อความ / โลโก้ที่ต้องการบนป้าย" required>
        <textarea className="form-input min-h-[90px] resize-y" placeholder="ชื่อร้าน สโลแกน รายละเอียดที่ต้องการให้แสดง..." value={data.signText} onChange={e => update('signText', e.target.value)} />
      </FieldGroup>

      <FieldGroup label="โลโก้">
        <ToggleGroup options={[{ label: 'มีโลโก้ ใส่ด้วย', value: 'yes' }, { label: 'ไม่ต้องใส่โลโก้', value: 'no' }]} value={data.logo} onChange={v => update('logo', v)} />
      </FieldGroup>
    </FormCard>

    <FormCard heading="ขนาดและแบบป้าย">
      <FieldGroup label="ขนาดพื้นที่ป้าย (cm)" required hint="วัดพื้นที่สูงสุดของจุดที่จะติดตั้ง หน่วยเซนติเมตร">
        <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
          <input type="text" className="form-input" placeholder="กว้าง เช่น 300" value={data.signWidth} onChange={e => update('signWidth', e.target.value)} />
          <input type="text" className="form-input" placeholder="สูง เช่น 80" value={data.signHeight} onChange={e => update('signHeight', e.target.value)} />
        </div>
      </FieldGroup>

      <FieldGroup label="ความสูงตัวอักษรโดยประมาณ" required>
        <select className="form-input cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23aaa%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center] pr-10" value={data.letterHeight} onChange={e => update('letterHeight', e.target.value)}>
          <option value="">-- เลือกความสูงตัวอักษร --</option>
          {['10 cm','15 cm','20 cm','25 cm','30 cm','35 cm','40 cm','45 cm','50 cm','55 cm','60 cm','65 cm','70 cm','ระบุเอง','ให้ร้านแนะนำ'].map(o => <option key={o}>{o}</option>)}
        </select>
        {data.letterHeight === 'ระบุเอง' && (
          <input type="text" className="form-input mt-2.5" placeholder="ระบุความสูงตัวอักษร (cm)" value={data.letterHeightCustom} onChange={e => update('letterHeightCustom', e.target.value)} />
        )}
      </FieldGroup>

      <FieldGroup label="สีไฟที่ต้องการ" required>
        <div className="grid grid-cols-3 gap-2.5 max-sm:grid-cols-2">
          <OptionCard selected={data.lightColor === 'coolwhite'} onClick={() => update('lightColor', 'coolwhite')} title="ขาว" desc="Cool White" />
          <OptionCard selected={data.lightColor === 'warmwhite'} onClick={() => update('lightColor', 'warmwhite')} title="วอร์มไวท์" desc="ส้มเหลืองนวล" />
          <OptionCard selected={data.lightColor === 'rgb'} onClick={() => update('lightColor', 'rgb')} title="RGB" desc="เปลี่ยนสีได้" />
        </div>
        <input type="text" className="form-input mt-2.5" placeholder="ระบุสีที่ต้องการ (กรณีอื่น)" value={data.lightColorCustom} onChange={e => update('lightColorCustom', e.target.value)} />
      </FieldGroup>

      <FieldGroup label="วัสดุขอบตัวอักษร (ด้านข้าง)">
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { v: 'zinc', t: 'ขอบซิงค์', d: 'ประหยัดสุด' },
            { v: 'alu', t: 'ขอบอะลูมิเนียม', d: 'เบา ทนทาน' },
            { v: 'ss-silver', t: 'สแตนเลสเงินเงา' },
            { v: 'ss-hairline', t: 'สแตนเลสเงิน Hairline' },
            { v: 'gold-hairline', t: 'สแตนเลสทอง Hairline' },
            { v: 'gold-mirror', t: 'สแตนเลสทอง Mirror' },
          ].map(o => (
            <OptionCard key={o.v} selected={data.borderMaterial === o.v} onClick={() => update('borderMaterial', o.v)} title={o.t} desc={o.d} />
          ))}
        </div>
      </FieldGroup>

      <FieldGroup label="Timer เปิด-ปิดอัตโนมัติ">
        <ToggleGroup options={[{ label: 'ต้องการ Timer', value: 'yes' }, { label: 'ไม่ต้องการ', value: 'no' }]} value={data.timer} onChange={v => update('timer', v)} />
      </FieldGroup>
    </FormCard>
  </div>
);

export default Section2Details;

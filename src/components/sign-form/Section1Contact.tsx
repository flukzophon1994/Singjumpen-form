import FormCard from './FormCard';
import { FieldGroup } from './FormFields';
import { SignFormData } from './useSignForm';

interface Props {
  data: SignFormData;
  update: (field: keyof SignFormData, value: string) => void;
}

const Section1Contact = ({ data, update }: Props) => (
  <div className="animate-slide-in">
    <div className="mb-8">
      <div className="inline-block font-heading text-[10px] font-semibold tracking-[3px] uppercase text-primary bg-primary/10 px-3 py-1 rounded mb-3">
        รับใบเสนอราคา (3/3)
      </div>
      <div className="font-heading text-[28px] font-bold text-foreground mb-1.5 leading-tight">รับประเมินราคาฟรี ไม่มีค่าใช้จ่าย!</div>
      <div className="text-sm text-muted-foreground">กรอกข้อมูลเพื่อให้ทีมงานประเมินราคาและส่งแบบให้คุณพิจารณา</div>
    </div>

    <FormCard heading="ผู้ติดต่อ">
      <FieldGroup label="อีเมล" required>
        <input type="email" className="form-input" placeholder="your@email.com" value={data.email} onChange={e => update('email', e.target.value)} />
      </FieldGroup>

      <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
        <FieldGroup label="ชื่อ-นามสกุล" required>
          <input type="text" className="form-input" placeholder="ชื่อผู้ติดต่อ" value={data.name} onChange={e => update('name', e.target.value)} />
        </FieldGroup>
        <FieldGroup label="เบอร์โทรศัพท์" required>
          <input type="tel" className="form-input" placeholder="0XX-XXX-XXXX" value={data.phone} onChange={e => update('phone', e.target.value)} />
        </FieldGroup>
      </div>

      <FieldGroup label="Line ID" hint={<>ติดต่อเพิ่มเติมผ่าน Official Line ร้าน: <strong>@singjumpen</strong></>}>
        <input type="text" className="form-input" placeholder="@LineID หรือ ชื่อ Line" value={data.lineId} onChange={e => update('lineId', e.target.value)} />
      </FieldGroup>
    </FormCard>

    <FormCard heading="ข้อมูลร้าน / ลูกค้า">
      <FieldGroup label="ชื่อร้าน / บริษัท" required>
        <input type="text" className="form-input" placeholder="ชื่อที่ต้องการแสดงบนป้าย" value={data.shopName} onChange={e => update('shopName', e.target.value)} />
      </FieldGroup>
      <FieldGroup label="สถานที่ติดตั้ง / ที่อยู่หน้างาน" hint="กทม. และปริมณฑล — ต่างจังหวัดมีค่าเดินทางเพิ่มเติม">
        <input type="text" className="form-input" placeholder="เขต / จังหวัด หรือแชร์โลเคชั่น" value={data.address} onChange={e => update('address', e.target.value)} />
      </FieldGroup>
    </FormCard>
  </div>
);

export default Section1Contact;

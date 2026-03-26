import FormCard from './FormCard';
import { FieldGroup, OptionCard } from './FormFields';
import { SignFormData } from './useSignForm';

interface Props {
  data: SignFormData;
  update: (field: keyof SignFormData, value: string) => void;
}

const Section4Delivery = ({ data, update }: Props) => {
  return (
    <div className="animate-slide-in">
      <div className="mb-8">
        <div className="inline-block font-heading text-[10px] font-semibold tracking-[3px] uppercase text-primary bg-primary/10 px-3 py-1 rounded mb-3">
          ขั้นตอนที่ 04 / 05 • การรับสินค้า
        </div>
        <div className="font-heading text-[28px] font-bold text-foreground mb-1.5 leading-tight">การรับสินค้า/จัดส่ง</div>
        <div className="text-sm text-muted-foreground">เลือกวิธีการรับสินค้าหรือจัดส่งที่ต้องการ</div>
      </div>

      {/* วิธีการรับสินค้า */}
      <FormCard heading="วิธีการรับสินค้า">
        <FieldGroup label="เลือกวิธีรับสินค้า" required>
          <div className="grid grid-cols-1 gap-3">
            {[
              { 
                v: 'pickup', 
                t: 'รับที่ร้าน', 
                d: 'ลูกค้ามารับสินค้าที่ร้านเอง' 
              },
              { 
                v: 'delivery', 
                t: 'จัดส่ง', 
                d: 'ร้านจัดส่งสินค้าให้ (คิดค่าส่งตามระยะทาง)' 
              },
              { 
                v: 'lalamove', 
                t: 'เรียก Lalamove', 
                d: 'ลูกค้าเรียก Lalamove มารับที่ร้าน' 
              },
            ].map(o => (
              <OptionCard 
                key={o.v} 
                selected={data.deliveryMethod === o.v} 
                onClick={() => update('deliveryMethod', o.v)} 
                title={o.t}
                desc={o.d}
              />
            ))}
          </div>
        </FieldGroup>
      </FormCard>

      {/* ที่อยู่จัดส่ง (แสดงเมื่อเลือกจัดส่ง) */}
      {data.deliveryMethod === 'delivery' && (
        <FormCard heading="ที่อยู่จัดส่ง">
          <FieldGroup label="ชื่อผู้รับ" required>
            <input 
              type="text" 
              className="form-input" 
              placeholder="ชื่อ-นามสกุล" 
              value={data.deliveryName || ''} 
              onChange={e => update('deliveryName', e.target.value)} 
            />
          </FieldGroup>

          <FieldGroup label="เบอร์โทรศัพท์" required>
            <input 
              type="text" 
              className="form-input" 
              placeholder="เบอร์โทรติดต่อ" 
              value={data.deliveryPhone || ''} 
              onChange={e => update('deliveryPhone', e.target.value)} 
            />
          </FieldGroup>

          <FieldGroup label="ที่อยู่จัดส่ง" required>
            <textarea 
              className="form-input min-h-[100px] resize-y" 
              placeholder="ระบุที่อยู่เต็มรูปแบบสำหรับจัดส่ง" 
              value={data.deliveryAddress || ''} 
              onChange={e => update('deliveryAddress', e.target.value)} 
            />
          </FieldGroup>

          <FieldGroup label="พิกัด Google Map (ถ้ามี)">
            <input 
              type="text" 
              className="form-input" 
              placeholder="แชร์ลิงก์ Google Maps หรือพิกัด GPS" 
              value={data.deliveryGps || ''} 
              onChange={e => update('deliveryGps', e.target.value)} 
            />
          </FieldGroup>

          <FieldGroup label="หมายเหตุการจัดส่ง">
            <textarea 
              className="form-input min-h-[80px] resize-y" 
              placeholder="เช่น ส่งช่วงเวลาไหน, ข้อควรระวังในการส่ง ฯลฯ" 
              value={data.deliveryNote || ''} 
              onChange={e => update('deliveryNote', e.target.value)} 
            />
          </FieldGroup>
        </FormCard>
      )}

      {/* Lalamove details (แสดงเมื่อเลือก Lalamove) */}
      {data.deliveryMethod === 'lalamove' && (
        <FormCard heading="รายละเอียด Lalamove">
          <FieldGroup label="สถานที่รับสินค้า">
            <div className="p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground">
              <p>📍 ร้าน Singjumpen</p>
              <p>ลูกค้าสามารถเรียก Lalamove มารับสินค้าที่ร้านได้</p>
            </div>
          </FieldGroup>

          <FieldGroup label="ชื่อผู้เรียก Lalamove">
            <input 
              type="text" 
              className="form-input" 
              placeholder="ชื่อผู้เรียก" 
              value={data.deliveryLalamoveName || ''} 
              onChange={e => update('deliveryLalamoveName', e.target.value)} 
            />
          </FieldGroup>

          <FieldGroup label="เบอร์โทรศัพท์">
            <input 
              type="text" 
              className="form-input" 
              placeholder="เบอร์โทรติดต่อ" 
              value={data.deliveryLalamovePhone || ''} 
              onChange={e => update('deliveryLalamovePhone', e.target.value)} 
            />
          </FieldGroup>

          <FieldGroup label="ที่อยู่ปลายทาง (ถ้าต้องการให้ Lalamove ส่งต่อ)">
            <textarea 
              className="form-input min-h-[80px] resize-y" 
              placeholder="ระบุที่อยู่ปลายทาง (ถ้าต้องการให้ Lalamove ส่งต่อ)" 
              value={data.deliveryLalamoveAddress || ''} 
              onChange={e => update('deliveryLalamoveAddress', e.target.value)} 
            />
          </FieldGroup>

          <FieldGroup label="หมายเหตุ">
            <textarea 
              className="form-input min-h-[80px] resize-y" 
              placeholder="เช่น ขนาดสินค้า, น้ำหนักโดยประมาณ ฯลฯ" 
              value={data.deliveryLalamoveNote || ''} 
              onChange={e => update('deliveryLalamoveNote', e.target.value)} 
            />
          </FieldGroup>
        </FormCard>
      )}

      {/* รับที่ร้าน (แสดงเมื่อเลือกรับที่ร้าน) */}
      {data.deliveryMethod === 'pickup' && (
        <FormCard heading="รับที่ร้าน">
          <div className="p-4 bg-muted/50 rounded-lg text-sm">
            <p className="font-medium mb-2">📍 ร้าน Singjumpen</p>
            <p className="text-muted-foreground mb-2">ลูกค้าสามารถมารับสินค้าที่ร้านได้ตามวันเวลาที่นัดหมาย</p>
            <p className="text-muted-foreground">กรุณาติดต่อร้านเพื่อนัดวันเวลารับสินค้า</p>
          </div>

          <div className="mt-4">
            <FieldGroup label="ชื่อผู้มารับ">
              <input
                type="text"
                className="form-input"
                placeholder="ชื่อผู้มารับสินค้า"
                value={data.deliveryPickupName || ''}
                onChange={e => update('deliveryPickupName', e.target.value)}
              />
            </FieldGroup>
          </div>

          <FieldGroup label="เบอร์โทรศัพท์">
            <input 
              type="text" 
              className="form-input" 
              placeholder="เบอร์โทรติดต่อ" 
              value={data.deliveryPickupPhone || ''} 
              onChange={e => update('deliveryPickupPhone', e.target.value)} 
            />
          </FieldGroup>

          <FieldGroup label="หมายเหตุ">
            <textarea 
              className="form-input min-h-[80px] resize-y" 
              placeholder="เช่น วันที่ต้องการมารับ, ช่วงเวลา ฯลฯ" 
              value={data.deliveryPickupNote || ''} 
              onChange={e => update('deliveryPickupNote', e.target.value)} 
            />
          </FieldGroup>
        </FormCard>
      )}
    </div>
  );
};

export default Section4Delivery;

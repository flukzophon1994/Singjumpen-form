import FormCard from './FormCard';
import { FieldGroup, BudgetCard, ToggleGroup } from './FormFields';
import { SignFormData, getLabel } from './useSignForm';

interface Props {
  data: SignFormData;
  update: (field: keyof SignFormData, value: string) => void;
}

const budgetOptions = [
  { v: '20000', label: '20K' },
  { v: '30000', label: '30K' },
  { v: '40000', label: '40K' },
  { v: '60000', label: '60K' },
  { v: '80000', label: '80K' },
  { v: '100000', label: '100K' },
  { v: '150000', label: '150K' },
  { v: 'other', label: 'ระบุเอง' },
];

const Section4Budget = ({ data, update }: Props) => {
  const size = data.signWidth && data.signHeight ? `${data.signWidth} × ${data.signHeight} cm` : '—';
  const budgetDisplay = data.budgetCustom || (data.budget && data.budget !== 'other' ? `${data.budget.replace('000', 'K')} บาท` : '—');

  const summaryRows = [
    ['ชื่อ-นามสกุล', data.name],
    ['อีเมล', data.email],
    ['เบอร์โทร', data.phone],
    ['ชื่อร้าน/บริษัท', data.shopName],
    ['สถานที่', data.address],
    ['ไฟล์ออกแบบ', getLabel('designFile', data.designFile)],
    ['ข้อความบนป้าย', data.signText],
    ['โลโก้', getLabel('logo', data.logo)],
    ['ขนาดป้าย', size],
    ['ความสูงตัวอักษร', data.letterHeight],
    ['สีไฟ', getLabel('lightColor', data.lightColor)],
    ['ขอบตัวอักษร', getLabel('borderMaterial', data.borderMaterial)],
    ['Timer', getLabel('timer', data.timer)],
    ['ความสูงจากพื้น', data.installHeight],
    ['วิธีเข้าถึง', getLabel('installMethod', data.installMethod)],
    ['ผนัง/พื้นผิว', getLabel('wallType', data.wallType)],
    ['ลักษณะติดตั้ง', getLabel('mountType', data.mountType)],
    ['ป้ายเก่า', getLabel('oldSign', data.oldSign)],
    ['รูปหน้างาน', getLabel('sitePhoto', data.sitePhoto)],
    ['งบประมาณ', budgetDisplay],
    ['ค่าติดตั้ง', getLabel('includeInstall', data.includeInstall)],
    ['วันที่ต้องการ', data.deadline],
    ['หมายเหตุ', data.note],
  ];

  return (
    <div className="animate-slide-in">
      <div className="mb-8">
        <div className="inline-block font-heading text-[10px] font-semibold tracking-[3px] uppercase text-primary bg-primary/10 px-3 py-1 rounded mb-3">
          ขั้นตอนที่ 04 / 04
        </div>
        <div className="font-heading text-[28px] font-bold text-foreground mb-1.5 leading-tight">งบประมาณ & กำหนดการ</div>
        <div className="text-sm text-muted-foreground">ช่วยให้ทีมงานเสนอแผนที่เหมาะสมที่สุดกับงบของคุณ</div>
      </div>

      <FormCard heading="งบประมาณ">
        <FieldGroup label="ช่วงงบประมาณโดยประมาณ" required>
          <div className="grid grid-cols-4 gap-2 max-[380px]:grid-cols-3">
            {budgetOptions.map(o => (
              <BudgetCard key={o.v} amount={o.label} selected={data.budget === o.v} onClick={() => update('budget', o.v)} small={o.v === 'other'} unit={o.v === 'other' ? '' : 'บาท'} />
            ))}
          </div>
          <input type="text" className="form-input mt-2.5" placeholder="ระบุงบประมาณ (บาท)" value={data.budgetCustom} onChange={e => update('budgetCustom', e.target.value)} />
        </FieldGroup>

        <FieldGroup label="รวมค่าติดตั้ง">
          <ToggleGroup options={[{ label: 'รวมค่าติดตั้งด้วย', value: 'yes' }, { label: 'นำไปติดเอง', value: 'no' }]} value={data.includeInstall} onChange={v => update('includeInstall', v)} />
        </FieldGroup>
      </FormCard>

      <FormCard heading="กำหนดการ">
        <FieldGroup label="วันที่ต้องการให้แล้วเสร็จ" required hint="ระยะเวลาผลิต 7–10 วันทำการหลังชำระเงิน (ไม่รวมเสาร์–อาทิตย์)">
          <input type="date" className="form-input" value={data.deadline} onChange={e => update('deadline', e.target.value)} />
        </FieldGroup>

        <FieldGroup label="หมายเหตุ / ความต้องการเพิ่มเติม">
          <textarea className="form-input min-h-[100px] resize-y" placeholder="รายละเอียดเพิ่มเติม คำถาม หรือความต้องการพิเศษ..." value={data.note} onChange={e => update('note', e.target.value)} />
        </FieldGroup>
      </FormCard>

      {/* Summary */}
      <div className="bg-secondary border border-border rounded-xl p-5 mt-5">
        <div className="font-heading text-[11px] font-semibold tracking-[2px] uppercase text-muted-foreground/60 mb-3.5">
          📋 สรุปข้อมูลก่อนส่ง
        </div>
        {summaryRows.map(([k, v]) => (
          <div key={k} className="flex justify-between items-start gap-4 py-2 border-b border-muted last:border-b-0">
            <span className="text-[13px] text-muted-foreground flex-shrink-0">{k}</span>
            <span className="font-heading text-sm font-medium text-foreground/80 text-right">{v || '—'}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section4Budget;

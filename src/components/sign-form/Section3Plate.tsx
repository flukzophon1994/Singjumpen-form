import FormCard from './FormCard';
import { FieldGroup, OptionCard, ToggleGroup } from './FormFields';
import { SignFormData } from './useSignForm';

interface Props {
  data: SignFormData;
  update: (field: keyof SignFormData, value: string) => void;
  updateFile?: (field: 'designFileUpload', file: File | null) => void;
}

const Section3Plate = ({ data, update, updateFile }: Props) => {
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
          ระบุรายละเอียดงาน (2/3) • ป้ายแผ่น / เนมเพลท
        </div>
        <div className="font-heading text-[28px] font-bold text-foreground mb-1.5 leading-tight">รายละเอียดป้ายแผ่น</div>
        <div className="text-sm text-muted-foreground">กรอกข้อมูลเฉพาะงานป้ายแผ่น เนมเพลท ป้ายหน้าห้อง</div>
      </div>

      <FormCard heading="ประเภทป้าย">
        <FieldGroup label="ประเภท" required>
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'acrylic', t: 'ป้ายอะคริลิค' },
              { v: 'etched', t: 'ป้ายกัดกรด' },
              { v: 'machine', t: 'ป้ายเนมเพลทติดเครื่องจักร' },
              { v: 'room', t: 'ป้ายหน้าห้อง' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.plateType === o.v} onClick={() => update('plateType', o.v)} title={o.t} />
            ))}
          </div>
        </FieldGroup>
      </FormCard>

      <FormCard heading="ขนาดและจำนวน">
        <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
          <FieldGroup label="กว้าง (cm)" required>
            <input type="number" className="form-input" placeholder="0" value={data.plateWidth} onChange={e => update('plateWidth', e.target.value)} />
          </FieldGroup>
          <FieldGroup label="สูง (cm)" required>
            <input type="number" className="form-input" placeholder="0" value={data.plateHeight} onChange={e => update('plateHeight', e.target.value)} />
          </FieldGroup>
          <FieldGroup label="จำนวน (ชิ้น)" required>
            <input type="number" className="form-input" placeholder="1" value={data.plateQuantity} onChange={e => update('plateQuantity', e.target.value)} />
          </FieldGroup>
        </div>
      </FormCard>

      <FormCard heading="วัสดุและรายละเอียด">
        <FieldGroup label="วัสดุหน้าแผ่น" required>
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'acrylic-clear', t: 'อะคริลิคใส' },
              { v: 'acrylic-white', t: 'อะคริลิคขาว' },
              { v: 'acrylic-black', t: 'อะคริลิคดำ' },
              { v: 'acrylic-color', t: 'อะคริลิคสี' },
              { v: 'stainless', t: 'สแตนเลส' },
              { v: 'aluminum', t: 'อลูมิเนียม' },
              { v: 'brass', t: 'ทองเหลือง' },
              { v: 'other', t: 'อื่น ๆ' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.plateMaterial === o.v} onClick={() => update('plateMaterial', o.v)} title={o.t} />
            ))}
          </div>
          {data.plateMaterial === 'acrylic-color' && (
            <input type="text" className="form-input mt-2.5" placeholder="ระบุสีอะคริลิค" value={data.plateMaterialColor} onChange={e => update('plateMaterialColor', e.target.value)} />
          )}
          {data.plateMaterial === 'other' && (
            <input type="text" className="form-input mt-2.5" placeholder="ระบุวัสดุอื่น ๆ" value={data.plateMaterialOther} onChange={e => update('plateMaterialOther', e.target.value)} />
          )}
        </FieldGroup>

        <FieldGroup label="ความหนา">
          <div className="grid grid-cols-4 gap-2 max-sm:grid-cols-2">
            {['2 มม.', '3 มม.', '5 มม.', '10 มม.'].map(o => (
              <OptionCard key={o} selected={data.plateThickness === o} onClick={() => update('plateThickness', o)} title={o} />
            ))}
          </div>
          <input type="text" className="form-input mt-2.5" placeholder="อื่น ๆ (ระบุ)" value={data.plateThicknessOther} onChange={e => update('plateThicknessOther', e.target.value)} />
        </FieldGroup>

        <FieldGroup label="รายละเอียดงานหน้าแผ่น">
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'uv-print', t: 'พิมพ์ UV' },
              { v: 'screen', t: 'สกรีน' },
              { v: 'sticker', t: 'สติ๊กเกอร์ติด' },
              { v: 'etched', t: 'กัดกรด' },
              { v: 'engrave', t: 'กัดลาย' },
              { v: 'laser', t: 'ยิงเลเซอร์' },
              { v: 'carve', t: 'แกะสลัก' },
              { v: 'other', t: 'อื่น ๆ' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.plateDetail === o.v} onClick={() => update('plateDetail', o.v)} title={o.t} />
            ))}
          </div>
        </FieldGroup>

        <FieldGroup label="สี / ฟินิช">
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'silver-gloss', t: 'เงินเงา' },
              { v: 'silver-hairline', t: 'เงินแฮร์ไลน์' },
              { v: 'gold-gloss', t: 'ทองเงา' },
              { v: 'gold-hairline', t: 'ทองแฮร์ไลน์' },
              { v: 'black-matte', t: 'ดำด้าน' },
              { v: 'white', t: 'ขาว' },
              { v: 'custom', t: 'สีพ่นตามแบบ' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.plateFinish === o.v} onClick={() => update('plateFinish', o.v)} title={o.t} />
            ))}
          </div>
          {data.plateFinish === 'custom' && (
            <input type="text" className="form-input mt-2.5" placeholder="ระบุสีที่ต้องการ" value={data.plateFinishCustom} onChange={e => update('plateFinishCustom', e.target.value)} />
          )}
        </FieldGroup>
      </FormCard>

      <FormCard heading="การติดตั้ง">
        <FieldGroup label="วิธีติดตั้ง">
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'nut', t: 'เจาะรูน็อต' },
              { v: 'tape', t: 'ติดกาวสองหน้า' },
              { v: 'silicone', t: 'ติดกาวซิลิโคน' },
              { v: 'standoff', t: 'รองเสาลอย' },
              { v: 'pickup', t: 'ไม่ติดตั้ง รับเฉพาะชิ้นงาน' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.plateInstall === o.v} onClick={() => update('plateInstall', o.v)} title={o.t} />
            ))}
          </div>
        </FieldGroup>
      </FormCard>

      {/* เฉพาะเนมเพลทเครื่องจักร */}
      {data.plateType === 'machine' && (
        <FormCard heading="ข้อมูลเนมเพลทเครื่องจักร">
          <FieldGroup label="ข้อมูลที่ต้องใส่">
            <div className="space-y-2.5">
              <input type="text" className="form-input" placeholder="รุ่น / Model" value={data.plateModel} onChange={e => update('plateModel', e.target.value)} />
              <input type="text" className="form-input" placeholder="Serial No." value={data.plateSerial} onChange={e => update('plateSerial', e.target.value)} />
              <input type="text" className="form-input" placeholder="Voltage" value={data.plateVoltage} onChange={e => update('plateVoltage', e.target.value)} />
              <input type="text" className="form-input" placeholder="Watt" value={data.plateWatt} onChange={e => update('plateWatt', e.target.value)} />
              <input type="text" className="form-input" placeholder="วันที่ผลิต" value={data.plateProdDate} onChange={e => update('plateProdDate', e.target.value)} />
              <input type="text" className="form-input" placeholder="โลโก้" value={data.plateLogo} onChange={e => update('plateLogo', e.target.value)} />
              <input type="text" className="form-input" placeholder="ข้อควรระวัง" value={data.plateWarning} onChange={e => update('plateWarning', e.target.value)} />
            </div>
          </FieldGroup>
          <FieldGroup label="จำนวนข้อมูลเหมือนกันทุกแผ่นหรือไม่">
            <ToggleGroup 
              options={[{ label: 'เหมือนกัน', value: 'same' }, { label: 'เปลี่ยนเลข/เปลี่ยนข้อมูลแต่ละชิ้น', value: 'different' }]} 
              value={data.plateDataSame} 
              onChange={v => update('plateDataSame', v)} 
            />
          </FieldGroup>
        </FormCard>
      )}

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
          <textarea className="form-input min-h-[80px] resize-y" placeholder="รายละเอียดเพิ่มเติม..." value={data.plateNote} onChange={e => update('plateNote', e.target.value)} />
        </FieldGroup>
      </FormCard>
    </div>
  );
};

export default Section3Plate;

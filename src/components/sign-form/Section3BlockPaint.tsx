import FormCard from './FormCard';
import { FieldGroup, OptionCard } from './FormFields';
import { SignFormData } from './useSignForm';

interface Props {
  data: SignFormData;
  update: (field: keyof SignFormData, value: string) => void;
  updateFile?: (field: 'designFileUpload', file: File | null) => void;
}

const Section3BlockPaint = ({ data, update, updateFile }: Props) => {
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
          ขั้นตอนที่ 03 / 05 • งานบล็อคพ่นสี
        </div>
        <div className="font-heading text-[28px] font-bold text-foreground mb-1.5 leading-tight">รายละเอียดงานบล็อคพ่นสี</div>
        <div className="text-sm text-muted-foreground">กรอกข้อมูลรายละเอียดงานบล็อคพ่นสี</div>
      </div>

      <FormCard heading="ขนาดและรายละเอียด">
        <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
          <FieldGroup label="ความกว้าง (cm)" required>
            <input 
              type="number" 
              className="form-input" 
              placeholder="0" 
              value={data.blockPaintWidth || ''} 
              onChange={e => update('blockPaintWidth', e.target.value)} 
            />
          </FieldGroup>
          <FieldGroup label="ความยาว (cm)" required>
            <input 
              type="number" 
              className="form-input" 
              placeholder="0" 
              value={data.blockPaintLength || ''} 
              onChange={e => update('blockPaintLength', e.target.value)} 
            />
          </FieldGroup>
        </div>
        
        <FieldGroup label="วัสดุ" required>
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'zinc-0.5', t: 'สังกะสี 0.5 มม.' },
              { v: 'zinc-0.8', t: 'สังกะสี 0.8 มม.' },
              { v: 'zinc-1.0', t: 'สังกะสี 1.0 มม.' },
              { v: 'other', t: 'อื่น ๆ' },
            ].map(o => (
              <OptionCard 
                key={o.v} 
                selected={data.blockPaintMaterial === o.v} 
                onClick={() => update('blockPaintMaterial', o.v)} 
                title={o.t} 
              />
            ))}
          </div>
          {data.blockPaintMaterial === 'other' && (
            <input 
              type="text" 
              className="form-input mt-2.5" 
              placeholder="ระบุวัสดุ" 
              value={data.blockPaintMaterialOther || ''} 
              onChange={e => update('blockPaintMaterialOther', e.target.value)} 
            />
          )}
        </FieldGroup>

        <FieldGroup label="ข้อความ/เนื้อหา">
          <input 
            type="text" 
            className="form-input" 
            placeholder="ข้อความหรือรายละเอียดที่ต้องการ" 
            value={data.blockPaintText || ''} 
            onChange={e => update('blockPaintText', e.target.value)} 
          />
        </FieldGroup>

        <FieldGroup label="จำนวน (ชิ้น)" required>
          <input 
            type="number" 
            className="form-input" 
            placeholder="1" 
            value={data.blockPaintQuantity || ''} 
            onChange={e => update('blockPaintQuantity', e.target.value)} 
          />
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
                <button 
                  type="button" 
                  className="mt-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors" 
                  onClick={() => document.getElementById('designFileInput')?.click()}
                >
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
        </FieldGroup>
        <FieldGroup label="หมายเหตุเพิ่มเติม">
          <textarea 
            className="form-input min-h-[80px] resize-y" 
            placeholder="รายละเอียดเพิ่มเติม..." 
            value={data.blockPaintNote || ''} 
            onChange={e => update('blockPaintNote', e.target.value)} 
          />
        </FieldGroup>
      </FormCard>
    </div>
  );
};

export default Section3BlockPaint;

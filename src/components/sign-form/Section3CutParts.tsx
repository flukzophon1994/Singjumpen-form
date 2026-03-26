import FormCard from './FormCard';
import { FieldGroup, OptionCard, ToggleGroup } from './FormFields';
import { SignFormData } from './useSignForm';

interface Props {
  data: SignFormData;
  update: (field: keyof SignFormData, value: string) => void;
  updateFile?: (field: 'designFileUpload', file: File | null) => void;
}

const Section3CutParts = ({ data, update, updateFile }: Props) => {
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
          ขั้นตอนที่ 03 / 05 • งานตัดอะไหล่
        </div>
        <div className="font-heading text-[28px] font-bold text-foreground mb-1.5 leading-tight">รายละเอียดงานตัดอะไหล่</div>
        <div className="text-sm text-muted-foreground">กรอกข้อมูลรายละเอียดงานตัดอะไหล่</div>
      </div>

      <FormCard heading="วัสดุและความหนา">
        <FieldGroup label="วัสดุ" required>
          <div className="grid grid-cols-3 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'steel', t: 'เหล็ก' },
              { v: 'stainless', t: 'สแตนเลส' },
              { v: 'aluminum', t: 'อะลูมิเนียม' },
            ].map(o => (
              <OptionCard 
                key={o.v} 
                selected={data.cutPartsMaterial === o.v} 
                onClick={() => update('cutPartsMaterial', o.v)} 
                title={o.t} 
              />
            ))}
          </div>
        </FieldGroup>

        <FieldGroup label="ความหนา (มม.)" required>
          <div className="grid grid-cols-4 gap-2 max-sm:grid-cols-2">
            {['0.5', '0.8', '1.0', '1.2', '1.5', '2.0', '3.0', '5.0'].map(o => (
              <OptionCard 
                key={o} 
                selected={data.cutPartsThickness === o} 
                onClick={() => update('cutPartsThickness', o)} 
                title={`${o} มม.`} 
              />
            ))}
          </div>
          <input 
            type="text" 
            className="form-input mt-2.5" 
            placeholder="อื่น ๆ (ระบุ)" 
            value={data.cutPartsThicknessOther || ''} 
            onChange={e => update('cutPartsThicknessOther', e.target.value)} 
          />
        </FieldGroup>
      </FormCard>

      <FormCard heading="แบบงาน">
        <FieldGroup label="ส่งแบบงาน" required>
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'file', t: 'ส่งไฟล์' },
              { v: 'sample', t: 'ส่งงานจริง' },
            ].map(o => (
              <OptionCard 
                key={o.v} 
                selected={data.cutPartsInputType === o.v} 
                onClick={() => update('cutPartsInputType', o.v)} 
                title={o.t} 
              />
            ))}
          </div>
        </FieldGroup>

        <FieldGroup label="ร้านทำแบบ">
          <ToggleGroup
            options={[
              { label: 'ร้านทำแบบให้', value: 'shop-design' },
              { label: 'แจ้ง ก ย (ลูกค้ามีแบบ)', value: 'customer-design' },
            ]}
            value={data.cutPartsDesignBy || ''}
            onChange={v => update('cutPartsDesignBy', v)}
          />
        </FieldGroup>

        <FieldGroup label="จำนวน (ชิ้น)" required>
          <input 
            type="number" 
            className="form-input" 
            placeholder="1" 
            value={data.cutPartsQuantity || ''} 
            onChange={e => update('cutPartsQuantity', e.target.value)} 
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
            value={data.cutPartsNote || ''} 
            onChange={e => update('cutPartsNote', e.target.value)} 
          />
        </FieldGroup>
      </FormCard>
    </div>
  );
};

export default Section3CutParts;

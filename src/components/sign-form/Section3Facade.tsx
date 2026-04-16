import FormCard from './FormCard';
import { FieldGroup, OptionCard, ToggleGroup } from './FormFields';
import { SignFormData } from './useSignForm';

interface Props {
  data: SignFormData;
  update: (field: keyof SignFormData, value: string) => void;
  updateFile?: (field: 'designFileUpload', file: File | null) => void;
}

const Section3Facade = ({ data, update, updateFile }: Props) => {
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

  // Check if current type is delivery-only (no installation)
  const isDeliveryOnly = data.facadeType === 'block-paint' || data.facadeType === 'cut-parts';

  return (
    <div className="animate-slide-in">
      <div className="mb-8">
        <div className="inline-block font-heading text-[10px] font-semibold tracking-[3px] uppercase text-primary bg-primary/10 px-3 py-1 rounded mb-3">
          ระบุรายละเอียดงาน (2/3) • งานฟาซาด/บังตา/ลายฉลุ
        </div>
        <div className="font-heading text-[28px] font-bold text-foreground mb-1.5 leading-tight">รายละเอียดงาน</div>
        <div className="text-sm text-muted-foreground">กรอกข้อมูลเฉพาะงานฟาซาด บังตา ลายฉลุ บล็อคพ่นสี และตัดอะไหล่</div>
      </div>

      <FormCard heading="ประเภทงาน">
        <FieldGroup label="ประเภท" required>
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {[
              { v: 'cnc', t: 'ฟาซาดลายฉลุ CNC' },
              { v: 'slat', t: 'บังตา/ระแนง' },
              { v: 'composite', t: 'คอมโพสิต' },
              { v: 'block-paint', t: 'บล็อคพ่นสี' },
              { v: 'cut-parts', t: 'ตัดอะไหล่' },
            ].map(o => (
              <OptionCard key={o.v} selected={data.facadeType === o.v} onClick={() => update('facadeType', o.v)} title={o.t} />
            ))}
          </div>
        </FieldGroup>
      </FormCard>

      {/* บล็อคพ่นสี - กว้าง ยาว /วัสดุ สังกะสี 0.5 มม / ข้อความ/ จำนวน..ชิ้น */}
      {data.facadeType === 'block-paint' && (
        <>
          <FormCard heading="ขนาดและรายละเอียด">
            <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
              <FieldGroup label="ความกว้าง (cm)" required>
                <input type="number" className="form-input" placeholder="0" value={data.blockPaintWidth || ''} onChange={e => update('blockPaintWidth', e.target.value)} />
              </FieldGroup>
              <FieldGroup label="ความยาว (cm)" required>
                <input type="number" className="form-input" placeholder="0" value={data.blockPaintLength || ''} onChange={e => update('blockPaintLength', e.target.value)} />
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
                  <OptionCard key={o.v} selected={data.blockPaintMaterial === o.v} onClick={() => update('blockPaintMaterial', o.v)} title={o.t} />
                ))}
              </div>
              {data.blockPaintMaterial === 'other' && (
                <input type="text" className="form-input mt-2.5" placeholder="ระบุวัสดุ" value={data.blockPaintMaterialOther || ''} onChange={e => update('blockPaintMaterialOther', e.target.value)} />
              )}
            </FieldGroup>

            <FieldGroup label="ข้อความ/เนื้อหา">
              <input type="text" className="form-input" placeholder="ข้อความหรือรายละเอียดที่ต้องการ" value={data.blockPaintText || ''} onChange={e => update('blockPaintText', e.target.value)} />
            </FieldGroup>

            <FieldGroup label="จำนวน (ชิ้น)" required>
              <input type="number" className="form-input" placeholder="1" value={data.blockPaintQuantity || ''} onChange={e => update('blockPaintQuantity', e.target.value)} />
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
              <textarea className="form-input min-h-[80px] resize-y" placeholder="รายละเอียดเพิ่มเติม..." value={data.blockPaintNote || ''} onChange={e => update('blockPaintNote', e.target.value)} />
            </FieldGroup>
          </FormCard>
        </>
      )}

      {/* ตัดอะไหล่ - เหล็ก สแตนเลส อะลูมิเนียม / ส่งไฟล์หรือส่งงานจริง / ร้านทำแบบ/แจ้ง ก ย /หนา...มม / จำนวน..ชิ้น */}
      {data.facadeType === 'cut-parts' && (
        <>
          <FormCard heading="วัสดุและความหนา">
            <FieldGroup label="วัสดุ" required>
              <div className="grid grid-cols-3 gap-2.5 max-sm:grid-cols-1">
                {[
                  { v: 'steel', t: 'เหล็ก' },
                  { v: 'stainless', t: 'สแตนเลส' },
                  { v: 'aluminum', t: 'อะลูมิเนียม' },
                ].map(o => (
                  <OptionCard key={o.v} selected={data.cutPartsMaterial === o.v} onClick={() => update('cutPartsMaterial', o.v)} title={o.t} />
                ))}
              </div>
            </FieldGroup>

            <FieldGroup label="ความหนา (มม.)" required>
              <div className="grid grid-cols-4 gap-2 max-sm:grid-cols-2">
                {['0.5', '0.8', '1.0', '1.2', '1.5', '2.0', '3.0', '5.0'].map(o => (
                  <OptionCard key={o} selected={data.cutPartsThickness === o} onClick={() => update('cutPartsThickness', o)} title={`${o} มม.`} />
                ))}
              </div>
              <input type="text" className="form-input mt-2.5" placeholder="อื่น ๆ (ระบุ)" value={data.cutPartsThicknessOther || ''} onChange={e => update('cutPartsThicknessOther', e.target.value)} />
            </FieldGroup>
          </FormCard>

          <FormCard heading="แบบงาน">
            <FieldGroup label="ส่งแบบงาน" required>
              <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
                {[
                  { v: 'file', t: 'ส่งไฟล์' },
                  { v: 'sample', t: 'ส่งงานจริง' },
                ].map(o => (
                  <OptionCard key={o.v} selected={data.cutPartsInputType === o.v} onClick={() => update('cutPartsInputType', o.v)} title={o.t} />
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
              <input type="number" className="form-input" placeholder="1" value={data.cutPartsQuantity || ''} onChange={e => update('cutPartsQuantity', e.target.value)} />
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
              <textarea className="form-input min-h-[80px] resize-y" placeholder="รายละเอียดเพิ่มเติม..." value={data.cutPartsNote || ''} onChange={e => update('cutPartsNote', e.target.value)} />
            </FieldGroup>
          </FormCard>
        </>
      )}

      {/* Existing facade types (cnc, slat, composite) */}
      {!isDeliveryOnly && (
        <>
          <FormCard heading="ขนาดและพื้นที่">
            <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
              <FieldGroup label="ความกว้าง (cm)">
                <input type="number" className="form-input" placeholder="0" value={data.facadeWidth} onChange={e => update('facadeWidth', e.target.value)} />
              </FieldGroup>
              <FieldGroup label="ความสูง (cm)">
                <input type="number" className="form-input" placeholder="0" value={data.facadeHeight} onChange={e => update('facadeHeight', e.target.value)} />
              </FieldGroup>
            </div>
            <FieldGroup label="จำนวน (ชิ้น)">
              <input type="number" className="form-input" placeholder="1" value={data.facadeQuantity} onChange={e => update('facadeQuantity', e.target.value)} />
            </FieldGroup>
          </FormCard>

          <FormCard heading="วัสดุ">
            <FieldGroup label="วัสดุหลัก">
              <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
                {[
                  { v: 'aluminum-composite', t: 'อลูมิเนียมคอมโพสิต' },
                  { v: 'aluminum-sheet', t: 'แผ่นอลูมิเนียม' },
                  { v: 'stainless', t: 'สแตนเลส' },
                  { v: 'steel', t: 'เหล็ก' },
                  { v: 'wood', t: 'ไม้' },
                ].map(o => (
                  <OptionCard key={o.v} selected={data.facadeMaterial === o.v} onClick={() => update('facadeMaterial', o.v)} title={o.t} />
                ))}
              </div>
            </FieldGroup>

            <FieldGroup label="ความหนาแผ่น">
              <div className="grid grid-cols-3 gap-2">
                {['2 มม.', '3 มม.', '4 มม.'].map(o => (
                  <OptionCard key={o} selected={data.facadeThickness === o} onClick={() => update('facadeThickness', o)} title={o} />
                ))}
              </div>
            </FieldGroup>
          </FormCard>

          <FormCard heading="ลายและสี">
            <FieldGroup label="ลายฉลุ/ดีไซน์">
              <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
                {[
                  { v: 'standard', t: 'ลายมาตรฐาน' },
                  { v: 'custom', t: 'ลายตามแบบลูกค้า' },
                ].map(o => (
                  <OptionCard key={o.v} selected={data.facadePattern === o.v} onClick={() => update('facadePattern', o.v)} title={o.t} />
                ))}
              </div>
            </FieldGroup>

            <FieldGroup label="สี/ฟินิช">
              <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
                {[
                  { v: 'silver', t: 'สีเงิน' },
                  { v: 'gold', t: 'สีทอง' },
                  { v: 'black', t: 'สีดำ' },
                  { v: 'white', t: 'สีขาว' },
                ].map(o => (
                  <OptionCard key={o.v} selected={data.facadeFinish === o.v} onClick={() => update('facadeFinish', o.v)} title={o.t} />
                ))}
              </div>
            </FieldGroup>
          </FormCard>

          <FormCard heading="การติดตั้ง">
            <FieldGroup label="ประเภทการติดตั้ง">
              <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
                {[
                  { v: 'new-frame', t: 'ติดตั้งใหม่พร้อมโครง' },
                  { v: 'existing', t: 'ติดตั้งบนโครงเดิม' },
                ].map(o => (
                  <OptionCard key={o.v} selected={data.facadeInstallType === o.v} onClick={() => update('facadeInstallType', o.v)} title={o.t} />
                ))}
              </div>
            </FieldGroup>

            <FieldGroup label="โครงสร้างรองรับ">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { v: 'steel', t: 'เหล็ก' },
                  { v: 'aluminum', t: 'อลูมิเนียม' },
                ].map(o => (
                  <OptionCard key={o.v} selected={data.facadeStructure === o.v} onClick={() => update('facadeStructure', o.v)} title={o.t} />
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
              <textarea className="form-input min-h-[80px] resize-y" placeholder="รายละเอียดเพิ่มเติม..." value={data.facadeNote || ''} onChange={e => update('facadeNote', e.target.value)} />
            </FieldGroup>
          </FormCard>
        </>
      )}
    </div>
  );
};

export default Section3Facade;

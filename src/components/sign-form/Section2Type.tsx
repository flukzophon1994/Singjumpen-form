import FormCard from './FormCard';
import { FieldGroup, TypeCard } from './FormFields';
import { SignFormData } from './useSignForm';
import { useState, useEffect } from 'react';

interface Props {
  data: SignFormData;
  update: (field: keyof SignFormData, value: string) => void;
}

const signTypes = [
  {
    value: 'plate',
    icon: '🏷️',
    title: 'ป้ายแผ่น / เนมเพลท / ป้ายหน้าห้อง',
    desc: 'ป้ายแผ่นติดผนัง ป้ายชื่อหน้าห้อง เนมเพลท',
  },
  {
    value: 'non-lit',
    icon: '🔤',
    title: 'งานอักษรไม่ไฟ',
    desc: 'ตัวอักษรไม่มีไฟ อะคริลิค สแตนเลส ฟอยล์ทอง',
  },
  {
    value: 'lit',
    icon: '✨',
    title: 'งานอักษรไฟ',
    desc: 'ตัวอักษร LED ตัวอักษรไฟนีออน',
  },
  {
    value: 'lightbox',
    icon: '💡',
    title: 'งานกล่องไฟ',
    desc: 'กล่องไฟหน้าร้าน กล่องไฟกลม กล่องไฟสี่เหลี่ยม',
  },
  {
    value: 'vinyl',
    icon: '🎨',
    title: 'งานป้ายไวนิล',
    desc: 'สติกเกอร์ไวนิล ป้ายไวนิลติดผนัง ป้ายรถ',
  },
  {
    value: 'metal',
    icon: '🚪',
    title: 'งานเหล็ก / รั้ว / ประตู',
    desc: 'รั้วเหล็ก ประตูเหล็ก โครงสร้างเหล็ก',
  },
  {
    value: 'facade',
    icon: '🏢',
    title: 'งานฟาซาด / บังตา / ลายฉลุ',
    desc: 'งานฟาซาดอาคาร บังตา ลายฉลุอะลูมิเนียม',
  },
  {
    value: 'block-paint',
    icon: '🖌️',
    title: 'งานบล็อคพ่นสี',
    desc: 'บล็อคพ่นสีบนวัสดุต่างๆ',
  },
  {
    value: 'cut-parts',
    icon: '✂️',
    title: 'งานตัดอะไหล่',
    desc: 'ตัดอะไหล่เหล็ก สแตนเลส อะลูมิเนียม',
  },
];

// รูปตัวอย่างสำหรับแต่ละประเภท
const exampleImages: Record<string, { id: string; src: string; label: string }[]> = {
  plate: [
    { id: '1', src: '/assets/01-sign-nameplates/sign 01.jpg', label: 'แบบที่ 1' },
    { id: '2', src: '/assets/01-sign-nameplates/sign 02.jpg', label: 'แบบที่ 2' },
    { id: '3', src: '/assets/01-sign-nameplates/sign 03.jpg', label: 'แบบที่ 3' },
  ],
  'non-lit': [
    { id: '1', src: '/assets/02-non-lit-lettering/nonlit letter 01.jpg', label: 'แบบที่ 1' },
    { id: '2', src: '/assets/02-non-lit-lettering/nonlit letter 02.jpg', label: 'แบบที่ 2' },
    { id: '3', src: '/assets/02-non-lit-lettering/nonlit letter 03.jpg', label: 'แบบที่ 3' },
  ],
  lit: [
    { id: '1', src: '/assets/03-illuminated-lettering/illuminate letter 01.jpg', label: 'แบบที่ 1' },
    { id: '2', src: '/assets/03-illuminated-lettering/illuminate letter 02.jpg', label: 'แบบที่ 2' },
    { id: '3', src: '/assets/03-illuminated-lettering/illuminate letter 03.jpg', label: 'แบบที่ 3' },
  ],
  lightbox: [
    { id: '1', src: '/assets/04-lightboxes/lightbox 01.jpg', label: 'แบบที่ 1' },
    { id: '2', src: '/assets/04-lightboxes/lightbox 02.jpg', label: 'แบบที่ 2' },
    { id: '3', src: '/assets/04-lightboxes/lightbox 03.jpg', label: 'แบบที่ 3' },
  ],
  vinyl: [
    { id: '1', src: '/assets/05-vinyl-banners/vinyl 01.jpg', label: 'แบบที่ 1' },
    { id: '2', src: '/assets/05-vinyl-banners/vinyl 02.jpg', label: 'แบบที่ 2' },
    { id: '3', src: '/assets/05-vinyl-banners/vinyl 03.jpg', label: 'แบบที่ 3' },
  ],
  metal: [
    { id: '1', src: '/assets/06-steelwork-gates/gate 01.jpg', label: 'แบบที่ 1' },
    { id: '2', src: '/assets/06-steelwork-gates/gate 02.jpg', label: 'แบบที่ 2' },
    { id: '3', src: '/assets/06-steelwork-gates/gate 03.jpg', label: 'แบบที่ 3' },
  ],
  facade: [
    { id: '1', src: '/assets/07-facade-cnc-patterns/facade 01.jpg', label: 'แบบที่ 1' },
    { id: '2', src: '/assets/07-facade-cnc-patterns/facade 02.jpg', label: 'แบบที่ 2' },
    { id: '3', src: '/assets/07-facade-cnc-patterns/facade 03.jpg', label: 'แบบที่ 3' },
  ],
  'block-paint': [
    { id: '1', src: '/assets/08-block-paint/block paint 01.jpg', label: 'แบบที่ 1' },
    { id: '2', src: '/assets/08-block-paint/block paint 02.jpg', label: 'แบบที่ 2' },
    { id: '3', src: '/assets/08-block-paint/block paint 03.jpg', label: 'แบบที่ 3' },
  ],
  'cut-parts': [
    { id: '1', src: '/assets/09-cut-parts/cut parts 01.jpg', label: 'แบบที่ 1' },
    { id: '2', src: '/assets/09-cut-parts/cut parts 02.jpg', label: 'แบบที่ 2' },
    { id: '3', src: '/assets/09-cut-parts/cut parts 03.jpg', label: 'แบบที่ 3' },
  ],
};

const Section2Type = ({ data, update }: Props) => {
  const [selectedType, setSelectedType] = useState<string>(data.signType);

  // Reset signTypeExample when type changes
  useEffect(() => {
    if (data.signType !== selectedType) {
      setSelectedType(data.signType);
      update('signTypeExample', '');
    }
  }, [data.signType, selectedType, update]);

  const handleTypeSelect = (typeValue: string) => {
    update('signType', typeValue);
    update('signTypeExample', '');
    setSelectedType(typeValue);
  };

  const handleExampleSelect = (exampleId: string) => {
    update('signTypeExample', exampleId);
  };

  const currentExamples = data.signType ? exampleImages[data.signType] : null;

  return (
    <div className="animate-slide-in">
      <div className="mb-8">
        <div className="inline-block font-heading text-[10px] font-semibold tracking-[3px] uppercase text-primary bg-primary/10 px-3 py-1 rounded mb-3">
          ออกแบบป้ายของคุณ (1/3)
        </div>
        <div className="font-heading text-[28px] font-bold text-foreground mb-1.5 leading-tight">เลือกประเภทป้าย</div>
        <div className="text-sm text-muted-foreground">เริ่มต้นด้วยการเลือกแบบป้ายที่ใกล้เคียงกับความต้องการของคุณ</div>
      </div>

      <FormCard heading="เลือกประเภทงาน">
        <FieldGroup label="ประเภท" required>
          <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            {signTypes.map((type) => (
              <TypeCard
                key={type.value}
                icon={type.icon}
                title={type.title}
                desc={type.desc}
                selected={data.signType === type.value}
                onClick={() => handleTypeSelect(type.value)}
              />
            ))}
          </div>
        </FieldGroup>
      </FormCard>

      {/* แสดงรูปตัวอย่างเมื่อเลือกประเภทแล้ว */}
      {currentExamples && (
        <div className="mt-5">
          <FormCard heading="เลือกตัวอย่างแบบ">
          <FieldGroup label="ตัวอย่างงาน" required hint="เลือกตัวอย่างที่ใกล้เคียงกับงานที่ต้องการ">
            <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
              {currentExamples.map((example) => (
                <div
                  key={example.id}
                  onClick={() => handleExampleSelect(example.id)}
                  className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    data.signTypeExample === example.id
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="aspect-[4/3] relative">
                    <img
                      src={example.src}
                      alt={example.label}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // ถ้ารูปไม่มี ให้แสดง placeholder
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                    {/* Overlay ตอน hover */}
                    <div className={`absolute inset-0 bg-primary/10 transition-opacity ${
                      data.signTypeExample === example.id ? 'opacity-100' : 'opacity-0 hover:opacity-100'
                    }`} />
                    {/* Checkmark ตอนเลือก */}
                    {data.signTypeExample === example.id && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className={`p-2 text-center text-sm font-medium ${
                    data.signTypeExample === example.id ? 'text-primary bg-primary/5' : 'text-muted-foreground'
                  }`}>
                    {example.label}
                  </div>
                </div>
              ))}
            </div>
          </FieldGroup>
        </FormCard>
      </div>
      )}
    </div>
  );
};

export default Section2Type;

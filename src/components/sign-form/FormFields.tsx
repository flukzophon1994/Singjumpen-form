import { ReactNode } from 'react';

interface FieldGroupProps {
  label: string;
  required?: boolean;
  hint?: ReactNode;
  children: ReactNode;
}

export const FieldGroup = ({ label, required, hint, children }: FieldGroupProps) => (
  <div className="mb-[22px] last:mb-0">
    <div className="flex items-center gap-1.5 font-heading text-sm font-medium text-foreground/80 mb-2">
      {label}
      {required && <span className="text-primary text-base leading-none">*</span>}
    </div>
    {children}
    {hint && <div className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{hint}</div>}
  </div>
);

interface OptionCardProps {
  selected: boolean;
  onClick: () => void;
  title: string;
  desc?: string;
}

export const OptionCard = ({ selected, onClick, title, desc }: OptionCardProps) => (
  <div className="relative cursor-pointer" onClick={onClick}>
    <div className={`opt-inner-box ${selected ? 'selected' : ''}`}>
      <div className={`opt-radio-circle ${selected ? 'selected' : ''}`} />
      <div className="flex-1">
        <div className={`font-heading text-sm font-medium leading-tight ${selected ? 'text-amber-700' : 'text-foreground'}`}>
          {title}
        </div>
        {desc && <div className="text-xs text-muted-foreground mt-0.5 leading-snug">{desc}</div>}
      </div>
    </div>
  </div>
);

interface ToggleGroupProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}

export const ToggleGroup = ({ options, value, onChange }: ToggleGroupProps) => (
  <div className="toggle-group-bar">
    {options.map((opt) => (
      <div
        key={opt.value}
        className={`toggle-opt-inner ${value === opt.value ? 'selected' : ''}`}
        onClick={() => onChange(opt.value)}
      >
        {opt.label}
      </div>
    ))}
  </div>
);

interface BudgetCardProps {
  amount: string;
  unit?: string;
  selected: boolean;
  onClick: () => void;
  small?: boolean;
}

export const BudgetCard = ({ amount, unit = 'บาท', selected, onClick, small }: BudgetCardProps) => (
  <div onClick={onClick}>
    <div className={`budget-card-inner ${selected ? 'selected' : ''}`}>
      <div className={`font-heading font-bold ${small ? 'text-[13px]' : 'text-[17px]'} ${selected ? 'text-primary' : 'text-foreground/80'}`}>
        {amount}
      </div>
      {unit && !small && <div className="text-[10px] text-muted-foreground/60 mt-0.5">{unit}</div>}
    </div>
  </div>
);

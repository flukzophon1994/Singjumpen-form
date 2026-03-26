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
}

export const BudgetCard = ({ amount, unit = 'บาท', selected, onClick }: BudgetCardProps) => (
  <div onClick={onClick}>
    <div className={`budget-card-inner ${selected ? 'selected' : ''}`}>
      <div className={`font-heading font-bold text-[17px] ${selected ? 'text-primary' : 'text-foreground/80'}`}>
        {amount}
      </div>
      <div className="text-[10px] text-muted-foreground/60 mt-0.5">{unit || '\u00A0'}</div>
    </div>
  </div>
);

interface TypeCardProps {
  icon: string;
  title: string;
  desc?: string;
  selected: boolean;
  onClick: () => void;
}

export const TypeCard = ({ icon, title, desc, selected, onClick }: TypeCardProps) => (
  <div
    className={`relative cursor-pointer group transition-all duration-200`}
    onClick={onClick}
  >
    <div className={`
      border-2 rounded-xl p-4 transition-all duration-200
      ${selected
        ? 'border-primary bg-primary/5 shadow-md'
        : 'border-border bg-card hover:border-primary/40 hover:shadow-sm'
      }
    `}>
      {/* Icon */}
      <div className={`
        text-4xl mb-3 transition-transform duration-200
        ${selected ? 'scale-110' : 'group-hover:scale-105'}
      `}>
        {icon}
      </div>
      
      {/* Radio indicator */}
      <div className={`
        absolute top-3 right-3 w-5 h-5 rounded-full border-2 flex items-center justify-center
        transition-all duration-200
        ${selected
          ? 'border-primary bg-primary'
          : 'border-muted-foreground/30'
        }
      `}>
        {selected && (
          <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      
      {/* Title */}
      <div className={`
        font-heading text-sm font-semibold leading-tight mb-1
        ${selected ? 'text-primary' : 'text-foreground'}
      `}>
        {title}
      </div>
      
      {/* Description */}
      {desc && (
        <div className="text-xs text-muted-foreground leading-snug">
          {desc}
        </div>
      )}
    </div>
  </div>
);

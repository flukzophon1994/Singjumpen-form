import { ReactNode } from 'react';

interface FormCardProps {
  heading?: string;
  children: ReactNode;
}

const FormCard = ({ heading, children }: FormCardProps) => (
  <div className="bg-card rounded-2xl border border-border p-7 mb-4 max-sm:p-5">
    {heading && (
      <div className="font-heading text-[13px] font-semibold tracking-wider uppercase text-muted-foreground/70 mb-5 pb-3 border-b border-muted">
        {heading}
      </div>
    )}
    {children}
  </div>
);

export default FormCard;

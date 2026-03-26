interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
}

const stepLabels = ['ข้อมูลติดต่อ', 'ประเภทงาน', 'รายละเอียดป้าย', 'การติดตั้ง', 'งบ & กำหนดการ'];

const ProgressBar = ({ currentStep, totalSteps, onStepClick }: ProgressBarProps) => {
  const pct = (currentStep / totalSteps) * 100;

  return (
    <div className="sticky top-0 z-[200] bg-card border-b border-border shadow-[0_1px_12px_rgba(0,0,0,0.06)]">
      <div className="h-[3px] bg-muted">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-[width] duration-400"
          style={{ width: `${pct}%`, transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)' }}
        />
      </div>
      <div className="flex max-w-[700px] mx-auto py-2.5 px-5 gap-1">
        {stepLabels.map((label, i) => {
          const step = i + 1;
          const isActive = step === currentStep;
          const isDone = step < currentStep;

          return (
            <button
              key={step}
              className={`flex-1 flex flex-col items-center gap-1 p-1 bg-transparent border-none transition-opacity duration-200 ${
                isActive ? 'opacity-100' : isDone ? 'opacity-65 cursor-pointer' : 'opacity-40'
              }`}
              onClick={() => isDone && onStepClick(step)}
              type="button"
            >
              <div className={`step-circle ${isActive ? 'active' : isDone ? 'done' : ''}`}>
                {isDone ? '✓' : step}
              </div>
              <div className={`text-[10px] text-center leading-tight ${
                isActive ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}>
                {label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;

interface NavBarProps {
  step: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  isSubmitting?: boolean;
  submitError?: string | null;
}

const NavBar = ({ step, totalSteps, onBack, onNext, isSubmitting, submitError }: NavBarProps) => (
  <nav className="fixed bottom-0 left-0 right-0 z-[200] bg-card/95 backdrop-blur-xl border-t border-border py-3.5 px-5">
    <div className="max-w-[700px] mx-auto flex flex-col gap-2">
      {submitError && (
        <div className="text-destructive text-sm text-center bg-destructive/10 rounded-lg py-2 px-3">
          {submitError}
        </div>
      )}
      <div className="flex gap-3 items-center">
        {step > 1 && (
          <button
            className="btn-back-nav disabled:opacity-50"
            onClick={onBack}
            type="button"
            disabled={isSubmitting}
          >
            ← ย้อนกลับ
          </button>
        )}
        <button
          className={step === totalSteps ? 'btn-submit-nav' : 'btn-next-nav'}
          onClick={onNext}
          type="button"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? 'กำลังส่งข้อมูล...'
            : (step === totalSteps ? 'ขอรับใบเสนอราคาฟรี' : 'ถัดไป →')
          }
        </button>
      </div>
    </div>
  </nav>
);

export default NavBar;

interface NavBarProps {
  step: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
}

const NavBar = ({ step, totalSteps, onBack, onNext }: NavBarProps) => (
  <nav className="fixed bottom-0 left-0 right-0 z-[200] bg-card/95 backdrop-blur-xl border-t border-border py-3.5 px-5">
    <div className="max-w-[700px] mx-auto flex gap-3 items-center">
      {step > 1 && (
        <button className="btn-back-nav" onClick={onBack} type="button">
          ← ย้อนกลับ
        </button>
      )}
      <button
        className={step === totalSteps ? 'btn-submit-nav' : 'btn-next-nav'}
        onClick={onNext}
        type="button"
      >
        {step === totalSteps ? 'ส่งข้อมูล ✓' : 'ถัดไป →'}
      </button>
    </div>
  </nav>
);

export default NavBar;

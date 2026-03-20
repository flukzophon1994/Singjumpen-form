import HeroHeader from '@/components/sign-form/HeroHeader';
import ProgressBar from '@/components/sign-form/ProgressBar';
import Section1Contact from '@/components/sign-form/Section1Contact';
import Section2Details from '@/components/sign-form/Section2Details';
import Section3Install from '@/components/sign-form/Section3Install';
import Section4Budget from '@/components/sign-form/Section4Budget';
import SuccessScreen from '@/components/sign-form/SuccessScreen';
import NavBar from '@/components/sign-form/NavBar';
import { useSignForm } from '@/components/sign-form/useSignForm';

const Index = () => {
  const { step, data, update, goTo, next, prev, submitted } = useSignForm();

  return (
    <div className="min-h-screen bg-background">
      <HeroHeader />

      {!submitted && (
        <>
          <ProgressBar currentStep={step} totalSteps={4} onStepClick={goTo} />
          <main className="max-w-[700px] mx-auto px-5 pt-10 pb-[120px]">
            {step === 1 && <Section1Contact data={data} update={update} />}
            {step === 2 && <Section2Details data={data} update={update} />}
            {step === 3 && <Section3Install data={data} update={update} />}
            {step === 4 && <Section4Budget data={data} update={update} />}
          </main>
          <NavBar step={step} totalSteps={4} onBack={prev} onNext={next} />
        </>
      )}

      {submitted && (
        <main className="max-w-[700px] mx-auto px-5 pb-[120px]">
          <SuccessScreen />
        </main>
      )}
    </div>
  );
};

export default Index;

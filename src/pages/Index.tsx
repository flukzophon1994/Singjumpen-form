import HeroHeader from '@/components/sign-form/HeroHeader';
import ProgressBar from '@/components/sign-form/ProgressBar';
import Section1Contact from '@/components/sign-form/Section1Contact';
import Section2Type from '@/components/sign-form/Section2Type';
import Section2Details from '@/components/sign-form/Section2Details';
import Section3Plate from '@/components/sign-form/Section3Plate';
import Section3NonLit from '@/components/sign-form/Section3NonLit';
import Section3Lit from '@/components/sign-form/Section3Lit';
import Section3Lightbox from '@/components/sign-form/Section3Lightbox';
import Section3Vinyl from '@/components/sign-form/Section3Vinyl';
import Section3Metal from '@/components/sign-form/Section3Metal';
import Section3Facade from '@/components/sign-form/Section3Facade';
import Section3BlockPaint from '@/components/sign-form/Section3BlockPaint';
import Section3CutParts from '@/components/sign-form/Section3CutParts';
import Section3InstallOnly from '@/components/sign-form/Section3InstallOnly';
import Section4Install from '@/components/sign-form/Section4Install';
import Section4Delivery from '@/components/sign-form/Section4Delivery';
import Section5Budget from '@/components/sign-form/Section5Budget';
import SuccessScreen from '@/components/sign-form/SuccessScreen';
import NavBar from '@/components/sign-form/NavBar';
import LoadingModal from '@/components/sign-form/LoadingModal';
import { useSignForm } from '@/components/sign-form/useSignForm';

const Index = () => {
  const { step, data, update, updateFile, goTo, next, prev, submitted, isSubmitting, submitError, emailSent, emailError } = useSignForm();

  // ตรวจสอบว่าเป็นงานที่ไม่มีติดตั้ง (รับที่ร้าน/จัดส่ง)
  const isDeliveryOnly = data.signType === 'block-paint' || data.signType === 'cut-parts';

  // แสดง Section3 ตามประเภทป้ายที่เลือก
  const renderSection3 = () => {
    switch (data.signType) {
      case 'plate':
        return <Section3Plate data={data} update={update} updateFile={updateFile} />;
      case 'non-lit':
        return <Section3NonLit data={data} update={update} updateFile={updateFile} />;
      case 'lit':
        return <Section3Lit data={data} update={update} updateFile={updateFile} />;
      case 'lightbox':
        return <Section3Lightbox data={data} update={update} updateFile={updateFile} />;
      case 'vinyl':
        return <Section3Vinyl data={data} update={update} updateFile={updateFile} />;
      case 'metal':
        return <Section3Metal data={data} update={update} updateFile={updateFile} />;
      case 'facade':
        return <Section3Facade data={data} update={update} updateFile={updateFile} />;
      case 'block-paint':
        return <Section3BlockPaint data={data} update={update} updateFile={updateFile} />;
      case 'cut-parts':
        return <Section3CutParts data={data} update={update} updateFile={updateFile} />;
      case 'install-only':
        return <Section3InstallOnly data={data} update={update} updateFile={updateFile} />;
      default:
        return <Section3Plate data={data} update={update} updateFile={updateFile} />;
    }
  };

  // แสดง Section4 ตามประเภทงาน (ติดตั้งหรือจัดส่ง)
  const renderSection4 = () => {
    if (isDeliveryOnly) {
      return <Section4Delivery data={data} update={update} />;
    }
    return <Section4Install data={data} update={update} updateFile={updateFile} />;
  };

  return (
    <div className="min-h-screen bg-background">
      <LoadingModal isOpen={isSubmitting} />
      <HeroHeader />

      {!submitted && (
        <>
          <ProgressBar currentStep={step} totalSteps={5} onStepClick={goTo} />
          <main className="max-w-[700px] mx-auto px-5 pt-10 pb-[120px]">
            {step === 1 && <Section1Contact data={data} update={update} />}
            {step === 2 && <Section2Type data={data} update={update} />}
            {step === 3 && renderSection3()}
            {step === 4 && renderSection4()}
            {step === 5 && <Section5Budget data={data} update={update} />}
          </main>
          <NavBar
            step={step}
            totalSteps={5}
            onBack={prev}
            onNext={next}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        </>
      )}

      {submitted && (
        <main className="max-w-[700px] mx-auto px-5 pb-[120px]">
          <SuccessScreen emailSent={emailSent} emailError={emailError} />
        </main>
      )}
    </div>
  );
};

export default Index;

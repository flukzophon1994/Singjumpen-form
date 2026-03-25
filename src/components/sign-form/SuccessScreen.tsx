interface SuccessScreenProps {
  emailSent?: boolean;
  emailError?: string | null;
}

const SuccessScreen = ({ emailSent, emailError }: SuccessScreenProps) => {
  return (
    <div className="text-center py-16 px-6 animate-slide-in">
      <div className="w-[88px] h-[88px] rounded-full bg-success-light border-2 border-success/50 flex items-center justify-center mx-auto mb-7 text-[40px] text-success">
        ✓
      </div>
      <h2 className="font-heading text-[32px] font-bold text-foreground mb-3">ส่งข้อมูลสำเร็จแล้ว!</h2>
      <p className="text-[15px] text-muted-foreground leading-relaxed max-w-[440px] mx-auto mb-6">
        ทีมงานได้รับข้อมูลของคุณแล้ว<br />
        จะติดต่อกลับภายใน <strong>1–3 วันทำการ</strong> เพื่อเสนอราคา
      </p>

      {/* Email Status */}
      {emailSent && (
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg py-3 px-5 mb-6">
          <span className="text-green-600 text-lg">📧</span>
          <span className="text-sm text-green-700">
            ส่งสำเนาข้อมูลไปยังอีเมลของคุณแล้ว
          </span>
        </div>
      )}

      {emailError && (
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg py-3 px-5 mb-6">
          <span className="text-amber-600 text-lg">⚠️</span>
          <span className="text-sm text-amber-700">
            บันทึกข้อมูลสำเร็จ แต่ไม่สามารถส่งอีเมลได้
          </span>
        </div>
      )}

      <div className="inline-flex flex-col gap-2 bg-card border border-border rounded-xl py-5 px-8 text-left">
        <div className="flex items-center gap-2.5 text-sm text-foreground/70">
          <span className="text-base flex-shrink-0">📞</span>
          <span>092-969-6595 (จอย) / 065-695-9956 (ณรงค์)</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-foreground/70">
          <span className="text-base flex-shrink-0">💬</span>
          <span>Line Official: @singjumpen</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-foreground/70">
          <span className="text-base flex-shrink-0">✉️</span>
          <span>shopitart@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;

const SuccessScreen = () => (
  <div className="text-center py-16 px-6 animate-slide-in">
    <div className="w-[88px] h-[88px] rounded-full bg-success-light border-2 border-success/50 flex items-center justify-center mx-auto mb-7 text-[40px] text-success">
      ✓
    </div>
    <h2 className="font-heading text-[32px] font-bold text-foreground mb-3">ส่งข้อมูลสำเร็จแล้ว!</h2>
    <p className="text-[15px] text-muted-foreground leading-relaxed max-w-[440px] mx-auto mb-8">
      ทีมงานได้รับข้อมูลของคุณแล้ว<br />
      จะติดต่อกลับภายใน <strong>1–3 วันทำการ</strong> เพื่อเสนอราคา
    </p>
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

export default SuccessScreen;

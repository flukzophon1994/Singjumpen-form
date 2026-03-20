const HeroHeader = () => (
  <header className="hero-section">
    <div className="hero-bg-glow" />
    <div className="hero-grid-pattern" />
    <div className="relative z-10 max-w-[600px] mx-auto">
      <div className="hero-badge-pill animate-fade-down">รับออเดอร์ป้ายไฟ</div>
      <h1 className="font-heading text-[clamp(28px,6vw,52px)] font-bold leading-[1.1] text-white mb-2 animate-fade-down-1">
        อักษรกล่องไฟไดคัท<br />
        <span className="text-primary">ไฟออกหน้า</span>
      </h1>
      <p className="text-sm text-white/45 mb-8 animate-fade-down-2">
        กรอกรายละเอียดให้ครบ ทีมงานเสนอราคาภายใน 1–3 วัน
      </p>
      <div className="flex justify-center flex-wrap border border-white/[0.08] rounded-xl overflow-hidden animate-fade-down-3">
        {[
          { num: '1–3', label: 'วันเสนอราคา' },
          { num: '7–10', label: 'วันผลิต' },
          { num: '092-969-6595', label: '(จอย)' },
          { num: '@singjumpen', label: 'Official Line' },
        ].map((s, i) => (
          <div key={i} className="flex-1 min-w-[130px] py-4 px-3 border-r border-white/[0.08] last:border-r-0 text-center">
            <span className="font-heading text-[15px] font-bold text-primary block">{s.num}</span>
            <div className="text-[11px] text-white/40 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </header>
);

export default HeroHeader;

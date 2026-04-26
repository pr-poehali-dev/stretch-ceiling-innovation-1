import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const ceilingTypes = [
  { label: 'Матовый', price: 650 },
  { label: 'Сатин', price: 750 },
  { label: 'Глянец', price: 850 },
  { label: 'Тканевый', price: 1200 },
  { label: 'Многоуровневый', price: 1500 },
];

const INSTALL_PRICE = 150;
const REMOVAL_PRICE = 100;

const CalculatorSection = () => {
  const [length, setLength] = useState<string>('4');
  const [width, setWidth] = useState<string>('5');
  const [typeIdx, setTypeIdx] = useState(0);
  const [withInstall, setWithInstall] = useState(true);
  const [withRemoval, setWithRemoval] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const l = parseFloat(length) || 0;
  const w = parseFloat(width) || 0;
  const area = l * w;
  const ceilingCost = area * ceilingTypes[typeIdx].price;
  const installCost = withInstall ? area * INSTALL_PRICE : 0;
  const removalCost = withRemoval ? area * REMOVAL_PRICE : 0;
  const total = ceilingCost + installCost + removalCost;

  const fmt = (n: number) =>
    n.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const scrollToContacts = () => {
    const el = document.getElementById('contacts');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="calculator" className="py-28 bg-background" ref={sectionRef}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center fade-up">
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans">
            Онлайн расчёт
          </span>
          <div className="gold-line mt-3 mb-5 mx-auto" />
          <h2 className="section-title">Рассчитайте стоимость</h2>
        </div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Form card */}
          <div className="fade-up bg-card border border-border p-8 space-y-6">
            {/* Dimensions */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] tracking-widest uppercase text-gold font-sans mb-2">
                  Длина (м)
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  step="0.1"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full bg-background border border-border text-foreground px-4 py-3 text-sm font-sans focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-widest uppercase text-gold font-sans mb-2">
                  Ширина (м)
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  step="0.1"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-full bg-background border border-border text-foreground px-4 py-3 text-sm font-sans focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            {/* Ceiling type */}
            <div>
              <label className="block text-[10px] tracking-widest uppercase text-gold font-sans mb-2">
                Тип потолка
              </label>
              <select
                value={typeIdx}
                onChange={(e) => setTypeIdx(Number(e.target.value))}
                className="w-full bg-background border border-border text-foreground px-4 py-3 text-sm font-sans focus:outline-none focus:border-gold transition-colors cursor-pointer"
              >
                {ceilingTypes.map((t, i) => (
                  <option key={t.label} value={i} className="bg-background">
                    {t.label} — {t.price} ₽/м²
                  </option>
                ))}
              </select>
            </div>

            {/* Toggles */}
            <div className="space-y-4">
              {/* Install toggle */}
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <div className="text-sm font-sans text-foreground">Монтаж потолка</div>
                  <div className="text-[10px] text-muted-foreground font-sans mt-0.5">
                    {INSTALL_PRICE} ₽/м²
                  </div>
                </div>
                <button
                  onClick={() => setWithInstall(!withInstall)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
                    withInstall ? 'bg-gold' : 'bg-border'
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-background transition-transform duration-300 ${
                      withInstall ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Removal toggle */}
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <div className="text-sm font-sans text-foreground">Демонтаж старых потолков</div>
                  <div className="text-[10px] text-muted-foreground font-sans mt-0.5">
                    {REMOVAL_PRICE} ₽/м²
                  </div>
                </div>
                <button
                  onClick={() => setWithRemoval(!withRemoval)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
                    withRemoval ? 'bg-gold' : 'bg-border'
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-background transition-transform duration-300 ${
                      withRemoval ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Result card */}
          <div className="fade-up bg-card border border-gold/20 p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Icon name="Calculator" size={18} className="text-gold" />
                <span className="text-[10px] tracking-widest uppercase text-gold font-sans">
                  Ваш расчёт
                </span>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  {
                    label: 'Площадь помещения',
                    value: `${fmt(area)} м²`,
                    highlight: false,
                  },
                  {
                    label: `Потолок (${ceilingTypes[typeIdx].label})`,
                    value: `${fmt(ceilingCost)} ₽`,
                    highlight: false,
                  },
                  {
                    label: 'Монтаж',
                    value: withInstall ? `${fmt(installCost)} ₽` : '—',
                    highlight: false,
                  },
                  {
                    label: 'Демонтаж',
                    value: withRemoval ? `${fmt(removalCost)} ₽` : '—',
                    highlight: false,
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between items-center pb-3 border-b border-border"
                  >
                    <span className="text-xs text-muted-foreground font-sans">{row.label}</span>
                    <span className="text-sm text-foreground font-sans">{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="bg-background/60 border border-gold/30 p-5 mb-6">
                <div className="text-[9px] tracking-widest uppercase text-gold font-sans mb-2">
                  Итоговая стоимость
                </div>
                <div className="font-display text-4xl gold-gradient font-light">
                  {fmt(total)} ₽
                </div>
                {area > 0 && (
                  <div className="text-[10px] text-muted-foreground font-sans mt-1">
                    ≈ {fmt(total / area)} ₽/м² с учётом всех услуг
                  </div>
                )}
              </div>

              <p className="text-[10px] text-muted-foreground font-sans leading-relaxed mb-6">
                * Расчёт является предварительным. Точная стоимость определяется после
                бесплатного замера специалиста.
              </p>
            </div>

            <button
              onClick={scrollToContacts}
              className="w-full py-4 bg-gold text-background text-xs font-sans font-semibold tracking-widest uppercase hover:bg-gold/80 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <Icon name="Send" size={14} />
              Оставить заявку
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;

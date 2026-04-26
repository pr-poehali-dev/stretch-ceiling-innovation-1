import { useEffect, useRef, useState } from 'react';

type FilterKey = 'Все' | 'Глянец' | 'Матовые' | 'Сатин' | 'Тканевые' | 'Многоуровневые';

interface CatalogItem {
  id: number;
  name: string;
  category: FilterKey;
  price: string;
  thickness: string;
  warranty: string;
  gradient: string;
  colors: string[];
}

const catalog: CatalogItem[] = [
  {
    id: 1,
    name: 'Глянец Премиум',
    category: 'Глянец',
    price: 'от 850 руб/м²',
    thickness: '130 мкм',
    warranty: '15 лет',
    gradient: 'linear-gradient(135deg, #2c2c2e 0%, #4a4a5a 40%, #7a7a9a 100%)',
    colors: ['#e8e8f0', '#c0c0d0', '#8080a0', '#404060', '#202040'],
  },
  {
    id: 2,
    name: 'Матовый Classic',
    category: 'Матовые',
    price: 'от 650 руб/м²',
    thickness: '150 мкм',
    warranty: '12 лет',
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #2e2e2e 50%, #3a3a3a 100%)',
    colors: ['#f5f5f5', '#e0d5c5', '#c8b89a', '#a09070', '#6a5a40'],
  },
  {
    id: 3,
    name: 'Сатин Silver',
    category: 'Сатин',
    price: 'от 750 руб/м²',
    thickness: '140 мкм',
    warranty: '12 лет',
    gradient: 'linear-gradient(135deg, #1e2030 0%, #2a3050 50%, #3a4060 100%)',
    colors: ['#c8d0e0', '#a0b0c8', '#8090b0', '#607090', '#405070'],
  },
  {
    id: 4,
    name: 'Тканевый Opus',
    category: 'Тканевые',
    price: 'от 1200 руб/м²',
    thickness: '320 г/м²',
    warranty: '10 лет',
    gradient: 'linear-gradient(135deg, #1e1a14 0%, #2e2818 50%, #3e3822 100%)',
    colors: ['#f0ead8', '#d8cba8', '#b8a878', '#988858', '#786838'],
  },
  {
    id: 5,
    name: 'Глянец Ultra',
    category: 'Глянец',
    price: 'от 1100 руб/м²',
    thickness: '180 мкм',
    warranty: '15 лет',
    gradient: 'linear-gradient(135deg, #0a1020 0%, #101828 50%, #182030 100%)',
    colors: ['#ffffff', '#e0e8f8', '#c0d0f0', '#8090d0', '#4050a0'],
  },
  {
    id: 6,
    name: 'Матовый Premium',
    category: 'Матовые',
    price: 'от 900 руб/м²',
    thickness: '180 мкм',
    warranty: '15 лет',
    gradient: 'linear-gradient(135deg, #181414 0%, #281e1e 50%, #382828 100%)',
    colors: ['#f8f0f0', '#e0c8c8', '#c8a0a0', '#a07878', '#785050'],
  },
  {
    id: 7,
    name: 'Многоуровневый',
    category: 'Многоуровневые',
    price: 'от 1500 руб/м²',
    thickness: 'индивидуально',
    warranty: '15 лет',
    gradient: 'linear-gradient(135deg, #0c1020 0%, #141828 40%, #1e2038 70%, #282848 100%)',
    colors: ['#c8c0d8', '#a090c0', '#8070a8', '#605090', '#403070'],
  },
  {
    id: 8,
    name: 'С подсветкой',
    category: 'Глянец',
    price: 'от 1800 руб/м²',
    thickness: 'LED включён',
    warranty: '15 лет',
    gradient: 'linear-gradient(135deg, #100810 0%, #1a0a1a 40%, #241228 70%, #301840 100%)',
    colors: ['#f8c0f8', '#e090e0', '#c060c0', '#9030a0', '#600880'],
  },
];

const filters: FilterKey[] = ['Все', 'Глянец', 'Матовые', 'Сатин', 'Тканевые', 'Многоуровневые'];

const CatalogSection = () => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('Все');
  const sectionRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeFilter === 'Все' ? catalog : catalog.filter((c) => c.category === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="catalog" className="py-28 bg-background" ref={sectionRef}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-12 fade-up">
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans">
            Ассортимент
          </span>
          <div className="gold-line mt-3 mb-5" />
          <h2 className="section-title">Каталог потолков</h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12 fade-up">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 text-[10px] tracking-widest uppercase font-sans transition-all duration-200 border ${
                activeFilter === f
                  ? 'bg-gold text-background border-gold'
                  : 'border-border text-muted-foreground hover:border-gold/40 hover:text-gold'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="fade-up group bg-card border border-border hover:border-gold/40 transition-all duration-300 overflow-hidden"
            >
              {/* Color preview */}
              <div
                className="h-36 w-full relative overflow-hidden"
                style={{ background: item.gradient }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute top-3 left-3 text-[8px] tracking-widest uppercase font-sans text-white/60 bg-black/30 px-2 py-1">
                  {item.category}
                </span>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-display text-base font-light text-foreground mb-3 group-hover:text-gold transition-colors">
                  {item.name}
                </h3>
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-muted-foreground font-sans">Цена</span>
                    <span className="text-[10px] text-gold font-sans font-medium">{item.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-muted-foreground font-sans">Толщина</span>
                    <span className="text-[10px] text-foreground/70 font-sans">{item.thickness}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-muted-foreground font-sans">Гарантия</span>
                    <span className="text-[10px] text-foreground/70 font-sans">{item.warranty}</span>
                  </div>
                </div>

                {/* Color dots */}
                <div className="flex gap-1.5 flex-wrap">
                  {item.colors.map((color) => (
                    <div
                      key={color}
                      className="w-4 h-4 rounded-full border border-white/10 cursor-pointer hover:scale-125 transition-transform"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;

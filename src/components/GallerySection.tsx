import { useEffect, useRef, useState } from 'react';

type GalleryFilter = 'Все' | 'Гостиная' | 'Спальня' | 'Кухня' | 'Офис' | 'Детская';

interface GalleryItem {
  id: number;
  title: string;
  type: string;
  room: GalleryFilter;
  gradient: string;
  tall: boolean;
}

const galleryItems: GalleryItem[] = [
  { id: 1, title: 'ЖК "Белый берег"', type: 'Глянец Белый', room: 'Гостиная', gradient: 'linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)', tall: true },
  { id: 2, title: 'Апартаменты Сити', type: 'Сатин Серебро', room: 'Офис', gradient: 'linear-gradient(135deg,#2d2d2d,#1a1a1a,#3d3d3d)', tall: false },
  { id: 3, title: 'Коттедж Рублёво', type: 'Матовый Бежевый', room: 'Спальня', gradient: 'linear-gradient(135deg,#1e1b10,#2e2510,#3e3018)', tall: false },
  { id: 4, title: 'ЖК "Авангард"', type: 'Многоуровневый LED', room: 'Гостиная', gradient: 'linear-gradient(135deg,#0d0d1a,#1a0d2e,#2d0d4a)', tall: true },
  { id: 5, title: 'Дом Перово', type: 'Глянец Антрацит', room: 'Кухня', gradient: 'linear-gradient(135deg,#1a1a1a,#252525,#1a1a2a)', tall: false },
  { id: 6, title: 'Детская Лазурь', type: 'Тканевый Мятный', room: 'Детская', gradient: 'linear-gradient(135deg,#0d1e2e,#0d2e1e,#0d1e2e)', tall: false },
  { id: 7, title: 'Студия Арбат', type: 'Сатин Графит', room: 'Офис', gradient: 'linear-gradient(135deg,#141414,#1e1e1e,#282828)', tall: true },
  { id: 8, title: 'Вилла Подмосковья', type: 'Матовый Белоснежный', room: 'Спальня', gradient: 'linear-gradient(135deg,#1e1e1e,#2a2a2a,#181818)', tall: false },
  { id: 9, title: 'ЖК "Лучи"', type: 'Звёздное небо', room: 'Детская', gradient: 'linear-gradient(135deg,#050510,#0a0a20,#0f0f30)', tall: false },
  { id: 10, title: 'Ресторан Золото', type: 'Глянец Чёрный', room: 'Офис', gradient: 'linear-gradient(135deg,#1a0e00,#2a1500,#3a1e00)', tall: true },
  { id: 11, title: 'Квартира на Арбате', type: 'Сатин Белый', room: 'Кухня', gradient: 'linear-gradient(135deg,#1e1e2e,#14142a,#0e0e22)', tall: false },
  { id: 12, title: 'Таунхаус Одинцово', type: 'Многоуровневый', room: 'Гостиная', gradient: 'linear-gradient(135deg,#0e1218,#12181e,#181e26)', tall: false },
];

const filters: GalleryFilter[] = ['Все', 'Гостиная', 'Спальня', 'Кухня', 'Офис', 'Детская'];

const GallerySection = () => {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>('Все');
  const [hovered, setHovered] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeFilter === 'Все' ? galleryItems : galleryItems.filter((g) => g.room === activeFilter);

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
    <section id="gallery" className="py-28 bg-card/30" ref={sectionRef}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-12 fade-up">
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans">
            Портфолио
          </span>
          <div className="gold-line mt-3 mb-5" />
          <h2 className="section-title">Галерея работ</h2>
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

        {/* Masonry grid via CSS columns */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-0">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="fade-up break-inside-avoid mb-4 relative overflow-hidden group cursor-pointer"
              style={{ height: item.tall ? '320px' : '200px' }}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Background */}
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{ background: item.gradient }}
              />

              {/* Overlay */}
              <div
                className={`absolute inset-0 bg-black/70 flex flex-col justify-end p-4 transition-opacity duration-300 ${
                  hovered === item.id ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <span className="text-[9px] tracking-widest uppercase text-gold font-sans mb-1">
                  {item.type}
                </span>
                <span className="font-display text-sm text-white font-light">{item.title}</span>
                <span className="text-[9px] tracking-wider uppercase text-white/50 font-sans mt-1">
                  {item.room}
                </span>
              </div>

              {/* Room badge */}
              <div
                className={`absolute top-3 right-3 transition-opacity duration-300 ${
                  hovered === item.id ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <span className="text-[8px] tracking-widest uppercase text-white/50 font-sans bg-black/30 px-2 py-1">
                  {item.room}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center fade-up">
          <button className="px-10 py-4 border border-gold text-gold text-xs font-sans tracking-widest uppercase hover:bg-gold hover:text-background transition-all duration-300">
            Смотреть все работы
          </button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;

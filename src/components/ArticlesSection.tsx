import { useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const articles = [
  {
    id: 1,
    category: 'Уход',
    title: 'Как ухаживать за натяжным потолком',
    desc: 'Простые правила, которые помогут сохранить идеальный внешний вид натяжного потолка на долгие годы без лишних усилий.',
    date: '12 января 2024',
    icon: 'Droplets',
    readTime: '4 мин',
  },
  {
    id: 2,
    category: 'Выбор',
    title: 'Глянец или матовый: как выбрать?',
    desc: 'Детальное сравнение двух самых популярных типов натяжных потолков: плюсы, минусы, подходящие помещения и стилевые решения.',
    date: '28 января 2024',
    icon: 'SplitSquareHorizontal',
    readTime: '6 мин',
  },
  {
    id: 3,
    category: 'Монтаж',
    title: 'Монтаж натяжного потолка: что нужно знать',
    desc: 'Пошаговый процесс установки, подготовка помещения, что ждать от мастеров и как принять работу без ошибок.',
    date: '5 февраля 2024',
    icon: 'Wrench',
    readTime: '7 мин',
  },
  {
    id: 4,
    category: 'Дизайн',
    title: 'Натяжные потолки в детской комнате',
    desc: 'Безопасные материалы, весёлые принты, звёздное небо и другие решения для создания идеального пространства для ребёнка.',
    date: '19 февраля 2024',
    icon: 'Star',
    readTime: '5 мин',
  },
  {
    id: 5,
    category: 'Тренды',
    title: 'Многоуровневые потолки: тренды 2024',
    desc: 'Актуальные формы, материалы и способы подсветки многоуровневых конструкций, которые задают тон в интерьерном дизайне.',
    date: '7 марта 2024',
    icon: 'TrendingUp',
    readTime: '5 мин',
  },
  {
    id: 6,
    category: 'Освещение',
    title: 'Освещение под натяжным потолком',
    desc: 'Точечные светильники, LED-ленты, люстры и скрытая подсветка — как правильно выбрать и разместить источники света.',
    date: '21 марта 2024',
    icon: 'Lightbulb',
    readTime: '6 мин',
  },
];

const ArticlesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="articles" className="py-28 bg-background" ref={sectionRef}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-16 fade-up">
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans">
            Блог
          </span>
          <div className="gold-line mt-3 mb-5" />
          <h2 className="section-title">Полезные статьи</h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article
              key={article.id}
              className="fade-up group flex flex-col bg-card border border-border border-t-0 hover:border-gold/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Gold top border */}
              <div className="h-0.5 bg-gradient-to-r from-gold/80 via-gold/40 to-transparent" />

              <div className="p-6 flex flex-col flex-1">
                {/* Category + icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[9px] tracking-[0.3em] uppercase text-gold font-sans px-2.5 py-1 border border-gold/30 bg-gold/5">
                    {article.category}
                  </span>
                  <Icon
                    name={article.icon}
                    size={18}
                    className="text-gold/40 group-hover:text-gold/70 transition-colors"
                  />
                </div>

                {/* Title */}
                <h3 className="font-display text-lg font-light text-foreground mb-3 group-hover:text-gold transition-colors leading-snug">
                  {article.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-xs leading-relaxed font-sans flex-1 mb-5">
                  {article.desc}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-muted-foreground font-sans">{article.date}</span>
                    <span className="text-[10px] text-muted-foreground font-sans flex items-center gap-1">
                      <Icon name="Clock" size={10} className="text-gold/50" />
                      {article.readTime}
                    </span>
                  </div>
                  <button className="text-[10px] tracking-widest uppercase font-sans text-gold flex items-center gap-1.5 hover:gap-2.5 transition-all duration-200">
                    Читать
                    <Icon name="ArrowRight" size={12} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;

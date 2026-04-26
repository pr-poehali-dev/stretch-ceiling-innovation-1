import { useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const stats = [
  {
    icon: 'Shield',
    value: '15 лет',
    label: 'Гарантия',
    desc: 'Даём письменную гарантию на все виды потолков',
  },
  {
    icon: 'Award',
    value: '1200+',
    label: 'Объектов',
    desc: 'Реализованных проектов в Москве и области',
  },
  {
    icon: 'Clock',
    value: '1 день',
    label: 'Монтаж',
    desc: 'Быстрая установка без пыли и шума',
  },
  {
    icon: 'Users',
    value: '45+',
    label: 'Мастеров',
    desc: 'Сертифицированные специалисты в штате',
  },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120);
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
    <section id="about" className="py-28 bg-background" ref={sectionRef}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-16 fade-up">
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans">
            О компании
          </span>
          <div className="gold-line mt-3 mb-5" />
          <h2 className="section-title">О компании ПРЕСТИЖ</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: text */}
          <div className="space-y-6">
            <p className="text-foreground/80 leading-relaxed font-sans fade-up">
              С 2009 года компания <span className="text-gold font-medium">ПРЕСТИЖ</span> создаёт
              безупречные натяжные потолки для тех, кто ценит качество и эстетику. Мы начинали как
              небольшая мастерская и выросли в одну из ведущих компаний Москвы, сохраняя при этом
              индивидуальный подход к каждому клиенту.
            </p>
            <p className="text-foreground/70 leading-relaxed font-sans fade-up">
              За 15 лет работы мы реализовали более 1200 объектов — от уютных квартир до масштабных
              коммерческих проектов. Наши мастера прошли обучение у ведущих европейских
              производителей и владеют всеми актуальными технологиями монтажа.
            </p>
            <p className="text-foreground/70 leading-relaxed font-sans fade-up">
              Собственное производство позволяет нам контролировать качество на каждом этапе —
              от нарезки полотна до финальной установки. Мы используем материалы премиум-класса от
              французских и бельгийских производителей.
            </p>

            <div className="pt-4 fade-up">
              <div className="flex flex-wrap gap-3">
                {['Собственное производство', 'Европейские материалы', 'Бесплатный замер', 'Договор и гарантийный талон'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 border border-gold/30 text-gold/80 text-[10px] tracking-widest uppercase font-sans"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Right: stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((item) => (
              <div
                key={item.icon}
                className="fade-up group p-6 bg-card border border-border hover:border-gold/40 transition-all duration-300 hover:bg-card/80"
              >
                <Icon
                  name={item.icon}
                  size={22}
                  className="text-gold mb-4 group-hover:scale-110 transition-transform duration-300"
                />
                <div className="font-display text-3xl text-foreground font-light mb-0.5">
                  {item.value}
                </div>
                <div className="text-[10px] tracking-widest uppercase text-gold font-sans mb-3">
                  {item.label}
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

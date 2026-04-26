import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';

const services = [
  {
    icon: 'Sparkles',
    title: 'Глянцевые потолки',
    desc: 'Зеркальный эффект, визуально увеличивает пространство и добавляет роскошь любому интерьеру.',
    features: ['Отражает свет, увеличивая комнату', 'Создаёт эффект бесконечности', 'Идеален для гостиных и холлов'],
  },
  {
    icon: 'Layers',
    title: 'Матовые потолки',
    desc: 'Классика элегантности. Равномерно рассеивает свет и скрывает дефекты перекрытий.',
    features: ['Скрывает все неровности плиты', 'Нейтральное рассеивание света', 'Подходит для любых помещений'],
  },
  {
    icon: 'Gem',
    title: 'Сатиновые потолки',
    desc: 'Мягкий шёлковый блеск. Универсальное решение на стыке матового и глянца.',
    features: ['Нежный перламутровый оттенок', 'Устойчив к перепадам влажности', 'Широкая цветовая палитра'],
  },
  {
    icon: 'Wind',
    title: 'Тканевые потолки',
    desc: 'Натуральный материал из стеклоткани. Дышащая структура, экологически чистый состав.',
    features: ['Паропроницаемый материал', 'Не требует прогрева помещения', 'Фактурная поверхность'],
  },
  {
    icon: 'LayoutDashboard',
    title: 'Многоуровневые потолки',
    desc: 'Архитектурные формы для зонирования пространства. Сложные геометрические решения.',
    features: ['Зонирование без стен', 'Встроенная подсветка контуров', 'Индивидуальный дизайн-проект'],
  },
  {
    icon: 'Lightbulb',
    title: 'Потолки с подсветкой',
    desc: 'Интеграция LED-систем в натяжной потолок. Атмосферное освещение без видимых светильников.',
    features: ['RGB и CCT управление', 'Звёздное небо под заказ', 'Экономия электроэнергии'],
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

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
    <section id="services" className="py-28 bg-card/40" ref={sectionRef}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center fade-up">
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans">
            Что мы делаем
          </span>
          <div className="gold-line mt-3 mb-5 mx-auto" />
          <h2 className="section-title">Наши услуги</h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="fade-up group relative flex flex-col p-7 bg-background border border-border hover:border-gold/40 transition-all duration-400 cursor-pointer"
              style={{ transitionDuration: '400ms' }}
              onMouseEnter={() => setExpanded(i)}
              onMouseLeave={() => setExpanded(null)}
            >
              {/* Gold top line on hover */}
              <div
                className={`absolute top-0 left-0 h-0.5 bg-gold transition-all duration-500 ${
                  expanded === i ? 'w-full' : 'w-0'
                }`}
              />

              {/* Icon */}
              <div className="mb-5">
                <Icon
                  name={service.icon}
                  size={26}
                  className={`transition-colors duration-300 ${
                    expanded === i ? 'text-gold' : 'text-gold/60'
                  }`}
                />
              </div>

              {/* Title */}
              <h3
                className={`font-display text-xl mb-3 font-light transition-colors duration-300 ${
                  expanded === i ? 'text-gold' : 'text-foreground'
                }`}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed font-sans flex-1 mb-5">
                {service.desc}
              </p>

              {/* Features list */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-xs font-sans text-foreground/70">
                    <span className="mt-1 w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button className="self-start text-[10px] tracking-widest uppercase font-sans text-gold border-b border-gold/30 pb-0.5 hover:border-gold transition-colors">
                Подробнее
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

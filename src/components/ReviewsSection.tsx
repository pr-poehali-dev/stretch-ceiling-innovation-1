import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const reviews = [
  {
    name: 'Елена Соколова',
    date: '14 февраля 2024',
    rating: 5,
    type: 'Глянец Премиум',
    text: 'Заказывали глянцевый потолок в гостиную. Результат превзошёл все ожидания — комната визуально стала вдвое просторнее. Мастера пришли вовремя, работали аккуратно, убрали за собой. Уже рекомендую друзьям!',
  },
  {
    name: 'Андрей Петров',
    date: '2 марта 2024',
    rating: 5,
    type: 'Многоуровневый LED',
    text: 'Делали многоуровневый потолок с подсветкой в зале. Менеджер помог с дизайном, предложил несколько вариантов. Монтаж занял 2 дня — всё по договору. Соседи приходят любоваться!',
  },
  {
    name: 'Ирина Морозова',
    date: '19 марта 2024',
    rating: 5,
    type: 'Матовый Premium',
    text: 'Обратилась по рекомендации. Матовый потолок в спальне — это была отличная идея. Никакого запаха, никакой пыли. Через три часа потолок готов, я в восторге. Цена вполне разумная за такое качество.',
  },
  {
    name: 'Дмитрий Козлов',
    date: '5 апреля 2024',
    rating: 5,
    type: 'Тканевый Opus',
    text: 'Выбрал тканевый потолок для детской — важна была экологичность. Компания предоставила все сертификаты на материалы. Монтаж быстрый, без нагрева. Ребёнок доволен, жена в восторге.',
  },
  {
    name: 'Наталья Волкова',
    date: '22 апреля 2024',
    rating: 5,
    type: 'Сатин Silver',
    text: 'Сатиновый потолок в кухне и коридоре — именно то, что нужно. Лёгкий блеск без пошлости, вся грязь протирается влажной тряпкой. Компания сделала замер бесплатно, монтаж за 1 день.',
  },
  {
    name: 'Сергей Новиков',
    date: '8 мая 2024',
    rating: 4,
    type: 'Глянец Ultra',
    text: 'Делали потолок в офисе. Немного сдвинули сроки, но предупредили заранее. Итоговый результат отличный — строгий чёрный глянец смотрится очень стильно. Клиенты всегда спрашивают, что за потолок.',
  },
];

const ReviewsSection = () => {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 5000);
  };

  useEffect(() => {
    startAuto();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const goTo = (idx: number) => {
    setCurrent(idx);
    startAuto();
  };

  const prev = () => goTo((current - 1 + reviews.length) % reviews.length);
  const next = () => goTo((current + 1) % reviews.length);

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

  const Stars = ({ count }: { count: number }) => (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon
          key={i}
          name="Star"
          size={14}
          className={i < count ? 'text-gold fill-gold' : 'text-border'}
        />
      ))}
    </div>
  );

  return (
    <section id="reviews" className="py-28 bg-card/30" ref={sectionRef}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center fade-up">
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans">
            Доверие клиентов
          </span>
          <div className="gold-line mt-3 mb-5 mx-auto" />
          <h2 className="section-title">Отзывы клиентов</h2>

          {/* Overall rating */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <span className="font-display text-5xl text-gold font-light">4.9</span>
            <div className="flex flex-col items-start gap-1">
              <Stars count={5} />
              <span className="text-[10px] tracking-widest uppercase text-muted-foreground font-sans">
                на основе 340+ отзывов
              </span>
            </div>
          </div>
        </div>

        {/* Slider area */}
        <div className="max-w-4xl mx-auto">
          {/* Main review */}
          <div className="fade-up bg-background border border-border p-8 md:p-10 relative overflow-hidden mb-6">
            {/* Decorative quote mark */}
            <div className="absolute top-6 right-8 font-display text-8xl text-gold/5 leading-none select-none pointer-events-none">
              "
            </div>

            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="font-display text-xl text-foreground font-light mb-1">
                  {reviews[current].name}
                </div>
                <div className="text-[10px] tracking-widest uppercase text-gold font-sans">
                  {reviews[current].type}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Stars count={reviews[current].rating} />
                <span className="text-[10px] text-muted-foreground font-sans">
                  {reviews[current].date}
                </span>
              </div>
            </div>

            <p className="text-foreground/75 leading-relaxed font-sans text-sm">
              {reviews[current].text}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between fade-up">
            {/* Dots */}
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-300 ${
                    i === current
                      ? 'w-6 h-1.5 bg-gold'
                      : 'w-1.5 h-1.5 bg-border hover:bg-gold/40'
                  }`}
                  aria-label={`Отзыв ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 border border-gold/40 text-gold hover:bg-gold hover:text-background transition-all duration-200 flex items-center justify-center"
                aria-label="Предыдущий"
              >
                <Icon name="ChevronLeft" size={16} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 border border-gold/40 text-gold hover:bg-gold hover:text-background transition-all duration-200 flex items-center justify-center"
                aria-label="Следующий"
              >
                <Icon name="ChevronRight" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Mini cards below */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
          {reviews.map((r, i) => (
            <button
              key={r.name}
              onClick={() => goTo(i)}
              className={`fade-up text-left p-4 border transition-all duration-200 ${
                i === current
                  ? 'border-gold/40 bg-background'
                  : 'border-border bg-card hover:border-gold/20'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-sans text-foreground font-medium">{r.name}</span>
                <Stars count={r.rating} />
              </div>
              <p className="text-[11px] text-muted-foreground font-sans leading-relaxed line-clamp-2">
                {r.text}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;

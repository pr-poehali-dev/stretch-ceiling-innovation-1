const HeroSection = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://cdn.poehali.dev/projects/181495b7-6905-4e3a-8e21-521e783dbd9f/files/5839a564-ff17-4057-8e64-c754412d70b9.jpg)',
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
        {/* Eyebrow */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0 }}>
          <span className="inline-block text-[10px] tracking-[0.4em] uppercase text-gold font-sans mb-8 px-4 py-2 border border-gold/30 bg-gold/5">
            Элитные натяжные потолки
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="font-display text-white animate-fade-in"
          style={{
            fontSize: 'clamp(2.8rem, 7vw, 6rem)',
            fontWeight: 300,
            letterSpacing: '0.04em',
            lineHeight: 1.1,
            animationDelay: '0.45s',
            opacity: 0,
          }}
        >
          Потолки, которые
          <br />
          <span className="gold-gradient">говорят о вашем вкусе</span>
        </h1>

        {/* Subtitle */}
        <p
          className="mt-6 text-foreground/70 font-sans text-base md:text-lg max-w-xl leading-relaxed animate-fade-in"
          style={{ animationDelay: '0.7s', opacity: 0 }}
        >
          Элитные натяжные потолки с гарантией 15 лет.
          <br className="hidden md:block" /> Монтаж от 1 дня. Работаем по Москве и области.
        </p>

        {/* Buttons */}
        <div
          className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in"
          style={{ animationDelay: '0.95s', opacity: 0 }}
        >
          <button
            onClick={() => scrollTo('calculator')}
            className="px-8 py-4 bg-gold text-background font-sans text-xs font-semibold tracking-widest uppercase hover:bg-gold/80 transition-all duration-300 hover:scale-105"
          >
            Получить расчёт
          </button>
          <button
            onClick={() => scrollTo('gallery')}
            className="px-8 py-4 border border-gold text-gold font-sans text-xs font-semibold tracking-widest uppercase hover:bg-gold/10 transition-all duration-300"
          >
            Смотреть галерею
          </button>
        </div>

        {/* Stats */}
        <div
          className="mt-20 grid grid-cols-3 gap-8 md:gap-16 animate-fade-in"
          style={{ animationDelay: '1.2s', opacity: 0 }}
        >
          {[
            { value: '1200+', label: 'объектов сдано' },
            { value: '15 лет', label: 'на рынке' },
            { value: '15 лет', label: 'гарантия' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <div className="h-px w-8 bg-gold/50 mb-4 mx-auto" />
              <span className="font-display text-3xl md:text-4xl text-gold font-light">
                {stat.value}
              </span>
              <span className="text-[10px] tracking-widest uppercase text-muted-foreground font-sans mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('about')}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-gold transition-colors animate-fade-in-slow"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase font-sans">Листать вниз</span>
        <div className="w-px h-10 bg-gradient-to-b from-gold/60 to-transparent" />
      </button>
    </section>
  );
};

export default HeroSection;

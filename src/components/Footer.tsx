import Icon from '@/components/ui/icon';

const navLinks = [
  { label: 'Главная', href: '#hero' },
  { label: 'О нас', href: '#about' },
  { label: 'Услуги', href: '#services' },
  { label: 'Галерея', href: '#gallery' },
  { label: 'Калькулятор', href: '#calculator' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Статьи', href: '#articles' },
  { label: 'Контакты', href: '#contacts' },
];

const socials = [
  { icon: 'Instagram', label: 'Instagram', href: '#' },
  { icon: 'Youtube', label: 'YouTube', href: '#' },
  { icon: 'MessageCircle', label: 'Telegram', href: '#' },
  { icon: 'Phone', label: 'WhatsApp', href: '#' },
];

const Footer = () => {
  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <button onClick={() => scrollTo('#hero')} className="flex flex-col items-start mb-4 group">
              <span className="font-display text-3xl font-light tracking-widest text-gold group-hover:text-gold/80 transition-colors">
                ПРЕСТИЖ
              </span>
              <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase mt-0.5 font-sans">
                натяжные потолки
              </span>
            </button>
            <p className="text-muted-foreground text-xs leading-relaxed font-sans mt-4">
              Элитные натяжные потолки с 2009 года. Более 1200 реализованных объектов в Москве
              и Подмосковье.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] tracking-widest uppercase text-gold font-sans mb-5">
              Навигация
            </h4>
            <ul className="space-y-3">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-xs text-muted-foreground font-sans hover:text-gold transition-colors tracking-wide"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] tracking-widest uppercase text-gold font-sans mb-5">
              Ещё
            </h4>
            <ul className="space-y-3">
              {navLinks.slice(4).map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-xs text-muted-foreground font-sans hover:text-gold transition-colors tracking-wide"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-[10px] tracking-widest uppercase text-gold font-sans mb-5">
              Контакты
            </h4>
            <ul className="space-y-3">
              {[
                { icon: 'Phone', text: '+7 (800) 123-45-67' },
                { icon: 'Mail', text: 'info@prestige-potolki.ru' },
                { icon: 'MapPin', text: 'Москва, ул. Примерная, 1' },
                { icon: 'Clock', text: 'Пн–Сб, 9:00–20:00' },
              ].map((c) => (
                <li key={c.text} className="flex items-center gap-2.5">
                  <Icon name={c.icon} size={12} className="text-gold/60 flex-shrink-0" />
                  <span className="text-xs text-muted-foreground font-sans">{c.text}</span>
                </li>
              ))}
            </ul>

            {/* Socials */}
            <div className="flex gap-3 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 border border-border hover:border-gold/40 flex items-center justify-center text-muted-foreground hover:text-gold transition-all duration-200"
                >
                  <Icon name={s.icon} size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-muted-foreground font-sans">
            © 2024 ПРЕСТИЖ натяжные потолки. Все права защищены.
          </p>
          <div className="flex gap-6">
            {['Политика конфиденциальности', 'Договор оферты'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-[10px] text-muted-foreground font-sans hover:text-gold transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

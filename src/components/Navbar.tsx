import { useState, useEffect } from 'react';
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

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sectionIds = navLinks.map((l) => l.href.replace('#', ''));
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= 100) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/90 backdrop-blur-md border-b border-border shadow-lg shadow-black/30'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => scrollTo('#hero')}
            className="flex flex-col items-start leading-none group"
          >
            <span className="font-display text-3xl font-light tracking-widest text-gold group-hover:text-gold/80 transition-colors">
              ПРЕСТИЖ
            </span>
            <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase mt-0.5 font-sans">
              натяжные потолки
            </span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className={`text-xs tracking-widest uppercase font-sans transition-colors duration-200 pb-0.5 border-b ${
                      isActive
                        ? 'text-gold border-gold'
                        : 'text-muted-foreground border-transparent hover:text-gold hover:border-gold/50'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* CTA + burger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo('#calculator')}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-background text-xs font-sans font-semibold tracking-widest uppercase hover:bg-gold/80 transition-colors duration-200"
            >
              Получить расчёт
            </button>
            <button
              className="lg:hidden text-foreground p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Меню"
            >
              <Icon name={mobileOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-card border-l border-border flex flex-col pt-24 pb-8 px-8 transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <ul className="flex flex-col gap-6">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className={`text-sm tracking-widest uppercase font-sans transition-colors w-full text-left pb-2 border-b ${
                      isActive
                        ? 'text-gold border-gold'
                        : 'text-muted-foreground border-border hover:text-gold'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>
          <button
            onClick={() => scrollTo('#calculator')}
            className="mt-8 w-full py-3 bg-gold text-background text-xs font-sans font-semibold tracking-widest uppercase hover:bg-gold/80 transition-colors"
          >
            Получить расчёт
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;

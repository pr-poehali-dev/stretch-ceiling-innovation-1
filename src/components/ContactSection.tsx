import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const ceilingOptions = [
  'Матовый',
  'Сатин',
  'Глянцевый',
  'Тканевый',
  'Многоуровневый',
  'С подсветкой',
  'Не определился',
];

const contactInfo = [
  { icon: 'Phone', label: 'Телефон', value: '+7 (800) 123-45-67', href: 'tel:+78001234567' },
  { icon: 'Mail', label: 'Email', value: 'info@prestige-potolki.ru', href: 'mailto:info@prestige-potolki.ru' },
  { icon: 'MapPin', label: 'Адрес', value: 'Москва, ул. Примерная, д. 1', href: '#' },
  { icon: 'Clock', label: 'Режим работы', value: 'Пн–Сб, 9:00–20:00', href: '#' },
];

interface FormState {
  name: string;
  phone: string;
  email: string;
  area: string;
  type: string;
  message: string;
}

const ContactSection = () => {
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    email: '',
    area: '',
    type: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
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

  const validate = () => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = 'Введите ваше имя';
    if (!form.phone.trim()) newErrors.phone = 'Введите номер телефона';
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
  };

  const inputClass = (field: keyof FormState) =>
    `w-full bg-background border ${
      errors[field] ? 'border-red-500/60' : 'border-border'
    } text-foreground px-4 py-3 text-sm font-sans focus:outline-none focus:border-gold transition-colors placeholder:text-muted-foreground/50`;

  return (
    <section id="contacts" className="py-28 bg-card/30" ref={sectionRef}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-16 fade-up">
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans">
            Контакты
          </span>
          <div className="gold-line mt-3 mb-5" />
          <h2 className="section-title">Связаться с нами</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: contact info */}
          <div className="space-y-8">
            <p className="fade-up text-muted-foreground font-sans leading-relaxed">
              Оставьте заявку — наш менеджер свяжется с вами в течение 30 минут и ответит на
              все вопросы. Замер выезжает бесплатно по Москве и области.
            </p>

            <div className="space-y-5">
              {contactInfo.map((item) => (
                <div key={item.label} className="fade-up flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} size={16} className="text-gold" />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-widest uppercase text-gold/60 font-sans mb-0.5">
                      {item.label}
                    </div>
                    {item.href !== '#' ? (
                      <a
                        href={item.href}
                        className="text-sm text-foreground font-sans hover:text-gold transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm text-foreground font-sans">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Promise block */}
            <div className="fade-up bg-background border border-gold/20 p-6 mt-8">
              <div className="flex items-center gap-3 mb-3">
                <Icon name="CheckCircle" size={18} className="text-gold" />
                <span className="text-xs tracking-widest uppercase text-gold font-sans">
                  Наши обещания
                </span>
              </div>
              <ul className="space-y-2">
                {[
                  'Бесплатный замер без обязательств',
                  'Ответ в течение 30 минут',
                  'Фиксированная цена по договору',
                  'Гарантия 15 лет письменно',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs font-sans text-muted-foreground">
                    <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: form */}
          <div className="fade-up bg-background border border-border p-8">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 border border-gold/40 flex items-center justify-center mb-6">
                  <Icon name="CheckCircle" size={28} className="text-gold" />
                </div>
                <h3 className="font-display text-2xl text-foreground mb-3 font-light">
                  Заявка принята!
                </h3>
                <p className="text-muted-foreground font-sans text-sm leading-relaxed max-w-sm">
                  Мы свяжемся с вами в течение 30 минут. Спасибо за обращение в компанию ПРЕСТИЖ.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', phone: '', email: '', area: '', type: '', message: '' });
                  }}
                  className="mt-8 px-6 py-2.5 border border-gold/40 text-gold text-xs font-sans tracking-widest uppercase hover:bg-gold hover:text-background transition-all"
                >
                  Новая заявка
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Ваше имя *"
                      className={inputClass('name')}
                    />
                    {errors.name && (
                      <p className="text-[10px] text-red-400 font-sans mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Телефон *"
                      className={inputClass('phone')}
                    />
                    {errors.phone && (
                      <p className="text-[10px] text-red-400 font-sans mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={inputClass('email')}
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="area"
                    type="number"
                    value={form.area}
                    onChange={handleChange}
                    placeholder="Площадь, м²"
                    className={inputClass('area')}
                  />
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className={`${inputClass('type')} cursor-pointer`}
                  >
                    <option value="" className="bg-background">
                      Тип потолка
                    </option>
                    {ceilingOptions.map((o) => (
                      <option key={o} value={o} className="bg-background">
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Дополнительные пожелания"
                  rows={4}
                  className={`${inputClass('message')} resize-none`}
                />

                <button
                  type="submit"
                  className="w-full py-4 bg-gold text-background text-xs font-sans font-semibold tracking-widest uppercase hover:bg-gold/80 transition-colors duration-300 flex items-center justify-center gap-2 mt-2"
                >
                  <Icon name="Send" size={14} />
                  Отправить заявку
                </button>

                <p className="text-[10px] text-muted-foreground font-sans text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

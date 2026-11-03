import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Clock, Menu, X, Globe, DollarSign } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useDialogHistory } from '../context/DialogHistoryContext';
import { OSH_OFFICE_DETAILS } from '../data/content';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface NavbarProps {
  onOpenTourModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTourModal }) => {
  const { language, setLanguage, currency, setCurrency } = useLanguage();
  const { dialogs, openHistory } = useDialogHistory();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { labelRu: 'Объекты', labelKg: 'Объектилер', href: '#catalog' },
    { labelRu: 'Сданные ЖК', labelKg: 'Бүткөн үйлөр', href: '#cases' },
    { labelRu: 'Рассрочка 0%', labelKg: '0% бөлүп төлөө', href: '#purchase' },
    { labelRu: 'Документы', labelKg: 'Документтер', href: '#documents' },
    { labelRu: 'О компании', labelKg: 'Компания жөнүндө', href: '#about' },
    { labelRu: 'Контакты', labelKg: 'Байланыш', href: '#contacts' }
  ];

  const waUrl = getWhatsAppUrl(
    language === 'ru'
      ? 'Здравствуйте! Хочу получить консультацию по жилым комплексам ORDO в городе Ош'
      : 'Саламатсызбы! Ош шаарындагы ORDO турак жай комплекстери боюнча маалымат алгым келет'
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#111317]/95 backdrop-blur-md text-white shadow-xl py-3 border-b border-white/10'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full border border-amber-400/50 flex items-center justify-center bg-white/5 backdrop-blur-sm group-hover:border-amber-400 transition-colors">
                <span className="font-serif-luxury font-bold text-lg text-amber-400 tracking-wider">O</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-widest text-white uppercase">
                  ORDO <span className="font-light text-amber-300 text-sm tracking-normal">DEVELOPMENT</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-white/60">
                  {language === 'ru' ? 'г. Ош • Застройщик №1' : 'Ош ш. • №1 Девелопер'}
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium tracking-wide">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="text-white/80 hover:text-white transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-amber-400 hover:after:w-full after:transition-all"
                >
                  {language === 'ru' ? link.labelRu : link.labelKg}
                </a>
              ))}
            </nav>

            {/* Actions: Phone, Lang, Currency, History & CTA */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Currency Switcher */}
              <button
                onClick={() => setCurrency(currency === 'USD' ? 'KGS' : 'USD')}
                className="px-2.5 py-1 text-xs rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white/90 font-mono transition-colors flex items-center gap-1"
                title="Переключить валюту"
              >
                <DollarSign className="w-3 h-3 text-amber-400" />
                <span>{currency === 'USD' ? '$ USD' : 'СОМ'}</span>
              </button>

              {/* Language Switcher */}
              <div className="flex items-center rounded-full bg-white/10 border border-white/15 p-0.5 text-xs">
                <button
                  onClick={() => setLanguage('ru')}
                  className={`px-2.5 py-1 rounded-full transition-all ${
                    language === 'ru' ? 'bg-white text-gray-900 font-semibold' : 'text-white/70 hover:text-white'
                  }`}
                >
                  РУС
                </button>
                <button
                  onClick={() => setLanguage('kg')}
                  className={`px-2.5 py-1 rounded-full transition-all ${
                    language === 'kg' ? 'bg-white text-gray-900 font-semibold' : 'text-white/70 hover:text-white'
                  }`}
                >
                  КЫРГ
                </button>
              </div>

              {/* Consultation History Button (Strictly keeping last 2 dialogs) */}
              <button
                onClick={openHistory}
                className="relative px-3 py-1.5 text-xs rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/40 text-amber-300 font-medium transition-colors flex items-center gap-1.5"
                title="История ваших последних диалогов и обращений"
              >
                <Clock className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">{language === 'ru' ? 'История диалогов' : 'Диалог тарыхы'}</span>
                <span className="w-5 h-5 rounded-full bg-amber-400 text-gray-950 font-bold text-[11px] flex items-center justify-center">
                  {dialogs.length}
                </span>
              </button>

              {/* Phone call link */}
              <a
                href={`tel:${OSH_OFFICE_DETAILS.phone1}`}
                className="flex items-center gap-2 text-xs font-semibold tracking-wider text-white hover:text-amber-300 transition-colors px-2 py-1"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>{OSH_OFFICE_DETAILS.phone1}</span>
              </a>

              {/* Main CTA */}
              <button
                onClick={onOpenTourModal}
                className="px-5 py-2 text-xs uppercase tracking-wider font-semibold rounded-full bg-white text-gray-950 hover:bg-amber-400 hover:text-gray-950 transition-all shadow-md active:scale-95"
              >
                {language === 'ru' ? 'Экскурсия' : 'Экскурсия'}
              </button>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={openHistory}
                className="p-2 rounded-full bg-white/10 text-amber-300 border border-amber-400/30 relative"
                aria-label="История диалогов"
              >
                <Clock className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-gray-950 font-bold text-[10px] flex items-center justify-center">
                  {dialogs.length}
                </span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Открыть меню"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#111317] border-b border-white/10 px-4 pt-4 pb-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-white/70">Тил / Язык:</span>
                <div className="flex rounded-full bg-white/10 p-0.5 text-xs">
                  <button
                    onClick={() => setLanguage('ru')}
                    className={`px-3 py-1 rounded-full ${
                      language === 'ru' ? 'bg-white text-black font-semibold' : 'text-white'
                    }`}
                  >
                    РУС
                  </button>
                  <button
                    onClick={() => setLanguage('kg')}
                    className={`px-3 py-1 rounded-full ${
                      language === 'kg' ? 'bg-white text-black font-semibold' : 'text-white'
                    }`}
                  >
                    КЫРГ
                  </button>
                </div>
              </div>

              <button
                onClick={() => setCurrency(currency === 'USD' ? 'KGS' : 'USD')}
                className="px-3 py-1 text-xs rounded-full bg-white/10 text-amber-300 border border-white/15 font-mono"
              >
                {currency === 'USD' ? '$ USD' : 'СОМ (KGS)'}
              </button>
            </div>

            <nav className="flex flex-col space-y-3">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-white/90 hover:text-amber-400 py-1 transition-colors"
                >
                  {language === 'ru' ? link.labelRu : link.labelKg}
                </a>
              ))}
            </nav>

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTourModal();
                }}
                className="w-full py-3 rounded-xl bg-amber-400 text-gray-950 font-bold text-center tracking-wide text-sm shadow-lg"
              >
                {language === 'ru' ? 'Записаться на экскурсию' : 'Экскурсияга жазылуу'}
              </button>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-center text-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{language === 'ru' ? 'Написать в WhatsApp' : 'WhatsApp аркылуу жазуу'}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

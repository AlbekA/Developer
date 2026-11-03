import React from 'react';
import { OSH_OFFICE_DETAILS } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-[#0e1014] text-white/70 py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-amber-400/50 flex items-center justify-center bg-white/5">
                <span className="font-serif-luxury font-bold text-base text-amber-400">O</span>
              </div>
              <span className="font-serif-luxury text-xl font-bold tracking-widest text-white uppercase">
                ORDO <span className="font-light text-amber-300 text-xs">DEVELOPMENT</span>
              </span>
            </div>

            <p className="text-xs text-white/60 leading-relaxed max-w-sm">
              {language === 'ru'
                ? 'Строительная девелоперская компания полного цикла в городе Ош. Проектирование, сейсмостойкое монолитное строительство и управление жилой недвижимостью.'
                : 'Ош шаарындагы толук циклдуу курулуш девелопердик компаниясы. Долбоорлоо, сейсмотуруктуу монолиттик курулуш жана турак жайларды башкаруу.'}
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Лицензия Госстроя КР {OSH_OFFICE_DETAILS.license}</span>
            </div>
          </div>

          {/* Legal Requisites (4 cols) */}
          <div className="lg:col-span-4 space-y-2 text-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white block mb-3">
              {language === 'ru' ? 'Юридические реквизиты' : 'Юридикалык реквизиттер'}
            </span>
            <div className="text-white/80 font-medium">{OSH_OFFICE_DETAILS.companyLegalName}</div>
            <div>
              <span className="text-white/40">ИНН:</span>{' '}
              <span className="font-mono text-white/80">{OSH_OFFICE_DETAILS.inn}</span>
            </div>
            <div>
              <span className="text-white/40">ОКПО:</span>{' '}
              <span className="font-mono text-white/80">{OSH_OFFICE_DETAILS.okpo}</span>
            </div>
            <div>
              <span className="text-white/40">Госрегистр:</span> Регистрация договоров долевого участия (ДДУ)
            </div>
          </div>

          {/* Quick links & Privacy (3 cols) */}
          <div className="lg:col-span-3 space-y-2 text-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white block mb-3">
              {language === 'ru' ? 'Правовая информация' : 'Укуктук маалымат'}
            </span>
            <div>
              <a href="#documents" className="hover:text-amber-300 transition-colors block">
                {language === 'ru' ? 'Реестр документов и Красных книг' : 'Документтер жана Кызыл китептер реестри'}
              </a>
            </div>
            <div>
              <a href="#privacy" className="hover:text-amber-300 transition-colors block">
                {language === 'ru' ? 'Политика конфиденциальности КР' : 'Купуялуулук саясаты'}
              </a>
            </div>
            <div>
              <a href="#terms" className="hover:text-amber-300 transition-colors block">
                {language === 'ru' ? 'Согласие на обработку данных' : 'Жеке маалыматтарды иштетүү макулдугу'}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 gap-4">
          <div>
            © 2026 {OSH_OFFICE_DETAILS.companyLegalName}. Все права защищены. г. Ош, Кыргызстан.
          </div>
          <div className="flex items-center gap-1">
            <span>Построено с любовью к родному Ошу</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { ShieldCheck, CalendarCheck, FileCheck2, ArrowRight, MessageCircle, MapPin, Building2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface HeroProps {
  onOpenTourModal: () => void;
  onExploreCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTourModal, onExploreCatalog }) => {
  const { language } = useLanguage();

  const heroWaText =
    language === 'ru'
      ? 'Здравствуйте! Хочу записаться на экскурсию по строящимся объектам ORDO DEVELOPMENT в городе Ош'
      : 'Саламатсызбы! Ош шаарындагы ORDO DEVELOPMENT курулуп жаткан объектилерине экскурсияга жазылгым келет';

  const waUrl = getWhatsAppUrl(heroWaText);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#0d0f12]">
      {/* Background visual with twilight architectural luxury atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=90"
          alt="Жилой комплекс в Оше"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-fade-in filter brightness-[0.42] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f12] via-[#0d0f12]/40 to-[#0d0f12]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0d0f12]/30 to-[#0d0f12]/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-4 sm:mt-10">
        <div className="max-w-4xl">
          {/* Top category label & location */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 text-white/90 text-xs sm:text-sm tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-amber-300">г. Ош</span>
            <span className="text-white/40">•</span>
            <span>{language === 'ru' ? 'Юго-Восток • Масалиева • Центр' : 'Түштүк-Чыгыш • Масалиев • Борбор'}</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl text-white font-medium leading-[1.12] tracking-tight mb-6">
            {language === 'ru' ? (
              <>
                Современные жилые комплексы комфорт- и бизнес-класса в Оше с{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100 italic">
                  беспроцентной рассрочкой
                </span>{' '}
                до сдачи дома
              </>
            ) : (
              <>
                Ош шаарындагы үй бүткөнгө чейин{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100 italic">
                  0% пайызсыз бөлүп төлөө
                </span>{' '}
                менен заманбап комфорт жана бизнес-класстагы турак жайлар
              </>
            )}
          </h1>

          {/* Subtitle with details */}
          <p className="text-base sm:text-lg lg:text-xl text-white/80 font-normal leading-relaxed mb-8 max-w-3xl">
            {language === 'ru' ? (
              <>
                Надежные монолитные дома с расчетной сейсмостойкостью{' '}
                <strong className="text-white font-semibold">9 баллов (бетон М350+)</strong>, собственной территорией,
                подземными паркингами и{' '}
                <strong className="text-white font-semibold">«Красной книгой»</strong> на каждый земельный участок.
              </>
            ) : (
              <>
                Эсептелген сейсмотуруктуулугу{' '}
                <strong className="text-white font-semibold">9 балл (М350+ бетону)</strong>, жеке аймагы, жер алдындагы
                паркинги жана ар бир жер тилкесине жеке менчик{' '}
                <strong className="text-white font-semibold">«Кызыл китеби»</strong> бар бекем монолиттүү үйлөр.
              </>
            )}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
            <button
              onClick={onOpenTourModal}
              className="px-8 py-4 rounded-full bg-white hover:bg-amber-400 text-gray-950 font-semibold text-sm sm:text-base tracking-wide transition-all shadow-xl hover:shadow-amber-400/20 active:scale-95 flex items-center justify-center gap-3 group"
            >
              <span>{language === 'ru' ? 'Записаться на экскурсию по объектам' : 'Объектилерге экскурсияга жазылуу'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm sm:text-base tracking-wide transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2.5"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>{language === 'ru' ? 'Связаться в WhatsApp' : 'WhatsApp аркылуу байланышуу'}</span>
            </a>
          </div>

          {/* Micro Trust Triggers directly under CTA */}
          <div className="pt-4 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-white/80">
            <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-sm px-3.5 py-2.5 rounded-xl border border-white/10">
              <FileCheck2 className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-xs sm:text-sm">
                <span className="font-semibold text-white block">
                  {language === 'ru' ? 'Красная книга на участок' : 'Жерге Кызыл китеп'}
                </span>
                <span className="text-white/60 text-[11px]">
                  {language === 'ru' ? 'Частная собственность' : 'Жеке менчик укугу'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-sm px-3.5 py-2.5 rounded-xl border border-white/10">
              <CalendarCheck className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-xs sm:text-sm">
                <span className="font-semibold text-white block">
                  {language === 'ru' ? 'Рассрочка 0% до 36 мес.' : '36 айга чейин 0% бөлүп төлөө'}
                </span>
                <span className="text-white/60 text-[11px]">
                  {language === 'ru' ? 'Без банков и процентов' : 'Банксыз жана пайызсыз'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-sm px-3.5 py-2.5 rounded-xl border border-white/10">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-xs sm:text-sm">
                <span className="font-semibold text-white block">
                  {language === 'ru' ? 'Сейсмика 9 баллов' : '9 балл сейсмотуруктуулук'}
                </span>
                <span className="text-white/60 text-[11px]">
                  {language === 'ru' ? 'Лицензия Госстроя КР I кат.' : 'Мамкурулуштун I кат. лицензиясы'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom subtle panorama indicator */}
      <div className="absolute bottom-4 right-6 hidden lg:flex items-center gap-2 text-white/50 text-xs">
        <MapPin className="w-3.5 h-3.5 text-amber-400" />
        <span>{language === 'ru' ? 'Панорама г. Ош • Вид на Сулайман-Тоо' : 'Ош шаарынын панорамасы • Сулайман-Тоо'}</span>
      </div>
    </section>
  );
};

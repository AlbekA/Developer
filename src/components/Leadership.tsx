import React from 'react';
import { TEAM_MEMBERS } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import { Quote, ArrowRight, ShieldCheck } from 'lucide-react';

export const Leadership: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section id="about" className="py-24 bg-[#fafaf8] border-b border-[#e5e5df]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching the reference image layout */}
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-16 pb-8 border-b border-[#e2e2dc] gap-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-widest text-[#71716b] font-semibold block mb-2">
              {language === 'ru' ? 'О РУКОВОДСТВЕ И КОМАНДЕ' : 'ЖЕТЕКЧИЛИК ЖАНА КОМАНДА ЖӨНҮНДӨ'}
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#1a1c22] font-semibold tracking-tight">
              {language === 'ru' ? 'Личная ответственность за каждый объект' : 'Ар бир объект үчүн жеке жоопкерчилик'}
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm text-[#5a5b57] leading-relaxed mb-4">
              {language === 'ru'
                ? 'Мы не просто строим дома — мы формируем новый архитектурный облик южной столицы Кыргызстана с бескомпромиссным контролем прочности и надежности.'
                : 'Биз жөн гана үй курбайбыз — Кыргызстандын түштүк борборунун жаңы архитектуралык жүзүн сапат жана бекемдик менен түзөбүз.'}
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#1a1c22] uppercase tracking-wider">
              <span>{language === 'ru' ? 'Основано в городе Ош' : 'Ош шаарында негизделген'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              <span>2014</span>
            </div>
          </div>
        </div>

        {/* CEO Quote Banner */}
        <div className="mb-16 bg-[#181a1f] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          <Quote className="w-12 h-12 text-amber-400/40 mb-6" />

          <blockquote className="font-serif-luxury text-xl sm:text-2xl lg:text-3xl text-white/95 font-normal leading-snug mb-8 max-w-4xl italic">
            {language === 'ru' ? (
              <>
                «Мы строим в родном Оше так, как строили бы для собственных детей и родителей.
                Безопасность фундамента и монолита на 9 баллов сейсмики — это священная ответственность,
                в которой для нас не существует компромиссов».
              </>
            ) : (
              <>
                «Биз өзүбүздүн туулуп-өскөн Ошубузда өз балдарыбыз менен ата-энебизге салгандай үй курабыз.
                9 баллдык сейсмикага эсептелген пайдубал менен монолиттин бекемдиги — бул биз үчүн эч кандай
                соодалашууга орун жок ыйык жоопкерчилик».
              </>
            )}
          </blockquote>

          <div className="flex items-center gap-4 border-t border-white/10 pt-6">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-amber-400/40">
              <img
                src={TEAM_MEMBERS[0].image}
                alt="Нурлан Бакиров"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-sm font-semibold text-white tracking-wide">
                {language === 'ru' ? TEAM_MEMBERS[0].nameRu : TEAM_MEMBERS[0].nameKg}
              </div>
              <div className="text-xs text-amber-300">
                {language === 'ru' ? TEAM_MEMBERS[0].roleRu : TEAM_MEMBERS[0].roleKg}
              </div>
            </div>
          </div>
        </div>

        {/* Team Grid matching reference image cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.id} className="group flex flex-col">
              {/* Photo */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-200 mb-4 border border-[#e2e2dc]">
                <img
                  src={member.image}
                  alt={member.nameRu}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 filter contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Name & Role */}
              <div className="flex flex-col justify-between flex-grow">
                <div>
                  <h4 className="font-serif-luxury text-lg font-bold text-[#1a1c22] mb-1">
                    {language === 'ru' ? member.nameRu : member.nameKg}
                  </h4>
                  <p className="text-xs font-semibold text-amber-700 mb-2">
                    {language === 'ru' ? member.roleRu : member.roleKg}
                  </p>
                </div>
                <p className="text-[11px] text-[#71716b] leading-tight pt-2 border-t border-[#f0f0eb]">
                  {language === 'ru' ? member.experienceRu : member.experienceKg}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

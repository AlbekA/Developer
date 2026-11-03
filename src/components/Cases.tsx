import React from 'react';
import { CASE_STUDIES } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, MapPin, Calendar, TrendingUp } from 'lucide-react';

export const Cases: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section id="cases" className="py-24 bg-[#111317] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block mb-2">
              {language === 'ru' ? 'РЕАЛИЗОВАННЫЕ ПРОЕКТЫ' : 'ИШКЕ АШЫРЫЛГАН ДОЛБООРЛОР'}
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-semibold tracking-tight text-white">
              {language === 'ru' ? 'Кейсы: уже сданные жилые дома' : 'Кейстер: пайдаланууга берилген үйлөр'}
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-white/70 max-w-md leading-relaxed">
            {language === 'ru'
              ? 'Наглядные доказательства надежности: строим в срок, подключаем все коммуникации и выдаем государственные техпаспорта.'
              : 'Ишенимдүүлүктүн ачык далили: өз убагында курабыз, бардык коммуналдык шарттарды беребиз жана техпаспорт тапшырабыз.'}
          </p>
        </div>

        {/* Case Studies List */}
        <div className="space-y-16">
          {CASE_STUDIES.map((study, idx) => (
            <div
              key={study.id}
              className="bg-white/5 rounded-3xl border border-white/10 p-6 sm:p-10 backdrop-blur-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Image Column */}
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] bg-white/5 border border-white/10">
                <img
                  src={study.image}
                  alt={study.name}
                  className="w-full h-full object-cover filter brightness-[0.9]"
                />
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-xs font-semibold text-amber-300 border border-white/20">
                  {language === 'ru' ? `Сдан в ${study.yearCompleted} г.` : `${study.yearCompleted}-жылы бүткөрүлгөн`}
                </div>
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/75 backdrop-blur-md text-xs text-white/90 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{language === 'ru' ? study.locationRu : study.locationKg}</span>
                </div>
              </div>

              {/* Content Column */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>{language === 'ru' ? 'Успешный кейс девелопмента' : 'Девелопменттин ийгиликтүү кейси'}</span>
                  </div>
                  <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white mb-4">
                    {study.name}
                  </h3>

                  {/* Situation */}
                  <div className="mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/50 block mb-1">
                      {language === 'ru' ? '1. Ситуация и запрос горожан:' : '1. Шаардыктардын муктаждыгы:'}
                    </span>
                    <p className="text-sm text-white/80 leading-relaxed bg-white/5 p-3.5 rounded-xl border border-white/5">
                      {language === 'ru' ? study.situationRu : study.situationKg}
                    </p>
                  </div>

                  {/* What we did */}
                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/50 block mb-2">
                      {language === 'ru' ? '2. Что мы реализовали:' : '2. Биз эмнелерди жасадык:'}
                    </span>
                    <ul className="space-y-2 text-xs sm:text-sm text-white/85">
                      {(language === 'ru' ? study.solutionRu : study.solutionKg).map((item, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Results in numbers */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-3">
                    {language === 'ru' ? '3. Результат в цифрах:' : '3. Сандардагы жыйынтык:'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {study.results.map((res, rIdx) => (
                      <div
                        key={rIdx}
                        className="bg-white/10 p-4 rounded-xl border border-white/10 text-center flex flex-col justify-center"
                      >
                        <span className="font-serif-luxury text-2xl font-bold text-amber-300 block mb-1">
                          {res.value}
                        </span>
                        <span className="text-[11px] text-white/70 leading-tight">
                          {language === 'ru' ? res.labelRu : res.labelKg}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

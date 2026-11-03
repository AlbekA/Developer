import React from 'react';
import { TRUST_NUMBERS } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight, Award, Shield, FileCheck, Layers } from 'lucide-react';

export const TrustNumbers: React.FC = () => {
  const { language } = useLanguage();

  const icons = [Award, Layers, Shield, FileCheck];

  return (
    <section className="py-20 bg-[#f7f7f4] border-b border-[#e5e5df]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Editorial Reference Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-[#e2e2dc]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#71716b] font-semibold block mb-2">
              {language === 'ru' ? 'ЦЕЛЬ И НАДЕЖНОСТЬ' : 'МАКСАТ ЖАНА ИШЕНИМДҮҮЛҮК'}
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1a1c22] font-semibold tracking-tight">
              {language === 'ru' ? 'Цифры, подтверждающие лидерство' : 'Лидерликти тастыктаган сандар'}
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-[#5a5b57] max-w-md leading-relaxed">
            {language === 'ru'
              ? 'Каждый квадратный метр возводится под государственным надзором с заботой о поколениях жителей Оша.'
              : 'Ар бир чарчы метр Ош шаарынын тургундарынын коопсуздугу үчүн мамлекеттик көзөмөл астында курулат.'}
          </p>
        </div>

        {/* 4 Key Numbers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_NUMBERS.map((item, idx) => {
            const IconComponent = icons[idx];
            return (
              <div
                key={idx}
                className="bg-white p-7 rounded-2xl border border-[#e5e5df] shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-xl bg-[#f0f0eb] group-hover:bg-[#1a1c22] group-hover:text-white transition-colors flex items-center justify-center text-[#1a1c22]">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-[#8a8a84] font-semibold">0{idx + 1}</span>
                  </div>

                  <div className="font-serif-luxury text-4xl sm:text-5xl font-bold text-[#1a1c22] mb-3 tracking-tight">
                    {language === 'ru' ? item.number : item.numberKg}
                  </div>

                  <p className="text-sm font-medium text-[#2d2e33] leading-snug mb-3">
                    {language === 'ru' ? item.labelRu : item.labelKg}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#f0f0eb] flex items-center justify-between text-xs text-[#71716b]">
                  <span>{language === 'ru' ? item.subtextRu : item.subtextKg}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

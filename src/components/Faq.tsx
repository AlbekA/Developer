import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDown, HelpCircle, Shield, Award, Sparkles } from 'lucide-react';

export const Faq: React.FC = () => {
  const { language } = useLanguage();
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-24 bg-[#f4f4f0] border-b border-[#e2e2dc]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-[#71716b] font-semibold block mb-2">
            {language === 'ru' ? 'ОТВЕТЫ ЮРИСТА И ГИП' : 'ЮРИСТ ЖАНА ИНЖЕНЕРДИН ЖООПТОРУ'}
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#1a1c22] font-semibold tracking-tight mb-4">
            {language === 'ru' ? 'Часто задаваемые вопросы' : 'Көп берилүүчү суроолор'}
          </h2>
          <p className="text-sm text-[#5a5b57] max-w-xl mx-auto">
            {language === 'ru'
              ? '6 острых и ключевых вопросов покупателей недвижимости в Оше с исчерпывающими техническими и юридическими ответами.'
              : 'Ош шаарындагы кыймылсыз мүлк алуучулардын негизги 6 курч суроосуна толук жооптор.'}
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? 'border-[#1a1c22] shadow-sm' : 'border-[#e2e2dc]'
                }`}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-serif-luxury text-base sm:text-lg font-bold text-[#1a1c22] leading-snug">
                    {language === 'ru' ? item.questionRu : item.questionKg}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border border-[#e2e2dc] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#1a1c22] text-white border-[#1a1c22]' : 'text-[#71716b]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-7 sm:px-7 pt-0 text-xs sm:text-sm text-[#4a4b47] leading-relaxed border-t border-[#f7f7f4] mt-1">
                    <div className="pt-4">{language === 'ru' ? item.answerRu : item.answerKg}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

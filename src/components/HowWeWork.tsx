import React from 'react';
import { WORK_STEPS } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import { Compass, FileSearch, ShieldCheck, KeyRound, CheckCircle } from 'lucide-react';

interface HowWeWorkProps {
  onOpenTourModal: () => void;
}

export const HowWeWork: React.FC<HowWeWorkProps> = ({ onOpenTourModal }) => {
  const { language } = useLanguage();

  const stepIcons = [Compass, FileSearch, ShieldCheck, CheckCircle, KeyRound];

  return (
    <section className="py-24 bg-[#f4f4f0] border-b border-[#e2e2dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#deded8]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#71716b] font-semibold block mb-2">
              {language === 'ru' ? 'ПРОЗРАЧНЫЙ ПРОЦЕСС' : 'АЧЫК-АЙКЫН ПРОЦЕСС'}
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#1a1c22] font-semibold tracking-tight">
              {language === 'ru' ? 'От выбора до новоселья за 5 шагов' : 'Тандоодон көчүп кирүүгө чейин 5 кадам'}
            </h2>
          </div>
          <button
            onClick={onOpenTourModal}
            className="mt-4 md:mt-0 px-6 py-2.5 rounded-full bg-[#1a1c22] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            {language === 'ru' ? 'Записаться на шаг №1' : '1-кадамга жазылуу'}
          </button>
        </div>

        {/* 5 Steps Linear Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative">
          {WORK_STEPS.map((step, idx) => {
            const Icon = stepIcons[idx];
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#e2e2dc] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-serif-luxury font-bold text-amber-600">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#f7f7f4] group-hover:bg-[#1a1c22] group-hover:text-amber-400 transition-colors flex items-center justify-center text-[#2d2e33]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif-luxury text-lg font-bold text-[#1a1c22] mb-3 leading-snug">
                    {language === 'ru' ? step.titleRu : step.titleKg}
                  </h3>

                  <p className="text-xs text-[#5a5b57] leading-relaxed mb-6">
                    {language === 'ru' ? step.descriptionRu : step.descriptionKg}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#f0f0eb] flex items-center text-[11px] text-[#888882] font-medium">
                  <span>{language === 'ru' ? `Этап ${idx + 1} из 5` : `5тен ${idx + 1}-баскыч`}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

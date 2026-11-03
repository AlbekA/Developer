import React, { useState } from 'react';
import { ResidentialComplex } from '../types';
import { RESIDENTIAL_COMPLEXES } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Calendar, Building, MessageCircle, Eye, ShieldCheck, Sparkles } from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface CatalogProps {
  onSelectComplexForLayouts: (complex: ResidentialComplex) => void;
}

export const Catalog: React.FC<CatalogProps> = ({ onSelectComplexForLayouts }) => {
  const { language, currency, formatPriceSqm } = useLanguage();
  const [filterArea, setFilterArea] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredComplexes = RESIDENTIAL_COMPLEXES.filter((c) => {
    if (filterArea !== 'all' && c.locationArea !== filterArea) return false;
    if (filterStatus !== 'all' && c.status !== filterStatus) return false;
    return true;
  });

  return (
    <section id="catalog" className="py-24 bg-[#fafaf8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section matching reference image */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#e2e2dc]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#71716b] font-semibold block mb-2">
              {language === 'ru' ? 'КАТАЛОГ ОБЪЕКТОВ' : 'ОБЪЕКТИЛЕР КАТАЛОГУ'}
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#1a1c22] font-semibold tracking-tight">
              {language === 'ru' ? 'Жилые комплексы в Оше' : 'Ош шаарындагы турак жай комплекстери'}
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm text-[#5a5b57] max-w-sm">
            {language === 'ru'
              ? 'Выберите подходящий район и класс жилья. Все дома с «Красной книгой» и гарантией 9 баллов сейсмостойкости.'
              : 'Ыңгайлуу районду жана турак жайдын классын тандаңыз. Бардык үйлөр Кызыл китеп жана 9 балл кепилдиги менен.'}
          </p>
        </div>

        {/* Filter Pills matching reference image */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10">
          <button
            onClick={() => {
              setFilterArea('all');
              setFilterStatus('all');
            }}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              filterArea === 'all' && filterStatus === 'all'
                ? 'bg-[#1a1c22] text-white shadow'
                : 'bg-white text-[#5a5b57] hover:bg-gray-100 border border-[#e2e2dc]'
            }`}
          >
            {language === 'ru' ? 'Все объекты' : 'Бардык объектилер'}
          </button>

          <button
            onClick={() => {
              setFilterArea('center');
              setFilterStatus('all');
            }}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              filterArea === 'center'
                ? 'bg-[#1a1c22] text-white shadow'
                : 'bg-white text-[#5a5b57] hover:bg-gray-100 border border-[#e2e2dc]'
            }`}
          >
            {language === 'ru' ? 'Центр / Масалиева' : 'Борбор / Масалиев'}
          </button>

          <button
            onClick={() => {
              setFilterArea('yugo-vostok');
              setFilterStatus('all');
            }}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              filterArea === 'yugo-vostok'
                ? 'bg-[#1a1c22] text-white shadow'
                : 'bg-white text-[#5a5b57] hover:bg-gray-100 border border-[#e2e2dc]'
            }`}
          >
            {language === 'ru' ? 'Юго-Восток' : 'Түштүк-Чыгыш'}
          </button>

          <button
            onClick={() => {
              setFilterArea('naberezhnaya');
              setFilterStatus('all');
            }}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              filterArea === 'naberezhnaya'
                ? 'bg-[#1a1c22] text-white shadow'
                : 'bg-white text-[#5a5b57] hover:bg-gray-100 border border-[#e2e2dc]'
            }`}
          >
            {language === 'ru' ? 'Набережная Ак-Буура' : 'Ак-Буура жээги'}
          </button>

          <button
            onClick={() => {
              setFilterArea('all');
              setFilterStatus('ready');
            }}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              filterStatus === 'ready'
                ? 'bg-emerald-700 text-white shadow'
                : 'bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-300'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {language === 'ru' ? 'Сданные (Готовые)' : 'Бүткөн (Даяр)'}
            </span>
          </button>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredComplexes.map((complex) => {
            const waText =
              language === 'ru'
                ? `Здравствуйте! Интересует наличие и планировки в ${complex.name} в городе Ош. Отправьте актуальную шахматку.`
                : `Саламатсызбы! Ош шаарындагы ${complex.name} боюнча бош батирлер жана баалар тууралуу маалымат жөнөтүңүзчү.`;
            const waUrl = getWhatsAppUrl(waText);

            return (
              <div
                key={complex.id}
                className="bg-white rounded-2xl border border-[#e2e2dc] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={complex.image}
                      alt={complex.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Badge */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      {complex.badge && (
                        <span className="px-3 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-full bg-black/75 backdrop-blur-md text-white border border-white/20">
                          {complex.badge}
                        </span>
                      )}
                      <span className="px-3 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-full bg-amber-400 text-gray-950">
                        {language === 'ru' ? complex.classLabelRu : complex.classLabelKg}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[11px] flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-300" />
                      <span>{language === 'ru' ? complex.completionRu : complex.completionKg}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-[#71716b] mb-2 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-600" />
                        {language === 'ru' ? complex.districtRu : complex.districtKg}
                      </span>
                      <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        9 баллов
                      </span>
                    </div>

                    <h3 className="font-serif-luxury text-2xl font-bold text-[#1a1c22] mb-2 group-hover:text-amber-800 transition-colors">
                      {complex.name}
                    </h3>

                    <p className="text-xs text-[#5a5b57] leading-relaxed line-clamp-2 mb-4">
                      {language === 'ru' ? complex.descriptionRu : complex.descriptionKg}
                    </p>

                    {/* Micro specs */}
                    <div className="bg-[#f7f7f4] rounded-xl p-3 text-[11px] text-[#4a4b47] space-y-1 mb-4 border border-[#ecece6]">
                      <div className="flex justify-between">
                        <span className="text-[#888882]">Сейсмостойкость:</span>
                        <span className="font-semibold text-gray-900">{complex.specs.seismic}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#888882]">Паркинг:</span>
                        <span className="font-semibold text-gray-900">{complex.specs.parking}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#888882]">Этажность:</span>
                        <span className="font-semibold text-gray-900">{complex.floors} этажей</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Price & Action Buttons */}
                <div className="p-6 pt-0 border-t border-[#f0f0eb]">
                  <div className="py-4 flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] text-[#888882] block uppercase tracking-wider">
                        {language === 'ru' ? 'Стоимость за метр' : 'Чарчы метр баасы'}
                      </span>
                      <span className="text-xl font-bold text-[#1a1c22] font-mono">
                        {formatPriceSqm(complex.priceUsdPerSqm)}
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-medium">
                      {language === 'ru' ? 'Рассрочка 0%' : '0% бөлүп төлөө'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectComplexForLayouts(complex)}
                      className="py-2.5 px-3 rounded-xl bg-[#1a1c22] hover:bg-black text-white text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{language === 'ru' ? 'Планировки' : 'Пландоолор'}</span>
                    </button>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{language === 'ru' ? 'В WhatsApp' : 'WhatsApp'}</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

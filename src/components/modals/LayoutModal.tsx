import React, { useState } from 'react';
import { ResidentialComplex, Layout } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useDialogHistory } from '../../context/DialogHistoryContext';
import { X, Check, MessageCircle, MapPin, Layers, Maximize2 } from 'lucide-react';
import { openWhatsApp } from '../../utils/whatsapp';

interface LayoutModalProps {
  complex: ResidentialComplex | null;
  onClose: () => void;
}

export const LayoutModal: React.FC<LayoutModalProps> = ({ complex, onClose }) => {
  const { language, formatPrice } = useLanguage();
  const { addDialog } = useDialogHistory();

  if (!complex) return null;

  const [selectedLayoutId, setSelectedLayoutId] = useState<string>(
    complex.layouts[0]?.id || ''
  );

  const selectedLayout =
    complex.layouts.find((l) => l.id === selectedLayoutId) || complex.layouts[0];

  const handleBookLayoutInWhatsApp = () => {
    if (!selectedLayout) return;

    const waText =
      language === 'ru'
        ? `Здравствуйте! Хочу забронировать планировку в ${complex.name} (г. Ош). Параметры: ${selectedLayout.roomsLabelRu}, площадь ${selectedLayout.areaSqm} м², этаж ${selectedLayout.floor}, стоимость ~$${selectedLayout.priceUsd.toLocaleString()}. Подтвердите наличие.`
        : `Саламатсызбы! Ош шаарындагы ${complex.name} боюнча ${selectedLayout.roomsLabelKg} (${selectedLayout.areaSqm} м², ${selectedLayout.floor}) батирин ээлеп коюуну каалайм. Баасы ~$${selectedLayout.priceUsd.toLocaleString()}. Бош экендигин тастыктап бериңизчи.`;

    // Save strictly to dialog history (maintains last two dialogs)
    addDialog({
      type: 'plan_request',
      typeLabelRu: `Бронь планировки: ${complex.name}`,
      typeLabelKg: `Пландоону ээлөө: ${complex.name}`,
      contactName: 'Посетитель сайта',
      phone: 'WhatsApp',
      details: {
        complexName: complex.name,
        rooms: `${selectedLayout.roomsLabelRu} (${selectedLayout.areaSqm} м²)`,
        district: complex.districtRu,
        comments: `Этаж: ${selectedLayout.floor}, Стоимость: $${selectedLayout.priceUsd.toLocaleString()}`
      },
      status: 'sent_whatsapp'
    });

    openWhatsApp(waText);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-[#e2e2dc] shadow-2xl relative flex flex-col justify-between">
        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-[#f0f0eb] flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{language === 'ru' ? complex.districtRu : complex.districtKg}</span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1a1c22]">
              {language === 'ru' ? `Планировки в ${complex.name}` : `${complex.name} пландоолору`}
            </h3>
            <span className="text-xs text-[#71716b]">{complex.addressRu}</span>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#f4f4f0] hover:bg-[#e8e8e4] text-[#1a1c22] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Layout Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {complex.layouts.map((l) => (
              <button
                key={l.id}
                onClick={() => setSelectedLayoutId(l.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedLayout?.id === l.id
                    ? 'bg-[#1a1c22] text-white shadow-md'
                    : 'bg-[#f4f4f0] text-[#5a5b57] hover:bg-[#ecece8]'
                }`}
              >
                {language === 'ru' ? l.roomsLabelRu : l.roomsLabelKg} ({l.areaSqm} м²)
              </button>
            ))}
          </div>

          {selectedLayout && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#fafaf8] p-6 rounded-2xl border border-[#ecece6]">
              {/* Floor Plan Render Visual */}
              <div className="md:col-span-7 bg-white rounded-xl p-4 border border-[#e2e2dc] shadow-sm relative group overflow-hidden">
                <img
                  src={selectedLayout.planImage}
                  alt={selectedLayout.roomsLabelRu}
                  className="w-full h-64 sm:h-80 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-6 left-6 px-3 py-1 rounded-md bg-black/75 backdrop-blur-md text-white text-xs font-semibold">
                  {selectedLayout.areaSqm} м²
                </div>
              </div>

              {/* Specs & Pricing */}
              <div className="md:col-span-5 space-y-5">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#888882] block mb-1">
                    {language === 'ru' ? 'Характеристики планировки' : 'Пландоонун мүнөздөмөсү'}
                  </span>
                  <div className="font-serif-luxury text-2xl font-bold text-[#1a1c22]">
                    {language === 'ru' ? selectedLayout.roomsLabelRu : selectedLayout.roomsLabelKg}
                  </div>
                  <span className="text-xs text-[#71716b]">{selectedLayout.floor}</span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#e2e2dc] shadow-sm">
                  <span className="text-[11px] text-[#888882] uppercase tracking-wider block">
                    {language === 'ru' ? 'Ориентировочная стоимость' : 'Болжолдуу баасы'}
                  </span>
                  <div className="font-serif-luxury text-2xl font-bold text-amber-700 font-mono">
                    {formatPrice(selectedLayout.priceUsd)}
                  </div>
                  <span className="text-[11px] text-emerald-700 font-semibold block mt-1">
                    {language === 'ru' ? 'Доступна рассрочка 0% до сдачи' : 'Үй бүткөнгө чейин 0% бөлүп төлөө'}
                  </span>
                </div>

                {/* Features list */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1a1c22] block">
                    {language === 'ru' ? 'Особенности квартиры:' : 'Батирдин өзгөчөлүктөрү:'}
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#4a4b47]">
                    {selectedLayout.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA inside modal */}
                <button
                  onClick={handleBookLayoutInWhatsApp}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{language === 'ru' ? 'Забронировать в WhatsApp' : 'WhatsApp аркылуу ээлөө'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-[#f7f7f4] border-t border-[#f0f0eb] flex items-center justify-between text-xs text-[#71716b]">
          <span>
            {language === 'ru'
              ? 'Наличие и этажность уточняйте в отделе продаж'
              : 'Батирлердин калгандыгын сатуу бөлүмүнөн тактаңыз'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white border border-[#e2e2dc] text-[#1a1c22] font-semibold hover:bg-gray-50"
          >
            {language === 'ru' ? 'Закрыть' : 'Жабуу'}
          </button>
        </div>
      </div>
    </div>
  );
};

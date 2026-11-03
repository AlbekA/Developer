import React from 'react';
import { OSH_OFFICE_DETAILS } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Clock, Phone, MessageCircle, Send, Coffee, Car, Navigation } from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';

export const Contacts: React.FC = () => {
  const { language } = useLanguage();

  const waUrl = getWhatsAppUrl(
    language === 'ru'
      ? 'Здравствуйте! Хочу подъехать в офис продаж ORDO в городе Ош на проспекте Масалиева. Подскажите, как удобнее припарковаться?'
      : 'Саламатсызбы! Масалиев кең көчөсүндөгү ORDO сатуу кеңсесине баргым келет. Паркинг боюнча багыт берип коёсузбу?'
  );

  return (
    <section id="contacts" className="py-24 bg-[#fafaf8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#e2e2dc]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#71716b] font-semibold block mb-2">
              {language === 'ru' ? 'ЛОКАЦИЯ И СВЯЗЬ' : 'ЛОКАЦИЯ ЖАНА БАЙЛАНЫШ'}
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#1a1c22] font-semibold tracking-tight">
              {language === 'ru' ? 'Офис продаж в городе Ош' : 'Ош шаарындагы сатуу кеңсеси'}
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-[#5a5b57] max-w-sm">
            {language === 'ru'
              ? 'Ждем вас на чашку ароматного кофе или горного чая. Покажем все макеты, образцы кирпича и оригиналы документов.'
              : 'Келип ысык чай же кофе ичип, долбоорлордун макеттерин жана документтердин түп нускасын көрүңүз.'}
          </p>
        </div>

        {/* 2-Column Layout: Details + Interactive 2GIS Styled Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Details & Direct buttons (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-[#e2e2dc] shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              {/* Address item */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#f7f7f4] flex items-center justify-center text-amber-700 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#888882] block mb-1">
                    {language === 'ru' ? 'Адрес главного офиса' : 'Башкы кеңсенин дареги'}
                  </span>
                  <div className="font-semibold text-base text-[#1a1c22]">
                    {language === 'ru' ? OSH_OFFICE_DETAILS.addressRu : OSH_OFFICE_DETAILS.addressKg}
                  </div>
                  <p className="text-xs text-[#5a5b57] mt-1">
                    {language === 'ru' ? OSH_OFFICE_DETAILS.landmarkRu : OSH_OFFICE_DETAILS.landmarkKg}
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#f7f7f4] flex items-center justify-center text-amber-700 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#888882] block mb-1">
                    {language === 'ru' ? 'Режим работы' : 'Иштөө тартиби'}
                  </span>
                  <div className="font-semibold text-sm text-[#1a1c22]">
                    {language === 'ru' ? OSH_OFFICE_DETAILS.workingHoursRu : OSH_OFFICE_DETAILS.workingHoursKg}
                  </div>
                </div>
              </div>

              {/* Phones */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#f7f7f4] flex items-center justify-center text-amber-700 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#888882] block mb-1">
                    {language === 'ru' ? 'Телефоны отдела продаж' : 'Сатуу бөлүмүнүн номерлери'}
                  </span>
                  <div className="flex flex-col gap-1 font-mono text-sm font-bold text-[#1a1c22]">
                    <a href={`tel:${OSH_OFFICE_DETAILS.phone1}`} className="hover:text-amber-700 transition-colors">
                      {OSH_OFFICE_DETAILS.phone1}
                    </a>
                    <a href={`tel:${OSH_OFFICE_DETAILS.phone2}`} className="hover:text-amber-700 transition-colors">
                      {OSH_OFFICE_DETAILS.phone2}
                    </a>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="pt-4 border-t border-[#f0f0eb] grid grid-cols-2 gap-3 text-xs text-[#5a5b57]">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'ru' ? 'Гостевая парковка' : 'Коноктук паркинг'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-amber-600" />
                  <span>{language === 'ru' ? 'Чай, кофе, демо-зал' : 'Чай, кофе, демо-зал'}</span>
                </div>
              </div>
            </div>

            {/* Direct Contact Buttons */}
            <div className="pt-8 border-t border-[#f0f0eb] space-y-3 mt-6">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp: {OSH_OFFICE_DETAILS.phone1}</span>
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${OSH_OFFICE_DETAILS.phone1}`}
                  className="py-3 px-3 rounded-xl bg-[#1a1c22] hover:bg-black text-white text-xs font-semibold tracking-wider uppercase text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Позвонить</span>
                </a>

                <a
                  href={`https://t.me/${OSH_OFFICE_DETAILS.telegramHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 rounded-xl bg-[#229ED9] hover:bg-[#1e8ec3] text-white text-xs font-semibold tracking-wider uppercase text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Telegram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive 2GIS styled Map Widget (7 cols) */}
          <div className="lg:col-span-7 bg-[#1a1c22] rounded-3xl overflow-hidden border border-[#e2e2dc] shadow-sm relative min-h-[440px] flex flex-col justify-between">
            {/* Map visual background with modern styled layout */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
                alt="Карта города Ош"
                className="w-full h-full object-cover filter contrast-[1.1] brightness-[0.5]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60" />
            </div>

            {/* Top Bar on Map */}
            <div className="relative z-10 p-6 flex items-center justify-between">
              <div className="bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white text-xs font-semibold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>2ГИС Ош: ORDO DEVELOPMENT</span>
              </div>
              <div className="bg-amber-400 text-gray-950 font-bold px-3 py-1 rounded-full text-xs shadow">
                4.9 ★★★★★
              </div>
            </div>

            {/* Central Marker */}
            <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center my-auto">
              <div className="relative mb-3 animate-bounce">
                <div className="w-14 h-14 rounded-full bg-amber-400 text-gray-950 flex items-center justify-center shadow-2xl border-4 border-white">
                  <MapPin className="w-7 h-7" />
                </div>
              </div>

              <div className="bg-black/85 backdrop-blur-md p-4 rounded-2xl border border-white/20 max-w-sm text-white shadow-2xl">
                <h4 className="font-serif-luxury text-base font-bold text-amber-300 mb-1">
                  Главный офис продаж ORDO
                </h4>
                <p className="text-xs text-white/80">
                  {language === 'ru' ? OSH_OFFICE_DETAILS.addressRu : OSH_OFFICE_DETAILS.addressKg}
                </p>
                <span className="text-[11px] text-white/50 block mt-1">
                  Ориентир: напротив ТЦ «Таатан»
                </span>
              </div>
            </div>

            {/* Bottom Actions on Map */}
            <div className="relative z-10 p-6 bg-gradient-to-t from-black/90 to-transparent flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-white/70">
                <span>{language === 'ru' ? 'Координаты: 40.5283° N, 72.7985° E' : 'Координаттары: 40.5283° N, 72.7985° E'}</span>
              </div>

              <a
                href="https://2gis.kg/osh"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-white text-gray-950 hover:bg-amber-400 font-semibold text-xs tracking-wider uppercase transition-colors flex items-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>{language === 'ru' ? 'Открыть маршрут в 2ГИС' : '2ГИС аркылуу маршрут ачуу'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

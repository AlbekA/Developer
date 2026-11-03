import React, { useState } from 'react';
import { PURCHASE_OPTIONS, USD_TO_KGS_RATE } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import { useDialogHistory } from '../context/DialogHistoryContext';
import { Check, Calculator, Sparkles, Car, Shield, MessageCircle, ArrowRight } from 'lucide-react';
import { getWhatsAppUrl, openWhatsApp } from '../utils/whatsapp';

export const PurchaseOptions: React.FC = () => {
  const { language, currency } = useLanguage();
  const { addDialog } = useDialogHistory();

  // Calculator State
  const [apartmentPriceUsd, setApartmentPriceUsd] = useState<number>(45000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [durationMonths, setDurationMonths] = useState<number>(30);

  const downPaymentAmountUsd = Math.round(apartmentPriceUsd * (downPaymentPercent / 100));
  const remainingAmountUsd = apartmentPriceUsd - downPaymentAmountUsd;
  const monthlyPaymentUsd = Math.round(remainingAmountUsd / durationMonths);

  const monthlyPaymentKgs = Math.round(monthlyPaymentUsd * USD_TO_KGS_RATE);
  const downPaymentKgs = Math.round(downPaymentAmountUsd * USD_TO_KGS_RATE);

  const handleSendCalculationToWhatsApp = () => {
    const text =
      language === 'ru'
        ? `Здравствуйте! Рассчитал условия рассрочки на сайте ORDO: Стоимость квартиры $${apartmentPriceUsd.toLocaleString()}, первый взнос ${downPaymentPercent}% ($${downPaymentAmountUsd.toLocaleString()}), срок ${durationMonths} мес. Ежемесячный платеж ~$${monthlyPaymentUsd.toLocaleString()}. Хочу зафиксировать условия.`
        : `Саламатсызбы! ORDO сайтынан бөлүп төлөөнү эсептедим: Батирдин баасы $${apartmentPriceUsd.toLocaleString()}, баштапкы төлөм ${downPaymentPercent}% ($${downPaymentAmountUsd.toLocaleString()}), мөөнөтү ${durationMonths} ай. Ай сайын ~$${monthlyPaymentUsd.toLocaleString()}. Шарттарды бекитүүнү каалайм.`;

    // Save dialog to history (maintains strict last 2 dialogs)
    addDialog({
      type: 'quiz',
      typeLabelRu: 'Расчет исламской рассрочки 0%',
      typeLabelKg: '0% бөлүп төлөө эсеби',
      contactName: 'Клиент (Калькулятор)',
      phone: 'WhatsApp',
      details: {
        paymentMethod: `Рассрочка 0% на ${durationMonths} мес.`,
        comments: `Стоимость $${apartmentPriceUsd.toLocaleString()}, первый взнос ${downPaymentPercent}% ($${downPaymentAmountUsd.toLocaleString()}), ежемесячно $${monthlyPaymentUsd.toLocaleString()}`
      },
      status: 'sent_whatsapp'
    });

    openWhatsApp(text);
  };

  return (
    <section id="purchase" className="py-24 bg-[#fafaf8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#e2e2dc]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#71716b] font-semibold block mb-2">
              {language === 'ru' ? 'ГИБКИЕ ФИНАНСОВЫЕ УСЛОВИЯ' : 'ЫҢГАЙЛУУ КАРЖЫЛОО ШАРТТАРЫ'}
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#1a1c22] font-semibold tracking-tight">
              {language === 'ru' ? '3 прозрачных сценария покупки' : 'Сатып алуунун 3 ачык-айкын варианты'}
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-[#5a5b57] max-w-md">
            {language === 'ru'
              ? 'Никаких скрытых платежей, комиссий и банковских процентов. Прямой договор с застройщиком с фиксацией цены в день обращения.'
              : 'Эч кандай жашыруун комиссиялар же банктык пайыздар жок. Девелопер менен түздөн-түз келишим.'}
          </p>
        </div>

        {/* 3 Purchase Options Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {PURCHASE_OPTIONS.map((opt) => (
            <div
              key={opt.id}
              className={`rounded-3xl p-8 transition-all flex flex-col justify-between border ${
                opt.isPopular
                  ? 'bg-[#181a1f] text-white border-amber-400/40 shadow-2xl relative'
                  : 'bg-white text-[#1a1c22] border-[#e2e2dc] shadow-sm'
              }`}
            >
              {opt.isPopular && (
                <div className="absolute -top-3.5 left-8 px-4 py-1 rounded-full bg-amber-400 text-gray-950 text-xs font-bold uppercase tracking-wider shadow">
                  {language === 'ru' ? opt.tagRu : opt.tagKg}
                </div>
              )}

              <div>
                {!opt.isPopular && (
                  <span className="text-xs uppercase tracking-wider font-semibold text-amber-700 block mb-2">
                    {language === 'ru' ? opt.tagRu : opt.tagKg}
                  </span>
                )}

                <h3 className="font-serif-luxury text-2xl font-bold mb-2">
                  {language === 'ru' ? opt.titleRu : opt.titleKg}
                </h3>

                <div
                  className={`text-sm font-semibold mb-4 ${
                    opt.isPopular ? 'text-amber-300' : 'text-emerald-700'
                  }`}
                >
                  {language === 'ru' ? opt.highlightRu : opt.highlightKg}
                </div>

                <p
                  className={`text-xs leading-relaxed mb-6 ${
                    opt.isPopular ? 'text-white/70' : 'text-[#5a5b57]'
                  }`}
                >
                  {language === 'ru' ? opt.descriptionRu : opt.descriptionKg}
                </p>

                <ul className="space-y-3 pt-4 border-t border-current/10 mb-8 text-xs">
                  {(language === 'ru' ? opt.benefitsRu : opt.benefitsKg).map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <Check
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          opt.isPopular ? 'text-amber-400' : 'text-emerald-600'
                        }`}
                      />
                      <span className={opt.isPopular ? 'text-white/85' : 'text-[#3a3b37]'}>
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <button
                  onClick={() => {
                    const waText =
                      language === 'ru'
                        ? `Здравствуйте! Хочу узнать подробнее об условиях: ${opt.titleRu} в ORDO DEVELOPMENT (г. Ош).`
                        : `Саламатсызбы! ORDO DEVELOPMENT (Ош ш.) боюнча ${opt.titleKg} шарттары тууралуу кеңири билгим келет.`;
                    openWhatsApp(waText);
                  }}
                  className={`w-full py-3.5 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                    opt.isPopular
                      ? 'bg-amber-400 hover:bg-amber-300 text-gray-950'
                      : 'bg-[#1a1c22] hover:bg-black text-white'
                  }`}
                >
                  <span>{language === 'ru' ? 'Выбрать этот сценарий' : 'Ушул вариантты тандоо'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Installment Calculator */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#e2e2dc] shadow-sm">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Controls */}
            <div className="w-full lg:w-7/12 space-y-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-amber-700">
                <Calculator className="w-4 h-4" />
                <span>
                  {language === 'ru' ? 'Калькулятор исламской рассрочки 0%' : '0% исламдык бөлүп төлөө калькулятору'}
                </span>
              </div>

              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1a1c22]">
                {language === 'ru'
                  ? 'Рассчитайте ежемесячный платеж без банковских процентов'
                  : 'Банктык пайыздарсыз ай сайын төлөмдү эсептеңиз'}
              </h3>

              {/* Slider 1: Apartment Price */}
              <div>
                <div className="flex justify-between text-sm font-semibold text-[#1a1c22] mb-2">
                  <span>{language === 'ru' ? 'Стоимость квартиры' : 'Батирдин баасы'}</span>
                  <span className="font-mono text-base text-amber-700 font-bold">
                    ${apartmentPriceUsd.toLocaleString()} / {(apartmentPriceUsd * USD_TO_KGS_RATE).toLocaleString()} сом
                  </span>
                </div>
                <input
                  type="range"
                  min="25000"
                  max="140000"
                  step="1000"
                  value={apartmentPriceUsd}
                  onChange={(e) => setApartmentPriceUsd(Number(e.target.value))}
                  className="w-full h-2 bg-[#e5e5df] rounded-lg appearance-none cursor-pointer accent-[#1a1c22]"
                />
                <div className="flex justify-between text-[11px] text-[#888882] mt-1">
                  <span>$25 000 (1-комн.)</span>
                  <span>$60 000 (2-3-комн.)</span>
                  <span>$140 000 (Пентхаус)</span>
                </div>
              </div>

              {/* Slider 2: Down payment percent */}
              <div>
                <div className="flex justify-between text-sm font-semibold text-[#1a1c22] mb-2">
                  <span>{language === 'ru' ? 'Первоначальный взнос' : 'Баштапкы төлөм'}</span>
                  <span className="font-mono text-base text-amber-700 font-bold">
                    {downPaymentPercent}% (${downPaymentAmountUsd.toLocaleString()})
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-2">
                  {[30, 40, 50].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setDownPaymentPercent(pct)}
                      className={`py-2 text-xs rounded-xl font-bold border transition-all ${
                        downPaymentPercent === pct
                          ? 'bg-[#1a1c22] text-white border-[#1a1c22]'
                          : 'bg-[#f7f7f4] text-[#4a4b47] border-[#e2e2dc] hover:bg-white'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider 3: Duration */}
              <div>
                <div className="flex justify-between text-sm font-semibold text-[#1a1c22] mb-2">
                  <span>{language === 'ru' ? 'Срок рассрочки (до сдачи дома)' : 'Бөлүп төлөө мөөнөтү'}</span>
                  <span className="font-mono text-base text-amber-700 font-bold">
                    {durationMonths} {language === 'ru' ? 'месяцев' : 'ай'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[18, 24, 36].map((months) => (
                    <button
                      key={months}
                      type="button"
                      onClick={() => setDurationMonths(months)}
                      className={`py-2 text-xs rounded-xl font-bold border transition-all ${
                        durationMonths === months
                          ? 'bg-[#1a1c22] text-white border-[#1a1c22]'
                          : 'bg-[#f7f7f4] text-[#4a4b47] border-[#e2e2dc] hover:bg-white'
                      }`}
                    >
                      {months} {language === 'ru' ? 'мес.' : 'ай'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Box */}
            <div className="w-full lg:w-5/12 bg-[#181a1f] text-white rounded-2xl p-7 border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold block mb-1">
                  {language === 'ru' ? 'ИТОГОВЫЙ РАСЧЕТ' : 'ЖЫЙЫНТЫК ЭСЕП'}
                </span>
                <div className="text-sm text-white/70 mb-6">
                  {language === 'ru'
                    ? '0% переплат • 0 сом скрытых комиссий'
                    : '0% ашыкча төлөм • 0 сом жашыруун комиссия'}
                </div>

                <div className="space-y-4 mb-6">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[11px] text-white/60 block">
                      {language === 'ru' ? 'Ежемесячный платеж:' : 'Ай сайын төлөм:'}
                    </span>
                    <span className="text-3xl font-serif-luxury font-bold text-amber-300">
                      ${monthlyPaymentUsd.toLocaleString()}
                    </span>
                    <span className="text-xs text-white/60 block mt-0.5">
                      (~ {monthlyPaymentKgs.toLocaleString()} сом/мес.)
                    </span>
                  </div>

                  <div className="flex justify-between text-xs py-2 border-b border-white/10">
                    <span className="text-white/60">{language === 'ru' ? 'Первоначальный взнос:' : 'Баштапкы төлөм:'}</span>
                    <span className="font-semibold text-white">
                      ${downPaymentAmountUsd.toLocaleString()} ({downPaymentKgs.toLocaleString()} сом)
                    </span>
                  </div>

                  <div className="flex justify-between text-xs py-2 border-b border-white/10">
                    <span className="text-white/60">{language === 'ru' ? 'Остаток в рассрочку:' : 'Бөлүп төлөнүүчү калдык:'}</span>
                    <span className="font-semibold text-white">${remainingAmountUsd.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-xs py-2">
                    <span className="text-white/60">{language === 'ru' ? 'Ставка переплаты:' : 'Үстөк пайызы:'}</span>
                    <span className="font-bold text-emerald-400">0.0% (Исламские стандарты)</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSendCalculationToWhatsApp}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{language === 'ru' ? 'Зафиксировать условия в WhatsApp' : 'Шарттарды WhatsApp аркылуу бекитүү'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

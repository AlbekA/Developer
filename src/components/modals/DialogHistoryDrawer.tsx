import React from 'react';
import { useDialogHistory } from '../../context/DialogHistoryContext';
import { useLanguage } from '../../context/LanguageContext';
import { X, Clock, MessageCircle, Trash2, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { openWhatsApp } from '../../utils/whatsapp';

export const DialogHistoryDrawer: React.FC = () => {
  const { dialogs, isHistoryOpen, closeHistory, removeDialog, clearHistory } = useDialogHistory();
  const { language } = useLanguage();

  if (!isHistoryOpen) return null;

  const handleResumeDialogInWhatsApp = (d: any) => {
    const text =
      language === 'ru'
        ? `Здравствуйте! Продолжаю диалог по моей заявке в ORDO (${d.typeLabelRu}). Мое имя: ${d.contactName}. Параметры: ${JSON.stringify(d.details)}`
        : `Саламатсызбы! ORDO боюнча мурунку кайрылуумду улантам (${d.typeLabelKg}). Атым: ${d.contactName}. Параметрлер: ${JSON.stringify(d.details)}`;
    openWhatsApp(text);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeHistory}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#e2e2dc]">
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#f0f0eb] bg-[#fafaf8] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-800 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-[#1a1c22]">
                  {language === 'ru' ? 'История диалогов' : 'Диалог тарыхы'}
                </h3>
                <span className="text-xs text-[#71716b]">
                  {language === 'ru' ? 'Сохраняются последние 2 обращения' : 'Акыркы 2 кайрылуу сакталат'}
                </span>
              </div>
            </div>

            <button
              onClick={closeHistory}
              className="w-9 h-9 rounded-full bg-white border border-[#e2e2dc] text-[#1a1c22] flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                {language === 'ru'
                  ? 'В истории хранятся строго 2 ваших последних запроса для быстрого продолжения связи с застройщиком.'
                  : 'Девелопер менен тез байланышуу үчүн тарыхта акыркы 2 кайрылууңуз гана сакталат.'}
              </span>
            </div>

            {dialogs.length === 0 ? (
              <div className="py-16 text-center text-xs text-[#888882] space-y-2">
                <Clock className="w-8 h-8 mx-auto text-[#ccc]" />
                <p>
                  {language === 'ru'
                    ? 'История пуста. Пройдите квиз или запишитесь на экскурсию, чтобы сохранить диалог.'
                    : 'Тарых бош. Диалогду сактоо үчүн квизден өтүңүз же экскурсияга жазылыңыз.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {dialogs.map((d, index) => (
                  <div
                    key={d.id}
                    className="p-5 rounded-2xl border border-[#e2e2dc] bg-[#fafaf8] shadow-sm space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                        {language === 'ru' ? d.typeLabelRu : d.typeLabelKg}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-[#888882]">{d.timestamp}</span>
                        <button
                          onClick={() => removeDialog(d.id)}
                          className="text-gray-400 hover:text-rose-600 transition-colors p-1"
                          title="Удалить запись"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-[#3a3b37]">
                      {d.contactName && (
                        <div className="flex justify-between">
                          <span className="text-[#888882]">Имя:</span>
                          <span className="font-semibold text-gray-900">{d.contactName}</span>
                        </div>
                      )}
                      {d.phone && (
                        <div className="flex justify-between">
                          <span className="text-[#888882]">Телефон:</span>
                          <span className="font-mono text-gray-900">{d.phone}</span>
                        </div>
                      )}
                      {d.details.complexName && (
                        <div className="flex justify-between">
                          <span className="text-[#888882]">ЖК:</span>
                          <span className="font-semibold text-amber-900">{d.details.complexName}</span>
                        </div>
                      )}
                      {d.details.rooms && (
                        <div className="flex justify-between">
                          <span className="text-[#888882]">Планировка:</span>
                          <span className="font-semibold text-gray-900">{d.details.rooms}</span>
                        </div>
                      )}
                      {d.details.district && (
                        <div className="flex justify-between">
                          <span className="text-[#888882]">Район:</span>
                          <span className="font-semibold text-gray-900">{d.details.district}</span>
                        </div>
                      )}
                      {d.details.paymentMethod && (
                        <div className="flex justify-between">
                          <span className="text-[#888882]">Оплата:</span>
                          <span className="font-semibold text-emerald-700">{d.details.paymentMethod}</span>
                        </div>
                      )}
                      {d.details.preferredDate && (
                        <div className="flex justify-between">
                          <span className="text-[#888882]">Время визита:</span>
                          <span className="font-semibold text-gray-900">{d.details.preferredDate}</span>
                        </div>
                      )}
                      {d.details.comments && (
                        <div className="pt-1 text-[11px] text-[#555] italic">
                          "{d.details.comments}"
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-[#ecece6] flex items-center justify-between">
                      <span className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {language === 'ru' ? 'Активный диалог' : 'Аракеттеги диалог'}
                      </span>

                      <button
                        onClick={() => handleResumeDialogInWhatsApp(d)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <MessageCircle className="w-3 h-3 fill-current" />
                        <span>{language === 'ru' ? 'В WhatsApp' : 'WhatsAppка'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-5 border-t border-[#f0f0eb] bg-[#fafaf8] flex items-center justify-between">
            {dialogs.length > 0 ? (
              <button
                onClick={clearHistory}
                className="text-xs text-rose-600 hover:text-rose-800 font-semibold"
              >
                {language === 'ru' ? 'Очистить историю' : 'Тарыхты тазалоо'}
              </button>
            ) : (
              <span className="text-xs text-[#888882]">Свободно мест: 2</span>
            )}

            <button
              onClick={closeHistory}
              className="px-5 py-2.5 rounded-xl bg-[#1a1c22] text-white text-xs font-semibold hover:bg-black transition-colors"
            >
              {language === 'ru' ? 'Закрыть' : 'Жабуу'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

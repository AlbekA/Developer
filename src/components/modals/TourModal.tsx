import React, { useState } from 'react';
import { RESIDENTIAL_COMPLEXES } from '../../data/content';
import { useLanguage } from '../../context/LanguageContext';
import { useDialogHistory } from '../../context/DialogHistoryContext';
import { X, Calendar, Car, MessageCircle, Check, MapPin } from 'lucide-react';
import { openWhatsApp } from '../../utils/whatsapp';

interface TourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TourModal: React.FC<TourModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const { addDialog } = useDialogHistory();

  const [selectedComplex, setSelectedComplex] = useState<string>(
    RESIDENTIAL_COMPLEXES[0].name
  );
  const [preferredDate, setPreferredDate] = useState<string>('Завтра в 14:00');
  const [needTransfer, setNeedTransfer] = useState<boolean>(true);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    // Save strictly into Dialog History (persists last two dialogs)
    addDialog({
      type: 'tour',
      typeLabelRu: 'Запись на экскурсию по объектам',
      typeLabelKg: 'Объектилерге экскурсияга жазылуу',
      contactName: name || 'Покупатель',
      phone,
      details: {
        complexName: selectedComplex,
        preferredDate,
        comments: needTransfer
          ? 'Требуется корпоративный трансфер из города Ош'
          : 'Подъедут на своем транспорте'
      },
      status: 'sent_whatsapp'
    });

    setIsSuccess(true);

    const waText =
      language === 'ru'
        ? `Здравствуйте! Записался на экскурсию по объектам ORDO DEVELOPMENT в городе Ош. Комплекс: ${selectedComplex}, Удобное время: ${preferredDate}, Трансфер: ${needTransfer ? 'Да, заберите меня' : 'Свой транспорт'}. Имя: ${name || 'Клиент'}, Телефон: ${phone}. Жду звонка менеджера!`
        : `Саламатсызбы! Ош шаарындагы ORDO DEVELOPMENT объектилерине экскурсияга жазылдым. Комплекс: ${selectedComplex}, Убактысы: ${preferredDate}, Трансфер: ${needTransfer ? 'Ооба, алып кетиңиздер' : 'Өзүм барам'}. Атым: ${name || 'Кардар'}, Телефон: ${phone}. Менеджердин чалуусун күтөм!`;

    setTimeout(() => {
      openWhatsApp(waText);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden border border-[#e2e2dc] shadow-2xl relative">
        {/* Header */}
        <div className="p-6 sm:p-7 border-b border-[#f0f0eb] flex items-center justify-between bg-[#fafaf8]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-gray-950 flex items-center justify-center font-bold text-xs">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-[#1a1c22]">
                {language === 'ru' ? 'Запись на экскурсию' : 'Экскурсияга жазылуу'}
              </h3>
              <span className="text-[11px] text-[#71716b]">г. Ош • Бесплатный трансфер</span>
            </div>
          </div>

          <button
            onClick={() => {
              setIsSuccess(false);
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-[#f0f0eb] hover:bg-[#e4e4e0] text-[#1a1c22] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5">
            <div>
              <label className="text-xs font-semibold text-[#1a1c22] block mb-1.5">
                {language === 'ru' ? 'Выберите жилой комплекс в Оше:' : 'Ош шаарындагы турак жайды тандаңыз:'}
              </label>
              <select
                value={selectedComplex}
                onChange={(e) => setSelectedComplex(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#f7f7f4] border border-[#e2e2dc] text-sm text-[#1a1c22] focus:outline-none focus:border-[#1a1c22]"
              >
                {RESIDENTIAL_COMPLEXES.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name} ({c.districtRu})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1a1c22] block mb-1.5">
                {language === 'ru' ? 'Удобная дата и время визита:' : 'Сизге ыңгайлуу күн жана убакыт:'}
              </label>
              <input
                type="text"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                placeholder="Например: Завтра в 15:00"
                className="w-full px-4 py-3 rounded-xl bg-[#f7f7f4] border border-[#e2e2dc] text-sm text-[#1a1c22] focus:outline-none focus:border-[#1a1c22]"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f7f7f4] border border-[#e2e2dc]">
              <div className="flex items-center gap-2.5">
                <Car className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-medium text-[#2d2e33]">
                  {language === 'ru' ? 'Забрать на авто компании из любой точки Оша' : 'Оштун каалаган жеринен унаа менен алып кетүү'}
                </span>
              </div>
              <input
                type="checkbox"
                checked={needTransfer}
                onChange={(e) => setNeedTransfer(e.target.checked)}
                className="w-4 h-4 accent-[#1a1c22] rounded cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#1a1c22] block mb-1.5">
                  {language === 'ru' ? 'Ваше имя:' : 'Сиздин атыңыз:'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Аскар"
                  className="w-full px-4 py-3 rounded-xl bg-[#f7f7f4] border border-[#e2e2dc] text-sm text-[#1a1c22] focus:outline-none focus:border-[#1a1c22]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1a1c22] block mb-1.5">
                  {language === 'ru' ? 'Телефон (WhatsApp): *' : 'Телефон номериңиз (WhatsApp): *'}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+996 555 00-00-00"
                  className="w-full px-4 py-3 rounded-xl bg-[#f7f7f4] border border-[#e2e2dc] text-sm text-[#1a1c22] focus:outline-none focus:border-[#1a1c22]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{language === 'ru' ? 'Подтвердить запись в WhatsApp' : 'WhatsApp аркылуу жазылууну бекитүү'}</span>
            </button>
          </form>
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <Check className="w-7 h-7" />
            </div>
            <h4 className="font-serif-luxury text-xl font-bold text-[#1a1c22]">
              {language === 'ru' ? 'Вы записаны на экскурсию!' : 'Сиз экскурсияга жазылдыңыз!'}
            </h4>
            <p className="text-xs text-[#5a5b57] leading-relaxed max-w-sm mx-auto">
              {language === 'ru'
                ? 'Диалог сохранен в вашей истории на сайте. Менеджер подготовит пропуск на стройплощадку и свяжется с вами.'
                : 'Диалог сайттагы тарыхыңызга сакталды. Менеджер курулушка уруксат даярдап, сиз менен байланышат.'}
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full bg-[#1a1c22] text-white text-xs font-semibold"
            >
              {language === 'ru' ? 'Закрыть' : 'Жабуу'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

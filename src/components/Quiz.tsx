import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useDialogHistory } from '../context/DialogHistoryContext';
import { Sparkles, ArrowRight, ArrowLeft, Check, Download, MessageCircle, FileSpreadsheet } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

export const Quiz: React.FC = () => {
  const { language } = useLanguage();
  const { addDialog } = useDialogHistory();

  const [step, setStep] = useState<number>(1);
  const [rooms, setRooms] = useState<string>('2-комнатная (65–88 м²)');
  const [district, setDistrict] = useState<string>('Центр / пр. Масалиева');
  const [payment, setPayment] = useState<string>('Беспроцентная рассрочка 0%');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const roomOptions = [
    { labelRu: '1-комнатная (42–56 м²)', labelKg: '1 бөлмөлүү (42–56 м²)', sub: 'Для молодой семьи или сдачи' },
    { labelRu: '2-комнатная (65–88 м²)', labelKg: '2 бөлмөлүү (65–88 м²)', sub: 'Самый популярный формат' },
    { labelRu: '3-комнатная (92–130 м²)', labelKg: '3 бөлмөлүү (92–130 м²)', sub: 'Простор для большой семьи' },
    { labelRu: 'Пентхаус с террасой (140+ м²)', labelKg: 'Террасалуу пентхаус (140+ м²)', sub: 'Премиальный вид на гору' }
  ];

  const districtOptions = [
    { labelRu: 'Центр / пр. Масалиева', labelKg: 'Борбор / Масалиев көч.', desc: 'Деловой ритм и престиж' },
    { labelRu: 'мкр. Юго-Восток', labelKg: 'Түштүк-Чыгыш к/р', desc: 'Свежий воздух и семейные дворы' },
    { labelRu: 'Набережная р. Ак-Буура / Ленина', labelKg: 'Ак-Буура дарыясынын жээги', desc: 'Первая линия, курортный вайб' },
    { labelRu: 'мкр. Анар / пр. Шакирова', labelKg: 'Анар к/р / Шакиров көч.', desc: 'Развитая городская среда' }
  ];

  const paymentOptions = [
    { labelRu: '100% оплата со скидкой', labelKg: '100% толук төлөм (арзандатуу менен)', bonus: 'Скидка до 10% + кладовка' },
    { labelRu: 'Беспроцентная рассрочка 0%', labelKg: '0% пайызсыз бөлүп төлөө', bonus: 'Взнос от 30%, до 36 мес.' },
    { labelRu: 'Бартер / Trade-In (авто или вторичка)', labelKg: 'Бартер / Унаага же эски үйгө алмашуу', bonus: 'Оценка авто за 24 часа' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientPhone.trim()) return;

    // Save strictly to Dialog History (persists last two dialogs)
    addDialog({
      type: 'quiz',
      typeLabelRu: 'Подбор планировки под бюджет (Квиз)',
      typeLabelKg: 'Бюджетке ылайык батир тандоо (Квиз)',
      contactName: clientName || 'Клиент с сайта',
      phone: clientPhone,
      details: {
        rooms,
        district,
        paymentMethod: payment,
        comments: 'Запрос на PDF-каталог со свободной шахматкой цен в WhatsApp'
      },
      status: 'sent_whatsapp'
    });

    setIsSubmitted(true);

    const waText =
      language === 'ru'
        ? `Здравствуйте! Прошел тест на подбор квартиры в ORDO DEVELOPMENT (г. Ош). Мои параметры: Комнаты: ${rooms}, Район: ${district}, Форма оплаты: ${payment}. Имя: ${clientName || 'Покупатель'}, Тел: ${clientPhone}. Жду PDF-каталог с шахматкой!`
        : `Саламатсызбы! ORDO DEVELOPMENT (Ош ш.) сайтынан тесттен өттүм. Бөлмө: ${rooms}, Район: ${district}, Төлөө түрү: ${payment}. Атым: ${clientName || 'Кардар'}, Тел: ${clientPhone}. Шахматкасы бар PDF-каталог күтөм!`;

    setTimeout(() => {
      openWhatsApp(waText);
    }, 400);
  };

  return (
    <section id="quiz" className="py-24 bg-[#111317] text-white relative overflow-hidden">
      {/* Background architectural glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-12 border border-white/10 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'ru' ? 'Экспресс-подбор за 1 минуту' : '1 мүнөттө батир тандоо'}</span>
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold tracking-tight mb-2">
              {language === 'ru'
                ? 'Подберите идеальную планировку под ваш бюджет'
                : 'Бюджетиңизге туура келген пландоону тандаңыз'}
            </h2>
            <p className="text-xs sm:text-sm text-white/70 max-w-lg mx-auto">
              {language === 'ru'
                ? 'Ответьте на 3 простых вопроса и получите персональную шахматку цен со скидками до $5 000 в WhatsApp.'
                : '3 жөнөкөй суроого жооп берип, WhatsApp аркылуу арзандатуулары бар жеке баалар шахматкасын алыңыз.'}
            </p>
          </div>

          {!isSubmitted ? (
            <div>
              {/* Progress Steps */}
              <div className="flex items-center justify-between max-w-xs mx-auto mb-10">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                        step === s
                          ? 'bg-amber-400 text-gray-950 shadow-lg'
                          : step > s
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white/10 text-white/50'
                      }`}
                    >
                      {step > s ? <Check className="w-4 h-4" /> : s}
                    </div>
                    {s < 3 && <div className="w-8 sm:w-12 h-0.5 bg-white/10" />}
                  </div>
                ))}
              </div>

              {/* Step 1: Rooms */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-amber-300 uppercase tracking-wider text-center mb-6">
                    {language === 'ru' ? 'Шаг 1: Сколько комнат вы ищете?' : '1-кадам: Канча бөлмөлүү батир издеп жатасыз?'}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {roomOptions.map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setRooms(opt.labelRu)}
                        className={`p-5 rounded-2xl border text-left transition-all ${
                          rooms === opt.labelRu
                            ? 'bg-white/15 border-amber-400 shadow-md'
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-serif-luxury text-lg font-bold text-white">
                            {language === 'ru' ? opt.labelRu : opt.labelKg}
                          </span>
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              rooms === opt.labelRu ? 'border-amber-400 bg-amber-400 text-gray-950' : 'border-white/30'
                            }`}
                          >
                            {rooms === opt.labelRu && <Check className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                        <span className="text-xs text-white/60">{opt.sub}</span>
                      </button>
                    ))}
                  </div>

                  <div className="pt-6 flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      className="px-8 py-3.5 rounded-full bg-white text-gray-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors flex items-center gap-2"
                    >
                      <span>{language === 'ru' ? 'Далее' : 'Андан ары'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: District */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-amber-300 uppercase tracking-wider text-center mb-6">
                    {language === 'ru' ? 'Шаг 2: Предпочтительный район в Оше?' : '2-кадам: Ош шаарынан кайсы районду каалайсыз?'}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {districtOptions.map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setDistrict(opt.labelRu)}
                        className={`p-5 rounded-2xl border text-left transition-all ${
                          district === opt.labelRu
                            ? 'bg-white/15 border-amber-400 shadow-md'
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-serif-luxury text-lg font-bold text-white">
                            {language === 'ru' ? opt.labelRu : opt.labelKg}
                          </span>
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              district === opt.labelRu ? 'border-amber-400 bg-amber-400 text-gray-950' : 'border-white/30'
                            }`}
                          >
                            {district === opt.labelRu && <Check className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                        <span className="text-xs text-white/60">{opt.desc}</span>
                      </button>
                    ))}
                  </div>

                  <div className="pt-6 flex justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="px-6 py-3 rounded-full bg-white/10 text-white text-xs font-semibold tracking-wider hover:bg-white/20 transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>{language === 'ru' ? 'Назад' : 'Артка'}</span>
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="px-8 py-3.5 rounded-full bg-white text-gray-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors flex items-center gap-2"
                    >
                      <span>{language === 'ru' ? 'Далее' : 'Андан ары'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment form and contacts */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-sm font-semibold text-amber-300 uppercase tracking-wider text-center">
                    {language === 'ru' ? 'Шаг 3: Форма оплаты и получение каталога' : '3-кадам: Төлөө түрү жана каталог алуу'}
                  </h3>

                  <div className="space-y-3">
                    {paymentOptions.map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setPayment(opt.labelRu)}
                        className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                          payment === opt.labelRu
                            ? 'bg-white/15 border-amber-400 shadow-md'
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-sm text-white">
                            {language === 'ru' ? opt.labelRu : opt.labelKg}
                          </div>
                          <span className="text-xs text-amber-300">{opt.bonus}</span>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                            payment === opt.labelRu ? 'border-amber-400 bg-amber-400 text-gray-950' : 'border-white/30'
                          }`}
                        >
                          {payment === opt.labelRu && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Contact Form */}
                  <form onSubmit={handleSubmit} className="pt-4 border-t border-white/10 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-white/70 block mb-1">
                          {language === 'ru' ? 'Ваше имя' : 'Сиздин атыңыз'}
                        </label>
                        <input
                          type="text"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder={language === 'ru' ? 'Например: Бакыт' : 'Мисалы: Бакыт'}
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-white/70 block mb-1">
                          {language === 'ru' ? 'Номер телефона (WhatsApp) *' : 'Телефон номериңиз (WhatsApp) *'}
                        </label>
                        <input
                          type="tel"
                          required
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          placeholder="+996 (___) __-__-__"
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="text-xs text-white/60 hover:text-white"
                      >
                        {language === 'ru' ? '← Изменить параметры' : '← Параметрлерди өзгөртүү'}
                      </button>

                      <button
                        type="submit"
                        className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2 active:scale-95"
                      >
                        <MessageCircle className="w-4 h-4 fill-current" />
                        <span>{language === 'ru' ? 'Получить планировки и цены в WhatsApp' : 'WhatsApp аркылуу пландоолорду алуу'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          ) : (
            /* Success confirmation screen */
            <div className="text-center py-10 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <Check className="w-8 h-8" />
              </div>

              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
                {language === 'ru' ? 'Заявка успешно сформирована!' : 'Өтүнмө ийгиликтүү түзүлдү!'}
              </h3>

              <p className="text-sm text-white/80 max-w-md mx-auto leading-relaxed">
                {language === 'ru'
                  ? 'Мы открыли WhatsApp с подготовленным текстом запроса. Диалог сохранен в вашей истории обращений на сайте.'
                  : 'Биз даярдалган өтүнмө менен WhatsAppты ачтык. Бул диалог сайттагы кайрылуулар тарыхыңызга сакталды.'}
              </p>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-md mx-auto text-left text-xs space-y-2 text-white/80">
                <div className="flex justify-between">
                  <span className="text-white/50">Формат:</span>
                  <span className="font-semibold text-white">{rooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Район:</span>
                  <span className="font-semibold text-white">{district}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Оплата:</span>
                  <span className="font-semibold text-white">{payment}</span>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setStep(1);
                  }}
                  className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                >
                  {language === 'ru' ? 'Подобрать еще вариант' : 'Башка вариант тандап көрүү'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

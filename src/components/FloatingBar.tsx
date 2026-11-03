import React from 'react';
import { Phone, MessageCircle, Calendar, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useDialogHistory } from '../context/DialogHistoryContext';
import { OSH_OFFICE_DETAILS } from '../data/content';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface FloatingBarProps {
  onOpenTourModal: () => void;
}

export const FloatingBar: React.FC<FloatingBarProps> = ({ onOpenTourModal }) => {
  const { language } = useLanguage();
  const { dialogs, openHistory } = useDialogHistory();

  const waUrl = getWhatsAppUrl(
    language === 'ru'
      ? 'Здравствуйте! Хочу получить консультацию по жилым комплексам ORDO в городе Ош'
      : 'Саламатсызбы! Ош шаарындагы ORDO турак жай комплекстери боюнча маалымат алгым келет'
  );

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
      <div className="bg-[#111317]/95 backdrop-blur-xl border border-white/15 p-2 rounded-2xl shadow-2xl flex items-center justify-between gap-2">
        {/* Call button */}
        <a
          href={`tel:${OSH_OFFICE_DETAILS.phone1}`}
          className="flex-1 py-2.5 px-2 rounded-xl bg-white/10 text-white flex flex-col items-center justify-center text-[10px] font-semibold active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4 text-amber-400 mb-0.5" />
          <span>Позвонить</span>
        </a>

        {/* WhatsApp Fast button */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-2 rounded-xl bg-emerald-600 text-white flex flex-col items-center justify-center text-[10px] font-semibold active:scale-95 transition-transform shadow-lg"
        >
          <MessageCircle className="w-4 h-4 fill-current mb-0.5" />
          <span>WhatsApp</span>
        </a>

        {/* Tour Booking CTA */}
        <button
          onClick={onOpenTourModal}
          className="flex-1 py-2.5 px-2 rounded-xl bg-amber-400 text-gray-950 flex flex-col items-center justify-center text-[10px] font-bold active:scale-95 transition-transform shadow-lg"
        >
          <Calendar className="w-4 h-4 mb-0.5" />
          <span>Экскурсия</span>
        </button>

        {/* History drawer opener */}
        <button
          onClick={openHistory}
          className="py-2.5 px-3 rounded-xl bg-white/10 text-amber-300 flex flex-col items-center justify-center text-[10px] font-semibold relative active:scale-95 transition-transform"
          title="История последних 2 диалогов"
        >
          <Clock className="w-4 h-4 mb-0.5" />
          <span>История</span>
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-gray-950 font-bold text-[9px] flex items-center justify-center">
            {dialogs.length}
          </span>
        </button>
      </div>
    </div>
  );
};

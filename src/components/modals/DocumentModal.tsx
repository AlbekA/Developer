import React from 'react';
import { LegalDocument } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { X, ShieldCheck, Download, CheckCircle, ExternalLink } from 'lucide-react';

interface DocumentModalProps {
  document: LegalDocument | null;
  onClose: () => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({ document, onClose }) => {
  const { language } = useLanguage();

  if (!document) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-[#e2e2dc] shadow-2xl relative flex flex-col justify-between">
        {/* Header */}
        <div className="p-6 sm:p-7 border-b border-[#f0f0eb] flex items-start justify-between bg-[#fafaf8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-amber-800 block">
                {document.docNumber}
              </span>
              <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#1a1c22]">
                {language === 'ru' ? document.titleRu : document.titleKg}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#f0f0eb] hover:bg-[#e4e4e0] text-[#1a1c22] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body: Document preview + Official registry metadata */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="relative rounded-2xl overflow-hidden border border-[#e2e2dc] bg-gray-100 shadow-inner">
            <img
              src={document.fullImage}
              alt={document.titleRu}
              className="w-full h-auto max-h-[460px] object-cover object-top"
            />
            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg">
              <CheckCircle className="w-4 h-4" />
              <span>Официальный скан Госстроя КР</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#fafaf8] border border-[#ecece6] space-y-3 text-xs text-[#4a4b47]">
            <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-[#ecece6]">
              <span className="text-[#888882]">Кем выдано:</span>
              <span className="font-semibold text-gray-900 text-right">
                {language === 'ru' ? document.issuerRu : document.issuerKg}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-[#ecece6]">
              <span className="text-[#888882]">Статус действия:</span>
              <span className="font-semibold text-emerald-700">{document.date}</span>
            </div>
            <div className="pt-2">
              <span className="text-[#888882] block mb-1">Юридическое описание:</span>
              <p className="text-sm leading-relaxed text-[#2d2e33]">
                {language === 'ru' ? document.descriptionRu : document.descriptionKg}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 sm:p-6 bg-[#f7f7f4] border-t border-[#f0f0eb] flex flex-wrap items-center justify-between gap-3 text-xs text-[#71716b]">
          <span>Оригиналы документов доступны для проверки в офисе продаж: г. Ош, пр. Масалиева, 48/1</span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#1a1c22] text-white font-semibold hover:bg-black transition-colors"
          >
            {language === 'ru' ? 'Закрыть просмотр' : 'Жабуу'}
          </button>
        </div>
      </div>
    </div>
  );
};

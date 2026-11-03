import React from 'react';
import { LegalDocument } from '../types';
import { LEGAL_DOCUMENTS } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, FileText, ZoomIn, CheckCircle } from 'lucide-react';

interface DocumentsProps {
  onSelectDocument: (doc: LegalDocument) => void;
}

export const Documents: React.FC<DocumentsProps> = ({ onSelectDocument }) => {
  const { language } = useLanguage();

  return (
    <section id="documents" className="py-24 bg-[#fafaf8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#e2e2dc]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#71716b] font-semibold block mb-2">
              {language === 'ru' ? 'ЮРИДИЧЕСКАЯ ЧИСТОТА' : 'ЮРИДИКАЛЫК ТАЗАЛЫК'}
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#1a1c22] font-semibold tracking-tight">
              {language === 'ru' ? 'Документы, разрешения и гарантии' : 'Документтер, уруксаттар жана кепилдиктер'}
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-[#5a5b57] max-w-md">
            {language === 'ru'
              ? 'Нажмите на любой документ, чтобы открыть официальный полноразмерный скан с печатями Госстроя и Госрегистра КР.'
              : 'Мамкурулуш жана Мамкаттоо мөөрлөрү бар расмий толук өлчөмдөгү сканды көрүү үчүн документти басыңыз.'}
          </p>
        </div>

        {/* 4 Clickable Scanned Documents */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LEGAL_DOCUMENTS.map((doc) => (
            <div
              key={doc.id}
              onClick={() => onSelectDocument(doc)}
              className="bg-white rounded-2xl border border-[#e2e2dc] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Document Thumbnail with Zoom Overlay */}
                <div className="relative aspect-[3/4] bg-[#f0f0eb] overflow-hidden border-b border-[#ecece6]">
                  <img
                    src={doc.thumbImage}
                    alt={doc.titleRu}
                    className="w-full h-full object-cover filter contrast-[1.05] group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-[#1a1c22]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-white text-gray-950 text-xs font-bold flex items-center gap-2 shadow-lg">
                      <ZoomIn className="w-4 h-4" />
                      {language === 'ru' ? 'Открыть скан' : 'Сканды ачуу'}
                    </span>
                  </div>

                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-amber-300 text-[10px] font-semibold uppercase tracking-wider border border-white/10">
                    {language === 'ru' ? doc.badgeRu : doc.badgeKg}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5">
                  <span className="text-[11px] font-mono font-semibold text-amber-800 block mb-1">
                    {doc.docNumber}
                  </span>
                  <h3 className="font-serif-luxury text-base font-bold text-[#1a1c22] mb-2 leading-snug group-hover:text-amber-800 transition-colors">
                    {language === 'ru' ? doc.titleRu : doc.titleKg}
                  </h3>
                  <p className="text-[11px] text-[#71716b] leading-relaxed line-clamp-3 mb-2">
                    {language === 'ru' ? doc.descriptionRu : doc.descriptionKg}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-[#f7f7f4] flex items-center justify-between text-[11px] text-[#888882]">
                <span>{doc.date}</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Проверено
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

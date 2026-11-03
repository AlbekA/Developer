import React, { useState } from 'react';
import { REVIEWS } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import { Star, CheckCircle2, Play, MessageSquare, ThumbsUp } from 'lucide-react';

export const Reviews: React.FC = () => {
  const { language } = useLanguage();
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  return (
    <section className="py-24 bg-[#f7f7f4] border-b border-[#e5e5df]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#e2e2dc]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#71716b] font-semibold block mb-2">
              {language === 'ru' ? 'СОЦИАЛЬНЫЕ ДОКАЗАТЕЛЬСТВА' : 'ТУРГУНДАРДЫН ПИКИРЛЕРИ'}
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#1a1c22] font-semibold tracking-tight">
              {language === 'ru' ? 'Отзывы жителей наших домов в Оше' : 'Ош шаарындагы үйлөрүбүздүн тургундарынын ой-пикири'}
            </h2>
          </div>

          {/* 2GIS and Google ratings pill */}
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <div className="bg-white px-4 py-2 rounded-2xl border border-[#e2e2dc] shadow-sm flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#2bba32] text-white flex items-center justify-center font-bold text-xs">
                2ГИС
              </div>
              <div>
                <div className="flex items-center gap-1 text-xs font-bold text-[#1a1c22]">
                  <span>4.9</span>
                  <div className="flex text-amber-500">
                    {'★'.repeat(5)}
                  </div>
                </div>
                <span className="text-[10px] text-[#71716b]">г. Ош • 148 отзывов</span>
              </div>
            </div>

            <div className="bg-white px-4 py-2 rounded-2xl border border-[#e2e2dc] shadow-sm flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#4285f4] text-white flex items-center justify-center font-bold text-xs">
                G
              </div>
              <div>
                <div className="flex items-center gap-1 text-xs font-bold text-[#1a1c22]">
                  <span>4.8</span>
                  <div className="flex text-amber-500">
                    {'★'.repeat(5)}
                  </div>
                </div>
                <span className="text-[10px] text-[#71716b]">Google Карты • 96 отзывов</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-7 border border-[#e2e2dc] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Source & Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                      rev.source === 'video'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : rev.source === '2gis'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}
                  >
                    {rev.source === 'video' ? 'Видео-отзыв' : rev.source === '2gis' ? '2ГИС Ош' : 'Google Maps'}
                  </span>
                </div>

                {/* Video Preview if applicable */}
                {rev.source === 'video' && (
                  <div
                    onClick={() => setPlayingVideoId(playingVideoId === rev.id ? null : rev.id)}
                    className="relative rounded-2xl overflow-hidden aspect-[16/9] mb-4 bg-gray-900 cursor-pointer group"
                  >
                    <img
                      src={rev.videoPreviewUrl}
                      alt="Превью видеоотзыва"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform filter brightness-75"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-amber-400 text-gray-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono">
                      {rev.videoDuration}
                    </span>
                  </div>
                )}

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#4a4b47] leading-relaxed mb-6 italic">
                  "{language === 'ru' ? rev.textRu : rev.textKg}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-[#f0f0eb] flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-10 h-10 rounded-full object-cover border border-[#e2e2dc]"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#1a1c22]">{rev.author}</span>
                    {rev.verifiedResident && (
                      <span title="Собственник квартиры с техпаспортом" className="inline-flex">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#71716b] block">
                    {rev.complex} • {rev.apartmentType}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

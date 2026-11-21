import React, { useState, useEffect } from 'react';
import { DHARMIK_PRODUCTS } from '../data/mantraDatabase';
import { LanguageCode } from '../types';
import { getTranslations } from '../utils/i18n';
import {
  Sparkles,
  ShieldCheck,
  Star,
  ExternalLink,
  Flame,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';

interface FullScreenRewardAdModalProps {
  language?: LanguageCode;
  onRewardComplete: () => void;
}

export const FullScreenRewardAdModal: React.FC<FullScreenRewardAdModalProps> = ({
  language = 'hi',
  onRewardComplete
}) => {
  const t = getTranslations(language);
  const [secondsLeft, setSecondsLeft] = useState<number>(2);
  const [canSkip, setCanSkip] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);

  // Pick a featured dharmic item
  const product = DHARMIK_PRODUCTS[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setCanSkip(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#160d08] text-white flex flex-col justify-between p-4 sm:p-6 select-none animate-fadeIn overflow-y-auto">
      {/* Top Countdown / Skip Header */}
      <div className="flex items-center justify-between border-b border-orange-500/30 pb-3 pt-1">
        <div className="flex items-center gap-2">
          <span className="text-xl">🪔</span>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block">
              {language === 'hi' ? 'प्रायोजित विज्ञापन • साधना अनलॉक' : 'SPONSORED AD • UNLOCKING SADHANA'}
            </span>
            <h3 className="text-xs sm:text-sm font-bold text-orange-200">
              {language === 'hi' ? 'जाप कक्ष में प्रवेश की तैयारी...' : 'Preparing sacred jaap sanctuary...'}
            </h3>
          </div>
        </div>

        <div>
          {canSkip || secondsLeft === 0 ? (
            <button
              onClick={onRewardComplete}
              className="px-4 py-1.5 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-xs shadow-lg animate-pulse flex items-center gap-1"
            >
              <span>{language === 'hi' ? 'जाप शुरू करें' : 'Begin Jaap'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="px-3 py-1 rounded-full bg-orange-950/80 border border-orange-600/50 text-amber-200 text-xs font-bold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 animate-spin text-orange-400" />
              <span>{secondsLeft}s {language === 'hi' ? 'में स्किप' : 'to skip'}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Sponsored Dharmic Showcase */}
      <div className="my-auto py-4 flex flex-col items-center text-center max-w-sm mx-auto">
        <div className="relative mb-4">
          {!imgError ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              onError={() => setImgError(true)}
              className="w-44 h-44 sm:w-52 sm:h-52 rounded-3xl object-cover border-2 border-amber-400 shadow-2xl shadow-orange-900/60"
            />
          ) : (
            <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-3xl bg-orange-950/80 border-2 border-amber-400 flex flex-col items-center justify-center text-5xl shadow-2xl">
              <span>📿</span>
              <span className="text-xs text-amber-200 font-bold mt-2">दिव्य रुद्राक्ष</span>
            </div>
          )}
          <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-amber-500 text-amber-950 text-[10px] font-black uppercase tracking-wider shadow">
            {product.badge || (language === 'hi' ? 'विशेष सात्विक' : 'Special')}
          </div>
        </div>

        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-900/40 border border-orange-600/40 text-amber-300 text-xs font-bold mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
          <span>{language === 'hi' ? '१००% शुद्ध एवं प्राण-प्रतिष्ठित सामग्री' : '100% Authentic Sacred Essentials'}</span>
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-amber-100 mb-1 leading-snug">
          {product.title}
        </h2>

        <p className="text-xs text-gray-300 line-clamp-2 mb-3 leading-relaxed">
          {product.subtitle}
        </p>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl font-black text-amber-300">
            {product.price}
          </span>
          <div className="flex items-center text-xs text-amber-400 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
            <span>{product.rating}</span>
            <span className="text-gray-400 font-normal ml-1">({product.ratingCount}+ {language === 'hi' ? 'समीक्षाएं' : 'reviews'})</span>
          </div>
        </div>

        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-sm shadow-xl hover:from-orange-500 hover:to-amber-500 active:scale-95 transition-all flex items-center justify-center gap-2 mb-2"
        >
          <span>{language === 'hi' ? 'उत्पाद देखें व ऑर्डर करें' : 'View Product & Order'}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Bottom Unlock Button */}
      <div className="pt-2 border-t border-orange-500/30">
        <button
          onClick={onRewardComplete}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 text-white font-black text-base shadow-2xl hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 ring-2 ring-emerald-400"
        >
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span>{language === 'hi' ? 'साधना कक्ष में प्रवेश करें 🔱' : 'Enter Sacred Jaap Sanctuary 🔱'}</span>
        </button>
      </div>
    </div>
  );
};

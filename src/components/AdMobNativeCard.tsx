import React, { useState } from 'react';
import { Browser } from '@capacitor/browser';
import { ADMOB_SETTINGS, getActiveAdUnit } from '../config/admobConfig';
import { LanguageCode } from '../types';
import { ExternalLink, Sparkles, Star, ShieldCheck, Info } from 'lucide-react';

interface AdMobNativeCardProps {
  language?: LanguageCode;
  variant?: 'native_advanced' | 'banner' | 'compact';
  slotName?: string;
  adIndex?: number;
}

export const AdMobNativeCard: React.FC<AdMobNativeCardProps> = ({
  language = 'hi',
  variant = 'native_advanced',
  slotName = 'General Feed',
  adIndex
}) => {
  const isHindi = language === 'hi';
  const adUnitId = getActiveAdUnit(variant === 'banner' ? 'banner' : 'nativeAdvanced');
  const [isClicked, setIsClicked] = useState(false);

  const sampleNativeAds = [
    {
      title: isHindi ? 'वैदिक पूजा व सिद्ध रुद्राक्ष माला' : 'Vedic Puja & Certified Rudraksha',
      advertiser: 'Aastha Dharmik Sanstha • AdMob Partner',
      description: isHindi
        ? 'प्राकृतिक पंचमुखी रुद्राक्ष, सिद्ध तांबे के पात्र एवं शुद्ध गाय का घी सीधे आश्रम से प्राप्त करें।'
        : 'Get 100% lab certified authentic Rudraksha malas and consecrated temple items directly.',
      callToAction: isHindi ? 'ऑफर देखें ❯' : 'Claim Offer ❯',
      rating: '4.9 ★★★★★',
      tag: isHindi ? 'प्रायोजित विज्ञापन' : 'Sponsored Ad',
      image: '📿'
    },
    {
      title: isHindi ? 'दैनिक पंचांग व सम्पूर्ण जन्मकुंडली' : 'Daily Panchang & Vedic Kundli',
      advertiser: 'Vedic Jyotish Sansthan • AdMob Network',
      description: isHindi
        ? 'आज का शुभ चौघड़िया, राहुकाल और अपनी जन्मकुंडली के आधार पर दैनिक ग्रह दशा व उपाय जानें।'
        : 'Accurate daily panchang, auspicious muhurtas and personalized Vedic horoscope guidance.',
      callToAction: isHindi ? 'निःशुल्क जानें ❯' : 'Explore Free ❯',
      rating: '4.8 ★★★★★',
      tag: isHindi ? 'प्रायोजित विज्ञापन' : 'Sponsored Ad',
      image: '🪐'
    },
    {
      title: isHindi ? 'शुद्ध पीतल घंटी, धूपबत्ती व हवन सामग्री' : 'Brass Temple Bell & Pure Incense',
      advertiser: 'Sanatan Samagri Store • Google Partner',
      description: isHindi
        ? 'मंदिर हेतु शुद्ध पीतल की नंदी घंटी, सात्विक गुग्गल धूप एवं गंगाजल विशेष रियायती दरों पर।'
        : 'Authentic temple brass bells, herbal guggul dhoop and sacred offerings delivered safely.',
      callToAction: isHindi ? 'अभी मंगाएं ❯' : 'Shop Now ❯',
      rating: '4.9 ★★★★★',
      tag: isHindi ? 'प्रायोजित विज्ञापन' : 'Sponsored Ad',
      image: '🔔'
    },
    {
      title: isHindi ? 'श्रीमद्भगवद्गीता व सनातन ग्रन्थ संग्रह' : 'Shrimad Bhagavad Gita & Scriptures',
      advertiser: 'Vedic Granthalaya • AdMob Partner',
      description: isHindi
        ? 'संस्कृत-हिंदी सरल व्याख्या सहित श्रीमद्भगवद्गीता, सुंदरकांड एवं सम्पूर्ण उपनिषद ग्रंथ प्राप्त करें।'
        : 'Original Sanskrit-Hindi authentic editions of holy scriptures for daily spiritual home study.',
      callToAction: isHindi ? 'ग्रन्थ देखें ❯' : 'View Granth ❯',
      rating: '5.0 ★★★★★',
      tag: isHindi ? 'प्रायोजित विज्ञापन' : 'Sponsored Ad',
      image: '📖'
    },
    {
      title: isHindi ? 'शुद्ध आयुर्वेदिक तुलसी, गिलोय व अश्वगंधा' : 'Pure Ayurvedic Tulsi & Ashwagandha',
      advertiser: 'Ayur Sanjeevani • Google Ad Network',
      description: isHindi
        ? 'रोग प्रतिरोधक क्षमता, दीर्घायु व मानसिक शांति हेतु १००% शुद्ध प्राकृतिक सात्विक औषधियां।'
        : 'Pure Himalayan herbs for physical vitality, calmness of mind and spiritual well-being.',
      callToAction: isHindi ? 'स्वास्थ्य लाभ ❯' : 'Learn More ❯',
      rating: '4.8 ★★★★★',
      tag: isHindi ? 'प्रायोजित विज्ञापन' : 'Sponsored Ad',
      image: '🌿'
    }
  ];

  // Deterministically select an ad index based on slotName or passed index
  const computedIndex = adIndex !== undefined
    ? adIndex % sampleNativeAds.length
    : Math.abs(slotName.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)) % sampleNativeAds.length;

  const currentAd = sampleNativeAds[computedIndex];

  const handleAdClick = async () => {
    setIsClicked(true);
    const targetUrl = 'https://play.google.com/store/apps/details?id=com.aasthapujajaap.app';
    try {
      await Browser.open({ url: targetUrl });
    } catch {
      window.open(targetUrl, '_blank');
    }
    setIsClicked(false);
  };

  if (variant === 'banner') {
    return (
      <div className="w-full max-w-lg mx-auto bg-amber-50/90 border border-orange-200 rounded-xl p-2.5 shadow-sm my-2">
        <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1">
          <span className="font-extrabold text-amber-800 bg-amber-200/70 px-1.5 py-0.2 rounded uppercase tracking-wider">
            {isHindi ? 'विज्ञापन' : 'Ad'} • AdMob
          </span>
          <span className="text-[9px] font-mono text-gray-400 truncate max-w-[170px]">
            {ADMOB_SETTINGS.isTestMode ? `Test: ${adUnitId.slice(-10)}` : 'Live Ad'}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl p-1 bg-white rounded-lg shadow-xs border border-orange-100">
              {currentAd.image}
            </span>
            <div>
              <h4 className="text-xs font-bold text-gray-900 leading-tight">
                {currentAd.title}
              </h4>
              <p className="text-[11px] text-gray-600 line-clamp-1">
                {currentAd.advertiser}
              </p>
            </div>
          </div>
          <button
            onClick={handleAdClick}
            className="px-3 py-1.5 rounded-lg bg-orange-600 text-white text-xs font-bold shadow hover:bg-orange-700 active:scale-95 transition-all whitespace-nowrap"
          >
            {currentAd.callToAction}
          </button>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="w-full bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-300 rounded-2xl p-2.5 shadow-2xs my-2 flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-lg shrink-0">
            {currentAd.image}
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-black bg-amber-500 text-white px-1.5 py-0.2 rounded uppercase">
                {isHindi ? 'विज्ञापन' : 'Ad'}
              </span>
              <h5 className="text-xs font-bold text-gray-900 truncate">{currentAd.title}</h5>
            </div>
            <p className="text-[10px] text-gray-600 truncate">{currentAd.advertiser}</p>
          </div>
        </div>
        <button
          onClick={handleAdClick}
          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white text-[11px] font-bold shrink-0 shadow-xs active:scale-95 transition-all"
        >
          {currentAd.callToAction}
        </button>
      </div>
    );
  }

  // Native Advanced Ad Layout
  return (
    <div className="w-full my-3 bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-yellow-50/60 border border-amber-300/80 rounded-2xl p-3 sm:p-4 shadow-md relative overflow-hidden">
      {/* Ad Attribution Header */}
      <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-orange-200/60">
        <div className="flex items-center gap-1.5">
          <span className="bg-amber-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider shadow-xs">
            {currentAd.tag}
          </span>
          <span className="text-[11px] font-semibold text-amber-900 truncate">
            {currentAd.advertiser}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono">
          <Info className="w-3 h-3 text-amber-700/60" />
          <span>{ADMOB_SETTINGS.isTestMode ? 'AdMob Test' : 'Google Ad'}</span>
        </div>
      </div>

      {/* Main Ad Body */}
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-200 border border-orange-300 flex items-center justify-center text-2xl shadow-inner shrink-0">
          {currentAd.image}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <h4 className="text-sm font-bold text-gray-900 leading-snug truncate">
              {currentAd.title}
            </h4>
          </div>
          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-2">
            {currentAd.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-700 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              {currentAd.rating}
            </span>
            <button
              onClick={handleAdClick}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white text-xs font-bold shadow hover:brightness-105 active:scale-95 transition-all flex items-center gap-1"
            >
              <span>{currentAd.callToAction}</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Ad Unit Id Hint for Developer/Owner */}
      <div className="mt-2 pt-1 border-t border-orange-100 flex items-center justify-between text-[9px] text-gray-400">
        <span>Google AdMob Slot: {slotName}</span>
        <span className="font-mono">ID: {adUnitId}</span>
      </div>
    </div>
  );
};

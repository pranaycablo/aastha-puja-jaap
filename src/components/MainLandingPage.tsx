import React, { useState } from 'react';
import { UserProfile, MantraItem, LanguageCode } from '../types';
import { getTodayDivineGuidance } from '../utils/aajKaDinEngine';
import { calculateMoolank } from '../utils/ankaJyotishEngine';
import { audioEngine } from '../utils/audioEngine';
import { AdMobNativeCard } from './AdMobNativeCard';

interface MainLandingPageProps {
  userProfile: UserProfile;
  currentMantra: MantraItem;
  onOpenKundali: () => void;
  onOpenAajKaDin: () => void;
  onOpenChalisa: () => void;
  onOpenAarti: () => void;
  onOpenGranth: () => void;
  onOpenVedUpanishad: () => void;
  onOpenJap: () => void;
  onOpenAnkaGyan: () => void;
  onOpenProfileSetup: () => void;
  onOpenMantraSuggestion?: () => void;
  onOpenMantraMahakosh?: () => void;
  onOpenMandirDarshan?: () => void;
  onOpenYantraMahakosh?: () => void;
  onOpenRatnaGyan?: () => void;
  onOpenTotke?: () => void;
  onOpenNaamMantra?: () => void;
  onOpenSeva?: (tab?: 'donation' | 'rating' | 'share' | 'feedback') => void;
  language?: LanguageCode;
}

export const MainLandingPage: React.FC<MainLandingPageProps> = ({
  userProfile,
  onOpenKundali,
  onOpenAajKaDin,
  onOpenChalisa,
  onOpenAarti,
  onOpenGranth,
  onOpenVedUpanishad,
  onOpenJap,
  onOpenAnkaGyan,
  onOpenProfileSetup,
  onOpenMantraSuggestion,
  onOpenMantraMahakosh,
  onOpenMandirDarshan,
  onOpenYantraMahakosh,
  onOpenRatnaGyan,
  onOpenTotke,
  onOpenNaamMantra,
  onOpenSeva,
  language = 'hi'
}) => {
  const isHi = language === 'hi';
  const [ringingBell, setRingingBell] = useState(false);
  const [blowingShankh, setBlowingShankh] = useState(false);

  const handleRingBell = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRingingBell(true);
    audioEngine.playBell('kashi_brass', 0.85);
    setTimeout(() => setRingingBell(false), 900);
  };

  const handleBlowShankh = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBlowingShankh(true);
    audioEngine.playShankh('panchjanya', 0.85);
    setTimeout(() => setBlowingShankh(false), 2200);
  };

  // Check if user has provided custom details
  const hasCustomUserName = Boolean(
    userProfile.name &&
    userProfile.name.trim() !== '' &&
    userProfile.name !== 'साधक'
  );

  const hasUserDetailsForKundali = Boolean(
    hasCustomUserName &&
    userProfile.dob &&
    userProfile.dob.trim().length > 0
  );

  const guidance = React.useMemo(() => {
    return getTodayDivineGuidance(userProfile);
  }, [userProfile]);

  const handleKundaliClick = () => {
    onOpenKundali();
  };

  const handleAajKaDinClick = () => {
    if (!hasUserDetailsForKundali) {
      onOpenProfileSetup();
    } else {
      onOpenAajKaDin();
    }
  };

  // 7 Sacred portals with ONLY Name and Logo
  const portals = [
    {
      id: 'kundali',
      name: isHi ? 'कुंडली' : 'Kundali',
      logo: '🪐',
      onClick: handleKundaliClick,
      isFullWidth: false
    },
    {
      id: 'chalisa',
      name: isHi ? 'चालीसा' : 'Chalisa',
      logo: '📿',
      onClick: onOpenChalisa,
      isFullWidth: false
    },
    {
      id: 'aarti',
      name: isHi ? 'आरती' : 'Aarti',
      logo: '🪔',
      onClick: onOpenAarti,
      isFullWidth: false
    },
    {
      id: 'granth',
      name: isHi ? 'ग्रन्थ' : 'Granth',
      logo: '📜',
      onClick: onOpenGranth,
      isFullWidth: false
    },
    {
      id: 'ved-upanishad',
      name: isHi ? 'वेद / उपनिषद' : 'Ved / Upanishad',
      logo: '🕉️',
      onClick: onOpenVedUpanishad,
      isFullWidth: false
    },
    {
      id: 'ank-gyan',
      name: isHi ? 'अंक ज्ञान' : 'Anka Gyan',
      logo: '🔢',
      onClick: onOpenAnkaGyan,
      isFullWidth: false
    },
    {
      id: 'yantra-mahakosh',
      name: isHi ? 'सिद्ध यन्त्र' : 'Yantras',
      logo: '🔯',
      onClick: onOpenYantraMahakosh || (() => {}),
      isFullWidth: false
    },
    {
      id: 'ratna-gyan',
      name: isHi ? 'रत्न पहचान' : 'Ratna Gyan',
      logo: '💎',
      onClick: onOpenRatnaGyan || (() => {}),
      isFullWidth: false
    },
    {
      id: 'totke',
      name: isHi ? 'अचूक टोटके व उपाय' : 'Sanatan Totke',
      logo: '🔮',
      onClick: onOpenTotke || (() => {}),
      isFullWidth: false
    },
    {
      id: 'naam-mantra',
      name: isHi ? 'नाम संपुटित जप' : 'Name Mantra',
      logo: '✨',
      onClick: onOpenNaamMantra || (() => {}),
      isFullWidth: false
    },
    {
      id: 'darshan',
      name: isHi ? 'चार धाम व 24x7 लाइव दर्शन' : 'Char Dham & Live Darshan',
      logo: '🛕',
      onClick: onOpenMandirDarshan,
      isFullWidth: true
    },
    {
      id: 'jap',
      name: isHi ? 'जाप' : 'Jap',
      logo: '🌸',
      onClick: onOpenJap,
      isFullWidth: true
    }
  ];

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col p-3.5 pb-24 select-none animate-fadeIn space-y-3.5">
      {/* 1. TOP USER GREETING BANNER */}
      {hasCustomUserName && (
        <div className="flex items-center justify-between px-2 pt-1">
          <div className="min-w-0">
            <span className="text-[11px] font-black text-orange-700 tracking-widest uppercase flex items-center gap-1">
              <span>🚩</span>
              <span>{isHi ? 'हरि ॐ तत्सत्' : 'Hari Om Tatsat'}</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-amber-950 truncate drop-shadow-2xs">
              {userProfile.name}
            </h2>
          </div>
          <span className="text-xs font-black bg-gradient-to-r from-amber-200 to-yellow-300 text-amber-950 px-3.5 py-1.5 rounded-full border border-amber-400 shadow-xs shrink-0 flex items-center gap-1">
            <span>🪔</span>
            <span>{guidance.dayNameHi}</span>
          </span>
        </div>
      )}

      {/* 1.5 SACRED SADHANA STREAK & DIGITAL TEMPLE ACTION BAR */}
      <div className="flex items-center justify-between gap-2 px-1">
        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-amber-500/20 border border-amber-400/80 shadow-2xs">
          <span className="text-base animate-pulse">🔥</span>
          <span className="text-xs font-black text-amber-950">
            {isHi ? `${userProfile.dailyStreak || 1} दिन अखंड साधना संकल्प` : `${userProfile.dailyStreak || 1} Days Sadhana Streak`}
          </span>
        </div>

        {/* Temple Bell & Conch Quick Interactive Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleRingBell}
            title={isHi ? 'मंदिर की पावन पीतल घंटी बजाएं' : 'Ring Temple Bell'}
            className={`w-9 h-9 rounded-2xl bg-amber-100 hover:bg-amber-200 border border-amber-300 flex items-center justify-center text-lg shadow-xs active:scale-90 transition-all cursor-pointer ${
              ringingBell ? 'rotate-12 scale-110 ring-2 ring-amber-400 bg-amber-200' : ''
            }`}
          >
            <span>🔔</span>
          </button>

          <button
            type="button"
            onClick={handleBlowShankh}
            title={isHi ? 'पावन कुरुक्षेत्र शंखनाद करें' : 'Blow Sacred Conch'}
            className={`w-9 h-9 rounded-2xl bg-orange-100 hover:bg-orange-200 border border-orange-300 flex items-center justify-center text-lg shadow-xs active:scale-90 transition-all cursor-pointer ${
              blowingShankh ? '-rotate-12 scale-110 ring-2 ring-orange-400 bg-orange-200' : ''
            }`}
          >
            <span>🐚</span>
          </button>
        </div>
      </div>

      {/* 2. आज का दिन ROYAL CARD (Personalized vs Verification Gate) */}
      <button
        type="button"
        onClick={handleAajKaDinClick}
        className="w-full bg-gradient-to-br from-[#7C1A0E] via-[#A82B14] to-[#6E1207] text-white rounded-3xl p-4 sm:p-5 shadow-xl hover:shadow-2xl active:scale-[0.98] transition-all text-left relative overflow-hidden group border-2 border-amber-400/90 cursor-pointer"
      >
        {/* Subtle Background Glow Accent */}
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-amber-400/20 blur-xl pointer-events-none" />

        {/* Header row: Title & Date */}
        <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-xl shadow-xs shrink-0">
              🌅
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-wide text-white drop-shadow-2xs">
                {isHi ? 'आज का दिन' : "Today's Day"}
              </h3>
              <p className="text-[10px] text-amber-200/90 font-bold">
                {guidance.dayNameHi} • {guidance.tithiHi}
              </p>
            </div>
          </div>
          <span className="text-[11px] font-black bg-black/30 border border-amber-300/40 text-amber-200 px-3 py-1 rounded-xl shrink-0 shadow-2xs">
            {guidance.dateStr}
          </span>
        </div>

        {/* Auspicious Color, Lucky Number & Daily Guidance Badges */}
        <div className="space-y-2.5 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 bg-black/25 border border-white/20 px-2.5 py-1 rounded-xl text-xs font-bold text-white shadow-2xs">
              <span
                className="w-3.5 h-3.5 rounded-full border border-white shadow-2xs shrink-0"
                style={{ backgroundColor: guidance.auspiciousColorHex }}
              />
              <span>{isHi ? `शुभ रंग: ${guidance.auspiciousColorNameHi.split('(')[0].trim()}` : guidance.auspiciousColorNameHi}</span>
            </div>

            <div className="flex items-center gap-1 bg-black/25 border border-white/20 px-2.5 py-1 rounded-xl text-xs font-bold text-white shadow-2xs">
              <span>🔢</span>
              <span>{isHi ? `शुभ अंक: ${guidance.luckyNumber}` : `Lucky #${guidance.luckyNumber}`}</span>
            </div>

            {hasUserDetailsForKundali ? (
              <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-stone-950 px-2.5 py-1 rounded-xl text-xs font-black shadow-xs">
                <span>✨</span>
                <span>{isHi ? `मूलांक ${calculateMoolank(userProfile.dob)}` : `Root ${calculateMoolank(userProfile.dob)}`}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-300 to-amber-400 text-stone-950 px-2.5 py-1 rounded-xl text-xs font-black shadow-xs">
                <span>🔒</span>
                <span>{isHi ? 'जन्म विवरण दर्ज करें' : 'Add Birth Details'}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-amber-100 pt-1 border-t border-white/15">
            <span className="line-clamp-1 font-medium opacity-95">
              {hasUserDetailsForKundali
                ? (isHi ? `श्री ${userProfile.name} जी, आज ${guidance.auspiciousColorNameHi.split('(')[0].trim()} रंग धारण करना अति शुभ रहेगा` : 'Auspicious cloth color & personalized guide')
                : (isHi ? '🔒 जन्म विवरण दर्ज कर व्यक्तिगत राशिफल, मूलांक व शुभ मुहूर्त अनलॉक करें' : 'Tap to complete profile for personalized guidance')}
            </span>
            <span className="font-black text-amber-300 shrink-0 ml-2 group-hover:translate-x-1 transition-transform">
              {hasUserDetailsForKundali ? (isHi ? 'विस्तार से ➔' : 'View ➔') : (isHi ? 'अनलॉक करें ➔' : 'Unlock ➔')}
            </span>
          </div>
        </div>
      </button>

      {/* 2.5 TODAY'S PERSONALIZED MANTRA SUGGESTION CARD */}
      <button
        type="button"
        onClick={onOpenMantraSuggestion}
        className="w-full bg-gradient-to-r from-amber-500 via-orange-600 to-amber-600 text-white rounded-3xl p-3.5 sm:p-4 shadow-lg hover:shadow-xl active:scale-[0.98] transition-all text-left border-2 border-amber-300 ring-2 ring-amber-400/30 flex items-center justify-between gap-3 group cursor-pointer"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-2xl shadow-xs shrink-0 group-hover:scale-105 transition-transform">
            📿
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-900/40 text-amber-100 border border-amber-300/40">
                {isHi ? 'शास्त्रोक्त सुझाव' : 'Divine Suggestion'}
              </span>
              <span className="text-[10px] text-amber-100 font-bold">
                {isHi ? 'नाम जप • लघु जप • चालीसा' : 'Personalized Chanting'}
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-black text-white truncate drop-shadow-2xs mt-0.5">
              {isHi
                ? (hasCustomUserName ? `श्री ${userProfile.name} जी हेतु आज का पावन जप सुझाव` : 'आज का पावन दैनिक जप सुझाव')
                : `Today's Sacred Chanting Recommendations`}
            </h4>
            <p className="text-[11px] text-amber-100 line-clamp-1 font-medium opacity-90">
              {isHi
                ? 'अपने इष्टदेव व आज के दिन के अनुसार सर्वोत्तम फलदायी जप देखें'
                : 'View tailored Naam Jaap, Short Beej and Chalisa for today'}
            </p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-white text-orange-950 flex items-center justify-center font-black text-xs shadow-md shrink-0 group-hover:translate-x-1 transition-transform">
          ➔
        </div>
      </button>

      {/* 2.6 CANONICAL MANTRA MAHAKOSH CARD */}
      {onOpenMantraMahakosh && (
        <button
          type="button"
          onClick={onOpenMantraMahakosh}
          className="w-full bg-gradient-to-r from-[#500804] via-[#85160A] to-[#500804] text-white rounded-3xl p-3.5 sm:p-4 shadow-xl hover:shadow-2xl active:scale-[0.98] transition-all text-left border-2 border-yellow-400 ring-2 ring-yellow-400/40 flex items-center justify-between gap-3 group cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-600 p-0.5 shadow-md shrink-0 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
              <span className="w-full h-full rounded-[14px] bg-[#240303] flex items-center justify-center">📿</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-yellow-400 text-stone-950 shadow-xs">
                  {isHi ? '९ मुख्य श्रेणियां' : '9 Master Categories'}
                </span>
                <span className="text-[10px] text-amber-200 font-bold">
                  {isHi ? 'नाम • पूजन • सिद्धि • वैदिक • तांत्रिक • शाबर' : 'Authentic Collection'}
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-black text-yellow-200 truncate drop-shadow-2xs mt-0.5">
                {isHi ? 'सम्पूर्ण सनातन व शाबर मंत्र महाकोश' : 'Sanatan & Shabar Mantra Mahakosh'}
              </h4>
              <p className="text-[11px] text-amber-100/90 line-clamp-1 font-medium">
                {isHi
                  ? 'सिद्ध करने की विधि, समय, सामग्री व गलत प्रयोग की कठोर चेतावनी सहित'
                  : 'Siddhi Puja Vidhi, Benefits & Strict Warnings of wrong usage'}
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-stone-950 flex items-center justify-center font-black text-xs shadow-md shrink-0 group-hover:translate-x-1 transition-transform">
            ➔
          </div>
        </button>
      )}

      {/* 2.7 YANTRA MAHAKOSH & RATNA SCIENCE DUAL CARDS */}
      <div className="grid grid-cols-2 gap-2.5">
        {onOpenYantraMahakosh && (
          <button
            type="button"
            onClick={onOpenYantraMahakosh}
            className="bg-gradient-to-br from-[#4A0A05] via-[#751509] to-[#4A0A05] text-white rounded-3xl p-3 sm:p-3.5 shadow-lg hover:shadow-xl active:scale-[0.98] transition-all text-left border-2 border-amber-400/90 flex flex-col justify-between group cursor-pointer"
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-300/40 text-xl flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
                🔯
              </span>
              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-400 text-stone-950">
                {isHi ? '३१ यन्त्र' : '31 Yantras'}
              </span>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-amber-200 line-clamp-1 mt-1">
                {isHi ? 'सिद्ध यन्त्र महाकोश' : 'Yantra Mahakosh'}
              </h4>
              <p className="text-[10px] text-amber-100/80 font-medium line-clamp-1 mt-0.5">
                {isHi ? 'कागज पर निर्माण विधि व रंग' : 'Paper Vidhi & Color'}
              </p>
            </div>
          </button>
        )}

        {onOpenRatnaGyan && (
          <button
            type="button"
            onClick={onOpenRatnaGyan}
            className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white rounded-3xl p-3 sm:p-3.5 shadow-lg hover:shadow-xl active:scale-[0.98] transition-all text-left border-2 border-amber-400/90 flex flex-col justify-between group cursor-pointer"
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-300/40 text-xl flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
                💎
              </span>
              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-400 text-stone-950">
                {isHi ? 'असली पहचान' : 'Authenticity'}
              </span>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-amber-200 line-clamp-1 mt-1">
                {isHi ? 'रत्न ज्ञान व पहचान' : 'Ratna Science'}
              </h4>
              <p className="text-[10px] text-amber-100/80 font-medium line-clamp-1 mt-0.5">
                {isHi ? '५-सूत्रीय असली/नकली टेस्ट' : '5-Point Real/Fake Test'}
              </p>
            </div>
          </button>
        )}
      </div>

      {/* 2.8 SANATAN TOTKE & NAAM SAMPUTIT MANTRA DUAL CARDS */}
      <div className="grid grid-cols-2 gap-2.5">
        {onOpenTotke && (
          <button
            type="button"
            onClick={onOpenTotke}
            className="bg-gradient-to-br from-[#3D0A24] via-[#5C1037] to-[#3D0A24] text-white rounded-3xl p-3 sm:p-3.5 shadow-lg hover:shadow-xl active:scale-[0.98] transition-all text-left border-2 border-pink-400/80 flex flex-col justify-between group cursor-pointer"
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className="w-9 h-9 rounded-xl bg-pink-400/20 border border-pink-300/40 text-xl flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
                🔮
              </span>
              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-pink-400 text-stone-950">
                {isHi ? 'चमत्कारी लाभ' : 'Divine Remedies'}
              </span>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-pink-200 line-clamp-1 mt-1">
                {isHi ? 'सनातन अचूक टोटके' : 'Sanatan Totke'}
              </h4>
              <p className="text-[10px] text-pink-100/80 font-medium line-clamp-1 mt-0.5">
                {isHi ? 'धन, नजर व क्लेश निवारण' : 'Wealth, Evil Eye & Peace'}
              </p>
            </div>
          </button>
        )}

        {onOpenNaamMantra && (
          <button
            type="button"
            onClick={onOpenNaamMantra}
            className="bg-gradient-to-br from-[#1C1917] via-[#292524] to-[#1C1917] text-white rounded-3xl p-3 sm:p-3.5 shadow-lg hover:shadow-xl active:scale-[0.98] transition-all text-left border-2 border-yellow-400/90 flex flex-col justify-between group cursor-pointer"
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className="w-9 h-9 rounded-xl bg-yellow-400/20 border border-yellow-300/40 text-xl flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
                ✨
              </span>
              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-yellow-400 text-stone-950">
                {isHi ? 'शीघ्र फल' : 'Fast Result'}
              </span>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-yellow-200 line-clamp-1 mt-1">
                {isHi ? 'नाम संपुटित जप' : 'Name Mantra'}
              </h4>
              <p className="text-[10px] text-yellow-100/80 font-medium line-clamp-1 mt-0.5">
                {isHi ? 'अपना नाम जोड़कर जपें' : 'Chant with your name'}
              </p>
            </div>
          </button>
        )}
      </div>

      {/* 3. SANATAN ROYAL SACRED PORTALS */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        {portals.map((portal) => (
          <button
            key={portal.id}
            type="button"
            onClick={portal.onClick}
            className={`${
              portal.isFullWidth
                ? 'col-span-2 bg-gradient-to-r from-[#7A160A] via-[#B83814] to-[#7A160A] text-white border-2 border-amber-400 p-4 px-5 rounded-3xl shadow-xl flex items-center justify-between ring-2 ring-amber-400/40 active:scale-[0.98]'
                : 'col-span-1 bg-gradient-to-b from-white via-[#FFFDF9] to-[#FFF8EB] border-2 border-amber-300/80 hover:border-amber-500 p-4 rounded-3xl shadow-[0_4px_16px_rgba(180,83,9,0.08)] hover:shadow-md flex flex-col items-center justify-center text-center gap-2.5 active:scale-95'
            } transition-all cursor-pointer group`}
          >
            {portal.isFullWidth ? (
              portal.id === 'darshan' ? (
                <>
                  <div className="flex items-center gap-3">
                    <span className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 text-2xl flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform shrink-0">
                      {portal.logo}
                    </span>
                    <div className="text-left">
                      <span className="text-base sm:text-lg font-black text-white tracking-wide block">
                        {portal.name}
                      </span>
                      <span className="text-[11px] font-bold text-amber-200">
                        {isHi ? 'काशी, महाकाल, अयोध्या व बद्रीनाथ धाम' : 'Kashi, Mahakal, Ayodhya & Badrinath'}
                      </span>
                    </div>
                  </div>
                  <span className="px-4 py-2 rounded-2xl bg-gradient-to-r from-yellow-300 via-amber-400 to-amber-500 text-stone-950 font-black text-xs shadow-md group-hover:translate-x-1 transition-transform shrink-0">
                    {isHi ? 'दर्शन करें ❯' : 'Darshan ❯'}
                  </span>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <span className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 text-2xl flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform shrink-0">
                      {portal.logo}
                    </span>
                    <div className="text-left">
                      <span className="text-base sm:text-lg font-black text-white tracking-wide block">
                        {portal.name}
                      </span>
                      <span className="text-[11px] font-bold text-amber-200">
                        {isHi ? 'माला, शंखनाद व दिव्य मंत्र साधना' : 'Mala, Conch & Divine Chanting'}
                      </span>
                    </div>
                  </div>
                  <span className="px-4 py-2 rounded-2xl bg-gradient-to-r from-yellow-300 via-amber-400 to-amber-500 text-stone-950 font-black text-xs shadow-md group-hover:translate-x-1 transition-transform shrink-0">
                    {isHi ? 'शुरू करें ❯' : 'Start ❯'}
                  </span>
                </>
              )
            ) : (
              <>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 via-amber-50 to-orange-100 border-1.5 border-amber-300/80 text-3xl flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
                  <span>{portal.logo}</span>
                </div>
                <span className="text-sm sm:text-base font-black text-amber-950 group-hover:text-orange-700 tracking-wide transition-colors">
                  {portal.name}
                </span>
              </>
            )}
          </button>
        ))}
      </div>

      {/* 4. SANATAN SEVA, RATING, SHARE & FEEDBACK HUB */}
      {onOpenSeva && (
        <div className="p-4 rounded-3xl bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-amber-600/15 border-2 border-amber-300 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🪔</span>
              <div>
                <h3 className="text-sm font-black text-amber-950">
                  {isHi ? 'धर्म सेवा, सहयोग एवं सहभागिता' : 'Sanatan Seva & Community'}
                </h3>
                <p className="text-[10.5px] text-amber-900/80">
                  {isHi ? 'दान, ५-स्टार रेटिंग, धर्म प्रचार शेयर व सुझाव' : 'Donation, Rating, Share & Feedback'}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-black text-amber-900 bg-amber-200/90 px-2 py-0.5 rounded-full border border-amber-300">
              पुण्य कर्म
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 pt-1">
            <button
              type="button"
              onClick={() => onOpenSeva('donation')}
              className="p-2 rounded-2xl bg-white border border-amber-300 hover:bg-amber-50 active:scale-95 transition-all flex flex-col items-center gap-1 shadow-2xs"
            >
              <span className="text-xl">🪔</span>
              <span className="text-[10.5px] font-black text-orange-950">दान/दक्षिणा</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenSeva('rating')}
              className="p-2 rounded-2xl bg-white border border-amber-300 hover:bg-amber-50 active:scale-95 transition-all flex flex-col items-center gap-1 shadow-2xs"
            >
              <span className="text-xl">⭐</span>
              <span className="text-[10.5px] font-black text-orange-950">रेटिंग दें</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenSeva('share')}
              className="p-2 rounded-2xl bg-white border border-amber-300 hover:bg-amber-50 active:scale-95 transition-all flex flex-col items-center gap-1 shadow-2xs"
            >
              <span className="text-xl">🚩</span>
              <span className="text-[10.5px] font-black text-orange-950">शेयर करें</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenSeva('feedback')}
              className="p-2 rounded-2xl bg-white border border-amber-300 hover:bg-amber-50 active:scale-95 transition-all flex flex-col items-center gap-1 shadow-2xs"
            >
              <span className="text-xl">💬</span>
              <span className="text-[10.5px] font-black text-orange-950">सुझाव दें</span>
            </button>
          </div>
        </div>
      )}

      {/* Preloaded Continuous Native Ad Card at Bottom of Landing Page */}
      <div className="w-full pt-1.5">
        <AdMobNativeCard
          language={language}
          variant="native_advanced"
          slotName="Landing Page Bottom"
        />
      </div>
    </div>
  );
};

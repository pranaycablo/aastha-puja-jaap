import React, { useState } from 'react';
import { UserProfile, MantraItem, LanguageCode } from '../types';
import {
  getPersonalizedSadhanaPlan,
  UserPersonalizedSadhanaPlan,
  SadhanaDurationOption
} from '../utils/mantraSuggestionEngine';
import { sadhanaHistoryManager } from '../utils/sadhanaHistoryManager';
import { AdMobNativeCard } from './AdMobNativeCard';
import {
  Sparkles,
  X,
  Play,
  BookOpen,
  Calendar,
  Flame,
  Check,
  ChevronRight,
  Sun,
  Moon,
  Clock,
  ShieldCheck,
  Compass,
  AlertCircle
} from 'lucide-react';

interface DivineMantraSuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  language?: LanguageCode;
  onSelectMantraAndStartJaap: (mantra: MantraItem) => void;
  onOpenChalisa?: () => void;
  onOpenGranth?: (category?: string) => void;
}

export const DivineMantraSuggestionModal: React.FC<DivineMantraSuggestionModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  language = 'hi',
  onSelectMantraAndStartJaap,
  onOpenChalisa,
  onOpenGranth
}) => {
  if (!isOpen) return null;

  const isHi = language === 'hi';
  const plan: UserPersonalizedSadhanaPlan = getPersonalizedSadhanaPlan(userProfile, language);
  const [selectedDuration, setSelectedDuration] = useState<number>(0); // 0 = daily nitya

  const handleStartPrimaryJaap = () => {
    const matchedOption = plan.sadhanaPlanGuide.durationOptions.find((o) => o.days === selectedDuration);
    sadhanaHistoryManager.setActiveSankalp({
      planName: matchedOption ? matchedOption.titleHi : 'दैनिक नित्य नियम',
      targetDays: selectedDuration,
      dailyTargetMalas: matchedOption ? matchedOption.dailyMalas : 1,
      mantraId: plan.primaryIshtMantra.mantraItem.id,
      mantraName: plan.primaryIshtMantra.nameHi
    });
    onSelectMantraAndStartJaap(plan.primaryIshtMantra.mantraItem);
    onClose();
  };

  const handleOpenPrimaryPaath = () => {
    onClose();
    if (onOpenChalisa) {
      onOpenChalisa();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-4 select-none animate-fadeIn">
      <div className="bg-[#FFFDF9] w-full max-w-lg rounded-3xl shadow-2xl border-2 border-amber-400/90 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Royal Shrine Header */}
        <div className="bg-gradient-to-r from-[#5C0F08] via-[#85180C] to-[#5C0F08] text-white p-4 flex items-center justify-between border-b-2 border-amber-400/80 shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-500 text-stone-950 flex items-center justify-center text-xl shadow-[0_0_12px_rgba(245,158,11,0.5)] ring-1.5 ring-yellow-200 shrink-0">
              📿
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30">
                  {isHi ? 'शास्त्रोक्त अनुष्ठान मार्गदर्शिका' : 'Authentic Sadhana Guide'}
                </span>
                <span className="text-[11px] text-amber-200 font-bold">
                  इष्ट: {plan.ishtDevtaNameHi}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white leading-tight">
                {isHi ? `श्री ${plan.userName} जी की व्यक्तिगत साधना विधि` : `Personalized Sadhana for ${plan.userName} ji`}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 active:scale-95 transition-all text-amber-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Golden Shastric Rule Banner (NO CLUTTER) */}
        <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/20 to-amber-500/15 border-b border-amber-300 p-3 flex items-start gap-2.5 shrink-0">
          <span className="text-xl shrink-0 mt-0.5">📜</span>
          <div className="min-w-0">
            <p className="text-xs font-black text-amber-950">
              {isHi ? plan.sadhanaPlanGuide.dailyRuleTitleHi : 'Single-Focus Principle'}
            </p>
            <p className="text-[11px] text-amber-900 leading-relaxed font-medium mt-0.5">
              {isHi ? plan.sadhanaPlanGuide.dailyRuleDescHi : 'Focusing deeply on 1 chosen Isht Mantra awakens true divine grace.'}
            </p>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3.5 scrollbar-thin">

          {/* CARD 1: THE SINGLE PRIMARY ISHT MANTRA */}
          <div className="bg-gradient-to-br from-amber-50 via-orange-50/70 to-amber-100/90 border-2 border-amber-400 rounded-3xl p-4 shadow-sm relative overflow-hidden ring-1 ring-amber-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-orange-600 text-white shadow-2xs">
                ⭐ {isHi ? 'आपका १ मुख्य नित्य इष्ट मंत्र' : 'Your 1 Primary Isht Mantra'}
              </span>
              <span className="text-xs font-black text-orange-900 font-mono">
                {plan.primaryIshtMantra.dailyTargetCount}
              </span>
            </div>

            <div className="my-2 bg-white/95 p-3 rounded-2xl border border-amber-200 shadow-inner text-center">
              <p className="text-lg sm:text-xl font-bold font-sanskrit text-amber-950 leading-relaxed break-words whitespace-pre-line">
                {plan.primaryIshtMantra.sanskritText}
              </p>
            </div>

            <p className="text-xs text-stone-700 leading-relaxed font-medium mb-3">
              {plan.primaryIshtMantra.meaningHi}
            </p>

            <button
              onClick={handleStartPrimaryJaap}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white font-black text-sm shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isHi ? 'यह मुख्य मंत्र जाप अभी प्रारंभ करें (१०८ मणके)' : 'Start Chanting This Mantra'}</span>
            </button>
          </div>

          {/* CARD 2: THE SINGLE PRIMARY ISHT CHALISA / PAATH */}
          <div className="bg-white border-2 border-orange-200 rounded-3xl p-4 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                📖 {isHi ? 'आपका १ मुख्य दैनिक पाठ' : 'Your 1 Daily Paath'}
              </span>
              <span className="text-xs font-black text-orange-800">
                {plan.primaryIshtPaath.frequencyHi}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-2xl p-2 bg-amber-50 rounded-2xl border border-amber-200 shrink-0">
                  🚩
                </span>
                <div className="min-w-0">
                  <h4 className="text-sm sm:text-base font-black text-orange-950 truncate">
                    {plan.primaryIshtPaath.titleHi}
                  </h4>
                  <p className="text-xs text-gray-600 line-clamp-2 mt-0.5 leading-snug">
                    {plan.primaryIshtPaath.significanceHi}
                  </p>
                </div>
              </div>
              <button
                onClick={handleOpenPrimaryPaath}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-black text-xs shadow-xs hover:brightness-105 active:scale-95 transition-all shrink-0"
              >
                {isHi ? 'पाठ खोलें ❯' : 'Open ❯'}
              </button>
            </div>
          </div>

          {/* CARD 3: DURATION GUIDE — KITNE DIN KARNA CHAHIYE? */}
          <div className="bg-white border-2 border-amber-200 rounded-3xl p-4 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between border-b border-orange-100 pb-2">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-orange-600" />
                <h4 className="text-xs sm:text-sm font-black text-orange-950">
                  {isHi ? 'कितना दिन करना चाहिए? (अवधि संकल्प)' : 'Duration & Days Guide'}
                </h4>
              </div>
              <span className="text-[10px] text-gray-500 font-bold">
                {isHi ? 'अपनी स्थिति चुनें' : 'Select Goal'}
              </span>
            </div>

            <div className="space-y-2 pt-1">
              {plan.sadhanaPlanGuide.durationOptions.map((opt) => {
                const isSelected = selectedDuration === opt.days;
                return (
                  <div
                    key={opt.days}
                    onClick={() => setSelectedDuration(opt.days)}
                    className={`p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-50 border-amber-500 shadow-xs ring-1 ring-amber-300'
                        : 'bg-orange-50/40 border-orange-100 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-black text-xs text-orange-950 flex items-center gap-1.5">
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isSelected ? 'border-orange-600 bg-orange-600 text-white' : 'border-gray-400'}`}>
                          {isSelected && <Check className="w-2.5 h-2.5" />}
                        </span>
                        <span>{opt.labelHi}</span>
                      </span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white text-orange-900 border border-orange-200">
                        {opt.subtitleHi.split('•')[0].trim()}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-700 leading-relaxed pl-5 font-medium">
                      {opt.purposeHi}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CARD 4: SHASTRA RULES & TIMING (विधि, समय व दिशा) */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-3 text-xs space-y-1.5 text-orange-950">
            <h5 className="font-black flex items-center gap-1 text-[11px] text-orange-900">
              <Compass className="w-3.5 h-3.5 text-orange-600" />
              <span>{isHi ? 'पावन साधना नियम व सावधानियां:' : 'Rules & Auspicious Timing:'}</span>
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-gray-700">
              <p>⏰ <strong>सर्वोत्तम समय:</strong> प्रातः ब्रह्म मुहूर्त (५:००-६:३०) या सांध्य गोधूलि वेला।</p>
              <p>🧭 <strong>दिशा:</strong> पूर्व अथवा उत्तर दिशा की ओर मुख करके बैठें।</p>
              <p>🧘 <strong>आसन:</strong> ऊनी कम्बल अथवा कुशा का साफ़ आसन बिछाएं।</p>
              <p>📿 <strong>माला:</strong> तुलसी अथवा रुद्राक्ष माला को गोमुखी में रखकर जपें।</p>
            </div>
          </div>

          {/* TODAY'S OPTIONAL DAY ALIGNMENT (GENTLE WEEKDAY NOTE) */}
          <div className="bg-white border border-amber-200 rounded-2xl p-3 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                आज {plan.optionalDayAlignment.dayNameHi} का विशेष योग
              </span>
              <span className="text-[10px] text-gray-500 font-bold">वैकल्पिक (Optional)</span>
            </div>
            <p className="text-[11px] text-gray-700 leading-relaxed font-medium">
              {plan.optionalDayAlignment.noteHi}
            </p>
          </div>

          {/* NATIVE AD CARD EMBEDDED AT THE BOTTOM */}
          <AdMobNativeCard
            language={language}
            variant="compact"
            slotName="Sadhana Guide Modal"
            adIndex={0}
          />

        </div>

        {/* Pro Footer */}
        <div className="p-3 bg-gradient-to-r from-orange-50 to-amber-50 border-t border-amber-200 flex items-center justify-between text-xs">
          <span className="text-[11px] text-orange-950 font-bold">
            {isHi ? 'नित्य १ माला • अखंड कृपा व शांति' : 'Daily 1 Mala • Sacred Grace'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black text-xs rounded-xl shadow-xs hover:brightness-105 active:scale-95 transition-all"
          >
            {isHi ? 'पूर्ण (बंद करें)' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

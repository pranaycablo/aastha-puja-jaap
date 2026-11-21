import React, { useState } from 'react';
import { UserProfile, MantraItem, LanguageCode } from '../types';
import { DEITY_CONFIG, DEITY_CONFIG_EN } from '../data/mantraDatabase';
import { AdMobNativeCard } from './AdMobNativeCard';
import { SadhanaHistoryModal } from './SadhanaHistoryModal';
import {
  Award,
  Flame,
  Sparkles,
  Calendar,
  Share2,
  CheckCircle2,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface SiddhiStatsPageProps {
  userProfile: UserProfile;
  currentMantra: MantraItem;
  completedMalasInSession: number;
  totalSessionBeads: number;
  onOpenCertificate: () => void;
  onGoToJaap: () => void;
  language?: LanguageCode;
}

export const SiddhiStatsPage: React.FC<SiddhiStatsPageProps> = ({
  userProfile,
  currentMantra,
  completedMalasInSession,
  totalSessionBeads,
  onOpenCertificate,
  onGoToJaap,
  language = 'hi'
}) => {
  const isHindi = language === 'hi';
  const deityConfig = isHindi ? DEITY_CONFIG : DEITY_CONFIG_EN;
  const deity = deityConfig[userProfile.ishtDevta] || deityConfig.shiva;
  const deityLabel = deity?.label ? deity.label.split('(')[0].trim() : (isHindi ? 'भगवान शिव' : 'Lord Shiva');
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col p-4 pb-28 select-none animate-fadeIn">
      {/* Royal Header */}
      <div className="bg-gradient-to-r from-orange-700 via-amber-600 to-orange-800 text-white rounded-3xl p-5 shadow-lg mb-4 text-center relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border-2 border-amber-300/40 flex items-center justify-center text-3xl shadow-inner mb-2">
            🏆
          </div>
          <span className="text-[11px] font-black uppercase tracking-widest text-amber-300">
            {isHindi ? 'दैनिक साधना सिद्धि व सांख्यिकी' : 'SACRED SADHANA STATS'}
          </span>
          <h2 className="text-xl font-bold text-amber-100 mt-0.5 break-words">
            {userProfile.name} {isHindi ? 'जी का साधना विवरण' : "'s Sadhana Record"}
          </h2>
          <p className="text-xs text-orange-200 mt-1">
            {isHindi
              ? `गोत्र: ${userProfile.gotra} • इष्टदेव: ${deityLabel}`
              : `Gotra: ${userProfile.gotra} • Deity: ${deityLabel}`}
          </p>
        </div>
      </div>

      {/* Primary Statistics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Total Malas */}
        <div className="bg-[#FFFBF5] border-2 border-amber-300 rounded-2xl p-4 shadow-sm flex flex-col items-center text-center">
          <span className="text-2xl mb-1">📿</span>
          <span className="text-3xl font-black text-orange-700 font-mono">
            {userProfile.totalMalasCompletedAllTime}
          </span>
          <span className="text-xs font-bold text-orange-950 mt-1">
            {isHindi ? 'कुल पूर्ण मालाएं' : 'Total Malas'}
          </span>
          <span className="text-[10px] text-amber-900/70 font-semibold mt-0.5">
            {isHindi ? 'आजीवन संकल्प' : 'All-time completed'}
          </span>
        </div>

        {/* Total Beads */}
        <div className="bg-[#FFFBF5] border-2 border-amber-300 rounded-2xl p-4 shadow-sm flex flex-col items-center text-center">
          <span className="text-2xl mb-1">✨</span>
          <span className="text-3xl font-black text-amber-600 font-mono">
            {userProfile.totalBeadsAllTime}
          </span>
          <span className="text-xs font-bold text-orange-950 mt-1">
            {isHindi ? 'कुल मंत्र जाप' : 'Total Beads'}
          </span>
          <span className="text-[10px] text-amber-900/70 font-semibold mt-0.5">
            {isHindi ? 'पवित्र मणके' : 'Total chants'}
          </span>
        </div>

        {/* Current Daily Streak */}
        <div className="bg-gradient-to-br from-amber-100/90 to-orange-100/90 border-2 border-amber-400 rounded-2xl p-4 shadow-sm flex flex-col items-center text-center col-span-2">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-600 fill-orange-500 animate-pulse" />
            <span className="text-3xl font-black text-orange-900 font-mono">
              {userProfile.dailyStreak || 1} {isHindi ? 'दिन' : 'Days'}
            </span>
          </div>
          <span className="text-xs font-bold text-orange-950 mt-1">
            {isHindi ? 'अखंड दैनिक साधना निरंतरता' : 'Unbroken Daily Streak'}
          </span>
          <p className="text-[11px] text-orange-900 font-medium mt-1 max-w-xs break-words">
            {isHindi
              ? 'आपकी साधना निरंतर चल रही है। नित्य १ माला पूर्ण कर इसे अखंड बनाए रखें।'
              : 'Your sacred chanting streak is active. Keep it unbroken daily!'}
          </p>
        </div>
      </div>

      {/* Current Session Summary */}
      <div className="bg-[#FFFBF5] border-2 border-amber-300 rounded-2xl p-4 shadow-sm mb-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-orange-950 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-orange-600" />
          <span>{isHindi ? 'वर्तमान सत्र की स्थिति:' : 'Current Session Progress:'}</span>
        </h4>
        <div className="flex items-center justify-between text-xs py-1.5 border-b border-orange-100">
          <span className="text-gray-600">{isHindi ? 'वर्तमान मंत्र' : 'Current Mantra'}:</span>
          <span className="font-bold text-orange-950 truncate max-w-[200px]">
            {currentMantra.name}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs py-1.5 border-b border-orange-100">
          <span className="text-gray-600">{isHindi ? 'इस सत्र में पूर्ण माला' : 'Session Malas'}:</span>
          <span className="font-black text-orange-700 font-mono">
            {completedMalasInSession}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs py-1.5">
          <span className="text-gray-600">{isHindi ? 'कुल सत्र मणके' : 'Session Beads'}:</span>
          <span className="font-black text-amber-700 font-mono">
            {totalSessionBeads}
          </span>
        </div>
      </div>

      {/* NATIVE AD CARD ON STATS PAGE */}
      <AdMobNativeCard
        language={language}
        variant="compact"
        slotName="Siddhi Stats Feed"
        adIndex={2}
      />

      {/* Open Sadhana History Journal Button */}
      <button
        onClick={() => setShowHistoryModal(true)}
        className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#2A1545] to-[#1D0C33] border-2 border-amber-400/50 text-amber-200 font-bold text-sm shadow-lg hover:border-amber-300 active:scale-95 transition-all flex items-center justify-center gap-2 mb-3"
      >
        <Calendar className="w-4 h-4 text-amber-400" />
        <span>{isHindi ? '📜 सम्पूर्ण साधना इतिहास व डायरी देखें' : '📜 View Full Sadhana History Log'}</span>
      </button>

      {/* Royal Siddhi Certificate CTA Button */}
      <button
        onClick={onOpenCertificate}
        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-600 to-amber-600 text-white font-black text-base shadow-xl hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 ring-4 ring-amber-300 mb-3"
      >
        <Award className="w-5 h-5 text-amber-100" />
        <span>{isHindi ? '📜 दिव्य सिद्धि प्रमाण पत्र प्राप्त करें' : '📜 View Sacred Siddhi Certificate'}</span>
      </button>

      {/* Back to Jaap Button */}
      <button
        onClick={onGoToJaap}
        className="w-full py-3 px-4 rounded-xl bg-orange-100/90 text-orange-950 font-bold text-xs hover:bg-orange-200 transition-all flex items-center justify-center gap-1.5 border border-orange-200"
      >
        <span>{isHindi ? 'जाप कक्ष में वापस जाएं ❯' : 'Back to Chanting Sanctuary ❯'}</span>
      </button>

      {/* Sadhana History Modal */}
      {showHistoryModal && (
        <SadhanaHistoryModal
          isOpen={showHistoryModal}
          onClose={() => setShowHistoryModal(false)}
          userProfile={userProfile}
          language={language}
        />
      )}
    </div>
  );
};

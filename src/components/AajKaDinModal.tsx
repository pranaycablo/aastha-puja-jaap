import React from 'react';
import { UserProfile, LanguageCode } from '../types';
import { getTodayDivineGuidance, AajKaDinInfo } from '../utils/aajKaDinEngine';
import { ttsEngine } from '../utils/ttsEngine';
import { AdMobNativeCard } from './AdMobNativeCard';
import {
  X,
  Sun,
  Sparkles,
  Compass,
  Clock,
  ShieldAlert,
  Volume2,
  VolumeX,
  Play,
  HeartHandshake,
  CheckCircle2,
  Calendar
} from 'lucide-react';

interface AajKaDinModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onStartJaapWithMantra: (mantraName: string, mantraText: string) => void;
  onOpenKundali?: () => void;
  onOpenProfileSetup?: () => void;
  language?: LanguageCode;
}

export const AajKaDinModal: React.FC<AajKaDinModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onStartJaapWithMantra,
  onOpenKundali,
  onOpenProfileSetup,
  language = 'hi'
}) => {
  const isHi = language === 'hi';
  const [isPlayingMantra, setIsPlayingMantra] = React.useState(false);

  const hasRealDetails = Boolean(
    userProfile.isProfileSet &&
    userProfile.name &&
    userProfile.name.trim() !== '' &&
    userProfile.name !== 'साधक' &&
    userProfile.dob &&
    userProfile.dob.trim().length > 0
  );

  const guidance: AajKaDinInfo = React.useMemo(() => {
    return getTodayDivineGuidance(userProfile);
  }, [userProfile]);

  React.useEffect(() => {
    return () => {
      ttsEngine.stop();
    };
  }, []);

  if (!isOpen) return null;

  const handleToggleVoice = () => {
    if (isPlayingMantra) {
      ttsEngine.stop();
      setIsPlayingMantra(false);
    } else {
      setIsPlayingMantra(true);
      ttsEngine.speakMantra(guidance.todaysMantraTextHi, {
        lang: 'hi',
        rate: 0.9,
        onEnd: () => setIsPlayingMantra(false),
        onError: () => setIsPlayingMantra(false)
      });
    }
  };

  const handleStartChanting = () => {
    onClose();
    onStartJaapWithMantra(
      `दैनिक महामंत्र (${guidance.dayNameHi})`,
      guidance.todaysMantraTextHi
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 animate-fadeIn">
      <div className="bg-[#FFFDF9] border-2 border-orange-300 rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden select-none">
        {/* HEADER */}
        <div className="p-3 sm:p-4 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <span className="text-2xl p-1.5 rounded-xl bg-white/20">🌅</span>
            <div>
              <h2 className="text-sm sm:text-base font-black tracking-wide">
                {isHi ? 'आज का दिन व दैनिक पंचांग मार्गदर्शन' : "Today's Divine Guidance"}
              </h2>
              <p className="text-[11px] text-amber-100">
                {guidance.dateStr} • {guidance.dayNameHi}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 active:scale-95 transition-all text-amber-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENT BODY */}
        <div className="p-3 sm:p-4 overflow-y-auto space-y-3.5 flex-1 scrollbar-thin">
          {/* Birth Details Completion Prompt for Skipped Profiles */}
          {!hasRealDetails && onOpenProfileSetup && (
            <div className="bg-gradient-to-r from-amber-500 via-orange-600 to-amber-600 text-white rounded-2xl p-3 shadow-md border-2 border-yellow-300 flex items-center justify-between gap-2.5">
              <div className="min-w-0">
                <span className="text-[10px] font-black uppercase tracking-wider text-yellow-200 block">
                  {isHi ? '🔒 व्यक्तिगत राशिफल व मूलांक' : '🔒 Personalized Prediction'}
                </span>
                <p className="text-xs font-bold leading-tight mt-0.5">
                  {isHi
                    ? 'अपनी जन्म तिथि व नाम दर्ज करें जिससे आपका सटीक मूलांक, भाग्यांक व व्यक्तिगत फलादेश दिखे'
                    : 'Enter your birth date and name to unlock personalized astrology & moolank'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenProfileSetup();
                }}
                className="px-3 py-1.5 rounded-xl bg-white text-orange-950 font-black text-xs shrink-0 shadow-md active:scale-95 transition-transform cursor-pointer"
              >
                {isHi ? 'दर्ज करें ❯' : 'Add ❯'}
              </button>
            </div>
          )}

          {/* Devotee Greeting Badge */}
          <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border border-orange-200 rounded-2xl p-3 flex items-center justify-between shadow-2xs">
            <div>
              <span className="text-[10px] font-bold text-orange-700 tracking-wider block">
                {isHi ? 'दैनिक ज्योतिषीय फलादेश व पंचांग' : 'Daily Astrological Outlook'}
              </span>
              <h3 className="text-sm font-black text-orange-950">
                {hasRealDetails
                  ? `श्री ${userProfile.name} जी`
                  : (isHi ? 'पावन दैनिक मार्गदर्शन' : 'Auspicious Daily Guidance')}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-black">
              <span className="px-2.5 py-1 rounded-xl bg-orange-600 text-white shadow-2xs">
                {isHi ? `शुभ अंक: ${guidance.luckyNumber}` : `Lucky #${guidance.luckyNumber}`}
              </span>
            </div>
          </div>

              {/* 1. KEY HIGHLIGHTS: COLOR & LUCKY NUMBER */}
              <div className="grid grid-cols-2 gap-2.5">
            {/* Lucky Cloth Color */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-3 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-orange-900 block mb-1">
                  👔 {isHi ? 'आज का शुभ वस्त्र रंग:' : 'Lucky Cloth Color:'}
                </span>
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="w-5 h-5 rounded-full border-2 border-white shadow-xs shrink-0"
                    style={{ backgroundColor: guidance.auspiciousColorHex }}
                  />
                  <h3 className="text-xs sm:text-sm font-black text-orange-950 leading-tight">
                    {guidance.auspiciousColorNameHi}
                  </h3>
                </div>
              </div>
              <p className="text-[10px] text-gray-600 leading-relaxed">
                {guidance.auspiciousColorDescHi}
              </p>
            </div>

            {/* Lucky Numbers */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-300 rounded-2xl p-3 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-orange-900 block mb-1">
                  ✨ {isHi ? 'आज का शुभ अंक:' : 'Lucky Number:'}
                </span>
                <div className="flex items-center gap-2 my-1">
                  <span className="w-10 h-10 rounded-2xl bg-orange-600 text-white font-black text-xl flex items-center justify-center shadow">
                    {guidance.luckyNumber}
                  </span>
                  <div>
                    <span className="text-[11px] font-bold text-orange-950 block">
                      {isHi ? 'मुख्य शुभ अंक' : 'Primary'}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {isHi ? `सहायक अंक: ${guidance.secondaryLuckyNumber}` : `Secondary: ${guidance.secondaryLuckyNumber}`}
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-[9.5px] text-emerald-800 font-bold bg-emerald-100/80 px-1.5 py-0.5 rounded">
                ✓ {isHi ? 'निर्णय व कार्यों में प्रयुक्त करें' : 'Auspicious for actions'}
              </span>
            </div>
          </div>

          {/* 2. DAILY PREDICTION (आज का दिन कैसा रहेगा) */}
          <div className="bg-white border-2 border-orange-200 rounded-2xl p-3.5 shadow-2xs space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-orange-950 flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-orange-600" />
              <span>{isHi ? 'आज का दिन कैसा रहेगा?' : 'Today’s Planetary Outlook'}</span>
            </h4>
            <p className="text-xs text-gray-800 leading-relaxed font-medium bg-amber-50/50 p-2.5 rounded-xl border border-amber-200">
              {guidance.dailyPredictionHi}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
              <div className="bg-orange-50/60 p-2 rounded-xl border border-orange-100">
                <strong className="text-orange-950 block font-bold mb-0.5">
                  🩺 {isHi ? 'स्वास्थ्य व ऊर्जा:' : 'Health & Energy:'}
                </strong>
                <span className="text-gray-700">{guidance.healthPredictionHi}</span>
              </div>
              <div className="bg-emerald-50/60 p-2 rounded-xl border border-emerald-100">
                <strong className="text-emerald-950 block font-bold mb-0.5">
                  💼 {isHi ? 'कार्य व आर्थिक स्थिति:' : 'Career & Finance:'}
                </strong>
                <span className="text-gray-700">{guidance.careerFinanceHi}</span>
              </div>
            </div>
          </div>

          {/* 3. SHUBH MUHURAT & DISHA SHOOL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {/* Shubh Muhurat & Rahu Kaal */}
            <div className="bg-white border border-orange-200 p-2.5 rounded-2xl shadow-2xs space-y-1">
              <span className="text-[10px] font-black uppercase text-orange-900 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-orange-600" />
                <span>{isHi ? 'शुभ मुहूर्त व राहुकाल' : 'Muhurat'}</span>
              </span>
              <div className="text-[11px] space-y-1 text-gray-700">
                <p>
                  <strong className="text-emerald-800">✨ {isHi ? 'शुभ समय:' : 'Auspicious:'}</strong>{' '}
                  {guidance.luckyTimeHi}
                </p>
                <p>
                  <strong className="text-rose-800">⚠️ {isHi ? 'राहुकाल (त्याज्य):' : 'Rahu Kaal:'}</strong>{' '}
                  {guidance.rahuKaalHi}
                </p>
              </div>
            </div>

            {/* Disha Shool & Remedy */}
            <div className="bg-white border border-orange-200 p-2.5 rounded-2xl shadow-2xs space-y-1">
              <span className="text-[10px] font-black uppercase text-orange-900 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-orange-600" />
                <span>{isHi ? 'दिशा शूल व उपाय' : 'Disha Shool'}</span>
              </span>
              <div className="text-[11px] space-y-1 text-gray-700">
                <p>
                  <strong className="text-orange-950">🧭 {isHi ? 'दिशा शूल:' : 'Direction:'}</strong>{' '}
                  {guidance.dishaShoolHi}
                </p>
                <p>
                  <strong className="text-orange-800">💡 {isHi ? 'उपाय:' : 'Remedy:'}</strong>{' '}
                  {guidance.dishaShoolRemedyHi}
                </p>
              </div>
            </div>
          </div>

          {/* 4. TODAY'S CHARITY & DAAN */}
          <div className="bg-gradient-to-r from-amber-100/80 via-orange-50 to-amber-100/80 border border-amber-300 rounded-2xl p-2.5 flex items-center gap-2.5 text-xs text-orange-950">
            <span className="text-2xl shrink-0">🌾</span>
            <div>
              <strong className="text-orange-900 block font-bold text-[11px]">
                {isHi ? 'आज का शुभ दान:' : 'Recommended Charity Today:'}
              </strong>
              <p className="text-[11px] text-gray-700">{guidance.todaysCharityHi}</p>
            </div>
          </div>

          {/* NATIVE AD CARD IN AAJ KA DIN MODAL */}
          <AdMobNativeCard
            language={language}
            variant="compact"
            slotName="Aaj Ka Din Feed"
            adIndex={1}
          />

          {/* 5. TODAY'S DIVINE MANTRA (उच्चारण व जप) */}
          <div className="bg-gradient-to-b from-orange-100/90 to-amber-50 border-2 border-orange-300 rounded-2xl p-3 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-orange-950 uppercase tracking-wider flex items-center gap-1">
                <span>🔱</span>
                <span>{isHi ? `आज का सिद्ध मंत्र (${guidance.todaysMantraHi})` : "Today's Sacred Mantra"}</span>
              </span>
            </div>

            <p className="text-sm font-bold font-sanskrit text-amber-950 text-center bg-white/90 p-2.5 rounded-xl border border-orange-200 shadow-inner">
              {guidance.todaysMantraTextHi}
            </p>

            <button
              type="button"
              onClick={handleStartChanting}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black text-xs shadow hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isHi ? 'इस मंत्र का जाप माला पर आरंभ करें 📿' : 'Start Chanting This Mantra'}</span>
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-3 bg-orange-50 border-t border-orange-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-orange-600 text-white font-bold text-xs shadow-xs hover:bg-orange-700 active:scale-95 transition-all"
          >
            {isHi ? 'पूर्ण (बंद करें)' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

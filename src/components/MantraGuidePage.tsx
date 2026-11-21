import React, { useState } from 'react';
import { MantraItem, UserProfile, LanguageCode } from '../types';
import { getDetailedMantraGuide } from '../utils/mantraGuideHelper';
import { ttsEngine } from '../utils/ttsEngine';
import { KarMalaMudraGuide } from './KarMalaMudraGuide';
import {
  Volume2,
  VolumeX,
  Sparkles,
  Compass,
  Clock,
  Award,
  CheckCircle2,
  Flame,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  ShieldCheck,
  Disc,
  Play,
  Check
} from 'lucide-react';

interface MantraGuidePageProps {
  mantra: MantraItem;
  userProfile: UserProfile;
  onProceedToSetup: () => void;
  onProceedToJaap: () => void;
  onBackToMantraSelect: () => void;
  language?: LanguageCode;
}

export const MantraGuidePage: React.FC<MantraGuidePageProps> = ({
  mantra,
  userProfile,
  onProceedToSetup,
  onProceedToJaap,
  onBackToMantraSelect,
  language = 'hi'
}) => {
  const isHi = language === 'hi';
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPlayingDhyan, setIsPlayingDhyan] = useState(false);
  const [guideTab, setGuideTab] = useState<'pujan' | 'siddhi'>('pujan');
  const [showMudraModal, setShowMudraModal] = useState(false);

  // Stop any active TTS recitation when user navigates away
  React.useEffect(() => {
    return () => {
      ttsEngine.stop();
    };
  }, []);

  const guide = getDetailedMantraGuide(mantra, language);

  const handleToggleMantraVoice = () => {
    if (isPlayingAudio) {
      ttsEngine.stop();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingDhyan(false);
      setIsPlayingAudio(true);
      ttsEngine.speakMantra(mantra.text, {
        lang: language,
        rate: 0.92,
        onEnd: () => setIsPlayingAudio(false),
        onError: () => setIsPlayingAudio(false)
      });
    }
  };

  const handleToggleDhyanVoice = () => {
    if (isPlayingDhyan) {
      ttsEngine.stop();
      setIsPlayingDhyan(false);
    } else {
      setIsPlayingAudio(false);
      setIsPlayingDhyan(true);
      ttsEngine.speakMantra(guide.dhyanShloka, {
        lang: language,
        rate: 0.88,
        onEnd: () => setIsPlayingDhyan(false),
        onError: () => setIsPlayingDhyan(false)
      });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col select-none pb-28 px-3 sm:px-4 animate-fadeIn">
      {/* 1. TOP NAVIGATION & STEPPER */}
      <div className="flex items-center justify-between pt-1 pb-2">
        <button
          onClick={onBackToMantraSelect}
          className="flex items-center gap-1 text-xs font-bold text-orange-900 hover:text-orange-950 px-2.5 py-1.5 rounded-xl bg-orange-100/80 hover:bg-orange-200 transition-all border border-orange-200 shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-orange-600" />
          <span>{isHi ? 'अन्य मंत्र चुनें' : 'Change Mantra'}</span>
        </button>

        <div className="flex items-center gap-1.5 text-[11px] font-black text-orange-900 bg-orange-100/90 px-3 py-1 rounded-full border border-orange-300">
          <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
          <span>{isHi ? 'मंत्र साधना व सिद्धि विधान' : 'Sadhana & Siddhi Guide'}</span>
        </div>

        <button
          onClick={onProceedToSetup}
          className="flex items-center gap-1 text-xs font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 px-3 py-1.5 rounded-xl shadow-xs hover:brightness-105 active:scale-95 transition-all"
        >
          <span>{isHi ? 'सेटिंग्स' : 'Setup'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. MANTRA BANNER & SACRED TEXT CARD */}
      <div className="bg-gradient-to-b from-amber-500 via-orange-600 to-orange-700 text-white rounded-3xl p-4 sm:p-5 shadow-xl border-2 border-amber-300/40 relative overflow-hidden mb-3">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />

        {/* Deity + Category Badge */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-black/25 backdrop-blur-xs text-[11px] font-black tracking-wide border border-white/20">
            🔱 {mantra.deityLabel}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-400/90 text-orange-950 text-[10px] font-black tracking-wider shadow-xs">
            {mantra.categoryLabel}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-base sm:text-lg font-black tracking-tight leading-snug mb-2 text-amber-100">
          {mantra.name}
        </h2>

        {/* Sacred Sanskrit Text */}
        <div className="bg-orange-950/45 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-amber-300/30 mb-3 max-h-48 overflow-y-auto scrollbar-thin">
          <p className="font-sanskrit text-base sm:text-lg text-center leading-relaxed font-bold tracking-wide text-amber-50 drop-shadow-xs whitespace-pre-line">
            {mantra.text}
          </p>
        </div>

        {/* Meaning */}
        {mantra.meaning && (
          <div className="mt-3 pt-2.5 border-t border-white/20 text-xs leading-relaxed text-amber-100/95 font-medium bg-black/15 p-2.5 rounded-xl">
            <strong className="text-amber-200 block mb-0.5 font-bold">✨ {isHi ? 'पावन अर्थ व महात्म्य:' : 'Sacred Meaning:'}</strong>
            <p>{mantra.meaning}</p>
          </div>
        )}
      </div>

      {/* 3. DUAL WORKFLOW TABS: PUJAN & DHYAN vs SIDDHI ANUSHTHAN */}
      <div className="w-full grid grid-cols-2 gap-1.5 p-1.5 bg-orange-100/90 rounded-2xl border border-orange-300/80 mb-3 text-xs font-black">
        <button
          type="button"
          onClick={() => setGuideTab('pujan')}
          className={`py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
            guideTab === 'pujan'
              ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md ring-1 ring-amber-300'
              : 'text-orange-950 hover:bg-white/60 bg-white/40 border border-orange-200/50'
          }`}
        >
          <span>🪔</span>
          <span>{isHi ? 'दैनिक पूजन व ध्यान' : 'Pujan & Dhyan'}</span>
        </button>

        <button
          type="button"
          onClick={() => setGuideTab('siddhi')}
          className={`py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
            guideTab === 'siddhi'
              ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md ring-1 ring-amber-300'
              : 'text-orange-950 hover:bg-white/60 bg-white/40 border border-orange-200/50'
          }`}
        >
          <span>🎯</span>
          <span>{isHi ? 'मंत्र सिद्धि विधान' : 'Siddhi Rules'}</span>
        </button>
      </div>

      {/* TAB 1 CONTENT: DAINIK PUJAN & DHYAN RITUAL */}
      {guideTab === 'pujan' ? (
        <div className="space-y-3">
          {/* STEP 1: पवित्रीकरण एवं आचमन */}
          <div className="bg-white border-2 border-orange-200 rounded-2xl p-3.5 shadow-xs">
            <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-orange-100">
              <span className="w-7 h-7 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center text-sm font-black">
                💧
              </span>
              <div>
                <h3 className="text-xs sm:text-sm font-black text-orange-950">
                  {isHi ? '१. पवित्रीकरण एवं आचमन विधि' : '1. Purification & Achaman'}
                </h3>
                <p className="text-[10px] text-gray-500">
                  {isHi ? 'जप से पूर्व बाह्य व आंतरिक शुद्धि का विधान' : 'Purifying body and mind before chanting'}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="bg-orange-50/70 p-2.5 rounded-xl border border-orange-200">
                <span className="text-[10px] font-bold text-orange-800 uppercase block mb-1">
                  {isHi ? 'पवित्रीकरण मंत्र (जल अपने ऊपर छिड़कें):' : 'Purification Mantra:'}
                </span>
                <p className="font-sanskrit font-bold text-orange-950 text-sm leading-relaxed">
                  {guide.pavitrikaranMantra}
                </p>
              </div>

              <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200">
                <span className="text-[10px] font-bold text-amber-800 uppercase block mb-1">
                  {isHi ? 'आचमन विधि (दाहिने हाथ से ३ बार जल ग्रहण):' : 'Achaman Ritual:'}
                </span>
                <p className="font-medium text-orange-950 whitespace-pre-line leading-relaxed text-[11px]">
                  {guide.achamanVidhi}
                </p>
              </div>
            </div>
          </div>

          {/* STEP 2: दीप प्रज्ज्वलन एवं आसन वंदना */}
          <div className="bg-white border-2 border-orange-200 rounded-2xl p-3.5 shadow-xs">
            <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-orange-100">
              <span className="w-7 h-7 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-black">
                🪔
              </span>
              <div>
                <h3 className="text-xs sm:text-sm font-black text-orange-950">
                  {isHi ? '२. दीप प्रज्ज्वलन एवं आसन वंदना' : '2. Lighting Lamp & Asan Prayer'}
                </h3>
                <p className="text-[10px] text-gray-500">
                  {isHi ? 'साक्षी दीपक व पृथ्वी माता की प्रार्थना' : 'Invoking divine light and sacred ground'}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200">
                <span className="text-[10px] font-bold text-amber-800 uppercase block mb-1">
                  {isHi ? 'दीप ज्योति मंत्र (दीपक जलाते समय बोलें):' : 'Lamp Invocation:'}
                </span>
                <p className="font-sanskrit font-bold text-amber-950 text-sm leading-relaxed">
                  {guide.deepakPrarthana}
                </p>
              </div>

              <div className="bg-orange-50/70 p-2.5 rounded-xl border border-orange-200">
                <span className="text-[10px] font-bold text-orange-800 uppercase block mb-1">
                  {isHi ? 'भूमि व आसन प्रार्थना:' : 'Earth & Seating Prayer:'}
                </span>
                <p className="font-sanskrit font-bold text-orange-950 text-sm leading-relaxed">
                  {guide.bhumiPrarthana}
                </p>
              </div>
            </div>
          </div>

          {/* STEP 3: स्वनाम व गोत्र संकल्प विधान */}
          <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-2 border-orange-300 rounded-2xl p-3.5 shadow-xs">
            <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-orange-200">
              <span className="w-7 h-7 rounded-xl bg-orange-600 text-white flex items-center justify-center text-sm font-black shadow-xs">
                📜
              </span>
              <div>
                <h3 className="text-xs sm:text-sm font-black text-orange-950">
                  {isHi ? '३. दैनिक स्वनाम व गोत्र संकल्प' : '3. Personalized Daily Sankalp'}
                </h3>
                <p className="text-[10px] text-gray-500">
                  {isHi ? 'बिना संकल्प के जप का फल पूर्ण नहीं होता' : 'Sanctifying your chanting with personal intent'}
                </p>
              </div>
            </div>

            <div className="bg-white/95 p-3 rounded-xl border border-orange-200 space-y-2 text-xs">
              <div className="flex items-center justify-between text-[11px] bg-orange-100/70 px-2.5 py-1 rounded-lg text-orange-950 font-bold">
                <span>नाम: <strong>{userProfile.name}</strong></span>
                <span>गोत्र: <strong>{userProfile.gotra}</strong></span>
              </div>

              <p className="text-orange-950 font-medium leading-relaxed bg-orange-50/50 p-2.5 rounded-lg border border-orange-100 text-[11px]">
                {isHi
                  ? `दाहिने हाथ में जल, अक्षत, पुष्प और सिक्का लेकर कहें: "ॐ तत्सत्! अद्य... मैं ${userProfile.name}, गोत्र ${userProfile.gotra}, श्री ${mantra.deityLabel} की प्रसन्नता एवं समस्त संकट निवारण व अभीष्ट सिद्धि हेतु श्री '${mantra.name}' का यह पावन जप संकल्प लेता हूँ। हे प्रभु! मेरी साधना निर्विघ्न पूर्ण हो।" (जल को भूमि पर छोड़ें)`
                  : guide.sankalpVidhi}
              </p>
            </div>
          </div>

          {/* STEP 4: इष्टदेव ध्यान श्लोक एवं स्वरूप चिंतन */}
          <div className="bg-white border-2 border-orange-200 rounded-2xl p-3.5 shadow-xs">
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-orange-100">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-black">
                  🧘
                </span>
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-orange-950">
                    {isHi ? '४. इष्टदेव ध्यान श्लोक एवं स्वरूप चिंतन' : '4. Deity Dhyan & Inner Visualization'}
                  </h3>
                  <p className="text-[10px] text-gray-500">
                    {isHi ? 'नेत्र बंद कर हृदय में इष्टदेव का साक्षात दर्शन करें' : 'Visualizing the divine form in your spiritual heart'}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="bg-purple-50/60 p-3 rounded-xl border border-purple-200">
                <p className="font-sanskrit font-bold text-purple-950 text-center text-sm leading-relaxed whitespace-pre-line">
                  {guide.dhyanShloka}
                </p>
              </div>

              <div className="bg-orange-50/60 p-2.5 rounded-xl border border-orange-100 text-orange-950 text-[11px] leading-relaxed">
                <strong className="block text-orange-900 mb-0.5 font-bold">✨ ध्यान भावना (स्वरूप चिंतन):</strong>
                <p>{guide.dhyanShlokaHindi}</p>
              </div>
            </div>
          </div>

          {/* STEP 5: जप समर्पण एवं क्षमा प्रार्थना */}
          <div className="bg-white border-2 border-orange-200 rounded-2xl p-3.5 shadow-xs">
            <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-orange-100">
              <span className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-black">
                🙏
              </span>
              <div>
                <h3 className="text-xs sm:text-sm font-black text-orange-950">
                  {isHi ? '५. जप समर्पण एवं क्षमा प्रार्थना' : '5. Jap Samarpan & Forgiveness'}
                </h3>
                <p className="text-[10px] text-gray-500">
                  {isHi ? 'जप समाप्ति पर माला को मस्तक से लगाकर बोलें' : 'Dedication and seeking forgiveness at completion'}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-200">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block mb-1">
                  {isHi ? 'जप समर्पण श्लोक (प्रभु चरणों में जप अर्पण):' : 'Samarpan Shloka:'}
                </span>
                <p className="font-sanskrit font-bold text-emerald-950 text-sm leading-relaxed whitespace-pre-line">
                  {guide.samarpanMantra}
                </p>
              </div>

              <div className="bg-orange-50/60 p-2.5 rounded-xl border border-orange-200">
                <span className="text-[10px] font-bold text-orange-800 uppercase block mb-1">
                  {isHi ? 'क्षमा प्रार्थना (त्रुटियों हेतु क्षमा याचना):' : 'Kshama Prarthana:'}
                </span>
                <p className="font-sanskrit font-bold text-orange-950 text-sm leading-relaxed whitespace-pre-line">
                  {guide.kshamaPrarthana}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* TAB 2 CONTENT: MANTRA SIDDHI VIDHAN & ANUSHTHAN RULES */
        <div className="space-y-3">
          {/* CARD A: साधना स्थान, आसन व मुद्रा */}
          <div className="bg-white border-2 border-orange-200 rounded-2xl p-3.5 shadow-xs">
            <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-orange-100">
              <span className="w-7 h-7 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center text-sm font-black">
                🏛️
              </span>
              <div>
                <h3 className="text-xs sm:text-sm font-black text-orange-950">
                  {isHi ? '१. साधना स्थान, आसन व ध्यान मुद्रा' : '1. Sacred Place, Asan & Mudra'}
                </h3>
                <p className="text-[10px] text-gray-500">
                  {isHi ? 'शास्त्र सम्मत स्थान, मुद्रा व ऊर्जा संचय हेतु आसन' : 'Scriptural place, mudra, and direction'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="bg-orange-50/70 p-2.5 rounded-xl border border-orange-100">
                <span className="text-[10px] font-bold text-orange-800 uppercase block mb-0.5">
                  🏛️ {isHi ? 'साधना का श्रेष्ठ स्थान:' : 'Sacred Place:'}
                </span>
                <p className="font-bold text-orange-950">
                  {guide.sthan || mantra.sthan || (isHi ? 'घर का शांत पूजा स्थल, देवालय अथवा पवित्र नदी तट' : 'Home temple, shrine or holy river bank')}
                </p>
              </div>

              <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-100">
                <span className="text-[10px] font-bold text-amber-800 uppercase block mb-0.5">
                  🧘‍♂️ {isHi ? 'ध्यान मुद्रा व बैठने की स्थिति:' : 'Mudra & Posture:'}
                </span>
                <p className="font-bold text-amber-950">
                  {guide.mudra || mantra.mudra || (isHi ? 'ज्ञान मुद्रा अथवा पद्मासन/सुखासन' : 'Gyan Mudra, Padmasan or Sukhasan')}
                </p>
              </div>

              <div className="bg-orange-50/70 p-2.5 rounded-xl border border-orange-100">
                <span className="text-[10px] font-bold text-orange-800 uppercase block mb-0.5">
                  🪑 {isHi ? 'उपयुक्त आसन व रंग:' : 'Asan & Color:'}
                </span>
                <p className="font-bold text-orange-950">{guide.aasan}</p>
                <span className="text-[10px] text-gray-500 mt-0.5 block">
                  {isHi ? `पसंदीदा रंग: ${guide.aasanColor}` : `Color: ${guide.aasanColor}`}
                </span>
              </div>

              <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-100">
                <span className="text-[10px] font-bold text-amber-800 uppercase block mb-0.5 flex items-center gap-1">
                  <Compass className="w-3 h-3 text-amber-700" />
                  <span>{isHi ? 'मुख की दिशा:' : 'Facing Direction:'}</span>
                </span>
                <p className="font-bold text-amber-950">{guide.disha}</p>
                <span className="text-[10px] text-gray-500 mt-0.5 block">
                  {isHi ? 'रीढ़ की हड्डी सीधी रखकर बैठें' : 'Keep spine straight'}
                </span>
              </div>
            </div>

            {/* Interactive Button to Open Illustrated Kar-Mala, Asan & Mudra Visual Guide */}
            <button
              type="button"
              onClick={() => setShowMudraModal(true)}
              className="mt-3 w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white font-black text-xs shadow hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 ring-1 ring-orange-400"
            >
              <span>🖐️</span>
              <span>{isHi ? '१०८ करमाला, ४ दिव्य आसन व ८ मुद्रा सचित्र गाइड देखें ❯' : 'View Illustrated 108 Kar-Mala, 4 Asanas & 8 Mudras Guide ❯'}</span>
            </button>
          </div>

          {/* CARD B: शुभ समय व मुहूर्त */}
          <div className="bg-white border-2 border-orange-200 rounded-2xl p-3.5 shadow-xs">
            <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-orange-100">
              <span className="w-7 h-7 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-black">
                ⏰
              </span>
              <div>
                <h3 className="text-xs sm:text-sm font-black text-orange-950">
                  {isHi ? '२. सर्वोत्तम समय व शुभ मुहूर्त' : '2. Best Timing & Muhurat'}
                </h3>
                <p className="text-[10px] text-gray-500">
                  {isHi ? 'जब मंत्र जप का फल सहस्त्र गुना बढ़ जाता है' : 'When mantra chanting yields highest power'}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 bg-gradient-to-r from-orange-50 to-amber-50 p-2.5 rounded-xl border border-orange-100">
                <Clock className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-orange-950 font-bold block">
                    {isHi ? 'सर्वोत्तम जप काल:' : 'Prime Chanting Hours:'}
                  </strong>
                  <p className="text-gray-700 font-medium leading-relaxed">{guide.shubhSamay}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-amber-50/60 p-2.5 rounded-xl border border-amber-100">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-950 font-bold block">
                    {isHi ? 'विशेष पावन तिथियां व पर्व:' : 'Auspicious Days & Tithis:'}
                  </strong>
                  <p className="text-gray-700 leading-relaxed">{guide.visheshTithi}</p>
                </div>
              </div>
            </div>
          </div>

          {/* CARD C: मंत्र सिद्धि ज्ञान व जप संख्या */}
          <div className="bg-white border-2 border-orange-200 rounded-2xl p-3.5 shadow-xs">
            <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-orange-100">
              <span className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-black">
                🎯
              </span>
              <div>
                <h3 className="text-xs sm:text-sm font-black text-orange-950">
                  {isHi ? '३. मंत्र सिद्धि ज्ञान व जप संख्या' : '3. Mantra Siddhi Target & Chants'}
                </h3>
                <p className="text-[10px] text-gray-500">
                  {isHi ? 'मंत्र को जाग्रत व चैतन्य करने का शास्त्र सम्मत विधान' : 'Scriptural method to awaken the mantra'}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="bg-purple-50/70 p-2.5 rounded-xl border border-purple-100">
                  <span className="text-[10px] font-bold text-purple-800 uppercase block mb-0.5">
                    {isHi ? 'सिद्धि हेतु कुल जप:' : 'Total Siddhi Chants:'}
                  </span>
                  <p className="font-bold text-purple-950">{guide.siddhiCount}</p>
                </div>

                <div className="bg-indigo-50/70 p-2.5 rounded-xl border border-indigo-100">
                  <span className="text-[10px] font-bold text-indigo-800 uppercase block mb-0.5">
                    {isHi ? 'अनुष्ठान अवधि:' : 'Anushthan Duration:'}
                  </span>
                  <p className="font-bold text-indigo-950">{guide.anushthanDays}</p>
                </div>
              </div>

              <div className="bg-purple-50/40 p-2.5 rounded-xl border border-purple-100 text-gray-700 leading-relaxed">
                <strong className="text-purple-950 block mb-0.5 flex items-center gap-1 font-bold">
                  <Flame className="w-3.5 h-3.5 text-red-600" />
                  <span>{isHi ? 'दशांश हवन व पूर्णता विधान:' : 'Dashansh Havan:'}</span>
                </strong>
                <p>{guide.dashanshHavan}</p>
              </div>

              {(guide.siddhiVidhiText || mantra.siddhiVidhi) && (
                <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200 text-gray-800 leading-relaxed">
                  <strong className="text-orange-950 block mb-0.5 flex items-center gap-1 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                    <span>{isHi ? 'करने की प्रामाणिक विधि व अनुष्ठान क्रम:' : 'Authentic Sadhana Vidhi & Steps:'}</span>
                  </strong>
                  <p className="leading-relaxed font-medium">{guide.siddhiVidhiText || mantra.siddhiVidhi}</p>
                </div>
              )}
            </div>
          </div>

          {/* CARD D: साधना के प्रमुख नियम व यम-नियम */}
          <div className="bg-white border-2 border-orange-200 rounded-2xl p-3.5 shadow-xs">
            <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-orange-100">
              <span className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-black">
                📜
              </span>
              <div>
                <h3 className="text-xs sm:text-sm font-black text-orange-950">
                  {isHi ? '४. साधना के अनिवार्य नियम (यम-नियम)' : '4. Essential Discipline'}
                </h3>
                <p className="text-[10px] text-gray-500">
                  {isHi ? 'नियम पालन से ही मंत्र में तेज और शीघ्र फल की प्राप्ति होती है' : 'Discipline unlocks divine potency'}
                </p>
              </div>
            </div>

            <ul className="space-y-1.5 text-xs text-gray-800">
              {guide.niyamList.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-emerald-50/50 p-2 rounded-xl border border-emerald-100/70">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CARD E: उपयुक्त माला व पूजन सामग्री */}
          <div className="bg-white border-2 border-orange-200 rounded-2xl p-3.5 shadow-xs">
            <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-orange-100">
              <span className="w-7 h-7 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center text-sm font-black">
                📿
              </span>
              <div>
                <h3 className="text-xs sm:text-sm font-black text-orange-950">
                  {isHi ? '५. उपयुक्त माला व पूजन सामग्री' : '5. Sacred Mala & Offerings'}
                </h3>
                <p className="text-[10px] text-gray-500">
                  {isHi ? 'मनकों की शक्ति और शुद्ध सामग्रियां' : 'Proper beads and sacred offerings'}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-100">
                <strong className="text-orange-950 font-bold block mb-0.5">
                  {isHi ? 'सर्वोत्तम माला:' : 'Recommended Mala:'} {guide.malaName}
                </strong>
                <p className="text-gray-600 leading-relaxed">{guide.malaVidhi}</p>
              </div>

              <div className="bg-orange-50/60 p-2.5 rounded-xl border border-orange-100">
                <strong className="text-orange-950 font-bold block mb-1">
                  🪔 {isHi ? 'पूजन सामग्री सूची:' : 'Sacred Offerings List:'}
                </strong>
                <div className="flex flex-wrap gap-1.5">
                  {guide.pujaSamagriList.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-lg bg-white border border-orange-200 text-orange-950 text-[11px] font-medium"
                    >
                      • {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. PERSISTENT PROCEED TO JAAP BUTTON */}
      <div className="mt-4 pt-2">
        <button
          onClick={onProceedToJaap}
          className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white font-black text-sm sm:text-base shadow-2xl hover:brightness-105 active:scale-95 flex items-center justify-center gap-2.5 ring-4 ring-amber-300/60 transition-all"
        >
          <span>📿</span>
          <span>{isHi ? 'इस विधि से पावन जाप आरंभ करें' : 'Start Jaap Sanctuary With This Vidhi'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* 5. KAR MALA MUDRA MODAL */}
      {showMudraModal && (
        <KarMalaMudraGuide
          isOpen={showMudraModal}
          onClose={() => setShowMudraModal(false)}
          language={language}
          initialTab="kar_mala"
        />
      )}
    </div>
  );
};

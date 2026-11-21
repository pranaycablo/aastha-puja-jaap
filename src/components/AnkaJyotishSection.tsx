import React, { useState, useMemo } from 'react';
import { UserProfile, LanguageCode } from '../types';
import {
  analyzeMobileNumber,
  analyzeNameNumerology,
  calculateMoolank,
  calculateBhagyank,
  CHALDEAN_MAP,
  MobileAnalysisResult,
  NameAnalysisResult
} from '../utils/ankaJyotishEngine';
import {
  Smartphone,
  Edit3,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Flame,
  Award,
  ShieldCheck,
  RefreshCw,
  Search,
  Star,
  Zap,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface AnkaJyotishSectionProps {
  userProfile: UserProfile;
  language?: LanguageCode;
}

export const AnkaJyotishSection: React.FC<AnkaJyotishSectionProps> = ({
  userProfile,
  language = 'hi'
}) => {
  const isHi = language === 'hi';
  const [activeSubTab, setActiveSubTab] = useState<'mobile' | 'name'>('mobile');

  // Mobile Numerology States - strictly real user data
  const initialPhone = userProfile.phone && userProfile.phone.replace(/\D/g, '').length >= 10 ? userProfile.phone : '';
  const [mobileInput, setMobileInput] = useState<string>(initialPhone);
  const [analyzedMobile, setAnalyzedMobile] = useState<MobileAnalysisResult | null>(() => {
    return initialPhone ? analyzeMobileNumber(initialPhone, userProfile.dob) : null;
  });

  // Name Numerology States - strictly real user data
  const initialName = userProfile.name && userProfile.name.trim() !== '' && userProfile.name !== 'साधक' ? userProfile.name : '';
  const [nameInput, setNameInput] = useState<string>(initialName);
  const [analyzedName, setAnalyzedName] = useState<NameAnalysisResult | null>(() => {
    return initialName ? analyzeNameNumerology(initialName, userProfile.dob) : null;
  });

  const [showD1toD10Guide, setShowD1toD10Guide] = useState<boolean>(true);

  // Keep in sync with user profile changes
  React.useEffect(() => {
    if (userProfile.name && userProfile.name !== 'साधक') {
      setNameInput(userProfile.name);
      setAnalyzedName(analyzeNameNumerology(userProfile.name, userProfile.dob));
    }
    if (userProfile.phone && userProfile.phone.replace(/\D/g, '').length >= 10) {
      setMobileInput(userProfile.phone);
      setAnalyzedMobile(analyzeMobileNumber(userProfile.phone, userProfile.dob));
    }
  }, [userProfile.name, userProfile.phone, userProfile.dob]);

  const handleAnalyzeMobile = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (mobileInput.replace(/\D/g, '').length >= 10) {
      const result = analyzeMobileNumber(mobileInput, userProfile.dob);
      setAnalyzedMobile(result);
    }
  };

  const handleAnalyzeName = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (nameInput.trim()) {
      const result = analyzeNameNumerology(nameInput, userProfile.dob);
      setAnalyzedName(result);
    }
  };

  const userMoolank = useMemo(() => calculateMoolank(userProfile.dob), [userProfile.dob]);
  const userBhagyank = useMemo(() => calculateBhagyank(userProfile.dob), [userProfile.dob]);

  return (
    <div className="space-y-4 animate-fadeIn select-none">
      {/* 1. TOP HEADER BANNER */}
      <div className="bg-gradient-to-r from-orange-700 via-amber-600 to-orange-800 text-white rounded-2xl p-3 sm:p-4 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-3xl p-2 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20">
            🔢
          </span>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-base sm:text-lg font-black tracking-wide">
                {isHi ? 'वैदिक व चालडियन अंक ज्योतिष' : 'Vedic Numerology'}
              </h2>
              <span className="text-[10px] bg-amber-400 text-orange-950 font-black px-1.5 py-0.5 rounded uppercase">
                {isHi ? 'अंक शास्त्र' : 'Shastric'}
              </span>
            </div>
            <p className="text-[11px] text-amber-100">
              {isHi
                ? 'मोबाइल नंबर का वास्तविक प्रभाव एवं नाम अंक शोधन व सुधार (Name Correction)'
                : 'Mobile number vibration and auspicious name spelling correction'}
            </p>
          </div>
        </div>
      </div>

      {/* Devotee Birth Numerology Pill */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200 rounded-2xl p-2.5 flex items-center justify-between text-xs text-orange-950">
        <div className="flex items-center gap-2">
          <span>🎂</span>
          <span>
            {isHi ? 'आपकी जन्म तिथि:' : 'DOB:'} <strong>{userProfile.dob || '०१-०१-१९९५'}</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-orange-600 text-white font-black px-2 py-0.5 rounded-lg text-[11px]">
            {isHi ? 'मूलांक:' : 'Root:'} {userMoolank}
          </span>
          <span className="bg-amber-600 text-white font-black px-2 py-0.5 rounded-lg text-[11px]">
            {isHi ? 'भाग्यांक:' : 'Destiny:'} {userBhagyank}
          </span>
        </div>
      </div>

      {/* 2. SUBTABS: MOBILE vs NAME */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-orange-100/80 rounded-2xl border border-orange-200 text-xs font-bold text-center">
        <button
          type="button"
          onClick={() => setActiveSubTab('mobile')}
          className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'mobile'
              ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xs font-black'
              : 'text-orange-950 hover:bg-white/60'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>{isHi ? 'मोबाइल अंक विश्लेषण' : 'Mobile Number'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('name')}
          className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'name'
              ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xs font-black'
              : 'text-orange-950 hover:bg-white/60'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>{isHi ? 'नाम अंक व शोधन (Correction)' : 'Name Correction'}</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* SECTION 1: MOBILE NUMEROLOGY ANALYSIS */}
      {/* ========================================================= */}
      {activeSubTab === 'mobile' && (
        <div className="space-y-3.5">
          {/* Input Card */}
          <div className="bg-white rounded-3xl border-2 border-orange-200 p-3.5 sm:p-4 shadow-sm space-y-3">
            <label className="block text-xs font-black text-orange-950 flex items-center gap-1.5">
              <span>📱</span>
              <span>{isHi ? 'अपना १० अंकों का मोबाइल नंबर दर्ज करें:' : 'Enter 10-Digit Mobile Number:'}</span>
            </label>

            <form onSubmit={handleAnalyzeMobile} className="flex gap-2">
              <input
                type="tel"
                maxLength={15}
                value={mobileInput}
                onChange={(e) => setMobileInput(e.target.value)}
                placeholder={isHi ? '१० अंकों का मोबाइल नंबर' : '10-digit mobile number'}
                className="flex-1 px-3.5 py-2.5 rounded-2xl border-2 border-orange-200 text-gray-900 font-black text-sm tracking-widest focus:outline-none focus:ring-2 focus:ring-orange-500 bg-orange-50/30"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black text-xs hover:brightness-105 active:scale-95 shadow-md flex items-center gap-1 shrink-0"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{isHi ? 'जांचें' : 'Check'}</span>
              </button>
            </form>
          </div>

          {!analyzedMobile ? (
            <div className="bg-white rounded-3xl border-2 border-orange-200 p-6 shadow-sm text-center space-y-2">
              <div className="text-3xl">📱</div>
              <p className="text-xs font-bold text-orange-950">
                {isHi ? 'कृपया अपना वास्तविक १० अंकों का मोबाइल नंबर दर्ज कर "जांचें" पर टैप करें।' : 'Please enter your real 10-digit mobile number and tap Check.'}
              </p>
            </div>
          ) : (
            /* Analysis Results Display */
            <div className="bg-white rounded-3xl border-2 border-orange-200 p-4 shadow-sm space-y-3.5">
            {/* Top Score & Verdict */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 rounded-2xl border border-orange-200">
              <div className="text-center sm:text-left">
                <span className="text-[11px] text-gray-500 font-bold block mb-0.5">
                  {isHi ? 'मोबाइल नंबर:' : 'Number:'} {analyzedMobile.cleanDigits}
                </span>
                <h3 className="text-sm sm:text-base font-black text-orange-950">
                  {analyzedMobile.verdictTitleHi}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-center px-3 py-1.5 rounded-xl bg-white border border-orange-200 shadow-2xs">
                  <span className="text-[10px] text-gray-500 block">{isHi ? 'कुल योग' : 'Sum'}</span>
                  <span className="text-lg font-black text-orange-900">
                    {analyzedMobile.compoundTotal}
                  </span>
                </div>

                <div className="text-center px-3 py-1.5 rounded-xl bg-orange-600 text-white shadow-2xs">
                  <span className="text-[10px] text-amber-200 block">{isHi ? 'एकल मूलांक' : 'Root'}</span>
                  <span className="text-lg font-black">{analyzedMobile.singleRoot}</span>
                </div>

                <div
                  className={`text-center px-3 py-1.5 rounded-xl font-black text-xs shadow-2xs ${
                    analyzedMobile.verdictLevel === 'excellent'
                      ? 'bg-emerald-600 text-white'
                      : analyzedMobile.verdictLevel === 'good'
                      ? 'bg-blue-600 text-white'
                      : analyzedMobile.verdictLevel === 'average'
                      ? 'bg-amber-500 text-white'
                      : 'bg-rose-600 text-white'
                  }`}
                >
                  <span className="text-[10px] block opacity-80">{isHi ? 'अनुकूलता' : 'Score'}</span>
                  <span className="text-base">{analyzedMobile.compatibilityScorePercent}%</span>
                </div>
              </div>
            </div>

            {/* Ruling Planet & Birth Compatibility */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-200 space-y-1">
                <strong className="text-orange-950 font-bold block">
                  🪐 स्वामी ग्रह व देवता:
                </strong>
                <p className="text-gray-800">
                  {analyzedMobile.planetInfo.planetHi} • {analyzedMobile.planetInfo.deityHi}
                </p>
                <p className="text-[11px] text-gray-600 leading-relaxed pt-0.5">
                  {analyzedMobile.planetInfo.natureHi}
                </p>
              </div>

              <div className="bg-orange-50/70 p-3 rounded-2xl border border-orange-200 space-y-1">
                <strong className="text-orange-950 font-bold block">
                  🤝 जन्म मूलांक ({userMoolank}) से संबंध:
                </strong>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className={`px-2 py-0.5 rounded-lg text-xs font-black text-white ${
                      analyzedMobile.compatibilityWithMoolank === 'friendly'
                        ? 'bg-emerald-600'
                        : analyzedMobile.compatibilityWithMoolank === 'neutral'
                        ? 'bg-amber-600'
                        : 'bg-rose-600'
                    }`}
                  >
                    {analyzedMobile.compatibilityWithMoolank === 'friendly'
                      ? 'अति मित्र (Harmonious)'
                      : analyzedMobile.compatibilityWithMoolank === 'neutral'
                      ? 'सम (Neutral)'
                      : 'शत्रु अंक (Conflict)'}
                  </span>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed pt-1">
                  {analyzedMobile.compatibilityWithMoolank === 'friendly'
                    ? 'यह नंबर आपके स्वभाव, कार्यक्षमता और विचारों को तेज गति से आगे बढ़ाता है।'
                    : analyzedMobile.compatibilityWithMoolank === 'neutral'
                    ? 'यह नंबर संतुलित है, न अधिक लाभ न अधिक हानि।'
                    : 'यह नंबर आपकी स्वाभाविक ऊर्जा में टकराव पैदा कर सकता है। नीचे दिए उपाय करें।'}
                </p>
              </div>
            </div>

            {/* Positive Yogas & Auspicious Features */}
            {analyzedMobile.positiveYogasFound.length > 0 && (
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-900 font-black">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>नंबर में उपस्थित शुभ योग (Positive Shastric Yogas):</span>
                </div>
                {analyzedMobile.positiveYogasFound.map((yoga, idx) => (
                  <div key={idx} className="bg-white/80 p-2 rounded-xl border border-emerald-100">
                    <strong className="text-emerald-950 block font-bold">{yoga.titleHi}</strong>
                    <p className="text-gray-700 leading-relaxed mt-0.5">{yoga.descHi}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Shastric Doshas / Warnings */}
            {analyzedMobile.doshasFound.length > 0 && (
              <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-3 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-rose-900 font-black">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>सावधानी व संघर्ष कारक संयोग (Shastric Alerts):</span>
                </div>
                {analyzedMobile.doshasFound.map((dosh, idx) => (
                  <div key={idx} className="bg-white/80 p-2 rounded-xl border border-rose-100">
                    <strong className="text-rose-950 block font-bold">{dosh.titleHi}</strong>
                    <p className="text-gray-700 leading-relaxed mt-0.5">{dosh.descHi}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Profession Fitness */}
            <div className="bg-amber-50/80 p-3 rounded-2xl border border-amber-200 text-xs">
              <strong className="text-orange-950 block font-bold mb-0.5">
                💼 किस कार्यक्षेत्र व व्यापार के लिए यह नंबर सर्वोत्तम है:
              </strong>
              <p className="text-gray-800 leading-relaxed">
                {analyzedMobile.businessFitnessHi}
              </p>
            </div>

            {/* Practical Shastric Remedies (No need to immediately discard the number) */}
            <div className="bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-orange-500/15 border-2 border-orange-300 rounded-2xl p-3.5 space-y-2.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-lg bg-orange-600 text-white text-xs">🪔</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-orange-950">
                    मोबाइल नंबर सुधार व शांति के शास्त्रोक्त उपाय
                  </h4>
                  <p className="text-[10px] text-gray-600">
                    यदि नंबर बदलना संभव न हो, तो यह सूक्ष्म उपाय नंबर की ऊर्जा को शुभ बना देंगे
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="bg-white/90 p-2.5 rounded-xl border border-orange-200">
                  <strong className="text-orange-950 block font-bold mb-0.5">
                    🖼️ फोन वॉलपेपर उपाय:
                  </strong>
                  <p className="text-gray-800 leading-relaxed">
                    {analyzedMobile.practicalRemedies.wallpaperSuggestion}
                  </p>
                </div>

                <div className="bg-white/90 p-2.5 rounded-xl border border-orange-200">
                  <strong className="text-orange-950 block font-bold mb-0.5">
                    ✍️ सुनहरी स्याही (Golden Ink) कवर उपाय:
                  </strong>
                  <p className="text-gray-800 leading-relaxed">
                    {analyzedMobile.practicalRemedies.goldenInkNumber}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="bg-white/90 p-2.5 rounded-xl border border-orange-200">
                    <strong className="text-orange-950 block font-bold mb-0.5">
                      📅 श्रेष्ठ रिचार्ज दिवस:
                    </strong>
                    <p className="text-gray-800">{analyzedMobile.practicalRemedies.bestRechargeDay}</p>
                  </div>

                  <div className="bg-white/90 p-2.5 rounded-xl border border-orange-200">
                    <strong className="text-orange-950 block font-bold mb-0.5">
                      🕉️ अनुकूल मंत्र जप:
                    </strong>
                    <p className="text-gray-800 font-bold">{analyzedMobile.practicalRemedies.mantraToChant}</p>
                  </div>
                </div>

                <div className="bg-amber-100/70 p-2 rounded-xl text-[11px] text-amber-950 font-medium">
                  💡 <strong>सलाह:</strong> {analyzedMobile.practicalRemedies.actionableAdvice}
                </div>
              </div>
            </div>

            {/* NEW NUMBER D1 TO D10 SELECTION & FUTURE OUTLOOK GUIDE */}
            <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/15 to-amber-500/10 border-2 border-orange-300 rounded-3xl p-3.5 space-y-3 shadow-xs">
              <div
                onClick={() => setShowD1toD10Guide(!showD1toD10Guide)}
                className="flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📱</span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-orange-950">
                      {isHi ? 'नया नंबर चयन: D1 से D10 स्थान-वार अंक व भविष्य फल' : 'New Number: D1-D10 Position Guide'}
                    </h4>
                    <p className="text-[10.5px] text-orange-800 font-bold">
                      {isHi ? 'नया सिम लेते समय प्रत्येक स्थान (D1-D10) पर सही अंक का चयन व आने वाले समय पर असर' : 'Best digits for D1 to D10 and future impact'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="p-1 rounded-xl bg-orange-100 text-orange-900 shrink-0"
                >
                  {showD1toD10Guide ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {showD1toD10Guide && (
                <div className="space-y-2 pt-1 text-xs">
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      {
                        code: 'D1 (स्थान १)',
                        area: 'स्वयं व आत्मबल (Self)',
                        best: '९, ८, ७ (या १, ३, ५)',
                        avoid: '०',
                        impact: 'आत्मबल, ओजस्वी व्यक्तित्व और दृढ़ निर्णय क्षमता। समाज में आपका प्रभाव स्थापित होगा।',
                        future: 'आत्मविश्वास बढ़ेगा, हीनभावना समाप्त होगी और प्रत्येक कार्य में नेतृत्वकारी भूमिका मिलेगी।'
                      },
                      {
                        code: 'D2 (स्थान २)',
                        area: 'निर्णय क्षमता (Decisions)',
                        best: '१, ३, ५',
                        avoid: '४, ८',
                        impact: 'त्वरित व सटीक निर्णय, मानसिक द्वंद्व व भ्रम से मुक्ति, बौद्धिक संतुलन।',
                        future: 'जल्दबाजी में गलत वित्तीय समझौतों से बचाव होगा, भविष्य की योजनाएं सफल होंगी।'
                      },
                      {
                        code: 'D3 (स्थान ३)',
                        area: 'करियर की नींव (Career)',
                        best: '१, ३, ५, ६',
                        avoid: '४, ७',
                        impact: 'कार्यक्षेत्र में स्थिरता, काम में एकाग्रता और नई जिम्मेदारियों को उठाने की शक्ति।',
                        future: 'बार-बार नौकरी या काम बदलने का भटकाव खत्म होगा, व्यापार में स्थायी ग्राहक बनेंगे।'
                      },
                      {
                        code: 'D4 (स्थान ४)',
                        area: 'करियर प्रगति गति (Growth)',
                        best: '३, ५, ६',
                        avoid: '४, ८',
                        impact: 'अचानक आने वाली कार्य-बाधाओं का शमन, वरिष्ठ अधिकारियों का निरंतर समर्थन।',
                        future: 'आगामी वर्षों में आजीविका में तेजी से उछाल, नई परियोजनाओं में निर्बाध उन्नति।'
                      },
                      {
                        code: 'D5 (स्थान ५)',
                        area: 'संतान व बुद्धि (Creativity)',
                        best: '१, ३, ५',
                        avoid: '८',
                        impact: 'तीव्र स्मरण शक्ति, रचनात्मक सोच, मानसिक शांति व संतान के साथ प्रगाढ़ प्रेम।',
                        future: 'संतान की ओर से मान-सम्मान व शुभ समाचार, व्यापार में आधुनिक विचारों से प्रचुर लाभ।'
                      },
                      {
                        code: 'D6 (स्थान ६)',
                        area: 'पारिवारिक संबंध (Family)',
                        best: '२, ३, ५, ६',
                        avoid: '१, ७',
                        impact: 'घर-परिवार में मिठास, परिजनों के बीच आपसी समझ, गृह-कलह से पूर्ण मुक्ति।',
                        future: 'घर में सुख, शांति व सौहार्द का स्थायी वास रहेगा, आपसी विवाद समाप्त होकर परिवार एकजुट रहेगा।'
                      },
                      {
                        code: 'D7 (स्थान ७)',
                        area: 'विवाह व दांपत्य (Spouse)',
                        best: '२, ३, ६',
                        avoid: '१, ७, ८',
                        impact: 'जीवनसाथी के साथ गहरा तालमेल, समर्पण, भावनात्मक जुड़ाव व साझेदारी में विश्वास।',
                        future: 'वैवाहिक जीवन में प्रेम व स्थिरता बनी रहेगी, साझेदारी व्यापार में निरंतर लाभ व वृद्धि।'
                      },
                      {
                        code: 'D8 (स्थान ८)',
                        area: 'स्वास्थ्य ऊर्जा (Health)',
                        best: '१, ३, ५, ९',
                        avoid: '४, ८',
                        impact: 'शारीरिक स्फूर्ति, रोग प्रतिरोधक क्षमता में वृद्धि, मानसिक तनाव व आलस्य से मुक्ति।',
                        future: 'दीर्घकालिक स्वास्थ्य सुरक्षा, दवाओं पर व्यर्थ खर्च बंद, दिनभर सक्रिय व ऊर्जावान रहेंगे।'
                      },
                      {
                        code: 'D9 (स्थान ९)',
                        area: 'सामाजिक प्रतिष्ठा (Reputation)',
                        best: '१, ३, ५, ६',
                        avoid: '४',
                        impact: 'समाज व बिरादरी में मान-सम्मान, जनसंपर्क का तीव्र विस्तार, लोग आपकी बात सुनेंगे।',
                        future: 'सामाजिक साख व प्रभाव में भारी वृद्धि, बड़े व्यापारिक व सामाजिक सौदों में सफलता।'
                      },
                      {
                        code: 'D10 (स्थान १०)',
                        area: 'धन संचय व बरकत (Wealth)',
                        best: '१, ३, ५, ६ (श्रेष्ठ ५, ६)',
                        avoid: '०, ४, ८',
                        impact: 'धन का संचय, फिजूलखर्ची पर स्वतः रोक, बैंक बैलेंस में निरंतर वृद्धि।',
                        future: 'सुदृढ़ बैंक बैलेंस का निर्माण, आर्थिक संकट से स्थायी मुक्ति, घर में निरंतर धन की बरकत।'
                      }
                    ].map((pos, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-orange-200 rounded-2xl p-2.5 shadow-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="font-black text-orange-950 text-xs">{pos.code}</span>
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.2 rounded-full">
                              {pos.area}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                              श्रेष्ठ: {pos.best}
                            </span>
                            <span className="text-[9.5px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded">
                              त्याज्य: {pos.avoid}
                            </span>
                          </div>
                        </div>

                        <p className="text-[11px] text-gray-700 leading-tight">
                          <strong>असर:</strong> {pos.impact}
                        </p>
                        <p className="text-[10.5px] text-amber-900 font-medium leading-tight">
                          🔮 <strong>भविष्य फल:</strong> {pos.future}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Summary Box */}
                  <div className="p-2.5 bg-gradient-to-r from-emerald-500/15 to-green-500/15 border border-emerald-300 rounded-2xl text-[11px] text-emerald-950 space-y-1">
                    <strong className="text-emerald-900 block font-bold">
                      🌟 कुल योग व भविष्य फल:
                    </strong>
                    <p>
                      सम्पूर्ण १० अंकों का कुल योग सदैव <strong>१, ३, ५ या ६</strong> (जैसे २४, ३२, ३३, ३७, ४१, ४२, ४५) पर लाएं। यह नया नंबर लेने के ४५-९० दिनों में ऊर्जा संतुलित कर आने वाले ३ वर्षों में आजीविका, धन संचय व पारिवारिक शांति प्रदान करेगा।
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 2: NAME NUMEROLOGY & SPELLING CORRECTION */}
      {/* ========================================================= */}
      {activeSubTab === 'name' && (
        <div className="space-y-3.5">
          {/* Input Card */}
          <div className="bg-white rounded-3xl border-2 border-orange-200 p-3.5 sm:p-4 shadow-sm space-y-3">
            <label className="block text-xs font-black text-orange-950 flex items-center gap-1.5">
              <span>✍️</span>
              <span>
                {isHi ? 'अंग्रेजी अक्षरों में नाम दर्ज करें (चालडियन स्पेलिंग):' : 'Enter Name in English Alphabet:'}
              </span>
            </label>

            <form onSubmit={handleAnalyzeName} className="flex gap-2">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder={isHi ? 'अपना नाम दर्ज करें' : 'Enter your name'}
                className="flex-1 px-3.5 py-2.5 rounded-2xl border-2 border-orange-200 text-gray-900 font-black text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-orange-500 bg-orange-50/30 uppercase"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black text-xs hover:brightness-105 active:scale-95 shadow-md flex items-center gap-1 shrink-0"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{isHi ? 'जांचें' : 'Check'}</span>
              </button>
            </form>
          </div>

          {!analyzedName ? (
            <div className="bg-white rounded-3xl border-2 border-orange-200 p-6 shadow-sm text-center space-y-2">
              <div className="text-3xl">✍️</div>
              <p className="text-xs font-bold text-orange-950">
                {isHi ? 'कृपया अंग्रेजी में अपना नाम दर्ज कर "जांचें" पर टैप करें।' : 'Please enter your name in English and tap Check.'}
              </p>
            </div>
          ) : (
            /* Letter by Letter Breakdown */
            <div className="bg-white rounded-3xl border-2 border-orange-200 p-4 shadow-sm space-y-3.5">
            <div>
              <span className="text-xs font-black text-orange-950 block mb-2">
                🔠 {isHi ? 'प्रत्येक अक्षर का चालडियन मान व योग:' : 'Chaldean Letter Values:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {analyzedName.letterBreakdowns.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center bg-orange-50/80 border border-orange-200 rounded-xl px-2 py-1 min-w-[32px]"
                  >
                    <span className="text-xs font-black text-orange-950">{item.char}</span>
                    <span className="text-[10px] font-bold text-orange-600">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Compound and Root Score Cards */}
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200">
              <div>
                <span className="text-[10px] text-gray-500 font-bold block mb-0.5">
                  {isHi ? 'संयुक्त नामांक (Compound Name):' : 'Compound:'}
                </span>
                <h3 className="text-base font-black text-orange-950">
                  {analyzedName.compoundMeaning?.titleHi || `संयुक्त अंक ${analyzedName.compoundTotal}`}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-center px-3 py-1.5 rounded-xl bg-white border border-orange-200 shadow-2xs">
                  <span className="text-[10px] text-gray-500 block">{isHi ? 'कुल योग' : 'Total'}</span>
                  <span className="text-lg font-black text-orange-900">
                    {analyzedName.compoundTotal}
                  </span>
                </div>

                <div className="text-center px-3 py-1.5 rounded-xl bg-orange-600 text-white shadow-2xs">
                  <span className="text-[10px] text-amber-200 block">{isHi ? 'नामांक' : 'Root'}</span>
                  <span className="text-lg font-black">{analyzedName.singleRoot}</span>
                </div>
              </div>
            </div>

            {/* Compound Number Meaning */}
            {analyzedName.compoundMeaning && (
              <div
                className={`p-3 rounded-2xl border text-xs space-y-1 ${
                  analyzedName.compoundMeaning.nature === 'highly_auspicious' ||
                  analyzedName.compoundMeaning.nature === 'auspicious'
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                    : analyzedName.compoundMeaning.nature === 'neutral'
                    ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                    : 'bg-rose-50/70 border-rose-200 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  {analyzedName.compoundMeaning.nature === 'highly_auspicious' ||
                  analyzedName.compoundMeaning.nature === 'auspicious' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                  )}
                  <span>{analyzedName.compoundMeaning.titleHi}</span>
                </div>
                <p className="leading-relaxed">{analyzedName.compoundMeaning.meaningHi}</p>
                <p className="text-[11px] opacity-80 pt-0.5">
                  <strong>अनुकूल कार्यक्षेत्र:</strong> {analyzedName.compoundMeaning.careerFieldsHi}
                </p>
              </div>
            )}

            {/* Name Harmony with Moolank & Bhagyank */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="bg-orange-50/70 p-2.5 rounded-xl border border-orange-200">
                <strong className="text-orange-950 block font-bold mb-0.5">
                  जन्म मूलांक ({analyzedName.userMoolank}) से सामंजस्य:
                </strong>
                <span
                  className={`inline-block px-2 py-0.5 rounded text-[11px] font-black text-white ${
                    analyzedName.compatibilityWithMoolank === 'friendly'
                      ? 'bg-emerald-600'
                      : analyzedName.compatibilityWithMoolank === 'neutral'
                      ? 'bg-amber-600'
                      : 'bg-rose-600'
                  }`}
                >
                  {analyzedName.compatibilityWithMoolank === 'friendly'
                    ? 'अति शुभ व मित्र'
                    : analyzedName.compatibilityWithMoolank === 'neutral'
                    ? 'तटस्थ (सम)'
                    : 'विरोधी तरंग (अशुभ)'}
                </span>
              </div>

              <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200">
                <strong className="text-orange-950 block font-bold mb-0.5">
                  जन्म भाग्यांक ({analyzedName.userBhagyank}) से सामंजस्य:
                </strong>
                <span
                  className={`inline-block px-2 py-0.5 rounded text-[11px] font-black text-white ${
                    analyzedName.compatibilityWithBhagyank === 'friendly'
                      ? 'bg-emerald-600'
                      : analyzedName.compatibilityWithBhagyank === 'neutral'
                      ? 'bg-amber-600'
                      : 'bg-rose-600'
                  }`}
                >
                  {analyzedName.compatibilityWithBhagyank === 'friendly'
                    ? 'अति शुभ व मित्र'
                    : analyzedName.compatibilityWithBhagyank === 'neutral'
                    ? 'तटस्थ (सम)'
                    : 'विरोधी तरंग (अशुभ)'}
                </span>
              </div>
            </div>

            {/* Name Correction Status & Suggestions */}
            <div className="bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-orange-500/15 border-2 border-orange-300 rounded-2xl p-3.5 space-y-2.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-lg bg-orange-600 text-white text-xs">✨</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-orange-950">
                    {isHi ? 'नाम में संशोधन व सुधार (Spelling Correction)' : 'Name Spelling Correction'}
                  </h4>
                  <p className="text-[10px] text-gray-600">{analyzedName.correctionReasonHi}</p>
                </div>
              </div>

              <div className="space-y-2">
                {analyzedName.spellingCorrectionSuggestions.map((sug, idx) => (
                  <div
                    key={idx}
                    className="bg-white/95 p-3 rounded-xl border border-orange-200 shadow-2xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-orange-950 font-black text-sm tracking-wide">
                        {sug.suggestedSpelling}
                      </strong>
                      <span className="bg-emerald-600 text-white font-black text-[10px] px-2 py-0.5 rounded-full">
                        नया योग: {sug.newCompoundTotal} (अंक {sug.newSingleRoot})
                      </span>
                    </div>
                    <p className="text-orange-900 font-bold text-xs">{sug.benefitTitleHi}</p>
                    <p className="text-gray-700 leading-relaxed text-[11px]">{sug.benefitDescHi}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature Rules (हस्ताक्षर के शास्त्र सम्मत नियम) */}
            <div className="bg-white rounded-2xl border border-orange-200 p-3 space-y-2 text-xs">
              <strong className="text-orange-950 font-black block flex items-center gap-1.5">
                <span>✒️</span>
                <span>सामुद्रिक व अंक ज्योतिष अनुसार हस्ताक्षर (Signature) के नियम:</span>
              </strong>
              <div className="space-y-1.5 text-gray-700">
                {analyzedName.signatureGuidanceHi.map((rule, idx) => (
                  <div key={idx} className="bg-amber-50/60 p-2 rounded-xl border border-amber-100 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium">{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lucky Attributes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-center">
              <div className="bg-orange-50/80 p-2 rounded-xl border border-orange-200">
                <span className="text-[10px] text-gray-500 block font-bold">शुभ वार</span>
                <strong className="text-orange-950">{analyzedName.luckyAttributes.luckyDayHi}</strong>
              </div>
              <div className="bg-amber-50/80 p-2 rounded-xl border border-amber-200">
                <span className="text-[10px] text-gray-500 block font-bold">शुभ रंग</span>
                <strong className="text-orange-950">{analyzedName.luckyAttributes.luckyColorHi}</strong>
              </div>
              <div className="bg-orange-50/80 p-2 rounded-xl border border-orange-200">
                <span className="text-[10px] text-gray-500 block font-bold">शुभ रत्न</span>
                <strong className="text-orange-950">{analyzedName.luckyAttributes.luckyStoneHi}</strong>
              </div>
              <div className="bg-amber-50/80 p-2 rounded-xl border border-amber-200">
                <span className="text-[10px] text-gray-500 block font-bold">इष्ट देव</span>
                <strong className="text-orange-950">{analyzedName.luckyAttributes.deityHi.split('(')[0]}</strong>
              </div>
            </div>
          </div>
          )}
        </div>
      )}
    </div>
  );
};

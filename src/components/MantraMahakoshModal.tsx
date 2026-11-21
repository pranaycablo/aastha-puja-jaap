import React, { useState, useMemo } from 'react';
import { MantraItem, LanguageCode } from '../types';
import {
  MAHAKOSH_CATEGORIES,
  CANONICAL_MAHAKOSH_MANTRAS
} from '../data/canonicalMantraMahakoshData';
import { ttsEngine } from '../utils/ttsEngine';
import { AdMobNativeCard } from './AdMobNativeCard';
import {
  BookOpen,
  Search,
  Sparkles,
  Volume2,
  VolumeX,
  ShieldAlert,
  Flame,
  Clock,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Play,
  X,
  Share2,
  Heart,
  ChevronRight,
  Info
} from 'lucide-react';

interface MantraMahakoshModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMantraAndChant: (mantra: MantraItem) => void;
  language?: LanguageCode;
}

export const MantraMahakoshModal: React.FC<MantraMahakoshModalProps> = ({
  isOpen,
  onClose,
  onSelectMantraAndChant,
  language = 'hi'
}) => {
  const isHi = language === 'hi';
  const [selectedCategory, setSelectedCategory] = useState<string>('naam_jaap');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [playingMantraId, setPlayingMantraId] = useState<string | null>(null);

  // Sub-modals for the 2 interactive buttons per mantra
  const [activeSiddhiMantra, setActiveSiddhiMantra] = useState<MantraItem | null>(null);
  const [activeWarningMantra, setActiveWarningMantra] = useState<MantraItem | null>(null);

  // Stop TTS on unmount or close
  React.useEffect(() => {
    return () => {
      ttsEngine.stop();
    };
  }, []);

  const handleToggleAudio = (mantra: MantraItem) => {
    if (playingMantraId === mantra.id) {
      ttsEngine.stop();
      setPlayingMantraId(null);
    } else {
      ttsEngine.stop();
      setPlayingMantraId(mantra.id);
      ttsEngine.speakMantra(mantra.text, {
        lang: 'hi',
        rate: 0.9,
        onEnd: () => setPlayingMantraId(null),
        onError: () => setPlayingMantraId(null)
      });
    }
  };

  const filteredMantras = useMemo(() => {
    let list = CANONICAL_MAHAKOSH_MANTRAS;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return list.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.text.toLowerCase().includes(q) ||
          m.deityLabel.toLowerCase().includes(q) ||
          (m.meaning && m.meaning.toLowerCase().includes(q)) ||
          (m.benefits && m.benefits.toLowerCase().includes(q))
      );
    }
    return list.filter((m) => m.category === selectedCategory);
  }, [selectedCategory, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-gradient-to-b from-[#1C0603] via-[#2B0B07] to-[#120202] text-amber-50 rounded-3xl border-2 border-amber-500/80 shadow-[0_10px_50px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-950 via-red-950 to-amber-950 border-b border-amber-600/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 p-0.5 shadow-lg flex items-center justify-center text-2xl">
              📿
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-amber-200 tracking-wide drop-shadow-md">
                  {isHi ? 'सम्पूर्ण सनातन व शाबर मंत्र महाकोश' : 'Sanatan & Shabar Mantra Mahakosh'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-300 text-xs font-bold border border-amber-400/50">
                  ९ श्रेणियां
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-300/80">
                {isHi
                  ? 'प्रामाणिक विधि, सिद्धि विधान, लाभ व सावधानियां (गलत प्रयोग चेतावनी सहित)'
                  : 'Authentic Sadhana Vidhi, Siddhi, Benefits & Strict Warnings'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              ttsEngine.stop();
              onClose();
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-amber-200 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3 sm:p-4 bg-black/40 border-b border-amber-900/60 shrink-0">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isHi
                  ? 'मंत्र, देवी-देवता या प्रयोजन खोजें (उदा. गायत्री, बगलामुखी, नजर दोष, कुबेर, बिच्छू)...'
                  : 'Search mantra, deity, or purpose (e.g. Gayatri, Baglamukhi, Protection)...'
              }
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-black/60 border border-amber-500/50 text-amber-100 placeholder-amber-400/40 text-sm focus:outline-none focus:border-amber-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-amber-900/60 hover:bg-amber-800 text-amber-200 px-2 py-1 rounded"
              >
                हटाएं
              </button>
            )}
          </div>
        </div>

        {/* Category Horizontal Nav Tabs (Visible when not searching) */}
        {!searchQuery && (
          <div className="px-3 py-2 bg-black/30 border-b border-amber-900/40 overflow-x-auto flex gap-2 shrink-0 scrollbar-thin">
            {MAHAKOSH_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-stone-950 shadow-md scale-102 ring-2 ring-amber-300'
                      : 'bg-stone-900/80 hover:bg-stone-800 text-amber-200/80 border border-amber-800/40'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name.split('(')[0].trim()}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Mantras List View */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-4">
          {/* Category Banner */}
          {!searchQuery && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-950/60 via-red-950/40 to-amber-950/60 border border-amber-500/30 flex items-start gap-3">
              <span className="text-2xl mt-0.5">
                {MAHAKOSH_CATEGORIES.find((c) => c.id === selectedCategory)?.icon}
              </span>
              <div>
                <h3 className="text-base font-black text-amber-200">
                  {MAHAKOSH_CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                </h3>
                <p className="text-xs text-amber-300/80 mt-0.5">
                  {MAHAKOSH_CATEGORIES.find((c) => c.id === selectedCategory)?.description}
                </p>
              </div>
            </div>
          )}

          {filteredMantras.length === 0 ? (
            <div className="text-center py-12 text-amber-300/60">
              कोई मंत्र नहीं मिला। कृपया अन्य शब्द लिखकर खोजें।
            </div>
          ) : (
            filteredMantras.map((mantra, idx) => {
              const isPlaying = playingMantraId === mantra.id;
              return (
                <div
                  key={mantra.id}
                  className="rounded-2xl bg-gradient-to-b from-[#260A06] to-[#170302] border-1.5 border-amber-500/40 hover:border-amber-400 shadow-lg p-4 sm:p-5 transition-all"
                >
                  {/* Card Header: Category & Deity */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold border border-amber-400/40">
                      {mantra.categoryLabel}
                    </span>
                    <span className="text-xs font-semibold text-amber-300/80 flex items-center gap-1">
                      <span>🚩</span>
                      <span>{mantra.deityLabel}</span>
                    </span>
                  </div>

                  {/* Mantra Title */}
                  <h4 className="text-lg sm:text-xl font-black text-yellow-200 mb-2">
                    {mantra.name}
                  </h4>

                  {/* Sacred Mantra Text Box */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-black/60 border border-amber-600/40 mb-3 relative group">
                    <p className="text-base sm:text-lg font-serif text-amber-100 leading-relaxed whitespace-pre-line select-text">
                      {mantra.text}
                    </p>
                    <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-amber-900/40">
                      <button
                        onClick={() => handleToggleAudio(mantra)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                          isPlaying
                            ? 'bg-red-600 text-white animate-pulse'
                            : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40'
                        }`}
                      >
                        {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        <span>{isPlaying ? 'ध्वनि रोकें' : 'मंत्र उच्चारण सुनें'}</span>
                      </button>
                      {mantra.siddhiDays && (
                        <span className="text-[11px] text-amber-300/70 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-400" />
                          <span>अवधि: {mantra.siddhiDays}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Short Meaning & Benefits preview */}
                  <div className="text-xs sm:text-sm text-stone-300 mb-3 space-y-1">
                    <p>
                      <strong className="text-amber-300">भावार्थ: </strong>
                      {mantra.meaning}
                    </p>
                    {mantra.benefits && (
                      <p>
                        <strong className="text-emerald-400">फल व लाभ: </strong>
                        {mantra.benefits}
                      </p>
                    )}
                  </div>

                  {/* 3 Action Buttons requested by User */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-amber-900/50">
                    {/* BUTTON 1: सिद्ध कैसे करें? (पूजा विधि) */}
                    <button
                      onClick={() => setActiveSiddhiMantra(mantra)}
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-600/30 to-yellow-600/30 hover:from-amber-600/50 hover:to-yellow-600/50 border border-amber-400/60 text-amber-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
                    >
                      <Flame className="w-4 h-4 text-amber-400" />
                      <span>सिद्ध कैसे करें? पूजा विधि</span>
                    </button>

                    {/* BUTTON 2: मंत्र उपयोग व चेतावनी */}
                    <button
                      onClick={() => setActiveWarningMantra(mantra)}
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-rose-900/40 to-red-900/40 hover:from-rose-900/60 hover:to-red-900/60 border border-red-500/60 text-rose-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
                    >
                      <ShieldAlert className="w-4 h-4 text-red-400" />
                      <span>उपयोग व चेतावनी (परिणाम)</span>
                    </button>

                    {/* BUTTON 3: माला जप करें */}
                    <button
                      onClick={() => {
                        ttsEngine.stop();
                        onSelectMantraAndChant(mantra);
                        onClose();
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 hover:brightness-110 text-stone-950 text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-md ring-1 ring-yellow-200"
                    >
                      <Play className="w-4 h-4 fill-stone-950 text-stone-950" />
                      <span>१०८ माला जप करें</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}

          {/* Bottom Ad Card */}
          <div className="pt-2">
            <AdMobNativeCard language={language} variant="banner" slotName="Mantra Mahakosh" />
          </div>
        </div>
      </div>

      {/* =====================================================================
          MODAL 1: सिद्ध कैसे करें? (पूजा विधि)
          ===================================================================== */}
      {activeSiddhiMantra && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl max-h-[88vh] flex flex-col bg-gradient-to-b from-[#240A06] to-[#120202] text-amber-50 rounded-3xl border-2 border-yellow-500 shadow-2xl overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-amber-900 to-yellow-900 border-b border-amber-600/40 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-yellow-300" />
                <h3 className="text-lg font-black text-amber-100">
                  सिद्ध कैसे करें? पूजा व साधना विधान
                </h3>
              </div>
              <button
                onClick={() => setActiveSiddhiMantra(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-sm">
              <div className="p-3 rounded-xl bg-black/40 border border-amber-700/40">
                <h4 className="text-amber-300 font-bold text-sm mb-1">{activeSiddhiMantra.name}</h4>
                <p className="font-serif text-xs text-amber-100 leading-relaxed">
                  {activeSiddhiMantra.text}
                </p>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-xl bg-amber-950/50 border border-amber-800/40">
                  <div className="text-[11px] text-amber-400 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>सिद्धि समय अवधि:</span>
                  </div>
                  <div className="text-xs text-white font-semibold mt-0.5">
                    {activeSiddhiMantra.siddhiDays || '२१ से ४१ दिन'}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-950/50 border border-amber-800/40">
                  <div className="text-[11px] text-amber-400 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>लक्ष्य जप संख्या:</span>
                  </div>
                  <div className="text-xs text-white font-semibold mt-0.5">
                    {activeSiddhiMantra.targetCountSiddhi || '११,००० या १,२५,०००'}
                  </div>
                </div>
              </div>

              {/* Best Timing & Direction */}
              {activeSiddhiMantra.bestTiming && (
                <div className="p-3 rounded-xl bg-black/30 border border-amber-800/40">
                  <strong className="text-amber-300 flex items-center gap-1 text-xs">
                    <Compass className="w-3.5 h-3.5 text-amber-400" />
                    <span>श्रेष्ठ समय व मुहूर्त:</span>
                  </strong>
                  <p className="text-xs text-stone-200 mt-1">{activeSiddhiMantra.bestTiming}</p>
                </div>
              )}

              {/* Samagri */}
              {activeSiddhiMantra.samagri && (
                <div className="p-3 rounded-xl bg-black/30 border border-amber-800/40">
                  <strong className="text-amber-300 flex items-center gap-1 text-xs">
                    <span className="text-sm">🪔</span>
                    <span>आवश्यक पूजन सामग्री व आसन:</span>
                  </strong>
                  <p className="text-xs text-stone-200 mt-1">{activeSiddhiMantra.samagri}</p>
                </div>
              )}

              {/* Step by step siddhi vidhi */}
              {activeSiddhiMantra.siddhiVidhi && (
                <div className="p-3 rounded-xl bg-amber-950/30 border border-yellow-600/40">
                  <strong className="text-yellow-300 flex items-center gap-1 text-xs mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>चरणबद्ध सिद्धि व अनुष्ठान विधि:</span>
                  </strong>
                  <p className="text-xs text-stone-100 leading-relaxed whitespace-pre-line">
                    {activeSiddhiMantra.siddhiVidhi}
                  </p>
                </div>
              )}
            </div>

            <div className="p-3 bg-black/60 border-t border-amber-800/40 flex justify-end">
              <button
                onClick={() => {
                  const m = activeSiddhiMantra;
                  setActiveSiddhiMantra(null);
                  onSelectMantraAndChant(m);
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 text-stone-950 font-black text-sm flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-stone-950" />
                <span>इस मंत्र का जप अभी शुरू करें</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: मंत्र उपयोग व चेतावनी (गलत प्रयोग का परिणाम)
          ===================================================================== */}
      {activeWarningMantra && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl max-h-[88vh] flex flex-col bg-gradient-to-b from-[#2B0808] via-[#1E0404] to-[#120202] text-amber-50 rounded-3xl border-2 border-red-500 shadow-2xl overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-red-950 to-rose-950 border-b border-red-600/40 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-400" />
                <h3 className="text-lg font-black text-red-200">
                  मंत्र उपयोग, नियम व चेतावनी (परिणाम)
                </h3>
              </div>
              <button
                onClick={() => setActiveWarningMantra(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-sm">
              <div className="p-3 rounded-xl bg-black/50 border border-red-800/40">
                <h4 className="text-yellow-300 font-bold text-sm mb-1">{activeWarningMantra.name}</h4>
                <p className="font-serif text-xs text-amber-100">{activeWarningMantra.text}</p>
              </div>

              {/* 1. सात्विक उपयोग व लाभ (कहाँ व कब करें) */}
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-600/40">
                <div className="flex items-center gap-1.5 text-emerald-300 font-bold text-xs mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>सात्विक उपयोग, परिस्थिति व लाभ:</span>
                </div>
                <p className="text-xs text-stone-200 leading-relaxed">
                  {activeWarningMantra.usageGuide || activeWarningMantra.benefits}
                </p>
              </div>

              {/* 2. खानपान व अवस्था के नियम */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-amber-800/40">
                <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs mb-1">
                  <Info className="w-4 h-4 text-amber-400" />
                  <span>शारीरिक पवित्रता व अवस्था नियम:</span>
                </div>
                <ul className="text-xs text-stone-300 space-y-1 list-disc list-inside">
                  <li>साधना काल में पूर्ण सात्विक आहार लें (प्याज, लहसुन, मांसाहार व मदिरा पूर्णतः वर्जित)।</li>
                  <li>भूमि पर सीधे न बैठें, कुशा या ऊनी आसन का प्रयोग अनिवार्य है।</li>
                  <li>तर्जनी (अंगूठे के पास वाली उंगली) का स्पर्श जप माला से न होने दें।</li>
                  <li>जप के उपरांत आसन के नीचे जल छिड़ककर नेत्रों पर अवश्य लगाएं।</li>
                </ul>
              </div>

              {/* 3. ⚠️ कठोर चेतावनी: गलत प्रयोग का परिणाम */}
              <div className="p-3.5 rounded-xl bg-red-950/60 border-2 border-red-500 shadow-inner">
                <div className="flex items-center gap-1.5 text-red-300 font-black text-xs mb-1.5">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                  <span>⚠️ कठोर चेतावनी: गलत प्रयोग का परिणाम (Parinam)</span>
                </div>
                <p className="text-xs text-rose-100 leading-relaxed whitespace-pre-line font-medium">
                  {activeWarningMantra.warning ||
                    '⚠️ इस मंत्र का प्रयोग किसी भी अनैतिक, असत्य या दूसरों को कष्ट देने की भावना से कदापि न करें। शाबर व तांत्रिक मंत्रों में अनिष्ट करने पर उलट विद्या स्वयं कर्ता के ही कुल व मानसिक स्वास्थ्य पर प्रहार करती है।'}
                </p>
              </div>
            </div>

            <div className="p-3 bg-black/60 border-t border-red-900/40 flex justify-end">
              <button
                onClick={() => setActiveWarningMantra(null)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 text-white font-black text-sm"
              >
                मैंने सभी सावधानियां व नियम समझ लिए हैं
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

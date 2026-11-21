import React, { useState } from 'react';
import {
  X,
  Search,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  Eye,
  Flame,
  Award,
  ExternalLink
} from 'lucide-react';
import {
  NAVARATNA_SCIENCE_COLLECTION,
  GemstoneItem
} from '../data/ratnaScienceData';
import { AdMobNativeCard } from './AdMobNativeCard';
import { LanguageCode } from '../types';

interface RatnaGyanModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageCode;
  initialGemstoneId?: string;
}

export const RatnaGyanModal: React.FC<RatnaGyanModalProps> = ({
  isOpen,
  onClose,
  language,
  initialGemstoneId
}) => {
  const isHi = language === 'hi';
  const [selectedGemstone, setSelectedGemstone] = useState<GemstoneItem>(() => {
    if (initialGemstoneId) {
      const found = NAVARATNA_SCIENCE_COLLECTION.find((g) => g.id === initialGemstoneId);
      if (found) return found;
    }
    return NAVARATNA_SCIENCE_COLLECTION[0];
  });
  const [activeTab, setActiveTab] = useState<'tests' | 'wearing' | 'science'>('tests');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#FFFDF9] via-[#FFF9EE] to-[#FFF5E5] rounded-3xl shadow-2xl border-2 border-amber-400 max-h-[92vh] flex flex-col overflow-hidden text-stone-900">
        
        {/* HEADER */}
        <div className="px-4 py-3.5 bg-gradient-to-r from-[#1E293B] via-[#0F172A] to-[#1E293B] text-white flex items-center justify-between border-b-2 border-amber-400/80 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-2xl shadow-xs">
              💎
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-wide text-amber-200">
                {isHi ? 'रत्न विज्ञान एवं असली-नकली पहचान' : 'Gemstone Science & Authenticity'}
              </h2>
              <p className="text-[10.5px] text-amber-100/90 font-bold">
                {isHi
                  ? '९ महा-रत्न • ५-सूत्रीय परीक्षण • धारण विधि व सावधानियां'
                  : 'Navaratna 5-Point Authenticity Testing & Wearing Rituals'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* HORIZONTAL GEMSTONE SELECTION STRIP */}
        <div className="px-3 py-2 bg-amber-100/60 border-b border-amber-200 overflow-x-auto flex items-center gap-2 shrink-0 scrollbar-none">
          {NAVARATNA_SCIENCE_COLLECTION.map((gem) => {
            const isSelected = selectedGemstone.id === gem.id;
            return (
              <button
                key={gem.id}
                type="button"
                onClick={() => setSelectedGemstone(gem)}
                className={`px-3 py-1.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md scale-102 border border-amber-300'
                    : 'bg-white text-stone-800 border border-amber-200 hover:bg-amber-50'
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full border border-white shadow-2xs shrink-0"
                  style={{ backgroundColor: gem.colorHex }}
                />
                <span>{gem.nameHi.split('(')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* MAIN SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-4">
          
          {/* GEMSTONE HERO DISPLAY */}
          <div className="bg-white border-2 border-amber-300 rounded-3xl p-4 shadow-sm flex flex-col sm:flex-row items-center gap-4 relative overflow-hidden">
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl shadow-md border-2 shrink-0 relative"
              style={{
                backgroundColor: `${selectedGemstone.colorHex}15`,
                borderColor: selectedGemstone.colorHex
              }}
            >
              <span>{selectedGemstone.imageIcon}</span>
              <span
                className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white shadow-xs"
                style={{ backgroundColor: selectedGemstone.colorHex }}
              />
            </div>

            <div className="flex-1 text-center sm:text-left space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300">
                  {selectedGemstone.planetHi} ({selectedGemstone.planet})
                </span>
                <span className="text-[10px] font-bold text-gray-500">
                  अधिष्ठाता: {selectedGemstone.deityHi}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-amber-950">
                {selectedGemstone.nameHi}
              </h3>

              <p className="text-xs text-gray-600 font-medium">
                अन्य नाम: {selectedGemstone.hindiAliases.join(', ')} | उपरत्न: {selectedGemstone.substituteStoneHi}
              </p>

              {/* Rashi & Lagna compatibility pills */}
              <div className="pt-1 flex flex-wrap gap-1.5 justify-center sm:justify-start text-[10.5px]">
                <span className="font-bold text-stone-700">अनुकूल लग्न:</span>
                {selectedGemstone.lagnaHi.map((l, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* TAB BUTTONS (असली-नकली पहचान | धारण विधान | वैज्ञानिक गुण) */}
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('tests')}
              className={`py-2 px-1 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer ${
                activeTab === 'tests'
                  ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>{isHi ? 'असली-नकली पहचान' : 'Authenticity Tests'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('wearing')}
              className={`py-2 px-1 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer ${
                activeTab === 'wearing'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-700 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>{isHi ? 'धारण विधान व मंत्र' : 'Wearing Ritual'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('science')}
              className={`py-2 px-1 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer ${
                activeTab === 'science'
                  ? 'bg-gradient-to-r from-sky-700 to-blue-800 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span>{isHi ? 'भौतिक व रासायनिक गुण' : 'Gemology Science'}</span>
            </button>
          </div>

          {/* TAB 1: AUTHENTICITY TESTS (५-सूत्रीय पहचान) */}
          {activeTab === 'tests' && (
            <div className="space-y-3">
              <div className="p-3 bg-red-50/70 border border-red-200 rounded-2xl text-xs text-red-950 font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                <p>
                  बाजार में ९०% कांच व सिंथेटिक रत्न बेचे जाते हैं। असली प्राकृतिक {selectedGemstone.nameHi.split('(')[0]} की पहचान हेतु निम्न घरेलू व वैज्ञानिक परीक्षण अवश्य करें:
                </p>
              </div>

              {selectedGemstone.authenticityTests.map((test, idx) => (
                <div
                  key={idx}
                  className="bg-white border-2 border-stone-200 rounded-2xl p-3.5 shadow-xs space-y-2"
                >
                  <h4 className="text-xs sm:text-sm font-black text-stone-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-[11px] font-black">
                      {idx + 1}
                    </span>
                    <span>{test.testNameHi}</span>
                  </h4>

                  <div className="text-xs text-gray-700 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                    <strong className="text-stone-900 font-bold block mb-0.5">
                      🔬 परीक्षण विधि:
                    </strong>
                    <p>{test.procedureHi}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                      <strong className="text-emerald-900 font-black flex items-center gap-1 mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>असली का स्पष्ट लक्षण:</span>
                      </strong>
                      <p className="font-medium text-[11.5px]">{test.realSignHi}</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-950">
                      <strong className="text-rose-900 font-black flex items-center gap-1 mb-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                        <span>नकली की चेतावनी:</span>
                      </strong>
                      <p className="font-medium text-[11.5px]">{test.fakeWarningHi}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: WEARING RITUAL (धारण विधि) */}
          {activeTab === 'wearing' && (
            <div className="space-y-3">
              {/* Wearing Specification Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold text-gray-500 block">💍 श्रेष्ठ धातु</span>
                  <span className="font-black text-amber-950">{selectedGemstone.wearingMetalHi}</span>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold text-gray-500 block">👆 निर्धारित उंगली</span>
                  <span className="font-black text-amber-950">{selectedGemstone.wearingFingerHi}</span>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold text-gray-500 block">⏰ शुभ दिन व समय</span>
                  <span className="font-black text-amber-950">{selectedGemstone.wearingDayHi}</span>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold text-gray-500 block">🌌 शुभ नक्षत्र / तिथि</span>
                  <span className="font-black text-amber-950">{selectedGemstone.wearingTithiNakshatraHi}</span>
                </div>
              </div>

              {/* Prana Pratishtha Mantra Box */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border-2 border-orange-200 space-y-1.5 shadow-2xs">
                <span className="text-[11px] font-black text-orange-950 flex items-center gap-1">
                  <span>🪔</span>
                  <span>प्राण-प्रतिष्ठा व सिद्धिकरण मंत्र:</span>
                </span>
                <p className="text-sm sm:text-base font-black text-orange-900 text-center py-1">
                  {selectedGemstone.pranaPratishthaMantra}
                </p>
              </div>

              {/* STRICT WARNING FOR PROHIBITED LAGNAS */}
              <div className="p-3 rounded-2xl bg-rose-50 border-2 border-rose-300 text-xs text-rose-950 space-y-1">
                <strong className="text-rose-900 font-black flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-700" />
                  <span>कठोर चेतावनी: किन जातकों के लिए पूर्ण वर्जित है?</span>
                </strong>
                <p className="font-medium text-rose-900">
                  निम्न लग्न वाले जातक इसे कदापि धारण न करें:{' '}
                  <span className="font-black underline">{selectedGemstone.prohibitedLagnasHi.join(', ')}</span>
                  {' '}— विपरीत फल व अनिष्ट हो सकता है।
                </p>
              </div>

              {/* Benefits List */}
              <div className="bg-white border border-stone-200 rounded-2xl p-3.5 space-y-2">
                <strong className="text-xs font-black text-amber-950 block">
                  🌟 धारण करने से मिलने वाले शास्त्रोक्त लाभ:
                </strong>
                {selectedGemstone.benefitsHi.map((ben, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-stone-800 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{ben}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: GEMOLOGY SCIENCE (भौतिक व रासायनिक गुण) */}
          {activeTab === 'science' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-3 rounded-2xl bg-white border border-sky-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold text-gray-500 block">कठोरता (Mohs Scale)</span>
                  <span className="font-black text-sky-950">{selectedGemstone.hardnessMohs}</span>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-sky-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold text-gray-500 block">विशिष्ट घनत्व (Gravity)</span>
                  <span className="font-black text-sky-950">{selectedGemstone.specificGravity}</span>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-sky-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold text-gray-500 block">अपवर्तनांक (R.I.)</span>
                  <span className="font-black text-sky-950">{selectedGemstone.refractiveIndex}</span>
                </div>
              </div>

              <div className="p-3 bg-white border border-sky-200 rounded-2xl text-xs text-stone-800 space-y-1.5">
                <strong className="text-sky-950 font-bold block">प्राकृतिक रंग व प्रकाशिक विकिरण:</strong>
                <p className="font-medium text-stone-700">{selectedGemstone.colorHi}</p>
                <p className="text-[11px] text-gray-500">
                  प्राकृतिक रत्न पृथ्वी के गर्भ में लाखों वर्षों के अत्यधिक ताप व दाब से निर्मित होते हैं, जिससे इनमें विशिष्ट ब्रह्मांडीय ऊर्जा तरंगें उत्पन्न होती हैं।
                </p>
              </div>
            </div>
          )}

          {/* 💎 CONTEXTUAL ADMOB AD CARD FOR CERTIFIED GEMSTONES (REVENUE BOOSTER) */}
          <div className="p-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl text-white shadow-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-white/20 border border-white/30 text-amber-100">
                AdMob Sponsored • १००% शुद्ध लैब-प्रमाणित
              </span>
              <span className="text-[10px] font-bold text-amber-200">GIA / IGI Certified</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-black text-white">
                  {selectedGemstone.adTitleHi}
                </h4>
                <p className="text-[11px] text-amber-100 font-medium">
                  {selectedGemstone.adSubtitleHi}
                </p>
              </div>
              <button
                type="button"
                onClick={() => alert(`प्राकृतिक एवं अभिमंत्रित ${selectedGemstone.nameHi.split('(')[0]} रत्न उपलब्धता की जानकारी जल्द ही उपलब्ध होगी।`)}
                className="px-3 py-1.5 rounded-xl bg-white text-orange-950 font-black text-xs hover:bg-amber-50 active:scale-95 transition-all shadow-xs shrink-0 flex items-center gap-1 cursor-pointer"
              >
                <span>रत्न देखें</span>
                <ExternalLink className="w-3 h-3 text-orange-600" />
              </button>
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="px-4 py-2.5 bg-amber-100/70 border-t border-amber-300/80 flex items-center justify-between text-[11px] text-amber-950 font-bold shrink-0">
          <span>💎 प्रामाणिक वैदिक रत्न विज्ञान</span>
          <span>आस्था पूजा व जाप</span>
        </div>
      </div>
    </div>
  );
};

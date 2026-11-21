import React, { useState } from 'react';
import {
  HAST_REKHA_LINES,
  HAST_PARVATS,
  AUSPICIOUS_SIGNS,
  HAST_REKHA_SCIENCE,
  HastRekhaLineItem,
  HastParvatItem,
  AuspiciousSignItem
} from '../data/hastRekhaData';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Heart,
  Compass,
  Award,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';

interface HastRekhaSectionProps {
  language?: 'hi' | 'en';
}

export const HastRekhaSection: React.FC<HastRekhaSectionProps> = ({ language = 'hi' }) => {
  const isHi = language === 'hi';
  const [subTab, setSubTab] = useState<'lines' | 'parvats' | 'signs' | 'science'>('lines');
  const [selectedLineId, setSelectedLineId] = useState<string>('jeevan_rekha');
  const [selectedParvatId, setSelectedParvatId] = useState<string>('guru_parvat');
  const [expandedSignId, setExpandedSignId] = useState<string | null>('matsya');

  const selectedLine = HAST_REKHA_LINES.find((l) => l.id === selectedLineId) || HAST_REKHA_LINES[0];
  const selectedParvat = HAST_PARVATS.find((p) => p.id === selectedParvatId) || HAST_PARVATS[0];

  return (
    <div className="space-y-4 animate-fadeIn select-none">
      {/* 1. TOP HEADER BANNER */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white rounded-2xl p-3 sm:p-4 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-3xl p-2 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20">
            ✋
          </span>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-base sm:text-lg font-black tracking-wide">
                {isHi ? 'सामुद्रिक हस्त ज्ञान' : 'Samudrika Palmistry'}
              </h2>
              <span className="text-[10px] bg-amber-400 text-orange-950 font-black px-1.5 py-0.5 rounded uppercase">
                {isHi ? 'स्कंद पुराण' : 'Vedic'}
              </span>
            </div>
            <p className="text-[11px] text-amber-100">
              {isHi
                ? 'हाथ की रेखाओं का रहस्य, पर्वत, शुभ चिह्न व उन्हें बलवान बनाने के शास्त्रोक्त उपाय'
                : 'Palm lines, mounts, auspicious signs and shastric remedies to strengthen them'}
            </p>
          </div>
        </div>
      </div>

      {/* 2. SUB-TABS NAVIGATION */}
      <div className="grid grid-cols-4 gap-1 p-1 bg-orange-100/80 rounded-2xl border border-orange-200 text-xs font-bold text-center">
        <button
          type="button"
          onClick={() => setSubTab('lines')}
          className={`py-2 px-1 rounded-xl transition-all ${
            subTab === 'lines'
              ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xs font-black'
              : 'text-orange-950 hover:bg-white/60'
          }`}
        >
          <span>📿</span>
          <span className="block text-[11px] mt-0.5">{isHi ? 'प्रमुख रेखाएं' : 'Lines'}</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('parvats')}
          className={`py-2 px-1 rounded-xl transition-all ${
            subTab === 'parvats'
              ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xs font-black'
              : 'text-orange-950 hover:bg-white/60'
          }`}
        >
          <span>⛰️</span>
          <span className="block text-[11px] mt-0.5">{isHi ? '७ पर्वत' : 'Mounts'}</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('signs')}
          className={`py-2 px-1 rounded-xl transition-all ${
            subTab === 'signs'
              ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xs font-black'
              : 'text-orange-950 hover:bg-white/60'
          }`}
        >
          <span>✨</span>
          <span className="block text-[11px] mt-0.5">{isHi ? 'शुभ चिह्न' : 'Signs'}</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('science')}
          className={`py-2 px-1 rounded-xl transition-all ${
            subTab === 'science'
              ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xs font-black'
              : 'text-orange-950 hover:bg-white/60'
          }`}
        >
          <span>🔬</span>
          <span className="block text-[11px] mt-0.5">{isHi ? 'रेखा सुधार' : 'Remedies'}</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* SUBTAB 1: MAJOR PALM LINES (प्रमुख रेखाएं) */}
      {/* ========================================================= */}
      {subTab === 'lines' && (
        <div className="space-y-3.5">
          {/* Interactive Palm SVG Graphic */}
          <div className="bg-gradient-to-b from-amber-50 to-orange-50/80 rounded-3xl p-3 border-2 border-orange-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-1.5 px-1">
              <span className="text-xs font-black text-orange-950 flex items-center gap-1">
                <span>✋</span>
                <span>{isHi ? 'हथेली में रेखा की स्थिति (टैप करके चुनें):' : 'Interactive Palm (Tap line):'}</span>
              </span>
              <span className="text-[10px] text-amber-800 font-bold bg-amber-200/60 px-2 py-0.5 rounded-full">
                {selectedLine.nameHi.split('(')[0].trim()}
              </span>
            </div>

            {/* SVG Visual Palm Diagram */}
            <div className="relative w-full max-w-xs mx-auto aspect-[4/5] bg-white rounded-2xl border border-orange-200 p-2 shadow-inner flex items-center justify-center">
              <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-sm select-none">
                {/* Hand Palm Outline */}
                <path
                  d="M 120 450 
                     C 100 440, 80 400, 75 350
                     C 70 300, 65 240, 65 220
                     C 65 190, 85 180, 100 200
                     C 115 220, 125 245, 130 250
                     C 130 230, 125 140, 125 100
                     C 125 80, 150 80, 150 100
                     L 155 210
                     C 155 180, 175 60, 175 40
                     C 175 20, 205 20, 205 40
                     L 205 210
                     C 205 180, 225 70, 225 60
                     C 225 40, 255 40, 255 60
                     L 255 220
                     C 255 200, 280 130, 285 120
                     C 290 105, 315 110, 315 130
                     C 315 170, 310 260, 315 320
                     C 320 380, 310 430, 275 450
                     Z"
                  fill="#fff7ed"
                  stroke="#fb923c"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />

                {/* Wrist / Manibandh Lines */}
                <path d="M 130 440 Q 200 460 265 440" stroke="#f97316" strokeWidth="2" strokeDasharray="3,3" fill="none" />
                <path d="M 140 455 Q 200 475 255 455" stroke="#f97316" strokeWidth="2" strokeDasharray="3,3" fill="none" />

                {/* 1. Life Line (जीवन रेखा) */}
                <path
                  d="M 125 250 Q 155 310 150 380 Q 145 425 170 445"
                  stroke={selectedLineId === 'jeevan_rekha' ? '#16a34a' : '#86efac'}
                  strokeWidth={selectedLineId === 'jeevan_rekha' ? 6.5 : 3.5}
                  fill="none"
                  strokeLinecap="round"
                  className="cursor-pointer transition-all hover:stroke-[#16a34a]"
                  onClick={() => setSelectedLineId('jeevan_rekha')}
                />

                {/* 2. Head Line (मस्तिष्क रेखा) */}
                <path
                  d="M 125 252 Q 185 270 235 300 Q 270 330 290 350"
                  stroke={selectedLineId === 'mastishk_rekha' ? '#2563eb' : '#93c5fd'}
                  strokeWidth={selectedLineId === 'mastishk_rekha' ? 6.5 : 3.5}
                  fill="none"
                  strokeLinecap="round"
                  className="cursor-pointer transition-all hover:stroke-[#2563eb]"
                  onClick={() => setSelectedLineId('mastishk_rekha')}
                />

                {/* 3. Heart Line (हृदय रेखा) */}
                <path
                  d="M 310 250 Q 240 230 180 235 Q 155 240 145 230"
                  stroke={selectedLineId === 'hriday_rekha' ? '#e11d48' : '#fca5a5'}
                  strokeWidth={selectedLineId === 'hriday_rekha' ? 6.5 : 3.5}
                  fill="none"
                  strokeLinecap="round"
                  className="cursor-pointer transition-all hover:stroke-[#e11d48]"
                  onClick={() => setSelectedLineId('hriday_rekha')}
                />

                {/* 4. Fate Line (भाग्य रेखा) */}
                <path
                  d="M 200 445 L 195 340 L 190 235 L 188 180"
                  stroke={selectedLineId === 'bhagya_rekha' ? '#9333ea' : '#d8b4fe'}
                  strokeWidth={selectedLineId === 'bhagya_rekha' ? 6 : 3}
                  fill="none"
                  strokeLinecap="round"
                  className="cursor-pointer transition-all hover:stroke-[#9333ea]"
                  onClick={() => setSelectedLineId('bhagya_rekha')}
                />

                {/* 5. Sun Line (सूर्य रेखा) */}
                <path
                  d="M 240 370 L 238 290 L 235 200"
                  stroke={selectedLineId === 'surya_rekha' ? '#ea580c' : '#fdba74'}
                  strokeWidth={selectedLineId === 'surya_rekha' ? 5.5 : 2.5}
                  fill="none"
                  strokeLinecap="round"
                  className="cursor-pointer transition-all hover:stroke-[#ea580c]"
                  onClick={() => setSelectedLineId('surya_rekha')}
                />

                {/* 6. Marriage Line (विवाह रेखा) */}
                <path
                  d="M 315 235 L 290 238"
                  stroke={selectedLineId === 'vivah_rekha' ? '#db2777' : '#f472b6'}
                  strokeWidth={selectedLineId === 'vivah_rekha' ? 6 : 3}
                  fill="none"
                  strokeLinecap="round"
                  className="cursor-pointer transition-all hover:stroke-[#db2777]"
                  onClick={() => setSelectedLineId('vivah_rekha')}
                />

                {/* 7. Mercury / Health Line (बुध रेखा) */}
                <path
                  d="M 175 420 Q 230 360 280 270"
                  stroke={selectedLineId === 'budh_rekha' ? '#0d9488' : '#5eead4'}
                  strokeWidth={selectedLineId === 'budh_rekha' ? 5.5 : 2.5}
                  fill="none"
                  strokeLinecap="round"
                  className="cursor-pointer transition-all hover:stroke-[#0d9488]"
                  onClick={() => setSelectedLineId('budh_rekha')}
                />

                {/* Labels & Markers */}
                <text x="110" y="340" fontSize="12" fontWeight="bold" fill="#16a34a">जीवन</text>
                <text x="215" y="275" fontSize="12" fontWeight="bold" fill="#2563eb">मस्तिष्क</text>
                <text x="245" y="225" fontSize="12" fontWeight="bold" fill="#e11d48">हृदय</text>
                <text x="175" y="310" fontSize="11" fontWeight="bold" fill="#9333ea">भाग्य</text>
                <text x="243" y="260" fontSize="11" fontWeight="bold" fill="#ea580c">सूर्य</text>
                <text x="320" y="240" fontSize="10" fontWeight="bold" fill="#db2777">विवाह</text>
              </svg>
            </div>

            {/* Line Selection Quick Pills */}
            <div className="flex flex-wrap gap-1.5 mt-3 justify-center">
              {HAST_REKHA_LINES.map((line) => {
                const isSelected = line.id === selectedLineId;
                return (
                  <button
                    key={line.id}
                    type="button"
                    onClick={() => setSelectedLineId(line.id)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-2xs ${
                      isSelected
                        ? 'bg-orange-600 text-white ring-2 ring-amber-300 scale-102'
                        : 'bg-white text-gray-700 border border-orange-200 hover:bg-orange-50'
                    }`}
                  >
                    <span>{line.icon}</span>
                    <span>{line.nameHi.split('(')[0].trim()}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Selected Line Card */}
          <div className="bg-white rounded-3xl border-2 border-orange-200 p-4 shadow-sm space-y-3.5">
            <div className="border-b border-orange-100 pb-2.5 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedLine.icon}</span>
                  <div>
                    <h3 className="text-base font-black text-orange-950">
                      {selectedLine.nameHi}
                    </h3>
                    <p className="text-[11px] text-gray-500 font-medium">
                      {selectedLine.sanskritName} • {selectedLine.nameEn}
                    </p>
                  </div>
                </div>
              </div>
              <span
                className="w-4 h-4 rounded-full mt-1 border-2 border-white shadow-xs"
                style={{ backgroundColor: selectedLine.color }}
              />
            </div>

            {/* Location & Significance */}
            <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-200/80 text-xs text-orange-950 space-y-1">
              <div>
                <strong className="text-orange-900 block font-bold">📍 हथेली में स्थिति:</strong>
                <p className="text-gray-700 leading-relaxed">{selectedLine.locationHi}</p>
              </div>
              <div className="pt-1">
                <strong className="text-orange-900 block font-bold">🌟 क्या दर्शाती है:</strong>
                <p className="text-gray-700 leading-relaxed">{selectedLine.significanceHi}</p>
              </div>
            </div>

            {/* What It Reveals (4 Key Areas) */}
            <div>
              <h4 className="text-xs font-black text-orange-950 mb-1.5 flex items-center gap-1">
                <span>🔍</span>
                <span>जीवन के मुख्य क्षेत्र जो यह रेखा स्पष्ट करती है:</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-gray-800">
                {selectedLine.whatItReveals.map((item, idx) => (
                  <li key={idx} className="bg-orange-50/60 p-2 rounded-xl border border-orange-100 flex items-start gap-1.5">
                    <span className="text-orange-600 font-black shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Good Signs & Bad Signs Accordion / Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {/* Auspicious Signs */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3 space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-900 font-black text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>शुभ लक्षण (Auspicious Signs):</span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  {selectedLine.goodSigns.map((sign, idx) => (
                    <div key={idx} className="bg-white/80 p-2 rounded-xl border border-emerald-100">
                      <strong className="text-emerald-950 block font-bold">{sign.title}</strong>
                      <p className="text-gray-700 leading-relaxed mt-0.5">{sign.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inauspicious Signs */}
              <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-3 space-y-2">
                <div className="flex items-center gap-1.5 text-rose-900 font-black text-xs">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>दोष या रुकावट के लक्षण:</span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  {selectedLine.badSigns.map((sign, idx) => (
                    <div key={idx} className="bg-white/80 p-2 rounded-xl border border-rose-100">
                      <strong className="text-rose-950 block font-bold">{sign.title}</strong>
                      <p className="text-gray-700 leading-relaxed mt-0.5">{sign.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Shastric Remedies & Transformation Blueprint */}
            <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-600/15 border-2 border-amber-400 rounded-2xl p-3.5 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-lg bg-orange-600 text-white text-xs">📿</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-orange-950">
                    इस रेखा को सुधारने व बलवान बनाने के शास्त्रोक्त उपाय
                  </h4>
                  <p className="text-[10px] text-gray-600">
                    सामुद्रिक शास्त्र व योग विज्ञान सम्मत नित्य आचरण
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="bg-white/90 p-2.5 rounded-xl border border-orange-200">
                  <strong className="text-orange-950 block font-bold mb-0.5">
                    🕉️ विशिष्ट मंत्र साधना:
                  </strong>
                  <p className="text-gray-800 leading-relaxed">{selectedLine.remedies.mantra}</p>
                </div>

                <div className="bg-white/90 p-2.5 rounded-xl border border-orange-200">
                  <strong className="text-orange-950 block font-bold mb-0.5">
                    🧘 हस्त मुद्रा अभ्यास:
                  </strong>
                  <p className="text-gray-800 leading-relaxed">{selectedLine.remedies.mudra}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="bg-white/90 p-2.5 rounded-xl border border-orange-200">
                    <strong className="text-orange-950 block font-bold mb-0.5">
                      🤝 दान व सेवा:
                    </strong>
                    <p className="text-gray-800 leading-relaxed">{selectedLine.remedies.daanSeva}</p>
                  </div>

                  <div className="bg-white/90 p-2.5 rounded-xl border border-orange-200">
                    <strong className="text-orange-950 block font-bold mb-0.5">
                      💍 धातु / रत्न छल्ला:
                    </strong>
                    <p className="text-gray-800 leading-relaxed">{selectedLine.remedies.metalOrRing}</p>
                  </div>
                </div>

                <div className="bg-amber-100/70 p-2 rounded-xl text-[11px] text-amber-950 font-medium">
                  💡 <strong>शास्त्र प्रमाण:</strong> {selectedLine.remedies.explanation}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUBTAB 2: PALM MOUNTS (हथेली के ७ पर्वत) */}
      {/* ========================================================= */}
      {subTab === 'parvats' && (
        <div className="space-y-3.5">
          {/* Mount Selector Pills */}
          <div className="flex flex-wrap gap-1.5 justify-center">
            {HAST_PARVATS.map((parvat) => {
              const isSelected = parvat.id === selectedParvatId;
              return (
                <button
                  key={parvat.id}
                  type="button"
                  onClick={() => setSelectedParvatId(parvat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs ${
                    isSelected
                      ? 'bg-orange-600 text-white ring-2 ring-amber-300 scale-102 font-black'
                      : 'bg-white text-gray-700 border border-orange-200 hover:bg-orange-50'
                  }`}
                >
                  <span>{parvat.nameHi.split('(')[0].trim()}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Mount Details */}
          <div className="bg-white rounded-3xl border-2 border-orange-200 p-4 shadow-sm space-y-3">
            <div className="border-b border-orange-100 pb-2.5 flex items-start justify-between">
              <div>
                <h3 className="text-base font-black text-orange-950 flex items-center gap-2">
                  <span>⛰️</span>
                  <span>{selectedParvat.nameHi}</span>
                </h3>
                <p className="text-xs text-orange-800 font-bold mt-0.5">
                  अधिपति ग्रह: {selectedParvat.rulingPlanet}
                </p>
              </div>
              <span
                className="w-4 h-4 rounded-full mt-1 border border-gray-300 shadow-xs"
                style={{ backgroundColor: selectedParvat.color }}
              />
            </div>

            <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-200/80 text-xs space-y-1">
              <div>
                <strong className="text-orange-950 block font-bold">📍 स्थिति:</strong>
                <p className="text-gray-700 leading-relaxed">{selectedParvat.locationHi}</p>
              </div>
              <div className="pt-1">
                <strong className="text-orange-950 block font-bold">✨ मूल स्वभाव व ऊर्जा:</strong>
                <p className="text-gray-700 leading-relaxed">{selectedParvat.nature}</p>
              </div>
            </div>

            {/* Special Features */}
            <div>
              <h4 className="text-xs font-black text-orange-950 mb-1.5 flex items-center gap-1">
                <span>🔍</span>
                <span>सामुद्रिक लक्षण व पहचान:</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-800">
                {selectedParvat.features.map((feat, idx) => (
                  <li key={idx} className="bg-orange-50/60 p-2 rounded-xl border border-orange-100 flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Balanced vs Unbalanced */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200">
                <strong className="text-emerald-950 block font-bold mb-1">
                  ✅ उन्नत व पुष्ट होने पर फल:
                </strong>
                <p className="text-gray-700 leading-relaxed">{selectedParvat.balancedEffects}</p>
              </div>

              <div className="bg-rose-50/70 p-2.5 rounded-xl border border-rose-200">
                <strong className="text-rose-950 block font-bold mb-1">
                  ⚠️ दबा या कमजोर होने पर फल:
                </strong>
                <p className="text-gray-700 leading-relaxed">{selectedParvat.unbalancedEffects}</p>
              </div>
            </div>

            {/* Mount Remedy */}
            <div className="bg-gradient-to-r from-orange-100/90 to-amber-100/90 border border-orange-300 rounded-2xl p-3 text-xs">
              <strong className="text-orange-950 block font-black mb-1">
                🪔 पर्वत को जाग्रत व संतुलित करने का उपाय:
              </strong>
              <p className="text-gray-800 leading-relaxed">{selectedParvat.remedy}</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUBTAB 3: AUSPICIOUS SIGNS (हथेली के दिव्य शुभ चिह्न) */}
      {/* ========================================================= */}
      {subTab === 'signs' && (
        <div className="space-y-3">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs text-amber-950">
            ✨ <strong>सामुद्रिक शास्त्र के अनुसार:</strong> हथेली में बनने वाले विशेष चिह्न व्यक्ति के पूर्व जन्म के संचित पुण्य और आगामी भाग्योदय की अचूक सूचना देते हैं।
          </div>

          <div className="space-y-2.5">
            {AUSPICIOUS_SIGNS.map((sign) => {
              const isExpanded = expandedSignId === sign.id;
              return (
                <div
                  key={sign.id}
                  className="bg-white rounded-2xl border-2 border-orange-200 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedSignId(isExpanded ? null : sign.id)}
                    className="w-full p-3 flex items-center justify-between text-left hover:bg-orange-50/50"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl p-1.5 rounded-xl bg-orange-100 text-orange-900">
                        {sign.symbol}
                      </span>
                      <div>
                        <h4 className="text-sm font-black text-orange-950">{sign.nameHi}</h4>
                        <p className="text-[11px] text-gray-500">{sign.meaningHi}</p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-orange-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-3 pb-3 pt-1 border-t border-orange-100 space-y-2 text-xs">
                      <div className="bg-orange-50/70 p-2.5 rounded-xl border border-orange-100">
                        <strong className="text-orange-950 block font-bold mb-0.5">
                          📜 शास्त्रोक्त महाफल:
                        </strong>
                        <p className="text-gray-800 leading-relaxed">{sign.shastricResult}</p>
                      </div>

                      <div className="bg-amber-50 p-2 rounded-xl text-[11px] text-orange-950 font-medium">
                        📍 <strong>सर्वोत्तम स्थान:</strong> {sign.bestMount}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUBTAB 4: PALMISTRY SCIENCE & REMEDY BLUEPRINT */}
      {/* ========================================================= */}
      {subTab === 'science' && (
        <div className="space-y-3.5">
          {/* Sanskrit Sloka Card */}
          <div className="bg-gradient-to-r from-orange-800 via-amber-800 to-orange-900 text-white rounded-3xl p-4 text-center shadow-md space-y-2">
            <span className="text-2xl">🕉️</span>
            <h3 className="text-sm font-black text-amber-200">
              {HAST_REKHA_SCIENCE.quoteHi}
            </h3>
            <p className="text-xs text-orange-100 leading-relaxed italic">
              "{HAST_REKHA_SCIENCE.quoteMeaningHi}"
            </p>
          </div>

          {/* Scientific Validation */}
          <div className="bg-white rounded-3xl border-2 border-orange-200 p-4 shadow-sm space-y-2.5">
            <h4 className="text-xs sm:text-sm font-black text-orange-950 flex items-center gap-1.5">
              <span>🔬</span>
              <span>हाथ की रेखाएं कैसे और क्यों बदलती हैं? (न्यूरो-साइंस व शास्त्र)</span>
            </h4>
            <div className="space-y-2 text-xs text-gray-700">
              {HAST_REKHA_SCIENCE.scientificBasis.map((point, idx) => (
                <div key={idx} className="bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/80 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5 Pillars to Transform Lines */}
          <div className="bg-white rounded-3xl border-2 border-orange-200 p-4 shadow-sm space-y-3">
            <h4 className="text-xs sm:text-sm font-black text-orange-950 flex items-center gap-1.5">
              <span>🌟</span>
              <span>रेखाओं को पुष्ट व भाग्यशाली बनाने के ५ मुख्य आधार स्तंभ:</span>
            </h4>
            <div className="space-y-2.5 text-xs">
              {HAST_REKHA_SCIENCE.fivePillarsOfTransformation.map((item, idx) => (
                <div key={idx} className="bg-gradient-to-r from-orange-50 to-amber-50/70 p-3 rounded-2xl border border-orange-200 space-y-1">
                  <strong className="text-orange-950 font-bold block text-xs">
                    {item.pillar}
                  </strong>
                  <p className="text-gray-700 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

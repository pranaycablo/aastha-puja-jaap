import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  Sparkles,
  ChevronRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Calendar,
  Flame,
  Copy,
  Check,
  Share2
} from 'lucide-react';
import {
  SACRED_YANTRAS_COLLECTION,
  SacredYantraItem,
  YantraCategory
} from '../data/yantraMahakoshData';
import { LanguageCode } from '../types';

interface SacredYantraMahakoshModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageCode;
  initialYantraId?: string;
}

// Geometric SVG renderer for authentic sacred Yantra visual
const YantraGeometrySvg: React.FC<{ yantra: SacredYantraItem; size?: number }> = ({
  yantra,
  size = 180
}) => {
  const strokeColor = yantra.accentColor || '#D97706';
  const inkColor = yantra.drawingInkColorHex || '#DC2626';

  return (
    <div
      className="relative flex items-center justify-center p-3 rounded-2xl border-2 shadow-inner overflow-hidden select-none"
      style={{
        backgroundColor: '#FFFBEB',
        borderColor: strokeColor,
        width: size,
        height: size
      }}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-sm transition-transform duration-500 hover:rotate-3"
      >
        {/* Background Sacred Outer Bhupura (4 Gates) */}
        <path
          d="M 20,20 L 70,20 L 70,10 L 130,10 L 130,20 L 180,20 L 180,70 L 190,70 L 190,130 L 180,130 L 180,180 L 130,180 L 130,190 L 70,190 L 70,180 L 20,180 L 20,130 L 10,130 L 10,70 L 20,70 Z"
          fill="none"
          stroke={strokeColor}
          strokeWidth="3.5"
        />
        <path
          d="M 26,26 L 74,26 L 74,18 L 126,18 L 126,26 L 174,26 L 174,74 L 182,74 L 182,126 L 174,126 L 174,174 L 126,174 L 126,182 L 74,182 L 74,174 L 26,174 L 26,126 L 18,126 L 18,74 L 26,74 Z"
          fill="none"
          stroke={inkColor}
          strokeWidth="1.5"
          opacity="0.8"
        />

        {/* Concentric Circles */}
        <circle cx="100" cy="100" r="66" fill="none" stroke={strokeColor} strokeWidth="2" />
        <circle cx="100" cy="100" r="58" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="100" cy="100" r="48" fill="none" stroke={inkColor} strokeWidth="1.5" />

        {/* Lotus Petals / Astadal Ring */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 100 + 58 * Math.cos(rad);
          const y = 100 + 58 * Math.sin(rad);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill={strokeColor}
              opacity="0.75"
            />
          );
        })}

        {/* Specialized Geometric Core */}
        {yantra.geometryType === 'sri_chakra' || yantra.geometryType === 'triangle_nine' ? (
          // Interlocking Sacred Triangles
          <g stroke={inkColor} strokeWidth="2" fill="none">
            <polygon points="100,60 70,120 130,120" />
            <polygon points="100,140 70,80 130,80" />
            <polygon points="100,68 78,114 122,114" />
            <polygon points="100,132 78,86 122,86" />
          </g>
        ) : yantra.geometryType === 'diamond_nine' || yantra.geometryType === 'square_gates' ? (
          // 3x3 Planetary Sacred Grid
          <g stroke={strokeColor} strokeWidth="1.5" fill="none">
            <rect x="68" y="68" width="64" height="64" />
            <line x1="89.3" y1="68" x2="89.3" y2="132" />
            <line x1="110.6" y1="68" x2="110.6" y2="132" />
            <line x1="68" y1="89.3" x2="132" y2="89.3" />
            <line x1="68" y1="110.6" x2="132" y2="110.6" />
          </g>
        ) : (
          // Hexagram Shatkona (Star of David / Shiva-Shakti union)
          <g stroke={inkColor} strokeWidth="2.5" fill="none">
            <polygon points="100,62 68,118 132,118" />
            <polygon points="100,138 68,82 132,82" />
          </g>
        )}

        {/* Central Bindu (Divine Center) */}
        <circle cx="100" cy="100" r="5" fill={inkColor} />
        <circle cx="100" cy="100" r="1.8" fill="#FFF" />
      </svg>
      {/* Corner Watermarks */}
      <span className="absolute top-1 left-2 text-[10px] font-bold text-amber-800/60">卐</span>
      <span className="absolute top-1 right-2 text-[10px] font-bold text-amber-800/60">ॐ</span>
      <span className="absolute bottom-1 left-2 text-[10px] font-bold text-amber-800/60">ॐ</span>
      <span className="absolute bottom-1 right-2 text-[10px] font-bold text-amber-800/60">卐</span>
    </div>
  );
};

export const SacredYantraMahakoshModal: React.FC<SacredYantraMahakoshModalProps> = ({
  isOpen,
  onClose,
  language,
  initialYantraId
}) => {
  const isHi = language === 'hi';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<YantraCategory | 'all'>('all');
  const [activeYantra, setActiveYantra] = useState<SacredYantraItem | null>(() => {
    if (initialYantraId) {
      return SACRED_YANTRAS_COLLECTION.find((y) => y.id === initialYantraId) || null;
    }
    return null;
  });
  const [copiedMantra, setCopiedMantra] = useState(false);

  // Filtered Yantras
  const filteredYantras = useMemo(() => {
    return SACRED_YANTRAS_COLLECTION.filter((item) => {
      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchesCat) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        item.nameHi.toLowerCase().includes(q) ||
        item.nameEn.toLowerCase().includes(q) ||
        item.deityOrPlanet.toLowerCase().includes(q) ||
        item.purposeHi.toLowerCase().includes(q) ||
        (item.associatedDoshas && item.associatedDoshas.some((d) => d.toLowerCase().includes(q))) ||
        item.associatedSigns.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  const handleCopyMantra = (mantra: string) => {
    navigator.clipboard.writeText(mantra);
    setCopiedMantra(true);
    setTimeout(() => setCopiedMantra(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#FFFDF9] via-[#FFF9EE] to-[#FFF5E5] rounded-3xl shadow-2xl border-2 border-amber-400 max-h-[92vh] flex flex-col overflow-hidden text-stone-900">
        
        {/* MODAL HEADER */}
        <div className="px-4 py-3.5 bg-gradient-to-r from-[#7A160A] via-[#A02812] to-[#7A160A] text-white flex items-center justify-between border-b-2 border-amber-400/80 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-2xl shadow-xs">
              🔯
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-wide text-amber-200">
                {isHi ? 'सम्पूर्ण सिद्ध यन्त्र महाकोश' : 'Sacred Yantra Mahakosh'}
              </h2>
              <p className="text-[10.5px] text-amber-100/90 font-bold">
                {isHi
                  ? '३१ सिद्ध यन्त्र • दैनिक कागज पर निर्माण विधि • धारण व स्थापना'
                  : '31 Vedic, Tantrik & Daivik Yantras with Daily Drawing Vidhi'}
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

        {/* ACTIVE YANTRA DETAIL FULLSCREEN VIEW */}
        {activeYantra ? (
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-4">
            {/* Top Back Nav & Category Badge */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveYantra(null)}
                className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-black text-xs flex items-center gap-1 active:scale-95 transition-all cursor-pointer border border-amber-300"
              >
                <span>❮</span>
                <span>{isHi ? 'सभी यन्त्र सूची पर लौटें' : 'Back to All Yantras'}</span>
              </button>
              <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-orange-100 text-orange-950 border border-orange-300">
                {activeYantra.categoryLabelHi}
              </span>
            </div>

            {/* YANTRA HERO CARD */}
            <div className="bg-white border-2 border-amber-300 rounded-3xl p-4 shadow-md flex flex-col sm:flex-row items-center gap-4">
              <YantraGeometrySvg yantra={activeYantra} size={160} />
              <div className="flex-1 text-center sm:text-left space-y-1.5 min-w-0">
                <span className="text-[10px] font-black uppercase text-orange-800 tracking-wider">
                  {activeYantra.deityOrPlanet}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-amber-950">
                  {activeYantra.nameHi}
                </h3>
                <p className="text-xs text-gray-700 font-medium leading-relaxed">
                  {activeYantra.purposeHi}
                </p>

                {/* Associated Signs & Doshas */}
                <div className="pt-1 flex flex-wrap gap-1.5 justify-center sm:justify-start text-[10.5px]">
                  {activeYantra.associatedSigns.map((s, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200 font-bold"
                    >
                      {s}
                    </span>
                  ))}
                  {activeYantra.associatedDoshas?.map((d, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-900 border border-rose-200 font-bold"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* BEEJ MANTRA BOX */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border-2 border-orange-200 space-y-1.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-orange-900 flex items-center gap-1">
                  <span>📿</span>
                  <span>{isHi ? 'सिद्ध बीज मंत्र (नित्य २१ या १०८ जप):' : 'Beej Mantra:'}</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyMantra(activeYantra.beejMantra)}
                  className="px-2 py-1 rounded-lg bg-white border border-orange-300 text-[10px] font-bold text-orange-950 hover:bg-orange-100 flex items-center gap-1 transition-all"
                >
                  {copiedMantra ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>{isHi ? 'कॉपी हुआ' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>{isHi ? 'मंत्र कॉपी करें' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-sm sm:text-base font-black text-orange-950 tracking-wide text-center py-1">
                {activeYantra.beejMantra}
              </p>
              {activeYantra.gayatriMantra && (
                <p className="text-xs font-bold text-stone-700 text-center border-t border-orange-200/60 pt-1">
                  गायत्री: {activeYantra.gayatriMantra}
                </p>
              )}
            </div>

            {/* 🔴 SPECIAL USER REQUEST: DAILY PAPER DRAWING VIDHI */}
            <div className="bg-gradient-to-br from-red-50/70 via-amber-50/60 to-red-50/70 border-2 border-red-300 rounded-3xl p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center text-base font-black shadow-xs">
                    ✍️
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-red-950">
                      {isHi ? 'दैनिक कागज पर यन्त्र निर्माण विधि (चमत्कारी सुधार)' : 'Daily Paper Drawing Ritual'}
                    </h4>
                    <p className="text-[10px] text-red-800 font-bold">
                      {isHi
                        ? 'कुण्डली दोष शांति व त्वरित फल हेतु नित्य अपने हाथों से बनाएं'
                        : 'Draw daily with prescribed sacred ink for rapid planetary relief'}
                    </p>
                  </div>
                </div>
                <span className="text-[10.5px] font-black px-2.5 py-1 rounded-full bg-red-600 text-white shadow-2xs">
                  विशेष उपाय
                </span>
              </div>

              {/* Drawing Inks, Paper & Timing Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {/* Ink Color */}
                <div className="p-2.5 rounded-xl bg-white border border-red-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold text-gray-500 block">
                    🎨 {isHi ? 'निर्धारित स्याही / रंग:' : 'Prescribed Ink:'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-4 h-4 rounded-full border border-gray-300 shadow-2xs shrink-0"
                      style={{ backgroundColor: activeYantra.drawingInkColorHex }}
                    />
                    <span className="font-black text-red-950 text-xs">
                      {activeYantra.drawingInkColor}
                    </span>
                  </div>
                </div>

                {/* Paper Type */}
                <div className="p-2.5 rounded-xl bg-white border border-red-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold text-gray-500 block">
                    📜 {isHi ? 'पत्र / कागज:' : 'Paper / Leaf:'}
                  </span>
                  <span className="font-black text-stone-900 text-xs line-clamp-1">
                    {activeYantra.drawingPaperType}
                  </span>
                </div>

                {/* Day / Muhurat */}
                <div className="p-2.5 rounded-xl bg-white border border-red-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold text-gray-500 block">
                    ⏰ {isHi ? 'शुभ दिन व समय:' : 'Auspicious Day/Time:'}
                  </span>
                  <span className="font-black text-stone-900 text-xs line-clamp-1">
                    {activeYantra.drawingDay}
                  </span>
                </div>
              </div>

              {/* Drawing Steps */}
              <div className="p-3 bg-white/90 rounded-2xl border border-red-200 space-y-2 text-xs text-stone-800">
                <strong className="text-red-950 font-black block text-[11.5px]">
                  📋 {isHi ? 'निर्माण की क्रमिक विधि:' : 'Step-by-step Drawing Procedure:'}
                </strong>
                <ol className="list-decimal pl-4 space-y-1.5 font-medium leading-relaxed">
                  {activeYantra.drawingVidhiSteps.map((step, idx) => (
                    <li key={idx}>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Daily Drawing Benefits Banner */}
              <div className="p-2.5 rounded-xl bg-amber-100/90 border border-amber-300 text-xs text-amber-950 font-bold flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p>
                  <strong>{isHi ? 'चमत्कारी प्रभाव:' : 'Miraculous Benefit:'}</strong>{' '}
                  {activeYantra.dailyDrawingBenefits}
                </p>
              </div>
            </div>

            {/* WEARING / INSTALLATION RITUAL */}
            <div className="bg-white border-2 border-amber-200 rounded-3xl p-4 shadow-sm space-y-3">
              <h4 className="text-xs sm:text-sm font-black text-amber-950 flex items-center gap-1.5">
                <span>🛡️</span>
                <span>{isHi ? 'यन्त्र धारण व गृह स्थापना विधान:' : 'Wearing & Installation Procedure:'}</span>
              </h4>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-amber-50/60 border border-amber-200">
                  <span className="text-[10px] font-bold text-amber-900 block">श्रेष्ठ धातु</span>
                  <span className="font-black text-stone-900">{activeYantra.dharanMetal}</span>
                </div>
                <div className="p-2 rounded-xl bg-amber-50/60 border border-amber-200">
                  <span className="text-[10px] font-bold text-amber-900 block">शुभ मुहूर्त/नक्षत्र</span>
                  <span className="font-black text-stone-900">{activeYantra.dharanDay}</span>
                </div>
                <div className="p-2 rounded-xl bg-amber-50/60 border border-amber-200 col-span-2">
                  <span className="text-[10px] font-bold text-amber-900 block">स्थापना स्थल</span>
                  <span className="font-black text-stone-900">{activeYantra.installationPlacement}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 font-medium">
                <strong className="text-stone-900 block font-bold mb-0.5">
                  🪔 प्राण-प्रतिष्ठा व शुद्धिकरण:
                </strong>
                <p>{activeYantra.energizationProcedure}</p>
              </div>

              {/* Benefits Checklist */}
              <div className="space-y-1.5 pt-1">
                <strong className="text-xs font-black text-amber-950 block">
                  🌟 {isHi ? 'सिद्ध यन्त्र के मुख्य फल व लाभ:' : 'Key Benefits:'}
                </strong>
                {activeYantra.benefitsHi.map((ben, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-stone-800 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{ben}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // YANTRA GALLERY & SEARCH VIEW
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3">
            {/* Search Input Bar */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isHi
                    ? 'यन्त्र का नाम, ग्रह, देवी-देवता या समस्या (उदा. धन, शत्रु, कालसर्प)...'
                    : 'Search yantra, deity, problem or dosha...'
                }
                className="w-full bg-white border-2 border-amber-300 focus:border-amber-500 rounded-2xl py-2.5 pl-10 pr-4 text-xs font-bold text-stone-900 placeholder:text-gray-400 outline-none shadow-xs"
              />
              <Search className="w-4 h-4 text-amber-600 absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-gray-700 font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'all', label: isHi ? 'सभी (३१)' : 'All (31)' },
                { id: 'grah', label: isHi ? '🪐 नवग्रह यन्त्र' : 'Navagraha' },
                { id: 'devi', label: isHi ? '🌸 देवी यन्त्र' : 'Devi Yantras' },
                { id: 'devta', label: isHi ? '🔱 देवता यन्त्र' : 'Devta Yantras' },
                { id: 'tantrik', label: isHi ? '🛡️ तांत्रिक व निवारण' : 'Tantrik' },
                { id: 'daivik', label: isHi ? '✨ दैविक यन्त्र' : 'Daivik' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-3 py-1.5 rounded-full text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-xs'
                      : 'bg-white border border-amber-200 text-stone-700 hover:bg-amber-50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Quick Info Strip */}
            <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-950 font-bold flex items-center justify-between">
              <span>🔯 {isHi ? `कुल ${filteredYantras.length} सिद्ध यन्त्र उपलब्ध हैं` : `${filteredYantras.length} Yantras Available`}</span>
              <span className="text-[10px] text-orange-700">कागज पर बनाने के रंग व विधि सहित</span>
            </div>

            {/* Yantra Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {filteredYantras.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveYantra(item)}
                  className="bg-white border-2 border-amber-200 hover:border-amber-400 rounded-2xl p-3 text-left shadow-xs hover:shadow-md transition-all flex items-start gap-3 active:scale-[0.98] cursor-pointer group"
                >
                  <YantraGeometrySvg yantra={item} size={68} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[9.5px] font-bold text-orange-800 uppercase line-clamp-1">
                        {item.categoryLabelHi}
                      </span>
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-gray-300 shrink-0"
                        title={item.drawingInkColor}
                        style={{ backgroundColor: item.drawingInkColorHex }}
                      />
                    </div>
                    <h4 className="text-xs sm:text-sm font-black text-amber-950 line-clamp-1 group-hover:text-orange-700 transition-colors">
                      {item.nameHi}
                    </h4>
                    <p className="text-[10.5px] text-gray-600 font-medium line-clamp-2 mt-0.5">
                      {item.purposeHi}
                    </p>
                    <div className="flex items-center justify-between pt-1.5 mt-1 border-t border-amber-100 text-[10px]">
                      <span className="font-bold text-red-700 line-clamp-1">
                        स्याही: {item.drawingInkColor.split('/')[0]}
                      </span>
                      <span className="font-black text-amber-800 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                        विधि ❯
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {filteredYantras.length === 0 && (
              <div className="text-center py-12 text-gray-500 space-y-2">
                <span className="text-3xl">🔍</span>
                <p className="text-xs font-bold">
                  {isHi ? 'कोई यन्त्र नहीं मिला। कृपया अन्य शब्द खोजें।' : 'No Yantra found.'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* MODAL FOOTER */}
        <div className="px-4 py-2.5 bg-amber-100/70 border-t border-amber-300/80 flex items-center justify-between text-[11px] text-amber-950 font-bold shrink-0">
          <span>🚩 शास्त्र सम्मत सिद्ध यन्त्र महाकोश</span>
          <span>आस्था पूजा व जाप</span>
        </div>
      </div>
    </div>
  );
};

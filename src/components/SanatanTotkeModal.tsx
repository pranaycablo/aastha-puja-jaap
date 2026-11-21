import React, { useState } from 'react';
import { X, Sparkles, Clock, Flame, ShieldAlert, CheckCircle2, ChevronRight, Heart } from 'lucide-react';
import { SANATAN_TOTKE_DATA, SanatanTotkaItem } from '../data/sanatanTotkeData';

interface SanatanTotkeModalProps {
  onClose: () => void;
  isHi?: boolean;
}

export const SanatanTotkeModal: React.FC<SanatanTotkeModalProps> = ({
  onClose,
  isHi = true
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTotka, setSelectedTotka] = useState<SanatanTotkaItem | null>(null);

  const categories = [
    { id: 'all', label: isHi ? 'सभी अचूक टोटके' : 'All Totke', icon: '🔮' },
    { id: 'dhan', label: isHi ? 'धन व कर्ज मुक्ति' : 'Wealth & Debt', icon: '💰' },
    { id: 'nazar', label: isHi ? 'नजर दोष निवारण' : 'Evil Eye', icon: '🧿' },
    { id: 'vyapar', label: isHi ? 'व्यापार व नौकरी' : 'Business/Job', icon: '💼' },
    { id: 'klesh', label: isHi ? 'गृह क्लेश शांति' : 'Peace at Home', icon: '🏡' },
    { id: 'swasthya', label: isHi ? 'रोग व स्वास्थ्य' : 'Health', icon: '🌿' },
    { id: 'vivah', label: isHi ? 'शीघ्र विवाह' : 'Marriage', icon: '💍' },
    { id: 'shiksha', label: isHi ? 'विद्या व बुद्धि' : 'Education', icon: '📚' }
  ];

  const filteredTotke = selectedCategory === 'all'
    ? SANATAN_TOTKE_DATA
    : SANATAN_TOTKE_DATA.filter(t => t.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 select-none animate-fadeIn">
      <div className="bg-[#FFFDF9] w-full max-w-lg rounded-3xl shadow-2xl border-2 border-amber-400 overflow-hidden flex flex-col max-h-[92vh]">
        {/* MODAL HEADER */}
        <div className="p-4 bg-gradient-to-r from-[#7C1D13] via-[#9A3412] to-[#7C1D13] text-white flex items-center justify-between shadow-md shrink-0 border-b border-amber-400/50">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-300/40 text-2xl flex items-center justify-center shadow-xs">
              🔮
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-stone-950">
                  {isHi ? 'शास्त्र सम्मत सात्विक' : 'Sattvik Upay'}
                </span>
                <span className="text-[10px] text-amber-200 font-bold">
                  {isHi ? 'अचूक लाभ' : 'Divine Remedies'}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-amber-100 tracking-wide mt-0.5">
                {isHi ? 'सनातन अचूक टोटके व सात्विक उपाय' : 'Sanatan Totke & Vedic Remedies'}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all active:scale-90 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CATEGORY SELECTOR CHIPS */}
        <div className="flex items-center gap-1.5 p-2.5 bg-amber-50/80 border-b border-orange-200 overflow-x-auto scrollbar-none shrink-0">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setSelectedCategory(c.id);
                setSelectedTotka(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black shrink-0 transition-all flex items-center gap-1 active:scale-95 cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xs ring-1 ring-orange-500'
                  : 'bg-white text-orange-950 border border-orange-200 hover:bg-orange-100'
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>

        {/* CONTENT AREA */}
        <div className="p-3 sm:p-4 overflow-y-auto space-y-3.5 flex-1">
          {selectedTotka ? (
            /* DETAILED TOTKA VIEW */
            <div className="space-y-3 animate-fadeIn">
              <button
                type="button"
                onClick={() => setSelectedTotka(null)}
                className="text-xs font-bold text-orange-700 hover:text-orange-900 flex items-center gap-1 mb-1 cursor-pointer"
              >
                <span>←</span>
                <span>{isHi ? 'सभी टोटके सूची पर वापस जाएं' : 'Back to list'}</span>
              </button>

              <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-amber-500/10 border-2 border-amber-400 rounded-2xl p-4 shadow-sm text-center">
                <span className="text-4xl mb-2 block">{selectedTotka.icon}</span>
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-950 border border-amber-400/80">
                  {selectedTotka.categoryLabelHi}
                </span>
                <h3 className="text-base sm:text-lg font-black text-amber-950 mt-1.5 leading-snug">
                  {selectedTotka.title}
                </h3>
              </div>

              {/* BENEFIT HIGHLIGHT */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 text-xs">
                <div className="flex items-center gap-1.5 font-black text-emerald-900 mb-1 text-sm">
                  <span>✨</span>
                  <span>{isHi ? 'होने वाला चमत्कारी लाभ:' : 'Divine Benefits:'}</span>
                </div>
                <p className="leading-relaxed font-semibold">
                  {selectedTotka.benefit}
                </p>
              </div>

              {/* TIMING & ITEMS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-300">
                  <div className="flex items-center gap-1 font-bold text-orange-950 mb-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>{isHi ? 'शुभ दिन व मुहूर्त:' : 'Auspicious Timing:'}</span>
                  </div>
                  <p className="text-gray-700 leading-snug">{selectedTotka.timing}</p>
                </div>

                <div className="p-3 rounded-2xl bg-orange-50/80 border border-orange-300">
                  <div className="flex items-center gap-1 font-bold text-orange-950 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                    <span>{isHi ? 'आवश्यक सामग्री:' : 'Required Items:'}</span>
                  </div>
                  <p className="text-gray-700 leading-snug">{selectedTotka.samagri}</p>
                </div>
              </div>

              {/* STEP BY STEP VIDHI */}
              <div className="p-3.5 rounded-2xl bg-white border-2 border-amber-300 shadow-xs">
                <div className="flex items-center gap-1.5 font-black text-orange-950 mb-2 text-xs">
                  <Flame className="w-4 h-4 text-orange-600" />
                  <span>{isHi ? 'सरल शास्त्र सम्मत विधि (Step-by-Step):' : 'Method:'}</span>
                </div>
                <div className="space-y-2 text-xs text-gray-800">
                  {selectedTotka.vidhi.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-800 font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5 border border-orange-300">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed font-medium">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SAVDHANI & SATTVIK RULE */}
              <div className="p-3 rounded-2xl bg-amber-100/60 border border-amber-400 text-xs text-amber-950">
                <div className="flex items-center gap-1 font-black mb-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                  <span>{isHi ? 'सात्विक सावधानी व नियम:' : 'Precaution:'}</span>
                </div>
                <p className="leading-relaxed font-medium">{selectedTotka.savdhani}</p>
              </div>
            </div>
          ) : (
            /* TOTKE LIST CARDS */
            <div className="space-y-2.5">
              <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-300 text-[11px] text-amber-950 flex items-center gap-2">
                <span className="text-xl">🪔</span>
                <span>
                  <strong>ऋषि मुनि परम्परा:</strong> ये सभी टोटके विशुद्ध सात्विक हैं और किसी को बिना कष्ट पहुंचाए अपनी ऊर्जा, वातावरण व भाग्य को अनुकूल करने के लिए हैं।
                </span>
              </div>

              {filteredTotke.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTotka(t)}
                  className="w-full p-3.5 rounded-2xl bg-white hover:bg-orange-50/60 border-2 border-amber-200 hover:border-orange-400 shadow-2xs hover:shadow-xs text-left transition-all flex items-center justify-between gap-3 active:scale-[0.98] cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-11 h-11 rounded-2xl bg-amber-100 border border-amber-300 text-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {t.icon}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-orange-100 text-orange-950">
                          {t.categoryLabelHi}
                        </span>
                        <span className="text-[10px] text-gray-500 font-bold truncate">
                          {t.timing.split('अथवा')[0]}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-black text-gray-900 group-hover:text-orange-950 truncate">
                        {t.title}
                      </h4>
                      <p className="text-[11px] text-emerald-800 line-clamp-1 font-semibold mt-0.5">
                        {t.benefit}
                      </p>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-900 flex items-center justify-center font-black text-xs shrink-0 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    ➔
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="p-3 bg-white border-t border-orange-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1 text-[11px] text-amber-950 font-bold">
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>{isHi ? 'सनातन सात्विक कल्याण हेतु समर्पित' : 'Sanatan Welfare'}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-xs shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer"
          >
            {isHi ? 'पूर्ण (बंद करें)' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

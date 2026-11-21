import React, { useState } from 'react';
import { MantraItem, LanguageCode } from '../types';
import { COMPLETE_AARTI_COLLECTION, AartiItem, aartiToMantraItem } from '../data/aartiData';
import { ttsEngine } from '../utils/ttsEngine';
import {
  X,
  Search,
  Volume2,
  VolumeX,
  Play,
  Sparkles,
  Flame,
  ChevronDown,
  ChevronUp,
  Clock
} from 'lucide-react';

interface AartiSangrahModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAartiAndChant: (mantra: MantraItem) => void;
  language?: LanguageCode;
}

export const AartiSangrahModal: React.FC<AartiSangrahModalProps> = ({
  isOpen,
  onClose,
  onSelectAartiAndChant,
  language = 'hi'
}) => {
  const isHi = language === 'hi';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAartiId, setSelectedAartiId] = useState<string>(() => {
    try {
      return localStorage.getItem('aastha_last_aarti_id') || 'aarti-om-jai-jagdish';
    } catch {
      return 'aarti-om-jai-jagdish';
    }
  });
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showFullBenefits, setShowFullBenefits] = useState(false);

  const activeAarti = React.useMemo(() => {
    return COMPLETE_AARTI_COLLECTION.find((a) => a.id === selectedAartiId) || COMPLETE_AARTI_COLLECTION[0];
  }, [selectedAartiId]);

  const filteredList = React.useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return COMPLETE_AARTI_COLLECTION;
    return COMPLETE_AARTI_COLLECTION.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.deity.toLowerCase().includes(q) ||
        a.text.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  React.useEffect(() => {
    return () => {
      ttsEngine.stop();
    };
  }, []);

  if (!isOpen) return null;

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      ttsEngine.stop();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      ttsEngine.speakMantra(activeAarti.text, {
        lang: 'hi',
        rate: 0.88,
        withDevotionalMusic: true,
        devotionalMusicMode: 'aarti_music',
        isShlokaChant: true,
        onStart: () => setIsPlayingAudio(true),
        onEnd: () => setIsPlayingAudio(false),
        onError: () => setIsPlayingAudio(false)
      });
    }
  };

  const handleSelectAarti = (aarti: AartiItem) => {
    ttsEngine.stop();
    setIsPlayingAudio(false);
    setSelectedAartiId(aarti.id);
    try {
      localStorage.setItem('aastha_last_aarti_id', aarti.id);
    } catch {}
  };

  const handleStartJaap = () => {
    ttsEngine.stop();
    setIsPlayingAudio(false);
    onClose();
    onSelectAartiAndChant(aartiToMantraItem(activeAarti));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="bg-[#FFFDF9] border-2 border-orange-300 rounded-3xl max-w-xl w-full max-h-[94vh] flex flex-col shadow-2xl overflow-hidden select-none">
        {/* HEADER */}
        <div className="p-3 sm:p-4 bg-gradient-to-r from-orange-700 via-amber-600 to-orange-800 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <span className="text-2xl p-1.5 rounded-xl bg-white/20">🪔</span>
            <div>
              <h2 className="text-sm sm:text-base font-black tracking-wide">
                {isHi ? 'सनातन महाआरती संग्रह' : 'Divine Aarti Sangrah'}
              </h2>
              <p className="text-[11px] text-amber-100">
                {COMPLETE_AARTI_COLLECTION.length} {isHi ? 'प्रमुख देवी-देवताओं की पावन आरतियां' : 'Complete Holy Aartis'}
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

        {/* SEARCH BAR & AARTI SELECTION TABS */}
        <div className="p-2.5 bg-orange-50 border-b border-orange-200 space-y-2">
          <div className="relative">
            <Search className="w-4 h-4 text-orange-600 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={isHi ? 'आरती खोजें (उदा. जगदीश, गणेश, शिव, हनुमान)...' : 'Search Aarti...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-orange-300 text-xs font-bold text-orange-950 focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
            />
          </div>

          {/* Quick Horizontal Aartis Carousel */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {filteredList.map((a) => {
              const isSelected = a.id === selectedAartiId;
              return (
                <button
                  key={a.id}
                  onClick={() => handleSelectAarti(a)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1 ${
                    isSelected
                      ? 'bg-orange-600 text-white shadow-xs ring-1 ring-orange-400'
                      : 'bg-white text-orange-950 border border-orange-200 hover:bg-orange-100'
                  }`}
                >
                  <span>{a.deityIcon}</span>
                  <span className="truncate max-w-[120px]">{a.deity}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SELECTED AARTI DETAIL VIEWER */}
        <div className="p-3 sm:p-4 overflow-y-auto space-y-3 flex-1 scrollbar-thin">
          <div className="flex items-center justify-between gap-2 border-b border-orange-100 pb-2">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base">{activeAarti.deityIcon}</span>
                <span className="text-[10px] font-black uppercase text-orange-800 bg-orange-100 px-2 py-0.5 rounded-md">
                  {activeAarti.deity}
                </span>
              </div>
              <h3 className="text-base font-black text-orange-950 mt-1">
                {activeAarti.name}
              </h3>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {/* Start Chanting Button */}
              <button
                type="button"
                onClick={handleStartJaap}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold text-xs shadow-xs hover:brightness-105 active:scale-95 flex items-center gap-1"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isHi ? 'जपें' : 'Chant'}</span>
              </button>
            </div>
          </div>

          {/* Quick Timing & Significance Pill */}
          <div className="flex items-center justify-between text-[11px] bg-orange-50/70 p-2 rounded-xl border border-orange-200">
            <span className="text-orange-950 font-bold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-orange-600" />
              <span>{isHi ? 'शुभ समय:' : 'Auspicious Time:'} {activeAarti.timing}</span>
            </span>
          </div>

          {/* Verses Box */}
          <div className="p-3.5 bg-amber-50/60 border border-orange-200 rounded-2xl max-h-[42vh] overflow-y-auto shadow-inner scrollbar-thin">
            <p className="text-sm sm:text-base font-bold font-sanskrit text-amber-950 leading-relaxed whitespace-pre-line text-center">
              {activeAarti.text}
            </p>
          </div>

          {/* Meaning & Benefits */}
          <div className="bg-orange-50/80 p-3 rounded-2xl border border-orange-200 text-xs text-orange-950 space-y-1.5">
            <div className="flex items-center justify-between">
              <strong className="flex items-center gap-1 font-bold text-orange-900">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                <span>{isHi ? 'आरती फलश्रुति व महत्व:' : 'Significance & Benefits:'}</span>
              </strong>
              <button
                type="button"
                onClick={() => setShowFullBenefits(!showFullBenefits)}
                className="text-[11px] text-orange-700 underline font-bold"
              >
                {showFullBenefits ? (isHi ? 'कम देखें' : 'Less') : (isHi ? 'विस्तार से' : 'Details')}
              </button>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {activeAarti.meaning}
            </p>
            {showFullBenefits && (
              <p className="text-emerald-900 font-bold pt-1 border-t border-orange-200/60">
                ✨ {isHi ? 'पुण्य फल:' : 'Blessings:'} {activeAarti.benefits}
              </p>
            )}
          </div>
        </div>

        {/* BOTTOM ACTION */}
        <div className="p-3 bg-orange-50 border-t border-orange-200 flex items-center justify-between gap-2">
          <span className="text-xs text-gray-500 font-bold truncate">
            {activeAarti.name}
          </span>
          <button
            onClick={handleStartJaap}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black text-xs shadow-md hover:brightness-105 active:scale-95 flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isHi ? 'माला काउंटर पर जपें 📿' : 'Chant on Mala'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

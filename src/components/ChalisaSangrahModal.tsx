import React, { useState } from 'react';
import { MantraItem, LanguageCode } from '../types';
import { CHALISA_SUNDARKAND_MANTRAS } from '../data/chalisaSundarkandData';
import { ttsEngine } from '../utils/ttsEngine';
import { DivineDeityDarshanCard } from './DivineDeityDarshanCard';
import { AdMobNativeCard } from './AdMobNativeCard';
import {
  X,
  Search,
  Volume2,
  VolumeX,
  Play,
  Sparkles,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Check
} from 'lucide-react';

interface ChalisaSangrahModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChalisaAndChant: (mantra: MantraItem) => void;
  language?: LanguageCode;
}

export const ChalisaSangrahModal: React.FC<ChalisaSangrahModalProps> = ({
  isOpen,
  onClose,
  onSelectChalisaAndChant,
  language = 'hi'
}) => {
  const isHi = language === 'hi';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChalisaId, setSelectedChalisaId] = useState<string>(() => {
    try {
      return localStorage.getItem('aastha_last_chalisa_id') || 'chalisa-hanuman';
    } catch {
      return 'chalisa-hanuman';
    }
  });
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showFullMeaning, setShowFullMeaning] = useState(false);

  // All chalisas from dataset
  const allChalisas = React.useMemo(() => {
    return CHALISA_SUNDARKAND_MANTRAS.filter((m) => m.category === 'chalisa');
  }, []);

  const activeChalisa = React.useMemo(() => {
    return allChalisas.find((c) => c.id === selectedChalisaId) || allChalisas[0];
  }, [allChalisas, selectedChalisaId]);

  const filteredList = React.useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return allChalisas;
    return allChalisas.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.deityLabel && c.deityLabel.toLowerCase().includes(q)) ||
        c.text.toLowerCase().includes(q)
    );
  }, [allChalisas, searchQuery]);

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
      ttsEngine.speakMantra(activeChalisa.text, {
        lang: 'hi',
        rate: 0.86,
        withDevotionalMusic: true,
        devotionalMusicMode: 'chalisa_dhun',
        isShlokaChant: true,
        onStart: () => setIsPlayingAudio(true),
        onEnd: () => setIsPlayingAudio(false),
        onError: () => setIsPlayingAudio(false)
      });
    }
  };

  const handleSelectChalisa = (chalisa: MantraItem) => {
    ttsEngine.stop();
    setIsPlayingAudio(false);
    setSelectedChalisaId(chalisa.id);
    try {
      localStorage.setItem('aastha_last_chalisa_id', chalisa.id);
    } catch {}
  };

  const handleStartJaap = () => {
    ttsEngine.stop();
    setIsPlayingAudio(false);
    onClose();
    onSelectChalisaAndChant(activeChalisa);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="bg-[#FFFDF9] border-2 border-orange-300 rounded-3xl max-w-xl w-full max-h-[94vh] flex flex-col shadow-2xl overflow-hidden select-none">
        {/* HEADER */}
        <div className="p-3 sm:p-4 bg-gradient-to-r from-orange-700 via-amber-600 to-orange-800 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <span className="text-2xl p-1.5 rounded-xl bg-white/20">📿</span>
            <div>
              <h2 className="text-sm sm:text-base font-black tracking-wide">
                {isHi ? 'सनातन चालीसा संग्रह' : 'Sacred Chalisa Sangrah'}
              </h2>
              <p className="text-[11px] text-amber-100">
                {allChalisas.length} {isHi ? 'प्रमुख देवी-देवताओं की सिद्ध चालीसाएं' : 'Divine Chalisas'}
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

        {/* SEARCH BAR & HORIZONTAL CHALISA SELECTOR */}
        <div className="p-2.5 bg-orange-50 border-b border-orange-200 space-y-2">
          <div className="relative">
            <Search className="w-4 h-4 text-orange-600 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={isHi ? 'चालीसा खोजें (उदा. हनुमान, शिव, दुर्गा)...' : 'Search Chalisa...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-orange-300 text-xs font-bold text-orange-950 focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
            />
          </div>

          {/* Quick Horizontal Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {filteredList.map((c) => {
              const isSelected = c.id === selectedChalisaId;
              return (
                <button
                  key={c.id}
                  onClick={() => handleSelectChalisa(c)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1 ${
                    isSelected
                      ? 'bg-orange-600 text-white shadow-xs ring-1 ring-orange-400'
                      : 'bg-white text-orange-950 border border-orange-200 hover:bg-orange-100'
                  }`}
                >
                  <span>🔱</span>
                  <span className="truncate max-w-[120px]">{c.name.replace('श्री ', '').replace(' चालीसा', '')}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SELECTED CHALISA CONTENT VIEWER */}
        <div className="p-3 sm:p-4 overflow-y-auto space-y-3 flex-1 scrollbar-thin">
          
          {/* DIVINE DEITY DARSHAN CARD */}
          <DivineDeityDarshanCard
            deityType={activeChalisa.deity || activeChalisa.id}
            title={activeChalisa.name}
            subtitle={activeChalisa.deityLabel || 'सनातन देव'}
            size="banner"
          />

          <div className="flex items-center justify-between gap-2 border-b border-orange-100 pb-2">
            <div>
              <span className="text-[10px] font-black uppercase text-orange-800 bg-orange-100 px-2 py-0.5 rounded-md">
                {activeChalisa.deityLabel || 'सनातन देव'}
              </span>
              <h3 className="text-base font-black text-orange-950 mt-1">
                {activeChalisa.name}
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

          {/* Verses Box */}
          <div className="p-3.5 bg-amber-50/60 border border-orange-200 rounded-2xl max-h-[45vh] overflow-y-auto shadow-inner scrollbar-thin">
            <p className="text-sm sm:text-base font-bold font-sanskrit text-amber-950 leading-relaxed whitespace-pre-line text-center">
              {activeChalisa.text}
            </p>
          </div>

          {/* Meaning & Benefits */}
          {(activeChalisa.meaning || activeChalisa.siddhiVidhi) && (
            <div className="bg-orange-50/80 p-3 rounded-2xl border border-orange-200 text-xs text-orange-950 space-y-1.5">
              <div className="flex items-center justify-between">
                <strong className="flex items-center gap-1 font-bold text-orange-900">
                  <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                  <span>{isHi ? 'चालीसा भावार्थ व सिद्ध फल:' : 'Significance & Benefits:'}</span>
                </strong>
                <button
                  type="button"
                  onClick={() => setShowFullMeaning(!showFullMeaning)}
                  className="text-[11px] text-orange-700 underline font-bold"
                >
                  {showFullMeaning ? (isHi ? 'कम देखें' : 'Less') : (isHi ? 'विस्तार से' : 'Details')}
                </button>
              </div>
              <p className={`text-gray-700 leading-relaxed ${showFullMeaning ? '' : 'line-clamp-2'}`}>
                {activeChalisa.meaning || activeChalisa.siddhiVidhi}
              </p>
            </div>
          )}

          {/* AdMob Native Card inside Chalisa viewer */}
          <div className="pt-1">
            <AdMobNativeCard variant="compact" slotName="Chalisa Paath Feed" />
          </div>
        </div>

        {/* BOTTOM ACTION */}
        <div className="p-3 bg-orange-50 border-t border-orange-200 flex items-center justify-between gap-2">
          <span className="text-xs text-gray-500 font-bold truncate">
            {activeChalisa.name}
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

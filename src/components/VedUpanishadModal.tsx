import React, { useState } from 'react';
import { MantraItem, LanguageCode } from '../types';
import { VED_UPANISHAD_GITA_MANTRAS } from '../data/vedUpanishadGitaData';
import { UPANISHAD_COMPLETE_MANTRAS } from '../data/upanishadCompleteData';
import { ttsEngine } from '../utils/ttsEngine';
import {
  X,
  Search,
  BookOpen,
  Volume2,
  VolumeX,
  Play,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface VedUpanishadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVedAndChant: (mantra: MantraItem) => void;
  language?: LanguageCode;
}

export const VedUpanishadModal: React.FC<VedUpanishadModalProps> = ({
  isOpen,
  onClose,
  onSelectVedAndChant,
  language = 'hi'
}) => {
  const isHi = language === 'hi';
  const [activeTab, setActiveTab] = useState<'ved' | 'upanishad'>('ved');
  const [selectedItemId, setSelectedItemId] = useState<string>('ved-rig-nasadiya');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Ved items from data
  const vedItems = React.useMemo(() => {
    return VED_UPANISHAD_GITA_MANTRAS.filter((m) => m.category === 'ved' || m.id.startsWith('ved-'));
  }, []);

  // Upanishad items from data
  const upanishadItems = React.useMemo(() => {
    const fromMain = VED_UPANISHAD_GITA_MANTRAS.filter(
      (m) => m.category === 'upanishad' || m.id.startsWith('upanishad-')
    );
    const fromComp = UPANISHAD_COMPLETE_MANTRAS.filter((m) => m.category === 'upanishad');
    return [...fromComp, ...fromMain];
  }, []);

  const currentList = activeTab === 'ved' ? vedItems : upanishadItems;

  const activeItem = React.useMemo(() => {
    return currentList.find((i) => i.id === selectedItemId) || currentList[0] || vedItems[0];
  }, [currentList, selectedItemId, vedItems]);

  React.useEffect(() => {
    if (currentList.length > 0) {
      setSelectedItemId(currentList[0].id);
    }
  }, [activeTab]);

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
      ttsEngine.speakMantra(activeItem.text, {
        lang: 'hi',
        rate: 0.88,
        onEnd: () => setIsPlayingAudio(false),
        onError: () => setIsPlayingAudio(false)
      });
    }
  };

  const handleStartJaap = () => {
    ttsEngine.stop();
    setIsPlayingAudio(false);
    onClose();
    onSelectVedAndChant(activeItem);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="bg-[#FFFDF9] border-2 border-orange-300 rounded-3xl max-w-xl w-full max-h-[94vh] flex flex-col shadow-2xl overflow-hidden select-none">
        {/* HEADER */}
        <div className="p-3 sm:p-4 bg-gradient-to-r from-orange-700 via-amber-600 to-orange-800 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <span className="text-2xl p-1.5 rounded-xl bg-white/20">🕉️</span>
            <div>
              <h2 className="text-sm sm:text-base font-black tracking-wide">
                {isHi ? 'वेद व उपनिषद महासागर' : 'Vedas & Upanishads'}
              </h2>
              <p className="text-[11px] text-amber-100">
                {isHi ? '४ वेद के ऋचाएं एवं प्रमुख उपनिषद' : 'Rig, Yajur, Sam, Atharva & Upanishads'}
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

        {/* 2 MAIN TABS: VED & UPANISHAD */}
        <div className="grid grid-cols-2 gap-1.5 p-2 bg-orange-100/80 border-b border-orange-200 text-xs font-bold">
          <button
            onClick={() => setActiveTab('ved')}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'ved'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-orange-950 hover:bg-white/60'
            }`}
          >
            <span>📜</span>
            <span>{isHi ? '४ पवित्र वेद (Vedas)' : '4 Holy Vedas'}</span>
          </button>
          <button
            onClick={() => setActiveTab('upanishad')}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'upanishad'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-orange-950 hover:bg-white/60'
            }`}
          >
            <span>🧘‍♂️</span>
            <span>{isHi ? 'मुख्य उपनिषद (Upanishads)' : 'Major Upanishads'}</span>
          </button>
        </div>

        {/* HORIZONTAL HYMNS SELECTOR */}
        <div className="p-2 bg-orange-50 border-b border-orange-200 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {currentList.map((item) => {
            const isSelected = item.id === selectedItemId;
            return (
              <button
                key={item.id}
                onClick={() => {
                  ttsEngine.stop();
                  setIsPlayingAudio(false);
                  setSelectedItemId(item.id);
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  isSelected
                    ? 'bg-orange-600 text-white shadow-xs ring-1 ring-orange-400'
                    : 'bg-white text-orange-950 border border-orange-200 hover:bg-orange-100'
                }`}
              >
                <span className="truncate max-w-[140px]">{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* VED / UPANISHAD CONTENT VIEWER */}
        <div className="p-3 sm:p-4 overflow-y-auto space-y-3 flex-1 scrollbar-thin">
          <div className="flex items-center justify-between gap-2 border-b border-orange-100 pb-2">
            <div>
              <span className="text-[10px] font-black uppercase text-orange-800 bg-orange-100 px-2 py-0.5 rounded-md">
                {activeItem.categoryLabel || (activeTab === 'ved' ? 'वेद सूक्त' : 'उपनिषद')}
              </span>
              <h3 className="text-sm sm:text-base font-black text-orange-950 mt-1">
                {activeItem.name}
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

          {/* Verses Scroll Box */}
          <div className="p-3.5 bg-amber-50/60 border border-orange-200 rounded-2xl max-h-[46vh] overflow-y-auto shadow-inner scrollbar-thin">
            <p className="text-sm sm:text-base font-bold font-sanskrit text-amber-950 leading-relaxed whitespace-pre-line text-center">
              {activeItem.text}
            </p>
          </div>

          {/* Meaning / Spiritual Commentary */}
          {(activeItem.meaning || activeItem.siddhiVidhi) && (
            <div className="bg-orange-50/80 p-3 rounded-2xl border border-orange-200 text-xs text-orange-950 space-y-1">
              <strong className="flex items-center gap-1 font-bold text-orange-900 mb-0.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                <span>{isHi ? 'सरल हिन्दी भावार्थ व ज्ञान:' : 'Hindi Meaning & Wisdom:'}</span>
              </strong>
              <p className="text-gray-700 leading-relaxed">
                {activeItem.meaning || activeItem.siddhiVidhi}
              </p>
            </div>
          )}
        </div>

        {/* BOTTOM ACTION */}
        <div className="p-3 bg-orange-50 border-t border-orange-200 flex items-center justify-between gap-2">
          <span className="text-xs text-gray-500 font-bold truncate">
            {activeItem.name}
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

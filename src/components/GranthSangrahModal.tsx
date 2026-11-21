import React, { useState } from 'react';
import { MantraItem, LanguageCode } from '../types';
import { GITA_COMPLETE_MANTRAS } from '../data/gitaCompleteData';
import { CHALISA_SUNDARKAND_MANTRAS } from '../data/chalisaSundarkandData';
import { VED_UPANISHAD_GITA_MANTRAS } from '../data/vedUpanishadGitaData';
import { ttsEngine } from '../utils/ttsEngine';
import { DivineDeityDarshanCard } from './DivineDeityDarshanCard';
import { AdMobNativeCard } from './AdMobNativeCard';
import {
  X,
  Search,
  BookOpen,
  Volume2,
  VolumeX,
  Play,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Bookmark
} from 'lucide-react';

interface GranthSangrahModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGranthAndChant: (mantra: MantraItem) => void;
  onOpenGrandScriptureReader?: (category?: string) => void;
  language?: LanguageCode;
}

export const GranthSangrahModal: React.FC<GranthSangrahModalProps> = ({
  isOpen,
  onClose,
  onSelectGranthAndChant,
  onOpenGrandScriptureReader,
  language = 'hi'
}) => {
  const isHi = language === 'hi';
  const [activeTab, setActiveTab] = useState<'gita' | 'sundarkand' | 'ramayan' | 'stotram'>('gita');
  const [selectedItemId, setSelectedItemId] = useState<string>('gita-ch-1');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sunderkand and Ramayan items
  const sundarkandItems = React.useMemo(() => {
    return CHALISA_SUNDARKAND_MANTRAS.filter((m) => m.id.startsWith('sundarkand'));
  }, []);

  const stotramItems = React.useMemo(() => {
    return CHALISA_SUNDARKAND_MANTRAS.filter((m) => m.id.startsWith('stotra'));
  }, []);

  const ramayanVishnuItems = React.useMemo(() => {
    return VED_UPANISHAD_GITA_MANTRAS.filter(
      (m) => m.category === 'ramayan' || m.id === 'mahabharat-vishnu-sahasranam'
    );
  }, []);

  // Determine current list based on active tab
  const currentCategoryList: MantraItem[] = React.useMemo(() => {
    if (activeTab === 'gita') return GITA_COMPLETE_MANTRAS;
    if (activeTab === 'sundarkand') return sundarkandItems;
    if (activeTab === 'ramayan') return ramayanVishnuItems;
    return stotramItems;
  }, [activeTab, sundarkandItems, ramayanVishnuItems, stotramItems]);

  const activeItem: MantraItem = React.useMemo(() => {
    return (
      currentCategoryList.find((item: MantraItem) => item.id === selectedItemId) ||
      currentCategoryList[0] ||
      GITA_COMPLETE_MANTRAS[0]
    );
  }, [currentCategoryList, selectedItemId]);

  React.useEffect(() => {
    if (currentCategoryList.length > 0) {
      setSelectedItemId(currentCategoryList[0].id);
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
        rate: 0.9,
        onEnd: () => setIsPlayingAudio(false),
        onError: () => setIsPlayingAudio(false)
      });
    }
  };

  const handleStartJaap = () => {
    ttsEngine.stop();
    setIsPlayingAudio(false);
    onClose();
    onSelectGranthAndChant(activeItem);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="bg-[#FFFDF9] border-2 border-orange-300 rounded-3xl max-w-xl w-full max-h-[94vh] flex flex-col shadow-2xl overflow-hidden select-none">
        {/* HEADER */}
        <div className="p-3 sm:p-4 bg-gradient-to-r from-orange-700 via-amber-600 to-orange-800 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <span className="text-2xl p-1.5 rounded-xl bg-white/20">📜</span>
            <div>
              <h2 className="text-sm sm:text-base font-black tracking-wide">
                {isHi ? 'सनातन पवित्र ग्रन्थ व शास्त्र' : 'Sacred Sanatan Scriptures'}
              </h2>
              <p className="text-[11px] text-amber-100">
                {isHi ? 'श्रीमद्भगवद्गीता, सुंदरकांड, रामचरितमानस व स्तोत्र' : 'Gita, Sundarkand & Stotras'}
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

        {/* PRO CANON SCRIPTURE READER SHORTCUT */}
        {onOpenGrandScriptureReader && (
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenGrandScriptureReader();
            }}
            className="mx-2.5 mt-2.5 p-2.5 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white font-black text-xs flex items-center justify-between shadow-md active:scale-98 transition-all border border-amber-300/60"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">📖</span>
              <div className="text-left">
                <div className="text-xs sm:text-sm font-black text-amber-100 flex items-center gap-1.5">
                  <span>{isHi ? 'सम्पूर्ण ११ सनातन शास्त्र व वेद वाचन' : 'Complete 11 Scripture Canon Reader'}</span>
                  <span className="bg-amber-400 text-slate-950 text-[9.5px] px-1.5 py-0.2 rounded-md font-black">PRO</span>
                </div>
                <div className="text-[10px] text-amber-200/90 font-normal">
                  {isHi ? 'चार वेद • उपवेद • वेदांग • उपनिषद • महापुराण • दर्शन • नीतियां' : 'All 4 Vedas, Upanishads, 18 Puranas & Darshanas'}
                </div>
              </div>
            </div>
            <span className="text-[11px] bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-xl shrink-0 font-bold">
              {isHi ? 'वाचन करें ➔' : 'Read ➔'}
            </span>
          </button>
        )}

        {/* 4 GRANTH MAIN TABS */}
        <div className="grid grid-cols-4 gap-1 p-2 bg-orange-100/80 border-b border-orange-200 text-xs font-bold">
          <button
            onClick={() => setActiveTab('gita')}
            className={`py-1.5 rounded-xl transition-all text-center ${
              activeTab === 'gita'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-orange-950 hover:bg-white/60'
            }`}
          >
            {isHi ? 'भगवद्गीता' : 'Gita'}
          </button>
          <button
            onClick={() => setActiveTab('sundarkand')}
            className={`py-1.5 rounded-xl transition-all text-center ${
              activeTab === 'sundarkand'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-orange-950 hover:bg-white/60'
            }`}
          >
            {isHi ? 'सुंदरकांड' : 'Sundarkand'}
          </button>
          <button
            onClick={() => setActiveTab('ramayan')}
            className={`py-1.5 rounded-xl transition-all text-center ${
              activeTab === 'ramayan'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-orange-950 hover:bg-white/60'
            }`}
          >
            {isHi ? 'रामायण/विष्णु' : 'Ramayan'}
          </button>
          <button
            onClick={() => setActiveTab('stotram')}
            className={`py-1.5 rounded-xl transition-all text-center ${
              activeTab === 'stotram'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-orange-950 hover:bg-white/60'
            }`}
          >
            {isHi ? 'स्तोत्र' : 'Stotras'}
          </button>
        </div>

        {/* HORIZONTAL CHAPTER / SECTION SELECTOR */}
        <div className="p-2 bg-orange-50 border-b border-orange-200 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {currentCategoryList.map((item) => {
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
                <span className="truncate max-w-[130px]">{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* SCRIPTURE CONTENT DISPLAY */}
        <div className="p-3 sm:p-4 overflow-y-auto space-y-3 flex-1 scrollbar-thin">
          
          {/* Divine Deity Darshan Murti Banner */}
          <DivineDeityDarshanCard
            deityType={activeItem.deity || activeItem.id}
            title={activeItem.name}
            subtitle={activeItem.categoryLabel || 'सनातन पावन ग्रन्थ'}
            size="banner"
          />

          <div className="flex items-center justify-between gap-2 border-b border-orange-100 pb-2">
            <div>
              <span className="text-[10px] font-black uppercase text-orange-800 bg-orange-100 px-2 py-0.5 rounded-md">
                {activeItem.categoryLabel || 'पवित्र ग्रन्थ'}
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

          {/* Meaning / Siddhi Vidhi */}
          {(activeItem.meaning || activeItem.siddhiVidhi) && (
            <div className="bg-orange-50/80 p-3 rounded-2xl border border-orange-200 text-xs text-orange-950 space-y-1">
              <strong className="flex items-center gap-1 font-bold text-orange-900 mb-0.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                <span>{isHi ? 'भावार्थ व आध्यात्मिक महत्व:' : 'Significance & Translation:'}</span>
              </strong>
              <p className="text-gray-700 leading-relaxed">
                {activeItem.meaning || activeItem.siddhiVidhi}
              </p>
            </div>
          )}

          {/* Integrated Compact Native Ad for monetization */}
          <div className="pt-1">
            <AdMobNativeCard variant="compact" slotName="Granth Library Feed" />
          </div>
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
            <span>
              {isHi
                ? activeTab === 'stotram'
                  ? 'नित्य स्तोत्र पाठ करें 📖'
                  : activeTab === 'sundarkand'
                  ? 'सुंदरकांड पाठ करें 📖'
                  : activeTab === 'gita'
                  ? 'गीता स्वाध्याय करें 📖'
                  : 'साधना काउंटर पर जपें 📿'
                : 'Recite Paath 📖'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

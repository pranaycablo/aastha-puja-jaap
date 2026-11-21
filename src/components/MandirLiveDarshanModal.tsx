import React, { useState, useMemo } from 'react';
import { MandirDarshanItem, MANDIR_LIVE_DARSHAN_LIST } from '../data/mandirLiveDarshanData';
import { MantraItem, LanguageCode } from '../types';
import { AdMobNativeCard } from './AdMobNativeCard';
import {
  MapPin,
  Clock,
  Sparkles,
  ExternalLink,
  Search,
  Play,
  X,
  Tv,
  Heart,
  Share2
} from 'lucide-react';

interface MandirLiveDarshanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMantraAndChant: (mantra: MantraItem) => void;
  language?: LanguageCode;
}

export const MandirLiveDarshanModal: React.FC<MandirLiveDarshanModalProps> = ({
  isOpen,
  onClose,
  onSelectMantraAndChant,
  language = 'hi'
}) => {
  const isHi = language === 'hi';
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'char_dham' | 'jyotirlinga' | 'shaktipeeth' | 'maha_mandir'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLiveTemple, setSelectedLiveTemple] = useState<MandirDarshanItem | null>(null);

  const filteredTemples = useMemo(() => {
    let list = MANDIR_LIVE_DARSHAN_LIST;
    if (selectedFilter !== 'all') {
      list = list.filter((t) => t.category === selectedFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.nameEn.toLowerCase().includes(q) ||
          t.deity.toLowerCase().includes(q) ||
          t.location.toLowerCase().includes(q) ||
          t.state.toLowerCase().includes(q)
      );
    }
    return list;
  }, [selectedFilter, searchQuery]);

  const handleOpenLiveStream = (temple: MandirDarshanItem) => {
    window.open(temple.liveStreamUrl, '_blank', 'noopener,noreferrer');
  };

  const handleStartChanting = (temple: MandirDarshanItem) => {
    const customMantra: MantraItem = {
      id: `mandir-${temple.id}`,
      name: `${temple.name} - ${temple.deityMantraName}`,
      text: temple.deityMantra,
      deity: 'tridev',
      deityLabel: temple.deity,
      category: 'naam_jaap',
      categoryLabel: temple.name,
      meaning: `${temple.name} (${temple.location}, ${temple.state}) के अधिष्ठाता ${temple.deity} का पावन जप।`,
      benefits: temple.significance,
      siddhiVidhi: `प्रतिदिन ${temple.name} का ध्यान कर पूर्व मुख होकर कम से कम १ या ३ माला जप करें।`,
      samagri: 'रुद्राक्ष या तुलसी माला, शुद्ध गाय के घी का दीपक।',
      bestTiming: temple.aartiTimings
    };

    onSelectMantraAndChant(customMantra);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-gradient-to-b from-[#1C0603] via-[#2A0B06] to-[#140202] text-amber-50 rounded-3xl border-2 border-amber-500/80 shadow-[0_10px_50px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-950 via-red-950 to-amber-950 border-b border-amber-600/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 p-0.5 shadow-lg flex items-center justify-center text-2xl">
              🛕
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-amber-200 tracking-wide drop-shadow-md">
                  {isHi ? 'चार धाम व दिव्य मंदिर लाइव दर्शन' : 'Char Dham & Divine Live Darshan'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase animate-pulse flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  <span>LIVE</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-300/80">
                {isHi
                  ? 'चार धाम, द्वादश ज्योतिर्लिंग व महातीर्थों के 24x7 पावन दर्शन व आरती'
                  : 'Watch 24x7 Live Darshan & Daily Aarti from Sacred Shrines'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
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
                  ? 'मंदिर, धाम या देवता खोजें (उदा. केदारनाथ, बद्रीनाथ, काशी, अयोध्या, महाकाल)...'
                  : 'Search temple or dham (e.g. Kedarnath, Badrinath, Kashi, Ayodhya)...'
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

        {/* Filter Tabs */}
        <div className="px-3 py-2 bg-black/30 border-b border-amber-900/40 overflow-x-auto flex gap-2 shrink-0 scrollbar-thin">
          {[
            { id: 'all', label: isHi ? 'सभी पावन धाम' : 'All Shrines', icon: '🚩' },
            { id: 'char_dham', label: isHi ? 'चार धाम (Char Dham)' : 'Char Dham', icon: '🏔️' },
            { id: 'jyotirlinga', label: isHi ? 'द्वादश ज्योतिर्लिंग' : 'Jyotirlingas', icon: '🔱' },
            { id: 'shaktipeeth', label: isHi ? 'शक्तिपीठ व तीर्थ' : 'Shaktipeeths', icon: '🌸' },
            { id: 'maha_mandir', label: isHi ? 'प्रमुख महामंदिर' : 'Major Temples', icon: '🛕' }
          ].map((tab) => {
            const isSelected = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-stone-950 shadow-md ring-2 ring-amber-300'
                    : 'bg-stone-900/80 hover:bg-stone-800 text-amber-200/80 border border-amber-800/40'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Temple Cards List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemples.map((temple) => (
              <div
                key={temple.id}
                className="rounded-2xl bg-gradient-to-b from-[#2A0C07] to-[#1A0403] border-1.5 border-amber-500/40 hover:border-amber-400 shadow-xl overflow-hidden flex flex-col justify-between transition-all group"
              >
                {/* Temple Banner Image with Overlay */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-black/60">
                  <img
                    src={temple.imageUrl}
                    alt={temple.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A0C07] via-black/40 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-[11px] font-bold border border-amber-400/50 shadow-md">
                      {temple.categoryLabel}
                    </span>
                  </div>

                  {/* Live Stream Pulse Badge */}
                  <div className="absolute top-2.5 right-2.5">
                    <span className="px-2.5 py-1 rounded-full bg-red-600/90 text-white text-[10px] font-black uppercase flex items-center gap-1 shadow-lg ring-1 ring-white/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                      <span>24x7 Live</span>
                    </span>
                  </div>

                  {/* Title & Location on Image Bottom */}
                  <div className="absolute bottom-2.5 left-3 right-3">
                    <h3 className="text-lg sm:text-xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      {temple.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold drop-shadow-sm">
                      <span className="flex items-center gap-0.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>{temple.location}, {temple.state}</span>
                      </span>
                      <span>•</span>
                      <span>{temple.deity}</span>
                    </div>
                  </div>
                </div>

                {/* Content & Description */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
                  <p className="text-xs text-stone-300 leading-relaxed line-clamp-2">
                    {temple.description}
                  </p>

                  {/* Aarti Timing Box */}
                  <div className="p-2.5 rounded-xl bg-black/40 border border-amber-800/40 text-[11px] text-amber-200 flex items-start gap-2">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-300">आरती व दर्शन समय: </strong>
                      <span>{temple.aartiTimings}</span>
                    </div>
                  </div>

                  {/* Deity Mantra Box */}
                  <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-600/30 text-[11px]">
                    <div className="text-amber-400 font-bold mb-0.5 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                      <span>{temple.deityMantraName}:</span>
                    </div>
                    <p className="font-serif text-amber-100 text-xs truncate">
                      {temple.deityMantra}
                    </p>
                  </div>

                  {/* 3 Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {/* BUTTON 1: लाइव दर्शन देखें */}
                    <button
                      onClick={() => handleOpenLiveStream(temple)}
                      className="py-2 px-3 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:brightness-110 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                    >
                      <Tv className="w-3.5 h-3.5" />
                      <span>🔴 लाइव दर्शन देखें</span>
                    </button>

                    {/* BUTTON 2: धाम का पावन मंत्र जपें */}
                    <button
                      onClick={() => handleStartChanting(temple)}
                      className="py-2 px-3 rounded-xl bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 hover:brightness-110 text-stone-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all ring-1 ring-yellow-200"
                    >
                      <Play className="w-3.5 h-3.5 fill-stone-950" />
                      <span>📿 मंत्र जपें</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Native Ad Banner */}
          <div className="pt-2">
            <AdMobNativeCard language={language} variant="banner" slotName="Mandir Live Darshan" />
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useMemo, useEffect } from 'react';
import { MantraItem, DeityType, MantraCategory, LanguageCode } from '../types';
import {
  PRELOADED_MANTRAS,
  DEITY_CONFIG,
  DEITY_CONFIG_EN,
  CATEGORY_INFO,
  CATEGORY_INFO_EN
} from '../data/mantraDatabase';
import {
  SCRIPTURAL_MASTER_CATEGORIES,
  ScripturalMasterCategory
} from '../data/scripturalCategoriesData';
import { getTranslations } from '../utils/i18n';
import { ttsEngine } from '../utils/ttsEngine';
import { AdMobNativeCard } from './AdMobNativeCard';
import {
  BookOpen,
  PlusCircle,
  Volume2,
  Search,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Play,
  X,
  Compass,
  Clock,
  Flame,
  Trash2
} from 'lucide-react';

interface MantraSelectionPageProps {
  currentMantra: MantraItem;
  selectedMantras?: MantraItem[];
  onSelectMantra: (mantra: MantraItem) => void;
  onRemoveMantra?: (mantraId: string) => void;
  onToggleSelectMantra?: (mantra: MantraItem) => void;
  onProceedToSetup: () => void;
  onProceedToGuide?: () => void;
  onProceedToJaap?: () => void;
  onOpenMahakosh?: () => void;
  userIshtDevta?: DeityType;
  language?: LanguageCode;
}

type MasterCategoryKey =
  | 'all'
  | 'nitya_prarthana'
  | 'chalisa'
  | 'aarti'
  | 'naam_jaap'
  | 'siddhi_mantra'
  | 'tantrik_mantra'
  | 'ved'
  | 'granth'
  | 'ramayan'
  | 'gita'
  | 'nath_mantra';

export const MantraSelectionPage: React.FC<MantraSelectionPageProps> = ({
  currentMantra,
  selectedMantras = [],
  onSelectMantra,
  onRemoveMantra,
  onToggleSelectMantra,
  onProceedToSetup,
  onProceedToGuide,
  onProceedToJaap,
  onOpenMahakosh,
  userIshtDevta = 'hanuman',
  language = 'hi'
}) => {
  const t = getTranslations(language);
  const isHi = language === 'hi';
  const deityConfig = isHi ? DEITY_CONFIG : DEITY_CONFIG_EN;
  const categoryInfo = isHi ? CATEGORY_INFO : CATEGORY_INFO_EN;

  const [activeTab, setActiveTab] = useState<'library' | 'custom'>('library');
  const [selectedDeity, setSelectedDeity] = useState<DeityType | 'all'>('all');
  const [masterCategory, setMasterCategory] = useState<MasterCategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewingId, setPreviewingId] = useState<string | null>(null);
  const [expandedMantraId, setExpandedMantraId] = useState<string | null>(null);

  // Stop TTS speech on unmount
  useEffect(() => {
    return () => {
      ttsEngine.stop();
    };
  }, []);

  // Persistent Custom Mantras (Loaded from localStorage)
  const [customMantras, setCustomMantras] = useState<MantraItem[]>(() => {
    try {
      const saved = localStorage.getItem('divya_jaap_custom_mantras');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not load custom mantras:', e);
    }
    return [];
  });

  // All combined mantras (Custom mantras first, then preloaded database - strictly deduplicated by id & name)
  const allMantras = useMemo(() => {
    const seenIds = new Set<string>();
    const seenNames = new Set<string>();
    const result: MantraItem[] = [];

    const addUnique = (item: MantraItem) => {
      // Normalize name to detect identical or near-identical duplicate entries
      const normalizedName = (item.name || '').replace(/[\s()॥।•\-—–]/g, '').toLowerCase();
      if (!seenIds.has(item.id) && (!normalizedName || !seenNames.has(normalizedName))) {
        seenIds.add(item.id);
        if (normalizedName) seenNames.add(normalizedName);
        result.push(item);
      }
    };

    customMantras.forEach(addUnique);
    PRELOADED_MANTRAS.forEach(addUnique);
    return result;
  }, [customMantras]);

  // Custom Mantra Form
  const [customName, setCustomName] = useState('');
  const [customText, setCustomText] = useState('');
  const [customCategory, setCustomCategory] = useState<MantraCategory>('custom');
  const [customSiddhiVidhi, setCustomSiddhiVidhi] = useState('');
  const [customSamagri, setCustomSamagri] = useState('');
  const [customSthan, setCustomSthan] = useState('');
  const [customMudra, setCustomMudra] = useState('');
  const [customBestTiming, setCustomBestTiming] = useState('');

  // Pre-calculate count of mantras per deity for badges
  const deityCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allMantras.forEach((m) => {
      counts[m.deity] = (counts[m.deity] || 0) + 1;
    });
    return counts;
  }, [allMantras]);

  // Pre-calculate count per Master Category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allMantras.forEach((m) => {
      let key: MasterCategoryKey = 'all';
      if (m.category === 'nitya_prarthana') key = 'nitya_prarthana';
      else if (m.category === 'chalisa') key = 'chalisa';
      else if (m.category === 'aarti') key = 'aarti';
      else if (m.category === 'naam_jaap' || m.category === 'sadhu') key = 'naam_jaap';
      else if (m.category === 'siddhi_mantra' || m.category === 'dhan_siddhi' || m.category === 'manokamna') key = 'siddhi_mantra';
      else if (m.category === 'tantrik_mantra' || m.category === 'tantrik' || m.category === 'dehati_shabar' || m.category === 'aghori') key = 'tantrik_mantra';
      else if (m.category === 'ved' || m.category === 'ved_sukta' || m.category === 'upanishad') key = 'ved';
      else if (m.category === 'granth' || m.category === 'stotram') key = 'granth';
      else if (m.category === 'ramayan' || m.category === 'sundarkand') key = 'ramayan';
      else if (m.category === 'gita' || m.category === 'gita_ramayan') key = 'gita';
      else if (m.category === 'nath_mantra' || m.category === 'nath') key = 'nath_mantra';

      counts[key] = (counts[key] || 0) + 1;
    });
    return counts;
  }, [allMantras]);

  // Filtered mantras logic combining Search, Master Category, and Deity
  const filteredMantras = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return allMantras.filter((m) => {
      // 1. Text Search across everything
      if (q !== '') {
        return (
          (m.name && m.name.toLowerCase().includes(q)) ||
          (m.text && m.text.toLowerCase().includes(q)) ||
          (m.categoryLabel && m.categoryLabel.toLowerCase().includes(q)) ||
          (m.meaning && m.meaning.toLowerCase().includes(q)) ||
          (m.deityLabel && m.deityLabel.toLowerCase().includes(q)) ||
          (m.sthan && m.sthan.toLowerCase().includes(q)) ||
          (m.mudra && m.mudra.toLowerCase().includes(q))
        );
      }

      // 2. Master Category Filter (Inclusive of relevant subcategories)
      let matchCategory = true;
      if (masterCategory === 'nitya_prarthana') {
        matchCategory = m.category === 'nitya_prarthana';
      } else if (masterCategory === 'chalisa') {
        matchCategory = m.category === 'chalisa';
      } else if (masterCategory === 'aarti') {
        matchCategory = m.category === 'aarti';
      } else if (masterCategory === 'naam_jaap') {
        matchCategory = m.category === 'naam_jaap' || m.category === 'sadhu';
      } else if (masterCategory === 'siddhi_mantra') {
        matchCategory =
          m.category === 'siddhi_mantra' ||
          m.category === 'dhan_siddhi' ||
          m.category === 'manokamna';
      } else if (masterCategory === 'tantrik_mantra') {
        matchCategory =
          m.category === 'tantrik_mantra' ||
          m.category === 'tantrik' ||
          m.category === 'dehati_shabar' ||
          m.category === 'aghori';
      } else if (masterCategory === 'ved') {
        matchCategory =
          m.category === 'ved' ||
          m.category === 'ved_sukta' ||
          m.category === 'upanishad';
      } else if (masterCategory === 'granth') {
        matchCategory = m.category === 'granth' || m.category === 'stotram';
      } else if (masterCategory === 'ramayan') {
        matchCategory = m.category === 'ramayan' || m.category === 'sundarkand';
      } else if (masterCategory === 'gita') {
        matchCategory = m.category === 'gita' || m.category === 'gita_ramayan';
      } else if (masterCategory === 'nath_mantra') {
        matchCategory = m.category === 'nath_mantra' || m.category === 'nath';
      }

      // 3. Deity Filter
      const matchDeity = selectedDeity === 'all' || m.deity === selectedDeity;

      return matchCategory && matchDeity;
    });
  }, [searchQuery, masterCategory, selectedDeity]);

  const handleSelectDeity = (deity: DeityType | 'all') => {
    setSelectedDeity(deity);
  };

  const handleMasterCategoryClick = (cat: MasterCategoryKey) => {
    setMasterCategory(cat);
  };

  const handleStartJaap = (mantra: MantraItem) => {
    onSelectMantra(mantra);
    if (onProceedToJaap) {
      onProceedToJaap();
    } else {
      onProceedToSetup();
    }
  };

  const handleViewGuide = (mantra: MantraItem) => {
    onSelectMantra(mantra);
    if (onProceedToGuide) {
      onProceedToGuide();
    } else {
      onProceedToSetup();
    }
  };

  const handleTestVoice = (id: string, text: string) => {
    if (previewingId === id) {
      ttsEngine.stop();
      setPreviewingId(null);
    } else {
      setPreviewingId(id);
      const targetMantra = allMantras.find((m) => m.id === id);
      ttsEngine.speakMantra(text, {
        lang: language,
        isCustom: targetMantra?.isCustom,
        withDevotionalMusic: true,
        devotionalMusicMode:
          targetMantra?.category === 'chalisa'
            ? 'chalisa_dhun'
            : targetMantra?.category === 'aarti'
            ? 'aarti_music'
            : 'mantra_tanpura',
        onEnd: () => setPreviewingId(null),
        onError: () => setPreviewingId(null)
      });
    }
  };

  const handleSaveCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim()) return;

    const defaultTitle = isHi ? 'मेरा सिद्ध मंत्र' : 'My Siddhi Mantra';
    const defaultDev = isHi ? 'व्यक्तिगत साधना' : 'Personal Sadhana';
    const defaultVidhi = isHi
      ? 'अपनी निष्ठा अनुसार नित्य १ या ११ माला जप करें।'
      : 'Chant 1 or 11 malas daily with steadfast faith and devotion.';
    const defaultSam = isHi
      ? 'रुद्राक्ष या तुलसी माला, शुद्ध गाय के घी का दीपक।'
      : 'Rudraksha or Tulsi mala, pure ghee lamp and incense.';

    const newMantra: MantraItem = {
      id: 'custom-' + Date.now(),
      name: customName.trim() || defaultTitle,
      text: customText.trim(),
      deity: 'custom',
      deityLabel: defaultDev,
      category: customCategory,
      categoryLabel: categoryInfo[customCategory]?.label || (isHi ? 'कस्टम मंत्र' : 'Custom Mantra'),
      siddhiVidhi: customSiddhiVidhi.trim() || defaultVidhi,
      samagri: customSamagri.trim() || defaultSam,
      sthan: customSthan.trim() || (isHi ? 'घर का शांत पूजा स्थल' : 'Home Sanctum'),
      mudra: customMudra.trim() || (isHi ? 'ज्ञान मुद्रा अथवा पद्मासन' : 'Gyan Mudra'),
      bestTiming: customBestTiming.trim() || (isHi ? 'प्रातः ब्रह्म मुहूर्त' : 'Dawn Brahma Muhurta'),
      isCustom: true
    };

    const updatedCustom = [newMantra, ...customMantras];
    setCustomMantras(updatedCustom);
    try {
      localStorage.setItem('divya_jaap_custom_mantras', JSON.stringify(updatedCustom));
    } catch (e) {
      console.warn('Could not save custom mantras:', e);
    }

    // Reset inputs
    setCustomName('');
    setCustomText('');
    setCustomSiddhiVidhi('');
    setCustomSamagri('');

    onSelectMantra(newMantra);
    setActiveTab('library');
  };

  const handleDeleteCustom = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customMantras.filter((m) => m.id !== id);
    setCustomMantras(updated);
    try {
      localStorage.setItem('divya_jaap_custom_mantras', JSON.stringify(updated));
    } catch (e) {}
  };

  const currentDeityConfig = selectedDeity !== 'all' ? deityConfig[selectedDeity] : null;

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col select-none pb-20 animate-fadeIn px-2 sm:px-0">
      {/* 1. TOP SEARCH BAR */}
      <div className="relative mb-2.5">
        <Search className="w-5 h-5 text-orange-600 absolute left-3.5 top-3.5" />
        <input
          type="text"
          placeholder={
            isHi
              ? 'मंत्र या चालीसा खोजें...'
              : 'Search mantras or chalisas...'
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-10 py-2.5 text-xs sm:text-sm font-bold rounded-2xl border border-amber-300 bg-[#FFFDF9]/95 text-amber-950 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-2xs placeholder:text-amber-900/40"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-3 w-5 h-5 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs hover:bg-gray-300 transition-all font-bold"
            title="सर्च हटाएं"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Tabs: Classical Sanctuary vs Custom Form */}
      <div className="flex bg-orange-100/70 p-1 rounded-2xl border border-orange-200 mb-2.5 text-xs font-bold">
        <button
          onClick={() => setActiveTab('library')}
          className={`flex-1 py-1.5 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'library'
              ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-sm'
              : 'text-orange-950 hover:bg-white/50'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{isHi ? 'सनातन मंत्र' : 'Mantra Library'}</span>
        </button>

        <button
          onClick={() => setActiveTab('custom')}
          className={`flex-1 py-1.5 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'custom'
              ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-sm'
              : 'text-orange-950 hover:bg-white/50'
          }`}
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>{isHi ? '+ अपना मंत्र' : '+ Custom'}</span>
        </button>
      </div>

      {/* 1.5 PRO MANTRA MAHAKOSH DIRECT ACCESS BUTTON */}
      {onOpenMahakosh && (
        <button
          type="button"
          onClick={onOpenMahakosh}
          className="w-full bg-gradient-to-r from-[#4E0905] via-[#85160A] to-[#4E0905] text-white p-3 rounded-2xl border-2 border-yellow-400/90 shadow-md flex items-center justify-between mb-2.5 active:scale-98 transition-all hover:brightness-105"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-yellow-400 text-stone-950 flex items-center justify-center text-lg font-black shadow-xs">
              📿
            </span>
            <div className="text-left">
              <div className="text-xs font-black text-yellow-300 flex items-center gap-1">
                <span>सम्पूर्ण मंत्र महाकोश (९ श्रेणियां)</span>
                <span className="px-1.5 py-0.2 rounded bg-red-600 text-white text-[9px]">विस्तृत</span>
              </div>
              <p className="text-[11px] text-amber-100 font-medium line-clamp-1">
                पूजा विधि, सिद्धि विधान, समय व गलत प्रयोग चेतावनी सहित
              </p>
            </div>
          </div>
          <span className="text-xs font-black bg-yellow-400 text-stone-950 px-2.5 py-1 rounded-lg">
            खोलें ➔
          </span>
        </button>
      )}

      {/* 2. SELECTED MANTRAS PLAYLIST & MANAGEMENT (Supports Multiple Mantras & Removing) */}
      <div className="bg-gradient-to-r from-amber-100/95 via-orange-50 to-amber-100/95 border-2 border-orange-300 rounded-3xl p-3 mb-3 shadow-xs space-y-2">
        <div className="flex items-center justify-between border-b border-orange-200/80 pb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-sm">📿</span>
            <span className="text-xs font-black text-orange-950">
              {isHi ? 'साधना हेतु चयनित मंत्र सूची' : 'Selected Mantras for Jaap'}
            </span>
            <span className="text-[10px] font-black bg-orange-600 text-white px-2 py-0.2 rounded-full">
              {(selectedMantras && selectedMantras.length > 0 ? selectedMantras.length : 1)} मंत्र
            </span>
          </div>

          <button
            onClick={() => handleStartJaap(currentMantra)}
            className="px-3 py-1 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-black text-xs rounded-xl shadow-xs hover:brightness-105 active:scale-95 transition-all flex items-center gap-1"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>{isHi ? 'जाप शुरू करें 🔱' : 'Start Jaap 🔱'}</span>
          </button>
        </div>

        {/* Selected Mantras Chips with explicit Remove Button (✕) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {(selectedMantras && selectedMantras.length > 0 ? selectedMantras : [currentMantra]).map((m, idx) => {
            const isActive = currentMantra.id === m.id;
            return (
              <div
                key={m.id || idx}
                onClick={() => onSelectMantra(m)}
                className={`px-2.5 py-1.5 rounded-2xl border text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-500 ring-2 ring-amber-300'
                    : 'bg-white border-orange-200 text-orange-950 hover:bg-orange-50'
                }`}
              >
                <span>{deityConfig[m.deity]?.icon || '🔱'}</span>
                <span className="truncate max-w-[130px] font-black">{m.name}</span>
                {isActive && (
                  <span className="text-[9px] bg-white text-orange-900 px-1 rounded-sm font-black uppercase">
                    {isHi ? 'सक्रिय' : 'Active'}
                  </span>
                )}
                {onRemoveMantra && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveMantra(m.id);
                    }}
                    className={`ml-0.5 p-0.5 rounded-full hover:bg-black/20 transition-all ${
                      isActive ? 'text-white' : 'text-gray-400 hover:text-red-600'
                    }`}
                    title={isHi ? 'सूची से हटाएं' : 'Remove from playlist'}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* TAB 1: CLASSICAL SANCTUARY */}
      {activeTab === 'library' ? (
        <div className="space-y-3">
          {/* SEARCH ACTIVE BANNER */}
          {searchQuery ? (
            <div className="bg-amber-100/80 border border-amber-300 rounded-2xl p-2.5 flex items-center justify-between text-xs font-bold text-orange-950">
              <span className="flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-orange-600" />
                <span>
                  {isHi
                    ? `खोज परिणाम: "${searchQuery}" (${filteredMantras.length} मंत्र मिले)`
                    : `Search: "${searchQuery}" (${filteredMantras.length} found)`}
                </span>
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-[11px] text-orange-700 underline font-bold"
              >
                {isHi ? 'सभी देखें' : 'Reset'}
              </button>
            </div>
          ) : (
            <>
              {/* CATEGORIES SELECTOR */}
              <div className="bg-gradient-to-b from-amber-50 to-orange-50/70 border border-amber-300 rounded-2xl p-2.5 shadow-2xs">
                <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-amber-200">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">📿</span>
                    <h3 className="text-xs font-black text-orange-950">
                      {isHi ? 'श्रेणी' : 'Categories'}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleMasterCategoryClick('all')}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-lg transition-all ${
                      masterCategory === 'all'
                        ? 'bg-orange-600 text-white shadow-2xs'
                        : 'bg-white text-orange-950 border border-orange-200 hover:bg-orange-100'
                    }`}
                  >
                    {isHi ? 'समस्त' : 'All'}
                  </button>
                </div>

                {/* 9 CATEGORY BUTTONS GRID */}
                <div className="grid grid-cols-3 gap-1.5">
                  {SCRIPTURAL_MASTER_CATEGORIES.map((cat) => {
                    const isSelected = masterCategory === cat.id;
                    const count = categoryCounts[cat.id] || 0;

                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleMasterCategoryClick(cat.id as MasterCategoryKey)}
                        className={`p-1.5 rounded-xl border transition-all text-left flex items-center justify-between gap-1 ${
                          isSelected
                            ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-500 shadow-xs ring-1 ring-orange-300'
                            : 'bg-white hover:bg-orange-50/80 border-orange-200 text-orange-950'
                        }`}
                      >
                        <div className="flex items-center gap-1 min-w-0">
                          <span className="text-sm shrink-0">{cat.icon}</span>
                          <h4 className="text-[11px] font-bold truncate">
                            {isHi ? cat.nameHi : cat.nameEn}
                          </h4>
                        </div>
                        <span
                          className={`text-[9px] font-black px-1 rounded-full shrink-0 ${
                            isSelected
                              ? 'bg-white/30 text-white'
                              : 'bg-orange-100 text-orange-900'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* DEITY FILTER SELECTOR */}
              <div className="bg-white border border-orange-200 rounded-2xl p-2 shadow-2xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-orange-950 flex items-center gap-1">
                    <span>🔱</span>
                    <span>{isHi ? 'देवता' : 'Deity'}</span>
                  </span>
                  <button
                    onClick={() => handleSelectDeity('all')}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-lg transition-all ${
                      selectedDeity === 'all'
                        ? 'bg-orange-600 text-white'
                        : 'text-orange-700 hover:bg-orange-100'
                    }`}
                  >
                    {isHi ? 'समस्त' : 'All'}
                  </button>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-xs scrollbar-none">
                  {(Object.keys(deityConfig) as DeityType[])
                    .filter((d) => d !== 'custom')
                    .map((d) => {
                      const cfg = deityConfig[d];
                      if (!cfg) return null;
                      const isSelected = selectedDeity === d;
                      const count = deityCounts[d] || 0;
                      return (
                        <button
                          key={d}
                          onClick={() => handleSelectDeity(d)}
                          className={`px-2.5 py-1 rounded-xl font-bold shrink-0 transition-all flex items-center gap-1 ${
                            isSelected
                              ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xs ring-1 ring-orange-400'
                              : 'bg-orange-50 text-orange-950 border border-orange-200 hover:bg-orange-100'
                          }`}
                        >
                          <span className="text-sm">{cfg.icon || '🔱'}</span>
                          <span className="truncate max-w-[90px]">
                            {cfg.label ? cfg.label.split('(')[0] : d}
                          </span>
                          <span
                            className={`text-[9px] px-1 py-0.2 rounded-full font-black ${
                              isSelected ? 'bg-white/30 text-white' : 'bg-orange-200/80 text-orange-950'
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                </div>
              </div>
            </>
          )}

          {/* ============================================================== */}
          {/* MANTRAS LIST (WITH DETAILED STHAN, MUDRA, SAMAGRI, TIMING) */}
          {/* ============================================================== */}
          <div className="space-y-3">
            {filteredMantras.length === 0 ? (
              <div className="bg-white border border-orange-200 rounded-2xl p-6 text-center text-xs text-gray-500">
                {isHi
                  ? 'इस श्रेणी या देव में कोई मंत्र नहीं मिला। कृपया अन्य श्रेणी या समस्त देव चुनें।'
                  : 'No chants found in this selection. Please select another.'}
              </div>
            ) : (
              filteredMantras.map((item, index) => {
                const isSelectedInList = (selectedMantras && selectedMantras.length > 0
                  ? selectedMantras
                  : [currentMantra]
                ).some((m) => m.id === item.id);
                const isActiveCurrent = currentMantra.id === item.id;
                const isExpanded = expandedMantraId === item.id;
                const dCfg = deityConfig[item.deity] || deityConfig.shiva;
                const cInfo = categoryInfo[item.category] || categoryInfo.naam_jaap;

                return (
                  <React.Fragment key={item.id}>
                    {(index === 2 || index === 7) && (
                      <AdMobNativeCard
                        language={language}
                        variant="compact"
                        slotName={`Mantra Feed Slot ${index}`}
                        adIndex={index === 2 ? 0 : 3}
                      />
                    )}
                    <div
                      className={`p-3 rounded-3xl border-2 transition-all ${
                      isActiveCurrent
                        ? 'bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border-orange-500 shadow-md ring-2 ring-orange-400'
                        : isSelectedInList
                        ? 'bg-emerald-50/40 border-emerald-300 shadow-xs'
                        : 'bg-white border-orange-200 hover:border-orange-300 shadow-xs'
                    }`}
                  >
                    {/* Header Badges: Bhagwan / Deity + Category + Selected Status + Voice listen */}
                    <div className="flex items-center justify-between gap-1.5 mb-1.5 flex-wrap">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {/* 1. JIS BHAGWAN KA MANTRA HAI */}
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-black bg-orange-100 text-orange-950 border border-orange-200 flex items-center gap-1">
                          <span>{dCfg?.icon || '🔱'}</span>
                          <span>{item.deityLabel || dCfg?.label}</span>
                        </span>

                        {/* 2. CATEGORY BADGE */}
                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border ${cInfo?.badgeColor}`}>
                          {cInfo?.label}
                        </span>

                        {/* 3. SELECTED STATUS BADGE */}
                        {isSelectedInList && (
                          <span className="px-2 py-0.5 rounded-lg text-[10px] font-black bg-emerald-100 text-emerald-900 border border-emerald-300">
                            ✓ {isHi ? 'जप में शामिल' : 'In Playlist'}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        {/* IF CUSTOM MANTRA: DELETE BUTTON */}
                        {item.isCustom && (
                          <button
                            type="button"
                            onClick={(e) => handleDeleteCustom(item.id, e)}
                            className="px-2 py-1 rounded-xl text-xs font-bold border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 active:scale-95 transition-all flex items-center gap-1"
                            title={isHi ? 'यह मंत्र हटाएं' : 'Delete Mantra'}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>{isHi ? 'हटाएं' : 'Delete'}</span>
                          </button>
                        )}

                      </div>
                    </div>

                    {/* Mantra Name */}
                    <h3 className="text-sm font-black text-gray-900 mb-1 leading-snug">
                      {item.name}
                    </h3>

                    {/* Verses Box */}
                    <div className="p-2.5 bg-amber-50/70 border border-orange-100 rounded-2xl my-1.5 max-h-36 overflow-y-auto scrollbar-thin">
                      <p className="text-sm sm:text-base font-bold font-sanskrit text-amber-950 leading-relaxed whitespace-pre-line">
                        {item.text}
                      </p>
                    </div>

                    {/* Meaning */}
                    {item.meaning && (
                      <p className="text-xs text-gray-600 italic my-1 line-clamp-2">{item.meaning}</p>
                    )}

                    {/* Expandable Siddhi Vidhi & Guidelines */}
                    {isExpanded && (
                      <div className="mt-2 pt-2 border-t border-orange-200/60 space-y-2 text-xs text-gray-800 animate-fadeIn">
                        {/* Metadata Strip inside expanded */}
                        {(item.sthan || item.mudra || item.bestTiming || item.pujaSamagri || item.samagri) && (
                          <div className="grid grid-cols-2 gap-1.5 p-2 rounded-xl bg-orange-50/80 border border-orange-200 text-[10px]">
                            {item.sthan && (
                              <div className="flex items-start gap-1 text-gray-700">
                                <span className="shrink-0 font-bold text-orange-900">🏛️ {isHi ? 'स्थान:' : 'Place:'}</span>
                                <span className="font-semibold truncate">{item.sthan}</span>
                              </div>
                            )}
                            {item.mudra && (
                              <div className="flex items-start gap-1 text-gray-700">
                                <span className="shrink-0 font-bold text-orange-900">🧘‍♂️ {isHi ? 'मुद्रा:' : 'Mudra:'}</span>
                                <span className="font-semibold truncate">{item.mudra}</span>
                              </div>
                            )}
                            {item.bestTiming && (
                              <div className="flex items-start gap-1 text-gray-700">
                                <span className="shrink-0 font-bold text-orange-900">⏰ {isHi ? 'समय:' : 'Time:'}</span>
                                <span className="font-semibold truncate">{item.bestTiming}</span>
                              </div>
                            )}
                            {(item.pujaSamagri || item.samagri) && (
                              <div className="flex items-start gap-1 text-gray-700">
                                <span className="shrink-0 font-bold text-orange-900">🪔 {isHi ? 'सामग्री:' : 'Items:'}</span>
                                <span className="font-semibold truncate">{item.pujaSamagri || item.samagri}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {item.siddhiVidhi && (
                          <div className="bg-orange-50/80 p-2.5 rounded-xl border border-orange-200">
                            <strong className="text-orange-950 flex items-center gap-1 mb-0.5 font-bold">
                              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                              <span>{isHi ? 'साधना विधि:' : 'Method:'}</span>
                            </strong>
                            <p className="leading-relaxed font-medium">{item.siddhiVidhi}</p>
                          </div>
                        )}

                        {item.niyam && (
                          <div className="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200">
                            <strong className="text-emerald-950 block mb-0.5 font-bold">
                              ⚠️ {isHi ? 'नियम व सावधानियां:' : 'Rules:'}
                            </strong>
                            <p className="leading-relaxed">{item.niyam}</p>
                          </div>
                        )}

                        {item.targetCountSiddhi && (
                          <div className="bg-purple-50/80 p-2 rounded-xl border border-purple-200 flex items-center justify-between">
                            <span className="font-bold text-purple-950">
                              🎯 {isHi ? 'सिद्धि जप संख्या:' : 'Target Count:'}
                            </span>
                            <span className="font-black text-purple-900 bg-white px-2 py-0.5 rounded-md border border-purple-200">
                              {item.targetCountSiddhi}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Actions Row */}
                    <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-orange-100 text-xs">
                      <button
                        type="button"
                        onClick={() => setExpandedMantraId(isExpanded ? null : item.id)}
                        className="text-orange-800 font-bold hover:text-orange-950 flex items-center gap-0.5"
                      >
                        <span>
                          {isExpanded
                            ? isHi
                              ? 'कम विवरण'
                              : 'Less'
                            : isHi
                            ? 'विस्तृत विधि व सामग्री'
                            : 'Full Vidhi & Rules'}
                        </span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleViewGuide(item)}
                          className="px-2.5 py-1.5 rounded-xl border border-orange-300 bg-white text-orange-900 font-bold text-xs hover:bg-orange-50 active:scale-95 transition-all"
                        >
                          📖 {isHi ? 'पूजन विधि' : 'Guide'}
                        </button>

                        {isSelectedInList ? (
                          <div className="flex items-center gap-1.5">
                            {onRemoveMantra && (
                              <button
                                type="button"
                                onClick={() => onRemoveMantra(item.id)}
                                className="px-2 py-1.5 rounded-xl border border-red-300 bg-red-50 text-red-700 font-bold text-xs hover:bg-red-100 active:scale-95 transition-all flex items-center gap-1"
                                title={isHi ? 'सूची से हटाएं' : 'Remove from selection'}
                              >
                                <Trash2 className="w-3.5 h-3.5 text-red-600" />
                                <span>{isHi ? 'हटाएं' : 'Remove'}</span>
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleStartJaap(item)}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-black text-xs shadow-xs active:scale-95 transition-all"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>{isHi ? 'जाप करें' : 'Chant Now'}</span>
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => onSelectMantra(item)}
                              className="px-2.5 py-1.5 rounded-xl border border-orange-300 bg-orange-50 text-orange-950 font-bold text-xs hover:bg-orange-100 active:scale-95 transition-all flex items-center gap-1"
                            >
                              <PlusCircle className="w-3.5 h-3.5 text-orange-600" />
                              <span>{isHi ? '+ जोड़ें' : '+ Add'}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStartJaap(item)}
                              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black text-xs hover:brightness-105 active:scale-95 transition-all shadow-sm flex items-center gap-1"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>{isHi ? 'चुनें व जपें' : 'Select & Chant'}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })
            )}
          </div>
        </div>
      ) : (
        /* TAB 2: CUSTOM MANTRA INPUT FORM */
        <form
          onSubmit={handleSaveCustom}
          className="bg-white border-2 border-orange-300 rounded-3xl p-4 sm:p-5 space-y-3.5 shadow-md"
        >
          <div className="text-center pb-2 border-b border-orange-100">
            <span className="text-3xl">✍️</span>
            <h3 className="text-base font-bold text-orange-950 mt-1">
              {isHi ? 'अपना व्यक्तिगत मंत्र दर्ज करें' : 'Enter Your Custom Mantra'}
            </h3>
            <p className="text-xs text-gray-600">
              {isHi
                ? 'गुरु मंत्र, कुलदेवता मंत्र या कोई भी अभीष्ट मंत्र यहाँ लिखें:'
                : 'Write your Guru mantra, family deity or personal chant:'}
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-orange-950 mb-1">
              {isHi ? 'मंत्र का पावन नाम' : 'Mantra Title'}
            </label>
            <input
              type="text"
              required
              placeholder={isHi ? 'उदा. मेरा गुरु मंत्र, संकटमोचन रक्षा मंत्र...' : 'e.g. My Guru Mantra...'}
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-orange-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-orange-950">
                {isHi ? 'संस्कृत मंत्र / चौपाई पाठ' : 'Sanskrit Mantra Text'}
              </label>
            </div>
            <textarea
              required
              rows={4}
              placeholder={
                isHi
                  ? 'उदा. ॐ नमो भगवते वासुदेवाय...'
                  : 'e.g. Om Namo Bhagavate Vasudevaya...'
              }
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-orange-300 text-xs sm:text-sm font-bold font-sanskrit focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-orange-950 mb-1">
                🏛️ {isHi ? 'साधना स्थान (स्थान)' : 'Place (Sthan)'}
              </label>
              <input
                type="text"
                placeholder={isHi ? 'उदा. शांत पूजा कक्ष, मंदिर' : 'e.g. Home temple'}
                value={customSthan}
                onChange={(e) => setCustomSthan(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-orange-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-orange-950 mb-1">
                🧘‍♂️ {isHi ? 'मुद्रा व आसन' : 'Mudra & Asan'}
              </label>
              <input
                type="text"
                placeholder={isHi ? 'उदा. पद्मासन, ज्ञान मुद्रा' : 'e.g. Padmasan'}
                value={customMudra}
                onChange={(e) => setCustomMudra(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-orange-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-orange-950 mb-1">
                ⏰ {isHi ? 'शुभ समय (मुहूर्त)' : 'Best Timing'}
              </label>
              <input
                type="text"
                placeholder={isHi ? 'उदा. प्रातः ब्रह्म मुहूर्त' : 'e.g. Dawn'}
                value={customBestTiming}
                onChange={(e) => setCustomBestTiming(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-orange-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-orange-950 mb-1">
                🪔 {isHi ? 'पूजा सामग्री' : 'Puja Samagri'}
              </label>
              <input
                type="text"
                placeholder={isHi ? 'उदा. रुद्राक्ष माला, घी का दीप' : 'e.g. Rudraksha mala'}
                value={customSamagri}
                onChange={(e) => setCustomSamagri(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-orange-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-orange-950 mb-1">
              {isHi ? 'साधना सिद्धि विधि (वैकल्पिक)' : 'Siddhi Vidhi (Optional)'}
            </label>
            <textarea
              rows={2}
              placeholder={
                isHi
                  ? 'उदा. नित्य पूर्व दिशा की ओर मुख कर ११ माला जपें।'
                  : 'e.g. Chant 11 malas daily facing East.'
              }
              value={customSiddhiVidhi}
              onChange={(e) => setCustomSiddhiVidhi(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-orange-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black text-sm shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isHi ? 'मंत्र सुरक्षित करें व चुनें' : 'Save & Select Mantra'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

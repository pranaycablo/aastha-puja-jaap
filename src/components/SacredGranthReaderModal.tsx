import React, { useState, useMemo, useEffect, useRef } from 'react';
import { MantraItem, LanguageCode } from '../types';
import {
  SCRIPTURE_CANON_CATEGORIES,
  ScriptureBook,
  ScriptureChapter,
  ScriptureSectionBlock,
  ScriptureVerseUnit,
  getScriptureBookById
} from '../data/grandScriptureCanonData';
import { scriptureBookmarkManager, ScriptureBookmark } from '../utils/scriptureBookmarkManager';
import { GITA_COMPLETE_MANTRAS } from '../data/gitaCompleteData';
import { RAMAYAN_SEVEN_KAANDS } from '../data/ramayanData';
import { DURGA_SAPTASHATI_MANTRAS } from '../data/durgaSaptashatiData';
import { VED_UPANISHAD_GITA_MANTRAS } from '../data/vedUpanishadGitaData';
import { UPANISHAD_COMPLETE_MANTRAS } from '../data/upanishadCompleteData';
import { CHALISA_SUNDARKAND_MANTRAS } from '../data/chalisaSundarkandData';
import { ttsEngine } from '../utils/ttsEngine';
import { AdMobNativeCard } from './AdMobNativeCard';
import { DivineDeityDarshanCard } from './DivineDeityDarshanCard';
import { EbookDakshinaDownloadModal } from './EbookDakshinaDownloadModal';
import { cloudScriptureLoader } from '../utils/cloudScriptureLoader';
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Bookmark,
  CheckCircle2,
  Pause,
  Play,
  RotateCcw,
  Search,
  Share2,
  Clock,
  Compass,
  List,
  Download,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

export type ScriptureCategory = string;

export type ReaderLanguageMode = 'pure_sanskrit' | 'pure_hindi' | 'pure_english' | 'bilingual';

interface SacredGranthReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: ScriptureCategory;
  onSelectMantraAndChant?: (mantra: MantraItem) => void;
  language?: LanguageCode;
}

export const SacredGranthReaderModal: React.FC<SacredGranthReaderModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'epics',
  onSelectMantraAndChant,
  language = 'hi'
}) => {
  const isHi = language === 'hi';

  // 1. Navigation State
  const [activeCategoryKey, setActiveCategoryKey] = useState<string>('epics');
  const [selectedBookId, setSelectedBookId] = useState<string>('gita_complete');
  const [selectedChapterIndex, setSelectedChapterIndex] = useState<number>(0);

  // 2. Reader Mode: Strict Language Separation
  const [langMode, setLangMode] = useState<ReaderLanguageMode>('bilingual');
  const [fontSizeOffset, setFontSizeOffset] = useState<number>(0); // -2 to +6

  // 3. Audio & Bookmark state
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeBookmark, setActiveBookmark] = useState<ScriptureBookmark | null>(null);

  // 4. Long press timer ref
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // 5. E-book Dakshina Modal & Ad-Free Pass State
  const [showEbookDakshinaModal, setShowEbookDakshinaModal] = useState<boolean>(false);
  const [isAdFreePassActive, setIsAdFreePassActive] = useState<boolean>(() => {
    try {
      return localStorage.getItem('divya_jaap_ad_free_pass') === 'true';
    } catch (e) {
      return false;
    }
  });

  const handleToggleAdFreePass = () => {
    const next = !isAdFreePassActive;
    setIsAdFreePassActive(next);
    try {
      localStorage.setItem('divya_jaap_ad_free_pass', next ? 'true' : 'false');
    } catch (e) {}
    showToast(next ? '✨ विज्ञापन मुक्त पठन सक्रिय हो गया!' : 'विज्ञापन मोड पुनः सक्रिय');
  };

  // Auto-restore reading position and bookmarks on modal open
  useEffect(() => {
    if (isOpen) {
      let targetBookId = selectedBookId;
      let targetCatKey = activeCategoryKey;

      if (initialCategory) {
        if (initialCategory === 'gita') {
          targetCatKey = 'epics';
          targetBookId = 'gita_complete';
        } else if (initialCategory === 'ramayan') {
          targetCatKey = 'epics';
          targetBookId = 'ramcharitmanas_complete';
        } else if (initialCategory === 'durga') {
          targetCatKey = 'stotras';
          targetBookId = 'durga_saptashati';
        } else if (initialCategory === 'ved') {
          targetCatKey = 'vedas';
          targetBookId = 'rigveda_complete';
        } else if (initialCategory === 'upanishad') {
          targetCatKey = 'upanishads';
          targetBookId = 'isha_upanishad';
        } else {
          targetCatKey = initialCategory;
        }
      } else {
        const lastBm = scriptureBookmarkManager.getLastReadBookmark();
        if (lastBm) {
          targetBookId = lastBm.bookId;
          targetCatKey = lastBm.categoryKey;
        }
      }

      setActiveCategoryKey(targetCatKey);
      setSelectedBookId(targetBookId);

      // Check bookmark for target book and auto-restore chapter & scroll position
      const bm = scriptureBookmarkManager.getBookmark(targetBookId);
      setActiveBookmark(bm);

      if (bm) {
        setSelectedChapterIndex(bm.chapterIndex);
        setTimeout(() => {
          const key = `section-${bm.sectionIndex}`;
          const el = sectionRefs.current[key];
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            showToast(
              isHi
                ? `📖 पिछले पठन विराम (${bm.verseRange}) से स्वतः पुनः आरंभ किया गया`
                : `📖 Resumed at ${bm.verseRange}`
            );
          }
        }, 550);
      }
    }
  }, [isOpen, initialCategory]);

  // When selectedBookId changes, restore its specific bookmark if it exists
  useEffect(() => {
    const bm = scriptureBookmarkManager.getBookmark(selectedBookId);
    setActiveBookmark(bm);
    if (bm) {
      setSelectedChapterIndex(bm.chapterIndex);
      setTimeout(() => {
        const key = `section-${bm.sectionIndex}`;
        const el = sectionRefs.current[key];
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 400);
    }
  }, [selectedBookId]);

  // Stop audio on change
  useEffect(() => {
    return () => {
      ttsEngine.stop();
      setIsPlayingAudio(false);
    };
  }, [selectedBookId, selectedChapterIndex]);

  // Toast notification helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  // Resolve current active category
  const currentCategory = useMemo(() => {
    return (
      SCRIPTURE_CANON_CATEGORIES.find((c) => c.key === activeCategoryKey) ||
      SCRIPTURE_CANON_CATEGORIES[4] // default to Epics
    );
  }, [activeCategoryKey]);

  // Resolve current active book
  const currentBook: ScriptureBook = useMemo(() => {
    const fromCat = currentCategory.books.find((b) => b.id === selectedBookId);
    if (fromCat) return fromCat;
    const globalBook = getScriptureBookById(selectedBookId);
    if (globalBook) return globalBook;
    return currentCategory.books[0] || SCRIPTURE_CANON_CATEGORIES[4].books[0];
  }, [currentCategory, selectedBookId]);

  // Resolve current chapters
  const availableChapters: ScriptureChapter[] = useMemo(() => {
    if (currentBook.chapters && currentBook.chapters.length > 0) {
      return currentBook.chapters;
    }

    // Fallback: If legacy data item matches, build 10-12 shloka sections automatically!
    if (currentBook.id === 'gita_complete') {
      return GITA_COMPLETE_MANTRAS.map((m, idx) => ({
        chapterIndex: idx + 1,
        chapterTitleHi: m.name,
        chapterTitleEn: `Chapter ${idx + 1}`,
        totalVersesText: 'सम्पूर्ण श्लोक',
        sections: [
          {
            sectionIndex: 1,
            verseRange: 'श्लोक १ - १२',
            sectionTitleHi: 'प्रथम खण्ड: आरम्भिक श्लोक',
            sectionTitleEn: 'Section 1: Initial Verses',
            tattvaBodhaHi: 'भगवान श्रीकृष्ण का अर्जुन को दिव्य बोध।',
            tattvaBodhaEn: 'The divine wisdom of Sri Krishna.',
            verses: (m.text || '').split(/\n\s*\n/).slice(0, 12).map((txt, vIdx) => ({
              shlokaNum: vIdx + 1,
              sanskrit: txt,
              hindi: m.meaning || '',
              english: 'Divine philosophical counsel of Sri Krishna.'
            }))
          }
        ]
      }));
    }

    if (currentBook.id === 'ramcharitmanas_complete') {
      return RAMAYAN_SEVEN_KAANDS.map((k, idx) => ({
        chapterIndex: idx + 1,
        chapterTitleHi: k.nameHi,
        chapterTitleEn: k.nameEn,
        totalVersesText: 'सम्पूर्ण दोहा व चौपाई',
        sections: (k.sections || []).map((sec, sIdx) => ({
          sectionIndex: sIdx + 1,
          verseRange: `प्रसंग ${sIdx + 1}`,
          sectionTitleHi: sec.title || `खण्ड ${sIdx + 1}`,
          sectionTitleEn: `Section ${sIdx + 1}`,
          tattvaBodhaHi: 'मर्यादा पुरुषोत्तम भगवान श्री राम का पावन चरित्र।',
          tattvaBodhaEn: 'Divine virtues and pastimes of Sri Rama.',
          verses: [
            {
              shlokaNum: sIdx + 1,
              sanskrit: sec.sanskrit,
              hindi: sec.hindiMeaning,
              english: sec.englishMeaning || ''
            }
          ]
        }))
      }));
    }

    // Generic default single chapter
    return [
      {
        chapterIndex: 1,
        chapterTitleHi: currentBook.titleHi,
        chapterTitleEn: currentBook.titleEn,
        totalVersesText: currentBook.totalVersesEstimate,
        sections: [
          {
            sectionIndex: 1,
            verseRange: 'खण्ड १ (सम्पूर्ण सार)',
            sectionTitleHi: 'प्रथम खण्ड: मूल पाठ व व्याख्या',
            sectionTitleEn: 'Section 1: Sacred Text & Exposition',
            tattvaBodhaHi: currentBook.descriptionHi,
            tattvaBodhaEn: currentBook.descriptionEn,
            verses: [
              {
                shlokaNum: 1,
                sanskrit: currentBook.descriptionHi,
                hindi: currentBook.descriptionHi,
                english: currentBook.descriptionEn
              }
            ]
          }
        ]
      }
    ];
  }, [currentBook]);

  // Active Chapter
  const safeChapterIndex = Math.min(
    selectedChapterIndex,
    Math.max(0, availableChapters.length - 1)
  );

  const [loadedChapter, setLoadedChapter] = useState<ScriptureChapter | null>(null);
  const [isLoadingCloudChapter, setIsLoadingCloudChapter] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;
    const targetChapterNum = safeChapterIndex + 1;
    const bundledFallback = availableChapters[safeChapterIndex];

    // 1. Check if already cached
    const cached = cloudScriptureLoader.getCachedChapter(currentBook.id, targetChapterNum);
    if (cached) {
      setLoadedChapter(cached);
      setIsLoadingCloudChapter(false);
      cloudScriptureLoader.preloadNextChapter(currentBook.id, targetChapterNum + 1);
      return;
    }

    // 2. If chapter 1, load immediately from bundled data
    if (targetChapterNum === 1 && bundledFallback) {
      setLoadedChapter(bundledFallback);
      setIsLoadingCloudChapter(false);
      cloudScriptureLoader.preloadNextChapter(currentBook.id, 2);
      return;
    }

    // 3. Cloud fetch from GitHub raw CDN / local cache
    setIsLoadingCloudChapter(true);
    cloudScriptureLoader
      .loadChapter(currentBook.id, targetChapterNum, bundledFallback)
      .then((data) => {
        if (!isCancelled) {
          setLoadedChapter(data);
          setIsLoadingCloudChapter(false);
          cloudScriptureLoader.preloadNextChapter(currentBook.id, targetChapterNum + 1);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          setIsLoadingCloudChapter(false);
          if (bundledFallback) {
            setLoadedChapter(bundledFallback);
          }
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [currentBook.id, safeChapterIndex, availableChapters]);

  const currentChapter = loadedChapter || availableChapters[safeChapterIndex] || availableChapters[0];

  // Set Bookmark Handler: moves bookmark to this section/shloka
  const handleSetBookmark = (
    sectionIndex: number,
    verseRange: string,
    shlokaNum?: number
  ) => {
    // Haptic vibration
    if ('vibrate' in navigator) {
      navigator.vibrate([40, 60, 40]);
    }

    const totalSecs = currentChapter.sections.length || 1;
    const calcPercentage = Math.round(((sectionIndex + 1) / totalSecs) * 100);

    const saved = scriptureBookmarkManager.saveBookmark({
      bookId: currentBook.id,
      bookTitle: currentBook.titleHi,
      categoryKey: activeCategoryKey,
      chapterIndex: safeChapterIndex,
      chapterTitle: currentChapter.chapterTitleHi,
      sectionIndex,
      verseRange,
      shlokaNum,
      percentage: Math.min(100, Math.max(1, calcPercentage))
    });

    setActiveBookmark(saved);
    showToast(
      isHi
        ? `📌 पठन विराम सुरक्षित! अगली बार यहीं (${verseRange}) से खुलेंगे।`
        : `📌 Reading bookmark set at ${verseRange}!`
    );
  };

  // Resume Reading: Scrolls directly to the bookmarked section
  const handleResumeBookmark = () => {
    if (!activeBookmark) return;

    // If bookmark is in a different chapter, switch chapter first
    if (activeBookmark.chapterIndex !== safeChapterIndex) {
      setSelectedChapterIndex(activeBookmark.chapterIndex);
    }

    setTimeout(() => {
      const key = `section-${activeBookmark.sectionIndex}`;
      const el = sectionRefs.current[key];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        showToast(
          isHi
            ? `📖 पठन विराम पर पहुंचे: ${activeBookmark.verseRange}`
            : `📖 Resumed at ${activeBookmark.verseRange}`
        );
      }
    }, 250);
  };

  // Long press handlers for individual shloka cards
  const handleTouchStartLongPress = (
    sectionIndex: number,
    verseRange: string,
    shlokaNum: number
  ) => {
    longPressTimerRef.current = setTimeout(() => {
      handleSetBookmark(sectionIndex, `${verseRange} • श्लोक ${shlokaNum}`, shlokaNum);
    }, 550);
  };

  const handleTouchEndLongPress = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  // Audio Chant Handler for current chapter
  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      ttsEngine.stop();
      setIsPlayingAudio(false);
    } else {
      ttsEngine.stop();
      setIsPlayingAudio(true);

      // Collect all text based on selected language mode
      let textToChant = '';
      if (langMode === 'pure_sanskrit' || langMode === 'bilingual') {
        textToChant = currentChapter.sections
          .flatMap((s) => s.verses.map((v) => v.sanskrit))
          .join('\n\n');
      } else if (langMode === 'pure_hindi') {
        textToChant = currentChapter.sections
          .flatMap((s) => s.verses.map((v) => v.hindi))
          .join('\n\n');
      } else {
        textToChant = currentChapter.sections
          .flatMap((s) => s.verses.map((v) => v.english))
          .join('\n\n');
      }

      ttsEngine.speakMantra(textToChant, {
        rate: langMode === 'pure_sanskrit' ? 0.84 : 0.88,
        volume: 1,
        isShlokaChant: langMode === 'pure_sanskrit',
        lang: langMode === 'pure_english' ? 'en' : 'hi',
        onStart: () => setIsPlayingAudio(true),
        onEnd: () => setIsPlayingAudio(false),
        onError: () => setIsPlayingAudio(false)
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#FFFDF9] flex flex-col text-amber-950 select-none animate-fadeIn">
      
      {/* 1. TOP ROYAL BAR */}
      <header className="bg-gradient-to-r from-orange-900 via-amber-800 to-orange-950 text-white shadow-md sticky top-0 z-30 px-3 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            type="button"
            onClick={() => {
              ttsEngine.stop();
              setIsPlayingAudio(false);
              onClose();
            }}
            className="p-1.5 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 text-amber-100 transition-all shrink-0"
            title={isHi ? 'वापस जाएं' : 'Back'}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-base">{currentBook.icon}</span>
              <h1 className="text-sm sm:text-base font-black truncate text-amber-100">
                {currentBook.titleHi}
              </h1>
            </div>
            <p className="text-[10.5px] text-amber-200/90 truncate">
              {currentChapter.chapterTitleHi}
            </p>
          </div>
        </div>

        {/* Action Controls: Audio, Font Zoom, Bookmark Indicator */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Audio Chanting Button */}
          <button
            type="button"
            onClick={handleToggleAudio}
            className={`p-2 rounded-xl border transition-all flex items-center gap-1 text-xs font-bold active:scale-95 ${
              isPlayingAudio
                ? 'bg-amber-400 text-slate-950 border-amber-300 animate-pulse'
                : 'bg-white/15 text-amber-100 border-white/20 hover:bg-white/25'
            }`}
            title={isPlayingAudio ? 'ऑडियो रोकें' : 'पाठ सुनें'}
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{isPlayingAudio ? 'रोकें' : 'सुनें'}</span>
          </button>

          {/* Font Resize Buttons */}
          <div className="flex items-center bg-black/25 rounded-xl px-1.5 py-0.5 border border-amber-300/30">
            <button
              type="button"
              onClick={() => setFontSizeOffset((prev) => Math.max(-2, prev - 1))}
              disabled={fontSizeOffset <= -2}
              className="px-1.5 py-1 text-xs font-black text-amber-200 hover:text-white disabled:opacity-30 active:scale-95"
              title="A-"
            >
              A-
            </button>
            <span className="text-[10px] text-amber-300/60 px-0.5">•</span>
            <button
              type="button"
              onClick={() => setFontSizeOffset((prev) => Math.min(6, prev + 1))}
              disabled={fontSizeOffset >= 6}
              className="px-1.5 py-1 text-xs font-black text-amber-200 hover:text-white disabled:opacity-30 active:scale-95"
              title="A+"
            >
              A+
            </button>
          </div>

          {/* Ebook PDF Download Button */}
          <button
            type="button"
            onClick={() => setShowEbookDakshinaModal(true)}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-xs shadow-md border border-amber-300 hover:brightness-105 active:scale-95 transition-all flex items-center gap-1"
            title="सम्पूर्ण ई-बुक PDF डाउनलोड करें (₹११ दक्षिणा)"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ई-बुक (₹११)</span>
          </button>

          {/* Ad-Free Reading Toggle */}
          <button
            type="button"
            onClick={handleToggleAdFreePass}
            className={`p-1.5 sm:px-2 sm:py-1.5 rounded-xl border text-xs font-black transition-all flex items-center gap-1 active:scale-95 ${
              isAdFreePassActive
                ? 'bg-emerald-500 text-slate-950 border-emerald-300'
                : 'bg-white/10 text-amber-200 border-white/20 hover:bg-white/20'
            }`}
            title={isAdFreePassActive ? 'विज्ञापन मुक्त सक्रिय' : 'विज्ञापन मुक्त पठन सक्रिय करें'}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{isAdFreePassActive ? 'Ad-Free' : 'Ad-Free'}</span>
          </button>
        </div>
      </header>

      {/* 2. 11 GRAND CANON CATEGORIES HORIZONTAL PILL CAROUSEL */}
      <nav className="bg-[#24113D] border-b border-amber-500/25 px-2 py-1.5 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 shadow-inner">
        {SCRIPTURE_CANON_CATEGORIES.map((cat) => {
          const isSelected = cat.key === activeCategoryKey;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => {
                setActiveCategoryKey(cat.key);
                if (cat.books.length > 0) {
                  setSelectedBookId(cat.books[0].id);
                  setSelectedChapterIndex(0);
                }
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black shrink-0 transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-md ring-1 ring-amber-300'
                  : 'text-amber-200/80 hover:bg-white/10'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.nameHi}</span>
            </button>
          );
        })}
      </nav>

      {/* 3. BOOK SELECTOR CAROUSEL WITHIN ACTIVE CATEGORY */}
      <div className="bg-[#190B2C] border-b border-white/5 px-3 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
        <span className="text-[10.5px] font-bold text-amber-400/80 shrink-0 uppercase tracking-wider flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5" />
          {isHi ? 'ग्रन्थ चुनें:' : 'Books:'}
        </span>
        {currentCategory.books.map((book) => {
          const isSelected = book.id === selectedBookId;
          const hasBm = scriptureBookmarkManager.getBookmark(book.id);
          return (
            <button
              key={book.id}
              type="button"
              onClick={() => {
                setSelectedBookId(book.id);
                setSelectedChapterIndex(0);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                  : 'bg-white/5 text-amber-200/80 hover:bg-white/10'
              }`}
            >
              <span>{book.icon}</span>
              <span>{book.titleHi}</span>
              {hasBm && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" title="पठन विराम उपलब्ध" />
              )}
            </button>
          );
        })}
      </div>

      {/* 4. CHAPTER SELECTOR BAR & STRICT LANGUAGE SEPARATOR TOGGLE */}
      <div className="bg-orange-50 border-b border-orange-200 px-3 py-2 flex flex-wrap items-center justify-between gap-2 shrink-0">
        
        {/* Chapter / Adhyay Dropdown */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-orange-950">अध्याय/खण्ड:</span>
          <select
            value={safeChapterIndex}
            onChange={(e) => setSelectedChapterIndex(Number(e.target.value))}
            className="bg-white border border-orange-300 text-orange-950 font-bold text-xs rounded-xl px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-2xs max-w-[200px] truncate"
          >
            {availableChapters.map((ch, idx) => (
              <option key={idx} value={idx}>
                {ch.chapterTitleHi}
              </option>
            ))}
          </select>
        </div>

        {/* 4 STRICT LANGUAGE VIEWS: Sanskrit Only | Hindi Only | English Only | Bilingual */}
        <div className="flex items-center bg-orange-200/80 rounded-xl p-0.5 border border-orange-300 text-[11px] font-bold">
          <button
            type="button"
            onClick={() => setLangMode('pure_sanskrit')}
            className={`px-2 py-1 rounded-lg transition-all ${
              langMode === 'pure_sanskrit'
                ? 'bg-orange-600 text-white shadow-xs font-black'
                : 'text-orange-950 hover:bg-white/40'
            }`}
            title="केवल मूल संस्कृत श्लोक"
          >
            🕉️ केवल संस्कृत
          </button>
          <button
            type="button"
            onClick={() => setLangMode('pure_hindi')}
            className={`px-2 py-1 rounded-lg transition-all ${
              langMode === 'pure_hindi'
                ? 'bg-orange-600 text-white shadow-xs font-black'
                : 'text-orange-950 hover:bg-white/40'
            }`}
            title="केवल सरल हिन्दी अनुवाद"
          >
            🇮🇳 केवल हिन्दी
          </button>
          <button
            type="button"
            onClick={() => setLangMode('pure_english')}
            className={`px-2 py-1 rounded-lg transition-all ${
              langMode === 'pure_english'
                ? 'bg-orange-600 text-white shadow-xs font-black'
                : 'text-orange-950 hover:bg-white/40'
            }`}
            title="Only English Translation"
          >
            🌍 English
          </button>
          <button
            type="button"
            onClick={() => setLangMode('bilingual')}
            className={`px-2 py-1 rounded-lg transition-all ${
              langMode === 'bilingual'
                ? 'bg-orange-600 text-white shadow-xs font-black'
                : 'text-orange-950 hover:bg-white/40'
            }`}
            title="संस्कृत + हिन्दी दोनों"
          >
            📖 समन्वित
          </button>
        </div>

      </div>

      {/* 5. PROMINENT AUTO-RESUME BANNER (If this book has an active bookmark) */}
      {activeBookmark && activeBookmark.bookId === currentBook.id && (
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 px-4 py-2 flex items-center justify-between shadow-md shrink-0 border-b border-amber-300">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-lg shrink-0">📌</span>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-black tracking-wider text-slate-900 block">
                {isHi ? 'आपकी पिछली पढ़ाई यहाँ रुकी थी:' : 'Last Reading Checkpoint:'}
              </span>
              <span className="text-xs font-black truncate block">
                {activeBookmark.chapterTitle} • {activeBookmark.verseRange} ({activeBookmark.percentage}% पूर्ण)
              </span>
            </div>
          </div>
          <button
            onClick={handleResumeBookmark}
            className="py-1 px-3 rounded-xl bg-slate-950 text-amber-300 font-black text-xs shadow-md hover:bg-slate-900 active:scale-95 transition-all shrink-0 flex items-center gap-1"
          >
            <span>{isHi ? 'आगे पढ़ें ❯' : 'Resume ❯'}</span>
          </button>
        </div>
      )}

      {/* 6. TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-slate-950 text-amber-300 px-4 py-2 rounded-2xl border border-amber-400/50 shadow-2xl text-xs font-bold flex items-center gap-2 animate-bounce">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 7. SCROLLABLE SCRIPTURE BODY (STRUCTURED IN 10-12 SHLOKA SECTIONS) */}
      <main className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-5 scrollbar-thin">
        
        {/* Divine Deity Darshan Murti Banner */}
        <DivineDeityDarshanCard
          deityType={currentBook.id}
          title={currentBook.titleHi}
          subtitle={`${currentBook.categoryNameHi} • ${currentBook.badge}`}
          size="banner"
        />

        {/* Book Header Intro Card */}
        <div className="p-4 rounded-3xl bg-gradient-to-r from-orange-100/90 to-amber-100/80 border-2 border-orange-300/80 shadow-sm space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-orange-900 bg-orange-200/90 px-2 py-0.5 rounded-full border border-orange-300">
              🚩 {currentBook.badge}
            </span>
            <span className="text-xs font-bold text-orange-950 font-mono">
              {currentChapter.totalVersesText}
            </span>
          </div>
          <h2 className="text-lg font-black text-orange-950">{currentChapter.chapterTitleHi}</h2>
          <p className="text-xs text-orange-900/90 leading-relaxed">{currentBook.descriptionHi}</p>
          <div className="pt-1 text-[11px] text-amber-900/70 italic">
            💡 {isHi ? 'निर्देश: किसी भी श्लोक पर ०.५ सेकंड तक उंगली दबाकर रखने (Long Press) से वह श्लोक स्वतः मार्क हो जाता है।' : 'Tip: Long press any shloka card to bookmark it instantly.'}
          </div>
        </div>

        {/* 10-12 SHLOKA SECTIONS LIST OR CLOUD LOADER */}
        {isLoadingCloudChapter ? (
          <div className="py-16 px-6 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 flex flex-col items-center justify-center text-center space-y-4 my-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-950/40">
              <RefreshCw className="w-8 h-8 animate-spin text-white" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-black text-amber-950">
                {isHi
                  ? `श्री ${currentBook.titleHi} • अध्याय ${safeChapterIndex + 1} लोड हो रहा है...`
                  : `Loading Chapter ${safeChapterIndex + 1}...`}
              </h3>
              <p className="text-xs text-amber-900/80 max-w-sm">
                {isHi
                  ? 'दिव्य शास्त्र श्लोक GitHub क्लाउड से डाउनलोड किए जा रहे हैं।'
                  : 'Downloading sacred shlokas from GitHub cloud repository...'}
              </p>
            </div>
          </div>
        ) : (
          currentChapter.sections.map((section) => {
          const isSectionBookmarked =
            activeBookmark &&
            activeBookmark.bookId === currentBook.id &&
            activeBookmark.chapterIndex === safeChapterIndex &&
            activeBookmark.sectionIndex === section.sectionIndex;

          return (
            <React.Fragment key={section.sectionIndex}>
            <div
              ref={(el) => {
                sectionRefs.current[`section-${section.sectionIndex}`] = el;
              }}
              className={`rounded-3xl border-2 transition-all p-4 space-y-4 shadow-sm relative ${
                isSectionBookmarked
                  ? 'bg-amber-50/90 border-amber-500 ring-4 ring-amber-300/50'
                  : 'bg-white border-orange-200/90'
              }`}
            >
              {/* Section Top Header */}
              <div className="flex items-center justify-between pb-2 border-b border-orange-100">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-xl bg-orange-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                    {section.sectionIndex}
                  </span>
                  <div>
                    <h3 className="text-sm font-black text-orange-950">{section.sectionTitleHi}</h3>
                    <span className="text-[11px] font-bold text-amber-700 font-mono">
                      {section.verseRange}
                    </span>
                  </div>
                </div>

                {/* Bookmark indicator badge */}
                {isSectionBookmarked && (
                  <span className="inline-flex items-center gap-1 text-[10.5px] font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{isHi ? 'वर्तमान पठन विराम' : 'Bookmarked'}</span>
                  </span>
                )}
              </div>

              {/* Tattva Bodha Essence */}
              {section.tattvaBodhaHi && (
                <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200 text-xs text-orange-950 leading-relaxed italic">
                  <span className="font-bold not-italic text-orange-900 block mb-0.5">
                    ✨ {isHi ? 'स्वाध्याय तत्त्व बोध:' : 'Spiritual Essence:'}
                  </span>
                  {section.tattvaBodhaHi}
                </div>
              )}

              {/* INDIVIDUAL SHLOKA CARDS */}
              <div className="space-y-3.5">
                {section.verses.map((verse, vIdx) => {
                  const isThisShlokaBookmarked = Boolean(
                    activeBookmark &&
                    activeBookmark.bookId === currentBook.id &&
                    activeBookmark.chapterIndex === safeChapterIndex &&
                    activeBookmark.sectionIndex === section.sectionIndex &&
                    (activeBookmark.shlokaNum ? activeBookmark.shlokaNum === verse.shlokaNum : vIdx === 0)
                  );

                  return (
                    <React.Fragment key={verse.shlokaNum}>
                      <div
                        onContextMenu={(e) => {
                          e.preventDefault();
                          handleSetBookmark(section.sectionIndex, `${section.verseRange} • श्लोक ${verse.shlokaNum}`, verse.shlokaNum);
                        }}
                        onTouchStart={() =>
                          handleTouchStartLongPress(section.sectionIndex, section.verseRange, verse.shlokaNum)
                        }
                        onTouchEnd={handleTouchEndLongPress}
                        onMouseDown={() =>
                          handleTouchStartLongPress(section.sectionIndex, section.verseRange, verse.shlokaNum)
                        }
                        onMouseUp={handleTouchEndLongPress}
                        className={`p-3.5 rounded-2xl transition-all space-y-2 cursor-pointer ${
                          isThisShlokaBookmarked
                            ? 'bg-amber-50/95 border-2 border-emerald-500 shadow-md ring-2 ring-emerald-300/40'
                            : 'bg-[#FFFDF7] border border-orange-200/80 hover:border-amber-400 hover:shadow-xs'
                        }`}
                        title={isHi ? 'विराम लगाने के लिए टैप करें' : 'Tap to bookmark'}
                      >
                        {/* Verse Number Badge & One-Tap Pause Button */}
                        <div className="flex items-center justify-between text-[11px] font-mono text-amber-800 font-bold border-b border-orange-100 pb-1">
                          <span className="flex items-center gap-1.5">
                            <span>॥ श्लोक / पद {verse.shlokaNum} ॥</span>
                            {isThisShlokaBookmarked && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[9.5px] font-sans font-bold shadow-2xs">
                                ✓ {isHi ? 'यहाँ पठन विराम है' : 'Resumed Here'}
                              </span>
                            )}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSetBookmark(section.sectionIndex, `${section.verseRange} • श्लोक ${verse.shlokaNum}`, verse.shlokaNum);
                            }}
                            className={`text-[10px] font-sans font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 transition-all ${
                              isThisShlokaBookmarked
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-orange-100 text-orange-950 hover:bg-orange-200 border border-orange-200'
                            }`}
                            title={isHi ? 'इस श्लोक पर पठन विराम दें' : 'Pause at this shloka'}
                          >
                            <Bookmark className="w-3 h-3" />
                            <span>
                              {isThisShlokaBookmarked
                                ? (isHi ? 'विराम सुरक्षित' : 'Bookmarked')
                                : (isHi ? '⏸️ यहाँ पॉज करें' : 'Pause')}
                            </span>
                          </button>
                        </div>

                      {/* 1. PURE SANSKRIT VIEW */}
                      {(langMode === 'pure_sanskrit' || langMode === 'bilingual') && (
                        <p
                          className="font-sanskrit font-bold text-amber-950 leading-relaxed whitespace-pre-line text-center"
                          style={{ fontSize: `${16 + fontSizeOffset}px` }}
                        >
                          {verse.sanskrit}
                        </p>
                      )}

                      {/* 2. PURE HINDI VIEW */}
                      {(langMode === 'pure_hindi' || langMode === 'bilingual') && (
                        <div className="pt-1">
                          {langMode === 'bilingual' && (
                            <span className="text-[10px] font-bold text-amber-900/70 block mb-0.5">
                              सरल हिन्दी भावार्थ:
                            </span>
                          )}
                          <p
                            className="text-gray-900 font-medium leading-relaxed"
                            style={{ fontSize: `${14 + fontSizeOffset}px` }}
                          >
                            {verse.hindi}
                          </p>
                        </div>
                      )}

                      {/* 3. PURE ENGLISH VIEW */}
                      {langMode === 'pure_english' && (
                        <p
                          className="text-gray-900 leading-relaxed font-sans"
                          style={{ fontSize: `${14 + fontSizeOffset}px` }}
                        >
                          {verse.english}
                        </p>
                      )}
                    </div>

                    {/* DYNAMIC PROGRESSIVE AD CADENCE: As user reads deeper (Section 2+), show native ad after 6 shlokas */}
                    {!isAdFreePassActive && section.sectionIndex >= 2 && vIdx === 5 && (
                      <div className="py-1">
                        <AdMobNativeCard variant="banner_native" slotName={`Scripture Deep Verse ${vIdx}`} />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

              {/* SECTION END CHECKPOINT & LOAD NEXT PAGE BUTTONS */}
              <div className="pt-2 border-t border-orange-200 flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => handleSetBookmark(section.sectionIndex, section.verseRange)}
                  className={`flex-1 py-3 px-4 rounded-2xl font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer ${
                    isSectionBookmarked
                      ? 'bg-emerald-600 text-white shadow-emerald-900/30 ring-2 ring-emerald-400'
                      : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 hover:brightness-105'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                  <span>
                    {isSectionBookmarked
                      ? (isHi ? '✅ पठन विराम स्थापित (श्लोक १-१२)' : '✅ Bookmarked Here')
                      : (isHi
                          ? `⏸️ यहाँ विश्राम लें (${section.verseRange})`
                          : `⏸️ Pause Reading Here (${section.verseRange})`)}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const nextKey = `section-${section.sectionIndex + 1}`;
                    const nextEl = sectionRefs.current[nextKey];
                    if (nextEl) {
                      nextEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else if (safeChapterIndex < availableChapters.length - 1) {
                      setSelectedChapterIndex(safeChapterIndex + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white font-black text-xs shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{isHi ? '📖 अगला पृष्ठ लोड करें ❯' : '📖 Load Next Page ❯'}</span>
                </button>
              </div>

            </div>

            {/* DYNAMIC AD AFTER SECTION: Accelerates monetization per user specification */}
            {!isAdFreePassActive && (
              <div className="my-3">
                <AdMobNativeCard
                  variant={section.sectionIndex === 1 ? 'compact' : 'native_advanced'}
                  slotName={`Scripture Section ${section.sectionIndex}`}
                />
              </div>
            )}
            </React.Fragment>
          );
        })
        )}

        {/* Integrated Native Ad for monetization */}
        <div className="pt-2">
          <AdMobNativeCard variant="compact" slotName="Scripture Reader Bottom" />
        </div>

        {/* Chapter Navigation Footer Controls */}
        <div className="pt-2 pb-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              if (safeChapterIndex > 0) {
                setSelectedChapterIndex(safeChapterIndex - 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            disabled={safeChapterIndex === 0}
            className="flex-1 py-3 px-4 rounded-2xl bg-orange-100 text-orange-950 font-bold text-xs disabled:opacity-40 hover:bg-orange-200 transition-all flex items-center justify-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{isHi ? 'पिछला अध्याय' : 'Prev Chapter'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (safeChapterIndex < availableChapters.length - 1) {
                setSelectedChapterIndex(safeChapterIndex + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            disabled={safeChapterIndex >= availableChapters.length - 1}
            className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black text-xs disabled:opacity-40 shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-1.5"
          >
            <span>{isHi ? 'अगला पृष्ठ / अध्याय लोड करें ❯' : 'Load Next Page / Chapter ❯'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </main>

      {/* E-BOOK DAKSHINA & PDF DOWNLOAD MODAL */}
      {showEbookDakshinaModal && (
        <EbookDakshinaDownloadModal
          isOpen={showEbookDakshinaModal}
          onClose={() => setShowEbookDakshinaModal(false)}
          book={currentBook}
          chapters={availableChapters}
          languageMode={langMode}
        />
      )}

    </div>
  );
};

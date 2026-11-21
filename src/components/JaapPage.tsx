import React, { useState, useEffect, useRef } from 'react';
import {
  MantraItem,
  UserProfile,
  CountingMode,
  BellSoundType,
  ShankhSoundType,
  MalaBeadVisualType,
  AmbienceSoundType,
  LanguageCode,
  VoiceProfileId
} from '../types';
import { audioEngine, SOUND_STYLES, SOUND_STYLES_EN } from '../utils/audioEngine';
import { ttsEngine, DIVINE_VOICE_PROFILES, calculateMantraRecommendedDuration } from '../utils/ttsEngine';
import { getTranslations } from '../utils/i18n';
import { RotatingMalaRosary } from './RotatingMalaRosary';
import { SiddhiCertificateModal } from './SiddhiCertificateModal';
import { KarMalaMudraGuide } from './KarMalaMudraGuide';
import { SadhanaHistoryModal } from './SadhanaHistoryModal';
import { sadhanaHistoryManager } from '../utils/sadhanaHistoryManager';
import { BottomNavTab } from './BottomNavBar';
import {
  getPersonalizedSadhanaPlan,
  UserPersonalizedSadhanaPlan
} from '../utils/mantraSuggestionEngine';
import { AdMobNativeCard } from './AdMobNativeCard';
import confetti from 'canvas-confetti';
import {
  Play,
  Pause,
  RotateCcw,
  Sliders,
  Award,
  Clock,
  Touchpad,
  Volume1,
  Timer,
  Plus,
  Minus,
  ArrowLeft,
  Volume2,
  Sparkles,
  Mic,
  Check,
  X,
  Flame,
  ChevronDown,
  BookOpen,
  Calendar,
  Compass
} from 'lucide-react';

interface JaapPageProps {
  mantra: MantraItem;
  userProfile: UserProfile;
  targetMalas: number;
  countingMode: CountingMode;
  onUpdateCountingMode: (mode: CountingMode) => void;
  timerInterval: number;
  onUpdateTimerInterval: (sec: number) => void;
  speechSpeed: number;
  bellVolume: number;
  shankhVolume: number;
  voiceVolume: number;
  isBellEnabled: boolean;
  onToggleBell: (enabled: boolean) => void;
  isShankhEnabled: boolean;
  onToggleShankh: (enabled: boolean) => void;
  selectedBell: BellSoundType;
  selectedShankh: ShankhSoundType;
  selectedMalaBead: MalaBeadVisualType;
  activeAmbience: AmbienceSoundType;
  isVoiceChantingEnabled: boolean;
  onToggleVoiceChanting: (enabled: boolean) => void;
  selectedVoiceProfile: VoiceProfileId;
  onSelectVoiceProfile: (v: VoiceProfileId) => void;
  onBackToSetup: () => void;
  onNavigateToTab?: (tab: BottomNavTab) => void;
  selectedMantras?: MantraItem[];
  onSelectMantra?: (m: MantraItem) => void;
  onRemoveMantra?: (mantraId: string) => void;
  onUpdateStats: (beadsAdded: number, malasCompleted: number) => void;
  language?: LanguageCode;
  onResetSession?: () => void;
  onOpenKundali?: () => void;
  onOpenHastRekha?: () => void;
  onOpenAnkaJyotish?: () => void;
  onOpenSamadhan?: () => void;
  onOpenChalisa?: () => void;
  onOpenGranth?: (cat?: string) => void;
  hasChosenMantra?: boolean;
  onSetHasChosenMantra?: (chosen: boolean) => void;
}

export const JaapPage: React.FC<JaapPageProps> = ({
  mantra,
  userProfile,
  targetMalas,
  countingMode,
  onUpdateCountingMode,
  timerInterval,
  onUpdateTimerInterval,
  speechSpeed,
  bellVolume,
  shankhVolume,
  voiceVolume,
  isBellEnabled,
  onToggleBell,
  isShankhEnabled,
  onToggleShankh,
  selectedBell,
  selectedShankh,
  selectedMalaBead,
  activeAmbience,
  isVoiceChantingEnabled,
  onToggleVoiceChanting,
  selectedVoiceProfile,
  onSelectVoiceProfile,
  onBackToSetup,
  onNavigateToTab,
  selectedMantras = [],
  onSelectMantra,
  onRemoveMantra,
  onUpdateStats,
  language = 'hi',
  onResetSession,
  onOpenKundali,
  onOpenHastRekha,
  onOpenAnkaJyotish,
  onOpenSamadhan,
  onOpenChalisa,
  onOpenGranth,
  hasChosenMantra = false,
  onSetHasChosenMantra
}) => {
  const isHindi = language === 'hi';
  const isHi = isHindi;
  const t = getTranslations(language);
  const soundStylesList = isHindi ? SOUND_STYLES : SOUND_STYLES_EN;

  // Track if user is in Sadhana Selection mode (Default true if user hasn't explicitly chosen yet)
  const [isSelectingSadhana, setIsSelectingSadhana] = useState<boolean>(!hasChosenMantra);
  const plan = React.useMemo(() => getPersonalizedSadhanaPlan(userProfile, language), [userProfile, language]);

  const [currentBead, setCurrentBead] = useState<number>(0);
  const [completedMalasInSession, setCompletedMalasInSession] = useState<number>(0);
  const [totalSessionBeads, setTotalSessionBeads] = useState<number>(0);
  const [showVoiceModal, setShowVoiceModal] = useState<boolean>(false);
  const [showCustomIntervalModal, setShowCustomIntervalModal] = useState<boolean>(false);
  const [customSecondsInput, setCustomSecondsInput] = useState<string>(timerInterval.toString());
  const [malaCompletionBanner, setMalaCompletionBanner] = useState<string | null>(null);

  // Dynamic calculation of optimal recitation time for this specific mantra
  const recommendedMantraSeconds = calculateMantraRecommendedDuration(mantra.text, speechSpeed);

  // Timer State - ALWAYS START PAUSED (User must explicitly click Play or Tap)
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(timerInterval);
  const [chantProgress, setChantProgress] = useState<number>(0);

  // Automatically calibrate timer interval whenever active mantra or speed changes
  useEffect(() => {
    const optimalSec = calculateMantraRecommendedDuration(mantra.text, speechSpeed);
    onUpdateTimerInterval(optimalSec);
    setTimerSecondsLeft(optimalSec);
    setCustomSecondsInput(optimalSec.toString());
  }, [mantra.id, mantra.text, speechSpeed]);

  // Keep timer seconds left in sync when interval setting changes
  useEffect(() => {
    setTimerSecondsLeft(timerInterval);
    setCustomSecondsInput(timerInterval.toString());
  }, [timerInterval]);

  // Mode Selection Handlers: Exactly ONE working at a time ('tap' OR 'timer')
  const handleSelectMode = (mode: CountingMode) => {
    onUpdateCountingMode(mode);
    if (mode === 'timer') {
      setIsTimerRunning(false);
      setIsSpeakerActive(false);
      setTimerSecondsLeft(timerInterval);
    } else {
      setIsTimerRunning(false);
      setIsSpeakerActive(false);
      ttsEngine.stop();
      setIsSpeakingNow(false);
    }
  };

  const handleChangeInterval = (sec: number) => {
    onUpdateTimerInterval(sec);
    setTimerSecondsLeft(sec);
  };

  const handleStepInterval = (delta: number) => {
    const nextSec = Math.max(1, Math.min(60, timerInterval + delta));
    onUpdateTimerInterval(nextSec);
    setTimerSecondsLeft(nextSec);
  };

  // Continuous Speaker Chanting State - ALWAYS START PAUSED
  const [isSpeakerActive, setIsSpeakerActive] = useState<boolean>(false);
  const [isSpeakingNow, setIsSpeakingNow] = useState<boolean>(false);

  // Certificate Modal State
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);
  const [showMudraModal, setShowMudraModal] = useState<boolean>(false);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [showAddMantraModal, setShowAddMantraModal] = useState<boolean>(false);
  const [customMantraName, setCustomMantraName] = useState<string>('');
  const [customMantraText, setCustomMantraText] = useState<string>('');

  const handleSaveCustomMantra = () => {
    if (!customMantraText.trim()) return;
    const newMantra: MantraItem = {
      id: `custom-jaap-${Date.now()}`,
      name: customMantraName.trim() || (isHindi ? 'मेरा विशेष मंत्र' : 'Custom Mantra'),
      text: customMantraText.trim(),
      deity: 'custom',
      deityLabel: isHindi ? 'इष्ट देवता' : 'Deity',
      category: 'custom',
      categoryLabel: isHindi ? 'कस्टम मंत्र' : 'Custom',
      isCustom: true
    };
    onSelectMantra?.(newMantra);
    setShowAddMantraModal(false);
    setCustomMantraName('');
    setCustomMantraText('');
  };

  const activeSpeakerRef = useRef(isSpeakerActive);
  activeSpeakerRef.current = isSpeakerActive;

  // Touch latency prevention ref (0ms touch)
  const lastTouchTimeRef = useRef<number>(0);

  // Start Ambience sound if configured
  useEffect(() => {
    if (activeAmbience && activeAmbience !== 'none') {
      audioEngine.startAmbience(activeAmbience, 0.35);
    }
    return () => {
      audioEngine.stopAmbience();
      ttsEngine.stop();
    };
  }, [activeAmbience]);

  // Main Bead & Count Advancement Handler
  const advanceBead = () => {
    const nextBead = currentBead + 1;
    const isMalaDone = nextBead === 108;
    setTotalSessionBeads((prev) => prev + 1);

    // 0. Real-time Bead & Mala Sync: Every single bead is immediately preserved!
    onUpdateStats(1, isMalaDone ? 1 : 0);

    // Haptic vibration
    audioEngine.triggerVibration('bead');

    // 1. HAR JAP COUNT PAR GHANTI KI AWAJ (Authentic Temple Bell 'टन-टन' on every single count!)
    if (isBellEnabled !== false && (bellVolume ?? 0.8) > 0) {
      audioEngine.playTempleBell(selectedBell, bellVolume ?? 0.8);
    }

    // 3. 108th BEAD = 1 FULL MALA COMPLETED! (HAR MALA COMPLETE HONE PAR SANKH KI AWAJ!)
    if (isMalaDone) {
      setCurrentBead(0);
      const nextCompleted = completedMalasInSession + 1;
      setCompletedMalasInSession(nextCompleted);

      // Play triumphant sacred temple Shankh (Conch Horn)
      if (isShankhEnabled !== false && (shankhVolume ?? 0.9) > 0) {
        audioEngine.playShankhSound(selectedShankh, shankhVolume ?? 0.9);
      }
      audioEngine.triggerVibration('malaComplete');

      // Automatically preserve japa session in Sadhana History Journal
      try {
        sadhanaHistoryManager.saveSession({
          mantraId: mantra.id,
          mantraName: isHindi ? (mantra.nameHi || mantra.name) : (mantra.nameEn || mantra.name),
          beadsCount: 108,
          malasCount: 1,
          targetMalas: targetMalas,
          completed: nextCompleted >= targetMalas,
          durationMinutes: 10,
          sankalpPlan: targetMalas > 1 ? `${targetMalas} माला संकल्प` : (isHindi ? 'दैनिक नित्य नियम' : 'Daily Routine'),
          deityName: mantra.category
        });
      } catch (err) {
        console.warn('History save err:', err);
      }

      // Royal Golden Confetti
      confetti({
        particleCount: 160,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#ea580c', '#f59e0b', '#fbbf24', '#ffffff', '#10b981']
      });

      // Show celebratory notification toast
      const bannerMsg = isHindi
        ? `🔱 बधाई! माला ${nextCompleted} पूर्ण हुई • पावन शंखनाद!`
        : `🔱 Mala ${nextCompleted} Completed • Sacred Conch Blast!`;
      setMalaCompletionBanner(bannerMsg);
      setTimeout(() => setMalaCompletionBanner(null), 4500);

      // If reached target, prompt certificate but DO NOT disable chanting!
      if (nextCompleted === targetMalas) {
        setTimeout(() => {
          setShowCertificateModal(true);
        }, 1200);
      }
    } else {
      setCurrentBead(nextBead);
    }
  };

  const advanceBeadRef = useRef(advanceBead);
  advanceBeadRef.current = advanceBead;

  const incrementCount = () => {
    advanceBead();
  };

  // Instant Touch / Click Dispatcher
  const handleCentralAction = (e: React.TouchEvent | React.MouseEvent) => {
    const now = Date.now();
    if (e.type === 'touchstart') {
      lastTouchTimeRef.current = now;
      if (countingMode === 'tap') {
        incrementCount();
      } else if (countingMode === 'timer') {
        setIsTimerRunning(!isTimerRunning);
      }
    } else if (e.type === 'click') {
      if (now - lastTouchTimeRef.current < 400) return;
      if (countingMode === 'tap') {
        incrementCount();
      } else if (countingMode === 'timer') {
        setIsTimerRunning(!isTimerRunning);
      }
    }
  };

  // Synchronized Timer Mode Loop:
  // Coordinates full mantra pronunciation with countdown timer so speech is never cut off
  const isTimerRunningRef = useRef(isTimerRunning);
  isTimerRunningRef.current = isTimerRunning;

  useEffect(() => {
    let isCancelled = false;
    let tickerInterval: NodeJS.Timeout | null = null;
    let nextCycleTimeout: NodeJS.Timeout | null = null;

    if (countingMode !== 'timer' || !isTimerRunning) {
      setChantProgress(0);
      return;
    }

    const runChantCycle = () => {
      if (isCancelled || !isTimerRunningRef.current) return;

      const cycleDurationMs = Math.max(1000, timerInterval * 1000);
      const startTime = Date.now();
      setChantProgress(0);
      setTimerSecondsLeft(timerInterval);

      if (tickerInterval) clearInterval(tickerInterval);
      tickerInterval = setInterval(() => {
        if (isCancelled || !isTimerRunningRef.current) {
          if (tickerInterval) clearInterval(tickerInterval);
          return;
        }

        const elapsed = Date.now() - startTime;
        const progress = Math.min(1.0, elapsed / cycleDurationMs);
        setChantProgress(progress);

        const remaining = Math.max(0, Math.ceil((cycleDurationMs - elapsed) / 1000));
        setTimerSecondsLeft(remaining);

        if (elapsed >= cycleDurationMs) {
          if (tickerInterval) {
            clearInterval(tickerInterval);
            tickerInterval = null;
          }

          if (isCancelled || !isTimerRunningRef.current) return;
          advanceBeadRef.current();
          setChantProgress(0);

          nextCycleTimeout = setTimeout(() => {
            if (!isCancelled && isTimerRunningRef.current) {
              runChantCycle();
            }
          }, 100);
        }
      }, 100);
    };

    runChantCycle();

    return () => {
      isCancelled = true;
      if (tickerInterval) clearInterval(tickerInterval);
      if (nextCycleTimeout) clearTimeout(nextCycleTimeout);
      setChantProgress(0);
    };
  }, [
    countingMode,
    isTimerRunning,
    timerInterval
  ]);

  const handleResetSession = () => {
    const confirmMsg = isHindi
      ? 'क्या आप वर्तमान जाप सत्र को पुनः आरंभ (०) करना चाहते हैं?'
      : 'Do you want to reset this chanting session to 0?';
    if (window.confirm(confirmMsg)) {
      setIsTimerRunning(false);
      setCurrentBead(0);
      setCompletedMalasInSession(0);
      setTotalSessionBeads(0);
      setTimerSecondsLeft(timerInterval);
      if (onResetSession) {
        onResetSession();
      }
    }
  };

  const activeBellObj = soundStylesList.find((s) => s.id === selectedBell) || soundStylesList[0];
  const activeVoiceObj = DIVINE_VOICE_PROFILES.find((v) => v.id === selectedVoiceProfile) || DIVINE_VOICE_PROFILES[0];

  const [selectedDurationDays, setSelectedDurationDays] = useState<number>(0);

  const handleStartPrimaryJaap = () => {
    onSelectMantra?.(plan.primaryIshtMantra.mantraItem);
    onSetHasChosenMantra?.(true);
    setIsSelectingSadhana(false);
  };

  const handleOpenPrimaryPaath = () => {
    if (onOpenChalisa) {
      onOpenChalisa();
    }
  };

  // =========================================================================
  // VIEW A: DISCIPLINED SADHANA GUIDANCE & SELECTION
  // =========================================================================
  if (isSelectingSadhana) {
    return (
      <div className="w-full max-w-md mx-auto flex flex-col select-none pb-28 animate-fadeIn px-2 sm:px-3 space-y-3">
        {/* Royal Sadhana Header */}
        <div className="bg-gradient-to-r from-[#5C0F08] via-[#85180C] to-[#5C0F08] text-white p-4 rounded-3xl shadow-lg border-2 border-amber-400/90 text-center relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-200 border border-amber-400/40 px-2.5 py-0.5 rounded-full">
              📿 {isHindi ? 'शास्त्रोक्त अनुष्ठान मार्गदर्शिका' : 'Authentic Sadhana Guide'}
            </span>
            {hasChosenMantra && (
              <button
                type="button"
                onClick={() => setIsSelectingSadhana(false)}
                className="text-[11px] font-bold text-amber-200 hover:text-white bg-white/10 px-2.5 py-1 rounded-xl transition-all"
              >
                {isHindi ? 'वर्तमान जाप ➔' : 'Back to Jaap ➔'}
              </button>
            )}
          </div>
          <h2 className="text-base sm:text-lg font-black text-amber-100">
            {plan.userName
              ? (isHindi ? `श्री ${plan.userName} जी की मुख्य इष्ट साधना` : `Personalized Sadhana for ${plan.userName} ji`)
              : (isHindi ? 'दैनिक मुख्य इष्ट साधना' : 'Daily Isht Devta Sadhana')}
          </h2>
          <p className="text-[11px] text-amber-200/90 font-medium mt-0.5">
            {isHindi
              ? `इष्टदेव: ${plan.ishtDevtaNameHi} • आज ${plan.dayInfo.dayNameHi.split('(')[0].trim()}`
              : `Deity: ${plan.ishtDevtaNameHi} • Today: ${plan.dayInfo.dayNameEn}`}
          </p>
        </div>

        {/* Golden Shastric Rule Banner (NO SCATTERED MANTRA CLUTTER) */}
        <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/20 to-amber-500/15 border border-amber-300 rounded-2xl p-3 flex items-start gap-2.5">
          <span className="text-xl shrink-0 mt-0.5">📜</span>
          <div className="min-w-0">
            <p className="text-xs font-black text-amber-950">
              {isHindi ? plan.sadhanaPlanGuide.dailyRuleTitleHi : 'Single-Focus Principle'}
            </p>
            <p className="text-[11px] text-amber-900 leading-relaxed font-medium mt-0.5">
              {isHindi ? plan.sadhanaPlanGuide.dailyRuleDescHi : 'Focusing deeply on 1 chosen Isht Mantra awakens true divine grace.'}
            </p>
          </div>
        </div>

        {/* CARD 1: THE SINGLE PRIMARY ISHT MANTRA (आपकी मुख्य साधना) */}
        <div className="bg-gradient-to-br from-amber-50 via-orange-50/70 to-amber-100/90 border-2 border-amber-400 rounded-3xl p-4 shadow-sm relative overflow-hidden ring-1 ring-amber-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-orange-600 text-white shadow-2xs">
              ⭐ {isHindi ? 'आपका १ मुख्य नित्य इष्ट मंत्र' : 'Your 1 Primary Isht Mantra'}
            </span>
            <span className="text-xs font-black text-orange-900 font-mono">
              {plan.primaryIshtMantra.dailyTargetCount}
            </span>
          </div>

          <div className="my-2 bg-white/95 p-3 rounded-2xl border border-amber-200 shadow-inner text-center">
            <p className="text-lg sm:text-xl font-bold font-sanskrit text-amber-950 leading-relaxed break-words whitespace-pre-line">
              {plan.primaryIshtMantra.sanskritText}
            </p>
          </div>

          <p className="text-xs text-stone-700 leading-relaxed font-medium mb-3">
            {plan.primaryIshtMantra.meaningHi}
          </p>

          <button
            onClick={handleStartPrimaryJaap}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white font-black text-sm shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isHindi ? 'यह मुख्य साधना अभी आरंभ करें (१०८ मणके)' : 'Start Chanting This Mantra'}</span>
          </button>
        </div>

        {/* CARD 2: THE SINGLE PRIMARY ISHT PAATH (आपका १ मुख्य नित्य पाठ) */}
        <div className="bg-white border-2 border-orange-200 rounded-3xl p-4 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
              📖 {isHi ? 'आपका १ मुख्य दैनिक पाठ' : 'Your 1 Daily Paath'}
            </span>
            <span className="text-xs font-black text-orange-800">
              {plan.primaryIshtPaath.frequencyHi}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="text-2xl p-2 bg-amber-50 rounded-2xl border border-amber-200 shrink-0">
                🚩
              </span>
              <div className="min-w-0">
                <h4 className="text-sm sm:text-base font-black text-orange-950 truncate">
                  {plan.primaryIshtPaath.titleHi}
                </h4>
                <p className="text-xs text-gray-600 line-clamp-2 mt-0.5 leading-snug">
                  {plan.primaryIshtPaath.significanceHi}
                </p>
              </div>
            </div>
            <button
              onClick={handleOpenPrimaryPaath}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-black text-xs shadow-xs hover:brightness-105 active:scale-95 transition-all shrink-0"
            >
              {isHi ? 'पाठ खोलें ❯' : 'Open ❯'}
            </button>
          </div>
        </div>

        {/* CARD 3: DURATION GUIDE (कितना दिन करना चाहिए?) */}
        <div className="bg-white border-2 border-amber-200 rounded-3xl p-4 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between border-b border-orange-100 pb-2">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-orange-600" />
              <h4 className="text-xs sm:text-sm font-black text-orange-950">
                {isHi ? 'कितना दिन करना चाहिए? (अनुष्ठान संकल्प)' : 'Duration & Days Guide'}
              </h4>
            </div>
            <span className="text-[10px] text-gray-500 font-bold">
              {isHi ? 'अवधि चुनें' : 'Choose Days'}
            </span>
          </div>

          <div className="space-y-2 pt-1">
            {plan.sadhanaPlanGuide.durationOptions.map((opt) => {
              const isSelected = selectedDurationDays === opt.days;
              return (
                <div
                  key={opt.days}
                  onClick={() => setSelectedDurationDays(opt.days)}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50 border-amber-500 shadow-xs ring-1 ring-amber-300'
                      : 'bg-orange-50/40 border-orange-100 hover:border-orange-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-xs text-orange-950 flex items-center gap-1.5">
                      <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isSelected ? 'border-orange-600 bg-orange-600 text-white' : 'border-gray-400'}`}>
                        {isSelected && <Check className="w-2.5 h-2.5" />}
                      </span>
                      <span>{opt.labelHi}</span>
                    </span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white text-orange-900 border border-orange-200">
                      {opt.subtitleHi.split('•')[0].trim()}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-700 leading-relaxed pl-5 font-medium">
                    {opt.purposeHi}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CARD 4: SHASTRA TIMING & RULES (समय, दिशा, आसन) */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-3 text-xs space-y-1.5 text-orange-950">
          <h5 className="font-black flex items-center gap-1 text-[11px] text-orange-900">
            <Compass className="w-3.5 h-3.5 text-orange-600" />
            <span>{isHi ? 'पावन साधना नियम व सावधानियां:' : 'Rules & Timing:'}</span>
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-gray-700">
            <p>⏰ <strong>सर्वोत्तम समय:</strong> प्रातः ब्रह्म मुहूर्त (५:००-६:३०) या सांध्य गोधूलि वेला।</p>
            <p>🧭 <strong>दिशा:</strong> पूर्व अथवा उत्तर दिशा की ओर मुख करके बैठें।</p>
            <p>🧘 <strong>आसन:</strong> ऊनी कम्बल अथवा कुशा का साफ़ आसन बिछाएं।</p>
            <p>📿 <strong>माला:</strong> तुलसी अथवा रुद्राक्ष माला को गोमुखी में रखकर जपें।</p>
          </div>
        </div>

        {/* NATIVE AD CARD EMBEDDED IN SADHANA GUIDE */}
        <AdMobNativeCard
          language={language}
          variant="compact"
          slotName="Jaap Sadhana Guide"
          adIndex={1}
        />

        {/* BROWSE ALL MANTRAS LINK */}
        {onNavigateToTab && (
          <button
            type="button"
            onClick={() => onNavigateToTab('mantra')}
            className="w-full py-2.5 rounded-2xl bg-white border border-orange-300 text-orange-950 text-xs font-bold hover:bg-orange-50 active:scale-95 transition-all text-center shadow-2xs"
          >
            📚 {isHi ? 'सम्पूर्ण मंत्र व ग्रंथ पुस्तकालय ब्राउज़ करें ➔' : 'Explore Full Mantra Library ➔'}
          </button>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW B: ACTIVE 108 MALA ROSARY CHANTING COUNTER
  // =========================================================================
  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center select-none pb-28 animate-fadeIn px-2 sm:px-3">
      {/* 1. TOP BAR CONTROLS (Quick Bell, Voice & Ambience Controls) */}
      <div className="w-full flex items-center justify-between mb-2 gap-1.5 pt-1">
        {/* Back to Setup Button */}
        <button
          onClick={onBackToSetup}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-orange-100/90 text-orange-950 font-bold text-xs hover:bg-orange-200 transition-all border border-orange-200 shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-orange-600" />
          <span>{isHindi ? 'सेटिंग्स' : 'Setup'}</span>
        </button>

        <div className="flex items-center gap-1.5">
          {/* Quick Bell Toggle Pill */}
          <button
            type="button"
            onClick={() => onToggleBell(!isBellEnabled)}
            className={`flex items-center gap-1 text-xs font-bold px-2 py-1.5 rounded-xl border transition-all active:scale-95 shadow-xs ${
              isBellEnabled
                ? 'bg-amber-100 text-orange-950 border-amber-300'
                : 'bg-gray-200 text-gray-500 border-gray-300'
            }`}
            title={isBellEnabled ? (isHindi ? 'घंटी बंद करें' : 'Mute Bell') : (isHindi ? 'घंटी चालू करें' : 'Enable Bell')}
          >
            <span>{isBellEnabled ? '🔔' : '🔕'}</span>
            <span>{isBellEnabled ? `${Math.round(bellVolume * 100)}%` : (isHindi ? 'मूक' : 'Off')}</span>
          </button>

          {/* Quick Reset Button */}
          <button
            onClick={handleResetSession}
            className="p-1.5 rounded-xl bg-white border border-orange-200 text-orange-800 hover:bg-orange-50 active:scale-95 transition-all shadow-xs"
            title={isHindi ? 'वर्तमान सत्र रीसेट करें' : 'Reset Session'}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Celebratory Mala Completion Banner */}
      {malaCompletionBanner && (
        <div className="w-full bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 text-white py-2 px-3 rounded-2xl shadow-md mb-2 text-center text-xs font-black animate-bounce flex items-center justify-center gap-1.5 ring-1 ring-emerald-300">
          <Sparkles className="w-4 h-4 text-amber-200" />
          <span>{malaCompletionBanner}</span>
        </div>
      )}

      {/* MULTI-MANTRA PLAYLIST SWITCHER (When user selects multiple mantras) */}
      {selectedMantras && selectedMantras.length > 0 && (
        <div className="w-full bg-gradient-to-r from-amber-50/90 via-orange-50/80 to-amber-50/90 border border-orange-200/90 rounded-2xl p-1.5 mb-2 shadow-2xs">
          <div className="flex items-center justify-between px-1 mb-1">
            <span className="text-[10px] font-black text-orange-900 flex items-center gap-1 uppercase tracking-wider">
              <span>📿</span>
              <span>{isHindi ? 'साधना मंत्र क्रम (Playlist)' : 'Chanting Playlist'}</span>
            </span>
            <button
              type="button"
              onClick={() => setShowAddMantraModal(true)}
              className="text-[10px] text-orange-800 font-bold hover:text-orange-950 flex items-center gap-0.5"
            >
              <span>+ {isHindi ? 'मंत्र जोड़ें' : 'Add'}</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
            {selectedMantras.map((m, idx) => {
              const isActive = mantra.id === m.id;
              return (
                <div
                  key={m.id || idx}
                  onClick={() => onSelectMantra?.(m)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black shrink-0 transition-all cursor-pointer flex items-center gap-1 border shadow-2xs ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-500 ring-1 ring-amber-300'
                      : 'bg-white border-orange-200 text-orange-950 hover:bg-orange-50'
                  }`}
                >
                  <span className="truncate max-w-[120px]">{m.name}</span>
                  {selectedMantras.length > 1 && onRemoveMantra && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveMantra(m.id);
                      }}
                      className={`ml-0.5 p-0.5 rounded-full hover:bg-black/20 transition-all ${
                        isActive ? 'text-white' : 'text-gray-400 hover:text-red-600'
                      }`}
                      title={isHindi ? 'जाप सूची से हटाएं' : 'Remove from list'}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. SACRED MANTRA CARD (Clean, uncluttered, focused) */}
      <div className="w-full bg-gradient-to-b from-orange-50/90 via-amber-50/80 to-orange-100/70 border border-orange-300/80 rounded-2xl p-2.5 sm:p-3 shadow-2xs mb-2 text-center">
        <div className="flex items-center justify-between px-1 mb-1.5 gap-2">
          <span className="text-xs font-black text-orange-950 tracking-wide break-words truncate">
            {mantra.name}
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsSelectingSadhana(true)}
              className="text-[10.5px] text-amber-950 bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-400 hover:brightness-105 active:scale-95 px-2.5 py-1 rounded-xl font-black border border-amber-500 flex items-center gap-1 shadow-2xs"
              title={isHindi ? 'नाम जप, लघु जप या चालीसा बदलें' : 'Change Sadhana'}
            >
              <span>🔄</span>
              <span>{isHindi ? 'साधना बदलें' : 'Change'}</span>
            </button>
            <button
              type="button"
              onClick={() => setShowAddMantraModal(true)}
              className="text-[10.5px] text-orange-950 bg-amber-200/90 hover:bg-amber-300 active:scale-95 px-2.5 py-1 rounded-xl font-black border border-amber-400 flex items-center gap-1 shadow-2xs"
              title={isHindi ? 'नया मंत्र जोड़ें या बदलें' : 'Add or Change Mantra'}
            >
              <span>✍️</span>
              <span>{isHindi ? 'मंत्र जोड़ें / बदलें' : 'Set Mantra'}</span>
            </button>
            <button
              type="button"
              onClick={() => setShowMudraModal(true)}
              className="text-[10px] text-orange-800 bg-orange-100/90 hover:bg-orange-200 px-2 py-1 rounded-xl font-bold border border-orange-200 flex items-center gap-1"
            >
              <span>🖐️</span>
              <span>{isHindi ? 'करमाला' : 'Kar-Mala'}</span>
            </button>
            <button
              type="button"
              onClick={() => setShowHistoryModal(true)}
              className="text-[10px] text-amber-900 bg-amber-100/90 hover:bg-amber-200 px-2 py-1 rounded-xl font-bold border border-amber-300 flex items-center gap-1 active:scale-95"
              title={isHindi ? 'साधना इतिहास देखें' : 'View Chanting History'}
            >
              <span>📜</span>
              <span>{isHindi ? 'इतिहास' : 'History'}</span>
            </button>
          </div>
        </div>

        {/* Sanskrit Mantra Text */}
        <div className="max-h-28 sm:max-h-36 overflow-y-auto bg-white/95 p-2.5 rounded-xl border border-orange-200 shadow-inner scrollbar-thin">
          <p className="text-base sm:text-lg font-bold font-sanskrit text-amber-950 leading-relaxed break-words whitespace-pre-line text-center">
            {mantra.text}
          </p>
        </div>
      </div>

      {/* 2.5 SACRED JAP MODE SELECTOR & INDEPENDENT VOICE SWITCH */}
      <div className="w-full bg-gradient-to-r from-orange-100/95 via-amber-50 to-orange-100/95 border border-orange-300/80 rounded-2xl p-2 shadow-2xs mb-2 space-y-1.5">
        {/* Mode Selector: Exactly ONE is active ('tap' OR 'timer') */}
        <div className="grid grid-cols-2 gap-1.5 text-xs font-black">
          <button
            type="button"
            onClick={() => handleSelectMode('tap')}
            className={`py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
              countingMode === 'tap'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-sm ring-1 ring-amber-300'
                : 'text-orange-950 hover:bg-white/70 bg-white/50 border border-orange-200'
            }`}
          >
            <span className="text-sm">👆</span>
            <span>{isHindi ? 'स्पर्श जप (Tap Mode)' : 'Tap Counting'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectMode('timer')}
            className={`py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
              countingMode === 'timer'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-sm ring-1 ring-amber-300'
                : 'text-orange-950 hover:bg-white/70 bg-white/50 border border-orange-200'
            }`}
          >
            <Clock className="w-4 h-4 text-amber-300" />
            <span>{isHindi ? `समय आधारित (${timerInterval}s)` : `Timer Mode (${timerInterval}s)`}</span>
          </button>
        </div>

        {/* If AUTO TIMER mode is selected: Clean Stepper & Duration Sync */}
        {countingMode === 'timer' && (
          <div className="mt-1.5 pt-1.5 border-t border-orange-200/80 flex items-center justify-between px-1 gap-2 animate-fadeIn">
            {/* Quick Stepper [-] [Xs] [+] */}
            <div className="flex items-center gap-1 bg-white border border-orange-300 px-1.5 py-0.5 rounded-xl shadow-2xs">
              <button
                type="button"
                onClick={() => handleStepInterval(-1)}
                disabled={timerInterval <= 1}
                className="p-1 rounded hover:bg-orange-100 active:scale-90 text-orange-900 disabled:opacity-30"
                title={isHindi ? 'घटाएं' : '-1s'}
              >
                <Minus className="w-3 h-3 stroke-[3]" />
              </button>
              <span className="text-xs font-black text-orange-900 min-w-[28px] text-center">
                {timerInterval}s
              </span>
              <button
                type="button"
                onClick={() => handleStepInterval(1)}
                disabled={timerInterval >= 60}
                className="p-1 rounded hover:bg-orange-100 active:scale-90 text-orange-900 disabled:opacity-30"
                title={isHindi ? 'बढ़ाएं' : '+1s'}
              >
                <Plus className="w-3 h-3 stroke-[3]" />
              </button>
            </div>

            {/* Smart Mantra Recitation Duration Sync Button */}
            {timerInterval === recommendedMantraSeconds ? (
              <span className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white font-bold text-[11px] shrink-0 flex items-center gap-1 shadow-2xs">
                <Check className="w-3 h-3 stroke-[3]" />
                <span>{isHindi ? `मंत्र अनुसार (${recommendedMantraSeconds}s)` : `Synced (${recommendedMantraSeconds}s)`}</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => handleChangeInterval(recommendedMantraSeconds)}
                className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-[11px] shrink-0 active:scale-95 shadow-2xs flex items-center gap-1"
                title={isHindi ? 'मंत्र उच्चारण समय अनुसार सेट करें' : 'Set to mantra duration'}
              >
                <span>⚡</span>
                <span>{isHindi ? `मंत्र अनुसार (${recommendedMantraSeconds}s)` : `Auto (${recommendedMantraSeconds}s)`}</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* 3. ROTATING MALA ROSARY (108 physical beads turning smoothly in sync with mantra time!) */}
      <RotatingMalaRosary
        currentBead={currentBead}
        completedMalas={completedMalasInSession}
        targetMalas={targetMalas}
        beadType={selectedMalaBead}
        onBeadTap={handleCentralAction}
        isAutoRunning={countingMode === 'timer' && isTimerRunning}
        isSpeaking={isSpeakingNow}
        mantraText={mantra.text}
        timerInterval={timerInterval}
        timerSecondsLeft={timerSecondsLeft}
        chantProgress={chantProgress}
      />

      {/* 4. MODE CONTROLS: Timer (Auto) OR Tap (Manual) */}
      <div className="w-full max-w-[340px] flex items-center justify-center gap-2 mt-2">
        {countingMode === 'timer' ? (
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className={`w-full py-4 px-4 rounded-2xl font-black text-sm sm:text-base shadow-2xl flex items-center justify-center gap-2.5 transition-all active:scale-95 ${
              isTimerRunning
                ? 'bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 text-white ring-4 ring-red-300/60'
                : 'bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 text-white ring-4 ring-emerald-300/60 hover:brightness-105'
            }`}
          >
            {isTimerRunning ? (
              <>
                <Pause className="w-5 h-5 fill-white" />
                <span className="flex items-center gap-1.5">
                  <span>{isHindi ? 'ऑटो जाप रोकें' : 'Pause Auto Chant'}</span>
                  <span className="bg-black/30 px-2 py-0.5 rounded-lg text-xs font-mono">
                    {timerSecondsLeft}s
                  </span>
                </span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-white" />
                <span>
                  {isHindi
                    ? `स्वतः जाप आरंभ करें (${timerInterval}s)`
                    : `Start Auto Chant (${timerInterval}s)`}
                </span>
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={incrementCount}
            className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black text-sm sm:text-base shadow-xl hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span className="text-xl">👆</span>
            <span>
              {isHindi ? 'मनका स्पर्श करें व जपें' : 'Tap to Count Bead'}
            </span>
          </button>
        )}
      </div>

      {/* 5.5 CUSTOM TIMER INTERVAL MODAL */}
      {showCustomIntervalModal && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FFFDF9] w-full max-w-xs rounded-2xl shadow-xl border-2 border-amber-400 overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-orange-700 to-amber-700 text-white p-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Timer className="w-4 h-4 text-amber-200" />
                <h3 className="text-sm font-bold text-amber-100">
                  {isHindi ? 'समय अंतराल (सेकंड)' : 'Timer Interval'}
                </h3>
              </div>
              <button
                onClick={() => setShowCustomIntervalModal(false)}
                className="p-1 rounded-full hover:bg-white/20 active:scale-90 text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 space-y-3">
              <button
                type="button"
                onClick={() => setCustomSecondsInput(recommendedMantraSeconds.toString())}
                className="w-full py-1.5 px-2 bg-amber-100 hover:bg-amber-200 text-orange-950 rounded-xl border border-amber-300 text-xs font-bold flex items-center justify-between active:scale-95 transition-all"
              >
                <span>⚡ {isHindi ? 'मंत्र उच्चारण समय:' : 'Mantra chant time:'}</span>
                <span className="font-black text-orange-800">{recommendedMantraSeconds}s</span>
              </button>

              {/* Input row */}
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={customSecondsInput}
                  onChange={(e) => setCustomSecondsInput(e.target.value)}
                  className="flex-1 bg-white border border-orange-300 rounded-xl px-3 py-2 text-center text-lg font-black text-orange-950 focus:outline-none focus:border-orange-500 shadow-inner"
                  placeholder="3"
                />
                <span className="text-xs font-bold text-orange-900">
                  {isHindi ? 'सेकंड' : 'sec'}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowCustomIntervalModal(false)}
                  className="py-2 rounded-xl border border-orange-300 text-orange-950 font-bold text-xs hover:bg-orange-50"
                >
                  {isHindi ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const parsed = parseInt(customSecondsInput, 10);
                    if (!isNaN(parsed) && parsed >= 1 && parsed <= 120) {
                      handleChangeInterval(parsed);
                    }
                    setShowCustomIntervalModal(false);
                  }}
                  className="py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black text-xs shadow-md hover:brightness-105 active:scale-95"
                >
                  {isHindi ? 'सेव करें' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. SIDDHI CERTIFICATE MODAL */}
      {showCertificateModal && (
        <SiddhiCertificateModal
          userProfile={userProfile}
          mantra={mantra}
          completedMalas={completedMalasInSession || targetMalas}
          onClose={() => setShowCertificateModal(false)}
        />
      )}

      {/* 7. KAR-MALA & HASTA MUDRA GUIDE MODAL */}
      {showMudraModal && (
        <KarMalaMudraGuide
          isOpen={showMudraModal}
          onClose={() => setShowMudraModal(false)}
          language={language}
          initialTab="kar_mala"
        />
      )}

      {/* 7.5 SADHANA HISTORY JOURNAL MODAL */}
      {showHistoryModal && (
        <SadhanaHistoryModal
          isOpen={showHistoryModal}
          onClose={() => setShowHistoryModal(false)}
          userProfile={userProfile}
          language={language}
        />
      )}

      {/* 8. ADD CUSTOM OR SELECT MANTRA MODAL */}
      {showAddMantraModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
          <div className="bg-[#FFFDF9] border-2 border-orange-300 rounded-3xl max-w-sm w-full p-4 shadow-2xl space-y-3.5 select-none relative">
            <button
              onClick={() => setShowAddMantraModal(false)}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-orange-100 text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <span className="text-2xl p-2 rounded-2xl bg-orange-100 inline-block mb-1 shadow-2xs">✍️</span>
              <h3 className="text-sm sm:text-base font-black text-orange-950">
                {isHindi ? 'मंत्र निर्धारित करें या नया जोड़ें' : 'Set or Add Chanting Mantra'}
              </h3>
              <p className="text-[11px] text-orange-800">
                {isHindi ? 'लाइब्रेरी से चुनें या अपना व्यक्तिगत सिद्ध मंत्र दर्ज करें' : 'Choose from library or enter custom mantra'}
              </p>
            </div>

            {/* Quick Option 1: Choose from Mantra Library */}
            {onNavigateToTab && (
              <button
                type="button"
                onClick={() => {
                  setShowAddMantraModal(false);
                  onNavigateToTab('mantra');
                }}
                className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black text-xs shadow-sm hover:from-amber-600 hover:to-orange-700 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>📜</span>
                <span>{isHindi ? 'समस्त मंत्र संग्रह लाइब्रेरी खोलें' : 'Browse All Mantra Categories'}</span>
              </button>
            )}

            <div className="flex items-center gap-2 my-1">
              <div className="h-px bg-orange-200 flex-1" />
              <span className="text-[10px] font-bold text-gray-400 uppercase">{isHindi ? 'अथवा अपना मंत्र लिखें' : 'Or Enter Custom'}</span>
              <div className="h-px bg-orange-200 flex-1" />
            </div>

            {/* Quick Option 2: Enter Custom Mantra */}
            <div className="space-y-2 text-left">
              <div>
                <label className="text-[11px] font-bold text-orange-950 block mb-0.5">
                  {isHindi ? 'मंत्र का नाम (उदा. मेरा गुरु मंत्र / गायत्री मंत्र):' : 'Mantra Title:'}
                </label>
                <input
                  type="text"
                  value={customMantraName}
                  onChange={(e) => setCustomMantraName(e.target.value)}
                  placeholder={isHindi ? 'उदा. मेरा विशेष जप मंत्र' : 'e.g. My Personal Mantra'}
                  className="w-full px-3 py-2 rounded-xl border border-orange-300 font-bold text-xs text-orange-950 bg-orange-50/50 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-orange-950 block mb-0.5">
                  {isHindi ? 'मंत्र पाठ (श्लोक / नामावली / बीज मंत्र):' : 'Mantra Text:'}
                </label>
                <textarea
                  rows={3}
                  value={customMantraText}
                  onChange={(e) => setCustomMantraText(e.target.value)}
                  placeholder={isHindi ? 'उदा. ॐ नमः शिवाय अथवा ॐ हं हनुमते नमः...' : 'Enter the complete mantra chant...'}
                  className="w-full px-3 py-2 rounded-xl border border-orange-300 font-bold font-sanskrit text-sm text-orange-950 bg-orange-50/50 focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none"
                />
              </div>

              <button
                type="button"
                disabled={!customMantraText.trim()}
                onClick={handleSaveCustomMantra}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-black text-xs shadow-md hover:from-emerald-700 hover:to-green-700 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                <span>📿</span>
                <span>{isHindi ? 'यह मंत्र माला पर सेट करें' : 'Set on Rosary Mala'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

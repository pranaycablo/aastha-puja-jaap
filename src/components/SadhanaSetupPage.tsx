import React, { useState } from 'react';
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
import {
  Sliders,
  Clock,
  Touchpad,
  Volume1,
  Volume2,
  Music,
  Waves,
  Play,
  Check,
  ArrowLeft,
  Sparkles,
  Flame,
  User,
  Mic,
  RotateCcw,
  Copy,
  QrCode,
  Heart,
  Edit3
} from 'lucide-react';

interface SadhanaSetupPageProps {
  mantra: MantraItem;
  userProfile: UserProfile;
  targetMalas: number;
  onUpdateTargetMalas: (malas: number) => void;
  countingMode: CountingMode;
  onUpdateCountingMode: (mode: CountingMode) => void;
  timerInterval: number;
  onUpdateTimerInterval: (sec: number) => void;
  speechSpeed: number;
  onUpdateSpeechSpeed: (speed: number) => void;
  bellVolume: number;
  shankhVolume: number;
  voiceVolume: number;
  onUpdateVolumes: (bell: number, shankh: number, voice: number) => void;
  isBellEnabled: boolean;
  onToggleBell: (enabled: boolean) => void;
  isShankhEnabled: boolean;
  onToggleShankh: (enabled: boolean) => void;
  selectedBell: BellSoundType;
  selectedShankh: ShankhSoundType;
  onSelectBell: (b: BellSoundType) => void;
  onSelectShankh: (s: ShankhSoundType) => void;
  selectedMalaBead: MalaBeadVisualType;
  onSelectMalaBead: (m: MalaBeadVisualType) => void;
  activeAmbience: AmbienceSoundType;
  onSelectAmbience: (a: AmbienceSoundType) => void;
  isVoiceChantingEnabled: boolean;
  onToggleVoiceChanting: (enabled: boolean) => void;
  selectedVoiceProfile: VoiceProfileId;
  onSelectVoiceProfile: (v: VoiceProfileId) => void;
  onBackToMantraSelect: () => void;
  onProceedToJaap: () => void;
  onOpenProfileSetup?: () => void;
  language?: LanguageCode;
}

const POPULAR_MALA_TARGETS = [1, 3, 11, 21, 51, 108];
const POPULAR_INTERVALS = [2, 3, 5, 8, 10, 15, 30];

export const SadhanaSetupPage: React.FC<SadhanaSetupPageProps> = ({
  mantra,
  userProfile,
  targetMalas,
  onUpdateTargetMalas,
  countingMode,
  onUpdateCountingMode,
  timerInterval,
  onUpdateTimerInterval,
  speechSpeed,
  onUpdateSpeechSpeed,
  bellVolume,
  shankhVolume,
  voiceVolume,
  onUpdateVolumes,
  isBellEnabled,
  onToggleBell,
  isShankhEnabled,
  onToggleShankh,
  selectedBell,
  selectedShankh,
  onSelectBell,
  onSelectShankh,
  selectedMalaBead,
  onSelectMalaBead,
  activeAmbience,
  onSelectAmbience,
  isVoiceChantingEnabled,
  onToggleVoiceChanting,
  selectedVoiceProfile,
  onSelectVoiceProfile,
  onBackToMantraSelect,
  onProceedToJaap,
  onOpenProfileSetup,
  language = 'hi'
}) => {
  const t = getTranslations(language);
  const soundStylesList = language === 'hi' ? SOUND_STYLES : SOUND_STYLES_EN;

  const [previewingId, setPreviewingId] = useState<string | null>(null);
  const [isPlayingTestVoice, setIsPlayingTestVoice] = useState<boolean>(false);
  const [customMalaInput, setCustomMalaInput] = useState<string>('');
  const [voiceGenderFilter, setVoiceGenderFilter] = useState<'all' | 'male' | 'female' | 'child'>('all');
  const [previewingVoiceId, setPreviewingVoiceId] = useState<VoiceProfileId | null>(null);
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);
  const [selectedDonationAmt, setSelectedDonationAmt] = useState<number>(101);

  const handleCopyUPI = (upiId: string = 'divyajaap@upi') => {
    try {
      navigator.clipboard.writeText(upiId);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 3000);
    } catch (e) {
      console.warn('Clipboard error:', e);
    }
  };

  const recommendedMantraSeconds = calculateMantraRecommendedDuration(mantra.text, speechSpeed);

  // Stop voice and preview sounds when leaving setup
  React.useEffect(() => {
    return () => {
      ttsEngine.stop();
    };
  }, []);

  const bellSounds = soundStylesList.filter((s) => s.type === 'bell');
  const shankhSounds = soundStylesList.filter((s) => s.type === 'shankh');

  const handlePreviewOmVoice = (profileId: VoiceProfileId) => {
    if (previewingVoiceId === profileId) {
      ttsEngine.stop();
      setPreviewingVoiceId(null);
    } else {
      setPreviewingVoiceId(profileId);
      ttsEngine.vocalizeSacredOm(profileId, voiceVolume, () => {
        setPreviewingVoiceId(null);
      });
    }
  };

  const handlePreviewVoiceProfile = (profileId: VoiceProfileId) => {
    if (previewingVoiceId === profileId) {
      ttsEngine.stop();
      setPreviewingVoiceId(null);
    } else {
      setPreviewingVoiceId(profileId);
      const textToSpeak = mantra.text || (language === 'hi' ? 'ॐ नमः शिवाय' : 'Om Namah Shivaya');
      ttsEngine.speakMantra(textToSpeak, {
        volume: voiceVolume,
        rate: speechSpeed,
        voiceProfileId: profileId,
        lang: language,
        onEnd: () => setPreviewingVoiceId(null),
        onError: () => setPreviewingVoiceId(null)
      });
    }
  };

  const handlePreview = (type: 'bell' | 'shankh', id: string) => {
    setPreviewingId(id);
    if (type === 'bell') {
      audioEngine.playTempleBell(id as BellSoundType, bellVolume);
      setTimeout(() => setPreviewingId(null), 1800);
    } else {
      audioEngine.playShankhSound(id as ShankhSoundType, shankhVolume);
      setTimeout(() => setPreviewingId(null), 3200);
    }
  };

  const handleTestVoice = () => {
    if (isPlayingTestVoice) {
      ttsEngine.stop();
      setIsPlayingTestVoice(false);
    } else {
      setIsPlayingTestVoice(true);
      ttsEngine.speakMantra(mantra.text, {
        volume: voiceVolume,
        rate: speechSpeed,
        lang: language,
        onEnd: () => setIsPlayingTestVoice(false),
        onError: () => setIsPlayingTestVoice(false)
      });
    }
  };

  const beadVisualMap: Record<MalaBeadVisualType, { name: string; icon: string }> = {
    rudraksha: { name: t.rudrakshaBead.split('(')[0].trim(), icon: '📿' },
    tulsi: { name: t.tulsiBead.split('(')[0].trim(), icon: '🌿' },
    sphatik: { name: t.sphatikBead.split('(')[0].trim(), icon: '💎' },
    kamalgatta: { name: t.kamalgattaBead.split('(')[0].trim(), icon: '🪷' },
    chandan: { name: t.chandanBead.split('(')[0].trim(), icon: '🪵' }
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col select-none pb-24 animate-fadeIn">
      {/* Top Header & Back Navigation */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={onBackToMantraSelect}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-100/80 text-orange-950 font-bold text-xs hover:bg-orange-200 transition-all border border-orange-200 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-orange-600" />
          <span>{language === 'hi' ? 'मंत्र बदलें' : 'Change Mantra'}</span>
        </button>

        <button
          onClick={onProceedToJaap}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:brightness-105 text-white font-bold text-xs shadow-md transition-all active:scale-95 ring-1 ring-emerald-400"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{language === 'hi' ? 'जाप आरंभ करें 🔱' : 'Start Jaap 🔱'}</span>
        </button>
      </div>

      {/* 0. SADHAK PROFILE CARD & SETUP */}
      <div className="bg-gradient-to-r from-amber-100/90 via-orange-100/80 to-amber-100/90 border-2 border-orange-300 rounded-3xl p-3.5 sm:p-4 shadow-sm mb-3.5">
        <div className="flex items-center justify-between border-b border-orange-200 pb-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-orange-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
              🕉️
            </span>
            <div>
              <h3 className="text-sm font-black text-orange-950">
                {userProfile.name && userProfile.name !== 'साधक' ? userProfile.name : (language === 'hi' ? 'दैनिक प्रोफ़ाइल' : 'Spiritual Profile')}
              </h3>
              <p className="text-[10.5px] text-orange-800 font-bold">
                {language === 'hi' ? 'गोत्र:' : 'Gotra:'} {userProfile.gotra || 'सर्वगोत्र'} • {language === 'hi' ? 'इष्ट:' : 'Isht:'} {userProfile.ishtDevta || 'महादेव'}
              </p>
            </div>
          </div>

          {onOpenProfileSetup && (
            <button
              onClick={onOpenProfileSetup}
              className="px-3 py-1.5 rounded-xl bg-white border border-orange-300 text-orange-950 font-black text-xs hover:bg-orange-50 active:scale-95 transition-all shadow-2xs flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5 text-orange-600" />
              <span>{language === 'hi' ? 'संपादित करें' : 'Edit'}</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 rounded-xl bg-white/80 border border-orange-200">
            <span className="text-[10px] text-gray-500 font-bold block">{language === 'hi' ? 'दैनिक लक्ष्य' : 'Target'}</span>
            <span className="font-black text-orange-950">{userProfile.dailyTargetMalas || targetMalas} {language === 'hi' ? 'माला' : 'Malas'}</span>
          </div>
          <div className="p-2 rounded-xl bg-white/80 border border-orange-200">
            <span className="text-[10px] text-gray-500 font-bold block">{language === 'hi' ? 'साधना स्तर' : 'Level'}</span>
            <span className="font-black text-orange-950">{userProfile.sadhanaLevel === 'advanced' ? (language === 'hi' ? 'सिद्ध' : 'Siddha') : (language === 'hi' ? 'नित्य' : 'Regular')}</span>
          </div>
          <div className="p-2 rounded-xl bg-white/80 border border-orange-200">
            <span className="text-[10px] text-gray-500 font-bold block">{language === 'hi' ? 'जन्म तिथि' : 'DOB'}</span>
            <span className="font-black text-orange-950 text-[11px] truncate">{userProfile.dob || 'दर्ज करें'}</span>
          </div>
        </div>
      </div>

      {/* Selected Mantra Banner */}
      <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border-2 border-orange-300 rounded-3xl p-4 shadow-sm mb-4 text-center">
        <span className="text-[10px] font-bold text-orange-800 uppercase tracking-wider block mb-1">
          {language === 'hi' ? 'जाप हेतु निर्धारित सिद्ध मंत्र' : 'Mantra Chosen for Chanting'}
        </span>
        <h3 className="text-base font-bold text-orange-950 mb-1">
          {mantra.name}
        </h3>
        <p className="text-sm sm:text-base font-bold font-sanskrit text-amber-950 leading-relaxed bg-white/80 p-3 rounded-2xl border border-orange-200 shadow-inner">
          {mantra.text}
        </p>
      </div>

      {/* 1. MALA TARGET SECTION */}
      <div className="bg-white border border-orange-200 rounded-2xl p-3.5 shadow-2xs mb-3">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-orange-950 flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-orange-600" />
            <span>{language === 'hi' ? 'माला लक्ष्य:' : 'Mala Target:'}</span>
          </h4>
          <span className="text-xs font-black text-orange-800 bg-orange-100 px-2 py-0.5 rounded-lg">
            {targetMalas} {t.malaLabel} ({targetMalas * 108})
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2">
          {POPULAR_MALA_TARGETS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => onUpdateTargetMalas(m)}
              className={`py-1.5 rounded-xl text-xs font-bold transition-all border ${
                targetMalas === m
                  ? 'bg-orange-600 text-white border-orange-700 shadow-sm ring-1 ring-orange-400'
                  : 'bg-orange-50/60 text-orange-950 border-orange-200 hover:bg-orange-100'
              }`}
            >
              {m} {t.malaLabel}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-1.5 border-t border-orange-100">
          <span className="text-xs text-gray-600 font-semibold shrink-0">
            {language === 'hi' ? 'अन्य संख्या:' : 'Custom:'}
          </span>
          <input
            type="number"
            min="1"
            max="100000"
            placeholder={language === 'hi' ? 'उदा. ५, २५' : 'e.g. 5, 25'}
            value={customMalaInput}
            onChange={(e) => setCustomMalaInput(e.target.value)}
            className="flex-1 px-2.5 py-1 rounded-xl border border-orange-300 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          <button
            type="button"
            onClick={() => {
              const val = parseInt(customMalaInput, 10);
              if (val > 0) onUpdateTargetMalas(val);
            }}
            className="px-3 py-1 rounded-xl bg-orange-600 text-white font-bold text-xs shadow-2xs hover:bg-orange-700"
          >
            {t.save}
          </button>
        </div>
      </div>

      {/* 2. COUNTING MODE SELECTION */}
      <div className="bg-white border border-orange-200 rounded-2xl p-3.5 shadow-2xs mb-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-orange-950 mb-2 flex items-center gap-1.5">
          <Touchpad className="w-4 h-4 text-orange-600" />
          <span>{language === 'hi' ? 'जाप विधि:' : 'Counting Mode:'}</span>
        </h4>

        <div className="grid grid-cols-2 gap-2 mb-2">
          <button
            type="button"
            onClick={() => onUpdateCountingMode('tap')}
            className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
              countingMode === 'tap'
                ? 'bg-orange-600 text-white border-orange-700 shadow-sm ring-1 ring-orange-400'
                : 'bg-orange-50/60 border-orange-200 text-orange-950 hover:bg-orange-100'
            }`}
          >
            <Touchpad className="w-5 h-5" />
            <span className="text-xs font-black">{language === 'hi' ? 'स्पर्श जप (Tap Mode)' : 'Tap Counting'}</span>
          </button>

          <button
            type="button"
            onClick={() => onUpdateCountingMode('timer')}
            className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
              countingMode === 'timer'
                ? 'bg-orange-600 text-white border-orange-700 shadow-sm ring-1 ring-orange-400'
                : 'bg-orange-50/60 border-orange-200 text-orange-950 hover:bg-orange-100'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span className="text-xs font-black">{language === 'hi' ? 'समय आधारित (Timer Mode)' : 'Timer Counting'}</span>
          </button>
        </div>

        {/* Timer Interval selector if Timer chosen */}
        {countingMode === 'timer' && (
          <div className="pt-2 border-t border-orange-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-gray-700">
                {language === 'hi' ? 'मंत्र उच्चारण अनुसार समय:' : 'Mantra recitation pace:'}
              </span>
              <button
                type="button"
                onClick={() => onUpdateTimerInterval(recommendedMantraSeconds)}
                className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black transition-all flex items-center gap-1 ${
                  timerInterval === recommendedMantraSeconds
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-orange-600 text-white hover:brightness-105'
                }`}
                title={language === 'hi' ? 'पूर्ण मंत्र उच्चारण अनुसार ऑटो सेट करें' : 'Auto set to full chant duration'}
              >
                <span>⚡</span>
                <span>{recommendedMantraSeconds}s {language === 'hi' ? '(पूर्ण उच्चारण)' : '(Full Chant)'}</span>
              </button>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {POPULAR_INTERVALS.map((sec) => (
                <button
                  key={sec}
                  type="button"
                  onClick={() => onUpdateTimerInterval(sec)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    timerInterval === sec
                      ? 'bg-orange-600 text-white shadow'
                      : 'bg-orange-100/70 text-orange-950 hover:bg-orange-200'
                  }`}
                >
                  {sec}s
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Mode options ends */}
      </div>

      {/* 3. VOLUMES & SOUND SELECTION */}
      <div className="bg-white border border-orange-200 rounded-2xl p-3.5 shadow-2xs mb-3 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-orange-950 flex items-center gap-1.5">
            <Volume2 className="w-4 h-4 text-orange-600" />
            <span>{language === 'hi' ? 'ध्वनि सेटिंग्स:' : 'Sound Settings:'}</span>
          </h4>
          <button
            type="button"
            onClick={() => {
              const allOn = !isBellEnabled || !isShankhEnabled;
              onToggleBell(allOn);
              onToggleShankh(allOn);
            }}
            className={`px-2.5 py-1 rounded-xl text-[10px] font-bold border transition-all ${
              !isBellEnabled && !isShankhEnabled
                ? 'bg-red-100 text-red-900 border-red-300'
                : 'bg-orange-100 text-orange-950 border-orange-200'
            }`}
          >
            {!isBellEnabled && !isShankhEnabled
              ? (language === 'hi' ? '🔇 सभी मूक' : '🔇 Muted')
              : (language === 'hi' ? 'मूक करें' : 'Mute All')}
          </button>
        </div>

        {/* Bell Slider & Style Selector */}
        <div className="bg-orange-50/70 p-3 rounded-2xl border border-orange-200">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-orange-950 flex items-center gap-1">
              <span>🔔</span>
              <span>{language === 'hi' ? 'मंदिर घंटी:' : 'Temple Bell:'}</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-orange-800">
                {isBellEnabled ? `${Math.round(bellVolume * 100)}%` : (language === 'hi' ? 'मूक' : 'Off')}
              </span>
              <button
                type="button"
                onClick={() => onToggleBell(!isBellEnabled)}
                className={`px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold transition-all ${
                  isBellEnabled
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-gray-300 text-gray-700'
                }`}
              >
                {isBellEnabled ? (language === 'hi' ? 'चालू' : 'ON') : (language === 'hi' ? 'बंद' : 'OFF')}
              </button>
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isBellEnabled ? bellVolume : 0}
            disabled={!isBellEnabled}
            onChange={(e) => onUpdateVolumes(parseFloat(e.target.value), shankhVolume, voiceVolume)}
            className="w-full accent-orange-600 h-2 bg-orange-200 rounded-lg cursor-pointer mb-2 disabled:opacity-40"
          />

          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
            {language === 'hi' ? 'घंटी प्रकार:' : 'Bell Type:'}
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {bellSounds.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => {
                  onSelectBell(b.id as BellSoundType);
                  handlePreview('bell', b.id);
                }}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1 ${
                  selectedBell === b.id
                    ? 'bg-orange-600 text-white shadow-sm ring-1 ring-orange-500'
                    : 'bg-white text-orange-950 border border-orange-200 hover:bg-orange-100'
                }`}
              >
                <span>{b.icon}</span>
                <span>{b?.title ? b.title.split('(')[0].trim() : ''}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Shankh Slider & Style Selector */}
        <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-200">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-orange-950 flex items-center gap-1">
              <span>🐚</span>
              <span>{language === 'hi' ? 'शंखनाद (१०८ मनके पूर्ण):' : 'Shankh on 108:'}</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-orange-800">
                {isShankhEnabled ? `${Math.round(shankhVolume * 100)}%` : (language === 'hi' ? 'मूक' : 'Off')}
              </span>
              <button
                type="button"
                onClick={() => onToggleShankh(!isShankhEnabled)}
                className={`px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold transition-all ${
                  isShankhEnabled
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-gray-300 text-gray-700'
                }`}
              >
                {isShankhEnabled ? (language === 'hi' ? 'चालू' : 'ON') : (language === 'hi' ? 'बंद' : 'OFF')}
              </button>
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isShankhEnabled ? shankhVolume : 0}
            disabled={!isShankhEnabled}
            onChange={(e) => onUpdateVolumes(bellVolume, parseFloat(e.target.value), voiceVolume)}
            className="w-full accent-orange-600 h-2 bg-amber-200 rounded-lg cursor-pointer mb-2 disabled:opacity-40"
          />

          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
            {language === 'hi' ? 'शंख प्रकार:' : 'Shankh Type:'}
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {shankhSounds.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  onSelectShankh(s.id as ShankhSoundType);
                  handlePreview('shankh', s.id);
                }}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1 ${
                  selectedShankh === s.id
                    ? 'bg-orange-600 text-white shadow-sm ring-1 ring-orange-500'
                    : 'bg-white text-orange-950 border border-orange-200 hover:bg-orange-100'
                }`}
              >
                <span>{s.icon}</span>
                <span>{s?.title ? s.title.split('(')[0].trim() : ''}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. MALA BEAD STYLE & SACRED AMBIENCE */}
      <div className="bg-white border-2 border-orange-200 rounded-3xl p-4 shadow-sm mb-4 space-y-3">
        {/* Rosary Bead Type */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-orange-950 mb-2 flex items-center gap-1.5">
            <span>📿</span>
            <span>{language === 'hi' ? 'पावन माला स्वरूप:' : 'Mala Rosary Type:'}</span>
          </h4>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {(['rudraksha', 'tulsi', 'sphatik', 'kamalgatta', 'chandan'] as MalaBeadVisualType[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => onSelectMalaBead(m)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1 ${
                  selectedMalaBead === m
                    ? 'bg-orange-600 text-white shadow-sm ring-2 ring-orange-400'
                    : 'bg-orange-50/60 border border-orange-200 text-orange-950 hover:bg-orange-100'
                }`}
              >
                <span>{beadVisualMap[m].icon}</span>
                <span>{beadVisualMap[m].name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sacred Ambience */}
        <div className="pt-2 border-t border-orange-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-orange-950 mb-2 flex items-center gap-1.5">
            <Waves className="w-4 h-4 text-orange-600" />
            <span>{language === 'hi' ? 'अखंड पार्श्व ध्यान वातावरण:' : 'Sacred Ambience:'}</span>
          </h4>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { id: 'none', label: language === 'hi' ? 'मूक (बंद)' : 'Off', icon: '⏹️' },
              { id: 'omkar', label: 'ॐकार', icon: '🕉️' },
              { id: 'tanpura', label: language === 'hi' ? 'तानपुरा' : 'Tanpura', icon: '🪕' },
              { id: 'ganga', label: language === 'hi' ? 'गंगाजल' : 'Ganga', icon: '🌊' }
            ].map((amb) => (
              <button
                key={amb.id}
                type="button"
                onClick={() => onSelectAmbience(amb.id as AmbienceSoundType)}
                className={`py-2 px-1 rounded-xl text-xs font-bold text-center transition-all ${
                  activeAmbience === amb.id
                    ? 'bg-orange-600 text-white shadow-md ring-1 ring-orange-500'
                    : 'bg-orange-50/60 border border-orange-200 text-orange-950 hover:bg-orange-100'
                }`}
              >
                <div>{amb.icon}</div>
                <div className="text-[10px] mt-0.5 truncate">{amb.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5. SANSTHA DONATION & SEVA SECTION */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 border-2 border-orange-300 rounded-3xl p-4 shadow-sm mb-4 space-y-3 text-center">
        <div className="flex items-center justify-center gap-2 text-orange-950">
          <Heart className="w-5 h-5 text-red-600 fill-red-600" />
          <h3 className="text-sm font-black tracking-wide">
            {language === 'hi' ? 'संस्था दान एवं धर्मार्थ सेवा (Sanstha Donation)' : 'Sanstha Donation & Divine Seva'}
          </h3>
        </div>
        <p className="text-[11px] text-gray-700 font-medium max-w-sm mx-auto leading-relaxed">
          {language === 'hi'
            ? 'दिव्य जप आध्यात्मिक सेवा ट्रस्ट • आपके द्वारा दी गई सहयोग राशि सनातन संस्कृति के संरक्षण, वेद पाठशाला, गौ सेवा एवं आश्रम विस्तार में समर्पित की जाती है।'
            : 'Support Sanatan culture, Vedic school, cow care & spiritual ashram services.'}
        </p>

        {/* AUTHENTIC SANSTHA QR CODE (User uploaded verified QR) */}
        <div className="p-3 bg-white border-2 border-orange-300 rounded-2xl shadow-sm inline-block mx-auto">
          <img
            src="/sanstha_donation_qr.jpg"
            alt="Sanstha UPI QR Code"
            className="w-48 h-48 object-contain mx-auto rounded-xl"
          />
          <span className="text-[10px] font-bold text-gray-500 block mt-1">
            {language === 'hi' ? 'किसी भी UPI ऐप (GPay, PhonePe, Paytm, BHIM) से स्कैन करें' : 'Scan via Any UPI App'}
          </span>
        </div>

        {/* Quick Amount Selector Chips */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          {[51, 101, 251, 501, 1100, 2100].map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => setSelectedDonationAmt(amt)}
              className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                selectedDonationAmt === amt
                  ? 'bg-orange-600 text-white shadow-xs ring-1 ring-orange-500'
                  : 'bg-white border border-orange-300 text-orange-950 hover:bg-orange-100'
              }`}
            >
              ₹{amt}
            </button>
          ))}
        </div>

        {/* UPI ID & COPY */}
        <div className="max-w-xs mx-auto flex items-center justify-between p-2 bg-white/90 border border-orange-300 rounded-xl text-xs font-mono">
          <span className="font-bold text-orange-950 truncate">aasthajaap@upi</span>
          <button
            onClick={() => handleCopyUPI('aasthajaap@upi')}
            className="px-2.5 py-1 bg-orange-100 rounded-lg border border-orange-300 font-sans font-bold text-[10px] text-orange-900 hover:bg-orange-200 active:scale-95 flex items-center gap-1"
          >
            {copiedUpi ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            <span>{language === 'hi' ? 'कॉपी हुआ' : 'Copied'}</span>
          </button>
        </div>

        {/* Direct UPI Intent Link */}
        <div className="pt-1">
          <a
            href={`upi://pay?pa=aasthajaap@upi&pn=Aastha%20Puja%20Sanstha&am=${selectedDonationAmt}&tn=Sanstha%20Seva%20Dan&cu=INR`}
            className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-black text-xs shadow-md hover:from-emerald-700 hover:to-green-700 active:scale-95 transition-all"
          >
            <QrCode className="w-4 h-4" />
            <span>{language === 'hi' ? `UPI ऐप से ₹${selectedDonationAmt} दान करें` : `Donate ₹${selectedDonationAmt} via UPI`}</span>
          </a>
        </div>
      </div>

      {/* Complete Legal & Spiritual Disclaimer (Liability-Free Assurance) */}
      <div className="bg-amber-50/80 border border-amber-300/80 rounded-2xl p-3.5 shadow-xs mb-3 space-y-1.5 text-left">
        <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
          <span>⚖️</span>
          <span>{language === 'hi' ? 'वैधानिक एवं आध्यात्मिक अस्वीकरण (Legal Disclaimer):' : 'Legal & Spiritual Disclaimer:'}</span>
        </div>
        <p className="text-[10px] text-amber-900/80 leading-relaxed font-normal">
          {language === 'hi'
            ? 'यह ऐप सनातन धर्म, वैदिक ग्रंथों, पौराणिक मंत्रों, पराशरी ज्योतिष एवं चालडियन अंक ज्योतिष के शास्त्रीय सिद्धांतों पर आधारित एक आध्यात्मिक व सांस्कृतिक साधन है। कुण्डली, रत्न, यन्त्र व ज्योतिषीय गणनाएँ केवल श्रद्धा व आत्म-मार्गदर्शन हेतु हैं। यह किसी भी प्रकार की चिकित्सीय (Medical), वित्तीय (Financial) या कानूनी (Legal) गारंटी अथवा विशेषज्ञ सलाह का विकल्प नहीं है। ऐप विकासकर्ता किसी भी व्यक्तिगत निर्णय या परिणाम के प्रति उत्तरदायी नहीं हैं।'
            : 'This app is a spiritual and cultural platform based on Sanatan Dharma and Vedic astrology. All astrological, numerological, yantra, and gemstone guidance is for faith, educational, and personal enrichment only. It is not a substitute for professional medical, financial, or legal advice.'}
        </p>
      </div>

      {/* Prominent Button to Begin Jaap Chanting */}
      <div className="pt-3 pb-24 sm:pb-28">
        <button
          onClick={onProceedToJaap}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 text-white font-black text-base shadow-xl hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 ring-4 ring-emerald-300"
        >
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span>{language === 'hi' ? 'जाप आरंभ करें 🔱' : 'Begin Jaap Chanting 🔱'}</span>
        </button>
      </div>
    </div>
  );
};

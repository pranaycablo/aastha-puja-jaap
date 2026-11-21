import React, { useState, useEffect } from 'react';
import {
  UserProfile,
  MantraItem,
  LanguageCode,
  CountingMode,
  BellSoundType,
  ShankhSoundType,
  MalaBeadVisualType,
  AmbienceSoundType,
  VoiceProfileId
} from './types';
import { PRELOADED_MANTRAS } from './data/mantraDatabase';
import { NetworkGuard } from './components/NetworkGuard';
import { Header } from './components/Header';
import { MantraSelectionPage } from './components/MantraSelectionPage';
import { MantraGuidePage } from './components/MantraGuidePage';
import { SadhanaSetupPage } from './components/SadhanaSetupPage';
import { FullScreenRewardAdModal } from './components/FullScreenRewardAdModal';
import { JaapPage } from './components/JaapPage';
import { SankalpOnboarding, VerificationRedirectTarget } from './components/SankalpOnboarding';
import { NotificationCenterModal } from './components/NotificationCenterModal';
import { AdMobNativeCard } from './components/AdMobNativeCard';
import { AutoUpdateModal } from './components/AutoUpdateModal';
import { BottomNavBar, BottomNavTab } from './components/BottomNavBar';
import { SiddhiStatsPage } from './components/SiddhiStatsPage';
import { SiddhiCertificateModal } from './components/SiddhiCertificateModal';
import { KundaliSamadhanModal, JyotishTabType } from './components/KundaliSamadhanModal';
import { MainLandingPage } from './components/MainLandingPage';
import { AajKaDinModal } from './components/AajKaDinModal';
import { ChalisaSangrahModal } from './components/ChalisaSangrahModal';
import { AartiSangrahModal } from './components/AartiSangrahModal';
import { GranthSangrahModal } from './components/GranthSangrahModal';
import { VedUpanishadModal } from './components/VedUpanishadModal';
import { AnkaGyanModal } from './components/AnkaGyanModal';
import { SacredGranthReaderModal, ScriptureCategory } from './components/SacredGranthReaderModal';
import { DivineMantraSuggestionModal } from './components/DivineMantraSuggestionModal';
import { SevaCommunityModal, SevaTab } from './components/SevaCommunityModal';
import { MantraMahakoshModal } from './components/MantraMahakoshModal';
import { MandirLiveDarshanModal } from './components/MandirLiveDarshanModal';
import { SacredYantraMahakoshModal } from './components/SacredYantraMahakoshModal';
import { RatnaGyanModal } from './components/RatnaGyanModal';
import { SanatanTotkeModal } from './components/SanatanTotkeModal';
import { NaamSamputitMantraModal } from './components/NaamSamputitMantraModal';
import { notificationEngine } from './utils/notificationEngine';
import { updateEngine, UpdateCheckResult } from './utils/updateEngine';
import { calculateMantraRecommendedDuration } from './utils/ttsEngine';
import { scriptureBookmarkManager } from './utils/scriptureBookmarkManager';

const DEFAULT_PROFILE: UserProfile = {
  name: '',
  gotra: '',
  kulDevta: '',
  ishtDevta: 'shiva',
  gender: 'male',
  isProfileSet: false,
  language: 'hi',
  totalMalasCompletedAllTime: 0,
  totalBeadsAllTime: 0,
  dailyStreak: 1
};

function calculateNewStreak(lastJaapDateStr?: string, currentStreak: number = 1): number {
  if (!lastJaapDateStr) return 1;
  try {
    const now = new Date();
    const last = new Date(lastJaapDateStr);
    const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const lastDate = new Date(last.getFullYear(), last.getMonth(), last.getDate()).getTime();
    const diffDays = Math.round((nowDate - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return Math.max(1, currentStreak);
    } else if (diffDays === 1) {
      return Math.max(1, currentStreak) + 1;
    } else {
      return 1;
    }
  } catch {
    return 1;
  }
}

export const App: React.FC = () => {
  // 1. User Profile State
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('divya_jaap_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.language) parsed.language = 'hi';
        return parsed;
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return DEFAULT_PROFILE;
  });

  // 2. Selected Mantras Playlist (Supports Multiple Mantras Chanting & Dynamic Add/Remove)
  const [selectedMantras, setSelectedMantras] = useState<MantraItem[]>(() => {
    try {
      const savedList = localStorage.getItem('divya_jaap_selected_mantras');
      if (savedList) {
        const parsed = JSON.parse(savedList);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      const legacyMantra = localStorage.getItem('divya_jaap_current_mantra');
      if (legacyMantra) return [JSON.parse(legacyMantra)];
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return [PRELOADED_MANTRAS[0]];
  });

  const [activeMantraIndex, setActiveMantraIndex] = useState<number>(0);
  const currentMantra = selectedMantras[activeMantraIndex] || selectedMantras[0] || PRELOADED_MANTRAS[0];

  // 3. Navigation Tab State: 'home' | 'jaap' | 'mantra' | 'setup' | 'siddhi' | 'alerts'
  const [activeTab, setActiveTab] = useState<BottomNavTab>('home');
  const [sessionMalas, setSessionMalas] = useState<number>(0);
  const [sessionBeads, setSessionBeads] = useState<number>(0);
  const [showSiddhiCertModal, setShowSiddhiCertModal] = useState<boolean>(false);

  // 4. Modals State
  const [showOnboarding, setShowOnboarding] = useState<boolean>(!userProfile.isProfileSet);
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [showRewardAd, setShowRewardAd] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [unreadNotifications, setUnreadNotifications] = useState<number>(() => {
    return notificationEngine.getUnreadCount() || 2;
  });
  const [showKundaliModal, setShowKundaliModal] = useState<boolean>(false);
  const [kundaliInitialTab, setKundaliInitialTab] = useState<JyotishTabType>('kundali');
  const [availableUpdate, setAvailableUpdate] = useState<UpdateCheckResult | null>(null);

  // Landing Page Portals Modals State
  const [showAajKaDinModal, setShowAajKaDinModal] = useState<boolean>(false);
  const [showChalisaModal, setShowChalisaModal] = useState<boolean>(false);
  const [showAartiModal, setShowAartiModal] = useState<boolean>(false);
  const [showGranthModal, setShowGranthModal] = useState<boolean>(false);
  const [showVedUpanishadModal, setShowVedUpanishadModal] = useState<boolean>(false);
  const [showAnkaGyanModal, setShowAnkaGyanModal] = useState<boolean>(false);
  const [postProfileRedirect, setPostProfileRedirect] = useState<VerificationRedirectTarget>(null);
  const [showGranthReader, setShowGranthReader] = useState<boolean>(false);
  const [granthReaderCategory, setGranthReaderCategory] = useState<ScriptureCategory>('gita');
  const [showMantraSuggestionModal, setShowMantraSuggestionModal] = useState<boolean>(false);
  const [showMantraMahakoshModal, setShowMantraMahakoshModal] = useState<boolean>(false);
  const [showMandirDarshanModal, setShowMandirDarshanModal] = useState<boolean>(false);
  const [showYantraMahakoshModal, setShowYantraMahakoshModal] = useState<boolean>(false);
  const [showRatnaGyanModal, setShowRatnaGyanModal] = useState<boolean>(false);
  const [selectedYantraId, setSelectedYantraId] = useState<string | undefined>(undefined);
  const [selectedGemstoneId, setSelectedGemstoneId] = useState<string | undefined>(undefined);
  const [showSevaModal, setShowSevaModal] = useState<boolean>(false);
  const [sevaInitialTab, setSevaInitialTab] = useState<SevaTab>('donation');
  const [showTotkeModal, setShowTotkeModal] = useState<boolean>(false);
  const [showNaamMantraModal, setShowNaamMantraModal] = useState<boolean>(false);

  const handleOpenSeva = (tab: SevaTab = 'donation') => {
    setSevaInitialTab(tab);
    setShowSevaModal(true);
  };

  // Track if user has explicitly picked a mantra (if false, Jaap starts on Sadhana Selection screen)
  const [hasChosenMantra, setHasChosenMantra] = useState<boolean>(() => {
    try {
      return localStorage.getItem('divya_jaap_has_chosen') === 'true';
    } catch {
      return false;
    }
  });

  // 5. Sadhana Configuration Parameters (Persisted in state)
  const [targetMalas, setTargetMalas] = useState<number>(() => {
    const saved = localStorage.getItem('divya_jaap_target_malas');
    return saved ? parseInt(saved, 10) : 1;
  });
  const [countingMode, setCountingMode] = useState<CountingMode>(() => {
    const saved = localStorage.getItem('divya_jaap_counting_mode');
    return (saved as CountingMode) || 'tap';
  });
  const [speechSpeed, setSpeechSpeed] = useState<number>(() => {
    const s = localStorage.getItem('divya_jaap_speech_speed');
    return s ? parseFloat(s) : 1.0;
  });
  const [timerInterval, setTimerInterval] = useState<number>(() => {
    const saved = localStorage.getItem('divya_jaap_timer_interval');
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
    const initialSpeed = (() => {
      const s = localStorage.getItem('divya_jaap_speech_speed');
      return s ? parseFloat(s) : 1.0;
    })();
    return calculateMantraRecommendedDuration(currentMantra.text, initialSpeed);
  });
  const [bellVolume, setBellVolume] = useState<number>(() => {
    const s = localStorage.getItem('divya_jaap_bell_volume');
    return s ? parseFloat(s) : 0.8;
  });
  const [shankhVolume, setShankhVolume] = useState<number>(() => {
    const s = localStorage.getItem('divya_jaap_shankh_volume');
    return s ? parseFloat(s) : 0.9;
  });
  const [voiceVolume, setVoiceVolume] = useState<number>(() => {
    const s = localStorage.getItem('divya_jaap_voice_volume');
    return s ? parseFloat(s) : 0.85;
  });
  const [isBellEnabled, setIsBellEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('divya_jaap_bell_enabled');
    return saved !== null ? saved === 'true' : true;
  });
  const [isShankhEnabled, setIsShankhEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('divya_jaap_shankh_enabled');
    return saved !== null ? saved === 'true' : true;
  });
  const [selectedBell, setSelectedBell] = useState<BellSoundType>(() => {
    return (localStorage.getItem('divya_jaap_bell_type') as BellSoundType) || 'kashi_brass';
  });
  const [selectedShankh, setSelectedShankh] = useState<ShankhSoundType>(() => {
    return (localStorage.getItem('divya_jaap_shankh_type') as ShankhSoundType) || 'panchjanya';
  });
  const [selectedMalaBead, setSelectedMalaBead] = useState<MalaBeadVisualType>(() => {
    return (localStorage.getItem('divya_jaap_mala_bead') as MalaBeadVisualType) || 'rudraksha';
  });
  const [activeAmbience, setActiveAmbience] = useState<AmbienceSoundType>(() => {
    return (localStorage.getItem('divya_jaap_ambience') as AmbienceSoundType) || 'none';
  });
  const [isVoiceChantingEnabled, setIsVoiceChantingEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('divya_jaap_voice_enabled');
    return saved !== null ? saved === 'true' : true;
  });
  const [selectedVoiceProfile, setSelectedVoiceProfile] = useState<VoiceProfileId>(() => {
    const saved = localStorage.getItem('divya_jaap_voice_profile');
    return (saved as VoiceProfileId) || 'sadhvi_devi_female';
  });

  // Debounced Sync profile to localStorage
  useEffect(() => {
    const handler = setTimeout(() => {
      try {
        localStorage.setItem('divya_jaap_profile', JSON.stringify(userProfile));
      } catch (e) {
        console.warn('Could not save profile:', e);
      }
    }, 800);

    return () => clearTimeout(handler);
  }, [userProfile]);

  // Sync current mantra
  useEffect(() => {
    try {
      localStorage.setItem('divya_jaap_current_mantra', JSON.stringify(currentMantra));
    } catch (e) {
      console.warn('Could not save mantra:', e);
    }
  }, [currentMantra]);

  // Sync target malas
  useEffect(() => {
    try {
      localStorage.setItem('divya_jaap_target_malas', targetMalas.toString());
    } catch (e) {
      console.warn(e);
    }
  }, [targetMalas]);

  // Sync voice settings
  useEffect(() => {
    try {
      localStorage.setItem('divya_jaap_voice_enabled', isVoiceChantingEnabled ? 'true' : 'false');
    } catch (e) {}
  }, [isVoiceChantingEnabled]);

  useEffect(() => {
    try {
      localStorage.setItem('divya_jaap_voice_profile', selectedVoiceProfile);
    } catch (e) {}
  }, [selectedVoiceProfile]);

  useEffect(() => {
    try {
      localStorage.setItem('divya_jaap_bell_enabled', isBellEnabled ? 'true' : 'false');
    } catch (e) {}
  }, [isBellEnabled]);

  useEffect(() => {
    try {
      localStorage.setItem('divya_jaap_shankh_enabled', isShankhEnabled ? 'true' : 'false');
    } catch (e) {}
  }, [isShankhEnabled]);

  useEffect(() => {
    try { localStorage.setItem('divya_jaap_speech_speed', speechSpeed.toString()); } catch (e) {}
  }, [speechSpeed]);

  useEffect(() => {
    try { localStorage.setItem('divya_jaap_bell_volume', bellVolume.toString()); } catch (e) {}
  }, [bellVolume]);

  useEffect(() => {
    try { localStorage.setItem('divya_jaap_shankh_volume', shankhVolume.toString()); } catch (e) {}
  }, [shankhVolume]);

  useEffect(() => {
    try { localStorage.setItem('divya_jaap_voice_volume', voiceVolume.toString()); } catch (e) {}
  }, [voiceVolume]);

  useEffect(() => {
    try { localStorage.setItem('divya_jaap_bell_type', selectedBell); } catch (e) {}
  }, [selectedBell]);

  useEffect(() => {
    try { localStorage.setItem('divya_jaap_shankh_type', selectedShankh); } catch (e) {}
  }, [selectedShankh]);

  useEffect(() => {
    try { localStorage.setItem('divya_jaap_mala_bead', selectedMalaBead); } catch (e) {}
  }, [selectedMalaBead]);

  useEffect(() => {
    try { localStorage.setItem('divya_jaap_ambience', activeAmbience); } catch (e) {}
  }, [activeAmbience]);

  // Auto-Update Engine: automatically check whenever device is online
  useEffect(() => {
    updateEngine.onUpdateAvailable((res) => {
      setAvailableUpdate(res);
    });

    const timer = setTimeout(() => {
      updateEngine.checkForUpdates().then((res) => {
        if (res && res.hasUpdate) {
          setAvailableUpdate(res);
        }
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Initialize notifications on app start if profile is set
  useEffect(() => {
    if (userProfile.isProfileSet) {
      notificationEngine.scheduleDailyDivineReminders(userProfile);
      notificationEngine.checkAndNotifyMissedJaap(userProfile);
    }
  }, [userProfile.isProfileSet, userProfile.name, userProfile.ishtDevta, userProfile.language]);

  // Handle Profile Save from Onboarding or Edit
  const handleSaveProfile = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
    setShowOnboarding(false);
    setIsEditingProfile(false);

    // If initial setup, automatically recommend their Ishtdevta's top mantra!
    const matchingMantra = PRELOADED_MANTRAS.find(
      (m) => m.deity === newProfile.ishtDevta && m.category === 'sadhu'
    ) || PRELOADED_MANTRAS.find((m) => m.deity === newProfile.ishtDevta);

    if (matchingMantra) {
      handleSelectMantra(matchingMantra);
    }

    // Schedule personalized notifications
    notificationEngine.scheduleDailyDivineReminders(newProfile);

    // Handle seamless redirection to the feature user wanted to access
    if (postProfileRedirect) {
      const target = postProfileRedirect;
      setPostProfileRedirect(null);
      if (target === 'kundali') {
        setKundaliInitialTab('kundali');
        setShowKundaliModal(true);
      } else if (target === 'ank_gyan') {
        setShowAnkaGyanModal(true);
      } else if (target === 'jaap') {
        setActiveTab('jaap');
      } else if (target === 'mantra') {
        setActiveTab('mantra');
      } else if (target === 'aaj_ka_din') {
        setShowAajKaDinModal(true);
      }
    }
  };

  const handleToggleLanguage = () => {
    const nextLang: LanguageCode = userProfile.language === 'hi' ? 'en' : 'hi';
    setUserProfile((prev) => ({
      ...prev,
      language: nextLang
    }));
  };

  // Update user stats with automatic daily streak calculation & zero bead loss
  const handleUpdateStats = (beadsAdded: number, malasCompleted: number) => {
    setSessionBeads((prev) => prev + beadsAdded);
    setSessionMalas((prev) => prev + malasCompleted);
    setUserProfile((prev) => {
      const nextStreak = calculateNewStreak(prev.lastJaapDate, prev.dailyStreak);
      return {
        ...prev,
        totalBeadsAllTime: prev.totalBeadsAllTime + beadsAdded,
        totalMalasCompletedAllTime: prev.totalMalasCompletedAllTime + malasCompleted,
        dailyStreak: nextStreak,
        lastJaapDate: new Date().toISOString()
      };
    });
  };

  const handleSelectMantra = (mantra: MantraItem) => {
    setHasChosenMantra(true);
    try {
      localStorage.setItem('divya_jaap_has_chosen', 'true');
    } catch (e) {}

    setSelectedMantras((prev) => {
      const existsIndex = prev.findIndex((m) => m.id === mantra.id);
      let nextList: MantraItem[];
      if (existsIndex >= 0) {
        nextList = prev;
        setActiveMantraIndex(existsIndex);
      } else {
        nextList = [...prev, mantra];
        setActiveMantraIndex(nextList.length - 1);
      }
      try {
        localStorage.setItem('divya_jaap_selected_mantras', JSON.stringify(nextList));
        localStorage.setItem('divya_jaap_current_mantra', JSON.stringify(mantra));
      } catch (e) {}
      return nextList;
    });

    const optimalSec = calculateMantraRecommendedDuration(mantra.text, speechSpeed);
    setTimerInterval(optimalSec);
    try {
      localStorage.setItem('divya_jaap_timer_interval', optimalSec.toString());
    } catch (e) {}
  };

  const handleRemoveMantra = (mantraId: string) => {
    setSelectedMantras((prev) => {
      const nextList = prev.filter((m) => m.id !== mantraId);
      const finalList = nextList.length > 0 ? nextList : [PRELOADED_MANTRAS[0]];
      setActiveMantraIndex((currIdx) => Math.min(currIdx, finalList.length - 1));
      try {
        localStorage.setItem('divya_jaap_selected_mantras', JSON.stringify(finalList));
        localStorage.setItem('divya_jaap_current_mantra', JSON.stringify(finalList[0]));
      } catch (e) {}
      return finalList;
    });
  };

  const handleToggleSelectMantra = (mantra: MantraItem) => {
    const exists = selectedMantras.some((m) => m.id === mantra.id);
    if (exists) {
      handleRemoveMantra(mantra.id);
    } else {
      handleSelectMantra(mantra);
    }
  };

  const handleStartJaapFromAajKaDin = (name: string, text: string) => {
    const customItem: MantraItem = {
      id: `daily-mantra-${Date.now()}`,
      name,
      text,
      deity: 'custom',
      deityLabel: 'दैनिक महामंत्र',
      category: 'naam_jaap',
      categoryLabel: 'दैनिक साधना',
      isCustom: true
    };
    handleSelectMantra(customItem);
    handleOpenJaapSafe();
  };

  const handleStartChantingCustomOrLibraryItem = (m: MantraItem) => {
    handleSelectMantra(m);
    handleOpenJaapSafe();
  };

  // Full Screen Reward Ad Trigger
  const handleProceedToJaapWithRewardAd = () => {
    setShowRewardAd(true);
  };

  const handleRewardComplete = () => {
    setShowRewardAd(false);
    handleOpenJaapSafe();
  };

  // Comprehensive Profile Verification Helpers
  const hasBasicUserInformation = Boolean(
    userProfile.isProfileSet &&
    userProfile.name &&
    userProfile.name.trim() !== '' &&
    userProfile.name !== 'साधक' &&
    userProfile.name !== 'Devotee'
  );

  const hasAstrologicalInformation = Boolean(
    hasBasicUserInformation &&
    userProfile.dob &&
    userProfile.dob.trim().length > 0
  );

  const hasAnkaGyanInformation = Boolean(
    hasAstrologicalInformation &&
    userProfile.phone &&
    userProfile.phone.replace(/\D/g, '').length >= 10
  );

  // Safe Action Openers with Profile Verification
  const handleOpenKundaliSafe = (initialTab: JyotishTabType = 'kundali') => {
    if (initialTab === 'ankajyotish') {
      if (hasAnkaGyanInformation) {
        setKundaliInitialTab('ankajyotish');
        setShowKundaliModal(true);
      } else {
        setPostProfileRedirect('ank_gyan');
        setIsEditingProfile(true);
        setShowOnboarding(true);
      }
      return;
    }

    if (hasAstrologicalInformation) {
      setKundaliInitialTab(initialTab);
      setShowKundaliModal(true);
    } else {
      setPostProfileRedirect('kundali');
      setIsEditingProfile(true);
      setShowOnboarding(true);
    }
  };

  const handleOpenAnkaGyanSafe = () => {
    if (hasAnkaGyanInformation) {
      setShowAnkaGyanModal(true);
    } else {
      setPostProfileRedirect('ank_gyan');
      setIsEditingProfile(true);
      setShowOnboarding(true);
    }
  };

  const handleOpenJaapSafe = () => {
    if (hasBasicUserInformation) {
      setActiveTab('jaap');
    } else {
      setPostProfileRedirect('jaap');
      setIsEditingProfile(true);
      setShowOnboarding(true);
    }
  };

  const handleOpenMantraSafe = () => {
    if (hasBasicUserInformation) {
      setActiveTab('mantra');
    } else {
      setPostProfileRedirect('mantra');
      setIsEditingProfile(true);
      setShowOnboarding(true);
    }
  };

  const handleOpenAajKaDinSafe = () => {
    if (!hasAstrologicalInformation) {
      setPostProfileRedirect('aaj_ka_din');
      setIsEditingProfile(true);
      setShowOnboarding(true);
    } else {
      setShowAajKaDinModal(true);
    }
  };

  const handleTabChange = (tab: BottomNavTab) => {
    if (tab === 'alerts') {
      setShowNotifications(true);
      return;
    }
    if (tab === 'jaap') {
      handleOpenJaapSafe();
      return;
    }
    if (tab === 'mantra') {
      handleOpenMantraSafe();
      return;
    }
    setActiveTab(tab);
  };

  const handleUpdateCountingMode = (mode: CountingMode) => {
    setCountingMode(mode);
    try {
      localStorage.setItem('divya_jaap_counting_mode', mode);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  };

  const handleUpdateTimerInterval = (sec: number) => {
    const validSec = Math.max(1, Math.min(120, sec));
    setTimerInterval(validSec);
    try {
      localStorage.setItem('divya_jaap_timer_interval', validSec.toString());
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  };

  const handleVolumeChange = (bell: number, shankh: number, voice: number) => {
    setBellVolume(bell);
    setShankhVolume(shankh);
    setVoiceVolume(voice);
  };

  return (
    <NetworkGuard>
      <div className="min-h-screen bg-gradient-to-b from-[#FCFAF6] via-[#FFF8EB] to-[#FFF2D9] flex flex-col justify-between text-amber-950 select-none pb-16 font-sans">
        {/* Divine Header with Daily Streak, Language Toggle, Profile */}
        <Header
          userProfile={userProfile}
          onOpenProfile={() => setIsEditingProfile(true)}
          onOpenSeva={() => handleOpenSeva('donation')}
          onOpenMantraLibrary={handleOpenMantraSafe}
          onToggleLanguage={handleToggleLanguage}
          onOpenNotifications={() => {
            setShowNotifications(true);
            setUnreadNotifications(0);
          }}
          unreadNotificationsCount={unreadNotifications}
          onOpenKundali={() => handleOpenKundaliSafe('kundali')}
          onOpenHastRekha={() => {
            setKundaliInitialTab('hastrekha');
            setShowKundaliModal(true);
          }}
          onOpenAnkaJyotish={() => handleOpenKundaliSafe('ankajyotish')}
          onOpenSamadhan={() => {
            setKundaliInitialTab('samadhan');
            setShowKundaliModal(true);
          }}
        />

        {/* Dynamic Multi-Page Content */}
        <main className="flex-1 flex flex-col justify-start">
          {/* TAB 0: Master Landing Page (Home Hub) */}
          {activeTab === 'home' && (
            <div className="w-full">
              <MainLandingPage
                userProfile={userProfile}
                currentMantra={currentMantra}
                onOpenKundali={() => handleOpenKundaliSafe('kundali')}
                onOpenAajKaDin={handleOpenAajKaDinSafe}
                onOpenChalisa={() => setShowChalisaModal(true)}
                onOpenAarti={() => setShowAartiModal(true)}
                onOpenGranth={() => {
                  const lastBm = scriptureBookmarkManager.getLastReadBookmark();
                  if (lastBm) {
                    setGranthReaderCategory(lastBm.categoryKey as any);
                  } else {
                    setGranthReaderCategory('gita');
                  }
                  setShowGranthReader(true);
                }}
                onOpenVedUpanishad={() => {
                  setGranthReaderCategory('ved');
                  setShowGranthReader(true);
                }}
                onOpenJap={handleOpenJaapSafe}
                onOpenAnkaGyan={handleOpenAnkaGyanSafe}
                onOpenMantraSuggestion={() => setShowMantraSuggestionModal(true)}
                onOpenMantraMahakosh={() => setShowMantraMahakoshModal(true)}
                onOpenMandirDarshan={() => setShowMandirDarshanModal(true)}
                onOpenYantraMahakosh={() => setShowYantraMahakoshModal(true)}
                onOpenRatnaGyan={() => setShowRatnaGyanModal(true)}
                onOpenTotke={() => setShowTotkeModal(true)}
                onOpenNaamMantra={() => setShowNaamMantraModal(true)}
                onOpenSeva={handleOpenSeva}
                onOpenProfileSetup={() => {
                  setIsEditingProfile(true);
                  setShowOnboarding(true);
                }}
                language={userProfile.language}
              />
            </div>
          )}
          {/* TAB 1: Sacred 108-Bead Jaap Sanctuary with Rotating Mala */}
          <div className={activeTab === 'jaap' ? 'w-full' : 'hidden'}>
            <JaapPage
              mantra={currentMantra}
              userProfile={userProfile}
              targetMalas={targetMalas}
              countingMode={countingMode}
              onUpdateCountingMode={handleUpdateCountingMode}
              timerInterval={timerInterval}
              onUpdateTimerInterval={handleUpdateTimerInterval}
              speechSpeed={speechSpeed}
              bellVolume={bellVolume}
              shankhVolume={shankhVolume}
              voiceVolume={voiceVolume}
              isBellEnabled={isBellEnabled}
              onToggleBell={setIsBellEnabled}
              isShankhEnabled={isShankhEnabled}
              onToggleShankh={setIsShankhEnabled}
              selectedBell={selectedBell}
              selectedShankh={selectedShankh}
              selectedMalaBead={selectedMalaBead}
              activeAmbience={activeAmbience}
              isVoiceChantingEnabled={isVoiceChantingEnabled}
              onToggleVoiceChanting={setIsVoiceChantingEnabled}
              selectedVoiceProfile={selectedVoiceProfile}
              onSelectVoiceProfile={setSelectedVoiceProfile}
              onBackToSetup={() => setActiveTab('setup')}
              onNavigateToTab={setActiveTab}
              selectedMantras={selectedMantras}
              onSelectMantra={handleSelectMantra}
              onRemoveMantra={handleRemoveMantra}
              onUpdateStats={handleUpdateStats}
              onResetSession={() => {
                setSessionBeads(0);
                setSessionMalas(0);
              }}
              language={userProfile.language}
              onOpenKundali={() => {
                setKundaliInitialTab('kundali');
                setShowKundaliModal(true);
              }}
              onOpenHastRekha={() => {
                setKundaliInitialTab('hastrekha');
                setShowKundaliModal(true);
              }}
              onOpenAnkaJyotish={() => {
                setKundaliInitialTab('ankajyotish');
                setShowKundaliModal(true);
              }}
              onOpenSamadhan={() => {
                setKundaliInitialTab('samadhan');
                setShowKundaliModal(true);
              }}
              onOpenChalisa={() => setShowChalisaModal(true)}
              onOpenGranth={(cat) => {
                if (cat) setGranthReaderCategory(cat as any);
                setShowGranthReader(true);
              }}
              hasChosenMantra={hasChosenMantra}
              onSetHasChosenMantra={(chosen) => {
                setHasChosenMantra(chosen);
                try {
                  localStorage.setItem('divya_jaap_has_chosen', chosen ? 'true' : 'false');
                } catch (e) {}
              }}
            />
          </div>

          {/* TAB 2: 50+ Vedic Mantras & Custom Mantra Granth */}
          {activeTab === 'mantra' && (
            <div className="w-full">
              <MantraSelectionPage
                currentMantra={currentMantra}
                selectedMantras={selectedMantras}
                onSelectMantra={handleSelectMantra}
                onRemoveMantra={handleRemoveMantra}
                onToggleSelectMantra={handleToggleSelectMantra}
                onProceedToGuide={() => setActiveTab('guide')}
                onProceedToSetup={() => setActiveTab('setup')}
                onProceedToJaap={handleProceedToJaapWithRewardAd}
                onOpenMahakosh={() => setShowMantraMahakoshModal(true)}
                userIshtDevta={userProfile.ishtDevta}
                language={userProfile.language}
              />
              <div className="max-w-xl mx-auto px-4 pb-20 pt-2">
                <AdMobNativeCard
                  language={userProfile.language}
                  variant="native_advanced"
                  slotName="Mantra Selection Page"
                />
              </div>
            </div>
          )}

          {/* TAB 3: Mantra Information, Asan Vidhi, Samay, Niyam & Siddhi Margdarshan */}
          {activeTab === 'guide' && (
            <div className="w-full">
              <MantraGuidePage
                mantra={currentMantra}
                userProfile={userProfile}
                onProceedToSetup={() => setActiveTab('setup')}
                onProceedToJaap={handleProceedToJaapWithRewardAd}
                onBackToMantraSelect={() => setActiveTab('mantra')}
                language={userProfile.language}
              />
              <div className="max-w-xl mx-auto px-4 pb-20 pt-2">
                <AdMobNativeCard
                  language={userProfile.language}
                  variant="banner"
                  slotName="Mantra Guide Page"
                />
              </div>
            </div>
          )}

          {/* TAB 4: Sadhana Setup (10 Divine Voices, Bells, Shankh, Beads) */}
          {activeTab === 'setup' && (
            <div className="w-full">
              <SadhanaSetupPage
                mantra={currentMantra}
                userProfile={userProfile}
                targetMalas={targetMalas}
                onUpdateTargetMalas={setTargetMalas}
                countingMode={countingMode}
                onUpdateCountingMode={handleUpdateCountingMode}
                timerInterval={timerInterval}
                onUpdateTimerInterval={handleUpdateTimerInterval}
                speechSpeed={speechSpeed}
                onUpdateSpeechSpeed={setSpeechSpeed}
                bellVolume={bellVolume}
                shankhVolume={shankhVolume}
                voiceVolume={voiceVolume}
                onUpdateVolumes={handleVolumeChange}
                isBellEnabled={isBellEnabled}
                onToggleBell={setIsBellEnabled}
                isShankhEnabled={isShankhEnabled}
                onToggleShankh={setIsShankhEnabled}
                selectedBell={selectedBell}
                selectedShankh={selectedShankh}
                onSelectBell={setSelectedBell}
                onSelectShankh={setSelectedShankh}
                selectedMalaBead={selectedMalaBead}
                onSelectMalaBead={setSelectedMalaBead}
                activeAmbience={activeAmbience}
                onSelectAmbience={setActiveAmbience}
                isVoiceChantingEnabled={isVoiceChantingEnabled}
                onToggleVoiceChanting={setIsVoiceChantingEnabled}
                selectedVoiceProfile={selectedVoiceProfile}
                onSelectVoiceProfile={setSelectedVoiceProfile}
                onBackToMantraSelect={() => setActiveTab('guide')}
                onProceedToJaap={handleProceedToJaapWithRewardAd}
                onOpenProfileSetup={() => {
                  setIsEditingProfile(true);
                  setShowOnboarding(true);
                }}
                language={userProfile.language}
              />
              <div className="max-w-xl mx-auto px-4 pb-20 pt-2">
                <AdMobNativeCard
                  language={userProfile.language}
                  variant="banner"
                  slotName="Sadhana Setup Page"
                />
              </div>
            </div>
          )}

          {/* TAB 4: Siddhi Stats, Streaks & Progress Certificate */}
          {activeTab === 'siddhi' && (
            <div className="w-full">
              <SiddhiStatsPage
                userProfile={userProfile}
                currentMantra={currentMantra}
                completedMalasInSession={sessionMalas}
                totalSessionBeads={sessionBeads}
                onOpenCertificate={() => setShowSiddhiCertModal(true)}
                onGoToJaap={handleOpenJaapSafe}
                language={userProfile.language}
              />
              <div className="max-w-xl mx-auto px-4 pb-20 pt-2">
                <AdMobNativeCard
                  language={userProfile.language}
                  variant="native_advanced"
                  slotName="Siddhi Stats Page"
                />
              </div>
            </div>
          )}
        </main>

        {/* Fixed 5-Tab Royal Spiritual Bottom Navigation Bar */}
        <BottomNavBar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          language={userProfile.language}
          unreadAlertsCount={2}
        />

        {/* Intermediate Gate: Full Screen Rewarded Ad */}
        {showRewardAd && (
          <FullScreenRewardAdModal
            language={userProfile.language}
            onRewardComplete={handleRewardComplete}
          />
        )}

        {/* Personalized Divine Notification Center Modal */}
        {showNotifications && (
          <NotificationCenterModal
            userProfile={userProfile}
            language={userProfile.language}
            onClose={() => setShowNotifications(false)}
            onStartJaapFromNotification={(suggestedMantra) => {
              setShowNotifications(false);
              if (suggestedMantra) {
                handleSelectMantra(suggestedMantra);
                setHasChosenMantra(true);
                try {
                  localStorage.setItem('divya_jaap_has_chosen', 'true');
                } catch (e) {}
              }
              handleProceedToJaapWithRewardAd();
            }}
            onOpenAajKaDin={() => {
              setShowNotifications(false);
              handleOpenAajKaDinSafe();
            }}
            onOpenChalisa={() => {
              setShowNotifications(false);
              setShowChalisaModal(true);
            }}
          />
        )}

        {/* Personalized Mantra Suggestion Popup */}
        {showMantraSuggestionModal && (
          <DivineMantraSuggestionModal
            isOpen={showMantraSuggestionModal}
            onClose={() => setShowMantraSuggestionModal(false)}
            userProfile={userProfile}
            language={userProfile.language}
            onSelectMantraAndStartJaap={(m) => {
              handleSelectMantra(m);
              setHasChosenMantra(true);
              try {
                localStorage.setItem('divya_jaap_has_chosen', 'true');
              } catch (e) {}
              setActiveTab('jaap');
            }}
            onOpenChalisa={() => setShowChalisaModal(true)}
            onOpenGranth={(cat) => {
              if (cat) setGranthReaderCategory(cat as any);
              setShowGranthReader(true);
            }}
          />
        )}

        {/* Siddhi Certificate Modal */}
        {showSiddhiCertModal && (
          <SiddhiCertificateModal
            userProfile={userProfile}
            mantra={currentMantra}
            completedMalas={sessionMalas || targetMalas}
            onClose={() => setShowSiddhiCertModal(false)}
          />
        )}

        {/* In-App Auto Update Modal when device is online */}
        {availableUpdate && (
          <AutoUpdateModal
            manifest={availableUpdate.manifest}
            isMandatory={availableUpdate.isMandatory}
            language={userProfile.language}
            onClose={() => setAvailableUpdate(null)}
          />
        )}

        {/* Real Offline Kundali & Samasya Samadhan Modal */}
        {showKundaliModal && (
          <KundaliSamadhanModal
            isOpen={showKundaliModal}
            onClose={() => setShowKundaliModal(false)}
            userProfile={userProfile}
            initialTab={kundaliInitialTab}
            language={userProfile.language}
            onSelectMantraAndStartJaap={(m) => {
              handleSelectMantra(m);
              setActiveTab('jaap');
            }}
            onEditProfile={() => setIsEditingProfile(true)}
            onOpenAllYantras={() => setShowYantraMahakoshModal(true)}
            onOpenAllRatnas={() => setShowRatnaGyanModal(true)}
          />
        )}

        {/* 1. आज का दिन (Aaj Ka Din) Modal */}
        {showAajKaDinModal && (
          <AajKaDinModal
            isOpen={showAajKaDinModal}
            onClose={() => setShowAajKaDinModal(false)}
            userProfile={userProfile}
            onStartJaapWithMantra={handleStartJaapFromAajKaDin}
            onOpenKundali={() => {
              setShowAajKaDinModal(false);
              handleOpenKundaliSafe('kundali');
            }}
            onOpenProfileSetup={() => {
              setShowAajKaDinModal(false);
              setPostProfileRedirect('aaj_ka_din');
              setIsEditingProfile(true);
              setShowOnboarding(true);
            }}
            language={userProfile.language}
          />
        )}

        {/* 2. चालीसा संग्रह (Chalisa Sangrah) Modal */}
        {showChalisaModal && (
          <ChalisaSangrahModal
            isOpen={showChalisaModal}
            onClose={() => setShowChalisaModal(false)}
            onSelectChalisaAndChant={handleStartChantingCustomOrLibraryItem}
            language={userProfile.language}
          />
        )}

        {/* 3. आरती संग्रह (Aarti Sangrah) Modal */}
        {showAartiModal && (
          <AartiSangrahModal
            isOpen={showAartiModal}
            onClose={() => setShowAartiModal(false)}
            onSelectAartiAndChant={handleStartChantingCustomOrLibraryItem}
            language={userProfile.language}
          />
        )}

        {/* 4. ग्रन्थ संग्रह (Granth Sangrah - Gita, Sundarkand, Ramayan, Stotras) Modal */}
        {showGranthModal && (
          <GranthSangrahModal
            isOpen={showGranthModal}
            onClose={() => setShowGranthModal(false)}
            onSelectGranthAndChant={handleStartChantingCustomOrLibraryItem}
            onOpenGrandScriptureReader={() => setShowGranthReader(true)}
            language={userProfile.language}
          />
        )}

        {/* 5. वेद / उपनिषद (Ved / Upanishad) Modal */}
        {showVedUpanishadModal && (
          <VedUpanishadModal
            isOpen={showVedUpanishadModal}
            onClose={() => setShowVedUpanishadModal(false)}
            onSelectVedAndChant={handleStartChantingCustomOrLibraryItem}
            language={userProfile.language}
          />
        )}

        {/* 6. अंक ज्ञान (Anka Gyan) Modal */}
        {showAnkaGyanModal && (
          <AnkaGyanModal
            isOpen={showAnkaGyanModal}
            onClose={() => setShowAnkaGyanModal(false)}
            userProfile={userProfile}
            language={userProfile.language}
            onOpenProfileSetup={() => {
              setShowAnkaGyanModal(false);
              setIsEditingProfile(true);
              setShowOnboarding(true);
            }}
          />
        )}

        {/* 7. सम्पूर्ण पावन ग्रन्थ पाठक (Full-Page Book Reader for Gita, Ramayan, Ved, Upanishad) */}
        {showGranthReader && (
          <SacredGranthReaderModal
            isOpen={showGranthReader}
            onClose={() => setShowGranthReader(false)}
            initialCategory={granthReaderCategory}
            onSelectMantraAndChant={handleStartChantingCustomOrLibraryItem}
            language={userProfile.language}
          />
        )}

        {/* 8. धर्म सेवा, दान व समुदाय (Donation, Play Store Rating, WhatsApp Share, User Feedback) */}
        {showSevaModal && (
          <SevaCommunityModal
            isOpen={showSevaModal}
            onClose={() => setShowSevaModal(false)}
            initialTab={sevaInitialTab}
            language={userProfile.language}
          />
        )}

        {/* 9. सम्पूर्ण सनातन व शाबर मंत्र महाकोश (९ श्रेणियां, पूजा विधि, लाभ व चेतावनी) */}
        {showMantraMahakoshModal && (
          <MantraMahakoshModal
            isOpen={showMantraMahakoshModal}
            onClose={() => setShowMantraMahakoshModal(false)}
            onSelectMantraAndChant={handleStartChantingCustomOrLibraryItem}
            language={userProfile.language}
          />
        )}

        {/* 10. चार धाम, द्वादश ज्योतिर्लिंग व महातीर्थ 24x7 लाइव दर्शन */}
        {showMandirDarshanModal && (
          <MandirLiveDarshanModal
            isOpen={showMandirDarshanModal}
            onClose={() => setShowMandirDarshanModal(false)}
            onSelectMantraAndChant={handleStartChantingCustomOrLibraryItem}
            language={userProfile.language}
          />
        )}

        {/* 11. सम्पूर्ण सिद्ध यन्त्र महाकोश (३१ यन्त्र व दैनिक कागज विधि) */}
        {showYantraMahakoshModal && (
          <SacredYantraMahakoshModal
            isOpen={showYantraMahakoshModal}
            onClose={() => {
              setShowYantraMahakoshModal(false);
              setSelectedYantraId(undefined);
            }}
            language={userProfile.language}
            initialYantraId={selectedYantraId}
          />
        )}

        {/* 12. प्रामाणिक रत्न विज्ञान एवं असली-नकली पहचान */}
        {showRatnaGyanModal && (
          <RatnaGyanModal
            isOpen={showRatnaGyanModal}
            onClose={() => {
              setShowRatnaGyanModal(false);
              setSelectedGemstoneId(undefined);
            }}
            language={userProfile.language}
            initialGemstoneId={selectedGemstoneId}
          />
        )}

        {/* 13. सनातन अचूक टोटके व सात्विक उपाय */}
        {showTotkeModal && (
          <SanatanTotkeModal
            onClose={() => setShowTotkeModal(false)}
            isHi={userProfile.language === 'hi'}
          />
        )}

        {/* 14. नाम-सहित संपुटित सिद्ध जप महामंत्र */}
        {showNaamMantraModal && (
          <NaamSamputitMantraModal
            userProfile={userProfile}
            onClose={() => setShowNaamMantraModal(false)}
            onStartJaapWithMantra={(customMantra) => {
              handleSelectMantra(customMantra);
              setHasChosenMantra(true);
              try {
                localStorage.setItem('divya_jaap_has_chosen', 'true');
              } catch (e) {}
              setActiveTab('jaap');
            }}
            isHi={userProfile.language === 'hi'}
          />
        )}

        {/* First Time Opening / Edit Profile Sankalp with Feature Verification */}
        {(showOnboarding || isEditingProfile) && (
          <SankalpOnboarding
            onSaveProfile={handleSaveProfile}
            initialProfile={userProfile}
            isEditing={isEditingProfile}
            onClose={() => {
              setIsEditingProfile(false);
              setShowOnboarding(false);
              setPostProfileRedirect(null);
            }}
            redirectReason={postProfileRedirect}
          />
        )}
      </div>
    </NetworkGuard>
  );
};

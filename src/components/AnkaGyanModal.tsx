import React, { useState, useMemo, useEffect } from 'react';
import { UserProfile, LanguageCode } from '../types';
import {
  analyzeLast4Digits,
  analyzeMobileNumber,
  calculateMoolank,
  calculateBhagyank,
  PLANET_RULERS,
  Last4DigitsAnalysis,
  MobileAnalysisResult
} from '../utils/ankaJyotishEngine';
import { generateAndDownloadVedicReport } from '../utils/vedicReportPdfEngine';
import { openPrintableAnkaReport } from '../utils/ankaGyanPdfGenerator';
import {
  X,
  Search,
  Sparkles,
  Award,
  Star,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Calendar,
  Smartphone,
  Info,
  Lock,
  Unlock,
  Download,
  CreditCard,
  QrCode,
  Check,
  Copy,
  ChevronRight,
  TrendingUp,
  HeartHandshake,
  ShieldAlert,
  Loader2,
  FileText,
  UserCheck
} from 'lucide-react';

interface AnkaGyanModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  language?: LanguageCode;
  onOpenProfileSetup?: () => void;
}

export type AnkaTier = 'tier1_free' | 'tier2_mobile' | 'tier3_life' | 'tier4_wealth' | 'tier5_vip';

interface TierPricing {
  id: AnkaTier;
  price: number;
  expectedPages: 5 | 11 | 21 | 51;
  labelHi: string;
  labelEn: string;
  badgeHi: string;
  icon: string;
  descHi: string;
}

const TIER_PRICING: TierPricing[] = [
  {
    id: 'tier1_free',
    price: 0,
    expectedPages: 5,
    labelHi: 'अंतिम ४ अंक जांच (निःशुल्क)',
    labelEn: 'Last 4 Digits Check (Free)',
    badgeHi: 'मुफ़्त • इन-ऐप',
    icon: '⚡',
    descHi: 'अंतिम ४ अंकों का सूक्ष्म ऊर्जा व प्रभाव विश्लेषण (दांपत्य, स्वास्थ्य, साख व धन)।'
  },
  {
    id: 'tier2_mobile',
    price: 19,
    expectedPages: 5,
    labelHi: 'सम्पूर्ण १० अंक मोबाइल विश्लेषण',
    labelEn: 'Complete 10-Digit Mobile Analysis',
    badgeHi: '₹19 • ५ पृष्ठ PDF',
    icon: '📱',
    descHi: 'D1 से D10 स्थान-वार फल, १३-३१, १४-४१, १७-७१, १८-८१ गुप्त जोड़े एवं अचूक वैदिक उपाय।'
  },
  {
    id: 'tier3_life',
    price: 91,
    expectedPages: 11,
    labelHi: 'सम्पूर्ण कुण्डली, वेद, शास्त्र, गुरु व अंकशास्त्र फलादेश',
    labelEn: 'Complete Kundali, Veda, Shastra & Numerology',
    badgeHi: '₹91 • ११ पृष्ठ PDF',
    icon: '🕉️',
    descHi: 'सम्पूर्ण कुण्डली, वेद, शास्त्र, गुरु कृपा एवं अंकशास्त्र (DOB + जन्म समय + मोबाइल) का महा-विश्लेषण।'
  },
  {
    id: 'tier4_wealth',
    price: 197,
    expectedPages: 21,
    labelHi: 'नाम अंक, कार्य, धन व भाग्य चक्र',
    labelEn: 'Name, Career, Wealth & Luck',
    badgeHi: '₹197 • २१ पृष्ठ PDF',
    icon: '💰',
    descHi: 'चालडियन नाम सुधार, धन आकर्षण अंक, अनुकूल कार्य/बिजनेस व ३६५ दिवसीय भाग्य चक्र।'
  },
  {
    id: 'tier5_vip',
    price: 1970,
    expectedPages: 51,
    labelHi: 'VIP पूर्ण व्यक्तिगत अंक परामर्श व महा-सुझाव',
    labelEn: 'VIP Master Consultation & Suggestions',
    badgeHi: 'VIP ₹1970 • ५१ पृष्ठ PDF',
    icon: '👑',
    descHi: 'नया मोबाइल नंबर सुझाव (कौन सा नंबर लें), कार्य/व्यापार सुझाव, नाम वर्तनी सुधार व VIP महा-संहिता।'
  }
];

export const AnkaGyanModal: React.FC<AnkaGyanModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  language = 'hi',
  onOpenProfileSetup
}) => {
  const isHi = language === 'hi';
  const [activeTab, setActiveTab] = useState<AnkaTier>('tier1_free');

  // Verify real user details (No dummy fallback)
  const hasUserDetails = Boolean(
    userProfile.name &&
    userProfile.name.trim() !== '' &&
    userProfile.name !== 'साधक' &&
    userProfile.dob &&
    userProfile.dob.trim() !== ''
  );

  // Input states - initialized strictly from real profile, no dummy defaults
  const [mobileInput, setMobileInput] = useState<string>(userProfile.phone || '');
  const [customDob, setCustomDob] = useState<string>(userProfile.dob || '');
  const [birthTime, setBirthTime] = useState<string>(userProfile.birthTime || '06:00');
  const [userNameInput, setUserNameInput] = useState<string>(
    userProfile.name && userProfile.name !== 'साधक' ? userProfile.name : ''
  );
  const [ishtDevtaInput, setIshtDevtaInput] = useState<string>(
    userProfile.ishtDevta || 'भगवान शिव (महादेव)'
  );

  // Free scan animation state
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStepText, setScanStepText] = useState<string>('');
  const [hasScannedFree, setHasScannedFree] = useState<boolean>(() => {
    return Boolean(userProfile.phone && userProfile.phone.replace(/\D/g, '').length >= 4);
  });

  // Unlocked Tiers State (persisted in LocalStorage)
  const [unlockedTiers, setUnlockedTiers] = useState<Record<AnkaTier, boolean>>(() => {
    try {
      const saved = localStorage.getItem('divya_jaap_unlocked_tiers');
      if (saved) {
        return { tier1_free: true, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return {
      tier1_free: true,
      tier2_mobile: false,
      tier3_life: false,
      tier4_wealth: false,
      tier5_vip: false
    };
  });

  // Payment Modal State
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [pendingTier, setPendingTier] = useState<TierPricing | null>(null);
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);

  // Apple-Grade Report Generation State (Takes 1-2 minutes simulation / progress)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [pdfProgressPercent, setPdfProgressPercent] = useState<number>(0);
  const [pdfProgressStatus, setPdfProgressStatus] = useState<string>('');
  const [activeGeneratingTier, setActiveGeneratingTier] = useState<TierPricing | null>(null);
  const [downloadSuccessModal, setDownloadSuccessModal] = useState<boolean>(false);

  // Sync with userProfile when updated
  useEffect(() => {
    if (userProfile.dob) setCustomDob(userProfile.dob);
    if (userProfile.phone) setMobileInput(userProfile.phone);
    if (userProfile.name && userProfile.name !== 'साधक') setUserNameInput(userProfile.name);
    if (userProfile.ishtDevta) setIshtDevtaInput(userProfile.ishtDevta);
  }, [userProfile]);

  // Calculations - strictly based on user's entered number & birth details (no dummy data)
  const effectiveMobile = (mobileInput || userProfile.phone || '').replace(/\D/g, '');
  const effectiveDob = customDob || userProfile.dob || '';

  const last4Analysis: Last4DigitsAnalysis = useMemo(() => {
    return analyzeLast4Digits(effectiveMobile || '0000');
  }, [effectiveMobile]);

  const mobile10Result: MobileAnalysisResult = useMemo(() => {
    return analyzeMobileNumber(effectiveMobile || '0000000000', effectiveDob || undefined);
  }, [effectiveMobile, effectiveDob]);

  const moolank = effectiveDob ? calculateMoolank(effectiveDob) : 1;
  const bhagyank = effectiveDob ? calculateBhagyank(effectiveDob) : 1;
  const moolankPlanet = PLANET_RULERS[moolank] || PLANET_RULERS[1];
  const bhagyankPlanet = PLANET_RULERS[bhagyank] || PLANET_RULERS[1];

  if (!isOpen) return null;

  // Handle Free 4-Digit Scan
  const handleTriggerFreeScan = () => {
    setIsScanning(true);
    setScanStepText('अंतिम ४ अंकों का वैदिक ऊर्जा स्कैन शुरू...');

    setTimeout(() => {
      setScanStepText('D7 दांपत्य एवं D8 स्वास्थ्य स्थिति की गणना...');
    }, 800);

    setTimeout(() => {
      setScanStepText('D9 लोक-साख एवं D10 धन संचय ऊर्जा का समन्वय...');
    }, 1600);

    setTimeout(() => {
      setIsScanning(false);
      setHasScannedFree(true);
    }, 2400);
  };

  // Open Payment Modal for a Tier
  const handleInitiateUnlock = (tier: TierPricing) => {
    if (!hasUserDetails && onOpenProfileSetup) {
      alert(isHi ? 'कृपया पहले अपना वास्तविक जन्म विवरण भरें ताकि आपकी रिपोर्ट सटीक बन सके।' : 'Please enter your birth details first.');
      onOpenProfileSetup();
      return;
    }
    setPendingTier(tier);
    setShowPaymentModal(true);
  };

  // Confirm Unlock & Launch Real Generation Flow
  const handleConfirmUnlock = (tierId: AnkaTier) => {
    const nextState = { ...unlockedTiers, [tierId]: true };
    setUnlockedTiers(nextState);
    try {
      localStorage.setItem('divya_jaap_unlocked_tiers', JSON.stringify(nextState));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    setShowPaymentModal(false);
    setActiveTab(tierId);

    const tierMeta = TIER_PRICING.find((t) => t.id === tierId);
    if (tierMeta && tierMeta.price > 0) {
      startPdfGeneration(tierMeta);
    }
  };

  // Launch the Apple-grade live generation & automatic PDF download
  const startPdfGeneration = async (tierMeta: TierPricing) => {
    if (!mobileInput || mobileInput.replace(/\D/g, '').length < 10) {
      alert(isHi ? 'कृपया रिपोर्ट बनाने के लिए अपना १० अंकों का मोबाइल नंबर दर्ज करें।' : 'Please enter your 10-digit mobile number to generate report.');
      return;
    }
    if (!customDob || !customDob.trim()) {
      if (onOpenProfileSetup) {
        onOpenProfileSetup();
      } else {
        alert(isHi ? 'कृपया अपनी जन्म तिथि दर्ज करें।' : 'Please enter your date of birth.');
      }
      return;
    }

    setActiveGeneratingTier(tierMeta);
    setIsGeneratingPdf(true);
    setPdfProgressPercent(5);
    setPdfProgressStatus(isHi ? 'वैदिक अंक व ग्रह-गोचर संकलन शुरू...' : 'Initializing Vedic calculations...');

    try {
      await generateAndDownloadVedicReport({
        tier: tierMeta.id as any,
        price: tierMeta.price as any,
        expectedPages: tierMeta.expectedPages,
        userProfile: {
          ...userProfile,
          name: userNameInput || userProfile.name,
          dob: customDob || userProfile.dob,
          birthTime: birthTime || userProfile.birthTime,
          phone: mobileInput || userProfile.phone
        },
        phoneInput: mobileInput,
        language,
        onProgress: (percent, statusText) => {
          setPdfProgressPercent(percent);
          setPdfProgressStatus(statusText);
        }
      });

      setTimeout(() => {
        setIsGeneratingPdf(false);
        setDownloadSuccessModal(true);
      }, 700);
    } catch (err) {
      console.error('PDF generation error:', err);
      setIsGeneratingPdf(false);
      alert(isHi ? 'पीडीएफ बनाने में त्रुटि हुई, कृपया पुनः प्रयास करें।' : 'Error generating PDF, please retry.');
    }
  };

  // Open printable report view
  const handleOpenPrintableView = (tierId: AnkaTier) => {
    const tierMeta = TIER_PRICING.find((t) => t.id === tierId) || TIER_PRICING[1];
    openPrintableAnkaReport({
      tier: tierId as any,
      titleHi: tierMeta.labelHi,
      subtitleHi: tierMeta.descHi,
      userName: userNameInput || userProfile.name,
      phone: mobileInput || userProfile.phone || '',
      dob: customDob || userProfile.dob,
      birthTime,
      ishtDevta: ishtDevtaInput,
      mobileAnalysis: mobile10Result
    });
  };

  const handleCopyUPI = (upiId: string = 'aasthajaap@upi') => {
    try {
      navigator.clipboard.writeText(upiId);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 3000);
    } catch (e) {
      console.warn('Clipboard error:', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="bg-[#FFFDF9] border-2 border-orange-300 rounded-3xl max-w-2xl w-full max-h-[95vh] flex flex-col shadow-2xl overflow-hidden select-none">
        
        {/* MODAL HEADER */}
        <div className="p-3 sm:p-4 bg-gradient-to-r from-orange-700 via-amber-600 to-orange-800 text-white flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-2xl p-2 rounded-2xl bg-white/20 shadow-xs">🔢</span>
            <div>
              <h2 className="text-sm sm:text-base font-black tracking-wide flex items-center gap-2">
                <span>{isHi ? 'वैदिक अंक ज्ञान व मोबाइल अंक शास्त्र' : 'Vedic Anka Gyan & Numerology'}</span>
                <span className="text-[10px] bg-amber-400 text-orange-950 px-2 py-0.5 rounded-full font-black">
                  100% ऑफ़लाइन
                </span>
              </h2>
              <p className="text-[11px] text-amber-100 font-medium">
                {isHi ? '४ अंक मुफ़्त जांच, १० अंक महा-विश्लेषण, जीवन अंक कुंडली एवं VIP परामर्श' : 'Free 4 Digits & Complete Pro Reports'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 active:scale-95 transition-all text-amber-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PROFILE COMPLETION BANNER IF DETAILS ARE MISSING */}
        {!hasUserDetails && (
          <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/20 to-amber-500/15 border-b-2 border-orange-300 p-2.5 flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xl shrink-0">⚠️</span>
              <div className="min-w-0">
                <p className="text-xs font-black text-orange-950 truncate">
                  {isHi ? 'सटीक वैदिक रिपोर्ट हेतु जन्म विवरण भरें' : 'Enter birth details for accurate report'}
                </p>
                <p className="text-[10px] text-orange-800 line-clamp-1">
                  {isHi ? 'नाम, जन्म तिथि व समय के अनुसार ही प्रामाणिक PDF रिपोर्ट तैयार होगी।' : 'Accurate reports require your birth date & time.'}
                </p>
              </div>
            </div>
            {onOpenProfileSetup && (
              <button
                type="button"
                onClick={onOpenProfileSetup}
                className="px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-[11px] shrink-0 active:scale-95 transition-all shadow-xs"
              >
                {isHi ? 'जन्म विवरण भरें ✍️' : 'Set Profile ✍️'}
              </button>
            )}
          </div>
        )}

        {/* 5 TIER TABS NAVIGATION */}
        <div className="flex items-center gap-1 p-1.5 bg-orange-100/90 border-b border-orange-200 overflow-x-auto scrollbar-none text-xs font-bold shrink-0">
          {TIER_PRICING.map((tier) => {
            const isActive = activeTab === tier.id;
            const isUnlocked = unlockedTiers[tier.id];
            return (
              <button
                key={tier.id}
                onClick={() => setActiveTab(tier.id)}
                className={`px-3 py-2 rounded-xl shrink-0 transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xs'
                    : 'bg-white/80 hover:bg-white text-orange-950 border border-orange-200'
                }`}
              >
                <span>{tier.icon}</span>
                <span>{tier.price === 0 ? (isHi ? 'मुफ़्त जांच' : 'Free Check') : `₹${tier.price} (${tier.expectedPages}p)`}</span>
                {tier.price > 0 && (
                  <span className="text-[10px] opacity-90">
                    {isUnlocked ? <Unlock className="w-3 h-3 inline text-emerald-300" /> : <Lock className="w-3 h-3 inline text-amber-200" />}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB CONTENT VIEWER */}
        <div className="p-3 sm:p-4 overflow-y-auto space-y-3.5 flex-1 scrollbar-thin">

          {/* ========================================================= */}
          {/* TIER 1: FREE LAST 4 DIGITS ANALYSIS */}
          {/* ========================================================= */}
          {activeTab === 'tier1_free' && (
            <div className="space-y-3 animate-fadeIn text-xs">
              {/* MOBILE INPUT BOX */}
              <div className="bg-white border-2 border-orange-200 rounded-2xl p-3 shadow-2xs space-y-2">
                <label className="text-[11px] font-bold text-orange-950 block">
                  📱 {isHi ? 'अपना मोबाइल नंबर दर्ज करें (१० अंक):' : 'Enter 10-Digit Mobile Number:'}
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-2.5 py-1.5 bg-orange-50 border border-orange-300 rounded-xl font-bold text-orange-900 text-xs">
                    <span>🇮🇳 +91</span>
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={mobileInput}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, '');
                      setMobileInput(digits);
                    }}
                    placeholder={isHi ? '१० अंकों का मोबाइल नंबर' : '10-digit mobile number'}
                    className="flex-1 px-3 py-1.5 border border-orange-300 rounded-xl font-mono font-bold text-sm text-orange-950 tracking-wider focus:outline-none focus:ring-1 focus:ring-orange-500 bg-orange-50/40"
                  />
                  <button
                    onClick={handleTriggerFreeScan}
                    disabled={isScanning || mobileInput.length < 4}
                    className="px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-bold text-xs shadow-xs active:scale-95 transition-all flex items-center gap-1"
                  >
                    {isScanning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span>⚡ जांचें</span>}
                  </button>
                </div>
              </div>

              {/* SCANNING PROGRESS OVERLAY */}
              {isScanning && (
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-2xl text-center space-y-2 animate-pulse">
                  <Loader2 className="w-6 h-6 text-orange-600 animate-spin mx-auto" />
                  <p className="text-xs font-bold text-orange-950">{scanStepText}</p>
                </div>
              )}

              {/* FREE SCAN RESULTS */}
              {!isScanning && hasScannedFree && effectiveMobile.length >= 4 && (
                <div className="space-y-3">
                  <div className="bg-white border-2 border-orange-200 rounded-2xl p-3 space-y-2">
                    <div className="flex items-center justify-between border-b border-orange-100 pb-2">
                      <span className="font-black text-orange-950 text-sm">
                        अंतिम ४ अंक: <span className="font-mono text-orange-600 tracking-wider">...{last4Analysis.rawDigits}</span>
                      </span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                        {last4Analysis.verdictHi}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {last4Analysis.positions.map((pos) => (
                        <div key={pos.position} className="p-2 bg-orange-50/60 rounded-xl border border-orange-100">
                          <span className="text-[10px] font-bold text-orange-800 block">
                            {pos.posCode} ({pos.labelHi}):
                          </span>
                          <span className="text-base font-black text-orange-950 font-mono">
                            {pos.digit}
                          </span>
                          <p className="text-[10px] text-gray-700 leading-tight mt-0.5">
                            {pos.impactHi}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PRO UPGRADE CARD TO GET 5-PAGE PDF REPORT */}
                  <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-3.5 rounded-2xl shadow-md flex items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-black flex items-center gap-1">
                        <span>📱</span>
                        <span>सम्पूर्ण १० अंकों का D1 से D10 महा-विश्लेषण</span>
                      </h4>
                      <p className="text-[10px] text-amber-100 mt-0.5">
                        १३-३१, १४-४१, १७-७१, १८-८१ गुप्त प्रभाव व ५ पृष्ठों की अधिकृत PDF रिपोर्ट
                      </p>
                    </div>
                    <button
                      onClick={() => handleInitiateUnlock(TIER_PRICING[1])}
                      className="px-3.5 py-2 rounded-xl bg-white text-orange-950 font-black text-xs shadow-md hover:bg-amber-50 active:scale-95 shrink-0"
                    >
                      मात्र ₹19 • ५p PDF ➔
                    </button>
                  </div>
                </div>
              )}

              {/* EMPTY STATE PROMPT IF NOT SCANNED YET */}
              {!isScanning && (!hasScannedFree || effectiveMobile.length < 4) && (
                <div className="bg-white border-2 border-orange-200 rounded-2xl p-5 text-center space-y-2 shadow-2xs">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-2xl">
                    🔢
                  </div>
                  <h4 className="font-black text-orange-950 text-sm">
                    {isHi ? 'अंतिम ४ अंकों की वैदिक ऊर्जा जांचें' : 'Check Last 4 Digits Energy'}
                  </h4>
                  <p className="text-xs text-gray-600 max-w-sm mx-auto">
                    {isHi
                      ? 'ऊपर अपना 10 अंकों का मोबाइल नंबर दर्ज कर "⚡ जांचें" बटन दबाएं। आपके नंबर के D7 से D10 अंकों का सात्विक रहस्य प्रकट होगा।'
                      : 'Enter your 10-digit mobile number above and tap "Check" to instantly reveal the Vedic vibration of your last 4 digits.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* PAID TIERS: TIER 2, 3, 4, 5 (APPLE-GRADE REPORT CARDS & PDF) */}
          {/* ========================================================= */}
          {activeTab !== 'tier1_free' && (
            <div className="space-y-3.5 animate-fadeIn text-xs">
              {(() => {
                const currentTier = TIER_PRICING.find((t) => t.id === activeTab) || TIER_PRICING[1];
                const isUnlocked = unlockedTiers[activeTab];

                if (!isUnlocked) {
                  return (
                    <div className="p-5 bg-gradient-to-br from-amber-50/90 via-orange-50/80 to-amber-100/60 border-2 border-orange-300 rounded-3xl text-center space-y-3.5 shadow-md">
                      <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center text-3xl shadow-sm ring-4 ring-amber-200">
                        {currentTier.icon}
                      </div>

                      <div>
                        <span className="text-[10px] font-black uppercase text-orange-800 bg-orange-100 px-2.5 py-0.5 rounded-full border border-orange-200">
                          {currentTier.badgeHi}
                        </span>
                        <h3 className="text-base font-black text-orange-950 mt-1">
                          {currentTier.labelHi}
                        </h3>
                        <p className="text-xs text-orange-800 font-medium max-w-sm mx-auto mt-0.5">
                          {currentTier.descHi}
                        </p>
                      </div>

                      <div className="p-3 bg-white/90 border border-orange-200 rounded-2xl max-w-md mx-auto text-left space-y-1.5 shadow-2xs text-[11px]">
                        <p className="text-orange-950 font-bold flex items-center gap-1.5">
                          <span>📄</span>
                          <span><strong>अधिकृत पृष्ठ संख्या:</strong> {currentTier.expectedPages} पृष्ठों की सम्पूर्ण भरी हुई PDF रिपोर्ट</span>
                        </p>
                        <p className="text-orange-950 flex items-center gap-1.5">
                          <span>⏱️</span>
                          <span><strong>समय:</strong> १ से २ मिनट का समय लेकर गहन वैदिक गणना</span>
                        </p>
                        <p className="text-orange-950 flex items-center gap-1.5">
                          <span>📜</span>
                          <span><strong>प्रमाण:</strong> पराशर, जैमिनी, भृगु एवं चालडियन अंक शास्त्र सम्मत</span>
                        </p>
                      </div>

                      <button
                        onClick={() => handleInitiateUnlock(currentTier)}
                        className="w-full max-w-sm mx-auto py-3 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white font-black text-sm shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <Unlock className="w-4 h-4" />
                        <span>मात्र ₹{currentTier.price} में अनलॉक करें ({currentTier.expectedPages}p PDF)</span>
                      </button>
                    </div>
                  );
                }

                // UNLOCKED STATE: APPLE-GRADE OFFICIAL CERTIFICATE & DOWNLOAD HUB
                return (
                  <div className="space-y-3.5">
                    {/* OFFICIAL CERTIFICATE CARD */}
                    <div className="bg-white border-2 border-amber-400 rounded-3xl p-4 sm:p-5 shadow-lg space-y-3.5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-28 h-28 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />
                      
                      <div className="flex items-center justify-between border-b border-orange-200 pb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-3xl p-2 rounded-2xl bg-amber-100 text-amber-900 shadow-2xs border border-amber-300">
                            {currentTier.icon}
                          </span>
                          <div>
                            <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1 w-fit mb-0.5">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>अधिकृत रिपोर्ट अनलॉक</span>
                            </span>
                            <h3 className="text-base font-black text-orange-950">
                              {currentTier.labelHi}
                            </h3>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-black text-amber-900 bg-amber-100 px-3 py-1 rounded-xl border border-amber-300">
                          {currentTier.expectedPages} पृष्ठ PDF
                        </span>
                      </div>

                      {/* NATIVE RECORD METRICS */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-amber-50/50 p-2.5 rounded-2xl border border-amber-200 text-center text-xs">
                        <div>
                          <span className="text-[10px] text-gray-500 font-bold block">जातक:</span>
                          <span className="font-black text-orange-950 truncate block">{userNameInput || userProfile.name}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-500 font-bold block">मोबाइल:</span>
                          <span className="font-black text-orange-950 font-mono block">...{mobileInput.slice(-4)}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-500 font-bold block">मूलांक / भाग्यांक:</span>
                          <span className="font-black text-orange-950 font-mono block">{moolank} / {bhagyank}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-500 font-bold block">ऊर्जा स्कोर:</span>
                          <span className="font-black text-emerald-700 font-mono block">{mobile10Result.compatibilityScorePercent}%</span>
                        </div>
                      </div>

                      {/* PRIMARY ACTION: DOWNLOAD FULL MULTI-PAGE PDF */}
                      <div className="space-y-2 pt-1">
                        <button
                          type="button"
                          onClick={() => startPdfGeneration(currentTier)}
                          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-black text-sm shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 border border-amber-300"
                        >
                          <Download className="w-5 h-5 fill-current" />
                          <span>📥 सम्पूर्ण {currentTier.expectedPages} पृष्ठों की अधिकृत PDF डाउनलोड करें</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenPrintableView(currentTier.id)}
                            className="flex-1 py-2 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-950 font-bold text-xs border border-orange-300 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>🖨️ प्रिंट / व्यू विंडो खोलें</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => startPdfGeneration(currentTier)}
                            className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-200 active:scale-95 transition-all"
                            title="पुनः संकलित करें"
                          >
                            🔄 पुनः बनाएं
                          </button>
                        </div>
                      </div>

                      <p className="text-[10px] text-gray-500 text-center leading-tight">
                        {isHi
                          ? `नोट: यह विस्तृत रिपोर्ट पूर्णतः A4 आकार में ${currentTier.expectedPages} पृष्ठों की सघन वैदिक जानकारी से सुसज्जित है। डाउनलोड के बाद इसे किसी भी PDF रीडर में खोलें।`
                          : `Note: Official ${currentTier.expectedPages}-page high-resolution PDF with deep Vedic remedies.`}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* Shastric & Legal Disclaimer */}
        <div className="mx-3.5 mb-2 p-3 bg-amber-50/90 border border-amber-300 rounded-2xl text-left select-none">
          <div className="flex items-center gap-1.5 text-amber-950 font-bold text-xs mb-1">
            <span>⚖️</span>
            <span>{isHi ? 'शास्त्रोक्त एवं वैधानिक अस्वीकरण (Legal Disclaimer):' : 'Legal & Numerological Disclaimer:'}</span>
          </div>
          <p className="text-[10px] text-amber-900/80 leading-relaxed">
            {isHi
              ? 'यह अंक ज्योतिष विश्लेषण चालडियन एवं वैदिक अंक विद्या के प्राचीन सूत्रों पर आधारित एक व्यक्तिगत व शैक्षणिक मार्गदर्शन है। यह किसी भी वित्तीय, चिकित्सीय या कानूनी सलाह का विकल्प नहीं है।'
              : 'This numerology analysis is based on classical Chaldean and Vedic principles for personal enrichment and spiritual guidance only.'}
          </p>
        </div>

        {/* MODAL FOOTER */}
        <div className="p-3 bg-orange-50 border-t border-orange-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1 text-[11px] text-orange-900 font-bold">
            <span>🕉️</span>
            <span>{isHi ? 'आस्था वैदिक अंक शास्त्र' : 'Aastha Vedic Numerology'}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-orange-600 text-white font-bold text-xs shadow-xs hover:bg-orange-700 active:scale-95 transition-all"
          >
            {isHi ? 'पूर्ण (बंद करें)' : 'Close'}
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* AUTHENTIC SANSTHA PAYMENT MODAL */}
      {/* ========================================================= */}
      {showPaymentModal && pendingTier && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 animate-fadeIn">
          <div className="bg-[#FFFDF9] border-2 border-orange-400 rounded-3xl max-w-sm w-full p-4 shadow-2xl space-y-3.5 text-center relative select-none">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-orange-100 text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-black uppercase text-orange-800 tracking-wider">
                {isHi ? 'सनातन आध्यात्मिक सेवा' : 'Sanstha Seva & Unlock'}
              </span>
              <h3 className="text-base font-black text-orange-950 mt-0.5">
                {pendingTier.labelHi}
              </h3>
              <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-950 font-black text-base border border-orange-300 mt-1">
                सहयोग राशि: ₹{pendingTier.price} • {pendingTier.expectedPages} पृष्ठ PDF
              </div>
            </div>

            {/* SANSTHA QR CODE */}
            <div className="p-2.5 bg-white border-2 border-orange-300 rounded-2xl shadow-sm inline-block mx-auto">
              <img
                src="/sanstha_donation_qr.jpg"
                alt="Sanstha Donation UPI QR Code"
                className="w-48 h-48 object-contain mx-auto rounded-xl"
              />
              <span className="text-[10px] font-bold text-gray-500 block mt-1">
                {isHi ? 'किसी भी UPI ऐप से स्कैन करें' : 'Scan via Any UPI App'}
              </span>
            </div>

            {/* UPI ID */}
            <div className="flex items-center justify-between p-2 bg-orange-100/70 border border-orange-300 rounded-xl text-xs font-mono">
              <span className="font-bold text-orange-950 truncate max-w-[200px]">aasthajaap@upi</span>
              <button
                onClick={() => handleCopyUPI('aasthajaap@upi')}
                className="px-2 py-1 bg-white rounded-lg border border-orange-300 font-sans font-bold text-[10px] text-orange-900 hover:bg-orange-50 active:scale-95 flex items-center gap-1 shadow-2xs"
              >
                {copiedUpi ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedUpi ? (isHi ? 'कॉपी हुआ' : 'Copied') : (isHi ? 'कॉपी' : 'Copy')}</span>
              </button>
            </div>

            {/* ACTIONS */}
            <div className="space-y-2 pt-1">
              <a
                href={`upi://pay?pa=aasthajaap@upi&pn=Aastha%20Puja%20Sanstha&am=${pendingTier.price}&tn=Anka%20Gyan%20${pendingTier.id}&cu=INR`}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-black text-xs shadow-sm hover:from-emerald-700 hover:to-green-700 active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <QrCode className="w-4 h-4" />
                <span>{isHi ? `UPI ऐप से ₹${pendingTier.price} सहयोग करें` : `Pay ₹${pendingTier.price} via UPI App`}</span>
              </a>

              <button
                onClick={() => handleConfirmUnlock(pendingTier.id)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black text-xs shadow-md hover:from-orange-700 hover:to-amber-700 active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <Unlock className="w-4 h-4" />
                <span>{isHi ? 'सहयोग पूर्ण • रिपोर्ट तुरंत अनलॉक करें' : 'Unlock Report Immediately'}</span>
              </button>
            </div>

            <p className="text-[10px] text-gray-500 leading-tight">
              {isHi
                ? 'यह राशि संस्था के आध्यात्मिक प्रकल्प, वेद पाठशाला एवं गौ सेवा में प्रयुक्त होती है।'
                : '100% offline access. Donation supports Sanatan spiritual mission.'}
            </p>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* APPLE-GRADE REALISTIC PDF GENERATION OVERLAY (1-2 Minutes) */}
      {/* ========================================================= */}
      {isGeneratingPdf && activeGeneratingTier && (
        <div className="fixed inset-0 z-70 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FFFDF9] border-2 border-amber-400 rounded-3xl max-w-md w-full p-6 shadow-2xl text-center space-y-4 select-none relative overflow-hidden">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 flex items-center justify-center text-4xl shadow-lg ring-4 ring-amber-200/80 mx-auto animate-pulse">
              ☸️
            </div>

            <div>
              <span className="text-[11px] font-black uppercase text-amber-800 bg-amber-100 border border-amber-300 px-3 py-0.5 rounded-full">
                {isHi ? 'शास्त्र-सम्मत वैदिक रिपोर्ट संकलन' : 'Shastric Vedic Report Generation'}
              </span>
              <h3 className="text-base sm:text-lg font-black text-orange-950 mt-1.5">
                {activeGeneratingTier.labelHi}
              </h3>
              <p className="text-xs text-orange-800 font-bold">
                {activeGeneratingTier.expectedPages} {isHi ? 'विस्तृत पृष्ठों की अधिकृत PDF तैयार हो रही है' : 'Pages Detailed PDF Compiling'}
              </p>
            </div>

            {/* Progress bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs font-black text-orange-950 px-1">
                <span className="truncate max-w-[260px] text-left">{pdfProgressStatus}</span>
                <span className="text-orange-600 shrink-0 font-mono">{pdfProgressPercent}%</span>
              </div>
              <div className="w-full bg-orange-100 rounded-full h-3 overflow-hidden p-0.5 border border-orange-200">
                <div
                  className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 h-full rounded-full transition-all duration-500 shadow-xs"
                  style={{ width: `${pdfProgressPercent}%` }}
                />
              </div>
            </div>

            <p className="text-[11px] text-gray-500 leading-relaxed pt-1">
              {isHi
                ? 'कृपया प्रतीक्षा करें... पराशर, जैमिनी एवं चालडियन सूत्रों द्वारा आपकी सम्पूर्ण कुंडली व उपाय संकलित हो रहे हैं।'
                : 'Please wait... Compiling authentic Vedic calculations and custom remedial guidelines.'}
            </p>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DOWNLOAD SUCCESS MODAL */}
      {/* ========================================================= */}
      {downloadSuccessModal && activeGeneratingTier && (
        <div className="fixed inset-0 z-70 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FFFDF9] border-2 border-emerald-400 rounded-3xl max-w-sm w-full p-5 shadow-2xl text-center space-y-3.5 select-none relative">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto shadow-md border-2 border-emerald-300">
              ✓
            </div>

            <div>
              <h3 className="text-base font-black text-emerald-950">
                {isHi ? 'रिपोर्ट सफलतापूर्वक तैयार!' : 'Report Successfully Created!'}
              </h3>
              <p className="text-xs text-emerald-800 font-bold mt-0.5">
                {activeGeneratingTier.expectedPages} {isHi ? 'पृष्ठों की विस्तृत वैदिक PDF डाउनलोड हो चुकी है।' : 'Pages Detailed Vedic PDF Downloaded.'}
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => startPdfGeneration(activeGeneratingTier)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-black text-xs shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>{isHi ? '📥 PDF पुनः डाउनलोड करें' : 'Download PDF Again'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  handleOpenPrintableView(activeGeneratingTier.id);
                }}
                className="w-full py-2 rounded-xl bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-950 font-bold text-xs active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <FileText className="w-4 h-4" />
                <span>{isHi ? '🖨️ प्रिंट / व्यू विंडो खोलें' : 'Open Printable View'}</span>
              </button>

              <button
                type="button"
                onClick={() => setDownloadSuccessModal(false)}
                className="w-full py-1.5 text-xs text-gray-500 hover:text-gray-700 font-bold"
              >
                {isHi ? 'पूर्ण (बंद करें)' : 'Done (Close)'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

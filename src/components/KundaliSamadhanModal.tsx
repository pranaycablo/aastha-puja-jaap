import React, { useState, useMemo } from 'react';
import { UserProfile, MantraItem, LanguageCode } from '../types';
import { generateOfflineKundali, KundaliAnalysis } from '../utils/kundaliEngine';
import { analyzeMobileNumber } from '../utils/ankaJyotishEngine';
import {
  SAMASYA_SAMADHAN_ITEMS,
  SAMASYA_SAMADHAN_CATEGORIES,
  SamasyaSamadhanItem
} from '../data/samasyaSamadhanData';
import { PRELOADED_MANTRAS } from '../data/mantraDatabase';
import { HastRekhaSection } from './HastRekhaSection';
import { AnkaJyotishSection } from './AnkaJyotishSection';
import { generateAndDownloadVedicReport } from '../utils/vedicReportPdfEngine';
import { openPrintableAnkaReport } from '../utils/ankaGyanPdfGenerator';
import {
  X,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Search,
  Play,
  Clock,
  Compass,
  Heart,
  Flame,
  CheckCircle2,
  Calendar,
  MapPin,
  Edit3,
  Download,
  Lock,
  Unlock,
  FileText,
  QrCode,
  Copy,
  Check,
  Loader2,
  FileCheck
} from 'lucide-react';

export type JyotishTabType = 'kundali' | 'hastrekha' | 'ankajyotish' | 'samadhan';

export interface KundaliReportTier {
  id: 'tier2_mobile' | 'tier3_life' | 'tier4_wealth' | 'tier5_vip';
  price: 19 | 91 | 197 | 1970;
  expectedPages: 5 | 11 | 21 | 51;
  labelHi: string;
  labelEn: string;
  badgeHi: string;
  icon: string;
  descHi: string;
  highlightHi: string;
}

const KUNDALI_REPORT_TIERS: KundaliReportTier[] = [
  {
    id: 'tier2_mobile',
    price: 19,
    expectedPages: 5,
    labelHi: 'संक्षिप्त कुण्डली व १० अंक विश्लेषण',
    labelEn: 'Brief Kundali & 10 Digits Analysis',
    badgeHi: '₹19 • ५ पृष्ठ PDF',
    icon: '📜',
    descHi: 'लग्न कुण्डली चक्र, ग्रह स्थिति, मूलांक-भाग्यांक, मोबाइल विश्लेषण व प्राथमिक शास्त्रोक्त उपाय।',
    highlightHi: 'प्रवेशिका रिपोर्ट • तुरंत डाउनलोड'
  },
  {
    id: 'tier3_life',
    price: 91,
    expectedPages: 11,
    labelHi: 'सम्पूर्ण कुण्डली, वेद, शास्त्र, गुरु व अंकशास्त्र फलादेश',
    labelEn: 'Complete Kundali, Veda, Shastra & Numerology',
    badgeHi: '₹91 • ११ पृष्ठ PDF',
    icon: '🕉️',
    descHi: 'सम्पूर्ण कुण्डली, १२ भावों का विस्तृत फलादेश, नवग्रह तालिका, विंशोत्तरी दशा, गुरु कृपा, अंकशास्त्र व अचूक शास्त्र सम्मत उपाय।',
    highlightHi: 'सर्वाधिक लोकप्रिय • संपूर्ण फलादेश'
  },
  {
    id: 'tier4_wealth',
    price: 197,
    expectedPages: 21,
    labelHi: 'महा-भाग्य, धन, करियर, विवाह व जीवन चक्र संहिता',
    labelEn: 'Wealth, Career, Marriage & 21 Pages Treatise',
    badgeHi: '₹197 • २१ पृष्ठ PDF',
    icon: '💰',
    descHi: 'धन योग, नौकरी/व्यवसाय विस्तार, दांपत्य जीवन, वर्षफल, अनुकूल-प्रतिकूल समयावधि व ३६५ दिवसीय सुरक्षा कवच।',
    highlightHi: 'विस्तृत संहिता • २१ पृष्ठ'
  },
  {
    id: 'tier5_vip',
    price: 1970,
    expectedPages: 51,
    labelHi: 'VIP पूर्ण व्यक्तिगत कुण्डली व महा-सुझाव संहिता',
    labelEn: 'VIP Master Kundali & Shastric Treatise',
    badgeHi: 'VIP ₹1970 • ५१ पृष्ठ PDF',
    icon: '👑',
    descHi: 'महर्षि पराशर पद्धति आधारित ५१ पृष्ठों का महाग्रंथ—सम्पूर्ण जीवन फलादेश, रत्न, रुद्राक्ष, सिद्ध मंत्र, इष्ट देव साधना व VIP व्यक्तिगत परामर्श।',
    highlightHi: 'VIP महाग्रंथ • ५१ पृष्ठ'
  }
];

interface KundaliSamadhanModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onSelectMantraAndStartJaap: (mantra: MantraItem) => void;
  onEditProfile: () => void;
  language?: LanguageCode;
  initialTab?: JyotishTabType;
}

export const KundaliSamadhanModal: React.FC<KundaliSamadhanModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onSelectMantraAndStartJaap,
  onEditProfile,
  language = 'hi',
  initialTab = 'kundali'
}) => {
  const isHi = language === 'hi';
  const [activeTab, setActiveTab] = useState<JyotishTabType>(initialTab);

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  // Unlocked Tiers State (persisted in LocalStorage)
  const [unlockedTiers, setUnlockedTiers] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('divya_jaap_unlocked_tiers');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return {};
  });

  // Phone input for report
  const [phoneForReport, setPhoneForReport] = useState<string>(userProfile.phone || '');

  // Payment modal state
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [pendingTier, setPendingTier] = useState<KundaliReportTier | null>(null);
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);

  // PDF Generation State
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [activeGeneratingTier, setActiveGeneratingTier] = useState<KundaliReportTier | null>(null);
  const [pdfProgressPercent, setPdfProgressPercent] = useState<number>(0);
  const [pdfProgressStatus, setPdfProgressStatus] = useState<string>('');
  const [downloadSuccessModal, setDownloadSuccessModal] = useState<boolean>(false);

  // Generate Real Offline Kundali - strictly requires real user birth date
  const kundali = useMemo<KundaliAnalysis | null>(() => {
    if (!userProfile.dob || !userProfile.dob.trim()) {
      return null;
    }
    return generateOfflineKundali(
      userProfile.name && userProfile.name !== 'साधक' ? userProfile.name : (isHi ? 'भक्त' : 'Devotee'),
      userProfile.dob,
      userProfile.birthTime || '06:00',
      userProfile.birthPlace || userProfile.address || (isHi ? 'वाराणसी (काशी)' : 'Varanasi')
    );
  }, [userProfile.name, userProfile.dob, userProfile.birthTime, userProfile.birthPlace, userProfile.address, isHi]);

  // Filter Samasya Samadhan Items
  const filteredSamadhanList = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return SAMASYA_SAMADHAN_ITEMS.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch =
        !q ||
        item.problemTitle.toLowerCase().includes(q) ||
        item.shortDescription.toLowerCase().includes(q) ||
        item.shastriyaSamadhan.toLowerCase().includes(q) ||
        item.expectedBenefits.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  if (!isOpen) return null;

  const handleStartJaapFromSamadhan = (mantraId: string) => {
    const found = PRELOADED_MANTRAS.find((m) => m.id === mantraId) || PRELOADED_MANTRAS[0];
    onSelectMantraAndStartJaap(found);
    onClose();
  };

  const handleSelectReportTier = (tier: KundaliReportTier) => {
    if (!userProfile.dob || !userProfile.dob.trim()) {
      alert(isHi ? 'कृपया कुण्डली रिपोर्ट बनाने के लिए अपनी जन्म तिथि दर्ज करें।' : 'Please enter your birth date for the report.');
      onClose();
      onEditProfile();
      return;
    }

    if (unlockedTiers[tier.id]) {
      startPdfGeneration(tier);
      return;
    }

    setPendingTier(tier);
    setShowPaymentModal(true);
  };

  const handleConfirmUnlock = (tier: KundaliReportTier) => {
    const nextState = { ...unlockedTiers, [tier.id]: true };
    setUnlockedTiers(nextState);
    try {
      localStorage.setItem('divya_jaap_unlocked_tiers', JSON.stringify(nextState));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    setShowPaymentModal(false);
    startPdfGeneration(tier);
  };

  const startPdfGeneration = async (tier: KundaliReportTier) => {
    setActiveGeneratingTier(tier);
    setIsGeneratingPdf(true);
    setPdfProgressPercent(5);
    setPdfProgressStatus(isHi ? 'वैदिक लग्न कुण्डली व नवग्रह स्थिति संकलन...' : 'Initializing Kundali calculations...');

    try {
      await generateAndDownloadVedicReport({
        tier: tier.id,
        price: tier.price,
        expectedPages: tier.expectedPages,
        userProfile: {
          ...userProfile,
          phone: phoneForReport || userProfile.phone || 'XXXXXXXXXX'
        },
        phoneInput: phoneForReport || userProfile.phone || '',
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

  const handleOpenPrintableView = (tier: KundaliReportTier) => {
    const validPhone = (phoneForReport || userProfile.phone || '').replace(/\D/g, '');
    openPrintableAnkaReport({
      tier: tier.id as any,
      titleHi: tier.labelHi,
      subtitleHi: tier.descHi,
      userName: userProfile.name || (isHi ? 'जातक' : 'Devotee'),
      phone: validPhone,
      dob: userProfile.dob || '',
      birthTime: userProfile.birthTime || '06:00',
      ishtDevta: userProfile.ishtDevta || (isHi ? 'भगवान शिव (महादेव)' : 'Lord Shiva'),
      mobileAnalysis: analyzeMobileNumber(validPhone || '0000000000')
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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 animate-fadeIn">
      <div className="bg-[#FFFDF9] border-2 border-orange-300 rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden select-none">
        {/* HEADER */}
        <div className="p-3 sm:p-4 bg-gradient-to-r from-orange-700 via-amber-600 to-orange-700 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🪐</span>
            <div>
              <h2 className="text-sm sm:text-base font-black tracking-wide">
                {isHi ? 'कुण्डली दर्शन व समस्या समाधान' : 'Kundali & Problem Solutions'}
              </h2>
              <span className="text-[10px] text-amber-100 font-semibold">
                {isHi ? '१००% वास्तविक ऑफलाइन कुण्डली व शास्त्र सम्मत उपाय' : 'Authentic Offline Vedic Astrological Remedies'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all active:scale-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 MAIN TABS: KUNDALI, HAST REKHA, ANKA JYOTISH, SAMADHAN */}
        <div className="grid grid-cols-4 bg-orange-100/80 p-1 border-b border-orange-200 text-xs font-black text-center gap-1">
          <button
            onClick={() => setActiveTab('kundali')}
            className={`py-2 px-1 rounded-xl flex items-center justify-center gap-1 transition-all ${
              activeTab === 'kundali'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md'
                : 'text-orange-950 hover:bg-white/50'
            }`}
          >
            <span className="text-sm">🪐</span>
            <span className="truncate">{isHi ? 'कुण्डली' : 'Kundali'}</span>
          </button>

          <button
            onClick={() => setActiveTab('hastrekha')}
            className={`py-2 px-1 rounded-xl flex items-center justify-center gap-1 transition-all ${
              activeTab === 'hastrekha'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md'
                : 'text-orange-950 hover:bg-white/50'
            }`}
          >
            <span className="text-sm">✋</span>
            <span className="truncate">{isHi ? 'हस्त ज्ञान' : 'Palmistry'}</span>
          </button>

          <button
            onClick={() => setActiveTab('ankajyotish')}
            className={`py-2 px-1 rounded-xl flex items-center justify-center gap-1 transition-all ${
              activeTab === 'ankajyotish'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md'
                : 'text-orange-950 hover:bg-white/50'
            }`}
          >
            <span className="text-sm">🔢</span>
            <span className="truncate">{isHi ? 'अंक ज्योतिष' : 'Numbers'}</span>
          </button>

          <button
            onClick={() => setActiveTab('samadhan')}
            className={`py-2 px-1 rounded-xl flex items-center justify-center gap-1 transition-all ${
              activeTab === 'samadhan'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md'
                : 'text-orange-950 hover:bg-white/50'
            }`}
          >
            <span className="text-sm">❓</span>
            <span className="truncate">{isHi ? 'समाधान' : 'Solutions'}</span>
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="p-3 sm:p-4 overflow-y-auto space-y-3.5 flex-1 scrollbar-thin">
          {/* ======================================================== */}
          {/* TAB 1: REAL OFFLINE KUNDALI, REPORT HUB & GRAHA REMEDIES */}
          {/* ======================================================== */}
          {activeTab === 'kundali' && (
            <div className="space-y-3 animate-fadeIn">
              {!kundali ? (
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-orange-300 rounded-3xl p-6 text-center space-y-4 shadow-sm my-2">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-3xl flex items-center justify-center mx-auto shadow-inner">
                    🪐
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-black text-orange-950">
                      {isHi ? 'वास्तविक जन्म विवरण आवश्यक है' : 'Real Birth Details Required'}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed max-w-sm mx-auto">
                      {isHi
                        ? 'सनातन वैदिक ज्योतिष सिद्धांत के अनुसार बिना वास्तविक जन्म तिथि, समय व स्थान के ग्रह स्थिति अथवा कुण्डली फलादेश पूर्णतः निराधार होता है। कृपया अपना सही विवरण दर्ज करें।'
                        : 'Authentic Vedic astrology requires your real date of birth, time, and birthplace for precise planetary calculations.'}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onEditProfile();
                    }}
                    className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white font-black text-sm shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <span>✍️</span>
                    <span>{isHi ? 'अपनी जन्म पत्रिका विवरण भरें' : 'Enter Your Birth Details'}</span>
                  </button>
                </div>
              ) : (
                <>
              {/* Devotee Info Card with Edit Option */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-orange-200 rounded-2xl p-3 flex items-center justify-between shadow-xs">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-base font-black text-orange-950">{kundali.name}</span>
                    <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-orange-600 text-white">
                      {kundali.lagnaSign}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-gray-700 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-orange-600" />
                      <span>{userProfile.dob || (isHi ? 'जन्म तिथि दर्ज नहीं' : 'DOB not set')}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-orange-600" />
                      <span>{userProfile.birthTime || (isHi ? 'समय दर्ज नहीं' : 'Time not set')}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-orange-600" />
                      <span>{userProfile.birthPlace || userProfile.address || (isHi ? 'स्थान दर्ज नहीं' : 'Place not set')}</span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onEditProfile();
                  }}
                  className="px-2.5 py-1.5 rounded-xl border border-orange-300 bg-white text-orange-950 font-bold text-[11px] hover:bg-orange-50 active:scale-95 transition-all flex items-center gap-1 shrink-0 shadow-xs"
                >
                  <Edit3 className="w-3 h-3 text-orange-600" />
                  <span>{isHi ? 'बदलें' : 'Edit'}</span>
                </button>
              </div>

              {/* RASHI & NAKSHATRA HIGHLIGHT PILLS */}
              <div className="grid grid-cols-3 gap-1.5 text-center">
                <div className="bg-white border border-orange-200 rounded-2xl p-2 shadow-xs">
                  <span className="text-[9.5px] font-bold text-gray-500 uppercase block">{isHi ? 'लग्न' : 'Ascendant'}</span>
                  <span className="text-xs font-black text-orange-950 block">{kundali.lagnaSign.split('(')[0]}</span>
                  <span className="text-[9px] text-orange-700 font-bold">{isHi ? `स्वामी: ${kundali.lagnaLord}` : kundali.lagnaLord}</span>
                </div>

                <div className="bg-white border border-orange-200 rounded-2xl p-2 shadow-xs">
                  <span className="text-[9.5px] font-bold text-gray-500 uppercase block">{isHi ? 'चन्द्र राशि' : 'Moon Sign'}</span>
                  <span className="text-xs font-black text-orange-950 block">{kundali.moonSign.split('(')[0]}</span>
                  <span className="text-[9px] text-orange-700 font-bold">{isHi ? `स्वामी: ${kundali.moonSignLord}` : kundali.moonSignLord}</span>
                </div>

                <div className="bg-white border border-orange-200 rounded-2xl p-2 shadow-xs">
                  <span className="text-[9.5px] font-bold text-gray-500 uppercase block">{isHi ? 'नक्षत्र' : 'Nakshatra'}</span>
                  <span className="text-xs font-black text-orange-950 block">{kundali.nakshatra}</span>
                  <span className="text-[9px] text-orange-700 font-bold">{isHi ? `चरण: ${kundali.charan}` : `Padas: ${kundali.charan}`}</span>
                </div>
              </div>

              {/* ======================================================== */}
              {/* DEDICATED VEDIC KUNDALI & ANKASHASTRA PDF REPORT HUB */}
              {/* ======================================================== */}
              <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/15 to-amber-500/10 border-2 border-orange-300 rounded-3xl p-3.5 shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📜</span>
                    <div>
                      <h3 className="text-xs sm:text-sm font-black text-orange-950">
                        {isHi ? 'सम्पूर्ण कुण्डली व वेद-शास्त्र फलादेश रिपोर्ट (PDF)' : 'Complete Vedic Kundali Report (PDF)'}
                      </h3>
                      <p className="text-[10px] text-orange-800 font-bold">
                        {isHi
                          ? '५ से ५१ पृष्ठों की १००% प्रामाणिक, विस्तृत PDF रिपोर्ट तुरंत प्राप्त करें'
                          : '5 to 51 Pages Comprehensive Shastric PDF Report'}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
                    शुद्ध हिंदी
                  </span>
                </div>

                {/* 4 TIERS DISPLAY CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {KUNDALI_REPORT_TIERS.map((tier) => {
                    const isUnlocked = unlockedTiers[tier.id];
                    return (
                      <div
                        key={tier.id}
                        className={`rounded-2xl border-2 p-2.5 flex flex-col justify-between transition-all ${
                          tier.price === 91
                            ? 'bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100/70 border-orange-400 shadow-sm ring-1 ring-orange-300'
                            : 'bg-white border-orange-200 hover:border-orange-300 shadow-xs'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-orange-600 text-white">
                              {tier.badgeHi}
                            </span>
                            <span className="text-[9.5px] font-bold text-amber-800">
                              {tier.highlightHi}
                            </span>
                          </div>

                          <h4 className="text-xs font-black text-orange-950 leading-snug pt-0.5">
                            {tier.icon} {tier.labelHi}
                          </h4>

                          <p className="text-[10.5px] text-gray-600 leading-tight">
                            {tier.descHi}
                          </p>
                        </div>

                        <div className="pt-2 mt-1 border-t border-orange-100 flex items-center justify-between gap-2">
                          <div className="text-xs font-black text-orange-950">
                            ₹{tier.price}
                          </div>

                          <button
                            type="button"
                            onClick={() => handleSelectReportTier(tier)}
                            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1 shadow-xs active:scale-95 ${
                              isUnlocked
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                : 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white'
                            }`}
                          >
                            {isUnlocked ? (
                              <>
                                <Download className="w-3.5 h-3.5" />
                                <span>{isHi ? 'डाउनलोड PDF' : 'Download'}</span>
                              </>
                            ) : (
                              <>
                                <Lock className="w-3 h-3 text-amber-200" />
                                <span>{isHi ? `अनलॉक ₹${tier.price}` : `Unlock ₹${tier.price}`}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ======================================================== */}
              {/* NORTH INDIAN DIAMOND KUNDALI CHART (पारंपरिक लग्न चक्र) */}
              {/* ======================================================== */}
              <div className="bg-gradient-to-b from-[#FFFDF9] via-[#FFF9EE] to-[#FFF3DC] border-2 border-amber-300 rounded-3xl p-3 shadow-md flex flex-col items-center">
                <div className="flex items-center justify-between w-full mb-1.5 px-1">
                  <span className="text-xs font-black text-orange-950 flex items-center gap-1">
                    <span>🕉️</span>
                    <span>{isHi ? 'वैदिक लग्न कुण्डली चक्र (North Indian Chart)' : 'Vedic Lagna Kundali'}</span>
                  </span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-orange-600 text-white">
                    {kundali.lagnaSign.split('(')[0]} लग्न
                  </span>
                </div>

                {/* SVG DIAMOND CHART */}
                <div className="w-full max-w-[280px] h-[280px] relative select-none">
                  <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-sm" xmlns="http://www.w3.org/2000/svg">
                    {/* Outer Square */}
                    <rect x="5" y="5" width="290" height="290" fill="#FFFDF8" stroke="#D97706" strokeWidth="2.5" />
                    {/* Diagonals */}
                    <line x1="5" y1="5" x2="295" y2="295" stroke="#D97706" strokeWidth="2" />
                    <line x1="295" y1="5" x2="5" y2="295" stroke="#D97706" strokeWidth="2" />
                    {/* Inner Diamond */}
                    <polygon points="150,5 295,150 150,295 5,150" fill="none" stroke="#D97706" strokeWidth="2.5" />

                    {/* House Numbers (1 to 12) & Sign Numbers */}
                    {/* 1st House (Top Center Diamond) */}
                    <text x="150" y="85" fontSize="11" fontWeight="900" fill="#B45309" textAnchor="middle">
                      {kundali.houses[0]?.signNumber}
                    </text>
                    <text x="150" y="105" fontSize="10.5" fontWeight="900" fill="#EA580C" textAnchor="middle">
                      {kundali.houses[0]?.planets.join(' ') || '•'}
                    </text>

                    {/* 2nd House (Top Left Triangle) */}
                    <text x="80" y="45" fontSize="10" fontWeight="900" fill="#B45309" textAnchor="middle">
                      {kundali.houses[1]?.signNumber}
                    </text>
                    <text x="80" y="65" fontSize="10" fontWeight="900" fill="#EA580C" textAnchor="middle">
                      {kundali.houses[1]?.planets.join(' ') || '•'}
                    </text>

                    {/* 3rd House (Far Left Triangle Top) */}
                    <text x="45" y="80" fontSize="10" fontWeight="900" fill="#B45309" textAnchor="middle">
                      {kundali.houses[2]?.signNumber}
                    </text>
                    <text x="45" y="100" fontSize="10" fontWeight="900" fill="#EA580C" textAnchor="middle">
                      {kundali.houses[2]?.planets.join(' ') || '•'}
                    </text>

                    {/* 4th House (Left Diamond Center) */}
                    <text x="85" y="150" fontSize="11" fontWeight="900" fill="#B45309" textAnchor="middle">
                      {kundali.houses[3]?.signNumber}
                    </text>
                    <text x="85" y="170" fontSize="10.5" fontWeight="900" fill="#EA580C" textAnchor="middle">
                      {kundali.houses[3]?.planets.join(' ') || '•'}
                    </text>

                    {/* 5th House (Far Left Triangle Bottom) */}
                    <text x="45" y="220" fontSize="10" fontWeight="900" fill="#B45309" textAnchor="middle">
                      {kundali.houses[4]?.signNumber}
                    </text>
                    <text x="45" y="240" fontSize="10" fontWeight="900" fill="#EA580C" textAnchor="middle">
                      {kundali.houses[4]?.planets.join(' ') || '•'}
                    </text>

                    {/* 6th House (Bottom Left Triangle) */}
                    <text x="80" y="255" fontSize="10" fontWeight="900" fill="#B45309" textAnchor="middle">
                      {kundali.houses[5]?.signNumber}
                    </text>
                    <text x="80" y="275" fontSize="10" fontWeight="900" fill="#EA580C" textAnchor="middle">
                      {kundali.houses[5]?.planets.join(' ') || '•'}
                    </text>

                    {/* 7th House (Bottom Center Diamond) */}
                    <text x="150" y="215" fontSize="11" fontWeight="900" fill="#B45309" textAnchor="middle">
                      {kundali.houses[6]?.signNumber}
                    </text>
                    <text x="150" y="235" fontSize="10.5" fontWeight="900" fill="#EA580C" textAnchor="middle">
                      {kundali.houses[6]?.planets.join(' ') || '•'}
                    </text>

                    {/* 8th House (Bottom Right Triangle) */}
                    <text x="220" y="255" fontSize="10" fontWeight="900" fill="#B45309" textAnchor="middle">
                      {kundali.houses[7]?.signNumber}
                    </text>
                    <text x="220" y="275" fontSize="10" fontWeight="900" fill="#EA580C" textAnchor="middle">
                      {kundali.houses[7]?.planets.join(' ') || '•'}
                    </text>

                    {/* 9th House (Far Right Triangle Bottom) */}
                    <text x="255" y="220" fontSize="10" fontWeight="900" fill="#B45309" textAnchor="middle">
                      {kundali.houses[8]?.signNumber}
                    </text>
                    <text x="255" y="240" fontSize="10" fontWeight="900" fill="#EA580C" textAnchor="middle">
                      {kundali.houses[8]?.planets.join(' ') || '•'}
                    </text>

                    {/* 10th House (Right Diamond Center) */}
                    <text x="215" y="150" fontSize="11" fontWeight="900" fill="#B45309" textAnchor="middle">
                      {kundali.houses[9]?.signNumber}
                    </text>
                    <text x="215" y="170" fontSize="10.5" fontWeight="900" fill="#EA580C" textAnchor="middle">
                      {kundali.houses[9]?.planets.join(' ') || '•'}
                    </text>

                    {/* 11th House (Far Right Triangle Top) */}
                    <text x="255" y="80" fontSize="10" fontWeight="900" fill="#B45309" textAnchor="middle">
                      {kundali.houses[10]?.signNumber}
                    </text>
                    <text x="255" y="100" fontSize="10" fontWeight="900" fill="#EA580C" textAnchor="middle">
                      {kundali.houses[10]?.planets.join(' ') || '•'}
                    </text>

                    {/* 12th House (Top Right Triangle) */}
                    <text x="220" y="45" fontSize="10" fontWeight="900" fill="#B45309" textAnchor="middle">
                      {kundali.houses[11]?.signNumber}
                    </text>
                    <text x="220" y="65" fontSize="10" fontWeight="900" fill="#EA580C" textAnchor="middle">
                      {kundali.houses[11]?.planets.join(' ') || '•'}
                    </text>
                  </svg>
                </div>

                <div className="flex items-center justify-center gap-2 mt-2 text-[10px] text-gray-600 flex-wrap">
                  <span className="flex items-center gap-1 font-bold text-orange-950">
                    <span className="w-2 h-2 rounded-full bg-amber-600" />
                    <span>अंक = राशि संख्या (१ = मेष, १२ = मीन)</span>
                  </span>
                  <span className="flex items-center gap-1 font-bold text-orange-950">
                    <span className="w-2 h-2 rounded-full bg-orange-600" />
                    <span>सू=सूर्य, चं=चन्द्र, मं=मंगल, बु=बुध, गु=गुरु, शु=शुक्र, श=शनि, रा=राहु, के=केतु</span>
                  </span>
                </div>
              </div>

              {/* DOSH ANALYSIS BADGES */}
              <div className="bg-white border-2 border-orange-200 rounded-2xl p-3 shadow-xs space-y-2">
                <span className="text-xs font-black text-orange-950 block">
                  🔍 {isHi ? 'ग्रह दोष विश्लेषण (Dosh Analysis):' : 'Planetary Dosh Status:'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-xs">
                  <div className="p-2 rounded-xl border bg-orange-50/50 border-orange-200">
                    <span className="text-[10px] font-bold text-gray-500 block">मांगलिक स्थिति</span>
                    <span className="font-black text-orange-950 text-[11px]">{kundali.doshAnalysis.manglikSeverity}</span>
                  </div>

                  <div className="p-2 rounded-xl border bg-amber-50/50 border-amber-200">
                    <span className="text-[10px] font-bold text-gray-500 block">कालसर्प योग</span>
                    <span className="font-black text-amber-950 text-[11px]">{kundali.doshAnalysis.kaalSarpType}</span>
                  </div>

                  <div className="p-2 rounded-xl border bg-purple-50/50 border-purple-200">
                    <span className="text-[10px] font-bold text-gray-500 block">शनि साढ़ेसाती / ढैय्या</span>
                    <span className="font-black text-purple-950 text-[11px]">{kundali.doshAnalysis.sadeSatiStatus}</span>
                  </div>
                </div>
              </div>

              {/* ======================================================== */}
              {/* SHASTRIYA REMEDIES */}
              {/* ======================================================== */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black text-orange-950 flex items-center gap-1">
                    <span>🪔</span>
                    <span>{isHi ? 'राशि व ग्रह अनुसार अचूक सुधार व उपाय' : 'Personalized Planetary Remedies:'}</span>
                  </h3>
                  <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">
                    वेद व शास्त्र सम्मत
                  </span>
                </div>

                {kundali.remedies.map((rem, idx) => (
                  <div
                    key={idx}
                    className="bg-white border-2 border-orange-200 hover:border-orange-300 rounded-2xl p-3 shadow-xs space-y-2 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-orange-950 flex items-center gap-1">
                        <span>✨</span>
                        <span>{rem.title}</span>
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-950 border border-amber-300">
                        {rem.deity}
                      </span>
                    </div>

                    {/* Metadata Strip */}
                    <div className="grid grid-cols-2 gap-1.5 text-[10.5px] bg-orange-50/60 p-2 rounded-xl border border-orange-100">
                      <div>
                        <strong className="text-orange-900 block font-bold">⏰ {isHi ? 'सर्वश्रेष्ठ समय:' : 'Timing:'}</strong>
                        <span className="text-gray-700 font-medium">{rem.timing}</span>
                      </div>
                      <div>
                        <strong className="text-orange-900 block font-bold">🏺 {isHi ? 'पात्र (बर्तन) नियम:' : 'Vessel:'}</strong>
                        <span className="text-gray-700 font-medium">{rem.vessel}</span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-700 leading-relaxed font-medium bg-amber-50/40 p-2 rounded-xl border border-amber-100">
                      <strong className="text-orange-950 block mb-0.5 font-bold">
                        📜 {isHi ? 'शास्त्र सम्मत विधि:' : 'Authentic Vidhi:'}
                      </strong>
                      <p>{rem.procedure}</p>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-orange-100 text-[11px]">
                      <span className="font-bold text-orange-900">
                        ⏳ {isHi ? 'समय सीमा:' : 'Duration:'} <strong className="text-orange-950">{rem.timeframe}</strong>
                      </span>
                      <span className="font-bold text-emerald-800">
                        🌿 {isHi ? 'लाभ:' : 'Benefits:'} {rem.benefits.split(',')[0]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* BOTTOM QUICK CALL-TO-ACTION FOR COMPLETE REPORT */}
              <div className="p-3 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-2xl text-white shadow-md flex items-center justify-between gap-2">
                <div>
                  <h4 className="text-xs font-black">
                    {isHi ? 'सम्पूर्ण कुण्डली व वेद-शास्त्र फलादेश रिपोर्ट' : 'Complete Vedic Kundali PDF Report'}
                  </h4>
                  <p className="text-[10px] text-amber-100">
                    {isHi ? '₹91 में ११ पृष्ठों की सम्पूर्ण फलादेश PDF तुरंत पाएं' : 'Get 11 pages complete report for ₹91'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleSelectReportTier(KUNDALI_REPORT_TIERS[1])}
                  className="px-3 py-1.5 rounded-xl bg-white text-orange-950 font-black text-xs hover:bg-amber-50 active:scale-95 transition-all shadow-xs shrink-0 flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5 text-orange-600" />
                  <span>{isHi ? '₹91 रिपोर्ट लें' : 'Get ₹91 PDF'}</span>
                </button>
              </div>
              </>
            )}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: HAST REKHA GYAN (SAMUDRIKA SHASTRA) */}
          {/* ======================================================== */}
          {activeTab === 'hastrekha' && (
            <HastRekhaSection language={language} />
          )}

          {/* ======================================================== */}
          {/* TAB 3: ANKA JYOTISH (MOBILE & NAME NUMEROLOGY) */}
          {/* ======================================================== */}
          {activeTab === 'ankajyotish' && (
            <AnkaJyotishSection userProfile={userProfile} language={language} />
          )}

          {/* ======================================================== */}
          {/* TAB 4: SAMASYA AUR SAMADHAN Q&A HUB */}
          {/* ======================================================== */}
          {activeTab === 'samadhan' && (
            <div className="space-y-3 animate-fadeIn">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-orange-600 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder={isHi ? 'अपनी समस्या खोजें (कर्ज, विवाह, रोग, नौकरी, शत्रु...)' : 'Search your problem...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs font-bold rounded-2xl border-2 border-orange-200 bg-white text-orange-950 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-xs placeholder:text-gray-400"
                />
              </div>

              {/* Category Filter Horizontal Scroll */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
                {SAMASYA_SAMADHAN_CATEGORIES.map((cat) => {
                  const isSel = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all flex items-center gap-1 text-xs ${
                        isSel
                          ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md ring-2 ring-orange-300'
                          : 'bg-white text-orange-950 border border-orange-200 hover:bg-orange-50'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Samasya Samadhan Q&A Cards */}
              <div className="space-y-2.5">
                {filteredSamadhanList.length === 0 ? (
                  <div className="bg-white border border-orange-200 rounded-2xl p-6 text-center text-xs text-gray-500">
                    {isHi ? 'इस विषय में कोई प्रश्न नहीं मिला। कृपया अन्य शब्द खोजें।' : 'No matches found.'}
                  </div>
                ) : (
                  filteredSamadhanList.map((item) => {
                    const isExpanded = expandedItemId === item.id;

                    return (
                      <div
                        key={item.id}
                        className={`rounded-2xl border-2 transition-all p-3 ${
                          isExpanded
                            ? 'bg-gradient-to-b from-white via-orange-50/40 to-amber-50/50 border-orange-400 shadow-md ring-2 ring-orange-300'
                            : 'bg-white border-orange-200 hover:border-orange-300 shadow-xs'
                        }`}
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-900 inline-flex items-center gap-1 mb-1">
                              <span>{item.categoryIcon}</span>
                              <span>{item.categoryLabel}</span>
                            </span>
                            <h4 className="text-xs sm:text-sm font-black text-orange-950 leading-snug">
                              {item.problemTitle}
                            </h4>
                          </div>

                          <button
                            type="button"
                            onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                            className="p-1 rounded-xl bg-orange-50 text-orange-800 hover:bg-orange-100 transition-all shrink-0"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>

                        <p className="text-xs text-gray-600 font-medium mb-2">
                          {item.shortDescription}
                        </p>

                        {/* Expandable Shastriya Details */}
                        {isExpanded && (
                          <div className="space-y-2.5 pt-2 border-t border-orange-200/80 animate-fadeIn text-xs">
                            {/* Shastriya Samadhan */}
                            <div className="bg-orange-50/80 p-2.5 rounded-xl border border-orange-200 text-gray-800 leading-relaxed font-medium">
                              <strong className="text-orange-950 block mb-0.5 font-bold flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                                <span>{isHi ? 'शास्त्र सम्मत अचूक समाधान:' : 'Scriptural Solution:'}</span>
                              </strong>
                              <p>{item.shastriyaSamadhan}</p>
                            </div>

                            {/* Mantra Box */}
                            <div className="bg-amber-50/90 p-2.5 rounded-xl border border-amber-300">
                              <span className="text-[10px] font-bold text-amber-900 block mb-0.5">
                                📿 {isHi ? 'निवारक सिद्ध महामंत्र:' : 'Remedy Mantra:'} {item.mantraName}
                              </span>
                              <p className="font-sanskrit font-bold text-amber-950 text-xs sm:text-sm leading-relaxed">
                                {item.mantraSnippet}
                              </p>
                            </div>

                            {/* Duration & Expected Benefits Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                              <div className="p-2 rounded-xl bg-purple-50/60 border border-purple-200">
                                <strong className="text-purple-950 block font-bold">
                                  ⏳ {isHi ? 'सिद्ध होने की समय सीमा:' : 'Timeframe for Siddhi:'}
                                </strong>
                                <span className="text-purple-900 font-medium">{item.timeframe}</span>
                              </div>

                              <div className="p-2 rounded-xl bg-emerald-50/60 border border-emerald-200">
                                <strong className="text-emerald-950 block font-bold">
                                  🌿 {isHi ? 'अपेक्षित लाभ व फलश्रुति:' : 'Expected Benefits:'}
                                </strong>
                                <span className="text-emerald-900 font-medium">{item.expectedBenefits}</span>
                              </div>
                            </div>

                            {/* Action Row */}
                            <div className="pt-1 flex items-center justify-between gap-2">
                              <span className="text-[10px] text-gray-500 font-medium">
                                🪔 {isHi ? 'सामग्री:' : 'Items:'} {item.samagri.split(',')[0]}
                              </span>

                              <button
                                type="button"
                                onClick={() => handleStartJaapFromSamadhan(item.mantraId)}
                                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-xs shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center gap-1 shrink-0"
                              >
                                <Play className="w-3 h-3 fill-current" />
                                <span>{isHi ? 'यह जप तुरंत आरंभ करें' : 'Chant Now'}</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {!isExpanded && (
                          <div className="flex items-center justify-between pt-1 border-t border-orange-100 text-[11px]">
                            <span className="font-bold text-orange-900">
                              ⏳ {item.timeframe.split('(')[0]}
                            </span>
                            <button
                              type="button"
                              onClick={() => setExpandedItemId(item.id)}
                              className="text-orange-700 font-bold hover:underline flex items-center gap-0.5"
                            >
                              <span>{isHi ? 'पूर्ण समाधान देखें' : 'View Solution'}</span>
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-3 bg-white border-t border-orange-200 flex items-center justify-between">
          <span className="text-[11px] text-gray-500 font-medium">
            {isHi ? 'सनातन ज्योतिष व मंत्र समाधान' : 'Sanatan Astrological Solutions'}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-xs shadow-md hover:brightness-105 active:scale-95 transition-all"
          >
            {isHi ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* AUTHENTIC SANSTHA PAYMENT MODAL FOR KUNDALI */}
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
                href={`upi://pay?pa=aasthajaap@upi&pn=Aastha%20Puja%20Sanstha&am=${pendingTier.price}&tn=Kundali%20${pendingTier.id}&cu=INR`}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-black text-xs shadow-sm hover:from-emerald-700 hover:to-green-700 active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <QrCode className="w-4 h-4" />
                <span>{isHi ? `UPI ऐप से ₹${pendingTier.price} सहयोग करें` : `Pay ₹${pendingTier.price} via UPI App`}</span>
              </a>

              <button
                onClick={() => handleConfirmUnlock(pendingTier)}
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
                {isHi ? 'शास्त्र-सम्मत वैदिक कुण्डली संकलन' : 'Shastric Vedic Report Generation'}
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
                ? 'कृपया १ से २ मिनट प्रतीक्षा करें... पराशर, जैमिनी एवं वैदिक सूत्रों द्वारा आपकी सम्पूर्ण कुण्डली, भाव, दशा व उपाय संकलित हो रहे हैं।'
                : 'Please wait 1-2 minutes... Compiling authentic Vedic calculations and custom remedial guidelines.'}
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
                {isHi ? 'कुण्डली रिपोर्ट सफलतापूर्वक तैयार!' : 'Kundali Report Created!'}
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
                onClick={() => handleOpenPrintableView(activeGeneratingTier)}
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

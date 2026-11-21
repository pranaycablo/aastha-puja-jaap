import React, { useState } from 'react';
import { UserProfile, LanguageCode } from '../types';
import {
  User,
  Calendar,
  Clock,
  MapPin,
  Phone,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  X
} from 'lucide-react';

export type VerificationRedirectTarget = 'kundali' | 'ank_gyan' | 'jaap' | 'mantra' | 'aaj_ka_din' | null;

interface SankalpOnboardingProps {
  onSaveProfile: (profile: UserProfile) => void;
  initialProfile?: UserProfile;
  isEditing?: boolean;
  onClose?: () => void;
  redirectReason?: VerificationRedirectTarget;
}

interface LanguageOption {
  id: string;
  code: LanguageCode;
  nativeName: string;
  englishName: string;
  flag: string;
}

const LANGUAGES: LanguageOption[] = [
  { id: 'hi', code: 'hi', nativeName: 'हिन्दी', englishName: 'Hindi', flag: '🕉️' },
  { id: 'en', code: 'en', nativeName: 'English', englishName: 'English', flag: '🌐' },
  { id: 'sa', code: 'hi', nativeName: 'संस्कृतम्', englishName: 'Sanskrit', flag: '🪔' },
  { id: 'gu', code: 'hi', nativeName: 'ગુજરાતી', englishName: 'Gujarati', flag: '🌸' },
  { id: 'mr', code: 'hi', nativeName: 'मराठी', englishName: 'Marathi', flag: '🚩' },
  { id: 'bn', code: 'hi', nativeName: 'বাংলা', englishName: 'Bengali', flag: '🪷' },
  { id: 'te', code: 'hi', nativeName: 'తెలుగు', englishName: 'Telugu', flag: '✨' },
  { id: 'ta', code: 'hi', nativeName: 'தமிழ்', englishName: 'Tamil', flag: '🔱' },
  { id: 'pa', code: 'hi', nativeName: 'ਪੰਜਾਬੀ', englishName: 'Punjabi', flag: '🌾' },
  { id: 'kn', code: 'hi', nativeName: 'ಕನ್ನಡ', englishName: 'Kannada', flag: '🔔' },
  { id: 'ml', code: 'hi', nativeName: 'മലയാളം', englishName: 'Malayalam', flag: '🥥' },
  { id: 'or', code: 'hi', nativeName: 'ଓଡ଼ିଆ', englishName: 'Odia', flag: '☸️' }
];

export const SankalpOnboarding: React.FC<SankalpOnboardingProps> = ({
  onSaveProfile,
  initialProfile,
  isEditing = false,
  onClose,
  redirectReason = null
}) => {
  // Step 0: Language Selection, Step 1: Name, DOB, Time, Location, Phone
  const [currentStep, setCurrentStep] = useState<number>(isEditing || Boolean(redirectReason) ? 1 : 0);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Language State
  const [selectedLangId, setSelectedLangId] = useState<string>(() => {
    return initialProfile?.language === 'en' ? 'en' : 'hi';
  });
  const [language, setLanguage] = useState<LanguageCode>(initialProfile?.language || 'hi');

  // Details State
  const [name, setName] = useState(
    initialProfile?.name && initialProfile.name !== 'साधक' && initialProfile.name !== 'Devotee'
      ? initialProfile.name
      : ''
  );
  const [dob, setDob] = useState(
    initialProfile?.dob && initialProfile.dob !== '1995-01-01' ? initialProfile.dob : ''
  );
  const [birthTime, setBirthTime] = useState(
    initialProfile?.birthTime && initialProfile.birthTime !== '06:00' ? initialProfile.birthTime : ''
  );
  const [birthPlace, setBirthPlace] = useState(initialProfile?.birthPlace || initialProfile?.address || '');
  const [phone, setPhone] = useState(initialProfile?.phone || '');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>(
    initialProfile?.gender || 'male'
  );
  const [gotra, setGotra] = useState<string>(initialProfile?.gotra || '');
  const [kulDevta, setKulDevta] = useState<string>(initialProfile?.kulDevta || '');
  const [ishtDevta, setIshtDevta] = useState<any>(initialProfile?.ishtDevta || 'shiva');

  const handleSelectLanguage = (langOpt: LanguageOption) => {
    setSelectedLangId(langOpt.id);
    setLanguage(langOpt.code);
  };

  const handleSaveAndContinue = () => {
    setErrorMessage('');
    if (!name.trim()) {
      setErrorMessage(language === 'hi' ? '⚠️ कृपया आगे बढ़ने के लिए अपना शुभ नाम दर्ज करें।' : '⚠️ Please enter your name.');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMessage(language === 'hi' ? '⚠️ कृपया आगे बढ़ने के लिए १० अंकों का मोबाइल नंबर दर्ज करें।' : '⚠️ Please enter valid 10-digit mobile number.');
      return;
    }

    if (!dob.trim()) {
      setErrorMessage(language === 'hi' ? '⚠️ कृपया आगे बढ़ने के लिए अपनी जन्म तिथि अवश्य चुनें।' : '⚠️ Please select date of birth.');
      return;
    }

    const updatedProfile: UserProfile = {
      name: name.trim(),
      dob: dob.trim(),
      birthTime: birthTime.trim() || '06:00',
      birthPlace: birthPlace.trim(),
      address: birthPlace.trim(),
      phone: phone.trim(),
      gender: gender,
      gotra: gotra.trim(),
      kulDevta: kulDevta.trim(),
      ishtDevta: ishtDevta,
      isProfileSet: true,
      language: language,
      totalMalasCompletedAllTime: initialProfile?.totalMalasCompletedAllTime || 0,
      totalBeadsAllTime: initialProfile?.totalBeadsAllTime || 0,
      dailyStreak: initialProfile?.dailyStreak || 1,
      lastJaapDate: initialProfile?.lastJaapDate || new Date().toISOString()
    };
    onSaveProfile(updatedProfile);
  };

  const handleSkip = () => {
    const defaultProfile: UserProfile = {
      name: name.trim(),
      dob: dob.trim(),
      birthTime: birthTime.trim(),
      birthPlace: birthPlace.trim(),
      address: birthPlace.trim(),
      phone: phone.trim(),
      gender: gender,
      gotra: gotra.trim(),
      kulDevta: kulDevta.trim(),
      ishtDevta: ishtDevta,
      isProfileSet: Boolean(name.trim()),
      language: language,
      totalMalasCompletedAllTime: initialProfile?.totalMalasCompletedAllTime || 0,
      totalBeadsAllTime: initialProfile?.totalBeadsAllTime || 0,
      dailyStreak: initialProfile?.dailyStreak || 1,
      lastJaapDate: initialProfile?.lastJaapDate || new Date().toISOString()
    };
    onSaveProfile(defaultProfile);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 select-none animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-orange-200 overflow-hidden flex flex-col p-5 sm:p-6">
        {/* ================= PAGE 1: LANGUAGE SELECTION ================= */}
        {currentStep === 0 && (
          <div className="flex flex-col">
            {/* Top Simple Header */}
            <div className="text-center mb-4">
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                Language
              </h1>
            </div>

            {/* Language Options Grid */}
            <div className="grid grid-cols-2 gap-2 max-h-[58vh] overflow-y-auto pr-1 scrollbar-thin">
              {LANGUAGES.map((item) => {
                const isSelected = selectedLangId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectLanguage(item)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all flex items-center justify-between active:scale-95 ${
                      isSelected
                        ? 'border-orange-600 bg-orange-50/90 shadow-sm ring-1 ring-orange-500'
                        : 'border-gray-200 bg-white hover:border-orange-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-300 via-amber-100 to-yellow-300 border-2 border-amber-400/90 flex items-center justify-center text-lg shrink-0 shadow-xs font-black drop-shadow-xs">
                        {item.flag}
                      </span>
                      <div className="min-w-0">
                        <span className="font-black text-sm text-gray-900 block truncate">
                          {item.nativeName}
                        </span>
                        <span className="text-[11px] font-semibold text-gray-500 block truncate">
                          {item.englishName}
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Next Button */}
            <div className="pt-4 mt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black text-sm shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        )}

        {/* ================= PAGE 2: USER DETAILS + SKIP ================= */}
        {currentStep === 1 && (
          <div className="flex flex-col">
            {/* Top Navigation & Skip Button */}
            <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-gray-100">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(0)}
                  className="p-1 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all flex items-center gap-0.5 text-xs font-bold"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Language</span>
                </button>
              ) : (
                <div />
              )}

              <h2 className="text-base font-black text-gray-900">
                {language === 'hi' ? 'विवरण' : 'Details'}
              </h2>

              {isEditing && onClose ? (
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSkip}
                  className="text-xs font-black text-orange-600 hover:text-orange-700 bg-orange-50 px-3 py-1 rounded-xl active:scale-95 transition-all"
                >
                  {language === 'hi' ? 'छोड़ें (Skip)' : 'Skip'}
                </button>
              )}
            </div>

            {/* Feature Verification Notice Banner */}
            {redirectReason && (
              <div className="mb-3 p-3 bg-amber-50 border border-amber-300 rounded-2xl flex items-center gap-2.5 shadow-2xs">
                <span className="text-2xl shrink-0">
                  {redirectReason === 'kundali' ? '🪐' : redirectReason === 'ank_gyan' ? '🔢' : redirectReason === 'jaap' ? '🌸' : redirectReason === 'aaj_ka_din' ? '🌅' : '📿'}
                </span>
                <div className="min-w-0">
                  <h3 className="text-xs font-black text-amber-950">
                    {redirectReason === 'kundali' && (language === 'hi' ? 'कुण्डली दर्शन हेतु जन्म विवरण आवश्यक है' : 'Birth details required for Kundali')}
                    {redirectReason === 'ank_gyan' && (language === 'hi' ? 'अंक ज्ञान विश्लेषण हेतु विवरण आवश्यक है' : 'Details required for Anka Gyan')}
                    {redirectReason === 'jaap' && (language === 'hi' ? 'मंत्र जाप संकल्प हेतु आपका विवरण आवश्यक है' : 'Details required for Mantra Jaap')}
                    {redirectReason === 'mantra' && (language === 'hi' ? 'मंत्र चयन व साधना हेतु विवरण आवश्यक है' : 'Details required for Mantra Selection')}
                    {redirectReason === 'aaj_ka_din' && (language === 'hi' ? 'आज का दिन व्यक्तिगत फलादेश हेतु विवरण आवश्यक है' : 'Birth details required for Today\'s Outlook')}
                  </h3>
                  <p className="text-[10px] text-amber-800 leading-tight mt-0.5">
                    {language === 'hi'
                      ? 'सनातन शास्त्रानुसार वास्तविक जन्म तिथि व नाम से ही पंचांग, शुभ अंक व ग्रह फलादेश सत्य सिद्ध होते हैं।'
                      : 'According to Shastras, genuine personalized astrological outlook requires authentic details.'}
                  </p>
                </div>
              </div>
            )}

            {/* Error Message if Validation Fails */}
            {errorMessage && (
              <div className="mb-3 p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-bold flex items-center gap-2">
                <span>⚠️</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Compulsory Fields Guidance Note */}
            <div className="mb-2.5 p-2 bg-amber-50/80 border border-amber-300 rounded-xl text-[10.5px] text-amber-950 font-medium">
              ℹ️ <strong>{language === 'hi' ? 'सूचना:' : 'Note:'}</strong> {language === 'hi' ? 'नाम, मोबाइल नंबर और जन्म तिथि अनिवार्य हैं। अन्य विवरण वैकल्पिक हैं।' : 'Name, Mobile and Date of Birth are mandatory. Other details are optional.'}
            </div>

            {/* Form Fields */}
            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1 scrollbar-thin">
              {/* 1. Name (Mandatory) */}
              <div>
                <label className="text-xs font-bold text-gray-700 mb-1 flex items-center justify-between">
                  <span>{language === 'hi' ? 'शुभ नाम *' : 'Full Name *'}</span>
                  <span className="text-[10px] text-red-600 font-bold">{language === 'hi' ? '(अनिवार्य)' : '(Required)'}</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-amber-500 stroke-[2.75] absolute left-3 top-3" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={language === 'hi' ? 'आपका नाम दर्ज करें' : 'Enter your name'}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-gray-50/50"
                  />
                </div>
              </div>

              {/* 2. Mobile Number (Mandatory) */}
              <div>
                <label className="text-xs font-bold text-gray-700 mb-1 flex items-center justify-between">
                  <span>{language === 'hi' ? 'मोबाइल नंबर *' : 'Mobile Number *'}</span>
                  <span className="text-[10px] text-red-600 font-bold">{language === 'hi' ? '(अनिवार्य)' : '(Required)'}</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-amber-500 stroke-[2.75] absolute left-3 top-3" />
                  <input
                    type="tel"
                    maxLength={15}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={language === 'hi' ? '१० अंकों का मोबाइल नंबर' : '10-digit mobile number'}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-gray-50/50"
                  />
                </div>
              </div>

              {/* 3. DOB (Mandatory) & Birth Time (Optional) */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 flex items-center justify-between">
                    <span>{language === 'hi' ? 'जन्म तिथि *' : 'Birth Date *'}</span>
                    <span className="text-[10px] text-red-600 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-amber-500 stroke-[2.75] absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full pl-9 pr-2 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-normal text-gray-500 focus:text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-gray-50/50"
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 font-normal block mt-0.5 pl-1">
                    DD/MM/YYYY
                  </span>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">
                    {language === 'hi' ? 'जन्म समय' : 'Birth Time'}
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-amber-500 stroke-[2.75] absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="time"
                      value={birthTime}
                      onChange={(e) => setBirthTime(e.target.value)}
                      className="w-full pl-9 pr-2 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-normal text-gray-500 focus:text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-gray-50/50"
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 font-normal block mt-0.5 pl-1">
                    (वैकल्पिक)
                  </span>
                </div>
              </div>

              {/* 4. Gender (लिंग - NEW FIELD) */}
              <div>
                <label className="text-xs font-bold text-gray-700 mb-1 block">
                  {language === 'hi' ? 'लिंग (Gender):' : 'Gender:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'male', labelHi: 'पुरुष', icon: '🚹' },
                    { id: 'female', labelHi: 'स्त्री', icon: '🚺' },
                    { id: 'other', labelHi: 'अन्य', icon: '🕉️' }
                  ].map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setGender(g.id as any)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        gender === g.id
                          ? 'bg-orange-600 text-white shadow-xs ring-1 ring-orange-500'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      <span>{g.icon}</span>
                      <span>{g.labelHi}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Gotra (गोत्र - NEW FIELD) */}
              <div>
                <label className="text-xs font-bold text-gray-700 mb-1 flex items-center justify-between">
                  <span>{language === 'hi' ? 'गोत्र (Gotra):' : 'Gotra:'}</span>
                  <span className="text-[10px] text-gray-500">{language === 'hi' ? '(वैकल्पिक)' : '(Optional)'}</span>
                </label>
                <input
                  type="text"
                  value={gotra}
                  onChange={(e) => setGotra(e.target.value)}
                  placeholder={language === 'hi' ? 'उदा. भारद्वाज, कश्यप, वशिष्ठ या अज्ञात' : 'e.g. Kashyap, Bhardwaj or Unknown'}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-gray-50/50"
                />
              </div>

              {/* 6. Kul Devta (कुलदेवता / कुलदेवी - NEW FIELD) */}
              <div>
                <label className="text-xs font-bold text-gray-700 mb-1 flex items-center justify-between">
                  <span>{language === 'hi' ? 'कुलदेवता / कुलदेवी:' : 'Kul Devta / Devi:'}</span>
                  <span className="text-[10px] text-gray-500">{language === 'hi' ? '(वैकल्पिक)' : '(Optional)'}</span>
                </label>
                <input
                  type="text"
                  value={kulDevta}
                  onChange={(e) => setKulDevta(e.target.value)}
                  placeholder={language === 'hi' ? 'अपने कुलदेवता अथवा कुलदेवी का नाम' : 'Kuldevta or Kuldevi name'}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-gray-50/50"
                />
              </div>

              {/* 7. Isht Devta (इष्ट देवता / देवी - NEW FIELD) */}
              <div>
                <label className="text-xs font-bold text-gray-700 mb-1 flex items-center justify-between">
                  <span>{language === 'hi' ? 'इष्ट देवता / देवी:' : 'Isht Devta:'}</span>
                  <span className="text-[10px] text-gray-500">{language === 'hi' ? '(वैकल्पिक)' : '(Optional)'}</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5 max-h-28 overflow-y-auto pr-1">
                  {[
                    { id: 'shiva', nameHi: 'शिव जी', icon: '🔱' },
                    { id: 'hanuman', nameHi: 'हनुमान जी', icon: '🚩' },
                    { id: 'krishna', nameHi: 'श्री कृष्ण', icon: '🦚' },
                    { id: 'ram', nameHi: 'श्री राम', icon: '🏹' },
                    { id: 'durga_kali', nameHi: 'माँ दुर्गा/काली', icon: '🌺' },
                    { id: 'ganesha', nameHi: 'श्री गणेश', icon: '🐘' },
                    { id: 'vishnu', nameHi: 'श्री विष्णु', icon: '🐚' },
                    { id: 'lakshmi_kuber', nameHi: 'माँ लक्ष्मी', icon: '🌸' },
                    { id: 'saraswati', nameHi: 'माँ सरस्वती', icon: '🪕' },
                    { id: 'baglamukhi', nameHi: 'माँ बगलामुखी', icon: '⚔️' },
                    { id: 'bhairav', nameHi: 'कालभैरव', icon: '🕉️' }
                  ].map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setIshtDevta(d.id as any)}
                      className={`p-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                        ishtDevta === d.id
                          ? 'bg-orange-600 text-white shadow-xs'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      <span>{d.icon}</span>
                      <span className="truncate">{d.nameHi}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 8. Location (City / Place - Optional) */}
              <div>
                <label className="text-xs font-bold text-gray-700 mb-1 flex items-center justify-between">
                  <span>{language === 'hi' ? 'जन्म स्थान / शहर' : 'City / Place'}</span>
                  <span className="text-[10px] text-gray-500">{language === 'hi' ? '(वैकल्पिक)' : '(Optional)'}</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-amber-500 stroke-[2.75] absolute left-3 top-3" />
                  <input
                    type="text"
                    value={birthPlace}
                    onChange={(e) => setBirthPlace(e.target.value)}
                    placeholder={language === 'hi' ? 'शहर या राज्य' : 'City or State'}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-gray-50/50"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 mt-3 border-t border-gray-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleSaveAndContinue}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black text-sm shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <span>{language === 'hi' ? 'आगे बढ़ें' : 'Save & Continue'}</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>

              {!isEditing && (
                <button
                  type="button"
                  onClick={handleSkip}
                  className="w-full py-2 text-center text-xs font-bold text-gray-500 hover:text-gray-800 transition-all"
                >
                  {language === 'hi' ? 'बाद में भरें (Skip)' : 'Skip for now'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

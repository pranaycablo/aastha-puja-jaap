export type DeityType =
  | 'shiva'
  | 'hanuman'
  | 'krishna'
  | 'ram'
  | 'durga_kali'
  | 'ganesha'
  | 'vishnu'
  | 'bhairav'
  | 'lakshmi_kuber'
  | 'saraswati'
  | 'tridev'
  | 'navgraha'
  | 'baglamukhi'
  | 'custom';

export type MantraCategory =
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
  | 'nath_mantra'
  | 'sundarkand'
  | 'stotram'
  | 'dehati_shabar'
  | 'ved_sukta'
  | 'upanishad'
  | 'gita_ramayan'
  | 'nath'
  | 'tantrik'
  | 'aghori'
  | 'sadhu'
  | 'dhan_siddhi'
  | 'manokamna'
  | 'durga_saptashati'
  | 'custom';

export type ScriptureReaderLanguage = 'hi' | 'sa' | 'en';

export interface ScriptureVerseSection {
  verseNumber?: number;
  title: string;
  titleEn?: string;
  sanskrit: string;
  sanskritRoman?: string;
  hindiMeaning: string;
  englishMeaning?: string;
}

export interface MantraItem {
  id: string;
  name: string;
  text: string;
  deity: DeityType;
  deityLabel: string;
  category: MantraCategory;
  categoryLabel: string;
  meaning?: string;
  scriptureSections?: ScriptureVerseSection[];
  bestTiming?: string;       // सिद्धि व जाप का श्रेष्ठ समय (मुहूर्त)
  sthan?: string;            // साधना का श्रेष्ठ स्थान
  mudra?: string;            // ध्यान मुद्रा व आसन
  pujaSamagri?: string;      // विशिष्ट पूजा सामग्री
  samagri?: string;          // Alias/fallback for pujaSamagri
  siddhiVidhi?: string;      // सिद्धि व जाप विधान
  siddhiDays?: string;       // सिद्धि समय अवधि (उदा. 21 दिन, 41 दिन, होली/दीपावली काल)
  vidhi?: string;            // Alias/fallback for siddhiVidhi
  niyam?: string;            // नियम, परहेज व सावधानियां
  benefits?: string;         // फलश्रुति व लाभ
  targetCountSiddhi?: string;// सिद्धि हेतु जप संख्या
  usageGuide?: string;       // कब और कैसे प्रयोग करें (सात्विक उपयोग)
  warning?: string;          // ⚠️ गलत प्रयोग का परिणाम व कठोर चेतावनी
  isCustom?: boolean;
}

export type LanguageCode = 'hi' | 'en';

export type MalaBeadVisualType = 'rudraksha' | 'tulsi' | 'sphatik' | 'kamalgatta' | 'chandan';

export type AmbienceSoundType = 'none' | 'omkar' | 'tanpura' | 'ganga';

export interface UserProfile {
  name: string;
  dob?: string;              // जन्म तिथि (YYYY-MM-DD)
  birthTime?: string;        // जन्म समय (HH:MM)
  birthPlace?: string;       // जन्म स्थान / शहर
  address?: string;          // पता / निवास स्थान
  phone?: string;            // मोबाइल नंबर (अंक ज्योतिष हेतु)
  gotra: string;
  kulDevta: string;
  ishtDevta: DeityType;
  customIshtDevtaName?: string;
  isProfileSet: boolean;
  language: LanguageCode;
  selectedMalaType?: MalaBeadVisualType;
  totalMalasCompletedAllTime: number;
  totalBeadsAllTime: number;
  dailyStreak: number;
  lastJaapDate?: string;
  dailyTargetMalas?: number;
  sadhanaLevel?: 'beginner' | 'intermediate' | 'advanced';
}

export type CountingMode = 'tap' | 'timer' | 'speaker';

// 10 distinct sound/music profiles
export type BellSoundType =
  | 'kashi_brass'      // 1. काशी विश्वनाथ पीतल घंटी
  | 'kedarnath_gong'   // 2. केदारनाथ महाघंट
  | 'vrindavan_garuda' // 3. वृंदावन गरुड़ घंटी
  | 'tibetan_bowl'     // 4. ॐ नाद तिब्बती सिंगिग बोल
  | 'ayodhya_gold';    // 5. अयोध्या रामलला स्वर्ण घंटी

export type ShankhSoundType =
  | 'panchjanya'       // 6. कुरुक्षेत्र पांचजन्य महाशंख
  | 'haridwar_ganga'   // 7. हरिद्वार गंगा आरती शंख
  | 'mahakal_aghor'    // 8. उज्जैन महाकाल अघोर शंख
  | 'rameshwaram_ocean'// 9. रामेश्वरम दक्षिणवर्ती शंख
  | 'badrinath_horn';  // 10. बद्रीनाथ देवशंख

export interface SoundStyleItem {
  id: BellSoundType | ShankhSoundType;
  title: string;
  subtitle: string;
  type: 'bell' | 'shankh';
  icon: string;
  frequency: string;
}

// 10 Divine Voice Profiles (Male, Female, Child)
export type VoiceProfileId =
  | 'vedic_sage_male'      // 1. वेदपाठी ऋषि (पुरुष)
  | 'sadhvi_devi_female'   // 2. साध्वी स्वर (महिला)
  | 'bal_brahmachari'      // 3. बाल ब्रह्मचारी (बालक)
  | 'acharya_shastri_male' // 4. शास्त्रीय आचार्य (पुरुष)
  | 'mata_bhakt_female'    // 5. मातृ स्वर (महिला)
  | 'yuva_sadhak_male'     // 6. युवा साधक (पुरुष)
  | 'kanya_divine_female'  // 7. कन्या स्वर (बालिका)
  | 'mahakal_bass_male'    // 8. महाकाल गंभीर स्वर (पुरुष)
  | 'bhajan_madhur_female' // 9. मधुर भक्ति स्वर (महिला)
  | 'sanatani_echo';       // 10. सामूहिक संकीर्तन गूंज

export interface VoiceProfileItem {
  id: VoiceProfileId;
  nameHi: string;
  nameEn: string;
  gender: 'male' | 'female' | 'child';
  icon: string;
  pitch: number;
  rate: number;
  descHi: string;
  descEn: string;
  samplePhraseHi: string;
  samplePhraseEn: string;
}

export interface JaapSettings {
  targetMalas: number;
  bellVolume: number;
  shankhVolume: number;
  voiceVolume: number;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  countingMode: CountingMode;
  timerIntervalSeconds: number;
  speechRate: number;
  speechPitch: number;
  selectedBell: BellSoundType;
  selectedShankh: ShankhSoundType;
  selectedVoiceURI?: string;
}

export interface DharmikProduct {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  price: string;
  rating: number;
  ratingCount: number;
  imageUrl: string;
  affiliateUrl: string;
  badge?: string;
}

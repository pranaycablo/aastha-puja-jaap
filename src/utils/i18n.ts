// i18n Localization Engine for Divya Jaap App
// Supports Pure Hindi ('hi') and Pure English ('en') with zero language mixing.

import { LanguageCode } from '../types';

export interface Translations {
  // App General
  appName: string;
  appSubtitle: string;
  languageName: string;
  selectLanguageTitle: string;
  selectLanguageSubtitle: string;
  languageModalNote: string;
  changeLanguage: string;

  // Header
  blessingGreeting: string;
  dailyStreak: string;
  dayUnit: string;
  nameLabel: string;
  gotraLabel: string;
  ishtdevLabel: string;
  libraryBtn: string;
  profileBtn: string;
  todayAuspicious: string;

  // Onboarding Wizard
  stepTitle: string;
  stepOf: string;
  closeBtn: string;
  nextBtn: string;
  prevBtn: string;
  acceptSankalpBtn: string;
  
  // Step 0: Language
  stepLanguageTitle: string;
  stepLanguageDesc: string;

  // Step 1: Name
  stepNameHeading: string;
  stepNameSub: string;
  nameInputLabel: string;
  namePlaceholder: string;
  nameError: string;

  // Step 2: Gotra
  stepGotraHeading: string;
  stepGotraSub: string;
  gotraSelectLabel: string;
  gotraSelectPlaceholder: string;
  customGotraLabel: string;
  customGotraPlaceholder: string;
  quickTapGotra: string;

  // Step 3: Kuldevta
  stepKuldevtaHeading: string;
  stepKuldevtaSub: string;
  kuldevtaSelectLabel: string;
  kuldevtaSelectPlaceholder: string;
  customKuldevtaLabel: string;
  customKuldevtaPlaceholder: string;
  quickTapKuldevta: string;

  // Step 4: Ishtdevta
  stepIshtdevtaHeading: string;
  stepIshtdevtaSub: string;

  // Step 5: Sankalp Patra
  stepSankalpHeading: string;
  stepSankalpVedicQuote: string;
  sankalpNameRow: string;
  sankalpGotraRow: string;
  sankalpKuldevtaRow: string;
  sankalpIshtdevRow: string;
  recommendedMantraHeading: string;

  // Counter Main
  malaLabel: string;
  beadOutOf: string;
  totalChantsInSession: string;
  completedMalas: string;
  targetMalaLabel: string;
  tapModeTab: string;
  timerModeTab: string;
  speakerModeTab: string;

  tapModeInstruction: string;
  timerModeStart: string;
  timerModePause: string;
  timerNextIn: string;
  speakerModeStart: string;
  speakerModeSpeaking: string;
  speakerModeStop: string;

  resetBtn: string;
  changeMantraBtn: string;
  targetChangeBtn: string;
  intervalChangeBtn: string;
  soundSettingsBtn: string;
  volumeControlBtn: string;
  musicStylesBtn: string;
  changeMusicBtn: string;
  changeVolumeBtn: string;
  currentBellLabel: string;
  currentShankhLabel: string;
  ambienceBtn: string;

  sankalpCompleteTitle: string;
  sankalpCompleteSub: string;
  viewCertificateBtn: string;
  malaCompleteBanner: string;
  punyaAccumulated: string;

  // Mala Bead Selector
  beadSelectorTitle: string;
  rudrakshaBead: string;
  tulsiBead: string;
  sphatikBead: string;
  kamalgattaBead: string;
  chandanBead: string;

  // Ambience Selector
  ambienceModalTitle: string;
  ambienceModalSub: string;
  ambienceOff: string;
  ambienceOm: string;
  ambienceOmDesc: string;
  ambienceTanpura: string;
  ambienceTanpuraDesc: string;
  ambienceGanga: string;
  ambienceGangaDesc: string;

  // Certificate Modal
  certTitle: string;
  certSub: string;
  certRecipient: string;
  certGotra: string;
  certKuldevta: string;
  certIshtdev: string;
  certMantraChanted: string;
  certTotalChants: string;
  certCompletedOn: string;
  certAuspiciousSeal: string;
  certShareWhatsapp: string;
  certDownload: string;
  certClose: string;

  // Sound Settings Modal
  soundModalTitle: string;
  soundModalSub: string;
  tabVolumes: string;
  tabStyles: string;
  masterSoundToggle: string;
  hapticToggle: string;
  voiceVolumeLabel: string;
  testVoiceBtn: string;
  stopVoiceBtn: string;
  bellVolumeLabel: string;
  testBellBtn: string;
  shankhVolumeLabel: string;
  testShankhBtn: string;
  voiceSpeedLabel: string;
  voiceSpeedSlow: string;
  voiceSpeedNormal: string;
  voiceSpeedFast: string;
  bellSoundsHeading: string;
  shankhSoundsHeading: string;
  soundPreviewBtn: string;
  soundPlayingBtn: string;

  // Mantra Library Modal
  libraryTitle: string;
  librarySub: string;
  searchPlaceholder: string;
  allCategoriesTab: string;
  customMantraBtn: string;
  selectThisMantraBtn: string;
  activeMantraBadge: string;
  siddhiVidhiHeading: string;
  samagriHeading: string;
  niyamHeading: string;
  benefitsHeading: string;
  shubhTimingHeading: string;

  // Common
  close: string;
  save: string;
  cancel: string;
  optional: string;
  required: string;
}

export const TRANSLATIONS: Record<LanguageCode, Translations> = {
  hi: {
    // App General
    appName: 'आस्था : पूजा जाप',
    appSubtitle: 'सनातन वैदिक मंत्र साधना, पूजा व सिद्धि माला',
    languageName: 'हिन्दी',
    selectLanguageTitle: 'पवित्र भाषा का चयन करें',
    selectLanguageSubtitle: 'आपकी पसंद अनुसार पूरी ऐप उसी भाषा में कार्य करेगी',
    languageModalNote: '💡 भाषा को आप बाद में भी सेटिंग्स से कभी भी बदल सकते हैं।',
    changeLanguage: 'भाषा बदलें (Language)',

    // Header
    blessingGreeting: 'ॐ श्री गणेशाय नमः',
    dailyStreak: 'अखंड साधना',
    dayUnit: 'दिन',
    nameLabel: 'नाम',
    gotraLabel: 'गोत्र',
    ishtdevLabel: 'इष्ट',
    libraryBtn: 'मंत्र संग्रह',
    profileBtn: 'प्रोफ़ाइल परिचय',
    todayAuspicious: 'आज का शुभ दिवस',

    // Onboarding
    stepTitle: 'चरण',
    stepOf: 'कुल',
    closeBtn: 'बंद करें',
    nextBtn: 'आगे बढ़ें',
    prevBtn: 'पिछला',
    acceptSankalpBtn: 'संकल्प स्वीकार करें व साधना आरंभ करें 🔱',

    // Step 0: Language
    stepLanguageTitle: 'अपनी प्रिय भाषा चुनें',
    stepLanguageDesc: 'आस्था ऐप का संपूर्ण अनुभव आपकी चुनी हुई भाषा में प्रस्तुत होगा:',

    // Step 1: Name
    stepNameHeading: 'शुभ आगमन!',
    stepNameSub: 'मंत्र जाप में आपका नाम संकल्प को जाग्रत करता है। कृपया अपना नाम दर्ज करें:',
    nameInputLabel: 'आपका शुभ नाम *',
    namePlaceholder: 'अपना नाम लिखें...',
    nameError: '⚠️ कृपया आगे बढ़ने के लिए अपना नाम लिखें',

    // Step 2: Gotra
    stepGotraHeading: 'ऋषि परम्परा व गोत्र चयन',
    stepGotraSub: 'सनातन परंपरा में गोत्र साधना का मुख्य आध्यात्मिक कुल-सूत्र है:',
    gotraSelectLabel: 'ड्रॉपडाउन से अपना गोत्र चुनें:',
    gotraSelectPlaceholder: '-- अपना गोत्र चुनें --',
    customGotraLabel: 'अपना गोत्र यहाँ टाइप करें:',
    customGotraPlaceholder: 'उदा. पाराशर, वत्स, शांडिल्य...',
    quickTapGotra: '⚡ त्वरित चयन:',

    // Step 3: Kuldevta
    stepKuldevtaHeading: 'कुल देवता / कुल देवी',
    stepKuldevtaSub: 'कुलदेवता अथवा कुलदेवी की कृपा से कुल में सुख, समृद्धि एवं रक्षा बनी रहती है।',
    kuldevtaSelectLabel: 'ड्रॉपडाउन से कुलदेवता / कुलदेवी चुनें (वैकल्पिक):',
    kuldevtaSelectPlaceholder: '-- कुलदेवता / कुलदेवी का चयन करें --',
    customKuldevtaLabel: 'कुलदेवता / कुलदेवी का नाम टाइप करें:',
    customKuldevtaPlaceholder: 'उदा. भैरव बाबा, जीण माता, बाण माता...',
    quickTapKuldevta: '⚡ प्रसिद्ध कुलदेवता:',

    // Step 4: Ishtdevta
    stepIshtdevtaHeading: 'अपने प्रिय इष्ट देवता का चयन करें',
    stepIshtdevtaSub: 'आपके इष्टदेव के अनुसार स्वतः मुख्य सिद्ध मंत्र सुझाव दिया जाएगा:',

    // Step 5: Sankalp Patra
    stepSankalpHeading: 'दैनिक संकल्प पत्र',
    stepSankalpVedicQuote: '"मम आत्मनः श्रुति-स्मृति-पुराणोक्त फलप्राप्त्यर्थं..."',
    sankalpNameRow: 'नाम:',
    sankalpGotraRow: 'गोत्र:',
    sankalpKuldevtaRow: 'कुलदेव / देवी:',
    sankalpIshtdevRow: 'इष्ट देवता:',
    recommendedMantraHeading: 'सुझाया गया मुख्य सिद्ध मंत्र:',

    // Counter Main
    malaLabel: 'माला',
    beadOutOf: 'मनके / १०८',
    totalChantsInSession: 'इस सत्र में कुल जाप',
    completedMalas: 'माला संपन्न',
    targetMalaLabel: 'माला लक्ष्य',
    tapModeTab: 'मनका स्पर्श (टैप)',
    timerModeTab: 'स्वचालित समय (टाइमर)',
    speakerModeTab: 'पावन वाणी (स्पीकर)',

    tapModeInstruction: '👆 मनका स्पर्श कर जाप करें',
    timerModeStart: '▶️ स्वचालित जाप आरंभ करें',
    timerModePause: '⏸️ स्वचालित जाप रोकें',
    timerNextIn: 'अगला मनका:',
    speakerModeStart: '▶️ पावन वाणी प्ले करें',
    speakerModeSpeaking: '📢 पावन वाणी उच्चारण चालू...',
    speakerModeStop: '⏹️ वाणी उच्चारण रोकें',

    resetBtn: 'पुनः आरंभ (०)',
    changeMantraBtn: 'मंत्र बदलें',
    targetChangeBtn: 'माला लक्ष्य बदलें',
    intervalChangeBtn: 'समयांतराल बदलें',
    soundSettingsBtn: 'ध्वनि व संगीत',
    volumeControlBtn: 'वॉल्यूम सेटिंग्स',
    musicStylesBtn: '१० पवित्र संगीत शैलियाँ',
    changeMusicBtn: 'संगीत बदलें',
    changeVolumeBtn: 'वॉल्यूम सेट करें',
    currentBellLabel: 'घंटी',
    currentShankhLabel: 'शंख',
    ambienceBtn: 'पार्श्व वातावरण',

    sankalpCompleteTitle: 'संकल्प पूर्ण हुआ! 🚩',
    sankalpCompleteSub: 'आपकी साधना सफल रही। पुण्य का संचय आपके जीवन में शांति लाए।',
    viewCertificateBtn: '📜 दिव्य सिद्धि प्रमाण पत्र देखें',
    malaCompleteBanner: 'दिव्य शंखनाद! १०८ मनकों की माला पूर्ण हुई।',
    punyaAccumulated: '१०८ मनके संपन्न • आपके खाते में पावन पुण्य संचित हुआ',

    // Mala Bead Selector
    beadSelectorTitle: 'पावन जाप माला का स्वरूप',
    rudrakshaBead: 'रुद्राक्ष माला (भगवान शिव व भैरव)',
    tulsiBead: 'तुलसी माला (श्री राम व कृष्ण)',
    sphatikBead: 'स्फटिक माला (माँ दुर्गा व शांति)',
    kamalgattaBead: 'कमलगट्टा माला (माँ लक्ष्मी व धन)',
    chandanBead: 'रक्त चन्दन माला (हनुमान जी व तेज)',

    // Ambience
    ambienceModalTitle: 'पार्श्व ध्यान वातावरण (Ambience)',
    ambienceModalSub: 'जाप करते समय मन को एकाग्र करने वाली सूक्ष्म आध्यात्मिक ध्वनि:',
    ambienceOff: 'मूक (बंद)',
    ambienceOm: 'अखंड ४३२Hz ॐकार',
    ambienceOmDesc: 'गहरी आंतरिक शांति व एकाग्रता हेतु पावन नाद',
    ambienceTanpura: 'शास्त्रीय साधना तानपुरा',
    ambienceTanpuraDesc: 'साधना के वातावरण को ध्यानमय बनाने वाला तानपुरा सुर',
    ambienceGanga: 'पावन गंगा जल प्रवाह',
    ambienceGangaDesc: 'पवित्र तीर्थ नदी की शांत और शीतल जलधारा',

    // Certificate
    certTitle: 'आस्था सिद्धि साधना प्रमाण पत्र',
    certSub: 'सनातन वैदिक मंत्र साधना अनुष्ठान संपूर्णता पत्र',
    certRecipient: 'प्रमाणित किया जाता है कि',
    certGotra: 'गोत्र',
    certKuldevta: 'कुलदेवता / कुलदेवी',
    certIshtdev: 'इष्ट देव',
    certMantraChanted: 'सिद्ध मंत्र का पावन जाप संपन्न किया:',
    certTotalChants: 'पूर्ण की गई माला संख्या:',
    certCompletedOn: 'संपन्नता तिथि व समय:',
    certAuspiciousSeal: 'आस्था : पूजा जाप राजमुद्रा द्वारा प्रमाणित',
    certShareWhatsapp: 'व्हाट्सएप पर शेयर करें',
    certDownload: 'प्रमाण पत्र डाउनलोड करें',
    certClose: 'बंद करें',

    // Sound Settings Modal
    soundModalTitle: 'ध्वनि, संगीत व स्पीकर सेटिंग्स',
    soundModalSub: 'वॉल्यूम नियंत्रण व १० प्रकार के दिव्य शंख व घंटी संगीत',
    tabVolumes: 'वॉल्यूम व गति',
    tabStyles: '१० पवित्र संगीत शैलियाँ',
    masterSoundToggle: 'ध्वनि प्रभाव (Sound)',
    hapticToggle: 'मनका कम्पन (Vibration)',
    voiceVolumeLabel: 'पावन वाणी वॉल्यूम:',
    testVoiceBtn: 'वाणी परीक्षण करें',
    stopVoiceBtn: 'वाणी रोकें',
    bellVolumeLabel: 'मंदिर घंटी वॉल्यूम:',
    testBellBtn: 'घंटी बजाएं',
    shankhVolumeLabel: 'शंखनाद वॉल्यूम:',
    testShankhBtn: 'शंख बजाएं',
    voiceSpeedLabel: 'वाणी उच्चारण गति (Speech Speed):',
    voiceSpeedSlow: 'धीमी (शांत)',
    voiceSpeedNormal: 'सामान्य (मध्यम)',
    voiceSpeedFast: 'तीव्र (शीघ्र)',
    bellSoundsHeading: '🔔 ५ प्रकार की मंदिर घंटियाँ (Bell Styles)',
    shankhSoundsHeading: '🐚 ५ प्रकार के पवित्र शंखनाद (Conch Styles)',
    soundPreviewBtn: 'बजाएं',
    soundPlayingBtn: 'बज रहा है...',

    // Mantra Library
    libraryTitle: 'दिव्य सिद्ध मंत्र संग्रह (५०+ मंत्र)',
    librarySub: 'सम्पूर्ण सिद्धि विधि, शुभ मुहूर्त, सामग्री, नियम व फल सहित',
    searchPlaceholder: 'मंत्र अथवा देवता के नाम से खोजें...',
    allCategoriesTab: 'सभी श्रेणियां',
    customMantraBtn: '+ अपना व्यक्तिगत मंत्र जोड़ें',
    selectThisMantraBtn: 'यह मंत्र जाप हेतु चुनें',
    activeMantraBadge: '✓ वर्तमान सक्रिय मंत्र',
    siddhiVidhiHeading: 'सिद्धि विधि व अनुष्ठान नियम:',
    samagriHeading: 'पूजन सामग्री:',
    niyamHeading: 'साधना नियम व सावधानियां:',
    benefitsHeading: 'मंत्र फल व लाभ:',
    shubhTimingHeading: 'सर्वोत्तम शुभ समय व मुहूर्त:',

    // Common
    close: 'बंद करें',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    optional: 'वैकल्पिक',
    required: 'अनिवार्य'
  },

  en: {
    // App General
    appName: 'Aastha : Puja Jaap',
    appSubtitle: 'Sanatan Vedic Mantra Sadhana, Puja & Sacred Rosary',
    languageName: 'English',
    selectLanguageTitle: 'Select Your Sacred Language',
    selectLanguageSubtitle: 'The entire application will operate strictly in your chosen language',
    languageModalNote: '💡 You can switch the language anytime from the settings.',
    changeLanguage: 'Change Language (भाषा बदलें)',

    // Header
    blessingGreeting: 'Om Shri Ganeshaya Namah',
    dailyStreak: 'Daily Sadhana',
    dayUnit: 'Days',
    nameLabel: 'Sadhak',
    gotraLabel: 'Gotra',
    ishtdevLabel: 'Deity',
    libraryBtn: 'Mantra Library',
    profileBtn: 'Profile',
    todayAuspicious: 'Auspicious Day',

    // Onboarding
    stepTitle: 'Step',
    stepOf: 'of',
    closeBtn: 'Close',
    nextBtn: 'Proceed',
    prevBtn: 'Back',
    acceptSankalpBtn: 'Accept Resolution & Begin Chanting 🔱',

    // Step 0: Language
    stepLanguageTitle: 'Choose Your Preferred Language',
    stepLanguageDesc: 'Your entire spiritual journey in Aastha : Puja Jaap will be presented in this language:',

    // Step 1: Name
    stepNameHeading: 'Welcome, Spiritual Seeker!',
    stepNameSub: 'In Sanatan tradition, invoking your name awakens the resolution. Please enter your name:',
    nameInputLabel: 'Your Sacred Name *',
    namePlaceholder: 'Enter your name...',
    nameError: '⚠️ Please enter your name to proceed',

    // Step 2: Gotra
    stepGotraHeading: 'Rishi Lineage & Gotra Selection',
    stepGotraSub: 'Gotra represents the spiritual root lineage in Vedic practice:',
    gotraSelectLabel: 'Select your Gotra from the dropdown:',
    gotraSelectPlaceholder: '-- Choose Your Gotra --',
    customGotraLabel: 'Type your custom Gotra here:',
    customGotraPlaceholder: 'e.g. Parashar, Vatsa, Shandilya...',
    quickTapGotra: '⚡ Quick Selection:',

    // Step 3: Kuldevta
    stepKuldevtaHeading: 'Family Deity (Kuldevta / Kuldevi)',
    stepKuldevtaSub: 'The grace of your family deity preserves harmony, protection, and prosperity.',
    kuldevtaSelectLabel: 'Select Family Deity from dropdown (Optional):',
    kuldevtaSelectPlaceholder: '-- Choose Family Deity --',
    customKuldevtaLabel: 'Type Family Deity name here:',
    customKuldevtaPlaceholder: 'e.g. Bhairav Baba, Jeen Mata, Kalka...',
    quickTapKuldevta: '⚡ Popular Deities:',

    // Step 4: Ishtdevta
    stepIshtdevtaHeading: 'Select Your Primary Chosen Deity (Ishtdevta)',
    stepIshtdevtaSub: 'A core Siddhi mantra will be automatically recommended based on your choice:',

    // Step 5: Sankalp Patra
    stepSankalpHeading: 'Spiritual Resolution (Sankalp Patra)',
    stepSankalpVedicQuote: '"Mama atmanah shruti-smriti-puranokta phala-praptyartham..."',
    sankalpNameRow: 'Sadhak Name:',
    sankalpGotraRow: 'Gotra Lineage:',
    sankalpKuldevtaRow: 'Family Deity:',
    sankalpIshtdevRow: 'Chosen Deity:',
    recommendedMantraHeading: 'Recommended Principal Siddhi Mantra:',

    // Counter Main
    malaLabel: 'Mala',
    beadOutOf: 'Beads / 108',
    totalChantsInSession: 'Total Chants In Session',
    completedMalas: 'Malas Completed',
    targetMalaLabel: 'Mala Target',
    tapModeTab: 'Manual Bead Tap',
    timerModeTab: 'Auto-Chant Timer',
    speakerModeTab: 'Voice Speaker Chant',

    tapModeInstruction: '👆 Tap the bead to chant',
    timerModeStart: '▶️ Start Auto-Chant Timer',
    timerModePause: '⏸️ Pause Auto-Chant Timer',
    timerNextIn: 'Next Bead in:',
    speakerModeStart: '▶️ Play Voice Chanting',
    speakerModeSpeaking: '📢 Voice Chanting In Progress...',
    speakerModeStop: '⏹️ Stop Voice Chanting',

    resetBtn: 'Reset Mala (0)',
    changeMantraBtn: 'Change Mantra',
    targetChangeBtn: 'Set Mala Target',
    intervalChangeBtn: 'Adjust Timer Interval',
    soundSettingsBtn: 'Audio & Music',
    volumeControlBtn: 'Volume Controls',
    musicStylesBtn: '10 Sacred Sound Styles',
    changeMusicBtn: 'Change Music',
    changeVolumeBtn: 'Set Volume',
    currentBellLabel: 'Bell',
    currentShankhLabel: 'Conch',
    ambienceBtn: 'Ambience Sounds',

    sankalpCompleteTitle: 'Resolution Accomplished! 🚩',
    sankalpCompleteSub: 'Your sadhana was completed auspiciously. May divine blessings enrich your life.',
    viewCertificateBtn: '📜 View Divine Siddhi Certificate',
    malaCompleteBanner: 'Sacred Conch Sound! 108 Beads Mala Completed.',
    punyaAccumulated: '108 Beads Completed • Divine Spiritual Merit Accumulated',

    // Mala Bead Selector
    beadSelectorTitle: 'Sacred Rosary (Mala) Type',
    rudrakshaBead: 'Rudraksha Rosary (Lord Shiva & Bhairav)',
    tulsiBead: 'Tulsi Rosary (Lord Rama & Krishna)',
    sphatikBead: 'Crystal Sphatik Rosary (Goddess Durga & Peace)',
    kamalgattaBead: 'Lotus Seed Rosary (Goddess Lakshmi & Wealth)',
    chandanBead: 'Red Sandalwood Rosary (Lord Hanuman & Energy)',

    // Ambience
    ambienceModalTitle: 'Sacred Meditative Ambience',
    ambienceModalSub: 'Subtle spiritual soundscapes to enhance concentration while chanting:',
    ambienceOff: 'Silent (Off)',
    ambienceOm: 'Continuous 432Hz Omkar',
    ambienceOmDesc: 'Sacred cosmic resonance for deep calm and focus',
    ambienceTanpura: 'Classical Meditative Tanpura',
    ambienceTanpuraDesc: 'Acoustic Indian drone in Sa-Pa for meditative depth',
    ambienceGanga: 'Sacred Ganga River Flow',
    ambienceGangaDesc: 'Gentle, cooling stream sound of holy waters',

    // Certificate
    certTitle: 'Aastha Siddhi Sadhana Certificate',
    certSub: 'Sanatan Vedic Mantra Anushthan Attestation Document',
    certRecipient: 'This is to attest that Sadhak',
    certGotra: 'Gotra',
    certKuldevta: 'Family Deity',
    certIshtdev: 'Chosen Deity',
    certMantraChanted: 'Has successfully accomplished chanting of the Siddhi Mantra:',
    certTotalChants: 'Total Malas Completed:',
    certCompletedOn: 'Completion Timestamp:',
    certAuspiciousSeal: 'Certified with the Golden Seal of Aastha : Puja Jaap',
    certShareWhatsapp: 'Share on WhatsApp',
    certDownload: 'Save Certificate',
    certClose: 'Close',

    // Sound Settings Modal
    soundModalTitle: 'Audio, Music & Voice Settings',
    soundModalSub: 'Volume controls and 10 types of sacred Temple Bells and Conch Shells',
    tabVolumes: 'Volumes & Speed',
    tabStyles: '10 Sacred Sound Styles',
    masterSoundToggle: 'Audio Effects',
    hapticToggle: 'Bead Vibration (Haptics)',
    voiceVolumeLabel: 'Voice Chanting Volume:',
    testVoiceBtn: 'Test Voice',
    stopVoiceBtn: 'Stop Voice',
    bellVolumeLabel: 'Temple Bell Volume:',
    testBellBtn: 'Ring Bell',
    shankhVolumeLabel: 'Conch Horn Volume:',
    testShankhBtn: 'Blow Conch',
    voiceSpeedLabel: 'Voice Chanting Speed:',
    voiceSpeedSlow: 'Slow (Peaceful)',
    voiceSpeedNormal: 'Normal (Moderate)',
    voiceSpeedFast: 'Fast (Brisk)',
    bellSoundsHeading: '🔔 5 Authentic Temple Bells',
    shankhSoundsHeading: '🐚 5 Sacred Conch Shell Horns',
    soundPreviewBtn: 'Play',
    soundPlayingBtn: 'Playing...',

    // Mantra Library
    libraryTitle: 'Divine Siddhi Mantra Treasury (50+ Mantras)',
    librarySub: 'With complete Siddhi Method, Auspicious Timing, Materials & Merits',
    searchPlaceholder: 'Search mantra or deity name...',
    allCategoriesTab: 'All Categories',
    customMantraBtn: '+ Add Custom Mantra',
    selectThisMantraBtn: 'Select for Chanting',
    activeMantraBadge: '✓ Current Active Mantra',
    siddhiVidhiHeading: 'Siddhi Method & Anushthan Rules:',
    samagriHeading: 'Sacred Materials (Samagri):',
    niyamHeading: 'Rules & Spiritual Safeguards:',
    benefitsHeading: 'Spiritual Fruits & Merits:',
    shubhTimingHeading: 'Most Auspicious Timing & Muhurta:',

    // Common
    close: 'Close',
    save: 'Save',
    cancel: 'Cancel',
    optional: 'Optional',
    required: 'Required'
  }
};

export const COMMON_GOTRAS_HI = [
  'कश्यप',
  'भारद्वाज',
  'वशिष्ठ',
  'शांडिल्य',
  'गौतम',
  'पराशर',
  'विश्वामित्र',
  'अंगिरा',
  'अत्रि',
  'भृगु',
  'गर्ग',
  'कौशिक',
  'वत्स',
  'उपमन्यु',
  'मुद्गल',
  'जाबालि',
  'धनंजय',
  'ज्ञात नहीं (कश्यप मानकर)',
  'अन्य (कस्टम गोत्र दर्ज करें)'
];

export const COMMON_GOTRAS_EN = [
  'Kashyap',
  'Bharadwaj',
  'Vashishtha',
  'Shandilya',
  'Gautam',
  'Parashar',
  'Vishwamitra',
  'Angira',
  'Atri',
  'Bhrigu',
  'Garg',
  'Kaushik',
  'Vatsa',
  'Upamanyu',
  'Mudgal',
  'Jabali',
  'Dhananjaya',
  'Unknown (Regarded as Kashyap)',
  'Other (Enter Custom Gotra)'
];

export const COMMON_KULDEVTAS_HI = [
  'ज्ञात नहीं / छोड़ें',
  'कुलदेवी श्री दुर्गा / जगदम्बा',
  'भैरव बाबा (कालभैरव / बटुक भैरव)',
  'हनुमान जी महाराज',
  'भगवान शिव / महादेव',
  'श्री खाटू श्याम जी',
  'जीण माता जी',
  'करणी माता जी',
  'शाकम्भरी माता जी',
  'शीतला माता जी',
  'कैला देवी माता जी',
  'ज्वाला माता जी',
  'चामुंडा माता जी',
  'विंध्यवासिनी माता जी',
  'नाग देवता / गोगा जी महाराज',
  'वीर तेजा जी महाराज',
  'नरसिंह भगवान',
  'सूर्य नारायण देव',
  'राधा कृष्ण जी',
  'श्री राम / सीताराम जी',
  'अन्य (कस्टम नाम दर्ज करें)'
];

export const COMMON_KULDEVTAS_EN = [
  'Unknown / Skip',
  'Kuldevi Shri Durga / Jagdamba',
  'Bhairav Baba (Kaal Bhairav / Batuk)',
  'Lord Hanuman Maharaj',
  'Lord Shiva / Mahadev',
  'Shri Khatu Shyam Ji',
  'Jeen Mata Ji',
  'Karni Mata Ji',
  'Shakambhari Mata Ji',
  'Sheetla Mata Ji',
  'Kaila Devi Mata Ji',
  'Jwala Mata Ji',
  'Chamunda Mata Ji',
  'Vindhyavasini Mata Ji',
  'Nag Devta / Goga Ji Maharaj',
  'Veer Teja Ji Maharaj',
  'Lord Narasimha',
  'Lord Surya Narayan',
  'Radha Krishna Ji',
  'Lord Rama / Sitaram',
  'Other (Enter Custom Name)'
];

export function getTranslations(lang: LanguageCode = 'hi'): Translations {
  return TRANSLATIONS[lang] || TRANSLATIONS.hi;
}

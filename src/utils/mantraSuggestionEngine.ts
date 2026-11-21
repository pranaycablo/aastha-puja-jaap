import { MantraItem, UserProfile, DeityType, LanguageCode } from '../types';
import { PRELOADED_MANTRAS, DEITY_CONFIG } from '../data/mantraDatabase';
import { calculateMoolank } from './ankaJyotishEngine';

export interface DayCosmicInfo {
  dayIndex: number;
  dayNameHi: string;
  dayNameEn: string;
  rulingDeityHi: string;
  planetHi: string;
  auspiciousColorHi: string;
  spiritualFocusHi: string;
}

export interface SadhanaDurationOption {
  days: number;
  labelHi: string;
  subtitleHi: string;
  purposeHi: string;
  malasPerDay: number;
  totalBeads: number;
  isDailyNitya?: boolean;
  isRecommended?: boolean;
}

export interface SadhanaPlanGuide {
  dailyRuleTitleHi: string;
  dailyRuleDescHi: string;
  beadsPerDay: number;
  recommendedTimeHi: string;
  goldenRuleHi: string;
  durationOptions: SadhanaDurationOption[];
}

export interface UserPersonalizedSadhanaPlan {
  userName: string;
  ishtDevtaKey: DeityType;
  ishtDevtaNameHi: string;
  dayInfo: DayCosmicInfo;
  moolank: number;

  // Exactly ONE Primary Isht Mantra for the user
  primaryIshtMantra: {
    id: string;
    nameHi: string;
    sanskritText: string;
    type: 'naam_jaap' | 'beej_mantra' | 'maha_mantra';
    meaningHi: string;
    dailyTargetCount: string;
    mantraItem: MantraItem;
  };

  // Exactly ONE Primary Isht Chalisa or Stotra
  primaryIshtPaath: {
    id: string;
    titleHi: string;
    type: 'chalisa' | 'stotra';
    frequencyHi: string;
    significanceHi: string;
  };

  // Structured Duration & Discipline Guidance (कितने दिन और कैसे करें)
  sadhanaPlanGuide: SadhanaPlanGuide;

  // Today's optional day-specific blessing
  optionalDayAlignment: {
    dayNameHi: string;
    rulingDeityHi: string;
    suggestedShortBeej: string;
    noteHi: string;
    mantraItem?: MantraItem;
  };
}

// 7-Day Planetary & Deity Mapping
export const VEDIC_DAYS: DayCosmicInfo[] = [
  {
    dayIndex: 0,
    dayNameHi: 'रविवार (Sunday)',
    dayNameEn: 'Sunday',
    rulingDeityHi: 'भगवान सूर्य नारायण व श्री राम',
    planetHi: 'सूर्य (आत्मबल व तेज)',
    auspiciousColorHi: 'नारंगी व लाल',
    spiritualFocusHi: 'आरोग्य, यश व आत्मबल'
  },
  {
    dayIndex: 1,
    dayNameHi: 'सोमवार (Monday)',
    dayNameEn: 'Monday',
    rulingDeityHi: 'देवाधिदेव महादेव (शिव जी)',
    planetHi: 'चंद्रमा (मानसिक शांति)',
    auspiciousColorHi: 'श्वेत (सफेद) व दुधिया',
    spiritualFocusHi: 'मानसिक शांति व तनाव मुक्ति'
  },
  {
    dayIndex: 2,
    dayNameHi: 'मंगलवार (Tuesday)',
    dayNameEn: 'Tuesday',
    rulingDeityHi: 'श्री संकटमोचन हनुमान जी',
    planetHi: 'मंगल (साहस व ऊर्जा)',
    auspiciousColorHi: 'सिंदूरी व लाल',
    spiritualFocusHi: 'भय नाश व संकट निवारण'
  },
  {
    dayIndex: 3,
    dayNameHi: 'बुधवार (Wednesday)',
    dayNameEn: 'Wednesday',
    rulingDeityHi: 'भगवान श्री गणेश व माँ दुर्गा',
    planetHi: 'बुध (बुद्धि व वाणी)',
    auspiciousColorHi: 'हरा व धानी',
    spiritualFocusHi: 'विघ्न हरण व विद्या लाभ'
  },
  {
    dayIndex: 4,
    dayNameHi: 'गुरुवार (Thursday)',
    dayNameEn: 'Thursday',
    rulingDeityHi: 'भगवान श्री हरि विष्णु व देवगुरु',
    planetHi: 'बृहस्पति (ज्ञान व समृद्धि)',
    auspiciousColorHi: 'हल्दी पीला व स्वर्णिम',
    spiritualFocusHi: 'गुरु कृपा व सुख-समृद्धि'
  },
  {
    dayIndex: 5,
    dayNameHi: 'शुक्रवार (Friday)',
    dayNameEn: 'Friday',
    rulingDeityHi: 'माँ महालक्ष्मी व माँ दुर्गा',
    planetHi: 'शुक्र (ऐश्वर्य व शांति)',
    auspiciousColorHi: 'गुलाबी व चमकीला श्वेत',
    spiritualFocusHi: 'धन, वैभव व परिवार कल्याण'
  },
  {
    dayIndex: 6,
    dayNameHi: 'शनिवार (Saturday)',
    dayNameEn: 'Saturday',
    rulingDeityHi: 'श्री शनि देव व हनुमान जी',
    planetHi: 'शनि (कर्म व न्याय)',
    auspiciousColorHi: 'गहरा नीला व काला',
    spiritualFocusHi: 'कष्ट शांति व कर्म शुद्धि'
  }
];

// Master Isht Deity Sadhana Dictionary (Strictly 1 Primary Mantra + 1 Paath per Isht)
interface DeitySadhanaProfile {
  primaryMantraNameHi: string;
  sanskritText: string;
  type: 'naam_jaap' | 'beej_mantra' | 'maha_mantra';
  meaningHi: string;
  primaryPaathTitleHi: string;
  paathType: 'chalisa' | 'stotra';
  paathSignificanceHi: string;
}

const DEITY_SADHANA_MAP: Record<string, DeitySadhanaProfile> = {
  hanuman: {
    primaryMantraNameHi: 'ॐ हं हनुमते नमः',
    sanskritText: 'ॐ हं हनुमते नमः।',
    type: 'beej_mantra',
    meaningHi: 'पवनपुत्र संकटमोचन हनुमान जी का अमोघ एकाक्षरी बीज मंत्र। यह भय, रोग, संकट और नकारात्मक ऊर्जा को तत्काल शांत करता है।',
    primaryPaathTitleHi: 'श्री हनुमान चालीसा',
    paathType: 'chalisa',
    paathSignificanceHi: 'गोस्वामी तुलसीदास कृत ४० पावन चौपाइयां। नित्य १ या ३ पाठ समस्त भयों को हरकर आत्मबल प्रदान करते हैं।'
  },
  shiva: {
    primaryMantraNameHi: 'ॐ नमः शिवाय',
    sanskritText: 'ॐ नमः शिवाय।',
    type: 'naam_jaap',
    meaningHi: 'पंचाक्षर सिद्ध शिव महामंत्र। शिव पुराण के अनुसार यह मन को शांत कर पंचतत्वों की शुद्धि एवं मोक्ष प्रदाता है।',
    primaryPaathTitleHi: 'श्री शिव चालीसा',
    paathType: 'chalisa',
    paathSignificanceHi: 'भोलेनाथ की स्तुति से गृह क्लेश का शमन होता है तथा मन में असीम शांति व संतोष का संचार होता है।'
  },
  krishna: {
    primaryMantraNameHi: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे',
    sanskritText: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे। हरे राम हरे राम राम राम हरे हरे॥',
    type: 'naam_jaap',
    meaningHi: 'कलिसंतरण उपनिषद का सिद्ध महामंत्र। सोलह नाम बत्तीस अक्षर का यह जप अंतःकरण को दिव्य आनंद व भक्ति से भर देता है।',
    primaryPaathTitleHi: 'राधे राधे (श्री राधा नाम जप)',
    paathType: 'chalisa',
    paathSignificanceHi: 'श्री राधा रानी का पावन नाम जप भगवान श्री कृष्ण की अहैतुकी कृपा और निष्कपट प्रेम प्रदान करता है।'
  },
  ram: {
    primaryMantraNameHi: 'श्री राम जय राम जय जय राम',
    sanskritText: 'श्री राम जय राम जय जय राम।',
    type: 'naam_jaap',
    meaningHi: 'कलयुग का तारक महामंत्र। राम नाम समस्त पापों, चिंताओं और अशांति को हरकर परम शांति प्रदान करने वाला कल्पवृक्ष है।',
    primaryPaathTitleHi: 'संकटमोचन हनुमानाष्टक (या राम रक्षा स्तोत्र)',
    paathType: 'stotra',
    paathSignificanceHi: 'प्रभु श्री राम के अनन्य सेवक हनुमान जी की स्तुति जीवन के किसी भी कठिन संकट को तत्काल हर लेती है।'
  },
  durga_kali: {
    primaryMantraNameHi: 'ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे',
    sanskritText: 'ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे।',
    type: 'beej_mantra',
    meaningHi: 'माँ जगदम्बा का नवार्ण बीज महामंत्र। महासरस्वती, महालक्ष्मी और महाकाली की संयुक्त शक्ति से सर्व संकटों का नाश होता है।',
    primaryPaathTitleHi: 'श्री दुर्गा चालीसा',
    paathType: 'chalisa',
    paathSignificanceHi: 'नित्य सांध्य वेला में दीप जलाकर पाठ करने से घर में दिव्य सुरक्षा कवच और सुख-समृद्धि का वास होता है।'
  },
  ganesha: {
    primaryMantraNameHi: 'ॐ गं गणपतये नमः',
    sanskritText: 'ॐ गं गणपतये नमः।',
    type: 'beej_mantra',
    meaningHi: 'प्रथम पूज्य भगवान गणेश का बीज मंत्र। किसी भी कार्य के आरंभ में जप करने से समस्त विघ्न व रुकावटें दूर होती हैं।',
    primaryPaathTitleHi: 'श्री गणेश चालीसा',
    paathType: 'chalisa',
    paathSignificanceHi: 'बुद्धि, विवेक और कार्य सिद्धि हेतु प्रतिदिन प्रातःकाल १ पाठ अत्यंत फलदायी है।'
  },
  vishnu: {
    primaryMantraNameHi: 'ॐ नमो भगवते वासुदेवाय',
    sanskritText: 'ॐ नमो भगवते वासुदेवाय।',
    type: 'naam_jaap',
    meaningHi: 'द्वादशाक्षर महामंत्र। श्रीमद्भागवत का परम पावन मंत्र जो जगतपालक नारायण की अखंड कृपा, शांति व वैकुंठ पद देता है।',
    primaryPaathTitleHi: 'श्री विष्णु चालीसा (अथवा सहस्रनाम)',
    paathType: 'chalisa',
    paathSignificanceHi: 'गुरुवार अथवा प्रतिदिन पाठ से जीवन में स्थिरता, ज्ञान और पारिवारिक समृद्धि प्राप्त होती है।'
  },
  lakshmi_kuber: {
    primaryMantraNameHi: 'ॐ श्रीं ह्रीं क्लीं महालक्ष्म्यै नमः',
    sanskritText: 'ॐ श्रीं ह्रीं क्लीं महालक्ष्म्यै नमः।',
    type: 'beej_mantra',
    meaningHi: 'अष्टलक्ष्मी आकर्षण बीज मंत्र। ऋण मुक्ति, व्यापार में बरकत एवं घर में स्थिर लक्ष्मी के वास हेतु अमोघ मंत्र।',
    primaryPaathTitleHi: 'श्री लक्ष्मी चालीसा (अथवा कनकधारा स्तोत्र)',
    paathType: 'chalisa',
    paathSignificanceHi: 'सांध्य गोधूलि वेला में घी का दीपक प्रज्वलित कर पाठ करने से दरिद्रता का नाश होता है।'
  },
  navgraha: {
    primaryMantraNameHi: 'गायत्री महामंत्र',
    sanskritText: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥',
    type: 'maha_mantra',
    meaningHi: 'वेदों की माता गायत्री का परम मंत्र। यह बुद्धि को सन्मार्ग पर ले जाता है और सभी ग्रहों के दोषों को शांत करता है।',
    primaryPaathTitleHi: 'नवग्रह शांति स्तोत्र',
    paathType: 'stotra',
    paathSignificanceHi: 'नौ ग्रहों की अनुकूलता और जीवन में अचानक आने वाले कष्टों के निवारण हेतु नित्य पाठ।'
  }
};

/**
 * Generates an authoritative, single-focus Sadhana plan for the user
 * (No confusing clutter of 3 chalisas and 6 mantras)
 */
export function getPersonalizedSadhanaPlan(
  profile: UserProfile,
  language: LanguageCode = 'hi'
): UserPersonalizedSadhanaPlan {
  const isHi = language === 'hi';
  const now = new Date();
  const dayIdx = now.getDay();
  const dayInfo = VEDIC_DAYS[dayIdx];

  const userName = profile.name && profile.name.trim() !== '' && profile.name !== 'साधक'
    ? profile.name.trim()
    : '';

  const moolank = profile.dob ? calculateMoolank(profile.dob) : 1;
  const ishtKey = (profile.ishtDevta in DEITY_SADHANA_MAP) ? profile.ishtDevta : 'shiva';
  const ishtProfile = DEITY_SADHANA_MAP[ishtKey];
  const deityCfg = DEITY_CONFIG[profile.ishtDevta] || DEITY_CONFIG.shiva;
  const ishtDevtaNameHi = deityCfg.label.split('(')[0].trim();

  // Create clean MantraItem for the primary mantra
  const primaryMantraItem: MantraItem = {
    id: `sadhana-${ishtKey}-primary`,
    name: `${ishtProfile.primaryMantraNameHi} (${ishtDevtaNameHi} नित्य साधना)`,
    text: ishtProfile.sanskritText,
    deity: profile.ishtDevta,
    category: ishtProfile.type,
    meaning: ishtProfile.meaningHi
  };

  // Structured Duration Guidance (कितना दिन करना चाहिए)
  const durationOptions: SadhanaDurationOption[] = [
    {
      days: 0, // Nitya
      labelHi: 'नित्य दैनिक नियम (आजीवन)',
      subtitleHi: 'प्रतिदिन १ माला (१०८ जप) • लगभग ७-१० मिनट',
      purposeHi: 'नित्य मानसिक शांति, आंतरिक शुद्धि और इष्टदेव की अविरल कृपा हेतु जीवनभर का नियम।',
      malasPerDay: 1,
      totalBeads: 108,
      isDailyNitya: true,
      isRecommended: true
    },
    {
      days: 11,
      labelHi: '११ दिवसीय लघु शांति अनुष्ठान',
      subtitleHi: 'प्रतिदिन ३ माला (३२४ जप) • कुल ३३ माला',
      purposeHi: 'अचानक उत्पन्न हुई मानसिक अशांति, भय, पारिवारिक तनाव या स्वास्थ्य चिंता के तत्काल शमन हेतु।',
      malasPerDay: 3,
      totalBeads: 3564
    },
    {
      days: 21,
      labelHi: '२१ दिवसीय कार्य-सिद्धि संकल्प',
      subtitleHi: 'प्रतिदिन ५ माला (५४० जप) • कुल १०५ माला',
      purposeHi: 'नौकरी, व्यापार, परीक्षा, कोर्ट-कचहरी या किसी विशेष अटके हुए कार्य की निर्विघ्न सिद्धि हेतु।',
      malasPerDay: 5,
      totalBeads: 11340
    },
    {
      days: 41,
      labelHi: '४१ दिवसीय महा-साधना (मंडल अनुष्ठान)',
      subtitleHi: 'प्रतिदिन ११ माला (१,१८६ जप) • कुल ४५१ माला',
      purposeHi: 'इष्टदेव की साक्षात कृपा, गंभीर ग्रह-दोष मुक्ति, वास्तु शांति और आत्मिक सिद्धि हेतु सर्वोच्च शास्त्रोक्त मंडल।',
      malasPerDay: 11,
      totalBeads: 48708
    }
  ];

  const sadhanaPlanGuide: SadhanaPlanGuide = {
    dailyRuleTitleHi: 'एक साधे सब सधै — साधना का स्वर्ण नियम',
    dailyRuleDescHi: 'शास्त्रों का स्पष्ट आदेश है कि एक समय में ५-६ अलग-अलग मंत्रों में मन भटकाने के बजाय अपने केवल १ मुख्य इष्ट मंत्र का नित्य एकाग्र भाव से १०८ बार जप करें। इसी से वास्तविक सिद्धि और कृपा जाग्रत होती है।',
    beadsPerDay: 108,
    recommendedTimeHi: 'प्रातःकाल (ब्रह्म मुहूर्त ५:०० - ६:३०) अथवा सांध्य वेला (६:०० - ७:३०)',
    goldenRuleHi: 'दिशा: पूर्व या उत्तर मुख। आसन: कुशा या ऊनी कम्बल। मन में पूर्ण निष्कपट भाव।',
    durationOptions
  };

  // Optional Day Alignment (Gentle recommendation for today, without forcing multiple chalisas)
  let optionalBeej = 'ॐ नमो नारायणाय';
  let optionalNote = 'आज गुरुवार है। समय मिलने पर नित्य इष्ट जप के अतिरिक्त १ बार भगवान विष्णु का ध्यान कर सकते हैं।';
  if (dayIdx === 1) {
    optionalBeej = 'ॐ नमः शिवाय';
    optionalNote = 'आज सोमवार है। भोलेनाथ पर जल अर्पित कर शिव स्मरण विशेष शुभ है।';
  } else if (dayIdx === 2) {
    optionalBeej = 'ॐ हं हनुमते नमः';
    optionalNote = 'आज मंगलवार है। संकटमोचन हनुमान जी का स्मरण असीम आत्मबल प्रदान करता है।';
  } else if (dayIdx === 3) {
    optionalBeej = 'ॐ गं गणपतये नमः';
    optionalNote = 'आज बुधवार है। भगवान गणेश का ध्यान समस्त विघ्नों को शांत करता है।';
  } else if (dayIdx === 5) {
    optionalBeej = 'ॐ महालक्ष्म्यै नमः';
    optionalNote = 'आज शुक्रवार है। माँ महालक्ष्मी का स्मरण घर में श्री व समृद्धि लाता है।';
  } else if (dayIdx === 6) {
    optionalBeej = 'ॐ शं शनैश्चराय नमः';
    optionalNote = 'आज शनिवार है। शनि देव व हनुमान जी का स्मरण अनिष्ट प्रभावों को शांत करता है।';
  } else if (dayIdx === 0) {
    optionalBeej = 'ॐ सूर्याय नमः';
    optionalNote = 'आज रविवार है। भगवान सूर्य नारायण को जल अर्पण कर तेज वृद्धि होती है।';
  }

  return {
    userName,
    ishtDevtaKey: profile.ishtDevta,
    ishtDevtaNameHi,
    dayInfo,
    moolank,
    primaryIshtMantra: {
      id: `primary-${ishtKey}`,
      nameHi: ishtProfile.primaryMantraNameHi,
      sanskritText: ishtProfile.sanskritText,
      type: ishtProfile.type,
      meaningHi: ishtProfile.meaningHi,
      dailyTargetCount: 'नित्य १०८ जप (१ माला)',
      mantraItem: primaryMantraItem
    },
    primaryIshtPaath: {
      id: `paath-${ishtKey}`,
      titleHi: ishtProfile.primaryPaathTitleHi,
      type: ishtProfile.paathType,
      frequencyHi: 'नित्य प्रतिदिन १ पाठ',
      significanceHi: ishtProfile.paathSignificanceHi
    },
    sadhanaPlanGuide,
    optionalDayAlignment: {
      dayNameHi: dayInfo.dayNameHi.split('(')[0].trim(),
      rulingDeityHi: dayInfo.rulingDeityHi,
      suggestedShortBeej: optionalBeej,
      noteHi: optionalNote
    }
  };
}

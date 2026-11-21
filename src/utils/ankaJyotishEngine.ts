/**
 * VEDIC ANKA JYOTISH ENGINE (वैदिक अंक ज्योतिष एवं चालडियन पद्धति)
 * मोबाइल अंक विश्लेषण एवं नाम अंक शोधन व सुधार (Name Correction)
 * 100% Offline, Authentic Shastric Calculations
 */

// Chaldean letter values (Chaldean Numerology System - Ancient & Most Accurate)
export const CHALDEAN_MAP: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8
  // Note: 9 has no letter in Chaldean system as it was considered sacred to the Divine
};

// Planet rulers for root numbers 1-9
export const PLANET_RULERS: Record<number, {
  planetHi: string;
  planetEn: string;
  deityHi: string;
  natureHi: string;
  elementHi: string;
  luckyColorHi: string;
  luckyDayHi: string;
  luckyStoneHi: string;
  mantraHi: string;
}> = {
  1: {
    planetHi: 'सूर्यदेव (Sun)',
    planetEn: 'Sun',
    deityHi: 'भगवान श्री सूर्य नारायण',
    natureHi: 'नेतृत्व, आत्मबल, सरकारी पद, तेज व प्रशासनिक क्षमता',
    elementHi: 'अग्नि तत्व',
    luckyColorHi: 'नारंगी, केसरिया, सुनहरा व लाल',
    luckyDayHi: 'रविवार',
    luckyStoneHi: 'माणिक्य (Ruby) अथवा तांबा',
    mantraHi: 'ॐ घृणिः सूर्याय नमः'
  },
  2: {
    planetHi: 'चंद्रमा (Moon)',
    planetEn: 'Moon',
    deityHi: 'भगवान शिव व माता पार्वती',
    natureHi: 'मन की शांति, भावनाएं, कल्पनाशक्ति, कला व सौम्यता',
    elementHi: 'जल तत्व',
    luckyColorHi: 'सफेद, क्रीम, मोतिया व सिल्वर',
    luckyDayHi: 'सोमवार',
    luckyStoneHi: 'मोती (Pearl) अथवा चांदी',
    mantraHi: 'ॐ सों सोमाय नमः'
  },
  3: {
    planetHi: 'बृहस्पति (Jupiter)',
    planetEn: 'Jupiter',
    deityHi: 'देवगुरु बृहस्पति व भगवान विष्णु',
    natureHi: 'ज्ञान, धर्म, उच्च शिक्षा, परामर्श, विवेक व गुरु कृपा',
    elementHi: 'आकाश तत्व',
    luckyColorHi: 'पीला, सुनहरा व बसंती',
    luckyDayHi: 'गुरुवार',
    luckyStoneHi: 'पुखराज (Yellow Sapphire) अथवा पीतल/सोना',
    mantraHi: 'ॐ बृं बृहस्पतये नमः'
  },
  4: {
    planetHi: 'राहु देव (Rahu)',
    planetEn: 'Rahu',
    deityHi: 'मां सरस्वती व भैरव देव',
    natureHi: 'तकनीक, अप्रत्याशित बदलाव, शोध, आउट ऑफ द बॉक्स सोच व रहस्य',
    elementHi: 'वायु तत्व',
    luckyColorHi: 'नीला, स्लेटी व भूरा',
    luckyDayHi: 'शनिवार / बुधवार',
    luckyStoneHi: 'गोमेद (Hessonite)',
    mantraHi: 'ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः'
  },
  5: {
    planetHi: 'बुध ग्रह (Mercury)',
    planetEn: 'Mercury',
    deityHi: 'भगवान श्री गणेश व भगवान विष्णु',
    natureHi: 'व्यापार, तीक्ष्ण बुद्धि, वाकपटुता, मीडिया, शेयर व स्थिरता',
    elementHi: 'पृथ्वी तत्व',
    luckyColorHi: 'हरा, तोतिया व कांसा रंग',
    luckyDayHi: 'बुधवार',
    luckyStoneHi: 'पन्ना (Emerald) अथवा कांसा',
    mantraHi: 'ॐ बुं बुधाय नमः'
  },
  6: {
    planetHi: 'शुक्राचार्य (Venus)',
    planetEn: 'Venus',
    deityHi: 'माता महालक्ष्मी',
    natureHi: 'ऐश्वर्य, सौंदर्य, आकर्षण, विलासिता, दांपत्य व कला',
    elementHi: 'जल तत्व',
    luckyColorHi: 'चमकदार सफेद, हल्का गुलाबी व क्रीम',
    luckyDayHi: 'शुक्रवार',
    luckyStoneHi: 'हीरा (Diamond) / ओपल अथवा चांदी',
    mantraHi: 'ॐ शुं शुक्राय नमः'
  },
  7: {
    planetHi: 'केतु देव (Ketu)',
    planetEn: 'Ketu',
    deityHi: 'भगवान श्री गणेश व मत्स्य अवतार',
    natureHi: 'आध्यात्म, गूढ़ विज्ञान, शोध, अंतर्ज्ञान व मोक्ष',
    elementHi: 'अग्नि तत्व',
    luckyColorHi: 'धूम्रवर्ण (धुआं जैसा), चितकबरा व पीला',
    luckyDayHi: 'गुरुवार / मंगलवार',
    luckyStoneHi: 'लहसुनिया (Cat\'s Eye)',
    mantraHi: 'ॐ कें केतवे नमः'
  },
  8: {
    planetHi: 'शनिदेव (Saturn)',
    planetEn: 'Saturn',
    deityHi: 'शनिदेव व हनुमान जी',
    natureHi: 'कर्म, न्याय, धैर्य, गहरा संघर्ष और स्थायी सफलता',
    elementHi: 'वायु तत्व',
    luckyColorHi: 'गहरा नीला, काला व जामुनी',
    luckyDayHi: 'शनिवार',
    luckyStoneHi: 'नीलम (Blue Sapphire) अथवा लोहा/पंचधातु',
    mantraHi: 'ॐ शं शनैश्चराय नमः'
  },
  9: {
    planetHi: 'मंगल देव (Mars)',
    planetEn: 'Mars',
    deityHi: 'श्री हनुमान जी व कार्तिकेय',
    natureHi: 'साहस, पराक्रम, ऊर्जा, भूमि, नेतृत्व व गतिशीलता',
    elementHi: 'अग्नि तत्व',
    luckyColorHi: 'लाल, नारंगी व सिंदूरी',
    luckyDayHi: 'मंगलवार',
    luckyStoneHi: 'मूंगा (Coral) अथवा तांबा',
    mantraHi: 'ॐ भौं भौमाय नमः'
  }
};

// Friendly and enemy number relations
export const NUMBER_RELATIONS: Record<number, { friends: number[]; neutrals: number[]; enemies: number[] }> = {
  1: { friends: [1, 2, 3, 5, 9], neutrals: [4, 7], enemies: [8, 6] },
  2: { friends: [1, 2, 3, 5], neutrals: [7], enemies: [4, 8, 9] },
  3: { friends: [1, 2, 3, 5, 9], neutrals: [7, 8], enemies: [6] },
  4: { friends: [1, 5, 6, 7], neutrals: [3], enemies: [2, 4, 8, 9] },
  5: { friends: [1, 5, 6], neutrals: [2, 3, 4, 7, 8, 9], enemies: [] }, // Mercury is friend to most
  6: { friends: [1, 5, 6, 7, 8], neutrals: [9], enemies: [3] },
  7: { friends: [1, 4, 5, 6], neutrals: [3, 8], enemies: [2, 9] },
  8: { friends: [3, 5, 6], neutrals: [7], enemies: [1, 2, 4, 8, 9] },
  9: { friends: [1, 3, 5, 9], neutrals: [6, 7], enemies: [2, 4, 8] }
};

// Shastric Compound Number Meanings (चालडियन संयुक्त अंक फल)
export const COMPOUND_NUMBER_DATA: Record<number, {
  titleHi: string;
  nature: 'highly_auspicious' | 'auspicious' | 'neutral' | 'inauspicious';
  meaningHi: string;
  careerFieldsHi: string;
}> = {
  10: { titleHi: 'भाग्य का चक्र (Wheel of Fortune)', nature: 'highly_auspicious', meaningHi: 'सम्मान, सफलता और योजनाओं का पूर्ण होना। यह अंक निरंतर प्रगति देता है।', careerFieldsHi: 'प्रबंधन, राजनीति, नेतृत्व' },
  11: { titleHi: 'मुखाच्छादित सिंह (Clenched Power)', nature: 'neutral', meaningHi: 'प्रबल आंतरिक शक्ति, पर दूसरों के विश्वासघात का डर। अत्यधिक सतर्कता की आवश्यकता।', careerFieldsHi: 'वकालत, सुरक्षा, अन्वेषण' },
  12: { titleHi: 'त्याग व समर्पण (Sacrifice for Greater Good)', nature: 'neutral', meaningHi: 'दूसरों के कल्याण के लिए त्याग करना पड़ता है। योजनाओं में विलंब संभव।', careerFieldsHi: 'शिक्षा, समाज सेवा, चिकित्सा' },
  13: { titleHi: 'रूपांतरण व पुनर्निर्माण (Regeneration)', nature: 'neutral', meaningHi: 'अचानक बड़े बदलाव, पुरानी व्यवस्था तोड़कर नया निर्माण करने की ऊर्जा।', careerFieldsHi: 'अनुसंधान, निर्माण, तकनीक' },
  14: { titleHi: 'गति व व्यापारिक लाभ (Movement & Commerce)', nature: 'auspicious', meaningHi: 'व्यापार, यात्रा और त्वरित निर्णय से धन लाभ। बुध का शुभ प्रभाव।', careerFieldsHi: 'व्यापार, आयात-निर्यात, मार्केटिंग' },
  15: { titleHi: 'जादुई आकर्षण व लक्ष्मी कृपा (The Magician)', nature: 'highly_auspicious', meaningHi: 'अत्यंत भाग्यशाली! कला, वाकपटुता, आकर्षण और अपार धन संपत्ति की प्राप्ति।', careerFieldsHi: 'फिल्म, कला, संगीत, विलासिता व्यापार' },
  16: { titleHi: 'खंडित प्रासाद (Shattered Citadel)', nature: 'inauspicious', meaningHi: 'अचानक मानहानि, अहंकार से पतन, दुर्घटना या धोखे का भय। सुधार आवश्यक है।', careerFieldsHi: 'सावधानीपूर्वक कार्य करें' },
  17: { titleHi: 'विद्वानों का तारा (Star of the Magi)', nature: 'highly_auspicious', meaningHi: 'अमर कीर्ति, आंतरिक शांति और बाधाओं को जीतकर विश्व में नाम कमाना।', careerFieldsHi: 'साहित्य, अध्यात्म, विज्ञान' },
  18: { titleHi: 'आंतरिक कलह व धोखा (Spiritual Conflict)', nature: 'inauspicious', meaningHi: 'अपनों से विश्वासघात, पारिवारिक विवाद, शत्रु षड्यंत्र। नाम सुधार अनिवार्य है।', careerFieldsHi: 'विवादित क्षेत्रों से बचें' },
  19: { titleHi: 'स्वर्ग का राजकुमार (Prince of Heaven)', nature: 'highly_auspicious', meaningHi: 'सूर्य का अत्यंत तेजस्वी अंक! हर क्षेत्र में विजय, स्वास्थ्य, समृद्धि और मान-सम्मान।', careerFieldsHi: 'सरकारी नौकरी, राजनीति, उद्योग' },
  20: { titleHi: 'दिव्य जागरण (The Awakening)', nature: 'neutral', meaningHi: 'नई दृष्टि व चेतना, आध्यात्मिक जागृति, पर सांसारिक कार्यों में कभी-कभी देरी।', careerFieldsHi: 'योग, दर्शन, मनोविज्ञान' },
  21: { titleHi: 'सफलता का मुकुट (The Crown of the Magi)', nature: 'highly_auspicious', meaningHi: 'दीर्घकालिक संघर्ष के बाद सर्वोच्च शिखर पर पहुंचना, वैश्विक मान-सम्मान।', careerFieldsHi: 'अंतर्राष्ट्रीय व्यापार, उच्च पद' },
  22: { titleHi: 'नेत्रहीनता की चेतावनी (The Blindfold)', nature: 'inauspicious', meaningHi: 'भ्रम में आकर गलत लोगों पर भरोसा करना और आर्थिक नुकसान उठाना।', careerFieldsHi: 'सख्त वित्तीय निगरानी' },
  23: { titleHi: 'सिंह तारा (Royal Star of the Lion)', nature: 'highly_auspicious', meaningHi: 'अंक शास्त्र का सर्वश्रेष्ठ अंक! वरिष्ठों से सहयोग, अपार सफलता, धन व सुरक्षा।', careerFieldsHi: 'उद्योग, फिल्म, शेयर बाजार, राजनीति' },
  24: { titleHi: 'पारिवारिक सुख व ऐश्वर्य (Love & Fortune)', nature: 'highly_auspicious', meaningHi: 'प्रेम, दांपत्य सुख, स्थिर धन और प्रभावशाली मित्रों का आजीवन सहयोग।', careerFieldsHi: 'हॉस्पिटैलिटी, इंटीरियर, कला, व्यापार' },
  25: { titleHi: 'अनुभव से सिद्धि (Wisdom through Trials)', nature: 'auspicious', meaningHi: 'प्रारंभिक कठिनाइयों के बाद अपार परिपक्वता, दूरदर्शिता और सम्मान।', careerFieldsHi: 'अन्वेषण, सलाहकार, ज्योतिष' },
  26: { titleHi: 'साझेदारी में जोखिम (Partnership Hazard)', nature: 'inauspicious', meaningHi: 'दूसरों पर आंख मूंदकर भरोसा करने से भारी वित्तीय क्षति व कानूनी विवाद।', careerFieldsHi: 'एकल व्यवसाय ही करें' },
  27: { titleHi: 'राजदंड (The Sceptre)', nature: 'auspicious', meaningHi: 'साहस, बौद्धिक शक्ति और अधिकार संपन्न पद। उच्च स्तर का बौद्धिक प्रभाव।', careerFieldsHi: 'सेना, पुलिस, प्रशासनिक सेवा, कानून' },
  28: { titleHi: 'विश्वासघात व रुकावट (The Trusting Lamb)', nature: 'inauspicious', meaningHi: 'कठिन परिश्रम के बाद भी दूसरों द्वारा श्रेय छीन लिया जाना। नाम सुधार की जरूरत।', careerFieldsHi: 'अलर्ट रहकर काम करें' },
  29: { titleHi: 'दबाव में सौम्यता (Grace under Pressure)', nature: 'neutral', meaningHi: 'असुरक्षा की भावना, रिश्तों में अनिश्चितता, पर आध्यात्मिक गहराई।', careerFieldsHi: 'परामर्श, चिकित्सा' },
  30: { titleHi: 'गंभीर चिंतक (The Scholar)', nature: 'auspicious', meaningHi: 'बौद्धिक श्रेष्ठता, लेखन और विचारों से समाज का मार्गदर्शन करना।', careerFieldsHi: 'लेखन, मीडिया, प्रोफेसर' },
  31: { titleHi: 'एकांत साधना (The Recluse)', nature: 'neutral', meaningHi: 'आंतरिक चिंतन, एकाकी जीवन, सांसारिक सुखों से हल्का अलगाव।', careerFieldsHi: 'शोध, लाइब्रेरी, कोडिंग' },
  32: { titleHi: 'जादुई वाकपटुता (Magical Orator)', nature: 'highly_auspicious', meaningHi: 'अपनी वाणी और व्यवहार से जनता को सम्मोहित करना, व्यापार में अपार ख्याति।', careerFieldsHi: 'मार्केटिंग, मीडिया, वकालत, व्यापार' },
  33: { titleHi: 'महागुरु (The Master Teacher)', nature: 'highly_auspicious', meaningHi: 'अत्यंत शुभ! धर्म, सेवा, त्याग और समाज में अद्वितीय पूज्यता।', careerFieldsHi: 'धर्मगुरु, शिक्षण संस्थान, सामाजिक नेतृत्व' },
  34: { titleHi: 'सत्य से उत्थान (Strength through Truth)', nature: 'auspicious', meaningHi: 'सत्य और निष्ठा के मार्ग पर चलकर स्थायी प्रतिष्ठा और धनार्जन।', careerFieldsHi: 'न्यायपालिका, लेखा (CA), प्रशासन' },
  35: { titleHi: 'कुशल रणनीतिकार (The Diplomat)', nature: 'auspicious', meaningHi: 'शांत स्वभाव से जटिल समस्याओं का समाधान, व्यापारिक संतुलन।', careerFieldsHi: 'राजनय (IFS), बैंकिंग, फाइनेंस' },
  36: { titleHi: 'विजयी योद्धा (The Victorious)', nature: 'auspicious', meaningHi: 'साहस और बाहुबल से शत्रुओं पर विजय और अधिकार प्राप्त करना।', careerFieldsHi: 'खेल, रियल एस्टेट, सेना' },
  37: { titleHi: 'परम सौभाग्य व मित्रता (Supreme Fortune)', nature: 'highly_auspicious', meaningHi: 'अत्यंत शुभ! प्रेम संबंध, विवाह, धन लाभ और व्यापार में बिना रुकावट प्रगति।', careerFieldsHi: 'सिनेमा, फैशन, व्यापार, कंसल्टेंसी' },
  41: { titleHi: 'सेनापति व संगठनकर्ता (The Commander)', nature: 'highly_auspicious', meaningHi: 'अग्रणी नेतृत्व, प्रशासनिक दक्षता, लाखों लोगों का मार्गदर्शन करने की शक्ति।', careerFieldsHi: 'CEO, राजनीति, उच्च अधिकारी' },
  42: { titleHi: 'स्वर्ण स्पर्श (The Golden Touch)', nature: 'highly_auspicious', meaningHi: 'जिस कार्य में हाथ लगाएं वह सफल हो, स्थायी संपत्ति और पारिवारिक प्रेम।', careerFieldsHi: 'ज्वैलरी, फाइनेंस, रियल एस्टेट' },
  45: { titleHi: 'दूरदर्शी मनीषी (The Visionary)', nature: 'highly_auspicious', meaningHi: 'साहस और बुद्धि का अद्भुत संगम, भारी जनसमर्थन और दूरगामी सफलता।', careerFieldsHi: 'आईटी, इनोवेशन, जनसेवा' },
  46: { titleHi: 'राजकोष (The Royal Treasury)', nature: 'highly_auspicious', meaningHi: 'अकूत धन, स्थायी ऐश्वर्य, समाज में निर्विवाद प्रतिष्ठा और सम्मान।', careerFieldsHi: 'उद्योगपति, बैंकिंग, लक्जरी ब्रांड्स' }
};

// Reduce a number to single digit (1 to 9)
export function reduceToSingleDigit(num: number): number {
  let sum = Math.abs(num);
  while (sum > 9) {
    sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return sum === 0 ? 9 : sum;
}

// Calculate Moolank (Root) from Date of Birth day
export function calculateMoolank(dobString?: string): number {
  if (!dobString) return 1;
  try {
    const parts = dobString.split('-');
    if (parts.length >= 3) {
      const day = parseInt(parts[2], 10);
      return reduceToSingleDigit(day);
    }
  } catch (e) {
    console.warn('Invalid DOB:', e);
  }
  return 1;
}

// Calculate Bhagyank (Destiny Number) from full Date of Birth
export function calculateBhagyank(dobString?: string): number {
  if (!dobString) return 1;
  try {
    const digitsOnly = dobString.replace(/\D/g, '');
    const total = digitsOnly.split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
    return reduceToSingleDigit(total);
  } catch (e) {
    console.warn('Invalid DOB for Bhagyank:', e);
  }
  return 1;
}

// ==========================================
// 1. MOBILE NUMBER NUMEROLOGY ANALYSIS
// ==========================================
export interface DigitPositionInfo {
  position: number; // 1 to 10
  posCode: string; // 'D1' to 'D10'
  digit: number;
  labelHi: string;
  labelEn: string;
  significanceHi: string;
  impactHi: string;
  rulingPlanet: typeof PLANET_RULERS[number];
  isAuspicious: boolean;
}

export interface SpecialPairInfo {
  pair: string;
  titleHi: string;
  descHi: string;
  category: 'auspicious' | 'dosha' | 'neutral';
  remedyHi?: string;
}

export interface Last4DigitsAnalysis {
  rawDigits: string;
  compoundTotal: number;
  singleRoot: number;
  planetInfo: typeof PLANET_RULERS[number];
  positions: DigitPositionInfo[]; // D7, D8, D9, D10
  verdictHi: string;
  quickAdviceHi: string;
}

export const DIGIT_POSITION_META: Record<number, {
  posCode: string;
  labelHi: string;
  labelEn: string;
  significanceHi: string;
}> = {
  1: { posCode: 'D1', labelHi: 'स्वयं व दृष्टिकोण (Self)', labelEn: 'Self & Persona', significanceHi: 'व्यक्ति स्वयं, आत्मबल, प्रारंभिक ऊर्जा व मानसिक दृष्टिकोण' },
  2: { posCode: 'D2', labelHi: 'निर्णय क्षमता (Decision Making)', labelEn: 'Decision Making', significanceHi: 'निर्णय लेने की स्पष्टता, योजना निर्माण व विचार शक्ति' },
  3: { posCode: 'D3', labelHi: 'करियर व नींव (Career)', labelEn: 'Career Foundation', significanceHi: 'आजीविका, मुख्य कर्मक्षेत्र का चुनाव व व्यवसाय की मजबूती' },
  4: { posCode: 'D4', labelHi: 'करियर मार्ग (Career Way)', labelEn: 'Career Growth Path', significanceHi: 'उन्नति की दिशा, विकास का माध्यम, कार्यशैली व प्रगति की गति' },
  5: { posCode: 'D5', labelHi: 'संतान व सृजन (Children & Creativity)', labelEn: 'Children & Creativity', significanceHi: 'संतान सुख, रचनात्मकता, नवाचार व पारिवारिक वंश वृद्धि' },
  6: { posCode: 'D6', labelHi: 'पारिवारिक संबंध (Family Relationship)', labelEn: 'Family Relationship', significanceHi: 'पारिवारिक संबंध, आपसी प्रेम, घर का माहौल व गृहस्थ सुख' },
  7: { posCode: 'D7', labelHi: 'विवाह व दांपत्य (Marriage & Spouse)', labelEn: 'Marriage & Partnership', significanceHi: 'विवाह, वैवाहिक सुख, जीवनसाथी के साथ तालमेल व साझेदारी' },
  8: { posCode: 'D8', labelHi: 'स्वास्थ्य व जीवन ऊर्जा (Health)', labelEn: 'Health & Vitality', significanceHi: 'शारीरिक ऊर्जा, स्वास्थ्य, रोग प्रतिरोधक क्षमता व संतुलन' },
  9: { posCode: 'D9', labelHi: 'सामाजिक संबंध व साख (Public Relationship)', labelEn: 'Public Reputation', significanceHi: 'सामाजिक संबंध, जनसंपर्क, लोक-प्रतिष्ठा, साख व नेटवर्क' },
  10: { posCode: 'D10', labelHi: 'धन संचय व बरकत (Wealth)', labelEn: 'Wealth Accumulation', significanceHi: 'धन संचय, बचत, वित्तीय लाभ, बैंक बैलेंस व निरंतर बरकत' }
};

export const SPECIAL_MOBILE_PAIRS: Record<string, {
  titleHi: string;
  descHi: string;
  category: 'auspicious' | 'dosha' | 'neutral';
  remedyHi?: string;
}> = {
  '13': {
    titleHi: 'स्व-निर्मित सफलता योग (Self-Made Sun + Guru)',
    descHi: 'सूर्य (१) और देवगुरु बृहस्पति (३) का अति पावन ज्ञान व सम्मान योग। जातक अपने बाहुबल, आत्म-सम्मान और स्वयं के दम पर समाज में शिखर तक पहुंचता है। किसी की दया या अनुकंपा पर निर्भर नहीं रहता।',
    category: 'auspicious'
  },
  '31': {
    titleHi: 'स्व-निर्मित प्रतिष्ठा योग (Self-Made Guru + Sun)',
    descHi: 'बृहस्पति (३) और सूर्य (१) का युगल संयोग। उच्च सामाजिक पद, प्रशासनिक मान-सम्मान एवं नेतृत्व क्षमता प्रदान करता है। स्वतंत्र व्यवसाय में अत्यधिक तरक्की देता है।',
    category: 'auspicious'
  },
  '14': {
    titleHi: 'ऋण व अचानक मानसिक तनाव (Sun + Rahu Loan Tension)',
    descHi: 'सूर्य (१) और राहु (४) का ग्रहण टकराव। बिना सोचे-समझे लोन/कर्ज लेने की विवशता, अप्रत्याशित वित्तीय झटके, मानसिक तनाव एवं सरकारी या अदालती कार्यों में रुकावट का जोखिम बनाता है।',
    category: 'dosha',
    remedyHi: 'फोन कवर में हरे रंग पर सुनहरा अंक ५ रखें एवं रविवार को सूर्यदेव को तांबे के लोटे से जल अर्पित करें।'
  },
  '41': {
    titleHi: 'अप्रत्याशित कर्ज व दबाव (Rahu + Sun Sudden Stress)',
    descHi: 'राहु (४) और सूर्य (१) का संघर्ष। सरकारी तंत्र से उलझन, अचानक खर्चे, व्यापार में अनिश्चितता और पिता या उच्चाधिकारियों के साथ तनाव की स्थिति पैदा करता है।',
    category: 'dosha',
    remedyHi: 'प्रतिदिन आदित्य हृदय स्तोत्र अथवा गायत्री महामंत्र का ३ या ११ बार पाठ करें।'
  },
  '17': {
    titleHi: 'दांपत्य भ्रम व गुप्त भटकाव (Sun + Ketu Marital Tension)',
    descHi: 'सूर्य (१) और केतु (७) का अलगावकारी योग। दांपत्य जीवन में गलतफहमियां, असंतोष, जीवनसाथी के प्रति उदासीनता अथवा विवाहेतर (Extra-marital) आकर्षण की ओर मानसिक झुकाव, जिससे गृहस्थ शांति भंग होती है।',
    category: 'dosha',
    remedyHi: 'अपने बेडरूम और फोन वॉलपेपर में भगवान शिव-पार्वती की सौम्य तस्वीर लगाएं और शुक्रवार को खीर का दान करें।'
  },
  '71': {
    titleHi: 'वैवाहिक असंतोष व वैराग्य (Ketu + Sun Detachment)',
    descHi: 'केतु (७) और सूर्य (१) का प्रभाव। जीवनसाथी से भावनात्मक दूरी, गुप्त चिंताएं, वैवाहिक संबंधों में संदेह तथा सामाजिक छवि को ठेस पहुंचने की संभावना।',
    category: 'dosha',
    remedyHi: 'गणेश अथर्वशीर्ष का पाठ करें एवं बुधवार को दूर्वा भगवान गणेश को अर्पित करें।'
  },
  '18': {
    titleHi: 'अपयश व बदनामी योग (Sun + Shani Defamation Impact)',
    descHi: 'सूर्य (१) और शनि (८) का घोर वैचारिक टकराव। पिता-पुत्र मतभेद, कार्यों में अत्यधिक विलंब, समाज में नाम खराब होने (Defamation/बदनामी) का खतरा और कठोर परिश्रम का भी उचित यश न मिलना।',
    category: 'dosha',
    remedyHi: 'शनिवार को पीपल के वृक्ष के नीचे सरसों तेल का दीपक जलाएं और किसी का अहित न करें।'
  },
  '81': {
    titleHi: 'कड़ा संघर्ष व नाम पर आंच (Shani + Sun Conflict & Struggle)',
    descHi: 'शनि (८) और सूर्य (१) की शत्रुता। उच्चाधिकारियों व कानून से परेशानी, सामाजिक सम्मान में कमी, कार्यों में बेवजह अड़चनें और प्रतिष्ठा को नुकसान पहुंचने की आशंका।',
    category: 'dosha',
    remedyHi: 'हनुमान चालीसा व सुंदरकांड का निरंतर पाठ करें एवं नीले वस्त्रों का कम से कम उपयोग करें।'
  },
  '15': {
    titleHi: 'बुधादित्य महायोग (Sun + Mercury Budhaditya)',
    descHi: 'सूर्य (१) और बुध (५) का उत्कृष्ट योग। असाधारण व्यापारिक बुद्धि, तार्किक वाणी, नेतृत्व और त्वरित धन लाभ।',
    category: 'auspicious'
  },
  '51': {
    titleHi: 'बुधादित्य समृद्धि योग (Mercury + Sun)',
    descHi: 'व्यापारिक चातुर्य, ब्रांड वैल्यू और सामाजिक प्रतिष्ठा में अप्रत्याशित वृद्धि।',
    category: 'auspicious'
  },
  '56': {
    titleHi: 'महालक्ष्मी नारायण योग (Mercury + Venus Laxmi)',
    descHi: 'बुध (५) और शुक्र (६) का दुर्लभ धनदायक योग। विपुल ऐश्वर्य, व्यापारिक विस्तार, आकर्षण और वित्तीय स्थिरता।',
    category: 'auspicious'
  },
  '65': {
    titleHi: 'महालक्ष्मी योग (Venus + Mercury Luxury & Wealth)',
    descHi: 'भौतिक सुख-सुविधाएं, आकर्षक व्यक्तित्व, धन आगमन और विलासिता का सतत आनंद।',
    category: 'auspicious'
  },
  '24': {
    titleHi: 'ग्रहण दोष (Moon + Rahu Anxiety)',
    descHi: 'चंद्रमा (२) और राहु (४) का ग्रहण। अत्यधिक ओवरथिंकिंग, अनिद्रा, व्यर्थ का भय और मानसिक अशांति।',
    category: 'dosha',
    remedyHi: 'प्रतिदिन ॐ नमः शिवाय का १०८ बार जप करें एवं चांदी का छल्ला धारण करें।'
  },
  '42': {
    titleHi: 'मानसिक भ्रम दोष (Rahu + Moon Illusion)',
    descHi: 'निर्णय लेने में अत्यधिक असमंजस, भावनात्मक चोट और गलत फैसलों से धन हानि।',
    category: 'dosha',
    remedyHi: 'सोमवार को भगवान शिव को कच्चा दूध और जल अर्पित करें।'
  },
  '28': {
    titleHi: 'विष योग (Moon + Saturn Vish Yog)',
    descHi: 'चंद्रमा (२) और शनि (८) का विष योग। मन में अचानक उदासी, निराशा, वैवाहिक देरी और कार्य में रुकावटें।',
    category: 'dosha',
    remedyHi: 'प्रतिदिन महामृत्युंजय मंत्र का पाठ करें और काले तिल जल में प्रवाहित करें।'
  },
  '82': {
    titleHi: 'विष योग प्रभाव (Saturn + Moon Depression Tendency)',
    descHi: 'मानसिक भारीपन, एकाकीपन और भावनात्मक उतार-चढ़ाव।',
    category: 'dosha',
    remedyHi: 'शिव चालीसा का पाठ करें और माता के चरण स्पर्श कर आशीर्वाद लें।'
  },
  '35': {
    titleHi: 'महा-वाणिज्य योग (Jupiter + Mercury High Wealth)',
    descHi: 'गुरु और बुध का संयोजन। वित्तीय परामर्श, स्टॉक मार्केट, शिक्षण एवं व्यापार में प्रचंड धन लाभ।',
    category: 'auspicious'
  },
  '53': {
    titleHi: 'सरस्वती-व्यापार योग (Mercury + Jupiter Advisory Wealth)',
    descHi: 'वाकसिद्धि, प्रामाणिक सलाह, सम्मान एवं प्रचुर आर्थिक समृद्धि।',
    category: 'auspicious'
  },
  '89': {
    titleHi: 'अंगारक उग्रता (Saturn + Mars Accident/Anger)',
    descHi: 'शनि और मंगल का टकराव। अत्यधिक गुस्सा, उतावलापन और चोट-चपेट की संभावना।',
    category: 'dosha',
    remedyHi: 'वाहन सावधानी से चलाएं और मंगलवार को हनुमान जी को सिंदूर अर्पित करें।'
  },
  '98': {
    titleHi: 'अंगारक योग प्रभाव (Mars + Saturn Aggression)',
    descHi: 'जल्दबाजी में लिए गए निर्णय से नुकसान और रक्त या अग्नि से संबंधित सावधानी।',
    category: 'dosha',
    remedyHi: 'मंगलवार को लाल मसूर की दाल का दान करें।'
  }
};

export interface MobileAnalysisResult {
  rawNumber: string;
  cleanDigits: string;
  isValid: boolean;
  compoundTotal: number;
  singleRoot: number;
  planetInfo: typeof PLANET_RULERS[number];
  userMoolank: number;
  userBhagyank: number;
  compatibilityWithMoolank: 'friendly' | 'neutral' | 'anti';
  compatibilityScorePercent: number;
  verdictTitleHi: string;
  verdictLevel: 'excellent' | 'good' | 'average' | 'challenging';
  digitCounts: Record<number, number>;
  presentDigits: number[];
  missingDigits: number[];
  digitPositions: DigitPositionInfo[];
  specialPairsFound: SpecialPairInfo[];
  doshasFound: { titleHi: string; descHi: string; severity: 'high' | 'medium' | 'low' }[];
  positiveYogasFound: { titleHi: string; descHi: string }[];
  businessFitnessHi: string;
  practicalRemedies: {
    wallpaperSuggestion: string;
    goldenInkNumber: string;
    bestRechargeDay: string;
    mantraToChant: string;
    actionableAdvice: string;
  };
}

export function getDigitPositionImpact(posIndex: number, digit: number): { impactHi: string; isAuspicious: boolean } {
  const planet = PLANET_RULERS[digit] || PLANET_RULERS[1];
  
  if (digit === 0) {
    return {
      impactHi: 'शून्य (0) ऊर्जा को निष्प्रभावी व न्यूट्रलाइज करता है। इस क्षेत्र में निरंतर आध्यात्मिक अनुशासन की आवश्यकता रहती है।',
      isAuspicious: false
    };
  }

  switch (posIndex) {
    case 1: // D1: Self
      return digit === 1 || digit === 3 || digit === 9
        ? { impactHi: `${planet.planetHi} का प्रभाव: प्रचंड आत्मबल, स्वतंत्र नेतृत्व और स्वाभिमान।`, isAuspicious: true }
        : digit === 4 || digit === 8
        ? { impactHi: `${planet.planetHi} का प्रभाव: गहन संघर्ष और लीक से हटकर सोचने का स्वभाव।`, isAuspicious: false }
        : { impactHi: `${planet.planetHi} का प्रभाव: संतुलित, सौम्य और मिलनसार व्यक्तित्व।`, isAuspicious: true };

    case 2: // D2: Decision Making
      return digit === 3 || digit === 5 || digit === 1
        ? { impactHi: `${planet.planetHi} का प्रभाव: सटीक, व्यावहारिक और दूरदर्शी निर्णय क्षमता।`, isAuspicious: true }
        : digit === 2 || digit === 4
        ? { impactHi: `${planet.planetHi} का प्रभाव: निर्णयों में उतार-चढ़ाव अथवा अत्यधिक सोचने की प्रवृत्ति।`, isAuspicious: false }
        : { impactHi: `${planet.planetHi} का प्रभाव: सोच-समझकर और अनुभवी दृष्टिकोण से निर्णय।`, isAuspicious: true };

    case 3: // D3: Career
      return digit === 1 || digit === 3 || digit === 5 || digit === 6
        ? { impactHi: `${planet.planetHi} का प्रभाव: करियर में स्थायित्व, तेजी से पदोन्नति एवं मान-सम्मान।`, isAuspicious: true }
        : digit === 8
        ? { impactHi: `${planet.planetHi} का प्रभाव: करियर में विलंब के बाद सुदृढ़ व स्थायी सफलता।`, isAuspicious: true }
        : { impactHi: `${planet.planetHi} का प्रभाव: विशिष्ट शोध अथवा रचनात्मक क्षेत्र में प्रगति।`, isAuspicious: true };

    case 4: // D4: Career Way
      return digit === 5 || digit === 3 || digit === 9
        ? { impactHi: `${planet.planetHi} का प्रभाव: व्यापार, बहु-आयामी विकास और निरंतर उन्नति का खुला मार्ग।`, isAuspicious: true }
        : digit === 4
        ? { impactHi: `${planet.planetHi} का प्रभाव: आईटी, तकनीकी अथवा अप्रत्याशित परिवर्तनों भरा मार्ग।`, isAuspicious: true }
        : { impactHi: `${planet.planetHi} का प्रभाव: कार्यशैली में अनुशासन व व्यवस्थित प्रगति।`, isAuspicious: true };

    case 5: // D5: Children & Creativity
      return digit === 3 || digit === 5 || digit === 6 || digit === 2
        ? { impactHi: `${planet.planetHi} का प्रभाव: संतान से सुख, मेधावी बुद्धि एवं उच्च सृजनात्मकता।`, isAuspicious: true }
        : digit === 7 || digit === 8
        ? { impactHi: `${planet.planetHi} का प्रभाव: संतान संबंधी कार्यों में थोड़ी चिंता अथवा गहन चिंतन।`, isAuspicious: false }
        : { impactHi: `${planet.planetHi} का प्रभाव: संतान की ओर से मान-सम्मान व सहयोग।`, isAuspicious: true };

    case 6: // D6: Family Relationship
      return digit === 6 || digit === 2 || digit === 3
        ? { impactHi: `${planet.planetHi} का प्रभाव: घर में सुख-शांति, पारिवारिक सदस्यों में प्रगाढ़ प्रेम।`, isAuspicious: true }
        : digit === 1 || digit === 9 || digit === 8
        ? { impactHi: `${planet.planetHi} का प्रभाव: अहंकार अथवा क्रोध के कारण घर में वैचारिक मतभेद का योग।`, isAuspicious: false }
        : { impactHi: `${planet.planetHi} का प्रभाव: सामान्य व व्यावहारिक पारिवारिक वातावरण।`, isAuspicious: true };

    case 7: // D7: Marriage & Spouse
      return digit === 6 || digit === 2 || digit === 5
        ? { impactHi: `${planet.planetHi} का प्रभाव: दांपत्य सुख, सुंदर तालमेल व जीवनसाथी का अटूट सहयोग।`, isAuspicious: true }
        : digit === 1 || digit === 7 || digit === 8 || digit === 4
        ? { impactHi: `${planet.planetHi} का प्रभाव: दांपत्य जीवन में गलतफहमियां, अलगावकारी विचार या जीवनसाथी के स्वास्थ्य की चिंता।`, isAuspicious: false }
        : { impactHi: `${planet.planetHi} का प्रभाव: मर्यादित व धर्मनिष्ठ वैवाहिक जीवन।`, isAuspicious: true };

    case 8: // D8: Health
      return digit === 1 || digit === 3 || digit === 9
        ? { impactHi: `${planet.planetHi} का प्रभाव: सुदृढ़ शारीरिक बल, उत्तम रोग प्रतिरोधक क्षमता।`, isAuspicious: true }
        : digit === 4 || digit === 8 || digit === 2
        ? { impactHi: `${planet.planetHi} का प्रभाव: मौसम परिवर्तन, वायु/कफ जनित अथवा मानसिक तनाव का ध्यान रखें।`, isAuspicious: false }
        : { impactHi: `${planet.planetHi} का प्रभाव: औसत स्वास्थ्य, नियमित दिनचर्या आवश्यक।`, isAuspicious: true };

    case 9: // D9: Public Relationship
      return digit === 1 || digit === 5 || digit === 6 || digit === 3
        ? { impactHi: `${planet.planetHi} का प्रभाव: उत्कृष्ट सामाजिक नेटवर्क, समाज में साख, जनता का विश्वास।`, isAuspicious: true }
        : digit === 7 || digit === 8
        ? { impactHi: `${planet.planetHi} का प्रभाव: सीमित सामाजिक दायरा, लोग देर से समझ पाते हैं।`, isAuspicious: false }
        : { impactHi: `${planet.planetHi} का प्रभाव: समाज में सक्रिय उपस्थिति व संपर्क।`, isAuspicious: true };

    case 10: // D10: Wealth
      return digit === 5 || digit === 6 || digit === 1 || digit === 3
        ? { impactHi: `${planet.planetHi} का प्रभाव: धन संचय में अत्यंत शुभ, बैंक बैलेंस में वृद्धि, बरकत का वास।`, isAuspicious: true }
        : digit === 8
        ? { impactHi: `${planet.planetHi} का प्रभाव: भूमि-भवन व संपत्ति से दीर्घकालिक भारी धन लाभ।`, isAuspicious: true }
        : digit === 0 || digit === 4
        ? { impactHi: `${planet.planetHi} का प्रभाव: धन का अपव्यय, अचानक खर्चों पर नियंत्रण की आवश्यकता।`, isAuspicious: false }
        : { impactHi: `${planet.planetHi} का प्रभाव: नियमित व संतोषजनक आर्थिक स्थिति।`, isAuspicious: true };

    default:
      return { impactHi: `${planet.planetHi} का सामान्य प्रभाव।`, isAuspicious: true };
  }
}

// Fast Free Last 4 Digits Analysis (D7 to D10)
export function analyzeLast4Digits(mobileInput: string): Last4DigitsAnalysis {
  const cleanDigits = mobileInput.replace(/\D/g, '');
  const last4 = cleanDigits.slice(-4).padStart(4, '0');
  
  const compoundTotal = last4.split('').reduce((sum, d) => sum + parseInt(d, 10), 0);
  const singleRoot = reduceToSingleDigit(compoundTotal);
  const planetInfo = PLANET_RULERS[singleRoot] || PLANET_RULERS[1];

  // Positions D7, D8, D9, D10
  const positions: DigitPositionInfo[] = last4.split('').map((dStr, idx) => {
    const posNum = 7 + idx; // 7, 8, 9, 10
    const digit = parseInt(dStr, 10);
    const meta = DIGIT_POSITION_META[posNum];
    const planet = PLANET_RULERS[digit] || PLANET_RULERS[1];
    const { impactHi, isAuspicious } = getDigitPositionImpact(posNum, digit);

    return {
      position: posNum,
      posCode: meta.posCode,
      digit,
      labelHi: meta.labelHi,
      labelEn: meta.labelEn,
      significanceHi: meta.significanceHi,
      impactHi,
      rulingPlanet: planet,
      isAuspicious
    };
  });

  let verdictHi = 'संतुलित अंतिम ऊर्जा';
  if (singleRoot === 5 || singleRoot === 6) {
    verdictHi = '✨ व्यापार व महालक्ष्मी आकर्षण ऊर्जा (अत्यंत शुभ अंतिम ४ अंक)';
  } else if (singleRoot === 1 || singleRoot === 3) {
    verdictHi = '👑 मान-सम्मान व सत्ता आकर्षण ऊर्जा (शुभ अंतिम ४ अंक)';
  } else if (singleRoot === 4 || singleRoot === 8) {
    verdictHi = '⚠️ संघर्ष व अप्रत्याशित खर्चे (शास्त्रोक्त उपाय आवश्यक)';
  }

  const quickAdviceHi = singleRoot === 5 || singleRoot === 6
    ? 'आपके नंबर के अंतिम ४ अंक धन आगमन और वित्तीय संपर्कों के लिए अत्यंत अनुकूल हैं।'
    : singleRoot === 1 || singleRoot === 3
    ? 'अंतिम अंक स्वाभिमान और सामाजिक नेतृत्व को मजबूती देते हैं।'
    : 'अंतिम अंकों में कुछ उग्र ऊर्जा है, सम्पूर्ण १० अंकों का विस्तृत विश्लेषण देखकर उचित वैदिक उपाय करें।';

  return {
    rawDigits: last4,
    compoundTotal,
    singleRoot,
    planetInfo,
    positions,
    verdictHi,
    quickAdviceHi
  };
}

export function analyzeMobileNumber(mobileInput: string, userDob?: string): MobileAnalysisResult {
  const cleanDigits = mobileInput.replace(/\D/g, '');
  const isValid = cleanDigits.length >= 10;
  
  // Use last 10 digits if country code is attached
  const target10 = cleanDigits.slice(-10);

  // Compound total of 10 digits
  const compoundTotal = target10.split('').reduce((sum, d) => sum + parseInt(d, 10), 0) || 50;
  const singleRoot = reduceToSingleDigit(compoundTotal);
  const planetInfo = PLANET_RULERS[singleRoot] || PLANET_RULERS[1];

  const userMoolank = calculateMoolank(userDob);
  const userBhagyank = calculateBhagyank(userDob);

  // Check relationship with user's Moolank
  const moolankRelations = NUMBER_RELATIONS[userMoolank] || NUMBER_RELATIONS[1];
  let compatibilityWithMoolank: 'friendly' | 'neutral' | 'anti' = 'neutral';

  if (moolankRelations.friends.includes(singleRoot)) {
    compatibilityWithMoolank = 'friendly';
  } else if (moolankRelations.enemies.includes(singleRoot)) {
    compatibilityWithMoolank = 'anti';
  } else {
    compatibilityWithMoolank = 'neutral';
  }

  // Count digits frequency
  const digitCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  target10.split('').forEach((d) => {
    const val = parseInt(d, 10);
    if (val >= 1 && val <= 9) digitCounts[val]++;
  });

  const presentDigits = Object.keys(digitCounts).map(Number).filter(n => digitCounts[n] > 0);
  const missingDigits = Object.keys(digitCounts).map(Number).filter(n => digitCounts[n] === 0);

  // Check Shastric Doshas in Mobile Number
  const doshasFound: { titleHi: string; descHi: string; severity: 'high' | 'medium' | 'low' }[] = [];

  // Check 4 and 8 clash (Rahu + Saturn)
  if (target10.includes('48') || target10.includes('84') || (digitCounts[4] > 0 && digitCounts[8] > 0)) {
    doshasFound.push({
      titleHi: 'राहु-शनि संघर्ष संयोग (४ और ८ की उपस्थिति)',
      descHi: 'अंक ४ (राहु) और अंक ८ (शनि) का एक साथ होना कार्यों में अचानक देरी, कोर्ट केस और अप्रत्याशित संघर्ष लाता है।',
      severity: target10.includes('48') || target10.includes('84') ? 'high' : 'medium'
    });
  }

  // Check 1 and 8 clash (Sun + Saturn)
  if (target10.includes('18') || target10.includes('81') || (digitCounts[1] > 0 && digitCounts[8] > 0)) {
    doshasFound.push({
      titleHi: 'सूर्य-शनि वैचारिक टकराव (१ और ८ की उपस्थिति)',
      descHi: 'अंक १ (सूर्य) और अंक ८ (शनि) पिता-पुत्र होते हुए भी शत्रु हैं। इससे अधिकारियों व पिता से मतभेद और मान-सम्मान में बाधा आती है।',
      severity: target10.includes('18') || target10.includes('81') ? 'high' : 'low'
    });
  }

  // Check 2 and 8 clash (Moon + Saturn - Vish Yog)
  if (target10.includes('28') || target10.includes('82')) {
    doshasFound.push({
      titleHi: 'विष योग संयोग (२ और ८ का निकट संयोग)',
      descHi: 'चंद्रमा और शनि का संयोग मानसिक अशांति, अनिद्रा, भावनात्मक चोट और निराशा देता है।',
      severity: 'high'
    });
  }

  // Check multiple consecutive zeros at the end
  if (/000$/.test(target10)) {
    doshasFound.push({
      titleHi: 'त्रिक शून्य दोष (अंतिम ३ अंक शून्य)',
      descHi: 'नंबर के अंत में लगातार शून्य होना अर्जित धन व ऊर्जा के क्षय का सूचक है।',
      severity: 'medium'
    });
  }

  // Check Positive Vedic Yogas
  const positiveYogasFound: { titleHi: string; descHi: string }[] = [];

  // 3-5-6 Guru-Budh-Shukra (Laxmi Saraswati Rajyog)
  if (digitCounts[3] > 0 && digitCounts[5] > 0 && digitCounts[6] > 0) {
    positiveYogasFound.push({
      titleHi: 'लक्ष्मी-सरस्वती महायोग (३, ५ और ६ तीनों उपस्थित)',
      descHi: 'गुरु की बुद्धि, बुध का व्यापार और शुक्र का ऐश्वर्य मिलकर व्यक्ति को सर्वत्र पूज्य और समृद्ध बनाते हैं।'
    });
  }

  // 1 and 5 (Sun + Mercury - Budhaditya Yog)
  if (digitCounts[1] > 0 && digitCounts[5] > 0) {
    positiveYogasFound.push({
      titleHi: 'बुधादित्य प्रभाव (१ और ५ का संतुलन)',
      descHi: 'व्यापारिक चातुर्य, स्पष्ट वाणी और सामाजिक नेतृत्व में अद्वितीय प्रतिष्ठा मिलती है।'
    });
  }

  // Ending with 5 or 6
  if (target10.endsWith('5') || target10.endsWith('6')) {
    positiveYogasFound.push({
      titleHi: 'शुभ अंत (बुध/शुक्र का प्रभाव)',
      descHi: 'फोन का अंतिम अंक ५ या ६ होना व्यापारिक वार्ता और वित्तीय संपर्कों के लिए अत्यंत फलदायी है।'
    });
  }

  // Calculate 10-Digit Positional Breakdown (D1 to D10)
  const digitPositions: DigitPositionInfo[] = target10.split('').map((dStr, idx) => {
    const posNum = idx + 1; // 1 to 10 (D1 to D10)
    const digit = parseInt(dStr, 10);
    const meta = DIGIT_POSITION_META[posNum];
    const planet = PLANET_RULERS[digit] || PLANET_RULERS[1];
    const { impactHi, isAuspicious } = getDigitPositionImpact(posNum, digit);

    return {
      position: posNum,
      posCode: meta.posCode,
      digit,
      labelHi: meta.labelHi,
      labelEn: meta.labelEn,
      significanceHi: meta.significanceHi,
      impactHi,
      rulingPlanet: planet,
      isAuspicious
    };
  });

  // Calculate Special Two-Digit Pairs (13, 31, 14, 41, 17, 71, 18, 81 etc.)
  const specialPairsFound: SpecialPairInfo[] = [];
  const scannedPairs = new Set<string>();

  for (let i = 0; i < target10.length - 1; i++) {
    const pair = target10.slice(i, i + 2);
    if (SPECIAL_MOBILE_PAIRS[pair] && !scannedPairs.has(pair)) {
      scannedPairs.add(pair);
      const pInfo = SPECIAL_MOBILE_PAIRS[pair];
      specialPairsFound.push({
        pair,
        titleHi: pInfo.titleHi,
        descHi: pInfo.descHi,
        category: pInfo.category,
        remedyHi: pInfo.remedyHi
      });
    }
  }

  // Adjust score based on special pairs
  let score = 70;
  specialPairsFound.forEach((p) => {
    if (p.category === 'auspicious') score += 12;
    if (p.category === 'dosha') score -= 14;
  });
  if (compatibilityWithMoolank === 'friendly') score += 18;
  if (compatibilityWithMoolank === 'anti') score -= 25;
  if ([1, 3, 5, 6].includes(singleRoot)) score += 10;
  if ([4, 8].includes(singleRoot)) score -= 15;
  score -= doshasFound.length * 10;
  score += positiveYogasFound.length * 8;
  score = Math.max(25, Math.min(98, score));

  let verdictLevel: 'excellent' | 'good' | 'average' | 'challenging' = 'good';
  let verdictTitleHi = 'शुभ एवं अनुकूल मोबाइल नंबर';

  if (score >= 85) {
    verdictLevel = 'excellent';
    verdictTitleHi = 'अत्यंत प्रभावशाली व भाग्यशाली नंबर (राजयोग कारक)';
  } else if (score >= 68) {
    verdictLevel = 'good';
    verdictTitleHi = 'अनुकूल व शुभ फलदायक नंबर';
  } else if (score >= 50) {
    verdictLevel = 'average';
    verdictTitleHi = 'मध्यम प्रभाव (शास्त्रोक्त उपाय अनुशंसित)';
  } else {
    verdictLevel = 'challenging';
    verdictTitleHi = 'संघर्ष कारक नंबर (तत्काल उपाय अथवा नंबर परिवर्तन उपयोगी)';
  }

  // Business fitness
  const businessFitnessMap: Record<number, string> = {
    1: 'प्रशासन, सरकारी कार्य, लीडरशिप, मैनेजमेंट, राजनेता व स्वतंत्र उद्यमी।',
    2: 'काउंसलिंग, कला, संगीत, जनसंपर्क, जल संबंधित कार्य व लेखन।',
    3: 'शिक्षा, कोचिंग, वकालत, धर्म, ज्योतिष, लेखन व कंसल्टेंसी।',
    4: 'आईटी, सॉफ्टवेयर, इलेक्ट्रॉनिक्स, शोध व मीडिया (सावधानी के साथ)।',
    5: 'व्यापार, शेयर बाजार, बैंकिंग, मार्केटिंग, ई-कॉमर्स व कम्युनिकेशन।',
    6: 'फैशन, इंटीरियर, फिल्म, लग्जरी सामान, कॉस्मेटिक्स व वैवाहिक सेवाएं।',
    7: 'अन्वेषण, गुप्त विद्या, रिसर्च, स्पिरिचुअलिटी व हीलिंग।',
    8: 'रियल एस्टेट, वकालत, माइनिंग, भारी मशीनरी, लोहा व न्याय।',
    9: 'सेना, पुलिस, खेलकूद, सर्जन, कंस्ट्रक्शन व सुरक्षा एजेंसी।'
  };

  // Remedies
  const practicalRemedies = {
    wallpaperSuggestion: singleRoot === 1 || singleRoot === 9
      ? 'फोन के वॉलपेपर पर उगते हुए सूर्य या श्रीराम/हनुमान जी की सुनहरी छवि लगाएं।'
      : singleRoot === 5 || singleRoot === 6
      ? 'फोन के वॉलपेपर पर हरे रंग का श्रीयंत्र या माता महालक्ष्मी की दिव्य मुद्रा लगाएं।'
      : singleRoot === 3
      ? 'पीले रंग की पृष्ठभूमि पर पवित्र ॐ (Om) का वॉलपेपर रखें।'
      : 'भगवान शिव अथवा महामृत्युंजय यंत्र का शांत वॉलपेपर लगाएं।',
    goldenInkNumber: `एक छोटे चौकोर हरे कागज पर सुनहरी (Golden) स्याही से अंक "${moolankRelations.friends[0] || 5}" लिखकर फोन कवर के पीछे रखें।`,
    bestRechargeDay: planetInfo.luckyDayHi,
    mantraToChant: planetInfo.mantraHi,
    actionableAdvice: compatibilityWithMoolank === 'anti'
      ? `यह नंबर आपके जन्म मूलांक (${userMoolank}) से विरोधी ऊर्जा साझा करता है। यदि नंबर बदलना संभव न हो, तो कवर में मित्र अंक (${moolankRelations.friends[0]}) का कार्ड रखें और मंगलवार/शनिवार को हनुमान चालीसा का पाठ करें।`
      : `यह नंबर आपके मूलांक के साथ अनुकूल तालमेल रखता है। इसे अपने मुख्य व्यावसायिक और बैंकिंग संपर्कों में प्राथमिकता दें।`
  };

  return {
    rawNumber: mobileInput,
    cleanDigits: target10,
    isValid,
    compoundTotal,
    singleRoot,
    planetInfo,
    userMoolank,
    userBhagyank,
    compatibilityWithMoolank,
    compatibilityScorePercent: score,
    verdictTitleHi,
    verdictLevel,
    digitCounts,
    presentDigits,
    missingDigits,
    digitPositions,
    specialPairsFound,
    doshasFound,
    positiveYogasFound,
    businessFitnessHi: businessFitnessMap[singleRoot] || 'सामान्य दैनिक उपयोग हेतु उपयुक्त।',
    practicalRemedies
  };
}

// ==========================================
// 2. NAME NUMEROLOGY & CORRECTION ENGINE
// ==========================================
export interface LetterBreakdown {
  char: string;
  value: number;
}

export interface NameAnalysisResult {
  originalName: string;
  cleanName: string;
  letterBreakdowns: LetterBreakdown[];
  compoundTotal: number;
  singleRoot: number;
  planetInfo: typeof PLANET_RULERS[number];
  compoundMeaning: typeof COMPOUND_NUMBER_DATA[number] | null;
  userMoolank: number;
  userBhagyank: number;
  compatibilityWithMoolank: 'friendly' | 'neutral' | 'anti';
  compatibilityWithBhagyank: 'friendly' | 'neutral' | 'anti';
  isCorrectionRecommended: boolean;
  correctionReasonHi: string;
  spellingCorrectionSuggestions: {
    suggestedSpelling: string;
    newCompoundTotal: number;
    newSingleRoot: number;
    benefitTitleHi: string;
    benefitDescHi: string;
  }[];
  signatureGuidanceHi: string[];
  luckyAttributes: {
    luckyDayHi: string;
    luckyColorHi: string;
    luckyStoneHi: string;
    deityHi: string;
    mantraHi: string;
  };
}

// Target auspicious compound numbers for name correction
const AUSPICIOUS_TARGET_COMPOUNDS = [23, 24, 32, 37, 41, 42, 45, 46, 19, 15];

// Helper: Convert Devanagari Hindi script to standard phonetic Latin for accurate Chaldean calculation
export function transliterateDevanagariToLatin(input: string): string {
  const map: Record<string, string> = {
    'अ': 'A', 'आ': 'AA', 'इ': 'I', 'ई': 'EE', 'उ': 'U', 'ऊ': 'OO', 'ऋ': 'RI', 'ए': 'E', 'ऐ': 'AI', 'ओ': 'O', 'औ': 'AU',
    'क': 'K', 'ख': 'KH', 'ग': 'G', 'घ': 'GH', 'ङ': 'N',
    'च': 'CH', 'छ': 'CH', 'ज': 'J', 'झ': 'JH', 'ञ': 'N',
    'ट': 'T', 'ठ': 'TH', 'ड': 'D', 'ढ': 'DH', 'ण': 'N',
    'त': 'T', 'थ': 'TH', 'द': 'D', 'ध': 'DH', 'न': 'N',
    'प': 'P', 'फ': 'PH', 'ब': 'B', 'भ': 'BH', 'म': 'M',
    'य': 'Y', 'र': 'R', 'ल': 'L', 'व': 'V', 'श': 'SH', 'ष': 'SH', 'स': 'S', 'ह': 'H',
    'क्ष': 'KSH', 'त्र': 'TR', 'ज्ञ': 'GY',
    'ा': 'A', 'ि': 'I', 'ी': 'EE', 'ु': 'U', 'ू': 'OO', 'ृ': 'RI', 'े': 'E', 'ै': 'AI', 'ो': 'O', 'ौ': 'AU',
    'ं': 'M', 'ँ': 'N', 'ः': 'H'
  };

  let result = '';
  for (let i = 0; i < input.length; i++) {
    // Check two-char conjuncts
    const twoChar = input.slice(i, i + 2);
    if (map[twoChar]) {
      result += map[twoChar];
      i++;
      continue;
    }
    const char = input[i];
    result += map[char] || char;
  }
  return result;
}

export function analyzeNameNumerology(nameInput: string, userDob?: string): NameAnalysisResult {
  // Transliterate Devanagari Hindi input to Latin phonetics first so Hindi names work 100% accurately!
  const transliterated = transliterateDevanagariToLatin(nameInput);
  let cleanName = transliterated.trim().toUpperCase().replace(/[^A-Z]/g, '');

  // Fallback if empty
  if (!cleanName) {
    cleanName = 'SADHAK';
  }
  
  // Calculate letter-by-letter value
  const letterBreakdowns: LetterBreakdown[] = cleanName.split('').map((char) => ({
    char,
    value: CHALDEAN_MAP[char] || 0
  }));

  const compoundTotal = letterBreakdowns.reduce((sum, item) => sum + item.value, 0) || 1;
  const singleRoot = reduceToSingleDigit(compoundTotal);
  const planetInfo = PLANET_RULERS[singleRoot] || PLANET_RULERS[1];

  const userMoolank = calculateMoolank(userDob);
  const userBhagyank = calculateBhagyank(userDob);

  // Check relationship with Moolank
  const moolankRelations = NUMBER_RELATIONS[userMoolank] || NUMBER_RELATIONS[1];
  let compatibilityWithMoolank: 'friendly' | 'neutral' | 'anti' = 'neutral';
  if (moolankRelations.friends.includes(singleRoot)) compatibilityWithMoolank = 'friendly';
  else if (moolankRelations.enemies.includes(singleRoot)) compatibilityWithMoolank = 'anti';

  // Check relationship with Bhagyank
  const bhagyankRelations = NUMBER_RELATIONS[userBhagyank] || NUMBER_RELATIONS[1];
  let compatibilityWithBhagyank: 'friendly' | 'neutral' | 'anti' = 'neutral';
  if (bhagyankRelations.friends.includes(singleRoot)) compatibilityWithBhagyank = 'friendly';
  else if (bhagyankRelations.enemies.includes(singleRoot)) compatibilityWithBhagyank = 'anti';

  // Compound meaning lookup
  const compoundMeaning = COMPOUND_NUMBER_DATA[compoundTotal] || null;

  // Determine if correction is recommended
  let isCorrectionRecommended = false;
  let correctionReasonHi = 'वर्तमान नाम शुभ तरंगों पर है। कोई बड़े बदलाव की आवश्यकता नहीं है।';

  if ([16, 18, 22, 26, 28].includes(compoundTotal)) {
    isCorrectionRecommended = true;
    correctionReasonHi = `वर्तमान नाम का संयुक्त अंक (${compoundTotal}) शास्त्र सम्मत रूप से संघर्ष व धोखा कारक माना गया है। इसमें सूक्ष्म संशोधन अनिवार्य है।`;
  } else if (compatibilityWithMoolank === 'anti' || compatibilityWithBhagyank === 'anti') {
    isCorrectionRecommended = true;
    correctionReasonHi = `वर्तमान नाम अंक (${singleRoot}) आपके जन्म मूलांक (${userMoolank}) अथवा भाग्यांक (${userBhagyank}) से शत्रुता रखता है, जिससे प्रतिभा होने पर भी उचित श्रेय नहीं मिलता।`;
  }

  // Generate spelling modification suggestions
  const spellingCorrectionSuggestions: NameAnalysisResult['spellingCorrectionSuggestions'] = [];
  
  // We want to find subtle modifications (e.g. adding 'A', 'E', 'I', 'N', 'R' or repeating a letter)
  // that land exactly on one of the AUSPICIOUS_TARGET_COMPOUNDS
  const lettersToTry = ['A', 'E', 'I', 'N', 'R', 'H', 'S'];

  for (const letter of lettersToTry) {
    const letterVal = CHALDEAN_MAP[letter] || 1;
    const testTotal = compoundTotal + letterVal;
    
    if (AUSPICIOUS_TARGET_COMPOUNDS.includes(testTotal)) {
      const newRoot = reduceToSingleDigit(testTotal);
      const isFriendlyToMoolank = (NUMBER_RELATIONS[userMoolank]?.friends || [1, 5, 6]).includes(newRoot);

      if (isFriendlyToMoolank) {
        // Suggest adding this letter at a sensible phonetic position (e.g. end of first name or middle)
        const parts = nameInput.trim().split(/\s+/);
        let suggestedSpelling = nameInput;
        if (parts.length > 0) {
          parts[0] = parts[0] + letter.toLowerCase();
          suggestedSpelling = parts.join(' ');
        } else {
          suggestedSpelling = nameInput + letter;
        }

        const data = COMPOUND_NUMBER_DATA[testTotal];
        spellingCorrectionSuggestions.push({
          suggestedSpelling,
          newCompoundTotal: testTotal,
          newSingleRoot: newRoot,
          benefitTitleHi: data ? data.titleHi : `अत्यंत शुभ अंक ${testTotal}`,
          benefitDescHi: data ? data.meaningHi : 'यह संयुक्त अंक निरंतर आर्थिक व सामाजिक उन्नति प्रदान करता है।'
        });

        if (spellingCorrectionSuggestions.length >= 3) break;
      }
    }
  }

  // If simple addition didn't find enough, test adding 2 letters or modifying
  if (spellingCorrectionSuggestions.length === 0) {
    // Provide general target recommendations
    const idealCompound = userMoolank === 1 || userMoolank === 9 ? 19 : userMoolank === 5 ? 23 : 24;
    spellingCorrectionSuggestions.push({
      suggestedSpelling: `${nameInput} (अनुशंसित संयुक्त योग: ${idealCompound})`,
      newCompoundTotal: idealCompound,
      newSingleRoot: reduceToSingleDigit(idealCompound),
      benefitTitleHi: COMPOUND_NUMBER_DATA[idealCompound]?.titleHi || 'राजयोग कारक संयुक्त अंक',
      benefitDescHi: 'स्पेलिंग में एक स्वर (जैसे A या E) जोड़कर या हटाकर नाम को इस अंक पर सेट करें।'
    });
  }

  // Signature guidance according to Samudrika & Anka Shastra
  const signatureGuidanceHi = [
    'हस्ताक्षर सदैव नीचे से ऊपर की ओर ४५ अंश (45-degree angle) में उठना चाहिए; यह जीवन में निरंतर उत्थान का प्रतीक है।',
    'हस्ताक्षर का पहला अक्षर हमेशा स्पष्ट और अन्य अक्षरों से बड़ा बनाएं, जो आत्मविश्वास को दर्शाता है।',
    'हस्ताक्षर पूरा करने के बाद कभी भी अपने नाम को बीच से काटने वाली रेखा न खींचें (यह आत्म-विनाशकारी प्रवृत्ति बनाती है)।',
    'हस्ताक्षर के नीचे एक साफ, सीधी और बिना टूटी क्षैतिज रेखा खींचें तथा उसके नीचे एक या दो बिंदु लगाएं।'
  ];

  return {
    originalName: nameInput,
    cleanName,
    letterBreakdowns,
    compoundTotal,
    singleRoot,
    planetInfo,
    compoundMeaning,
    userMoolank,
    userBhagyank,
    compatibilityWithMoolank,
    compatibilityWithBhagyank,
    isCorrectionRecommended,
    correctionReasonHi,
    spellingCorrectionSuggestions,
    signatureGuidanceHi,
    luckyAttributes: {
      luckyDayHi: planetInfo.luckyDayHi,
      luckyColorHi: planetInfo.luckyColorHi,
      luckyStoneHi: planetInfo.luckyStoneHi,
      deityHi: planetInfo.deityHi,
      mantraHi: planetInfo.mantraHi
    }
  };
}

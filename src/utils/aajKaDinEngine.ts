import { UserProfile } from '../types';
import { calculateMoolank, calculateBhagyank } from './ankaJyotishEngine';

export interface AajKaDinInfo {
  dateStr: string;
  dayNameHi: string;
  dayNameEn: string;
  tithiHi: string;
  nakshatraHi: string;
  auspiciousColorNameHi: string;
  auspiciousColorHex: string;
  auspiciousColorDescHi: string;
  luckyNumber: number;
  secondaryLuckyNumber: number;
  luckyTimeHi: string;
  rahuKaalHi: string;
  dishaShoolHi: string;
  dishaShoolRemedyHi: string;
  dailyPredictionHi: string;
  healthPredictionHi: string;
  careerFinanceHi: string;
  spiritualSankalpHi: string;
  todaysMantraHi: string;
  todaysMantraTextHi: string;
  todaysCharityHi: string;
  isPersonalized: boolean;
}

const WEEKDAY_RULES = [
  // 0: Sunday (रविवार)
  {
    nameHi: 'रविवार',
    nameEn: 'Sunday',
    colorNameHi: 'केसरिया व लाल (Saffron & Red)',
    colorHex: '#ea580c',
    colorDescHi: 'सूर्यदेव का प्रिय रंग। आज केसरिया, नारंगी अथवा लाल वस्त्र धारण करने से आत्मबल, मान-सम्मान और तेज में अभूतपूर्व वृद्धि होती है।',
    planetHi: 'सूर्य देव',
    luckyBase: 1,
    luckyTime: 'प्रातः 11:45 से दोपहर 12:35 (अभिजित मुहूर्त)',
    rahuKaal: 'सायं 04:30 से 06:00 तक',
    dishaShool: 'पश्चिम दिशा (West)',
    dishaRemedy: 'यात्रा आवश्यक हो तो घर से घी अथवा पान खाकर निकलें।',
    mantra: 'ॐ सूर्याय नमः',
    mantraText: 'ॐ ह्रीं ह्रीं सूर्याय सहस्रकिरणाय मनोवांछित फलम् देहि देहि स्वाहा॥',
    charity: 'गेहूं, तांबा अथवा गुड़ का दान करें।'
  },
  // 1: Monday (सोमवार)
  {
    nameHi: 'सोमवार',
    nameEn: 'Monday',
    colorNameHi: 'श्वेत व हल्का सिल्वर (White & Silver)',
    colorHex: '#e2e8f0',
    colorDescHi: 'चंद्रदेव व भगवान शिव का प्रिय रंग। श्वेत, क्रीम अथवा हल्के दूधिया रंग के वस्त्र मन को शांत, तनावमुक्त और एकाग्र रखते हैं।',
    planetHi: 'चंद्र देव व महादेव',
    luckyBase: 2,
    luckyTime: 'दोपहर 12:00 से 12:48 (अभिजित मुहूर्त)',
    rahuKaal: 'प्रातः 07:30 से 09:00 तक',
    dishaShool: 'पूर्व दिशा (East)',
    dishaRemedy: 'यात्रा आवश्यक हो तो दर्पण देखकर या दूध पीकर प्रस्थान करें।',
    mantra: 'ॐ नमः शिवाय',
    mantraText: 'ॐ नमः शिवाय शुभं शुभं कुरु कुरु शिवाय नमः ॐ॥',
    charity: 'सफेद चावल, दूध अथवा मिश्री का दान करें।'
  },
  // 2: Tuesday (मंगलवार)
  {
    nameHi: 'मंगलवार',
    nameEn: 'Tuesday',
    colorNameHi: 'लाल व सिंदूरी (Bright Red & Vermilion)',
    colorHex: '#dc2626',
    colorDescHi: 'श्री हनुमान जी व मंगलदेव का प्रिय रंग। लाल वस्त्र पहनने से शरीर में असीम ऊर्जा, पराक्रम, आत्मविश्वास और रक्त संचार उत्तम रहता है।',
    planetHi: 'मंगल देव व श्री हनुमान',
    luckyBase: 9,
    luckyTime: 'प्रातः 11:52 से दोपहर 12:42 (अभिजित मुहूर्त)',
    rahuKaal: 'दोपहर 03:00 से 04:30 तक',
    dishaShool: 'उत्तर दिशा (North)',
    dishaRemedy: 'गुड़ अथवा धनिया खाकर घर से निकलें।',
    mantra: 'ॐ हनुमते नमः',
    mantraText: 'ॐ हं हनुमते रुद्रात्मकाय हुं फट्॥',
    charity: 'मसूर की दाल, लाल वस्त्र अथवा बूंदी के लड्डू का दान करें।'
  },
  // 3: Wednesday (बुधवार)
  {
    nameHi: 'बुधवार',
    nameEn: 'Wednesday',
    colorNameHi: 'हरा व पिस्ता (Emerald Green)',
    colorHex: '#16a34a',
    colorDescHi: 'बुधदेव व श्री गणेश का प्रिय रंग। हरा रंग बुद्धि, व्यापारिक विवेक, वाक्पटुता और तार्किक शक्ति को प्रखर बनाता है।',
    planetHi: 'बुध देव व श्री गणेश',
    luckyBase: 5,
    luckyTime: 'दोपहर 11:55 से 12:45 (अभिजित मुहूर्त)',
    rahuKaal: 'दोपहर 12:00 से 01:30 तक',
    dishaShool: 'उत्तर दिशा (North)',
    dishaRemedy: 'सौंफ खाकर अथवा हरी इलायची मुंह में रखकर यात्रा करें।',
    mantra: 'ॐ गं गणपतये नमः',
    mantraText: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः॥',
    charity: 'हरी मूंग दाल, हरी घास (गौ माता को) अथवा हरी सब्जियां।'
  },
  // 4: Thursday (गुरुवार)
  {
    nameHi: 'गुरुवार',
    nameEn: 'Thursday',
    colorNameHi: 'पीला व स्वर्णिम (Bright Yellow & Gold)',
    colorHex: '#eab308',
    colorDescHi: 'देवगुरु बृहस्पति व भगवान विष्णु का रंग। पीला रंग ज्ञान, सौभाग्य, गुरु कृपा, वैवाहिक सुख और आध्यात्मिक समृद्धि प्रदान करता है।',
    planetHi: 'देवगुरु बृहस्पति व श्री हरि',
    luckyBase: 3,
    luckyTime: 'दोपहर 11:50 से 12:40 (अभिजित मुहूर्त)',
    rahuKaal: 'दोपहर 01:30 से 03:00 तक',
    dishaShool: 'दक्षिण दिशा (South)',
    dishaRemedy: 'दही अथवा पीली सरसों खाकर घर से निकलें।',
    mantra: 'ॐ नमो भगवते वासुदेवाय',
    mantraText: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः॥',
    charity: 'चने की दाल, हल्दी, बेसन के लड्डू अथवा पीले फल।'
  },
  // 5: Friday (शुक्रवार)
  {
    nameHi: 'शुक्रवार',
    nameEn: 'Friday',
    colorNameHi: 'गुलाबी, सफेद व चमकीला (Pink & Shining Silk)',
    colorHex: '#db2777',
    colorDescHi: 'माँ महालक्ष्मी व शुक्रदेव का रंग। गुलाबी अथवा रेशमी चमकीले वस्त्र सौंदर्य, आकर्षण, ऐश्वर्य और दांपत्य प्रेम बढ़ाते हैं।',
    planetHi: 'शुक्र देव व माँ लक्ष्मी',
    luckyBase: 6,
    luckyTime: 'दोपहर 11:54 से 12:44 (अभिजित मुहूर्त)',
    rahuKaal: 'प्रातः 10:30 से दोपहर 12:00 तक',
    dishaShool: 'पश्चिम दिशा (West)',
    dishaRemedy: 'दही या शक्कर खाकर यात्रा का आरंभ करें।',
    mantra: 'ॐ श्रीं ह्रीं क्लीं महालक्ष्म्यै नमः',
    mantraText: 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः॥',
    charity: 'खीर, सफेद वस्त्र, सुगंधित इत्र अथवा चावल का दान।'
  },
  // 6: Saturday (शनिवार)
  {
    nameHi: 'शनिवार',
    nameEn: 'Saturday',
    colorNameHi: 'गहरा नीला व जामुनी (Deep Navy Blue)',
    colorHex: '#1e3a8a',
    colorDescHi: 'न्यायाधीश शनिदेव का प्रिय रंग। गहरा नीला अथवा जामुनी रंग अनुशासन, एकाग्रता और बुरी नजर से सुरक्षा प्रदान करता है।',
    planetHi: 'शनि देव व भैरव बाबा',
    luckyBase: 8,
    luckyTime: 'दोपहर 11:48 से 12:38 (अभिजित मुहूर्त)',
    rahuKaal: 'प्रातः 09:00 से 10:30 तक',
    dishaShool: 'पूर्व दिशा (East)',
    dishaRemedy: 'अदरक अथवा तिल खाकर घर से बाहर जाएं।',
    mantra: 'ॐ शं शनैश्चराय नमः',
    mantraText: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः॥',
    charity: 'काले तिल, सरसों का तेल अथवा उड़द की दाल का दान।'
  }
];

export function getTodayDivineGuidance(userProfile: UserProfile): AajKaDinInfo {
  const now = new Date();
  const dayIndex = now.getDay();
  const rule = WEEKDAY_RULES[dayIndex];
  
  const hasUser = Boolean(userProfile.name && userProfile.name.trim() !== '' && userProfile.name !== 'साधक');
  const hasDob = Boolean(userProfile.dob && userProfile.dob.trim().length > 0);
  const isPersonalized = Boolean(userProfile.isProfileSet && hasUser && hasDob);

  const userMoolank = isPersonalized ? calculateMoolank(userProfile.dob) : 0;
  const userBhagyank = isPersonalized ? calculateBhagyank(userProfile.dob) : 0;
  const greetingPrefix = hasUser ? `श्री ${userProfile.name.trim()} जी, ` : '';

  // Dynamic Lucky Number (Harmony between day planet & user moolank if personalized, else planet luckyBase)
  const luckyNum = isPersonalized 
    ? (((rule.luckyBase + userMoolank - 1) % 9) + 1)
    : rule.luckyBase;
  const secondaryLuckyNum = rule.luckyBase;

  // Formatting date in Indian style
  const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const dateStr = now.toLocaleDateString('hi-IN', dateOptions);

  const dailyPredictionHi = isPersonalized
    ? `${greetingPrefix}आज आपके मूलांक ${userMoolank} व भाग्यांक ${userBhagyank} के साथ ${rule.planetHi} का शुभ संयोग बना हुआ है। आपके सोचे हुए कार्य गति पकड़ेंगे। यदि आप ${rule.colorNameHi.split('(')[0].trim()} रंग के वस्त्र पहनेंगे तो आकर्षण, कार्य सिद्धि और सकारात्मक ऊर्जा में कई गुना वृद्धि होगी।`
    : `आज ${rule.nameHi} को ${rule.planetHi} का प्रभाव है। जन्म विवरण दर्ज करने पर आपकी व्यक्तिगत जन्मपत्रिका व मूलांक अनुसार सटीक दैनिक फलादेश प्रदर्शित होगा। सामान्य रूप से आज के दिन संयम, एकाग्रता और सकारात्मक विचार से किए गए कार्य सफल होंगे।`;

  const healthPredictionHi = isPersonalized
    ? `${greetingPrefix}स्वास्थ्य के दृष्टिकोण से आज ऊर्जा का स्तर उत्तम रहेगा। प्रातः काल सूर्य नमस्कार व प्राणायाम से दिनभर स्फूर्ति और मानसिक शांति बनी रहेगी।`
    : `प्रातः काल ताजी वायु, प्राणायाम व ध्यान से दिनभर स्फूर्ति और मानसिक शांति बनी रहेगी।`;

  const careerFinanceHi = isPersonalized
    ? `आर्थिक पक्ष सुदृढ़ रहेगा। आज किया गया कोई भी नया निवेश अथवा कार्य निर्णय आपके व्यक्तिगत शुभ अंक ${luckyNum} के प्रभाव से लाभ देगा।`
    : `आज के दिन महत्वपूर्ण निर्णयों में विचारशीलता और धैर्य रखें। जन्म विवरण दर्ज करने पर आपके व्यक्तिगत शुभ अंक आधारित आर्थिक परामर्श प्राप्त होगा।`;

  return {
    dateStr,
    dayNameHi: rule.nameHi,
    dayNameEn: rule.nameEn,
    tithiHi: 'शुभ शुक्ल/कृष्ण पक्षीय पावन तिथि',
    nakshatraHi: 'शुभ नक्षत्र युक्त अमृत योग',
    auspiciousColorNameHi: rule.colorNameHi,
    auspiciousColorHex: rule.colorHex,
    auspiciousColorDescHi: rule.colorDescHi,
    luckyNumber: luckyNum,
    secondaryLuckyNumber: secondaryLuckyNum,
    luckyTimeHi: rule.luckyTime,
    rahuKaalHi: rule.rahuKaal,
    dishaShoolHi: rule.dishaShool,
    dishaShoolRemedyHi: rule.dishaRemedy,
    dailyPredictionHi,
    healthPredictionHi,
    careerFinanceHi,
    spiritualSankalpHi: `आज नित्य १०८ बार '${rule.mantra}' का जप करें। इससे नकारात्मक विचारों का शमन और आत्मिक तेज में वृद्धि होगी।`,
    todaysMantraHi: rule.mantra,
    todaysMantraTextHi: rule.mantraText,
    todaysCharityHi: rule.charity,
    isPersonalized
  };
}

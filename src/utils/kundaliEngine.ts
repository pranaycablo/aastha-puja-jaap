export interface PlanetPosition {
  name: string;
  hindiName: string;
  symbol: string;
  signIndex: number; // 0 to 11 (Aries to Pisces)
  signName: string;
  house: number; // 1 to 12
  isRetrograde?: boolean;
}

export interface KundaliAnalysis {
  name: string;
  dob: string;
  birthTime: string;
  birthPlace: string;
  lagnaSign: string;
  lagnaLord: string;
  lagnaNumber: number; // 1 to 12
  moonSign: string;
  moonSignLord: string;
  sunSign: string;
  nakshatra: string;
  charan: number;
  houses: { houseNumber: number; signNumber: number; planets: string[] }[];
  planets: PlanetPosition[];
  doshAnalysis: {
    isManglik: boolean;
    manglikSeverity: string;
    hasKaalSarp: boolean;
    kaalSarpType: string;
    sadeSatiStatus: string;
    favorablePlanet: string;
    challengingPlanet: string;
  };
  remedies: {
    title: string;
    deity: string;
    timing: string;
    vessel: string;
    ingredients: string;
    procedure: string;
    timeframe: string;
    benefits: string;
  }[];
}

const ZODIAC_SIGNS = [
  { num: 1, nameHi: 'मेष (Aries)', lordHi: 'मंगल', element: 'अग्नि' },
  { num: 2, nameHi: 'वृषभ (Taurus)', lordHi: 'शुक्र', element: 'पृथ्वी' },
  { num: 3, nameHi: 'मिथुन (Gemini)', lordHi: 'बुध', element: 'वायु' },
  { num: 4, nameHi: 'कर्क (Cancer)', lordHi: 'चन्द्रमा', element: 'जल' },
  { num: 5, nameHi: 'सिंह (Leo)', lordHi: 'सूर्य', element: 'अग्नि' },
  { num: 6, nameHi: 'कन्या (Virgo)', lordHi: 'बुध', element: 'पृथ्वी' },
  { num: 7, nameHi: 'तुला (Libra)', lordHi: 'शुक्र', element: 'वायु' },
  { num: 8, nameHi: 'वृश्चिक (Scorpio)', lordHi: 'मंगल', element: 'जल' },
  { num: 9, nameHi: 'धनु (Sagittarius)', lordHi: 'बृहस्पति', element: 'अग्नि' },
  { num: 10, nameHi: 'मकर (Capricorn)', lordHi: 'शनि', element: 'पृथ्वी' },
  { num: 11, nameHi: 'कुंभ (Aquarius)', lordHi: 'शनि', element: 'वायु' },
  { num: 12, nameHi: 'मीन (Pisces)', lordHi: 'बृहस्पति', element: 'जल' }
];

const NAKSHATRAS = [
  'अश्विनी', 'भरणी', 'कृत्तिका', 'रोहिणी', 'मृगशिरा', 'आर्द्रा',
  'पुनर्वसु', 'पुष्य', 'अश्लेषा', 'मघा', 'पूर्वाफाल्गुनी', 'उत्तराफाल्गुनी',
  'हस्त', 'चित्रा', 'स्वाती', 'विशाखा', 'अनुराधा', 'ज्येष्ठा',
  'मूल', 'पूर्वाषाढ़ा', 'उत्तराषाढ़ा', 'श्रवण', 'धनिष्ठा', 'शतभिषा',
  'पूर्वाभाद्रपद', 'उत्तराभाद्रपद', 'रेवती'
];

export function generateOfflineKundali(
  name: string,
  dobString: string = new Date().toISOString().split('T')[0],
  timeString: string = '06:00',
  placeString: string = 'वाराणसी (काशी)'
): KundaliAnalysis {
  const parts = dobString.split('-');
  const year = parseInt(parts[0] || '2000', 10);
  const month = parseInt(parts[1] || '1', 10);
  const day = parseInt(parts[2] || '1', 10);

  const timeParts = timeString.split(':');
  const hour = parseInt(timeParts[0] || '6', 10);
  const minute = parseInt(timeParts[1] || '0', 10);

  // Day of year calculation
  const birthDate = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const startOfYear = new Date(Date.UTC(year, 0, 1));
  const dayOfYear = Math.floor((birthDate.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  // Helper: safe positive modulo (handles negative dates before 1970)
  const posMod = (n: number, m: number) => ((n % m) + m) % m;

  // 1. Surya Rashi (Sun Sign) based on solar progression (~30 days per sign)
  // Sankranti baseline: Mesha starts ~April 14 (day 104)
  const sunDegree = posMod(dayOfYear - 104 + 365, 365) * (360 / 365);
  const sunSignIndex = posMod(Math.floor(sunDegree / 30), 12);
  const sunSign = ZODIAC_SIGNS[sunSignIndex] || ZODIAC_SIGNS[0];

  // 2. Lagna (Ascendant): Earth rotates 360 deg in 24 hours (15 deg / hour, 2 hours per sign)
  // At sunrise (~6:00 AM), Lagna = Sun sign
  const hoursSinceSunrise = posMod(hour + minute / 60 - 6 + 24, 24);
  const signsAdvanced = Math.floor(hoursSinceSunrise / 2);
  const lagnaSignIndex = posMod(sunSignIndex + signsAdvanced, 12);
  const lagnaSign = ZODIAC_SIGNS[lagnaSignIndex] || ZODIAC_SIGNS[0];
  const lagnaNumber = lagnaSign.num;

  // 3. Chandra Rashi (Moon Sign) & Nakshatra:
  // Moon advances ~13.2 degrees/day. Sidereal orbit ~27.32 days
  const daysSinceEpoch = Math.floor(birthDate.getTime() / (1000 * 60 * 60 * 24));
  const rawMoonLong = (daysSinceEpoch * 13.17639) + (day * 3.5);
  const moonLongitude = posMod(rawMoonLong, 360);
  const moonSignIndex = posMod(Math.floor(moonLongitude / 30), 12);
  const moonSign = ZODIAC_SIGNS[moonSignIndex] || ZODIAC_SIGNS[0];

  const nakshatraIndex = posMod(Math.floor((moonLongitude / 360) * 27), 27);
  const nakshatra = NAKSHATRAS[nakshatraIndex] || NAKSHATRAS[0];
  const charan = posMod(Math.floor((moonLongitude % (360 / 27)) / (360 / 108)), 4) + 1;

  // 4. Planets Placement in Houses (1 to 12)
  // Offset relative to Lagna: house = ((planetSignIndex - lagnaSignIndex + 12) % 12) + 1
  const calcHouse = (signIdx: number) => posMod(signIdx - lagnaSignIndex, 12) + 1;

  // Mars cycle ~687 days
  const marsSignIndex = posMod(Math.floor((daysSinceEpoch * 0.524) + 2), 12);
  // Mercury stays close to Sun
  const mercurySignIndex = posMod(sunSignIndex + (dayOfYear % 2 === 0 ? 0 : 1), 12);
  // Jupiter cycle ~12 years (1 year per sign)
  const jupiterSignIndex = posMod(year + Math.floor(month / 12), 12);
  // Venus stays within 48 deg of Sun
  const venusSignIndex = posMod(sunSignIndex + ((dayOfYear % 3) - 1 + 12), 12);
  // Saturn cycle ~29.5 years (~2.5 years per sign)
  const saturnSignIndex = posMod(Math.floor(((year - 1900) * 12 + month) / 30), 12);
  // Rahu / Ketu axis (18-year cycle, retrograde)
  const rahuSignIndex = posMod(12 - posMod(Math.floor(daysSinceEpoch / 547), 12), 12);
  const ketuSignIndex = posMod(rahuSignIndex + 6, 12);

  const getSignName = (idx: number) => ZODIAC_SIGNS[idx]?.nameHi || ZODIAC_SIGNS[0].nameHi;

  const planets: PlanetPosition[] = [
    { name: 'Sun', hindiName: 'सूर्य', symbol: 'सू', signIndex: sunSignIndex, signName: sunSign.nameHi, house: calcHouse(sunSignIndex) },
    { name: 'Moon', hindiName: 'चन्द्र', symbol: 'चं', signIndex: moonSignIndex, signName: moonSign.nameHi, house: calcHouse(moonSignIndex) },
    { name: 'Mars', hindiName: 'मंगल', symbol: 'मं', signIndex: marsSignIndex, signName: getSignName(marsSignIndex), house: calcHouse(marsSignIndex) },
    { name: 'Mercury', hindiName: 'बुध', symbol: 'बु', signIndex: mercurySignIndex, signName: getSignName(mercurySignIndex), house: calcHouse(mercurySignIndex) },
    { name: 'Jupiter', hindiName: 'गुरु', symbol: 'गु', signIndex: jupiterSignIndex, signName: getSignName(jupiterSignIndex), house: calcHouse(jupiterSignIndex) },
    { name: 'Venus', hindiName: 'शुक्र', symbol: 'शु', signIndex: venusSignIndex, signName: getSignName(venusSignIndex), house: calcHouse(venusSignIndex) },
    { name: 'Saturn', hindiName: 'शनि', symbol: 'श', signIndex: saturnSignIndex, signName: getSignName(saturnSignIndex), house: calcHouse(saturnSignIndex) },
    { name: 'Rahu', hindiName: 'राहु', symbol: 'रा', signIndex: rahuSignIndex, signName: getSignName(rahuSignIndex), house: calcHouse(rahuSignIndex) },
    { name: 'Ketu', hindiName: 'केतु', symbol: 'के', signIndex: ketuSignIndex, signName: getSignName(ketuSignIndex), house: calcHouse(ketuSignIndex) }
  ];

  // 5. Build 12 Houses with resident planets
  const houses = Array.from({ length: 12 }, (_, i) => {
    const houseNumber = i + 1;
    const signNumber = ((lagnaNumber - 1 + i) % 12) + 1;
    const residentPlanets = planets
      .filter((p) => p.house === houseNumber)
      .map((p) => p.symbol);
    return { houseNumber, signNumber, planets: residentPlanets };
  });

  // 6. Dosh Analysis
  const marsHouse = planets.find((p) => p.name === 'Mars')?.house || 1;
  const isManglik = [1, 4, 7, 8, 12].includes(marsHouse);
  const manglikSeverity = isManglik
    ? marsHouse === 7 || marsHouse === 8
      ? 'पूर्ण मांगलिक (प्रबल)'
      : 'आंशिक मांगलिक (सौम्य)'
    : 'मांगलिक दोष मुक्त (शुभ)';

  const rahuHouse = planets.find((p) => p.name === 'Rahu')?.house || 1;
  const ketuHouse = planets.find((p) => p.name === 'Ketu')?.house || 7;
  const hasKaalSarp = Math.abs(rahuHouse - ketuHouse) === 6 && (rahuHouse === 1 || rahuHouse === 2 || rahuHouse === 4);
  const kaalSarpType = hasKaalSarp ? 'अनंत / शेषनाग कालसर्प प्रभाव' : 'कालसर्प दोष मुक्त';

  const saturnHouse = planets.find((p) => p.name === 'Saturn')?.house || 1;
  const moonH = planets.find((p) => p.name === 'Moon')?.house || 1;
  const diffSatMoon = (saturnHouse - moonH + 12) % 12;
  const sadeSatiStatus =
    diffSatMoon === 11 || diffSatMoon === 0 || diffSatMoon === 1
      ? 'शनि साढ़ेसाती का प्रभाव (सचेत व जप आवश्यक)'
      : diffSatMoon === 3 || diffSatMoon === 9
      ? 'शनि ढैय्या का प्रभाव'
      : 'शनि अनुकूल (साढ़ेसाती मुक्त)';

  // 7. Authentic Shastric Remedies (Ved, Shastra & Lal Kitab)
  const remedies = [
    {
      title: 'भगवान सूर्य को प्रातः पावन अर्घ्य विधान',
      deity: 'भगवान सूर्य नारायण',
      timing: 'प्रातः सूर्योदय वेला से लेकर पूर्वाह्न ११:०० बजे से पहले',
      vessel: 'तांबे का पात्र (अथवा कांच का पात्र - शुक्र-सूर्य योग हेतु / स्टील पात्र - मंगल शांति हेतु)',
      ingredients: 'शुद्ध जल, रोली/लाल चन्दन, अक्षत (अखंड चावल), सुवासित इत्र व लाल पुष्प',
      procedure:
        'अर्घ्य सदा पूर्व दिशा में दोनों हाथों को सिर से ऊपर उठाकर दें ताकि जल की धार से सूर्य की किरणें शरीर पर पड़ें। कांच के पात्र में जल, चन्दन, चावल व इत्र मिलाकर अर्घ्य देने से तेज व दांपत्य शांति मिलती है। स्टील के पात्र में जल व लाल पुष्प से मंगल दोष शांत होता है। तांबे का पात्र सूर्य को सर्वाधिक प्रिय है।',
      timeframe: 'नित्य ४१ दिन निरंतर',
      benefits: 'आत्मविश्वास, तेज, पिता का सुख, सरकारी कार्यों में सफलता, नेत्र व हृदय रोग निवारण।'
    },
    {
      title: 'शनिवार पीपल वृक्ष त्रि-तत्व अर्पण साधना',
      deity: 'न्यायाधीश शनिदेव व पिप्पलाद मुनि',
      timing: 'प्रत्येक शनिवार सूर्योदय के १ घंटे के भीतर अथवा सूर्यास्त के समय',
      vessel: 'लोहे, कांसे अथवा तांबे का लोटा',
      ingredients: 'शुद्ध जल, काले तिल, कच्चा गाय का दूध, गुड़ की डली व सरसों के तेल का दीपक',
      procedure:
        'शनिवार को पीपल की जड़ में काले तिल और कच्चा दूध मिश्रित जल अर्पित करें। ॐ शं शनैश्चराय नमः का १०८ बार जप करें। ७ बार परिक्रमा कर शाम को चौमुखा सरसों के तेल का दीपक जलाएं।',
      timeframe: '७ शनिवार अथवा २१ शनिवार',
      benefits: 'शनि साढ़ेसाती, ढैय्या, दुर्घटना भय, असाध्य रोग, दरिद्रता व कोर्ट-कचहरी बाधा से तत्काल मुक्ति।'
    },
    {
      title: 'चन्द्रमा व मन की स्थिरता हेतु शिव दुग्धाभिषेक',
      deity: 'देवाधिदेव महादेव',
      timing: 'सोमवार प्रातःकाल अथवा प्रदोष काल',
      vessel: 'चांदी अथवा पीतल का पात्र',
      ingredients: 'कच्चा दूध, गंगाजल, सफेद चन्दन, मिश्री व बिल्वपत्र',
      procedure:
        'शिवलिंग पर "ॐ नमः शिवाय" जपते हुए दूध व गंगाजल की पतली धार अर्पित करें। सफेद चन्दन का लेप लगाएं। माता का चरण स्पर्श कर आशीर्वाद लें।',
      timeframe: '११ सोमवार',
      benefits: 'मानसिक तनाव, अनिद्रा, डिप्रेशन, चित्त की चंचलता व माता के कष्टों का शमन।'
    },
    {
      title: 'मंगल व ऋण मुक्ति हेतु सुंदरकांड / हनुमान साधना',
      deity: 'संकटमोचन श्री हनुमान जी',
      timing: 'मंगलवार सायं काल (संध्या वेला)',
      vessel: 'मिट्टी अथवा तांबे का दीपक',
      ingredients: 'चमेली का तेल, सिंदूर, गुड़-चना, तुलसी पत्र व लाल पुष्प',
      procedure:
        'हनुमान जी के सम्मुख चमेली के तेल का सिंदूरी दीपक प्रज्वलित कर हनुमान चालीसा के ७ पाठ अथवा कवन सो काज संपुट चौपाई का १०८ जप करें।',
      timeframe: '२१ मंगलवार',
      benefits: 'भूमि-भवन लाभ, रक्त विकार निवारण, भयंकर कर्ज (ऋण) से मुक्ति व शत्रुओं पर विजय।'
    },
    {
      title: 'गुरु बृहस्पति व भाग्य वृद्धि हेतु पीत पूजन',
      deity: 'देवगुरु बृहस्पति व श्री हरि विष्णु',
      timing: 'गुरुवार प्रातःकाल',
      vessel: 'पीतल का पात्र',
      ingredients: 'चने की दाल, गुड़, हल्दी की गांठ, पीले पुष्प व केले का फल',
      procedure:
        'केले के वृक्ष की जड़ में जल व हल्दी अर्पित करें। माथे पर केसर या हल्दी का तिलक लगाएं। गुरुजनों व संतों का आदर करें।',
      timeframe: '१६ गुरुवार',
      benefits: 'विद्या, उच्च पद, विवाह में आ रही अड़चनों का नाश, ज्ञान व संतान सुख।'
    }
  ];

  return {
    name: name.trim() || 'जातक',
    dob: dobString,
    birthTime: timeString,
    birthPlace: placeString,
    lagnaSign: lagnaSign.nameHi,
    lagnaLord: lagnaSign.lordHi,
    lagnaNumber,
    moonSign: moonSign.nameHi,
    moonSignLord: moonSign.lordHi,
    sunSign: sunSign.nameHi,
    nakshatra,
    charan,
    houses,
    planets,
    doshAnalysis: {
      isManglik,
      manglikSeverity,
      hasKaalSarp,
      kaalSarpType,
      sadeSatiStatus,
      favorablePlanet: 'गुरु (बृहस्पति) व इष्टदेव',
      challengingPlanet: isManglik ? 'मंगल' : 'शनि / राहु'
    },
    remedies
  };
}

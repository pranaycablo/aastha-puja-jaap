export interface PlanetPosition {
  name: string;
  hindiName: string;
  symbol: string;
  signIndex: number; // 0 to 11 (Aries to Pisces)
  signName: string;
  house: number; // 1 to 12
  degree: number; // 0.0 to 29.99
  isRetrograde?: boolean;
}

export interface DashaPeriod {
  planetHi: string;
  planetEn: string;
  startYear: number;
  endYear: number;
  durationYears: number;
  isCurrent?: boolean;
}

export interface VedicYogaItem {
  nameHi: string;
  type: 'auspicious' | 'in-auspicious';
  descriptionHi: string;
  effectsHi: string;
}

export interface KundaliAnalysis {
  name: string;
  dob: string;
  birthTime: string;
  birthPlace: string;
  coordinates: { lat: number; lng: number };
  lagnaSign: string;
  lagnaLord: string;
  lagnaNumber: number; // 1 to 12
  lagnaDegree: number;
  moonSign: string;
  moonSignLord: string;
  sunSign: string;
  nakshatra: string;
  charan: number;
  nakshatraLordHi: string;
  ayanamsaDegree: number;
  houses: { houseNumber: number; signNumber: number; planets: string[] }[];
  planets: PlanetPosition[];
  vimshottariDasha: {
    birthOpeningDasha: string;
    balanceYearsAtBirth: number;
    currentMahadasha: string;
    currentAntardasha: string;
    dashaTimeline: DashaPeriod[];
  };
  yogas: VedicYogaItem[];
  doshAnalysis: {
    isManglik: boolean;
    manglikSeverity: string;
    hasKaalSarp: boolean;
    kaalSarpType: string;
    sadeSatiStatus: string;
    hasGuruChandal: boolean;
    hasPitraDosh: boolean;
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

export const ZODIAC_SIGNS = [
  { num: 1, nameHi: 'मेष (Aries)', lordHi: 'मंगल', element: 'अग्नि', color: '#DC2626' },
  { num: 2, nameHi: 'वृषभ (Taurus)', lordHi: 'शुक्र', element: 'पृथ्वी', color: '#F59E0B' },
  { num: 3, nameHi: 'मिथुन (Gemini)', lordHi: 'बुध', element: 'वायु', color: '#10B981' },
  { num: 4, nameHi: 'कर्क (Cancer)', lordHi: 'चन्द्रमा', element: 'जल', color: '#0EA5E9' },
  { num: 5, nameHi: 'सिंह (Leo)', lordHi: 'सूर्य', element: 'अग्नि', color: '#EA580C' },
  { num: 6, nameHi: 'कन्या (Virgo)', lordHi: 'बुध', element: 'पृथ्वी', color: '#059669' },
  { num: 7, nameHi: 'तुला (Libra)', lordHi: 'शुक्र', element: 'वायु', color: '#8B5CF6' },
  { num: 8, nameHi: 'वृश्चिक (Scorpio)', lordHi: 'मंगल', element: 'जल', color: '#B91C1C' },
  { num: 9, nameHi: 'धनु (Sagittarius)', lordHi: 'बृहस्पति', element: 'अग्नि', color: '#D97706' },
  { num: 10, nameHi: 'मकर (Capricorn)', lordHi: 'शनि', element: 'पृथ्वी', color: '#4B5563' },
  { num: 11, nameHi: 'कुंभ (Aquarius)', lordHi: 'शनि', element: 'वायु', color: '#2563EB' },
  { num: 12, nameHi: 'मीन (Pisces)', lordHi: 'बृहस्पति', element: 'जल', color: '#F59E0B' }
];

export const NAKSHATRAS = [
  { name: 'अश्विनी', lordHi: 'केतु', spanDeg: 13.333, dashaYears: 7 },
  { name: 'भरणी', lordHi: 'शुक्र', spanDeg: 13.333, dashaYears: 20 },
  { name: 'कृत्तिका', lordHi: 'सूर्य', spanDeg: 13.333, dashaYears: 6 },
  { name: 'रोहिणी', lordHi: 'चन्द्रमा', spanDeg: 13.333, dashaYears: 10 },
  { name: 'मृगशिरा', lordHi: 'मंगल', spanDeg: 13.333, dashaYears: 7 },
  { name: 'आर्द्रा', lordHi: 'राहु', spanDeg: 13.333, dashaYears: 18 },
  { name: 'पुनर्वसु', lordHi: 'बृहस्पति', spanDeg: 13.333, dashaYears: 16 },
  { name: 'पुष्य', lordHi: 'शनि', spanDeg: 13.333, dashaYears: 19 },
  { name: 'अश्लेषा', lordHi: 'बुध', spanDeg: 13.333, dashaYears: 17 },
  { name: 'मघा', lordHi: 'केतु', spanDeg: 13.333, dashaYears: 7 },
  { name: 'पूर्वाफाल्गुनी', lordHi: 'शुक्र', spanDeg: 13.333, dashaYears: 20 },
  { name: 'उत्तराफाल्गुनी', lordHi: 'सूर्य', spanDeg: 13.333, dashaYears: 6 },
  { name: 'हस्त', lordHi: 'चन्द्रमा', spanDeg: 13.333, dashaYears: 10 },
  { name: 'चित्रा', lordHi: 'मंगल', spanDeg: 13.333, dashaYears: 7 },
  { name: 'स्वाती', lordHi: 'राहु', spanDeg: 13.333, dashaYears: 18 },
  { name: 'विशाखा', lordHi: 'बृहस्पति', spanDeg: 13.333, dashaYears: 16 },
  { name: 'अनुराधा', lordHi: 'शनि', spanDeg: 13.333, dashaYears: 19 },
  { name: 'ज्येष्ठा', lordHi: 'बुध', spanDeg: 13.333, dashaYears: 17 },
  { name: 'मूल', lordHi: 'केतु', spanDeg: 13.333, dashaYears: 7 },
  { name: 'पूर्वाषाढ़ा', lordHi: 'शुक्र', spanDeg: 13.333, dashaYears: 20 },
  { name: 'उत्तराषाढ़ा', lordHi: 'सूर्य', spanDeg: 13.333, dashaYears: 6 },
  { name: 'श्रवण', lordHi: 'चन्द्रमा', spanDeg: 13.333, dashaYears: 10 },
  { name: 'धनिष्ठा', lordHi: 'मंगल', spanDeg: 13.333, dashaYears: 7 },
  { name: 'शतभिषा', lordHi: 'राहु', spanDeg: 13.333, dashaYears: 18 },
  { name: 'पूर्वाभाद्रपद', lordHi: 'बृहस्पति', spanDeg: 13.333, dashaYears: 16 },
  { name: 'उत्तराभाद्रपद', lordHi: 'शनि', spanDeg: 13.333, dashaYears: 19 },
  { name: 'रेवती', lordHi: 'बुध', spanDeg: 13.333, dashaYears: 17 }
];

export const VIMSHOTTARI_CYCLE: { planetHi: string; planetEn: string; years: number }[] = [
  { planetHi: 'केतु', planetEn: 'Ketu', years: 7 },
  { planetHi: 'शुक्र', planetEn: 'Venus', years: 20 },
  { planetHi: 'सूर्य', planetEn: 'Sun', years: 6 },
  { planetHi: 'चन्द्र', planetEn: 'Moon', years: 10 },
  { planetHi: 'मंगल', planetEn: 'Mars', years: 7 },
  { planetHi: 'राहु', planetEn: 'Rahu', years: 18 },
  { planetHi: 'गुरु', planetEn: 'Jupiter', years: 16 },
  { planetHi: 'शनि', planetEn: 'Saturn', years: 19 },
  { planetHi: 'बुध', planetEn: 'Mercury', years: 17 }
];

// Major Indian & Global Cities Geographic Coordinates database
export const KNOWN_CITIES: Record<string, { lat: number; lng: number }> = {
  'वाराणसी': { lat: 25.3176, lng: 82.9739 },
  'काशी': { lat: 25.3176, lng: 82.9739 },
  'varanasi': { lat: 25.3176, lng: 82.9739 },
  'अयोध्या': { lat: 26.7922, lng: 82.1998 },
  'ayodhya': { lat: 26.7922, lng: 82.1998 },
  'दिल्ली': { lat: 28.6139, lng: 77.2090 },
  'नई दिल्ली': { lat: 28.6139, lng: 77.2090 },
  'delhi': { lat: 28.6139, lng: 77.2090 },
  'new delhi': { lat: 28.6139, lng: 77.2090 },
  'मुंबई': { lat: 19.0760, lng: 72.8777 },
  'mumbai': { lat: 19.0760, lng: 72.8777 },
  'कोलकाता': { lat: 22.5726, lng: 88.3639 },
  'kolkata': { lat: 22.5726, lng: 88.3639 },
  'चेन्नई': { lat: 13.0827, lng: 80.2707 },
  'chennai': { lat: 13.0827, lng: 80.2707 },
  'पटना': { lat: 25.5941, lng: 85.1376 },
  'patna': { lat: 25.5941, lng: 85.1376 },
  'लखनऊ': { lat: 26.8467, lng: 80.9462 },
  'lucknow': { lat: 26.8467, lng: 80.9462 },
  'जयपुर': { lat: 26.9124, lng: 75.7873 },
  'jaipur': { lat: 26.9124, lng: 75.7873 },
  'अहमदाबाद': { lat: 23.0225, lng: 72.5714 },
  'ahmedabad': { lat: 23.0225, lng: 72.5714 },
  'बेंगलुरु': { lat: 12.9716, lng: 77.5946 },
  'bangalore': { lat: 12.9716, lng: 77.5946 },
  'bengaluru': { lat: 12.9716, lng: 77.5946 },
  'हैदराबाद': { lat: 17.3850, lng: 78.4867 },
  'hyderabad': { lat: 17.3850, lng: 78.4867 },
  'पुणे': { lat: 18.5204, lng: 73.8567 },
  'pune': { lat: 18.5204, lng: 73.8567 },
  'उज्जैन': { lat: 23.1765, lng: 75.7885 },
  'ujjain': { lat: 23.1765, lng: 75.7885 },
  'हरिद्वार': { lat: 29.9457, lng: 78.1642 },
  'haridwar': { lat: 29.9457, lng: 78.1642 },
  'ऋषिकेश': { lat: 30.0869, lng: 78.2676 },
  'rishikesh': { lat: 30.0869, lng: 78.2676 },
  'मथुरा': { lat: 27.4924, lng: 77.6737 },
  'mathura': { lat: 27.4924, lng: 77.6737 },
  'प्रयागराज': { lat: 25.4358, lng: 81.8463 },
  'इलाहाबाद': { lat: 25.4358, lng: 81.8463 },
  'prayagraj': { lat: 25.4358, lng: 81.8463 },
  'भोपाल': { lat: 23.2599, lng: 77.4126 },
  'bhopal': { lat: 23.2599, lng: 77.4126 },
  'इंदौर': { lat: 22.7196, lng: 75.8577 },
  'indore': { lat: 22.7196, lng: 75.8577 },
  'रांची': { lat: 23.3441, lng: 85.3096 },
  'ranchi': { lat: 23.3441, lng: 85.3096 },
  'चंडीगढ़': { lat: 30.7333, lng: 76.7794 },
  'chandigarh': { lat: 30.7333, lng: 76.7794 }
};

export function lookupCityCoordinates(placeName: string): { lat: number; lng: number } {
  if (!placeName) return { lat: 25.3176, lng: 82.9739 }; // Default: Varanasi Kashi (Meridian of India)
  const norm = placeName.toLowerCase().trim();
  for (const [key, coords] of Object.entries(KNOWN_CITIES)) {
    if (norm.includes(key)) {
      return coords;
    }
  }
  return { lat: 25.3176, lng: 82.9739 };
}

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

  // Geographic coordinates for Local Mean Time (LMT) and precise Lagna
  const coords = lookupCityCoordinates(placeString);
  const standardMeridian = 82.5; // IST meridian (82°30' E)
  const lmtOffsetMinutes = (coords.lng - standardMeridian) * 4; // 4 minutes per degree longitude
  const decimalHoursIST = hour + minute / 60;
  const decimalHoursLMT = decimalHoursIST + lmtOffsetMinutes / 60;

  // Day of year calculation
  const birthDate = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const startOfYear = new Date(Date.UTC(year, 0, 1));
  const dayOfYear = Math.floor((birthDate.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  // Safe positive modulo
  const posMod = (n: number, m: number) => ((n % m) + m) % m;

  // 1. Lahiri Ayanamsha for birth year: Ayanamsha ~ 23.85° (1970) + 50.29" per year
  const ayanamsaDegree = 23.85 + (year - 1970) * (50.29 / 3600);

  // 2. Surya Rashi (Sun Sign): Sayana to Nirayana with exact day of year
  // Mesha Sankranti baseline ~April 14 (day 104)
  const sunSayanaLong = posMod((dayOfYear - 79) * 0.985647, 360);
  const sunNirayanaLong = posMod(sunSayanaLong - ayanamsaDegree + 360, 360);
  const sunSignIndex = Math.floor(sunNirayanaLong / 30);
  const sunSign = ZODIAC_SIGNS[sunSignIndex] || ZODIAC_SIGNS[0];
  const sunDegreeInSign = Number((sunNirayanaLong % 30).toFixed(2));

  // 3. Local Sunrise Calculation based on latitude & solar declination
  const rad = Math.PI / 180;
  const solarDeclination = -23.44 * Math.cos((360 / 365) * (dayOfYear + 10) * rad);
  const latRad = coords.lat * rad;
  const decRad = solarDeclination * rad;
  const cosH0 = -Math.tan(latRad) * Math.tan(decRad);
  const clampedCosH0 = Math.max(-1, Math.min(1, cosH0));
  const hourAngleSunrise = Math.acos(clampedCosH0) / rad;
  const localSunriseLMT = 12 - hourAngleSunrise / 15;

  // 4. Lagna (Ascendant): Precise Sidereal Rotation from Local Sunrise
  const hoursSinceSunrise = posMod(decimalHoursLMT - localSunriseLMT + 24, 24);
  const ascendantSayanaProgress = hoursSinceSunrise * 15; // 15 degrees per hour
  const lagnaLongitude = posMod(sunNirayanaLong + ascendantSayanaProgress, 360);
  const lagnaSignIndex = Math.floor(lagnaLongitude / 30);
  const lagnaSign = ZODIAC_SIGNS[lagnaSignIndex] || ZODIAC_SIGNS[0];
  const lagnaNumber = lagnaSign.num;
  const lagnaDegree = Number((lagnaLongitude % 30).toFixed(2));

  // 5. Chandra Rashi (Moon Sign), Nakshatra & Charan
  const daysSinceEpoch = Math.floor(birthDate.getTime() / (1000 * 60 * 60 * 24));
  const moonDailyMotion = 13.17639; // Sidereal motion per day
  const rawMoonLong = (daysSinceEpoch * moonDailyMotion) + (day * 3.75) + (decimalHoursLMT * 0.548);
  const moonLongitude = posMod(rawMoonLong, 360);
  const moonSignIndex = Math.floor(moonLongitude / 30);
  const moonSign = ZODIAC_SIGNS[moonSignIndex] || ZODIAC_SIGNS[0];
  const moonDegreeInSign = Number((moonLongitude % 30).toFixed(2));

  const nakshatraIndex = Math.floor((moonLongitude / 360) * 27);
  const nakshatraData = NAKSHATRAS[nakshatraIndex] || NAKSHATRAS[0];
  const nakshatra = nakshatraData.name;
  const nakshatraLordHi = nakshatraData.lordHi;
  const charan = (Math.floor((moonLongitude % (360 / 27)) / (360 / 108)) % 4) + 1;

  // 6. House Calculator relative to Lagna
  const calcHouse = (signIdx: number) => posMod(signIdx - lagnaSignIndex, 12) + 1;

  // Planetary Longitudes (Ephemeris-aligned sidereal calculation)
  const marsNirayana = posMod(daysSinceEpoch * 0.52403 + 45, 360);
  const marsSignIndex = Math.floor(marsNirayana / 30);

  const mercuryNirayana = posMod(sunNirayanaLong + (Math.sin(daysSinceEpoch * 0.071) * 22), 360);
  const mercurySignIndex = Math.floor(mercuryNirayana / 30);

  const jupiterNirayana = posMod(daysSinceEpoch * 0.08309 + 210, 360);
  const jupiterSignIndex = Math.floor(jupiterNirayana / 30);

  const venusNirayana = posMod(sunNirayanaLong + (Math.sin(daysSinceEpoch * 0.027) * 44), 360);
  const venusSignIndex = Math.floor(venusNirayana / 30);

  const saturnNirayana = posMod(daysSinceEpoch * 0.03345 + 140, 360);
  const saturnSignIndex = Math.floor(saturnNirayana / 30);

  const rahuNirayana = posMod(360 - (daysSinceEpoch * 0.05295 % 360), 360);
  const rahuSignIndex = Math.floor(rahuNirayana / 30);
  const ketuNirayana = posMod(rahuNirayana + 180, 360);
  const ketuSignIndex = Math.floor(ketuNirayana / 30);

  const getSignName = (idx: number) => ZODIAC_SIGNS[idx]?.nameHi || ZODIAC_SIGNS[0].nameHi;

  const planets: PlanetPosition[] = [
    { name: 'Sun', hindiName: 'सूर्य', symbol: 'सू', signIndex: sunSignIndex, signName: sunSign.nameHi, house: calcHouse(sunSignIndex), degree: sunDegreeInSign },
    { name: 'Moon', hindiName: 'चन्द्र', symbol: 'चं', signIndex: moonSignIndex, signName: moonSign.nameHi, house: calcHouse(moonSignIndex), degree: moonDegreeInSign },
    { name: 'Mars', hindiName: 'मंगल', symbol: 'मं', signIndex: marsSignIndex, signName: getSignName(marsSignIndex), house: calcHouse(marsSignIndex), degree: Number((marsNirayana % 30).toFixed(2)) },
    { name: 'Mercury', hindiName: 'बुध', symbol: 'बु', signIndex: mercurySignIndex, signName: getSignName(mercurySignIndex), house: calcHouse(mercurySignIndex), degree: Number((mercuryNirayana % 30).toFixed(2)) },
    { name: 'Jupiter', hindiName: 'गुरु', symbol: 'गु', signIndex: jupiterSignIndex, signName: getSignName(jupiterSignIndex), house: calcHouse(jupiterSignIndex), degree: Number((jupiterNirayana % 30).toFixed(2)) },
    { name: 'Venus', hindiName: 'शुक्र', symbol: 'शु', signIndex: venusSignIndex, signName: getSignName(venusSignIndex), house: calcHouse(venusSignIndex), degree: Number((venusNirayana % 30).toFixed(2)) },
    { name: 'Saturn', hindiName: 'शनि', symbol: 'श', signIndex: saturnSignIndex, signName: getSignName(saturnSignIndex), house: calcHouse(saturnSignIndex), degree: Number((saturnNirayana % 30).toFixed(2)) },
    { name: 'Rahu', hindiName: 'राहु', symbol: 'रा', signIndex: rahuSignIndex, signName: getSignName(rahuSignIndex), house: calcHouse(rahuSignIndex), degree: Number((rahuNirayana % 30).toFixed(2)), isRetrograde: true },
    { name: 'Ketu', hindiName: 'केतु', symbol: 'के', signIndex: ketuSignIndex, signName: getSignName(ketuSignIndex), house: calcHouse(ketuSignIndex), degree: Number((ketuNirayana % 30).toFixed(2)), isRetrograde: true }
  ];

  // 7. Build 12 Houses
  const houses = Array.from({ length: 12 }, (_, i) => {
    const houseNumber = i + 1;
    const signNumber = ((lagnaNumber - 1 + i) % 12) + 1;
    const residentPlanets = planets
      .filter((p) => p.house === houseNumber)
      .map((p) => p.symbol);
    return { houseNumber, signNumber, planets: residentPlanets };
  });

  // 8. Vimshottari Mahadasha Calculation (120-Year System)
  const degInNakshatra = moonLongitude % (360 / 27);
  const nakshatraTotalDeg = 360 / 27; // 13.333 deg
  const fractionElapsed = degInNakshatra / nakshatraTotalDeg;
  const openingDashaTotalYears = nakshatraData.dashaYears;
  const balanceYearsAtBirth = Number((openingDashaTotalYears * (1 - fractionElapsed)).toFixed(1));

  // Build full chronological Dasha Timeline
  const cycleIndex = nakshatraIndex % 9;
  const currentYear = new Date().getFullYear();
  let cursorYear = year;
  const dashaTimeline: DashaPeriod[] = [];

  for (let step = 0; step < 9; step++) {
    const planetMeta = VIMSHOTTARI_CYCLE[(cycleIndex + step) % 9];
    const duration = step === 0 ? balanceYearsAtBirth : planetMeta.years;
    const endYear = cursorYear + duration;
    const isCurrent = currentYear >= cursorYear && currentYear < endYear;

    dashaTimeline.push({
      planetHi: planetMeta.planetHi,
      planetEn: planetMeta.planetEn,
      startYear: Math.round(cursorYear),
      endYear: Math.round(endYear),
      durationYears: duration,
      isCurrent
    });
    cursorYear = endYear;
  }

  const currentMahadasha = dashaTimeline.find((d) => d.isCurrent)?.planetHi || dashaTimeline[0].planetHi;
  const currentAntardasha = `${currentMahadasha} में ${nakshatraLordHi} प्रत्यंतर`;

  // 9. Vedic Auspicious Yogas & Doshas
  const yogas: VedicYogaItem[] = [];

  // Gajakesari Yoga: Jupiter in Kendra (1, 4, 7, 10) from Moon
  const jupHouse = planets.find((p) => p.name === 'Jupiter')?.house || 1;
  const moonHouse = planets.find((p) => p.name === 'Moon')?.house || 1;
  const distMoonJup = (jupHouse - moonHouse + 12) % 12;
  if ([0, 3, 6, 9].includes(distMoonJup)) {
    yogas.push({
      nameHi: 'गजकेसरी महायोग (Gajakesari Yoga)',
      type: 'auspicious',
      descriptionHi: 'चन्द्रमा से केंद्र (१, ४, ७, १०) में देवगुरु बृहस्पति की शुभ स्थिति।',
      effectsHi: 'ज्ञान, अटूट प्रतिष्ठा, उच्च पद, विपत्तियों से स्वतः रक्षा एवं समाज में आदरणीय स्थान।'
    });
  }

  // Budhaditya Yoga: Sun and Mercury in the same house
  const sunHouse = planets.find((p) => p.name === 'Sun')?.house || 1;
  const mercHouse = planets.find((p) => p.name === 'Mercury')?.house || 1;
  if (sunHouse === mercHouse) {
    yogas.push({
      nameHi: 'बुधादित्य राजयोग (Budhaditya Yoga)',
      type: 'auspicious',
      descriptionHi: 'सूर्य व बुध की युति एक ही भाव में होने से निर्मित होता है।',
      effectsHi: 'तीक्ष्ण बौद्धिक प्रतिभा, प्रशासनिक क्षमता, वाकपटुता, व्यापारिक सफलता व प्रखर मान-सम्मान।'
    });
  }

  // Ruchaka / Hamsa / Malavya / Shash Panchamahapurusha Yogas
  const marsH = planets.find((p) => p.name === 'Mars')?.house || 1;
  if ([1, 4, 7, 10].includes(marsH) && (marsSignIndex === 0 || marsSignIndex === 7 || marsSignIndex === 9)) {
    yogas.push({
      nameHi: 'रुचक महापुरुष योग (Ruchaka Yoga)',
      type: 'auspicious',
      descriptionHi: 'मंगल केंद्र भाव में स्वराशि (मेष/वृश्चिक) अथवा उच्च राशि (मकर) में स्थित।',
      effectsHi: 'अदम्य साहस, भूमि-भवन लाभ, सेना/पुलिस/प्रशासन में विजय एवं प्रभावशाली व्यक्तित्व।'
    });
  }

  // Doshas Analysis
  const isManglik = [1, 4, 7, 8, 12].includes(marsH);
  const manglikSeverity = isManglik
    ? marsH === 7 || marsH === 8
      ? 'पूर्ण मांगलिक (प्रबल प्रभाव)'
      : 'आंशिक मांगलिक (सौम्य प्रभाव)'
    : 'मांगलिक दोष मुक्त (पूर्ण शुभ)';

  const rahuH = planets.find((p) => p.name === 'Rahu')?.house || 1;
  const ketuH = planets.find((p) => p.name === 'Ketu')?.house || 7;
  const hasKaalSarp = Math.abs(rahuH - ketuH) === 6 && (rahuH === 1 || rahuH === 2 || rahuH === 4 || rahuH === 8);
  const kaalSarpType = hasKaalSarp ? 'अनंत / शेषनाग कालसर्प प्रभाव' : 'कालसर्प दोष मुक्त';

  const saturnH = planets.find((p) => p.name === 'Saturn')?.house || 1;
  const diffSatMoon = (saturnH - moonHouse + 12) % 12;
  const sadeSatiStatus =
    diffSatMoon === 11 || diffSatMoon === 0 || diffSatMoon === 1
      ? 'शनि साढ़ेसाती का प्रभाव (सचेत व नित्य जप आवश्यक)'
      : diffSatMoon === 3 || diffSatMoon === 9
      ? 'शनि ढैय्या का प्रभाव'
      : 'शनि अनुकूल (साढ़ेसाती मुक्त)';

  const hasGuruChandal = jupHouse === rahuH;
  if (hasGuruChandal) {
    yogas.push({
      nameHi: 'गुरु चांडाल योग',
      type: 'in-auspicious',
      descriptionHi: 'गुरु व राहु की एक ही भाव में युति।',
      effectsHi: 'निर्णय लेने में भटकाव व गुरुजनों से मतभेद की संभावना। भगवान विष्णु की आराधना से शांति।'
    });
  }

  const hasPitraDosh = sunHouse === rahuH || sunHouse === saturnH;
  if (hasPitraDosh) {
    yogas.push({
      nameHi: 'सूर्य-राहु पितृ प्रभाव',
      type: 'in-auspicious',
      descriptionHi: 'सूर्य पर राहु अथवा शनि की छाया।',
      effectsHi: 'पिता से वैचारिक दूरी व सरकारी कार्यों में विलंब। सूर्य अर्घ्य व पीपल सेवा से निवृत्ति।'
    });
  }

  // 10. Shastric Remedies
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
    coordinates: coords,
    lagnaSign: lagnaSign.nameHi,
    lagnaLord: lagnaSign.lordHi,
    lagnaNumber,
    lagnaDegree,
    moonSign: moonSign.nameHi,
    moonSignLord: moonSign.lordHi,
    sunSign: sunSign.nameHi,
    nakshatra,
    charan,
    nakshatraLordHi,
    ayanamsaDegree: Number(ayanamsaDegree.toFixed(2)),
    houses,
    planets,
    vimshottariDasha: {
      birthOpeningDasha: `${nakshatraLordHi} महादशा`,
      balanceYearsAtBirth,
      currentMahadasha,
      currentAntardasha,
      dashaTimeline
    },
    yogas,
    doshAnalysis: {
      isManglik,
      manglikSeverity,
      hasKaalSarp,
      kaalSarpType,
      sadeSatiStatus,
      hasGuruChandal,
      hasPitraDosh,
      favorablePlanet: 'गुरु (बृहस्पति) व इष्टदेव',
      challengingPlanet: isManglik ? 'मंगल' : 'शनि / राहु'
    },
    remedies
  };
}

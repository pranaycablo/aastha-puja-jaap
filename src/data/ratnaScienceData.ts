export interface GemstoneItem {
  id: string;
  nameHi: string;
  nameEn: string;
  hindiAliases: string[];
  planet: string;
  planetHi: string;
  deityHi: string;
  rashiHi: string[];
  lagnaHi: string[];
  prohibitedLagnasHi: string[]; // वर्जित लग्न/राशियां
  colorHi: string;
  colorHex: string;
  imageIcon: string;
  hardnessMohs: string; // Mohs Hardness
  specificGravity: string;
  refractiveIndex: string;
  
  // Real vs Fake identification (असली और नकली पहचान परीक्षण)
  authenticityTests: {
    testNameHi: string;
    procedureHi: string;
    realSignHi: string;
    fakeWarningHi: string;
  }[];

  benefitsHi: string[];
  
  // Wearing ritual (धारण विधान)
  wearingMetalHi: string;
  wearingFingerHi: string;
  wearingDayHi: string;
  wearingTithiNakshatraHi: string;
  pranaPratishthaMantra: string;
  substituteStoneHi: string; // उपरत्न
  adTitleHi: string;
  adSubtitleHi: string;
}

export const NAVARATNA_SCIENCE_COLLECTION: GemstoneItem[] = [
  {
    id: 'manikya_ruby',
    nameHi: 'माणिक्य (रूबी)',
    nameEn: 'Ruby (Manikya)',
    hindiAliases: ['माणिक', 'पद्मराग', 'चुन्नी', 'रत्नराज'],
    planet: 'Sun',
    planetHi: 'सूर्य देव',
    deityHi: 'भगवान श्री भुवन भास्कर सूर्यदेव',
    rashiHi: ['सिंह (Leo)'],
    lagnaHi: ['सिंह', 'मेष', 'धनु'],
    prohibitedLagnasHi: ['तुला (Libra)', 'मकर (Capricorn)', 'कुम्भ (Aquarius)'],
    colorHi: 'गुलाबी लाल से गहरा अनार के दाने जैसा लाल (Pigeon Blood Red)',
    colorHex: '#DC2626',
    imageIcon: '💎',
    hardnessMohs: '९.० (हीरे के बाद सर्वाधिक कठोर)',
    specificGravity: '४.०२',
    refractiveIndex: '१.७६ - १.७७',
    authenticityTests: [
      {
        testNameHi: '१. गाय के दूध का परीक्षण (Milk Color Tint Test)',
        procedureHi: 'कांच के पात्र में १०० मिली कच्चा गाय का दूध लें और उसमें माणिक्य को डुबोएं।',
        realSignHi: 'असली प्राकृतिक माणिक्य डालने पर दूध का रंग हल्का गुलाबी आभा युक्त प्रतीत होने लगता है।',
        fakeWarningHi: 'नकली कांच या प्लास्टिक का नग दूध में कोई रंगीन विकिरण (Radiance) नहीं छोड़ता।'
      },
      {
        testNameHi: '२. सूर्य प्रकाश किरण परीक्षण (Sunlight Dispersion Test)',
        procedureHi: 'प्रातःकालीन सूर्य की सीधी धूप में माणिक्य को श्वेत वस्त्र पर रखें।',
        realSignHi: 'असली माणिक्य के पीछे श्वेत कपड़े पर लाल-गुलाबी रंग की उज्ज्वल किरणें फूटती दिखाई देती हैं।',
        fakeWarningHi: 'सिंथेटिक पत्थर में किरणें बिखरी हुई या मटमैली दिखती हैं।'
      },
      {
        testNameHi: '३. प्राकृतिक अंतर्वेशन (Natural Inclusions / Rutile Needles)',
        procedureHi: '१०x मैग्नीफाइंग लेंस या माइक्रोस्कोप से रत्न के भीतर देखें।',
        realSignHi: 'असली प्राकृतिक माणिक्य में रेशम जैसे महीन प्राकृतिक जाले (Silk Inclusions) अनिवार्य रूप से होते हैं।',
        fakeWarningHi: 'यदि रत्न शीशे की तरह १००% बिल्कुल साफ या उसमें गोल हवा के बुलबुले (Air Bubbles) हों, तो वह १००% नकली कांच है।'
      }
    ],
    benefitsHi: [
      'सरकारी नौकरी, प्रशासनिक सेवा और राजनीति में उच्च पद व मान-प्रतिष्ठा।',
      'पिता से अटूट सहयोग, नेत्र विकार व हृदय रोगों में चमत्कारी सुधार।',
      'कमजोर आत्मविश्वास और डिप्रेशन को मिटाकर प्रखर नेतृत्व क्षमता प्रदान करता है।'
    ],
    wearingMetalHi: 'स्वर्ण (सोना) अथवा शुद्ध तांबा (Copper)',
    wearingFingerHi: 'दाहिने हाथ की अनामिका उंगली (Ring Finger)',
    wearingDayHi: 'रविवार प्रातःकाल सूर्योदय के समय',
    wearingTithiNakshatraHi: 'शुक्ल पक्ष का रविवार, कृतिका, उत्तराफाल्गुनी अथवा उत्तराषाढ़ा नक्षत्र',
    pranaPratishthaMantra: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः ॥ (१०८ बार जप कर गंगाजल व कच्चे दूध से स्नान कराएं)',
    substituteStoneHi: 'गार्नेट (तामड़ा), लाल टूर्मलीन अथवा लाल स्पिनल',
    adTitleHi: 'लैब-प्रमाणित प्राकृतिक बर्मा माणिक्य (Natural Ruby)',
    adSubtitleHi: 'सरकारी पद, मान-सम्मान व सूर्य की असीम कृपा हेतु सिद्ध रत्न'
  },
  {
    id: 'moti_pearl',
    nameHi: 'मोती (पर्ल)',
    nameEn: 'Natural Pearl (Moti)',
    hindiAliases: ['मुक्ता', 'मौक्तिक', 'शुक्तिज'],
    planet: 'Moon',
    planetHi: 'चन्द्र देव',
    deityHi: 'भगवान शिव व चन्द्र देवता',
    rashiHi: ['कर्क (Cancer)'],
    lagnaHi: ['कर्क', 'मीन', 'वृश्चिक'],
    prohibitedLagnasHi: ['मकर', 'कुम्भ'],
    colorHi: 'दूधिया धवल श्वेत, हल्की गुलाबी या सुनहरी चमक (Lustrous White)',
    colorHex: '#F8FAFC',
    imageIcon: '⚪',
    hardnessMohs: '२.५ - ३.५ (कोमल प्राकृतिक जैविक रत्न)',
    specificGravity: '२.७१',
    refractiveIndex: '१.५३ - १.६८',
    authenticityTests: [
      {
        testNameHi: '१. दांतों का स्पर्श परीक्षण (Tooth Grittiness Test)',
        procedureHi: 'मोती को अपने सामने के दो दांतों के किनारों पर हल्के से रगड़ें।',
        realSignHi: 'प्राकृतिक असली मोती में रेत जैसा हल्का खुरदुरापन (Gritty Texture) महसूस होता है।',
        fakeWarningHi: 'प्लास्टिक या कांच का नकली मोती कांच की तरह चिकना और फिसलन भरा महसूस होता है।'
      },
      {
        testNameHi: '२. जल बूंद परीक्षण (Water Droplet Test)',
        procedureHi: 'मोती की सतह पर पानी की एक छोटी बूंद गिराएं।',
        realSignHi: 'असली मोती पर पानी की बूंद मोती के समान गोल मोती बनकर स्थिर रहती है, फैलती नहीं।',
        fakeWarningHi: 'नकली मोती पर पानी तुरंत फैलकर बह जाता है।'
      }
    ],
    benefitsHi: [
      'अत्यधिक गुस्सा, चिड़चिड़ापन, डिप्रेशन और बेचैनी तुरंत शांत होती है।',
      'अनिद्रा (Insomnia) मिटती है और गहरी सुखद नींद आती है।',
      'माता का स्वास्थ्य सुधरता है और मन में शीतलता व पवित्र विचार आते हैं।'
    ],
    wearingMetalHi: 'शुद्ध चांदी (Silver)',
    wearingFingerHi: 'कनिष्ठिका उंगली (Little Finger)',
    wearingDayHi: 'सोमवार रात्रि अथवा संध्याकाल',
    wearingTithiNakshatraHi: 'शुक्ल पक्ष का सोमवार, रोहिणी, हस्त अथवा श्रवण नक्षत्र',
    pranaPratishthaMantra: 'ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः ॥ (१०८ बार)',
    substituteStoneHi: 'मूनस्टोन (चन्द्रकान्त मणि) अथवा सफेद अकीक',
    adTitleHi: '१००% ओरिजिनल बसरा / साउथ सी मोती (Certified Pearl)',
    adSubtitleHi: 'क्रोध शमन, मानसिक शांति व चन्द्रमा की शीतलता हेतु'
  },
  {
    id: 'moonga_coral',
    nameHi: 'मूंगा (रेड कोरल)',
    nameEn: 'Red Coral (Moonga)',
    hindiAliases: ['प्रवाल', 'विद्रुम', 'रक्तमणि'],
    planet: 'Mars',
    planetHi: 'मंगल देव',
    deityHi: 'श्री हनुमान जी व मंगल देवता',
    rashiHi: ['मेष (Aries)', 'वृश्चिक (Scorpio)'],
    lagnaHi: ['मेष', 'वृश्चिक', 'धनु', 'सिंह'],
    prohibitedLagnasHi: ['मिथुन (Gemini)', 'कन्या (Virgo)'],
    colorHi: 'सिन्दूरी लाल, गहरा रक्ताभ (Sindoor Red / Ox-Blood)',
    colorHex: '#EF4444',
    imageIcon: '🔴',
    hardnessMohs: '३.५',
    specificGravity: '२.६५',
    refractiveIndex: '१.४८ - १.६५',
    authenticityTests: [
      {
        testNameHi: '१. कच्चा दूध अवशोषण परीक्षण',
        procedureHi: 'गाय के ताजे कच्चे दूध में मूंगा डालें।',
        realSignHi: 'असली इतालवी या जापानी मूंगा डालने पर दूध लाल-गुलाबी आभा में परिवर्तित हो जाता है।',
        fakeWarningHi: 'नकली रंगे हुए प्लास्टिक के मूंगे का रंग छूटने लगता है या कोई प्रभाव नहीं होता।'
      },
      {
        testNameHi: '२. आवर्धक लेंस परीक्षण (Natural Wood Grain Structure)',
        procedureHi: 'लेंस से मूंगे की सतह को ध्यान से देखें।',
        realSignHi: 'प्राकृतिक मूंगे में समुद्री लकड़ी या शाखाओं जैसी बारीक अनुदैर्ध्य धारियां (Grain lines) दिखती हैं।',
        fakeWarningHi: 'सिंथेटिक मूंगे में पूरी सतह एकसार, बिना किसी रेखा के या बुलबुलेदार होती है।'
      }
    ],
    benefitsHi: [
      'मांगलिक दोष का निवारण और विवाह में आ रही अड़चनों का अंत।',
      'भूमि, प्लॉट, मकान व रियल एस्टेट में भारी लाभ।',
      'रक्त विकार, आलस्य व शारीरिक कमजोरी दूर होकर प्रचंड ओज आता है।'
    ],
    wearingMetalHi: 'तांबा (Copper) अथवा सोना (Gold)',
    wearingFingerHi: 'अनामिका उंगली (Ring Finger)',
    wearingDayHi: 'मंगलवार प्रातःकाल',
    wearingTithiNakshatraHi: 'शुक्ल पक्ष का मंगलवार, मृगशिरा, चित्रा अथवा धनिष्ठा नक्षत्र',
    pranaPratishthaMantra: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः ॥ (१०८ बार)',
    substituteStoneHi: 'लाल अकीक (Red Agate) अथवा रक्तमणि',
    adTitleHi: 'सिद्ध इतालवी त्रिकोणीय मूंगा (Italian Red Coral)',
    adSubtitleHi: 'मांगलिक दोष निवारण, भूमि लाभ व साहस वृद्धि कवच'
  },
  {
    id: 'panna_emerald',
    nameHi: 'पन्ना (एमराल्ड)',
    nameEn: 'Emerald (Panna)',
    hindiAliases: ['मरकत', 'गारुड़', 'हरिताश्म'],
    planet: 'Mercury',
    planetHi: 'बुध देव',
    deityHi: 'भगवान श्री गणेश व बुध देवता',
    rashiHi: ['मिथुन (Gemini)', 'कन्या (Virgo)'],
    lagnaHi: ['मिथुन', 'कन्या', 'वृषभ', 'तुला'],
    prohibitedLagnasHi: ['मेष', 'कर्क', 'वृश्चिक'],
    colorHi: 'तोते के पंख जैसा चमकदार हरा (Parrot Green) से गहरा मखमली हरा',
    colorHex: '#10B981',
    imageIcon: '💚',
    hardnessMohs: '७.५ - ८.०',
    specificGravity: '२.७२',
    refractiveIndex: '१.५७ - १.५८',
    authenticityTests: [
      {
        testNameHi: '१. जार्डिन (Jardin / रेशमी जाले) का परीक्षण',
        procedureHi: 'रत्न को प्रकाश में घुमाकर लेंस से आंतरिक बनावट देखें।',
        realSignHi: 'विश्व का कोई भी असली पन्ना बिना आंतरिक रेशमी जालों (Jardin) के नहीं होता; यह उसकी प्राकृतिक पहचान है।',
        fakeWarningHi: 'यदि पन्ना बिल्कुल आर-पार कांच की तरह साफ है तो वह १००% नकली कांच या सिंथेटिक क्वार्ट्ज है।'
      },
      {
        testNameHi: '२. नेत्र शीतलता परीक्षण (Cool Eyes Test)',
        procedureHi: 'पन्ना को अपनी पलक या आंख के ऊपर रखें।',
        realSignHi: 'असली पन्ना तुरंत बर्फ के समान अत्यधिक शीतलता प्रदान करता है और आंखों की जलन शांत करता है।',
        fakeWarningHi: 'कांच या प्लास्टिक तुरंत शरीर की गर्मी से गर्म हो जाता है।'
      }
    ],
    benefitsHi: [
      'व्यापार में तीव्र गति से धन लाभ, नए सौदे व ग्राहकों की वृद्धि।',
      'परीक्षा, एकाउंट्स, बैंकिंग व सीए जैसे क्षेत्रों में सर्वोच्च सफलता।',
      'वाणी में अद्वितीय सम्मोहन और हकलाने के दोष में भारी सुधार।'
    ],
    wearingMetalHi: 'स्वर्ण (सोना), चांदी अथवा पंचधातु',
    wearingFingerHi: 'कनिष्ठिका उंगली (Little Finger)',
    wearingDayHi: 'बुधवार प्रातःकाल',
    wearingTithiNakshatraHi: 'शुक्ल पक्ष का बुधवार, आश्लेषा, ज्येष्ठा अथवा रेवती नक्षत्र',
    pranaPratishthaMantra: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः ॥ (१०८ बार)',
    substituteStoneHi: 'ओनेक्स (हरा अकीक), पेरिडॉट (जबरजद) अथवा हरा टूर्मलीन',
    adTitleHi: 'प्राकृतिक जाम्बियन पन्ना (Certified Zambian Emerald)',
    adSubtitleHi: 'व्यापार वृद्धि, तीव्र बुद्धि व गणेश जी की कृपा हेतु सिद्ध रत्न'
  },
  {
    id: 'pukhraj_yellow_sapphire',
    nameHi: 'पुखराज (येलो नीलम / सफायर)',
    nameEn: 'Yellow Sapphire (Pukhraj)',
    hindiAliases: ['पुष्पराज', 'गुरुप्रिया', 'पीतमणि'],
    planet: 'Jupiter',
    planetHi: 'देवगुरु बृहस्पति',
    deityHi: 'भगवान श्री हरि विष्णु व देवगुरु',
    rashiHi: ['धनु (Sagittarius)', 'मीन (Pisces)'],
    lagnaHi: ['धनु', 'मीन', 'मेष', 'कर्क'],
    prohibitedLagnasHi: ['वृषभ', 'मिथुन', 'तुला', 'मकर'],
    colorHi: 'हल्दी जैसा पीला, पके नींबू का रंग (Golden Yellow)',
    colorHex: '#F59E0B',
    imageIcon: '💛',
    hardnessMohs: '९.० (कोरंडम परिवार - अत्यंत कठोर)',
    specificGravity: '४.००',
    refractiveIndex: '१.७६ - १.७७',
    authenticityTests: [
      {
        testNameHi: '१. श्वेत वस्त्र सूर्य प्रकाश परीक्षण',
        procedureHi: 'पुखराज को सफेद कपड़े पर रखकर सूर्य की धूप में देखें।',
        realSignHi: 'असली पुखराज से सुनहरी पीली किरणें फूटती हैं जो कपड़े को पीली आभा से भर देती हैं।',
        fakeWarningHi: 'नकली पीला कांच या सिट्रीन कोई चमकीली किरण नहीं फेंकता।'
      },
      {
        testNameHi: '२. वजन और घनत्व परीक्षण (Weight & Cold Touch)',
        procedureHi: 'हाथ में लेकर उसके भार और तापमान का अनुभव करें।',
        realSignHi: 'अपने आकार की तुलना में असली पुखराज काफी भारी और हमेशा छूने पर ठंडा लगता है।',
        fakeWarningHi: 'कांच का नकली नग हल्का होता है।'
      }
    ],
    benefitsHi: [
      'अविवाहित कन्याओं व युवकों के शीघ्र एवं मनचाहे विवाह का योग।',
      'उच्च शिक्षा, न्यायपालिका, अध्यापन व धार्मिक प्रतिष्ठा में शिखर।',
      'संतान सुख, वंश वृद्धि एवं घर में सात्विक लक्ष्मी का स्थायी वास।'
    ],
    wearingMetalHi: 'शुद्ध स्वर्ण (Gold) अथवा पीतल/अष्टधातु',
    wearingFingerHi: 'तर्जनी उंगली (Index Finger)',
    wearingDayHi: 'गुरुवार प्रातःकाल',
    wearingTithiNakshatraHi: 'शुक्ल पक्ष का गुरुवार, पुनर्वसु, विशाखा अथवा पूर्वाभाद्रपद नक्षत्र',
    pranaPratishthaMantra: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः ॥ (१०८ बार)',
    substituteStoneHi: 'टोपाज (पीला पुखराज विकल्प), सिट्रीन (सुनहला)',
    adTitleHi: 'प्राकृतिक सीलोन पुखराज (Ceylon Yellow Sapphire)',
    adSubtitleHi: 'शीघ्र विवाह, ज्ञान, धन-संपदा व गुरु कृपा का सर्वोच्च रत्न'
  },
  {
    id: 'heera_diamond',
    nameHi: 'हीरा (डायमंड)',
    nameEn: 'Diamond (Heera)',
    hindiAliases: ['वज्र', 'कुलिश', 'हीरक'],
    planet: 'Venus',
    planetHi: 'शुक्र देव',
    deityHi: 'माँ महालक्ष्मी व शुक्राचार्य',
    rashiHi: ['वृषभ (Taurus)', 'तुला (Libra)'],
    lagnaHi: ['वृषभ', 'तुला', 'मकर', 'कुम्भ'],
    prohibitedLagnasHi: ['मेष', 'वृश्चिक', 'सिंह', 'धनु'],
    colorHi: 'रंगहीन पारदर्शी (Colorless D-F Water White) इन्द्रधनुषी चमक',
    colorHex: '#38BDF8',
    imageIcon: '✨',
    hardnessMohs: '१०.० (पृथ्वी का सबसे कठोरतम प्राकृतिक पदार्थ)',
    specificGravity: '३.५२',
    refractiveIndex: '२.४२',
    authenticityTests: [
      {
        testNameHi: '१. भाप / कोहरा परीक्षण (Fog Test)',
        procedureHi: 'हीरे पर मुंह से भाप छोड़ें।',
        realSignHi: 'हीरे की अत्यधिक थर्मल कंडक्टिविटी के कारण भाप एक सेकंड में तुरंत गायब हो जाती है।',
        fakeWarningHi: 'कांच या नकली जिरकॉन पर भाप ३-४ सेकंड तक जमी रहती है।'
      },
      {
        testNameHi: '२. अखबार की सुपाठ्यता परीक्षण (Read-Through Test)',
        procedureHi: 'अखबार के छोटे अक्षरों के ऊपर हीरा उल्टा करके रखें।',
        realSignHi: 'असली हीरे के उच्च अपवर्तनांक (Refractive Index) के कारण नीचे का कोई भी अक्षर पढ़ा नहीं जा सकता।',
        fakeWarningHi: 'कांच या मोइसेनाइट के पार अखबार के अक्षर साफ दिखाई दे जाते हैं।'
      }
    ],
    benefitsHi: [
      'लक्ज़री जीवन, सिनेमा, मॉडलिंग, फैशन व कला में विश्वस्तरीय ख्याति।',
      'दांपत्य जीवन में अपार आकर्षण, प्रेम और रोमांस की पुनः जागृति।',
      'वाहन, बड़े बंगले और विदेशी यात्राओं के द्वार खोलता है।'
    ],
    wearingMetalHi: 'प्लैटिनम, व्हाइट गोल्ड अथवा शुद्ध चांदी',
    wearingFingerHi: 'मध्यमा अथवा कनिष्ठिका उंगली',
    wearingDayHi: 'शुक्रवार प्रातःकाल',
    wearingTithiNakshatraHi: 'शुक्ल पक्ष का शुक्रवार, भरणी, पूर्वाफाल्गुनी अथवा पूर्वाषाढ़ा नक्षत्र',
    pranaPratishthaMantra: 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः ॥ (१०८ बार)',
    substituteStoneHi: 'ओपल (दूधिया पत्थर), अमेरिकन डायमंड (CZ), सफेद जिरकॉन',
    adTitleHi: 'आईजीआई प्रमाणित प्राकृतिक सॉलिटेयर हीरा (Certified Diamond)',
    adSubtitleHi: 'भौतिक ऐश्वर्य, दांपत्य प्रेम व लक्ज़री लाइफस्टाइल का प्रतीक'
  },
  {
    id: 'neelam_blue_sapphire',
    nameHi: 'नीलम (ब्लू सफायर)',
    nameEn: 'Blue Sapphire (Neelam)',
    hindiAliases: ['नीलमणि', 'इन्द्रनील', 'शनिप्रिया'],
    planet: 'Saturn',
    planetHi: 'भगवान श्री शनिदेव',
    deityHi: 'शनि महाराज व काल भैरव',
    rashiHi: ['मकर (Capricorn)', 'कुम्भ (Aquarius)'],
    lagnaHi: ['मकर', 'कुम्भ', 'वृषभ', 'तुला'],
    prohibitedLagnasHi: ['मेष', 'कर्क', 'सिंह', 'धनु'],
    colorHi: 'मयूर कंठ नीला (Royal Blue / Cornflower Blue)',
    colorHex: '#1D4ED8',
    imageIcon: '💙',
    hardnessMohs: '९.० (अत्यंत कठोर)',
    specificGravity: '४.००',
    refractiveIndex: '१.७६ - १.७७',
    authenticityTests: [
      {
        testNameHi: '१. तीन दिवसीय तकिया परीक्षण (3-Day Trial Pillow Test)',
        procedureHi: 'नीलम धारण करने से पहले शनिवार की रात इसे नीले कपड़े में बांधकर अपने तकिए के नीचे रखें।',
        realSignHi: 'यदि रात में सुखद सपने आएं, स्वास्थ्य ठीक रहे और कोई हानि न हो, तो नीलम आपके अनुकूल है।',
        fakeWarningHi: 'यदि डरावने सपने आएं, सिरदर्द हो या झगड़ा हो, तो नीलम तुरंत हटा दें, यह आपके लिए प्रतिकूल है।'
      },
      {
        testNameHi: '२. कांच के पात्र में जल परीक्षण (Water Radiance Test)',
        procedureHi: 'कांच के गिलास में पानी भरकर नीलम डालें।',
        realSignHi: 'असली नीलम पानी में से ऊपर की ओर नीले रंग की दिव्य किरणें बिखेरता हुआ प्रतीत होता है।',
        fakeWarningHi: 'नकली नीला कांच पानी में साधारण दिखता है।'
      }
    ],
    benefitsHi: [
      'रंक को राजा बनाने की क्षमता—अचानक धन लाभ व करियर में अप्रत्याशित छलांग।',
      'शनि की साढ़ेसाती और ढैय्या के समस्त कष्टों का तत्काल शमन।',
      'दुर्घटनाओं, चोरी, कानूनी मुकदमों और गुप्त षड्यंत्रों से अभेद्य सुरक्षा।'
    ],
    wearingMetalHi: 'पंचधातु, अष्टधातु अथवा चांदी (Silver)',
    wearingFingerHi: 'मध्यमा उंगली (Middle Finger)',
    wearingDayHi: 'शनिवार सूर्यास्त के समय',
    wearingTithiNakshatraHi: 'शुक्ल पक्ष का शनिवार, पुष्य, अनुराधा अथवा उत्तराभाद्रपद नक्षत्र',
    pranaPratishthaMantra: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः ॥ (१०८ बार)',
    substituteStoneHi: 'नीली (Iolite), कटहला (Amethyst), जामुनिया',
    adTitleHi: 'प्राकृतिक सीलोन नीलम (Kashmir/Ceylon Blue Sapphire)',
    adSubtitleHi: 'साढ़ेसाती शांति, आकस्मिक धन लाभ व शनिदेव का शक्तिशाली सुरक्षा चक्र'
  },
  {
    id: 'gomed_hessonite',
    nameHi: 'गोमेद (हेसोनाइट)',
    nameEn: 'Hessonite (Gomed)',
    hindiAliases: ['राहु रत्न', 'पिङ्गलक', 'तमोमणि'],
    planet: 'Rahu',
    planetHi: 'राहु देव',
    deityHi: 'माँ सरस्वती व राहु देवता',
    rashiHi: ['कन्या (Virgo)', 'मिथुन (Gemini)'],
    lagnaHi: ['मिथुन', 'कन्या', 'वृषभ', 'तुला'],
    prohibitedLagnasHi: ['मेष', 'कर्क', 'सिंह', 'वृश्चिक'],
    colorHi: 'शहद या गोमूत्र के समान लाल-भूरा पारदर्शी (Honey / Reddish Brown)',
    colorHex: '#9A3412',
    imageIcon: '🤎',
    hardnessMohs: '७.० - ७.५',
    specificGravity: '३.६०',
    refractiveIndex: '१.७३ - १.७५',
    authenticityTests: [
      {
        testNameHi: '१. शुद्ध शहद का परीक्षण (Honey Luster Test)',
        procedureHi: 'गोमेद को सूर्य के प्रकाश में शुद्ध शहद के साथ रखकर देखें।',
        realSignHi: 'असली गोमेद बिल्कुल स्वच्छ शहद की तरह चमकता है, इसमें कोई हरी या सफेद परत नहीं होती।',
        fakeWarningHi: 'नकली पत्थर में अस्वाभाविक काले धब्बे या कांच की धारियां दिखती हैं।'
      }
    ],
    benefitsHi: [
      'राजनीति, सट्टा, शेयर बाजार व वकालत में अचानक अप्रत्याशित सफलता।',
      'अज्ञात भय, भ्रम, भूत-बाधा व अनिद्रा का तुरंत नाश।',
      'शत्रु कितने भी गुप्त षड्यंत्र रचें, उनका भेद पहले ही खुल जाता है।'
    ],
    wearingMetalHi: 'चांदी (Silver) अथवा अष्टधातु',
    wearingFingerHi: 'मध्यमा उंगली (Middle Finger)',
    wearingDayHi: 'शनिवार अथवा बुधवार रात्रि काल',
    wearingTithiNakshatraHi: 'आर्द्रा, स्वाति अथवा शतभिषा नक्षत्र',
    pranaPratishthaMantra: 'ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः ॥ (१०८ बार)',
    substituteStoneHi: 'टूर्मलीन (भूरा), अकीक (भूरा)',
    adTitleHi: 'शुद्ध सीलोनी गोमेद रत्न (Certified Hessonite Gomed)',
    adSubtitleHi: 'राहु की महादशा, शेयर बाजार लाभ व गुप्त शत्रुओं से रक्षा'
  },
  {
    id: 'lahsuniya_cats_eye',
    nameHi: 'लहसुनिया (कैट्स आई)',
    nameEn: "Cat's Eye (Lahsuniya)",
    hindiAliases: ['वैदूर्य', 'विडालक्ष', 'केतु रत्न'],
    planet: 'Ketu',
    planetHi: 'केतु देव',
    deityHi: 'भगवान श्री गणेश व केतु देवता',
    rashiHi: ['धनु (Sagittarius)', 'मीन (Pisces)'],
    lagnaHi: ['धनु', 'मीन', 'वृश्चिक'],
    prohibitedLagnasHi: ['वृषभ', 'तुला'],
    colorHi: 'पीला-हरा या धूमिल भूरा, जिसके मध्य बिल्ली की आंख जैसी सफेद चमकती रेखा चले (Chatoyancy)',
    colorHex: '#854D0E',
    imageIcon: '👁️',
    hardnessMohs: '८.५ (क्राइसोबेरिल परिवार - अत्यंत कठोर)',
    specificGravity: '३.७१',
    refractiveIndex: '१.७४ - १.७५',
    authenticityTests: [
      {
        testNameHi: '१. दूध और शहद प्रभाव (Milk & Honey Chatoyant Band)',
        procedureHi: 'रत्न को प्रकाश के नीचे धीरे-धीरे बाएं-दाएं घुमाएं।',
        realSignHi: 'असली लहसुनिया के मध्य में एक तेज सफेद रेशमी रेखा (Cat Eye Band) साफ हिलती हुई दिखेगी।',
        fakeWarningHi: 'नकली फाइबर ग्लास में रेखा टेढ़ी-मेढ़ी, टूटी हुई या धुंधली होती है।'
      }
    ],
    benefitsHi: [
      'शेयर बाजार, लॉटरी, जुआ व अप्रत्याशित स्रोतों से धन लाभ।',
      'दुर्घटनाओं, बुरी नजर व काले जादू के प्रभाव से तत्काल मुक्ति।',
      'आध्यात्मिक साधना और कुण्डलिनी जागरण में चमत्कारिक प्रगति।'
    ],
    wearingMetalHi: 'चांदी (Silver) अथवा पंचधातु',
    wearingFingerHi: 'कनिष्ठिका अथवा मध्यमा उंगली',
    wearingDayHi: 'मंगलवार अथवा शनिवार प्रातःकाल',
    wearingTithiNakshatraHi: 'अश्विनी, मघा अथवा मूल नक्षत्र',
    pranaPratishthaMantra: 'ॐ स्रां स्रीं स्रौं सः केतवे नमः ॥ (१०८ बार)',
    substituteStoneHi: 'टाइगर आई (Tiger Eye), क्वार्ट्ज कैट्स आई',
    adTitleHi: 'प्राकृतिक क्राइसोबेरिल लहसुनिया (Chrysoberyl Cat\'s Eye)',
    adSubtitleHi: 'अकस्मात धन प्राप्ति, बुरी नजर से बचाव व केतु शांति हेतु'
  }
];

export function getRecommendedGemstoneForKundali(
  lagnaSign?: string,
  moonSign?: string,
  doshas?: string[]
): {
  recommendedGemstone: GemstoneItem;
  secondaryGemstone?: GemstoneItem;
  prohibitedGemstones: GemstoneItem[];
  reasonHi: string;
} {
  const normLagna = (lagnaSign || '').split('(')[0].trim();
  const normMoon = (moonSign || '').split('(')[0].trim();

  let rec = NAVARATNA_SCIENCE_COLLECTION[0]; // default ruby
  let sec: GemstoneItem | undefined = undefined;
  let reason = '';

  if (normLagna.includes('मेष') || normMoon.includes('मेष')) {
    rec = NAVARATNA_SCIENCE_COLLECTION.find((g) => g.id === 'moonga_coral')!;
    sec = NAVARATNA_SCIENCE_COLLECTION.find((g) => g.id === 'manikya_ruby')!;
    reason = 'मेष लग्न/राशि के स्वामी मंगल देव हैं। आपके लिए लाल मूंगा (Moonga) जीवन रक्षक व भाग्योदय कारक भाग्य रत्न है।';
  } else if (normLagna.includes('वृषभ') || normMoon.includes('वृषभ')) {
    rec = NAVARATNA_SCIENCE_COLLECTION.find((g) => g.id === 'heera_diamond')!;
    sec = NAVARATNA_SCIENCE_COLLECTION.find((g) => g.id === 'panna_emerald')!;
    reason = 'वृषभ लग्न के स्वामी शुक्र देव हैं। आपके लिए ओपल या हीरा (Diamond) ऐश्वर्य, दांपत्य सुख व धन वृद्धि हेतु परम शुभ है।';
  } else if (normLagna.includes('मिथुन') || normMoon.includes('मिथुन')) {
    rec = NAVARATNA_SCIENCE_COLLECTION.find((g) => g.id === 'panna_emerald')!;
    sec = NAVARATNA_SCIENCE_COLLECTION.find((g) => g.id === 'heera_diamond')!;
    reason = 'मिथुन राशि/लग्न के स्वामी बुध देव हैं। आपके लिए जाम्बियन पन्ना (Emerald) व्यापार, करियर व तीव्र बुद्धि हेतु सर्वोत्तम है।';
  } else if (normLagna.includes('कर्क') || normMoon.includes('कर्क')) {
    rec = NAVARATNA_SCIENCE_COLLECTION.find((g) => g.id === 'moti_pearl')!;
    sec = NAVARATNA_SCIENCE_COLLECTION.find((g) => g.id === 'pukhraj_yellow_sapphire')!;
    reason = 'कर्क लग्न के स्वामी चन्द्रमा हैं। आपके लिए प्राकृतिक सच्चा मोती (Pearl) मानसिक शांति, क्रोध शमन व भाग्योदय हेतु अचूक है।';
  } else if (normLagna.includes('सिंह') || normMoon.includes('सिंह')) {
    rec = NAVARATNA_SCIENCE_COLLECTION.find((g) => g.id === 'manikya_ruby')!;
    sec = NAVARATNA_SCIENCE_COLLECTION.find((g) => g.id === 'moonga_coral')!;
    reason = 'सिंह लग्न के स्वामी साक्षात् सूर्य नारायण हैं। आपके लिए माणिक्य (Ruby) धारण करने से सरकारी पद, यश व अटूट प्रभाव मिलता है।';
  } else if (normLagna.includes('कन्या') || normMoon.includes('कन्या')) {
    rec = NAVARATNA_SCIENCE_COLLECTION.find((g) => g.id === 'panna_emerald')!;
    sec = NAVARATNA_SCIENCE_COLLECTION.find((g) => g.id === 'heera_diamond')!;
    reason = 'कन्या लग्न के स्वामी बुध देव हैं। आपके लिए पन्ना रत्न स्वास्थ्य, व्यापार व आर्थिक स्थिरता प्रदान करता है।';
  } else if (normLagna.includes('तुला') || normMoon.includes('तुला')) {
    rec = NAVARATNA_SCIENCE_COLLECTION.find((g) => g.id === 'heera_diamond')!;
    sec = NAVARATNA_SCIENCE_COLLECTION.find((g) => g.id === 'neelam_blue_sapphire')!;
    reason = 'तुला लग्न के स्वामी शुक्र देव हैं और शनि योगकारक हैं। आपके लिए हीरा या ओपल सर्वोत्तम भाग्य रत्न है।';
  } else if (normLagna.includes('वृश्चिक') || normMoon.includes('वृश्चिक')) {
    rec = NAVARATNA_SCIENCE_COLLECTION.find((g) => g.id === 'moonga_coral')!;
    sec = NAVARATNA_SCIENCE_COLLECTION.find((g) => g.id === 'pukhraj_yellow_sapphire')!;
    reason = 'वृश्चिक लग्न के स्वामी मंगल देव हैं। आपके लिए इतालवी लाल मूंगा साहस, भूमि लाभ व मांगलिक दोष निवारण करता है।';
  } else if (normLagna.includes('धनु') || normMoon.includes('धनु')) {
    rec = NAVARATNA_SCIENCE_COLLECTION.find((g) => g.id === 'pukhraj_yellow_sapphire')!;
    sec = NAVARATNA_SCIENCE_COLLECTION.find((g) => g.id === 'manikya_ruby')!;
    reason = 'धनु लग्न के स्वामी देवगुरु बृहस्पति हैं। आपके लिए पीला पुखराज (Yellow Sapphire) ज्ञान, धन, विवाह व अध्यात्म का वरदान है।';
  } else if (normLagna.includes('मकर') || normMoon.includes('मकर')) {
    rec = NAVARATNA_SCIENCE_COLLECTION.find((g) => g.id === 'neelam_blue_sapphire')!;
    sec = NAVARATNA_SCIENCE_COLLECTION.find((g) => g.id === 'panna_emerald')!;
    reason = 'मकर लग्न के स्वामी शनिदेव हैं। आपके लिए नीलम या नीली रत्न साढ़ेसाती का शमन कर अकूत उन्नति देता है।';
  } else if (normLagna.includes('कुम्भ') || normMoon.includes('कुम्भ')) {
    rec = NAVARATNA_SCIENCE_COLLECTION.find((g) => g.id === 'neelam_blue_sapphire')!;
    sec = NAVARATNA_SCIENCE_COLLECTION.find((g) => g.id === 'heera_diamond')!;
    reason = 'कुम्भ लग्न के स्वामी शनिदेव हैं। आपके लिए नीलम व हीरा अनुकूल रत्न हैं जो जीवन में स्थायित्व व अचानक धन लाते हैं।';
  } else if (normLagna.includes('मीन') || normMoon.includes('मीन')) {
    rec = NAVARATNA_SCIENCE_COLLECTION.find((g) => g.id === 'pukhraj_yellow_sapphire')!;
    sec = NAVARATNA_SCIENCE_COLLECTION.find((g) => g.id === 'moti_pearl')!;
    reason = 'मीन लग्न के स्वामी देवगुरु बृहस्पति हैं और चन्द्रमा पंचमेश हैं। पुखराज व मोती आपके लिए अमोघ फलदायक हैं।';
  } else {
    rec = NAVARATNA_SCIENCE_COLLECTION[0];
    sec = NAVARATNA_SCIENCE_COLLECTION[4];
    reason = 'आपकी कुण्डली के अनुसार सूर्य व देवगुरु की कृपा हेतु माणिक्य अथवा पुखराज धारण करना अति शुभ है।';
  }

  // Calculate prohibited gemstones
  const prohibited = NAVARATNA_SCIENCE_COLLECTION.filter((g) =>
    g.prohibitedLagnasHi.some((p) => normLagna.includes(p) || normMoon.includes(p))
  );

  return {
    recommendedGemstone: rec,
    secondaryGemstone: sec,
    prohibitedGemstones: prohibited,
    reasonHi: reason
  };
}

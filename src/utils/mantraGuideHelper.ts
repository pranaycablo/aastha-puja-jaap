import { MantraItem, DeityType, MalaBeadVisualType } from '../types';

export interface DetailedMantraGuide {
  aasan: string;
  aasanColor: string;
  disha: string;
  shubhSamay: string;
  visheshTithi: string;
  malaType: MalaBeadVisualType;
  malaName: string;
  malaVidhi: string;
  siddhiCount: string;
  anushthanDays: string;
  dashanshHavan: string;
  niyamList: string[];
  pujaSamagriList: string[];
  sankalpVidhi: string;
  dhyanShloka: string;
  dhyanShlokaHindi: string;
  pavitrikaranMantra: string;
  achamanVidhi: string;
  deepakPrarthana: string;
  bhumiPrarthana: string;
  samarpanMantra: string;
  kshamaPrarthana: string;
  phalshruti: string;
  sthan?: string;
  mudra?: string;
  siddhiVidhiText?: string;
}

const COMMON_PAVITRIKARAN = 'ॐ अपवित्रः पवित्रो वा सर्वावस्थां गतोऽपि वा। यः स्मरेत्पुण्डरीकाक्षं स बाह्याभ्यन्तरः शुचिः॥';
const COMMON_ACHAMAN = 'दाहिने हाथ में जल लेकर तीन बार आचमन करें:\n१. ॐ केशवाय नमः (जल ग्रहण करें)\n२. ॐ माधवाय नमः (जल ग्रहण करें)\n३. ॐ नारायणाय नमः (जल ग्रहण करें)\n४. ॐ हृषीकेशाय नमः (हाथ धो लें)';
const COMMON_DEEPAK = 'शुभं करोति कल्याणमारोग्यं धनसंपदाम्। शत्रुबुद्धिविनाशाय दीपज्योतिर्नमोऽस्तु ते॥';
const COMMON_BHUMI = 'ॐ पृथ्वि त्वया धृता लोका देवि त्वं विष्णुना धृता। त्वं च धारय मां देवि पवित्रं कुरु चासनम्॥';
const COMMON_SAMARPAN = 'गुह्यातिगुह्यगोप्ता त्वं गृहाणास्मत्कृतं जपम्। सिद्धिर्भवतु मे देव त्वत्प्रसादान्महेश्वर॥\n(हे प्रभु! आप गुप्त से भी गुप्त रहस्यों के रक्षक हैं, मेरे द्वारा किए गए इस जप को स्वीकार करें और अपनी कृपा से मुझे सिद्धि प्रदान करें।)';
const COMMON_KSHAMA = 'अपराधसहस्त्राणि क्रियन्तेऽहर्निशं मया। दासोऽयमिति मां मत्वा क्षमस्व परमेश्वर॥\nआवाहनं न जानामि न जानामि विसर्जनम्। पूजां चैव न जानामि क्षमस्व परमेश्वर॥';

function getBaseDeityGuide(mantra: MantraItem, language: 'hi' | 'en' = 'hi'): DetailedMantraGuide {
  const isHi = language === 'hi';
  const deity = mantra.deity;

  switch (deity) {
    case 'shiva':
      return {
        aasan: isHi ? 'शुद्ध कुशासन अथवा श्वेत/पीला ऊनी कम्बल आसन' : 'Kusha grass mat or pure white woolen asan',
        aasanColor: isHi ? 'श्वेत अथवा पीला' : 'White or Yellow',
        disha: isHi ? 'उत्तर दिशा (ईशान कोण - भगवान शिव की दिशा)' : 'North or North-East (Ishan corner)',
        shubhSamay: mantra.bestTiming || (isHi ? 'ब्रह्म मुहूर्त (प्रातः ४:०० से ६:००) अथवा प्रदोष काल (सूर्यास्त वेला)' : 'Brahma Muhurta (4:00 - 6:00 AM) or Pradosh twilight'),
        visheshTithi: isHi ? 'प्रत्येक सोमवार, मासिक शिवरात्रि, महाशिवरात्रि, सावन मास अथवा प्रदोष व्रत' : 'Mondays, Pradosh, Shivaratri, and Shravan month',
        malaType: 'rudraksha',
        malaName: isHi ? 'असली पंचमुखी रुद्राक्ष माला (१०८ मनके)' : 'Authentic 5-Mukhi Rudraksha Mala (108 beads)',
        malaVidhi: isHi ? 'माला को हृदय के समीप गोमुखी झोली में रखें। सुमेरु (मेरु मनका) को न लांघें, १०८ पर माला पलटें।' : 'Keep mala in Gomukhi bag near heart. Do not cross the Meru bead.',
        siddhiCount: mantra.targetCountSiddhi || (isHi ? '१,२५,००० महामंत्र जप (४० दिनों में नित्य ३१ माला)' : '1,25,000 chants in 40 days (31 malas daily)'),
        anushthanDays: isHi ? '२१ दिन, ४० दिन अथवा महाशिवरात्रि पर अखंड रात्रि अनुष्ठान' : '21 days, 40 days or all-night Shivaratri vigil',
        dashanshHavan: isHi ? 'जप पूर्ण होने पर १०% दशांश हवन (बिल्वपत्र, खीर, शुद्ध घी, काले तिल) अथवा १२,५०० अतिरिक्त जप' : '10% Havan with Bel leaves, kheer, pure ghee or 10% extra chanting',
        niyamList: isHi ? [
          'साधना काल में पूर्ण ब्रह्मचर्य व सत्य का आचरण करें।',
          'तामसिक भोजन (लहसुन, प्याज, मांसाहार, मदिरा) का पूर्ण त्याग करें।',
          'नित्य एक ही स्थान, एक ही समय व एक ही आसन पर बैठकर जप करें।',
          'जप काल में मौन रहें, बीच में वार्तालाप या उठना वर्जित है।',
          'साधना व मिले हुए शुभ अनुभवों को सदा गुप्त रखें।'
        ] : [
          'Maintain complete celibacy and truthfulness during sadhana.',
          'Strictly avoid onion, garlic, alcohol and non-veg food.',
          'Sit at the exact same sacred spot, time, and mat daily.',
          'Observe silence while chanting; avoid talking or standing up.',
          'Keep your spiritual experiences and sadhana strictly private.'
        ],
        pujaSamagriList: mantra.samagri ? [mantra.samagri] : (isHi ? [
          'गाय के शुद्ध घी का दीपक (दाहिनी ओर स्थापित करें)',
          'तांबे के लोटे में गंगाजल युक्त शुद्ध जल',
          'बिल्वपत्र (बेलपत्र), सफेद चन्दन, भस्म व अक्षत',
          'धूप, अगरबत्ती व सुगंधित सफेद पुष्प',
          'भोग हेतु मिश्री, मखाने अथवा कच्चा दूध'
        ] : [
          'Pure cow ghee lamp placed on the right side',
          'Pure water with Gangajal in a copper pot',
          'Bel leaves, white sandalwood paste and sacred Bhasma',
          'Incense sticks and fresh white flowers',
          'Offering of rock sugar, makhana or fresh milk'
        ]),
        sankalpVidhi: isHi
          ? 'दाहिने हाथ में जल, अक्षत, पुष्प व सिक्का लेकर कहें: "हे देवाधिदेव महादेव! मैं (अपना नाम), गोत्र (गोत्र), अपनी मनोकामना सिद्धि हेतु श्री \'' + mantra.name + '\' का यह पावन जप अनुष्ठान आरंभ करता हूँ। मेरी साधना निर्विघ्न पूर्ण हो।"'
          : 'Hold water, unbroken rice and flower: "O Mahadev! I (name), gotra (gotra), dedicate this sacred chanting for divine fulfillment."',
        dhyanShloka: 'ध्यायेन्नित्यं महेशं रजतगिरिनिभं चारुचंद्रावतंसं\nरत्नाकल्पोज्ज्वलाङ्गं परशुमृगवराभीतिहस्तं प्रसन्नम्।\nपद्मासीनं समन्तात् स्तुतममरगणैर्व्याघ्रकृत्तिं वसानं\nविश्वाद्यं विश्वबीजं निखिलभयहरं पञ्चवक्त्रं त्रिनेत्रम्॥',
        dhyanShlokaHindi: 'कैलाश पर्वत के समान उज्ज्वल कांति वाले, मस्तक पर अर्धचंद्र धारण किए, परशु व मृग मुद्रा से युक्त, व्याघ्रचर्मधारी, पांच मुख और त्रिनेत्रधारी भगवान शिव का अपने हृदय कमल में शांत भाव से ध्यान करें।',
        pavitrikaranMantra: COMMON_PAVITRIKARAN,
        achamanVidhi: COMMON_ACHAMAN,
        deepakPrarthana: COMMON_DEEPAK,
        bhumiPrarthana: COMMON_BHUMI,
        samarpanMantra: COMMON_SAMARPAN,
        kshamaPrarthana: COMMON_KSHAMA,
        phalshruti: mantra.benefits || (isHi ? 'अकाल मृत्यु से रक्षा, समस्त रोगों का शमन, मानसिक शांति, कालसर्प दोष शांति व मोक्ष की प्राप्ति।' : 'Protection from untimely harm, dispelling ailments, peace and liberation.')
      };

    case 'hanuman':
      return {
        aasan: isHi ? 'लाल ऊनी कम्बल अथवा कुशासन' : 'Red woolen blanket or Kusha mat',
        aasanColor: isHi ? 'गहरा लाल अथवा सिंदूरी' : 'Deep Red or Vermilion',
        disha: isHi ? 'पूर्व अथवा दक्षिण दिशा (दक्षिण मुखी हनुमान साधना विशेष फलदायी)' : 'East or South (especially powerful for Dakshin-mukhi Hanuman)',
        shubhSamay: mantra.bestTiming || (isHi ? 'प्रातः सूर्योदय वेला अथवा संध्या काल (सायं ६:०० से ८:००)' : 'Sunrise dawn or twilight dusk (6:00 - 8:00 PM)'),
        visheshTithi: isHi ? 'प्रत्येक मंगलवार, शनिवार, हनुमान जयंती अथवा सुंदरकांड पाठ दिवस' : 'Tuesdays, Saturdays, Hanuman Jayanti',
        malaType: 'rudraksha',
        malaName: isHi ? 'रुद्राक्ष माला अथवा रक्त चन्दन / तुलसी माला (१०८ मनके)' : 'Rudraksha, Red Sandalwood or Tulsi Mala',
        malaVidhi: isHi ? 'तर्जनी उंगली का स्पर्श न करें, मध्यमा और अंगूठे से मनका आगे बढ़ाएं।' : 'Do not touch with index finger; slide beads with middle finger and thumb.',
        siddhiCount: mantra.targetCountSiddhi || (isHi ? '११,००० जप (२१ दिनों में नित्य ५ माला) अथवा १०० चालीसा पाठ' : '11,000 chants in 21 days or 100 Chalisa recitations'),
        anushthanDays: isHi ? '२१ दिन अथवा ४० मंगलवार अखंड पाठ' : '21 days or 40 consecutive Tuesdays',
        dashanshHavan: isHi ? '१०८ बार आहुति (आम की लकड़ी, चमेली का तेल, कपूर, गुड़-चना)' : '108 Havan offerings with mango wood, jasmine oil, camphor, jaggery-gram',
        niyamList: isHi ? [
          'पूर्ण ब्रह्मचर्य का कठोरता से पालन करें।',
          'साधना अवधि में क्रोध, ईर्ष्या व असत्य वाणी से बचें।',
          'नित्य श्री हनुमान चालीसा अथवा बजरंग बाण का पाठ करें।',
          'घर में स्त्री व बड़ों का आदर करें, सेवा भाव रखें।',
          'लाल अथवा सिंदूरी वस्त्र पहनकर साधना में बैठें।'
        ] : [
          'Strictly observe celibacy and mental purity.',
          'Refrain from anger, jealousy, and harsh speech.',
          'Recite Hanuman Chalisa or Bajrang Baan before starting.',
          'Show utmost respect to elders and women at home.',
          'Wear clean red or saffron clothes during chanting.'
        ],
        pujaSamagriList: mantra.samagri ? [mantra.samagri] : (isHi ? [
          'चमेली के तेल व सिंदूर का दीपक',
          'गुड़-चना, बूंदी के लड्डू अथवा चूरमा का भोग',
          'ताजे लाल गुलाब या गेंदे के पुष्प',
          'तुलसी दल (हनुमान जी के भोग में अनिवार्य)',
          'मीठा पान (लौंग व इलायची युक्त)'
        ] : [
          'Lamp with jasmine oil and vermilion (sindoor)',
          'Offering of jaggery-roasted gram or boondi laddus',
          'Fresh red roses or marigold garland',
          'Tulsi leaves (essential with Hanuman bhog)',
          'Sweet betel leaf with clove and cardamom'
        ]),
        sankalpVidhi: isHi
          ? 'दाहिने हाथ में जल, तुलसी दल व अक्षत लेकर बोलें: "हे पवनपुत्र संकटमोचन हनुमान जी! मैं (अपना नाम), गोत्र (गोत्र), समस्त भय व विघ्न निवारण हेतु श्री \'' + mantra.name + '\' का जप आरंभ करता हूँ। मुझ पर अपनी कृपा दृष्टि रखें।"'
          : 'Hold water and Tulsi leaf and affirm: "O Sankatmochan Hanuman Ji! I (name) take this solemn vow for removing all hurdles."',
        dhyanShloka: 'अतुलितबलधामं हेमशैलाभदेहं\nदनुजवनकृशानुं ज्ञानिनामग्रगण्यम्।\nसकलगुणनिधानं वानराणामधीशं\nरघुपतिप्रियभक्तं वातजातं नमामि॥',
        dhyanShlokaHindi: 'स्वर्ण पर्वत के समान कांति वाले, ज्ञानियों में श्रेष्ठ, समस्त गुणों के धाम, दानवरूपी वन को भस्म करने वाले अग्निस्वरूप, प्रभु श्री राम के परम भक्त पवनपुत्र हनुमान जी का हृदय में ध्यान करें।',
        pavitrikaranMantra: COMMON_PAVITRIKARAN,
        achamanVidhi: COMMON_ACHAMAN,
        deepakPrarthana: COMMON_DEEPAK,
        bhumiPrarthana: COMMON_BHUMI,
        samarpanMantra: COMMON_SAMARPAN,
        kshamaPrarthana: COMMON_KSHAMA,
        phalshruti: mantra.benefits || (isHi ? 'भूत-पिशाच भय नाश, शत्रु पराजय, साहस वृद्धि, शनि पीड़ा शांति व समस्त बिगड़े कार्यों की त्वरित सिद्धि।' : 'Removes fear, dispels negative entities, grants victory and unstoppable courage.')
      };

    case 'ram':
    case 'krishna':
    case 'vishnu':
      return {
        aasan: isHi ? 'पीला रेशमी वस्त्र अथवा श्वेत ऊनी कम्बल आसन' : 'Yellow silk or white woolen mat',
        aasanColor: isHi ? 'पीला (पीताम्बरी) अथवा श्वेत' : 'Yellow or White',
        disha: isHi ? 'पूर्व अथवा उत्तर दिशा' : 'East or North',
        shubhSamay: mantra.bestTiming || (isHi ? 'ब्रह्म मुहूर्त (प्रातः ४:०० - ६:००) अथवा संध्या संकीर्तन काल' : 'Brahma Muhurta (4:00 - 6:00 AM) or evening Aarti'),
        visheshTithi: isHi ? 'प्रत्येक एकादशी, रामनवमी, जन्माष्टमी, शरद पूर्णिमा अथवा गुरुवार' : 'Ekadashi, Ram Navami, Janmashtami, Thursdays',
        malaType: 'tulsi',
        malaName: isHi ? 'पवित्र श्यामा तुलसी माला (१०८ मनके)' : 'Sacred Shyama Tulsi Mala (108 beads)',
        malaVidhi: isHi ? 'तुलसी माला पर नाम जप अत्यंत मोक्षदायक है। नित्य स्नान उपरांत ही जपें।' : 'Tulsi mala bestows supreme grace. Chant only after holy bath.',
        siddhiCount: mantra.targetCountSiddhi || (isHi ? 'नित्य १६ माला अथवा १,२५,००० पावन नाम संकीर्तन' : '16 malas daily or 1,25,000 divine holy names'),
        anushthanDays: isHi ? '२१ दिन, ४० दिन अथवा आजीवन नित्य नियम' : '21 days, 40 days or lifelong daily chanting',
        dashanshHavan: isHi ? 'नाम जप में हवन के स्थान पर १०% अतिरिक्त जप व दीन-दुखियों को भोजन' : '10% additional chanting and feeding the needy instead of havan',
        niyamList: isHi ? [
          'वैष्णव सदाचार, दया, करुणा व अहिंसा का भाव रखें।',
          'समस्त जीवों के प्रति प्रेम रखें, किसी का दिल न दुखाएं।',
          'मांस, मदिरा, जुआ व परनिंदा से पूर्ण दूर रहें।',
          'नित्य रामायण अथवा भगवद्गीता के किसी एक श्लोक का मनन करें।',
          'मस्तक पर गोपीचन्दन अथवा पीला चन्दन तिलक लगाएं।'
        ] : [
          'Cultivate compassion, kindness and non-violence.',
          'Never hurt or demean any living being.',
          'Completely abstain from intoxicants, gambling and gossip.',
          'Study at least one verse of Ramayana or Gita daily.',
          'Wear yellow sandalwood tilak on forehead.'
        ],
        pujaSamagriList: mantra.samagri ? [mantra.samagri] : (isHi ? [
          'गाय के शुद्ध घी का दीपक',
          'तुलसी दल व तुलसी मंजरी',
          'पीला चन्दन, पीले पुष्प (गेंदा)',
          'भोग: माखन-मिश्री, मौसमी फल, पंजीरी',
          'गंगाजल से आचमन'
        ] : [
          'Pure cow ghee lamp',
          'Fresh Tulsi leaves and buds',
          'Yellow sandalwood paste and yellow flowers',
          'Offering of fresh butter with rock candy, fruits',
          'Gangajal for purification'
        ]),
        sankalpVidhi: isHi
          ? 'हाथ में तुलसी दल व जल लेकर बोलें: "हे परम दयालु प्रभु! मैं (अपना नाम), गोत्र (गोत्र), आपकी अनन्य प्रेमाभक्ति, आत्मिक शांति व परम कल्याण हेतु श्री \'' + mantra.name + '\' का जप करता हूँ।"'
          : 'Holding Tulsi leaf and water, say: "O all-merciful Lord! I offer this sacred chant for unalloyed devotion and supreme peace."',
        dhyanShloka: deity === 'ram'
          ? 'नीलाम्बुजश्यामलकोमलाङ्गं सीतासमारोपितवामभागम्।\nपाणौ महासायकचारुचापं नमामि रामं रघुवंशनाथम्॥'
          : 'कस्तूरीतिलकं ललाटपटले वक्षःस्थले कौस्तुभं\nनासाग्रे वरमौक्तिकं करतले वेणुं करे कङ्कणम्।\nसर्वाङ्गे हरिचन्दनं सुललितं कण्ठे च मुक्तावलिं\nगोपस्त्रीपरिवेष्टितो विजयते गोपालचूडामणिः॥',
        dhyanShlokaHindi: deity === 'ram'
          ? 'नीले कमल के समान श्याम व कोमल अंगों वाले, जिनकी बाईं ओर जनकनंदिनी माँ सीता विराजित हैं, जिनके हाथों में धनुष-बाण सुशोभित हैं, उन मर्यादा पुरुषोत्तम श्री राम का ध्यान करें।'
          : 'ललाट पर कस्तूरी तिलक, वक्षस्थल पर कौस्तुभ मणि, हाथों में बांसुरी, सर्वांग में चन्दन और गोपियों से घिरे आनंदकंद भगवान श्री कृष्ण का ध्यान करें।',
        pavitrikaranMantra: COMMON_PAVITRIKARAN,
        achamanVidhi: COMMON_ACHAMAN,
        deepakPrarthana: COMMON_DEEPAK,
        bhumiPrarthana: COMMON_BHUMI,
        samarpanMantra: COMMON_SAMARPAN,
        kshamaPrarthana: COMMON_KSHAMA,
        phalshruti: mantra.benefits || (isHi ? 'समस्त पापों का नाश, मन में असीम आनंद, मानसिक क्लेशों से मुक्ति व अंतकाल में परम पद।' : 'Destroys past karmic debts, radiates supreme joy and attains supreme liberation.')
      };

    case 'durga_kali':
    case 'baglamukhi':
      return {
        aasan: isHi ? 'रक्त लाल ऊनी कम्बल अथवा कुशासन' : 'Red woolen blanket or Kusha mat',
        aasanColor: isHi ? 'रक्त लाल अथवा पीला' : 'Blood Red or Yellow',
        disha: isHi ? 'उत्तर अथवा पूर्व दिशा' : 'North or East',
        shubhSamay: mantra.bestTiming || (isHi ? 'प्रातः सूर्योदय अथवा रात्रि निशीथ काल (रात्रि १०:०० से १:००)' : 'Sunrise dawn or Nishitha midnight (10:00 PM - 1:00 AM)'),
        visheshTithi: isHi ? 'नवरात्रि (चैत्र व शारदीय), अष्टमी, नवमी अथवा प्रत्येक शुक्रवार' : 'Navratri, Ashtami, Navami, Fridays',
        malaType: 'rudraksha',
        malaName: isHi ? 'रक्त चन्दन माला, स्फटिक अथवा रुद्राक्ष माला (१०८ मनके)' : 'Red Sandalwood, Sphatik or Rudraksha Mala',
        malaVidhi: isHi ? 'माँ की साधना में माला की शुद्धता व पवित्रता परम आवश्यक है।' : 'Purity of mala is paramount in Shakti sadhana.',
        siddhiCount: mantra.targetCountSiddhi || (isHi ? '१,२५,००० नवार्ण महामंत्र अथवा २१ दिनों में नित्य ११ पाठ' : '1,25,000 Navarna Mantra or 11 daily recitations'),
        anushthanDays: isHi ? '९ दिन (नवरात्रि में), २१ दिन अथवा ४० दिन' : '9 days (Navratri), 21 days or 40 days',
        dashanshHavan: isHi ? 'हवन में काले तिल, जौ, गूगल, घी, खीर व लौंग के जोड़े की आहुति' : 'Havan with black sesame, barley, guggul, ghee and clove pairs',
        niyamList: isHi ? [
          'पूर्ण कायिक, वाचिक व मानसिक ब्रह्मचर्य का पालन करें।',
          'साधना काल में भूमि पर शयन (बिना गद्दे के) करें।',
          'कन्याओं को साक्षात माँ का रूप मानकर चरण स्पर्श करें।',
          'किसी पर भी अनुचित क्रोध या दुर्भावना न रखें।',
          'अंतिम दिन कन्या पूजन (हलवा-चना, चुनरी) अनिवार्य है।'
        ] : [
          'Maintain absolute physical, verbal and mental celibacy.',
          'Sleep on a floor mat without mattress during sadhana.',
          'Revere young girls as living embodiments of the Divine Mother.',
          'Harbor no malice or destructive intent towards anyone.',
          'Perform Kanya Puja (feeding young girls) on final day.'
        ],
        pujaSamagriList: mantra.samagri ? [mantra.samagri] : (isHi ? [
          'अखंड घी का दीपक (अथवा तिल के तेल का दीपक)',
          'लाल चुनरी, सिंदूर, कुमकुम, अक्षत व लौंग का जोड़ा',
          'कपूर, नारियल व बताशे',
          'हलवा-चना व खीर का भोग',
          'लाल अड़हुल (गुड़हल) अथवा गुलाब के पुष्प'
        ] : [
          'Akhand deep or pure sesame oil lamp',
          'Red chunri, sindoor, kumkum and unbroken rice',
          'Pairs of cloves, cardamom, camphor and coconut',
          'Offering of halwa, black gram and kheer',
          'Fresh red hibiscus or red rose garland'
        ]),
        sankalpVidhi: isHi
          ? 'जल, लाल पुष्प व अक्षत हाथ में लेकर कहें: "हे जगदम्बे आदिशक्ति माँ! मैं (अपना नाम), गोत्र (गोत्र), समस्त विघ्न नाश, रक्षा व अभीष्ट सिद्धि हेतु श्री \'' + mantra.name + '\' का अनुष्ठान आरंभ करता हूँ। मुझे विजय व अभय प्रदान करें।"'
          : 'Hold water, red flower and rice, affirming: "O Divine Mother Jagadamba! I begin this sacred chanting for your impenetrable shield and complete victory."',
        dhyanShloka: 'विद्युद्दामसमप्रभां मृगपतिस्कन्धस्थितां भीषणां\nकन्याभिः करवालखेटविलसद्धस्ताभिरासेविताम्।\nहस्तैश्चक्रगदासिखेटविशिखांश्चापं गुणं तर्जनीं\nविभ्राणामनलात्मिकां शशिधरां दुर्गां त्रिनेत्रां भजे॥',
        dhyanShlokaHindi: 'सिंह पर आरूढ़, अष्टभुजाओं में चक्र, गदा, तलवार व धनुष-बाण धारण किए, त्रिनेत्रधारिणी, भक्तों को अभय और दुष्टों का संहार करने वाली जगदम्बा माँ दुर्गा का ध्यान करें।',
        pavitrikaranMantra: COMMON_PAVITRIKARAN,
        achamanVidhi: COMMON_ACHAMAN,
        deepakPrarthana: COMMON_DEEPAK,
        bhumiPrarthana: COMMON_BHUMI,
        samarpanMantra: COMMON_SAMARPAN,
        kshamaPrarthana: COMMON_KSHAMA,
        phalshruti: mantra.benefits || (isHi ? 'शत्रु पराजय, कोर्ट-कचहरी में विजय, तंत्र-बाधा का नाश, अभेद्य सुरक्षा कवच व आत्मबल।' : 'Victory over adversaries, legal triumph, removal of malefic influences, impenetrable divine shield.')
      };

    case 'lakshmi_kuber':
      return {
        aasan: isHi ? 'लाल रेशमी अथवा गुलाबी ऊनी आसन' : 'Red silk or pink woolen asan',
        aasanColor: isHi ? 'लाल अथवा सुनहरी पीला' : 'Red or Golden Yellow',
        disha: isHi ? 'उत्तर दिशा (कुबेर देव की दिशा) अथवा पूर्व दिशा' : 'North (Kuber direction) or East',
        shubhSamay: mantra.bestTiming || (isHi ? 'प्रदोष काल (गोधूलि वेला), शुक्रवार रात्रि अथवा रवि-पुष्य योग' : 'Pradosh twilight, Friday night or Ravi-Pushya yoga'),
        visheshTithi: isHi ? 'प्रत्येक शुक्रवार, पूर्णिमा, धनतेरस, दीपावली अथवा अक्षय तृतीया' : 'Fridays, Full Moon (Purnima), Dhanteras, Diwali',
        malaType: 'kamalgatta',
        malaName: isHi ? 'असली कमलगट्टे की माला अथवा स्फटिक माला (१०८ मनके)' : 'Authentic Kamalgatta (Lotus seed) or Sphatik Mala',
        malaVidhi: isHi ? 'कमलगट्टा माला माँ लक्ष्मी को अति प्रिय है। जप करते समय मन शांत रखें।' : 'Lotus seed mala is dearest to Maa Lakshmi. Keep mind joyous.',
        siddhiCount: mantra.targetCountSiddhi || (isHi ? '२१ दिनों में २१,००० अथवा १,२५,००० महालक्ष्मी जप' : '21,000 in 21 days or 1,25,000 for Mahalakshmi siddhi'),
        anushthanDays: isHi ? '२१ दिन अथवा ४० दिन नित्य अखंड अनुष्ठान' : '21 or 40 consecutive days of focused sadhana',
        dashanshHavan: isHi ? 'खीर, मखाने, कमलगट्टा व शुद्ध देसी घी से १०% दशांश हवन' : '10% Havan using kheer, makhana, lotus seeds, pure ghee',
        niyamList: isHi ? [
          'घर व पूजा स्थान को दर्पण की भांति स्वच्छ रखें।',
          'घर में कलह-क्लेश न होने दें, मधुर वाणी का प्रयोग करें।',
          'संध्या के समय कभी न सोएं और न ही झाड़ू लगाएं।',
          'स्त्री शक्ति (माता, पत्नी, बहन, कन्या) का परम आदर करें।',
          'शुक्रवार को खट्टी वस्तुओं का सेवन न करें।'
        ] : [
          'Keep home and altar impeccably clean and fragrant.',
          'Maintain peace at home; speak softly and lovingly.',
          'Never sleep or sweep the floors during evening twilight.',
          'Deeply honor women and daughters as living Lakshmi.',
          'Avoid sour foods on Fridays during the sadhana.'
        ],
        pujaSamagriList: mantra.samagri ? [mantra.samagri] : (isHi ? [
          'गाय के शुद्ध देसी घी का दीपक (अखंड ज्योति उत्तम)',
          'कमल के पुष्प अथवा ताजे लाल गुलाब',
          'गुलाब का प्राकृतिक इत्र व कुमकुम',
          'श्री यंत्र अथवा लक्ष्मी-गणेश-कुबेर विग्रह',
          'भोग हेतु खीर, बताशे, अनार अथवा पंचमेवा'
        ] : [
          'Pure cow ghee lamp (Akhand deep is ideal)',
          'Fresh lotus flowers or red roses',
          'Natural rose attar (itra) and kumkum',
          'Shri Yantra or Lakshmi-Ganesh-Kuber idol',
          'Sweet rice pudding (kheer), pomegranate, dry fruits'
        ]),
        sankalpVidhi: isHi
          ? 'हाथ में जल, अक्षत व सिक्का लेकर कहें: "हे महालक्ष्मी! हे कुबेर देव! मैं (अपना नाम), गोत्र (गोत्र), आपके अनुग्रह से अखंड धन, ऐश्वर्य व ऋणमुक्ति हेतु श्री \'' + mantra.name + '\' का जप करता हूँ।"'
          : 'Hold water, unbroken rice and a coin: "O Mahalakshmi & Kuber Dev! I invoke your boundless wealth, stability, and freedom from debt."',
        dhyanShloka: 'वन्दे पद्मकरां प्रसन्नवदनां सौभाग्यदां भाग्यदां\nहस्ताभ्यामभयप्रदां मणिकणैर्नानाविधैर्भूषिताम्।\nभक्ताभीष्टफलप्रदां हरिवधूं सौन्दर्यशोभासखीं\nपद्मोल्लासमुखीं त्रिलोकजननीं तुष्टां च सम्प्रार्थये॥',
        dhyanShlokaHindi: 'कमल पुष्प पर आसीन, प्रसन्न मुख, दोनों हाथों में अभय व वरदान मुद्रा लिए, नानाविध रत्नों से अलंकृत, भगवान श्री विष्णु की अर्धांगिनी भगवती महालक्ष्मी का ध्यान करें।',
        pavitrikaranMantra: COMMON_PAVITRIKARAN,
        achamanVidhi: COMMON_ACHAMAN,
        deepakPrarthana: COMMON_DEEPAK,
        bhumiPrarthana: COMMON_BHUMI,
        samarpanMantra: COMMON_SAMARPAN,
        kshamaPrarthana: COMMON_KSHAMA,
        phalshruti: mantra.benefits || (isHi ? 'दरिद्रता का समूल नाश, अटका हुआ धन वापस आना, व्यापार में अपार लाभ व स्थिर लक्ष्मी वास।' : 'Destroys poverty, retrieves blocked funds, multiplies business and bestows lasting prosperity.')
      };

    default:
      return {
        aasan: isHi ? 'कुशासन अथवा शुद्ध ऊनी कम्बल आसन' : 'Kusha grass mat or pure woolen blanket',
        aasanColor: isHi ? 'पीला अथवा लाल' : 'Yellow or Red',
        disha: isHi ? 'पूर्व अथवा उत्तर दिशा' : 'East or North',
        shubhSamay: mantra.bestTiming || (isHi ? 'ब्रह्म मुहूर्त (प्रातः ४:०० से ६:००) अथवा संध्या वेला' : 'Brahma Muhurta (4:00 - 6:00 AM) or sunset twilight'),
        visheshTithi: isHi ? 'पूर्णिमा, अमावस्या, एकादशी अथवा विशिष्ट पर्व काल' : 'Purnima, Amavasya, Ekadashi or auspicious festivals',
        malaType: 'rudraksha',
        malaName: isHi ? '१०८ मनके वाली सिद्ध रुद्राक्ष अथवा तुलसी माला' : 'Consecrated 108-bead Rudraksha or Tulsi Mala',
        malaVidhi: isHi ? 'माला को हृदय के समीप गोमुखी झोली में रखकर एकाग्रचित्त जपें।' : 'Hold mala near the heart inside Gomukhi bag with single-pointed focus.',
        siddhiCount: mantra.targetCountSiddhi || (isHi ? '११,००० अथवा १,२५,००० जप' : '11,000 or 1,25,000 sacred chants'),
        anushthanDays: isHi ? '२१ दिन अथवा ४० दिन का नियमित संकल्प' : '21 or 40 consecutive days vow',
        dashanshHavan: isHi ? '१०% दशांश हवन अथवा १०% अतिरिक्त जप' : '10% Havan or 10% extra chanting',
        niyamList: isHi ? [
          'साधना काल में पूर्ण ब्रह्मचर्य व सात्विक आहार का पालन करें।',
          'नित्य एक ही समय, एक ही आसन व निश्चित माला संख्या जपें।',
          'जप के समय मन में शांत, श्रद्धावान व एकाग्र भाव रखें।',
          'साधना को पूर्ण गोपनीय रखें, व्यर्थ प्रदर्शन न करें।'
        ] : [
          'Maintain celibacy and pure vegetarian sattvic food.',
          'Chant at the exact same hour, place and target count daily.',
          'Keep mind still, devoted and focused on the divine sound.',
          'Keep your sadhana sacred, quiet and confidential.'
        ],
        pujaSamagriList: mantra.samagri ? [mantra.samagri] : (isHi ? [
          'शुद्ध गाय के घी अथवा तिल के तेल का दीपक',
          'अगरबत्ती, धूप व ताजे पुष्प',
          'तांबे के लोटे में शुद्ध जल',
          'प्रसाद हेतु फल अथवा मिश्री'
        ] : [
          'Pure cow ghee or sesame oil lamp',
          'Incense sticks and fresh blossoms',
          'Copper vessel with pure water',
          'Fruit or rock sugar for prasad'
        ]),
        sankalpVidhi: isHi
          ? 'दाहिने हाथ में जल व अक्षत लेकर बोलें: "हे परमेश्वर! मैं (अपना नाम), गोत्र (गोत्र), आपके चरणों में श्रद्धापूर्वक श्री \'' + mantra.name + '\' की साधना समर्पित करता हूँ। मेरी मनोकामना पूर्ण करें।"'
          : 'Holding water and unbroken rice: "O Supreme Divine! I humbly offer this chanting with total faith and devotion."',
        dhyanShloka: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥',
        dhyanShlokaHindi: 'उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापनाशक, देवस्वरूप परमात्मा का हम अंतःकरण में ध्यान करें, जो हमारी बुद्धि को सन्मार्ग में प्रेरित करे।',
        pavitrikaranMantra: COMMON_PAVITRIKARAN,
        achamanVidhi: COMMON_ACHAMAN,
        deepakPrarthana: COMMON_DEEPAK,
        bhumiPrarthana: COMMON_BHUMI,
        samarpanMantra: COMMON_SAMARPAN,
        kshamaPrarthana: COMMON_KSHAMA,
        phalshruti: mantra.benefits || (isHi ? 'मानसिक शांति, सकारात्मक ऊर्जा, आत्मबल व मनोकामना सिद्धि।' : 'Mental calm, radiant positive aura, spiritual strength and divine fulfillment.')
      };
  }
}

export function getDetailedMantraGuide(mantra: MantraItem, language: 'hi' | 'en' = 'hi'): DetailedMantraGuide {
  const guide = getBaseDeityGuide(mantra, language);

  if (mantra.sthan) {
    guide.sthan = mantra.sthan;
  }
  if (mantra.mudra) {
    guide.mudra = mantra.mudra;
  }
  if (mantra.siddhiVidhi) {
    guide.siddhiVidhiText = mantra.siddhiVidhi;
  }
  if (mantra.pujaSamagri) {
    guide.pujaSamagriList = [mantra.pujaSamagri, ...guide.pujaSamagriList];
  }
  if (mantra.niyam) {
    guide.niyamList = [mantra.niyam, ...guide.niyamList];
  }
  if (mantra.bestTiming) {
    guide.shubhSamay = mantra.bestTiming;
  }
  if (mantra.targetCountSiddhi) {
    guide.siddhiCount = mantra.targetCountSiddhi;
  }

  return guide;
}

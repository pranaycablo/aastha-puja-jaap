import React, { useState } from 'react';
import { X, Sparkles, Hand, Compass, Heart, AlertTriangle, ShieldCheck, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { LanguageCode } from '../types';
import { AdMobNativeCard } from './AdMobNativeCard';

interface KarMalaMudraGuideProps {
  isOpen?: boolean;
  onClose?: () => void;
  language?: LanguageCode;
  initialTab?: 'kar_mala' | 'mudra' | 'mala_rules' | 'asan';
}

export const KarMalaMudraGuide: React.FC<KarMalaMudraGuideProps> = ({
  isOpen = true,
  onClose,
  language = 'hi',
  initialTab = 'kar_mala'
}) => {
  const isHi = language === 'hi';
  const [activeTab, setActiveTab] = useState<'kar_mala' | 'mudra' | 'mala_rules' | 'asan'>(initialTab);
  const [activePoint, setActivePoint] = useState<number>(1);
  const [selectedMudra, setSelectedMudra] = useState<number>(0);
  const [selectedAsan, setSelectedAsan] = useState<number>(0);

  if (!isOpen) return null;

  // 10 Kar-Mala Stations Data
  const karMalaPoints = [
    {
      num: 1,
      name: isHi ? '१. अनामिका का मध्य पोर' : '1. Ring Finger Middle Joint',
      finger: isHi ? 'अनामिका (Ring Finger)' : 'Ring Finger',
      shastraRule: isHi ? 'आरंभ यहीं से होता है: "अनामिका मध्यमारभ्य"' : 'Chanting starts here',
      x: 185,
      y: 155,
      desc: isHi
        ? 'अपने दाहिने हाथ के अंगूठे के पोर से अनामिका (तीसरी उंगली) के बीच वाले भाग को स्पर्श करते हुए पहला मंत्र जपें।'
        : 'Touch the middle joint of your right ring finger with your thumb.'
    },
    {
      num: 2,
      name: isHi ? '२. अनामिका का मूल (जड़)' : '2. Ring Finger Root (Base)',
      finger: isHi ? 'अनामिका (Ring Finger)' : 'Ring Finger',
      shastraRule: isHi ? 'नीचे की ओर आएं' : 'Move downwards to base',
      x: 185,
      y: 195,
      desc: isHi
        ? 'अंगूठे को नीचे अनामिका की जड़ (मूल) पर लाएं और दूसरा मंत्र जपें।'
        : 'Slide thumb to the root joint of the ring finger.'
    },
    {
      num: 3,
      name: isHi ? '३. कनिष्ठिका का मूल (जड़)' : '3. Little Finger Root (Base)',
      finger: isHi ? 'कनिष्ठिका (Little Finger)' : 'Little Finger',
      shastraRule: isHi ? 'कनिष्ठिका की ओर बढ़ें' : 'Move across to little finger root',
      x: 235,
      y: 205,
      desc: isHi
        ? 'अंगूठे को सबसे छोटी उंगली (कनिष्ठिका) के निचले मूल भाग पर रखें।'
        : 'Place thumb on the base joint of the little finger.'
    },
    {
      num: 4,
      name: isHi ? '४. कनिष्ठिका का मध्य पोर' : '4. Little Finger Middle Joint',
      finger: isHi ? 'कनिष्ठिका (Little Finger)' : 'Little Finger',
      shastraRule: isHi ? 'ऊपर की ओर बढ़ें' : 'Move upwards',
      x: 238,
      y: 165,
      desc: isHi
        ? 'अंगूठे को कनिष्ठिका के बीच वाले पोर पर लाएं।'
        : 'Move thumb to the middle joint of the little finger.'
    },
    {
      num: 5,
      name: isHi ? '५. कनिष्ठिका का अग्र भाग (शीर्ष)' : '5. Little Finger Top Joint',
      finger: isHi ? 'कनिष्ठिका (Little Finger)' : 'Little Finger',
      shastraRule: isHi ? 'कनिष्ठिका का शिखर' : 'Tip of little finger',
      x: 240,
      y: 125,
      desc: isHi
        ? 'कनिष्ठिका के सबसे ऊपरी पोर (अग्र भाग) को स्पर्श करें।'
        : 'Touch top joint of little finger.'
    },
    {
      num: 6,
      name: isHi ? '६. अनामिका का अग्र भाग (शीर्ष)' : '6. Ring Finger Top Joint',
      finger: isHi ? 'अनामिका (Ring Finger)' : 'Ring Finger',
      shastraRule: isHi ? 'अनामिका के शिखर पर लौटें' : 'Top joint of ring finger',
      x: 185,
      y: 95,
      desc: isHi
        ? 'अंगूठे को अनामिका के सबसे ऊपरी पोर पर स्पर्श करें।'
        : 'Touch the top joint of ring finger.'
    },
    {
      num: 7,
      name: isHi ? '७. मध्यमा का अग्र भाग (शीर्ष)' : '7. Middle Finger Top Joint',
      finger: isHi ? 'मध्यमा (Middle Finger)' : 'Middle Finger',
      shastraRule: isHi ? 'केवल अग्र भाग स्पर्श, मध्य व मूल छोड़ें' : 'Top joint only (Root is Meru)',
      x: 135,
      y: 75,
      desc: isHi
        ? 'मध्यमा के केवल सबसे ऊपरी पोर को छुएं। ध्यान रहे: मध्यमा का बीच और निचला भाग सुमेरु पर्वत समान पूज्य व त्याज्य है।'
        : 'Touch only the top joint of middle finger. Never touch middle or base joints (they represent Meru).'
    },
    {
      num: 8,
      name: isHi ? '८. तर्जनी का अग्र भाग (शीर्ष)' : '8. Index Finger Top Joint',
      finger: isHi ? 'तर्जनी (Index Finger)' : 'Index Finger',
      shastraRule: isHi ? 'तर्जनी के शिखर पर' : 'Top of index finger',
      x: 82,
      y: 95,
      desc: isHi
        ? 'तर्जनी के सबसे ऊपरी पोर को अंगूठे से स्पर्श करें।'
        : 'Touch top joint of index finger.'
    },
    {
      num: 9,
      name: isHi ? '९. तर्जनी का मध्य पोर' : '9. Index Finger Middle Joint',
      finger: isHi ? 'तर्जनी (Index Finger)' : 'Index Finger',
      shastraRule: isHi ? 'तर्जनी से नीचे की ओर' : 'Downwards on index finger',
      x: 85,
      y: 145,
      desc: isHi
        ? 'अंगूठे को तर्जनी के बीच वाले पोर पर लाएं।'
        : 'Move thumb to middle joint of index finger.'
    },
    {
      num: 10,
      name: isHi ? '१०. तर्जनी का मूल (जड़)' : '10. Index Finger Root (Base)',
      finger: isHi ? 'तर्जनी (Index Finger)' : 'Index Finger',
      shastraRule: isHi ? '१०वां चक्र पूर्ण: "तर्जनी मूलपर्यन्तं"' : 'Final 10th count at base',
      x: 88,
      y: 195,
      desc: isHi
        ? 'तर्जनी के मूल (जड़) पर स्पर्श करते ही १० मंत्र पूर्ण होते हैं। इस प्रकार १० बार करने से १०० तथा पुनः ८ करने से १०८ की एक पूर्ण माला सिद्ध होती है!'
        : 'Touch base of index finger. This completes 10 chants. Repeat 10 times + 8 more for 108 chants (1 full mala)!'
    }
  ];

  // 8 Sacred Mudras Data with exact anatomical instructions
  const mudrasList = [
    {
      id: 'gyan',
      name: isHi ? '१. ज्ञान मुद्रा (चिन्मुद्रा)' : '1. Gyan Mudra (Chin Mudra)',
      tag: isHi ? 'स्मरण शक्ति, चित्त शांति व विवेक' : 'Wisdom & Inner Peace',
      element: isHi ? 'अग्नि (अंगूठा) + वायु (तर्जनी)' : 'Fire + Air',
      imageSrc: '/images/mudras/gyan_mudra.svg',
      fingerTouch: isHi ? 'तर्जनी का अग्रभाग + अंगूठे का अग्रभाग' : 'Index tip + Thumb tip',
      otherFingers: isHi ? 'मध्यमा, अनामिका, कनिष्ठिका तीनों सीधी व शांत' : 'Middle, Ring, Little fingers straight',
      benefits: isHi
        ? 'मस्तिष्क के न्यूरॉन्स को शांत करती है। क्रोध, तनाव व अनिद्रा का नाश कर मन में दिव्य शांति व ज्ञान का प्रकाश भरती है।'
        : 'Calms neural chatter, eliminates insomnia and stress, bestows clarity and sharp spiritual insight.',
      technique: isHi
        ? 'दाहिने हाथ की तर्जनी (पहिली उंगली) के पोर को अंगूठे के पोर से हल्के से स्पर्श कराकर एक गोला बनाएं। शेष तीनों उंगलियों को तानकर नहीं बल्कि सहज सीधा रखें। हथेली आकाश की ओर या घुटने पर स्थापित रहे।'
        : 'Touch the tip of the index finger to the tip of the thumb, forming a circle. Keep remaining three fingers gently straight.'
    },
    {
      id: 'dhyan',
      name: isHi ? '२. ध्यान / भैरव मुद्रा' : '2. Dhyana / Bhairava Mudra',
      tag: isHi ? 'चित्त की एकाग्रता व शून्य विचार' : 'Supreme Meditative Focus',
      element: isHi ? 'ईड़ा व पिंगला नाड़ी संतुलन' : 'Nadi Balancing',
      imageSrc: '/images/mudras/dhyana_mudra.svg',
      fingerTouch: isHi ? 'बाएं हाथ पर दाहिना हाथ + दोनों अंगूठे मिले हुए' : 'Right palm over Left palm, thumb tips touching',
      otherFingers: isHi ? 'उंगलियां एक-दूसरे पर विश्राम मुद्रा में' : 'Fingers relaxed and curved naturally',
      benefits: isHi
        ? 'दोनों हथेलियों का मिलन मस्तिष्क के दोनों गोलार्धों को संतुलित करता है। मन शून्य विचार (विचारहीनता) की परम शांत अवस्था में पहुंचता है।'
        : 'Synchronizes brain hemispheres, balances solar and lunar channels, and leads to effortless thoughtless stillness.',
      technique: isHi
        ? 'गोदी (lap) में नाभि के ठीक नीचे बाएं हाथ की हथेली पर दाहिने हाथ की हथेली ऊपर की ओर रखें। दोनों अंगूठों के अग्रभाग आपस में हल्के से मिलकर एक त्रिकोण या कटोरे के समान आकार बनाएं।'
        : 'Rest right palm over left palm in your lap facing upwards, gently touching both thumb tips together.'
    },
    {
      id: 'pran',
      name: isHi ? '३. प्राण मुद्रा (जीवन शक्ति)' : '3. Prana Mudra (Vital Force)',
      tag: isHi ? 'आलस्य नाश व प्रचंड ओज' : 'Vitality & Divine Radiance',
      element: isHi ? 'पृथ्वी + जल + अग्नि' : 'Earth + Water + Fire',
      imageSrc: '/images/mudras/prana_mudra.svg',
      fingerTouch: isHi ? 'अनामिका + कनिष्ठिका + अंगूठे का अग्रभाग' : 'Ring tip + Little tip + Thumb tip',
      otherFingers: isHi ? 'तर्जनी व मध्यमा पूर्णतः सीधी' : 'Index & Middle fingers held upright',
      benefits: isHi
        ? 'शरीर में रोग-प्रतिरोधक क्षमता (Immunity) और प्राण ऊर्जा को बढ़ाती है। आंखों की रोशनी तेज होती है और जप के दौरान तंद्रा या नींद नहीं आती।'
        : 'Drives away drowsiness during chanting, boosts immunity, enhances eyesight and floods the aura with prana.',
      technique: isHi
        ? 'अनामिका (तीसरी) और कनिष्ठिका (छोटी) दोनों उंगलियों के पोरों को एक साथ अंगूठे के पोर से स्पर्श कराएं। तर्जनी और मध्यमा दोनों उंगलियों को ऊपर की ओर बिल्कुल सीधा रखें।'
        : 'Touch tips of ring finger and little finger to the tip of thumb. Keep index and middle fingers straight.'
    },
    {
      id: 'chinmaya',
      name: isHi ? '४. चिन्मय मुद्रा' : '4. Chinmaya Mudra',
      tag: isHi ? 'प्राण ऊर्जा का अंतर्मुखीकरण व संचय' : 'Directing Prana Inward',
      element: isHi ? 'प्राण संचय चक्र' : 'Pranic Containment',
      imageSrc: '/images/mudras/chinmaya_mudra.svg',
      fingerTouch: isHi ? 'ज्ञान चक्र (तर्जनी + अंगूठा)' : 'Index + Thumb circle',
      otherFingers: isHi ? 'शेष ३ उंगलियां हथेली की ओर मुट्ठी समान मुड़ी हुई' : 'Remaining 3 fingers curled into palm',
      benefits: isHi
        ? 'शरीर से ऊर्जा को बाहर विसर्जित होने से रोकती है। जप द्वारा उत्पन्न तेज को हृदय और आज्ञा चक्र में सुरक्षित संचित करती है।'
        : 'Prevents leakage of chanting vibrations, directing the cultivated divine spiritual energy into higher chakras.',
      technique: isHi
        ? 'तर्जनी व अंगूठे से ज्ञान मुद्रा का चक्र बनाएं, और बाकी की तीनों उंगलियों (मध्यमा, अनामिका, कनिष्ठिका) को मोड़कर हथेली में दबाकर हल्की मुट्ठी बना लें।'
        : 'Form Gyan mudra with thumb and index, then curl the other 3 fingers gently into the palm.'
    },
    {
      id: 'vayu',
      name: isHi ? '५. वायु मुद्रा' : '5. Vayu Mudra',
      tag: isHi ? 'चंचलता व वात रोग शमन' : 'Calming Restlessness & Vata',
      element: isHi ? 'वायु तत्व संतुलन' : 'Balancing Air Element',
      imageSrc: '/images/mudras/vayu_mudra.svg',
      fingerTouch: isHi ? 'तर्जनी मुड़कर अंगूठे की जड़ में + अंगूठे का दबाव' : 'Index folded to thumb base, thumb on top',
      otherFingers: isHi ? 'मध्यमा, अनामिका, कनिष्ठिका तीनों सीधी' : 'Middle, Ring, Little fingers extended straight',
      benefits: isHi
        ? 'यदि जप में मन बहुत भटकता हो, हाथ-पैर में कंपन या जोड़ों का दर्द हो, तो यह मुद्रा वात का शमन कर मन को तुरंत स्थिर करती है।'
        : 'Calms erratic mind wandering, eases joint aches, and eliminates tremors and nervous agitation.',
      technique: isHi
        ? 'तर्जनी उंगली को पूरा मोड़कर अंगूठे के नीचे की गद्दी (मूल) पर लगाएं, और अंगूठे से तर्जनी के ऊपरी जोड़ पर हल्का दबाव दें।'
        : 'Fold index finger to the base of thumb, pressing gently with the thumb on top.'
    },
    {
      id: 'apana',
      name: isHi ? '६. अपान मुद्रा (शुद्धिकरण)' : '6. Apana Mudra (Detoxification)',
      tag: isHi ? 'शरीर व नाभि चक्र शुद्धि' : 'Purification & Manipura Balance',
      element: isHi ? 'आकाश + पृथ्वी + अग्नि' : 'Ether + Earth + Fire',
      imageSrc: '/images/mudras/apana_mudra.svg',
      fingerTouch: isHi ? 'मध्यमा + अनामिका + अंगूठे का अग्रभाग' : 'Middle + Ring + Thumb tips joined',
      otherFingers: isHi ? 'तर्जनी व कनिष्ठिका बाहर की ओर सीधी' : 'Index and Little fingers extended straight',
      benefits: isHi
        ? 'शरीर के समस्त विषैले तत्वों को बाहर निकालती है। पाचन तंत्र सुदृढ़ होता है और नाभि केंद्र (मणिपूर चक्र) संतुलित होता है।'
        : 'Flushes metabolic and emotional toxins, stimulates digestion, and grounds inner vitality.',
      technique: isHi
        ? 'बीच की दोनों उंगलियों (मध्यमा और अनामिका) के सिरों को अंगूठे के सिरे से मिला दें। तर्जनी और सबसे छोटी उंगली दोनों को बाहर की ओर सीधा रखें।'
        : 'Join tips of middle finger and ring finger to the thumb tip. Keep little and index fingers straight.'
    },
    {
      id: 'prithvi',
      name: isHi ? '७. पृथ्वी / शंख मुद्रा' : '7. Prithvi / Shankh Mudra',
      tag: isHi ? 'शारीरिक दुर्बलता व कंठ शुद्धि' : 'Grounding & Voice Purification',
      element: isHi ? 'पृथ्वी तत्व' : 'Earth Element',
      imageSrc: '/images/mudras/shankh_mudra.svg',
      fingerTouch: isHi ? 'शंख मुद्रा अथवा अनामिका अग्रभाग + अंगूठा' : 'Shankh shape / Ring + Thumb tip',
      otherFingers: isHi ? 'तर्जनी, मध्यमा, कनिष्ठिका सीधी' : 'Index, Middle, Little fingers straight',
      benefits: isHi
        ? 'शरीर में स्थायित्व, वजन संतुलन और चेहरे पर दिव्य तेज लाती है। मानसिक दुर्बलता और असुरक्षा का भाव मिटाती है।'
        : 'Builds physical stamina, eliminates weakness and grounding instability, and promotes glowing skin.',
      technique: isHi
        ? 'अनामिका (तीसरी उंगली) के पोर को अंगूठे के पोर से हल्के दबाव के साथ मिलाएं। बाकी तीनों उंगलियों को आराम से सीधा रखें।'
        : 'Touch the tip of the ring finger with the tip of the thumb with gentle pressure.'
    },
    {
      id: 'shunya',
      name: isHi ? '८. शून्य मुद्रा' : '8. Shunya Mudra (Space Balance)',
      tag: isHi ? 'कान विकार व आंतरिक मौन' : 'Ear & Head Pressure Relief',
      element: isHi ? 'आकाश तत्व' : 'Space / Ether Element',
      imageSrc: '/images/mudras/vayu_mudra.svg',
      fingerTouch: isHi ? 'मध्यमा मुड़कर अंगूठे की जड़ में + अंगूठे का दबाव' : 'Middle folded to thumb base, thumb on top',
      otherFingers: isHi ? 'तर्जनी, अनामिका, कनिष्ठिका सीधी' : 'Index, Ring, Little fingers straight',
      benefits: isHi
        ? 'कान का दर्द, भारीपन या नाद ध्वनि में अवरोध को दूर करती है। चित्त में आंतरिक मौन और शून्य की अनुभूति कराती है।'
        : 'Relieves inner ear tension and mental pressure, opening the inner ear to divine celestial sounds (Naad).',
      technique: isHi
        ? 'मध्यमा (बीच की बड़ी उंगली) को मोड़कर अंगूठे की जड़ में स्थापित करें, और अंगूठे से उस पर हल्का दबाव बनाए रखें।'
        : 'Fold middle finger to base of thumb and press down gently with thumb.'
    }
  ];

  // Shastric Rosary Rules Data (माला पकड़ने की शास्त्रोक्त विधि)
  const malaHoldingRules = [
    {
      id: 'finger_rule',
      title: isHi ? '१. मध्यमा व अंगूठे का नियम (तर्जनी वर्जित)' : '1. Middle Finger & Thumb Rule',
      icon: '🚫',
      status: 'critical',
      heading: isHi ? 'तर्जनी (पहिली उंगली) का स्पर्श महादोष है' : 'Index Finger Must Never Touch',
      shloka: '"तर्जन्या न स्पृशेत् सूत्रं न चालयेत् कदाचन । तर्जनी स्पर्शात् सर्वं कर्म निष्फलं भवति ॥"',
      detail: isHi
        ? 'शास्त्रों के अनुसार तर्जनी उंगली अहंकार व क्रोध की द्योतक है। जप करते समय माला केवल मध्यमा (बड़ी उंगली) के तीसरे पोर पर रखी जाती है और अंगूठे से मणके को अपनी ओर (हृदय की दिशा में) खींचा जाता है। तर्जनी को माला से अलग, ऊपर उठाकर रखें।'
        : 'The index finger represents ego and anger. Rest the rosary on the middle finger and pull beads toward your heart using your thumb. Keep index finger strictly isolated.'
    },
    {
      id: 'sumeru_rule',
      title: isHi ? '२. सुमेरु उल्लंघन निषेध' : '2. Sumeru (Meru Bead) Rule',
      icon: '⛰️',
      status: 'critical',
      heading: isHi ? 'सुमेरु को कभी लांघा नहीं जाता' : 'Never Cross The Meru Bead',
      shloka: '"आवर्त्य तु जपेद् देवि सुमेरुं न च लङ्घयेत् । सुमेरुं लङ्घयेद्यस्तु स पापभाग् भवेत् ॥"',
      detail: isHi
        ? 'माला का १०८वां सबसे बड़ा मणका "सुमेरु" कहलाता है, जो साक्षात् परब्रह्म व गुरु का प्रतीक है। जब जप करते हुए १०८वां मणका आ जाए, तो सुमेरु को पार न करें; बल्कि माला को वहीं से १८० डिग्री घुमाकर उल्टी दिशा में अगली माला आरंभ करें।'
        : 'The 108th head bead is Sumeru (representing the Guru/Divine). Never cross over it. Rotate the rosary 180 degrees and chant backwards for the next round.'
    },
    {
      id: 'gaumukhi_rule',
      title: isHi ? '३. गौमुखी थैली का विधान' : '3. Gaumukhi Cloth Bag Rule',
      icon: '👜',
      status: 'important',
      heading: isHi ? 'माला को सदैव गुप्त रखकर जपें' : 'Keep Rosary Concealed',
      shloka: '"गोपयेत् देवतां मन्त्रं गोपयेत् जपमालिकाम् । प्रकाशनात् सिद्धिक्षयो भवति ॥"',
      detail: isHi
        ? 'जप करते समय माला को खुला नहीं रखना चाहिए। किसी की दृष्टि माला पर न पड़े, इसलिए माला को "गौमुखी थैली" के भीतर रखकर जपें अथवा एक स्वच्छ सूती वस्त्र से हाथ को ढंक लें। गुप्त जप का फल सहस्र गुना होता है।'
        : 'Never expose your japa mala to public view. Enclose your hand and mala inside a Gaumukhi bag or cover with a clean white cloth.'
    },
    {
      id: 'height_rule',
      title: isHi ? '४. माला की ऊंचाई (हृदय चक्र स्तर)' : '4. Elevation at Heart Level',
      icon: '❤️',
      status: 'important',
      heading: isHi ? 'नाभि से नीचे या नाक से ऊपर न रखें' : 'Keep Level with Heart',
      shloka: '"हृत्प्रदेशे तु माला स्यात् नाभौ वा न तु पादयोः ॥"',
      detail: isHi
        ? 'जप करते समय हाथ को हृदय चक्र (छाती के मध्य) के समकक्ष रखना चाहिए। हाथ को कभी भी नाभि से नीचे न लटकाएं और न ही मुख के बहुत ऊपर ले जाएं। माला को जमीन पर स्पर्श न होने दें।'
        : 'Hold the rosary comfortably at chest level opposite your heart. Never let the mala drop below the navel or touch the floor.'
    }
  ];

  // 4 Asanas Data
  const asanasList = [
    {
      id: 'padmasana',
      name: isHi ? '१. पद्मासन (कमलासन)' : '1. Padmasana (Lotus Pose)',
      subtitle: isHi ? 'आसनों का राजा - सर्वोच्च स्थिरता व समाधि' : 'King of Asanas - Supreme Stillness',
      icon: '🪷',
      imageSrc: '/images/aasans/padmasana.svg',
      benefits: isHi
        ? 'रीढ़ की हड्डी पूर्णतः सीधी रहती है। मूलाधार से सहस्रार चक्र तक प्राण ऊर्जा का निरंतर ऊर्ध्वगमन होता है। मन तुरंत स्थिर होकर समाधि की अवस्था में प्रवेश करता है।'
        : 'Aligns spine perfectly, directs prana upwards through all chakras, and induces effortless deep meditation.',
      vidhi: isHi
        ? 'दाहिने पैर को मोड़कर बाईं जांघ पर और बाएं पैर को मोड़कर दाईं जांघ पर रखें। दोनों हथेलियों को घुटनों पर ज्ञान मुद्रा में स्थापित करें। गर्दन व कमर सीधी रखें।'
        : 'Place right foot on left thigh and left foot on right thigh. Rest hands on knees in Gyan Mudra with erect spine.'
    },
    {
      id: 'siddhasana',
      name: isHi ? '२. सिद्धासन (सिद्ध पुरुषों का प्रिय)' : '2. Siddhasana (Adept Pose)',
      subtitle: isHi ? 'ब्रह्मचर्य व ७२,००० नाड़ियों की शुद्धि' : 'Awakens Kundalini & 72,000 Nadis',
      icon: '🧘‍♂️',
      imageSrc: '/images/aasans/siddhasana.svg',
      benefits: isHi
        ? 'शास्त्रों में इसे मंत्र सिद्धि हेतु सर्वश्रेष्ठ आसन कहा गया है। यह वीर्य रक्षा (ब्रह्मचर्य), काम-वासना पर विजय और सुषुम्ना नाड़ी को जाग्रत करने में सर्वाधिक सिद्ध है।'
        : 'Praised across Shastras as best for mantra siddhi, celibacy, calming desires and awakening the central Sushumna nadi.',
      vidhi: isHi
        ? 'बाईं एड़ी को गुदा व जननेंद्रिय के मध्य (सियोनी नाड़ी) पर दबाकर रखें। दाईं एड़ी को जननेंद्रिय के ठीक ऊपर स्थापित करें। दृष्टि नासिका के अग्रभाग या आज्ञा चक्र पर रखें।'
        : 'Press left heel firmly at perineum, place right heel above reproductive organ. Focus gaze gently between eyebrows.'
    },
    {
      id: 'sukhasana',
      name: isHi ? '३. सुखासन (सहज आलती-पालती)' : '3. Sukhasana (Easy / Joyful Pose)',
      subtitle: isHi ? 'दीर्घकालीन जप हेतु अत्यंत सुगम' : 'Comfortable for Long Chanting',
      icon: '🌿',
      imageSrc: '/images/aasans/sukhasana.svg',
      benefits: isHi
        ? 'घुटनों या जोड़ों में खिंचाव नहीं होता। वृद्धजन अथवा कई घंटों तक निरंतर नाम जप करने वाले भक्तों के लिए यह अत्यंत आरामदायक और सुखद है।'
        : 'Zero strain on knee joints; ideal for senior devotees and long multi-hour Naam Jaap sankirtan sessions.',
      vidhi: isHi
        ? 'साधारण रूप से पालथी मारकर बैठें। आवश्यकता हो तो नितंब के नीचे कुशन या कंबल का आसन रखें जिससे रीढ़ सीधी रहे। कंधे ढीले व शांत रखें।'
        : 'Sit cross-legged naturally. Use a folded blanket under sit bones to keep spine naturally upright and relaxed.'
    },
    {
      id: 'vajrasana',
      name: isHi ? '४. वज्रासन (डायमंड मुद्रा)' : '4. Vajrasana (Thunderbolt Pose)',
      subtitle: isHi ? 'जठराग्नि प्रदीप्त व मानसिक दृढ़ता' : 'Enhances Digestion & Pranic Strength',
      icon: '⚡',
      imageSrc: '/images/aasans/vajrasana.svg',
      benefits: isHi
        ? 'एकमात्र आसन जो भोजन के तुरंत बाद भी किया जा सकता है। यह शरीर को वज्र के समान सुदृढ़ बनाता है, आलस्य व तंद्रा को दूर भगाता है और मन को वज्र जैसी शक्ति देता है।'
        : 'The only posture executable right after food. Strengthens digestive fire, removes lethargy and fortifies mental willpower.',
      vidhi: isHi
        ? 'दोनों घुटनों को मोड़कर अपनी एड़ियों पर बैठें। पैरों के अंगूठे आपस में मिले हों और एड़ियां बाहर की ओर फैली हों। दोनों हथेलियां घुटनों पर रखें।'
        : 'Fold both legs under buttocks, sit between heels with big toes touching. Rest hands gently on knees.'
    }
  ];

  // =========================================================================
  // HIGH-PRECISION APPLE-GRADE SVG GRAPHICS
  // =========================================================================

  // 1. ANATOMICALLY REALISTIC KAR-MALA HAND WITH DISTINCT PHALANGES
  const renderKarMalaHand = () => {
    const activePtObj = karMalaPoints.find((p) => p.num === activePoint) || karMalaPoints[0];

    return (
      <div className="relative w-full max-w-[320px] mx-auto bg-gradient-to-b from-[#1C0D2E] to-[#120720] rounded-3xl p-4 border border-amber-500/30 shadow-2xl overflow-hidden">
        {/* Divine Background Mandala Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.15),transparent_70%)] pointer-events-none" />

        <div className="text-center mb-2">
          <span className="text-[11px] font-black text-amber-300 uppercase tracking-wider block">
            ✋ {isHi ? 'दाहिने हाथ की कर-माला (१०८ जप विधान)' : 'Right Hand Kar-Mala Counter'}
          </span>
          <span className="text-[10px] text-amber-200/70">
            {isHi ? 'उंगलियों के पोरों पर १ से १० तक टैप करें' : 'Tap joints 1 to 10 to inspect movement'}
          </span>
        </div>

        <svg viewBox="0 0 320 310" className="w-full h-auto drop-shadow-xl select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="nodeActiveGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="1" />
              <stop offset="60%" stopColor="#EA580C" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="fingerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FCE7D0" />
              <stop offset="50%" stopColor="#F5B98A" />
              <stop offset="100%" stopColor="#E28E50" />
            </linearGradient>
            <linearGradient id="palmGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F8C49E" />
              <stop offset="100%" stopColor="#D97736" />
            </linearGradient>
          </defs>

          {/* Finger Names Top Labels */}
          <text x="82" y="32" fontSize="9" fontWeight="900" fill="#FDE047" textAnchor="middle">तर्जनी</text>
          <text x="135" y="18" fontSize="9" fontWeight="900" fill="#FDE047" textAnchor="middle">मध्यमा</text>
          <text x="185" y="32" fontSize="9" fontWeight="900" fill="#FDE047" textAnchor="middle">अनामिका</text>
          <text x="240" y="52" fontSize="9" fontWeight="900" fill="#FDE047" textAnchor="middle">कनिष्ठिका</text>

          {/* PALM BASE & WRIST */}
          <path
            d="M 95 285 C 95 240, 75 220, 60 200 C 45 180, 20 185, 20 160 C 20 145, 35 140, 50 160 L 68 185 C 70 170, 70 140, 72 100 C 73 78, 93 78, 94 100 L 96 150 C 98 120, 115 50, 126 50 C 144 50, 144 110, 146 150 C 148 120, 168 65, 178 65 C 193 65, 194 110, 195 150 C 198 135, 222 95, 235 95 C 248 95, 250 140, 245 180 C 242 220, 225 285, 170 290 Z"
            fill="url(#fingerGrad)"
            stroke="#9A3412"
            strokeWidth="2.5"
          />

          {/* Palm Creases (Heart Line, Head Line, Life Line) */}
          <path d="M 68 180 C 105 185, 160 175, 225 155" fill="none" stroke="#B45309" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
          <path d="M 55 165 C 90 195, 140 215, 180 230" fill="none" stroke="#B45309" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
          <path d="M 50 165 C 75 195, 85 240, 105 280" fill="none" stroke="#B45309" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />

          {/* Phalange Joint Separator Lines */}
          {/* Index finger joints */}
          <line x1="74" y1="118" x2="90" y2="118" stroke="#B45309" strokeWidth="1.2" opacity="0.7" />
          <line x1="75" y1="168" x2="93" y2="168" stroke="#B45309" strokeWidth="1.2" opacity="0.7" />
          {/* Middle finger joints */}
          <line x1="126" y1="98" x2="144" y2="98" stroke="#B45309" strokeWidth="1.2" opacity="0.7" />
          <line x1="127" y1="145" x2="145" y2="145" stroke="#B45309" strokeWidth="1.2" opacity="0.7" />
          {/* Ring finger joints */}
          <line x1="178" y1="122" x2="194" y2="122" stroke="#B45309" strokeWidth="1.2" opacity="0.7" />
          <line x1="177" y1="175" x2="195" y2="175" stroke="#B45309" strokeWidth="1.2" opacity="0.7" />
          {/* Little finger joints */}
          <line x1="228" y1="145" x2="242" y2="145" stroke="#B45309" strokeWidth="1.2" opacity="0.7" />
          <line x1="225" y1="185" x2="242" y2="185" stroke="#B45309" strokeWidth="1.2" opacity="0.7" />

          {/* MERU ZONE (Forbidden Middle Finger Base & Center) */}
          <rect x="122" y="105" width="26" height="75" rx="10" fill="#EF4444" fillOpacity="0.25" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="135" y="142" fontSize="7.5" fontWeight="900" fill="#FCA5A5" textAnchor="middle">
            सुमेरु (त्याज्य)
          </text>
          <text x="135" y="152" fontSize="6.5" fontWeight="bold" fill="#FCA5A5" textAnchor="middle">
            स्पर्श वर्जित ❌
          </text>

          {/* CLOCKWISE TRAJECTORY FLOW PATH (1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10) */}
          <path
            d="M 185 155 L 185 195 L 235 205 L 238 165 L 240 125 L 185 95 L 135 75 L 82 95 L 85 145 L 88 195"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2.5"
            strokeDasharray="4 3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          />

          {/* 10 INTERACTIVE SACRED NODES */}
          {karMalaPoints.map((pt) => {
            const isCurrent = activePoint === pt.num;
            return (
              <g
                key={pt.num}
                onClick={() => setActivePoint(pt.num)}
                className="cursor-pointer transition-all duration-200"
              >
                {isCurrent && (
                  <>
                    <circle cx={pt.x} cy={pt.y} r="20" fill="url(#nodeActiveGlow)" />
                    <circle cx={pt.x} cy={pt.y} r="14" fill="#EA580C" stroke="#FEF08A" strokeWidth="2" />
                  </>
                )}
                {!isCurrent && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="10.5"
                    fill="#1E0E35"
                    stroke="#F59E0B"
                    strokeWidth="1.8"
                  />
                )}
                <text
                  x={pt.x}
                  y={pt.y + (isCurrent ? 4 : 3.5)}
                  fontSize={isCurrent ? '11' : '9.5'}
                  fontWeight="900"
                  fill={isCurrent ? '#FFFFFF' : '#FDE047'}
                  textAnchor="middle"
                >
                  {pt.num}
                </text>
              </g>
            );
          })}

          {/* DYNAMIC THUMB POINTER TO CURRENT ACTIVE NODE */}
          <g transform={`translate(${activePtObj.x - 12}, ${activePtObj.y + 12})`}>
            <circle cx="12" cy="12" r="5" fill="#EF4444" />
            <text x="12" y="24" fontSize="7" fontWeight="bold" fill="#FDE047" textAnchor="middle">
              अंगूठा
            </text>
          </g>
        </svg>

        {/* Selected Joint Card */}
        <div className="mt-3 p-3 rounded-2xl bg-gradient-to-r from-amber-950/60 to-purple-950/60 border border-amber-500/30 text-white">
          <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
            <span className="text-xs font-black text-amber-300 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[11px] font-black">
                {activePtObj.num}
              </span>
              {activePtObj.name}
            </span>
            <span className="text-[10px] text-amber-200/80 font-bold bg-amber-900/40 px-2 py-0.5 rounded-full border border-amber-500/20">
              {activePtObj.shastraRule}
            </span>
          </div>
          <p className="text-xs text-amber-100/90 leading-relaxed mt-1.5">
            {activePtObj.desc}
          </p>
        </div>

        {/* Quick Shloka Summary */}
        <div className="mt-2.5 p-2 rounded-xl bg-black/40 border border-amber-500/20 text-center">
          <p className="text-[11px] text-amber-300 font-mono italic">
            "१० पोर × १० फेरे = १०० जप + ८ पोर = १०८ जप की १ पूर्ण माला"
          </p>
        </div>
      </div>
    );
  };

  // 2. HIGH-DEFINITION AUTHENTIC MUDRA VISUALIZER
  const renderMudraVisual = (mudra: typeof mudrasList[0]) => {
    return (
      <div className="w-full h-full flex items-center justify-center p-2 relative">
        <img
          src={mudra.imageSrc || '/images/mudras/gyan_mudra.svg'}
          alt={mudra.name}
          className="max-h-full max-w-full object-contain drop-shadow-xl rounded-2xl transition-transform duration-300 hover:scale-105"
        />
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#180A2D] via-[#100620] to-[#0A0414] text-white rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* MODAL HEADER */}
        <div className="relative px-5 pt-4 pb-3.5 bg-gradient-to-r from-orange-950/60 via-amber-900/40 to-purple-950/60 border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md border border-amber-300/40 text-xl">
              🖐️
            </div>
            <div>
              <h2 className="text-base font-black text-amber-100">
                {isHi ? 'करमाला, मुद्रा व जप शास्त्र विधान' : 'Kar-Mala & Hasta Mudra Shastra'}
              </h2>
              <span className="text-[10px] text-amber-300/80 font-medium">
                {isHi ? 'शास्त्र सम्मत प्रामाणिक चित्र व वैज्ञानिक नियम' : 'Authentic Scriptural Diagrams & Practice'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-amber-200 border border-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 4 APPLE-GRADE SEGMENTED PILLS */}
        <div className="p-2.5 bg-black/40 border-b border-white/5 grid grid-cols-4 gap-1.5 text-[11px] font-bold">
          <button
            onClick={() => setActiveTab('kar_mala')}
            className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center gap-0.5 text-center ${
              activeTab === 'kar_mala'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black shadow-md'
                : 'text-amber-200/70 hover:bg-white/5'
            }`}
          >
            <Hand className="w-3.5 h-3.5" />
            <span>{isHi ? 'करमाला' : 'Kar-Mala'}</span>
          </button>

          <button
            onClick={() => setActiveTab('mudra')}
            className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center gap-0.5 text-center ${
              activeTab === 'mudra'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black shadow-md'
                : 'text-amber-200/70 hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isHi ? '८ मुद्राएं' : '8 Mudras'}</span>
          </button>

          <button
            onClick={() => setActiveTab('mala_rules')}
            className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center gap-0.5 text-center ${
              activeTab === 'mala_rules'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black shadow-md'
                : 'text-amber-200/70 hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isHi ? 'माला नियम' : 'Rosary'}</span>
          </button>

          <button
            onClick={() => setActiveTab('asan')}
            className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center gap-0.5 text-center ${
              activeTab === 'asan'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black shadow-md'
                : 'text-amber-200/70 hover:bg-white/5'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{isHi ? '४ आसन' : 'Asanas'}</span>
          </button>
        </div>

        {/* SCROLLABLE CONTENT BODY */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1 scrollbar-thin">
          
          {/* ======================================================== */}
          {/* TAB 1: 10 KAR-MALA POINTS */}
          {/* ======================================================== */}
          {activeTab === 'kar_mala' && (
            <div className="space-y-3.5 animate-fadeIn">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-950/40 to-orange-950/30 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
                <span className="font-bold text-amber-300 block mb-0.5">
                  📜 {isHi ? 'शास्त्रोक्त करमाला श्लोक:' : 'Scriptural Kar-Mala Shloka:'}
                </span>
                <p className="italic font-serif text-amber-100">
                  "अनामिका मध्यमारभ्य प्रदक्षिणक्रमेण तु । तर्जनी मूलपर्यन्तं जपमेवं समाचरेत् ॥"
                </p>
                <p className="text-[10px] text-amber-300/70 mt-1">
                  {isHi
                    ? 'उंगलियों के १० पोरों पर अंगूठे को दक्षिणावर्त (Clockwise) घुमाकर बिना किसी भौतिक माला के १०८ का अखंड जप सिद्ध होता है।'
                    : 'Count 108 chants precisely on the phalanges of your right hand.'}
                </p>
              </div>

              {/* High-Resolution Interactive Visual Hand */}
              {renderKarMalaHand()}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: 8 HASTA MUDRAS */}
          {/* ======================================================== */}
          {activeTab === 'mudra' && (
            <div className="space-y-3.5 animate-fadeIn">
              {/* Horizontal Mudra Selector Carousel */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {mudrasList.map((m, idx) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMudra(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                      selectedMudra === idx
                        ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                        : 'bg-white/5 text-amber-200/70 hover:bg-white/10'
                    }`}
                  >
                    {m.name.split('.')[1]?.trim() || m.name}
                  </button>
                ))}
              </div>

              {/* Active Mudra Presentation Card */}
              {(() => {
                const mudra = mudrasList[selectedMudra] || mudrasList[0];
                return (
                  <div className="space-y-3">
                    {/* Visual Container */}
                    <div className="h-44 w-full bg-gradient-to-b from-[#1E0E35] to-[#120722] rounded-3xl border border-amber-500/30 p-2 flex items-center justify-center relative overflow-hidden shadow-inner">
                      {renderMudraVisual(mudra)}
                    </div>

                    {/* Mudra Details Card */}
                    <div className="p-4 rounded-3xl bg-[#20103A] border border-amber-500/25 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                            {mudra.tag}
                          </span>
                          <h3 className="text-base font-black text-amber-100 mt-1">{mudra.name}</h3>
                          <span className="text-xs text-amber-300/80">{mudra.element}</span>
                        </div>
                      </div>

                      {/* Finger Alignment Specification */}
                      <div className="p-3 rounded-2xl bg-black/30 border border-white/5 space-y-1.5 text-xs">
                        <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{isHi ? 'उंगली संपर्क:' : 'Finger Touch:'} {mudra.fingerTouch}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-amber-200/70">
                          <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{isHi ? 'अन्य उंगलियां:' : 'Other Fingers:'} {mudra.otherFingers}</span>
                        </div>
                      </div>

                      {/* Technique & Benefits */}
                      <div className="space-y-2 text-xs leading-relaxed">
                        <div>
                          <span className="text-amber-300 font-bold block mb-0.5">
                            🧘 {isHi ? 'साधना विधि:' : 'Technique:'}
                          </span>
                          <p className="text-amber-100/80">{mudra.technique}</p>
                        </div>
                        <div>
                          <span className="text-emerald-400 font-bold block mb-0.5">
                            ✨ {isHi ? 'आध्यात्मिक व शारीरिक लाभ:' : 'Benefits:'}
                          </span>
                          <p className="text-amber-100/80">{mudra.benefits}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: MALA HOLDING RULES (माला पकड़ने की शास्त्रोक्त विधि) */}
          {/* ======================================================== */}
          {activeTab === 'mala_rules' && (
            <div className="space-y-3.5 animate-fadeIn">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-red-950/40 via-orange-950/30 to-amber-950/40 border border-red-500/30 text-xs text-amber-100/90 leading-relaxed">
                <span className="font-bold text-red-300 flex items-center gap-1.5 mb-1">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  {isHi ? 'अति महत्वपूर्ण शास्त्रोक्त चेतावनी:' : 'Essential Scriptural Injunction:'}
                </span>
                <p>
                  {isHi
                    ? 'माला जप में तर्जनी उंगली (Index finger) का स्पर्श होने से साधना निष्फल हो जाती है। नीचे दिए गए ४ नियमों का पालन अवश्य करें।'
                    : 'Touching the index finger to beads during chanting nullifies the spiritual fruit. Follow these 4 vital rules.'}
                </p>
              </div>

              {/* 4 Rules Cards */}
              {malaHoldingRules.map((rule) => (
                <div
                  key={rule.id}
                  className="p-4 rounded-3xl bg-[#20103A] border border-amber-500/25 space-y-2 shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{rule.icon}</span>
                    <div>
                      <h4 className="text-sm font-black text-amber-200">{rule.title}</h4>
                      <span className="text-[11px] font-bold text-amber-300/80">{rule.heading}</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-black/40 border border-amber-500/20 text-[11px] text-amber-300 font-serif italic text-center">
                    {rule.shloka}
                  </div>

                  <p className="text-xs text-amber-100/80 leading-relaxed pt-1">
                    {rule.detail}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: 4 ASANAS */}
          {/* ======================================================== */}
          {activeTab === 'asan' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {asanasList.map((a, idx) => (
                  <button
                    key={a.id}
                    onClick={() => setSelectedAsan(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                      selectedAsan === idx
                        ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                        : 'bg-white/5 text-amber-200/70 hover:bg-white/10'
                    }`}
                  >
                    {a.name.split('(')[0]?.trim()}
                  </button>
                ))}
              </div>

              {(() => {
                const asan = asanasList[selectedAsan] || asanasList[0];
                return (
                  <div className="p-4 rounded-3xl bg-[#20103A] border border-amber-500/25 space-y-3">
                    {/* Authentic Asan Sitting Posture Visual */}
                    <div className="h-44 w-full bg-gradient-to-b from-[#1E0E35] to-[#120722] rounded-2xl border border-amber-500/30 p-2 flex items-center justify-center relative overflow-hidden shadow-inner">
                      <img
                        src={asan.imageSrc || '/images/aasans/padmasana.svg'}
                        alt={asan.name}
                        className="max-h-full max-w-full object-contain drop-shadow-xl rounded-xl transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-2xl">
                        {asan.icon}
                      </div>
                      <div>
                        <h3 className="text-base font-black text-amber-100">{asan.name}</h3>
                        <span className="text-xs text-amber-300/80">{asan.subtitle}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-black/30 border border-white/5 space-y-2 text-xs leading-relaxed">
                      <div>
                        <span className="text-amber-300 font-bold block mb-0.5">
                          🧘 {isHi ? 'बैठने की विधि:' : 'Posture:'}
                        </span>
                        <p className="text-amber-100/80">{asan.vidhi}</p>
                      </div>
                      <div>
                        <span className="text-emerald-400 font-bold block mb-0.5">
                          ✨ {isHi ? 'आसन के सिद्ध लाभ:' : 'Benefits:'}
                        </span>
                        <p className="text-amber-100/80">{asan.benefits}</p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Integrated Compact Native Ad */}
          <div className="pt-1">
            <AdMobNativeCard variant="compact" />
          </div>

        </div>

        {/* FOOTER */}
        <div className="p-4 bg-gradient-to-t from-black via-black/80 to-transparent border-t border-amber-500/20">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black text-sm shadow-lg shadow-orange-950/60 active:scale-98 transition-all flex items-center justify-center gap-1.5"
          >
            {isHi ? 'समझ गया, जाप पर लौटें' : 'Understood, Return to Chanting'}
          </button>
        </div>

      </div>
    </div>
  );
};

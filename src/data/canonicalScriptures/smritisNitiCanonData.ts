/**
 * smritisNitiCanonData.ts
 * प्रमुख स्मृतियाँ एवं नीति ग्रंथ (Smritis & Ethics)
 * 1. मनुस्मृति (Manusmriti - मानव धर्मशास्त्र)
 * 2. विदुर नीति (Vidura Niti - महाभारत उद्योग पर्व)
 * 3. चाणक्य नीति (Chanakya Niti)
 * 4. भर्तृहरि नीति शतकम् (Bhartrihari Niti Shatakam)
 */

import { ScriptureBook, createSectionBlock } from './scriptureBase';

// =========================================================================
// 1. मनुस्मृति (MANUSMRITI)
// =========================================================================
export const MANUSMRITI_BOOK: ScriptureBook = {
  id: 'manusmriti_complete',
  titleHi: 'मनुस्मृति (मानव धर्मशास्त्र)',
  titleEn: 'Manusmriti (Sacred Law & Ethics)',
  categoryKey: 'smritis',
  categoryNameHi: 'स्मृतियाँ एवं नीति ग्रंथ',
  categoryNameEn: 'Smritis & Ethics',
  icon: '📜',
  badge: '१२ अध्याय • २६८५ श्लोक सम्पूर्ण',
  totalChaptersCount: 12,
  totalVersesEstimate: '२६८५ श्लोक',
  descriptionHi: `संसार का प्राचीनतम विधि-शास्त्र। आश्रम धर्म, संस्कार, राजा के कर्तव्य, सदाचार के नियम और धर्म के दस शाश्वत लक्षण।`,
  descriptionEn: `The foundational code of righteousness, civic conduct, moral duty, and social ethics.`,
  accentGradient: 'from-orange-700 via-amber-700 to-red-800',
  chapters: [
    {
      chapterIndex: 2,
      chapterTitleHi: `द्वितीय अध्याय: धर्म के लक्षण व सदाचार`,
      chapterTitleEn: `Chapter 2: The Ten Cardinal Virtues of Dharma`,
      totalVersesText: '१० श्लोक',
      sections: [
        createSectionBlock(
          1, 1, 10,
          `धर्म के दस शाश्वत लक्षण एवं आत्मतुष्टि`,
          `Section 1: The Ten Characteristics of Dharma & Inner Conscience`,
          `धृतिः क्षमा दमोऽस्तेयं शौचमिन्द्रियनिग्रहः। धीर्विद्या सत्यमक्रोधो दशकं धर्मलक्षणम्॥`,
          `Steadfastness, forgiveness, self-restraint, non-stealing, purity, sense-control, intellect, sacred wisdom, truthfulness, and freedom from anger—these ten are the eternal characteristics of Dharma.`,
          [
            {
              shlokaNum: 1,
              sanskrit: `विद्वद्भिः सेवितः सद्भिर्नित्यमद्वेषरागिभिः ।
हृदयेनाभ्यनुज्ञातो यो धर्मस्तं निबोधत ॥ १ ॥`,
              hindi: `राग और द्वेष से रहित विद्वान सत्पुरुष जिस आचरण का नित्य सेवन करते हैं, और जिसको मनुष्य का अपना अंतःकरण भी स्वीकार करता है—उसी को वास्तविक "धर्म" समझो।`,
              english: `Know that to be true Dharma which is practiced by virtuous, enlightened men free from attachment and malice, and which is endorsed by one's own conscience.`
            },
            {
              shlokaNum: 2,
              sanskrit: `वेदोऽखिलो धर्ममूलं स्मृतिशीले च तद्विदाम् ।
आचारश्चैव साधूनामात्मनस्तुष्टिरेव च ॥ २ ॥`,
              hindi: `धर्म के चार मुख्य प्रमाण (आधार) हैं: संपूर्ण वेद, वेदों को जानने वालों की स्मृतियाँ व शील, सत्पुरुषों का सदाचार, और अपने अंतरात्मा की पवित्र संतुष्टि (आत्मतुष्टि)।`,
              english: `The whole Veda is the primal source of Dharma; next the tradition and virtuous conduct of Vedic knowers; then the practice of saintly men, and self-contentment of soul.`
            },
            {
              shlokaNum: 3,
              sanskrit: `धृतिः क्षमा दमोऽस्तेयं शौचमिन्द्रियनिग्रहः ।
धीर्विद्या सत्यमक्रोधो दशकं धर्मलक्षणम् ॥ ३ ॥`,
              hindi: `धर्म के दस लक्षण हैं: धृति (धैर्य), क्षमा, दम (मन का नियंत्रण), अस्तेय (चोरी न करना), शौच (तन-मन की शुद्धि), इंद्रियनिग्रह, धी (विवेकपूर्ण बुद्धि), विद्या (आत्मज्ञान), सत्य और अक्रोध।`,
              english: `Steadfastness, forgiveness, self-restraint, non-stealing, purity, sense-mastery, discernment, wisdom, truthfulness, and absence of anger—these ten are the marks of Dharma.`
            },
            {
              shlokaNum: 4,
              sanskrit: `यत्र नार्यस्तु पूज्यन्ते रमन्ते तत्र देवताः ।
यत्रैतास्तु न पूज्यन्ते सर्वास्तत्राफलाः क्रियाः ॥ ४ ॥`,
              hindi: `जहाँ स्त्रियों का सम्मान और सत्कार होता है, वहाँ देवता रमण करते हैं (सुख-समृद्धि बसती है); और जहाँ इनका आदर नहीं होता, वहाँ के समस्त सत्कर्म निष्फल हो जाते हैं।`,
              english: `Where women are revered and honored, there the gods rejoice; but where they are not honored, all sacred actions become fruitless.`
            },
            {
              shlokaNum: 5,
              sanskrit: `शोचन्ति जामयो यत्र विनश्यत्याशु तत्कुलम् ।
न शोचन्ति तु यत्रैता वर्धते तद्ध सर्वदा ॥ ५ ॥`,
              hindi: `जिस कुल में बहन-बेटियाँ और स्त्रियाँ शोक से दुखी रहती हैं, वह कुल शीघ्र ही नष्ट हो जाता है; और जहाँ वे प्रसन्न रहती हैं, वह परिवार सदा फलता-फूलता है।`,
              english: `That family where women grieve soon perishes completely; but that household where they live happily ever prospers.`
            },
            {
              shlokaNum: 6,
              sanskrit: `अहिंसया च भूतानाममृतत्वाय कल्पते ।
सर्वभूतहितैषी यः स याति परमां गतिम् ॥ ६ ॥`,
              hindi: `जो मन, वाणी और कर्म से प्राणियों की अकारण हिंसा नहीं करता, वह अमरता को प्राप्त होता है; जो समस्त प्राणियों का हितैषी है, वही परम गति को पाता है।`,
              english: `By practicing non-injury toward living beings, one becomes fit for immortality; he who seeks the welfare of all beings attains the supreme state.`
            },
            {
              shlokaNum: 7,
              sanskrit: `सत्यं ब्रूयात् प्रियं ब्रूयान्न ब्रूयात्सत्यमप्रियम् ।
प्रियं च नानृतं ब्रूयादेष धर्मः सनातनः ॥ ७ ॥`,
              hindi: `सत्य बोलो, प्रिय बोलो, कभी अप्रिय सत्य न बोलो; और प्रिय लगने वाला असत्य भी कभी न बोलो—यही सनातन धर्म की चिरंतन नीति है।`,
              english: `Speak the truth, speak pleasantly; utter not unpleasant truth, nor utter pleasing falsehood—this is the eternal Sanatana Dharma.`
            },
            {
              shlokaNum: 8,
              sanskrit: `आचाराल्लभते ह्यायुराचारादीप्सिताः प्रजाः ।
आचाराद्धनमक्षय्यमाचारो हन्त्यलक्षणम् ॥ ८ ॥`,
              hindi: `उत्तम सदाचार से दीर्घायु प्राप्त होती है, उत्तम संतान मिलती है, अक्षय धन-संपदा मिलती है; और सदाचार मनुष्य के सारे दुर्भाग्यों को नष्ट कर देता है।`,
              english: `From noble conduct one gains longevity, noble progeny, and imperishable wealth; righteous conduct dissolves all ill-fortune.`
            },
            {
              shlokaNum: 9,
              sanskrit: `सर्वं परवशं दुःखं सर्वमात्मवशं सुखम् ।
एतद्विद्यात् समासेन लक्षणं सुखदुःखयोः ॥ ९ ॥`,
              hindi: `दूसरों के अधीन (पराधीन) होना ही सारा दुःख है, और अपने अधीन (स्वाधीन) होना ही सारा सुख है; संक्षेप में सुख और दुःख की यही सच्ची परिभाषा है।`,
              english: `Everything that is in the control of others is pain; everything that is in one's own self-mastery is joy. Know this in brief as the definition of joy and sorrow.`
            },
            {
              shlokaNum: 10,
              sanskrit: `धर्म एव हतो हन्ति धर्मो रक्षति रक्षितः ।
तस्माद्धर्मो न हन्तव्यो मा नो धर्मो हतोऽवधीत् ॥ १० ॥`,
              hindi: `नष्ट किया हुआ धर्म मनुष्य को नष्ट कर देता है, और रक्षा किया हुआ धर्म मनुष्य की रक्षा करता है। इसलिए धर्म का कभी हनन नहीं करना चाहिए।`,
              english: `Dharma, when destroyed, destroys the violator; Dharma, when protected, protects the protector. Therefore, let not Dharma be undermined, lest it strike us down.`
            }
          ]
        )
      ]
    }
  ]
};

// =========================================================================
// 2. विदुर नीति (VIDURA NITI)
// =========================================================================
export const VIDURA_NITI_BOOK: ScriptureBook = {
  id: 'vidura_niti',
  titleHi: 'महात्मा विदुर नीति',
  titleEn: 'Vidura Niti (Mahabharata Udyoga Parva)',
  categoryKey: 'smritis',
  categoryNameHi: 'स्मृतियाँ एवं नीति ग्रंथ',
  categoryNameEn: 'Smritis & Ethics',
  icon: '⚖️',
  badge: '८ अध्याय • ५०० श्लोक नीति संवाद',
  totalChaptersCount: 8,
  totalVersesEstimate: '५०० श्लोक',
  descriptionHi: `महाभारत के उद्योग पर्व में महात्मा विदुर द्वारा महाराज धृतराष्ट्र को दिया गया राजनीति, सदाचार, विवेक और आंतरिक शांति का अमर उपदेश।`,
  descriptionEn: `The profound ethical counsel delivered by wise Vidura to King Dhritarashtra on statecraft, justice, and inner peace.`,
  accentGradient: 'from-amber-600 via-stone-800 to-indigo-900',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: `अध्याय ३३: पंडित (ज्ञानी) और मूर्ख के लक्षण`,
      chapterTitleEn: `Chapter 33: Hallmarks of the Wise Man and the Fool`,
      totalVersesText: '१० श्लोक',
      sections: [
        createSectionBlock(
          1, 1, 10,
          `पंडित के श्रेष्ठ लक्षण एवं आठ आत्म-गुण`,
          `Section 1: Characteristics of the Truly Wise Mind`,
          `यस्य कृत्यं न जानन्ति मन्त्रं वा मन्त्रितं परे। कृतमेवास्य जानन्ति स वै पण्डित उच्यते॥`,
          `He whose actions, plans, and counsels others know only after they are accomplished—he alone is called truly wise.`,
          [
            {
              shlokaNum: 1,
              sanskrit: `यस्य कृत्यं न विघ्नन्ति शीतमुष्णं भयं रतिः ।
समृद्धिरसमृद्धिर्वा स वै पण्डित उच्यते ॥ १ ॥`,
              hindi: `जिसके कर्तव्य-कर्म में सर्दी, गर्मी, भय, प्रेम, समृद्धि अथवा दरिद्रता कोई बाधा नहीं डाल पाती—वही वास्तव में "पंडित" (ज्ञानी) कहलाता है।`,
              english: `He whose noble actions are not deterred by cold, heat, fear, pleasure, prosperity, or adversity—he alone is called wise.`
            },
            {
              shlokaNum: 2,
              sanskrit: `यस्य कृत्यं न जानन्ति मन्त्रं वा मन्त्रितं परे ।
कृतमेवास्य जानन्ति स वै पण्डित उच्यते ॥ २ ॥`,
              hindi: `जिसके कार्य और गुप्त योजनाओं को दूसरे लोग कार्य पूरा हो जाने के बाद ही जान पाते हैं, पहले से नहीं—वही बुद्धिमान कहलाता है।`,
              english: `He whose intentions and counsels others discover only after they are successfully accomplished—he alone is called wise.`
            },
            {
              shlokaNum: 3,
              sanskrit: `आत्मज्ञानं समारम्भस्तितिक्षा धर्मनित्यता ।
यमर्थान्नापकर्षन्ति स वै पण्डित उच्यते ॥ ३ ॥`,
              hindi: `आत्मज्ञान, सही समय पर कार्य का आरंभ, सहनशीलता और धर्म पर अडिग निष्ठा—जिस पुरुष को ये गुण कभी सन्मार्ग से विचलित नहीं होने देते, वही पंडित है।`,
              english: `Self-knowledge, timely endeavor, forbearance, and steady adherence to righteousness—from which nothing can divert him—he is called wise.`
            },
            {
              shlokaNum: 4,
              sanskrit: `नाप्राप्यमभिवाञ्छन्ति नष्टं नेच्छन्ति शोचितुम् ।
आपत्सु च न मुह्यन्ति नराः पण्डितबुद्धयः ॥ ४ ॥`,
              hindi: `जो असंभव वस्तु की इच्छा नहीं करते, जो खो चुका है उसके लिए व्यर्थ शोक नहीं करते, और विपत्ति आने पर घबराते नहीं—वे ही श्रेष्ठ बुद्धि वाले ज्ञानी हैं।`,
              english: `They desire not the unobtainable, grieve not for what is lost, and lose not their head in adversity—such men possess wise intellects.`
            },
            {
              shlokaNum: 5,
              sanskrit: `निश्चित्य यः प्रक्रमते नान्तर्वसति कर्मणः ।
अवन्ध्यकालो वश्यात्मा स वै पण्डित उच्यते ॥ ५ ॥`,
              hindi: `जो भली-भांति सोच-समझकर कार्य आरंभ करता है, कार्य के बीच में रुकता नहीं, अपने समय को व्यर्थ नहीं जाने देता और मन को वश में रखता है—वही पंडित है।`,
              english: `He who begins an undertaking after due reflection, halts not mid-way, wastes no precious time, and governs his passions—he is called wise.`
            },
            {
              shlokaNum: 6,
              sanskrit: `अनाश्रुतस्तूपहसति ह्यपृष्टो बहु भाषते ।
अविश्वस्ते विश्वसिति मूढचेता नराधमः ॥ ६ ॥`,
              hindi: `मूर्ख के लक्षण: जो बिना ज्ञान के उपहास करता है, बिना पूछे बहुत बोलता है, और अविश्वसनीय व्यक्ति पर भी आँख मूंदकर विश्वास कर लेता है।`,
              english: `Characteristics of a fool: he sneers without listening, babbles unasked, and places trust in the untrustworthy.`
            },
            {
              shlokaNum: 7,
              sanskrit: `एकः पापानि कुरुते फलं भुङ्क्ते महाजनः ।
भोक्तारो विप्रमुच्यन्ते कर्ता दोषेण लिप्यते ॥ ७ ॥`,
              hindi: `पाप एक व्यक्ति करता है और उसका भोग अनेक लोग करते हैं; भोगने वाले तो बच निकलते हैं, किंतु पाप करने वाला स्वयं घोर दंड भोगता है।`,
              english: `One commits sins, and many enjoy the fruits; the enjoyers escape responsibility, but the perpetrator alone is tainted by the guilt.`
            },
            {
              shlokaNum: 8,
              sanskrit: `एकं विषरसो हन्ति शस्त्रेणैकश्च वध्यते ।
सराष्ट्रं सप्रजं हन्ति राजानं मन्त्रविप्लवः ॥ ८ ॥`,
              hindi: `विष केवल एक को मारता है, शस्त्र भी एक को ही मारता है; किंतु गुप्त मंत्रणा (नीति) का भेद खुल जाना पूरे राष्ट्र और प्रजा सहित राजा को नष्ट कर देता है।`,
              english: `Poison kills a single person; a weapon slays only one; but a leak of confidential counsel destroys the ruler together with his kingdom and people.`
            },
            {
              shlokaNum: 9,
              sanskrit: `अक्रोधेन जयेत् क्रोधमसाधुं साधुना जयेत् ।
जयेत् कदर्यं दानेन जयेत् सत्येन चानृतम् ॥ ९ ॥`,
              hindi: `क्रोध को शांत रहकर जीतो; दुष्ट को अपनी भलाई से जीतो; कंजूस को उदारता से जीतो; और असत्य को केवल सत्य के आचरण से जीतो।`,
              english: `Conquer anger by calmness; conquer the wicked by goodness; conquer the miser by generosity; and conquer falsehood by truth.`
            },
            {
              shlokaNum: 10,
              sanskrit: `षड् दोषाः पुरुषेणेह हातव्या भूतिमिच्छता ।
निद्रा तन्द्रा भयं क्रोध आलस्यं दीर्घसूत्रता ॥ १० ॥`,
              hindi: `उन्नति चाहने वाले पुरुष को छह दोषों को तुरंत त्याग देना चाहिए: अधिक सोना, तंद्रा (ऊंघना), भय, क्रोध, आलस्य और काम को टालते रहना (दीर्घसूत्रता)।`,
              english: `Six faults should be avoided by a man who desires prosperity: excessive sleep, lethargy, fear, anger, laziness, and procrastination.`
            }
          ]
        )
      ]
    }
  ]
};

export const SMRITIS_CANON_BOOKS = [
  MANUSMRITI_BOOK,
  VIDURA_NITI_BOOK
];

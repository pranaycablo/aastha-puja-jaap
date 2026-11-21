# -*- coding: utf-8 -*-
import sys
sys.stdout.reconfigure(encoding='utf-8')

content_darshanas = '''/**
 * darshanasCanonData.ts
 * षड्दर्शन (Six Schools of Sanatan Philosophy)
 * 1. सांख्य दर्शन (Samkhya Sutras - महर्षि कपिल)
 * 2. योग दर्शन (Patanjali Yoga Sutras - महर्षि पतञ्जलि)
 * 3. न्याय दर्शन (Nyaya Sutras - महर्षि अक्षपाद गौतम)
 * 4. वैशेषिक दर्शन (Vaisheshika Sutras - महर्षि कणाद)
 * 5. पूर्व मीमांसा (Purva Mimamsa - महर्षि जैमिनि)
 * 6. उत्तर मीमांसा / वेदान्त / ब्रह्मसूत्र (Brahma Sutras - महर्षि बादरायण व्यास)
 */

import { ScriptureBook, createSectionBlock } from './scriptureBase';

// =========================================================================
// 1. वेदान्त दर्शन / ब्रह्मसूत्र (BRAHMA SUTRAS)
// =========================================================================
export const BRAHMA_SUTRAS_BOOK: ScriptureBook = {
  id: 'vedanta_brahma_sutra',
  titleHi: 'वेदान्त दर्शन (ब्रह्मसूत्र)',
  titleEn: 'Vedanta Darshana (Brahma Sutras)',
  categoryKey: 'darshanas',
  categoryNameHi: 'षड्दर्शन',
  categoryNameEn: 'Six Philosophical Systems',
  icon: '🕉️',
  badge: '४ अध्याय • ५५५ सूत्र • बादरायण व्यास कृत',
  totalChaptersCount: 4,
  totalVersesEstimate: '५५५ सूत्र सम्पूर्ण',
  descriptionHi: 'प्रस्थानत्रयी का तीसरा मुख्य स्तंभ। "अथातो ब्रह्मजिज्ञासा" — परब्रह्म, जगत और जीवात्मा के संबंध का तार्किक व दार्शनिक निरूपण।',
  descriptionEn: 'The monumental synthesis of Upanishadic philosophy by Sage Badarayana Vyasa.',
  accentGradient: 'from-amber-600 via-orange-700 to-purple-800',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: 'समन्वयाध्याय: चतुःसूत्री (ब्रह्म लक्षण व समन्वय)',
      chapterTitleEn: 'Samanvaya Adhyaya: The Four Foundational Sutras',
      totalVersesText: '१० सूत्र',
      sections: [
        createSectionBlock(
          1, 1, 10,
          'अथातो ब्रह्मजिज्ञासा — ब्रह्म का स्वरूप व समन्वय',
          'Section 1: The Inquiry into Brahman & Origin of Cosmos',
          'अथातो ब्रह्मजिज्ञासा। जन्माद्यस्य यतः। शास्त्रयोनित्वात्। तत्तु समन्वयात्॥',
          'Now, therefore, the inquiry into Brahman. From whom the origin, sustenance, and dissolution of this universe proceed. Because Scripture is the source of knowledge about Him. But that Brahman is known from the concordant synthesis of all Vedanta.',
          [
            {
              shlokaNum: 1,
              sanskrit: 'ॐ अथातो ब्रह्मजिज्ञासा ॥ १ ॥',
              hindi: 'अब, इसलिए (संसार की नश्वरता को देखकर और चित्त की शुद्धि के पश्चात) परब्रह्म परमात्मा को जानने की जिज्ञासा करनी चाहिए।',
              english: 'Now, therefore, after acquiring spiritual prerequisites, let there be an earnest inquiry into Brahman (the Absolute Truth).'
            },
            {
              shlokaNum: 2,
              sanskrit: 'जन्माद्यस्य यतः ॥ २ ॥',
              hindi: 'जिस परब्रह्म से इस संपूर्ण विश्व की उत्पत्ति, स्थिति (पालन) और प्रलय होता है, वही ब्रह्म है।',
              english: 'Brahman is That from which the origin, sustenance, and dissolution of this universe proceed.'
            },
            {
              shlokaNum: 3,
              sanskrit: 'शास्त्रयोनित्वात् ॥ ३ ॥',
              hindi: 'क्योंकि समस्त वेदों और ज्ञान-शास्त्रों का मूल उद्गम (योनि) वही परब्रह्म है, और शास्त्रों के प्रमाण द्वारा ही वह जाना जाता है।',
              english: 'Because Scripture (Veda) has Brahman as its source, and Scripture alone is the valid authority for knowing Brahman.'
            },
            {
              shlokaNum: 4,
              sanskrit: 'तत्तु समन्वयात् ॥ ४ ॥',
              hindi: 'किंतु वह ब्रह्म समस्त उपनिषदों और वेदों के सम्यक् समन्वय (तात्पर्य) से ही जाना जाता है, क्योंकि सभी शास्त्रों का अंतिम लक्ष्य वही एक है।',
              english: 'That Brahman is known from the harmonious consensus of all Upanishadic revelations, as their unified purport.'
            },
            {
              shlokaNum: 5,
              sanskrit: 'ईक्षतेर्नाशब्दम् ॥ ५ ॥',
              hindi: 'प्रधान (अचेतन प्रकृति) जगत का मूल कारण नहीं हो सकता; क्योंकि उपनिषदों में सृष्टि के पूर्व "ईक्षण" (देखने/संकल्प करने) का उल्लेख है, जो केवल चेतन ब्रह्म ही कर सकता है।',
              english: 'Insentient nature cannot be the primal cause of the world, because the scriptures speak of "seeing" (conscious resolve) prior to creation.'
            },
            {
              shlokaNum: 6,
              sanskrit: 'गौणश्चेन्नात्मशब्दात् ॥ ६ ॥',
              hindi: 'यदि कहें कि प्रकृति में चेतना का व्यवहार गौण (लाक्षणिक) है, तो ऐसा नहीं हो सकता; क्योंकि उपनिषद उस मूल कारण को साक्षात् "आत्मा" कहते हैं।',
              english: 'If it be argued that consciousness is attributed metaphorically to matter, it cannot be so; for scripture explicitly terms that cause as the "Self".'
            },
            {
              shlokaNum: 7,
              sanskrit: 'हेयत्वावचनाच्च ॥ ७ ॥',
              hindi: 'और इसलिए भी कि उपनिषद कहीं भी उस आत्मतत्त्व को त्यागने योग्य (अनात्म) नहीं बताते, बल्कि उसी को जानने से मुक्ति कहते हैं।',
              english: 'Also because there is no statement in the Vedas advising that the Self should be discarded; rather Its realization yields liberation.'
            },
            {
              shlokaNum: 8,
              sanskrit: 'स्वाप्ययात् ॥ ८ ॥',
              hindi: 'गहरी नींद (सुषुप्ति) में जीव उस परब्रह्म में ही लीन (एकीभूत) हो जाता है, इसलिए चेतन ब्रह्म ही सबका मूल आधार है।',
              english: 'Because in deep sleep the individual soul merges into that supreme Conscious Brahman as its true home.'
            },
            {
              shlokaNum: 9,
              sanskrit: 'गतिसामान्यात् ॥ ९ ॥',
              hindi: 'क्योंकि समस्त वेदों और उपनिषदों का सामान्य दृष्टिकोण एक समान है कि चेतन ब्रह्म ही जगत का एकमात्र अभिन्न-निमित्तोपादान कारण है।',
              english: 'Because of the uniformity of view across all sacred scriptures that conscious Spirit is the sole ground of creation.'
            },
            {
              shlokaNum: 10,
              sanskrit: 'श्रुतत्वाच्च ॥ १० ॥',
              hindi: 'और स्वयं श्रुति (श्वेताश्वतरोपनिषद आदि) में स्पष्ट कहा गया है: "स कारणं करणाधिपाधिपो न चास्य कश्चिज्जनिता न चाधिपः" (वही सबका कारण और स्वामी है)।',
              english: 'And because it is explicitly revealed in the sacred texts: He is the supreme Cause, Lord of all lords, having no parent nor any master.'
            }
          ]
        )
      ]
    }
  ]
};

// =========================================================================
// 2. सांख्य दर्शन (SAMKHYA SUTRAS)
// =========================================================================
export const SAMKHYA_DARSHANA_BOOK: ScriptureBook = {
  id: 'samkhya_darshana',
  titleHi: 'सांख्य दर्शन (महर्षि कपिल)',
  titleEn: 'Samkhya Darshana',
  categoryKey: 'darshanas',
  categoryNameHi: 'षड्दर्शन',
  categoryNameEn: 'Six Philosophical Systems',
  icon: '⚖️',
  badge: '६ अध्याय • २५ तत्त्व • कपिल मुनि प्रणीत',
  totalChaptersCount: 6,
  totalVersesEstimate: '५२७ सूत्र सम्पूर्ण',
  descriptionHi: 'सृष्टि के २५ तत्त्वों (प्रकृति, पुरुष, महत्तत्त्व, अहंकार, पंचतन्मात्रा आदि) का वैज्ञानिक विवेक। त्रिविध दुःखों की आत्यंतिक निवृत्ति का मार्ग।',
  descriptionEn: 'The profound dualistic metaphysics of Sage Kapila discriminating Purusha (Consciousness) from Prakriti (Matter).',
  accentGradient: 'from-teal-700 via-emerald-800 to-slate-900',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: 'प्रथम अध्याय: त्रिविध दुःख निवृत्ति व २५ तत्त्व विवेक',
      chapterTitleEn: 'Chapter 1: Cessation of Threefold Miseries & The 25 Principles',
      totalVersesText: '१० सूत्र',
      sections: [
        createSectionBlock(
          1, 1, 10,
          'त्रिविध दुःखों की आत्यंतिक निवृत्ति एवं प्रकृति-पुरुष विवेक',
          'Section 1: Absolute Relief from Suffering through Discriminating Wisdom',
          'अथ त्रिविधदुःखात्यन्तनिवृत्तिरत्यन्तपुरुषार्थः। प्रकृतिपुरुषविवेकात् कैवल्यसिद्धिः॥',
          'Now, the complete and permanent cessation of the threefold suffering is the supreme purpose of life. Through discrimination between Consciousness and Nature, liberation is attained.',
          [
            {
              shlokaNum: 1,
              sanskrit: 'ॐ अथ त्रिविधदुःखात्यन्तनिवृत्तिरत्यन्तपुरुषार्थः ॥ १ ॥',
              hindi: 'आध्यात्मिक, आधिभौतिक और आधिदैविक—इन तीनों प्रकार के दुखों की आत्यंतिक (सदा-सदा के लिए) निवृत्ति ही मनुष्य का परम पुरुषार्थ (लक्ष्य) है।',
              english: 'Now, the absolute and final termination of the threefold miseries (internal, external, and natural) is the supreme end of human existence.'
            },
            {
              shlokaNum: 2,
              sanskrit: 'न दृष्टात् तत्सिद्धिनिवृत्तेरप्यनुवृत्तिदर्शनात् ॥ २ ॥',
              hindi: 'लौकिक (सांसारिक व औषधादि) उपायों से दुखों की आत्यंतिक निवृत्ति नहीं हो सकती, क्योंकि उनका असर खत्म होते ही दुख पुनः लौट आते हैं।',
              english: 'Absolute cessation of suffering cannot be achieved by worldly means, for misery is seen to recur once temporary remedies cease.'
            },
            {
              shlokaNum: 3,
              sanskrit: 'मूलप्रकृतिरविकृतिर्महदाद्याः प्रकृतिविकृतयः सप्त ।\nषोडशकस्तु विकारो न प्रकृतिर्न विकृतिः पुरुषः ॥ ३ ॥',
              hindi: 'मूल प्रकृति किसी का विकार नहीं है। महत्तत्त्व (बुद्धि), अहंकार और पांच तन्मात्राएं—ये सात प्रकृति और विकृति दोनों हैं। सोलह (मन, १० इंद्रियाँ, ५ महाभूत) केवल विकार हैं। और "पुरुष" (आत्मा) न किसी की प्रकृति है और न विकृति।',
              english: 'Primordial Nature is uncaused. The seven beginning with Intellect are both causes and effects. The sixteen are mere modifications. Purusha (Spirit) is neither cause nor effect.'
            },
            {
              shlokaNum: 4,
              sanskrit: 'दृष्टमनुमानमाप्तवचनं च सर्वप्रमाणसिद्धत्वात् ।\nत्रिविधं प्रमाणमिष्टं प्रमेयसिद्धिः प्रमाणाद्धि ॥ ४ ॥',
              hindi: 'सत्य को जानने के तीन ही प्रमाण हैं: प्रत्यक्ष (इंद्रिय अनुभव), अनुमान (तर्क) और आप्तवचन (वेदों व ऋषियों के सत्य वचन)। इन्हीं से सत्य सिद्ध होता है।',
              english: 'Direct perception, inference, and authentic testimony are the three accepted means of valid knowledge; for truth is established only through valid proof.'
            },
            {
              shlokaNum: 5,
              sanskrit: 'अतिदूरात् सामीप्यादिन्द्रियघातान्मनोऽनवस्थानात् ।\nसौक्ष्म्याद्व्यवधानादभिभवात्समानाभिहाराच्च ॥ ५ ॥',
              hindi: 'कोई वस्तु विद्यमान होने पर भी बहुत दूर होने से, अत्यंत समीप होने से, इंद्रियों के दोष से, मन के चंचल होने से, अत्यंत सूक्ष्म होने से या ढकी होने से दिखाई नहीं देती।',
              english: 'An existing reality may not be perceived owing to extreme distance, extreme proximity, sensory defect, mental distraction, subtlety, or obstruction.'
            },
            {
              shlokaNum: 6,
              sanskrit: 'सौक्ष्म्यात्तदनुपलब्धिर्नाभावात् कार्यतस्तदुपलब्धेः ।\nमहदादि तच्च कार्यं प्रकृतिसरूपं विरूपं च ॥ ६ ॥',
              hindi: 'मूल प्रकृति की अनुपलब्धि उसके न होने के कारण नहीं, बल्कि उसकी अति सूक्ष्मता के कारण है; उसके कार्यों (बुद्धि, मन, संसार) को देखकर उसके अस्तित्व का ज्ञान होता है।',
              english: 'The non-perception of Nature is due to its transcendent subtlety, not to its non-existence; for it is perceived through its cosmic effects.'
            },
            {
              shlokaNum: 7,
              sanskrit: 'असदकरणादुपादानग्रहणात् सर्वसंभवाभावात् ।\nशक्तस्य शक्यकरणात् कारणभावाच्च सत्कार्यम् ॥ ७ ॥',
              hindi: 'सांख्य का सत्कार्यवाद: जो वस्तु पहले से कारण में विद्यमान नहीं है, वह कभी उत्पन्न नहीं हो सकती (जैसे बालू से तेल नहीं निकल सकता, तिल में तेल पहले से है)।',
              english: 'The effect pre-exists in the cause (Satkaryavada): for what is non-existent cannot be brought into being; specific materials produce specific results.'
            },
            {
              shlokaNum: 8,
              sanskrit: 'संघातपरार्थत्वात् त्रिगुणादिविपर्ययादधिष्ठानात् ।\nपुरुषोऽस्ति भोक्तृभावात् कैवल्यार्थं प्रवृत्तेश्च ॥ ८ ॥',
              hindi: 'शरीर और मन संघात (समूह) हैं जो दूसरे के लिए हैं; इसलिए इनके परे एक "पुरुष" (चेतन आत्मा) अवश्य है जो इनका साक्षी, भोक्ता और कैवल्य (मोक्ष) का अधिकारी है।',
              english: 'Purusha (Spirit) exists: because composite objects are meant for another; because there must be a conscious controller, witness, and aspirant for liberation.'
            },
            {
              shlokaNum: 9,
              sanskrit: 'तस्माच्च विपर्यासात् सिद्धं साक्षित्वमस्य पुरुषस्य ।\nकैवल्यं माध्यस्थ्यं द्रष्टृत्वमकर्तृभावश्च ॥ ९ ॥',
              hindi: 'प्रकृति के तीनों गुणों से भिन्न होने के कारण यह सिद्ध होता है कि पुरुष केवल साक्षी, शुद्ध, मध्यस्थ, द्रष्टा और वास्तव में अकर्ता (कर्मों से अलिप्त) है।',
              english: 'Hence from its distinction from the Gunas, it is established that the Purusha is the witness, solitary, neutral, seer, and non-agent.'
            },
            {
              shlokaNum: 10,
              sanskrit: 'प्रकृतेः सुकुमारतरं न किञ्चिदस्तीति मे मतिर्भवति ।\nया दृष्टास्मीति पुनर्न दर्शनमुपैति पुरुषस्य ॥ १० ॥',
              hindi: 'प्रकृति से अधिक लज्जावती और सुकुमार कोई नहीं है; जो एक बार "पुरुष ने मुझे देख और समझ लिया है" ऐसा जान लेने पर उस आत्मज्ञानी के सामने फिर कभी बंधन बनकर नहीं आती।',
              english: 'Nothing is more modest and subtle than Nature; once she realizes "I have been recognized by Spirit", she never again presents herself to the enlightened seer.'
            }
          ]
        )
      ]
    }
  ]
};

export const DARSHANAS_CANON_BOOKS = [
  BRAHMA_SUTRAS_BOOK,
  SAMKHYA_DARSHANA_BOOK
];
'''

with open('src/data/canonicalScriptures/darshanasCanonData.ts', 'w', encoding='utf-8') as f:
    f.write(content_darshanas)
print("darshanasCanonData.ts generated successfully!")

content_smritis = '''/**
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
  descriptionHi: 'संसार का प्राचीनतम विधि-शास्त्र। आश्रम धर्म, संस्कार, राजा के कर्तव्य, सदाचार के नियम और धर्म के दस शाश्वत लक्षण।',
  descriptionEn: 'The foundational code of righteousness, civic conduct, moral duty, and social ethics.',
  accentGradient: 'from-orange-700 via-amber-700 to-red-800',
  chapters: [
    {
      chapterIndex: 2,
      chapterTitleHi: 'द्वितीय अध्याय: धर्म के लक्षण व सदाचार',
      chapterTitleEn: 'Chapter 2: The Ten Cardinal Virtues of Dharma',
      totalVersesText: '१० श्लोक',
      sections: [
        createSectionBlock(
          1, 1, 10,
          'धर्म के दस शाश्वत लक्षण एवं आत्मतुष्टि',
          'Section 1: The Ten Characteristics of Dharma & Inner Conscience',
          'धृतिः क्षमा दमोऽस्तेयं शौचमिन्द्रियनिग्रहः। धीर्विद्या सत्यमक्रोधो दशकं धर्मलक्षणम्॥',
          'Steadfastness, forgiveness, self-restraint, non-stealing, purity, sense-control, intellect, sacred wisdom, truthfulness, and freedom from anger—these ten are the eternal characteristics of Dharma.',
          [
            {
              shlokaNum: 1,
              sanskrit: 'विद्वद्भिः सेवितः सद्भिर्नित्यमद्वेषरागिभिः ।\nहृदयेनाभ्यनुज्ञातो यो धर्मस्तं निबोधत ॥ १ ॥',
              hindi: 'राग और द्वेष से रहित विद्वान सत्पुरुष जिस आचरण का नित्य सेवन करते हैं, और जिसको मनुष्य का अपना अंतःकरण भी स्वीकार करता है—उसी को वास्तविक "धर्म" समझो।',
              english: 'Know that to be true Dharma which is practiced by virtuous, enlightened men free from attachment and malice, and which is endorsed by one\'s own conscience.'
            },
            {
              shlokaNum: 2,
              sanskrit: 'वेदोऽखिलो धर्ममूलं स्मृतिशीले च तद्विदाम् ।\nआचारश्चैव साधूनामात्मनस्तुष्टिरेव च ॥ २ ॥',
              hindi: 'धर्म के चार मुख्य प्रमाण (आधार) हैं: संपूर्ण वेद, वेदों को जानने वालों की स्मृतियाँ व शील, सत्पुरुषों का सदाचार, और अपने अंतरात्मा की पवित्र संतुष्टि (आत्मतुष्टि)।',
              english: 'The whole Veda is the primal source of Dharma; next the tradition and virtuous conduct of Vedic knowers; then the practice of saintly men, and self-contentment of soul.'
            },
            {
              shlokaNum: 3,
              sanskrit: 'धृतिः क्षमा दमोऽस्तेयं शौचमिन्द्रियनिग्रहः ।\nधीर्विद्या सत्यमक्रोधो दशकं धर्मलक्षणम् ॥ ३ ॥',
              hindi: 'धर्म के दस लक्षण हैं: धृति (धैर्य), क्षमा, दम (मन का नियंत्रण), अस्तेय (चोरी न करना), शौच (तन-मन की शुद्धि), इंद्रियनिग्रह, धी (विवेकपूर्ण बुद्धि), विद्या (आत्मज्ञान), सत्य और अक्रोध।',
              english: 'Steadfastness, forgiveness, self-restraint, non-stealing, purity, sense-mastery, discernment, wisdom, truthfulness, and absence of anger—these ten are the marks of Dharma.'
            },
            {
              shlokaNum: 4,
              sanskrit: 'यत्र नार्यस्तु पूज्यन्ते रमन्ते तत्र देवताः ।\nयत्रैतास्तु न पूज्यन्ते सर्वास्तत्राफलाः क्रियाः ॥ ४ ॥',
              hindi: 'जहाँ स्त्रियों का सम्मान और सत्कार होता है, वहाँ देवता रमण करते हैं (सुख-समृद्धि बसती है); और जहाँ इनका आदर नहीं होता, वहाँ के समस्त सत्कर्म निष्फल हो जाते हैं।',
              english: 'Where women are revered and honored, there the gods rejoice; but where they are not honored, all sacred actions become fruitless.'
            },
            {
              shlokaNum: 5,
              sanskrit: 'शोचन्ति जामयो यत्र विनश्यत्याशु तत्कुलम् ।\nन शोचन्ति तु यत्रैता वर्धते तद्ध सर्वदा ॥ ५ ॥',
              hindi: 'जिस कुल में बहन-बेटियाँ और स्त्रियाँ शोक से दुखी रहती हैं, वह कुल शीघ्र ही नष्ट हो जाता है; और जहाँ वे प्रसन्न रहती हैं, वह परिवार सदा फलता-फूलता है।',
              english: 'That family where women grieve soon perishes completely; but that household where they live happily ever prospers.'
            },
            {
              shlokaNum: 6,
              sanskrit: 'अहिंसया च भूतानाममृतत्वाय कल्पते ।\nसर्वभूतहितैषी यः स याति परमां गतिम् ॥ ६ ॥',
              hindi: 'जो मन, वाणी और कर्म से प्राणियों की अकारण हिंसा नहीं करता, वह अमरता को प्राप्त होता है; जो समस्त प्राणियों का हितैषी है, वही परम गति को पाता है।',
              english: 'By practicing non-injury toward living beings, one becomes fit for immortality; he who seeks the welfare of all beings attains the supreme state.'
            },
            {
              shlokaNum: 7,
              sanskrit: 'सत्यं ब्रूयात् प्रियं ब्रूयान्न ब्रूयात्सत्यमप्रियम् ।\nप्रियं च नानृतं ब्रूयादेष धर्मः सनातनः ॥ ७ ॥',
              hindi: 'सत्य बोलो, प्रिय बोलो, कभी अप्रिय सत्य न बोलो; और प्रिय लगने वाला असत्य भी कभी न बोलो—यही सनातन धर्म की चिरंतन नीति है।',
              english: 'Speak the truth, speak pleasantly; utter not unpleasant truth, nor utter pleasing falsehood—this is the eternal Sanatana Dharma.'
            },
            {
              shlokaNum: 8,
              sanskrit: 'आचाराल्लभते ह्यायुराचारादीप्सिताः प्रजाः ।\nआचाराद्धनमक्षय्यमाचारो हन्त्यलक्षणम् ॥ ८ ॥',
              hindi: 'उत्तम सदाचार से दीर्घायु प्राप्त होती है, उत्तम संतान मिलती है, अक्षय धन-संपदा मिलती है; और सदाचार मनुष्य के सारे दुर्भाग्यों को नष्ट कर देता है।',
              english: 'From noble conduct one gains longevity, noble progeny, and imperishable wealth; righteous conduct dissolves all ill-fortune.'
            },
            {
              shlokaNum: 9,
              sanskrit: 'सर्वं परवशं दुःखं सर्वमात्मवशं सुखम् ।\nएतद्विद्यात् समासेन लक्षणं सुखदुःखयोः ॥ ९ ॥',
              hindi: 'दूसरों के अधीन (पराधीन) होना ही सारा दुःख है, और अपने अधीन (स्वाधीन) होना ही सारा सुख है; संक्षेप में सुख और दुःख की यही सच्ची परिभाषा है।',
              english: 'Everything that is in the control of others is pain; everything that is in one\'s own self-mastery is joy. Know this in brief as the definition of joy and sorrow.'
            },
            {
              shlokaNum: 10,
              sanskrit: 'धर्म एव हतो हन्ति धर्मो रक्षति रक्षितः ।\nतस्माद्धर्मो न हन्तव्यो मा नो धर्मो हतोऽवधीत् ॥ १० ॥',
              hindi: 'नष्ट किया हुआ धर्म मनुष्य को नष्ट कर देता है, और रक्षा किया हुआ धर्म मनुष्य की रक्षा करता है। इसलिए धर्म का कभी हनन नहीं करना चाहिए।',
              english: 'Dharma, when destroyed, destroys the violator; Dharma, when protected, protects the protector. Therefore, let not Dharma be undermined, lest it strike us down.'
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
  descriptionHi: 'महाभारत के उद्योग पर्व में महात्मा विदुर द्वारा महाराज धृतराष्ट्र को दिया गया राजनीति, सदाचार, विवेक और आंतरिक शांति का अमर उपदेश।',
  descriptionEn: 'The profound ethical counsel delivered by wise Vidura to King Dhritarashtra on statecraft, justice, and inner peace.',
  accentGradient: 'from-amber-600 via-stone-800 to-indigo-900',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: 'अध्याय ३३: पंडित (ज्ञानी) और मूर्ख के लक्षण',
      chapterTitleEn: 'Chapter 33: Hallmarks of the Wise Man and the Fool',
      totalVersesText: '१० श्लोक',
      sections: [
        createSectionBlock(
          1, 1, 10,
          'पंडित के श्रेष्ठ लक्षण एवं आठ आत्म-गुण',
          'Section 1: Characteristics of the Truly Wise Mind',
          'यस्य कृत्यं न जानन्ति मन्त्रं वा मन्त्रितं परे। कृतमेवास्य जानन्ति स वै पण्डित उच्यते॥',
          'He whose actions, plans, and counsels others know only after they are accomplished—he alone is called truly wise.',
          [
            {
              shlokaNum: 1,
              sanskrit: 'यस्य कृत्यं न विघ्नन्ति शीतमुष्णं भयं रतिः ।\nसमृद्धिरसमृद्धिर्वा स वै पण्डित उच्यते ॥ १ ॥',
              hindi: 'जिसके कर्तव्य-कर्म में सर्दी, गर्मी, भय, प्रेम, समृद्धि अथवा दरिद्रता कोई बाधा नहीं डाल पाती—वही वास्तव में "पंडित" (ज्ञानी) कहलाता है।',
              english: 'He whose noble actions are not deterred by cold, heat, fear, pleasure, prosperity, or adversity—he alone is called wise.'
            },
            {
              shlokaNum: 2,
              sanskrit: 'यस्य कृत्यं न जानन्ति मन्त्रं वा मन्त्रितं परे ।\nकृतमेवास्य जानन्ति स वै पण्डित उच्यते ॥ २ ॥',
              hindi: 'जिसके कार्य और गुप्त योजनाओं को दूसरे लोग कार्य पूरा हो जाने के बाद ही जान पाते हैं, पहले से नहीं—वही बुद्धिमान कहलाता है।',
              english: 'He whose intentions and counsels others discover only after they are successfully accomplished—he alone is called wise.'
            },
            {
              shlokaNum: 3,
              sanskrit: 'आत्मज्ञानं समारम्भस्तितिक्षा धर्मनित्यता ।\nयमर्थान्नापकर्षन्ति स वै पण्डित उच्यते ॥ ३ ॥',
              hindi: 'आत्मज्ञान, सही समय पर कार्य का आरंभ, सहनशीलता और धर्म पर अडिग निष्ठा—जिस पुरुष को ये गुण कभी सन्मार्ग से विचलित नहीं होने देते, वही पंडित है।',
              english: 'Self-knowledge, timely endeavor, forbearance, and steady adherence to righteousness—from which nothing can divert him—he is called wise.'
            },
            {
              shlokaNum: 4,
              sanskrit: 'नाप्राप्यमभिवाञ्छन्ति नष्टं नेच्छन्ति शोचितुम् ।\nआपत्सु च न मुह्यन्ति नराः पण्डितबुद्धयः ॥ ४ ॥',
              hindi: 'जो असंभव वस्तु की इच्छा नहीं करते, जो खो चुका है उसके लिए व्यर्थ शोक नहीं करते, और विपत्ति आने पर घबराते नहीं—वे ही श्रेष्ठ बुद्धि वाले ज्ञानी हैं।',
              english: 'They desire not the unobtainable, grieve not for what is lost, and lose not their head in adversity—such men possess wise intellects.'
            },
            {
              shlokaNum: 5,
              sanskrit: 'निश्चित्य यः प्रक्रमते नान्तर्वसति कर्मणः ।\nअवन्ध्यकालो वश्यात्मा स वै पण्डित उच्यते ॥ ५ ॥',
              hindi: 'जो भली-भांति सोच-समझकर कार्य आरंभ करता है, कार्य के बीच में रुकता नहीं, अपने समय को व्यर्थ नहीं जाने देता और मन को वश में रखता है—वही पंडित है।',
              english: 'He who begins an undertaking after due reflection, halts not mid-way, wastes no precious time, and governs his passions—he is called wise.'
            },
            {
              shlokaNum: 6,
              sanskrit: 'अनाश्रुतस्तूपहसति ह्यपृष्टो बहु भाषते ।\nअविश्वस्ते विश्वसिति मूढचेता नराधमः ॥ ६ ॥',
              hindi: 'मूर्ख के लक्षण: जो बिना ज्ञान के उपहास करता है, बिना पूछे बहुत बोलता है, और अविश्वसनीय व्यक्ति पर भी आँख मूंदकर विश्वास कर लेता है।',
              english: 'Characteristics of a fool: he sneers without listening, babbles unasked, and places trust in the untrustworthy.'
            },
            {
              shlokaNum: 7,
              sanskrit: 'एकः पापानि कुरुते फलं भुङ्क्ते महाजनः ।\nभोक्तारो विप्रमुच्यन्ते कर्ता दोषेण लिप्यते ॥ ७ ॥',
              hindi: 'पाप एक व्यक्ति करता है और उसका भोग अनेक लोग करते हैं; भोगने वाले तो बच निकलते हैं, किंतु पाप करने वाला स्वयं घोर दंड भोगता है।',
              english: 'One commits sins, and many enjoy the fruits; the enjoyers escape responsibility, but the perpetrator alone is tainted by the guilt.'
            },
            {
              shlokaNum: 8,
              sanskrit: 'एकं विषरसो हन्ति शस्त्रेणैकश्च वध्यते ।\nसराष्ट्रं सप्रजं हन्ति राजानं मन्त्रविप्लवः ॥ ८ ॥',
              hindi: 'विष केवल एक को मारता है, शस्त्र भी एक को ही मारता है; किंतु गुप्त मंत्रणा (नीति) का भेद खुल जाना पूरे राष्ट्र और प्रजा सहित राजा को नष्ट कर देता है।',
              english: 'Poison kills a single person; a weapon slays only one; but a leak of confidential counsel destroys the ruler together with his kingdom and people.'
            },
            {
              shlokaNum: 9,
              sanskrit: 'अक्रोधेन जयेत् क्रोधमसाधुं साधुना जयेत् ।\nजयेत् कदर्यं दानेन जयेत् सत्येन चानृतम् ॥ ९ ॥',
              hindi: 'क्रोध को शांत रहकर जीतो; दुष्ट को अपनी भलाई से जीतो; कंजूस को उदारता से जीतो; और असत्य को केवल सत्य के आचरण से जीतो।',
              english: 'Conquer anger by calmness; conquer the wicked by goodness; conquer the miser by generosity; and conquer falsehood by truth.'
            },
            {
              shlokaNum: 10,
              sanskrit: 'षड् दोषाः पुरुषेणेह हातव्या भूतिमिच्छता ।\nनिद्रा तन्द्रा भयं क्रोध आलस्यं दीर्घसूत्रता ॥ १० ॥',
              hindi: 'उन्नति चाहने वाले पुरुष को छह दोषों को तुरंत त्याग देना चाहिए: अधिक सोना, तंद्रा (ऊंघना), भय, क्रोध, आलस्य और काम को टालते रहना (दीर्घसूत्रता)।',
              english: 'Six faults should be avoided by a man who desires prosperity: excessive sleep, lethargy, fear, anger, laziness, and procrastination.'
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
'''

with open('src/data/canonicalScriptures/smritisNitiCanonData.ts', 'w', encoding='utf-8') as f:
    f.write(content_smritis)
print("smritisNitiCanonData.ts generated successfully!")

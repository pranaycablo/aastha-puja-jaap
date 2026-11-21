/**
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
  descriptionHi: `प्रस्थानत्रयी का तीसरा मुख्य स्तंभ। "अथातो ब्रह्मजिज्ञासा" — परब्रह्म, जगत और जीवात्मा के संबंध का तार्किक व दार्शनिक निरूपण।`,
  descriptionEn: `The monumental synthesis of Upanishadic philosophy by Sage Badarayana Vyasa.`,
  accentGradient: 'from-amber-600 via-orange-700 to-purple-800',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: `समन्वयाध्याय: चतुःसूत्री (ब्रह्म लक्षण व समन्वय)`,
      chapterTitleEn: `Samanvaya Adhyaya: The Four Foundational Sutras`,
      totalVersesText: '१० सूत्र',
      sections: [
        createSectionBlock(
          1, 1, 10,
          `अथातो ब्रह्मजिज्ञासा — ब्रह्म का स्वरूप व समन्वय`,
          `Section 1: The Inquiry into Brahman & Origin of Cosmos`,
          `अथातो ब्रह्मजिज्ञासा। जन्माद्यस्य यतः। शास्त्रयोनित्वात्। तत्तु समन्वयात्॥`,
          `Now, therefore, the inquiry into Brahman. From whom the origin, sustenance, and dissolution of this universe proceed. Because Scripture is the source of knowledge about Him. But that Brahman is known from the concordant synthesis of all Vedanta.`,
          [
            {
              shlokaNum: 1,
              sanskrit: `ॐ अथातो ब्रह्मजिज्ञासा ॥ १ ॥`,
              hindi: `अब, इसलिए (संसार की नश्वरता को देखकर और चित्त की शुद्धि के पश्चात) परब्रह्म परमात्मा को जानने की जिज्ञासा करनी चाहिए।`,
              english: `Now, therefore, after acquiring spiritual prerequisites, let there be an earnest inquiry into Brahman (the Absolute Truth).`
            },
            {
              shlokaNum: 2,
              sanskrit: `जन्माद्यस्य यतः ॥ २ ॥`,
              hindi: `जिस परब्रह्म से इस संपूर्ण विश्व की उत्पत्ति, स्थिति (पालन) और प्रलय होता है, वही ब्रह्म है।`,
              english: `Brahman is That from which the origin, sustenance, and dissolution of this universe proceed.`
            },
            {
              shlokaNum: 3,
              sanskrit: `शास्त्रयोनित्वात् ॥ ३ ॥`,
              hindi: `क्योंकि समस्त वेदों और ज्ञान-शास्त्रों का मूल उद्गम (योनि) वही परब्रह्म है, और शास्त्रों के प्रमाण द्वारा ही वह जाना जाता है।`,
              english: `Because Scripture (Veda) has Brahman as its source, and Scripture alone is the valid authority for knowing Brahman.`
            },
            {
              shlokaNum: 4,
              sanskrit: `तत्तु समन्वयात् ॥ ४ ॥`,
              hindi: `किंतु वह ब्रह्म समस्त उपनिषदों और वेदों के सम्यक् समन्वय (तात्पर्य) से ही जाना जाता है, क्योंकि सभी शास्त्रों का अंतिम लक्ष्य वही एक है।`,
              english: `That Brahman is known from the harmonious consensus of all Upanishadic revelations, as their unified purport.`
            },
            {
              shlokaNum: 5,
              sanskrit: `ईक्षतेर्नाशब्दम् ॥ ५ ॥`,
              hindi: `प्रधान (अचेतन प्रकृति) जगत का मूल कारण नहीं हो सकता; क्योंकि उपनिषदों में सृष्टि के पूर्व "ईक्षण" (देखने/संकल्प करने) का उल्लेख है, जो केवल चेतन ब्रह्म ही कर सकता है।`,
              english: `Insentient nature cannot be the primal cause of the world, because the scriptures speak of "seeing" (conscious resolve) prior to creation.`
            },
            {
              shlokaNum: 6,
              sanskrit: `गौणश्चेन्नात्मशब्दात् ॥ ६ ॥`,
              hindi: `यदि कहें कि प्रकृति में चेतना का व्यवहार गौण (लाक्षणिक) है, तो ऐसा नहीं हो सकता; क्योंकि उपनिषद उस मूल कारण को साक्षात् "आत्मा" कहते हैं।`,
              english: `If it be argued that consciousness is attributed metaphorically to matter, it cannot be so; for scripture explicitly terms that cause as the "Self".`
            },
            {
              shlokaNum: 7,
              sanskrit: `हेयत्वावचनाच्च ॥ ७ ॥`,
              hindi: `और इसलिए भी कि उपनिषद कहीं भी उस आत्मतत्त्व को त्यागने योग्य (अनात्म) नहीं बताते, बल्कि उसी को जानने से मुक्ति कहते हैं।`,
              english: `Also because there is no statement in the Vedas advising that the Self should be discarded; rather Its realization yields liberation.`
            },
            {
              shlokaNum: 8,
              sanskrit: `स्वाप्ययात् ॥ ८ ॥`,
              hindi: `गहरी नींद (सुषुप्ति) में जीव उस परब्रह्म में ही लीन (एकीभूत) हो जाता है, इसलिए चेतन ब्रह्म ही सबका मूल आधार है।`,
              english: `Because in deep sleep the individual soul merges into that supreme Conscious Brahman as its true home.`
            },
            {
              shlokaNum: 9,
              sanskrit: `गतिसामान्यात् ॥ ९ ॥`,
              hindi: `क्योंकि समस्त वेदों और उपनिषदों का सामान्य दृष्टिकोण एक समान है कि चेतन ब्रह्म ही जगत का एकमात्र अभिन्न-निमित्तोपादान कारण है।`,
              english: `Because of the uniformity of view across all sacred scriptures that conscious Spirit is the sole ground of creation.`
            },
            {
              shlokaNum: 10,
              sanskrit: `श्रुतत्वाच्च ॥ १० ॥`,
              hindi: `और स्वयं श्रुति (श्वेताश्वतरोपनिषद आदि) में स्पष्ट कहा गया है: "स कारणं करणाधिपाधिपो न चास्य कश्चिज्जनिता न चाधिपः" (वही सबका कारण और स्वामी है)।`,
              english: `And because it is explicitly revealed in the sacred texts: He is the supreme Cause, Lord of all lords, having no parent nor any master.`
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
  descriptionHi: `सृष्टि के २५ तत्त्वों (प्रकृति, पुरुष, महत्तत्त्व, अहंकार, पंचतन्मात्रा आदि) का वैज्ञानिक विवेक। त्रिविध दुःखों की आत्यंतिक निवृत्ति का मार्ग।`,
  descriptionEn: `The profound dualistic metaphysics of Sage Kapila discriminating Purusha (Consciousness) from Prakriti (Matter).`,
  accentGradient: 'from-teal-700 via-emerald-800 to-slate-900',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: `प्रथम अध्याय: त्रिविध दुःख निवृत्ति व २५ तत्त्व विवेक`,
      chapterTitleEn: `Chapter 1: Cessation of Threefold Miseries & The 25 Principles`,
      totalVersesText: '१० सूत्र',
      sections: [
        createSectionBlock(
          1, 1, 10,
          `त्रिविध दुःखों की आत्यंतिक निवृत्ति एवं प्रकृति-पुरुष विवेक`,
          `Section 1: Absolute Relief from Suffering through Discriminating Wisdom`,
          `अथ त्रिविधदुःखात्यन्तनिवृत्तिरत्यन्तपुरुषार्थः। प्रकृतिपुरुषविवेकात् कैवल्यसिद्धिः॥`,
          `Now, the complete and permanent cessation of the threefold suffering is the supreme purpose of life. Through discrimination between Consciousness and Nature, liberation is attained.`,
          [
            {
              shlokaNum: 1,
              sanskrit: `ॐ अथ त्रिविधदुःखात्यन्तनिवृत्तिरत्यन्तपुरुषार्थः ॥ १ ॥`,
              hindi: `आध्यात्मिक, आधिभौतिक और आधिदैविक—इन तीनों प्रकार के दुखों की आत्यंतिक (सदा-सदा के लिए) निवृत्ति ही मनुष्य का परम पुरुषार्थ (लक्ष्य) है।`,
              english: `Now, the absolute and final termination of the threefold miseries (internal, external, and natural) is the supreme end of human existence.`
            },
            {
              shlokaNum: 2,
              sanskrit: `न दृष्टात् तत्सिद्धिनिवृत्तेरप्यनुवृत्तिदर्शनात् ॥ २ ॥`,
              hindi: `लौकिक (सांसारिक व औषधादि) उपायों से दुखों की आत्यंतिक निवृत्ति नहीं हो सकती, क्योंकि उनका असर खत्म होते ही दुख पुनः लौट आते हैं।`,
              english: `Absolute cessation of suffering cannot be achieved by worldly means, for misery is seen to recur once temporary remedies cease.`
            },
            {
              shlokaNum: 3,
              sanskrit: `मूलप्रकृतिरविकृतिर्महदाद्याः प्रकृतिविकृतयः सप्त ।
षोडशकस्तु विकारो न प्रकृतिर्न विकृतिः पुरुषः ॥ ३ ॥`,
              hindi: `मूल प्रकृति किसी का विकार नहीं है। महत्तत्त्व (बुद्धि), अहंकार और पांच तन्मात्राएं—ये सात प्रकृति और विकृति दोनों हैं। सोलह (मन, १० इंद्रियाँ, ५ महाभूत) केवल विकार हैं। और "पुरुष" (आत्मा) न किसी की प्रकृति है और न विकृति।`,
              english: `Primordial Nature is uncaused. The seven beginning with Intellect are both causes and effects. The sixteen are mere modifications. Purusha (Spirit) is neither cause nor effect.`
            },
            {
              shlokaNum: 4,
              sanskrit: `दृष्टमनुमानमाप्तवचनं च सर्वप्रमाणसिद्धत्वात् ।
त्रिविधं प्रमाणमिष्टं प्रमेयसिद्धिः प्रमाणाद्धि ॥ ४ ॥`,
              hindi: `सत्य को जानने के तीन ही प्रमाण हैं: प्रत्यक्ष (इंद्रिय अनुभव), अनुमान (तर्क) और आप्तवचन (वेदों व ऋषियों के सत्य वचन)। इन्हीं से सत्य सिद्ध होता है।`,
              english: `Direct perception, inference, and authentic testimony are the three accepted means of valid knowledge; for truth is established only through valid proof.`
            },
            {
              shlokaNum: 5,
              sanskrit: `अतिदूरात् सामीप्यादिन्द्रियघातान्मनोऽनवस्थानात् ।
सौक्ष्म्याद्व्यवधानादभिभवात्समानाभिहाराच्च ॥ ५ ॥`,
              hindi: `कोई वस्तु विद्यमान होने पर भी बहुत दूर होने से, अत्यंत समीप होने से, इंद्रियों के दोष से, मन के चंचल होने से, अत्यंत सूक्ष्म होने से या ढकी होने से दिखाई नहीं देती।`,
              english: `An existing reality may not be perceived owing to extreme distance, extreme proximity, sensory defect, mental distraction, subtlety, or obstruction.`
            },
            {
              shlokaNum: 6,
              sanskrit: `सौक्ष्म्यात्तदनुपलब्धिर्नाभावात् कार्यतस्तदुपलब्धेः ।
महदादि तच्च कार्यं प्रकृतिसरूपं विरूपं च ॥ ६ ॥`,
              hindi: `मूल प्रकृति की अनुपलब्धि उसके न होने के कारण नहीं, बल्कि उसकी अति सूक्ष्मता के कारण है; उसके कार्यों (बुद्धि, मन, संसार) को देखकर उसके अस्तित्व का ज्ञान होता है।`,
              english: `The non-perception of Nature is due to its transcendent subtlety, not to its non-existence; for it is perceived through its cosmic effects.`
            },
            {
              shlokaNum: 7,
              sanskrit: `असदकरणादुपादानग्रहणात् सर्वसंभवाभावात् ।
शक्तस्य शक्यकरणात् कारणभावाच्च सत्कार्यम् ॥ ७ ॥`,
              hindi: `सांख्य का सत्कार्यवाद: जो वस्तु पहले से कारण में विद्यमान नहीं है, वह कभी उत्पन्न नहीं हो सकती (जैसे बालू से तेल नहीं निकल सकता, तिल में तेल पहले से है)।`,
              english: `The effect pre-exists in the cause (Satkaryavada): for what is non-existent cannot be brought into being; specific materials produce specific results.`
            },
            {
              shlokaNum: 8,
              sanskrit: `संघातपरार्थत्वात् त्रिगुणादिविपर्ययादधिष्ठानात् ।
पुरुषोऽस्ति भोक्तृभावात् कैवल्यार्थं प्रवृत्तेश्च ॥ ८ ॥`,
              hindi: `शरीर और मन संघात (समूह) हैं जो दूसरे के लिए हैं; इसलिए इनके परे एक "पुरुष" (चेतन आत्मा) अवश्य है जो इनका साक्षी, भोक्ता और कैवल्य (मोक्ष) का अधिकारी है।`,
              english: `Purusha (Spirit) exists: because composite objects are meant for another; because there must be a conscious controller, witness, and aspirant for liberation.`
            },
            {
              shlokaNum: 9,
              sanskrit: `तस्माच्च विपर्यासात् सिद्धं साक्षित्वमस्य पुरुषस्य ।
कैवल्यं माध्यस्थ्यं द्रष्टृत्वमकर्तृभावश्च ॥ ९ ॥`,
              hindi: `प्रकृति के तीनों गुणों से भिन्न होने के कारण यह सिद्ध होता है कि पुरुष केवल साक्षी, शुद्ध, मध्यस्थ, द्रष्टा और वास्तव में अकर्ता (कर्मों से अलिप्त) है।`,
              english: `Hence from its distinction from the Gunas, it is established that the Purusha is the witness, solitary, neutral, seer, and non-agent.`
            },
            {
              shlokaNum: 10,
              sanskrit: `प्रकृतेः सुकुमारतरं न किञ्चिदस्तीति मे मतिर्भवति ।
या दृष्टास्मीति पुनर्न दर्शनमुपैति पुरुषस्य ॥ १० ॥`,
              hindi: `प्रकृति से अधिक लज्जावती और सुकुमार कोई नहीं है; जो एक बार "पुरुष ने मुझे देख और समझ लिया है" ऐसा जान लेने पर उस आत्मज्ञानी के सामने फिर कभी बंधन बनकर नहीं आती।`,
              english: `Nothing is more modest and subtle than Nature; once she realizes "I have been recognized by Spirit", she never again presents herself to the enlightened seer.`
            }
          ]
        )
      ]
    }
  ]
};


// =========================================================================
// 3. पातञ्जल योगदर्शन (PATANJALI YOGA SUTRAS)
// =========================================================================
export const PATANJALI_YOGA_SUTRAS_BOOK: ScriptureBook = {
  id: 'patanjali_yoga_sutras',
  titleHi: 'पातञ्जल योगदर्शन (योगसूत्र)',
  titleEn: 'Patanjali Yoga Sutras',
  categoryKey: 'darshanas',
  categoryNameHi: 'षड्दर्शन',
  categoryNameEn: 'Six Philosophical Systems',
  icon: '🧘',
  badge: '४ पाद • १९५ सूत्र • महर्षि पतञ्जलि कृत',
  totalChaptersCount: 4,
  totalVersesEstimate: '१९५ सूत्र सम्पूर्ण',
  descriptionHi: `"योगश्चित्तवृत्तिनिरोधः" — चित्त के समस्त भटकाव और विक्षेपों को शांत कर समाधि और कैवल्य (आत्म-साक्षात्कार) प्राप्त करने का विश्व-विख्यात व्यावहारिक राजयोग ग्रंथ।`,
  descriptionEn: `The definitive manual on classical Raja Yoga by Sage Patanjali systematically elucidating mental control, meditation, and spiritual liberation.`,
  accentGradient: 'from-amber-600 via-emerald-700 to-teal-800',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: `समाधिपाद: चित्तवृत्ति निरोध व अभ्यास-वैराग्य`,
      chapterTitleEn: `Samadhi Pada: Mental Stillness & Absorption`,
      totalVersesText: '१० सूत्र',
      sections: [
        createSectionBlock(
          1, 1, 10,
          `अथ योगानुशासनम् — योग का स्वरूप व चित्तवृत्तियां`,
          `Section 1: Definition of Yoga & Control of Mind`,
          `अथ योगानुशासनम्। योगश्चित्तवृत्तिनिरोधः। तदा द्रष्टुः स्वरूपेऽवस्थानम्। अभ्यासवैराग्याभ्यां तन्निरोधः॥`,
          `Now begins the instruction of Yoga. Yoga is the cessation of the fluctuations of the mind. Then the Seer abides in its own true nature. Their restraint is achieved through practice and non-attachment.`,
          [
            {
              shlokaNum: 1,
              sanskrit: `ॐ अथ योगानुशासनम् ॥ १ ॥`,
              hindi: `अब, (समस्त सांसारिक विक्षेपों के पश्चात) योग के प्रामाणिक और अनुशासनबद्ध अभ्यास का शुभारंभ होता है।`,
              english: `Now, therefore, begins the authoritative instruction on the discipline of Yoga.`
            },
            {
              shlokaNum: 2,
              sanskrit: `योगश्चित्तवृत्तिनिरोधः ॥ २ ॥`,
              hindi: `चित्त (मन, बुद्धि, अहंकार) की समस्त चंचल वृत्तियों का पूर्ण निरोध (शांत व स्थिर होना) ही योग है।`,
              english: `Yoga is the intentional restraint and stilling of the fluctuations and modifications of the mind-stuff.`
            },
            {
              shlokaNum: 3,
              sanskrit: `तदा द्रष्टुः स्वरूपेऽवस्थानम् ॥ ३ ॥`,
              hindi: `उस समय (चित्तवृत्तियों के शांत हो जाने पर) द्रष्टा (आत्मा / साक्षी चेतन) अपने वास्तविक शुद्ध स्वरूप में प्रतिष्ठित हो जाता है।`,
              english: `Then the Seer (pure consciousness) abides securely established in its own true essential nature.`
            },
            {
              shlokaNum: 4,
              sanskrit: `वृत्तिसारूप्यमितरत्र ॥ ४ ॥`,
              hindi: `अन्य अवस्थाओं में (जब चित्त शांत नहीं होता) जीवात्मा चित्त की वृत्तियों के साथ तद्रूप (पहचान) स्थापित कर लेता है और सुखी-दुखी होता है।`,
              english: `At other times, the conscious self erroneously identifies with the fluctuating thoughts and impressions of the mind.`
            },
            {
              shlokaNum: 5,
              sanskrit: `अभ्यासवैराग्याभ्यां तन्निरोधः ॥ १२ ॥`,
              hindi: `उन चंचल चित्त-वृत्तियों का निरोध निरंतर आध्यात्मिक अभ्यास और अनासक्ति (वैराग्य) द्वारा ही संभव होता है।`,
              english: `The restraint and mastery of those mental modifications is accomplished through steadfast practice (Abhyasa) and non-attachment (Vairagya).`
            },
            {
              shlokaNum: 6,
              sanskrit: `तत्र स्थितौ यत्नोऽभ्यासः ॥ १३ ॥`,
              hindi: `चित्त को प्रशांत और स्थिर स्थिति में बनाए रखने के लिए किए जाने वाले अनवरत यत्न को "अभ्यास" कहते हैं।`,
              english: `Practice (Abhyasa) is the persistent, earnest effort to secure and maintain uninterrupted mental stillness.`
            },
            {
              shlokaNum: 7,
              sanskrit: `ईश्वरप्रणिधानाद्वा ॥ २३ ॥`,
              hindi: `अथवा परमेश्वर के प्रति अनन्य प्रेम, पूर्ण समर्पण और भक्ति से भी समाधि की अत्यंत शीघ्र सिद्धि हो जाती है।`,
              english: `Or spiritual liberation and mental stillness is directly attained through total self-surrender to the Supreme Lord (Ishvara-pranidhana).`
            },
            {
              shlokaNum: 8,
              sanskrit: `तस्य वाचकः प्रणवः ॥ २७ ॥`,
              hindi: `उस सर्वज्ञ, काल से परे परमात्मा का बोधक और वाचक पवित्र नाम "प्रणव" (ॐकार) है।`,
              english: `The sacred designating vibration and sound symbol of that Supreme Divinity is the sacred syllable OM (Pranava).`
            },
            {
              shlokaNum: 9,
              sanskrit: `तज्जपस्तदर्थभावनम् ॥ २८ ॥`,
              hindi: `उस ॐकार का निरंतर एकाग्र भाव से जप करना चाहिए और उसके अर्थ (परब्रह्म) का अंतःकरण में सतत ध्यान करना चाहिए।`,
              english: `Let that sacred OM be continually chanted with deep meditative absorption upon its divine meaning and consciousness.`
            },
            {
              shlokaNum: 10,
              sanskrit: `ततः प्रत्यक्चेतनाधिगमोऽप्यन्तरायाभावश्च ॥ २९ ॥`,
              hindi: `उस ॐकार के जप और ईश्वर समर्पण से अंतरात्मा का साक्षात ज्ञान प्राप्त होता है और साधना के समस्त विघ्न-बाधाएं नष्ट हो जाती हैं।`,
              english: `From that meditative chanting arises direct realization of inner consciousness, and all inner and outer obstacles vanish.`
            }
          ]
        )
      ]
    }
  ]
};

export const DARSHANAS_CANON_BOOKS = [
  BRAHMA_SUTRAS_BOOK,
  SAMKHYA_DARSHANA_BOOK,
  PATANJALI_YOGA_SUTRAS_BOOK
];

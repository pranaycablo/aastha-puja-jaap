/**
 * vedasCanonData.ts
 * सम्पूर्ण चार वेद (Four Vedas) - पवित्र अपौरुषेय श्रुति संग्रह
 * 1. ऋग्वेद संहिता (Rigveda Samhita)
 * 2. यजुर्वेद संहिता (Shukla & Krishna Yajurveda Samhita)
 * 3. सामवेद संहिता (Samaveda Samhita)
 * 4. अथर्ववेद संहिता (Atharvaveda Samhita)
 * 
 * प्रत्येक ग्रन्थ में १०-१२ श्लोकों के स्वाध्याय खण्ड,
 * विश्राम-बिन्दु (Pause Checkpoints),
 * और पृथक संस्कृत, हिन्दी व अंग्रेजी अनुवाद।
 */

import { ScriptureBook, ScriptureCategoryDef, createSectionBlock } from './scriptureBase';

// =========================================================================
// 1. ऋग्वेद संहिता (RIGVEDA SAMHITA)
// =========================================================================
export const RIGVEDA_BOOK: ScriptureBook = {
  id: 'rigveda_complete',
  titleHi: 'ऋग्वेद संहिता',
  titleEn: 'Rigveda Samhita',
  categoryKey: 'vedas',
  categoryNameHi: 'चार वेद',
  categoryNameEn: 'The Four Vedas',
  icon: '🔥',
  badge: '१० मण्डल • १०२८ सूक्त • १०,५५२ ऋचाएँ',
  totalChaptersCount: 10,
  totalVersesEstimate: '१०,५५२ ऋचाएँ (प्रमुख सूक्त संग्रह)',
  descriptionHi: `मानव जाति का प्राचीनतम और सर्वोच्च ज्ञान ग्रंथ। अग्नि, इन्द्र, वरुण, सूर्य, सोम और परब्रह्म की अगाध सूक्त स्तुतियाँ।`,
  descriptionEn: `The oldest sacred scripture of humanity, containing cosmic hymns to the divine principles.`,
  accentGradient: 'from-amber-600 via-orange-600 to-red-700',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: `मण्डल १: प्रथम अध्याय (अग्नि व इन्द्र सूक्त)`,
      chapterTitleEn: `Mandala 1: Agni & Indra Suktas`,
      totalVersesText: '१२ ऋचाएँ',
      sections: [
        createSectionBlock(
          1, 1, 12,
          `प्रथम खण्ड: अग्नि सूक्त व गायत्री आह्वान`,
          `Section 1: Hymn to Agni & Universal Awakening`,
          `सृष्टि के प्रथम पुरोहित, ज्ञान-ज्योति स्वरूप अग्निदेव की वंदना से ऋग्वेद का पवित्र आरंभ होता है।`,
          `Rigveda opens with the adoration of Agni, the divine priest and illuminating intelligence.`,
          [
            {
              shlokaNum: 1,
              sanskrit: `ॐ अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम् ।
होतारं रत्नधातमम् ॥ १ ॥`,
              hindi: `मैं यज्ञ के पुरोहित, प्रकाशमान देव, ऋत्विक तथा प्रचुर रत्नों (दिव्य गुणों) को धारण करने वाले अग्निदेव की स्तुति करता हूँ।`,
              english: `I glorify Agni, the priest of the sacrifice, the divine minister who offers worship, and the bestower of supreme treasures.`
            },
            {
              shlokaNum: 2,
              sanskrit: `अग्निः पूर्वेभिरृषिभिरीड्यो नूतनैरुत ।
स देवाँ एह वक्षति ॥ २ ॥`,
              hindi: `अग्निदेव पूर्वकाल के भृगु, अंगिरा आदि ऋषियों द्वारा पूजित रहे हैं और वर्तमान ऋषियों द्वारा भी पूजनीय हैं। वे यहाँ देवों को लाएं।`,
              english: `Agni, praised by ancient seers as well as by modern sages, may he conduct the cosmic deities hither.`
            },
            {
              shlokaNum: 3,
              sanskrit: `अग्निना रयिमश्नवत्पोषमेव दिवेदिवे ।
यशसं वीरवत्तमम् ॥ ३ ॥`,
              hindi: `मनुष्य अग्नि की कृपा से प्रतिदिन यश, आत्मबल, समृद्धि और पराक्रमी संतानों से युक्त पोषण प्राप्त करता है।`,
              english: `Through Agni, one attains divine wealth and nourishment day after day, glorious and rich in heroic offspring.`
            },
            {
              shlokaNum: 4,
              sanskrit: `अग्ने यं यज्ञमध्वरं विश्वतः परिभूरसि ।
स इद्देवेषु गच्छति ॥ ४ ॥`,
              hindi: `हे अग्नि! तुम जिस हिंसारहित यज्ञ को सब ओर से अपनी सुरक्षा में घेर लेते हो, वही यज्ञ देवों तक पहुँचता है।`,
              english: `O Agni, the selfless sacred offering which thou encompassest on every side, that alone reaches the radiant devas.`
            },
            {
              shlokaNum: 5,
              sanskrit: `अग्निर्होता कविक्रतुः सत्यश्चित्रश्रवस्तमः ।
देवो देवेभिरा गमत् ॥ ५ ॥`,
              hindi: `अग्निदेव दिव्य होता, दूरदर्शी प्रज्ञा से संपन्न, सत्य स्वरूप और अद्भुत यश वाले हैं; वे देवों सहित पधारें।`,
              english: `May Agni, the invoker possessed of divine wisdom, truthful and richest in fame, come with all celestial beings.`
            },
            {
              shlokaNum: 6,
              sanskrit: `यदङ्ग दाशुषे त्वमग्ने भद्रं करिष्यसि ।
तवेत्तत्सत्यमङ्गिरः ॥ ६ ॥`,
              hindi: `हे अंगिरः अग्नि! तुम अपने समर्पित यजमान का जो भी कल्याण करते हो, वह तुम्हारी सत्य प्रतिज्ञा है।`,
              english: `Whatever blessing thou bestowest upon the worshipper, O Agni Angiras, that is thy true pledge.`
            },
            {
              shlokaNum: 7,
              sanskrit: `उप त्वाग्ने दिवेदिवे दोषावस्तर्धिया वयम् ।
नमो भरन्त एमसि ॥ ७ ॥`,
              hindi: `हे अग्नि! हम रात-दिन अपनी निर्मल बुद्धि द्वारा नमस्कार करते हुए तुम्हारे समीप उपस्थित होते हैं।`,
              english: `To thee, O Agni, day by day, in darkness and light, we come with prayer, offering reverent homage.`
            },
            {
              shlokaNum: 8,
              sanskrit: `राजन्तमध्वराणां गोपाामृतस्य दीदिविम् ।
वर्धमानं स्वे दमे ॥ ८ ॥`,
              hindi: `यज्ञों के अधिपति, शाश्वत ऋत (ब्रह्मांडीय सत्य) के रक्षक और अपने धाम में निरंतर देदीप्यमान अग्नि की हम शरण लेते हैं।`,
              english: `Ruler of sacrifices, guardian of cosmic truth (Rita), radiant guardian growing in his own sanctuary.`
            },
            {
              shlokaNum: 9,
              sanskrit: `स नः पितेव सूनवेऽग्ने सूपायनो भव ।
सचस्वा नः स्वस्तये ॥ ९ ॥`,
              hindi: `हे अग्नि! जैसे पिता अपने पुत्र के लिए सुलभ होता है, वैसे ही तुम हमारे लिए सुलभ होओ और हमारे कल्याण के लिए साथ रहो।`,
              english: `Be accessible unto us, O Agni, as a father is unto his son; abide with us for our supreme wellbeing.`
            },
            {
              shlokaNum: 10,
              sanskrit: `गायत्री त्रिष्टुब्जगत्यनुष्टुप् पङ्क्त्या सह ।
बृहती ह्यतिच्छन्दाः समेता वेदमूर्तयः ॥ १० ॥`,
              hindi: `गायत्री, त्रिष्टुभ, जगती, अनुष्टुभ, पंक्ति और बृहती—ये समस्त पावन वैदिक छंद ज्ञान के प्रकाशक हैं।`,
              english: `Gayatri, Trishtubh, Jagati, Anushtubh, Pankti, and Brihati—all divine Vedic meters embody celestial wisdom.`
            },
            {
              shlokaNum: 11,
              sanskrit: `इन्द्रं मित्रं वरुणमग्निमाहुरथो दिव्यः स सुपर्णो गरुत्मान् ।
एकं सद्विप्रा बहुधा वदन्त्यग्निं यमं मातरिश्वानमाहुः ॥ ११ ॥`,
              hindi: `सत्य एक ही है, जिसे ज्ञानी ऋषि इन्द्र, मित्र, वरुण, अग्नि, यम और मातरिश्वा जैसे अनेक नामों से पुकारते हैं।`,
              english: `Truth is One; sages call It by many names—Indra, Mitra, Varuna, Agni, Yama, and Matarishvan.`
            },
            {
              shlokaNum: 12,
              sanskrit: `सं गच्छध्वं सं वदध्वं सं वो मनांसि जानताम् ।
देवा भागं यथा पूर्वे संजानाना उपासते ॥ १२ ॥`,
              hindi: `तुम सब साथ चलो, एक स्वर में बोलो, तुम्हारे मन एक समान हों, जैसे प्राचीन देवगण एकमत होकर अपना कर्तव्य करते थे।`,
              english: `Walk together, speak together, let your minds comprehend alike, as the ancient enlightened ones served in harmony.`
            }
          ]
        )
      ]
    },
    {
      chapterIndex: 10,
      chapterTitleHi: `मण्डल १०: नासदीय व पुरुष सूक्त`,
      chapterTitleEn: `Mandala 10: Creation & Cosmic Being`,
      totalVersesText: '१२ ऋचाएँ',
      sections: [
        createSectionBlock(
          1, 1, 12,
          `सृष्टि उत्पत्ति एवं विराट् पुरुष`,
          `Section 1: The Hymn of Creation & Cosmic Purusha`,
          `सृष्टि के आरंभ में जब न सत् था न असत्, केवल वही एक तत्त्व अपनी ही महिमा से श्वास ले रहा था।`,
          `Before creation, neither being nor non-being existed; the One breathed breathless by Its own power.`,
          [
            {
              shlokaNum: 1,
              sanskrit: `नासदासिन्नो सदासीत्तदानीं नासीद्रजो नो व्योमा परो यत् ।
किमावरीवः कुह कस्य शर्मन्नम्भः किमासीद्गहनं गभीरम् ॥ १ ॥`,
              hindi: `सृष्टि के पूर्व न असत् था न सत्; न अंतरिक्ष था और न उससे परे आकाश। उस समय क्या आच्छादित था? कहाँ और किसकी शरण में?`,
              english: `Then was not non-existent nor existent; there was no realm of air, no sky beyond it. What covered in, and where? And what gave shelter?`
            },
            {
              shlokaNum: 2,
              sanskrit: `न मृत्युरासीदमृतं न तर्हि न रात्र्या अह्न आसीत्प्रकेतः ।
आनीदवातं स्वधया तदेकं तस्माद्धान्यन्न परः किञ्चनास ॥ २ ॥`,
              hindi: `उस समय न मृत्यु थी और न अमरता; रात और दिन का भी कोई लक्षण नहीं था। वह एक अद्वितीय ब्रह्म बिना वायु के अपने आप श्वास ले रहा था।`,
              english: `Death was not then, nor was there aught immortal; no sign was there, the day's and night's divider. That One Thing breathed breathless by its own nature.`
            },
            {
              shlokaNum: 3,
              sanskrit: `तम आसीत्तमसा गूळ्हमग्रेऽप्रकेतं सलिलं सर्वमा इदम् ।
तुच्छ्येनाभ्वपिहितं यदासीत्तपसस्तन्महिनाजायतैकम् ॥ ३ ॥`,
              hindi: `आरंभ में अंधकार से गूढ़ अंधकार ढका हुआ था। सब कुछ अप्रकट जल के समान था। तप के प्रभाव से उस शून्य में उस एक का प्राकट्य हुआ।`,
              english: `Darkness there was at first: at first concealed in darkness, this all was undifferentiated water. That which was enveloped in emptiness sprang into being by the power of Tapas.`
            },
            {
              shlokaNum: 4,
              sanskrit: `कामस्तदग्रे समवर्तताधि मनसो रेतः प्रथमं यदासीत् ।
सतो बन्धुमसति निरविन्दन्हृदि प्रतीष्या कवयो मनीषा ॥ ४ ॥`,
              hindi: `सर्वप्रथम उसमें काम (सृष्टि की इच्छा) का उदय हुआ, जो मन का प्रथम बीज था। मनीषियों ने अपनी प्रज्ञा से हृदय में सत्-असत् का संबंध खोज निकाला।`,
              english: `Desire entered who was in the beginning the first seed of mind. Sages seeking wisdom with their heart found the bond of being in non-being.`
            },
            {
              shlokaNum: 5,
              sanskrit: `सहस्रशीर्षा पुरुषः सहस्राक्षः सहस्रपात् ।
स भूमिं विश्वतो वृत्वात्यतिष्ठद्दशाङ्गुलम् ॥ ५ ॥`,
              hindi: `उस विराट् पुरुष के सहस्रों (अनंत) सिर, सहस्रों नेत्र और सहस्रों चरण हैं। वह संपूर्ण ब्रह्मांड को व्याप्त करके दस अंगुल और परे स्थित है।`,
              english: `The Cosmic Being has a thousand heads, a thousand eyes, and a thousand feet. Pervading the earth on every side, He extends beyond.`
            },
            {
              shlokaNum: 6,
              sanskrit: `पुरुष एवेदं सर्वं यद्भूतं यच्च भव्यम् ।
उतामृतत्वस्येशानो यदन्नेनातिरोहति ॥ ६ ॥`,
              hindi: `जो बीत चुका है और जो होने वाला है, वह सब पुरुष ही है। वह अमरत्व का स्वामी है, जो अन्न द्वारा स्थूल रूप में प्रकट होता है।`,
              english: `Purusha is all this universe, which has been and which shall be. He is the master of immortality.`
            },
            {
              shlokaNum: 7,
              sanskrit: `एतावानस्य महिमाऽतो ज्यायांश्च पूरुषः ।
पादोऽस्य विश्वा भूतानि त्रिपादस्यामृतं दिवि ॥ ७ ॥`,
              hindi: `यह दृश्य संसार उसकी इतनी ही महिमा है; वास्तव में वह विराट् पुरुष इससे भी महान है। समस्त प्राणी उसका एक अंश हैं, तीन अंश अमृत लोक में हैं।`,
              english: `All this is His glory; greater than this is Purusha Himself. All creatures are one-fourth of Him; three-fourths eternal life in heaven.`
            },
            {
              shlokaNum: 8,
              sanskrit: `त्रिपादूर्ध्व उदैत्पुरुषः पादोऽस्येहाभवत्पुनः ।
ततो विष्वङ् व्यक्रामत्साशनानशने अभि ॥ ८ ॥`,
              hindi: `वह त्रिपाद पुरुष ऊर्ध्व लोक में स्थित रहा, और उसका एक पाद यहाँ बारंबार प्रकट हुआ। फिर वह चेतन और अचेतन दोनों में व्याप्त हो गया।`,
              english: `With three-fourths Purusha ascended; one-fourth of Him again became here. Thence He strode out everywhere into that which eats and eats not.`
            },
            {
              shlokaNum: 9,
              sanskrit: `तस्माद्विराळजायत विराजो अधि पूरुषः ।
स जातो अत्यरिच्यत पश्चाद्भूमिमथो पुरः ॥ ९ ॥`,
              hindi: `उससे विराट् की उत्पत्ति हुई और विराट् से पुनः पुरुष। उत्पन्न होकर उसने पृथ्वी को आगे और पीछे दोनों ओर से आच्छादित कर लिया।`,
              english: `From Him Viraj was born; again Purusha from Viraj. As soon as born, He extended beyond the earth behind and before.`
            },
            {
              shlokaNum: 10,
              sanskrit: `यत्पुरुषेण हविषा देवा यज्ञमतन्वत ।
वसन्तो अस्यासीदाज्यं ग्रीष्म इध्मः शरद्धविः ॥ १० ॥`,
              hindi: `जब देवों ने उस विराट् पुरुष रूपी हवि से मानसिक यज्ञ किया, तब वसंत ऋतु उसका घी, ग्रीष्म उसकी समिधा और शरद उसकी हवि बनी।`,
              english: `When devas performed sacrifice with Purusha as oblation, spring was the melted butter, summer the fuel, and autumn the offering.`
            },
            {
              shlokaNum: 11,
              sanskrit: `ब्राह्मणोऽस्य मुखमासीद्बाहू राजन्यः कृतः ।
ऊरू तदस्य यद्वैश्यः पद्भ्यां शूद्रो अजायत ॥ ११ ॥`,
              hindi: `उस विराट् के मुख से ज्ञानवान् ब्राह्मण, बाहुओं से क्षत्रिय, जंघाओं से पोषणकर्ता वैश्य और चरणों से सेवाभावी शूद्र का प्राकट्य हुआ।`,
              english: `The seeker of wisdom was His face, the protector His arms, the merchant His thighs, and the server His feet.`
            },
            {
              shlokaNum: 12,
              sanskrit: `चन्द्रमा मनसो जातश्चक्षोः सूर्यो अजायत ।
मुखादिन्द्रश्चाग्निश्च प्राणाद्वायुरजायत ॥ १२ ॥`,
              hindi: `उसके मन से चंद्रमा उत्पन्न हुआ, नेत्रों से सूर्य, मुख से इंद्र व अग्नि, और प्राणों से वायु का जन्म हुआ।`,
              english: `The moon was gendered from His mind, and from His eyes the sun had birth; Indra and Agni from His mouth, and Vayu from His breath.`
            }
          ]
        )
      ]
    }
  ]
};

// =========================================================================
// 2. यजुर्वेद संहिता (YAJURVEDA SAMHITA)
// =========================================================================
export const YAJURVEDA_BOOK: ScriptureBook = {
  id: 'yajurveda_complete',
  titleHi: 'शुक्ल यजुर्वेद संहिता (वाजसनेयि)',
  titleEn: 'Shukla Yajurveda Samhita',
  categoryKey: 'vedas',
  categoryNameHi: 'चार वेद',
  categoryNameEn: 'The Four Vedas',
  icon: '🪔',
  badge: '४० अध्याय • १९७५ कण्डिकाएँ सम्पूर्ण',
  totalChaptersCount: 40,
  totalVersesEstimate: '१९७५ कण्डिकाएँ (शिवसंकल्प व रुद्राध्याय)',
  descriptionHi: `कर्म, त्याग और यज्ञीय साधना का वेद। शिवसंकल्प सूक्त (मन का शुद्धिकरण), शतरुद्रीय और ईशावास्योपनिषद का मूल आधार।`,
  descriptionEn: `The Veda of sacrificial devotion, dynamic action, and sacred rituals.`,
  accentGradient: 'from-orange-600 via-amber-600 to-yellow-600',
  chapters: [
    {
      chapterIndex: 34,
      chapterTitleHi: `अध्याय ३४: शिवसंकल्प सूक्त (मन का कल्याणकारी संकल्प)`,
      chapterTitleEn: `Chapter 34: Shiva Sankalpa Sukta`,
      totalVersesText: '६ मंत्र सम्पूर्ण',
      sections: [
        createSectionBlock(
          1, 1, 6,
          `मन की पवित्रता एवं शुभ संकल्प`,
          `Section 1: Noble Intentions of the Conscious Mind`,
          `हमारा मन जो जागते हुए दूर चला जाता है और सोते हुए भी अंतर्मुख रहता है, वह सदैव शुभ व कल्याणकारी संकल्पों से युक्त रहे।`,
          `May my mind, which travels far awake and asleep, ever dwell upon noble and auspicious thoughts.`,
          [
            {
              shlokaNum: 1,
              sanskrit: `यज्जाग्रतो दूरमुदैति दैवं तदु सुप्तस्य तथैवेति ।
दूरङ्गमं ज्योतिषां ज्योतिरेकं तन्मे मनः शिवसङ्कल्पमस्तु ॥ १ ॥`,
              hindi: `जो मन जाग्रत अवस्था में दूर-दूर तक चला जाता है और सुप्तावस्था में भी वैसा ही रहता है; जो सब इंद्रियों का एकमात्र दिव्य प्रकाशक है—वह मेरा मन कल्याणकारी संकल्पों वाला हो।`,
              english: `That which wanders far in wakefulness and returns in deep sleep; the radiant light of lights—may that mind of mine be filled with auspicious resolves.`
            },
            {
              shlokaNum: 2,
              sanskrit: `येन कर्माण्यपसो मनीषिणो यज्ञे कृण्वन्ति विदथेषु धीराः ।
यदपूर्वं यक्षमन्तः प्रजानां तन्मे मनः शिवसङ्कल्पमस्तु ॥ २ ॥`,
              hindi: `जिस मन द्वारा कर्मशील मनीषी और ज्ञानी पुरुष यज्ञ तथा उपासनाओं में कर्म करते हैं; जो समस्त प्राणियों के अंतःकरण में अपूर्व पूज्य शक्ति है—वह मेरा मन शिवसंकल्प से युक्त हो।`,
              english: `By which noble sages perform their sacred duties in devotion and work; the wondrous inner power within all beings—may my mind dwell on righteous aspirations.`
            },
            {
              shlokaNum: 3,
              sanskrit: `यत्प्रज्ञानमुत चेतो धृतिश्च यज्ज्योतिरन्तरमृतं प्रजासु ।
यस्मान्न ऋते किञ्चन कर्म क्रियते तन्मे मनः शिवसङ्कल्पमस्तु ॥ ३ ॥`,
              hindi: `जो विशेष ज्ञान, सामान्य चेतना और धैर्य का आधार है; जो समस्त प्राणियों के भीतर अमर प्रकाश है, जिसके बिना कोई कर्म नहीं हो सकता—वह मेरा मन शुभ संकल्पों से युक्त हो।`,
              english: `Which is supreme wisdom, intellect, and steadfast fortitude; the immortal light within living creatures without which no action is done—may my mind cherish noble thoughts.`
            },
            {
              shlokaNum: 4,
              sanskrit: `येनेदं भूतं भुवनं भविष्यत्परिगृहीतममृतेन सर्वम् ।
येन यज्ञस्तायते सप्तहोता तन्मे मनः शिवसङ्कल्पमस्तु ॥ ४ ॥`,
              hindi: `जिस अमर मन द्वारा भूत, वर्तमान और भविष्य की सभी वस्तुएं जानी जाती हैं; जिससे सात इंद्रियों रूपी होताओं का यज्ञ संपन्न होता है—वह मेरा मन शिवसंकल्प से भरा रहे।`,
              english: `Whereby all the past, present, and future is grasped in eternal consciousness; which sustains the sevenfold inner sacrifice—may my mind choose the path of light.`
            },
            {
              shlokaNum: 5,
              sanskrit: `यस्मिन्नृचः साम यजूंषि यस्मिन् प्रतिष्ठिता रथनाभाविवाराः ।
यस्मिंश्चित्तं सर्वमोतं प्रजानां तन्मे मनः शिवसङ्कल्पमस्तु ॥ ५ ॥`,
              hindi: `जैसे रथ के पहिये की नाभि में तीलियाँ जुड़ी होती हैं, वैसे ही जिसमें ऋग्वेद, सामवेद और यजुर्वेद स्थित हैं, और जिसमें संपूर्ण चेतना समाई है—वह मेरा मन शिवसंकल्प वाला हो।`,
              english: `In which the Rig, Sama, and Yajur verses are anchored like spokes in a chariot hub; in which all conscious thought is interwoven—may my mind be dedicated to goodness.`
            },
            {
              shlokaNum: 6,
              sanskrit: `सुषारथिरश्वानिव यन्मनुष्यान्नेनीयतेऽभीशुभिर्वाजिन इव ।
हृत्प्रतिष्ठं यदजिरं जविष्ठं तन्मे मनः शिवसङ्कल्पमस्तु ॥ ६ ॥`,
              hindi: `जैसे कुशल सारथी लगाम से घोड़ों को सन्मार्ग पर ले जाता है, वैसे ही जो मन मनुष्य को नियंत्रित करता है; जो हृदय में स्थित, अजर और अत्यंत तीव्रगामी है—वह मेरा मन कल्याणकारी संकल्पों से युक्त हो।`,
              english: `As a skilled charioteer guides spirited steeds with the reins, so does that mind guide human beings; seated in the heart, ageless and swift—may that mind be filled with divine grace.`
            }
          ]
        )
      ]
    }
  ]
};

// =========================================================================
// 3. सामवेद संहिता (SAMAVEDA SAMHITA)
// =========================================================================
export const SAMAVEDA_BOOK: ScriptureBook = {
  id: 'samaveda_complete',
  titleHi: 'सामवेद संहिता',
  titleEn: 'Samaveda Samhita',
  categoryKey: 'vedas',
  categoryNameHi: 'चार वेद',
  categoryNameEn: 'The Four Vedas',
  icon: '🎶',
  badge: 'पूर्वार्चिक व उत्तरार्चिक • १८७५ मन्त्र',
  totalChaptersCount: 2,
  totalVersesEstimate: '१८७५ मन्त्र (गीति व संगीत प्रधान)',
  descriptionHi: `दिव्य संगीत, नादब्रह्म और भक्ति की अमृतमयी वाणी। गीता में भगवान श्रीकृष्ण ने कहा: "वेदानां सामवेदोऽस्मि" (वेदों में मैं सामवेद हूँ)।`,
  descriptionEn: `The Veda of sacred melodies, cosmic rhythms, and spiritual ecstasy.`,
  accentGradient: 'from-sky-600 via-indigo-600 to-purple-700',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: `पूर्वार्चिक: आग्नेय काण्ड (नादब्रह्म गीति)`,
      chapterTitleEn: `Purvarchika: Cosmic Chants of Agni`,
      totalVersesText: '१० मन्त्र',
      sections: [
        createSectionBlock(
          1, 1, 10,
          `प्रथम खण्ड: दिव्य साम गायन व शांति`,
          `Section 1: Sacred Melodies of Light & Peace`,
          `सामवेद की प्रत्येक ऋचा सुर, लय और ताल से युक्त होकर साधक के हृदय को नादब्रह्म में लीन कर देती है।`,
          `Every verse of Samaveda is tuned to celestial rhythm, guiding the soul into eternal peace.`,
          [
            {
              shlokaNum: 1,
              sanskrit: `ॐ अग्न आयाहि वीतये गृणानो हव्यदातये ।
नि होता सत्सि बर्हिषि ॥ १ ॥`,
              hindi: `हे अग्निदेव! हमारे स्तुति गान को सुनकर हवि स्वीकार करने हेतु पधारिए और हमारे पवित्र आसन पर विराजमान होइए।`,
              english: `O radiant Agni, invited by our songs, come to accept our offering and sit upon this sacred seat.`
            },
            {
              shlokaNum: 2,
              sanskrit: `त्वमग्ने यज्ञानां होता विश्वेषां हितः ।
देवेभिर्मानुषे जने ॥ २ ॥`,
              hindi: `हे अग्नि! तुम समस्त यज्ञों के पावन होता हो, और देवताओं तथा मनुष्यों के बीच परम हितकारी संदेशवाहक हो।`,
              english: `Thou, Agni, art the divine invoker of all sacrifices, beneficial to both radiant gods and mortals.`
            },
            {
              shlokaNum: 3,
              sanskrit: `स नः पावक दीदिवा अग्ने देवां इहा वह ।
उप यज्ञं हविश्च नः ॥ ३ ॥`,
              hindi: `हे पावक अग्नि! अपनी पवित्र ज्वालाओं से प्रकाशित होते हुए देवों को हमारे इस यज्ञ और हवि के पास ले आइए।`,
              english: `O purifying, radiant Agni, bring the deities hither to our sacred communion and offering.`
            },
            {
              shlokaNum: 4,
              sanskrit: `इन्द्राग्नी आ गतं सुतं गीर्भिर्नभो वरेण्यम् ।
अस्य पातं धियेषिता ॥ ४ ॥`,
              hindi: `हे इन्द्र और अग्नि! हमारी पवित्र स्तुतियों से प्रसन्न होकर इस सोम रस का पान करने के लिए पधारिए।`,
              english: `O Indra and Agni, invoked by prayers, come and partake of this purified offering for mental clarity.`
            },
            {
              shlokaNum: 5,
              sanskrit: `तं प्रत्नथा पूर्वथा विश्वथेमथा ज्येष्ठतातिं बर्हिषदं स्वर्विदम् ।
प्रतीचीनं वृजनं दोहसे गिरामाशुं जयन्तमनु यासु वर्धते ॥ ५ ॥`,
              hindi: `उस सनातन, सर्वज्ञ, ज्येष्ठ और स्वर्ग के ज्ञाता प्रभु की हम प्राचीन तथा नवीन दोनों शैलियों में स्तुति करते हैं।`,
              english: `We praise Him who is ancient, all-knowing, supreme, and finder of light, through songs of adoration.`
            },
            {
              shlokaNum: 6,
              sanskrit: `ये त्रिशप्ताः परियन्ति विश्वा रूपाणि बिभ्रतः ।
वाचस्पतिर्बला तेषां तन्वो अद्य दधातु मे ॥ ६ ॥`,
              hindi: `जो इक्कीस देव शक्तियाँ समस्त रूपों को धारण करती हुई भ्रमण करती हैं, वाणी के अधिपति आज मेरे शरीर में उनका तेज स्थापित करें।`,
              english: `May the Lord of Speech infuse into my body the vigor of all divine cosmic forces.`
            },
            {
              shlokaNum: 7,
              sanskrit: `पुनरेहि वाचस्पते देवेन मनसा सह ।
वसोष्पते नि रमय मय्येवास्तु मयि श्रुतम् ॥ ७ ॥`,
              hindi: `हे वाणी के अधिपति! दिव्य मन के साथ हमारे पास पुनः आइए; जो कुछ मैंने सुना और पढ़ा है, वह मुझमें ही सुप्रतिष्ठित रहे।`,
              english: `Return, O Lord of Sacred Speech, with enlightened mind; may all divine learning abide firmly within me.`
            },
            {
              shlokaNum: 8,
              sanskrit: `इहैवाभि वि तनूभे आर्त्नी इव ज्यया ।
वाचस्पतिर्नि यच्छतु मय्येवास्तु मयि श्रुतम् ॥ ८ ॥`,
              hindi: `जैसे धनुष पर प्रत्यंचा चढ़ाई जाती है, वैसे ही ज्ञान को मुझमें दृढ़ कीजिए; मेरा अध्ययन मेरे भीतर सदा प्रकाशित रहे।`,
              english: `Firmly string this sacred wisdom within me as a bowstring upon a bow; let my learning remain ever radiant.`
            },
            {
              shlokaNum: 9,
              sanskrit: `उपहूतं वाक्पतिरुपास्मान् वाक्पतिर्ह्वयताम् ।
सं श्रुतेन गमेमहि मा श्रुतेन वि राधिषि ॥ ९ ॥`,
              hindi: `ज्ञान के अधिपति ने हमें पुकारा है, हम वेद ज्ञान से युक्त हों; हम कभी भी सत्य ज्ञान से विमुख न हों।`,
              english: `The Lord of Speech has summoned us; may we be united with sacred wisdom and never alienated from truth.`
            },
            {
              shlokaNum: 10,
              sanskrit: `द्यौः शान्तिरन्तरिक्षं शान्तिः पृथिवी शान्तिरापः शान्तिरोषधयः शान्तिः ।
वनस्पतयः शान्तिर्विश्वे देवाः शान्तिर्ब्रह्म शान्तिः सर्वं शान्तिः शान्तिरेव शान्तिः सा मा शान्तिरेधि ॥ १० ॥`,
              hindi: `द्युलोक शांत हो, अंतरिक्ष शांत हो, पृथ्वी, जल, औषधियाँ, वनस्पतियाँ, विश्वेदेव, परब्रह्म और संपूर्ण जगत शांत हो; वह परम शांति मुझे प्राप्त हो।`,
              english: `May the heavens be peaceful, the atmosphere peaceful, the earth peaceful, waters, herbs, trees, all deities and Brahman peaceful; may that absolute peace fill my soul.`
            }
          ]
        )
      ]
    }
  ]
};

// =========================================================================
// 4. अथर्ववेद संहिता (ATHARVAVEDA SAMHITA)
// =========================================================================
export const ATHARVAVEDA_BOOK: ScriptureBook = {
  id: 'atharvaveda_complete',
  titleHi: 'अथर्ववेद संहिता',
  titleEn: 'Atharvaveda Samhita',
  categoryKey: 'vedas',
  categoryNameHi: 'चार वेद',
  categoryNameEn: 'The Four Vedas',
  icon: '🌿',
  badge: '२० काण्ड • ७३० सूक्त • ५९७७ मन्त्र',
  totalChaptersCount: 20,
  totalVersesEstimate: '५९७७ मन्त्र (भूमि सूक्त व आयुर्वेद मूल)',
  descriptionHi: `दैनिक जीवन, पर्यावरण, राष्ट्र-रक्षा, आयुर्वेद (रोग निवारण), मातृभूमि प्रेम और ब्रह्मविद्या का व्यावहारिक वेद।`,
  descriptionEn: `The Veda of daily living, environmental harmony, healing, and patriotism.`,
  accentGradient: 'from-emerald-600 via-teal-700 to-amber-700',
  chapters: [
    {
      chapterIndex: 12,
      chapterTitleHi: `काण्ड १२: पृथ्वी सूक्त (मातृभूमि वंदना)`,
      chapterTitleEn: `Kanda 12: Prithvi Sukta (Ode to Mother Earth)`,
      totalVersesText: '१० मन्त्र',
      sections: [
        createSectionBlock(
          1, 1, 10,
          `मातृभूमि की पावन महत्ता एवं पर्यावरण रक्षा`,
          `Section 1: Sacred Reverence to Mother Earth`,
          `"माता भूमिः पुत्रोऽहं पृथिव्याः" — यह भूमि मेरी माता है और मैं इस पृथ्वी का पुत्र हूँ। पर्यावरण और राष्ट्रभक्ति का सनातन उद्घोष।`,
          `"Earth is my mother, and I am her child." The eternal declaration of ecological reverence and patriotism.`,
          [
            {
              shlokaNum: 1,
              sanskrit: `सत्यं बृहदृतमुग्रं दीक्षा तपो ब्रह्म यज्ञः पृथिवीं धारयन्ति ।
सा नो भूतस्य भव्यस्य पत्न्युरुं लोकं पृथिवी नः कृणोतु ॥ १ ॥`,
              hindi: `महान सत्य, कठोर ऋत (नियम), दीक्षा, तपस्या, ज्ञान और यज्ञ—ये दिव्य सिद्धांत इस पृथ्वी को धारण करते हैं। भूत और भविष्य की स्वामिनी यह भूमि हमें विशाल अवसर प्रदान करे।`,
              english: `High truth, unyielding cosmic order, dedication, austerity, sacred knowledge, and sacrifice sustain this Earth. May She, queen of past and future, create wide realm for us.`
            },
            {
              shlokaNum: 2,
              sanskrit: `असंबाधं बध्यतो मानवानां यस्या उद्वतः प्रवतः समं बहु ।
नानावीर्या ओषधीर्बिभर्ति पृथिवी नः प्रथतां राध्यतां नः ॥ २ ॥`,
              hindi: `जो मनुष्यों को संकीर्णता से मुक्त रखती है; जिसमें ऊँचे पर्वत, ढलान और विशाल समतल मैदान हैं; जो अनेक प्रकार की गुणकारी औषधियों को धारण करती है—वह पृथ्वी हमारे लिए फले-फूले।`,
              english: `She who frees mortals from congestion, who possesses slopes, heights, and wide plains, nursing potent herbs—may Earth expand and prosper for us.`
            },
            {
              shlokaNum: 3,
              sanskrit: `यस्यां समुद्र उत सिन्धुरापो यस्यामन्नं कृष्टयः संबभूवुः ।
यस्यामिदं जिन्वति प्राणदेजत्सा नो भूमिः पूर्वपेये दधातु ॥ ३ ॥`,
              hindi: `जिसमें महासागर, नदियाँ और जलस्रोत बहते हैं; जिसमें अन्न और कृषि फलती-फूलती है; जिसमें संपूर्ण श्वास लेने वाला प्राणी जगत जीवन पाता है—वह भूमि हमें प्रथम पोषण प्रदान करे।`,
              english: `In whom the oceans and rivers flow, in whom grain and crops flourish, who sustains all breathing, moving life—may that Earth bless us with vitality.`
            },
            {
              shlokaNum: 4,
              sanskrit: `यस्याश्चतस्रः प्रदिशः पृथिव्या यस्यामन्नं कृष्टयः संबभूवुः ।
या बिभर्ति बहुधा प्राणदेजत्सा नो भूमिर्गोष्वप्यन्ने दधातु ॥ ४ ॥`,
              hindi: `जिस पृथ्वी की चार दिशाएं हैं; जिसमें कृषि और खाद्य संपदा प्रचुर है; जो भांति-भांति के जीवों का पोषण करती है—वह भूमि हमें उत्तम गोधन और अन्न प्रदान करे।`,
              english: `Whose are the four quarters of the world, in whom agriculture thrives, who bears varied living forms—may She bestow upon us abundant cattle and grain.`
            },
            {
              shlokaNum: 5,
              sanskrit: `यस्यां पूर्वे पूर्वजना विचक्रिरे यस्यां देवा असुरानभ्यवर्तयन् ।
गवामश्वानां वयसश्च विष्ठा भगं वर्चः पृथिवी नो दधातु ॥ ५ ॥`,
              hindi: `जिस भूमि पर हमारे पूर्वजों ने महान पराक्रम किए; जहाँ देवों ने आसुरी शक्तियों को पराजित किया; जो गायों, घोड़ों और पक्षियों का आश्रय है—वह पृथ्वी हमें ऐश्वर्य और तेज प्रदान करे।`,
              english: `On whom our ancestors performed great deeds, where radiant gods overcame darker forces; shelter of cattle, steeds, and birds—may Earth grant us radiant prosperity.`
            },
            {
              shlokaNum: 6,
              sanskrit: `विश्वंभरा वसुधानी प्रतिष्ठा हिरण्यवक्षा जगतो निवेशनी ।
वैश्वानरं बिभ्रती भूमिरग्निमिन्द्रऋषभा द्रविणे नो दधातु ॥ ६ ॥`,
              hindi: `सबका भरण-पोषण करने वाली, समस्त संपदाओं का भंडार, स्थिर आधार, सुवर्णमयी वक्षःस्थल वाली और समस्त संसार को बसाने वाली यह भूमि हमें असीम धन-सम्पत्ति प्रदान करे।`,
              english: `All-nourishing treasure-house, firm foundation, golden-breasted shelter of the world, nurturing universal fire—may Earth endow us with enduring wealth.`
            },
            {
              shlokaNum: 7,
              sanskrit: `तां नः प्रजाः बहुधा संदुहानां गां न पयस्वतीम् ।
मातेव पुत्रं बिभृतां पृथिव्यै पृथिवीं नमः ॥ ७ ॥`,
              hindi: `जैसे दुधारू गाय दूध देती है, वैसे ही यह पृथ्वी हमारे लिए नाना प्रकार के सुखों को दुहे। जैसे माता पुत्र को गोद में संभालती है, वैसे ही यह भूमि हमारा पालन करे; इस पृथ्वी माता को नमस्कार!`,
              english: `May this Earth, like an abundant mother-cow yielding sweet milk, nurture us as a mother holds her child; reverent salutations to Mother Earth!`
            },
            {
              shlokaNum: 8,
              sanskrit: `यदर्णवेऽधि सलिलमग्र आसीद्यन्मायाभिरन्वचरन् मनीषिणः ।
हृदयं यस्याः परमे व्योमन्त्सत्येनावृतममृतं पृथिव्याः ॥ ८ ॥`,
              hindi: `जो सृष्टि के आरंभ में अथाह जल में विलीन थी, जिसे मनीषियों ने अपनी अंतर्दृष्टि से खोजा; जिसका अमृतमय हृदय परम आकाश में शाश्वत सत्य से ढका है—वह भूमि हमें विजय दे।`,
              english: `Who at first lay immersed in the primordial cosmic waters, whom sages sought through inner vision; whose immortal heart is wrapped in truth in supreme space—may She empower us.`
            },
            {
              shlokaNum: 9,
              sanskrit: `सा नो भूमिर्भूरिधारा पयस्वती सुहृन्मेधायै मधुमत्करोतु ।
यत्किञ्चाहं त्वदुत्खनामि क्षिप्रं तदपि रोहतु ॥ ९ ॥`,
              hindi: `वह प्रचुर धाराओं वाली, अमृतमयी भूमि मेरी मेधा और हृदय को मधुर बनाए। हे भूमि! मैं तेरी गोद से जो कुछ भी औषध या खनिज खोदूँ, वह शीघ्र ही पुनः हरा-भरा हो जाए।`,
              english: `May that richly flowing, gracious Earth sweeten my intellect and spirit. Whatever of thee I dig up, O Mother Earth, may that quickly grow again!`
            },
            {
              shlokaNum: 10,
              sanskrit: `मा ते मर्म विमृग्वरि मा त आत्मानमर्पिपम् ।
माता भूमिः पुत्रोऽहं पृथिव्याः पर्जन्यः पिता स उ नः पिपर्तु ॥ १० ॥`,
              hindi: `हे पावन भूमि! हम तुम्हारे मर्मस्थल पर कभी चोट न पहुँचाएं, तुम्हारे जीवन-तत्त्व को दूषित न करें। भूमि मेरी माता है, मैं पृथ्वी का पुत्र हूँ, और मेघ मेरे पिता हैं; वे हमारा भरण करें।`,
              english: `Let me not wound thy vital organs, nor shatter thy heart, O Pure Earth! The Earth is my mother, I am the son of Earth; rain-cloud is my father, may he sustain us!`
            }
          ]
        )
      ]
    }
  ]
};

export const VEDAS_CATEGORY_BOOKS = [
  RIGVEDA_BOOK,
  YAJURVEDA_BOOK,
  SAMAVEDA_BOOK,
  ATHARVAVEDA_BOOK
];

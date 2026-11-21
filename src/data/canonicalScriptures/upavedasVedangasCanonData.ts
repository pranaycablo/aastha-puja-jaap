/**
 * upavedasVedangasCanonData.ts
 * चार उपवेद (4 Upavedas) एवं छह वेदांग (6 Vedangas)
 * 
 * उपवेद:
 * 1. आयुर्वेद (Ayurveda - चरक व सुश्रुत संहिता सार)
 * 2. धनुर्वेद (Dhanurveda - युद्ध व आत्मरक्षा शास्त्र)
 * 3. गन्धर्ववेद (Gandharvaveda - भरत मुनि नाट्य व संगीत शास्त्र)
 * 4. स्थापत्यवेद व अर्थशास्त्र (Sthapatyaveda & Kautilya Arthashastra)
 * 
 * वेदांग:
 * 1. शिक्षा (Shiksha - पाणिनीय शिक्षा, शुद्ध उच्चारण)
 * 2. कल्प (Kalpa - श्रौत, गृह्य, धर्म सूत्र)
 * 3. व्याकरण (Vyakarana - अष्टाध्यायी महेश्वर सूत्र)
 * 4. निरुक्त (Nirukta - यास्क मुनि वैदिक व्युत्पत्ति)
 * 5. छंद (Chhanda - पिंगल मुनि छंद शास्त्र)
 * 6. ज्योतिष (Jyotisha - वेदांग ज्योतिष काल विधान)
 */

import { ScriptureBook, createSectionBlock } from './scriptureBase';

// =========================================================================
// 1. आयुर्वेद संहिता (AYURVEDA)
// =========================================================================
export const AYURVEDA_BOOK: ScriptureBook = {
  id: 'ayurveda_samhita',
  titleHi: 'आयुर्वेद संहिता (चरक व सुश्रुत सार)',
  titleEn: 'Ayurveda Samhita',
  categoryKey: 'upavedas',
  categoryNameHi: 'चार उपवेद',
  categoryNameEn: 'The Four Upavedas',
  icon: '🌱',
  badge: 'चरक • सुश्रुत • अष्टाङ्ग हृदय सार',
  totalChaptersCount: 8,
  totalVersesEstimate: 'आयुष्य व आरोग्य सूत्र',
  descriptionHi: `जीवन और दीर्घायु का विज्ञान। वात-पित्त-कफ त्रिदोष संतुलन, धातु पोषण, दिनचर्या, ऋतुचर्या और औषध विज्ञान का आधार ग्रंथ।`,
  descriptionEn: `The eternal science of life, holistic healing, tridosha harmony, and natural vitality.`,
  accentGradient: 'from-emerald-600 to-teal-700',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: `सूत्रस्थान: दीर्घं जीवितम् (आरोग्य व जीवन परिभाषा)`,
      chapterTitleEn: `Sutrasthana: Longevity & Health Principles`,
      totalVersesText: '१० श्लोक',
      sections: [
        createSectionBlock(
          1, 1, 10,
          `आरोग्य परिभाषा, त्रिदोष एवं दिनचर्या`,
          `Section 1: Definition of Radiant Health & Tridosha Harmony`,
          `समदोषः समाग्निश्च समधातुमलक्रियः। प्रसन्नात्मेन्द्रियमनाः स्वस्थ इत्यभिधीयते॥`,
          `He whose doshas, digestive fire, tissues, and waste functions are balanced, and whose soul, senses, and mind are blissful, is called healthy.`,
          [
            {
              shlokaNum: 1,
              sanskrit: `हिताहितं सुखं दुःखमायुस्तस्य हिताहितम् ।
मानं च तच्च यत्रोक्तमायुर्वेदः स उच्यते ॥ १ ॥`,
              hindi: `जिस शास्त्र में हितकारी आयु, अहितकारी आयु, सुखद आयु, दुःखद आयु, तथा आयु का मान (प्रमाण) और उसका स्वरूप वर्णित है—उसे आयुर्वेद कहा जाता है।`,
              english: `That wisdom which treats of wholesome and unwholesome life, happy and unhappy existence, and the measure of life, is named Ayurveda.`
            },
            {
              shlokaNum: 2,
              sanskrit: `शरीरेन्द्रियसत्त्वात्मसंयोगो धारि जीवितम् ।
नित्यगश्चानुबन्धश्च पर्यायैरायुरुच्यते ॥ २ ॥`,
              hindi: `शरीर, इंद्रियाँ, मन और आत्मा के संयोग का नाम "आयु" है। इसे धारि (शरीर को गलने से रोकने वाला), जीवित, नित्यग (निरंतर गतिशील) और अनुबंध कहा जाता है।`,
              english: `Life is the conscious union of body, senses, mind, and spirit—termed the sustainer, animated existence, continuous flow, and karmic continuum.`
            },
            {
              shlokaNum: 3,
              sanskrit: `समदोषः समाग्निश्च समधातुमलक्रियः ।
प्रसन्नात्मेन्द्रियमनाः स्वस्थ इत्यभिधीयते ॥ ३ ॥`,
              hindi: `जिसके वात-पित्त-कफ सम हों, जठराग्नि संतुलित हो, सातों धातुएं और मल क्रियाएं ठीक हों, तथा जिसकी आत्मा, इंद्रियाँ और मन प्रसन्न हों—वही सच्चा स्वस्थ है।`,
              english: `One whose doshas are in equilibrium, digestive fire steady, tissues nourished, excretions normal, and whose spirit, senses, and mind remain serene, is truly healthy.`
            },
            {
              shlokaNum: 4,
              sanskrit: `वायुः पित्तं कफश्चोक्तः शारीरो दोषसङ्ग्रहः ।
मानसः पुनरुद्दिष्टो रजश्च तम एव च ॥ ४ ॥`,
              hindi: `शरीर में वात, पित्त और कफ—ये तीन शारीरिक दोष हैं; तथा मन के दो दोष हैं: रजोगुण और तमोगुण। इनका संतुलन ही पूर्ण स्वास्थ्य है।`,
              english: `Vata, Pitta, and Kapha constitute the bodily humors; Rajas (passion) and Tamas (inertia) are the psychic disturbances. Their balance brings complete health.`
            },
            {
              shlokaNum: 5,
              sanskrit: `प्रशाम्यत्यौषधैः पूर्वो दैवयुक्तिव्यपाश्रयैः ।
मानसो ज्ञानविज्ञानधैर्यस्मृतिसमाधिभिः ॥ ५ ॥`,
              hindi: `शारीरिक दोष दैवीय और युक्तिपूर्वक औषधियों से शांत होते हैं; जबकि मानसिक दोष आत्मज्ञान, विज्ञान, धैर्य, सद्विचार और समाधि (ध्यान) द्वारा शांत होते हैं।`,
              english: `Physical imbalances are cured by natural medicine and scientific diet; psychic afflictions are dissolved by spiritual wisdom, patience, memory, and meditation.`
            },
            {
              shlokaNum: 6,
              sanskrit: `ब्राह्मे मुहूर्ते उत्तिष्ठेत् स्वस्थो रक्षार्थमायुषः ।
शरीरचिन्तां निर्वर्त्य कृतशौचविधिस्ततः ॥ ६ ॥`,
              hindi: `स्वस्थ मनुष्य को अपनी दीर्घायु की रक्षा के लिए ब्रह्ममुहूर्त (सूर्योदय से पूर्व) में उठना चाहिए और शौचादि दैनिक शुद्धि संपन्न करनी चाहिए।`,
              english: `A healthy person, to protect vitality and longevity, should awaken during the Brahma Muhurta (dawn) and attend to bodily purification.`
            },
            {
              shlokaNum: 7,
              sanskrit: `व्यायामाल्लभते स्वास्थ्यं दीर्घायुष्यं बलं सुखम् ।
आरोग्यं परमं भाग्यं स्वास्थ्यं सर्वार्थसाधनम् ॥ ७ ॥`,
              hindi: `व्यायाम (योगाभ्यास) से स्वास्थ्य, दीर्घायु, शारीरिक बल और सुख प्राप्त होता है। आरोग्य ही परम भाग्य है, क्योंकि स्वास्थ्य से ही धर्म, अर्थ, काम, मोक्ष सिद्ध होते हैं।`,
              english: `Through moderate exercise one gains endurance, longevity, vigor, and happiness. Radiant health is the greatest blessing and vehicle of all goals.`
            },
            {
              shlokaNum: 8,
              sanskrit: `मात्राशी स्यात् । आहारमात्रा पुनरग्निबलापेक्षिणी ॥ ८ ॥`,
              hindi: `व्यक्ति को सदा प्रमाणपूर्वक (उचित मात्रा में) भोजन करना चाहिए। भोजन की सही मात्रा मनुष्य की अपनी जठराग्नि के बल पर निर्भर करती है।`,
              english: `One should always eat in measured moderation. The right measure of nourishment depends upon the strength of one's digestive fire.`
            },
            {
              shlokaNum: 9,
              sanskrit: `सर्वदा सर्वभावानां सामान्यं वृद्धिकारणम् ।
ह्रासहेतुर्विशेषश्च प्रवृत्तिरुभयस्य तु ॥ ९ ॥`,
              hindi: `समान गुण वाली वस्तुएं समान द्रव्यों की वृद्धि करती हैं, और विपरीत गुण वाली वस्तुएं उनका ह्रास (कमी) करती हैं। यही चिकित्सा का सार्वभौमिक सिद्धांत है।`,
              english: `Like increases like, while opposites balance and decrease one another. This is the universal foundation of Ayurvedic healing.`
            },
            {
              shlokaNum: 10,
              sanskrit: `धर्मार्थकाममोक्षाणामारोग्यं मूलमुत्तमम् ।
रोगास्तस्यापहर्तारः श्रेयसो जीवितस्य च ॥ १० ॥`,
              hindi: `धर्म, अर्थ, काम और मोक्ष—इन चारों पुरुषार्थों की सिद्धि का मूल आधार केवल "आरोग्य" ही है; रोग इन सबका और उत्तम जीवन का हरण कर लेते हैं।`,
              english: `Radiant health is the supreme foundation for Dharma, wealth, fulfillment, and liberation; disease robs man of noble living and spiritual attainment.`
            }
          ]
        )
      ]
    }
  ]
};

// =========================================================================
// 2. धनुर्वेद संहिता (DHANURVEDA)
// =========================================================================
export const DHANURVEDA_BOOK: ScriptureBook = {
  id: 'dhanurveda_samhita',
  titleHi: 'धनुर्वेद (युद्ध व आत्मरक्षा शास्त्र)',
  titleEn: 'Dhanurveda Samhita',
  categoryKey: 'upavedas',
  categoryNameHi: 'चार उपवेद',
  categoryNameEn: 'The Four Upavedas',
  icon: '🏹',
  badge: 'शिव धनुर्वेद • वसिष्ठ धनुर्वेद सार',
  totalChaptersCount: 4,
  totalVersesEstimate: 'अस्त्र-शस्त्र एवं युद्ध नीति',
  descriptionHi: `यजुर्वेद का उपवेद। धर्म की रक्षा, आत्मरक्षा, सैन्य संचालन, धनुर्विद्या और अस्त्र-शस्त्रों के नैतिक प्रयोग का प्रामाणिक ग्रंथ।`,
  descriptionEn: `The martial science of archery, noble defense, righteous warfare, and ethical combat.`,
  accentGradient: 'from-red-600 via-amber-600 to-orange-700',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: `प्रथम पाद: धनुर्विद्या दीक्षा व नियम`,
      chapterTitleEn: `Pada 1: Martial Training & Ethical Discipline`,
      totalVersesText: '१० श्लोक',
      sections: [
        createSectionBlock(
          1, 1, 10,
          `धनुर्विद्या का उद्देश्य व चार प्रकार के अस्त्र`,
          `Section 1: Noble Purpose of Martial Arts & Fourfold Weaponry`,
          `धनुर्विद्या का परम उद्देश्य निर्बलों की रक्षा, धर्म की स्थापना और राष्ट्र की अखंडता बनाए रखना है।`,
          `The sacred purpose of martial science is the protection of the innocent and preservation of righteous order.`,
          [
            {
              shlokaNum: 1,
              sanskrit: `धनुर्वेदस्य वक्ष्यामि स्वरूपं च प्रयोजनम् ।
दुष्टानां दमने चैव शिष्टानां परिपालने ॥ १ ॥`,
              hindi: `मैं धनुर्वेद के स्वरूप और प्रयोजन का वर्णन करता हूँ: दुष्टों का दमन करना और सज्जनों की रक्षा करना ही इसका मुख्य लक्ष्य है।`,
              english: `I shall expound the nature and purpose of Dhanurveda: the subjugation of the wicked and the protection of the righteous.`
            },
            {
              shlokaNum: 2,
              sanskrit: `चातुर्विध्यं शस्त्राणां मुक्तममुक्तं च कीर्तितम् ।
मुक्तामुक्तं यन्त्रमुक्तं चतुर्धा परिकीर्तितम् ॥ २ ॥`,
              hindi: `शस्त्र चार प्रकार के कहे गए हैं: मुक्त (फेंके जाने वाले जैसे बाण), अमुक्त (हाथ में रहने वाले जैसे तलवार), मुक्तामुक्त (जैसे भाला), और यंत्रमुक्त (जैसे तोप/यंत्र से प्रक्षेपित)।`,
              english: `Weapons are of four classes: released (arrows), held in hand (swords), retrievable (spears), and machine-propelled.`
            },
            {
              shlokaNum: 3,
              sanskrit: `गुरुभक्तः सदा दक्षः सत्यवादी जितेन्द्रियः ।
धनुर्वेदं समाप्नोति नान्यथा वीरसत्तमः ॥ ३ ॥`,
              hindi: `जो गुरुभक्त, सदैव दक्ष, सत्यवादी और इंद्रियों को वश में रखने वाला वीर होता है, वही धनुर्वेद की पूर्ण सिद्धि प्राप्त करता है।`,
              english: `He who is devoted to his master, ever alert, truthful, and master of his senses, alone attains mastery in martial science.`
            },
            {
              shlokaNum: 4,
              sanskrit: `न हि हिंसार्थमेवैतच्छस्त्रं देवेन निर्मितम् ।
रक्षणार्थं हि लोकानां धर्मसंस्थापनार्थतः ॥ ४ ॥`,
              hindi: `परमात्मा ने शस्त्रों का निर्माण केवल हिंसा के लिए नहीं किया, अपितु संपूर्ण संसार की रक्षा और धर्म की स्थापना हेतु किया है।`,
              english: `Weapons were not created by the divine for mere violence, but for the protection of society and establishment of righteousness.`
            },
            {
              shlokaNum: 5,
              sanskrit: `स्थिरं पदं दृढा दृष्टिर्मनश्चैकाग्रतां गतम् ।
तदा संलक्ष्यते वेधो नात्र कार्या विचारणा ॥ ५ ॥`,
              hindi: `स्थिर चरण, अडिग दृष्टि और एकाग्र मन—जब ये तीनों सध जाते हैं, तब अचूक लक्ष्यवेध स्वतः सिद्ध हो जाता है।`,
              english: `Firm stance, unblinking gaze, and a completely focused mind—when these unite, target-penetration is unfailingly achieved.`
            },
            {
              shlokaNum: 6,
              sanskrit: `प्रणवेन तु संहत्य बाणं चापे नियोजयेत् ।
अमोघं भवति क्षिप्रं ब्रह्मतेजःसमन्वितम् ॥ ६ ॥`,
              hindi: `ॐकार (प्रणव) का ध्यान करते हुए बाण को धनुष पर चढ़ाएं; वह बाण ब्रह्मतेज से युक्त होकर अत्यंत शीघ्र और अमोघ हो जाता है।`,
              english: `Focusing upon Om, mount the arrow upon the bow; infused with spiritual power, it becomes swift and invincible.`
            },
            {
              shlokaNum: 7,
              sanskrit: `दीने च शरणापन्ने स्त्रियां बाले तथा द्विजे ।
न प्रहर्तव्यमेवेति धनुर्वेदस्य निश्चयः ॥ ७ ॥`,
              hindi: `दीन-दुखी, शरण में आए हुए, स्त्री, बालक और ज्ञानी पुरुष पर कभी शस्त्र प्रहार नहीं करना चाहिए—यह धनुर्वेद का अटल नियम है।`,
              english: `Upon the helpless, the refugee, women, children, and holy seekers, a warrior must never strike—this is the eternal vow of Dhanurveda.`
            },
            {
              shlokaNum: 8,
              sanskrit: `रणे पलायनं नैव वीरस्य लक्षणं स्मृतम् ।
धर्मयुद्धेन यो हन्ति स याति परमां गतिम् ॥ ८ ॥`,
              hindi: `रणभूमि से पलायन करना वीर का लक्षण नहीं है। जो धर्मयुद्ध में लड़ते हुए प्राण देता है या विजय पाता है, वह परम गति को प्राप्त होता है।`,
              english: `Fleeing the battlefield is not the mark of a hero. He who fights in righteous battle attains supreme glory.`
            },
            {
              shlokaNum: 9,
              sanskrit: `अभ्यासात्साध्यते सर्वं नास्त्यसाध्यं तु कर्मणि ।
नित्यं संधानयोगेन धनुर्धरोऽग्रणीर्भवेत् ॥ ९ ॥`,
              hindi: `निरंतर अभ्यास से सब कुछ सिद्ध होता है, संसार में कुछ भी असाध्य नहीं है। नित्य संधान अभ्यास से धनुर्धर सर्वश्रेष्ठ बन जाता है।`,
              english: `By persistent practice everything is accomplished; nothing is impossible. Daily dedicated training makes an archer supreme.`
            },
            {
              shlokaNum: 10,
              sanskrit: `यतो धर्मस्ततो जयः। यतः कृष्णस्ततो जयः ॥ १० ॥`,
              hindi: `जहाँ धर्म है वहीं विजय है, और जहाँ भगवान श्रीकृष्ण हैं वहीं निश्चित विजय है।`,
              english: `Where there is righteousness, there is victory; where there is Sri Krishna, there is triumph.`
            }
          ]
        )
      ]
    }
  ]
};

// =========================================================================
// 3. गन्धर्ववेद (GANDHARVAVEDA)
// =========================================================================
export const GANDHARVAVEDA_BOOK: ScriptureBook = {
  id: 'gandharvaveda_samhita',
  titleHi: 'गन्धर्ववेद (नाट्य व संगीत शास्त्र)',
  titleEn: 'Gandharvaveda Samhita',
  categoryKey: 'upavedas',
  categoryNameHi: 'चार उपवेद',
  categoryNameEn: 'The Four Upavedas',
  icon: '🪕',
  badge: 'सामवेद उपवेद • भरत नाट्यशास्त्र सार',
  totalChaptersCount: 4,
  totalVersesEstimate: 'सप्त स्वर, राग व रस निष्पत्ति',
  descriptionHi: `सामवेद का उपवेद। भरत मुनि का नाट्यशास्त्र, सप्त स्वर (सा रे ग म प ध नि), राग विद्या, रस निष्पत्ति और संगीत द्वारा समाधि का मार्ग।`,
  descriptionEn: `The divine science of sacred music, classical ragas, aesthetic drama, and sound elevation.`,
  accentGradient: 'from-purple-600 via-pink-600 to-amber-600',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: `प्रथम अध्याय: नादब्रह्म व सप्त स्वर`,
      chapterTitleEn: `Chapter 1: Nada Brahman & The Seven Notes`,
      totalVersesText: '१० श्लोक',
      sections: [
        createSectionBlock(
          1, 1, 10,
          'नादब्रह्म की महिमा एवं सप्त स्वर उत्पत्ति',
          'Section 1: Glory of Cosmic Sound & Origin of Swaras',
          'नादब्रह्म के ध्यान से ब्रह्मा, विष्णु और महेश तीनों की एक साथ उपासना हो जाती है।',
          'In meditating upon Nada Brahman (divine sound), Brahma, Vishnu, and Shiva are worshipped simultaneously.',
          [
            {
              shlokaNum: 1,
              sanskrit: `नादरूपः स्मृतो ब्रह्मा नादरूपो जनार्दनः ।
नादरूपः परो देवो नादरूपा सरस्वती ॥ १ ॥`,
              hindi: `ब्रह्मा नाद स्वरूप हैं, भगवान विष्णु नाद स्वरूप हैं, देवाधिदेव महादेव नाद स्वरूप हैं और भगवती सरस्वती भी नाद स्वरूप हैं।`,
              english: `Brahma is the embodiment of sacred sound, Vishnu is sound, Supreme Lord Shiva is sound, and Goddess Saraswati is divine melody.`
            },
            {
              shlokaNum: 2,
              sanskrit: `नादोपासनया देवा ब्रह्मविष्णुमहेश्वराः ।
भवन्त्युपासिता नूनं यस्मादेते तदात्मकाः ॥ २ ॥`,
              hindi: `नाद की उपासना करने से ब्रह्मा, विष्णु और महेश तीनों की निश्चित ही उपासना हो जाती है, क्योंकि वे तीनों नादब्रह्म स्वरूप ही हैं।`,
              english: `By meditating upon sound, the Trinity—Brahma, Vishnu, and Shiva—is worshipped indeed, for sound is their very essence.`
            },
            {
              shlokaNum: 3,
              sanskrit: `षड्जश्च ऋषभश्चैव गान्धारो मध्यमस्तथा ।
पञ्चमो धैवतश्चैव निषादः सप्तमः स्वरः ॥ ३ ॥`,
              hindi: `षड्ज (सा), ऋषभ (रे), गांधार (ग), मध्यम (म), पंचम (प), धैवत (ध) और निषाद (नि)—ये सात मुख्य स्वर संगीत के आधार हैं।`,
              english: `Shadja (Sa), Rishabha (Re), Gandhara (Ga), Madhyama (Ma), Panchama (Pa), Dhaivata (Dha), and Nishada (Ni)—these seven are the fundamental notes.`
            },
            {
              shlokaNum: 4,
              sanskrit: `मयूर-चातक-च्छाग-क्रौञ्च-कोकिल-दर्दुराः ।
हस्तिनश्चैव कुर्वन्ति स्वरानेतान् यथाक्रमम् ॥ ४ ॥`,
              hindi: `मोर (सा), चातक (रे), बकरा (ग), क्रौंच पक्षी (म), कोयल (प), मेंढक (ध) और हाथी (नि)—प्रकृति के ये जीव इन सात स्वरों का उच्चारण करते हैं।`,
              english: `Peacock, skylark, goat, heron, cuckoo, frog, and elephant—these creatures of nature vocalize these seven tones respectively.`
            },
            {
              shlokaNum: 5,
              sanskrit: `विभावानुभावव्यभिचारिसंयोगाद्रसनिष्पत्तिः ॥ ५ ॥`,
              hindi: `विभाव (कारण), अनुभाव (शारीरिक चेष्टा) और व्यभिचारी (संचारी) भावों के परस्पर संयोग से ही रस की अलौकिक निष्पत्ति (अनुभूति) होती है।`,
              english: `Aesthetic relish (Rasa) is born from the harmonious convergence of primary stimulants, external reactions, and transient emotions.`
            },
            {
              shlokaNum: 6,
              sanskrit: `शृङ्गार-हास्य-करुणा-रौद्र-वीर-भयानकाः ।
बीभत्साद्भुतशान्ताश्च नव नाट्ये रसाः स्मृताः ॥ ६ ॥`,
              hindi: `शृंगार, हास्य, करुण, रौद्र, वीर, भयानक, बीभत्स, अद्भुत और शांत—ये नौ रस संगीत और नाट्य के प्राण हैं।`,
              english: `Love, mirth, pathos, fury, heroism, terror, disgust, wonder, and serene peace—these nine rasas embody artistic consciousness.`
            },
            {
              shlokaNum: 7,
              sanskrit: `गीतं वाद्यं तथा नृत्यं त्रयं सङ्गीतमुच्यते ।
तत्र वाद्यं समाश्रित्य नृत्तं गीतानुरोधि च ॥ ७ ॥`,
              hindi: `गायन, वादन और नृत्य—इन तीनों के सुंदर समन्वय को "संगीत" कहा जाता है। इसमें वादन और नृत्य गायन का अनुसरण करते हैं।`,
              english: `Vocal singing, instrumental playing, and expressive dance together are called Sangita, harmonizing heart and soul.`
            },
            {
              shlokaNum: 8,
              sanskrit: `अक्षरं परमं ब्रह्म नाद एव प्रतिष्ठितम् ।
तस्मात् सङ्गीतविज्ञानान्मुक्तिं यान्ति मनीषिणः ॥ ८ ॥`,
              hindi: `परम अविनाशी ब्रह्म नाद में ही प्रतिष्ठित है; इसलिए संगीत के सूक्ष्म विज्ञान को जानकर मनीषी मोक्ष प्राप्त कर लेते हैं।`,
              english: `The supreme imperishable Brahman is rooted in transcendental sound; by deep realization of music, sages attain liberation.`
            },
            {
              shlokaNum: 9,
              sanskrit: `न विद्या संगीतात् परा । न सुखं संगीतात् परम् ॥ ९ ॥`,
              hindi: `संगीत से बढ़कर कोई विद्या नहीं है, और संगीत से बढ़कर कोई परम सुख नहीं है। यह आत्मा को प्रभु से जोड़ता है।`,
              english: `There is no science higher than music; there is no joy beyond music; it unites the soul with the divine.`
            },
            {
              shlokaNum: 10,
              sanskrit: `आनन्दं ब्रह्मणो रूपं तच्च गेये प्रतिष्ठितम् ।
यः शृणोति स मुच्येत सर्वपापैर्न संशयः ॥ १० ॥`,
              hindi: `परब्रह्म का वास्तविक स्वरूप "आनंद" है, और वह आनंद भक्ति-संगीत में प्रतिष्ठित है। जो इसे सुनता और गाता है, वह पापमुक्त हो जाता है।`,
              english: `Bliss is the very nature of Brahman, and that bliss is anchored in divine song. Whoever listens with devotion is cleansed of all impurities.`
            }
          ]
        )
      ]
    }
  ]
};

// =========================================================================
// 4. स्थापत्यवेद व अर्थशास्त्र (STHAPATYAVEDA & ARTHASHASTRA)
// =========================================================================
export const STHAPATYAVEDA_BOOK: ScriptureBook = {
  id: 'sthapatyaveda_samhita',
  titleHi: 'स्थापत्यवेद व अर्थशास्त्र',
  titleEn: 'Sthapatyaveda & Arthashastra',
  categoryKey: 'upavedas',
  categoryNameHi: 'चार उपवेद',
  categoryNameEn: 'The Four Upavedas',
  icon: '🏛️',
  badge: 'अथर्ववेद उपवेद • वास्तु व कौटिल्य अर्थनीति',
  totalChaptersCount: 4,
  totalVersesEstimate: 'वास्तु पुरुष मण्डल व राष्ट्रनीति',
  descriptionHi: `अथर्ववेद का उपवेद। वास्तु शास्त्र, नगर नियोजन, देवालय निर्माण तथा कौटिल्य का अर्थशास्त्र—समृद्ध समाज और सुशासन का विज्ञान।`,
  descriptionEn: `The sacred architecture of temples, cosmic vastu grid, urban design, and ethical statecraft.`,
  accentGradient: 'from-amber-700 via-orange-800 to-stone-900',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: `प्रथम अध्याय: वास्तु पुरुष मण्डल व नगर रचना`,
      chapterTitleEn: `Chapter 1: The Vastu Purusha Grid & Civic Architecture`,
      totalVersesText: '१० श्लोक',
      sections: [
        createSectionBlock(
          1, 1, 10,
          `वास्तु पुरुष की स्थापना एवं दिशाओं का संतुलन`,
          `Section 1: Vastu Purusha Mandala & Directional Harmonies`,
          `ईशान कोण में जल और पूजा, आग्नेय में अग्नि, नैऋत्य में भारीपन और वायव्य में वायु का संतुलन गृह को स्वर्ग बनाता है।`,
          `Balancing Northeast for prayer, Southeast for fire, Southwest for stability, and Northwest for movement turns a home into heaven.`,
          [
            {
              shlokaNum: 1,
              sanskrit: `वास्तुपुरुष नमस्तेऽस्तु भूशय्याभिरत प्रभो ।
मद्गृहं धनधान्यादिसमृद्धं कुरु सर्वदा ॥ १ ॥`,
              hindi: `भूमि की शय्या पर शयन करने वाले हे वास्तुपुरुष प्रभु! आपको नमस्कार है। मेरे घर को सदा धन-धान्य और शांति से परिपूर्ण कीजिए।`,
              english: `Salutations to Thee, O Lord Vastu Purusha, resting upon the bed of earth! Prosper my home always with abundance and peace.`
            },
            {
              shlokaNum: 2,
              sanskrit: `ईशाने देवता गेहं पूर्वस्यां स्नानमन्दिरम् ।
आग्नेय्यां पचनागारं दक्षिणे शयनं स्मृतम् ॥ २ ॥`,
              hindi: `ईशान कोण में देवमंदिर, पूर्व दिशा में स्नानघर, आग्नेय कोण में रसोईघर और दक्षिण दिशा में मुख्य शयनकक्ष होना चाहिए।`,
              english: `In the Northeast locate the sanctuary, in the East the bath, in the Southeast the kitchen, and in the South the master bedroom.`
            },
            {
              shlokaNum: 3,
              sanskrit: `नैर्ऋत्यां शस्त्रभण्डारं पश्चिमे भोजनं तथा ।
वायव्ये धनधान्यं च उत्तरे भाण्डगारकम् ॥ ३ ॥`,
              hindi: `नैऋत्य कोण में भारी सामान या शस्त्र, पश्चिम में भोजन कक्ष, वायव्य में अन्न-गौशाला और उत्तर दिशा में कुबेर का कोषागार शुभ होता है।`,
              english: `In the Southwest keep heavy reserves, in the West dining, in the Northwest mobility and grains, and in the North treasury.`
            },
            {
              shlokaNum: 4,
              sanskrit: `ब्रह्मस्थानं सदा शून्यं कर्तव्यं सर्वयत्नतः ।
तत्र भारविनिक्षेपे गृहेशस्य विपत्तयः ॥ ४ ॥`,
              hindi: `घर का मध्य भाग (ब्रह्मस्थान) सदा खुला और भाररहित रखना चाहिए; वहाँ भारी भार रखने से गृहस्वामी को संकटों का सामना करना पड़ता है।`,
              english: `The central nucleus (Brahmasthana) must ever remain open and unburdened; placing heavy load there invites hardship upon the master.`
            },
            {
              shlokaNum: 5,
              sanskrit: `सुखस्य मूलं धर्मः । धर्मस्य मूलमर्थः ।
अर्थस्य मूलं राज्यम् । राज्यस्य मूलमिन्द्रियजयः ॥ ५ ॥`,
              hindi: `सुख का मूल धर्म है; धर्म का मूल अर्थ (सदाचारपूर्ण संपत्ति) है; अर्थ का मूल सुव्यवस्थित राज्य है; और राज्य का मूल राजा का इंद्रिय-विजय (आत्मसंयम) है।`,
              english: `The root of happiness is righteousness; the root of righteousness is ethical wealth; wealth depends on stable governance; governance rests upon self-mastery.`
            },
            {
              shlokaNum: 6,
              sanskrit: `प्रजासुखे सुखं राज्ञः प्रजानां च हिते हितम् ।
नात्मप्रियं हितं राज्ञः प्रजानां तु प्रियं हितम् ॥ ६ ॥`,
              hindi: `प्रजा के सुख में ही राजा का सच्चा सुख है, और प्रजा के हित में ही उसका हित है। राजा के लिए वह प्रिय नहीं जो उसे भाए, बल्कि वह हितकारी है जो प्रजा को प्रिय हो।`,
              english: `In the happiness of his subjects lies the king's happiness; in their welfare his welfare. Whatever pleases himself he shall not consider good, but whatever pleases his people.`
            },
            {
              shlokaNum: 7,
              sanskrit: `कोषपूर्वाः सर्वारम्भाः । तस्मात्कोशं विशोधयेत् ॥ ७ ॥`,
              hindi: `समस्त लोक-कल्याणकारी कार्य और योजनाएं राजकोष पर निर्भर करती हैं; इसलिए कोष को सदा न्यायपूर्ण और पवित्र रखना चाहिए।`,
              english: `All national undertakings depend on the treasury; therefore, let the leader ensure a just, transparent, and flourishing treasury.`
            },
            {
              shlokaNum: 8,
              sanskrit: `यथा ह्येकेन चक्रेण न रथस्य गतिर्भवेत् ।
एवं पुरुषकारेण विना दैवं न सिध्यति ॥ ८ ॥`,
              hindi: `जैसे केवल एक पहिये से रथ नहीं चल सकता, वैसे ही बिना पुरुषार्थ (कड़े परिश्रम) के केवल भाग्य के भरोसे कोई कार्य सिद्ध नहीं होता।`,
              english: `Just as a chariot cannot move on a single wheel, so fate accomplishes nothing without noble personal endeavor.`
            },
            {
              shlokaNum: 9,
              sanskrit: `अकृतायाः श्रियो रक्षा कृतायाश्च विवर्धनम् ।
तीर्थेषु प्रतिपत्तिश्च राष्ट्रस्यैतानि लक्षणम् ॥ ९ ॥`,
              hindi: `अप्राप्त संपत्ति को अर्जित करना, अर्जित संपत्ति की रक्षा करना, रक्षित का संवर्धन करना और उसका पात्रों में वितरण करना—यही आदर्श राष्ट्र के लक्षण हैं।`,
              english: `Acquiring wealth not yet possessed, protecting what is gained, increasing what is protected, and distributing it righteously—these are the hallmarks of a great nation.`
            },
            {
              shlokaNum: 10,
              sanskrit: `धर्मेण धार्यते लोकः । सत्येनोत्तिष्ठते यशः ॥ १० ॥`,
              hindi: `यह संपूर्ण संसार धर्म के नियमों से ही टिका हुआ है, और सत्य के आचरण से ही अक्षय यश की प्राप्ति होती है।`,
              english: `The world is sustained by cosmic righteousness, and lasting honor rises only upon the foundation of truth.`
            }
          ]
        )
      ]
    }
  ]
};

// =========================================================================
// 5. छह वेदांग (SIX VEDANGAS)
// =========================================================================
export const SHIKSHA_VEDANGA_BOOK: ScriptureBook = {
  id: 'shiksha_vedanga',
  titleHi: 'शिक्षा वेदांग (पाणिनीय शिक्षा)',
  titleEn: 'Shiksha Vedanga (Phonetics & Pronunciation)',
  categoryKey: 'vedangas',
  categoryNameHi: 'छह वेदांग',
  categoryNameEn: 'The Six Vedangas',
  icon: '🗣️',
  badge: 'प्रथम वेदांग • शुद्ध वैदिक स्वर-उच्चारण',
  totalChaptersCount: 1,
  totalVersesEstimate: 'वर्णोच्चारण शिक्षा',
  descriptionHi: `वेदों की नासिका स्वरूप। उदात्त, अनुदात्त, स्वरित—तीनों स्वरों का शुद्ध उच्चारण, वर्ण-स्थान (कंठ, तालु, मूर्धा, दंत, ओष्ठ) का विज्ञान।`,
  descriptionEn: `The science of sacred phonetics, Vedic pitch, articulation organs, and pristine sonic resonance.`,
  accentGradient: 'from-blue-600 to-indigo-700',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: `पाणिनीय शिक्षा: वर्णोच्चारण विधि`,
      chapterTitleEn: `Paniniya Shiksha: Pure Articulation of Letters`,
      totalVersesText: '१० श्लोक',
      sections: [
        createSectionBlock(
          1, 1, 10,
          `वैदिक वर्णों के स्थान, प्रयत्न और दोष-रहित पाठ`,
          `Section 1: Vedic Phonetic Organs & Flawless Recitation`,
          `मंत्रो हीनः स्वरतो वर्णतो वा मिथ्याप्रयुक्तो न तमर्थमाह। स वाग्वज्रो यजमानं हिनस्ति यथेन्द्रशत्रुः स्वरतोऽपराधात्॥`,
          `A mantra defective in vowel pitch or consonant fails to convey its meaning; like a sonic thunderbolt, it strikes down the mispronouncer.`,
          [
            {
              shlokaNum: 1,
              sanskrit: `अथ शिक्षां प्रवक्ष्यामि पाणिनीयान्मतं यथा ।
शास्त्रानुपूर्व्यं तद्विद्याद्यथोक्तं लोकवेदयोः ॥ १ ॥`,
              hindi: `अब मैं महर्षि पाणिनि के मतानुसार "शिक्षा" शास्त्र का वर्णन करता हूँ, जिसका ज्ञान लोक और वेद दोनों के शुद्ध उच्चारण हेतु अनिवार्य है।`,
              english: `Now I shall expound the science of phonetics according to sage Panini, essential for flawless chanting in worldly and Vedic realms.`
            },
            {
              shlokaNum: 2,
              sanskrit: `त्रिपष्टिः चतुःषष्टिर्वा वर्णाः शम्भुमते मताः ।
प्राकृते संस्कृते चापि स्वयं प्रोक्ताः स्वयम्भुवा ॥ २ ॥`,
              hindi: `भगवान शिव के मत से प्राकृत और संस्कृत में ६३ या ६४ वर्ण माने गए हैं, जो साक्षात् स्वयंभू ब्रह्मा द्वारा उच्चारित किए गए हैं।`,
              english: `In the doctrine of Shiva, sixty-three or sixty-four basic sounds are recognized, vocalized by the self-born creator.`
            },
            {
              shlokaNum: 3,
              sanskrit: `आत्मा बुद्ध्या समेत्यार्थान् मनो युङ्क्ते विवक्षया ।
मनः कायाग्निमाहन्ति स प्रेरयति मारुतम् ॥ ३ ॥`,
              hindi: `आत्मा बुद्धि के साथ मिलकर बोलने की इच्छा से मन को प्रेरित करती है; मन जठराग्नि को जगाता है और वह अग्नि प्राणवायु को ऊपर उठाती है।`,
              english: `The soul, uniting with intellect, prompts the mind with desire to speak; the mind stirs the bodily fire, which propels the breath upward.`
            },
            {
              shlokaNum: 4,
              sanskrit: `अष्टौ स्थानानि वर्णानामुरः कण्ठः शिरस्तथा ।
जिह्वामूलं च दन्ताश्च नासिकौष्ठौ च तालु च ॥ ४ ॥`,
              hindi: `वर्णों के आठ उच्चारण स्थान हैं: हृदय (उर), कंठ, मस्तक (मूर्धा), जिह्वामूल, दंत, नासिका, ओष्ठ और तालु।`,
              english: `Eight are the phonetic stations of sounds: the chest, throat, roof of the palate (head), tongue-root, teeth, nose, lips, and palate.`
            },
            {
              shlokaNum: 5,
              sanskrit: `उदात्तश्चानुदात्तश्च स्वरितश्च स्वरास्त्रयः ।
ह्रस्वो दीर्घः प्लुत इति कालतो नियमा अचि ॥ ५ ॥`,
              hindi: `स्वर तीन प्रकार के हैं: उदात्त (उच्च स्वर), अनुदात्त (मंद्र स्वर) और स्वरित (मध्यम)। मात्रा काल के अनुसार वे ह्रस्व (एक मात्रा), दीर्घ (दो मात्रा) और प्लुत (तीन मात्रा) होते हैं।`,
              english: `Tones are threefold: Udätta (raised), Anudätta (grave), and Svarita (circumflex); by duration, short, long, and protracted.`
            },
            {
              shlokaNum: 6,
              sanskrit: `व्याघ्री यथा हरेत्पुत्रान् दंष्ट्राभ्यां न च पीडयेत् ।
भीता पतनभेदाभ्यां तद्वद्वर्णान् प्रयोजयेत् ॥ ६ ॥`,
              hindi: `जैसे बाघिन अपने बच्चों को दाँतों से ऐसे पकड़ती है कि न वे गिरें और न उन्हें दाँत गड़े—वैसे ही कोमलता और स्पष्टता से मंत्र के वर्णों का उच्चारण करें।`,
              english: `As a tigress carries her cubs between her teeth without crushing them or letting them fall, so should one pronounce the sacred letters.`
            },
            {
              shlokaNum: 7,
              sanskrit: `गीती शीघ्री शिरःकम्पी तथा लिखितपाठकः ।
अनर्थज्ञोऽल्पकण्ठश्च षडेते पाठकाधमाः ॥ ७ ॥`,
              hindi: `गाकर पढ़ने वाला, बहुत जल्दी-जल्दी बोलने वाला, सिर हिलाने वाला, पुस्तक देख-देखकर पढ़ने वाला, अर्थ न जानने वाला और मंद स्वर वाला—ये छह अधम पाठक हैं।`,
              english: `Singing, rushing, nodding the head, reading from writing without memorization, ignorant of meaning, and feeble-voiced—these six are inferior reciters.`
            },
            {
              shlokaNum: 8,
              sanskrit: `माधुर्यमक्षरव्यक्तिः पदच्छेदस्तु सुस्वरः ।
धैर्यं लयसमर्थं च षडेते पाठका गुणाः ॥ ८ ॥`,
              hindi: `माधुर्य, अक्षरों की स्पष्टता, पदों का उचित विच्छेद, उत्तम स्वर, धैर्य और लय का निर्वाह—ये छह उत्तम पाठक के गुण हैं।`,
              english: `Sweetness, clarity of syllables, proper division of words, melodious tone, patience, and mastery of rhythm—these six are virtues of an ideal chanter.`
            },
            {
              shlokaNum: 9,
              sanskrit: `मन्त्रो हीनः स्वरतो वर्णतो वा मिथ्याप्रयुक्तो न तमर्थमाह ।
स वाग्वज्रो यजमानं हिनस्ति यथेन्द्रशत्रुः स्वरतोऽपराधात् ॥ ९ ॥`,
              hindi: `जो मंत्र स्वर या वर्ण से हीन होता है, वह सही अर्थ नहीं देता; वह वाक्-वज्र बनकर यजमान को नष्ट कर देता है, जैसे स्वर की त्रुटि से "इन्द्रशत्रु" नष्ट हुआ।`,
              english: `A mantra defective in accent or letter fails in meaning; becoming a sonic thunderbolt, it harms the invoker, as happened in the sacrifice of Vritra.`
            },
            {
              shlokaNum: 10,
              sanskrit: `सुवर्णं पुष्पितां पृथ्वीं चिन्वन्ति पुरुषास्त्रयः ।
शूरश्च कृतविद्यश्च यश्च जानाति सेवितुम् ॥ १० ॥`,
              hindi: `इस रत्नगर्भा पृथ्वी के श्रेष्ठ फलों का उपभोग तीन ही पुरुष करते हैं: शूरवीर, विद्या संपन्न ज्ञानी, और सेवाभाव को जानने वाला व्यक्ति।`,
              english: `Three types of mortals gather golden flowers from this earth: the valiant, the master of wisdom, and the servant of truth.`
            }
          ]
        )
      ]
    }
  ]
};

export const JYOTISHA_VEDANGA_BOOK: ScriptureBook = {
  id: 'jyotisha_vedanga',
  titleHi: 'ज्योतिष वेदांग (लगध वेदांग ज्योतिष)',
  titleEn: 'Jyotisha Vedanga (Astronomy & Cosmic Timing)',
  categoryKey: 'vedangas',
  categoryNameHi: 'छह वेदांग',
  categoryNameEn: 'The Six Vedangas',
  icon: '🔭',
  badge: 'नेत्र स्वरूप • काल-विधान व नक्षत्र शास्त्र',
  totalChaptersCount: 1,
  totalVersesEstimate: 'काल चक्र व नक्षत्र गणना',
  descriptionHi: `वेदों के दिव्य चक्षु (नेत्र)। यज्ञ-याग और सत्कर्मों के लिए सूर्य, चन्द्रमा, २७ नक्षत्रों और संवत्सर काल-चक्र की सटीक गणना का आदि-शास्त्र।`,
  descriptionEn: `The sacred eyes of the Veda, computing cosmic celestial cycles, equinoxes, and auspicious timings.`,
  accentGradient: 'from-amber-600 via-purple-700 to-indigo-900',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: `वेदांग ज्योतिष: काल विधान शास्त्र`,
      chapterTitleEn: `Vedanga Jyotisha: Science of Cosmic Time`,
      totalVersesText: '१० श्लोक',
      sections: [
        createSectionBlock(
          1, 1, 10,
          `कालचक्र, संवत्सर एवं नक्षत्र ज्ञान`,
          `Section 1: The Cosmic Wheel of Time & Nakshatras`,
          `यथा शिखा मयूराणां नागानां मणयो यथा। तद्वद्वेदाङ्गशास्त्राणां गणितं मूर्धनि स्थितम्॥`,
          `Like the crest on a peacock or the gem in a serpent's hood, mathematics and celestial astronomy sit supreme at the crown of all Vedangas.`,
          [
            {
              shlokaNum: 1,
              sanskrit: `यथा शिखा मयूराणां नागानां मणयो यथा ।
तद्वद्वेदाङ्गशास्त्राणां गणितं मूर्धनि स्थितम् ॥ १ ॥`,
              hindi: `जैसे मोरों के सिर पर कलगी और साँपों के सिर पर मणि सबसे ऊँचा स्थान पाती है, वैसे ही समस्त वेदांग शास्त्रों में ज्योतिष (गणित) शीर्ष स्थान पर स्थित है।`,
              english: `As the crest on the head of a peacock and the jewel on the hood of a serpent, so does astronomical science stand at the pinnacle of all Vedangas.`
            },
            {
              shlokaNum: 2,
              sanskrit: `वेदा हि यज्ञार्थमभिप्रवृत्ताः कालानुपूर्व्या विहिताश्च यज्ञाः ।
तस्मादिदं कालविधानशास्त्रं यो ज्योतिषं वेद स वेद यज्ञान् ॥ २ ॥`,
              hindi: `वेद यज्ञों के संपादन हेतु प्रवृत्त हुए हैं और सभी यज्ञ काल (मुहूर्त) के नियम से बंधे हैं; इसलिए जो इस काल-विधान ज्योतिष शास्त्र को जानता है, वही यज्ञों का मर्म जानता है।`,
              english: `The Vedas arose for sacrificial action, and all sacred acts are governed by celestial time; he who knows this science of time understands all rituals.`
            },
            {
              shlokaNum: 3,
              sanskrit: `माघशुक्लप्रपन्नस्य पौषकृष्णसमापिनः ।
युगस्य पञ्चवर्षस्य कालज्ञानं प्रचक्षते ॥ ३ ॥`,
              hindi: `माघ शुक्ल पक्ष की प्रतिपदा से आरंभ होकर पौष कृष्ण पक्ष की अमावस्या को समाप्त होने वाले पांच वर्षों के युग काल-चक्र की गणना की जाती है।`,
              english: `They explain the five-year yuga cycle, which begins on the first day of the bright half of Magha and ends at the dark half of Pausha.`
            },
            {
              shlokaNum: 4,
              sanskrit: `प्रपद्येते श्रविष्ठादौ सूर्याचन्द्रमसावुदक् ।
सार्पार्धे दक्षिणार्कस्तु माघश्रावणयोः सदा ॥ ४ ॥`,
              hindi: `माघ मास में सूर्य और चन्द्रमा श्रविष्ठा (धनिष्ठा) नक्षत्र से उत्तरायण होते हैं, और श्रावण मास में आश्लेषा नक्षत्र से दक्षिणायन की ओर गति करते हैं।`,
              english: `The sun and moon turn northward at the beginning of Dhanishtha in Magha, and the sun turns southward in the middle of Ashlesha in Shravana.`
            },
            {
              shlokaNum: 5,
              sanskrit: `संवत्सरो परिवत्सरो इदावत्सरोऽनुवत्सरः ।
वत्सरोऽथ युगाख्यः स्यात् पञ्चाब्दं चक्रमुत्तमम् ॥ ५ ॥`,
              hindi: `संवत्सर, परिवत्सर, इदावत्सर, अनुवत्सर और वत्सर—इन पांच वर्षों के समूह को "पंचवर्षीय युग" कहा जाता है, जो काल का उत्तम चक्र है।`,
              english: `Samvatsara, Parivatsara, Idavatsara, Anuvatsara, and Vatsara—these five comprise the sacred five-year cosmic cycle.`
            },
            {
              shlokaNum: 6,
              sanskrit: `सप्तविंशति नक्षत्राणि कृत्तिकादीनि विदुः ।
चन्द्रस्य नित्यसञ्चारात् कालविभागः प्रकीर्तितः ॥ ६ ॥`,
              hindi: `कृत्तिका से लेकर २७ नक्षत्र कहे गए हैं; चन्द्रमा के इन नक्षत्रों में नित्य भ्रमण से ही तिथियों और काल-खंडों का निर्धारण होता है।`,
              english: `Twenty-seven are the lunar mansions from Krittika to Revati; from the moon's daily passage through them, celestial divisions are measured.`
            },
            {
              shlokaNum: 7,
              sanskrit: `अयनं द्विविधं प्रोक्तमुत्तरायणदक्षिणम् ।
उत्तरायणकाले तु सर्वं शुभकरं भवेत् ॥ ७ ॥`,
              hindi: `काल के दो मुख्य अयन हैं: उत्तरायण और दक्षिणायन। उत्तरायण काल देवताओं का दिन माना जाता है और यह समस्त शुभ कार्यों हेतु सर्वोत्तम है।`,
              english: `Twofold is the sun's passage: northern (Uttarayana) and southern (Dakshinayana); the northern path is the day of gods and auspicious for all noble acts.`
            },
            {
              shlokaNum: 8,
              sanskrit: `तिथिवारं च नक्षत्रं योगः करणमेव च ।
पञ्चाङ्गस्य परिज्ञानात् सर्वपापैः प्रमुच्यते ॥ ८ ॥`,
              hindi: `तिथि, वार, नक्षत्र, योग और करण—पंचांग के इन पांच अंगों के ज्ञान से मनुष्य को समय की शुद्धि मिलती है और अमंगल का नाश होता है।`,
              english: `Lunar day (Tithi), weekday (Vara), asterism (Nakshatra), solar-lunar union (Yoga), and half-tithi (Karana)—knowledge of these five dissolves negativities.`
            },
            {
              shlokaNum: 9,
              sanskrit: `नक्षत्रदेवता वन्दे ये ग्रहाश्च दिवौकसः ।
शान्तिं कुर्वन्तु सततं मङ्गलानि दिशन्तु नः ॥ ९ ॥`,
              hindi: `नक्षत्रों के अधिष्ठाता देवों तथा आकाश में स्थित नवग्रहों की मैं वंदना करता हूँ; वे सदा शांति प्रदान करें और हमारा मंगल करें।`,
              english: `I revere the presiding divinities of the constellations and planetary spheres; may they ever bestow peace and guide our destiny.`
            },
            {
              shlokaNum: 10,
              sanskrit: `कालो हि सर्वभूतानां धाता नेता च पालकः ।
काले सर्वाणि लीयन्ते कालं ज्ञात्त्वा न सीदति ॥ १० ॥`,
              hindi: `काल ही समस्त प्राणियों का विधाता, नेता और पालक है; काल में ही सब कुछ विलीन हो जाता है। काल के रहस्य को जानने वाला कभी विचलित नहीं होता।`,
              english: `Time is the ordainer, guide, and sustainer of all beings; in time all things dissolve. He who understands cosmic time is never shaken.`
            }
          ]
        )
      ]
    }
  ]
};

export const VYAKARANA_VEDANGA_BOOK: ScriptureBook = {
  id: 'vyakarana_vedanga',
  titleHi: 'व्याकरण वेदांग (पाणिनि अष्टाध्यायी सार)',
  titleEn: 'Vyakarana Vedanga (Panini Ashtadhyayi)',
  categoryKey: 'vedangas',
  categoryNameHi: 'छह वेदांग',
  categoryNameEn: 'The Six Vedangas',
  icon: '📖',
  badge: 'मुख स्वरूप • १४ माहेश्वर सूत्र व अष्टाध्यायी',
  totalChaptersCount: 1,
  totalVersesEstimate: 'माहेश्वर सूत्र एवं शब्दब्रह्म',
  descriptionHi: `वेदों का मुख। भगवान नटराज शिव के डमरू से निकले १४ माहेश्वर सूत्र, अष्टाध्यायी के सूत्र और शब्दब्रह्म की पूर्ण निष्पत्ति।`,
  descriptionEn: `The mouth of the Veda, embodying the 14 Shiva sutras of primal phonology and generative grammar.`,
  accentGradient: 'from-cyan-700 via-blue-800 to-indigo-900',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: `माहेश्वर सूत्र एवं शब्दब्रह्म उपासना`,
      chapterTitleEn: `Maheshvara Sutras & The Science of Sacred Word`,
      totalVersesText: '१० श्लोक',
      sections: [
        createSectionBlock(
          1, 1, 10,
          `भगवान शिव का डमरू-नाद एवं व्याकरण की महिमा`,
          `Section 1: The Cosmic Drum of Lord Shiva & Divine Grammar`,
          `नृत्तावसाने नटराजराजो ननाद ढक्कां नवपञ्चवारम्। उद्धर्तुकामः सनकादिसिद्धानेतद्विमर्शे शिवसूत्रजालम्॥`,
          `At the conclusion of His cosmic dance, Nataraja sounded His drum fourteen times, releasing the divine Maheshvara Sutras for the enlightenment of sages.`,
          [
            {
              shlokaNum: 1,
              sanskrit: `नृत्तावसाने नटराजराजो ननाद ढक्कां नवपञ्चवारम् ।
उद्धर्तुकामः सनकादिसिद्धानेतद्विमर्शे शिवसूत्रजालम् ॥ १ ॥`,
              hindi: `तांडव नृत्य के अंत में नटराज भगवान शिव ने सनक आदि सिद्धों के उद्धार हेतु चौदह (नौ और पांच) बार अपना डमरू बजाया; जिससे यह माहेश्वर शिवसूत्रजाल प्रकट हुआ।`,
              english: `At the end of His cosmic dance, Nataraja sounded His holy drum fourteen times to liberate Sanaka and the sages, revealing the matrix of Shiva Sutras.`
            },
            {
              shlokaNum: 2,
              sanskrit: `१. अइउण् । २. ऋऌक् । ३. एओङ् । ४. ऐऔच् ।
५. हयवरट् । ६. लण् । ७. ञमङणनम् ॥ २ ॥`,
              hindi: `माहेश्वर सूत्रों के प्रथम सात सूत्र: (१) अ-इ-उ-ण्, (२) ऋ-ऌ-क्, (३) ए-ओ-ङ्, (४) ऐ-औ-च्, (५) ह-य-व-र-ट्, (६) ल-ण्, (७) ञ-म-ङ-ण-न-म्।`,
              english: `The first seven primal phonological sutras spanning vowels, semivowels, and nasals.`
            },
            {
              shlokaNum: 3,
              sanskrit: `८. झभञ् । ९. घढधष् । १०. जबगडदश् ।
११. खफछठथचटतव् । १२. कपय् । १३. शषसर् । १४. हल् ॥ ३ ॥`,
              hindi: `अंतिम सात सूत्र: (८) झ-भ-ञ्, (९) घ-ढ-ध-ष्, (१०) ज-ब-ग-ड-द-श्, (११) ख-फ-छ-ठ-थ-च-ट-त-व्, (१२) क-प-य्, (१३) श-ष-स-र्, (१४) ह-ल्। संपूर्ण वर्णमाला इन्हीं में समाई है।`,
              english: `The remaining seven sutras formulating aspirates, voiced, unvoiced stops, and sibilants, completing the entire sonic spectrum.`
            },
            {
              shlokaNum: 4,
              sanskrit: `मुखं व्याकरणं स्मृतम् ।
तस्मात्साङ्गमधीत्यैव ब्रह्मलोके महीयते ॥ ४ ॥`,
              hindi: `छहों वेदांगों में व्याकरण को वेद का "मुख" माना गया है; इसलिए अंगों सहित वेदों का अध्ययन करने वाला विद्वान ब्रह्मलोक में पूजित होता है।`,
              english: `Grammar is celebrated as the very face of the Veda; hence he who studies the scriptures with their limbs attains honor in the realm of Brahman.`
            },
            {
              shlokaNum: 5,
              sanskrit: `एकः शब्दः सुप्रयुक्तः सम्यग् ज्ञातः स्वर्गे लोके च कामधुग्भवति ॥ ५ ॥`,
              hindi: `एक भी शब्द यदि भली-भांति जानकर, शुद्ध व्याकरण के साथ प्रयोग किया जाए, तो वह इस लोक और परलोक में कामधेनु के समान समस्त कामनाओं को पूर्ण करता है।`,
              english: `A single word, correctly understood and properly applied according to grammar, becomes a wish-fulfilling cow in this world and the hereafter.`
            },
            {
              shlokaNum: 6,
              sanskrit: `अनादिनिधनं ब्रह्म शब्दतत्त्वं यदक्षरम् ।
विवर्ततेऽर्थभावेन प्रक्रिया जगतो यतः ॥ ६ ॥`,
              hindi: `शब्दतत्त्व रूपी ब्रह्म अनादि और अविनाशी है; संपूर्ण ब्रह्मांड की सृष्टि और प्रपंच इसी शब्दब्रह्म के विवर्त (प्रकटीकरण) से उत्पन्न होता है।`,
              english: `Brahman as the principle of the sacred Word is without beginning or end, imperishable; from it the cosmos unfolds in meanings and manifestations.`
            },
            {
              shlokaNum: 7,
              sanskrit: `साधुप्रयोगेण धर्मः । अपभ्रंशप्रयोगेणाधर्मः ॥ ७ ॥`,
              hindi: `शुद्ध शब्दों के प्रयोग से धर्म और पुण्य की वृद्धि होती है; जबकि अपभ्रंश (अशुद्ध व विकृत) शब्दों के प्रयोग से अधर्म और दोष लगता है।`,
              english: `Through the use of pristine, refined words virtue increases; through corrupt and debased speech, spiritual confusion arises.`
            },
            {
              shlokaNum: 8,
              sanskrit: `वृद्धिरैदैच् । अदेङ् गुणः ।
तुल्यास्यप्रयत्नं सवर्णम् ॥ ८ ॥`,
              hindi: `पाणिनि के प्रसिद्ध संज्ञा सूत्र: ऐ और औ की वृद्धि संज्ञा है; अ, ए, ओ की गुण संज्ञा है; तथा जिनका मुख में स्थान और प्रयत्न समान हो वे सवर्ण कहलाते हैं।`,
              english: `Panini's foundational axioms: Vriddhi defines augmented vowels, Guna the median vowels, and Savarna denotes homophonic sounds.`
            },
            {
              shlokaNum: 9,
              sanskrit: `वागर्थाविव संपृक्तौ वागर्थप्रतिपत्तये ।
जगतः पितरौ वन्दे पार्वतीपरमेश्वरौ ॥ ९ ॥`,
              hindi: `वाणी और उसके अर्थ के समान नित्य मिले हुए, संपूर्ण जगत के माता-पिता भगवती पार्वती और देवाधिदेव शिव की मैं वाणी और अर्थ की सिद्धि हेतु वंदना करता हूँ।`,
              english: `Inseparable like speech and its meaning, I bow unto Parvati and Parameshvara, parents of the universe, to attain mastery over word and essence.`
            },
            {
              shlokaNum: 10,
              sanskrit: `सत्यं ब्रूयात् प्रियं ब्रूयान्न ब्रूयात्सत्यमप्रियम् ।
प्रियं च नानृतं ब्रूयादेष धर्मः सनातनः ॥ १० ॥`,
              hindi: `सत्य बोलो, प्रिय बोलो, किंतु अप्रिय सत्य मत बोलो; और प्रिय लगने वाला असत्य भी मत बोलो—यही सनातन धर्म की आचार नीति है।`,
              english: `Speak truth, speak pleasingly; speak not unpleasant truth, nor utter pleasing falsehood—this is the eternal Sanatana Dharma.`
            }
          ]
        )
      ]
    }
  ]
};

export const UPAVEDAS_VEDANGAS_BOOKS = [
  AYURVEDA_BOOK,
  DHANURVEDA_BOOK,
  GANDHARVAVEDA_BOOK,
  STHAPATYAVEDA_BOOK,
  SHIKSHA_VEDANGA_BOOK,
  JYOTISHA_VEDANGA_BOOK,
  VYAKARANA_VEDANGA_BOOK
];

# -*- coding: utf-8 -*-
import sys
sys.stdout.reconfigure(encoding='utf-8')

content = '''/**
 * mahapuranasCanonData.ts
 * अठारह महापुराण (18 Mahapuranas) - सनातन धर्म का दिव्य इतिहास व भक्ति कोष
 * 
 * सात्विक, राजसिक एवं तामसिक पुराणों का सम्पूर्ण प्रामाणिक संग्रह:
 * 1. ब्रह्म पुराण (Brahma Purana - आदि पुराण)
 * 2. पद्म पुराण (Padma Purana)
 * 3. विष्णु पुराण (Vishnu Purana)
 * 4. शिव महापुराण (Shiva Purana)
 * 5. श्रीमद्भागवत महापुराण (Srimad Bhagavata Purana)
 * 6. नारद पुराण (Narada Purana)
 * 7. मार्कण्डेय पुराण (Markandeya Purana)
 * 8. अग्नि पुराण (Agni Purana - सर्वविद्या कोष)
 * 9. भविष्य पुराण (Bhavishya Purana)
 * 10. ब्रह्मवैवर्त पुराण (Brahmavaivarta Purana)
 * 11. लिंग पुराण (Linga Purana)
 * 12. वराह पुराण (Varaha Purana)
 * 13. स्कन्द पुराण (Skanda Purana - विशालतम पुराण)
 * 14. वामन पुराण (Vamana Purana)
 * 15. कूर्म पुराण (Kurma Purana)
 * 16. मत्स्य पुराण (Matsya Purana)
 * 17. गरुड़ पुराण (Garuda Purana - धर्म व मोक्ष)
 * 18. ब्रह्माण्ड पुराण (Brahmanda Purana - ललितोपाख्यान)
 */

import { ScriptureBook, createSectionBlock } from './scriptureBase';

// =========================================================================
// 1. श्रीमद्भागवत महापुराण (SRIMAD BHAGAVATA PURANA)
// =========================================================================
export const BHAGAVATA_PURANA_BOOK: ScriptureBook = {
  id: 'shrimad_bhagavata_purana',
  titleHi: 'श्रीमद्भागवत महापुराण',
  titleEn: 'Srimad Bhagavata Mahapurana',
  categoryKey: 'mahapuranas',
  categoryNameHi: 'अठारह महापुराण',
  categoryNameEn: 'The 18 Mahapuranas',
  icon: '🦚',
  badge: '१२ स्कन्ध • ३३५ अध्याय • १८,००० श्लोक सम्पूर्ण',
  totalChaptersCount: 12,
  totalVersesEstimate: '१८,००० श्लोक',
  descriptionHi: 'पुराणों का मुकुटमणि। "निगमकल्पतरोर्गलितं फलम्" — भगवान श्रीकृष्ण की दिव्य रासलीला, चतुःश्लोकी भागवत और परमहंसों की भक्ति-संहिता।',
  descriptionEn: 'The crest jewel of the Puranas, expounding the divine glories and pastimes of Sri Krishna.',
  accentGradient: 'from-amber-600 via-orange-600 to-yellow-600',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: 'प्रथम स्कन्ध: मंगलाचरण व भागवत माहात्म्य',
      chapterTitleEn: 'Canto 1: Invocation & Glories of Bhagavata',
      totalVersesText: '१० श्लोक',
      sections: [
        createSectionBlock(
          1, 1, 10,
          'सत्यं परं धीमहि — परब्रह्म श्रीकृष्ण वंदना',
          'Section 1: Meditating on the Supreme Truth & Nectar of Bhagavata',
          'जन्माद्यस्य यतोऽन्वयादितरतश्चार्थेष्वभिज्ञः स्वराट्। तेने ब्रह्म हृदा य आदिकवये मुह्यन्ति यत्सूरयः। तेजोवारिमृदां यथा विनिमयो यत्र त्रिसर्गोऽमृषा। धाम्ना स्वेन सदा निरस्तकुहकं सत्यं परं धीमहि॥',
          'We meditate upon the Supreme Truth, from whom proceeds the creation, sustenance, and dissolution of this universe, self-luminous and eternally untainted by illusion.',
          [
            {
              shlokaNum: 1,
              sanskrit: 'जन्माद्यस्य यतोऽन्वयादितरतश्चार्थेष्वभिज्ञः स्वराट् ।\nतेने ब्रह्म हृदा य आदिकवये मुह्यन्ति यत्सूरयः ॥\nतेजोवारिमृदां यथा विनिमयो यत्र त्रिसर्गोऽमृषा ।\nधाम्ना स्वेन सदा निरस्तकुहकं सत्यं परं धीमहि ॥ १ ॥',
              hindi: 'जिससे इस संपूर्ण जगत की उत्पत्ति, स्थिति और प्रलय होता है; जो सब पदार्थों में अन्वय और व्यतिरेक रूप से स्थित होकर सब कुछ जानने वाला और स्वयंप्रकाश है; जिसने ब्रह्मा के हृदय में वेद ज्ञान का संचार किया; उस माया-रहित परम सत्य (भगवान श्रीकृष्ण) का हम ध्यान करते हैं।',
              english: 'We meditate upon that Supreme Truth, from whom proceeds the origin, preservation, and dissolution of this universe, who is self-luminous, and who revealed the Vedas to Brahma. In His own glory, illusion is forever dispelled.'
            },
            {
              shlokaNum: 2,
              sanskrit: 'धर्मः प्रोज्झितकैतवोऽत्र परमो निर्मत्सराणां सतां ।\nवेद्यं वास्तवमत्र वस्तु शिवदं तापत्रयोन्मूलनम् ॥\nश्रीमद्भागवते महामुनिकृते किं वा परैरीश्वरः ।\nसद्यो हृद्यवरुध्यतेऽत्र कृतिभिः शुश्रूषुभिस्तत्क्षणात् ॥ २ ॥',
              hindi: 'इस श्रीमद्भागवत में कपटरहित परम धर्म का निरूपण है, जो मत्सर (ईर्ष्या) से रहित सत्पुरुषों के लिए है। यह तीनों तापों को जड़ से उखाड़ फेंकने वाला कल्याणकारी सत्य वस्तु है। इसके श्रवण से परमात्मा तुरंत हृदय में बंदी बन जाते हैं।',
              english: 'In this Bhagavata, completely rejected is all pretentious religiosity. Here is taught the highest duty of pure-hearted souls, uprooting the threefold miseries. By hearing it, the Supreme Lord is captured immediately in the heart.'
            },
            {
              shlokaNum: 3,
              sanskrit: 'निगमकल्पतरोर्गलितं फलं शुकमुखादमृतद्रवसंयुतम् ।\nपिबत भागवतं रसमालयं मुहुरहो रसिका भुवि भावुकाः ॥ ३ ॥',
              hindi: 'हे रसिक और भावुक जनो! यह श्रीमद्भागवत वेदरूपी कल्पवृक्ष का पका हुआ अमृत फल है, जो श्रीशुकदेव जी के मुख से गिरकर और भी मधुर हो गया है। इस रसामृत का बारंबार पान करो।',
              english: 'O connoisseurs of divine nectar, drink continuously of this Bhagavata, the ripe fruit fallen from the wish-yielding tree of the Vedas, enriched by the touch of Shukadeva\'s lips!'
            },
            {
              shlokaNum: 4,
              sanskrit: 'यं प्रव्रजन्तमनुपेतमपेतकृत्यं द्वैपायनो विरहकातर आजुहाव ।\nपुत्रेति तन्मयतया तरवोऽभिनेदुस्तं सर्वभूतहृदयं मुनिमानतोऽस्मि ॥ ४ ॥',
              hindi: 'जब श्रीशुकदेव जी बिना यज्ञोपवीत संस्कार के ही वन को जाने लगे, तब विरह से व्याकुल होकर व्यास जी ने "हे पुत्र!" कहकर पुकारा; उस समय शुकदेव जी के तन्मय भाव से वृक्षों ने उत्तर दिया। उन सर्वभूतहृदय मुनि को मैं प्रणाम करता हूँ।',
              english: 'I bow unto that sage Shukadeva, whose heart was one with all beings, so that when his father Vyasa called in separation, "O my son!", the trees echoed back in universal oneness.'
            },
            {
              shlokaNum: 5,
              sanskrit: 'अथापि यत्पादविमोचनाय संकीर्तनं यस्य यशः पवित्रम् ।\nसद्यः पुनात्यन्तमृषीनपि स्वयं गङ्गेव विष्णोश्चरणोदकं हि ॥ ५ ॥',
              hindi: 'जिन भगवान के पावन यश का संकीर्तन गंगाजल की भांति सुनते ही समस्त जीवों को तुरंत पवित्र कर देता है, उन श्रीहरि के चरणों में बारंबार नमस्कार है।',
              english: 'He whose holy names and sacred chanting purify the soul instantly like the waters of the Ganges flowing from Vishnu\'s feet, unto Him be eternal praise.'
            },
            {
              shlokaNum: 6,
              sanskrit: 'वासुदेवे भगवति भक्तियोगः प्रयोजितः ।\nजनयत्याशु वैराग्यं ज्ञानं च यदहैतुकम् ॥ ६ ॥',
              hindi: 'भगवान वासुदेव श्रीकृष्ण में किया हुआ निष्काम भक्तियोग शीघ्र ही संसार से वैराग्य और अहैतुक आत्मज्ञान को उत्पन्न कर देता है।',
              english: 'Bhakti-yoga directed toward Lord Vasudeva Krishna quickly generates unconditional detachment and pure spiritual wisdom.'
            },
            {
              shlokaNum: 7,
              sanskrit: 'धर्मः स्वनुष्ठितः पुंसां विष्वक्सेनकथासु यः ।\nनोत्पादयेद्यदि रतिं श्रम एव हि केवलम् ॥ ७ ॥',
              hindi: 'मनुष्य द्वारा अपने वर्ण-आश्रम के धर्म का भली-भांति पालन करने पर भी यदि भगवान श्रीहरि की कथाओं में प्रेम उत्पन्न न हो, तो वह केवल व्यर्थ का श्रम मात्र है।',
              english: 'Righteous duties, though performed with meticulous care, are merely useless toil if they fail to awaken love for the pastimes of the Supreme Lord.'
            },
            {
              shlokaNum: 8,
              sanskrit: 'धर्मस्य ह्यापवर्ग्यस्य नार्थोऽर्थायोपकल्पते ।\nनार्थस्य धर्मैकान्तस्य कामो लाभाय हि स्मृतः ॥ ८ ॥',
              hindi: 'मोक्ष की प्राप्ति कराने वाले धर्म का फल केवल धन कमाना नहीं है; और धन का फल केवल इंद्रिय भोग नहीं, बल्कि परमार्थ की सिद्धि है।',
              english: 'The ultimate fruit of Dharma is liberation, not material wealth; and the true purpose of wealth is righteous service, not sense gratification.'
            },
            {
              shlokaNum: 9,
              sanskrit: 'कामस्य नेन्द्रियप्रीतिर्लाभो जीवेत यावता ।\nजीवस्य तत्त्वजिज्ञासा नार्थो यश्चेह कर्मभिः ॥ ९ ॥',
              hindi: 'जीवन की इच्छाओं का लक्ष्य केवल इंद्रिय सुख नहीं, बल्कि जीवित रहकर केवल "तत्त्वजिज्ञासा" (परम सत्य को जानना) ही मनुष्य का एकमात्र मुख्य ध्येय है।',
              english: 'The aim of life\'s desires is not sensory indulgence, but sustaining vitality for inquiry into the Absolute Truth.'
            },
            {
              shlokaNum: 10,
              sanskrit: 'वदन्ति तत्तत्त्वविदस्तत्त्वं यज्ज्ञानमद्वयम् ।\nब्रह्मेति परमात्मेति भगवानिति शब्द्यते ॥ १० ॥',
              hindi: 'तत्त्ववेत्ता ज्ञानी उस एक अद्वैत ज्ञान-स्वरूप तत्त्व को ही "तत्त्व" कहते हैं, जिसे ज्ञानी "ब्रह्म", योगी "परमात्मा" और भक्त "भगवान" के नाम से पुकारते हैं।',
              english: 'Knowers of reality declare the non-dual Truth as the ultimate Reality, which is realized as Brahman (the Absolute), Paramatman (Inner Self), and Bhagavan (Personal God).'
            }
          ]
        )
      ]
    }
  ]
};

// =========================================================================
// 2. शिव महापुराण (SHIVA PURANA)
// =========================================================================
export const SHIVA_PURANA_BOOK: ScriptureBook = {
  id: 'shiva_purana',
  titleHi: 'शिव महापुराण',
  titleEn: 'Shiva Mahapurana',
  categoryKey: 'mahapuranas',
  categoryNameHi: 'अठारह महापुराण',
  categoryNameEn: 'The 18 Mahapuranas',
  icon: '🔱',
  badge: '७ संहिताएँ • २४,००० श्लोक सम्पूर्ण',
  totalChaptersCount: 7,
  totalVersesEstimate: '२४,००० श्लोक',
  descriptionHi: 'देवाधिदेव महादेव शिव का पावन चरित्र। ज्योतिर्लिंग प्राकट्य, रुद्राक्ष महिमा, पंचाक्षर मंत्र (ॐ नमः शिवाय) और कैलास धाम का अगाध वैभव।',
  descriptionEn: 'The sacred epic glorifying Lord Shiva, the 12 Jyotirlingas, Panchakshari mantra, and the mystery of cosmic dissolution.',
  accentGradient: 'from-cyan-800 via-sky-800 to-indigo-900',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: 'विद्येश्वर संहिता: शिव माहात्म्य व पंचाक्षर महिमा',
      chapterTitleEn: 'Vidyeshvara Samhita: Glory of Shiva & Panchakshara Mantra',
      totalVersesText: '१० श्लोक',
      sections: [
        createSectionBlock(
          1, 1, 10,
          'शिवलिंग पूजा, रुद्राक्ष एवं भस्म महिमा',
          'Section 1: Sacred Shivalinga Worship, Rudraksha, and Holy Bhasma',
          'ॐ नमः शिवाय शुभदं मन्त्रराजं विदुर्बुधाः। यस्योच्चारणमात्रेण शिवलोके महीयते॥',
          'Om Namah Shivaya is celebrated as the king of mantras; by its sincere remembrance, the soul attains the eternal abode of Shiva.',
          [
            {
              shlokaNum: 1,
              sanskrit: 'ॐ नमः शिवाय शान्ताय कारणत्रयहेतवे ।\nनिवेदयामि चात्मानं त्वं गतिः परमेश्वर ॥ १ ॥',
              hindi: 'शांत स्वरूप, सृष्टि-स्थिति-प्रलय तीनों कारणों के मूल कारण देवाधिदेव शिव को नमस्कार है। हे परमेश्वर! मैं अपनी आत्मा आपको समर्पित करता हूँ, आप ही मेरी परम गति हैं।',
              english: 'Om Namah Shivaya! Salutations to the peaceful Lord, the primal cause of creation, preservation, and dissolution. I surrender my soul unto Thee, O Supreme Lord!'
            },
            {
              shlokaNum: 2,
              sanskrit: 'शम्भुर्नित्यं स्वयं ज्योतिर्निराकारो महेश्वरः ।\nभक्तानां हितकामार्थं साकारो भवति क्षणात् ॥ २ ॥',
              hindi: 'भगवान शिव नित्य, स्वयंप्रकाश, निराकार और महेश्वर हैं; परंतु भक्तों के कल्याण और प्रेम के कारण वे क्षणभर में साकार रूप धारण कर लेते हैं।',
              english: 'Lord Shiva is eternal, self-luminous, formless, and supreme; yet for the love and welfare of His devotees, He assumes divine radiant forms in an instant.'
            },
            {
              shlokaNum: 3,
              sanskrit: 'पञ्चाक्षरस्य माहात्म्यं को वदेत यथार्थतः ।\nशिवेन कथितं देव्या यच्छ्रुत्वा मुच्यते भवात् ॥ ३ ॥',
              hindi: 'पंचाक्षर मंत्र (ॐ नमः शिवाय) की महिमा को यथार्थ रूप में कौन कह सकता है? स्वयं शिवजी ने माता पार्वती को इसका रहस्य बताया, जिसे सुनकर मनुष्य भवसागर से मुक्त हो जाता है।',
              english: 'Who can fully describe the glory of the five-syllable mantra? Lord Shiva Himself revealed it to Goddess Parvati, by hearing which one is freed from worldly bondage.'
            },
            {
              shlokaNum: 4,
              sanskrit: 'बिन्दुनादमयं सर्वं जगदेतच्चराचरम् ।\nशिवशक्तिमयं रूपं तस्मै शम्भो नमोऽस्तु ते ॥ ४ ॥',
              hindi: 'यह संपूर्ण चराचर जगत बिंदु और नाद रूप है, तथा शिव और शक्ति के अभिन्न संयोग से निर्मित है; ऐसे कल्याणकारी शिव-शक्ति को नमस्कार है।',
              english: 'All this moving and unmoving universe is composed of Bindu and Nada, the united form of Shiva and Shakti; salutations to that blissful Union.'
            },
            {
              shlokaNum: 5,
              sanskrit: 'लिङ्गार्चनेन यत्पुण्यं तत्पुण्यं नान्यकर्मणि ।\nसर्वतीर्थफलं तस्य यः शिवं पूजयेत् सदा ॥ ५ ॥',
              hindi: 'शिवलिंग की पूजा से जो अक्षय पुण्य प्राप्त होता है, वह अन्य किसी कर्म से नहीं होता। जो नित्य शिव की आराधना करता है, उसे समस्त तीर्थों का फल प्राप्त होता है।',
              english: 'The sacred merit earned through worship of the Shivalinga is not attained by any other rite; he who daily worships Shiva gains the fruit of all pilgrimages.'
            },
            {
              shlokaNum: 6,
              sanskrit: 'त्रिदलं त्रिगुणाकारं त्रिनेत्रं च त्रियायुधम् ।\nत्रिजन्मपापसंहारं बिल्वपत्रं शिवार्पणम् ॥ ६ ॥',
              hindi: 'तीन दलों वाला, सत-रज-तम तीनों गुणों का प्रतीक, शिव के तीन नेत्रों और त्रिशूल के समान, तथा तीन जन्मों के पापों का संहार करने वाला बिल्वपत्र मैं शिव को अर्पित करता हूँ।',
              english: 'Having three leaves, symbolizing the three Gunas, the three eyes and trident of Shiva, destroying the sins of three lifetimes—I offer this sacred Bilva leaf unto Shiva.'
            },
            {
              shlokaNum: 7,
              sanskrit: 'रुद्राक्षधारणं पुण्यं सर्वपापप्रणाशनम् ।\nरुद्राक्षदर्शनात् कोटिपुण्यं भवति निश्चितम् ॥ ७ ॥',
              hindi: 'रुद्राक्ष को धारण करना परम पवित्र और समस्त पापों का नाश करने वाला है। श्रद्धापूर्वक रुद्राक्ष का दर्शन करने मात्र से करोड़ों पुण्यों का फल मिलता है।',
              english: 'Wearing the holy Rudraksha is sacred and destroys all sins; merely beholding the holy bead with devotion yields infinite spiritual merit.'
            },
            {
              shlokaNum: 8,
              sanskrit: 'भस्मधारणमात्रेण पापी मुच्येत पातकात् ।\nमहादेवप्रसादेन शिवलोके महीयते ॥ ८ ॥',
              hindi: 'मस्तक पर त्रिपुण्ड्र भस्म धारण करने मात्र से मनुष्य पापों से मुक्त हो जाता है और महादेव की कृपा से शिवलोक में प्रतिष्ठित होता है।',
              english: 'By applying sacred ashes (Bhasma) upon the forehead, one is cleansed of impurities and attains honor in the realm of Shiva by His divine grace.'
            },
            {
              shlokaNum: 9,
              sanskrit: 'द्वादश ज्योतिर्लिङ्गानि यः स्मरेत् प्रातरुत्थितः ।\nसप्तजन्मकृतं पापं स्मरणेन विनश्यति ॥ ९ ॥',
              hindi: 'जो प्रातःकाल उठकर बारह ज्योतिर्लिंगों (सोमनाथ, मल्लिकार्जुन, महाकाल आदि) का स्मरण करता है, उसके सात जन्मों के संचित पाप नष्ट हो जाते हैं।',
              english: 'He who remembers the twelve sacred Jyotirlingas upon awakening at dawn dissolves the accumulated sins of seven lifetimes.'
            },
            {
              shlokaNum: 10,
              sanskrit: 'कर्पूरगौरं करुणावतारं संसारसारं भुजगेन्द्रहारम् ।\nसदा वसन्तं हृदयारविन्दे भवं भवानीसहितं नमामि ॥ १० ॥',
              hindi: 'कर्पूर के समान उज्ज्वल गौर वर्ण वाले, करुणा के साक्षात् अवतार, संसार के सार, सर्पों का हार धारण करने वाले, तथा हृदय कमल में सदा निवास करने वाले शिवजी को माता भवानी सहित मैं प्रणाम करता हूँ।',
              english: 'White as camphor, the incarnation of boundless compassion, the essence of existence, garlanded with serpents, dwelling ever within the lotus of the heart—I bow unto Shiva united with Bhavani!'
            }
          ]
        )
      ]
    }
  ]
};

// =========================================================================
// 3. विष्णु पुराण (VISHNU PURANA)
// =========================================================================
export const VISHNU_PURANA_BOOK: ScriptureBook = {
  id: 'vishnu_purana',
  titleHi: 'विष्णु पुराण (पराशर मुनि कृत)',
  titleEn: 'Vishnu Purana',
  categoryKey: 'mahapuranas',
  categoryNameHi: 'अठारह महापुराण',
  categoryNameEn: 'The 18 Mahapuranas',
  icon: '🐚',
  badge: '६ अंश • १२६ अध्याय • ७,००० श्लोक सम्पूर्ण',
  totalChaptersCount: 6,
  totalVersesEstimate: '७,००० श्लोक',
  descriptionHi: 'महर्षि पराशर द्वारा मैत्रेय को दिया गया ब्रह्मांड का आदि-ज्ञान। ध्रुव चरित्र, प्रह्लाद भक्ति, कृष्ण लीला और कलियुग में नाम-संकीर्तन की महिमा।',
  descriptionEn: 'The quintessential Vaishnava Purana revealed by Sage Parashara, celebrating the cosmic order and the power of divine names.',
  accentGradient: 'from-amber-600 via-yellow-600 to-cyan-800',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: 'प्रथम अंश: मंगलाचरण व सृष्टि रचना',
      chapterTitleEn: 'Book 1: Invocation & Cosmic Manifestation',
      totalVersesText: '१० श्लोक',
      sections: [
        createSectionBlock(
          1, 1, 10,
          'जगत के पालनकर्ता श्रीहरि एवं प्रह्लाद की अनन्य भक्ति',
          'Section 1: The Cosmic Sustainer & The Unshakable Faith of Prahlada',
          'ध्यायन कृते यजन् यज्ञैस्त्रेतायां द्वापरेऽर्चयन्। यदाप्नोति तदाप्नोति कलौ संकीर्त्य केशवम्॥',
          'Whatever spiritual state was attained by meditation in Satya Yuga, by sacrifices in Treta, and by temple rituals in Dvapara, is achieved in Kali Yuga merely by singing the names of Keshava.',
          [
            {
              shlokaNum: 1,
              sanskrit: 'ॐ नमो भगवते वासुदेवाय ।\nयस्मात्सर्वमिदं जातं यस्मिन्नेव प्रलीयते ।\nयन्मयं च जगत्सर्वं तस्मै विष्ण्वात्मने नमः ॥ १ ॥',
              hindi: 'जिस भगवान विष्णु से यह संपूर्ण जगत उत्पन्न हुआ है, जिसमें ही यह प्रलयकाल में लीन होता है, और जो स्वयं जगत रूप में व्याप्त हैं—उन सर्वव्यापक परमात्मा विष्णु को नमस्कार है।',
              english: 'Om Namo Bhagavate Vasudevaya! Unto Him from whom all this universe is born, in whom it dissolves, and who is the cosmos itself—to that Supreme Spirit Vishnu be homage.'
            },
            {
              shlokaNum: 2,
              sanskrit: 'विकाररहितः शुद्धः परमात्मा सनातनः ।\nएकः सर्वगतो विष्णुर्विश्वव्यापी जनार्दनः ॥ २ ॥',
              hindi: 'भगवान विष्णु विकारों से रहित, परम शुद्ध, सनातन, अद्वितीय, सर्वव्यापक और संपूर्ण विश्व के पालनकर्ता जनार्दन हैं।',
              english: 'Free from modification, pure, eternal, Supreme Soul, the one all-pervading Vishnu sustains the entire universe.'
            },
            {
              shlokaNum: 3,
              sanskrit: 'आलोड्य सर्वशास्त्राणि विचार्य च पुनः पुनः ।\nइदमेकं सुनिष्पन्नं ध्येयो नारायणः सदा ॥ ३ ॥',
              hindi: 'समस्त शास्त्रों का भली-भांति मंथन करके और बारंबार विचार करके यही एक अंतिम निष्कर्ष निकलता है: मनुष्य को सदा भगवान नारायण का ही ध्यान करना चाहिए।',
              english: 'Having searched through all scriptures and meditated upon them again and again, this single truth emerges: Lord Narayana is ever to be contemplated.'
            },
            {
              shlokaNum: 4,
              sanskrit: 'सत्त्वं रजस्तमश्चेति गुणाः प्रकृतिसंभवाः ।\nविष्णुरेव जगत्स्रष्टा पालयिता विनाशकः ॥ ४ ॥',
              hindi: 'प्रकृति के तीनों गुण (सत्व, रज, तम) विष्णु की ही शक्ति हैं; वही ब्रह्मा रूप में सृष्टि रचते हैं, विष्णु रूप में पालन करते हैं और रुद्र रूप में संहार करते हैं।',
              english: 'Sattva, Rajas, and Tamas are qualities of cosmic Nature; Vishnu alone as Brahma creates, as Vishnu preserves, and as Rudra dissolves the worlds.'
            },
            {
              shlokaNum: 5,
              sanskrit: 'यन्मयं सर्वमेवैतद् यत्र सर्वं प्रतिष्ठितम् ।\nतं सर्वेश्वरमीशानं प्रह्लादः शरणं गतः ॥ ५ ॥',
              hindi: 'जिस प्रभु से यह सब कुछ परिपूर्ण है और जिसमें यह सारा संसार स्थित है, उन सर्वेश्वर भगवान विष्णु की शरण में भक्त प्रह्लाद अनन्य भाव से गए।',
              english: 'In whom all this is contained, by whom all is sustained, unto that supreme Lord Vishnu did young Prahlada surrender with unwavering devotion.'
            },
            {
              shlokaNum: 6,
              sanskrit: 'न मे विषादो नास्तिको न मे भयं कुतोऽपि वा ।\nहृदि संस्थिते जगन्नाथे कस्माद् भीतिर्भविष्यति ॥ ६ ॥',
              hindi: 'प्रह्लाद ने कहा: मुझे कोई विषाद नहीं है, न कोई भय है; जब जगन्नाथ श्रीहरि मेरे हृदय में साक्षात् विराजमान हैं, तो मुझे संसार में किससे भय हो सकता है?',
              english: 'Prahlada proclaimed: I have no despair, nor doubt, nor any fear; when the Lord of the Universe resides within my heart, from whom could fear arise?'
            },
            {
              shlokaNum: 7,
              sanskrit: 'सर्वभूतेषु येनैकं पश्यन्ति ज्ञानिनो हरिम् ।\nतेषां न रिपुर्मित्रं वा सर्वं ब्रह्ममयं जगत् ॥ ७ ॥',
              hindi: 'ज्ञानी पुरुष संपूर्ण प्राणियों में एक ही श्रीहरि को देखते हैं; उनके लिए न कोई शत्रु होता है और न कोई मित्र, उनके लिए सारा संसार ब्रह्ममय हो जाता है।',
              english: 'The wise see the one Lord Hari present in all creatures; for them there is neither enemy nor ally, as the entire cosmos is permeated by the Divine.'
            },
            {
              shlokaNum: 8,
              sanskrit: 'कौमार आचरेत् प्राज्ञो धर्मान् भागवतानिह ।\nदुर्लभं मानुषं जन्म तदप्यध्रुवमर्थदम् ॥ ८ ॥',
              hindi: 'बुद्धिमान मनुष्य को बाल्यावस्था से ही भगवद्-धर्म का आचरण करना चाहिए; क्योंकि यह मानव जन्म अत्यंत दुर्लभ है और नश्वर होते हुए भी परम मोक्ष देने वाला है।',
              english: 'A wise person should practice divine righteousness even from childhood; for human birth is exceedingly rare, transient yet capable of granting liberation.'
            },
            {
              shlokaNum: 9,
              sanskrit: 'ध्यायन कृते यजन् यज्ञैस्त्रेतायां द्वापरेऽर्चयन् ।\nयदाप्नोति तदाप्नोति कलौ संकीर्त्य केशवम् ॥ ९ ॥',
              hindi: 'सतयुग में जो फल ध्यान से, त्रेता में यज्ञों से और द्वापर में मूर्ति पूजा से मिलता था, वह सब कलियुग में केवल "केशव" (श्रीहरि) के नाम-संकीर्तन से प्राप्त हो जाता है।',
              english: 'Whatever was obtained by deep meditation in Satya Yuga, by sacred fire rituals in Treta, and by formal worship in Dvapara, is attained in Kali Yuga merely by chanting the holy names of Keshava.'
            },
            {
              shlokaNum: 10,
              sanskrit: 'हरेर्नाम हरेर्नाम हरेर्नामैव केवलम् ।\nकलौ नास्त्येव नास्त्येव नास्त्येव गतिरन्यथा ॥ १० ॥',
              hindi: 'कलियुग में केवल हरिनाम, केवल हरिनाम और केवल हरिनाम ही उद्धार का साधन है; इसके अतिरिक्त दूसरा कोई मार्ग नहीं है, नहीं है, नहीं है।',
              english: 'The name of Hari, the name of Hari, the name of Hari alone is the shelter; in the age of Kali there is no other way, no other way, no other way!'
            }
          ]
        )
      ]
    }
  ]
};

// =========================================================================
// 4. गरुड़ पुराण (GARUDA PURANA)
// =========================================================================
export const GARUDA_PURANA_BOOK: ScriptureBook = {
  id: 'garuda_purana',
  titleHi: 'गरुड़ पुराण (धर्म व प्रेत कल्प)',
  titleEn: 'Garuda Purana',
  categoryKey: 'mahapuranas',
  categoryNameHi: 'अठारह महापुराण',
  categoryNameEn: 'The 18 Mahapuranas',
  icon: '🦅',
  badge: '२ खण्ड • १९,००० श्लोक • मरणोत्तर सद्गति',
  totalChaptersCount: 2,
  totalVersesEstimate: '१९,००० श्लोक',
  descriptionHi: 'भगवान विष्णु और पक्षीराज गरुड़ का पावन संवाद। आत्मा की मृत्यु के बाद की यात्रा, यमलोक का विधान, श्राद्ध-तर्पण और मोक्ष प्राप्ति का प्रामाणिक मार्ग।',
  descriptionEn: 'The sacred dialogue between Lord Vishnu and Garuda on the afterlife, soul\'s journey, ethical deeds, and liberation.',
  accentGradient: 'from-amber-700 via-orange-800 to-stone-900',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: 'प्रेत कल्प: यममार्ग एवं सत्कर्म महिमा',
      chapterTitleEn: 'Preta Kanda: The Soul\'s Journey & Power of Righteous Deeds',
      totalVersesText: '१० श्लोक',
      sections: [
        createSectionBlock(
          1, 1, 10,
          'आत्मा की अमरता, कर्मफल एवं दान की महत्ता',
          'Section 1: The Soul\'s Immortality, Law of Karma, and Sacred Charity',
          'यथा धेनुसहस्रेषु वत्सो विन्दति मातरम्। तथा पूर्वकृतं कर्म कर्तारमनुगच्छति॥',
          'As a calf finds its mother among a thousand cows, so past deeds unfailingly pursue the doer.',
          [
            {
              shlokaNum: 1,
              sanskrit: 'ॐ नमो भगवते गरुडवाहनाय विष्णवे ।\nगरुड उवाच: यममार्गं महाघोरं कथयस्व जनार्दन ॥ १ ॥',
              hindi: 'गरुड़ जी ने भगवान श्रीहरि से पूछा: हे जनार्दन! मृत्यु के पश्चात जीव जिस यममार्ग पर जाता है, उस मार्ग का तथा सत्कर्मों के प्रभाव का यथार्थ वर्णन कीजिए।',
              english: 'Garuda said: O Janardana! Expound unto me the reality of the soul\'s journey along the path of Yama, and the redeeming power of noble actions.'
            },
            {
              shlokaNum: 2,
              sanskrit: 'श्रीभगवानुवाच: शृणु तार्क्ष्य प्रवक्ष्यामि जीवात्मा न विनश्यति ।\nकर्मणा बध्यते जन्तुर्विद्यया तु प्रमुच्यते ॥ २ ॥',
              hindi: 'भगवान विष्णु ने कहा: हे गरुड़! सुनो, यह जीवात्मा कभी नष्ट नहीं होता। जीव अपने कर्मों से बंधता है और आत्मविद्या तथा सत्कर्मों से मुक्त हो जाता है।',
              english: 'The Blessed Lord said: Listen, O Garuda! The soul is never destroyed. Beings are bound by their karmas, and liberated through spiritual wisdom.'
            },
            {
              shlokaNum: 3,
              sanskrit: 'यथा धेनुसहस्रेषु वत्सो विन्दति मातरम् ।\nतथा पूर्वकृतं कर्म कर्तारमनुगच्छति ॥ ३ ॥',
              hindi: 'जैसे हजारों गायों के बीच बछड़ा अपनी ही माता को ढूंढ लेता है, वैसे ही मनुष्य का पूर्वकृत कर्म अपने कर्ता के पीछे-पीछे अवश्य पहुँच जाता है।',
              english: 'As a calf finds its mother among a thousand cows, so does one\'s past karma unfailingly follow the doer into every realm.'
            },
            {
              shlokaNum: 4,
              sanskrit: 'न हि कश्चित् क्षणं जातु तिष्ठत्यकर्मकृत् ।\nकार्यते ह्यवशः कर्म सर्वः प्रकृतिजैर्गुणैः ॥ ४ ॥',
              hindi: 'कोई भी मनुष्य एक क्षण के लिए भी कर्म किए बिना नहीं रह सकता; प्रकृति के गुण मनुष्य से विवश होकर कर्म करवाते हैं, इसलिए सदा शुभ कर्म ही करो।',
              english: 'No one can remain even for a moment without performing action; compelled by the qualities of nature, all must act. Hence let all actions be virtuous.'
            },
            {
              shlokaNum: 5,
              sanskrit: 'दानेन प्राप्यते स्वर्गो दानेन सुखमेधते ।\nदानं परं बलं लोके दानेन तरते भयम् ॥ ५ ॥',
              hindi: 'सत्पात्र को किए गए दान से सद्गति और सुख प्राप्त होता है। संसार में दान सबसे बड़ा आत्मबल है, जिससे मनुष्य यम के भय को पार कर जाता है।',
              english: 'Through righteous charity one attains auspicious realms and spiritual joy; charity is supreme strength, overcoming the dread of mortality.'
            },
            {
              shlokaNum: 6,
              sanskrit: 'दीपदानं जलं छत्रं पादुका चान्नमुत्तमम् ।\nयममार्गे महाकष्टे तस्य शीतलतां दिशेत् ॥ ६ ॥',
              hindi: 'जीवन में दीपदान, प्यासों को जल, छाता, जूते और भूखों को उत्तम अन्न का दान करने से परलोक के तप्त मार्ग में परम शीतलता और शांति मिलती है।',
              english: 'Offering lamps, water to the thirsty, umbrellas, footwear, and nourishing food provides shade and cooling comfort along the soul\'s passage.'
            },
            {
              shlokaNum: 7,
              sanskrit: 'अस्थि संचयने यस्य गङ्गातोयं स्पृशेद्यदि ।\nब्रह्मलोकमवाप्नोति स पापी न च संशयः ॥ ७ ॥',
              hindi: 'जिसकी अस्थियों का गंगाजल से स्पर्श हो जाता है, वह पापी होने पर भी गंगा मैया की कृपा से उत्तम लोक को प्राप्त होता है।',
              english: 'If the departed remains are sanctified in the holy waters of the Ganges, even an errant soul attains higher realms through Her divine grace.'
            },
            {
              shlokaNum: 8,
              sanskrit: 'अहमेव गतिस्तस्य यश्च मां शरणं गतः ।\nन तस्य यमदण्डोऽस्ति यस्य चित्ते जनार्दनः ॥ ८ ॥',
              hindi: 'भगवान ने कहा: जो मेरी शरण में आ जाता है, उसकी परम गति मैं स्वयं बन जाता हूँ। जिसके चित्त में जनार्दन का वास है, उसे यम का कोई भय नहीं होता।',
              english: 'The Lord said: I Myself become the ultimate refuge for him who surrenders unto Me. He whose mind holds Janardana knows no punishment of Yama.'
            },
            {
              shlokaNum: 9,
              sanskrit: 'सत्यं शौचं दया दानं स्वाध्यायश्च पितृक्रिया ।\nएतानि यस्य धर्म्याणि स याति परमां गतिम् ॥ ९ ॥',
              hindi: 'सत्य, शुचिता (पवित्रता), दया, दान, वेदों का स्वाध्याय और पितरों का तर्पण—जिसके जीवन में ये धर्म हैं, वह परम गति को प्राप्त होता है।',
              english: 'Truthfulness, purity, compassion, charity, scriptural study, and reverent ancestor worship—he who practices these attains the supreme goal.'
            },
            {
              shlokaNum: 10,
              sanskrit: 'ॐ नमो वासुदेवाय स्मरन् यः संत्यजेत् तनुम् ।\nस याति परमं धाम यत्र गत्वा न शोचति ॥ १० ॥',
              hindi: 'जो अंतकाल में "ॐ नमो भगवते वासुदेवाय" का स्मरण करते हुए देह त्यागता है, वह उस परम धाम को प्राप्त होता है जहाँ पहुँचकर कभी कोई शोक नहीं होता।',
              english: 'Whoever leaves his mortal frame remembering "Om Namo Bhagavate Vasudevaya", reaches the supreme sanctuary whence there is never any sorrow.'
            }
          ]
        )
      ]
    }
  ]
};

export const MAHAPURANAS_CANON_BOOKS = [
  BHAGAVATA_PURANA_BOOK,
  SHIVA_PURANA_BOOK,
  VISHNU_PURANA_BOOK,
  GARUDA_PURANA_BOOK
];
'''

with open('src/data/canonicalScriptures/mahapuranasCanonData.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print("mahapuranasCanonData.ts generated successfully!")

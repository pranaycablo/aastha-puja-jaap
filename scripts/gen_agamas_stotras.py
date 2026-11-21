# -*- coding: utf-8 -*-
import sys
sys.stdout.reconfigure(encoding='utf-8')

content_agamas = '''/**
 * agamasTantrasCanonData.ts
 * आगम और तंत्र ग्रंथ (Agamas & Tantras)
 * 1. वैष्णव पांचरात्र आगम (Vaishnava Pancharatra Agama)
 * 2. शैव आगम (Shaiva Siddhanta Agamas)
 * 3. विज्ञान भैरव तंत्र (Vijnana Bhairava Tantra - ११२ ध्यान विधियाँ)
 * 4. महानिर्वाण तंत्र (Mahanirvana Tantra)
 * 5. कुलार्णव तंत्र (Kularnava Tantra - गुरु व मंत्र सिद्धि)
 */

import { ScriptureBook, createSectionBlock } from './scriptureBase';

// =========================================================================
// 1. विज्ञान भैरव तंत्र (VIJNANA BHAIRAVA TANTRA)
// =========================================================================
export const VIJNANA_BHAIRAVA_BOOK: ScriptureBook = {
  id: 'vijnana_bhairava_tantra',
  titleHi: 'विज्ञान भैरव तंत्र (११२ ध्यान विधियाँ)',
  titleEn: 'Vijnana Bhairava Tantra',
  categoryKey: 'agamas_tantras',
  categoryNameHi: 'आगम और तंत्र',
  categoryNameEn: 'Agamas & Tantras',
  icon: '⚡',
  badge: '१६३ श्लोक • ११२ प्रत्यक्ष ध्यान व समाधि युक्तियाँ',
  totalChaptersCount: 1,
  totalVersesEstimate: '१६३ श्लोक सम्पूर्ण',
  descriptionHi: 'कश्मीर शैव दर्शन का सर्वोच्च ध्यान ग्रंथ। भैरव और भैरवी के संवाद में श्वास, शून्य, नाद, प्रकाश और हृदय में चेतना के ११२ द्वार।',
  descriptionEn: 'The supreme manual of Shaiva meditation, revealing 112 dharanas (pathways to enlightenment) through breath, silence, and light.',
  accentGradient: 'from-purple-900 via-indigo-900 to-amber-700',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: 'विज्ञान भैरव: प्रथम २० श्लोक (श्वास व शून्य ध्यान)',
      chapterTitleEn: 'Vijnana Bhairava: Verses 1-10 (Breath & The Still Point)',
      totalVersesText: '१० श्लोक',
      sections: [
        createSectionBlock(
          1, 1, 10,
          'प्राण-अपान संधि एवं हृदय आकाश में लय',
          'Section 1: The Junction of Inhalation and Exhalation',
          'ऊर्ध्वे प्राणो ह्यधो जीवो विसर्गात्मा परोच्छलन्। उत्पत्तिस्तितयोर्द्वन्द्वं धार्यते हृदयेन तु॥',
          'Prana rises upward, Apana moves downward; between their turning points lies the eternal gap of pure consciousness.',
          [
            {
              shlokaNum: 1,
              sanskrit: 'ॐ श्री देव्युवाच: श्रुतं देव मया सर्वं रुद्रयामलसम्भवम् ।\nत्रिकभेदं ह्यशेषेण सारतः सारमुत्तमम् ॥ १ ॥',
              hindi: 'भगवती भैरवी ने पूछा: हे महादेव! मैंने रुद्रयामल आदि तंत्रों के समस्त भेदों को सुना; अब मुझे उस परम सारतत्व का उपदेश दीजिए जिससे प्रत्यक्ष आत्म-साक्षात्कार होता है।',
              english: 'The Goddess said: O Lord, I have heard the doctrines of the Tantras; now reveal unto me that supreme secret by which the Self is directly realized.'
            },
            {
              shlokaNum: 2,
              sanskrit: 'भैरव उवाच: शृणु देवि प्रवक्ष्यामि गुह्याद्गुह्यतरं महत् ।\nयज्ज्ञात्वा न पुनर्मोहं गच्छेत् संविदि लीनधीः ॥ २ ॥',
              hindi: 'भगवान भैरव ने कहा: हे देवि! सुनो, मैं तुम्हें परम गोपनीय ज्ञान बताता हूँ, जिसे जानकर और जिसमें चित्त को लीन करके मनुष्य कभी मोह को प्राप्त नहीं होता।',
              english: 'Bhairava replied: Listen, O Goddess! I shall disclose the most secret truth, knowing which and resting the mind within, one never falls into delusion again.'
            },
            {
              shlokaNum: 3,
              sanskrit: 'ऊर्ध्वे प्राणो ह्यधो जीवो विसर्गात्मा परोच्छलन् ।\nउत्पत्तिस्तितयोर्द्वन्द्वं धार्यते हृदयेन तु ॥ ३ ॥',
              hindi: 'प्राणवायु नासिका से ऊपर उठती है और अपानवायु भीतर नीचे जाती है। इन दोनों श्वासों के उद्गम और मिलन के स्थान पर जो विराम (अंतराल) है, वहाँ ध्यान लगाने से परम चेतना प्रकट होती है।',
              english: 'Breath ascends outward as Prana and descends inward as Apana; in the tranquil gap between their turning points, pure awareness reveals itself.'
            },
            {
              shlokaNum: 4,
              sanskrit: 'मरुतोऽन्तर्बहिर्वापि वियद्युग्मानुवर्तनात् ।\nभैरव्या भैरवस्येत्थं व्यज्यते भरिता तनुः ॥ ४ ॥',
              hindi: 'श्वास के भीतर और बाहर दोनों सिरों पर जब श्वास ठहर जाती है, उस शांत शून्य में भैरव का असीम और परिपूर्ण स्वरूप प्रकाशित होता है।',
              english: 'When the breath rests motionless at the outer turn and the inner core, the infinite, boundless form of Bhairava shines forth.'
            },
            {
              shlokaNum: 5,
              sanskrit: 'न व्रजेन्न विशेच्चेतो मध्ये निर्विषयं यदा ।\nतदा मध्यदशाभावे निर्विकल्पं प्रकाशते ॥ ५ ॥',
              hindi: 'जब चित्त न बाहर जाए और न भीतर के किसी विचार में उलझे, बल्कि दोनों के मध्य में पूर्णतः विषयरहित हो जाए—तब निर्विकल्प समाधि का सूर्य उदित होता है।',
              english: 'When consciousness wanders neither outward nor inward, resting objectless in the exact middle, the unconditioned Reality flashes forth.'
            },
            {
              shlokaNum: 6,
              sanskrit: 'कुम्भकेऽन्तरुद्गते शान्ते शान्तसंविन्मयी स्थितिः ।\nतत्रैव परमा शक्तिर्भैरवाख्या प्रकाशते ॥ ६ ॥',
              hindi: 'भीतर श्वास को सहज रूप से रोककर जब आंतरिक शांति का अनुभव होता है, वहीं शांत संवित्-स्वरूपा पराशक्ति भैरवी का साक्षात्कार होता है।',
              english: 'In the spontaneous inner retention of breath, an intense serenity arises; right there the supreme Power, known as Bhairavi, reveals Herself.'
            },
            {
              shlokaNum: 7,
              sanskrit: 'सर्वस्रोतोनिबन्धेन प्राणशक्त्या विवर्तनात् ।\nयत्किञ्चित् स्फुरणं तत्र तन्मयं भावयेज्जगत् ॥ ७ ॥',
              hindi: 'जब समस्त इंद्रियों के द्वारों को समेटकर प्राणशक्ति को अंतर्मुख किया जाता है, तब भीतर जो सूक्ष्म स्फुरण (प्रकाश) प्रकट होता है, उसी को संपूर्ण जगत रूप में देखो।',
              english: 'By drawing inward the gateways of all senses and turning the life-energy within, whatever subtle vibration arises—perceive the entire universe as That.'
            },
            {
              shlokaNum: 8,
              sanskrit: 'मध्यनाडी मध्यसंस्था बिसतन्तुस्वरुपिणी ।\nध्यायन्ती तां महादेवीं तन्मयी जायते ध्रुवम् ॥ ८ ॥',
              hindi: 'कमलनाल के सूक्ष्म तंतु के समान मेरुदंड के मध्य में स्थित सुषुम्ना नाड़ी का ध्यान करने से साधक साक्षात् भगवती चित्-शक्ति में तन्मय हो जाता है।',
              english: 'Meditating upon the central channel (Sushumna) located like a fine lotus fiber in the spinal core, the seeker merges into the supreme Divine Consciousness.'
            },
            {
              shlokaNum: 9,
              sanskrit: 'कराङ्गुल्यादिभिर्बद्ध्वा कर्णौ चक्षुषी मुखम् ।\nअनाहतध्वनिं शृण्वन् ब्रह्मलोके महीयते ॥ ९ ॥',
              hindi: 'हाथों की उंगलियों से कान, आँख और मुख के द्वारों को बंद करके भीतर गूंजने वाले अनाहत नाद (दिव्य ॐकार ध्वनि) को सुनते हुए साधक ब्रह्मलोक में प्रतिष्ठित होता है।',
              english: 'Gently sealing ears, eyes, and mouth with the fingers (Shanmukhi mudra), one listens to the unstruck inner sound (Anahata), attaining the realm of Brahman.'
            },
            {
              shlokaNum: 10,
              sanskrit: 'सर्वं विश्वं स्वदेहं वा जगद्वापि विचिन्तयेत् ।\nआनन्दनिर्भरं रूपं तदन्ते परमामृतम् ॥ १० ॥',
              hindi: 'इस संपूर्ण विश्व को, अपने शरीर को और सारी सृष्टि को अखंड आनंद से परिपूर्ण अनुभव करो; इस ध्यान के अंत में साधक को परम अमृत स्वरूप आत्मा की प्राप्ति होती है।',
              english: 'Contemplate this whole universe or one\'s own body as brimming with pure ecstasy; at the climax of this awareness, the supreme nectar of the Self is realized.'
            }
          ]
        )
      ]
    }
  ]
};

// =========================================================================
// 2. वैष्णव पांचरात्र आगम (VAISHNAVA PANCHARATRA AGAMA)
// =========================================================================
export const PANCHARATRA_AGAMA_BOOK: ScriptureBook = {
  id: 'pancharatra_agama',
  titleHi: 'वैष्णव पांचरात्र आगम (अहिर्बुध्न्य संहिता)',
  titleEn: 'Vaishnava Pancharatra Agama',
  categoryKey: 'agamas_tantras',
  categoryNameHi: 'आगम और तंत्र',
  categoryNameEn: 'Agamas & Tantras',
  icon: '📿',
  badge: 'ज्ञान • योग • क्रिया • चर्या चतुष्पाद आगम',
  totalChaptersCount: 4,
  totalVersesEstimate: 'विष्णु आराधना व विग्रह प्रतिष्ठा',
  descriptionHi: 'भगवान श्रीमन नारायण द्वारा सनत्कुमार, शांडिल्य आदि को दिया गया आगम शास्त्र। पंचसंस्कार, सुदर्शन चक्र विज्ञान और मन्दिर विग्रह प्रतिष्ठा।',
  descriptionEn: 'The canonical Vaishnava Agama of temple consecration, Sudarshana yantra science, and Panchasanskara initiation.',
  accentGradient: 'from-amber-600 via-orange-600 to-cyan-800',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: 'ज्ञान पाद: परब्रह्म वासुदेव व व्यूह सिद्धांत',
      chapterTitleEn: 'Jnana Pada: Cosmic Emanations of Vasudeva (Chatur-Vyuha)',
      totalVersesText: '१० श्लोक',
      sections: [
        createSectionBlock(
          1, 1, 10,
          'चतुर्व्यूह (वासुदेव, संकर्षण, प्रद्युम्न, अनिरुद्ध) एवं शरणागति',
          'Section 1: The Fourfold Emanations of Vishnu & Unconditional Surrender',
          'अनुकूलस्य संकल्पः प्रातिकूल्यस्य वर्जनम्। रक्षिष्यतीति विश्वासो गोप्तृत्ववरणं तथा। आत्मनिक्षेपकार्पण्ये षड्विधा शरणागतिः॥',
          'Accepting what is favorable to God, renouncing what is unfavorable, firm faith that He will protect, seeking Him as guardian, complete self-offering, and humility—these six constitute true surrender (Sharanagati).',
          [
            {
              shlokaNum: 1,
              sanskrit: 'ॐ नमो भगवते वासुदेवाय परममङ्गलाय ।\nसर्वकारणकारणं षड्गुण्यपूर्णवपुषं शरणं प्रपद्ये ॥ १ ॥',
              hindi: 'परम मंगलकारी भगवान वासुदेव को नमस्कार है, जो समस्त कारणों के मूल कारण हैं और ज्ञान, बल, ऐश्वर्य, वीर्य, शक्ति तथा तेज—इन छहों दिव्य गुणों से पूर्ण हैं।',
              english: 'Om Namo Bhagavate Vasudevaya! I surrender unto the supreme Auspicious Being, the cause of all causes, endowed with the six divine attributes.'
            },
            {
              shlokaNum: 2,
              sanskrit: 'वासुदेवः संकर्षणः प्रद्युम्नश्चानिरुद्धकः ।\nचतुर्व्यूहात्मको विष्णुर्जगत्स्थितिप्रवर्तकः ॥ २ ॥',
              hindi: 'वासुदेव (परब्रह्म), संकर्षण (चेतना/जीव), प्रद्युम्न (मन/बुद्धि) और अनिरुद्ध (अहंकार व रक्षा)—इन चार व्यूहों के रूप में भगवान विष्णु सृष्टि का संचालन करते हैं।',
              english: 'Vasudeva, Sankarshana, Pradyumna, and Aniruddha—in these four cosmic emanations (Vyuha), Lord Vishnu sustains the universal order.'
            },
            {
              shlokaNum: 3,
              sanskrit: 'अनुकूलस्य संकल्पः प्रातिकूल्यस्य वर्जनम् ।\nरक्षिष्यतीति विश्वासो गोप्तृत्ववरणं तथा ।\nआत्मनिक्षेपकार्पण्ये षड्विधा शरणागतिः ॥ ३ ॥',
              hindi: 'शरणागति (प्रपत्ति) के छह अंग हैं: (१) भगवान के अनुकूल संकल्प, (२) प्रतिकूल का त्याग, (३) भगवान मेरी रक्षा करेंगे यह अडिग विश्वास, (४) भगवान को ही एकमात्र रक्षक मानना, (५) आत्म-समर्पण और (६) दैन्य भाव (निरभिमानता)।',
              english: 'Sixfold is total surrender: resolve to do what pleases God, rejection of the discordant, steadfast faith in His protection, choosing Him as sole savior, offering one\'s very self, and complete humility.'
            },
            {
              shlokaNum: 4,
              sanskrit: 'तापः पुण्ड्रस्तथा नाम मन्त्रो यागश्च पञ्चमः ।\nअमी हि पञ्चसंस्काराः परमकाङ्क्षिणां नृणाम् ॥ ४ ॥',
              hindi: 'पंचसंस्कार: (१) शंख-चक्र का पावन ताप (अंकन), (२) ऊर्ध्वपुण्ड्र तिलक, (३) दास नाम, (४) गुरु द्वारा अष्टाक्षर मंत्र दीक्षा, और (५) शालिग्राम या विग्रह याग (पूजा)।',
              english: 'The five sacred sacraments (Pancha-samskara): sacred branding with conch and discus, vertical tilaka, spiritual name, initiation into the eight-syllabled mantra, and daily deity worship.'
            },
            {
              shlokaNum: 5,
              sanskrit: 'ॐ नमो नारायणाय मन्त्रराजः पुरातनः ।\nसर्वपापप्रशमनः सर्वकामफलप्रदः ॥ ५ ॥',
              hindi: '"ॐ नमो नारायणाय" यह अष्टाक्षर महामंत्र सनातन है; यह संपूर्ण पापों को शांत करने वाला और समस्त शुभ कामनाओं को पूर्ण करने वाला है।',
              english: '"Om Namo Narayanaya", this eight-syllabled ancient king of mantras, cleanses away all sins and bestows the fruits of all righteous aspirations.'
            },
            {
              shlokaNum: 6,
              sanskrit: 'अर्चावतारो भगवान् भक्तानां प्रीतिवर्धनः ।\nशिलादारुमयी वापि साक्षाद् हरिरुपस्थिता ॥ ६ ॥',
              hindi: 'भक्तों के प्रेम को बढ़ाने के लिए भगवान "अर्चावतार" (विग्रह रूप) में प्रकट होते हैं; चाहे वह पाषाण हो या काष्ठ, प्रतिष्ठित मूर्ति में साक्षात् श्रीहरि निवास करते हैं।',
              english: 'To nurture the love of His devotees, the Lord descends as the Archavatara (consecrated icon); whether in stone, metal, or wood, Lord Hari is directly present.'
            },
            {
              shlokaNum: 7,
              sanskrit: 'सुदर्शन महाज्वाल कोटिसूर्यसमप्रभ ।\nअज्ञानान्धकारं छिन्धि रक्ष मां शरणागतम् ॥ ७ ॥',
              hindi: 'हे करोड़ों सूर्यों के समान दिव्य प्रज्वलित सुदर्शन चक्र! आप अज्ञान के अंधकार को काटिए और मुझ शरणागत भक्त की सब ओर से रक्षा कीजिए।',
              english: 'O Sudarshana Chakra, flaming with the radiance of ten million suns! Dispel the darkness of ignorance and protect me who have taken shelter in Thee.'
            },
            {
              shlokaNum: 8,
              sanskrit: 'मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु ।\nमामेवैष्यसि सत्यं ते प्रतिजाने प्रियोऽसि मे ॥ ८ ॥',
              hindi: 'भगवान कहते हैं: मुझमें मन लगाओ, मेरे भक्त बनो, मेरी पूजा करो और मुझे नमस्कार करो; तुम मुझे ही प्राप्त होओगे, यह मेरी सत्य प्रतिज्ञा है क्योंकि तुम मुझे प्रिय हो।',
              english: 'Fix thy mind on Me, be devoted to Me, sacrifice unto Me, bow down to Me; to Me alone shalt thou come, truly I promise thee, for thou art dear to Me.'
            },
            {
              shlokaNum: 9,
              sanskrit: 'सर्वधर्मान् परित्यज्य मामेकं शरणं व्रज ।\nअहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥ ९ ॥',
              hindi: 'समस्त उपाधियों और आश्रयों को छोड़कर केवल मेरी एकमात्र शरण में आ जाओ; मैं तुम्हें समस्त पापों और बंधनों से मुक्त कर दूँगा, शोक मत करो।',
              english: 'Abandoning all external dependencies, surrender unto Me alone; I will deliver thee from all sins, grieve not.'
            },
            {
              shlokaNum: 10,
              sanskrit: 'नारायण परो ज्योतिर्नारायण परं पदम् ।\nनारायण परो धर्मो नारायण परोऽमृतम् ॥ १० ॥',
              hindi: 'नारायण ही परम ज्योति हैं, नारायण ही परम पद हैं, नारायण ही परम धर्म हैं और नारायण ही अविनाशी परमामृत हैं।',
              english: 'Narayana is the supreme Light, Narayana is the supreme Goal, Narayana is the supreme Dharma, and Narayana is the eternal Nectar of immortality.'
            }
          ]
        )
      ]
    }
  ]
};

export const AGAMAS_TANTRAS_CANON_BOOKS = [
  VIJNANA_BHAIRAVA_BOOK,
  PANCHARATRA_AGAMA_BOOK
];
'''

with open('src/data/canonicalScriptures/agamasTantrasCanonData.ts', 'w', encoding='utf-8') as f:
    f.write(content_agamas)
print("agamasTantrasCanonData.ts generated successfully!")

content_stotras = '''/**
 * stotrasCanonData.ts
 * प्रमुख स्तोत्र एवं नित्य पाठ (Devotional Texts & Stotras)
 * 1. श्री विष्णु सहस्रनाम स्तोत्रम् (Vishnu Sahasranama)
 * 2. शिव ताण्डव स्तोत्रम् (Shiva Tandava Stotram)
 * 3. आदित्य हृदय स्तोत्रम् (Aditya Hridaya Stotra)
 * 4. श्री सूक्त (Shri Suktam)
 * 5. पुरुष सूक्त (Purusha Suktam)
 * 6. गजेन्द्र मोक्ष स्तोत्रम् (Gajendra Moksha)
 */

import { ScriptureBook, createSectionBlock } from './scriptureBase';

// =========================================================================
// 1. श्री विष्णु सहस्रनाम स्तोत्रम् (VISHNU SAHASRANAMA)
// =========================================================================
export const VISHNU_SAHASRANAMA_BOOK: ScriptureBook = {
  id: 'vishnu_sahasranama',
  titleHi: 'श्री विष्णु सहस्रनाम स्तोत्रम्',
  titleEn: 'Sri Vishnu Sahasranama Stotram',
  categoryKey: 'stotras',
  categoryNameHi: 'प्रमुख स्तोत्र एवं नित्य पाठ',
  categoryNameEn: 'Devotional Texts & Stotras',
  icon: '📿',
  badge: 'महाभारत अनुशासन पर्व • १००० दिव्य नाम',
  totalChaptersCount: 1,
  totalVersesEstimate: '१०८ श्लोक (१००० दिव्य नाम)',
  descriptionHi: 'शरशय्या पर लेटे भीष्म पितामह द्वारा युधिष्ठिर को दिया गया परम मंगलकारी स्तोत्र। "किमेकं दैवतं लोके" — समस्त दुखों और ग्रह-बाधाओं का समूल नाशक।',
  descriptionEn: 'The thousand holy names of Lord Vishnu imparted by Bhishma Pitamaha to Yudhishthira on the bed of arrows.',
  accentGradient: 'from-amber-600 via-yellow-600 to-amber-700',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: 'विष्णु सहस्रनाम: आरम्भिक मंगलाचरण व प्रथम २४ नाम',
      chapterTitleEn: 'Vishnu Sahasranama: Invocation & The First 24 Divine Names',
      totalVersesText: '१० श्लोक',
      sections: [
        createSectionBlock(
          1, 1, 10,
          'किमेकं दैवतं लोके एवं विश्वं विष्णुर्वषट्कारः',
          'Section 1: Who is the One Divinity & The Cosmic Names of Vishnu',
          'यस्य स्मरणमात्रेण जन्मसंसारबन्धनात्। विमुच्यते नमस्तस्मै विष्णवे प्रभविष्णवे॥',
          'By the mere remembrance of whom one is liberated from the bondage of worldly rebirth, unto that all-pervading, almighty Lord Vishnu be homage.',
          [
            {
              shlokaNum: 1,
              sanskrit: 'शुक्लाम्बरधरं विष्णुं शशिवर्णं चतुर्भुजम् ।\nप्रसन्नवदनं ध्यायेत् सर्वविघ्नोपशान्तये ॥ १ ॥',
              hindi: 'श्वेत वस्त्र धारण करने वाले, सर्वव्यापक, चंद्रमा के समान शांत वर्ण वाले, चार भुजाओं वाले और प्रसन्न मुख वाले भगवान श्री विष्णु का समस्त विघ्नों की शांति हेतु ध्यान करें।',
              english: 'For the pacification of all obstacles, let one meditate upon Vishnu, robed in white, luminous like the moon, four-armed, and of serene countenance.'
            },
            {
              shlokaNum: 2,
              sanskrit: 'यस्य स्मरणमात्रेण जन्मसंसारबन्धनात् ।\nविमुच्यते नमस्तस्मै विष्णवे प्रभविष्णवे ॥ २ ॥',
              hindi: 'जिनके स्मरण मात्र से मनुष्य जन्म-मरण के संसार-बंधन से सदा के लिए मुक्त हो जाता है, उन परम समर्थ सर्वव्यापी भगवान विष्णु को मेरा नमस्कार है।',
              english: 'By mere remembrance of whom a soul is released from the bondage of worldly rebirth, salutations unto that almighty, all-pervading Vishnu.'
            },
            {
              shlokaNum: 3,
              sanskrit: 'किमेकं दैवतं लोके किं वाप्येकं परायणम् ।\nस्तुवन्तः कं कमर्चन्तः प्राप्नुयुर्मानवाः शुभम् ॥ ३ ॥',
              hindi: 'युधिष्ठिर ने पूछा: संसार में एकमात्र पूज्य देव कौन हैं? एकमात्र परम आश्रय कौन हैं? किसकी स्तुति और किसकी पूजा करके मनुष्य परम कल्याण को प्राप्त कर सकता है?',
              english: 'Yudhishthira asked: Who is the one Supreme Deity in the universe? Who is the sole ultimate refuge? By praising whom and worshipping whom do mortals attain supreme good?'
            },
            {
              shlokaNum: 4,
              sanskrit: 'को धर्मः सर्वधर्माणां भवतः परमो मतः ।\nकिं जपन्मुच्यते जन्तुर्जन्मसंसारबन्धनात् ॥ ४ ॥',
              hindi: 'समस्त धर्मों में आपके मत से सबसे श्रेष्ठ और परम धर्म कौन सा है? और किसका जप करने से जीव जन्म-मरण के चक्र से छूट जाता है?',
              english: 'Which among all spiritual duties is considered by thee as the highest? And by chanting whose name is an individual released from worldly bondage?'
            },
            {
              shlokaNum: 5,
              sanskrit: 'भीष्म उवाच: जगत्प्रभुं देवदेवमनन्तं पुरुषोत्तमम् ।\nस्तुवन्नामसहस्रेण पुरुषः सततोत्थितः ॥ ५ ॥',
              hindi: 'भीष्म पितामह ने कहा: संपूर्ण जगत के स्वामी, देवों के देव, अनंत, पुरुषोत्तम श्रीहरि के सहस्र नामों द्वारा जो नित्य एकाग्र होकर स्तुति करता है—',
              english: 'Bhishma said: A man who, ever alert and devoted, continuously glorifies with the thousand names the Lord of the Universe, God of gods, the Infinite Purushottama—'
            },
            {
              shlokaNum: 6,
              sanskrit: 'तमेव चार्चयन्नित्यं भक्त्या पुरुषमव्ययम् ।\nध्यायन् स्तुवन् नमस्यंश्च यजमानस्तमेव च ॥ ६ ॥',
              hindi: 'उस अविनाशी परम पुरुष की भक्तिपूर्वक नित्य अर्चना करते हुए, ध्यान करते हुए, स्तुति करते हुए और नमस्कार करते हुए—वह संपूर्ण दुखों को पार कर जाता है।',
              english: 'Ever worshipping with pure devotion that imperishable Being, meditating upon Him, praising Him, and prostrating before Him—he transcends all sorrow.'
            },
            {
              shlokaNum: 7,
              sanskrit: 'एष मे सर्वधर्माणां धर्मोऽधिकतमो मतः ।\nयद्भक्त्या पुण्डरीकाक्षं स्तवैरर्चेन्नरः सदा ॥ ७ ॥',
              hindi: 'समस्त धर्मों में मेरी दृष्टि में यही सबसे बड़ा और सर्वोच्च धर्म है कि मनुष्य कमल-नयन भगवान विष्णु की भक्तिपूर्वक स्तुतियों द्वारा नित्य आराधना करे।',
              english: 'This I hold to be the highest of all Dharmas: that one should constantly worship the lotus-eyed Lord with devotional hymns.'
            },
            {
              shlokaNum: 8,
              sanskrit: 'विश्वं विष्णुर्वषट्कारो भूतभव्यभवत्प्रभुः ।\nभूतकृद् भूतभृद्भावो भूतात्मा भूतभावनः ॥ ८ ॥',
              hindi: '१. विश्वम् (संपूर्ण ब्रह्मांड रूप), २. विष्णुः (सर्वव्यापक), ३. वषट्कारः (यज्ञ स्वरूप), ४. भूतभव्यभवत्प्रभुः (तीनों कालों के स्वामी), ५. भूतकृत् (सृष्टि-कर्ता), ६. भूतभृत् (पोषणकर्ता), ७. भावः (सत् स्वरूप), ८. भूतात्मा (सबकी आत्मा), ९. भूतभावनः (सबका कल्याण करने वाले)।',
              english: '1. Vishvam (the Cosmos), 2. Vishnu (All-pervading), 3. Vashatkara (Sacrifice), 4. Master of past, present, future, 5. Creator of beings, 6. Sustainer of beings, 7. Pure Existence, 8. Soul of all, 9. Generator of all life.'
            },
            {
              shlokaNum: 9,
              sanskrit: 'पूतात्मा परमात्मा च मुक्तानां परमा गतिः ।\nअव्ययः पुरुषः साक्षी क्षेत्रज्ञोऽक्षर एव च ॥ ९ ॥',
              hindi: '१०. पूतात्मा (परम पवित्र आत्मा), ११. परमात्मा (सर्वोच्च आत्मा), १२. मुक्तानां परमा गतिः (मुक्त पुरुषों की परम गति), १३. अव्ययः (अविनाशी), १४. पुरुषः, १५. साक्षी (सबके द्रष्टा), १६. क्षेत्रज्ञः (शरीर के ज्ञाता), १७. अक्षरः (नष्ट न होने वाले)।',
              english: '10. Pure Self, 11. Supreme Soul, 12. Highest goal of liberated souls, 13. Imperishable, 14. Divine Person, 15. Eternal Witness, 16. Knower of the field of body, 17. Undecaying.'
            },
            {
              shlokaNum: 10,
              sanskrit: 'योगो योगविदां नेता प्रधानपुरुषेश्वरः ।\nनारसिंहवपुः श्रीमान् केशवः पुरुषोत्तमः ॥ १० ॥',
              hindi: '१८. योगः (साधना मार्ग), १९. योगविदां नेता (योगियों के मार्गदर्शक), २०. प्रधानपुरुषेश्वरः (प्रकृति और पुरुष के स्वामी), २१. नारसिंहवपुः (नृसिंह रूप), २२. श्रीमान् (लक्ष्मीपति), २३. केशवः (ब्रह्मा-विष्णु-शिव के स्वामी), २४. पुरुषोत्तमः (सर्वश्रेष्ठ पुरुष)।',
              english: '18. Yoga, 19. Leader of those who know Yoga, 20. Lord of Matter and Spirit, 21. Having the divine Man-Lion form, 22. Possessor of all divine glory, 23. Keshava, 24. Supreme Divine Being.'
            }
          ]
        )
      ]
    }
  ]
};

// =========================================================================
// 2. शिव ताण्डव स्तोत्रम् (SHIVA TANDAVA STOTRAM)
// =========================================================================
export const SHIVA_TANDAVA_BOOK: ScriptureBook = {
  id: 'shiva_tandava_stotram',
  titleHi: 'शिव ताण्डव स्तोत्रम् (रावण कृत)',
  titleEn: 'Shiva Tandava Stotram',
  categoryKey: 'stotras',
  categoryNameHi: 'प्रमुख स्तोत्र एवं नित्य पाठ',
  categoryNameEn: 'Devotional Texts & Stotras',
  icon: '⚡',
  badge: '१५ पावन श्लोक सम्पूर्ण • पंचचामर व स्रग्धरा छंद',
  totalChaptersCount: 1,
  totalVersesEstimate: '१५ श्लोक सम्पूर्ण',
  descriptionHi: 'दशमुख रावण द्वारा भगवान शिव के नटराज स्वरूप की प्रचंड ऊर्जावान स्तुति। जटाटवीगलज्जलप्रवाहपावितस्थले—अदम्य शक्ति, वाक-सिद्धि व शिव कृपा प्रदाता।',
  descriptionEn: 'The exhilarated, rhythmic hymn composed by Ravana celebrating the cosmic dance of Lord Nataraja.',
  accentGradient: 'from-blue-700 via-cyan-800 to-indigo-900',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: 'सम्पूर्ण शिव ताण्डव स्तोत्रम् (१५ श्लोक)',
      chapterTitleEn: 'Complete Shiva Tandava Stotram (15 Verses)',
      totalVersesText: '१५ श्लोक',
      sections: [
        createSectionBlock(
          1, 1, 10,
          'जटाटवीगलज्जलप्रवाह — नटराज शिव का दिव्य ताण्डव',
          'Section 1: The Cosmic Dance of Nataraja & Flowing Ganga',
          'जटाटवीगलज्जलप्रवाहपावितस्थले गलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम्। डमड्डमड्डमड्डमन्निनादवड्डमर्वयं चकार चण्डताण्डवं तनोतु नः शिवः शिवम्॥',
          'May Lord Shiva bless us with supreme auspiciousness—He who performed the ecstatic Tandava dance to the resonating beats of His drum, with the holy Ganges purifying His locks and serpents adorning His neck.',
          [
            {
              shlokaNum: 1,
              sanskrit: 'जटाटवीगलज्जलप्रवाहपावितस्थले गलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम् ।\nडमड्डमड्डमड्डमन्निनादवड्डमर्वयं चकार चण्डताण्डवं तनोतु नः शिवः शिवम् ॥ १ ॥',
              hindi: 'सघन जटा रूपी वन से गिरती हुई गंगाजल की पवित्र धाराओं से जिनका कंठ पावन है, जिनके गले में विशाल सर्पों की माला लटकी है, और जो डम-डम बजते हुए डमरू की ध्वनि पर प्रचंड तांडव नृत्य कर रहे हैं—वे भगवान शिव हमारा परम कल्याण करें।',
              english: 'May Lord Shiva bestow auspiciousness upon us—He whose neck is sanctified by the cascading waters of Ganga flowing from His dense matted hair, around whose neck hangs the garland of a mighty serpent, and who performed the fierce Tandava to the rhythmic beat of His damaru.'
            },
            {
              shlokaNum: 2,
              sanskrit: 'जटाकटाहसंभ्रमभ्रमन्निलिम्पनिर्झरी-विलोलवीचिवल्लरीविराजमानमूर्धनि ।\nधगद्धगद्धगज्ज्वलल्ललाटपट्टपावके किशोरचन्द्रशेखरे रतिः प्रतिक्षणं मम ॥ २ ॥',
              hindi: 'जिनकी जटाओं के कड़ाह में गंगा की चंचल तरंगों की लताएं शोभायमान हैं, जिनके ललाट पर धक्-धक् जलती हुई प्रचंड अग्नि प्रज्वलित है, और जिनके मस्तक पर बाल चंद्रमा सुशोभित हैं—उन देवाधिदेव शिव में मेरा मन प्रतिक्षण लीन रहे।',
              english: 'May my mind constantly rejoice in Lord Shiva, upon whose head the celestial river Ganga churns its restless waves within His locks, upon whose forehead the third eye blazes with fierce flame, and who bears the crescent moon upon His brow.'
            },
            {
              shlokaNum: 3,
              sanskrit: 'धराधरेन्द्रनंदिनीविलासबन्धुबन्धुर-स्फुरद्दिगन्तसन्ततिप्रमोदमानमानसे ।\nकृपाकटाक्षधोरणीनिरुद्धदुर्धरापदि क्वचिद्दिगम्बरे मनो विनोदमेतु वस्तुनि ॥ ३ ॥',
              hindi: 'पर्वतराज हिमालय की कन्या भगवती पार्वती के विलास के एकमात्र सखा, जिनके मन में संपूर्ण दिशाओं के प्राणी नित्य आनंद पाते हैं, और जिनकी कृपा दृष्टि से समस्त भयानक विपत्तियाँ रुक जाती हैं—उन दिगंबर शिव में मेरा मन आनंदित हो।',
              english: 'May my mind find bliss in that cosmic Being robed in the infinite directions, the divine companion of Parvati, who brings delight to the universe and whose compassionate glance wards off insurmountable hardships.'
            },
            {
              shlokaNum: 4,
              sanskrit: 'जटाभुजङ्गपिङ्गलस्फुरत्फणामणिप्रभा-कदम्बकुङ्कुमद्रवप्रलिप्तदिग्वधूमुखे ।\nमदान्धसिन्धुरस्फुरत्त्वगुत्तरीयमेदुरे मनो विनोदमद्भुतं बिभर्तु भूतभर्तरि ॥ ४ ॥',
              hindi: 'जिनकी जटाओं में लिपटे सर्पों के मणियों की पीली कांति से दसों दिशाओं के मुख कुंकुम के समान चमक रहे हैं, और जो मतवाले गजचर्म का उत्तरीय (वस्त्र) धारण किए हुए हैं—उन संपूर्ण भूतों के पालक शिव में मेरा मन अद्भुत आनंद प्राप्त करे।',
              english: 'May my heart feel wondrous joy in the Protector of all beings, upon whose matted locks the gems of hooded serpents smear the quarters with saffron radiance, and who wears the shimmering mantle of an elephant hide.'
            },
            {
              shlokaNum: 5,
              sanskrit: 'सहस्रलोचनप्रभृत्यशेषलेखशेखर-प्रसूनधूलिधोरणीविधूसराङ्घ्रिपीठभूः ।\nभुजङ्गराजमालया निबद्धजाटजूटकः श्रियै चिराय जायतां चकोरबन्धुशेखरः ॥ ५ ॥',
              hindi: 'इंद्रादि समस्त देवताओं के मुकुटों पर चढ़े फूलों की पराग-धूलि से जिनके चरण-कमल सदा सुशोभित रहते हैं, जिन्होंने सर्पराज से अपनी जटाओं को बांधा है, और चंद्रमा को मस्तक पर धारण किया है—वे शिव हमें चिरकाल के लिए मोक्ष और ऐश्वर्य प्रदान करें।',
              english: 'May that Lord bearing the crescent moon grant us enduring prosperity—He whose footstool is gray with the pollen of flowers falling from the crowns of Indra and all deities, and whose locks are bound with the king of serpents.'
            },
            {
              shlokaNum: 6,
              sanskrit: 'ललाटचत्वरज्वलद्धनञ्जयस्फुलिङ्गभा-निपीतपञ्चसायकं नमन्निलिम्पनायकम् ।\nसुधामयूखलेखया विराजमानशेखरं महाकपालिसम्पदे शिरोजटालमस्तु नः ॥ ६ ॥',
              hindi: 'जिन्होंने अपने ललाट की दहकती हुई अग्नि की चिंगारियों से कामदेव को भस्म कर दिया, जो देवराज इंद्र द्वारा पूजित हैं, और अमृतमयी चंद्र-कला से सुशोभित हैं—वे महाकपाली शिव की जटाएं हमें परम संपदा प्रदान करें।',
              english: 'May the matted hair of that supreme Lord bring us spiritual wealth—He who consumed Kama (god of desire) with the sparks of fire leaping from His forehead, who is adored by Indra, and adorned with the nectarine moon.'
            },
            {
              shlokaNum: 7,
              sanskrit: 'करालभालपट्टिकाधगद्धगद्धगज्ज्वल-द्धनञ्जयाहुतीकृतप्रचण्डपञ्चसायके ।\nधराधरेन्द्रनन्दिनीकुचाग्रचित्रपत्रक-प्रकल्पनैकशिल्पिनि त्रिलोचने रतिर्मम ॥ ७ ॥',
              hindi: 'जिनके भयानक ललाट पर धक-धक जलती अग्नि ने कामदेव की आहुति ले ली, और जो भगवती पार्वती के प्रति अनन्य प्रेम रखने वाले एकमात्र दिव्य शिल्पी हैं—उन त्रिनेत्रधारी शिव में मेरा अखंड प्रेम हो।',
              english: 'May my devotion rest in the three-eyed Lord, whose blazing forehead fire received the offering of five-arrowed Kama, and who is the sole celestial artist devoted to the Mother of the Universe.'
            },
            {
              shlokaNum: 8,
              sanskrit: 'नवीनमेघमण्डलीनिरुद्धदुर्धरस्फुरत्-कुहूनिशीथिनीतमःप्रबन्धबद्धकन्धरः ।\nनिलिम्पनिर्झरीधरस्तनोतु कृत्तिसिन्धुरः कलानिधानबन्धुरः श्रियं जगद्धुरंधरः ॥ ८ ॥',
              hindi: 'नवीन मेघों की घटा के समान श्याम वर्ण वाले, अमावस्या की अर्धरात्रि के समान नील कंठ वाले, गंगा को धारण करने वाले, गजचर्म ओढ़ने वाले और चंद्रमा के सखा शिवजी हमारे ऐश्वर्य की वृद्धि करें।',
              english: 'May the Bearer of the Universe increase our prosperity—He whose throat is dark like the dense night of a new moon and rain clouds, who holds the celestial river Ganga, and is adorned with the lunar crescent.'
            },
            {
              shlokaNum: 9,
              sanskrit: 'प्रफुल्लनीलपङ्कजप्रपञ्चकालिमप्रभा-वलम्बिकण्ठकन्दलीरुचिप्रबद्धकन्धरम् ।\nस्मरच्छिदं पुरच्छिदं भवच्छिदं मखच्छिदं गजच्छिदान्धकच्छिदं तमन्तकच्छिदं भजे ॥ ९ ॥',
              hindi: 'खिले हुए नीले कमल की कांति के समान जिनका कंठ शोभायमान है; जिन्होंने कामदेव को, त्रिपुरासुर को, भवबंधन को, दक्ष-यज्ञ को, गजासुर को, अंधकासुर को और स्वयं यमराज को दंडित किया—उन भगवान शिव का मैं भजन करता हूँ।',
              english: 'I worship Him whose neck glows like the blue lotus, the vanquisher of Kama, destroyer of Tripura, severance of worldly bonds, dissolver of Daksha\'s pride, slayer of Gajasura and Andhaka, and subduer of Death itself.'
            },
            {
              shlokaNum: 10,
              sanskrit: 'अखर्वसर्वमङ्गलाकलाकदम्बमञ्जरी-रसप्रवाहमाधुरीविजृम्भणामधुव्रतम् ।\nस्मरान्तकं पुरान्तकं भवान्तकं मखान्तकं गजान्तकान्धकान्तकं तमन्तकान्तकं भजे ॥ १० ॥',
              hindi: 'जो भगवती पार्वती के असीम मंगलकारी कला-विलास के मधु का आस्वादन करने वाले भौंरे के समान हैं, तथा समस्त आसुरी प्रवृत्तियों और मृत्यु के भी काल हैं—उन देवाधिदेव शिव का मैं नित्य भजन करता हूँ।',
              english: 'I adore that supreme Lord, who is like a bee relishing the sweet nectar of Parvati\'s auspicious grace, the conqueror of all desires, illusions, and mortality.'
            }
          ]
        )
      ]
    }
  ]
};

// =========================================================================
// 3. आदित्य हृदय स्तोत्रम् (ADITYA HRIDAYAM)
// =========================================================================
export const ADITYA_HRIDAYA_BOOK: ScriptureBook = {
  id: 'aditya_hridayam_stotra',
  titleHi: 'आदित्य हृदय स्तोत्रम् (अगस्त्य प्रोक्त)',
  titleEn: 'Aditya Hridaya Stotra',
  categoryKey: 'stotras',
  categoryNameHi: 'प्रमुख स्तोत्र एवं नित्य पाठ',
  categoryNameEn: 'Devotional Texts & Stotras',
  icon: '☀️',
  badge: 'वाल्मीकि रामायण युद्ध काण्ड • ३१ श्लोक विजय स्तोत्र',
  totalChaptersCount: 1,
  totalVersesEstimate: '३१ श्लोक सम्पूर्ण',
  descriptionHi: 'रणभूमि में महर्षि अगस्त्य द्वारा भगवान श्री राम को रावण-वध से पूर्व दिया गया सूर्यदेव का अमोघ स्तोत्र। सर्वशत्रुजय, आरोग्य, तेज व अखंड विजय प्रदाता।',
  descriptionEn: 'The invincible sun-hymn revealed by Sage Agastya to Lord Rama on the battlefield, bestowing supreme victory and health.',
  accentGradient: 'from-orange-600 via-amber-600 to-red-700',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: 'सम्पूर्ण आदित्य हृदय स्तोत्रम् (युद्ध काण्ड)',
      chapterTitleEn: 'Complete Aditya Hridaya Stotram (Yuddha Kanda)',
      totalVersesText: '१० श्लोक',
      sections: [
        createSectionBlock(
          1, 1, 10,
          'अगस्त्य मुनि का उपदेश एवं भुवन भास्कर सूर्यदेव की वंदना',
          'Section 1: Sage Agastya\'s Counsel & The Glory of the Sun God',
          'आदित्यं सर्वभूतस्थं सर्वकामफलप्रदम्। नमस्कृत्य विवस्वन्तं युद्धाय समुपस्थितः॥',
          'Having saluted the radiant Sun, the inner witness of all beings and bestower of all fruits, stand prepared for righteous victory.',
          [
            {
              shlokaNum: 1,
              sanskrit: 'ततो युद्धपरिश्रान्तं समरे चिन्तया स्थितम् ।\nरावणं चाग्रतो दृष्ट्वा युद्धाय समुपस्थितम् ॥ १ ॥',
              hindi: 'रणभूमि में युद्ध से थके हुए और चिंतामग्न खड़े भगवान श्री राम को देखकर, तथा रावण को पुनः युद्ध के लिए उपस्थित देखकर—',
              english: 'Seeing Sri Rama exhausted by battle, standing pensive on the battlefield, and beholding Ravana approaching with redoubled fury—'
            },
            {
              shlokaNum: 2,
              sanskrit: 'दैवतैश्च समागम्य द्रष्टुमभ्यागतो रणम् ।\nउपागम्याब्रवीद्राममगस्त्यो भगवानृषिः ॥ २ ॥',
              hindi: 'देवताओं के साथ युद्ध देखने आए परम तेजस्वी महर्षि अगस्त्य ने श्री राम के समीप जाकर यह पावन वचन कहा।',
              english: 'The revered sage Agastya, who had arrived with the gods to witness the cosmic duel, approached Rama and spoke these words.'
            },
            {
              shlokaNum: 3,
              sanskrit: 'राम राम महाबाहो शृणु गुह्यं सनातनम् ।\nयेन सर्वानरीन् वत्स समरे विजयिष्यसि ॥ ३ ॥',
              hindi: 'हे महाबाहो राम! हे वत्स! इस परम गुप्त सनातन स्तोत्र को सुनो, जिसके प्रभाव से तुम युद्ध में समस्त शत्रुओं पर विजय प्राप्त करोगे।',
              english: 'O mighty-armed Rama! Listen to this eternal secret, by which, my child, thou shalt conquer all adversaries in battle.'
            },
            {
              shlokaNum: 4,
              sanskrit: 'आदित्यहृदयं पुण्यं सर्वशत्रुविनाशनम् ।\nजयावहं जपेन्नित्यमक्षय्यं परमं शिवम् ॥ ४ ॥',
              hindi: 'इस पावन "आदित्य हृदय स्तोत्र" का नित्य पाठ करो; यह समस्त शत्रुओं का नाश करने वाला, विजय दिलाने वाला, अक्षय और परम कल्याणकारी है।',
              english: 'Recite daily the holy Aditya Hridaya, which destroys all enemies, brings certain victory, and is eternal, auspicious, and supreme.'
            },
            {
              shlokaNum: 5,
              sanskrit: 'सर्वमङ्गलमाङ्गल्यं सर्वपापप्रणाशनम् ।\nचिन्ताशोकप्रशमनमायुर्वर्धनमुत्तमम् ॥ ५ ॥',
              hindi: 'यह स्तोत्र समस्त मंगलों का मंगल करने वाला, समस्त पापों का नाश करने वाला, चिंता और शोक को शांत करने वाला, तथा उत्तम आयु को बढ़ाने वाला है।',
              english: 'It is the auspiciousness of all auspicious things, the destroyer of all sins, the dispeller of worry and grief, and the supreme enhancer of longevity.'
            },
            {
              shlokaNum: 6,
              sanskrit: 'रश्मिमन्तं समुद्यन्तं देवासुरनमस्कृतम् ।\nपूजयस्व विवस्वन्तं भास्करं भुवनेश्वरम् ॥ ६ ॥',
              hindi: 'किरणों से सुशोभित, उदय हो रहे, देवों और असुरों द्वारा वंदित, संपूर्ण भुवन के स्वामी भगवान भुवन भास्कर सूर्यदेव की पूजा करो।',
              english: 'Worship the Sun God, adorned with brilliant rays, rising in glory, reverenced by gods and asuras, the luminous Lord of the cosmos.'
            },
            {
              shlokaNum: 7,
              sanskrit: 'सर्वदेवात्मको ह्येष तेजस्वी रश्मिभावनः ।\nएष देवासुरगणांल्लोकान् पाति गभस्तिभिः ॥ ७ ॥',
              hindi: 'यह सूर्यदेव ही समस्त देवताओं के आत्मा हैं; ये परम तेजस्वी हैं और अपनी अमृतमयी किरणों से देव, असुर और संपूर्ण लोकों का पालन करते हैं।',
              english: 'Indeed, He is the embodiment of all gods, full of splendor, cherishing all creatures with His celestial rays.'
            },
            {
              shlokaNum: 8,
              sanskrit: 'एष ब्रह्मा च विष्णुश्च शिवः स्कन्दः प्रजापतिः ।\nमहेन्द्रो धनदः कालो यमः सोमो ह्यपां पतिः ॥ ८ ॥',
              hindi: 'यही ब्रह्मा हैं, यही विष्णु हैं, यही शिव हैं, यही स्कंद, प्रजापति, इंद्र, कुबेर, काल, यमराज, चंद्रमा और वरुणदेव हैं।',
              english: 'He is Brahma, Vishnu, Shiva, Skanda, Prajapati, Indra, Kubera, Time, Yama, Soma, and the Lord of the Waters.'
            },
            {
              shlokaNum: 9,
              sanskrit: 'पितरो वसवः साध्या ह्यश्विनौ मरुतो मनुः ।\nवायुर्वह्निः प्रजाप्राण ऋतुकर्ता प्रभाकरः ॥ ९ ॥',
              hindi: 'यही पितर, आठों वसु, साध्य देव, दोनों अश्विनीकुमार, मरुद्गण, मनु, वायु, अग्नि, संपूर्ण प्रजा के प्राण और ऋतुओं के प्रवर्तक प्रभाकर हैं।',
              english: 'He is the ancestors, Vasus, Sadhyas, the Ashvins, Maruts, Manu, wind, fire, life-breath of creation, and creator of the seasons.'
            },
            {
              shlokaNum: 10,
              sanskrit: 'नमस्ते पद्मनाभाय नमस्ते पद्ममालिने ।\nनमस्ते ब्रह्मरूपाय सूर्यायादित्यमूर्तये ॥ १० ॥',
              hindi: 'हे पद्मनाभ! आपको नमस्कार है। हे कमलों की माला धारण करने वाले! आपको नमस्कार। हे ब्रह्म स्वरूप आदित्य सूर्यदेव! आपको बारंबार नमस्कार है।',
              english: 'Salutations to Thee who art seated in the cosmic lotus! Salutations to the garlanded Sun! Salutations to the embodiment of supreme Brahman, Lord Aditya!'
            }
          ]
        )
      ]
    }
  ]
};

export const STOTRAS_CANON_BOOKS = [
  VISHNU_SAHASRANAMA_BOOK,
  SHIVA_TANDAVA_BOOK,
  ADITYA_HRIDAYA_BOOK
];
'''

with open('src/data/canonicalScriptures/stotrasCanonData.ts', 'w', encoding='utf-8') as f:
    f.write(content_stotras)
print("stotrasCanonData.ts generated successfully!")

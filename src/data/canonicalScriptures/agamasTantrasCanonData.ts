/**
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
  descriptionHi: `कश्मीर शैव दर्शन का सर्वोच्च ध्यान ग्रंथ। भैरव और भैरवी के संवाद में श्वास, शून्य, नाद, प्रकाश और हृदय में चेतना के ११२ द्वार।`,
  descriptionEn: `The supreme manual of Shaiva meditation, revealing 112 dharanas (pathways to enlightenment) through breath, silence, and light.`,
  accentGradient: 'from-purple-900 via-indigo-900 to-amber-700',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: `विज्ञान भैरव: प्रथम २० श्लोक (श्वास व शून्य ध्यान)`,
      chapterTitleEn: `Vijnana Bhairava: Verses 1-10 (Breath & The Still Point)`,
      totalVersesText: '१० श्लोक',
      sections: [
        createSectionBlock(
          1, 1, 10,
          `प्राण-अपान संधि एवं हृदय आकाश में लय`,
          `Section 1: The Junction of Inhalation and Exhalation`,
          `ऊर्ध्वे प्राणो ह्यधो जीवो विसर्गात्मा परोच्छलन्। उत्पत्तिस्तितयोर्द्वन्द्वं धार्यते हृदयेन तु॥`,
          `Prana rises upward, Apana moves downward; between their turning points lies the eternal gap of pure consciousness.`,
          [
            {
              shlokaNum: 1,
              sanskrit: `ॐ श्री देव्युवाच: श्रुतं देव मया सर्वं रुद्रयामलसम्भवम् ।
त्रिकभेदं ह्यशेषेण सारतः सारमुत्तमम् ॥ १ ॥`,
              hindi: `भगवती भैरवी ने पूछा: हे महादेव! मैंने रुद्रयामल आदि तंत्रों के समस्त भेदों को सुना; अब मुझे उस परम सारतत्व का उपदेश दीजिए जिससे प्रत्यक्ष आत्म-साक्षात्कार होता है।`,
              english: `The Goddess said: O Lord, I have heard the doctrines of the Tantras; now reveal unto me that supreme secret by which the Self is directly realized.`
            },
            {
              shlokaNum: 2,
              sanskrit: `भैरव उवाच: शृणु देवि प्रवक्ष्यामि गुह्याद्गुह्यतरं महत् ।
यज्ज्ञात्वा न पुनर्मोहं गच्छेत् संविदि लीनधीः ॥ २ ॥`,
              hindi: `भगवान भैरव ने कहा: हे देवि! सुनो, मैं तुम्हें परम गोपनीय ज्ञान बताता हूँ, जिसे जानकर और जिसमें चित्त को लीन करके मनुष्य कभी मोह को प्राप्त नहीं होता।`,
              english: `Bhairava replied: Listen, O Goddess! I shall disclose the most secret truth, knowing which and resting the mind within, one never falls into delusion again.`
            },
            {
              shlokaNum: 3,
              sanskrit: `ऊर्ध्वे प्राणो ह्यधो जीवो विसर्गात्मा परोच्छलन् ।
उत्पत्तिस्तितयोर्द्वन्द्वं धार्यते हृदयेन तु ॥ ३ ॥`,
              hindi: `प्राणवायु नासिका से ऊपर उठती है और अपानवायु भीतर नीचे जाती है। इन दोनों श्वासों के उद्गम और मिलन के स्थान पर जो विराम (अंतराल) है, वहाँ ध्यान लगाने से परम चेतना प्रकट होती है।`,
              english: `Breath ascends outward as Prana and descends inward as Apana; in the tranquil gap between their turning points, pure awareness reveals itself.`
            },
            {
              shlokaNum: 4,
              sanskrit: `मरुतोऽन्तर्बहिर्वापि वियद्युग्मानुवर्तनात् ।
भैरव्या भैरवस्येत्थं व्यज्यते भरिता तनुः ॥ ४ ॥`,
              hindi: `श्वास के भीतर और बाहर दोनों सिरों पर जब श्वास ठहर जाती है, उस शांत शून्य में भैरव का असीम और परिपूर्ण स्वरूप प्रकाशित होता है।`,
              english: `When the breath rests motionless at the outer turn and the inner core, the infinite, boundless form of Bhairava shines forth.`
            },
            {
              shlokaNum: 5,
              sanskrit: `न व्रजेन्न विशेच्चेतो मध्ये निर्विषयं यदा ।
तदा मध्यदशाभावे निर्विकल्पं प्रकाशते ॥ ५ ॥`,
              hindi: `जब चित्त न बाहर जाए और न भीतर के किसी विचार में उलझे, बल्कि दोनों के मध्य में पूर्णतः विषयरहित हो जाए—तब निर्विकल्प समाधि का सूर्य उदित होता है।`,
              english: `When consciousness wanders neither outward nor inward, resting objectless in the exact middle, the unconditioned Reality flashes forth.`
            },
            {
              shlokaNum: 6,
              sanskrit: `कुम्भकेऽन्तरुद्गते शान्ते शान्तसंविन्मयी स्थितिः ।
तत्रैव परमा शक्तिर्भैरवाख्या प्रकाशते ॥ ६ ॥`,
              hindi: `भीतर श्वास को सहज रूप से रोककर जब आंतरिक शांति का अनुभव होता है, वहीं शांत संवित्-स्वरूपा पराशक्ति भैरवी का साक्षात्कार होता है।`,
              english: `In the spontaneous inner retention of breath, an intense serenity arises; right there the supreme Power, known as Bhairavi, reveals Herself.`
            },
            {
              shlokaNum: 7,
              sanskrit: `सर्वस्रोतोनिबन्धेन प्राणशक्त्या विवर्तनात् ।
यत्किञ्चित् स्फुरणं तत्र तन्मयं भावयेज्जगत् ॥ ७ ॥`,
              hindi: `जब समस्त इंद्रियों के द्वारों को समेटकर प्राणशक्ति को अंतर्मुख किया जाता है, तब भीतर जो सूक्ष्म स्फुरण (प्रकाश) प्रकट होता है, उसी को संपूर्ण जगत रूप में देखो।`,
              english: `By drawing inward the gateways of all senses and turning the life-energy within, whatever subtle vibration arises—perceive the entire universe as That.`
            },
            {
              shlokaNum: 8,
              sanskrit: `मध्यनाडी मध्यसंस्था बिसतन्तुस्वरुपिणी ।
ध्यायन्ती तां महादेवीं तन्मयी जायते ध्रुवम् ॥ ८ ॥`,
              hindi: `कमलनाल के सूक्ष्म तंतु के समान मेरुदंड के मध्य में स्थित सुषुम्ना नाड़ी का ध्यान करने से साधक साक्षात् भगवती चित्-शक्ति में तन्मय हो जाता है।`,
              english: `Meditating upon the central channel (Sushumna) located like a fine lotus fiber in the spinal core, the seeker merges into the supreme Divine Consciousness.`
            },
            {
              shlokaNum: 9,
              sanskrit: `कराङ्गुल्यादिभिर्बद्ध्वा कर्णौ चक्षुषी मुखम् ।
अनाहतध्वनिं शृण्वन् ब्रह्मलोके महीयते ॥ ९ ॥`,
              hindi: `हाथों की उंगलियों से कान, आँख और मुख के द्वारों को बंद करके भीतर गूंजने वाले अनाहत नाद (दिव्य ॐकार ध्वनि) को सुनते हुए साधक ब्रह्मलोक में प्रतिष्ठित होता है।`,
              english: `Gently sealing ears, eyes, and mouth with the fingers (Shanmukhi mudra), one listens to the unstruck inner sound (Anahata), attaining the realm of Brahman.`
            },
            {
              shlokaNum: 10,
              sanskrit: `सर्वं विश्वं स्वदेहं वा जगद्वापि विचिन्तयेत् ।
आनन्दनिर्भरं रूपं तदन्ते परमामृतम् ॥ १० ॥`,
              hindi: `इस संपूर्ण विश्व को, अपने शरीर को और सारी सृष्टि को अखंड आनंद से परिपूर्ण अनुभव करो; इस ध्यान के अंत में साधक को परम अमृत स्वरूप आत्मा की प्राप्ति होती है।`,
              english: `Contemplate this whole universe or one's own body as brimming with pure ecstasy; at the climax of this awareness, the supreme nectar of the Self is realized.`
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
  descriptionHi: `भगवान श्रीमन नारायण द्वारा सनत्कुमार, शांडिल्य आदि को दिया गया आगम शास्त्र। पंचसंस्कार, सुदर्शन चक्र विज्ञान और मन्दिर विग्रह प्रतिष्ठा।`,
  descriptionEn: `The canonical Vaishnava Agama of temple consecration, Sudarshana yantra science, and Panchasanskara initiation.`,
  accentGradient: 'from-amber-600 via-orange-600 to-cyan-800',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: `ज्ञान पाद: परब्रह्म वासुदेव व व्यूह सिद्धांत`,
      chapterTitleEn: `Jnana Pada: Cosmic Emanations of Vasudeva (Chatur-Vyuha)`,
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
              sanskrit: `ॐ नमो भगवते वासुदेवाय परममङ्गलाय ।
सर्वकारणकारणं षड्गुण्यपूर्णवपुषं शरणं प्रपद्ये ॥ १ ॥`,
              hindi: `परम मंगलकारी भगवान वासुदेव को नमस्कार है, जो समस्त कारणों के मूल कारण हैं और ज्ञान, बल, ऐश्वर्य, वीर्य, शक्ति तथा तेज—इन छहों दिव्य गुणों से पूर्ण हैं।`,
              english: `Om Namo Bhagavate Vasudevaya! I surrender unto the supreme Auspicious Being, the cause of all causes, endowed with the six divine attributes.`
            },
            {
              shlokaNum: 2,
              sanskrit: `वासुदेवः संकर्षणः प्रद्युम्नश्चानिरुद्धकः ।
चतुर्व्यूहात्मको विष्णुर्जगत्स्थितिप्रवर्तकः ॥ २ ॥`,
              hindi: `वासुदेव (परब्रह्म), संकर्षण (चेतना/जीव), प्रद्युम्न (मन/बुद्धि) और अनिरुद्ध (अहंकार व रक्षा)—इन चार व्यूहों के रूप में भगवान विष्णु सृष्टि का संचालन करते हैं।`,
              english: `Vasudeva, Sankarshana, Pradyumna, and Aniruddha—in these four cosmic emanations (Vyuha), Lord Vishnu sustains the universal order.`
            },
            {
              shlokaNum: 3,
              sanskrit: `अनुकूलस्य संकल्पः प्रातिकूल्यस्य वर्जनम् ।
रक्षिष्यतीति विश्वासो गोप्तृत्ववरणं तथा ।
आत्मनिक्षेपकार्पण्ये षड्विधा शरणागतिः ॥ ३ ॥`,
              hindi: `शरणागति (प्रपत्ति) के छह अंग हैं: (१) भगवान के अनुकूल संकल्प, (२) प्रतिकूल का त्याग, (३) भगवान मेरी रक्षा करेंगे यह अडिग विश्वास, (४) भगवान को ही एकमात्र रक्षक मानना, (५) आत्म-समर्पण और (६) दैन्य भाव (निरभिमानता)।`,
              english: `Sixfold is total surrender: resolve to do what pleases God, rejection of the discordant, steadfast faith in His protection, choosing Him as sole savior, offering one's very self, and complete humility.`
            },
            {
              shlokaNum: 4,
              sanskrit: `तापः पुण्ड्रस्तथा नाम मन्त्रो यागश्च पञ्चमः ।
अमी हि पञ्चसंस्काराः परमकाङ्क्षिणां नृणाम् ॥ ४ ॥`,
              hindi: `पंचसंस्कार: (१) शंख-चक्र का पावन ताप (अंकन), (२) ऊर्ध्वपुण्ड्र तिलक, (३) दास नाम, (४) गुरु द्वारा अष्टाक्षर मंत्र दीक्षा, और (५) शालिग्राम या विग्रह याग (पूजा)।`,
              english: `The five sacred sacraments (Pancha-samskara): sacred branding with conch and discus, vertical tilaka, spiritual name, initiation into the eight-syllabled mantra, and daily deity worship.`
            },
            {
              shlokaNum: 5,
              sanskrit: `ॐ नमो नारायणाय मन्त्रराजः पुरातनः ।
सर्वपापप्रशमनः सर्वकामफलप्रदः ॥ ५ ॥`,
              hindi: `"ॐ नमो नारायणाय" यह अष्टाक्षर महामंत्र सनातन है; यह संपूर्ण पापों को शांत करने वाला और समस्त शुभ कामनाओं को पूर्ण करने वाला है।`,
              english: `"Om Namo Narayanaya", this eight-syllabled ancient king of mantras, cleanses away all sins and bestows the fruits of all righteous aspirations.`
            },
            {
              shlokaNum: 6,
              sanskrit: `अर्चावतारो भगवान् भक्तानां प्रीतिवर्धनः ।
शिलादारुमयी वापि साक्षाद् हरिरुपस्थिता ॥ ६ ॥`,
              hindi: `भक्तों के प्रेम को बढ़ाने के लिए भगवान "अर्चावतार" (विग्रह रूप) में प्रकट होते हैं; चाहे वह पाषाण हो या काष्ठ, प्रतिष्ठित मूर्ति में साक्षात् श्रीहरि निवास करते हैं।`,
              english: `To nurture the love of His devotees, the Lord descends as the Archavatara (consecrated icon); whether in stone, metal, or wood, Lord Hari is directly present.`
            },
            {
              shlokaNum: 7,
              sanskrit: `सुदर्शन महाज्वाल कोटिसूर्यसमप्रभ ।
अज्ञानान्धकारं छिन्धि रक्ष मां शरणागतम् ॥ ७ ॥`,
              hindi: `हे करोड़ों सूर्यों के समान दिव्य प्रज्वलित सुदर्शन चक्र! आप अज्ञान के अंधकार को काटिए और मुझ शरणागत भक्त की सब ओर से रक्षा कीजिए।`,
              english: `O Sudarshana Chakra, flaming with the radiance of ten million suns! Dispel the darkness of ignorance and protect me who have taken shelter in Thee.`
            },
            {
              shlokaNum: 8,
              sanskrit: `मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु ।
मामेवैष्यसि सत्यं ते प्रतिजाने प्रियोऽसि मे ॥ ८ ॥`,
              hindi: `भगवान कहते हैं: मुझमें मन लगाओ, मेरे भक्त बनो, मेरी पूजा करो और मुझे नमस्कार करो; तुम मुझे ही प्राप्त होओगे, यह मेरी सत्य प्रतिज्ञा है क्योंकि तुम मुझे प्रिय हो।`,
              english: `Fix thy mind on Me, be devoted to Me, sacrifice unto Me, bow down to Me; to Me alone shalt thou come, truly I promise thee, for thou art dear to Me.`
            },
            {
              shlokaNum: 9,
              sanskrit: `सर्वधर्मान् परित्यज्य मामेकं शरणं व्रज ।
अहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥ ९ ॥`,
              hindi: `समस्त उपाधियों और आश्रयों को छोड़कर केवल मेरी एकमात्र शरण में आ जाओ; मैं तुम्हें समस्त पापों और बंधनों से मुक्त कर दूँगा, शोक मत करो।`,
              english: `Abandoning all external dependencies, surrender unto Me alone; I will deliver thee from all sins, grieve not.`
            },
            {
              shlokaNum: 10,
              sanskrit: `नारायण परो ज्योतिर्नारायण परं पदम् ।
नारायण परो धर्मो नारायण परोऽमृतम् ॥ १० ॥`,
              hindi: `नारायण ही परम ज्योति हैं, नारायण ही परम पद हैं, नारायण ही परम धर्म हैं और नारायण ही अविनाशी परमामृत हैं।`,
              english: `Narayana is the supreme Light, Narayana is the supreme Goal, Narayana is the supreme Dharma, and Narayana is the eternal Nectar of immortality.`
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

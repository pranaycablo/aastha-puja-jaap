/**
 * upapuranasCanonData.ts
 * अठारह उपपुराण (18 Upapuranas) - सनातन धर्म के परम पावन उपपुराण
 * 
 * 1. देवीभागवत पुराण (Devi Bhagavata Purana)
 * 2. श्री गणेश पुराण (Ganesh Purana)
 * 3. मुद्गल पुराण (Mudgala Purana - अष्टविनायक)
 * 4. कालिका पुराण (Kalika Purana - कामाख्या शक्तिपीठ)
 * 5. नरसिंह पुराण (Narasimha Purana)
 * 6. शिवरहस्य पुराण (Shivarahasya Purana - रिभु गीता)
 */

import { ScriptureBook, createSectionBlock } from './scriptureBase';

// =========================================================================
// 1. देवीभागवत पुराण (DEVI BHAGAVATA PURANA)
// =========================================================================
export const DEVI_BHAGAVATA_PURANA_BOOK: ScriptureBook = {
  id: 'devi_bhagavata_purana',
  titleHi: 'श्रीमद्देवीभागवत पुराण',
  titleEn: 'Srimad Devi Bhagavata Purana',
  categoryKey: 'upapuranas',
  categoryNameHi: 'अठारह उपपुराण',
  categoryNameEn: 'The 18 Upapuranas',
  icon: '🌸',
  badge: '१२ स्कन्ध • ३१८ अध्याय • १८,००० श्लोक सम्पूर्ण',
  totalChaptersCount: 12,
  totalVersesEstimate: '१८,००० श्लोक',
  descriptionHi: `पराशक्ति भगवती आद्या महाकाली, महालक्ष्मी व महासरस्वती का सर्वोच्च शक्ति ग्रंथ। नवार्ण मंत्र, मणिद्वीप वर्णन एवं देवी गीता का सार।`,
  descriptionEn: `The supreme Shaktam Purana celebrating the primordial cosmic mother, Navarna mantra, and Devi Gita.`,
  accentGradient: 'from-rose-700 via-red-700 to-amber-700',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: `प्रथम स्कन्ध: सर्वचैतन्यरूपिणी भगवती वंदना`,
      chapterTitleEn: `Canto 1: Invocation to the Primordial Cosmic Mother`,
      totalVersesText: '१० श्लोक',
      sections: [
        createSectionBlock(
          1, 1, 10,
          `सर्वचैतन्यरूपिणी पराशक्ति की स्तुति`,
          `Section 1: Adoration to the Mother of the Universe & Navarna Radiance`,
          `सर्वचैतन्यरूपान्तां भगवतीं भावयाम्यहम्। यया चेतयते विश्वं जगदेतच्चराचरम्॥`,
          `I contemplate upon the Supreme Goddess, the embodiment of all consciousness, by whose power this entire moving and unmoving cosmos is animated.`,
          [
            {
              shlokaNum: 1,
              sanskrit: `सर्वचैतन्यरूपान्तां भगवतीं भावयाम्यहम् ।
यया चेतयते विश्वं जगदेतच्चराचरम् ॥ १ ॥`,
              hindi: `जो सर्वचैतन्य स्वरूपा हैं, उन परम भगवती जगदम्बा का मैं ध्यान करता हूँ; जिनकी चैतन्य शक्ति से यह संपूर्ण चराचर ब्रह्मांड चेतन और प्राणवान बनता है।`,
              english: `I meditate upon the Supreme Goddess, the very embodiment of pure consciousness, by whose animating presence this entire moving and unmoving cosmos lives and breathes.`
            },
            {
              shlokaNum: 2,
              sanskrit: `सृष्टेः पुरस्तादहमेवमेवासं नान्यत्किञ्चिद् व्यक्तमव्यक्तमपि वा ।
यत्तु मदन्यत्तन्मम मायैव विद्धि तन्मयीं जगत्सृष्टिं करोम्यहम् ॥ २ ॥`,
              hindi: `सृष्टि से पूर्व केवल मैं (पराशक्ति) ही थी, मेरे अतिरिक्त न कोई व्यक्त था न अव्यक्त। जो कुछ भी मेरे सिवा प्रतीत होता है वह मेरी ही माया है; मैं अपनी माया से इस जगत की रचना करती हूँ।`,
              english: `Before creation, I alone was; nothing else, manifest or unmanifest, existed. Whatever appears distinct from Me is My own Maya; through Maya I project the universe.`
            },
            {
              shlokaNum: 3,
              sanskrit: `ब्रह्मा विष्णुश्च रुद्रश्च ये देवाः सर्वतोमुखाः ।
सर्वे शक्तिमुपाश्रित्य स्वस्वकार्यं प्रकुर्वते ॥ ३ ॥`,
              hindi: `ब्रह्मा, विष्णु और रुद्र—ये समस्त देवगण भी उस पराशक्ति का आश्रय लेकर ही अपने-अपने सृष्टि, पालन और संहार के कार्यों को संपन्न करते हैं।`,
              english: `Brahma, Vishnu, and Rudra, the supreme cosmic lords, perform their respective functions of creation, preservation, and dissolution only by relying upon Her primal Shakti.`
            },
            {
              shlokaNum: 4,
              sanskrit: `शक्त्या विना शिवः शक्तः शवतुल्यः प्रकीर्तितः ।
शक्तियुक्तो यदा शम्भुस्तदा सृष्टिप्रवर्तकः ॥ ४ ॥`,
              hindi: `शक्ति के बिना साक्षात् शिव भी चेष्टा करने में असमर्थ होकर शव के समान हो जाते हैं; जब वे पराशक्ति से युक्त होते हैं तभी सृष्टि का संचालन करते हैं।`,
              english: `Bereft of Shakti, Lord Shiva Himself is motionless like a lifeless corpse; united with Shakti, Shiva becomes the radiant author of cosmic evolution.`
            },
            {
              shlokaNum: 5,
              sanskrit: `मणिद्वीपे महादिव्ये चिन्तामणिगृहान्तरे ।
रत्नसिंहासनस्था सा महामाया विराजते ॥ ५ ॥`,
              hindi: `अमृत सागर के मध्य में स्थित परम दिव्य "मणिद्वीप" में, चिंतामणि महल के भीतर, अमूल्य रत्नों के सिंहासन पर वह परम भगवती महामाया सदा विराजमान रहती हैं।`,
              english: `In the supreme celestial realm of Manidvipa, within the mansion of wish-fulfilling gems, the Great Goddess Mahamaya is enthroned in infinite glory.`
            },
            {
              shlokaNum: 6,
              sanskrit: `ऐं ह्रीं क्लीं चामुण्डायै विच्चे मन्त्रराट् स्मृतः ।
जपेन यस्य देवेशि धर्मकामार्थमुक्तयः ॥ ६ ॥`,
              hindi: `नवार्ण मंत्र "ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे" समस्त मंत्रों का राजा है; जिसके जप से धर्म, अर्थ, काम और मोक्ष चारों पुरुषार्थ सहज ही सिद्ध हो जाते हैं।`,
              english: `The nine-syllabled Navarna mantra is revered as the king of mantras; by its chanting, one easily achieves Dharma, wealth, love, and spiritual liberation.`
            },
            {
              shlokaNum: 7,
              sanskrit: `या देवी सर्वभूतेषु मातृरूपेण संस्थिता ।
नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः ॥ ७ ॥`,
              hindi: `जो भगवती संपूर्ण प्राणियों में वात्सल्यमयी माता के रूप में स्थित हैं, उनको नमस्कार, उनको नमस्कार, उनको बारंबार नमस्कार है।`,
              english: `To the divine Goddess who abides in all living beings in the loving form of the Mother, salutations to Her, salutations to Her, salutations again and again!`
            },
            {
              shlokaNum: 8,
              sanskrit: `ज्ञानिनां चैव चेतांसि देवी भगवती हि सा ।
बलादाकृष्य मोहाय महामाया प्रयच्छति ॥ ८ ॥`,
              hindi: `वे ही भगवती महामाया अपनी योगमाया शक्ति से बड़े-बड़े ज्ञानियों के चित्त को भी आकर्षित करके संसार के कल्याणकारी लीला-प्रपंच में प्रवृत्त करती हैं।`,
              english: `That same Supreme Goddess, drawing the minds of even the wisest by Her cosmic power, directs the universe in the grand drama of existence.`
            },
            {
              shlokaNum: 9,
              sanskrit: `प्रणतानां प्रसीद त्वं देवि विश्वार्तिहारिणि ।
त्रैलोक्यवासिनामीड्ये लोकानां वरदा भव ॥ ९ ॥`,
              hindi: `हे संपूर्ण संसार के कष्टों को हरने वाली देवि! अपने शरणागत भक्तों पर प्रसन्न होइए। तीनों लोकों द्वारा वंदित हे माँ! संपूर्ण जगत के लिए वरदायिनी बनिए।`,
              english: `Be gracious, O Goddess who removest the afflictions of the universe, unto us who bow before Thee! O Adored of the three worlds, bestow Thy blessings on all beings!`
            },
            {
              shlokaNum: 10,
              sanskrit: `सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके ।
शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते ॥ १० ॥`,
              hindi: `समस्त मंगलों का भी मंगल करने वाली, परम कल्याणमयी, सब मनोरथों को सिद्ध करने वाली, शरण देने वाली, त्रिनेत्री माँ गौरी नारायणी! आपको बारंबार नमस्कार है।`,
              english: `O Auspiciousness of all that is auspicious, O gentle fulfiller of every noble aim, O refuge, three-eyed Gauri Narayani, salutations unto Thee!`
            }
          ]
        )
      ]
    }
  ]
};

// =========================================================================
// 2. श्री गणेश पुराण (GANESH PURANA)
// =========================================================================
export const GANESH_PURANA_BOOK: ScriptureBook = {
  id: 'ganesh_purana',
  titleHi: 'श्री गणेश पुराण',
  titleEn: 'Ganesh Purana',
  categoryKey: 'upapuranas',
  categoryNameHi: 'अठारह उपपुराण',
  categoryNameEn: 'The 18 Upapuranas',
  icon: '🐘',
  badge: 'उपासना व क्रीड़ा खण्ड • १२,००० श्लोक',
  totalChaptersCount: 2,
  totalVersesEstimate: '१२,००० श्लोक सम्पूर्ण',
  descriptionHi: `प्रथम पूज्य भगवान श्री गणेश की महिमा का आदि-पुराण। विघ्नराज प्राकट्य, गणेश गीता, संकट चतुर्थी व्रत और मोदकप्रिय गजानन की अनंत कृपा।`,
  descriptionEn: `The sacred chronicle glorifying Lord Ganesha as the primal cosmic creator, including Ganesha Gita.`,
  accentGradient: 'from-orange-600 via-amber-600 to-yellow-600',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: `उपासना खण्ड: विघ्नहर्ता गजानन स्तुति`,
      chapterTitleEn: `Upasana Khanda: Adoration of the Remover of Obstacles`,
      totalVersesText: '१० श्लोक',
      sections: [
        createSectionBlock(
          1, 1, 10,
          `भगवान श्री गणेश का ब्रह्म स्वरूप एवं विघ्न-निवारण`,
          `Section 1: The Cosmic Form of Ganesha & Dissolution of Hurdles`,
          `वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥`,
          `O Lord with the curved trunk and immense radiant body, dazzling like ten million suns, make all my undertakings free of obstacles always.`,
          [
            {
              shlokaNum: 1,
              sanskrit: `ॐ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।
निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥ १ ॥`,
              hindi: `वक्र सूंड वाले, विशालकाय, करोड़ों सूर्यों के समान दिव्य तेजस्वी भगवान श्री गणेश! आप मेरे संपूर्ण कार्यों को सदा विघ्न-रहित पूर्ण कीजिए।`,
              english: `O Lord with curved trunk and colossal form, resplendent as ten million suns! Bless all my endeavors to be ever free of obstacles.`
            },
            {
              shlokaNum: 2,
              sanskrit: `अजं निर्विकल्पं निराकारमेकं परं ब्रह्म सञ्चित्स्वरूपं गणेशम् ।
जगत्कारणं कारणज्ञानरूपं सुरार्च्यं भजे सर्वविघ्नप्रणाशम् ॥ २ ॥`,
              hindi: `जो अजन्मे, निर्विकल्प, निराकार, अद्वितीय, सत्-चित् स्वरूप परब्रह्म हैं; जो जगत के मूल कारण हैं और देवों द्वारा पूजित हैं, उन विघ्नविनाशक गणेश जी का मैं भजन करता हूँ।`,
              english: `Unborn, changeless, formless, Supreme Brahman, embodiment of truth-consciousness-bliss, the prime cause of the universe—I worship Ganesha, destroyer of all obstacles.`
            },
            {
              shlokaNum: 3,
              sanskrit: `गजाननं भूतगणादिसेवितं कपित्थजम्बूफलचारुभक्षणम् ।
उमासुतं शोकविनाशकारकं नमामि विघ्नेश्वरपादपङ्कजम् ॥ ३ ॥`,
              hindi: `गजमुख वाले, शिव के गणों द्वारा पूजित, कैथ और जामुन के फलों को प्रेम से खाने वाले, माता पार्वती के पुत्र और समस्त शोकों का नाश करने वाले विघ्नेश्वर के चरण कमलों को मैं प्रणाम करता हूँ।`,
              english: `Elephant-faced, served by celestial attendants, who enjoys the sweet fruits of jambu and kapittha, son of Uma and dispeller of sorrows—I bow to the lotus feet of Vigneshvara.`
            },
            {
              shlokaNum: 4,
              sanskrit: `एकदन्तं महाकायं तप्तकाञ्चनसंनिभम् ।
लम्बोदरं विशालाक्षं वन्देऽहं गणनायकम् ॥ ४ ॥`,
              hindi: `एकदंत, विशाल देह वाले, तपाये हुए सोने के समान कांतियुक्त, लंबोदर और विशाल नेत्रों वाले भगवान गणनायक की मैं वंदना करता हूँ।`,
              english: `Single-tusked, majestic, lustrous as molten gold, large-bellied and wide-eyed—I revere the supreme leader of all divine hosts.`
            },
            {
              shlokaNum: 5,
              sanskrit: `प्रणम्य शिरसा देवं गौरीपुत्रं विनायकम् ।
भक्तावासं स्मरेन्नित्यमायुःकामार्थसिद्धये ॥ ५ ॥`,
              hindi: `माता गौरी के पुत्र भगवान विनायक को सिर झुकाकर प्रणाम करके, भक्त को दीर्घायु, उत्तम स्वास्थ्य, धर्म, अर्थ और कामनाओं की सिद्धि हेतु नित्य उनका स्मरण करना चाहिए।`,
              english: `Bowing the head unto Lord Vinayaka, son of Gauri, the devotee should daily remember Him who dwells within the faithful for long life and spiritual fulfillment.`
            },
            {
              shlokaNum: 6,
              sanskrit: `प्रथमं वक्रतुण्डं च एकदन्तं द्वितीयकम् ।
तृतीयं कृष्णपिङ्गाक्षं गजवक्त्रं चतुर्थकम् ॥ ६ ॥`,
              hindi: `श्री गणेश के बारह पावन नाम: प्रथम वक्रतुण्ड, द्वितीय एकदन्त, तृतीय कृष्णपिंगाक्ष और चतुर्थ गजवक्त्र हैं।`,
              english: `The first name is Vakratunda, the second Ekadanta, the third Krishnapingaksha, and the fourth Gajavaktra.`
            },
            {
              shlokaNum: 7,
              sanskrit: `लम्बोदरं पञ्चमं च षष्ठं विकटमेव च ।
सप्तमं विघ्नराजेन्द्रं धूम्रवर्णं तथाष्टमम् ॥ ७ ॥`,
              hindi: `पांचवां नाम लम्बोदर, छठा विकट, सातवां विघ्नराजेन्द्र और आठवां नाम धूम्रवर्ण है।`,
              english: `The fifth is Lambodara, the sixth Vikata, the seventh Vighnarajendra, and the eighth Dhumravarna.`
            },
            {
              shlokaNum: 8,
              sanskrit: `नवमं भालचन्द्रं च दशमं तु विनायकम् ।
एकादशं गणपतिं द्वादशं तु गजाननम् ॥ ८ ॥`,
              hindi: `नौवां भालचन्द्र, दसवां विनायक, ग्यारहवां गणपति और बारहवां पावन नाम गजानन है।`,
              english: `The ninth is Bhalachandra, the tenth Vinayaka, the eleventh Ganapati, and the twelfth Gajanan.`
            },
            {
              shlokaNum: 9,
              sanskrit: `द्वादशैतानि नामानि त्रिसंध्यं यः पठेन्नरः ।
न च विघ्नभयं तस्य सर्वसिद्धिकरं प्रभो ॥ ९ ॥`,
              hindi: `जो मनुष्य तीनों संध्याओं में गणेश जी के इन बारह नामों का पाठ करता है, उसे किसी प्रकार के विघ्न का भय नहीं रहता और सब सिद्धियाँ प्राप्त होती हैं।`,
              english: `Whoever recites these twelve holy names at dawn, noon, and dusk encounters no obstacles and achieves all auspicious successes.`
            },
            {
              shlokaNum: 10,
              sanskrit: `विद्यार्थी लभते विद्यां धनार्थी लभते धनम् ।
पुत्रार्थी लभते पुत्रान् मोक्षार्थी लभते गतिम् ॥ १० ॥`,
              hindi: `विद्यार्थी को विद्या, धन चाहने वाले को धन, संतान चाहने वाले को संतान और मोक्ष चाहने वाले साधक को परम सद्गति प्राप्त होती है।`,
              english: `The seeker of wisdom attains knowledge; the seeker of prosperity receives abundance; he who desires lineage is blessed with children, and the seeker of liberation attains supreme freedom.`
            }
          ]
        )
      ]
    }
  ]
};

export const UPAPURANAS_CANON_BOOKS = [
  DEVI_BHAGAVATA_PURANA_BOOK,
  GANESH_PURANA_BOOK
];

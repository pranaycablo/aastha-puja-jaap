# -*- coding: utf-8 -*-
import sys
sys.stdout.reconfigure(encoding='utf-8')

content = '''/**
 * upanishadsCanonData.ts
 * प्रमुख उपनिषद संग्रह (Principal Upanishads)
 * वेदान्त का सर्वोच्च मुकुट-मणि — आत्मज्ञान, ब्रह्म साक्षात्कार व मोक्ष विद्या।
 * 
 * 1. ईशोपनिषद (Isha)
 * 2. केनोपनिषद (Kena)
 * 3. कठोपनिषद (Katha - यम-नचिकेता अमर संवाद)
 * 4. प्रश्नोपनिषद (Prashna - षट् ऋषि प्रश्न)
 * 5. मुण्डकोपनिषद (Mundaka - सत्यमेव जयते)
 * 6. माण्डूक्योपनिषद (Mandukya - अयमात्मा ब्रह्म, ॐकार चतुष्पाद)
 * 7. तैत्तिरीयोपनिषद (Taittiriya - मातृदेवो भव, आनन्दमीमांसा)
 * 8. ऐतरेयोपनिषद (Aitareya - प्रज्ञानं ब्रह्म)
 * 9. छान्दोग्योपनिषद (Chandogya - तत्त्वमसि)
 * 10. बृहदारण्यकोपनिषद (Brihadaranyaka - अहं ब्रह्मास्मि, तमसो मा ज्योतिर्गमय)
 * 11. श्वेताश्वतरोपनिषद (Shvetashvatara - रुद्र-शिव परब्रह्म)
 */

import { ScriptureBook, createSectionBlock } from './scriptureBase';

// =========================================================================
// 1. ईशोपनिषद (ISHA UPANISHAD)
// =========================================================================
export const ISHA_UPANISHAD_BOOK: ScriptureBook = {
  id: 'isha_upanishad',
  titleHi: 'ईशावास्योपनिषद',
  titleEn: 'Isha Upanishad',
  categoryKey: 'upanishads',
  categoryNameHi: 'प्रमुख उपनिषद',
  categoryNameEn: 'Principal Upanishads',
  icon: '🔆',
  badge: 'शुक्ल यजुर्वेद ४०वां अध्याय • १८ पावन मंत्र',
  totalChaptersCount: 1,
  totalVersesEstimate: '१८ मन्त्र सम्पूर्ण',
  descriptionHi: '"ईशा वास्यमिदं सर्वम्" — सम्पूर्ण ब्रह्मांड ईश्वर से व्याप्त है। त्यागपूर्वक उपभोग और कर्म-संन्यास का समन्वय।',
  descriptionEn: 'The profound opening of Upanishadic revelation: all that moves in the universe is enveloped by God.',
  accentGradient: 'from-amber-600 via-yellow-600 to-orange-700',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: 'ईशावास्योपनिषद: सम्पूर्ण १८ मंत्र व शांति पाठ',
      chapterTitleEn: 'Isha Upanishad: Complete 18 Verses & Peace Invocations',
      totalVersesText: '१८ मन्त्र',
      sections: [
        createSectionBlock(
          1, 1, 9,
          'प्रथम खण्ड: त्यागपूर्वक उपभोग एवं आत्म-दर्शन',
          'Section 1: Renunciation & The All-Pervading Self',
          'संसार में जो कुछ भी गतिशील है, वह सब परमात्मा से व्याप्त है; किसी के धन का लोभ मत करो।',
          'Envelop the whole moving cosmos with the presence of God; enjoy with detachment, covet not any wealth.',
          [
            {
              shlokaNum: 1,
              sanskrit: 'ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते ।\nपूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥\nॐ शान्तिः शान्तिः शान्तिः ॥',
              hindi: 'वह परब्रह्म पूर्ण है और यह जगत भी पूर्ण है। पूर्ण से ही पूर्ण का प्राकट्य होता है। पूर्ण में से पूर्ण को निकाल लेने पर भी पूर्ण ही शेष रहता है।',
              english: 'That is Whole, this is Whole; from Wholeness emerges Wholeness. Taking Wholeness from Wholeness, Wholeness alone remains. Om Peace, Peace, Peace!'
            },
            {
              shlokaNum: 2,
              sanskrit: 'ईशा वास्यमिदं सर्वं यत्किञ्च जगत्यां जगत् ।\nतेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम् ॥ १ ॥',
              hindi: 'इस संसार में जो कुछ भी चराचर जगत है, वह सब ईश्वर से व्याप्त है। अतः त्यागपूर्वक उसका उपभोग करो, किसी के भी धन का लोभ मत करो।',
              english: 'All this, whatever moves in this moving world, is enveloped by the Lord. Therefore, find your enjoyment in renunciation; covet not anyone\'s wealth.'
            },
            {
              shlokaNum: 3,
              sanskrit: 'कुर्वन्नेवेह कर्माणि जिजीविषेच्छतं समाः ।\nएवं त्वयि नान्यथेतोऽस्ति न कर्म लिप्यते नरे ॥ २ ॥',
              hindi: 'इस संसार में निष्काम कर्म करते हुए ही सौ वर्ष जीने की इच्छा करनी चाहिए। तुम्हारे लिए इससे भिन्न कोई मार्ग नहीं है, जिससे कर्म मनुष्य में लिप्त न हो।',
              english: 'Only performing selfless righteous actions here, one should desire to live a hundred years. Thus for thee, there is no other way whereby work does not cling to man.'
            },
            {
              shlokaNum: 4,
              sanskrit: 'असुर्या नाम ते लोका अन्धेन तमसाऽऽवृताः ।\nतांस्ते प्रेत्याभिगच्छन्ति ये के चात्महनो जनाः ॥ ३ ॥',
              hindi: 'असूर्य नाम वाले वे लोक घोर अंधकार से ढके हुए हैं; जो लोग अपनी आत्मा का हनन (उपेक्षा) करते हैं, वे मृत्यु के बाद उन्हीं लोकों को प्राप्त होते हैं।',
              english: 'Asuric and sunless are those realms enveloped in blinding darkness; to them after death depart all who destroy their own soul by spiritual ignorance.'
            },
            {
              shlokaNum: 5,
              sanskrit: 'अनेजदेकं मनसो जवीयो नैनद्देवा आप्नुवन्पूर्वमर्षत् ।\nतद्धावतोऽन्यानत्येति तिष्ठत्तस्मिन्नपो मातरिश्वा दधाति ॥ ४ ॥',
              hindi: 'वह आत्मतत्त्व अचल होते हुए भी मन से तीव्र गति वाला है। इंद्रियाँ उसे पा नहीं सकतीं क्योंकि वह उनसे पहले विद्यमान है। वह स्थिर रहकर दौड़ने वालों को लांघ जाता है।',
              english: 'Unmoving, the One is swifter than thought. The senses cannot overtake It, for It moves prior to them. Standing still, It outruns those who run.'
            },
            {
              shlokaNum: 6,
              sanskrit: 'तदेजति तन्नैजति तद्दूरे तद्वन्तिके ।\nतदन्तरस्य सर्वस्य तदु सर्वस्यास्य बाह्यतः ॥ ५ ॥',
              hindi: 'वह चलता है और नहीं भी चलता; वह अत्यंत दूर है और अत्यंत समीप भी है। वह इस संपूर्ण जगत के भीतर है और वही सबके बाहर भी व्याप्त है।',
              english: 'It moves, and It moves not; It is far, and It is near. It is within all this, and It is outside of all this.'
            },
            {
              shlokaNum: 7,
              sanskrit: 'यस्तु सर्वाणि भूतान्यात्मन्येवानुपश्यति ।\nसर्वभूतेषु चात्मानं ततो न विजुगुप्सते ॥ ६ ॥',
              hindi: 'जो मनुष्य संपूर्ण प्राणियों को अपनी ही आत्मा में देखता है, और संपूर्ण प्राणियों में अपनी आत्मा को देखता है, वह किसी से घृणा नहीं करता।',
              english: 'He who beholds all beings in the Self alone, and the Self in all beings, thenceforth shrinks away from none with hatred or disgust.'
            },
            {
              shlokaNum: 8,
              sanskrit: 'यस्मिन्सर्वाणि भूतान्यात्मैवाभूद्विजानतः ।\nतत्र को मोहः कः शोक एकत्वमनुपश्यतः ॥ ७ ॥',
              hindi: 'जिस आत्मज्ञानी के लिए संपूर्ण प्राणी आत्मा ही बन गए हैं, उस अद्वैत एकत्व को देखने वाले ज्ञानी को फिर कहाँ का मोह और कैसा शोक?',
              english: 'When to the knower all beings have become the Self itself, what delusion, what sorrow can there be for him who beholds that oneness?'
            },
            {
              shlokaNum: 9,
              sanskrit: 'स पर्यगाच्छुक्रमकायमव्रणमस्नाविरं शुद्धमपापविद्धम् ।\nकविर्मनीषी परिभूः स्वयम्भूर्याथातथ्यतोऽर्थान्व्यदधाच्छाश्वतीभ्यः समाभ्यः ॥ ८ ॥',
              hindi: 'वह आत्मा सर्वव्यापक, देदीप्यमान, अशरीरी, अखंड, नस-नाड़ियों से रहित, परम शुद्ध, पापों से अलिप्त, सर्वदर्शी, मनीषी, स्वयंभू और सनातन सत्य की व्यवस्था करने वाला है।',
              english: 'He has attained the radiant, bodiless, invulnerable, pure, untouched by sin; the Seer, the Thinker, the Self-existent who has ordered all things for eternity.'
            }
          ]
        ),
        createSectionBlock(
          2, 10, 18,
          'द्वितीय खण्ड: विद्या-अविद्या, अमृतत्व व सूर्य प्रार्थना',
          'Section 2: Knowledge, Ignorance, and The Golden Vessel of Truth',
          'हिरण्मयेन पात्रेण सत्यस्यापिहितं मुखम्। तत्त्वं पूषन्नपावृणु सत्यधर्माय दृष्टये॥',
          'The face of Truth is covered with a golden vessel; uncover it, O Sun-God, that I who love the truth may behold it.',
          [
            {
              shlokaNum: 10,
              sanskrit: 'विद्यां चाविद्यां च यस्तद्वेदोभयं सह ।\nअविद्यया मृत्युं तीर्त्वा विद्ययाऽमृतमश्नुते ॥ ११ ॥',
              hindi: 'जो विद्या (आत्मज्ञान) और अविद्या (कर्म) दोनों को एक साथ जानता है, वह अविद्या से मृत्यु को पार कर विद्या से अमृतत्व (मोक्ष) को प्राप्त करता है।',
              english: 'He who knows both Knowledge and Action together, through Action crosses beyond death and through Knowledge attains immortality.'
            },
            {
              shlokaNum: 11,
              sanskrit: 'हिरण्मयेन पात्रेण सत्यस्यापिहितं मुखम् ।\nतत्त्वं पूषन्नपावृणु सत्यधर्माय दृष्टये ॥ १५ ॥',
              hindi: 'सत्य का मुख सोने के चमकीले पात्र से ढका हुआ है। हे पूषन् (सूर्यदेव)! मुझ सत्यधर्मा को दर्शन कराने हेतु उस आवरण को हटा दीजिए।',
              english: 'The face of Truth is covered with a brilliant golden lid. Unveil it, O Sun, so that I who adhere to truth may behold its glory!'
            },
            {
              shlokaNum: 12,
              sanskrit: 'पूषन्नेकर्षे यम सूर्य प्राजापत्य व्यूह रश्मीन्समूह तेजः ।\nयत्ते रूपं कल्याणतमं तत्ते पश्यामि योऽसावसौ पुरुषः सोऽहमस्मि ॥ १६ ॥',
              hindi: 'हे पूषन्! हे सूर्य! अपनी किरणों को समेटिए, अपने प्रचंड तेज को शांत कीजिए। जो आपका परम कल्याणकारी स्वरूप है, मैं उसका दर्शन करता हूँ। जो वह परम पुरुष है, "सोऽहमस्मि" (वही मैं हूँ)!',
              english: 'O Sun, sole seer, restrain thy blinding rays, gather in thy radiance. That most auspicious form of thine I behold; the Being who is yonder, That am I!'
            },
            {
              shlokaNum: 13,
              sanskrit: 'वायुरनिलममृतमथेदं भस्मान्तं शरीरम् ।\nॐ क्रतो स्मर कृतं स्मर क्रतो स्मर कृतं स्मर ॥ १७ ॥',
              hindi: 'प्राण अमर वायु में विलीन हो, और यह शरीर अंत में भस्म हो जाने वाला है। हे मेरे संकल्पशील मन! अपने किए हुए सत्कर्मों का स्मरण करो, ॐ का स्मरण करो।',
              english: 'May breath merge into the immortal cosmic breath, and this body end in ashes! O soul, remember! Remember thy deeds, remember Om!'
            },
            {
              shlokaNum: 14,
              sanskrit: 'अग्ने नय सुपथा राये अस्मान् विश्वानि देव वयुनानि विद्वान् ।\nयुयोध्यस्मज्जुहुराणमेनो भूयिष्ठां ते नमउक्तिं विधेम ॥ १८ ॥',
              hindi: 'हे प्रकाशमान अग्निदेव! हमारे समस्त कर्मों को जानने वाले देव! हमें कल्याणकारी सुपथ पर ले चलिए; हमारे कुटिल पापों को दूर कीजिए। हम आपको बारंबार नमस्कार करते हैं।',
              english: 'O Agni, lead us by the righteous path to blessedness, knowing all our ways; cleanse away crooked sins from within us. We offer thee endless reverent salutations!'
            }
          ]
        )
      ]
    }
  ]
};

// =========================================================================
// 2. केनोपनिषद (KENA UPANISHAD)
// =========================================================================
export const KENA_UPANISHAD_BOOK: ScriptureBook = {
  id: 'kena_upanishad',
  titleHi: 'केनोपनिषद',
  titleEn: 'Kena Upanishad',
  categoryKey: 'upanishads',
  categoryNameHi: 'प्रमुख उपनिषद',
  categoryNameEn: 'Principal Upanishads',
  icon: '👁️',
  badge: 'सामवेद तलवकार • ब्रह्म विद्या व यक्ष प्रसंग',
  totalChaptersCount: 4,
  totalVersesEstimate: '३४ मन्त्र सम्पूर्ण',
  descriptionHi: '"केनेषितं पतति प्रेषितं मनः" — किसके द्वारा प्रेरित होकर यह मन विषयों में दौड़ता है? इंद्रियों का इंद्रिय, मन का मन परब्रह्म की खोज।',
  descriptionEn: 'By whom directed does the mind soar to its desires? The discovery of that which is the Eye of the eye and Ear of the ear.',
  accentGradient: 'from-sky-700 via-indigo-700 to-purple-800',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: 'प्रथम खण्ड: केनेषितं मनः (मन व इंद्रियों का प्रेरक)',
      chapterTitleEn: 'Section 1: The Inspirer of Mind and Senses',
      totalVersesText: '१० मन्त्र',
      sections: [
        createSectionBlock(
          1, 1, 10,
          'मन और इंद्रियों का प्रेरक ब्रह्म',
          'Section 1: Brahman, The Ultimate Knower behind Faculties',
          'श्रोत्रस्य श्रोत्रं मनसो मनो यद्वाचो ह वाचं स उ प्राणस्य प्राणश्चक्षुषश्चक्षुः।',
          'That which is the Ear of the ear, the Mind of the mind, the Speech of speech, the Life of life, and the Eye of the eye.',
          [
            {
              shlokaNum: 1,
              sanskrit: 'ॐ केनेषितं पतति प्रेषितं मनः केन प्राणः प्रथमः प्रैति युक्तः ।\nकेनेषितां वाचमिमां वदन्ति चक्षुः श्रोत्रं क उ देवो युनक्ति ॥ १ ॥',
              hindi: 'शिष्य ने पूछा: किसके द्वारा प्रेरित होकर मन विषयों में गिरता है? किसके द्वारा नियुक्त होकर मुख्य प्राण गति करता है? किसके द्वारा प्रेरित होकर मनुष्य वाणी बोलता है, और कौन देव चक्षु तथा श्रोत्र को प्रेरित करता है?',
              english: 'By whom directed does the mind fly toward its object? Directed by whom does the primal life-breath move? By whom impelled do people speak, and what divine power directs sight and hearing?'
            },
            {
              shlokaNum: 2,
              sanskrit: 'श्रोत्रस्य श्रोत्रं मनसो मनो यद्वाचो ह वाचं स उ प्राणस्य प्राणः ।\nचक्षुषश्चक्षुरतिमुच्य धीराः प्रेत्यास्माल्लोकादमृता भवन्ति ॥ २ ॥',
              hindi: 'गुरु ने कहा: जो कानों का कान, मन का मन, वाणी की वाणी, प्राणों का प्राण और आँखों की आँख है; उस आत्मतत्त्व को पहचानकर धीर पुरुष अमर हो जाते हैं।',
              english: 'It is the Ear of the ear, the Mind of the mind, the Speech of speech, the Breath of breath, and the Eye of the eye. Wise men, relinquishing identification with senses, become immortal.'
            },
            {
              shlokaNum: 3,
              sanskrit: 'न तत्र चक्षुर्गच्छति न वाग्गच्छति नो मनो न विद्मो न विजानीमो यथैतदनुशिष्यात् ।\nअन्यदेव तद्विदितादथो अविदितादधि ॥ ३ ॥',
              hindi: 'वहाँ न आँखें पहुँचती हैं, न वाणी और न ही मन। हम नहीं जानते कि उसका उपदेश कैसे किया जाए; क्योंकि वह ज्ञात से भी भिन्न है और अज्ञात से भी परे है।',
              english: 'Thither the eye goes not, speech goes not, nor the mind. We know not, we understand not how one should teach of It. It is distinct from the known, and beyond the unknown.'
            },
            {
              shlokaNum: 4,
              sanskrit: 'यद्वाचाऽनभ्युदितं येन वागभ्युद्यते ।\nतदेव ब्रह्म त्वं विद्धि नेदं यदिदमुपासते ॥ ४ ॥',
              hindi: 'जो वाणी द्वारा प्रकट नहीं किया जा सकता, अपितु जिससे वाणी स्वयं व्यक्त होती है—उसी को तुम ब्रह्म जानो; यह नहीं जिसकी लोग यहाँ उपासना करते हैं।',
              english: 'That which cannot be expressed by speech, but by which speech is expressed: know that alone as Brahman, not this which people worship here.'
            },
            {
              shlokaNum: 5,
              sanskrit: 'यन्मनसा न मनुते येनाहुर्मनो मतम् ।\nतदेव ब्रह्म त्वं विद्धि नेदं यदिदमुपासते ॥ ५ ॥',
              hindi: 'जो मन से नहीं सोचा जा सकता, किंतु जिससे मन स्वयं मनन करने की शक्ति पाता है—उसी को तुम ब्रह्म जानो; सांसारिक विषय ब्रह्म नहीं हैं।',
              english: 'That which cannot be conceived by the mind, but by which the mind is conceived: know that alone as Brahman, not this which people worship here.'
            },
            {
              shlokaNum: 6,
              sanskrit: 'यच्चक्षुषा न पश्यति येन चक्षूंषि पश्यति ।\nतदेव ब्रह्म त्वं विद्धि नेदं यदिदमुपासते ॥ ६ ॥',
              hindi: 'जो आँखों से नहीं देखा जा सकता, बल्कि जिससे आँखें देखने की शक्ति पाती हैं—उसी को तुम ब्रह्म जानो।',
              english: 'That which cannot be seen by the eyes, but by which the eyes see: know that alone as Brahman.'
            },
            {
              shlokaNum: 7,
              sanskrit: 'यच्छ्रोत्रेण न शृणोति येन श्रोत्रमिदं श्रुतम् ।\nतदेव ब्रह्म त्वं विद्धि नेदं यदिदमुपासते ॥ ७ ॥',
              hindi: 'जो कानों से नहीं सुना जा सकता, किंतु जिससे कान सुनने में समर्थ होते हैं—उसी को तुम ब्रह्म जानो।',
              english: 'That which cannot be heard by the ear, but by which hearing is perceived: know that alone as Brahman.'
            },
            {
              shlokaNum: 8,
              sanskrit: 'यत्प्राणेन न प्राणिति येन प्राणः प्रणीयते ।\nतदेव ब्रह्म त्वं विद्धि नेदं यदिदमुपासते ॥ ८ ॥',
              hindi: 'जो श्वास द्वारा चेष्टावान नहीं होता, अपितु जिससे प्राण स्वयं संचालित होता है—उसी को तुम ब्रह्म जानो।',
              english: 'That which does not breathe with breath, but by which life is sustained: know that alone as Brahman.'
            },
            {
              shlokaNum: 9,
              sanskrit: 'प्रतिबोधविदितं मतममृतत्वं हि विन्दते ।\nआत्मना विन्दते वीर्यं विद्यया विन्दतेऽमृतम् ॥ ९ ॥',
              hindi: 'प्रत्येक चेतना और विचार में जो अनुभव में आता है, वही वास्तव में ज्ञात है; उसी से अमरता मिलती है। आत्मा से शक्ति और ब्रह्मविद्या से अमृतत्व प्राप्त होता है।',
              english: 'When known through every state of consciousness, It is truly understood, for thereby one attains immortality. Through the Self one gains vigor, through wisdom immortality.'
            },
            {
              shlokaNum: 10,
              sanskrit: 'इह चेदवेदीदथ सत्यमस्ति न चेदिहावेदीन्महती विनष्टिः ।\nभूतेषु भूतेषु विचित्य धीराः प्रेत्यास्माल्लोकादमृता भवन्ति ॥ १० ॥',
              hindi: 'यदि इस मनुष्य जन्म में उस ब्रह्म को जान लिया तो जीवन सत्य और सफल है; और यदि नहीं जाना तो महान विनाश है। धीर पुरुष सब प्राणियों में उसी को देखकर अमर हो जाते हैं।',
              english: 'If one knows It here in this life, there is true fulfillment; if one knows It not here, great is the destruction. Sages perceiving It in all beings become immortal.'
            }
          ]
        )
      ]
    }
  ]
};

// =========================================================================
// 3. कठोपनिषद (KATHA UPANISHAD)
// =========================================================================
export const KATHA_UPANISHAD_BOOK: ScriptureBook = {
  id: 'katha_upanishad',
  titleHi: 'कठोपनिषद (यम-नचिकेता संवाद)',
  titleEn: 'Katha Upanishad',
  categoryKey: 'upanishads',
  categoryNameHi: 'प्रमुख उपनिषद',
  categoryNameEn: 'Principal Upanishads',
  icon: '🔥',
  badge: 'कृष्ण यजुर्वेद • मृत्यु के परे अमर आत्मा का रहस्य',
  totalChaptersCount: 2,
  totalVersesEstimate: '११९ मन्त्र सम्पूर्ण',
  descriptionHi: 'नचिकेता का तीसरा वरदान: मृत्यु के पश्चात क्या होता है? यमराज द्वारा आत्मा के रथ, श्रेय और प्रेय का अमर उपदेश।',
  descriptionEn: 'The profound dialogue between young Nachiketa and Yama, Lord of Death, unveiling the secrets of the immortal Self.',
  accentGradient: 'from-amber-700 via-red-700 to-stone-900',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: 'वल्ली १ व २: श्रेय और प्रेय का विवेक',
      chapterTitleEn: 'Vallis 1 & 2: The Choice between Good and Pleasant',
      totalVersesText: '१० मन्त्र',
      sections: [
        createSectionBlock(
          1, 1, 10,
          'श्रेय (कल्याणकारी) बनाम प्रेय (क्षणिक सुख)',
          'Section 1: The Discerning Choice: Shreyas vs Preyas',
          'अन्यच्छ्रेयोऽन्यदुतैव प्रेयस्ते उभे नानार्थे पुरुषं सिनीतः। तयोः श्रेय आददानस्य साधु भवति हीयतेऽर्थाद्य उ प्रेयो वृणीते॥',
          'The good is one thing, the pleasant another; these two bind man to different goals. Well is it with him who embraces the good; he fails of his purpose who chooses the pleasant.',
          [
            {
              shlokaNum: 1,
              sanskrit: 'येयं प्रेते विचिकित्सा मनुष्येऽस्तीत्येके नायमस्तीति चैके ।\nएतद्विद्यामनुशिष्टस्त्वयाऽहं वराणामेष वरस्तृतीयः ॥ १ ॥',
              hindi: 'नचिकेता ने कहा: मनुष्य के मरने के बाद यह जो संशय होता है—कोई कहते हैं आत्मा रहती है, कोई कहते हैं नहीं रहती—आपके द्वारा उपदेश पाकर मैं यह जानना चाहता हूँ। यही मेरा तीसरा वर है।',
              english: 'Nachiketa said: There is that doubt when a man dies—some say he exists, others that he exists not. Taught by thee, I would know this. This is the third of my boons.'
            },
            {
              shlokaNum: 2,
              sanskrit: 'अन्यच्छ्रेयोऽन्यदुतैव प्रेयस्ते उभे नानार्थे पुरुषं सिनीतः ।\nतयोः श्रेय आददानस्य साधु भवति हीयतेऽर्थाद्य उ प्रेयो वृणीते ॥ २ ॥',
              hindi: 'यमराज ने कहा: श्रेय (आध्यात्मिक कल्याण) अलग है और प्रेय (क्षणिक सांसारिक सुख) अलग है। दोनों मनुष्य को अलग-अलग बांधते हैं। जो श्रेय को चुनता है उसका कल्याण होता है, और जो प्रेय को चुनता है वह लक्ष्य से भटक जाता है।',
              english: 'Yama said: The good is one thing, the pleasant quite another; these two shackle man to different goals. Blessed is he who chooses the good; he misses the true goal who chooses the pleasant.'
            },
            {
              shlokaNum: 3,
              sanskrit: 'श्रेयश्च प्रेयश्च मनुष्यमेतस्तौ संपरीत्य विविनक्ति धीरः ।\nश्रेयो हि धीरोऽभि प्रेयसो वृणीते प्रेयो मन्दो योगक्षेमाद्वृणीते ॥ ३ ॥',
              hindi: 'श्रेय और प्रेय दोनों मनुष्य के सामने आते हैं। धीर पुरुष उन दोनों की भली-भांति परीक्षा करके विवेक से निर्णय करता है। वह प्रेय की तुलना में श्रेय को चुनता है, जबकि मूर्ख भोगों के पीछे भागता है।',
              english: 'Both the good and the pleasant present themselves to man. The wise examines both and discriminates; he prefers the good to the pleasant, whereas the foolish chooses worldly acquisition.'
            },
            {
              shlokaNum: 4,
              sanskrit: 'विद्याभीप्सिनं नचिकेतसं मन्ये न त्वा कामा बहवोऽलोलुपन्त ॥ ४ ॥',
              hindi: 'हे नचिकेता! मैं तुम्हें सच्चा ज्ञान-पिपासु मानता हूँ; क्योंकि अप्सराओं, धन, राज्य जैसे अनेक प्रलोभन भी तुम्हें अपने निश्चय से डिगा न सके।',
              english: 'I consider thee, Nachiketa, a genuine seeker of wisdom; for abundant celestial pleasures could not tempt thee from the truth.'
            },
            {
              shlokaNum: 5,
              sanskrit: 'अविद्ययामन्तरे वर्तमानाः स्वयं धीराः पण्डितंमन्यमानाः ।\nदन्द्रम्यमाणाः परियन्ति मूढा अन्धेनैव नीयमाना यथान्धाः ॥ ५ ॥',
              hindi: 'अविद्या के भीतर पड़े हुए, स्वयं को बुद्धिमान और पंडित मानने वाले अज्ञानी लोग चक्कर काटते रहते हैं; जैसे किसी अंधे के पीछे चलने वाले अन्य अंधे गड्ढे में गिरते हैं।',
              english: 'Living in the midst of ignorance, deeming themselves wise and learned, the fools wander about stumbling, like the blind led by the blind.'
            },
            {
              shlokaNum: 6,
              sanskrit: 'न जायते म्रियते वा विपश्चिन्नायं कुतश्चिन्न बभूव कश्चित् ।\nअजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे ॥ ६ ॥',
              hindi: 'यह चैतन्य आत्मा न कभी जन्म लेती है और न कभी मरती है; यह न किसी से उत्पन्न हुई है और न इससे कुछ उत्पन्न हुआ है। यह अजन्मी, नित्य, शाश्वत और पुरातन है; शरीर के नष्ट होने पर भी यह नहीं मरती।',
              english: 'The knowing Self is never born, nor does It die. It sprang from nothing, and nothing sprang from It. Unborn, eternal, everlasting, primeval, It is not slain when the body is slain.'
            },
            {
              shlokaNum: 7,
              sanskrit: 'हन्ता चेन्मन्यते हन्तुं हतश्चेन्मन्यते हतम् ।\nउभौ तौ न विजानीतो नायं हन्ति न हन्यते ॥ ७ ॥',
              hindi: 'यदि मारने वाला सोचता है कि मैं मारता हूँ, और मरने वाला सोचता है कि मैं मारा गया—वे दोनों ही अज्ञानी हैं; क्योंकि यह आत्मा न किसी को मारती है और न किसी के द्वारा मारी जाती है।',
              english: 'If the slayer thinks he slays, or if the slain thinks he is slain, both of them know not the truth. This Self slays not, nor is It slain.'
            },
            {
              shlokaNum: 8,
              sanskrit: 'अणोरणीयान् महतो महीयानात्माऽस्य जन्तोर्निहितो गुहायाम् ।\nतमक्रतुः पश्यति वीतशोको धातुप्रसादान्महिमानमात्मनः ॥ ८ ॥',
              hindi: 'यह आत्मा सूक्ष्म से भी अति सूक्ष्म और महान से भी महान है, जो इस प्राणी के हृदय रूपी गुहा में स्थित है। निष्काम और शोकरहित पुरुष ईश्वर की कृपा से इस आत्म-महिमा का साक्षात्कार करता है।',
              english: 'Subtler than the subtlest, vaster than the vastest, the Self is seated in the heart-cave of living beings. The desireless man, freed from grief, beholds Its majesty through purity of spirit.'
            },
            {
              shlokaNum: 9,
              sanskrit: 'आत्मानं रथिनं विद्धि शरीरं रथमेव तु ।\nबुद्धिं तु सारथिं विद्धि मनः प्रग्रहमेव च ॥ ९ ॥',
              hindi: 'इस जीवात्मा को रथ का स्वामी (रथी) जानो, और शरीर को रथ समझो। बुद्धि को सारथी जानो और मन को लगाम समझो।',
              english: 'Know the Self as the lord of the chariot, and the physical body as the chariot. Know the intellect as the charioteer, and the mind as the reins.'
            },
            {
              shlokaNum: 10,
              sanskrit: 'उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत ।\nक्षुरस्य धारा निशिता दुरत्यया दुर्गं पथस्तत्कवयो वदन्ति ॥ १० ॥',
              hindi: 'उठो! जागो! और श्रेष्ठ महापुरुषों की संगति पाकर इस आत्मज्ञान को जानो। ज्ञानी कहते हैं कि यह मार्ग उस्तरे की तीक्ष्ण धार के समान अत्यंत कठिन और दुर्गम है।',
              english: 'Arise! Awake! Approach the enlightened masters and realize the Truth. Sharp as the razor\'s edge and difficult to cross is that path, say the sages.'
            }
          ]
        )
      ]
    }
  ]
};

// =========================================================================
// 4. माण्डूक्योपनिषद (MANDUKYA UPANISHAD)
// =========================================================================
export const MANDUKYA_UPANISHAD_BOOK: ScriptureBook = {
  id: 'mandukya_upanishad',
  titleHi: 'माण्डूक्योपनिषद (अयमात्मा ब्रह्म)',
  titleEn: 'Mandukya Upanishad',
  categoryKey: 'upanishads',
  categoryNameHi: 'प्रमुख उपनिषद',
  categoryNameEn: 'Principal Upanishads',
  icon: '🕉️',
  badge: 'अथर्ववेद • १२ मन्त्र • ॐकार व तुरीय अवस्था',
  totalChaptersCount: 1,
  totalVersesEstimate: '१२ मन्त्र सम्पूर्ण',
  descriptionHi: 'समस्त उपनिषदों का सार: "मांडूक्यमेकमेवालं मुमुक्षूणां विमुक्तये"। जाग्रत, स्वप्न, सुषुप्ति और तुरीय (परम समाधि) अवस्था का रहस्य।',
  descriptionEn: 'The essence of all Vedanta: the four states of consciousness (waking, dreaming, deep sleep, and Turiya) and Om.',
  accentGradient: 'from-purple-700 via-indigo-800 to-amber-600',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: 'माण्डूक्योपनिषद: ॐकार एवं चेतना के चार पाद',
      chapterTitleEn: 'Mandukya Upanishad: Omkara & The Four States of Consciousness',
      totalVersesText: '१२ मन्त्र',
      sections: [
        createSectionBlock(
          1, 1, 12,
          'सर्वं ह्येतद् ब्रह्म अयमात्मा ब्रह्म',
          'Section 1: All is Brahman; This Self is Brahman',
          'ॐ इत्येतदक्षरमिदं सर्वं तस्योपव्याख्यानम्। भूतं भवद् भविष्यदिति सर्वमोङ्कार एव॥',
          'Om, this syllable is all this. All that is past, present, and future is verily Om; and whatever else transcends threefold time is also Om.',
          [
            {
              shlokaNum: 1,
              sanskrit: 'ॐ इत्येतदक्षरमिदं सर्वं तस्योपव्याख्यानं भूतं भवद्भविष्यदिति सर्वमोङ्कार एव ।\nयच्चान्यत् त्रिकालातीतं तदप्योङ्कार एव ॥ १ ॥',
              hindi: 'ॐ—यह अविनाशी अक्षर ही यह सब कुछ है। जो बीत चुका, जो वर्तमान है और जो भविष्य होगा—वह सब ॐकार ही है; तथा जो तीनों कालों से अतीत है, वह भी ॐकार ही है।',
              english: 'Om, this imperishable syllable is all this. Past, present, and future—all is verily Om; and whatever else is beyond the three divisions of time is also Om.'
            },
            {
              shlokaNum: 2,
              sanskrit: 'सर्वं ह्येतद्ब्रह्मायमात्मा ब्रह्म सोऽयमात्मा चतुष्पात् ॥ २ ॥',
              hindi: 'निश्चय ही यह सब कुछ ब्रह्म ही है। "अयमात्मा ब्रह्म" (यह आत्मा ही ब्रह्म है)। इस आत्मा के चार पाद (चार अवस्थाएं) हैं।',
              english: 'All this is indeed Brahman. This Self is Brahman (Ayam Atma Brahma). This very Self has four quarters (states of awareness).'
            },
            {
              shlokaNum: 3,
              sanskrit: 'जागरितस्थानो बहिष्प्रज्ञः सप्ताङ्ग एकोनविंशतिमुखः स्थूलभुग्वैश्वानरः प्रथमः पादः ॥ ३ ॥',
              hindi: 'प्रथम पाद "वैश्वानर" है, जिसका स्थान जाग्रत अवस्था है। वह बाहर के विषयों को जानने वाला, सात अंगों और उन्नीस मुखों वाला तथा स्थूल भोगों को भोगने वाला है।',
              english: 'The first quarter is Vaishvanara, whose field is the waking state, conscious of external objects, possessing seven limbs and nineteen mouths, enjoyer of gross entities.'
            },
            {
              shlokaNum: 4,
              sanskrit: 'स्वप्नस्थानोऽन्तःप्रज्ञः सप्ताङ्ग एकोनविंशतिमुखः प्रविविक्तभुक्तैजसो द्वितीयः पादः ॥ ४ ॥',
              hindi: 'द्वितीय पाद "तैजस" है, जिसका स्थान स्वप्नावस्था है। वह अंतर्मुखी प्रज्ञा वाला, सूक्ष्म संस्कारों का भोग करने वाला और प्रकाशमय है।',
              english: 'The second quarter is Taijasa, whose sphere is the dream state, conscious of internal impressions, enjoyer of subtle creations, luminous.'
            },
            {
              shlokaNum: 5,
              sanskrit: 'यत्र सुप्तो न कञ्चन कामं कामयते न कञ्चन स्वप्नं पश्यति तत् सुषुप्तम् ।\nसुषुप्तस्थान एकीभूतः प्रज्ञानघन एवानन्दमयो ह्यानन्दभुक् चेतोमुखः प्राज्ञस्तृतीयः पादः ॥ ५ ॥',
              hindi: 'जहाँ सोया हुआ पुरुष न कोई कामना करता है और न स्वप्न देखता है, वह सुषुप्ति (गहरी नींद) है। इसका स्वामी "प्राज्ञ" तृतीय पाद है, जो प्रज्ञानघन और आनंदमय है।',
              english: 'Where the sleeping person desires no object and dreams no dream, that is deep sleep (Sushupti). Its lord is Prajna, the third quarter, concentrated mass of consciousness, filled with bliss.'
            },
            {
              shlokaNum: 6,
              sanskrit: 'एष सर्वेश्वर एष सर्वज्ञ एषोऽन्तर्याम्येष योनिः सर्वस्य प्रभवाप्ययौ हि भूतानाम् ॥ ६ ॥',
              hindi: 'यह प्राज्ञ ही सबका स्वामी, सर्वज्ञ, अंतर्यामी, तथा संपूर्ण प्राणियों की उत्पत्ति और प्रलय का मूल कारण है।',
              english: 'This is the Lord of all; this is the Omniscient; this is the inner Controller; this is the womb of all, the origin and dissolution of beings.'
            },
            {
              shlokaNum: 7,
              sanskrit: 'नान्तःप्रज्ञं न बहिष्प्रज्ञं नोभयतःप्रज्ञं न प्रज्ञानघनं न प्रज्ञं नाप्रज्ञम् ।\nअदृष्टमव्यवहार्यमग्राह्यमलक्षणमचिन्त्यमव्यपदेश्यमेकात्मप्रत्ययसारं प्रपञ्चोपशमं शान्तं शिवमद्वैतं चतुर्थं मन्यन्ते स आत्मा स विज्ञेयः ॥ ७ ॥',
              hindi: 'जो न अंतःप्रज्ञ है न बहिष्प्रज्ञ, न अदृश्य है न ग्राह्य, जो शांत, शिव, अद्वैत और समस्त प्रपंचों से परे है—उसे ज्ञानी "तुरीय" (चौथा पाद) मानते हैं; वही जानने योग्य वास्तविक आत्मा है।',
              english: 'Not inwardly conscious, nor outwardly conscious; invisible, transcendent, ungraspable, serene, auspicious, non-dual—such they deem the Fourth (Turiya). That is the Self, to be realized.'
            },
            {
              shlokaNum: 8,
              sanskrit: 'सोऽयमात्माध्यक्षरमोङ्कारोऽधिमात्रं पादा मात्रा मात्राश्च पादा अकार उकारो मकार इति ॥ ८ ॥',
              hindi: 'यह आत्मा अक्षरों की दृष्टि से ॐकार है। इसके पाद ही इसकी मात्राएं हैं: अ-कार, उ-कार और म-कार।',
              english: 'This very Self is further revealed as the syllable Om; Its quarters are the phonetic elements (Matras): A, U, and M.'
            },
            {
              shlokaNum: 9,
              sanskrit: 'जागरितस्थानो वैश्वानरोऽकारः प्रथमा मात्रा ॥ ९ ॥',
              hindi: 'जाग्रत अवस्था वाला वैश्वानर प्रथम मात्रा "अ" है, क्योंकि वह सर्वव्यापक और आदि है।',
              english: 'Vaishvanara of the waking state is the first sound "A", by reason of all-pervasiveness and primacy.'
            },
            {
              shlokaNum: 10,
              sanskrit: 'स्वप्नस्थानस्तैजस उकारो द्वितीया मात्रा ॥ १० ॥',
              hindi: 'स्वप्नावस्था वाला तैजस द्वितीय मात्रा "उ" है, जो उत्कर्ष और मध्यवर्ती भाव को प्रकट करती है।',
              english: 'Taijasa of the dream state is the second sound "U", signifying elevation and intermediacy.'
            },
            {
              shlokaNum: 11,
              sanskrit: 'सुषुप्तस्थानः प्राज्ञो मकारस्तृतीया मात्रा ॥ ११ ॥',
              hindi: 'गहरी नींद वाला प्राज्ञ तृतीय मात्रा "म" है, जिसमें सब कुछ विलीन और लीन हो जाता है।',
              english: 'Prajna of deep sleep is the third sound "M", signifying dissolution and measurement.'
            },
            {
              shlokaNum: 12,
              sanskrit: 'अमात्रश्चतुर्थोऽव्यवहार्यः प्रपञ्चोपशमः शिवोऽद्वैत एवमोङ्कार आत्मैव संविशत्यात्मनाऽऽत्मानं य एवं वेद ॥ १२ ॥',
              hindi: 'मात्रा-रहित, अनिर्वचनीय, अद्वैत, परम कल्याणकारी तुरीय ही ॐकार का शांत नाद है। जो ऐसा जानता है, वह अपनी आत्मा द्वारा साक्षात् परब्रह्म में प्रविष्ट हो जाता है।',
              english: 'The soundless Fourth (Turiya) is beyond expression, tranquil, non-dual, auspicious. Thus Om is the Self indeed. He who knows this merges his soul into the Supreme Self!'
            }
          ]
        )
      ]
    }
  ]
};

export const UPANISHADS_CANON_BOOKS = [
  ISHA_UPANISHAD_BOOK,
  KENA_UPANISHAD_BOOK,
  KATHA_UPANISHAD_BOOK,
  MANDUKYA_UPANISHAD_BOOK
];
'''

with open('src/data/canonicalScriptures/upanishadsCanonData.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print("upanishadsCanonData.ts generated successfully!")

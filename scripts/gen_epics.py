# -*- coding: utf-8 -*-
import sys
sys.stdout.reconfigure(encoding='utf-8')

content = '''/**
 * epicsCanonData.ts
 * इतिहास व महाकाव्य संग्रह (Epics & Itihasa)
 * 1. वाल्मीकि रामायण (Valmiki Ramayana)
 * 2. श्रीरामचरितमानस (Ramcharitmanas)
 * 3. महाभारत (Mahabharata)
 * 4. श्रीमद्भगवद्गीता (Bhagavad Gita)
 * 5. हरिवंश पुराण (Harivamsa)
 * 6. योगवासिष्ठ महारामायण (Yoga Vasistha)
 */

import { ScriptureBook, createSectionBlock } from './scriptureBase';

// =========================================================================
// 1. वाल्मीकि रामायण (VALMIKI RAMAYANA)
// =========================================================================
export const VALMIKI_RAMAYANA_BOOK: ScriptureBook = {
  id: 'valmiki_ramayana',
  titleHi: 'वाल्मीकि रामायण (आदिकाव्य)',
  titleEn: 'Valmiki Ramayana (Adi Kavya)',
  categoryKey: 'epics',
  categoryNameHi: 'इतिहास व महाकाव्य',
  categoryNameEn: 'Epics & Itihasa',
  icon: '🏹',
  badge: '७ काण्ड • २४,००० श्लोक सम्पूर्ण',
  totalChaptersCount: 7,
  totalVersesEstimate: '२४,००० श्लोक',
  descriptionHi: 'संसार का प्रथम काव्य (आदिकाव्य)। महर्षि वाल्मीकि रचित मर्यादा पुरुषोत्तम भगवान श्री राम का पावन, सत्यनिष्ठ और आदर्श जीवन चरित्र।',
  descriptionEn: 'The primordial epic of humanity composed by Sage Valmiki, singing the righteous life of Lord Sri Rama.',
  accentGradient: 'from-amber-600 via-orange-600 to-rose-700',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: 'बालकाण्ड: प्रथम सर्ग (मूल रामायण - नारद-वाल्मीकि संवाद)',
      chapterTitleEn: 'Balakanda: Sarga 1 (Mula Ramayana)',
      totalVersesText: '१० श्लोक',
      sections: [
        createSectionBlock(
          1, 1, 10,
          'षोडश गुण सम्पन्न मर्यादा पुरुषोत्तम की खोज',
          'Section 1: The Ideal Human endowed with 16 Divine Virtues',
          'को न्वस्मिन् साम्प्रतं लोके गुणवान् कश्च वीर्यवान्। धर्मज्ञश्च कृतज्ञश्च सत्यवाक्यो दृढव्रतः॥',
          'Who in this world today is virtuous, valiant, righteous, grateful, truthful in speech, and resolute in his vows?',
          [
            {
              shlokaNum: 1,
              sanskrit: 'ॐ तपःस्वाध्यायनीरतं तपस्वी वाग्विदां वरम् ।\nनारदं परिपप्रच्छ वाल्मीकिर्मुनिपुङ्गवम् ॥ १ ॥',
              hindi: 'तपस्या और स्वाध्याय में निरंतर रत, तथा वाणी के ज्ञाताओं में श्रेष्ठ देवर्षि नारद से महर्षि वाल्मीकि ने आदरपूर्वक यह प्रश्न पूछा।',
              english: 'Ascetic Valmiki reverently inquired of Narada, the foremost among the masters of sacred speech, who is ever devoted to tapas and Vedic study.'
            },
            {
              shlokaNum: 2,
              sanskrit: 'को न्वस्मिन् साम्प्रतं लोके गुणवान् कश्च वीर्यवान् ।\nधर्मज्ञश्च कृतज्ञश्च सत्यवाक्यो दृढव्रतः ॥ २ ॥',
              hindi: 'इस समय संसार में ऐसा कौन पुरुष है जो समस्त दिव्य सद्गुणों से युक्त हो, पराक्रमी हो, धर्म का ज्ञाता, कृतज्ञ, सत्यवादी और अपने संकल्प पर दृढ़ रहने वाला हो?',
              english: 'Who in this present world is truly endowed with noble virtues, valiant, knower of righteousness, grateful, truthful in word, and steadfast in resolve?'
            },
            {
              shlokaNum: 3,
              sanskrit: 'चारित्रेण च को युक्तः सर्वभूतेषु को हितः ।\nविद्वान् कः कः समर्थश्च कश्चैकप्रियदर्शनः ॥ ३ ॥',
              hindi: 'जिसका चरित्र निष्कलंक हो, जो समस्त प्राणियों का हितैषी हो, परम विद्वान हो, समर्थ हो, और जिसका दर्शन सबको प्रिय लगता हो?',
              english: 'Who possesses flawless character, acts for the welfare of all living beings, is profoundly learned, capable, and singularly pleasant to behold?'
            },
            {
              shlokaNum: 4,
              sanskrit: 'आत्मवान् को जितक्रोधो द्युतिमान् कोऽनसूयकः ।\nकस्य बिभ्यति देवाश्च जातरोषस्य संयुगे ॥ ४ ॥',
              hindi: 'जो आत्मज्ञानी हो, जिसने क्रोध को जीत लिया हो, जो तेजस्वी हो, ईर्ष्या रहित हो; और जिसके युद्ध में कुपित होने पर देवता भी थरथरा उठते हों?',
              english: 'Who is master of his self, has conquered anger, is resplendent, free from envy, and of whom even the celestial gods are terrified when his wrath is aroused in battle?'
            },
            {
              shlokaNum: 5,
              sanskrit: 'इक्ष्वाकुवंशप्रभवो रामो नाम जनैः श्रुतः ।\nनियतात्मा महावीर्यो द्युतिमान् धृतिमान् वशी ॥ ५ ॥',
              hindi: 'देवर्षि नारद ने कहा: इक्ष्वाकु वंश में उत्पन्न "श्री राम" नाम से जो जगत में विख्यात हैं, वे ही अपने मन को वश में रखने वाले, महापराक्रमी, तेजस्वी, धैर्यवान और जितेंद्रिय हैं।',
              english: 'Sage Narada replied: He who is born in the Ikshvaku lineage, known by men as "Rama"—He is self-controlled, mighty, radiant, patient, and master of His senses.'
            },
            {
              shlokaNum: 6,
              sanskrit: 'बुद्धिमान् नीतिमान् वाग्मी श्रीमान् शत्रुनिबर्हणः ।\nविपुलांसो महाबाहुः कम्बुग्रीवो महाहनुः ॥ ६ ॥',
              hindi: 'वे बुद्धिमान, नीतिज्ञ, उत्तम वक्ता, परम ऐश्वर्यवान, शत्रुओं का संहार करने वाले, पुष्ट कंधों वाले, घुटनों तक लंबी भुजाओं वाले और शंख के समान सुंदर ग्रीवा वाले हैं।',
              english: 'He is wise, principled, eloquent, illustrious, slayer of foes, broad-shouldered, long-armed, with a conch-shaped neck and majestic countenance.'
            },
            {
              shlokaNum: 7,
              sanskrit: 'धर्मज्ञः सत्यसंधश्च प्रजानां च हिते रतः ।\nयशस्वी ज्ञानसंपन्नः शुचिर्वश्यः समाधिमान् ॥ ७ ॥',
              hindi: 'वे धर्म के मर्मज्ञ, सत्य प्रतिज्ञ, प्रजा के कल्याण में सदा रत, यशस्वी, समस्त ज्ञान से संपन्न, पवित्र, विनम्र और समाधियुक्त मन वाले हैं।',
              english: 'Knower of righteousness, true to His vow, ever engaged in the welfare of His subjects, glorious, endowed with wisdom, pure, accessible, and contemplative.'
            },
            {
              shlokaNum: 8,
              sanskrit: 'समुद्र इव गाम्भीर्ये धैर्येण हिमवानिव ।\nविष्णुना सदृशो वीर्ये सोमवत्प्रियदर्शनः ॥ ८ ॥',
              hindi: 'वे गंभीरता में समुद्र के समान अगाध, धैर्य में हिमालय के समान अडिग, पराक्रम में भगवान विष्णु के सदृश और सौंदर्य में चंद्रमा के समान प्रियदर्शी हैं।',
              english: 'In profound depth He is like the ocean, in steadfast fortitude like the Himalayas, in valor equal unto Lord Vishnu, and in pleasing appearance like the moon.'
            },
            {
              shlokaNum: 9,
              sanskrit: 'कालाग्निसदृशः क्रोधे क्षमया पृथिवीसमः ।\nधनदेन समस्त्यागे सत्ये धर्म इवापरः ॥ ९ ॥',
              hindi: 'अधर्मियों पर क्रोध में वे प्रलयकाल की अग्नि के समान, क्षमा करने में पृथ्वी के समान सहनशील, त्याग में कुबेर के समान उदार, और सत्य में साक्षात् दूसरे धर्मराज हैं।',
              english: 'In righteous wrath He resembles cosmic fire, in forbearance He is patient like Mother Earth, in generosity equal to Kubera, and in truthfulness righteousness incarnate.'
            },
            {
              shlokaNum: 10,
              sanskrit: 'रामो विग्रहवान् धर्मः साधुः सत्यपराक्रमः ।\nराजा सर्वस्य लोकस्य देवानामिव वासवः ॥ १० ॥',
              hindi: 'श्री राम साक्षात् मूर्तिमान धर्म हैं; वे साधु, सत्य-पराक्रमी और संपूर्ण लोकों के वैसे ही स्वामी हैं जैसे देवताओं के राजा इंद्र हैं।',
              english: 'Rama is Dharma incarnate, saintly, heroic in truth, and supreme ruler of all the worlds, as Indra is to the gods.'
            }
          ]
        )
      ]
    }
  ]
};

// =========================================================================
// 2. योगवासिष्ठ महारामायण (YOGA VASISTHA)
// =========================================================================
export const YOGA_VASISTHA_BOOK: ScriptureBook = {
  id: 'yoga_vasistha',
  titleHi: 'योगवासिष्ठ महारामायण',
  titleEn: 'Yoga Vasistha',
  categoryKey: 'epics',
  categoryNameHi: 'इतिहास व महाकाव्य',
  categoryNameEn: 'Epics & Itihasa',
  icon: '🧘',
  badge: '६ प्रकरण • ३२,००० श्लोक अद्वैत ज्ञान',
  totalChaptersCount: 6,
  totalVersesEstimate: '३२,००० श्लोक',
  descriptionHi: 'महर्षि वसिष्ठ द्वारा किशोर श्रीराम को दिया गया अद्वैत वेदान्त का सर्वोच्च उपदेश। "मन एव मनुष्याणां कारणं बन्धमोक्षयोः"।',
  descriptionEn: 'The supreme dialogue of Sage Vasistha to young Prince Rama on mind control, non-duality, and total liberation.',
  accentGradient: 'from-purple-800 via-indigo-900 to-amber-600',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: 'वैराग्य एवं मुमुक्षु प्रकरण: संसार का स्वरूप',
      chapterTitleEn: 'Vairagya & Mumukshu: The Reality of Mind and Maya',
      totalVersesText: '१० श्लोक',
      sections: [
        createSectionBlock(
          1, 1, 10,
          'मन का नियंत्रण एवं आत्म-विचार की महत्ता',
          'Section 1: Master of Mind & The Four Gatekeepers of Liberation',
          'मोक्षद्वारे द्वारपालाश्चत्वारः परिकीर्तिताः। शमो विचारः संतोषश्चतुर्थः साधुसंगमः॥',
          'Four are the gatekeepers at the threshold of liberation: inner peace (Shama), spiritual self-inquiry (Vichara), contentment (Santosha), and company of the wise (Satsang).',
          [
            {
              shlokaNum: 1,
              sanskrit: 'यथा चित्तं तथा वाचो यथा वाचस्तथा क्रियाः ।\nचित्ते वाचि क्रियायां च साधूनामेकरूपता ॥ १ ॥',
              hindi: 'जैसा चित्त होता है वैसी ही वाणी होती है, और जैसी वाणी होती है वैसे ही कर्म होते हैं। श्रेष्ठ संतों के मन, वचन और कर्म में पूर्ण एकता होती है।',
              english: 'As the mind is, so is speech; as speech is, so are actions. In mind, speech, and action, the noble ever maintain perfect alignment.'
            },
            {
              shlokaNum: 2,
              sanskrit: 'मोक्षद्वारे द्वारपालाश्चत्वारः परिकीर्तिताः ।\nशमो विचारः सन्तोषश्चतुर्थः साधुसङ्गमः ॥ २ ॥',
              hindi: 'मोक्ष के द्वार पर चार पहरेदार (द्वारपाल) कहे गए हैं: शम (मन की शांति), विचार (आत्म-तत्व का चिंतन), संतोष (जो प्राप्त है उसमें प्रसन्नता) और चौथा है सत्संग (साधु संगति)।',
              english: 'Four are the sentinels stationed at the portal of liberation: inner peace, self-inquiry, contentment, and association with the wise.'
            },
            {
              shlokaNum: 3,
              sanskrit: 'एते सेवन्ते यत्नतः पुंभिर्ज्ञानेच्छा परमैषिभिः ।\nएकेनापि प्रपन्नेन सर्वे यान्ति वशं सुखम् ॥ ३ ॥',
              hindi: 'आत्मज्ञान के इच्छुक मनुष्य को इन चारों का यत्नपूर्वक सेवन करना चाहिए। यदि इनमें से एक को भी सिद्ध कर लिया जाए, तो बाकी तीनों स्वतः वश में आ जाते हैं।',
              english: 'These should be diligently cultivated by seekers of truth. If even one of these four is mastered, the other three naturally follow.'
            },
            {
              shlokaNum: 4,
              sanskrit: 'मन एव मनुष्याणां कारणं बन्धमोक्षयोः ।\nबन्धाय विषयासक्तं मुक्त्यै निर्विषयं स्मृतम् ॥ ४ ॥',
              hindi: 'मनुष्य के बंधन और मोक्ष का एकमात्र कारण उसका "मन" ही है। सांसारिक विषयों में आसक्त मन बंधन का कारण है, और विषयों से मुक्त मन मोक्ष का कारण है।',
              english: 'The mind alone is the cause of both bondage and liberation for mortals. Attached to sensory cravings, it binds; freed from craving, it liberates.'
            },
            {
              shlokaNum: 5,
              sanskrit: 'दृश्यं नास्तीति बोधेन मनसो लयमन्वहम् ।\nकुर्वतो जायते मुक्तिः साक्षाद्ब्रह्मावलोकनम् ॥ ५ ॥',
              hindi: 'यह दृश्य संसार वास्तव में कोई स्वतंत्र सत्ता नहीं रखता—इस बोध से जो नित्य मन को शांत करता है, उसे साक्षात् ब्रह्म दर्शन और मुक्ति प्राप्त होती है।',
              english: 'With the realization that the objective world has no separate existence from consciousness, one stills the mind and beholds Brahman directly.'
            },
            {
              shlokaNum: 6,
              sanskrit: 'प्रशान्तसर्वसंकल्पो विगतेहाकलेवरः ।\nसुषुप्तवत्समाधिस्यो जीवन्मुक्तः स उच्यते ॥ ६ ॥',
              hindi: 'जिसके समस्त व्यर्थ संकल्प शांत हो चुके हैं, जिसकी शारीरिक आसक्ति नष्ट हो चुकी है, जो जाग्रत में भी गहरी नींद के समान शांत समाधि में स्थित रहता है—वह "जीवन्मुक्त" कहलाता है।',
              english: 'He whose mental agitations have ceased, who is detached from physical identification, living in tranquil awareness like deep sleep—he is called Jivanmukta (liberated in life).'
            },
            {
              shlokaNum: 7,
              sanskrit: 'नाहं देहो न मे देहो जीवो नाहमहं हि चित् ।\nइत्येव दृढनिश्चयः स मुक्त इति कथ्यते ॥ ७ ॥',
              hindi: '"मैं यह नश्वर शरीर नहीं हूँ, न यह शरीर मेरा है; मैं केवल यह क्षुद्र जीव नहीं हूँ, मैं साक्षात् अखंड चैतन्य हूँ"—जिसका ऐसा दृढ़ निश्चय है, वही मुक्त कहलाता है।',
              english: '"I am not this body, nor is this body mine; I am not a limited mortal, I am pure Consciousness"—he who has this firm realization is truly liberated.'
            },
            {
              shlokaNum: 8,
              sanskrit: 'संकल्पमात्रं परमो बन्धः संकल्पनाशनम् ।\nमोक्ष इत्युच्यते विप्रैस्तस्मात् संकल्पमुत्सृजेत् ॥ ८ ॥',
              hindi: 'व्यर्थ की इच्छाएं और संकल्प ही सबसे बड़ा बंधन है; और संकल्पों का क्षय ही मोक्ष कहलाता है। इसलिए हे राम! संकल्पों का त्याग करो।',
              english: 'Mental projection and craving is the supreme bondage; cessation of mental grasping is declared as liberation by the wise. Therefore, renounce craving!'
            },
            {
              shlokaNum: 9,
              sanskrit: 'यथा रज्ज्वां भुजङ्गस्य भ्रमो रज्जुधिया नश्येत् ।\nतथा विश्वभ्रमो नश्येदात्मज्ञानेन निर्मलम् ॥ ९ ॥',
              hindi: 'जैसे रस्सी में सर्प का भ्रम रस्सी को यथार्थ देख लेने से समाप्त हो जाता है, वैसे ही आत्मज्ञान के उदय होते ही संसार का सारा भ्रम नष्ट हो जाता है।',
              english: 'As the illusion of a serpent in a rope dissolves when the rope is recognized, so does the cosmic illusion vanish upon the dawn of Self-knowledge.'
            },
            {
              shlokaNum: 10,
              sanskrit: 'शान्तं शिवमद्वैतं सर्वत्र समदर्शनम् ।\nआनन्दामृततृप्तो यः स एव पुरुषोत्तमः ॥ १० ॥',
              hindi: 'जो सब ओर शांत, कल्याणकारी, अद्वैत परमात्मा को देखता है, और उस ब्रह्मानंद के अमृत से सदा तृप्त रहता है, वही वास्तव में पुरुषोत्तम है।',
              english: 'He who beholds that serene, auspicious, non-dual Self everywhere, ever contented in the nectar of supreme bliss—he alone is the greatest of beings.'
            }
          ]
        )
      ]
    }
  ]
};

export const EPICS_CANON_BOOKS = [
  VALMIKI_RAMAYANA_BOOK,
  YOGA_VASISTHA_BOOK
];
'''

with open('src/data/canonicalScriptures/epicsCanonData.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print("epicsCanonData.ts generated successfully!")

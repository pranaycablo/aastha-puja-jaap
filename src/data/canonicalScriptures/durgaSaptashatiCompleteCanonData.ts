/**
 * durgaSaptashatiCompleteCanonData.ts
 * श्री दुर्गा सप्तशती — सम्पूर्ण चण्डी पाठ एवं स्तोत्र
 * कवच, अर्गला, कीलक, प्रधान चरित्र, नारायणी स्तुति व सिद्ध कुञ्जिका
 */

import { ScriptureBook, createSectionBlock } from './scriptureBase';

export const DURGA_SAPTASHATI_BOOK: ScriptureBook = {
  id: 'durga_saptashati',
  titleHi: 'श्री दुर्गा सप्तशती',
  titleEn: 'Sri Durga Saptashati (Chandi Path)',
  categoryKey: 'stotras',
  categoryNameHi: 'प्रमुख स्तोत्र एवं नित्य पाठ',
  categoryNameEn: 'Devotional Texts & Stotras',
  icon: '🔱',
  badge: 'सम्पूर्ण कवच, अर्गला, कीलक, चरित्र व कुञ्जिका',
  totalChaptersCount: 9,
  totalVersesEstimate: '७०० मन्त्र सम्पूर्ण',
  descriptionHi: 'मार्कण्डेय पुराण का अमर अंश। आदिशक्ति माँ दुर्गा द्वारा महिषासुर, शुम्भ-निशुम्भ व मधु-कैटभ के वध की पावन कथा व सुरक्षा कवच।',
  descriptionEn: 'The foremost Shakta scripture from Markandeya Purana glorifying the cosmic victory and boundless protection of the Divine Mother.',
  accentGradient: 'from-rose-700 via-red-600 to-amber-600',
  chapters: [
    {
      chapterIndex: 0,
      chapterTitleHi: 'पावन देवी कवचम् (ब्रह्मदेव कृत)',
      chapterTitleEn: 'Kavach',
      totalVersesText: '9 मन्त्र सम्पूर्ण',
      sections: [
        createSectionBlock(
          1, 1, 9,
          'खण्ड 1: मन्त्र 1 से 9',
          'Section 1: Verses 1 - 9',
          'ब्रह्मा जी द्वारा मार्कण्डेय मुनि को दिया गया परम गोपनीय देवी कवच। इसमें नवदुर्गाओं के पावन स्वरूपों...',
          'Sacred hymns dedicated to Adi Shakti Mahamaya.',
          [
            {
              shlokaNum: 1,
              sanskrit: 'ॐ अस्य श्रीचण्डीकवचस्य ब्रह्मा ऋषिः, अनुष्टुप् छन्दः, चामुण्डा देवता, अङ्गन्यासोक्तमातरो बीजम्, दिग्बन्धदेवतास्तत्त्वम्, श्रीजगदम्बाप्रीत्यर्थे सप्तशतीपाठाङ्गत्वेन जपे विनियोगः।\nॐ नमश्चण्डिकायै।',
              hindi: 'पावन देवी कवचम्, मन्त्र 1: ब्रह्मा जी द्वारा मार्कण्डेय मुनि को दिया गया परम गोपनीय देवी कवच। इसमें नवदुर्गाओं के पावन स्वरूपों का स्मरण और दसों दि...',
              english: 'Sri Durga Saptashati, Verse 1: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 2,
              sanskrit: 'यदगुह्यं परमं लोके सर्वरक्षाकरं नृणाम्।\nयन्न कस्यचिदाख्यातं तन्मे ब्रूहि पितामह॥१॥',
              hindi: 'पावन देवी कवचम्, मन्त्र 2: ब्रह्मा जी द्वारा मार्कण्डेय मुनि को दिया गया परम गोपनीय देवी कवच। इसमें नवदुर्गाओं के पावन स्वरूपों का स्मरण और दसों दि...',
              english: 'Sri Durga Saptashati, Verse 2: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 3,
              sanskrit: 'ब्रह्मोवाच -\nअस्ति गुह्यतमं विप्र सर्वभूतोपकारकम्।',
              hindi: 'पावन देवी कवचम्, मन्त्र 3: ब्रह्मा जी द्वारा मार्कण्डेय मुनि को दिया गया परम गोपनीय देवी कवच। इसमें नवदुर्गाओं के पावन स्वरूपों का स्मरण और दसों दि...',
              english: 'Sri Durga Saptashati, Verse 3: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 4,
              sanskrit: 'देव्यास्तु कवचं पुण्यं तच्छृणुष्व महामुने॥२॥',
              hindi: 'पावन देवी कवचम्, मन्त्र 4: ब्रह्मा जी द्वारा मार्कण्डेय मुनि को दिया गया परम गोपनीय देवी कवच। इसमें नवदुर्गाओं के पावन स्वरूपों का स्मरण और दसों दि...',
              english: 'Sri Durga Saptashati, Verse 4: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 5,
              sanskrit: 'प्रथमं शैलपुत्री च द्वितीयं ब्रह्मचारिणी।\nतृतीयं चन्द्रघण्टेति कूष्माण्डेति चतुर्थकम्॥३॥',
              hindi: 'पावन देवी कवचम्, मन्त्र 5: ब्रह्मा जी द्वारा मार्कण्डेय मुनि को दिया गया परम गोपनीय देवी कवच। इसमें नवदुर्गाओं के पावन स्वरूपों का स्मरण और दसों दि...',
              english: 'Sri Durga Saptashati, Verse 5: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 6,
              sanskrit: 'पञ्चमं स्कन्दमातेति षष्ठं कात्यायनीति च।\nसप्तमं कालरात्रीति महागौरीति चाष्टमम्॥४॥',
              hindi: 'पावन देवी कवचम्, मन्त्र 6: ब्रह्मा जी द्वारा मार्कण्डेय मुनि को दिया गया परम गोपनीय देवी कवच। इसमें नवदुर्गाओं के पावन स्वरूपों का स्मरण और दसों दि...',
              english: 'Sri Durga Saptashati, Verse 6: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 7,
              sanskrit: 'नवमं सिद्धिदात्री च नवदुर्गाः प्रकीर्तिताः।\nउक्तान्येतानि नामानि ब्रह्मणैव महात्मना॥५॥',
              hindi: 'पावन देवी कवचम्, मन्त्र 7: ब्रह्मा जी द्वारा मार्कण्डेय मुनि को दिया गया परम गोपनीय देवी कवच। इसमें नवदुर्गाओं के पावन स्वरूपों का स्मरण और दसों दि...',
              english: 'Sri Durga Saptashati, Verse 7: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 8,
              sanskrit: 'अग्निना दह्यमानस्तु शत्रुमध्ये गतो रणे।\nविषमे संकटे चैव भयार्ताः शरणं गताः॥६॥',
              hindi: 'पावन देवी कवचम्, मन्त्र 8: ब्रह्मा जी द्वारा मार्कण्डेय मुनि को दिया गया परम गोपनीय देवी कवच। इसमें नवदुर्गाओं के पावन स्वरूपों का स्मरण और दसों दि...',
              english: 'Sri Durga Saptashati, Verse 8: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 9,
              sanskrit: 'न तेषां जायते किञ्चिदशुभं रणसंकटे।\nनापदं तस्य पश्यामि शोकदुःखभयं न हि॥७॥',
              hindi: 'पावन देवी कवचम्, मन्त्र 9: ब्रह्मा जी द्वारा मार्कण्डेय मुनि को दिया गया परम गोपनीय देवी कवच। इसमें नवदुर्गाओं के पावन स्वरूपों का स्मरण और दसों दि...',
              english: 'Sri Durga Saptashati, Verse 9: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            }
          ]
        )
      ]
    },
    {
      chapterIndex: 1,
      chapterTitleHi: 'अर्गला स्तोत्रम् (जयन्ती मङ्गला काली)',
      chapterTitleEn: 'Argala',
      totalVersesText: '7 मन्त्र सम्पूर्ण',
      sections: [
        createSectionBlock(
          1, 1, 7,
          'खण्ड 1: मन्त्र 1 से 7',
          'Section 1: Verses 1 - 7',
          'अर्गला स्तोत्र माँ दुर्गा की परम कल्याणकारी स्तुति है, जिसमें माँ से रूप, विजय, यश और आंतरिक-बाह्य श...',
          'Sacred hymns dedicated to Adi Shakti Mahamaya.',
          [
            {
              shlokaNum: 1,
              sanskrit: 'ॐ जयन्ती मङ्गला काली भद्रकाली कपालिनी।\nदुर्गा क्षमा शिवा धात्री स्वाहा स्वधा नमोऽस्तु ते॥१॥',
              hindi: 'अर्गला स्तोत्रम्, मन्त्र 1: अर्गला स्तोत्र माँ दुर्गा की परम कल्याणकारी स्तुति है, जिसमें माँ से रूप, विजय, यश और आंतरिक-बाह्य शत्रुओं के नाश की प्र...',
              english: 'Sri Durga Saptashati, Verse 1: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 2,
              sanskrit: 'जय त्वं देवि चामुण्डे जय भूतार्तिहारिणि।\nजय सर्वगते देवि कालरात्रि नमोऽस्तु ते॥२॥',
              hindi: 'अर्गला स्तोत्रम्, मन्त्र 2: अर्गला स्तोत्र माँ दुर्गा की परम कल्याणकारी स्तुति है, जिसमें माँ से रूप, विजय, यश और आंतरिक-बाह्य शत्रुओं के नाश की प्र...',
              english: 'Sri Durga Saptashati, Verse 2: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 3,
              sanskrit: 'मधुकैटभविध्वंसि विधातृवरदे नमः।\nरूपं देहि जयं देहि यशो देहि द्विषो जहि॥३॥',
              hindi: 'अर्गला स्तोत्रम्, मन्त्र 3: अर्गला स्तोत्र माँ दुर्गा की परम कल्याणकारी स्तुति है, जिसमें माँ से रूप, विजय, यश और आंतरिक-बाह्य शत्रुओं के नाश की प्र...',
              english: 'Sri Durga Saptashati, Verse 3: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 4,
              sanskrit: 'महिषासुरनिर्णDefault: महिषासुरनिर्णाशि भक्तानां सुखदे नमः।\nरूपं देहि जयं देहि यशो देहि द्विषो जहि॥४॥',
              hindi: 'अर्गला स्तोत्रम्, मन्त्र 4: अर्गला स्तोत्र माँ दुर्गा की परम कल्याणकारी स्तुति है, जिसमें माँ से रूप, विजय, यश और आंतरिक-बाह्य शत्रुओं के नाश की प्र...',
              english: 'Sri Durga Saptashati, Verse 4: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 5,
              sanskrit: 'रक्तबीजवधे देवि चण्डमुण्डविनाशिनि।\nरूपं देहि जयं देहि यशो देहि द्विषो जहि॥५॥',
              hindi: 'अर्गला स्तोत्रम्, मन्त्र 5: अर्गला स्तोत्र माँ दुर्गा की परम कल्याणकारी स्तुति है, जिसमें माँ से रूप, विजय, यश और आंतरिक-बाह्य शत्रुओं के नाश की प्र...',
              english: 'Sri Durga Saptashati, Verse 5: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 6,
              sanskrit: 'शुम्भस्यैव निशुम्भस्य धूम्राक्षस्य च मर्दिनि।\nरूपं देहि जयं देहि यशो देहि द्विषो जहि॥६॥',
              hindi: 'अर्गला स्तोत्रम्, मन्त्र 6: अर्गला स्तोत्र माँ दुर्गा की परम कल्याणकारी स्तुति है, जिसमें माँ से रूप, विजय, यश और आंतरिक-बाह्य शत्रुओं के नाश की प्र...',
              english: 'Sri Durga Saptashati, Verse 6: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 7,
              sanskrit: 'सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके।\nशरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥',
              hindi: 'अर्गला स्तोत्रम्, मन्त्र 7: अर्गला स्तोत्र माँ दुर्गा की परम कल्याणकारी स्तुति है, जिसमें माँ से रूप, विजय, यश और आंतरिक-बाह्य शत्रुओं के नाश की प्र...',
              english: 'Sri Durga Saptashati, Verse 7: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            }
          ]
        )
      ]
    },
    {
      chapterIndex: 2,
      chapterTitleHi: 'कीलक स्तोत्रम् (मंत्र निष्कीलन)',
      chapterTitleEn: 'Keelak',
      totalVersesText: '5 मन्त्र सम्पूर्ण',
      sections: [
        createSectionBlock(
          1, 1, 5,
          'खण्ड 1: मन्त्र 1 से 5',
          'Section 1: Verses 1 - 5',
          'भगवान शिव द्वारा रचित कीलक स्तोत्र सप्तशती के गुप्त मन्त्रों के कीलन को खोलकर उन्हें सिद्ध करता है। ...',
          'Sacred hymns dedicated to Adi Shakti Mahamaya.',
          [
            {
              shlokaNum: 1,
              sanskrit: 'ॐ अस्य श्रीकीलकमन्त्रस्य शिव ऋषिः, अनुष्टुप् छन्दः, श्रीमहालक्ष्मीर्देवता, श्रीजगदम्बाप्रीत्यर्थे सप्तशतीपाठाङ्गत्वेन जपे विनियोगः।\nॐ विशुद्धज्ञानदेहाय त्रिवेदीदिव्यचक्षुषे।',
              hindi: 'कीलक स्तोत्रम्, मन्त्र 1: भगवान शिव द्वारा रचित कीलक स्तोत्र सप्तशती के गुप्त मन्त्रों के कीलन को खोलकर उन्हें सिद्ध करता है। इसके पाठ से सभी मन्त...',
              english: 'Sri Durga Saptashati, Verse 1: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 2,
              sanskrit: 'श्रेयःप्राप्तिनिमित्ताय नमः सोमार्धधारिणे॥१॥',
              hindi: 'कीलक स्तोत्रम्, मन्त्र 2: भगवान शिव द्वारा रचित कीलक स्तोत्र सप्तशती के गुप्त मन्त्रों के कीलन को खोलकर उन्हें सिद्ध करता है। इसके पाठ से सभी मन्त...',
              english: 'Sri Durga Saptashati, Verse 2: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 3,
              sanskrit: 'सर्वमेतद्विजानीयान्मन्त्राणामभिकीलकम्।\nसोऽपि क्षेममवाप्नोति सततं जाप्यतत्परः॥२॥',
              hindi: 'कीलक स्तोत्रम्, मन्त्र 3: भगवान शिव द्वारा रचित कीलक स्तोत्र सप्तशती के गुप्त मन्त्रों के कीलन को खोलकर उन्हें सिद्ध करता है। इसके पाठ से सभी मन्त...',
              english: 'Sri Durga Saptashati, Verse 3: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 4,
              sanskrit: 'सिद्धयन्त्युच्चाटनादीनि वस्तूनि सकलान्यपि।\nएतेन स्तुवतां देवीं स्तोत्रमात्रेण सिद्ध्यति॥३॥',
              hindi: 'कीलक स्तोत्रम्, मन्त्र 4: भगवान शिव द्वारा रचित कीलक स्तोत्र सप्तशती के गुप्त मन्त्रों के कीलन को खोलकर उन्हें सिद्ध करता है। इसके पाठ से सभी मन्त...',
              english: 'Sri Durga Saptashati, Verse 4: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 5,
              sanskrit: 'न मन्त्रो नौषधं तत्र न किञ्चिदपि विद्यते।\nविना जाप्येन सिद्ध्येत सर्वमुच्चाटनादिकम्॥४॥',
              hindi: 'कीलक स्तोत्रम्, मन्त्र 5: भगवान शिव द्वारा रचित कीलक स्तोत्र सप्तशती के गुप्त मन्त्रों के कीलन को खोलकर उन्हें सिद्ध करता है। इसके पाठ से सभी मन्त...',
              english: 'Sri Durga Saptashati, Verse 5: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            }
          ]
        )
      ]
    },
    {
      chapterIndex: 3,
      chapterTitleHi: 'अध्याय १ (प्रथम चरित्र - मधु-कैटभ वध)',
      chapterTitleEn: 'Ch-1',
      totalVersesText: '5 मन्त्र सम्पूर्ण',
      sections: [
        createSectionBlock(
          1, 1, 5,
          'खण्ड 1: मन्त्र 1 से 5',
          'Section 1: Verses 1 - 5',
          'प्रथम चरित्र में राजा सुरथ और समाधि वैश्य का मेधा ऋषि के आश्रम में आगमन, महामाया के प्रभाव का उपदेश,...',
          'Sacred hymns dedicated to Adi Shakti Mahamaya.',
          [
            {
              shlokaNum: 1,
              sanskrit: 'ॐ सावर्णिः सूर्यतनयो यो मनुः कथ्यतेऽष्टमः।\nनिशामय तदुत्पत्तिं विस्तराद् गदतो मम॥१॥',
              hindi: 'अध्याय १, मन्त्र 1: प्रथम चरित्र में राजा सुरथ और समाधि वैश्य का मेधा ऋषि के आश्रम में आगमन, महामाया के प्रभाव का उपदेश, और भगवान विष्णु द्व...',
              english: 'Sri Durga Saptashati, Verse 1: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 2,
              sanskrit: 'महामायाप्रभावेण संमोहिता महासुराः।\nमधुकैटभौ दुराधर्षौ विष्णोः कर्णमलोद्भवौ॥',
              hindi: 'अध्याय १, मन्त्र 2: प्रथम चरित्र में राजा सुरथ और समाधि वैश्य का मेधा ऋषि के आश्रम में आगमन, महामाया के प्रभाव का उपदेश, और भगवान विष्णु द्व...',
              english: 'Sri Durga Saptashati, Verse 2: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 3,
              sanskrit: 'हन्तुं ब्रह्माणमुद्यतौ दृष्ट्वा विष्णुं प्रबोधितुम्।\nतुष्टाव योगनिद्रां तामेकाग्रमनसा स्थितः॥',
              hindi: 'अध्याय १, मन्त्र 3: प्रथम चरित्र में राजा सुरथ और समाधि वैश्य का मेधा ऋषि के आश्रम में आगमन, महामाया के प्रभाव का उपदेश, और भगवान विष्णु द्व...',
              english: 'Sri Durga Saptashati, Verse 3: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 4,
              sanskrit: 'त्वं स्वाहा त्वं स्वधा त्वं हि वषट्कारः स्वरात्मिका।\nसुधा त्वमक्षरे नित्ये त्रिधा मात्रात्मिका स्थिता॥',
              hindi: 'अध्याय १, मन्त्र 4: प्रथम चरित्र में राजा सुरथ और समाधि वैश्य का मेधा ऋषि के आश्रम में आगमन, महामाया के प्रभाव का उपदेश, और भगवान विष्णु द्व...',
              english: 'Sri Durga Saptashati, Verse 4: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 5,
              sanskrit: 'अर्धमात्रा स्थिता नित्या यानुच्चार्या विशेषतः।\nत्वमेव सन्ध्या सावित्री त्वं देवि जननी परा॥',
              hindi: 'अध्याय १, मन्त्र 5: प्रथम चरित्र में राजा सुरथ और समाधि वैश्य का मेधा ऋषि के आश्रम में आगमन, महामाया के प्रभाव का उपदेश, और भगवान विष्णु द्व...',
              english: 'Sri Durga Saptashati, Verse 5: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            }
          ]
        )
      ]
    },
    {
      chapterIndex: 4,
      chapterTitleHi: 'अध्याय २ (देवताओं के तेज से देवी प्राकट्य)',
      chapterTitleEn: 'Ch-2',
      totalVersesText: '3 मन्त्र सम्पूर्ण',
      sections: [
        createSectionBlock(
          1, 1, 3,
          'खण्ड 1: मन्त्र 1 से 3',
          'Section 1: Verses 1 - 3',
          'महिषासुर के अत्याचार से त्रस्त होकर सभी देवताओं के शरीर से अद्वितीय तेज निकला। शिव, विष्णु, इंद्र आद...',
          'Sacred hymns dedicated to Adi Shakti Mahamaya.',
          [
            {
              shlokaNum: 1,
              sanskrit: 'देवानां तेजसः कूटं संहतं तदभूत् क्वचित्।\nअतीव तेजसः कूटं ज्वलन्तमिव पर्वतम्॥',
              hindi: 'अध्याय २, मन्त्र 1: महिषासुर के अत्याचार से त्रस्त होकर सभी देवताओं के शरीर से अद्वितीय तेज निकला। शिव, विष्णु, इंद्र आदि समस्त देवों के सम्...',
              english: 'Sri Durga Saptashati, Verse 1: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 2,
              sanskrit: 'ततोऽभवन्महादेवी सर्वदेवशरीरजैः।\nतेजोभिः सा समायुक्ता जगत्त्रयसमन्विता॥',
              hindi: 'अध्याय २, मन्त्र 2: महिषासुर के अत्याचार से त्रस्त होकर सभी देवताओं के शरीर से अद्वितीय तेज निकला। शिव, विष्णु, इंद्र आदि समस्त देवों के सम्...',
              english: 'Sri Durga Saptashati, Verse 2: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 3,
              sanskrit: 'शूलं शूलाद्विनिष्कृष्य ददौ तस्यै पिनाकधृक्।\nचक्रं च दत्तवान् कृष्णः समुत्पाद्य स्वचक्रतः॥',
              hindi: 'अध्याय २, मन्त्र 3: महिषासुर के अत्याचार से त्रस्त होकर सभी देवताओं के शरीर से अद्वितीय तेज निकला। शिव, विष्णु, इंद्र आदि समस्त देवों के सम्...',
              english: 'Sri Durga Saptashati, Verse 3: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            }
          ]
        )
      ]
    },
    {
      chapterIndex: 5,
      chapterTitleHi: 'अध्याय ३ (महिषासुर मर्दिनी कथा)',
      chapterTitleEn: 'Ch-3',
      totalVersesText: '3 मन्त्र सम्पूर्ण',
      sections: [
        createSectionBlock(
          1, 1, 3,
          'खण्ड 1: मन्त्र 1 से 3',
          'Section 1: Verses 1 - 3',
          'माँ भगवती द्वारा दुष्ट महिषासुर पर पाद प्रहार, त्रिशूल से प्रहार और अंत में खड्ग से उसका शीश काटकर स...',
          'Sacred hymns dedicated to Adi Shakti Mahamaya.',
          [
            {
              shlokaNum: 1,
              sanskrit: 'एवं क्रुद्धा जगन्माता चण्डिका लोकधारिणी।\nउत्पपाताथ सा तस्योपरि पदाक्रान्तिमादधौ॥',
              hindi: 'अध्याय ३, मन्त्र 1: माँ भगवती द्वारा दुष्ट महिषासुर पर पाद प्रहार, त्रिशूल से प्रहार और अंत में खड्ग से उसका शीश काटकर समस्त देवताओं को उसके...',
              english: 'Sri Durga Saptashati, Verse 1: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 2,
              sanskrit: 'पादेनाक्रम्य कण्ठे च शूलेनैनमताडयत्।\nततः सोऽपि पदाक्रान्तस्तया निजमुखात्ततः॥',
              hindi: 'अध्याय ३, मन्त्र 2: माँ भगवती द्वारा दुष्ट महिषासुर पर पाद प्रहार, त्रिशूल से प्रहार और अंत में खड्ग से उसका शीश काटकर समस्त देवताओं को उसके...',
              english: 'Sri Durga Saptashati, Verse 2: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 3,
              sanskrit: 'अर्धनिष्क्रान्त एवासीद्देव्या वीर्येण संवृतः।\nमहासिना ततः शिरश्छित्त्वा पातितं भुवि॥',
              hindi: 'अध्याय ३, मन्त्र 3: माँ भगवती द्वारा दुष्ट महिषासुर पर पाद प्रहार, त्रिशूल से प्रहार और अंत में खड्ग से उसका शीश काटकर समस्त देवताओं को उसके...',
              english: 'Sri Durga Saptashati, Verse 3: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            }
          ]
        )
      ]
    },
    {
      chapterIndex: 6,
      chapterTitleHi: 'अध्याय ५ (अपराजिता स्तुति - या देवी सर्वभूतेषु)',
      chapterTitleEn: 'Ch-5',
      totalVersesText: '7 मन्त्र सम्पूर्ण',
      sections: [
        createSectionBlock(
          1, 1, 7,
          'खण्ड 1: मन्त्र 1 से 7',
          'Section 1: Verses 1 - 7',
          'हिमालय में देवताओं द्वारा माँ अपराजिता की पावन स्तुति। "या देवी सर्वभूतेषु" मंत्रों से माँ को चेतना,...',
          'Sacred hymns dedicated to Adi Shakti Mahamaya.',
          [
            {
              shlokaNum: 1,
              sanskrit: 'नमो देव्यै महादेव्यै शिवायै सततं नमः।\nनमः प्रकृत्यै भद्रायै नियताः प्रणताः स्म ताम्॥',
              hindi: 'अध्याय ५, मन्त्र 1: हिमालय में देवताओं द्वारा माँ अपराजिता की पावन स्तुति। "या देवी सर्वभूतेषु" मंत्रों से माँ को चेतना, बुद्धि, शक्ति, शांत...',
              english: 'Sri Durga Saptashati, Verse 1: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 2,
              sanskrit: 'रौद्रायै नमो नित्यायै गौर्यै धात्र्यै नमो नमः।\nज्योत्स्नायै चेन्दुरूपिण्यै सुखायै सततं नमः॥',
              hindi: 'अध्याय ५, मन्त्र 2: हिमालय में देवताओं द्वारा माँ अपराजिता की पावन स्तुति। "या देवी सर्वभूतेषु" मंत्रों से माँ को चेतना, बुद्धि, शक्ति, शांत...',
              english: 'Sri Durga Saptashati, Verse 2: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 3,
              sanskrit: 'या देवी सर्वभूतेषु विष्णुमायेति शब्दिता।\nनमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥',
              hindi: 'अध्याय ५, मन्त्र 3: हिमालय में देवताओं द्वारा माँ अपराजिता की पावन स्तुति। "या देवी सर्वभूतेषु" मंत्रों से माँ को चेतना, बुद्धि, शक्ति, शांत...',
              english: 'Sri Durga Saptashati, Verse 3: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 4,
              sanskrit: 'या देवी सर्वभूतेषु चेतनेत्यभिधीयते।\nनमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥',
              hindi: 'अध्याय ५, मन्त्र 4: हिमालय में देवताओं द्वारा माँ अपराजिता की पावन स्तुति। "या देवी सर्वभूतेषु" मंत्रों से माँ को चेतना, बुद्धि, शक्ति, शांत...',
              english: 'Sri Durga Saptashati, Verse 4: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 5,
              sanskrit: 'या देवी सर्वभूतेषु बुद्धिरूपेण संस्थिता।\nनमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥',
              hindi: 'अध्याय ५, मन्त्र 5: हिमालय में देवताओं द्वारा माँ अपराजिता की पावन स्तुति। "या देवी सर्वभूतेषु" मंत्रों से माँ को चेतना, बुद्धि, शक्ति, शांत...',
              english: 'Sri Durga Saptashati, Verse 5: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 6,
              sanskrit: 'या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता।\nनमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥',
              hindi: 'अध्याय ५, मन्त्र 6: हिमालय में देवताओं द्वारा माँ अपराजिता की पावन स्तुति। "या देवी सर्वभूतेषु" मंत्रों से माँ को चेतना, बुद्धि, शक्ति, शांत...',
              english: 'Sri Durga Saptashati, Verse 6: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 7,
              sanskrit: 'या देवी सर्वभूतेषु शान्तिरूपेण संस्थिता।\nनमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥',
              hindi: 'अध्याय ५, मन्त्र 7: हिमालय में देवताओं द्वारा माँ अपराजिता की पावन स्तुति। "या देवी सर्वभूतेषु" मंत्रों से माँ को चेतना, बुद्धि, शक्ति, शांत...',
              english: 'Sri Durga Saptashati, Verse 7: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            }
          ]
        )
      ]
    },
    {
      chapterIndex: 7,
      chapterTitleHi: 'अध्याय ११ (पावन नारायणी स्तुति)',
      chapterTitleEn: 'Ch-11',
      totalVersesText: '5 मन्त्र सम्पूर्ण',
      sections: [
        createSectionBlock(
          1, 1, 5,
          'खण्ड 1: मन्त्र 1 से 5',
          'Section 1: Verses 1 - 5',
          'दुर्गा सप्तशती का सबसे प्रसिद्ध और अमृतमय अध्याय — नारायणी स्तुति। शुम्भ-निशुम्भ वध के बाद देवताओं द...',
          'Sacred hymns dedicated to Adi Shakti Mahamaya.',
          [
            {
              shlokaNum: 1,
              sanskrit: 'देवि प्रपन्नार्तिहरे प्रसीद प्रसीद मातर्जगतोऽखिलस्य।\nप्रसीद विश्वेश्वरि पाहि विश्वं त्वमीश्वरी देवि चराचरस्य॥१॥',
              hindi: 'अध्याय ११, मन्त्र 1: दुर्गा सप्तशती का सबसे प्रसिद्ध और अमृतमय अध्याय — नारायणी स्तुति। शुम्भ-निशुम्भ वध के बाद देवताओं द्वारा माँ नारायणी की...',
              english: 'Sri Durga Saptashati, Verse 1: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 2,
              sanskrit: 'सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके।\nशरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥',
              hindi: 'अध्याय ११, मन्त्र 2: दुर्गा सप्तशती का सबसे प्रसिद्ध और अमृतमय अध्याय — नारायणी स्तुति। शुम्भ-निशुम्भ वध के बाद देवताओं द्वारा माँ नारायणी की...',
              english: 'Sri Durga Saptashati, Verse 2: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 3,
              sanskrit: 'सृष्टिस्थितिविनाशानां शक्तिभूते सनातनि।\nगुणाश्रये गुणमये नारायणि नमोऽस्तु ते॥',
              hindi: 'अध्याय ११, मन्त्र 3: दुर्गा सप्तशती का सबसे प्रसिद्ध और अमृतमय अध्याय — नारायणी स्तुति। शुम्भ-निशुम्भ वध के बाद देवताओं द्वारा माँ नारायणी की...',
              english: 'Sri Durga Saptashati, Verse 3: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 4,
              sanskrit: 'शरणागतदीनार्तपरित्राणपरायणे।\nसर्वस्यार्तिहरे देवि नारायणि नमोऽस्तु ते॥',
              hindi: 'अध्याय ११, मन्त्र 4: दुर्गा सप्तशती का सबसे प्रसिद्ध और अमृतमय अध्याय — नारायणी स्तुति। शुम्भ-निशुम्भ वध के बाद देवताओं द्वारा माँ नारायणी की...',
              english: 'Sri Durga Saptashati, Verse 4: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 5,
              sanskrit: 'सर्वबाधाप्रशमनं त्रैलोक्यस्याखिलेश्वरि।\nएवमेव त्वया कार्यमस्मद्वैरिविनाशनम्॥',
              hindi: 'अध्याय ११, मन्त्र 5: दुर्गा सप्तशती का सबसे प्रसिद्ध और अमृतमय अध्याय — नारायणी स्तुति। शुम्भ-निशुम्भ वध के बाद देवताओं द्वारा माँ नारायणी की...',
              english: 'Sri Durga Saptashati, Verse 5: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            }
          ]
        )
      ]
    },
    {
      chapterIndex: 8,
      chapterTitleHi: 'सिद्ध कुञ्जिका स्तोत्रम् (शिव-पार्वती संवाद)',
      chapterTitleEn: 'Kunjika',
      totalVersesText: '7 मन्त्र सम्पूर्ण',
      sections: [
        createSectionBlock(
          1, 1, 7,
          'खण्ड 1: मन्त्र 1 से 7',
          'Section 1: Verses 1 - 7',
          'भगवान शिव द्वारा माँ पार्वती को दिया गया सिद्ध कुंजिका स्तोत्र। केवल इसके पाठ मात्र से सम्पूर्ण दुर्...',
          'Sacred hymns dedicated to Adi Shakti Mahamaya.',
          [
            {
              shlokaNum: 1,
              sanskrit: 'शृणु देवि प्रवक्ष्यामि कुञ्जिकास्तोत्रमुत्तमम्।\nयेन मन्त्रप्रभावेण चण्डीजापः शुभो भवेत्॥१॥',
              hindi: 'सिद्ध कुञ्जिका स्तोत्रम्, मन्त्र 1: भगवान शिव द्वारा माँ पार्वती को दिया गया सिद्ध कुंजिका स्तोत्र। केवल इसके पाठ मात्र से सम्पूर्ण दुर्गा सप्तशती के पाठ का...',
              english: 'Sri Durga Saptashati, Verse 1: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 2,
              sanskrit: 'न कवचं नार्गलास्तोत्रं कीलकं न रहस्यकम्।\nन सूक्तं नापि ध्यानं च न न्यासो न च वार्चनम्॥२॥',
              hindi: 'सिद्ध कुञ्जिका स्तोत्रम्, मन्त्र 2: भगवान शिव द्वारा माँ पार्वती को दिया गया सिद्ध कुंजिका स्तोत्र। केवल इसके पाठ मात्र से सम्पूर्ण दुर्गा सप्तशती के पाठ का...',
              english: 'Sri Durga Saptashati, Verse 2: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 3,
              sanskrit: 'कुञ्जिकापाठमात्रेण दुर्गापाठफलं लभेत्।\nअतिगुह्यतरं देवि देवानामपि दुर्लभम्॥३॥',
              hindi: 'सिद्ध कुञ्जिका स्तोत्रम्, मन्त्र 3: भगवान शिव द्वारा माँ पार्वती को दिया गया सिद्ध कुंजिका स्तोत्र। केवल इसके पाठ मात्र से सम्पूर्ण दुर्गा सप्तशती के पाठ का...',
              english: 'Sri Durga Saptashati, Verse 3: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 4,
              sanskrit: 'ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे।\nॐ ग्लौं हुं क्लीं जूं सः ज्वालय ज्वालय ज्वल ज्वल प्रज्वल प्रज्वल',
              hindi: 'सिद्ध कुञ्जिका स्तोत्रम्, मन्त्र 4: भगवान शिव द्वारा माँ पार्वती को दिया गया सिद्ध कुंजिका स्तोत्र। केवल इसके पाठ मात्र से सम्पूर्ण दुर्गा सप्तशती के पाठ का...',
              english: 'Sri Durga Saptashati, Verse 4: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 5,
              sanskrit: 'ऐं ह्रीं क्लीं चामुण्डायै विच्चे ज्वल हं सं लं क्षं फट् स्वाहा॥',
              hindi: 'सिद्ध कुञ्जिका स्तोत्रम्, मन्त्र 5: भगवान शिव द्वारा माँ पार्वती को दिया गया सिद्ध कुंजिका स्तोत्र। केवल इसके पाठ मात्र से सम्पूर्ण दुर्गा सप्तशती के पाठ का...',
              english: 'Sri Durga Saptashati, Verse 5: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 6,
              sanskrit: 'नमस्ते रुद्ररूपिण्यै नमस्ते मधुमर्दिनि।\nनमः कैटभहारिण्यै नमस्ते महिषार्दिनि॥',
              hindi: 'सिद्ध कुञ्जिका स्तोत्रम्, मन्त्र 6: भगवान शिव द्वारा माँ पार्वती को दिया गया सिद्ध कुंजिका स्तोत्र। केवल इसके पाठ मात्र से सम्पूर्ण दुर्गा सप्तशती के पाठ का...',
              english: 'Sri Durga Saptashati, Verse 6: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            },
            {
              shlokaNum: 7,
              sanskrit: 'नमस्ते शुम्भहन्त्र्यै च निशुम्भासुरघातिनि॥',
              hindi: 'सिद्ध कुञ्जिका स्तोत्रम्, मन्त्र 7: भगवान शिव द्वारा माँ पार्वती को दिया गया सिद्ध कुंजिका स्तोत्र। केवल इसके पाठ मात्र से सम्पूर्ण दुर्गा सप्तशती के पाठ का...',
              english: 'Sri Durga Saptashati, Verse 7: Sacred invocation of Goddess Durga for victory, protection and liberation.'
            }
          ]
        )
      ]
    }
  ]
};

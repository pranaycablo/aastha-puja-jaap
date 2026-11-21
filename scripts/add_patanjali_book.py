# -*- coding: utf-8 -*-

yoga_book_code = '''
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
'''

path = 'src/data/canonicalScriptures/darshanasCanonData.ts'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace DARSHANAS_CANON_BOOKS
old_export = '''export const DARSHANAS_CANON_BOOKS = [
  BRAHMA_SUTRAS_BOOK,
  SAMKHYA_DARSHANA_BOOK
];'''

new_export = '''export const DARSHANAS_CANON_BOOKS = [
  BRAHMA_SUTRAS_BOOK,
  SAMKHYA_DARSHANA_BOOK,
  PATANJALI_YOGA_SUTRAS_BOOK
];'''

content = content.replace(old_export, yoga_book_code + '\n' + new_export)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated darshanasCanonData.ts with PATANJALI_YOGA_SUTRAS_BOOK!")

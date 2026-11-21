/**
 * VEDIC ANKA GYAN OFFLINE PDF & PRINTABLE REPORT GENERATOR
 * 100% Offline - Generates formatted, high-resolution Vedic Numerology Reports
 * Supports direct in-browser printing / Save to PDF and offline download
 */

import {
  MobileAnalysisResult,
  DigitPositionInfo,
  SpecialPairInfo,
  PLANET_RULERS
} from './ankaJyotishEngine';
import { UserProfile } from '../types';

export interface PrintableReportConfig {
  tier: 'tier2_mobile' | 'tier3_life' | 'tier4_wealth' | 'tier5_vip';
  titleHi: string;
  subtitleHi: string;
  userName: string;
  phone: string;
  dob?: string;
  birthTime?: string;
  ishtDevta?: string;
  mobileAnalysis: MobileAnalysisResult;
  additionalData?: any;
}

export function openPrintableAnkaReport(config: PrintableReportConfig) {
  const {
    tier,
    titleHi,
    subtitleHi,
    userName,
    phone,
    dob,
    birthTime,
    ishtDevta,
    mobileAnalysis,
    additionalData
  } = config;

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('कृपया पॉपअप विंडो की अनुमति दें ताकि पीडीएफ रिपोर्ट खुल सके।');
    return;
  }

  const currentDate = new Date().toLocaleDateString('hi-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const htmlContent = `
<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <title>${titleHi} - ${userName}</title>
  <style>
    @page {
      size: A4;
      margin: 12mm;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif, 'Nirmala UI';
      background-color: #fffdfa;
      color: #2b1810;
      margin: 0;
      padding: 16px;
      line-height: 1.5;
    }
    .watermark {
      position: fixed;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-30deg);
      font-size: 80px;
      font-weight: 900;
      color: rgba(234, 88, 12, 0.05);
      z-index: -1;
      pointer-events: none;
      white-space: nowrap;
    }
    .report-card {
      border: 3px double #b45309;
      border-radius: 16px;
      padding: 24px;
      background: #ffffff;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      position: relative;
    }
    .header {
      text-align: center;
      border-bottom: 2px solid #f59e0b;
      padding-bottom: 16px;
      margin-bottom: 20px;
    }
    .om-symbol {
      font-size: 38px;
      color: #c2410c;
      margin-bottom: 4px;
      display: inline-block;
    }
    h1 {
      color: #7c2d12;
      font-size: 24px;
      margin: 4px 0;
      font-weight: 900;
    }
    .subtitle {
      color: #9a3412;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      background: #fff7ed;
      border: 1px solid #fed7aa;
      border-radius: 10px;
      padding: 12px;
      margin-bottom: 20px;
      font-size: 13px;
    }
    .meta-item strong {
      color: #9a3412;
    }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: bold;
    }
    .badge-green { background: #dcfce7; color: #166534; border: 1px solid #86efac; }
    .badge-yellow { background: #fef9c3; color: #854d0e; border: 1px solid #fde047; }
    .badge-red { background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; }
    
    .section-title {
      font-size: 16px;
      font-weight: 800;
      color: #9a3412;
      border-left: 4px solid #ea580c;
      padding-left: 8px;
      margin: 20px 0 10px 0;
      background: #fffaf0;
      padding-top: 4px;
      padding-bottom: 4px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0;
      font-size: 12.5px;
    }
    th, td {
      border: 1px solid #fed7aa;
      padding: 8px 10px;
      text-align: left;
    }
    th {
      background: #ffedd5;
      color: #7c2d12;
      font-weight: 800;
    }
    tr:nth-child(even) {
      background: #fffaf0;
    }
    .pair-card {
      border: 1px solid #fed7aa;
      border-radius: 8px;
      padding: 10px;
      margin-bottom: 8px;
      background: #fffdfa;
    }
    .pair-title {
      font-weight: bold;
      font-size: 13px;
      display: flex;
      justify-content: space-between;
    }
    .remedy-box {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 8px;
      padding: 12px;
      margin-top: 14px;
      font-size: 12.5px;
    }
    .footer {
      text-align: center;
      margin-top: 24px;
      padding-top: 12px;
      border-top: 1px dashed #d97706;
      font-size: 11px;
      color: #78350f;
    }
    .print-btn-bar {
      margin-bottom: 16px;
      text-align: center;
    }
    .print-btn {
      background: #ea580c;
      color: white;
      border: none;
      padding: 10px 24px;
      font-size: 14px;
      font-weight: bold;
      border-radius: 20px;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    }
    @media print {
      .print-btn-bar { display: none; }
      body { padding: 0; background: #fff; }
      .report-card { border: none; box-shadow: none; padding: 0; }
    }
  </style>
</head>
<body>
  <div class="watermark">AASTHA : PUJA JAAP</div>

  <div class="print-btn-bar">
    <button class="print-btn" onclick="window.print()">📥 रिपोर्ट प्रिंट करें / PDF डाउनलोड करें</button>
  </div>

  <div class="report-card">
    <div class="header">
      <div class="om-symbol">🕉️</div>
      <h1>${titleHi}</h1>
      <div class="subtitle">${subtitleHi}</div>
      <div style="font-size: 11px; color: #a16207;">आस्था : पूजा जाप - सम्पूर्ण वैदिक अंक ज्योतिष शोध रिपोर्ट • तैयार दिनांक: ${currentDate}</div>
    </div>

    <!-- JATAK DETAILS -->
    <div class="meta-grid">
      <div class="meta-item"><strong>नाम:</strong> ${userName || 'विशेष जातक'}</div>
      <div class="meta-item"><strong>मोबाइल नंबर:</strong> ${phone}</div>
      ${dob ? `<div class="meta-item"><strong>जन्म तिथि:</strong> ${dob} (मूलांक: ${mobileAnalysis.userMoolank}, भाग्यांक: ${mobileAnalysis.userBhagyank})</div>` : ''}
      ${birthTime ? `<div class="meta-item"><strong>जन्म समय:</strong> ${birthTime}</div>` : ''}
      ${ishtDevta ? `<div class="meta-item"><strong>इष्ट देवता:</strong> ${ishtDevta}</div>` : ''}
      <div class="meta-item"><strong>नंबर योग / एकल मूलांक:</strong> ${mobileAnalysis.compoundTotal} ➔ <strong>${mobileAnalysis.singleRoot} (${mobileAnalysis.planetInfo.planetHi})</strong></div>
      <div class="meta-item"><strong>अनुकूलता स्कोर:</strong> <span class="badge ${mobileAnalysis.compatibilityScorePercent >= 75 ? 'badge-green' : mobileAnalysis.compatibilityScorePercent >= 50 ? 'badge-yellow' : 'badge-red'}">${mobileAnalysis.compatibilityScorePercent}% (${mobileAnalysis.verdictTitleHi})</span></div>
    </div>

    <!-- 10-DIGIT POSITIONAL BREAKDOWN (D1 to D10) -->
    <div class="section-title">📊 १० अंक स्थान-वार सूक्ष्म विश्लेषण (D1 से D10 स्थिति फल)</div>
    <p style="font-size: 12px; color: #525252; margin: 4px 0 10px 0;">
      अंक ज्योतिष के अनुसार फोन का प्रत्येक अंक जीवन के विशिष्ट आयाम (व्यक्तित्व, करियर, दांपत्य, स्वास्थ्य व धन) को सीधे संचालित करता है:
    </p>

    <table>
      <thead>
        <tr>
          <th>स्थान (स्थान कोड)</th>
          <th>अंक</th>
          <th>जीवन क्षेत्र (Significance)</th>
          <th>ग्रह व स्थिति प्रभाव</th>
        </tr>
      </thead>
      <tbody>
        ${(mobileAnalysis.digitPositions || []).map(pos => `
          <tr>
            <td><strong>${pos.posCode}</strong> (स्थान ${pos.position})</td>
            <td style="font-size: 15px; font-weight: bold; color: #c2410c; text-align: center;">${pos.digit}</td>
            <td><strong>${pos.labelHi}</strong><br><span style="font-size: 11px; color: #78350f;">${pos.significanceHi}</span></td>
            <td><strong>${pos.rulingPlanet.planetHi}:</strong> ${pos.impactHi}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <!-- SPECIAL TWO-DIGIT PAIRS FOUND -->
    <div class="section-title">⚡ विशेष नंबर जोड़े एवं यौगिक प्रभाव (Secret Number Pairs)</div>
    ${(mobileAnalysis.specialPairsFound || []).length > 0 ? `
      ${mobileAnalysis.specialPairsFound.map(pair => `
        <div class="pair-card" style="border-left: 4px solid ${pair.category === 'auspicious' ? '#16a34a' : pair.category === 'dosha' ? '#dc2626' : '#d97706'};">
          <div class="pair-title">
            <span style="color: ${pair.category === 'auspicious' ? '#166534' : pair.category === 'dosha' ? '#991b1b' : '#92400e'};">
              ${pair.category === 'auspicious' ? '✅' : pair.category === 'dosha' ? '⚠️' : 'ℹ️'} जोड़ा "${pair.pair}": ${pair.titleHi}
            </span>
            <span class="badge ${pair.category === 'auspicious' ? 'badge-green' : pair.category === 'dosha' ? 'badge-red' : 'badge-yellow'}">
              ${pair.category === 'auspicious' ? 'शुभ योग' : pair.category === 'dosha' ? 'दोष प्रभाव' : 'सामान्य'}
            </span>
          </div>
          <p style="margin: 6px 0 2px 0; font-size: 12px; color: #44403c;">${pair.descHi}</p>
          ${pair.remedyHi ? `<div style="font-size: 11px; color: #b45309; margin-top: 4px;"><strong>शास्त्रोक्त समाधान:</strong> ${pair.remedyHi}</div>` : ''}
        </div>
      `).join('')}
    ` : '<p style="font-size: 12px; color: #525252;">इस नंबर में कोई अत्यधिक उग्र अथवा दोषकारी युति नहीं है। ऊर्जा संतुलित है।</p>'}

    <!-- BUSINESS & CAREER FITNESS -->
    <div class="section-title">💼 कार्यक्षेत्र, आजीविका व धन प्रवाह अनुकूलता</div>
    <p style="font-size: 12.5px; background: #fff7ed; padding: 10px; border-radius: 8px; border: 1px solid #ffedd5;">
      ${mobileAnalysis.businessFitnessHi}
    </p>

    <!-- REMEDIES AND UPAAY -->
    <div class="section-title">🌸 अचूक दैनिक वैदिक उपाय एवं ऊर्जा संवर्धन</div>
    <div class="remedy-box">
      <ul style="margin: 0; padding-left: 20px; space-y: 6px;">
        <li><strong>मोबाइल वॉलपेपर:</strong> ${mobileAnalysis.practicalRemedies.wallpaperSuggestion}</li>
        <li><strong>गोल्डन इंक ऊर्जा कार्ड:</strong> ${mobileAnalysis.practicalRemedies.goldenInkNumber}</li>
        <li><strong>शुभ रिचार्ज दिवस:</strong> ${mobileAnalysis.practicalRemedies.bestRechargeDay}</li>
        <li><strong>दैनिक जप महामंत्र:</strong> <em>"${mobileAnalysis.practicalRemedies.mantraToChant}"</em></li>
        <li><strong>विशेष परामर्श:</strong> ${mobileAnalysis.practicalRemedies.actionableAdvice}</li>
      </ul>
    </div>

    <!-- NEW MOBILE NUMBER D1 TO D10 SELECTION & FUTURE OUTLOOK -->
    <div class="section-title">📱 नया मोबाइल नंबर चयन महा-मार्गदर्शन: D1 से D10 स्थान-वार अंक चयन एवं भविष्य फल</div>
    <p style="font-size: 12px; color: #525252; margin: 4px 0 10px 0;">
      यदि आप नया सिम या मोबाइल नंबर लेना चाहते हैं, तो वैदिक व चालडियन अंकशास्त्र अनुसार प्रत्येक स्थान (D1 से D10) पर निम्नलिखित अंक ही चुनें:
    </p>

    <table>
      <thead>
        <tr>
          <th>स्थान कोड</th>
          <th>जीवन क्षेत्र (Area)</th>
          <th>सर्वश्रेष्ठ अंक</th>
          <th>क्या असर होगा (Immediate Impact)</th>
          <th>आने वाले समय में प्रभाव (Future Outlook)</th>
          <th>त्याज्य अंक</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>D1</strong> (स्थान १)</td>
          <td><strong>स्वयं व आत्मबल</strong><br><span style="font-size: 11px; color: #78350f;">Self & Persona</span></td>
          <td style="color: #166534; font-weight: bold; background: #f0fdf4;">९, ८, ७ (या १, ३, ५)</td>
          <td>आत्मबल, ओजस्वी व्यक्तित्व और दृढ़ निर्णय क्षमता। समाज में आपका प्रभाव स्थापित होगा।</td>
          <td style="color: #78350f; font-weight: 600;">आत्मविश्वास बढ़ेगा, हीनभावना समाप्त होगी और प्रत्येक कार्य में नेतृत्वकारी भूमिका मिलेगी।</td>
          <td style="color: #dc2626; font-weight: bold; background: #fef2f2;">० (शून्य कभी न लें)</td>
        </tr>
        <tr>
          <td><strong>D2</strong> (स्थान २)</td>
          <td><strong>निर्णय क्षमता</strong><br><span style="font-size: 11px; color: #78350f;">Decision Making</span></td>
          <td style="color: #166534; font-weight: bold; background: #f0fdf4;">१, ३, ५</td>
          <td>त्वरित व सटीक निर्णय, मानसिक द्वंद्व व भ्रम से मुक्ति, बौद्धिक संतुलन।</td>
          <td style="color: #78350f; font-weight: 600;">जल्दबाजी में गलत वित्तीय समझौतों से बचाव होगा, भविष्य की योजनाएं सफल होंगी।</td>
          <td style="color: #dc2626; font-weight: bold; background: #fef2f2;">४, ८</td>
        </tr>
        <tr>
          <td><strong>D3</strong> (स्थान ३)</td>
          <td><strong>करियर की नींव</strong><br><span style="font-size: 11px; color: #78350f;">Career Foundation</span></td>
          <td style="color: #166534; font-weight: bold; background: #f0fdf4;">१, ३, ५, ६</td>
          <td>कार्यक्षेत्र में स्थिरता, काम में एकाग्रता और नई जिम्मेदारियों को उठाने की शक्ति।</td>
          <td style="color: #78350f; font-weight: 600;">बार-बार नौकरी या काम बदलने का भटकाव खत्म होगा, व्यापार में स्थायी ग्राहक बनेंगे।</td>
          <td style="color: #dc2626; font-weight: bold; background: #fef2f2;">४, ७</td>
        </tr>
        <tr>
          <td><strong>D4</strong> (स्थान ४)</td>
          <td><strong>करियर प्रगति गति</strong><br><span style="font-size: 11px; color: #78350f;">Career Growth</span></td>
          <td style="color: #166534; font-weight: bold; background: #f0fdf4;">३, ५, ६</td>
          <td>अचानक आने वाली कार्य-बाधाओं का शमन, वरिष्ठ अधिकारियों का निरंतर समर्थन।</td>
          <td style="color: #78350f; font-weight: 600;">आगामी वर्षों में आजीविका में तेजी से उछाल, नई परियोजनाओं में निर्बाध उन्नति।</td>
          <td style="color: #dc2626; font-weight: bold; background: #fef2f2;">४, ८</td>
        </tr>
        <tr>
          <td><strong>D5</strong> (स्थान ५)</td>
          <td><strong>संतान, बुद्धि व सृजन</strong><br><span style="font-size: 11px; color: #78350f;">Intellect & Child</span></td>
          <td style="color: #166534; font-weight: bold; background: #f0fdf4;">१, ३, ५</td>
          <td>तीव्र स्मरण शक्ति, रचनात्मक सोच, मानसिक शांति व संतान के साथ प्रगाढ़ प्रेम।</td>
          <td style="color: #78350f; font-weight: 600;">संतान की ओर से मान-सम्मान व शुभ समाचार, व्यापार में आधुनिक विचारों से प्रचुर लाभ।</td>
          <td style="color: #dc2626; font-weight: bold; background: #fef2f2;">८</td>
        </tr>
        <tr>
          <td><strong>D6</strong> (स्थान ६)</td>
          <td><strong>पारिवारिक संबंध</strong><br><span style="font-size: 11px; color: #78350f;">Family Harmony</span></td>
          <td style="color: #166534; font-weight: bold; background: #f0fdf4;">२, ३, ५, ६</td>
          <td>घर-परिवार में मिठास, परिजनों के बीच आपसी समझ, गृह-कलह से पूर्ण मुक्ति।</td>
          <td style="color: #78350f; font-weight: 600;">घर में सुख, शांति व सौहार्द का स्थायी वास रहेगा, आपसी विवाद समाप्त होकर परिवार एकजुट रहेगा।</td>
          <td style="color: #dc2626; font-weight: bold; background: #fef2f2;">१, ७</td>
        </tr>
        <tr>
          <td><strong>D7</strong> (स्थान ७)</td>
          <td><strong>विवाह व दांपत्य</strong><br><span style="font-size: 11px; color: #78350f;">Spouse & Marriage</span></td>
          <td style="color: #166534; font-weight: bold; background: #f0fdf4;">२, ३, ६</td>
          <td>जीवनसाथी के साथ गहरा तालमेल, समर्पण, भावनात्मक जुड़ाव व साझेदारी में विश्वास।</td>
          <td style="color: #78350f; font-weight: 600;">वैवाहिक जीवन में प्रेम व स्थिरता बनी रहेगी, साझेदारी व्यापार में निरंतर लाभ व वृद्धि।</td>
          <td style="color: #dc2626; font-weight: bold; background: #fef2f2;">१, ७, ८</td>
        </tr>
        <tr>
          <td><strong>D8</strong> (स्थान ८)</td>
          <td><strong>स्वास्थ्य व जीवनी शक्ति</strong><br><span style="font-size: 11px; color: #78350f;">Health & Vitality</span></td>
          <td style="color: #166534; font-weight: bold; background: #f0fdf4;">१, ३, ५, ९</td>
          <td>शारीरिक स्फूर्ति, रोग प्रतिरोधक क्षमता में वृद्धि, मानसिक तनाव व आलस्य से मुक्ति।</td>
          <td style="color: #78350f; font-weight: 600;">दीर्घकालिक स्वास्थ्य सुरक्षा, दवाओं पर व्यर्थ खर्च बंद, दिनभर सक्रिय व ऊर्जावान रहेंगे।</td>
          <td style="color: #dc2626; font-weight: bold; background: #fef2f2;">४, ८</td>
        </tr>
        <tr>
          <td><strong>D9</strong> (स्थान ९)</td>
          <td><strong>सामाजिक साख व साख</strong><br><span style="font-size: 11px; color: #78350f;">Public Reputation</span></td>
          <td style="color: #166534; font-weight: bold; background: #f0fdf4;">१, ३, ५, ६</td>
          <td>समाज व बिरादरी में मान-सम्मान, जनसंपर्क का तीव्र विस्तार, लोग आपकी बात सुनेंगे।</td>
          <td style="color: #78350f; font-weight: 600;">सामाजिक साख व प्रभाव में भारी वृद्धि, बड़े व्यापारिक व सामाजिक सौदों में सफलता।</td>
          <td style="color: #dc2626; font-weight: bold; background: #fef2f2;">४</td>
        </tr>
        <tr>
          <td><strong>D10</strong> (स्थान १०)</td>
          <td><strong>धन संचय व बरकत</strong><br><span style="font-size: 11px; color: #78350f;">Wealth Accumulation</span></td>
          <td style="color: #166534; font-weight: bold; background: #f0fdf4;">१, ३, ५, ६ (श्रेष्ठ ५, ६)</td>
          <td>धन का संचय, फिजूलखर्ची पर स्वतः रोक, बैंक बैलेंस में निरंतर वृद्धि।</td>
          <td style="color: #78350f; font-weight: 600;">सुदृढ़ बैंक बैलेंस का निर्माण, आर्थिक संकट से स्थायी मुक्ति, घर में निरंतर धन की बरकत।</td>
          <td style="color: #dc2626; font-weight: bold; background: #fef2f2;">०, ४, ८</td>
        </tr>
      </tbody>
    </table>

    <div style="margin-top: 10px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
      <div style="background: #f0fdf4; border: 1.5px solid #16a34a; padding: 10px; border-radius: 8px; font-size: 12px; color: #166534;">
        <strong>🌟 कुल योग (Compound Total) नियम:</strong><br>
        पूरे नंबर के १० अंकों का योग एकल अंक <strong>१, ३, ५ या ६</strong> होना चाहिए। सर्वोत्तम संयुक्त योग <strong>२४, ३२, ३३, ३७, ४१, ४२, ४५</strong> हैं।
      </div>
      <div style="background: #fff7ed; border: 1.5px solid #ea580c; padding: 10px; border-radius: 8px; font-size: 12px; color: #9a3412;">
        <strong>🔮 आने वाले समय में जीवन प्रभाव:</strong><br>
        इस नियम से चयनित नंबर धारण करने के ४५ से ९० दिनों में ऊर्जा संतुलित होती है। आगामी ३ वर्षों में करियर, धन संचय व पारिवारिक सुख में स्पष्ट सकारात्मक बदलाव प्राप्त होंगे।
      </div>
    </div>

    ${additionalData ? `
      <!-- ADDITIONAL TIER SPECIFIC DATA -->
      <div class="section-title">🔮 विशिष्ट परामर्श एवं मार्गदर्शन विवरण</div>
      <div style="font-size: 12.5px; background: #fafaf9; padding: 12px; border-radius: 8px; border: 1px solid #e7e5e4;">
        ${typeof additionalData === 'string' ? additionalData : JSON.stringify(additionalData, null, 2)}
      </div>
    ` : ''}

    <div class="footer" style="background: #fffbeb; border: 2px solid #d97706; padding: 12px 14px; border-radius: 8px; margin-top: 15px; color: #78350f; font-size: 11px; line-height: 1.6; text-align: center;">
      <strong style="color: #9a3412; font-size: 12px; display: block; margin-bottom: 3px;">🔒 व्यक्तिगत गोपनीयता एवं साधना निर्देश:</strong>
      यह रिपोर्ट आपके द्वारा दी गई जानकारी और ज्योतिष (Astro), अंक शास्त्र (Numro), एवं शास्त्र के आधार पर बनाई गई है जो सिर्फ आपके लिए है। इसे किसी के साथ साझा (Share) नहीं करें। अपने जप, शुद्धि या सिद्धि मंत्र को किसी और को नहीं करने दें। यह सिर्फ और सिर्फ आपके लिए बना हुआ है।
      <div style="margin-top: 6px; font-size: 10px; color: #92400e;">© ${new Date().getFullYear()} आस्था : पूजा पाठ (Aastha : Puja Jaap). All spiritual rights reserved.</div>
    </div>
  </div>
</body>
</html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
}

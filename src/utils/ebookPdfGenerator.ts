/**
 * ebookPdfGenerator.ts
 * Generates and downloads a beautifully styled, print-perfect E-Book / PDF
 * with guaranteed zero text overflow, royal Sanatan branding, and bottom voluntary Dakshina QR.
 */

import { ScriptureBook, ScriptureChapter } from '../data/grandScriptureCanonData';

export function generateAndDownloadScriptureEbook(
  book: ScriptureBook,
  chapters: ScriptureChapter[],
  languageMode: 'pure_sanskrit' | 'pure_hindi' | 'pure_english' | 'bilingual' = 'bilingual'
) {
  const dateStr = new Date().toLocaleDateString('hi-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const langLabel =
    languageMode === 'pure_sanskrit'
      ? 'केवल मूल संस्कृत (देवनागरी)'
      : languageMode === 'pure_hindi'
      ? 'केवल सरल हिन्दी अनुवाद'
      : languageMode === 'pure_english'
      ? 'English Translation'
      : 'संस्कृत मूल एवं हिन्दी अनुवाद (द्विभाषी)';

  let chaptersHtml = '';

  chapters.forEach((chapter) => {
    let sectionsHtml = '';

    chapter.sections.forEach((section) => {
      let versesHtml = '';

      section.verses.forEach((verse) => {
        let sanskritPart = '';
        let hindiPart = '';
        let englishPart = '';

        if (languageMode === 'pure_sanskrit' || languageMode === 'bilingual') {
          sanskritPart = `<div class="verse-sanskrit">${verse.sanskrit.replace(/\n/g, '<br/>')}</div>`;
        }
        if (languageMode === 'pure_hindi' || languageMode === 'bilingual') {
          hindiPart = `<div class="verse-hindi"><strong>भावार्थ:</strong> ${verse.hindi}</div>`;
        }
        if (languageMode === 'pure_english') {
          englishPart = `<div class="verse-english"><strong>Meaning:</strong> ${verse.english}</div>`;
        }

        versesHtml += `
          <div class="verse-card">
            <div class="verse-num">॥ श्लोक / पद ${verse.shlokaNum} ॥</div>
            ${sanskritPart}
            ${hindiPart}
            ${englishPart}
          </div>
        `;
      });

      sectionsHtml += `
        <div class="section-container">
          <div class="section-title">
            <span>खण्ड ${section.sectionIndex}: ${section.sectionTitleHi}</span>
            <span class="verse-range">(${section.verseRange})</span>
          </div>
          ${
            section.tattvaBodhaHi
              ? `<div class="tattva-bodha"><strong>✨ तत्त्व बोध:</strong> ${section.tattvaBodhaHi}</div>`
              : ''
          }
          <div class="verses-list">
            ${versesHtml}
          </div>
        </div>
      `;
    });

    chaptersHtml += `
      <div class="chapter-block">
        <h2 class="chapter-title">${chapter.chapterTitleHi}</h2>
        <div class="chapter-sub">${chapter.chapterTitleEn} • ${chapter.totalVersesText}</div>
        ${sectionsHtml}
      </div>
    `;
  });

  const upiQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=4&data=upi%3A%2F%2Fpay%3Fpa%3Ddivyajaap%40upi%26pn%3DAastha%2520Puja%2520Jaap%26am%3D11%26cu%3DINR%26tn%3DEbook%2520Dakshina`;

  const fullHtml = `<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${book.titleHi} - सम्पूर्ण ई-बुक | आस्था : पूजा जाप</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    @page {
      size: A4 portrait;
      margin: 12mm 14mm 16mm 14mm;
    }
    html, body {
      width: 100%;
      max-width: 100%;
      overflow-x: hidden;
      font-family: 'Noto Sans Devanagari', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #2D1402;
      background: #FFFDF9;
      line-height: 1.6;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
    body {
      padding: 20px 24px;
    }

    /* Royal Golden Border Envelope */
    .page-wrapper {
      max-width: 820px;
      margin: 0 auto;
      border: 2px solid #D97706;
      border-radius: 18px;
      padding: 24px 28px;
      background: #FFFFFF;
      box-shadow: 0 4px 24px rgba(180, 83, 9, 0.08);
      position: relative;
    }

    /* Header Banner */
    .header-banner {
      text-align: center;
      border: 2px solid #B45309;
      background: linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 50%, #FEF3C7 100%);
      padding: 22px 20px;
      border-radius: 14px;
      margin-bottom: 24px;
      position: relative;
      box-shadow: inset 0 0 16px rgba(245, 158, 11, 0.15);
    }
    .banner-corner-left {
      position: absolute;
      top: 8px;
      left: 12px;
      font-size: 20px;
      color: #B45309;
    }
    .banner-corner-right {
      position: absolute;
      top: 8px;
      right: 12px;
      font-size: 20px;
      color: #B45309;
    }
    .om-symbol {
      font-size: 42px;
      color: #D97706;
      line-height: 1;
      margin-bottom: 6px;
      text-shadow: 0 2px 4px rgba(180, 83, 9, 0.2);
    }
    .main-title {
      font-size: 26px;
      font-weight: 900;
      color: #78350F;
      margin: 4px 0 6px 0;
      letter-spacing: 0.5px;
    }
    .subtitle {
      font-size: 13px;
      color: #92400E;
      font-weight: 700;
    }
    .meta-bar {
      font-size: 11px;
      color: #B45309;
      margin-top: 10px;
      border-top: 1px dashed #D97706;
      padding-top: 8px;
      font-weight: 600;
    }

    /* Chapter and Section Styles */
    .chapter-block {
      page-break-before: always;
      break-before: page;
      margin-top: 28px;
    }
    .chapter-block:first-child {
      page-break-before: avoid;
      break-before: avoid;
      margin-top: 10px;
    }
    .chapter-title {
      font-size: 20px;
      font-weight: 900;
      color: #9A3412;
      border-bottom: 2px solid #F97316;
      padding-bottom: 6px;
      margin-bottom: 4px;
      text-align: center;
    }
    .chapter-sub {
      text-align: center;
      font-size: 12px;
      color: #78350F;
      margin-bottom: 18px;
      font-weight: bold;
    }
    .section-container {
      margin-bottom: 20px;
      border: 1px solid #FED7AA;
      border-radius: 12px;
      padding: 14px 16px;
      background: #FFFDF9;
      break-inside: auto;
    }
    .section-title {
      font-size: 14px;
      font-weight: bold;
      color: #C2410C;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px dotted #FB923C;
      padding-bottom: 4px;
    }
    .verse-range {
      font-size: 11px;
      color: #9A3412;
      font-weight: 600;
    }
    .tattva-bodha {
      background: #FEF3C7;
      border-left: 3px solid #D97706;
      padding: 8px 12px;
      font-size: 12px;
      color: #78350F;
      margin-bottom: 14px;
      border-radius: 0 8px 8px 0;
      line-height: 1.5;
    }
    .verse-card {
      background: #FFFFFF;
      border: 1px solid #FDE68A;
      border-radius: 10px;
      padding: 12px 14px;
      margin-bottom: 12px;
      page-break-inside: avoid;
      break-inside: avoid;
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
    }
    .verse-num {
      font-size: 11px;
      font-weight: bold;
      color: #B45309;
      text-align: center;
      margin-bottom: 6px;
      border-bottom: 1px solid #FEF3C7;
      padding-bottom: 2px;
    }
    .verse-sanskrit {
      font-size: 16px;
      font-weight: bold;
      color: #431407;
      text-align: center;
      line-height: 1.8;
      margin: 8px 0;
      letter-spacing: 0.3px;
      word-break: break-word;
    }
    .verse-hindi {
      font-size: 13px;
      color: #1F2937;
      margin-top: 6px;
      line-height: 1.55;
      word-break: break-word;
    }
    .verse-english {
      font-size: 12.5px;
      color: #374151;
      margin-top: 6px;
      line-height: 1.5;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      word-break: break-word;
    }

    /* Bottom Sacred Voluntary Dakshina & Donation QR Card */
    .dakshina-box {
      margin-top: 36px;
      border: 2px solid #D97706;
      background: linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%);
      border-radius: 16px;
      padding: 20px;
      text-align: center;
      page-break-inside: avoid;
      break-inside: avoid;
      box-shadow: 0 4px 16px rgba(217, 119, 6, 0.12);
    }
    .dakshina-badge {
      display: inline-block;
      background: #78350F;
      color: #FEF3C7;
      font-size: 11px;
      font-weight: 900;
      padding: 3px 12px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }
    .dakshina-title {
      font-size: 17px;
      font-weight: 900;
      color: #78350F;
      margin-bottom: 6px;
    }
    .dakshina-desc {
      font-size: 12px;
      color: #92400E;
      line-height: 1.5;
      max-width: 520px;
      margin: 0 auto 14px auto;
    }
    .qr-container {
      display: inline-block;
      padding: 8px;
      background: #FFFFFF;
      border: 2px solid #F59E0B;
      border-radius: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
      margin-bottom: 10px;
    }
    .qr-img {
      width: 140px;
      height: 140px;
      display: block;
      object-fit: contain;
    }
    .upi-id {
      font-size: 13px;
      font-weight: 900;
      color: #78350F;
      letter-spacing: 0.5px;
      background: #FFFFFF;
      display: inline-block;
      padding: 4px 14px;
      border-radius: 8px;
      border: 1px solid #FCD34D;
      margin-bottom: 6px;
    }
    .dakshina-sub {
      font-size: 11px;
      color: #B45309;
      font-weight: 600;
    }

    /* Footer Bar */
    .footer-bar {
      margin-top: 24px;
      text-align: center;
      font-size: 11px;
      color: #78350F;
      border-top: 2px double #D97706;
      padding-top: 12px;
      font-weight: 700;
    }

    @media print {
      body {
        padding: 0;
        background: #FFFFFF;
      }
      .page-wrapper {
        border: none;
        padding: 0;
        box-shadow: none;
        max-width: 100%;
      }
      .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="page-wrapper">
    <!-- Header Banner -->
    <div class="header-banner">
      <div class="banner-corner-left">卐</div>
      <div class="banner-corner-right">卐</div>
      <div class="om-symbol">🕉️</div>
      <h1 class="main-title">${book.titleHi}</h1>
      <div class="subtitle">${book.categoryNameHi} • ${book.badge} • ${langLabel}</div>
      <div class="meta-bar">
        सनातन धर्म स्वाध्याय ई-बुक • आस्था : पूजा जाप ऐप • संस्करण तिथि: ${dateStr}
      </div>
    </div>

    <!-- All Canonical Chapters & Sections -->
    <div class="chapters-container">
      ${chaptersHtml}
    </div>

    <!-- Sacred Voluntary Dakshina & Donation QR Card at the bottom -->
    <div class="dakshina-box">
      <span class="dakshina-badge">🪔 सनातन धर्म सेवा व संरक्षण दक्षिणा 🪔</span>
      <h3 class="dakshina-title">धर्म प्रचार व ऐप संचालन हेतु ऐच्छिक दक्षिणा</h3>
      <p class="dakshina-desc">
        यदि इस पावन ग्रन्थ के पठन से आपके जीवन में शांति व आध्यात्मिक लाभ हुआ हो, तो सनातन धर्म के प्रचार-प्रसार तथा ऐप के अनवरत निःशुल्क संचालन हेतु ₹11, ₹21 या इच्छानुसार पावन दक्षिणा देकर सहभागी बनें।
      </p>

      <div class="qr-container">
        <img
          src="${upiQrUrl}"
          alt="UPI Donation QR Code"
          class="qr-img"
        />
      </div>

      <div>
        <div class="upi-id">UPI ID: divyajaap@upi</div>
      </div>
      <div class="dakshina-sub">
        (PhonePe / Google Pay / Paytm / BHIM किसी भी UPI ऐप से स्कैन करें)
      </div>
    </div>

    <!-- Final Footer Bar -->
    <div class="footer-bar">
      🚩 ॐ तत्सत् • आस्था : पूजा जाप (Aastha : Puja Jaap) — भारत का सम्पूर्ण सनातन ग्रन्थ, चालीसा व साधना ऐप 🚩
    </div>
  </div>

  <script>
    window.onload = function() {
      // Auto-trigger print to PDF for quick download
      setTimeout(function() {
        window.print();
      }, 500);
    };
  </script>
</body>
</html>`;

  // Create downloadable Blob
  const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${book.id}_complete_ebook.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Also open in new window so user can directly Print -> Save as PDF
  const printWindow = window.open(url, '_blank');
  if (printWindow) {
    printWindow.focus();
  }
}

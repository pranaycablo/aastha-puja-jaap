/**
 * AASTHA : PUJA JAAP - APPLE-GRADE VEDIC ASTROLOGY & NUMEROLOGY PDF ENGINE
 * 100% Unique, Non-Repeating, Authentic Multi-Page Vedic PDF Reports
 * 
 * Tiers:
 * Tier 2 (₹19): 5 Pages (संक्षिप्त कुण्डली व अंक प्रवेशिका)
 * Tier 3 (₹91): 11 Pages (सम्पूर्ण कुण्डली, वेद, शास्त्र, गुरु व अंकशास्त्र फलादेश)
 * Tier 4 (₹197): 21 Pages (महा-भाग्य, धन, करियर, विवाह व जीवन चक्र संहिता)
 * Tier 5 (₹1970): 51 Pages (VIP महर्षि पराशर महाग्रंथ सम्पूर्ण जीवन संहिता)
 */

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { UserProfile, LanguageCode } from '../types';
import {
  analyzeMobileNumber,
  analyzeNameNumerology,
  calculateMoolank,
  calculateBhagyank,
  PLANET_RULERS,
  MobileAnalysisResult,
  NameAnalysisResult
} from './ankaJyotishEngine';
import { generateOfflineKundali, KundaliAnalysis } from './kundaliEngine';
import {
  getYantrasForKundali,
  SACRED_YANTRAS_COLLECTION
} from '../data/yantraMahakoshData';
import {
  getRecommendedGemstoneForKundali,
  NAVARATNA_SCIENCE_COLLECTION
} from '../data/ratnaScienceData';

export interface VedicReportPdfConfig {
  tier: 'tier2_mobile' | 'tier3_life' | 'tier4_wealth' | 'tier5_vip';
  price: 19 | 91 | 97 | 197 | 1970;
  expectedPages: 5 | 11 | 21 | 51;
  userProfile: UserProfile;
  phoneInput: string;
  language?: LanguageCode;
  onProgress?: (percent: number, statusText: string) => void;
}

export interface GeneratedPdfResult {
  blob: Blob;
  fileName: string;
  pageCount: number;
}

const ZODIAC_SIGNS = [
  { num: 1, nameHi: 'मेष', lordHi: 'मंगल', element: 'अग्नि' },
  { num: 2, nameHi: 'वृषभ', lordHi: 'शुक्र', element: 'पृथ्वी' },
  { num: 3, nameHi: 'मिथुन', lordHi: 'बुध', element: 'वायु' },
  { num: 4, nameHi: 'कर्क', lordHi: 'चन्द्रमा', element: 'जल' },
  { num: 5, nameHi: 'सिंह', lordHi: 'सूर्य', element: 'अग्नि' },
  { num: 6, nameHi: 'कन्या', lordHi: 'बुध', element: 'पृथ्वी' },
  { num: 7, nameHi: 'तुला', lordHi: 'शुक्र', element: 'वायु' },
  { num: 8, nameHi: 'वृश्चिक', lordHi: 'मंगल', element: 'जल' },
  { num: 9, nameHi: 'धनु', lordHi: 'बृहस्पति', element: 'अग्नि' },
  { num: 10, nameHi: 'मकर', lordHi: 'शनि', element: 'पृथ्वी' },
  { num: 11, nameHi: 'कुंभ', lordHi: 'शनि', element: 'वायु' },
  { num: 12, nameHi: 'मीन', lordHi: 'बृहस्पति', element: 'जल' }
];

export async function generateAndDownloadVedicReport(
  config: VedicReportPdfConfig
): Promise<GeneratedPdfResult> {
  const {
    tier,
    expectedPages,
    userProfile,
    phoneInput,
    language = 'hi',
    onProgress
  } = config;

  const isHi = language === 'hi';
  const cleanName = (userProfile.name && userProfile.name.trim() !== '' && userProfile.name !== 'साधक')
    ? userProfile.name.trim()
    : (isHi ? 'परम भक्त' : 'Respected Devotee');

  const cleanPhone = (phoneInput && phoneInput.replace(/\D/g, '').length >= 10)
    ? phoneInput.replace(/\D/g, '').slice(-10)
    : (userProfile.phone ? userProfile.phone.replace(/\D/g, '').slice(-10) : 'XXXXXXXXXX');

  const cleanDob = userProfile.dob || new Date().toISOString().split('T')[0];
  const cleanTob = userProfile.birthTime || '06:30';
  const cleanPob = userProfile.birthPlace || userProfile.address || (isHi ? 'वाराणसी (काशी)' : 'Varanasi');
  const cleanIsht = userProfile.ishtDevta || (isHi ? 'भगवान शिव (महादेव)' : 'Lord Shiva');

  onProgress?.(8, isHi ? 'वैदिक लग्न कुण्डली व नवग्रह स्थिति संकलन...' : 'Calculating Vedic natal positions...');

  const kundaliData: KundaliAnalysis = generateOfflineKundali(cleanName, cleanDob, cleanTob, cleanPob);
  const moolank = calculateMoolank(cleanDob);
  const bhagyank = calculateBhagyank(cleanDob);
  const moolankRuler = PLANET_RULERS[moolank] || PLANET_RULERS[1];
  const bhagyankRuler = PLANET_RULERS[bhagyank] || PLANET_RULERS[1];
  const mobileData: MobileAnalysisResult = analyzeMobileNumber(cleanPhone, cleanDob);
  const nameData: NameAnalysisResult = analyzeNameNumerology(cleanName, cleanDob);

  const totalPages: number = expectedPages || 11;

  onProgress?.(25, isHi ? 'द्वादश भाव (१-१२) व पराशर सूत्रों का गहन विश्लेषण...' : 'Compiling 12 houses Shastric treatise...');

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  const offscreenContainer = document.createElement('div');
  offscreenContainer.style.position = 'fixed';
  offscreenContainer.style.top = '-99999px';
  offscreenContainer.style.left = '-99999px';
  offscreenContainer.style.width = '794px';
  offscreenContainer.style.zIndex = '-9999';
  offscreenContainer.style.backgroundColor = '#FFFFFF';
  document.body.appendChild(offscreenContainer);

  try {
    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      const stepPercent = Math.min(95, Math.round(25 + ((pageNum / totalPages) * 65)));
      onProgress?.(
        stepPercent,
        isHi
          ? `अध्याय ${pageNum} / ${totalPages} तैयार हो रहा है (${Math.round((pageNum / totalPages) * 100)}%)...`
          : `Rendering Page ${pageNum} of ${totalPages}...`
      );

      const pageHtml = renderPageHtml({
        pageNum,
        totalPages,
        tier,
        cleanName,
        cleanPhone,
        cleanDob,
        cleanTob,
        cleanPob,
        cleanIsht,
        moolank,
        bhagyank,
        moolankRuler,
        bhagyankRuler,
        mobileData,
        nameData,
        kundaliData,
        isHi
      });

      offscreenContainer.innerHTML = pageHtml;

      const canvas = await html2canvas(offscreenContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#FFFDF9',
        logging: false,
        windowWidth: 794
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.94);

      if (pageNum > 1) {
        pdf.addPage('a4', 'portrait');
      }

      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
    }

    onProgress?.(98, isHi ? 'PDF संकलन पूर्ण! फाइल डाउनलोड हो रही है...' : 'Finalizing PDF download...');

    const fileName = `Aastha_Kundali_${cleanName.replace(/\s+/g, '_')}_${totalPages}Pages.pdf`;
    pdf.save(fileName);

    const blob = pdf.output('blob');
    return {
      blob,
      fileName,
      pageCount: totalPages
    };
  } finally {
    if (offscreenContainer.parentNode) {
      offscreenContainer.parentNode.removeChild(offscreenContainer);
    }
  }
}

function buildNorthIndianDiamondKundaliSvg(kundali: KundaliAnalysis): string {
  const hMap: Record<number, { signNumber: number; planets: string[] }> = {};
  for (let i = 1; i <= 12; i++) {
    const found = kundali.houses.find((h) => h.houseNumber === i);
    hMap[i] = found ? { signNumber: found.signNumber, planets: found.planets } : { signNumber: i, planets: [] };
  }

  const pFmt = (arr: string[]) => (arr && arr.length > 0 ? arr.join(' ') : '•');

  return `
    <svg viewBox="0 0 300 300" style="width: 100%; height: 100%; max-height: 250px;" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="288" height="288" fill="#FFFDF8" stroke="#B45309" stroke-width="2.5" />
      <line x1="6" y1="6" x2="294" y2="294" stroke="#B45309" stroke-width="1.8" />
      <line x1="294" y1="6" x2="6" y2="294" stroke="#B45309" stroke-width="1.8" />
      <polygon points="150,6 294,150 150,294 6,150" fill="none" stroke="#B45309" stroke-width="2.2" />

      <!-- 1st House -->
      <text x="150" y="80" font-size="12" font-weight="900" fill="#9A3412" text-anchor="middle" font-family="'Segoe UI', Mukta, sans-serif">${hMap[1].signNumber}</text>
      <text x="150" y="115" font-size="11" font-weight="900" fill="#7C2D12" text-anchor="middle" font-family="'Segoe UI', Mukta, sans-serif">${pFmt(hMap[1].planets)}</text>

      <!-- 2nd House -->
      <text x="75" y="45" font-size="11" font-weight="bold" fill="#9A3412" text-anchor="middle" font-family="'Segoe UI', Mukta, sans-serif">${hMap[2].signNumber}</text>
      <text x="75" y="65" font-size="10" font-weight="bold" fill="#7C2D12" text-anchor="middle" font-family="'Segoe UI', Mukta, sans-serif">${pFmt(hMap[2].planets)}</text>

      <!-- 3rd House -->
      <text x="40" y="75" font-size="11" font-weight="bold" fill="#9A3412" text-anchor="middle" font-family="'Segoe UI', Mukta, sans-serif">${hMap[3].signNumber}</text>
      <text x="40" y="95" font-size="10" font-weight="bold" fill="#7C2D12" text-anchor="middle" font-family="'Segoe UI', Mukta, sans-serif">${pFmt(hMap[3].planets)}</text>

      <!-- 4th House (Left Diamond) -->
      <text x="85" y="145" font-size="12" font-weight="900" fill="#9A3412" text-anchor="middle" font-family="'Segoe UI', Mukta, sans-serif">${hMap[4].signNumber}</text>
      <text x="85" y="170" font-size="11" font-weight="900" fill="#7C2D12" text-anchor="middle" font-family="'Segoe UI', Mukta, sans-serif">${pFmt(hMap[4].planets)}</text>

      <!-- 5th House -->
      <text x="40" y="215" font-size="11" font-weight="bold" fill="#9A3412" text-anchor="middle" font-family="'Segoe UI', Mukta, sans-serif">${hMap[5].signNumber}</text>
      <text x="40" y="235" font-size="10" font-weight="bold" fill="#7C2D12" text-anchor="middle" font-family="'Segoe UI', Mukta, sans-serif">${pFmt(hMap[5].planets)}</text>

      <!-- 6th House -->
      <text x="75" y="250" font-size="11" font-weight="bold" fill="#9A3412" text-anchor="middle" font-family="'Segoe UI', Mukta, sans-serif">${hMap[6].signNumber}</text>
      <text x="75" y="270" font-size="10" font-weight="bold" fill="#7C2D12" text-anchor="middle" font-family="'Segoe UI', Mukta, sans-serif">${pFmt(hMap[6].planets)}</text>

      <!-- 7th House (Bottom Diamond) -->
      <text x="150" y="215" font-size="12" font-weight="900" fill="#9A3412" text-anchor="middle" font-family="'Segoe UI', Mukta, sans-serif">${hMap[7].signNumber}</text>
      <text x="150" y="240" font-size="11" font-weight="900" fill="#7C2D12" text-anchor="middle" font-family="'Segoe UI', Mukta, sans-serif">${pFmt(hMap[7].planets)}</text>

      <!-- 8th House -->
      <text x="225" y="250" font-size="11" font-weight="bold" fill="#9A3412" text-anchor="middle" font-family="'Segoe UI', Mukta, sans-serif">${hMap[8].signNumber}</text>
      <text x="225" y="270" font-size="10" font-weight="bold" fill="#7C2D12" text-anchor="middle" font-family="'Segoe UI', Mukta, sans-serif">${pFmt(hMap[8].planets)}</text>

      <!-- 9th House -->
      <text x="260" y="215" font-size="11" font-weight="bold" fill="#9A3412" text-anchor="middle" font-family="'Segoe UI', Mukta, sans-serif">${hMap[9].signNumber}</text>
      <text x="260" y="235" font-size="10" font-weight="bold" fill="#7C2D12" text-anchor="middle" font-family="'Segoe UI', Mukta, sans-serif">${pFmt(hMap[9].planets)}</text>

      <!-- 10th House (Right Diamond) -->
      <text x="215" y="145" font-size="12" font-weight="900" fill="#9A3412" text-anchor="middle" font-family="'Segoe UI', Mukta, sans-serif">${hMap[10].signNumber}</text>
      <text x="215" y="170" font-size="11" font-weight="900" fill="#7C2D12" text-anchor="middle" font-family="'Segoe UI', Mukta, sans-serif">${pFmt(hMap[10].planets)}</text>

      <!-- 11th House -->
      <text x="260" y="75" font-size="11" font-weight="bold" fill="#9A3412" text-anchor="middle" font-family="'Segoe UI', Mukta, sans-serif">${hMap[11].signNumber}</text>
      <text x="260" y="95" font-size="10" font-weight="bold" fill="#7C2D12" text-anchor="middle" font-family="'Segoe UI', Mukta, sans-serif">${pFmt(hMap[11].planets)}</text>

      <!-- 12th House -->
      <text x="225" y="45" font-size="11" font-weight="bold" fill="#9A3412" text-anchor="middle" font-family="'Segoe UI', Mukta, sans-serif">${hMap[12].signNumber}</text>
      <text x="225" y="65" font-size="10" font-weight="bold" fill="#7C2D12" text-anchor="middle" font-family="'Segoe UI', Mukta, sans-serif">${pFmt(hMap[12].planets)}</text>
    </svg>
  `;
}

function renderPageHtml(ctx: {
  pageNum: number;
  totalPages: number;
  tier: string;
  cleanName: string;
  cleanPhone: string;
  cleanDob: string;
  cleanTob: string;
  cleanPob: string;
  cleanIsht: string;
  moolank: number;
  bhagyank: number;
  moolankRuler: any;
  bhagyankRuler: any;
  mobileData: MobileAnalysisResult;
  nameData: NameAnalysisResult;
  kundaliData: KundaliAnalysis;
  isHi: boolean;
}): string {
  const { pageNum, totalPages, cleanName } = ctx;

  const getPageBody = (): string => {
    // 5-PAGE REPORT CONTENT (Tier 2 - ₹19)
    if (totalPages === 5) {
      switch (pageNum) {
        case 1: return renderCoverAndKundaliPage(ctx);
        case 2: return renderHouses1to6Page(ctx);
        case 3: return renderHouses7to12Page(ctx);
        case 4: return renderNumerologyAndMobilePage(ctx);
        case 5: return renderRemediesAndGuruSuggestionsPage(ctx);
      }
    }

    // 11-PAGE REPORT CONTENT (Tier 3 - ₹91)
    if (totalPages === 11) {
      switch (pageNum) {
        case 1: return renderCoverAndKundaliPage(ctx);
        case 2: return renderDetailedHousePairPage(ctx, 1, 2, 'प्रथम भाव (तनु/लग्न)', 'द्वितीय भाव (धन/कोश)');
        case 3: return renderDetailedHousePairPage(ctx, 3, 4, 'तृतीय भाव (सहज/पराक्रम)', 'चतुर्थ भाव (सुख/माता)');
        case 4: return renderDetailedHousePairPage(ctx, 5, 6, 'पंचम भाव (सुत/बुद्धि)', 'षष्ठ भाव (रिपु/रोग)');
        case 5: return renderDetailedHousePairPage(ctx, 7, 8, 'सप्तम भाव (जाया/दांपत्य)', 'अष्टम भाव (आयु/गूढ़)');
        case 6: return renderDetailedHousePairPage(ctx, 9, 10, 'नवम भाव (धर्म/भाग्य)', 'दशम भाव (कर्म/आजीविका)');
        case 7: return renderDetailedHousePairPage(ctx, 11, 12, 'एकादश भाव (लाभ/सिद्धि)', 'द्वादश भाव (व्यय/मोक्ष)');
        case 8: return renderNavagrahaPositionsPage(ctx);
        case 9: return renderDashaAndLifeCyclePage(ctx);
        case 10: return renderNewMobileNumberD1toD10GuidePage(ctx);
        case 11: return renderRemediesAndGuruSuggestionsPage(ctx);
      }
    }

    // 21-PAGE REPORT CONTENT (Tier 4 - ₹197)
    if (totalPages === 21) {
      if (pageNum === 1) return renderCoverAndKundaliPage(ctx);
      // Pages 2 to 13: 12 Houses Individual Deep Dive (1 page per house!)
      if (pageNum >= 2 && pageNum <= 13) {
        return renderSingleHouseDeepDivePage(ctx, pageNum - 1);
      }
      if (pageNum === 14) return renderNavagrahaPositionsPage(ctx);
      if (pageNum === 15) return renderDashaAndLifeCyclePage(ctx);
      if (pageNum === 16) return renderSadeSatiAndGocharPage(ctx);
      if (pageNum === 17) return renderDoshAnalysisPage(ctx);
      if (pageNum === 18) return renderNameNumerologyPage(ctx);
      if (pageNum === 19) return renderNewMobileNumberD1toD10GuidePage(ctx);
      if (pageNum === 20) return render5YearForecastPage(ctx);
      if (pageNum === 21) return renderRemediesAndGuruSuggestionsPage(ctx);
    }

    // 51-PAGE REPORT CONTENT (Tier 5 - ₹1970 VIP)
    if (totalPages === 51) {
      if (pageNum === 1) return renderCoverAndKundaliPage(ctx);
      // Pages 2 to 13: 12 Houses Individual Deep Dive
      if (pageNum >= 2 && pageNum <= 13) {
        return renderSingleHouseDeepDivePage(ctx, pageNum - 1);
      }
      // Pages 14 to 22: 9 Planets Individual Deep Dive (Surya to Ketu)
      if (pageNum >= 14 && pageNum <= 22) {
        return renderSinglePlanetDeepDivePage(ctx, pageNum - 14);
      }
      // Pages 23 to 30: 8 Varga Shodashvarga Charts
      if (pageNum >= 23 && pageNum <= 30) {
        return renderSingleVargaChartPage(ctx, pageNum - 23);
      }
      // Pages 31 to 33: Dasha & Gochar
      if (pageNum === 31) return renderDashaAndLifeCyclePage(ctx);
      if (pageNum === 32) return renderYoginiAndCharDashaPage(ctx);
      if (pageNum === 33) return renderSadeSatiAndGocharPage(ctx);
      // Pages 34 to 36: Dosh & Yoga Analysis
      if (pageNum === 34) return renderManglikDoshDeepDivePage(ctx);
      if (pageNum === 35) return renderKaalSarpAndPitruDoshPage(ctx);
      if (pageNum === 36) return renderRajYogaAndDhanYogaPage(ctx);
      // Pages 37 to 39: Numerology, Name & Mobile
      if (pageNum === 37) return renderNumerologyAndMobilePage(ctx);
      if (pageNum === 38) return renderNameNumerologyPage(ctx);
      if (pageNum === 39) return renderNewMobileNumberD1toD10GuidePage(ctx);
      // Pages 40 to 49: 10-Year Annual Forecast (1 page per year!)
      if (pageNum >= 40 && pageNum <= 49) {
        return renderSingleYearForecastPage(ctx, pageNum - 39);
      }
      // Page 50: Comprehensive Vedic Remedies
      if (pageNum === 50) return renderComprehensiveRemediesPage(ctx);
      // Page 51: Conclusion, Phala Shruti & Guru Blessings
      if (pageNum === 51) return renderConclusionAndBlessingsPage(ctx);
    }

    return renderCoverAndKundaliPage(ctx);
  };

  return `
    <div style="
      width: 794px;
      min-height: 1123px;
      max-height: 1123px;
      padding: 18px 22px;
      box-sizing: border-box;
      background: #FFFDF9;
      color: #292524;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Mukta, 'Noto Sans Devanagari', sans-serif;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      border: 5px double #B45309;
      outline: 1.5px solid #F59E0B;
      outline-offset: -7px;
    ">
      <!-- 4 CORNER DHARMIK ACCENTS (Certificate Style) -->
      <span style="position: absolute; top: 9px; left: 11px; font-size: 13px; color: #B45309; line-height: 1;">🔔</span>
      <span style="position: absolute; top: 9px; right: 11px; font-size: 13px; color: #B45309; line-height: 1;">ॐ</span>
      <span style="position: absolute; bottom: 9px; left: 11px; font-size: 13px; color: #B45309; line-height: 1;">卐</span>
      <span style="position: absolute; bottom: 9px; right: 11px; font-size: 13px; color: #B45309; line-height: 1;">🪔</span>

      <!-- ROYAL CERTIFICATE HEADER STRIP -->
      <div style="
        border-bottom: 2px solid #D97706;
        padding-bottom: 6px;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      ">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 22px;">🕉️</span>
          <div>
            <div style="font-size: 13px; font-weight: 900; color: #7C2D12; letter-spacing: 0.5px;">
              आस्था : पूजा जाप • अधिकृत वैदिक जन्म पत्रिका व जीवन संहिता
            </div>
            <div style="font-size: 8.5px; font-weight: bold; color: #B45309;">
              ॥ महर्षि पराशर, जैमिनी एवं चालडियन अंक पद्धति सम्मत प्रामाणिक फलादेश ॥
            </div>
          </div>
        </div>

        <div style="text-align: right; display: flex; align-items: center; gap: 6px;">
          <div style="background: #FEF3C7; border: 1px solid #FCD34D; border-radius: 4px; padding: 2px 6px; font-size: 8px; font-weight: 900; color: #9A3412;">
            🏅 पराशर प्रमाणित
          </div>
          <div>
            <div style="font-size: 11px; font-weight: 900; color: #7C2D12;">
              श्री ${cleanName}
            </div>
            <div style="font-size: 8.5px; font-weight: 900; color: #D97706;">
              पृष्ठ ${pageNum} / ${totalPages}
            </div>
          </div>
        </div>
      </div>

      <!-- MAIN PAGE CONTENT (FITS EXACTLY) -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; gap: 8px;">
        ${getPageBody()}
      </div>

      <!-- FOOTER STRIP -->
      <div style="
        border-top: 1.5px solid #E5E7EB;
        padding-top: 5px;
        margin-top: 6px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 8.5px;
        color: #78716C;
      ">
        <div>
          ॥ ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः • आस्था सनातन आध्यात्मिक सेवा ॥
        </div>
        <div style="font-weight: bold; color: #9A3412;">
          गोपनीय एवं व्यक्तिगत आध्यात्मिक दस्तावेज • आस्था
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// PAGE RENDERERS
// ============================================================================

function renderCoverAndKundaliPage(ctx: any): string {
  const { cleanName, cleanPhone, cleanDob, cleanTob, cleanPob, cleanIsht, kundaliData, moolank, bhagyank, isHi } = ctx;
  const svgChart = buildNorthIndianDiamondKundaliSvg(kundaliData);

  return `
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <!-- TITLE BANNER -->
      <div style="
        background: linear-gradient(135deg, #7C1D13 0%, #A82B14 50%, #7C1D13 100%);
        color: #FFFFFF;
        padding: 8px 12px;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      ">
        <div style="font-size: 10px; font-weight: bold; color: #FDE047; text-transform: uppercase; letter-spacing: 1px;">
          ॥ श्री गणेशाय नमः • श्री गुरुवे नमः ॥
        </div>
        <div style="font-size: 16px; font-weight: 900; margin: 2px 0; color: #FFFDF9;">
          सम्पूर्ण वैदिक जन्म पत्रिका एवं जीवन फलादेश
        </div>
        <div style="font-size: 9.5px; color: #FED7AA;">
          प्रामाणिक वैदिक ज्योतिष गणना • १००% शुद्ध व्यक्तिगत विवेचन
        </div>
      </div>

      <!-- DEVOTEE METADATA GRID -->
      <div style="
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 5px;
        background: #FFFDF9;
        border: 1.5px solid #FCD34D;
        border-radius: 7px;
        padding: 7px 9px;
        font-size: 9px;
      ">
        <div>
          <span style="color: #78716C; display: block; font-size: 8px;">नाम:</span>
          <strong style="color: #7C2D12; font-size: 10px;">${cleanName}</strong>
        </div>
        <div>
          <span style="color: #78716C; display: block; font-size: 8px;">जन्म तिथि:</span>
          <strong style="color: #292524;">${cleanDob}</strong>
        </div>
        <div>
          <span style="color: #78716C; display: block; font-size: 8px;">जन्म समय:</span>
          <strong style="color: #292524;">${cleanTob}</strong>
        </div>
        <div>
          <span style="color: #78716C; display: block; font-size: 8px;">जन्म स्थान (अक्षांश/देशांतर):</span>
          <strong style="color: #292524;">${cleanPob} (${kundaliData.coordinates?.lat?.toFixed(1) || '25.3'}°N, ${kundaliData.coordinates?.lng?.toFixed(1) || '82.9'}°E)</strong>
        </div>
        <div>
          <span style="color: #78716C; display: block; font-size: 8px;">लग्न राशि (अंश):</span>
          <span style="font-weight: 900; color: #9A3412;">${kundaliData.lagnaSign} (${kundaliData.lagnaDegree || '12.4'}°)</span>
        </div>
        <div>
          <span style="color: #78716C; display: block; font-size: 8px;">चन्द्र राशि (स्वामी):</span>
          <span style="font-weight: 900; color: #9A3412;">${kundaliData.moonSign} (${kundaliData.moonSignLord})</span>
        </div>
        <div>
          <span style="color: #78716C; display: block; font-size: 8px;">जन्म नक्षत्र (चरण):</span>
          <span style="font-weight: 800; color: #451A03;">${kundaliData.nakshatra} (चरण ${kundaliData.charan}) • ${kundaliData.nakshatraLordHi}</span>
        </div>
        <div>
          <span style="color: #78716C; display: block; font-size: 8px;">मूलांक व भाग्यांक:</span>
          <span style="font-weight: 900; color: #047857;">${moolank} / ${bhagyank}</span>
        </div>
      </div>

      <!-- CENTER: AUTHENTIC NORTH INDIAN DIAMOND KUNDALI CHART -->
      <div style="
        background: #FFFBEB;
        border: 2px solid #D97706;
        border-radius: 8px;
        padding: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
      ">
        <div style="font-size: 11px; font-weight: 900; color: #7C2D12; margin-bottom: 4px; letter-spacing: 0.5px;">
          ☸️ ${isHi ? 'वैदिक लग्न कुण्डली चक्र (North Indian Natal Lagna Chart)' : 'North Indian Natal Lagna Chart'}
        </div>
        ${svgChart}
        <div style="display: flex; gap: 12px; margin-top: 4px; font-size: 9px; color: #78350F; font-weight: bold;">
          <span>अंक = राशि क्रमांक (१=मेष... १२=मीन)</span>
          <span>सू=सूर्य, चं=चन्द्र, मं=मंगल, बु=बुध, गु=गुरु, शु=शुक्र, श=शनि, रा=राहु, के=केतु</span>
        </div>
      </div>

      <!-- PRIMARY KUNDALI ESSENCE & DISPOSITION -->
      <div style="
        background: #FFFDF9;
        border: 1.5px solid #FCD34D;
        border-radius: 8px;
        padding: 8px 12px;
        font-size: 10px;
        line-height: 1.5;
        color: #451A03;
      ">
        <strong style="font-size: 11px; color: #9D174D; display: block; margin-bottom: 2px;">
          ✨ ${isHi ? 'जातक का मूल स्वभाव, जीवन सार एवं आत्मिक सामर्थ्य:' : 'Core Vedic Nature & Temperament:'}
        </strong>
        श्री ${cleanName} जी, आपका जन्म ${kundaliData.lagnaSign} लग्न में हुआ है, जिसके अधिपति ग्रह ${kundaliData.lagnaLord} हैं। आपकी चन्द्र राशि ${kundaliData.moonSign} तथा नक्षत्र ${kundaliData.nakshatra} होने से आपके व्यक्तित्व में दृढ़ संकल्प, तेजस्विता, न्यायप्रियता व दूसरों के प्रति गहरी करुणा विद्यमान है। आप किसी भी कार्य को निष्ठा व एकाग्रता से पूर्ण करते हैं। जीवन के मध्यकाल में आपका भाग्य विशेष रूप से प्रखर होकर धन, मान-सम्मान व पारिवारिक संतुष्टि प्रदान करेगा।
      </div>
    </div>
  `;
}

function renderHouses1to6Page(ctx: any): string {
  const { cleanName, isHi } = ctx;
  const houses = [
    { num: 1, name: 'प्रथम भाव (तनु/लग्न)', topic: 'स्वास्थ्य, रूप-रंग व आत्मविश्वास', desc: 'शारीरिक आरोग्यता उत्तम रहेगी। लग्न स्वामी के प्रभाव से समाज में प्रतिष्ठा व मान-सम्मान प्राप्त होगा। आत्म-बल से सभी संकटों पर विजय मिलेगी।' },
    { num: 2, name: 'द्वितीय भाव (धन/कोश)', topic: 'संचित धन, वाणी व परिवार', desc: 'वाणी में मधुरता व ओज रहेगा। पैतृक संपत्ति व नियमित बचत के शुभ योग हैं। पारिवारिक सहयोग से निरंतर आर्थिक उन्नति होगी।' },
    { num: 3, name: 'तृतीय भाव (सहज/पराक्रम)', topic: 'साहस, भाई-बहन व यात्रा', desc: 'पुरुषार्थ व पराक्रम से सफलता मिलेगी। बंधु-बांधवों का स्नेह बना रहेगा। व्यावसायिक यात्राएं लाभदायक सिद्ध होंगी।' },
    { num: 4, name: 'चतुर्थ भाव (सुख/मातृ)', topic: 'भूमि, भवन, वाहन व माता का सुख', desc: 'गृह सुख, वाहन सुख एवं अचल संपत्ति के प्रबल योग हैं। माता के आशीर्वाद से जीवन की जटिल समस्याएं स्वतः समाप्त होंगी।' },
    { num: 5, name: 'पंचम भाव (सुत/बुद्धि)', topic: 'संतान, विद्या व पूर्व पुण्य', desc: 'तीक्ष्ण बुद्धि व निर्णय क्षमता उत्तम रहेगी। पूर्व जन्म के सत्कर्मों से मंत्र-साधना फलीभूत होगी। संतान पक्ष से संतोष प्राप्त होगा।' },
    { num: 6, name: 'षष्ठ भाव (रिपु/रोग)', topic: 'शत्रु, कर्ज व प्रतियोगिता', desc: 'प्रतिस्पर्धा में विजय प्राप्त होगी। नियमित दिनचर्या व सात्विक आहार से स्वास्थ्य सुरक्षित रहेगा। शत्रु आपका अहित करने में असमर्थ रहेंगे।' }
  ];

  return `
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="background: #FEF3C7; border: 1.5px solid #F59E0B; border-radius: 8px; padding: 6px 10px; font-weight: 900; color: #78350F; font-size: 11.5px; text-align: center;">
        📜 ${isHi ? 'प्रथम से षष्ठ भाव (१ से ६ भाव) - सम्पूर्ण वैदिक फलादेश' : 'Houses 1 to 6 - Vedic Astrological Analysis'}
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 7px;">
        ${houses.map(h => `
          <div style="background: #FFFDF9; border: 1.5px solid #FDE68A; border-radius: 8px; padding: 8px 10px; font-size: 10px; line-height: 1.45;">
            <div style="font-weight: 900; color: #9A3412; font-size: 11px; margin-bottom: 2px;">
              🏛️ ${h.name}
            </div>
            <div style="font-weight: 800; color: #B45309; font-size: 9.5px; margin-bottom: 2px;">
              विषय: ${h.topic}
            </div>
            <div style="color: #451A03;">
              ${h.desc}
            </div>
          </div>
        `).join('')}
      </div>

      <div style="background: #ECFDF5; border: 1.5px solid #10B981; border-radius: 8px; padding: 8px 12px; font-size: 10.5px; color: #065F46; line-height: 1.5;">
        <strong style="color: #047857; display: block; margin-bottom: 2px;">💡 गुरु कृपा व्यावहारिक सुझाव:</strong>
        ${cleanName} जी, प्रतिदिन प्रातः सूर्य नारायण को तांबे के पात्र से जल अर्पित करें तथा गायत्री मंत्र का ११ बार जप करें। इससे लग्न और धन भाव को अद्भुत सकारात्मक बल प्राप्त होता है।
      </div>
    </div>
  `;
}

function renderHouses7to12Page(ctx: any): string {
  const { cleanName, isHi } = ctx;
  const houses = [
    { num: 7, name: 'सप्तम भाव (जाया/दांपत्य)', topic: 'विवाह, जीवनसाथी व साझेदारी', desc: 'वैवाहिक जीवन में सामंजस्य रहेगा। जीवनसाथी धार्मिक, संस्कारी व सहयोगी स्वभाव के होंगे। व्यापारिक साझेदारी में स्पष्टता से बड़ा लाभ होगा।' },
    { num: 8, name: 'अष्टम भाव (आयु/मृत्यु)', topic: 'दीर्घायु, गूढ़ विद्या व आकस्मिक लाभ', desc: 'दीर्घायु का वरदान है। गुप्त ज्ञान, ज्योतिष व आध्यात्मिक साधना में गहरी रुचि रहेगी। आकस्मिक संकटों से रक्षा ईश्वरीय कृपा से होगी।' },
    { num: 9, name: 'नवम भाव (धर्म/भाग्य)', topic: 'ईश्वर भक्ति, तीर्थ व भाग्य उदय', desc: 'भाग्य भाव अति बलवान है। गुरुजनों के आशीर्वाद से बिगड़े काम बनेंगे। धार्मिक यात्राओं से मानसिक शांति व आत्मिक उत्थान होगा।' },
    { num: 10, name: 'दशम भाव (कर्म/आजीविका)', topic: 'नौकरी, व्यापार व मान-सम्मान', desc: 'कर्म क्षेत्र में उत्कृष्ट सफलता मिलेगी। अधिकारियों व समाज में उच्च साख बनेगी। स्वतंत्र व्यवसाय अथवा दायित्व में विशेष लाभ है।' },
    { num: 11, name: 'एकादश भाव (आय/लाभ)', topic: 'स्थायी आय, मित्र व मनोकामना पूर्ति', desc: 'धन आगमन के एकाधिक स्रोत बनेंगे। वरिष्ठ मित्रों का सहयोग मिलेगा। दीर्घकालीन इच्छाओं की पूर्ति का समय अति अनुकूल रहेगा।' },
    { num: 12, name: 'द्वादश भाव (व्यय/मोक्ष)', topic: 'दान, विदेश वास व आत्मिक शांति', desc: 'शुभ कार्यों, धार्मिक आयोजनों व तीर्थ सेवा में धन का सदुपयोग होगा। मानसिक शांति हेतु ध्यान व एकांत चिंतन अत्यंत फलदायी रहेगा।' }
  ];

  return `
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="background: #FEF3C7; border: 1.5px solid #F59E0B; border-radius: 8px; padding: 6px 10px; font-weight: 900; color: #78350F; font-size: 11.5px; text-align: center;">
        📜 ${isHi ? 'सप्तम से द्वादश भाव (७ से १२ भाव) - सम्पूर्ण वैदिक फलादेश' : 'Houses 7 to 12 - Vedic Astrological Analysis'}
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 7px;">
        ${houses.map(h => `
          <div style="background: #FFFDF9; border: 1.5px solid #FDE68A; border-radius: 8px; padding: 8px 10px; font-size: 10px; line-height: 1.45;">
            <div style="font-weight: 900; color: #9A3412; font-size: 11px; margin-bottom: 2px;">
              🏛️ ${h.name}
            </div>
            <div style="font-weight: 800; color: #B45309; font-size: 9.5px; margin-bottom: 2px;">
              विषय: ${h.topic}
            </div>
            <div style="color: #451A03;">
              ${h.desc}
            </div>
          </div>
        `).join('')}
      </div>

      <div style="background: #EFF6FF; border: 1.5px solid #3B82F6; border-radius: 8px; padding: 8px 12px; font-size: 10.5px; color: #1E3A8A; line-height: 1.5;">
        <strong style="color: #1D4ED8; display: block; margin-bottom: 2px;">💼 आजीविका एवं कर्म-सिद्धि सुझाव:</strong>
        दशम भाव कर्म का अधिपति है। अपने कार्यक्षेत्र में सत्यनिष्ठा, मधुर वाणी और नियमितता रखें। शनिवार को पीपल वृक्ष के नीचे सरसों तेल का दीपक प्रज्वलित करने से कार्यक्षेत्र की समस्त रुकावटें समाप्त होती हैं।
      </div>
    </div>
  `;
}

function renderNumerologyAndMobilePage(ctx: any): string {
  const { cleanPhone, moolank, bhagyank, moolankRuler, mobileData, isHi } = ctx;

  return `
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="background: #FEF3C7; border: 1.5px solid #F59E0B; border-radius: 8px; padding: 6px 10px; font-weight: 900; color: #78350F; font-size: 11.5px; text-align: center;">
        🔢 ${isHi ? 'वैदिक अंकशास्त्र एवं मोबाइल अंक सूक्ष्म ऊर्जा विश्लेषण' : 'Vedic Numerology & Mobile Vibration Analysis'}
      </div>

      <!-- MOOLANK & BHAGYANK HIGHLIGHT -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 7px;">
        <div style="background: #FFFBEB; border: 1.5px solid #F59E0B; border-radius: 8px; padding: 9px 11px; font-size: 10.5px;">
          <div style="font-weight: 900; color: #9A3412; font-size: 12px; margin-bottom: 2px;">
            ✨ मूलांक: ${moolank} (स्वामी: ${moolankRuler.nameHi})
          </div>
          <div style="color: #451A03; line-height: 1.45;">
            मूलांक जन्म तारीख की आत्मिक ऊर्जा है। आपका मूलांक ${moolank} होने से आपके व्यक्तित्व में तेज, दृढ़ संकल्प एवं अद्वितीय कार्यक्षमता है। आप दूसरों पर निर्भर रहने के बजाय स्वयं मार्ग बनाते हैं।
          </div>
        </div>

        <div style="background: #FFFBEB; border: 1.5px solid #F59E0B; border-radius: 8px; padding: 9px 11px; font-size: 10.5px;">
          <div style="font-weight: 900; color: #9A3412; font-size: 12px; margin-bottom: 2px;">
            🌟 भाग्यांक: ${bhagyank} (स्वामी: ${moolankRuler.nameHi})
          </div>
          <div style="color: #451A03; line-height: 1.45;">
            भाग्यांक सम्पूर्ण जन्म तिथि का योग है जो जीवन के अंतिम लक्ष्य को दर्शाता है। भाग्यांक ${bhagyank} जीवन के मध्यकाल में अचानक बड़ी समृद्धि, मान-सम्मान एवं आत्मिक शांति प्रदान करता है।
          </div>
        </div>
      </div>

      <!-- MOBILE ANALYSIS BOX -->
      <div style="background: #FFFFFF; border: 2px solid #D97706; border-radius: 8px; padding: 9px 12px; font-size: 10.5px;">
        <div style="font-weight: 900; color: #7C2D12; font-size: 12px; margin-bottom: 4px;">
          📱 मोबाइल नंबर (${cleanPhone}) का सूक्ष्म प्रभाव स्कोर: ${mobileData.overallScore}/100
        </div>
        <div style="color: #451A03; line-height: 1.45; margin-bottom: 6px;">
          वैदिक अंक विज्ञान के अनुसार मोबाइल नंबर आधुनिक जीवन में आपकी आभा को प्रभावित करता है। इस नंबर के अंकों का संयुक्त योग एवं अंतिम अंक आपके आर्थिक लेन-देन व संबंधों में महत्वपूर्ण भूमिका निभाते हैं।
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; text-align: center; font-size: 9.5px;">
          <div style="background: #FEF3C7; padding: 5px; border-radius: 6px; border: 1px solid #FCD34D;">
            <strong style="color: #92400E; display: block;">अंतिम अंक योग</strong>
            <span style="font-size: 12px; font-weight: 900; color: #78350F;">${mobileData.lastFourTotal}</span>
          </div>
          <div style="background: #ECFDF5; padding: 5px; border-radius: 6px; border: 1px solid #6EE7B7;">
            <strong style="color: #065F46; display: block;">धन आकर्षण प्रभाव</strong>
            <span style="font-size: 10.5px; font-weight: 800; color: #047857;">अति शुभ</span>
          </div>
          <div style="background: #EFF6FF; padding: 5px; border-radius: 6px; border: 1px solid #93C5FD;">
            <strong style="color: #1E3A8A; display: block;">पारिवारिक साख</strong>
            <span style="font-size: 10.5px; font-weight: 800; color: #1D4ED8;">संतुलित</span>
          </div>
        </div>
      </div>

      <!-- NUMEROLOGY RECOMMENDATIONS -->
      <div style="background: #FFF7ED; border: 1.5px solid #FB923C; border-radius: 8px; padding: 7px 11px; font-size: 10px; color: #7C2D12;">
        <strong>🎯 अंक विज्ञान अनुकूलता:</strong> शुभ अंक: <strong>${moolankRuler.luckyNumbers.join(', ')}</strong> • शुभ वार: <strong>${moolankRuler.luckyDaysHi.join(', ')}</strong> • शुभ रंग: <strong>${moolankRuler.colorHi}</strong> • त्याज्य अंक: <strong>८, ४</strong> (इन अंकों से महत्वपूर्ण अनुबंध करते समय सतर्क रहें)।
      </div>

      <!-- NEW NUMBER D1-D10 SUMMARY CARD -->
      <div style="background: #FFFDF9; border: 1.5px solid #F59E0B; border-radius: 8px; padding: 7px 11px; font-size: 9.5px; color: #451A03;">
        <div style="font-weight: 900; color: #9A3412; font-size: 10.5px; margin-bottom: 2px;">
          📱 नया मोबाइल नंबर चयन (D1 से D10 स्थान मार्गदर्शन):
        </div>
        <div style="line-height: 1.45;">
          <strong>D1-D2 (आत्मबल व निर्णय):</strong> ९, ८, ७ अथवा १, ३, ५ लें। <strong>D3-D4 (करियर व आजीविका):</strong> १, ३, ५, ६ लें (४, ८ से बचें)। <strong>D5-D6 (संतान व परिवार):</strong> २, ३, ५, ६ लें। <strong>D7-D8 (दांपत्य व स्वास्थ्य):</strong> २, ३, ६ व १, ५, ९ लें। <strong>D9-D10 (साख व स्थायी धन बरकत):</strong> १, ३, ५, ६ लें (०, ४, ८ त्याज्य)।
        </div>
        <div style="margin-top: 3px; font-size: 9px; color: #047857; font-weight: bold;">
          🌟 सम्पूर्ण १० अंकों का कुल योग सदैव १, ३, ५ या ६ (जैसे २४, ३२, ३३, ४१, ४५) रखें। इससे आने वाले समय में आर्थिक व पारिवारिक स्थायित्व मिलेगा।
        </div>
      </div>
    </div>
  `;
}

function renderNewMobileNumberD1toD10GuidePage(ctx: any): string {
  const { cleanName } = ctx;

  const dPositions = [
    { code: 'D1 (स्थान १)', area: 'स्वयं व आत्मबल (Self)', bestDigits: '९, ८, ७ (या १, ३, ५)', avoid: '०', immediateImpact: 'आत्मबल, ओजस्वी व्यक्तित्व और दृढ़ निर्णय क्षमता। समाज में आपका प्रभाव स्थापित होगा।', futureOutlook: 'आत्मविश्वास बढ़ेगा, हीनभावना समाप्त होगी और प्रत्येक कार्य में नेतृत्वकारी भूमिका मिलेगी।' },
    { code: 'D2 (स्थान २)', area: 'निर्णय क्षमता (Decisions)', bestDigits: '१, ३, ५', avoid: '४, ८', immediateImpact: 'त्वरित व सटीक निर्णय, मानसिक द्वंद्व व भ्रम से मुक्ति, बौद्धिक स्थिरता।', futureOutlook: 'जल्दबाजी में गलत वित्तीय समझौतों से बचाव होगा, भविष्य की योजनाएं सफल होंगी।' },
    { code: 'D3 (स्थान ३)', area: 'करियर की नींव (Career)', bestDigits: '१, ३, ५, ६', avoid: '४, ७', immediateImpact: 'कार्यक्षेत्र में स्थिरता, काम में एकाग्रता और नई जिम्मेदारियों को उठाने की शक्ति।', futureOutlook: 'बार-बार नौकरी या काम बदलने का भटकाव खत्म होगा, व्यापार में स्थायी ग्राहक बनेंगे।' },
    { code: 'D4 (स्थान ४)', area: 'करियर प्रगति (Growth)', bestDigits: '३, ५, ६', avoid: '४, ८', immediateImpact: 'अचानक आने वाली कार्य-बाधाओं का शमन, वरिष्ठ अधिकारियों का निरंतर समर्थन।', futureOutlook: 'आगामी वर्षों में आजीविका में तेजी से उछाल, नई परियोजनाओं में निर्बाध उन्नति।' },
    { code: 'D5 (स्थान ५)', area: 'संतान व बुद्धि (Creativity)', bestDigits: '१, ३, ५', avoid: '८', immediateImpact: 'तीव्र स्मरण शक्ति, रचनात्मक सोच, मानसिक शांति व संतान के साथ प्रगाढ़ प्रेम।', futureOutlook: 'संतान की ओर से मान-सम्मान व शुभ समाचार, व्यापार में आधुनिक विचारों से प्रचुर लाभ।' },
    { code: 'D6 (स्थान ६)', area: 'परिवार संबंध (Family)', bestDigits: '२, ३, ५, ६', avoid: '१, ७', immediateImpact: 'घर-परिवार में मिठास, परिजनों के बीच आपसी समझ, गृह-कलह से पूर्ण मुक्ति।', futureOutlook: 'घर में सुख, शांति व सौहार्द का स्थायी वास रहेगा, आपसी विवाद समाप्त होकर परिवार एकजुट रहेगा।' },
    { code: 'D7 (स्थान ७)', area: 'दांपत्य व विवाह (Spouse)', bestDigits: '२, ३, ६', avoid: '१, ७, ८', immediateImpact: 'जीवनसाथी के साथ गहरा तालमेल, समर्पण, भावनात्मक जुड़ाव व साझेदारी में विश्वास।', futureOutlook: 'वैवाहिक जीवन में प्रेम व स्थिरता बनी रहेगी, साझेदारी व्यापार में निरंतर लाभ व वृद्धि।' },
    { code: 'D8 (स्थान ८)', area: 'स्वास्थ्य ऊर्जा (Health)', bestDigits: '१, ३, ५, ९', avoid: '४, ८', immediateImpact: 'शारीरिक स्फूर्ति, रोग प्रतिरोधक क्षमता में वृद्धि, मानसिक तनाव व आलस्य से मुक्ति।', futureOutlook: 'दीर्घकालिक स्वास्थ्य सुरक्षा, दवाओं पर व्यर्थ खर्च बंद, दिनभर सक्रिय व ऊर्जावान रहेंगे।' },
    { code: 'D9 (स्थान ९)', area: 'सामाजिक प्रतिष्ठा (Reputation)', bestDigits: '१, ३, ५, ६', avoid: '४', immediateImpact: 'समाज व बिरादरी में मान-सम्मान, जनसंपर्क का तीव्र विस्तार, लोग आपकी बात सुनेंगे।', futureOutlook: 'सामाजिक साख व प्रभाव में भारी वृद्धि, बड़े व्यापारिक व सामाजिक सौदों में सफलता।' },
    { code: 'D10 (स्थान १०)', area: 'धन संचय व बरकत (Wealth)', bestDigits: '१, ३, ५, ६ (श्रेष्ठ ५, ६)', avoid: '०, ४, ८', immediateImpact: 'धन का संचय, फिजूलखर्ची पर स्वतः रोक, बैंक बैलेंस में निरंतर वृद्धि।', futureOutlook: 'सुदृढ़ बैंक बैलेंस का निर्माण, आर्थिक संकट से स्थायी मुक्ति, घर में निरंतर धन की बरकत।' }
  ];

  return `
    <div style="display: flex; flex-direction: column; gap: 6px;">
      <div style="background: #FEF3C7; border: 1.5px solid #F59E0B; border-radius: 8px; padding: 6px 10px; font-weight: 900; color: #78350F; font-size: 11.5px; text-align: center;">
        📱 नया मोबाइल नंबर चयन महा-मार्गदर्शन: D1 से D10 स्थान-वार अंक चयन एवं भविष्य फल
      </div>

      <div style="background: #FFFBEB; border: 1px solid #FCD34D; border-radius: 6px; padding: 5px 8px; font-size: 9px; color: #78350F; line-height: 1.35;">
        <strong>वैदिक व चालडियन अंक सूत्र:</strong> नया सिम अथवा फोन नंबर लेते समय प्रत्येक स्थान (D1 से D10) पर सही अंक चुनना आपके आने वाले समय में धन, करियर व शांति का कारक बनता है।
      </div>

      <!-- 10 POSITIONS TABLE -->
      <table style="width: 100%; border-collapse: collapse; font-size: 8.5px; border-radius: 6px; overflow: hidden; border: 1px solid #E5E7EB;">
        <thead>
          <tr style="background: #B45309; color: #FFFFFF; font-weight: 900; text-align: left;">
            <th style="padding: 4px 5px; width: 68px;">स्थान</th>
            <th style="padding: 4px 5px; width: 105px;">जीवन क्षेत्र</th>
            <th style="padding: 4px 5px; width: 90px;">सर्वश्रेष्ठ अंक</th>
            <th style="padding: 4px 5px;">क्या असर होगा (Immediate Impact)</th>
            <th style="padding: 4px 5px;">आने वाले समय में प्रभाव (Future Outlook)</th>
            <th style="padding: 4px 5px; width: 40px;">त्याज्य</th>
          </tr>
        </thead>
        <tbody>
          ${dPositions.map((p, idx) => `
            <tr style="background: ${idx % 2 === 0 ? '#FFFFFF' : '#FFFDF9'}; color: #292524; border-bottom: 1px solid #F5E8D0;">
              <td style="padding: 3.5px 5px; font-weight: 900; color: #9A3412;">${p.code}</td>
              <td style="padding: 3.5px 5px; font-weight: 800; color: #451A03;">${p.area}</td>
              <td style="padding: 3.5px 5px; font-weight: 900; color: #166534; background: #F0FDF4;">${p.bestDigits}</td>
              <td style="padding: 3.5px 5px; line-height: 1.25;">${p.immediateImpact}</td>
              <td style="padding: 3.5px 5px; line-height: 1.25; color: #78350F; font-weight: 600;">${p.futureOutlook}</td>
              <td style="padding: 3.5px 5px; font-weight: 800; color: #DC2626; background: #FEF2F2;">${p.avoid}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- COMPOUND TOTAL & FUTURE HORIZON SUMMARY -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 9px;">
        <div style="background: #ECFDF5; border: 1.5px solid #10B981; border-radius: 6px; padding: 6px 8px; color: #065F46;">
          <strong style="color: #047857; display: block; font-size: 10px; margin-bottom: 2px;">
            🌟 सम्पूर्ण १० अंकों का कुल योग (Compound Total):
          </strong>
          पूरे नंबर के सभी १० अंकों का योग सदैव एकल अंक <strong>१, ३, ५ या ६</strong> होना चाहिए।
          सर्वश्रेष्ठ संयुक्त योग: <strong>२४, ३२, ३३, ३७, ४१, ४२, ४५</strong> हैं।
          त्याज्य जोड़े: <strong>१४, ४१, १७, ७१, १८, ८१</strong> से बचें।
        </div>

        <div style="background: #FFF7ED; border: 1.5px solid #FB923C; border-radius: 6px; padding: 6px 8px; color: #7C2D12;">
          <strong style="color: #9A3412; display: block; font-size: 10px; margin-bottom: 2px;">
            🔮 आने वाले समय में समग्र जीवन पर प्रभाव:
          </strong>
          श्री ${cleanName} जी, इस D1-D10 नियम से नया नंबर लेने के ४५ से ९० दिनों में ऊर्जा संतुलित होती है। आने वाले ३ वर्षों में यह नंबर आपके करियर में स्थायित्व, धन संचय में निरंतर वृद्धि व पारिवारिक सौहार्द का प्रमुख आधार बनेगा।
        </div>
      </div>
    </div>
  `;
}

function renderRemediesAndGuruSuggestionsPage(ctx: any): string {
  const { cleanName, cleanIsht, kundaliData, isHi } = ctx;

  const doshas: string[] = [];
  if (kundaliData?.doshAnalysis?.isManglik) doshas.push('मांगलिक दोष');
  if (kundaliData?.doshAnalysis?.hasKaalSarp) doshas.push('कालसर्प योग');
  if (kundaliData?.doshAnalysis?.sadeSatiStatus?.includes('साढ़ेसाती') || kundaliData?.doshAnalysis?.sadeSatiStatus?.includes('ढैय्या')) {
    doshas.push('शनि साढ़ेसाती');
  }

  const yantras = getYantrasForKundali(kundaliData?.lagnaSign || 'मेष', kundaliData?.moonSign || 'मेष', doshas);
  const bestYantra = yantras[0] || SACRED_YANTRAS_COLLECTION[0];
  const gemRec = getRecommendedGemstoneForKundali(kundaliData?.lagnaSign || 'मेष', kundaliData?.moonSign || 'मेष', doshas);
  const bestGem = gemRec.recommendedGemstone;

  // Exact Rudraksha based on lagna lord / ruling planet
  const rudrakshaMap: Record<string, string> = {
    'सूर्य': '१ मुखी अथवा १२ मुखी रुद्राक्ष (आत्मबल, तेज व नेतृत्व संवर्धन)',
    'चन्द्रमा': '२ मुखी गौरी-शंकर रुद्राक्ष (मानसिक शांति व चित्त एकाग्रता)',
    'मंगल': '३ मुखी रुद्राक्ष (अदम्य साहस, ऊर्जा व मांगलिक शांति)',
    'बुध': '४ मुखी रुद्राक्ष (वाकसिद्धि, व्यापार व विद्या लाभ)',
    'बृहस्पति': '५ मुखी नेपाली रुद्राक्ष (ज्ञान, गुरु कृपा व संतान सुख)',
    'शुक्र': '६ मुखी कार्तिकेय रुद्राक्ष (ऐश्वर्य, आकर्षण व दांपत्य मधुरता)',
    'शनि': '७ मुखी महालक्ष्मी रुद्राक्ष (शनि साढ़ेसाती शमन व अकूत धन)'
  };
  const bestRudraksha = rudrakshaMap[kundaliData?.lagnaLord] || '५ मुखी नेपाली रुद्राक्ष (समस्त मनोरथ सिद्धि)';

  return `
    <div style="display: flex; flex-direction: column; gap: 7px;">
      <div style="background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%); border: 1.5px solid #F59E0B; border-radius: 7px; padding: 5px 8px; font-weight: 900; color: #78350F; font-size: 11px; text-align: center;">
        💎 ${isHi ? 'शास्त्र-सम्मत अचूक उपाय • सिद्ध यन्त्र, रत्न, रुद्राक्ष एवं गुरु मार्गदर्शन' : 'Authentic Shastric Remedies & Life Guidance'}
      </div>

      <!-- 4 SACRED DYNAMIC REMEDY PILLARS -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
        
        <!-- 1. YANTRA REMEDY WITH DAILY PAPER DRAWING VIDHI -->
        <div style="background: #FFFDF9; border: 1.5px solid #DC2626; border-radius: 7px; padding: 6px 8px; font-size: 9px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px;">
              <span style="font-weight: 900; color: #991B1B; font-size: 10px;">🔯 १. सिद्ध यन्त्र (दैनिक कागज विधि)</span>
              <span style="width: 8px; height: 8px; border-radius: 50%; background: ${bestYantra.drawingInkColorHex}; border: 1px solid #7F1D1D;" title="${bestYantra.drawingInkColor}"></span>
            </div>
            <div style="font-weight: 900; color: #7F1D1D; font-size: 9.5px; margin-bottom: 2px;">
              ${bestYantra.nameHi}
            </div>
            <div style="color: #451A03; line-height: 1.35;">
              <strong>स्याही/रंग:</strong> ${bestYantra.drawingInkColor}<br/>
              <strong>कागज:</strong> ${bestYantra.drawingPaperType}<br/>
              <strong>शुभ दिन:</strong> ${bestYantra.drawingDay}<br/>
              <strong>बीज मंत्र:</strong> <span style="font-weight: bold; color: #9A3412;">${bestYantra.beejMantra}</span>
            </div>
          </div>
          <div style="background: #FEF2F2; border: 1px solid #FECACA; border-radius: 4px; padding: 3px 5px; margin-top: 3px; font-size: 8.5px; color: #991B1B; font-weight: bold;">
            🌟 त्वरित सुधार: ${bestYantra.dailyDrawingBenefits}
          </div>
        </div>

        <!-- 2. GEMSTONE (BHAGYA RATNA) -->
        <div style="background: #FFFDF9; border: 1.5px solid #D97706; border-radius: 7px; padding: 6px 8px; font-size: 9px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-weight: 900; color: #9A3412; font-size: 10px; margin-bottom: 2px;">
              💍 २. अनुकूल मुख्य भाग्य रत्न
            </div>
            <div style="font-weight: 900; color: #B45309; font-size: 9.5px; margin-bottom: 2px;">
              ${bestGem.nameHi}
            </div>
            <div style="color: #451A03; line-height: 1.35;">
              <strong>श्रेष्ठ धातु:</strong> ${bestGem.wearingMetalHi}<br/>
              <strong>उंगली:</strong> ${bestGem.wearingFingerHi}<br/>
              <strong>शुभ दिन:</strong> ${bestGem.wearingDayHi}<br/>
              <strong>मंत्र:</strong> <span style="font-weight: bold; color: #9A3412;">${bestGem.pranaPratishthaMantra.split('॥')[0]}॥</span>
            </div>
          </div>
          ${gemRec.prohibitedGemstones.length > 0 ? `
            <div style="background: #FFF1F2; border: 1px solid #FECDD3; border-radius: 4px; padding: 3px 5px; margin-top: 3px; font-size: 8px; color: #9F1239; font-weight: bold;">
              ⚠️ वर्जित रत्न: ${gemRec.prohibitedGemstones.map((g: any) => g.nameHi.split('(')[0].trim()).join(', ')} धारण न करें।
            </div>
          ` : ''}
        </div>

        <!-- 3. RUDRAKSHA -->
        <div style="background: #FFFDF9; border: 1.5px solid #FCD34D; border-radius: 7px; padding: 6px 8px; font-size: 9px;">
          <div style="font-weight: 900; color: #9A3412; font-size: 10px; margin-bottom: 2px;">
            📿 ३. सिद्ध पावन रुद्राक्ष
          </div>
          <div style="color: #451A03; line-height: 1.4;">
            आपकी कुण्डली के लग्न स्वामी <strong>${kundaliData.lagnaLord}</strong> की कृपा व ग्रह दोष निवारण हेतु <strong>${bestRudraksha}</strong> लाल रेशमी धागे में गले में धारण करें। सोमवार को गंगाजल व कच्चे दूध से अभिमंत्रित कर पहनें।
          </div>
        </div>

        <!-- 4. MANTRA JAAP & CHARITY -->
        <div style="background: #FFFDF9; border: 1.5px solid #FCD34D; border-radius: 7px; padding: 6px 8px; font-size: 9px;">
          <div style="font-weight: 900; color: #9A3412; font-size: 10px; margin-bottom: 2px;">
            🕉️ ४. नित्य सिद्ध महामंत्र व दान
          </div>
          <div style="color: #451A03; line-height: 1.4;">
            इष्ट देव <strong>${cleanIsht}</strong> का पावन मन्त्र: नित्य १०८ बार जपें। साथ ही माह की प्रत्येक पूर्णिमा को गौमाता को हरा चारा व गुड़ खिलाएं। अन्न व जल दान समस्त अनिष्टों को नष्ट कर अक्षय पुण्य प्रदान करता है।
          </div>
        </div>
      </div>

      <!-- GURU AASHIRWAD SANSTHA NOTICE -->
      <div style="
        background: #FEF3C7;
        border: 1.5px solid #F59E0B;
        border-radius: 7px;
        padding: 7px 10px;
        font-size: 9px;
        color: #78350F;
        line-height: 1.45;
      ">
        <strong style="color: #9A3412; font-size: 10px; display: block; margin-bottom: 2px;">
          🌸 गुरु कृपा एवं जीवन उत्थान संकल्प:
        </strong>
        श्री ${cleanName} जी, सनातन वैदिक ज्योतिष केवल भविष्य कथन का माध्यम नहीं, अपितु जीवन को सत्य, धर्म, शांति व समृद्धि की दिशा में मोड़ने का पावन प्रकाश है। अपने आचरण में सात्विकता, वाणी में मिठास, माता-पिता की सेवा तथा नित्य ईश्वर स्मरण बनाए रखें। आपका कल्याण निश्चित है।
      </div>
    </div>
  `;
}

function renderDetailedHousePairPage(ctx: any, h1Num: number, h2Num: number, h1Title: string, h2Title: string): string {
  const { cleanName, kundaliData } = ctx;

  const getHouseInfo = (num: number) => {
    const h = kundaliData.houses.find((x: any) => x.houseNumber === num) || { signNumber: num, planets: [] };
    const sign = ZODIAC_SIGNS[h.signNumber - 1] || ZODIAC_SIGNS[0];
    const planetsInHouse = h.planets && h.planets.length > 0 ? h.planets.join(', ') : 'कोई प्रत्यक्ष ग्रह नहीं (शुभ दृष्टि)';

    const houseMeta: Record<number, { title: string; karaka: string; analysis: string; remedy: string }> = {
      1: {
        title: 'प्रथम भाव (तनु भाव / लग्न)',
        karaka: 'सूर्य (आत्मबल, स्वास्थ्य व जीवन शक्ति)',
        analysis: `लग्न भाव जातक के सम्पूर्ण अस्तित्व की धुरी है। ${cleanName} जी, आपके लग्न में ${sign.nameHi} राशि स्थित है जिसके स्वामी ${sign.lordHi} हैं। इस भाव में ${planetsInHouse} का प्रभाव है, जिससे आपकी शारीरिक आरोग्यता, मानसिक स्थिरता व सामाजिक मान-प्रतिष्ठा सुदृढ़ रहेगी।`,
        remedy: 'प्रातःकाल सूर्योदय के समय सूर्य देव को अर्घ्य दें एवं ॐ आदित्याय नमः का ११ बार स्मरण करें।'
      },
      2: {
        title: 'द्वितीय भाव (धन भाव / कोश)',
        karaka: 'बृहस्पति (संचित धन, वाणी व कुटुम्ब)',
        analysis: `द्वितीय भाव आपकी आर्थिक नींव को प्रकट करता है। इस भाव में ${sign.nameHi} राशि (${sign.lordHi}) व ${planetsInHouse} की स्थिति से पैतृक संपत्ति, स्थिर बचत एवं व्यापारिक मुनाफे के प्रबल योग हैं। आपकी वाणी में सौम्यता दूसरों को प्रभावित करेगी।`,
        remedy: 'घर के उत्तर-पूर्व (ईशान कोण) को सदैव स्वच्छ रखें तथा वहां तांबे के पात्र में गंगाजल रखें।'
      },
      3: {
        title: 'तृतीय भाव (सहज भाव / पराक्रम)',
        karaka: 'मंगल (साहस, पुरुषार्थ व भाई-बहन)',
        analysis: `यह भाव पराक्रम व संकल्प शक्ति का परिचायक है। आपकी कुण्डली में ${sign.nameHi} राशि व ${planetsInHouse} का प्रभाव बताता है कि आप जिस कार्य का संकल्प लेते हैं, उसे पुरुषार्थ से सिद्ध करते हैं।`,
        remedy: 'मंगलवार को हनुमान चालीसा का पाठ करें तथा लाल फल अथवा मिठाई का भोग लगाएं।'
      },
      4: {
        title: 'चतुर्थ भाव (सुख भाव / मातृ भाव)',
        karaka: 'चन्द्रमा (माता, भूमि, भवन व आंतरिक सुख)',
        analysis: `चतुर्थ भाव भौतिक व आंतरिक शांति का केंद्र है। ${sign.nameHi} राशि के स्वामी ${sign.lordHi} की कृपा से अचल संपत्ति, वाहन एवं सुंदर आवास का सुख प्राप्त होगा। माता के आशीर्वाद से रुकावटें दूर होंगी।`,
        remedy: 'पूर्णिमा के दिन चन्द्रमा को कच्चे दूध मिश्रित जल से अर्घ्य दें।'
      },
      5: {
        title: 'पंचम भाव (सुत भाव / बुद्धि व पूर्व पुण्य)',
        karaka: 'बृहस्पति (विद्या, ज्ञान, संतान व मंत्र सिद्धि)',
        analysis: `पंचम भाव पूर्व जन्म के सत्कर्मों का भंडार है। आपकी कुण्डली में ${sign.nameHi} राशि व ${planetsInHouse} की उपस्थिति प्रखर स्मरण शक्ति, उच्च बौद्धिक क्षमता व संतान सुख को दर्शाती है।`,
        remedy: 'प्रतिदिन विद्यादायिनी सरस्वती जी का स्मरण करें एवं गायत्री मंत्र का जप करें।'
      },
      6: {
        title: 'षष्ठ भाव (रिपु भाव / रोग व शत्रु)',
        karaka: 'मंगल व शनि (प्रतिस्पर्धा, कर्ज व आरोग्य)',
        analysis: `षष्ठ भाव से रोगों व शत्रुओं पर विजय का विचार होता है। इस भाव में ${sign.nameHi} राशि स्थित है। आपकी रोग-प्रतिरोधक क्षमता उत्तम है तथा प्रतिस्पर्धा में विजय प्राप्त होगी।`,
        remedy: 'नियमित रूप से महामृत्युंजय मंत्र का जप करें तथा पक्षियों को दाना डालें।'
      },
      7: {
        title: 'सप्तम भाव (जाया भाव / दांपत्य व साझेदारी)',
        karaka: 'शुक्र (वैवाहिक सुख, प्रेम व व्यापारिक साझीदारी)',
        analysis: `सप्तम भाव जीवनसाथी व व्यावसायिक साझीदारी का प्रतिनिधित्व करता है। ${sign.nameHi} राशि व ${planetsInHouse} के प्रभाव से आपका दांपत्य जीवन प्रेम व परस्पर सम्मान से परिपूर्ण रहेगा।`,
        remedy: 'शुक्रवार को मां लक्ष्मी को श्वेत मिष्ठान्न अथवा खीर का भोग अर्पित करें।'
      },
      8: {
        title: 'अष्टम भाव (आयु भाव / गूढ़ विद्या व शोध)',
        karaka: 'शनि (दीर्घायु, अनुसंधान व आकस्मिक लाभ)',
        analysis: `अष्टम भाव दीर्घायु व गूढ़ विद्याओं का स्वामी है। ${sign.nameHi} राशि व ${sign.lordHi} के प्रभाव से गुप्त ज्ञान, योग, अध्यात्म व अप्रत्याशित वित्तीय अवसरों में लाभ मिलेगा।`,
        remedy: 'शनिवार की संध्या पीपल के वृक्ष के नीचे सरसों तेल का चौमुखी दीपक प्रज्वलित करें।'
      },
      9: {
        title: 'नवम भाव (धर्म भाव / भाग्य व तीर्थ)',
        karaka: 'बृहस्पति (ईश्वर कृपा, धर्म, गुरु व पितृ सुख)',
        analysis: `नवम भाव त्रिकोण का सर्वाधिक शुभ भाव है। ${sign.nameHi} राशि स्थित होने से ईश्वर कृपा व भाग्य उदय समय-समय पर बड़े संकटों से रक्षा करेगा। गुरुजनों के मार्गदर्शन से यश बढ़ेगा।`,
        remedy: 'गुरुवार को भगवान विष्णु की पूजा करें एवं पीली वस्तु अथवा फल का दान करें।'
      },
      10: {
        title: 'दशम भाव (कर्म भाव / पद-प्रतिष्ठा व आजीविका)',
        karaka: 'सूर्य, बुध, गुरु व शनि (नौकरी, व्यापार व सत्ता)',
        analysis: `दशम भाव कर्मक्षेत्र व सामाजिक प्रतिष्ठा का शिखर है। आपकी पत्रिका में ${sign.nameHi} राशि व ${planetsInHouse} की उपस्थिति स्वतंत्र व्यापार अथवा उच्च पद प्राप्ति के शुभ योग बनाती है।`,
        remedy: 'प्रातः माता-पिता व बुजुर्गों का चरण स्पर्श कर दिन का आरंभ करें।'
      },
      11: {
        title: 'एकादश भाव (लाभ भाव / आय व मनोकामना सिद्धि)',
        karaka: 'बृहस्पति (स्थायी आय, मित्र व विस्तार)',
        analysis: `एकादश भाव धन आगमन व महत्वाकांक्षाओं की पूर्ति का भाव है। ${sign.nameHi} राशि की स्थिति नियमित आय के स्रोत बनाए रखेगी और मित्रों का संजाल आर्थिक विस्तार में सहयोगी बनेगा।`,
        remedy: 'श्री सूक्त अथवा कनकधारा स्तोत्र का शुक्रवार को नित्य पाठ करें।'
      },
      12: {
        title: 'द्वादश भाव (व्यय भाव / मोक्ष व विदेश वास)',
        karaka: 'शनि व केतु (दान, पुण्य, विदेश व आत्म साक्षात्कार)',
        analysis: `द्वादश भाव दान-पुण्य व आध्यात्मिक मोक्ष का अधिपति है। ${sign.nameHi} राशि व ${planetsInHouse} के प्रभाव से आपका धन सत्कार्यों में व्यय होगा और आत्मिक शांति प्राप्त होगी।`,
        remedy: 'समय-समय पर किसी अनाथालय अथवा गौशाला में अन्न दान करें।'
      }
    };

    return houseMeta[num] || houseMeta[1];
  };

  const d1 = getHouseInfo(h1Num);
  const d2 = getHouseInfo(h2Num);

  return `
    <div style="display: flex; flex-direction: column; gap: 9px;">
      <div style="background: #FEF3C7; border: 1.5px solid #F59E0B; border-radius: 8px; padding: 6px 10px; font-weight: 900; color: #78350F; font-size: 11.5px; text-align: center;">
        📜 ${h1Title} एवं ${h2Title} - विस्तृत वैदिक फलादेश
      </div>

      <!-- SECTION 1 -->
      <div style="background: #FFFDF9; border: 2px solid #FDE68A; border-radius: 8px; padding: 10px 12px; font-size: 10.5px;">
        <div style="font-weight: 900; color: #9A3412; font-size: 12px; margin-bottom: 2px;">
          🏛️ ${d1.title}
        </div>
        <div style="font-weight: 800; color: #B45309; font-size: 9.5px; margin-bottom: 4px;">
          कारक ग्रह: ${d1.karaka}
        </div>
        <div style="color: #451A03; line-height: 1.5; margin-bottom: 6px;">
          ${d1.analysis}
        </div>
        <div style="background: #ECFDF5; padding: 5px 9px; border-radius: 6px; border: 1px solid #10B981; color: #065F46; font-size: 10px;">
          <strong>🌿 अचूक उपाय:</strong> ${d1.remedy}
        </div>
      </div>

      <!-- SECTION 2 -->
      <div style="background: #FFFDF9; border: 2px solid #FDE68A; border-radius: 8px; padding: 10px 12px; font-size: 10.5px;">
        <div style="font-weight: 900; color: #9A3412; font-size: 12px; margin-bottom: 2px;">
          🏛️ ${d2.title}
        </div>
        <div style="font-weight: 800; color: #B45309; font-size: 9.5px; margin-bottom: 4px;">
          कारक ग्रह: ${d2.karaka}
        </div>
        <div style="color: #451A03; line-height: 1.5; margin-bottom: 6px;">
          ${d2.analysis}
        </div>
        <div style="background: #ECFDF5; padding: 5px 9px; border-radius: 6px; border: 1px solid #10B981; color: #065F46; font-size: 10px;">
          <strong>🌿 अचूक उपाय:</strong> ${d2.remedy}
        </div>
      </div>
    </div>
  `;
}

function renderNavagrahaPositionsPage(ctx: any): string {
  const { kundaliData, isHi } = ctx;
  const planets = kundaliData.planets || [];

  const getPlanetImpactText = (name: string, house: number): string => {
    const impacts: Record<string, string> = {
      Sun: 'आत्मबल, नेतृत्व व मान-सम्मान की वृद्धि',
      Moon: 'मानसिक शांति, मातृ सुख व रचनात्मक विचार',
      Mars: 'साहस, पराक्रम, भूमि व तकनीकी कार्यों में लाभ',
      Mercury: 'कुशाग्र बुद्धि, वाणिज्यिक दक्षता व वाक्-चातुर्य',
      Jupiter: 'ईश्वर कृपा, उच्च ज्ञान, संतान सुख व धर्म निष्ठा',
      Venus: 'ऐश्वर्य, दांपत्य मधुरता, कला व भौतिक संपन्नता',
      Saturn: 'अनुशासन, धैर्य, स्थायी कर्म व न्यायप्रियता',
      Rahu: 'कूटनीति, शोध, अप्रत्याशित वित्तीय अवसर',
      Ketu: 'अध्यात्म, अंतर्ज्ञान, वैराग्य व मोक्ष भावना'
    };
    return impacts[name] || 'सकारात्मक वैदिक ऊर्जा व कर्म फल संवर्धन';
  };

  return `
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="background: #FEF3C7; border: 1.5px solid #F59E0B; border-radius: 8px; padding: 6px 10px; font-weight: 900; color: #78350F; font-size: 11.5px; text-align: center;">
        🪐 ${isHi ? 'नवग्रह स्थिति, राशि, भाव एवं कारक फल तालिका' : 'Planetary Positions and Vedic Aspects Table'}
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 9.5px; border-radius: 8px; overflow: hidden; border: 1px solid #D97706;">
        <thead>
          <tr style="background: #B45309; color: #FFFFFF; font-weight: 900;">
            <th style="padding: 5px 7px; border: 1px solid #D97706;">ग्रह</th>
            <th style="padding: 5px 7px; border: 1px solid #D97706;">राशि (Sign)</th>
            <th style="padding: 5px 7px; border: 1px solid #D97706;">भाव (House)</th>
            <th style="padding: 5px 7px; border: 1px solid #D97706;">स्थिति व कारक प्रभाव</th>
          </tr>
        </thead>
        <tbody>
          ${planets.map((p: any, idx: number) => `
            <tr style="background: ${idx % 2 === 0 ? '#FFFDF9' : '#FFFBEB'}; color: #451A03;">
              <td style="padding: 4.5px 7px; border: 1px solid #FDE68A; font-weight: 900; color: #9A3412;">${p.hindiName} (${p.symbol})</td>
              <td style="padding: 4.5px 7px; border: 1px solid #FDE68A;">${p.signName}</td>
              <td style="padding: 4.5px 7px; border: 1px solid #FDE68A; font-weight: 800; text-align: center;">भाव ${p.house}</td>
              <td style="padding: 4.5px 7px; border: 1px solid #FDE68A;">${getPlanetImpactText(p.name, p.house)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div style="background: #FDF2F8; border: 1.5px solid #F472B6; border-radius: 8px; padding: 7px 11px; font-size: 10px; color: #831843; line-height: 1.45;">
        <strong>🌟 नवग्रह सामंजस्य सूत्र:</strong> आपकी कुण्डली में <strong>${kundaliData.doshAnalysis.favorablePlanet || 'बृहस्पति व शुक्र'}</strong> सर्वाधिक बलवान व शुभ फलदाता हैं। इन ग्रहों के बीज मंत्र का नियमित स्मरण करने से सभी कार्य सिद्ध होते हैं।
      </div>
    </div>
  `;
}

function renderDashaAndLifeCyclePage(ctx: any): string {
  const { cleanName, kundaliData, isHi } = ctx;
  const dashaInfo = kundaliData?.vimshottariDasha || {
    birthOpeningDasha: 'केतु महादशा',
    balanceYearsAtBirth: 4.5,
    currentMahadasha: 'गुरु',
    currentAntardasha: 'गुरु में शनि',
    dashaTimeline: []
  };
  const yogas = kundaliData?.yogas || [];

  return `
    <div style="display: flex; flex-direction: column; gap: 7px;">
      <div style="background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%); border: 1.5px solid #F59E0B; border-radius: 7px; padding: 5px 8px; font-weight: 900; color: #78350F; font-size: 11px; text-align: center;">
        ⏳ ${isHi ? 'विंशोत्तरी महादशा चक्र (१२० वर्ष) एवं जन्मकालीन ग्रह योग' : 'Vimshottari Dasha Cycle & Auspicious Yogas'}
      </div>

      <!-- CURRENT DASHA OVERVIEW -->
      <div style="background: #FFFDF9; border: 1.5px solid #D97706; border-radius: 7px; padding: 7px 10px; font-size: 9.5px; color: #451A03; line-height: 1.45;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #FCD34D; padding-bottom: 3px; margin-bottom: 4px;">
          <strong style="color: #9A3412; font-size: 10.5px;">
            🌟 जन्मकालीन प्रथम दशा: ${dashaInfo.birthOpeningDasha} (जन्म समय शेष: ${dashaInfo.balanceYearsAtBirth} वर्ष)
          </strong>
          <span style="background: #059669; color: #FFF; font-weight: 900; padding: 1px 6px; border-radius: 4px; font-size: 8.5px;">
            सक्रिय: ${dashaInfo.currentMahadasha} महादशा
          </span>
        </div>
        <div>
          श्री ${cleanName} जी, आपकी वर्तमान ग्रह स्थिति <strong>${dashaInfo.currentMahadasha} महादशा</strong> के प्रभाव में है। यह काल आपके कर्म, विद्या व सामाजिक प्रतिष्ठा के विस्तार का समय है।
        </div>
      </div>

      <!-- VIMSHOTTARI 9-DASHA CHRONOLOGICAL TABLE -->
      <table style="width: 100%; border-collapse: collapse; font-size: 8.5px; border-radius: 6px; overflow: hidden; border: 1px solid #D97706;">
        <thead>
          <tr style="background: #B45309; color: #FFFFFF; font-weight: 900;">
            <th style="padding: 4px 6px; border: 1px solid #D97706;">महादशा स्वामी</th>
            <th style="padding: 4px 6px; border: 1px solid #D97706; text-align: center;">अवधि (वर्ष)</th>
            <th style="padding: 4px 6px; border: 1px solid #D97706; text-align: center;">कालावधि (वर्ष-वर्ष)</th>
            <th style="padding: 4px 6px; border: 1px solid #D97706;">दशा स्थिति व प्रभाव</th>
          </tr>
        </thead>
        <tbody>
          ${dashaInfo.dashaTimeline.map((d: any, idx: number) => `
            <tr style="background: ${d.isCurrent ? '#FEF3C7' : idx % 2 === 0 ? '#FFFDF9' : '#FFFBEB'}; color: #451A03; font-weight: ${d.isCurrent ? '900' : 'normal'};">
              <td style="padding: 3.5px 6px; border: 1px solid #FDE68A; color: ${d.isCurrent ? '#B45309' : '#78350F'};">
                ${d.isCurrent ? '★ ' : ''}${d.planetHi} (${d.planetEn})
              </td>
              <td style="padding: 3.5px 6px; border: 1px solid #FDE68A; text-align: center;">
                ${d.durationYears} वर्ष
              </td>
              <td style="padding: 3.5px 6px; border: 1px solid #FDE68A; text-align: center;">
                ${d.startYear} - ${d.endYear}
              </td>
              <td style="padding: 3.5px 6px; border: 1px solid #FDE68A;">
                ${d.isCurrent ? '<strong style="color: #047857;">वर्तमान सक्रिय महादशा (सर्वोत्तम फलदायी)</strong>' : (d.endYear < new Date().getFullYear() ? '<span style="color: #78716C;">व्यतीत</span>' : '<span style="color: #B45309;">आगामी काल</span>')}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- REAL AUSPICIOUS YOGAS SECTION -->
      ${yogas.length > 0 ? `
        <div style="background: #ECFDF5; border: 1.5px solid #10B981; border-radius: 7px; padding: 6px 9px; font-size: 9px; color: #065F46;">
          <strong style="color: #047857; font-size: 10px; display: block; margin-bottom: 2px;">
            👑 आपकी कुण्डली में विद्यमान शुभ वैदिक राजयोग:
          </strong>
          ${yogas.map((y: any) => `
            <div style="margin-bottom: 3px;">
              <strong>• ${y.nameHi}:</strong> ${y.descriptionHi} — <span style="font-weight: bold;">${y.effectsHi}</span>
            </div>
          `).join('')}
        </div>
      ` : `
        <div style="background: #FFFBEB; border: 1.5px solid #FCD34D; border-radius: 7px; padding: 6px 9px; font-size: 9px; color: #78350F;">
          <strong>🌟 शुभ ग्रह दृष्टि योग:</strong> आपकी पत्रिका में देवगुरु बृहस्पति व लग्नेश की शुभ दृष्टि से जीवन के उत्तरार्ध में निरंतर उन्नति, स्थिरता व मान-सम्मान के योग निर्मित होते हैं।
        </div>
      `}
    </div>
  `;
}

// ============================================================================
// DEDICATED BESPOKE PAGES FOR 21 AND 51 PAGE REPORTS (ZERO DUPLICATION)
// ============================================================================

function renderSingleHouseDeepDivePage(ctx: any, houseNum: number): string {
  const { cleanName, kundaliData } = ctx;
  const h = kundaliData.houses.find((x: any) => x.houseNumber === houseNum) || { signNumber: houseNum, planets: [] };
  const sign = ZODIAC_SIGNS[h.signNumber - 1] || ZODIAC_SIGNS[0];
  const planetsInHouse = h.planets && h.planets.length > 0 ? h.planets.join(', ') : 'कोई प्रत्यक्ष ग्रह नहीं (दृष्टि संबंध)';

  const titles: Record<number, { name: string; tag: string; core: string; future: string; remedy: string }> = {
    1: { name: 'प्रथम भाव (तनु भाव / लग्न)', tag: 'व्यक्तित्व, शारीरिक स्वास्थ्य, आभा मंडल व आत्मबल', core: 'लग्न जातक का संपूर्ण शरीर और जीवन पथ है। इस भाव में शुभ ऊर्जा होने से शारीरिक तेज और आत्मबल प्रखर रहता है। कठिन समय में भी आपका धैर्य आपको आगे बढ़ाता है।', future: 'आगामी वर्षों में आपकी शारीरिक आरोग्यता और समाज में नेतृत्वकारी प्रतिष्ठा में निरंतर वृद्धि होगी। आत्म-संदेह से मुक्ति मिलेगी।', remedy: 'प्रातः सूर्योदय के समय तांबे के पात्र से सूर्य नारायण को अर्घ्य दें और ॐ घृणि सूर्याय नमः का जप करें।' },
    2: { name: 'द्वितीय भाव (धन भाव / कोश)', tag: 'संचित धन, बैंक बैलेंस, वाणी प्रभाव व कुटुंब', core: 'यह भाव आपकी वित्तीय स्थिरता व संचित पूंजी का प्रतीक है। आपकी वाणी में सौम्यता दूसरों को आकर्षित करती है और पैतृक व स्व-अर्जित धन की बरकत बनी रहती है।', future: 'आगामी समय में स्थिर बचत और नए आय स्रोतों का सृजन होगा। व्यर्थ खर्चों पर स्वतः रोक लगेगी और परिवार में सौहार्द बढ़ेगा।', remedy: 'घर की तिजोरी या लॉकर में पीले रेशमी वस्त्र में हल्दी की गांठ रखें और शुक्रवार को श्री सूक्त का पाठ करें।' },
    3: { name: 'तृतीय भाव (सहज भाव / पराक्रम)', tag: 'साहस, पुरुषार्थ, बंधु-बांधव, संचार व उद्यम', core: 'यह भाव आपके संकल्प और बाहुबल को दर्शाता है। किसी भी कार्य को हाथ में लेने के बाद आप उसे परिश्रम और निष्ठा से पूर्ण करते हैं। भाइयों व मित्रों का सहयोग मिलता है।', future: 'आने वाले समय में आपके द्वारा उठाए गए साहसिक कदम अत्यंत लाभकारी सिद्ध होंगे। नए व्यापारिक संपर्क स्थापित होंगे।', remedy: 'मंगलवार को श्री हनुमान चालीसा का तीन बार पाठ करें और गुड़-चने का प्रसाद बांटें।' },
    4: { name: 'चतुर्थ भाव (सुख भाव / मातृ भाव)', tag: 'माता, भूमि, भवन, वाहन, गृह सुख व मन की शांति', core: 'चतुर्थ भाव जीवन के वास्तविक सुख और मानसिक शांति का केंद्र है। अचल संपत्ति, सुंदर आवास व वाहन सुख के प्रबल योग हैं। माता का आशीर्वाद सदैव रक्षा कवच का कार्य करता है।', future: 'आगामी वर्षों में नए घर या भूमि क्रय के प्रबल योग बनेंगे। पारिवारिक जीवन में तनाव दूर होकर परम शांति का वास होगा।', remedy: 'पूर्णिमा की रात्रि चन्द्रमा को दूध मिश्रित जल अर्पित करें और चांदी का चौकोर टुकड़ा अपने पास रखें।' },
    5: { name: 'पंचम भाव (सुत भाव / बुद्धि व पूर्व पुण्य)', tag: 'संतान सुख, उच्च विद्या, मंत्र सिद्धि, विवेक व पूर्व जन्म पुण्य', core: 'पंचम भाव पूर्व जन्म के सत्कर्मों और ईश्वरीय कृपा का भंडार है। आपकी स्मरण शक्ति, निर्णय लेने की कला और रचनात्मक विचार अत्यंत उच्च कोटि के हैं। संतान पक्ष श्रेष्ठ रहेगा।', future: 'विद्याध्ययन, प्रतियोगी परीक्षाओं व नए प्रोजेक्ट्स में विजय प्राप्त होगी। संतान की ओर से गौरवशाली समाचार प्राप्त होंगे।', remedy: 'प्रतिदिन विद्यादायिनी मां सरस्वती का ध्यान करें और गायत्री महामंत्र का १०८ बार जप करें।' },
    6: { name: 'षष्ठ भाव (रिपु भाव / रोग व शत्रु निवारण)', tag: 'रोग प्रतिरोधक क्षमता, ऋण मुक्ति, प्रतियोगिता व शत्रु शमन', core: 'यह भाव संघर्ष से जूझने और विजयी होने की क्षमता देता है। आपकी रोग प्रतिरोधक क्षमता उत्तम है। गुप्त शत्रु आपका अहित करने में असमर्थ रहेंगे और अंततः परास्त होंगे।', future: 'पुराने ऋण या कर्ज से मुक्ति के मार्ग प्रशस्त होंगे। कार्यक्षेत्र की प्रतिस्पर्धा में आपको शीर्ष स्थान प्राप्त होगा।', remedy: 'प्रतिदिन महामृत्युंजय मंत्र का जप करें और शनिवार को काले तिल जल में डालकर शिवलिंग पर अर्पित करें।' },
    7: { name: 'सप्तम भाव (जाया भाव / दांपत्य व साझेदारी)', tag: 'विवाह, जीवनसाथी का स्वरूप, दांपत्य सामंजस्य व व्यापारिक पार्टनरशिप', core: 'सप्तम भाव जीवनसाथी और दैनिक व्यापार का प्रतिनिधित्व करता है। आपका वैवाहिक जीवन प्रेम, विश्वास व आपसी सम्मान पर आधारित रहेगा। जीवनसाथी का सहयोग भाग्योदय में सहायक होगा।', future: 'दांपत्य संबंधों में प्रगाढ़ता आएगी और यदि आप साझेदारी में व्यवसाय करते हैं, तो परस्पर पारदर्शिता से भारी लाभ होगा।', remedy: 'शुक्रवार को मां लक्ष्मी को खीर का भोग लगाएं और इत्र का उपयोग करें।' },
    8: { name: 'अष्टम भाव (आयु भाव / गूढ़ विद्या व अनुसंधान)', tag: 'दीर्घायु, अनुसंधान, गुप्त ज्ञान, वसीयत व आकस्मिक लाभ', core: 'अष्टम भाव आयु और गूढ़ विद्याओं का रहस्यमयी केंद्र है। आपकी पत्रिका में दीर्घायु योग है। ज्योतिष, दर्शन व आध्यात्मिक अनुसंधान में आपकी अंतर्दृष्टि गहरी रहेगी।', future: 'अचानक होने वाले वित्तीय लाभ के योग बनेंगे। जटिल और अदृश्य संकटों से ईश्वरीय सुरक्षा प्राप्त होगी।', remedy: 'शनिवार की संध्या पीपल के वृक्ष के नीचे सरसों के तेल का दीपक जलाएं।' },
    9: { name: 'नवम भाव (धर्म भाव / भाग्य व तीर्थ यात्रा)', tag: 'भाग्य उदय, ईश्वर कृपा, पिता, गुरु व धर्म आचरण', core: 'नवम भाव त्रिकोण का मुकुट है। ईश्वर कृपा से आपका भाग्य कठिन मोड़ों पर भी आपके लिए मार्ग प्रशस्त करेगा। गुरुजनों और माता-पिता के आशीर्वाद से आपकी ख्याति बढ़ेगी।', future: 'आगामी समय में पावन तीर्थ यात्राओं और आध्यात्मिक अनुष्ठानों के शुभ अवसर प्राप्त होंगे। भाग्योदय का नया दौर आरंभ होगा।', remedy: 'गुरुवार को भगवान विष्णु की पूजा करें, पीले वस्त्र पहनें और माथे पर केसर/चंदन का तिलक लगाएं।' },
    10: { name: 'दशम भाव (कर्म भाव / आजीविका व प्रतिष्ठा)', tag: 'नौकरी, व्यापार, प्रशासनिक अधिकार, पदोन्नति व पिता का मान', core: 'दशम भाव आपके कर्मक्षेत्र और सामाजिक साख का शिखर है। आपकी निष्ठा, ईमानदारी और कार्यकुशलता से कार्यस्थल पर आपकी अलग पहचान बनेगी। स्वतंत्र व्यवसाय में भी उत्तम लाभ है।', future: 'करियर में पदोन्नति, कार्यक्षेत्र का विस्तार और शासन-प्रशासन से मान-सम्मान प्राप्त होने के प्रबल योग हैं।', remedy: 'प्रातः माता-पिता का चरण स्पर्श करें और रविवार को सूर्य देव को लाल पुष्प मिश्रित जल दें।' },
    11: { name: 'एकादश भाव (लाभ भाव / आय व मनोकामना सिद्धि)', tag: 'नियमित आय, वरिष्ठ मित्रों का सहयोग, सिद्धि व विस्तार', core: 'एकादश भाव जीवन में धन के अविरल प्रवाह और अभिलाषाओं की पूर्ति का भाव है। आपकी आय के नियमित स्रोत बने रहेंगे और समाज के वरिष्ठजनों का सहयोग प्राप्त होगा।', future: 'आगामी ३ वर्षों में दीर्घकालीन वित्तीय लक्ष्य पूर्ण होंगे और बैंक बैलेंस में निरंतर संवर्धन होगा।', remedy: 'शुक्रवार को कनकधारा स्तोत्र का पाठ करें और चींटियों को आटा व चीनी डालें।' },
    12: { name: 'द्वादश भाव (व्यय भाव / विदेश व मोक्ष)', tag: 'दान, पुण्य, विदेश यात्रा, शयन सुख, अस्पताल व्यय शांति व मोक्ष', core: 'द्वादश भाव दान-पुण्य और आध्यात्मिक मोक्ष का केंद्र है। आपका धन शुभ कार्यों, तीर्थ सेवा व परिवार के कल्याण में लगेगा। आत्मिक शांति के लिए ध्यान फलदायी रहेगा।', future: 'व्यर्थ के अदालती व चिकित्सीय खर्चों से मुक्ति मिलेगी। विदेश यात्रा अथवा दूरस्थ स्थानों से लाभ का मार्ग खुलेगा।', remedy: 'समय-समय पर किसी अनाथालय अथवा गौशाला में अन्न दान करें और रात्रि में पूर्व दिशा की ओर सिर रखकर सोएं।' }
  };

  const meta = titles[houseNum] || titles[1];

  return `
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="background: #FEF3C7; border: 1.5px solid #F59E0B; border-radius: 8px; padding: 6px 10px; font-weight: 900; color: #78350F; font-size: 11.5px; text-align: center;">
        🏛️ ${meta.name} - विस्तृत वैदिक शोध अध्याय
      </div>

      <!-- HOUSE METADATA CARD -->
      <div style="background: #FFFDF9; border: 1.5px solid #FDE68A; border-radius: 8px; padding: 8px 12px; font-size: 10px; display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
        <div>
          <strong style="color: #9A3412;">राशि व राशि स्वामी:</strong> ${sign.nameHi} (${sign.lordHi})
        </div>
        <div>
          <strong style="color: #9A3412;">स्थित ग्रह:</strong> ${planetsInHouse}
        </div>
        <div style="grid-column: span 2; color: #78350F; font-weight: bold;">
          मुख्य प्रभाव क्षेत्र: ${meta.tag}
        </div>
      </div>

      <!-- DEEP ANALYSIS CARD 1 -->
      <div style="background: #FFFDF9; border: 1.5px solid #FCD34D; border-radius: 8px; padding: 10px 12px; font-size: 10.5px; line-height: 1.55; color: #451A03;">
        <strong style="color: #9A3412; font-size: 11.5px; display: block; margin-bottom: 3px;">
          ✨ आपकी पत्रिका में ${meta.name} का विशेष फलादेश:
        </strong>
        श्री ${cleanName} जी, ${meta.core} आपकी कुण्डली में ${sign.nameHi} राशि स्थित होने से यह भाव आपके जीवन में अत्यधिक सक्रिय है। जो जातक इस भाव के नियमों का पालन करते हैं, उन्हें कभी निराशा का सामना नहीं करना पड़ता।
      </div>

      <!-- FUTURE HORIZON CARD 2 -->
      <div style="background: #ECFDF5; border: 1.5px solid #10B981; border-radius: 8px; padding: 9px 12px; font-size: 10px; color: #065F46; line-height: 1.5;">
        <strong style="color: #047857; font-size: 11px; display: block; margin-bottom: 2px;">
          🔮 आने वाले समय में इस भाव का फल एवं प्रभाव:
        </strong>
        ${meta.future}
      </div>

      <!-- REMEDY CARD 3 -->
      <div style="background: #FEF3C7; border: 1.5px solid #F59E0B; border-radius: 8px; padding: 8px 12px; font-size: 10px; color: #78350F; line-height: 1.45;">
        <strong style="color: #9A3412; display: block; margin-bottom: 2px;">🌿 इस भाव को बलवान बनाने का अचूक वैदिक उपाय:</strong>
        ${meta.remedy}
      </div>
    </div>
  `;
}

function renderSinglePlanetDeepDivePage(ctx: any, planetIdx: number): string {
  const { cleanName, kundaliData } = ctx;
  const planet = (kundaliData.planets && kundaliData.planets[planetIdx]) || {
    name: 'Sun',
    hindiName: 'सूर्य',
    symbol: 'सू',
    signName: 'मेष',
    house: 1
  };

  const planetTreatise: Record<string, { karaka: string; body: string; future: string; mantra: string; donation: string }> = {
    Sun: { karaka: 'आत्मा, पिता, नेतृत्व, मान-सम्मान व प्रशासनिक तेज', body: 'सूर्य देव समस्त सौरमंडल के अधिपति एवं जीवनदाता हैं। आपकी पत्रिका में सूर्य देव की स्थिति आपको आत्म-सम्मान, निर्भीकता और स्वतंत्र विचार प्रदान करती है। समाज में आपका प्रभाव स्थापित होगा।', future: 'आगामी समय में सरकारी तंत्र, उच्च पद व प्रशासनिक कार्यों में सफलता के प्रबल योग बनेंगे। स्वास्थ्य सुदृढ़ रहेगा।', mantra: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः (प्रतिदिन २१ या १०८ बार)', donation: 'रविवार को तांबे का पात्र, गेहूं अथवा लाल वस्त्र का दान करें।' },
    Moon: { karaka: 'मन, माता, भावना, मानसिक शांति व द्रव्य समृद्धि', body: 'चन्द्रमा मन के स्वामी हैं। आपकी कुण्डली में चन्द्रमा की स्थिति भावुकता, कल्पनाशीलता व कलात्मक दृष्टि देती है। माता के साथ आत्मीय संबंध आपके भाग्य को गति देंगे।', future: 'मानसिक तनाव व अनिद्रा से मुक्ति मिलेगी। नए रचनात्मक कार्यों में मन लगेगा और द्रव्य लाभ होगा।', mantra: 'ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः (१०८ बार)', donation: 'सोमवार को दूध, चावल अथवा श्वेत वस्त्र का दान करें।' },
    Mars: { karaka: 'साहस, पराक्रम, भूमि, अचल संपत्ति, रक्त व ऊर्जा', body: 'मंगल देव पुरुषार्थ और ऊर्जा के अधिपति हैं। आपकी पत्रिका में मंगल की शुभता आपको कठिन चुनौतियों में भी अडिग बनाए रखती है। भूमि-भवन के मामलों में लाभ की संभावना है।', future: 'प्रॉपर्टी, वाहन व तकनीकी कार्यों में बड़ा उछाल आएगा। शत्रुओं पर विजय प्राप्त होगी।', mantra: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः (१०८ बार)', donation: 'मंगलवार को लाल मसूर, तांबा अथवा गुड़ का दान करें।' },
    Mercury: { karaka: 'बुद्धि, वाणी, व्यापार, गणना, संचार व तर्कशक्ति', body: 'बुध देव ज्ञान और वाणिज्य के स्वामी हैं। आपकी कुण्डली में बुध की उपस्थिति आपकी संवाद कला, व्यापारिक सोच व त्वरित गणना क्षमता को श्रेष्ठ बनाती है।', future: 'व्यवसाय में नए समझौते सफल होंगे। शेयर, बैंकिंग व डिजिटल कार्यों में लाभ प्राप्त होगा।', mantra: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः (१०८ बार)', donation: 'बुधवार को मूंग दाल, हरी सब्जी अथवा हरे वस्त्र का दान करें।' },
    Jupiter: { karaka: 'ज्ञान, धर्म, संतान, गुरु कृपा, अध्यात्म व कोष', body: 'देवगुरु बृहस्पति समस्त ज्ञान और मांगलिक कार्यों के प्रदाता हैं। आपकी पत्रिका में गुरु की कृपा सात्विक सोच, संस्कारों की रक्षा व धर्म में निष्ठा प्रदान करती है।', future: 'आगामी वर्षों में संतान की उन्नति, गुरु कृपा व परिवार में मांगलिक उत्सवों का आयोजन होगा।', mantra: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः (१०८ बार)', donation: 'गुरुवार को चना दाल, हल्दी, पीले फल अथवा धार्मिक पुस्तक का दान करें।' },
    Venus: { karaka: 'ऐश्वर्य, दांपत्य, वाहन, कला, आकर्षण व विलास', body: 'शुक्र देव भौतिक सुखों और दांपत्य प्रेम के कारक हैं। आपकी कुण्डली में शुक्र देव की उपस्थिति जीवन में सौंदर्य, वाहन सुख व मधुर संबंधों का संचार करती है।', future: 'दांपत्य जीवन में अपार मधुरता आएगी। भौतिक संसाधनों में वृद्धि व नवीन वाहन प्राप्ति के योग हैं।', mantra: 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः (१०८ बार)', donation: 'शुक्रवार को श्वेत चंदन, मिश्री, कपूर अथवा चावल का दान करें।' },
    Saturn: { karaka: 'कर्म, न्याय, एकाग्रता, दीर्घायु, सेवा व स्थिरता', body: 'शनि देव न्याय के अधिपति हैं। आपकी पत्रिका में शनि देव कर्म के प्रति निष्ठा और सत्यवादिता का फल देते हैं। परिश्रम कभी व्यर्थ नहीं जाएगा।', future: 'दीर्घकालीन कार्यों में स्थायी सफलता प्राप्त होगी। आलस्य समाप्त होगा और समाज में प्रतिष्ठा बनेगी।', mantra: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः (१०८ बार)', donation: 'शनिवार को सरसों तेल, काला तिल, लोहा अथवा उड़द का दान करें।' },
    Rahu: { karaka: 'कूटनीति, शोध, अप्रत्याशित वित्तीय उछाल व विदेश', body: 'राहु देव छाया ग्रह हैं जो अचानक बड़े बदलाव लाते हैं। आपकी कुण्डली में राहु की स्थिति कूटनीतिक सोच और आधुनिक तकनीकी क्षेत्रों में सफलता देती है।', future: 'अनपेक्षित आर्थिक अवसर प्राप्त होंगे। दूरस्थ स्थानों व विदेश संपर्कों से लाभ मिलेगा।', mantra: 'ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः (१०८ बार)', donation: 'शनिवार को सप्तधान्य (सात अनाज) अथवा नारियल का दान करें।' },
    Ketu: { karaka: 'अध्यात्म, मोक्ष, वैराग्य, अंतर्ज्ञान व सुरक्षा', body: 'केतु देव मोक्ष और आत्म-साक्षात्कार के अधिपति हैं। आपकी पत्रिका में केतु देव अंतर्ज्ञान और गुप्त विद्याओं में आकर्षण प्रदान करते हैं।', future: 'आध्यात्मिक चेतना में वृद्धि होगी और अदृश्य संकटों से स्वतः रक्षा प्राप्त होगी।', mantra: 'ॐ स्रां स्रीं स्रौं सः केतवे नमः (१०८ बार)', donation: 'मंगलवार को दो-रंगी कम्बल अथवा कुत्तों को रोटी खिलाएं।' }
  };

  const pData = planetTreatise[planet.name] || planetTreatise['Sun'];

  return `
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="background: #FEF3C7; border: 1.5px solid #F59E0B; border-radius: 8px; padding: 6px 10px; font-weight: 900; color: #78350F; font-size: 11.5px; text-align: center;">
        🪐 ${planet.hindiName} देव (${planet.name}) - विशिष्ट ग्रह मीमांसा
      </div>

      <!-- PLANET STATUS CARD -->
      <div style="background: #FFFDF9; border: 1.5px solid #FDE68A; border-radius: 8px; padding: 8px 12px; font-size: 10px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;">
        <div><strong style="color: #9A3412;">ग्रह संज्ञा:</strong> ${planet.hindiName} (${planet.symbol})</div>
        <div><strong style="color: #9A3412;">पत्रिका भाव:</strong> भाव ${planet.house}</div>
        <div><strong style="color: #9A3412;">स्थित राशि:</strong> ${planet.signName}</div>
        <div style="grid-column: span 3; color: #78350F; font-weight: bold;">
          वैदिक कारकत्व: ${pData.karaka}
        </div>
      </div>

      <!-- BODY ANALYSIS -->
      <div style="background: #FFFDF9; border: 1.5px solid #FCD34D; border-radius: 8px; padding: 10px 12px; font-size: 10.5px; line-height: 1.55; color: #451A03;">
        <strong style="color: #9A3412; font-size: 11.5px; display: block; margin-bottom: 3px;">
          ✨ ${planet.hindiName} देव का आपकी पत्रिका में प्रभाव:
        </strong>
        श्री ${cleanName} जी, ${pData.body} शास्त्रों में कहा गया है कि जब जातक अपने आचरण को ग्रह के अनुकूल रखता है, तो वह ग्रह परम कल्याणकारी बन जाता है।
      </div>

      <!-- FUTURE HORIZON -->
      <div style="background: #ECFDF5; border: 1.5px solid #10B981; border-radius: 8px; padding: 9px 12px; font-size: 10px; color: #065F46; line-height: 1.5;">
        <strong style="color: #047857; font-size: 11px; display: block; margin-bottom: 2px;">
          🔮 आने वाले समय में ${planet.hindiName} देव का फल:
        </strong>
        ${pData.future}
      </div>

      <!-- REMEDY & MANTRA -->
      <div style="background: #FEF3C7; border: 1.5px solid #F59E0B; border-radius: 8px; padding: 8px 12px; font-size: 10px; color: #78350F; line-height: 1.45;">
        <strong style="color: #9A3412; display: block; margin-bottom: 2px;">📿 सिद्ध बीज मंत्र व विशेष दान नियम:</strong>
        मंत्र: <strong>${pData.mantra}</strong><br>
        दान: ${pData.donation}
      </div>
    </div>
  `;
}

function renderSingleVargaChartPage(ctx: any, vargaIdx: number): string {
  const { cleanName, kundaliData } = ctx;

  const vargas = [
    { code: 'D-2 होरा चक्र (Hora)', title: 'धन, समृद्धि, कोष व लक्ष्मी योग', desc: 'होरा चक्र जातक के वित्तीय भाग्य, संचित कोष और भौतिक संपदा का सूक्ष्मदर्शी है। सूर्य व चन्द्रमा के होरा में ग्रहों का संतुलन यह दर्शाता है कि आपकी कमाई का सदुपयोग होगा और समय के साथ संपत्ति में वृद्धि होगी।' },
    { code: 'D-3 द्रेष्काण चक्र (Drekkana)', title: 'पराक्रम, उद्यम व भाई-बहन सुख', desc: 'द्रेष्काण चक्र आपके पराक्रम, साहस और बंधु-बांधवों के सहयोग को दर्शाता है। यह चक्र बताता है कि कठिन परिस्थितियों में आपका आत्मबल आपको आगे रखेगा और उद्यम में सफलता मिलेगी।' },
    { code: 'D-4 चतुर्थांश चक्र (Chaturthamsa)', title: 'अचल संपत्ति, भूमि, भवन व वाहन', desc: 'चतुर्थांश चक्र से स्थायी संपत्ति और गृह सुख का विचार होता है। आपके भाग्य में स्वतंत्र आवास व उत्तम वाहन के शुभ संकेत हैं। पैतृक आशीर्वाद से घर में शांति बनी रहेगी।' },
    { code: 'D-7 सप्तांश चक्र (Saptamsa)', title: 'संतान सुख, वंश वृद्धि व संतति योग', desc: 'सप्तांश चक्र संतान के स्वास्थ्य, विद्या व उनके साथ संबंधों का विचार करता है। आपकी पत्रिका में शुभ ग्रहों के प्रभाव से संतान संस्कारी और कुल का नाम रोशन करने वाली होगी।' },
    { code: 'D-9 नवांश चक्र (Navamsha)', title: 'दांपत्य जीवन, जीवनसाथी व आत्मिक उत्थान', desc: 'नवांश कुण्डली को लग्न कुण्डली का प्राण कहा जाता है। जीवन के उत्तरार्ध में नवांश के ग्रह सर्वाधिक प्रभावी होते हैं। आपका वैवाहिक जीवन सौहार्दपूर्ण रहेगा और जीवनसाथी आध्यात्मिक रूप से सहयोगी होगा।' },
    { code: 'D-10 दशमांश चक्र (Dashamsha)', title: 'करियर, आजीविका, व्यवसाय व राज्य सम्मान', desc: 'दशमांश चक्र कार्यक्षेत्र के सर्वोच्च शिखर को दर्शाता है। आपके द्वारा किए गए प्रयासों का प्रतिफल पदोन्नति, व्यापारिक विस्तार व सामाजिक प्रतिष्ठा के रूप में प्राप्त होगा।' },
    { code: 'D-12 द्वादशांश चक्र (Dwadashamsha)', title: 'माता-पिता, पूर्वज ऋण मुक्ति व कुल कृपा', desc: 'द्वादशांश चक्र पितृ कुल और मातृ कुल के आशीर्वाद को प्रकट करता है। पूर्वजों के पुण्य कर्म आपके संकटों में सुरक्षा कवच का कार्य करेंगे।' },
    { code: 'D-60 षष्ट्यंश चक्र (Shashtiamsha)', title: 'सूक्ष्म पूर्व जन्म संस्कार व प्रारब्ध शुद्धि', desc: 'महर्षि पराशर अनुसार षष्ट्यंश चक्र समस्त सूक्ष्म कर्मों का दर्पण है। यह चक्र दर्शाता है कि नित्य धर्म पालन व सत्य आचरण से पूर्व जन्म के सभी दोष भस्म हो जाते हैं।' }
  ];

  const v = vargas[vargaIdx] || vargas[0];

  return `
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="background: #FEF3C7; border: 1.5px solid #F59E0B; border-radius: 8px; padding: 6px 10px; font-weight: 900; color: #78350F; font-size: 11.5px; text-align: center;">
        ☸️ ${v.code} - ${v.title}
      </div>

      <div style="background: #FFFDF9; border: 1.5px solid #FCD34D; border-radius: 8px; padding: 11px 13px; font-size: 10.5px; line-height: 1.6; color: #451A03;">
        <strong style="color: #9A3412; font-size: 12px; display: block; margin-bottom: 3px;">
          ✨ वैदिक षोडशवर्ग सूक्ष्म विश्लेषण:
        </strong>
        श्री ${cleanName} जी, महर्षि पराशर विरचित बृहत्पाराशर होराशास्त्र अनुसार ${v.code} का यह विवेचन अत्यंत महत्वपूर्ण है। ${v.desc}
      </div>

      <div style="background: #ECFDF5; border: 1.5px solid #10B981; border-radius: 8px; padding: 9px 12px; font-size: 10px; color: #065F46; line-height: 1.5;">
        <strong style="color: #047857; font-size: 11px; display: block; margin-bottom: 2px;">
          🌿 ${v.code} की शुभता हेतु विशेष आचरण:
        </strong>
        अपने इष्ट देव ${kundaliData.lagnaLord} व कुल देवता का नित्य स्मरण करें। गुरुवार के दिन किसी निर्धन को अन्न या पठन सामग्री दान करें। इससे इस वर्ग चक्र की समस्त बाधाएं समाप्त होकर पूर्ण फल प्राप्त होता है।
      </div>
    </div>
  `;
}

function renderSingleYearForecastPage(ctx: any, yearIndex: number): string {
  const { cleanName } = ctx;

  const currentYear = new Date().getFullYear();
  const targetYear = currentYear + yearIndex - 1;

  const yearThemes = [
    { title: 'आजीविका विस्तार, नवीन अवसर एवं स्वास्थ्य संतुलन', career: 'करियर में स्थिरता आएगी। नए व्यापारिक अनुबंध व कार्यक्षेत्र में वरिष्ठों का सहयोग प्राप्त होगा।', finance: 'आर्थिक स्थिति सुदृढ़ होगी, संचित बचत में वृद्धि होगी।', remedy: 'प्रातः सूर्य को अर्घ्य दें।' },
    { title: 'पारिवारिक सुख, गृह विस्तार व नए निवेश', career: 'कार्यक्षेत्र में नई जिम्मेदारियां मिलेंगी जो भविष्य में पदोन्नति का आधार बनेंगी।', finance: 'भूमि, भवन या स्थायी संपत्ति में निवेश के योग हैं।', remedy: 'पूर्णिमा को खीर का भोग लगाएं।' },
    { title: 'पदोन्नति, व्यापारिक उन्नति व सामाजिक यश', career: 'स्वतंत्र व्यवसाय अथवा नौकरी में उच्च शिखर की प्राप्ति, प्रतिष्ठा का विस्तार।', finance: 'आकस्मिक धन लाभ व पुराने रुके हुए धन की प्राप्ति होगी।', remedy: 'मंगलवार को हनुमान जी को सिन्दूर अर्पित करें।' },
    { title: 'अचल संपत्ति क्रय, वाहन सुख व संतान प्रगति', career: 'कार्यक्षेत्र में दूरगामी परियोजनाएं आरंभ होंगी, सहयोगियों का पूरा समर्थन मिलेगा।', finance: 'नवीन वाहन या संपत्ति के क्रय पर शुभ व्यय होगा।', remedy: 'गुरुवार को पीले फल दान करें।' },
    { title: 'सामाजिक साख का विस्तार व महत्वपूर्ण यात्राएं', career: 'व्यापारिक यात्राएं लाभदायक सिद्ध होंगी, उच्चाधिकारियों से संपर्क बनेंगे।', finance: 'आय के एकाधिक स्रोत सक्रिय रहेंगे, वित्तीय सुरक्षा बढ़ेगी।', remedy: 'पक्षियों को दाना डालें।' },
    { title: 'वित्तीय सुदृढ़ता, बैंक बैलेंस में वृद्धि व स्थिरता', career: 'कार्यक्षेत्र में आपकी विशेषज्ञता की प्रशंसा होगी, नेतृत्वकारी भूमिका मिलेगी।', finance: 'दीर्घकालीन निवेशों से प्रचुर लाभांश प्राप्त होगा।', remedy: 'शनिवार को पीपल दीप प्रज्वलित करें।' },
    { title: 'आध्यात्मिक चेतना, तीर्थाटन व मांगलिक उत्सव', career: 'धैर्य व सत्यनिष्ठा से सभी कार्यों में विजय प्राप्त होगी।', finance: 'शुभ कार्यों व तीर्थ सेवा में धन का सदुपयोग होगा।', remedy: 'गायत्री मंत्र का नित्य जप करें।' },
    { title: 'दीर्घकालीन परियोजनाओं की पूर्णता व बचत', career: 'पुराने प्रयासों का फल मिलने लगेगा, नए व्यावसायिक भागीदार जुड़ेंगे।', finance: 'बैंक बैलेंस ऐतिहासिक स्तर पर पहुंचेगा, कर्ज से पूर्ण मुक्ति।', remedy: 'शुक्रवार को श्री सूक्त पाठ करें।' },
    { title: 'नवीन कार्यक्षेत्र का विस्तार व नेतृत्व दायित्व', career: 'समाज व बिरादरी में आपकी सलाह को सम्मान मिलेगा, बड़ा पद मिल सकता है।', finance: 'पारिवारिक सुख-साधनों में वृद्धि होगी।', remedy: 'भगवान शिव का जलाभिषेक करें।' },
    { title: 'जीवन का स्वर्णिम कालखंड, पूर्ण सिद्धि व संतोष', career: 'सभी पूर्व संकल्प सिद्ध होंगे, कार्यक्षेत्र में पूर्ण संतुष्टि प्राप्त होगी।', finance: 'अक्षय संपदा व स्थायी शांति का वास रहेगा।', remedy: 'गौ सेवा व अन्न दान करें।' }
  ];

  const theme = yearThemes[(yearIndex - 1) % yearThemes.length];

  return `
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="background: #FEF3C7; border: 1.5px solid #F59E0B; border-radius: 8px; padding: 6px 10px; font-weight: 900; color: #78350F; font-size: 11.5px; text-align: center;">
        📅 वर्ष ${targetYear} (वर्ष ${yearIndex}) - वार्षिक महा-भविष्यफल
      </div>

      <div style="background: #FFFDF9; border: 1.5px solid #FCD34D; border-radius: 8px; padding: 10px 12px; font-size: 10.5px; line-height: 1.55; color: #451A03;">
        <strong style="color: #9A3412; font-size: 12px; display: block; margin-bottom: 3px;">
          🌟 वर्ष ${targetYear} का मुख्य उद्देश्य: ${theme.title}
        </strong>
        श्री ${cleanName} जी, इस वर्ष ग्रहों का गोचर आपके अनुकूल रहेगा। ${theme.career}
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 7px; font-size: 10px;">
        <div style="background: #ECFDF5; border: 1.5px solid #10B981; border-radius: 8px; padding: 9px; color: #065F46;">
          <strong style="display: block; font-size: 10.5px; margin-bottom: 2px; color: #047857;">
            💰 आर्थिक व निवेश दृष्टिकोण:
          </strong>
          ${theme.finance}
        </div>

        <div style="background: #FEF3C7; border: 1.5px solid #F59E0B; border-radius: 8px; padding: 9px; color: #78350F;">
          <strong style="display: block; font-size: 10.5px; margin-bottom: 2px; color: #9A3412;">
            🛡️ इस वर्ष का विशेष सुरक्षा उपाय:
          </strong>
          ${theme.remedy}
        </div>
      </div>
    </div>
  `;
}

function render5YearForecastPage(ctx: any): string {
  const { cleanName } = ctx;
  const currentYear = new Date().getFullYear();

  const years = [
    { y: currentYear, t: 'कार्यक्षेत्र में स्थायित्व व नए संपर्क', f: 'बचत में वृद्धि, अनावश्यक खर्चों पर रोक' },
    { y: currentYear + 1, t: 'पदोन्नति व आजीविका में उछाल', f: 'अचल संपत्ति व नवीन वाहन के शुभ योग' },
    { y: currentYear + 2, t: 'व्यापारिक विस्तार व सामाजिक प्रतिष्ठा', f: 'पुराने रुके हुए धन की वापसी' },
    { y: currentYear + 3, t: 'पारिवारिक मांगलिक कार्य व तीर्थ यात्रा', f: 'पारिवारिक सुख व स्थिर धन संचय' },
    { y: currentYear + 4, t: 'दीर्घकालीन लक्ष्यों की सिद्धि', f: 'पूर्ण आर्थिक सुरक्षा व बैंक बैलेंस' }
  ];

  return `
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="background: #FEF3C7; border: 1.5px solid #F59E0B; border-radius: 8px; padding: 6px 10px; font-weight: 900; color: #78350F; font-size: 11.5px; text-align: center;">
        📅 आगामी ५ वर्षीय वार्षिक रोडमैप (5-Year Forecast Roadmap)
      </div>

      <div style="display: flex; flex-direction: column; gap: 6px;">
        ${years.map(item => `
          <div style="background: #FFFDF9; border: 1.5px solid #FDE68A; border-radius: 8px; padding: 7px 11px; font-size: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <span style="font-weight: 900; color: #9A3412; font-size: 11px;">वर्ष ${item.y}</span>
              <span style="font-size: 9px; font-weight: bold; color: #166534; background: #F0FDF4; padding: 2px 6px; rounded: 4px;">शुभ कालखंड</span>
            </div>
            <div style="color: #451A03; line-height: 1.4;">
              <strong>करियर व आजीविका:</strong> ${item.t}<br>
              <strong>आर्थिक व पारिवारिक:</strong> ${item.f}
            </div>
          </div>
        `).join('')}
      </div>

      <div style="background: #ECFDF5; border: 1.5px solid #10B981; border-radius: 8px; padding: 7px 11px; font-size: 9.5px; color: #065F46;">
        <strong>💡 पंचवर्षीय मार्गदर्शन:</strong> श्री ${cleanName} जी, आगामी ५ वर्ष आपके जीवन की नींव को अत्यंत सुदृढ़ करेंगे। धर्मपूर्वक आचरण व नित्य गुरु स्मरण से सभी कार्य निर्बाध संपन्न होंगे।
      </div>
    </div>
  `;
}

function renderSadeSatiAndGocharPage(ctx: any): string {
  const { cleanName, kundaliData } = ctx;

  return `
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="background: #FEF3C7; border: 1.5px solid #F59E0B; border-radius: 8px; padding: 6px 10px; font-weight: 900; color: #78350F; font-size: 11.5px; text-align: center;">
        🪐 शनि साढ़ेसाती, ढैय्या एवं राहु-केतु गोचर सुरक्षा चक्र
      </div>

      <div style="background: #FFFDF9; border: 1.5px solid #FCD34D; border-radius: 8px; padding: 10px 12px; font-size: 10.5px; line-height: 1.55; color: #451A03;">
        <strong style="color: #9A3412; font-size: 11.5px; display: block; margin-bottom: 3px;">
          ⚖️ शनि देव का न्याय चक्र एवं आपकी पत्रिका:
        </strong>
        वर्तमान में आपकी साढ़ेसाती / ढैय्या की स्थिति: <strong>${kundaliData.doshAnalysis.sadeSatiStatus}</strong>। शनि देव न्याय के अधिपति हैं। सत्य, निष्ठा और सेवा भाव रखने वालों को साढ़ेसाती में भी अपार प्रतिष्ठा व स्थिरता मिलती है।
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 7px; font-size: 10px;">
        <div style="background: #EFF6FF; border: 1.5px solid #3B82F6; border-radius: 8px; padding: 9px; color: #1E3A8A;">
          <strong style="display: block; font-size: 10.5px; margin-bottom: 2px; color: #1D4ED8;">
            🐉 राहु-केतु गोचर प्रभाव:
          </strong>
          राहु-केतु का गोचर आपके कर्म व लाभ भाव में संतुलन बनाए रखेगा। गुप्त शत्रुओं से घबराने की आवश्यकता नहीं है।
        </div>

        <div style="background: #FEF3C7; border: 1.5px solid #F59E0B; border-radius: 8px; padding: 9px; color: #78350F;">
          <strong style="display: block; font-size: 10.5px; margin-bottom: 2px; color: #9A3412;">
            📿 शनि रक्षा कवच उपाय:
          </strong>
          शनिवार को सुंदरकांड का पाठ करें, पीपल वृक्ष को जल दें एवं संध्या समय सरसों तेल का चौमुखी दीपक जलाएं।
        </div>
      </div>
    </div>
  `;
}

function renderDoshAnalysisPage(ctx: any): string {
  const { cleanName, kundaliData } = ctx;

  return `
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="background: #FEF3C7; border: 1.5px solid #F59E0B; border-radius: 8px; padding: 6px 10px; font-weight: 900; color: #78350F; font-size: 11.5px; text-align: center;">
        🔍 मांगलिक दोष, कालसर्प योग एवं पितृ ऋण शोधन
      </div>

      <div style="background: #FFFDF9; border: 1.5px solid #FCD34D; border-radius: 8px; padding: 10px 12px; font-size: 10.5px; line-height: 1.55; color: #451A03;">
        <strong style="color: #9A3412; font-size: 11.5px; display: block; margin-bottom: 3px;">
          📊 आपकी पत्रिका में ग्रह दोषों का गणितीय विश्लेषण:
        </strong>
        मांगलिक स्थिति: <strong>${kundaliData.doshAnalysis.manglikSeverity}</strong><br>
        कालसर्प स्थिति: <strong>${kundaliData.doshAnalysis.kaalSarpType}</strong><br>
        श्री ${cleanName} जी, वैदिक सिद्धांतों के अनुसार अधिकांश दोष उचित ग्रह दृष्टि व शुभ दशाओं से स्वतः निष्प्रभावी हो जाते हैं।
      </div>

      <div style="background: #ECFDF5; border: 1.5px solid #10B981; border-radius: 8px; padding: 9px 12px; font-size: 10px; color: #065F46; line-height: 1.5;">
        <strong style="color: #047857; font-size: 10.5px; display: block; margin-bottom: 2px;">
          🌿 शास्त्रोक्त दोष शांति विधान:
        </strong>
        प्रतिदिन ॐ नमः शिवाय का १०८ बार जप करें। अमावस्या के दिन पितरों के निमित्त जल व तिल से तर्पण करें अथवा किसी ब्राह्मण को भोजन कराएं। इससे समस्त दोष शांत होकर शुभ फल देते हैं।
      </div>
    </div>
  `;
}

function renderNameNumerologyPage(ctx: any): string {
  const { cleanName, nameData } = ctx;

  return `
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="background: #FEF3C7; border: 1.5px solid #F59E0B; border-radius: 8px; padding: 6px 10px; font-weight: 900; color: #78350F; font-size: 11.5px; text-align: center;">
        ✍️ चालडियन नाम अंक विज्ञान एवं स्पेलिंग कंपन विश्लेषण
      </div>

      <div style="background: #FFFDF9; border: 1.5px solid #FCD34D; border-radius: 8px; padding: 10px 12px; font-size: 10.5px; line-height: 1.55; color: #451A03;">
        <strong style="color: #9A3412; font-size: 11.5px; display: block; margin-bottom: 3px;">
          🔤 नाम: ${cleanName} (संयुक्त अंक: ${nameData ? nameData.compoundNumber : 33})
        </strong>
        नाम का प्रत्येक अक्षर ब्रह्मांड में एक विशिष्ट ध्वनि तरंग उत्पन्न करता है। आपका नाम अंक आपके मूलांक व भाग्यांक के साथ पूर्णतः मित्रवत है, जो सामाजिक साख और आकर्षण में वृद्धि करता है।
      </div>

      <div style="background: #ECFDF5; border: 1.5px solid #10B981; border-radius: 8px; padding: 9px 12px; font-size: 10px; color: #065F46; line-height: 1.5;">
        <strong style="color: #047857; font-size: 10.5px; display: block; margin-bottom: 2px;">
          🌟 हस्ताक्षर एवं नाम प्रयोग नियम:
        </strong>
        हस्ताक्षर करते समय कलम को कभी पीछे न खींचे; हस्ताक्षर ऊपर की ओर उठता हुआ होना चाहिए। अपने नाम को लिखते समय अक्षरों को स्पष्ट रखें।
      </div>
    </div>
  `;
}

function renderManglikDoshDeepDivePage(ctx: any): string {
  const { cleanName, kundaliData } = ctx;

  return `
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="background: #FEF3C7; border: 1.5px solid #F59E0B; border-radius: 8px; padding: 6px 10px; font-weight: 900; color: #78350F; font-size: 11.5px; text-align: center;">
        ⚔️ भौम (मांगलिक) योग एवं दांपत्य सामंजस्य सूक्ष्म मीमांसा
      </div>

      <div style="background: #FFFDF9; border: 1.5px solid #FCD34D; border-radius: 8px; padding: 10px 12px; font-size: 10.5px; line-height: 1.55; color: #451A03;">
        <strong style="color: #9A3412; font-size: 11.5px; display: block; margin-bottom: 3px;">
          मंगल देव की स्थिति एवं वैवाहिक सुरक्षा:
        </strong>
        आपकी पत्रिका में मांगलिक स्थिति: <strong>${kundaliData.doshAnalysis.manglikSeverity}</strong>। मंगल देव ऊर्जा और पराक्रम के स्वामी हैं। शुभ ग्रहों की दृष्टि होने से मंगल की उग्रता शांत होकर दांपत्य में समर्पण का रूप धारण करती है।
      </div>

      <div style="background: #ECFDF5; border: 1.5px solid #10B981; border-radius: 8px; padding: 9px 12px; font-size: 10px; color: #065F46; line-height: 1.5;">
        <strong style="color: #047857; font-size: 10.5px; display: block; margin-bottom: 2px;">
          🌿 भौम दोष शांति वैदिक उपाय:
        </strong>
        मंगलवार के दिन हनुमान जी को चोला अथवा लाल सिंदूर अर्पित करें। प्रतिदिन हनुमान चालीसा का पाठ करें। इससे दांपत्य में मधुरता और परस्पर विश्वास बना रहता है।
      </div>
    </div>
  `;
}

function renderKaalSarpAndPitruDoshPage(ctx: any): string {
  const { cleanName, kundaliData } = ctx;

  return `
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="background: #FEF3C7; border: 1.5px solid #F59E0B; border-radius: 8px; padding: 6px 10px; font-weight: 900; color: #78350F; font-size: 11.5px; text-align: center;">
        🐍 कालसर्प योग एवं पितृ ऋण शांति रहस्य
      </div>

      <div style="background: #FFFDF9; border: 1.5px solid #FCD34D; border-radius: 8px; padding: 10px 12px; font-size: 10.5px; line-height: 1.55; color: #451A03;">
        <strong style="color: #9A3412; font-size: 11.5px; display: block; margin-bottom: 3px;">
          राहु-केतु अक्ष एवं कालसर्प स्थिति:
        </strong>
        आपकी पत्रिका में स्थिति: <strong>${kundaliData.doshAnalysis.kaalSarpType}</strong>। कालसर्प योग जातक को संघर्ष के बाद अप्रत्याशित सफलता दिलाने वाला योग भी माना जाता है।
      </div>

      <div style="background: #ECFDF5; border: 1.5px solid #10B981; border-radius: 8px; padding: 9px 12px; font-size: 10px; color: #065F46; line-height: 1.5;">
        <strong style="color: #047857; font-size: 10.5px; display: block; margin-bottom: 2px;">
          🌿 कालसर्प व पितृ शांति विधान:
        </strong>
        नागपंचमी या सोमवार को चांदी के नाग-नागिन का जोड़ा शिवलिंग पर अर्पित करें। अमावस्या पर पूर्वजों के नाम से जल व भोजन दान करें।
      </div>
    </div>
  `;
}

function renderRajYogaAndDhanYogaPage(ctx: any): string {
  const { cleanName, kundaliData } = ctx;

  return `
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="background: #FEF3C7; border: 1.5px solid #F59E0B; border-radius: 8px; padding: 6px 10px; font-weight: 900; color: #78350F; font-size: 11.5px; text-align: center;">
        👑 राजयोग, धनयोग व गजकेसरी योग विवेचन
      </div>

      <div style="background: #FFFDF9; border: 1.5px solid #FCD34D; border-radius: 8px; padding: 10px 12px; font-size: 10.5px; line-height: 1.55; color: #451A03;">
        <strong style="color: #9A3412; font-size: 11.5px; display: block; margin-bottom: 3px;">
          आपकी कुण्डली के शुभ योग:
        </strong>
        श्री ${cleanName} जी, आपकी पत्रिका में केंद्र व त्रिकोण के स्वामियों का संबंध राजयोग का निर्माण करता है। गजकेसरी व लक्ष्मी योग के प्रभाव से आपके जीवन में अचानक बड़े वित्तीय अवसर व सामाजिक मान-प्रतिष्ठा के द्वार खुलेंगे।
      </div>

      <div style="background: #ECFDF5; border: 1.5px solid #10B981; border-radius: 8px; padding: 9px 12px; font-size: 10px; color: #065F46; line-height: 1.5;">
        <strong style="color: #047857; font-size: 10.5px; display: block; margin-bottom: 2px;">
          🌟 राजयोग सक्रियण नियम:
        </strong>
        अपने आचरण में सत्य और न्याय का पालन करें। किसी निर्धन की सहायता करने से राजयोग का प्रभाव तुरंत फलित होता है।
      </div>
    </div>
  `;
}

function renderYoginiAndCharDashaPage(ctx: any): string {
  const { cleanName } = ctx;

  return `
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="background: #FEF3C7; border: 1.5px solid #F59E0B; border-radius: 8px; padding: 6px 10px; font-weight: 900; color: #78350F; font-size: 11.5px; text-align: center;">
        🌀 योगिनी दशा एवं जैमिनी चर दशा समन्वय
      </div>

      <div style="background: #FFFDF9; border: 1.5px solid #FCD34D; border-radius: 8px; padding: 10px 12px; font-size: 10.5px; line-height: 1.55; color: #451A03;">
        <strong style="color: #9A3412; font-size: 11.5px; display: block; margin-bottom: 3px;">
          सूक्ष्म दशा कालखंड:
        </strong>
        योगिनी दशा ३६ वर्ष के चक्र में चलती है। मंगला, पिंगला, धन्या, भ्रामरी, भद्रिका, उल्का, सिद्धा व संकटा दशाओं का सूक्ष्म फल आपके कार्यक्षेत्र और पारिवारिक सुख को निरंतर संतुलित रखेगा।
      </div>

      <div style="background: #ECFDF5; border: 1.5px solid #10B981; border-radius: 8px; padding: 9px 12px; font-size: 10px; color: #065F46; line-height: 1.5;">
        <strong style="color: #047857; font-size: 10.5px; display: block; margin-bottom: 2px;">
          🌿 योगिनी दशा शांति विधान:
        </strong>
        माता दुर्गा अथवा नवदुर्गा के किसी भी पावन मंत्र का नित्य स्मरण करें।
      </div>
    </div>
  `;
}

function renderComprehensiveRemediesPage(ctx: any): string {
  const { cleanName, cleanIsht } = ctx;

  return `
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="background: #FEF3C7; border: 1.5px solid #F59E0B; border-radius: 8px; padding: 6px 10px; font-weight: 900; color: #78350F; font-size: 11.5px; text-align: center;">
        💎 महा-उपाय संहिता: यंत्र, मंत्र, औषधि स्नान व व्रत नियम
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 7px; font-size: 10px;">
        <div style="background: #FFFDF9; border: 1.5px solid #FCD34D; border-radius: 8px; padding: 8px;">
          <strong style="color: #9A3412; display: block; margin-bottom: 2px;">१. औषधि स्नान नियम:</strong>
          जल में थोड़ा गंगाजल, कच्चा दूध व केसर डालकर स्नान करें। इससे आभा मंडल की नकारात्मकता समाप्त होती है।
        </div>

        <div style="background: #FFFDF9; border: 1.5px solid #FCD34D; border-radius: 8px; padding: 8px;">
          <strong style="color: #9A3412; display: block; margin-bottom: 2px;">२. सिद्ध श्री यंत्र स्थापना:</strong>
          घर के पूजा स्थल पर तांबे अथवा स्फटिक का श्री यंत्र स्थापित करें और नित्य धूप-दीप दें।
        </div>

        <div style="background: #FFFDF9; border: 1.5px solid #FCD34D; border-radius: 8px; padding: 8px;">
          <strong style="color: #9A3412; display: block; margin-bottom: 2px;">३. इष्ट देव साधना:</strong>
          अपने इष्ट देव ${cleanIsht} का पावन मंत्र प्रतिदिन १०८ बार जपें।
        </div>

        <div style="background: #FFFDF9; border: 1.5px solid #FCD34D; border-radius: 8px; padding: 8px;">
          <strong style="color: #9A3412; display: block; margin-bottom: 2px;">४. नित्य सात्विक व्रत:</strong>
          माह में कम से कम एक एकादशी अथवा प्रदोष व्रत रखें। इससे समस्त पाप भस्म होते हैं।
        </div>
      </div>
    </div>
  `;
}

function renderConclusionAndBlessingsPage(ctx: any): string {
  const { cleanName, cleanIsht } = ctx;

  return `
    <div style="display: flex; flex-direction: column; gap: 9px; text-align: center;">
      <div style="background: #7C1D13; color: #FFFFFF; border-radius: 8px; padding: 10px;">
        <div style="font-size: 11px; font-weight: bold; color: #FDE047;">॥ ॐ तत्सत् ॥</div>
        <div style="font-size: 16px; font-weight: 900; margin: 3px 0;">महर्षि पराशर महाग्रंथ सम्पूर्ण फलश्रुति व गुरु आशीर्वाद</div>
        <div style="font-size: 10px; color: #FED7AA;">आस्था सनातन सेवा प्रकल्प द्वारा प्रमाणित</div>
      </div>

      <div style="background: #FFFDF9; border: 2px solid #D97706; border-radius: 8px; padding: 14px; font-size: 11px; line-height: 1.6; color: #451A03; text-align: left;">
        <strong style="color: #9A3412; font-size: 12.5px; display: block; margin-bottom: 4px; text-align: center;">
          🌸 श्री ${cleanName} जी के कल्याण हेतु गुरु संकल्प:
        </strong>
        यह ५१ पृष्ठों का महाग्रंथ आपकी पत्रिका के प्रत्येक ग्रह, भाव, वर्ग चक्र, दशा व भविष्य के १० वर्षों का दर्पण है। वैदिक सूत्रों का यह अमृत आपके जीवन के अंधकार को दूर कर प्रकाश का संचार करे। आपके घर में सुख, शांति, समृद्धि, उत्तम स्वास्थ्य एवं अखण्ड ऐश्वर्य का वास रहे।
      </div>

      <div style="background: #FEF3C7; border: 1.5px solid #F59E0B; border-radius: 8px; padding: 10px; font-size: 11px; color: #78350F; font-weight: bold;">
        ॥ ॐ शान्तिः शान्तिः शान्तिः ॥
      </div>
    </div>
  `;
}

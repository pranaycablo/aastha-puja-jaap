import React, { useState } from 'react';
import { ScriptureBook, ScriptureChapter } from '../data/grandScriptureCanonData';
import { generateAndDownloadScriptureEbook } from '../utils/ebookPdfGenerator';
import {
  X,
  Download,
  Heart,
  QrCode,
  Copy,
  Check,
  Sparkles,
  BookOpen,
  ShieldCheck,
  Smartphone
} from 'lucide-react';

interface EbookDakshinaDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: ScriptureBook;
  chapters: ScriptureChapter[];
  languageMode?: 'pure_sanskrit' | 'pure_hindi' | 'pure_english' | 'bilingual';
}

export const EbookDakshinaDownloadModal: React.FC<EbookDakshinaDownloadModalProps> = ({
  isOpen,
  onClose,
  book,
  chapters,
  languageMode = 'bilingual'
}) => {
  const [selectedLang, setSelectedLang] = useState<'pure_sanskrit' | 'pure_hindi' | 'pure_english' | 'bilingual'>(
    languageMode
  );
  const [hasCopiedUpi, setHasCopiedUpi] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const upiId = 'divyajaap@upi';
  const dakshinaAmount = 11;
  const note = encodeURIComponent(`Ebook Dakshina - ${book.titleHi}`);
  const upiUrl = `upi://pay?pa=${upiId}&pn=Aastha%20Puja%20Jaap&am=${dakshinaAmount}&cu=INR&tn=${note}`;

  const handleCopyUpi = () => {
    navigator.clipboard?.writeText(upiId);
    setHasCopiedUpi(true);
    setTimeout(() => setHasCopiedUpi(false), 2500);
  };

  const handleTriggerDownload = () => {
    setIsDownloading(true);
    try {
      generateAndDownloadScriptureEbook(book, chapters, selectedLang);
    } catch (e) {
      console.error('Download error:', e);
    } finally {
      setTimeout(() => {
        setIsDownloading(false);
        onClose();
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 select-none animate-fadeIn">
      <div className="bg-[#FFFDF9] border-2 border-amber-400 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* TOP HEADER */}
        <div className="p-4 bg-gradient-to-r from-amber-700 via-orange-600 to-amber-800 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl p-1.5 rounded-2xl bg-white/20">📥</span>
            <div>
              <h3 className="text-base font-black text-amber-100 flex items-center gap-1.5">
                <span>ई-बुक PDF डाउनलोड</span>
                <span className="bg-amber-400 text-slate-950 text-[10px] px-2 py-0.5 rounded-md font-black">
                  ₹११ दक्षिणा
                </span>
              </h3>
              <p className="text-[11px] text-amber-200">
                {book.titleHi} • {book.categoryNameHi}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 active:scale-95 transition-all text-amber-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-4 overflow-y-auto space-y-4 text-amber-950 text-xs">
          
          {/* Book Summary Card */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 flex items-center justify-between">
            <div>
              <div className="font-black text-sm text-orange-950 flex items-center gap-1.5">
                <span>{book.icon}</span>
                <span>{book.titleHi}</span>
              </div>
              <div className="text-[11px] text-orange-800 font-medium mt-0.5">
                {book.badge} • सम्पूर्ण अध्याय व श्लोक
              </div>
            </div>
            <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300">
              HD Print Ready
            </span>
          </div>

          {/* Language Selection */}
          <div className="space-y-1.5">
            <label className="font-black text-orange-950 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>ई-बुक भाषा प्रारूप चुनें:</span>
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'bilingual', label: '📖 संस्कृत + भावार्थ' },
                { id: 'pure_sanskrit', label: '🕉️ केवल संस्कृत' },
                { id: 'pure_hindi', label: '🇮🇳 केवल सरल हिन्दी' },
                { id: 'pure_english', label: '🇬🇧 English Meaning' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedLang(opt.id as any)}
                  className={`p-2 rounded-xl text-xs font-bold border transition-all text-center ${
                    selectedLang === opt.id
                      ? 'bg-amber-500 text-slate-950 border-amber-600 font-black shadow-xs'
                      : 'bg-white text-orange-950 border-orange-200 hover:bg-orange-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* ₹11 Sacred Dakshina Box */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-b from-amber-50/90 to-orange-50 border-2 border-dashed border-amber-400 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-black text-orange-950 text-xs flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
                <span>धर्म सेवा दक्षिणा (ऐच्छिक ₹११)</span>
              </span>
              <span className="text-sm font-black text-amber-700 bg-amber-200/80 px-2 py-0.5 rounded-lg border border-amber-300">
                ₹ ११.००
              </span>
            </div>
            <p className="text-[11px] text-amber-900/80 leading-relaxed">
              सनातन धर्म ग्रन्थों के संरक्षण एवं ऐप सेवा सहयोग हेतु श्रद्धालु जन ₹११ की लघु दक्षिणा अर्पित कर सकते हैं।
            </p>

            {/* Quick UPI Pay Buttons */}
            <div className="flex items-center gap-2">
              <a
                href={upiUrl}
                className="flex-1 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-black text-xs text-center shadow-xs active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>PhonePe / GPay / Paytm</span>
              </a>
              <button
                type="button"
                onClick={handleCopyUpi}
                className="px-3 py-2 rounded-xl bg-white border border-amber-300 text-amber-950 font-bold text-xs hover:bg-amber-50 active:scale-95 flex items-center gap-1"
                title="UPI ID कॉपी करें"
              >
                {hasCopiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-amber-700" />}
                <span>{hasCopiedUpi ? 'कॉपी हुआ' : 'UPI ID'}</span>
              </button>
            </div>
          </div>

          {/* DIRECT DOWNLOAD ACTION */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={handleTriggerDownload}
              disabled={isDownloading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black text-sm shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 border border-amber-400"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? 'ई-बुक तैयार हो रही है...' : 'डाउनलोड सम्पूर्ण ई-बुक (PDF) 📄'}</span>
            </button>

            <button
              type="button"
              onClick={handleTriggerDownload}
              className="w-full text-center text-[11px] text-amber-900/70 hover:text-amber-950 underline py-1"
            >
              निःशुल्क सीधा डाउनलोड करें (बिना दक्षिणा)
            </button>
          </div>

        </div>

        {/* FOOTER NOTE */}
        <div className="p-3 bg-orange-100/60 border-t border-orange-200 text-center text-[10.5px] text-orange-900/80 font-medium">
          🔒 सुरक्षित एवं प्रामाणिक सनातन ई-बुक • आस्था : पूजा जाप
        </div>
      </div>
    </div>
  );
};

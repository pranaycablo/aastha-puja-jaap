import React, { useState } from 'react';
import { LanguageCode } from '../types';
import {
  X,
  Heart,
  Star,
  Share2,
  MessageSquare,
  Sparkles,
  Check,
  Copy,
  Smartphone,
  QrCode,
  Send,
  Award,
  ExternalLink,
  ShieldCheck,
  ThumbsUp
} from 'lucide-react';

export type SevaTab = 'donation' | 'rating' | 'share' | 'feedback';

interface SevaCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: SevaTab;
  language?: LanguageCode;
}

export const SevaCommunityModal: React.FC<SevaCommunityModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'donation',
  language = 'hi'
}) => {
  const isHi = language === 'hi';
  const [activeTab, setActiveTab] = useState<SevaTab>(initialTab);

  // 1. Donation States
  const [donationAmount, setDonationAmount] = useState<number>(51);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [hasCopiedUpi, setHasCopiedUpi] = useState<boolean>(false);
  const [hasCompletedDonation, setHasCompletedDonation] = useState<boolean>(false);

  // 2. Rating States
  const [ratingStars, setRatingStars] = useState<number>(5);
  const [hasSubmittedRating, setHasSubmittedRating] = useState<boolean>(false);

  // 3. Share States
  const [hasCopiedShare, setHasCopiedShare] = useState<boolean>(false);

  // 4. Feedback States
  const [feedbackCategory, setFeedbackCategory] = useState<string>('feature');
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [feedbackEmail, setFeedbackEmail] = useState<string>('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const upiId = 'divyajaap@upi';
  const effectiveAmount = customAmount && Number(customAmount) > 0 ? Number(customAmount) : donationAmount;
  const upiNote = encodeURIComponent('Dharma Seva Dakshina - Aastha Puja Jaap');
  const upiUrl = `upi://pay?pa=${upiId}&pn=Aastha%20Puja%20Jaap&am=${effectiveAmount}&cu=INR&tn=${upiNote}`;

  const shareText = `🚩 *आस्था : पूजा जाप* — सनातन धर्म का सम्पूर्ण महा-ऐप!\n\n✨ चार वेद, प्रमुख उपनिषद, १८ महापुराण\n✨ २७ सम्पूर्ण चालीसा पाठ (ऑडियो सहित)\n✨ वैदिक कुण्डली, अंकज्योतिष व नाम जप\n✨ हस्तरेखा व समस्या समाधान\n\nअभी निःशुल्क डाउनलोड करें:\nhttps://play.google.com/store/apps/details?id=com.divyajaap.app\n\nजय श्री राम! हर हर महादेव! 🕉️`;

  const handleCopyUpi = () => {
    navigator.clipboard?.writeText(upiId);
    setHasCopiedUpi(true);
    setTimeout(() => setHasCopiedUpi(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'आस्था : पूजा जाप - सम्पूर्ण सनातन ऐप',
          text: shareText,
          url: 'https://play.google.com/store/apps/details?id=com.divyajaap.app'
        });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }
    navigator.clipboard?.writeText(shareText);
    setHasCopiedShare(true);
    setTimeout(() => setHasCopiedShare(false), 3000);
  };

  const handleWhatsAppShare = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, '_blank');
  };

  const handleSubmitRating = () => {
    setHasSubmittedRating(true);
    // Direct link to play store
    window.open('https://play.google.com/store/apps/details?id=com.divyajaap.app', '_blank');
    try {
      localStorage.setItem('divya_jaap_app_rated', 'true');
    } catch (e) {}
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    try {
      const existing = JSON.parse(localStorage.getItem('divya_jaap_user_feedbacks') || '[]');
      existing.unshift({
        category: feedbackCategory,
        text: feedbackText,
        email: feedbackEmail,
        date: new Date().toISOString()
      });
      localStorage.setItem('divya_jaap_user_feedbacks', JSON.stringify(existing.slice(0, 20)));
    } catch (e) {}

    // Open mailto fallback
    const mailtoUrl = `mailto:support@aasthajaap.com?subject=${encodeURIComponent(`[Feedback] ${feedbackCategory}`)}&body=${encodeURIComponent(feedbackText)}`;
    window.open(mailtoUrl, '_blank');

    setFeedbackSubmitted(true);
    setTimeout(() => {
      setFeedbackSubmitted(false);
      setFeedbackText('');
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 select-none animate-fadeIn">
      <div className="bg-[#FFFDF9] border-2 border-amber-400 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* HEADER */}
        <div className="p-4 bg-gradient-to-r from-amber-700 via-orange-600 to-amber-800 text-white flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl p-1.5 rounded-2xl bg-white/20">🚩</span>
            <div>
              <h2 className="text-base font-black text-amber-100">
                {isHi ? 'धर्म सेवा, सहयोग व प्रतिक्रिया' : 'Seva, Support & Feedback'}
              </h2>
              <p className="text-[11px] text-amber-200">
                {isHi ? 'सनातन धर्म प्रचार एवं ऐप सहयोग' : 'Community & Divine Mission'}
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

        {/* 4 NAV TABS */}
        <div className="grid grid-cols-4 gap-1 p-2 bg-orange-100/90 border-b border-orange-200 text-xs font-bold shrink-0">
          {[
            { id: 'donation', icon: '🪔', labelHi: 'दान / दक्षिणा' },
            { id: 'rating', icon: '⭐', labelHi: 'रेटिंग दें' },
            { id: 'share', icon: '🚩', labelHi: 'शेयर करें' },
            { id: 'feedback', icon: '💬', labelHi: 'सुझाव दें' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as SevaTab)}
              className={`py-2 rounded-xl text-center transition-all flex flex-col items-center gap-0.5 ${
                activeTab === tab.id
                  ? 'bg-orange-600 text-white font-black shadow-xs'
                  : 'text-orange-950 hover:bg-white/50'
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              <span className="text-[10.5px] truncate">{tab.labelHi}</span>
            </button>
          ))}
        </div>

        {/* TAB CONTENTS */}
        <div className="p-4 overflow-y-auto space-y-4 text-amber-950 text-xs flex-1">
          
          {/* TAB 1: DONATION / DAKSHINA */}
          {activeTab === 'donation' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 text-center space-y-1">
                <span className="text-2xl">🪔</span>
                <h3 className="text-sm font-black text-orange-950">
                  {isHi ? 'धर्म सेवा दान एवं दक्षिणा' : 'Sacred Seva Offering'}
                </h3>
                <p className="text-[11px] text-amber-900 leading-relaxed">
                  {isHi
                    ? 'सनातन वेदों, उपनिषदों एवं धर्म ग्रन्थों के डिजिटल संरक्षण में आपका ऐच्छिक सहयोग अमूल्य है।'
                    : 'Your voluntary offering supports digitizing and preserving Sanatan Dharma scriptures.'}
                </p>
              </div>

              {/* Amount selector pills */}
              <div className="space-y-1.5">
                <label className="font-bold text-orange-950 block">सहयोग राशि चुनें (₹):</label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[11, 21, 51, 101, 501].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setDonationAmount(amt);
                        setCustomAmount('');
                      }}
                      className={`py-2 rounded-xl font-black text-xs border transition-all ${
                        donationAmount === amt && !customAmount
                          ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs'
                          : 'bg-white text-orange-950 border-orange-200 hover:bg-orange-50'
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom amount input */}
              <div className="space-y-1">
                <label className="font-bold text-orange-950 text-[11px]">अथवा अपनी इच्छानुसार राशि (₹):</label>
                <input
                  type="number"
                  min="1"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="अन्य राशि दर्ज करें (जैसे ₹251)"
                  className="w-full bg-white border border-orange-300 rounded-xl px-3 py-2 text-xs font-bold text-orange-950 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* UPI Intent and QR box */}
              <div className="p-3.5 rounded-2xl bg-[#FFFDF7] border-2 border-dashed border-amber-400 space-y-3 text-center">
                <div className="flex items-center justify-between text-xs font-bold text-orange-950 border-b border-orange-200 pb-2">
                  <span>समर्पण राशि:</span>
                  <span className="text-base font-black text-amber-700">₹{effectiveAmount}.००</span>
                </div>

                {/* Instant Pay with Apps */}
                <a
                  href={upiUrl}
                  onClick={() => setHasCompletedDonation(true)}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-black text-sm shadow-md active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>PhonePe / GPay / Paytm से दक्षिणा दें</span>
                </a>

                {/* Copy UPI ID */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-orange-50 border border-orange-200">
                  <span className="font-mono text-xs text-orange-950 font-bold">{upiId}</span>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-black text-[11px] flex items-center gap-1 active:scale-95"
                  >
                    {hasCopiedUpi ? <Check className="w-3 h-3 text-emerald-950" /> : <Copy className="w-3 h-3" />}
                    <span>{hasCopiedUpi ? 'कॉपी हुआ' : 'कॉपी'}</span>
                  </button>
                </div>
              </div>

              {/* Thank you message or receipt */}
              {hasCompletedDonation && (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-center space-y-1">
                  <span className="text-xl">🙏</span>
                  <div className="font-black text-xs">सच्चे मन से दी गई दक्षिणा हेतु कोटि-कोटि धन्यवाद!</div>
                  <div className="text-[10.5px]">प्रभु श्री राम व महादेव की कृपा आप पर व आपके परिवार पर सदा बनी रहे।</div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: APP RATING */}
          {activeTab === 'rating' && (
            <div className="space-y-4 text-center animate-fadeIn">
              <div className="p-4 rounded-3xl bg-gradient-to-b from-amber-50 to-orange-50 border border-amber-300 space-y-2">
                <span className="text-3xl">⭐</span>
                <h3 className="text-base font-black text-orange-950">
                  {isHi ? 'क्या आपको ऐप पसंद आ रहा है?' : 'Are you enjoying the app?'}
                </h3>
                <p className="text-[11.5px] text-amber-900/90 leading-relaxed max-w-sm mx-auto">
                  {isHi
                    ? 'आपका ५-स्टार रेटिंग सनातन धर्म के प्रचार में लाखों सनातन प्रेमियों तक इस पावन ऐप को पहुँचाने में सहायता करेगा।'
                    : 'Your 5-star rating helps millions of spiritual seekers discover this sacred application.'}
                </p>

                {/* Interactive Star Selection */}
                <div className="flex items-center justify-center gap-2 pt-2 pb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRatingStars(star)}
                      className="p-1 text-3xl transition-all active:scale-125 focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= ratingStars
                            ? 'text-amber-500 fill-amber-400 drop-shadow-md'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <div className="text-xs font-black text-amber-800">
                  {ratingStars === 5 ? '🌟 सर्वोत्तम अनुभव (५ स्टार)' : `${ratingStars} स्टार रेटिंग`}
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmitRating}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black text-sm shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 border border-amber-400"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>Play Store पर ५ स्टार रेटिंग दें ⭐</span>
              </button>

              {hasSubmittedRating && (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-[11px] font-bold">
                  ✅ धन्यवाद! आपका मूल्यांकन सनातन धर्म के लिए अत्यंत मूल्यवान है।
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SHARE APP */}
          {activeTab === 'share' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-3xl bg-gradient-to-r from-orange-100/90 to-amber-100/80 border border-orange-300 text-center space-y-1.5">
                <span className="text-3xl">🚩</span>
                <h3 className="text-sm font-black text-orange-950">
                  {isHi ? 'सनातन धर्म प्रचार — ऐप शेयर करें' : 'Spread Sanatan Dharma - Share App'}
                </h3>
                <p className="text-[11px] text-orange-900/90 leading-relaxed">
                  {isHi
                    ? 'अपने मित्रों, परिवार और व्हाट्सएप्प ग्रुप्स में शेयर कर इस पुण्य कार्य के सहभागी बनें।'
                    : 'Share this divine treasure of Vedas, Chalisas, and Jaap with your friends and family.'}
                </p>
              </div>

              {/* Share Preview Box */}
              <div className="p-3 rounded-2xl bg-white border border-orange-200 text-[11px] text-gray-800 font-mono whitespace-pre-line leading-relaxed max-h-36 overflow-y-auto">
                {shareText}
              </div>

              {/* Share Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  className="py-3 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>💬 WhatsApp पर भेजें</span>
                </button>

                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="py-3 px-3 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{hasCopiedShare ? 'कॉपी हुआ!' : 'अन्य माध्यम से शेयर'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: FEEDBACK & BUG REPORT */}
          {activeTab === 'feedback' && (
            <form onSubmit={handleSubmitFeedback} className="space-y-3 animate-fadeIn">
              <div className="space-y-1">
                <label className="font-bold text-orange-950 text-xs">प्रतिक्रिया श्रेणी चुनें:</label>
                <select
                  value={feedbackCategory}
                  onChange={(e) => setFeedbackCategory(e.target.value)}
                  className="w-full bg-white border border-orange-300 rounded-xl px-3 py-2 text-xs font-bold text-orange-950 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="feature">💡 नया फीचर या पुस्तक अनुरोध</option>
                  <option value="bug">🐞 कोई समस्या या बग रिपोर्ट</option>
                  <option value="shloka_fix">🚩 श्लोक या अनुवाद सुधार</option>
                  <option value="experience">💖 भक्त अनुभव एवं प्रशंसा</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-orange-950 text-xs">आपका बहुमूल्य सुझाव या विवरण:</label>
                <textarea
                  rows={4}
                  required
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="कृपया अपना सुझाव या समस्या विस्तार से लिखें..."
                  className="w-full bg-white border border-orange-300 rounded-xl p-3 text-xs text-orange-950 focus:outline-none focus:ring-1 focus:ring-amber-500 leading-relaxed resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-orange-950 text-[11px]">ईमेल (ऐच्छिक - उत्तर पाने हेतु):</label>
                <input
                  type="email"
                  value={feedbackEmail}
                  onChange={(e) => setFeedbackEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-white border border-orange-300 rounded-xl px-3 py-2 text-xs text-orange-950 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white font-black text-xs shadow-md active:scale-98 transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>सुझाव दर्ज करें ➔</span>
              </button>

              {feedbackSubmitted && (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-center text-xs font-bold">
                  ✅ धन्यवाद! आपका सुझाव सफलतापूर्वक दर्ज कर लिया गया है।
                </div>
              )}
            </form>
          )}

        </div>

        {/* FOOTER */}
        <div className="p-3 bg-orange-100/70 border-t border-orange-200 text-center text-[10.5px] text-orange-900 font-bold">
          🚩 सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः • आस्था : पूजा जाप
        </div>
      </div>
    </div>
  );
};

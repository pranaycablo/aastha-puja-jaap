import React, { useState, useEffect } from 'react';
import { Network } from '@capacitor/network';
import { WifiOff, RefreshCw, AlertCircle, Sparkles, Smartphone, ShieldCheck, Flame } from 'lucide-react';

interface NetworkGuardProps {
  children: React.ReactNode;
}

export const NetworkGuard: React.FC<NetworkGuardProps> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const verifyRealConnection = async (): Promise<boolean> => {
    try {
      const status = await Network.getStatus();
      if (!status.connected) return false;

      // Actual ping test with cache-busting to ensure live connectivity
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(`https://raw.githubusercontent.com/pranaycablo/aastha-puja-jaap/main/version.json?ts=${Date.now()}`, {
        method: 'HEAD',
        mode: 'no-cors',
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return true;
    } catch {
      // Fallback to basic online status
      return typeof navigator !== 'undefined' ? navigator.onLine : true;
    }
  };

  useEffect(() => {
    // 1. Initial check with Capacitor Network API
    Network.getStatus().then((status) => {
      setIsOnline(status.connected);
    }).catch(() => {
      if (typeof navigator !== 'undefined') {
        setIsOnline(navigator.onLine);
      }
    });

    // 2. Native Network Listener
    let listenerHandle: any = null;
    Network.addListener('networkStatusChange', (status) => {
      setIsOnline(status.connected);
      if (status.connected) {
        setErrorMessage(null);
      }
    }).then((h) => {
      listenerHandle = h;
    }).catch((e) => {
      console.warn('Network listener error:', e);
    });

    // 3. Web window fallback listeners
    const handleOnline = () => {
      setIsOnline(true);
      setErrorMessage(null);
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      try {
        if (listenerHandle && typeof listenerHandle.remove === 'function') {
          listenerHandle.remove();
        }
      } catch {}
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleManualCheck = async () => {
    setIsChecking(true);
    setErrorMessage(null);

    const connected = await verifyRealConnection();
    setIsOnline(connected);

    if (!connected) {
      setErrorMessage('इंटरनेट सक्रिय नहीं पाया गया। कृपया मोबाइल डेटा या वाई-फाई ऑन करके पुनः प्रयास करें।');
    }

    setTimeout(() => {
      setIsChecking(false);
    }, 600);
  };

  // If online, render children normally
  if (isOnline) {
    return <>{children}</>;
  }

  // Strict Compulsory Devotional Network Gate
  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-between bg-gradient-to-b from-[#1A0B2E] via-[#2A0E18] to-[#120505] text-white p-5 sm:p-6 overflow-y-auto select-none">
      {/* Sacred Top Decorative Header */}
      <div className="w-full flex items-center justify-between pt-2 px-2 text-amber-400/60 font-serif text-sm">
        <span>卐 ॐ नमः शिवाय 卐</span>
        <span>🚩 जय श्री राम 🚩</span>
      </div>

      {/* Central Majestic Card */}
      <div className="w-full max-w-md my-auto flex flex-col items-center text-center py-6 px-5 rounded-3xl bg-black/45 border-2 border-amber-500/40 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Divine Background Glow */}
        <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-orange-600/20 blur-3xl pointer-events-none" />

        {/* Sacred Icon Badge */}
        <div className="relative mb-4">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 flex items-center justify-center text-3xl shadow-lg shadow-orange-950/60 border-2 border-amber-300">
            <WifiOff className="w-10 h-10 text-white animate-pulse" />
          </div>
          <span className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-red-600 border-2 border-slate-900 flex items-center justify-center text-xs">
            ⚠️
          </span>
        </div>

        {/* Primary Alert Heading */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-200 text-xs font-black uppercase tracking-wider mb-2">
          <AlertCircle className="w-3.5 h-3.5 text-red-400" />
          इंटरनेट कनेक्शन अनिवार्य है
        </span>

        <h2 className="text-xl sm:text-2xl font-black text-amber-100 mb-2 leading-snug">
          मोबाइल इंटरनेट से कनेक्ट करें
        </h2>

        <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed mb-4 max-w-sm">
          सम्पूर्ण शास्त्र पठन, पावन मन्त्र जाप, कुण्डली समाधान व दिव्य दर्शन के लिए सक्रिय इंटरनेट कनेक्शन आवश्यक है।
        </p>

        {/* Explanation Card */}
        <div className="w-full p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/20 text-left space-y-2 mb-4">
          <div className="flex items-start gap-2 text-xs text-amber-200/80">
            <Flame className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>निःशुल्क सेवा व विज्ञापन:</strong> यह ऐप सनातन भक्तों के लिए सदैव निःशुल्क रहे, इसके लिए ऑनलाइन विज्ञापन व डिजिटल क्लाउड शास्त्र सक्रिय इंटरनेट पर ही उपलब्ध होते हैं।
            </span>
          </div>
          <div className="flex items-start gap-2 text-xs text-amber-200/80">
            <Smartphone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>सुझाव:</strong> कृपया अपने मोबाइल की स्क्रीन ऊपर से नीचे खींचकर <strong>Mobile Data</strong> अथवा <strong>Wi-Fi</strong> चालू करें।
            </span>
          </div>
        </div>

        {/* Error Feedback Message if check fails */}
        {errorMessage && (
          <div className="w-full mb-3 p-2.5 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs font-medium text-center animate-shake">
            {errorMessage}
          </div>
        )}

        {/* Big Refresh / Retry Button */}
        <button
          type="button"
          onClick={handleManualCheck}
          disabled={isChecking}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black text-sm shadow-xl shadow-orange-950/70 active:scale-98 transition-all flex items-center justify-center gap-2 border border-amber-300 disabled:opacity-60 cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
          <span>{isChecking ? 'इंटरनेट कनेक्शन जाँचा जा रहा है...' : '🔄 इंटरनेट चालू कर लिया, पुनः प्रयास करें'}</span>
        </button>
      </div>

      {/* Sacred Footer Note */}
      <div className="w-full text-center pb-2 text-[11px] text-amber-300/60 font-serif">
        ✨ आस्था • पूजा पाठ • मन्त्र जप • श्री राम व महादेव की पावन कृपा ✨
      </div>
    </div>
  );
};

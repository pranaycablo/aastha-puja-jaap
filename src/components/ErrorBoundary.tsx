import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Trash2, Heart } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('App Uncaught Error Caught by Boundary:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleResetCache = () => {
    try {
      // Clear non-critical caches while safely retaining profile & streak
      const profile = localStorage.getItem('divya_jaap_profile');
      const streak = localStorage.getItem('divya_jaap_streak');
      const mantras = localStorage.getItem('divya_jaap_selected_mantras');
      localStorage.clear();
      if (profile) localStorage.setItem('divya_jaap_profile', profile);
      if (streak) localStorage.setItem('divya_jaap_streak', streak);
      if (mantras) localStorage.setItem('divya_jaap_selected_mantras', mantras);
    } catch (e) {
      console.warn('Cache clear error:', e);
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-gradient-to-b from-[#1C0F0A] via-[#2D160E] to-[#120603] text-white p-6 select-none">
          <div className="w-full max-w-md bg-black/60 border-2 border-amber-500/50 rounded-3xl p-6 text-center shadow-2xl backdrop-blur-md">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-300">
              <AlertTriangle className="w-8 h-8 text-amber-400 animate-bounce" />
            </div>

            <div className="text-amber-400 font-serif text-sm font-bold mb-1">॥ ॐ नमः शिवाय ॥</div>
            <h2 className="text-xl font-black text-amber-100 mb-2">
              स्वस्थ पुनर्प्राप्ति प्रणाली (Safe Recovery)
            </h2>
            <p className="text-xs text-amber-200/80 mb-5 leading-relaxed">
              ऐप में एक अप्रत्याशित समस्या को सुरक्षित रूप से रोक दिया गया है। आपका साधना डेटा और कुण्डली विवरण पूर्णतः सुरक्षित है।
            </p>

            <div className="space-y-3">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black text-sm shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>ऐप को पुनः लोड करें (Reload App)</span>
              </button>

              <button
                type="button"
                onClick={this.handleResetCache}
                className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-amber-200 text-xs font-bold border border-amber-500/30 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5 text-amber-400" />
                <span>सुरक्षित कैश साफ़ करें व पुनः लोड करें</span>
              </button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-1 text-[11px] text-amber-300/60 font-serif">
              <Heart className="w-3 h-3 text-red-400 fill-red-400" />
              <span>आस्था सनातन सेवा प्रकल्प द्वारा रक्षित</span>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

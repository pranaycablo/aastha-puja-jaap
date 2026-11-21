import React, { useState, useEffect } from 'react';
import { Network } from '@capacitor/network';
import { WifiOff, RefreshCw, AlertCircle, ShieldAlert } from 'lucide-react';

interface NetworkGuardProps {
  children: React.ReactNode;
}

export const NetworkGuard: React.FC<NetworkGuardProps> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [isChecking, setIsChecking] = useState<boolean>(false);

  useEffect(() => {
    // 1. Initial check with native Capacitor Network API
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
    }).then((h) => {
      listenerHandle = h;
    }).catch((e) => {
      console.warn('Network listener error:', e);
    });

    // 3. Web window fallback listeners
    const handleOnline = () => setIsOnline(true);
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
    try {
      const status = await Network.getStatus();
      setIsOnline(status.connected);
    } catch {
      setIsOnline(typeof navigator !== 'undefined' ? navigator.onLine : true);
    }
    setTimeout(() => {
      setIsChecking(false);
    }, 500);
  };

  return (
    <>
      {!isOnline && (
        <div className="bg-amber-900/90 text-amber-100 text-[11px] font-bold py-1 px-3 text-center flex items-center justify-center gap-1.5 shadow-sm sticky top-0 z-50 select-none">
          <WifiOff className="w-3.5 h-3.5 text-amber-300" />
          <span>📴 ऑफ़लाइन साधना मोड सक्रिय • बिना इंटरनेट निर्बाध जप जारी रखें</span>
        </div>
      )}
      {children}
    </>
  );
};

import { Network } from '@capacitor/network';
import { Browser } from '@capacitor/browser';
import {
  APP_CURRENT_VERSION,
  UPDATE_MANIFEST_URL,
  DEFAULT_ONLINE_MANIFEST,
  AppVersionManifest
} from '../config/updateConfig';

export interface UpdateCheckResult {
  hasUpdate: boolean;
  isMandatory: boolean;
  manifest: AppVersionManifest;
}

type UpdateCallback = (result: UpdateCheckResult) => void;

class UpdateEngine {
  private listeners: UpdateCallback[] = [];
  private lastCheckTime: number = 0;
  private isChecking: boolean = false;

  constructor() {
    this.initNetworkListener();
  }

  private initNetworkListener() {
    try {
      // Listen to Capacitor native network changes
      Network.addListener('networkStatusChange', (status) => {
        if (status.connected) {
          this.checkIfOnlineAndTrigger();
        }
      });
    } catch {
      // Browser fallback
      if (typeof window !== 'undefined') {
        window.addEventListener('online', () => {
          this.checkIfOnlineAndTrigger();
        });
      }
    }
  }

  onUpdateAvailable(cb: UpdateCallback) {
    this.listeners.push(cb);
  }

  private async checkIfOnlineAndTrigger() {
    // Avoid spamming requests within 30 seconds
    const now = Date.now();
    if (now - this.lastCheckTime < 30000) return;
    this.lastCheckTime = now;

    const result = await this.checkForUpdates();
    if (result && result.hasUpdate) {
      this.listeners.forEach((fn) => fn(result));
    }
  }

  /**
   * Semver comparison: returns 1 if remote > local, -1 if remote < local, 0 if equal
   */
  compareVersions(remote: string, local: string): number {
    const parse = (v: string) =>
      v
        .replace(/^v/, '')
        .split('.')
        .map((n) => parseInt(n, 10) || 0);

    const [rMajor, rMinor, rPatch] = parse(remote);
    const [lMajor, lMinor, lPatch] = parse(local);

    if (rMajor !== lMajor) return rMajor > lMajor ? 1 : -1;
    if (rMinor !== lMinor) return rMinor > lMinor ? 1 : -1;
    if (rPatch !== lPatch) return rPatch > lPatch ? 1 : -1;
    return 0;
  }

  /**
   * Check remote server for newer version manifest
   */
  async checkForUpdates(): Promise<UpdateCheckResult | null> {
    if (this.isChecking) return null;
    this.isChecking = true;

    try {
      // Check network status first
      try {
        const netStatus = await Network.getStatus();
        if (!netStatus.connected) {
          this.isChecking = false;
          return null;
        }
      } catch {
        if (!navigator.onLine) {
          this.isChecking = false;
          return null;
        }
      }

      // Fetch remote manifest with cache-buster
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch(`${UPDATE_MANIFEST_URL}?t=${Date.now()}`, {
        signal: controller.signal,
        headers: { 'Cache-Control': 'no-cache' }
      });
      clearTimeout(timeoutId);

      let manifest: AppVersionManifest;
      if (response.ok) {
        manifest = await response.json();
      } else {
        // Fallback default manifest if remote not yet uploaded
        manifest = DEFAULT_ONLINE_MANIFEST;
      }

      const hasUpdate = this.compareVersions(manifest.latestVersion, APP_CURRENT_VERSION.version) > 0;
      const isMandatory =
        manifest.forceUpdate ||
        this.compareVersions(manifest.minSupportedVersion, APP_CURRENT_VERSION.version) > 0;

      this.isChecking = false;
      return {
        hasUpdate,
        isMandatory,
        manifest
      };
    } catch (e) {
      console.warn('Update check bypassed:', e);
      this.isChecking = false;
      return null;
    }
  }

  /**
   * Download and launch update
   */
  async startUpdate(manifest: AppVersionManifest): Promise<void> {
    const targetUrl = manifest.apkDownloadUrl || manifest.playStoreUrl;
    try {
      await Browser.open({ url: targetUrl });
    } catch {
      window.open(targetUrl, '_blank');
    }
  }
}

export const updateEngine = new UpdateEngine();

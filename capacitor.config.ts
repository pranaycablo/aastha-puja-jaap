import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.divyajaap.app',
  appName: 'आस्था : पूजा जाप',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  android: {
    allowMixedContent: true,
    backgroundColor: '#FFFDF9'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: true,
      backgroundColor: '#FFFDF9',
      androidSplashResourceName: 'splash',
      showSpinner: false,
      splashFullScreen: false,
      splashImmersive: false
    }
  }
};

export default config;

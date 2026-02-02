import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dev.makkusu.void_explorer',
  appName: 'Void Explorer',
  webDir: 'dist/void-explorer/browser',
  plugins: {
    SplashScreen: {
      splashImmersive: true, // Hide Status and Navigation Bars
      spashFullScreen: true, // Enable Fullscreen Splash Screen
    },
  },
};

export default config;

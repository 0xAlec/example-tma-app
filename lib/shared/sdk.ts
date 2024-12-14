// import WebApp from '@twa-dev/sdk';
// import sdk from '@farcaster/frame-sdk';
import { init, retrieveLaunchParams, miniApp } from '@telegram-apps/sdk';

export class MiniSDK {
  private platform: 'telegram' | 'frame' | 'unknown';

  constructor() {
    // try request from telegram first
    // if not, try request from frame
    try {
      init();
      this.platform = 'telegram';
      if (miniApp.mount.isAvailable()) {
        miniApp.mount();
        miniApp.isMounted();
      }
    } catch (err) {
      console.error('Platform is not telegram', err);
      this.platform = 'unknown';
    }
  }

  // Use this to tell the parent application the platform is ready
  public Ready() {
    if (miniApp.ready.isAvailable()) {
      miniApp.ready();
    }
  }

  // Returns the platform name
  public GetPlatform() {
    return this.platform;
  }

  // Returns the user from the context
  public GetUserFromContext() {
    if (this.platform === 'telegram') {
      const { initData } = retrieveLaunchParams();
      return initData?.user;
    }
  }
}

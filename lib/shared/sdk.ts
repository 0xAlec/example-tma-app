// import WebApp from '@twa-dev/sdk';
import sdk from '@farcaster/frame-sdk';
import {
  init,
  retrieveLaunchParams,
  miniApp,
  openLink,
} from '@telegram-apps/sdk';
import eruda from 'eruda';

eruda.init();

export class MiniSDK {
  private platform: 'telegram' | 'warpcast' | 'unknown' = 'unknown';

  constructor() {
    // Try to initialize Telegram first
    try {
      init();
      this.platform = 'telegram';
      if (miniApp.mount.isAvailable()) {
        miniApp.mount();
        miniApp.isMounted();
        if (miniApp.ready.isAvailable()) {
          miniApp.ready();
        }
      }
    } catch (err) {
      console.error('Platform is not telegram', err);
    }

    // Try to initialize Warpcast
    try {
      if (sdk) {
        sdk.actions.ready();
        this.platform = 'warpcast';
      }
    } catch (err) {
      console.error('Platform is not warpcast', err);
    }
  }

  // Returns the platform name
  public GetPlatform() {
    return this.platform;
  }

  // Returns the user from the context
  public async GetUserFromContext() {
    if (this.platform === 'telegram') {
      const { initData } = retrieveLaunchParams();
      return initData?.user;
    } else if (this.platform === 'warpcast') {
      return await sdk.context;
    }
  }

  // Open a link in the browser
  public OpenLink(url: string) {
    if (this.platform === 'telegram' && openLink.isAvailable()) {
      openLink(url, {
        tryBrowser: 'chrome',
      });
    }
  }
}

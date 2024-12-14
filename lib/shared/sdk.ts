// import WebApp from '@twa-dev/sdk';
// import sdk from '@farcaster/frame-sdk';
import {
  init,
  retrieveLaunchParams,
  miniApp,
  openLink,
} from '@telegram-apps/sdk';
import eruda from 'eruda';

eruda.init();
const console = eruda.get('console');

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
    this.ready();
  }

  // Use this to tell the parent application the platform is ready
  private ready() {
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

  // Open a link in the browser
  public OpenLink(url: string) {
    console.log(this.platform, openLink.isAvailable());
    if (this.platform === 'telegram' && openLink.isAvailable()) {
      openLink(url, {
        tryBrowser: 'chrome',
      });
    }
  }
}

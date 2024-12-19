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

const console = eruda.get('console');

export class MiniSDK {
  private platform: 'telegram' | 'warpcast' | 'unknown' = 'unknown';
  public initDataRaw: string | undefined;

  constructor() {}

  public async Ready() {
    // Try to initialize Telegram first
    try {
      init();
      this.platform = 'telegram';
      const { initDataRaw } = retrieveLaunchParams();
      this.initDataRaw = initDataRaw;
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
        const context = await sdk.context;

        if (!context) {
          throw new Error('No context found');
        }
        sdk.actions.ready();
        this.platform = 'warpcast';
      }
    } catch (err) {
      console.error('Platform is not warpcast', err);
    }

    console.log('Successfully initialized platform', this.platform);
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

import WebApp from '@twa-dev/sdk'
import { MainButton } from '@twa-dev/sdk/react';
import { createCoinbaseWalletSDK } from '@coinbase/wallet-sdk';


const sdk = createCoinbaseWalletSDK({
    appName: 'My Dapp',
    appLogoUrl: 'https://example.com/logo.png',
    appChainIds: [84532],
});

const provider = sdk.getProvider();

WebApp.ready()

export default function AlertButton() {
  return <MainButton text="Connect Wallet" onClick={async () => await provider.request({
    method: 'eth_requestAccounts',
  })} />
}

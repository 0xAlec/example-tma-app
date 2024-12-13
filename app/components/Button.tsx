
import WebApp from '@twa-dev/sdk'
import { MainButton } from '@twa-dev/sdk/react';


const biometricManager = WebApp.BiometricManager

WebApp.ready()
biometricManager.init()

export default function AlertButton() {
  return <MainButton text="Connect Wallet" onClick={() => (WebApp.openLink('https://keys.coinbase.com/connect'))} />
}

import WebApp from '@twa-dev/sdk'
import { MainButton } from '@twa-dev/sdk/react';

WebApp.ready()

export default function AlertButton() {
  return <MainButton text="Connect Wallet" onClick={() => {
    WebApp.openLink(`/auth`)
  }} />
}

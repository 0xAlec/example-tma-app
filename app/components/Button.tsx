
import WebApp from '@twa-dev/sdk'
import { MainButton } from '@twa-dev/sdk/react';


const biometricManager = WebApp.BiometricManager

biometricManager.init()

export default function AlertButton() {
  return <MainButton text="Connect Wallet" onClick={() => biometricManager.authenticate({'reason': 'Authenticate to continue'}, (isAuthenticated) => {
    if (isAuthenticated) {
      WebApp.showAlert('Authenticated')
    } else {
      WebApp.showAlert('Not Authenticated')
    }
  })} />
}


import WebApp from '@twa-dev/sdk'

export default function AlertButton() {
  return <button onClick={() => WebApp.showAlert(`Hello World!`)}>
    Show Alert
  </button>
}
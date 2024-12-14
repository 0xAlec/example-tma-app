import { useMiniContext } from '@lib/shared/MiniProvider';

export default function ConnectWalletButton() {
  const { openLink } = useMiniContext();

  return (
    <button 
      onClick={() => openLink('https://keys.coinbase.com/connect')}
      className="bg-blue-600 border border-blue-700 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
    >
      {'Connect Wallet'}
    </button>
  )
}
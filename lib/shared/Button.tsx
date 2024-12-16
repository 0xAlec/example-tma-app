import { useAccount, useConnect } from 'wagmi'

export default function ConnectWalletButton() {
  const { address } = useAccount();
  const { connect, connectors } = useConnect()

  const connector = connectors[0];

  if (address) {
    return <div>Connected: {address}</div>
  }

  return (
    <button 
      onClick={() => {
        connect({ connector })
      }}
      className="bg-blue-600 border border-blue-700 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
    >
      {'Connect Wallet'}
    </button>
  )
}
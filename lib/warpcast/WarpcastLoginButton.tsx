import { useAccount, useConnect, useDisconnect } from 'wagmi'

export default function WarpcastLoginButton() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect, connectors } = useConnect()

  const connector = connectors[0];

  if (isConnected && address) {
    return (
      <>
        <div>Connected: {address}</div>
        <br />
        <button
          className="bg-blue-600 border border-blue-700 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </>
    )
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
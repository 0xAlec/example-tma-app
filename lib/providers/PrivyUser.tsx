import { EIP1193Provider, usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";

export default function PrivyUser() {
    const {ready, authenticated, sendTransaction, logout} = usePrivy();
    const {wallets} = useWallets();
    const [provider, setProvider] = useState<EIP1193Provider>();
    const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');

    useEffect(() => {
        const initialize = async () => {
            const provider = await embeddedWallet?.getEthereumProvider();
            console.log(provider);
            setProvider(provider);
        }
        if (!provider) {
            initialize();
        }
    }, [embeddedWallet,provider]);


    if (!ready) {
      // Do nothing while the PrivyProvider initializes with updated user state
      return <></>;
    }

  
    if (ready && authenticated) {
      // Replace this code with however you'd like to handle an authenticated user
      return (
        <>
          {embeddedWallet && <p>Embedded Wallet: {embeddedWallet.address}</p>}
          {provider && <button 
            onClick={async () => {
              try {
                const tx = await sendTransaction({
                  to: '0x6Cd01c0F55ce9E0Bf78f5E90f72b4345b16d515d'
                });
                console.log(tx);
              } catch (error) {
                if ((error as Error).message.includes('rejected')) {
                  console.log('Transaction was rejected by the user');
                  // You can add UI feedback here, like showing a toast notification
                } else {
                  console.error('Transaction failed:', error);
                }
              }
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded mr-2"
          >
            Send Transaction
          </button>}
          <button 
            onClick={() => logout()} 
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
          >
            Logout
          </button>
        </>
      )
    }
}
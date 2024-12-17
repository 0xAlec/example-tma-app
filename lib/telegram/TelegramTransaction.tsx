import { EIP1193Provider, usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";

export default function TelegramTransaction() {
    const {ready, authenticated, sendTransaction, logout} = usePrivy();
    const {wallets} = useWallets();
    const [provider, setProvider] = useState<EIP1193Provider>();
    const [txStatus, setTxStatus] = useState<'idle' | 'pending' | 'success'>("idle");
    const [txHash, setTxHash] = useState<string>();
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
        return <></>;
    }

    if (ready && authenticated) {
        if (txStatus === 'pending') {
            return <div className="text-center p-4">Transaction pending...</div>
        }

        if (txStatus === 'success') {
            return (
                <div className="p-4 break-words text-sm">
                    Transaction hash: 
                    <span className="block mt-1 text-blue-600">
                        {txHash}
                    </span>
                </div>
            );
        }

        return (
            <>
                {provider && <button 
                    onClick={async () => {
                        try {
                            setTxStatus('pending');
                            const tx = await sendTransaction({
                                to: '0x6Cd01c0F55ce9E0Bf78f5E90f72b4345b16d515d'
                            });
                            setTxHash(tx.transactionHash);
                            setTxStatus('success');
                        } catch (error) {
                            setTxStatus('idle');
                            if ((error as Error).message.includes('rejected')) {
                                console.log('Transaction was rejected by the user');
                            } else {
                                console.error('Transaction failed:', error);
                            }
                        }
                    }}
                    className="w-full md:w-auto bg-blue-600 border border-blue-700 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                >
                    Transaction
                </button>}
                <button 
                    onClick={() => logout()} 
                    className="w-full md:w-auto bg-blue-600 border border-blue-700 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer ml-2"
                >
                    Logout
                </button>
            </>
        )
    }
}
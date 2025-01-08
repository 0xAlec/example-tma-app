import { useState, useEffect } from 'react';
import eruda from 'eruda';

eruda.init();

const console = eruda.get('console');

export default function MiniKitTransaction() {
    const [showIframe, setShowIframe] = useState(false);
    const [hash, setHash] = useState('');

    // Add useEffect to handle iframe messages
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === 'TRANSACTION_SUCCESS') {
                setHash(event.data.hash);
            }
            // TODO: Verify origin in production
            if (event.data.type === 'CLOSE_IFRAME') {
                setShowIframe(false);
            }
        };

        window.addEventListener('message', handleMessage);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    const transaction = {
        to: '0x0000000000000000000000000000000000000000',
        value: '100000'
    }
    const transactionString = new URLSearchParams(JSON.stringify(transaction)).toString();

    if (hash) {
        return (
            <div className="flex flex-col items-center text-sm">
                <span>Transaction successful!</span>
                <button 
                    onClick={() => window.open(`https://sepolia.basescan.org/tx/${hash}`, '_blank')}
                    className="bg-blue-600 border border-blue-700 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer mt-2"
                >
                    View on Etherscan
                </button>
            </div>
        );
    }

    return (
        <div>
            <button onClick={() => setShowIframe(true)} className="bg-blue-600 border border-blue-700 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
                {'Transact'}
            </button>

            {showIframe && (
                <div 
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
                onClick={(e) => {
                if (e.target === e.currentTarget) setShowIframe(false);
                }}
                >
                <div 
                className="absolute w-full h-full overflow-hidden"
                style={{ margin: 0 }}
                >
                <button 
                    onClick={() => setShowIframe(false)}
                    className="absolute top-2 right-2 z-[10000] text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    ✕
                </button>
                <iframe 
                    src={`https://minikit-auth.vercel.app/transaction?data=${transactionString}`}
                    title="Transaction Interface"
                    width="100%"
                    height="100%"
                    style={{ border: 'none' }}
                />
                </div>
                </div>
            )}
        </div>
    )
}
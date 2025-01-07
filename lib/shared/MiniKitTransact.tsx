import { useState } from 'react';

export default function MiniKitTransaction() {
    const [showIframe, setShowIframe] = useState(false);
    const transaction = {
        to: '0x0000000000000000000000000000000000000000',
        value: '100000'
    }
    const transactionString = new URLSearchParams(JSON.stringify(transaction)).toString();

    return (
        <div>
            <button onClick={() => setShowIframe(true)} className="bg-blue-600 border border-blue-700 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
                {'Transact'}
            </button>

            {showIframe && (
                <div 
                className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/50"
                onClick={(e) => {
                if (e.target === e.currentTarget) setShowIframe(false);
                }}
                >
                <div 
                className="absolute w-full h-1/2 overflow-hidden"
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
                    height="500px"
                    style={{ border: 'none' }}
                />
                </div>
                </div>
                
            )}
        </div>
    )
}
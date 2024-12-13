'use client';

import { WalletDefault } from '@coinbase/onchainkit/wallet';
 

export default function Login() {
    return (
        <div className="flex flex-col min-h-screen font-sans dark:bg-background dark:text-white bg-white text-black">
            <main className="flex-grow flex items-center justify-center">
                <WalletDefault />
            </main>
      </div>
    )
}
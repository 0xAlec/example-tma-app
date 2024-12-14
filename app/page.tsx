'use client';

import dynamic from 'next/dynamic';

const User = dynamic(() => import('./components/User'), {
  ssr: false,
});

const ConnectWalletButton = dynamic(() => import('@lib/shared/Button'), {
  ssr: false,
});

export default function App() {
  return (
    <div className="flex flex-col min-h-screen font-sans dark:bg-background dark:text-white bg-white text-black">
      <main className="flex-grow flex flex-col items-center justify-center">
        <User />
        <br />
        <ConnectWalletButton />
        <br />
        <button 
          onClick={() => {
            window.open('https://keys.coinbase.com/connect', '_blank');
          }}
          className="bg-blue-600 border border-blue-700 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          {'Connect Wallet 2'}
    </button>
      </main>
    </div>
  );
}

'use client';

import ConnectWallet from '@/lib/mini/ConnectWallet';
import dynamic from 'next/dynamic';

const User = dynamic(() => import('./components/User'), {
  ssr: false,
});

const Auth = dynamic(() => import('./components/Auth'), {
  ssr: false,
});

const Transaction = dynamic(() => import('./components/Transaction'), {
  ssr: false,
});

export default function App() {
  return (
    <div className="flex flex-col min-h-screen font-sans dark:bg-background dark:text-white bg-white text-black">
      <main className="flex-grow flex flex-col items-center justify-center">
        <User />
        <br />
        <ConnectWallet />
        <br />
        <Auth />
        <br />
        <Transaction />
      </main>
    </div>
  );
}

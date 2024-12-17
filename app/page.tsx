'use client';

import dynamic from 'next/dynamic';

import Transaction from '@/lib/mini/Transaction';

const ConnectWallet = dynamic(() => import('@/lib/mini/ConnectWallet'), {
  ssr: false,
});

const User = dynamic(() => import('./components/User'), {
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
        <Transaction />
      </main>
    </div>
  );
}

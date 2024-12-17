'use client';

import dynamic from 'next/dynamic';

const ConnectWallet = dynamic(() => import('@/lib/mini/ConnectWallet'), {
  ssr: false,
});

const Transaction = dynamic(() => import('@/lib/mini/Transaction'), {
  ssr: false,
});

const User = dynamic(() => import('./components/User'), {
  ssr: false,
});

const Redirect = dynamic(() => import('./components/Redirect'), {
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
        <br />
        <Redirect />
      </main>
    </div>
  );
}

'use client';

import dynamic from 'next/dynamic';
import ConnectWallet from '@/lib/mini/ConnectWallet';


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
      </main>
    </div>
  );
}

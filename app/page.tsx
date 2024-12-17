'use client';

import dynamic from 'next/dynamic';

const User = dynamic(() => import('./components/User'), {
  ssr: false,
});

export default function App() {
  return (
    <div className="flex flex-col min-h-screen font-sans dark:bg-background dark:text-white bg-white text-black">
      <main className="flex-grow flex flex-col items-center justify-center">
        <User />
        <br />
        <appkit-button />
      </main>
    </div>
  );
}

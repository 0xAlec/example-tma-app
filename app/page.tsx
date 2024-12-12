'use client';

import dynamic from 'next/dynamic';

const AlertButton = dynamic(() => import('./components/Button'), {
  ssr: false,
});

export default function App() {
  return (
    <div className="flex flex-col min-h-screen font-sans dark:bg-background dark:text-white bg-white text-black">
      <main className="flex-grow flex items-center justify-center">
        <AlertButton />
      </main>
    </div>
  );
}

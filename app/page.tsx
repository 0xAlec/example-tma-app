'use client';

import dynamic from 'next/dynamic';
import PrivyLoginButton from '@/lib/providers/PrivyLogin';
import PrivyUser from '@/lib/providers/PrivyUser';


const User = dynamic(() => import('./components/User'), {
  ssr: false,
});

export default function App() {
  return (
    <div className="flex flex-col min-h-screen font-sans dark:bg-background dark:text-white bg-white text-black">
      <main className="flex-grow flex flex-col items-center justify-center">
        <User />
        <br />
        <PrivyLoginButton />
        <br />
        <br />
        <PrivyUser />
      </main>
    </div>
  );
}

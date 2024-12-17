'use client';

import WarpcastLoginButton from "@/lib/warpcast/WarpcastLoginButton";
 

export default function Login() {
    return (
        <div className="flex flex-col min-h-screen font-sans dark:bg-background dark:text-white bg-white text-black">
            <main className="flex-grow flex items-center justify-center">
                <WarpcastLoginButton />
            </main>
      </div>
    )
}
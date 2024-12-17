'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { useDisconnect } from '@reown/appkit/react'


const User = dynamic(() => import('./components/User'), {
  ssr: false,
});

export default function App() {
  const { address } = useAccount()
  const { data, writeContract, status } = useWriteContract()
  const { disconnect } = useDisconnect()
  useEffect(() => {
    if (status === 'success') {
      console.log('Transaction successful')
      console.log(data);
    }
  }, [status, data])

  return (
    <div className="flex flex-col min-h-screen font-sans dark:bg-background dark:text-white bg-white text-black">
      <main className="flex-grow flex flex-col items-center justify-center">
        <User />
        <br />
        <appkit-button />
        <br />
        <button onClick={() => disconnect()}>Disconnect</button>
        <br />
        {address && <button 
          onClick={() => {
            writeContract({
              address: '0x67c97D1FB8184F038592b2109F854dfb09C77C75',
              abi: [
                {
                  type: 'function',
                  name: 'click',
                  inputs: [],
                  outputs: [],
                  stateMutability: 'nonpayable',
                },
              ],
              functionName: 'click',
              args: [],
            })
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Click
        </button>}
      </main>
    </div>
  );
}

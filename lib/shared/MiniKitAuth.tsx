import { useState, useRef } from 'react';

export default function MiniKitAuth() {
  const [showIframe, setShowIframe] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [randomString] = useState(() => Math.random().toString(36).substring(7));

  const sendAuthRequest = async () => {
    try {
      const response = await fetch('https://minikit-auth.vercel.app/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ randomString }),
      });
      
      if (!response.ok) {
        throw new Error('Auth request failed');
      }
      
      const data = await response.json();
      console.log('Auth response:', data);
    } catch (error) {
      console.error('Auth request error:', error);
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setShowIframe(true)}
        className="bg-blue-600 border border-blue-700 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
      >
        {'Connect Wallet'}
      </button>

      {showIframe && (
        <div 
          className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowIframe(false);
          }}
        >
          <div 
            className="absolute w-full h-1/2 overflow-hidden"
            style={{ margin: 0 }}
          >
            <button 
              onClick={() => setShowIframe(false)}
              className="absolute top-2 right-2 z-[10000] text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
            <iframe 
              ref={iframeRef}
              src={`https://minikit-auth.vercel.app/?call_id=${randomString}`}
              className="w-full h-full border-none"
              style={{ margin: 0, padding: 0 }}
              allow="camera; microphone; payment"
              onLoad={sendAuthRequest}
            />
          </div>
        </div>
      )}
    </div>
  );
}
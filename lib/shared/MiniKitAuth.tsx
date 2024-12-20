import { useState, useRef } from 'react';
import { useMiniContext } from '../providers/MiniProvider';

export default function MiniKitAuth() {
  const [showIframe, setShowIframe] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { platform, initData } = useMiniContext();
  
  const botID = '7845021044';

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
              src={`http://localhost:3001/?init_data=${encodeURIComponent(initData || '')}&platform=${platform}&bot_id=${botID}`}
              className="w-full h-full border-none"
              style={{ margin: 0, padding: 0 }}
              allow="camera; microphone; payment"
            />
          </div>
        </div>
      )}
    </div>
  );
}
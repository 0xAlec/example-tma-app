import { useState, useRef, useEffect } from 'react';
import { useMiniContext } from '../providers/MiniProvider';
import eruda from 'eruda';

eruda.init();

const console = eruda.get('console');

export default function MiniKitAuth() {
  const [showIframe, setShowIframe] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { platform, initData } = useMiniContext();

  // Add useEffect to handle iframe messages
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
        console.log('Received message from iframe:', event.data);
        // TODO: Verify origin in production
        if (event.data.type === 'CLOSE_IFRAME') {
            setShowIframe(false);
        }
    };

    window.addEventListener('message', handleMessage);

    // Cleanup listener on component unmount
    return () => {
        window.removeEventListener('message', handleMessage);
    };
}, []);

  useEffect(() => {
    console.log(initData);
    if (initData) {
      setShowIframe(true);
    }
  }, [initData]);
  
  const botID = '7845021044';

  return (
    <div className="relative">
      {showIframe && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowIframe(false);
          }}
        >
          <div 
            className="absolute w-full h-full overflow-hidden"
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
              src={`https://minikit-auth.vercel.app/?init_data=${encodeURIComponent(initData || '')}&platform=${platform}&bot_id=${botID}`}
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
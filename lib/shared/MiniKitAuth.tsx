import { useState, useRef, useEffect } from 'react';
import { useMiniContext } from '../providers/MiniProvider';
import eruda from 'eruda';
import sdk from '@farcaster/frame-sdk';
import { generateNonce } from 'siwe'
import type { Context } from '@farcaster/frame-sdk';

eruda.init();

const console = eruda.get('console');

export default function MiniKitAuth() {
  const [showIframe, setShowIframe] = useState(false);
  const [result, setResult] = useState<{
    signature: string;
    message: string;
    nonce: string;
  }>();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { platform, initData, user } = useMiniContext();
  const botID = '7845021044';
  const platformParams = platform === 'warpcast' 
    ? `&nonce=${encodeURIComponent(result?.nonce || '')}&message=${encodeURIComponent(result?.message || '')}&signature=${encodeURIComponent(result?.signature || '')}&photo_url=${encodeURIComponent((user as Context.FrameContext)?.user.pfpUrl || '')}&username=${encodeURIComponent((user as Context.FrameContext)?.user.username || '')}` 
    : `&init_data=${encodeURIComponent(initData || '')}`;

  // Add useEffect to handle iframe messages
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
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
    const signIn = async () => {
      if (platform === 'telegram' && initData) {
        setShowIframe(true);
      }
      if (platform === 'warpcast') {
        const nonce = generateNonce();
        const result = await sdk.actions.signIn({ nonce })
        setResult({ nonce, message: result.message, signature: result.signature });
      }
    }
    signIn();
  }, [initData, platform]);

  useEffect(() => {
    if (!result) return;
    setShowIframe(true);
  }, [result]);


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
              src={`https://minikit-auth.vercel.app/?platform=${platform}&bot_id=${botID}${platformParams}`}
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
import { MiniSDK } from "../config/sdk"
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { MiniUser } from '../config/types';
import OnchainProviders from "./OnchainProviders";

type MiniSDKContextType = {
    platform: string | undefined;
    user: MiniUser | undefined;
    openLink: (url: string) => void;
    initData: string | undefined;
}

export const MiniSDKContext = createContext<MiniSDKContextType | null>(null)

export function useMiniContext() {
  const context = useContext(MiniSDKContext)
  if (!context) {
    throw new Error('useMiniSDK must be used within a MiniProvider')
  }
  return context
}

const sdk = new MiniSDK();

export function MiniProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<MiniUser | undefined>(undefined);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const initialize = async () => {
            await sdk.Ready();
            setReady(true);
            const user = await sdk.GetUserFromContext();
            if (user) {
                setUser(user);
            }
        }
        if (!ready) {
            initialize();
        }
    }, [user, ready]);

    const value = useMemo(() => ({
        platform: sdk.GetPlatform(),
        user,
        openLink: (url: string) => sdk.OpenLink(url),
        initData: sdk.initDataRaw
    }), [user])

    if (value.platform === 'warpcast') {
        return (
            <MiniSDKContext.Provider value={value}>
                <OnchainProviders>{children}</OnchainProviders>
            </MiniSDKContext.Provider>
        )
    }

    return (
        <MiniSDKContext.Provider value={value}>
            <OnchainProviders>{children}</OnchainProviders>
        </MiniSDKContext.Provider>
    )
}
import { MiniSDK } from "./sdk"
import { createContext, useContext, useMemo } from 'react'
import type { User } from '@telegram-apps/sdk';

type MiniSDKContextType = {
    user: User | undefined;
    platform: string | undefined;
    openLink: (url: string) => void;
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
    const value = useMemo(() => ({
        user: sdk.GetUserFromContext(),
        platform: sdk.GetPlatform(),
        openLink: sdk.OpenLink
    }), [])

    return <MiniSDKContext.Provider value={value}>{children}</MiniSDKContext.Provider>
}
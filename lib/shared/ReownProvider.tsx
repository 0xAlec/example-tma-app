'use client'

import { wagmiAdapter, projectId } from '@/lib/config/config'
import { createAppKit } from '@reown/appkit/react' 
import { base } from '@reown/appkit/networks'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

// Set up queryClient
const queryClient = new QueryClient()

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Set up metadata
const metadata = { //this is optional
  name: "tma-app",
  description: "TMA App",
  url: "https://example-tma-app.vercel.app/", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"]
}

// Create the modal
createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [base],
  defaultNetwork: base,
  metadata: metadata,
  featuredWalletIds: ['fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa'],
  features: {
    analytics: false, // Optional - defaults to your Cloud configuration
    email: false, // default to true
    socials: ['google'],
    emailShowWallets: true, // default to true
  },
  themeMode: 'light',
})

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider
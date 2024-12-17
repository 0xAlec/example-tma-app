import { createConfig, http, WagmiProvider } from "wagmi";
import { base } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { frameConnector } from "../warpcast/connector";
import { useMiniContext } from "./MiniProvider";
import { useState, useEffect } from "react";
import { coinbaseWallet } from 'wagmi/connectors';
    
const queryClient = new QueryClient();

export default function OnchainProviders({ children }: { children: React.ReactNode }) {
    const [config, setConfig] = useState<ReturnType<typeof createConfig>>(); 
    const { platform } = useMiniContext();

    useEffect(() => {
        if (platform === 'warpcast') {
            setConfig(createConfig({
            chains: [base],
            transports: {
                [base.id]: http(),
            },
            connectors: [frameConnector()],
        }));
    } else {
        setConfig(createConfig({
            chains: [base],
            transports: {
                [base.id]: http(),
            },
            connectors: [
                coinbaseWallet({
                    appName: 'Mini',
                    preference: 'smartWalletOnly'
                }),
            ],
        }));
    }
  }, [platform]);

  if (!config) {
    return null;
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
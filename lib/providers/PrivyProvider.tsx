import {PrivyProvider} from '@privy-io/react-auth';
import { baseSepolia } from 'viem/chains';

export default function PrivyProviders({children}: {children: React.ReactNode}) {
    return (
      <PrivyProvider
        appId="cm4rmv3a804pq14ccraqzl5nz"
        config={{
          // Customize Privy's appearance in your app
          appearance: {
            theme: 'light',
            accentColor: '#676FFF',
            logo: 'https://onchainkit.xyz/favicon/48x48.png?v4-19-24',
          },
          defaultChain: baseSepolia,
          supportedChains: [baseSepolia],
          // Create embedded wallets for users who don't have a wallet
          embeddedWallets: {
            createOnLogin: 'users-without-wallets',
          },
        }}
      >
        {children}
      </PrivyProvider>
    );
  }
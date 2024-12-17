import {usePrivy, useWallets} from '@privy-io/react-auth';

export default function TelegramLoginButton() {
  const {ready, authenticated, login} = usePrivy();
  const {wallets} = useWallets();
  const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');
  const disableLogin = !ready || (ready && authenticated);

  if (authenticated) {
    return <>Connected: {embeddedWallet?.address}</>;
  }

  return (
    <button 
      disabled={disableLogin} 
      onClick={login}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Log in
    </button>
  );
}
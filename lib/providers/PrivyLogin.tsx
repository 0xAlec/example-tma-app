import {usePrivy} from '@privy-io/react-auth';

export default function PrivyLoginButton() {
  const {ready, authenticated, login} = usePrivy();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  if (authenticated) {
    return <></>;
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
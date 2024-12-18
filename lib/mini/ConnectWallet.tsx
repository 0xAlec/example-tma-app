import { useMiniContext } from "@/lib/providers/MiniProvider";
import TelegramLoginButton from "../telegram/TelegramLoginButton";
import WarpcastLoginButton from "../warpcast/WarpcastLoginButton";
import { useDisconnect } from '@reown/appkit/react'

export default function ConnectWallet() {
    const { platform } = useMiniContext();
    const { disconnect } = useDisconnect();

    if (platform === 'warpcast') {
        return <WarpcastLoginButton />
    }
    if (platform === 'telegram') {
        return (
            <>
                <appkit-button />
                <button onClick={() => disconnect()}>Disconnect</button>
            </>
        )
    }

    return <TelegramLoginButton />
}   
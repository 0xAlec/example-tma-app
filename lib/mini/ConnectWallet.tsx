import { useMiniContext } from "@/lib/providers/MiniProvider";
import TelegramLoginButton from "../telegram/TelegramLoginButton";
import WarpcastLoginButton from "../warpcast/WarpcastLoginButton";
import { useDisconnect } from '@reown/appkit/react'
import { useAccount } from "wagmi";

export default function ConnectWallet() {
    const { platform } = useMiniContext();
    const { disconnect } = useDisconnect();
    const { isConnected } = useAccount();

    if (platform === 'warpcast') {
        return <WarpcastLoginButton />
    }
    if (platform === 'telegram') {
        return (
            <></>
        )
    }

    return <TelegramLoginButton />
}   
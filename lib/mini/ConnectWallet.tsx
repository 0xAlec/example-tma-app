import { useMiniContext } from "@/lib/providers/MiniProvider";
import TelegramLoginButton from "../telegram/TelegramLoginButton";
import WarpcastLoginButton from "../warpcast/WarpcastLoginButton";

export default function ConnectWallet() {
    const { platform } = useMiniContext();

    if (platform === 'warpcast') {
        return <WarpcastLoginButton />
    }

    return <TelegramLoginButton />
}   
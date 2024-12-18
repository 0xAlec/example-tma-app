import { useMiniContext } from "@/lib/providers/MiniProvider";
import WarpcastTransaction from "../warpcast/WarpcastTransaction";
import TelegramTransaction from "../telegram/TelegramTransaction";
import WagmiTransaction from "./WagmiTransaction";

export default function Transaction() {
    const { platform } = useMiniContext();

    if (platform === 'warpcast') {
        return <WarpcastTransaction />
    }
    // if (platform === 'telegram') {
    //     return <WagmiTransaction />
    // }

    return <TelegramTransaction />
}   
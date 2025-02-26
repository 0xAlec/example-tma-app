import { useMiniContext } from "@/lib/providers/MiniProvider";
import WarpcastTransaction from "../warpcast/WarpcastTransaction";
import TelegramTransaction from "../telegram/TelegramTransaction";

export default function Transaction() {
    const { platform } = useMiniContext();

    if (platform === 'warpcast') {
        return <WarpcastTransaction />
    }
    if (platform === 'telegram') {
        return <></>
    }

    return <TelegramTransaction />
}   
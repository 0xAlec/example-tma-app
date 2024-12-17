import { useMiniContext } from "@/lib/providers/MiniProvider";
import WarpcastTransaction from "../warpcast/WarpcastTransaction";

export default function Transaction() {
    const { platform } = useMiniContext();

    if (platform === 'warpcast') {
        return <WarpcastTransaction />
    }

    return <>Not implemented</>
}   
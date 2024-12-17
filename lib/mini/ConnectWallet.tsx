import { useMiniContext } from "@/lib/providers/MiniProvider";
import PrivyLoginButton from "../providers/PrivyLogin";
import WarpcastLoginButton from "../warpcast/WarpcastLoginButton";

export default function ConnectWallet() {
    const { platform } = useMiniContext();

    if (platform === 'warpcast') {
        return <WarpcastLoginButton />
    }

    return <PrivyLoginButton />
}   

import { useMiniContext } from "@/lib/providers/MiniProvider";
import TelegramBiometry from "@/lib/telegram/TelegramBiometry";

export default function Auth() {
    const { platform, openLink } = useMiniContext();

    if (platform === 'telegram') {
        return <TelegramBiometry />
    }

    return <button onClick={() => {
        console.log(window.location.origin);
        openLink(`${window.location.origin}/auth`)
    }}>Auth</button>;
}
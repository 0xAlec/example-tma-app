
import { useMiniContext } from "@/lib/providers/MiniProvider";

export default function Redirect() {
    const { openLink } = useMiniContext();

    return <button onClick={() => openLink('/auth')}>Auth</button>;
}
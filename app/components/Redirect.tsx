
import { useMiniContext } from "@/lib/providers/MiniProvider";

export default function Redirect() {
    const { openLink } = useMiniContext();

    return <button onClick={() => {
        console.log(window.location.origin);
        openLink(`${window.location.origin}/auth`)
    }}>Auth</button>;
}
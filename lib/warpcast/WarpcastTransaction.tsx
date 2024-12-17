

import { useSendTransaction } from "wagmi";
import { useAccount } from "wagmi";

export default function WarpcastTransaction() {
    const { address } = useAccount();
    const { sendTransaction } = useSendTransaction();

    return <button onClick={() => sendTransaction({
        to: address,
        value: BigInt(100000000),
        })} >
            Transaction
    </button>;
}   
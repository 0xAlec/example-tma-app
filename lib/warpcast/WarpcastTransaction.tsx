

import { useSendTransaction } from "wagmi";
import { useAccount } from "wagmi";

export default function WarpcastTransaction() {
    const { address } = useAccount();
    const { sendTransaction, data, status } = useSendTransaction();

    if (status === 'pending') {
        return <div>Transaction pending...</div>
    }

    if (status === 'success') {
        return <div>Transaction hash: {data}</div>
    }

    return <button
        className="bg-blue-600 border border-blue-700 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        onClick={() => sendTransaction({
            to: address,
            value: BigInt(100000000),
        })} >
            Transaction
    </button>;
}   
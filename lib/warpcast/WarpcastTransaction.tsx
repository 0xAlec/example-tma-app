import { useSendTransaction } from "wagmi";
import { useAccount } from "wagmi";

export default function WarpcastTransaction() {
    const { address } = useAccount();
    const { sendTransaction, data, status } = useSendTransaction();

    if (status === 'pending') {
        return <div className="text-center p-4">Transaction pending...</div>
    }

    if (status === 'success') {
        return (
            <div className="p-4 break-words text-sm">
                Transaction hash: 
                <span className="block mt-1 text-blue-600">
                    {data}
                </span>
            </div>
        );
    }

    return <button
        className="w-full md:w-auto bg-blue-600 border border-blue-700 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        onClick={() => sendTransaction({
            to: address,
            value: BigInt(100000000),
        })} >
            Transaction
    </button>;
}   
import { useSendTransaction } from "wagmi";


export default function WagmiTransaction() {
    const { sendTransaction, data, status } = useSendTransaction();

    if (status === 'pending') {
        return <div>Transaction pending...</div>;
    }

    if (status === 'success') {
        return <div>Hash: {data}</div>;
    }

    return <button onClick={() => sendTransaction({
        to: '0x0000000000000000000000000000000000000000',
        value: BigInt(100000),
    })}>Transaction</button>;
}
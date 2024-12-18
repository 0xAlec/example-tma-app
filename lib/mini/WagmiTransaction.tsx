import { useSendTransaction } from "wagmi";


export default function WagmiTransaction() {
    const { sendTransaction } = useSendTransaction();

    return <button onClick={() => sendTransaction({
        to: '0x0000000000000000000000000000000000000000',
        value: BigInt(100000),
    })}>Transaction</button>;
}
import { biometry } from '@telegram-apps/sdk';
import { useEffect, useState } from 'react';
import eruda from 'eruda';

const console = eruda.get('console')

export default function TelegramBiometry() {
    const [biometryMounted, setBiometryMounted] = useState(false);

    useEffect(() => {

        const mountBiometry = async () => {

            if (!biometry.isSupported()) {
                console.log('Biometry is not supported');
                return;
            }

            if (biometry.isAvailable()) {
                await biometry.mount();
                setBiometryMounted(true);
            }
        }

        if (!biometryMounted) {
            mountBiometry();
        }
    }, [biometryMounted]);

    if (!biometryMounted) {
        return <>Biometry mounting...</>
    }

    return <button onClick={async () => {
        if (biometry.requestAccess.isAvailable()) {
            const granted = await biometry.requestAccess(); // boolean
            console.log(granted);
        }
    }}>Biometry</button>
}
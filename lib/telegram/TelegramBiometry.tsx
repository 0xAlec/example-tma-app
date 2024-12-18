import { biometry } from '@telegram-apps/sdk';
import { useEffect, useState } from 'react';
import eruda from 'eruda';

const console = eruda.get('console')

export default function TelegramBiometry() {
    const [biometryMounted, setBiometryMounted] = useState(false);

    useEffect(() => {

        const mountBiometry = async () => {

            console.log('Is biometry supported?', biometry.isSupported());

            if (!biometry.isSupported()) {
                console.log('Biometry is not supported');
                return;
            }

            if (biometry.mount.isAvailable()) {
                console.log('Mounting biometry');
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
import { biometry } from '@telegram-apps/sdk';
import { useEffect, useState } from 'react';
import eruda from 'eruda';

const console = eruda.get('console')

export default function TelegramBiometry() {
    const [biometryMounted, setBiometryMounted] = useState(false);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const mountBiometry = async () => {
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

    if (!authorized) {
        return <button onClick={async () => {
            const granted = await biometry.requestAccess();
            setAuthorized(granted);
            if (granted) {
                await biometry.updateToken({
                    reason: 'Store this token!',
                    token: '1234567890',
                })
            }
        }}>Authorize App</button>
    }

    return <button onClick={async () => {
        if (!biometry.authenticate.isAvailable()) {
            console.log('Biometry authentication is not available');
            return;
        }

        const { status, token } = await biometry.authenticate({
            reason: 'Sign this transaction!',
        });

        if (status === 'authorized') {
            console.log(`Authorized. Token: ${token}`);
          } else {
            console.log('Not authorized');
        }   
    }}>Authenticate</button>
}
import { MiniSDK } from '@lib/shared/sdk';
import { useEffect, useState } from 'react';
import type { User } from '@telegram-apps/sdk';

const mini = new MiniSDK();

export default function User() {
    const [user, setUser] = useState<User | undefined>();
    const [platform, setPlatform] = useState<string | undefined>();

    useEffect(() => {
        const user = mini.GetUserFromContext();
        const platform = mini.GetPlatform();
        setUser(user);
        setPlatform(platform);
    }, []);

    return <div>
        <p>{user ? user.username : 'No user found'}</p>
        <p>{platform}</p>
    </div>
}
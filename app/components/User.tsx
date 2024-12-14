import { useMiniContext } from '@lib/shared/MiniProvider';

export default function User() {
    const { user, platform } = useMiniContext();
    
    return <div>
        <pre>
            {JSON.stringify(
                {
                    user: user || null,
                    platform: platform
                },
                null,
                2
            )}
        </pre>
    </div>
}
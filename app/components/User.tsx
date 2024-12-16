import { useMiniContext } from '@lib/shared/MiniProvider';

export default function User() {
    const { user, platform } = useMiniContext();
    
    return (
        <div className="w-full max-w-screen-lg mx-auto p-4 sm:p-6">
            <pre className="rounded-lg p-4 overflow-x-auto text-sm sm:text-base whitespace-pre-wrap break-words">
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
    );
}
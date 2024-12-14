import { useMiniContext } from '@lib/shared/MiniProvider';

export default function User() {
    const { user, platform } = useMiniContext();
    
    return <div>
        <p>{user ? user.username : 'No user found'}</p>
        <p>{platform}</p>
    </div>
}
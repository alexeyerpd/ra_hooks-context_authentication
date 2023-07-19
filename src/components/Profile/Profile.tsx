import {UserDto} from 'containers/App/App';
import {cn} from 'utils/classname';

import './Profile.scss';

const block = cn('profile');

interface ProfileProps {
    data?: UserDto;
    logOut: () => void;
}

export function Profile({data, logOut}: ProfileProps) {
    if (!data) {
        return null;
    }

    const {avatar, name} = data;
    return (
        <div className={block()}>
            <h2 className={block('username')}>Hello, {name}</h2>
            <img className={block('img')} src={avatar} alt="avatar" />
            <button className={block('btn')} onClick={logOut}>
                Logout
            </button>
        </div>
    );
}

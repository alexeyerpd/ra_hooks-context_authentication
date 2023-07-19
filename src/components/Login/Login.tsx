import * as React from 'react';
import {cn} from 'utils/classname';

import './Login.scss';

const block = cn('login');

interface LoginProps {
    onSubmit: ({login, password}: {login: string; password: string}) => void;
}

export function Login({onSubmit}: LoginProps) {
    const [login, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!login || !password) {
            return;
        }

        onSubmit({login, password});
        setUsername('');
        setPassword('');
    };

    return (
        <form className={block()} onSubmit={handleSubmit}>
            <input
                className={block('input')}
                type="text"
                value={login}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className={block('input')}
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button className={block('btn')} type="submit">
                Login
            </button>
        </form>
    );
}

import * as React from 'react';
import {Header} from 'components/Header/Header';
import {Login} from 'components/Login/Login';
import {News} from 'components/News/News';
import {NotAuthorized} from 'components/NotAuthorized/NotAuthorized';
import {Profile} from 'components/Profile/Profile';
import {useJsonFetch} from 'ui/hooks/useJsonFetch';
import {cn} from 'utils/classname';
import {useStorageState} from 'utils/localStorage';

import '../../styles/root.scss';
import './App.scss';

const block = cn('app');

export interface UserDto {
    avatar: string;
    id: string;
    login: string;
    name: string;
}

export interface NewsDto {
    content: string;
    id: string;
    image: string;
    title: string;
}

export function App() {
    const [token, setToken] = useStorageState('token', '');
    const [profile, setProfile] = useStorageState<UserDto | undefined>('profile', undefined);
    const [news, setNews] = React.useState<NewsDto[]>([]);

    const {data, error, update} = useJsonFetch<UserDto | undefined>('http://localhost:7070/private/me', {
        headers: token ? {Authorization: `Bearer ${token}`} : {},
    });

    const goAuth = async (body: {login: string; password: string}) => {
        try {
            const response = await fetch('http://localhost:7070/auth', {
                method: 'POST',
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                throw new Error('Error');
            }
            const responseData = await response.json();
            setToken(responseData.token);
            update();
        } catch (e) {
            console.log(e);
        }
    };

    const getNews = async () => {
        try {
            const response = await fetch('http://localhost:7070/private/news', {
                headers: token ? {Authorization: `Bearer ${token}`} : {},
            });
            if (!response.ok) {
                throw new Error('Error');
            }
            const responseData = await response.json();
            setNews(responseData);
        } catch (e) {
            console.log(e);
        }
    };

    const logOut = () => {
        setToken('');
        setProfile(undefined);
        setNews([]);
        update();
    };

    const isAuthorized = checkIsAuthorized(error);

    React.useEffect(() => {
        if (!checkIsAuthorized(error) && token) {
            setToken('');
            setProfile(undefined);
        }
        if (data) {
            setProfile(data);
        }
    }, [data, error]);

    React.useEffect(() => {
        if (!token) {
            return;
        }
        getNews();
    }, [token]);

    return (
        <div className={block()}>
            <Header>
                {isAuthorized ? (
                    <Profile data={profile} logOut={logOut} />
                ) : (
                    <Login onSubmit={(body) => goAuth(body)} />
                )}
            </Header>
            <div className={block('content')}>{isAuthorized ? <News items={news} /> : <NotAuthorized />}</div>
        </div>
    );
}

function checkIsAuthorized(error: string) {
    if (!error) {
        return true;
    }
    return error !== 'Unauthorized';
}

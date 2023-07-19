import {cn} from 'utils/classname';
import {ChildrenProps} from 'utils/types';

import './Header.scss';

const block = cn('header');

interface HeaderProps extends ChildrenProps {}

export function Header(props: HeaderProps) {
    return (
        <header className={block()}>
            <h1 className={block('head')}>Neto Social</h1>
            {props.children}
        </header>
    );
}

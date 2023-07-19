import {cn} from 'utils/classname';

import './NotAuthorized.scss';

const block = cn('notauthorized');

export function NotAuthorized() {
    return (
        <div className={block()}>
            <h2 className={block('title')}>Neto Social</h2>
            <p className={block('text')}>Facebook and VK killer.</p>
        </div>
    );
}

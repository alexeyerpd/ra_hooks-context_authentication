import {NewsDto} from 'containers/App/App';
import {cn} from 'utils/classname';

import './News.scss';

const block = cn('news');

interface NewsProps {
    items: NewsDto[];
}

export function News({items}: NewsProps) {
    return (
        <div className={block()}>
            {items.map((item) => (
                <NewsItem key={item.id} data={item} />
            ))}
        </div>
    );
}

interface NewsItemProps {
    data: NewsDto;
}
function NewsItem({data: {content, image, title}}: NewsItemProps) {
    return (
        <div className={block('item')}>
            <img className={block('image')} src={image} alt="image" />
            <div className={block('block')}>
                <h2 className={block('title')}>{title}</h2>
                <p className={block('content')}>{content}</p>
            </div>
        </div>
    );
}

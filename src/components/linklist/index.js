import React from 'react';
import Link from '../link';

export default function LinkList({ items }) {
    return items && items.map(
        (item, i) => (
            <Link
                item={item}
                key={`list-item-link-${i}-${Math.random()*10000}`}
            />
        )
    );
}
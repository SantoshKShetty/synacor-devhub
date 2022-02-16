import React from 'react';
import { generateComponent } from '../../utils/component';

function List({ containerTag: ContainerTag, baseKey, items, ...props }) {
    return items && (
        <ContainerTag {...props}>
            {items.map((item, i) => {
                const key = `${baseKey}-${i}`;
                return <li key={key}>{generateComponent({ ...item, key })}</li>
            })}
        </ContainerTag>
    )
}

export function OrderedList({ baseKey, items }) {
    return <List containerTag="ol" baseKey={baseKey} items={items} />
}

export function UnOrderedList({ baseKey, items, listStyle: { type: listStyleType } = {} }) {
    return <List containerTag="ul" baseKey={baseKey} items={items} style={{ listStyleType }} />
}
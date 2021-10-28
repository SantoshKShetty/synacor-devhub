import React from 'react';
import { generateComponent } from '../../utils/component';

export default function List({ baseKey, items }) {
    return items && (
        <ul>
            {items.map((item, i) => {
                const key = `${baseKey}-${i}`;
                return <li key={key}>{generateComponent({ ...item, key })}</li>
            })}
        </ul>
    );
}
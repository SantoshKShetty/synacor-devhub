import React from 'react';
import { getImageResource } from '../../utils/resource-path';

export default function Image({ src, ...props }) {
    return src && <img src={getImageResource(src)} { ...props } />;
}
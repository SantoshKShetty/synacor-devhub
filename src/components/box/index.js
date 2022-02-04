import React from 'react';
import ReactBox from '@material-ui/core/Box';

export const HORIZONTAL = 'row';
export const VERTICAL = 'column';

export default function Box({ display = 'flex', direction = VERTICAL, className, ...props }) {
    return (
        <ReactBox {...props} display={display} flexDirection={direction} className={className} />
    );
};
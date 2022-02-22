import React from 'react';
import ReactBox from '@material-ui/core/Box';

// Constants defining the layout's direction of children items.
export const HORIZONTAL = 'row';
export const VERTICAL = 'column';

/**
 * Returns Containerized `Div` element with children.
 * 
 * @param {String} display - Basically all values that `CSS` `display` property supports - flex / inline / block / inline-block / table etc... 
 * @param {String} type - HORIZONTAL or VERTICAL placement of childrens.
 */
export default function Box({ display = 'flex', type = VERTICAL, className, ...props }) {
    return (
        <ReactBox {...props} display={display} flexDirection={type} className={className} />
    );
};
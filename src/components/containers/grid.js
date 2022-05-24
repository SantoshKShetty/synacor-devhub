import React from 'react';
import ReactGrid from '@material-ui/core/Grid';
import { generateComponent } from '../../utils/component';

// Constants defining the Grid container types.
export const GRID_CONTAINER = 'container';
export const GRID_ITEM = 'item';

/**
 * Returns Containerized Grid Layout.
 *
 * @param {String} variant - GRID_CONTAINER or GRID_ITEM
 * @param {Numeric} spacing - Gap between Grid items.
 * @param {Array} items - Children
 */
export default function Grid({ variant = GRID_CONTAINER, spacing = 0, items, children, ...props }) {
    return (
        <ReactGrid {...props} {...{ [variant]: true, ...variant === GRID_CONTAINER && { spacing } }}>
            {items && generateComponent(items)}
            {children}
        </ReactGrid>
    );
}
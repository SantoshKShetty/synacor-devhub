import React from 'react'
import ReactMenu from '@material-ui/core/Menu';
import ReactMenuItem from '@material-ui/core/MenuItem';
import { generateComponent } from '../../utils/component';
import { isReactComponent, isObject, isArray, deepClone } from '../../utils/basics';

export default function Menu({ baseKey = 'menu', items, opensBy, position: { anchorOrigin, transformOrigin } = {}, ...props }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    let MenuOpenController = null;

    if (isReactComponent(opensBy)) {
        MenuOpenController = opensBy;
    } else if (isObject(opensBy)) {
        /**
         * Below `deep cloning` is necessary because we're modifying `Icon['icon']`.
         * Without cloning, we'll be modifying `children` by reference, resulting in unexpected results.
         */
        const { type, children, ...rest } = deepClone(opensBy);
        const Icon = children && children.find(c => c.type === 'icon');

        if (Icon && isArray(Icon['icon'])) {
            Icon['icon'] = Boolean(anchorEl) && Icon['icon'][1] || Icon['icon'][0];
        }

        MenuOpenController = generateComponent({ type, children, ...rest });
    }

    MenuOpenController = MenuOpenController && React.cloneElement(MenuOpenController, { onClick: handleOpen });

    return (
        <React.Fragment>
            {MenuOpenController}
            {items && (
                <ReactMenu
                    {...props}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={anchorOrigin}
                    transformOrigin={transformOrigin}
                    {...anchorOrigin && { getContentAnchorEl: null }}
                    >
                    {items.map((item, i) => {
                        const key = `${baseKey}-menu-item-${i}}`;

                        return (
                            <ReactMenuItem key={key} onClick={handleClose}>
                                {generateComponent({ ...item, key })}
                            </ReactMenuItem>
                        )
                    })}
                </ReactMenu>
            )}
        </React.Fragment>
    );
}
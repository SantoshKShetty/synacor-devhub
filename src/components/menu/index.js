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
         * Below `deep cloning` is necessary because we're modifying `icon.label`,
         * without which we'll be modifying `children` resulting in unexpected results.
         */
        const { type, children } = deepClone(opensBy);
        const icon = children.find(c => c.type === 'icon');

        if (icon && isArray(icon.label)) {
            icon.label = Boolean(anchorEl) && icon.label[1] || icon.label[0];
        }

        MenuOpenController = generateComponent({ type, children });
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
import React from 'react'
import ReactMenu from '@material-ui/core/Menu';
import ReactMenuItem from '@material-ui/core/MenuItem';
import { generateComponent } from '../../utils/component';
import { createMenuOpener } from './utils';
import { isReactComponent } from '../../utils/basics';

export default function Menu({
    baseKey = 'menu',
    items,
    opensBy,
    position: { anchorOrigin, transformOrigin } = {},
    ...props
}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const MenuOpenController = createMenuOpener({
        opensBy,
        isMenuOpen,
        onClick: handleOpen
    });

    return (
        <React.Fragment>
            {MenuOpenController}
            {items && (
                <ReactMenu
                    {...props}
                    anchorEl={anchorEl}
                    keepMounted
                    open={isMenuOpen}
                    onClose={handleClose}
                    anchorOrigin={anchorOrigin}
                    transformOrigin={transformOrigin}
                    {...anchorOrigin && { getContentAnchorEl: null }}
                    >
                    {items.map((item, i) => {
                        const key = `${baseKey}-menu-item-${i}}`;
                        const MenuItem = isReactComponent(item) ? item : generateComponent({ ...item, key });

                        return (
                            <ReactMenuItem key={key} onClick={handleClose}>
                                {MenuItem}
                            </ReactMenuItem>
                        )
                    })}
                </ReactMenu>
            )}
        </React.Fragment>
    );
}
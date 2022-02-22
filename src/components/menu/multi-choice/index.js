import React from 'react';
import Popover from '../../popover';
import Box, { HORIZONTAL } from '../../containers/box';
import { createMenuOpener } from '../utils';
import { generateComponent } from '../../../utils/component';
import Link from '../../link';
import { exists } from '../../../utils/basics';

export default function MultiChoiceMenu({
    baseKey = 'multi-choice-menu',
    referencedAs = `ref-${Math.random()}`,
    items,
    opensBy,
    position: { anchorOrigin, transformOrigin } = {},
    ...props
}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const [selected, setSelected] = React.useState([]);
    const [tempSelected, setTempSelected] = React.useState([]);

    const handleOpen = event => {
        setTempSelected(selected);
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleSelect = event => {
        const { target: { value, checked } = {} } = event;

        if (exists(value) && exists(checked)) {
            if (checked) {
                setTempSelected([...tempSelected, value]); // Add to temporary selection list
            } else {
                const index = tempSelected.indexOf(value);
                setTempSelected([ // Remove from temporary selection list
                    ...tempSelected.slice(0, index),
                    ...tempSelected.slice(index + 1)
                ]);
            }
        }
    }

    const handleSelectAll = () => {
        setTempSelected(items.map(({ value }) => value));
    }

    const handleClearAll = () => {
        setTempSelected([]);
    }

    const handleApplySelected = () => {
        setSelected(tempSelected);
        handleClose();
    }

    const getSelectedItemsLabel = () => items.reduce((acc, { label, value }) => {
        selected.includes(value) && acc.push(label);
        return acc;
    }, []).join(', ')

    const MenuOpenController = createMenuOpener({
        opensBy,
        isMenuOpen,
        onClick: handleOpen,
        selectedItemsLabel: getSelectedItemsLabel()
    });

    return (
        <React.Fragment>
            {MenuOpenController}
            {items && (
                <Popover
                    {...props}
                    anchorEl={anchorEl}
                    open={isMenuOpen}
                    onClose={handleClose}
                    anchorOrigin={anchorOrigin}
                    transformOrigin={transformOrigin}
                    {...anchorOrigin && { getContentAnchorEl: null }}
                    >
                    <Box p={3} style={{ minWidth: 200 }}>
                        <Box direction={HORIZONTAL} style={{ justifyContent: 'space-between' }}>
                            <Link href="#" label="Select All" onClick={handleSelectAll} />
                            <Link href="#" label="Clear All" onClick={handleClearAll} />
                        </Box>
                        <Box>
                            {items.map(({ value, ...rest }, key) => generateComponent({
                                name: `${referencedAs}-option`,
                                ...rest,
                                value,
                                key: `${baseKey}-${key}`,
                                checked: tempSelected.includes(value),
                                events: { onClick: handleSelect }
                            }))}
                        </Box>
                        <Box direction={HORIZONTAL} style={{ justifyContent: 'space-between' }}>
                            <Link href="#" label="Cancel" onClick={handleClose} />
                            <Link href="#" label="Apply" onClick={handleApplySelected} />
                        </Box>
                    </Box>
                </Popover>
            )}
        </React.Fragment>
    );
}
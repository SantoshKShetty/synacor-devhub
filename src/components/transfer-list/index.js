import React from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import dlv from 'dlv';
import Text from '../text';
import IconButton from '../button/icon-button';
import { MoreVertIcon, CloseIcon } from '../icons';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import SecondaryCTABtn from '../button/secondary-cta';
import CheckBox from '../checkbox';
import Box, { HORIZONTAL } from '../box';
import { exists } from '../../utils/basics';

export default function TransferList({ title, items, selected, defaultValue, onApply }) {
    const [open, setOpen] = React.useState(false);
    const [leftSide, setLeftSide] = React.useState([]); // For checkbox action
    const [rightSide, setRightSide] = React.useState([]); // For checkbox action
    const [chosen, setChosen] = React.useState(selected); // For bifurcation

    const handleCheckboxChange = (callback, src) => event => {
        const { target: { value, checked } = {} } = event;

        if (exists(value) && exists(checked)) {
            if (checked) {
                callback([...src, value]); // Add to temporary selection list
            } else {
                const index = src.indexOf(value);
                callback([ // Remove from temporary selection list
                    ...src.slice(0, index),
                    ...src.slice(index + 1)
                ]);
            }
        }
    }

    const LeftSideControlls = items.filter(i => !chosen.includes(i.key)).map(({ key, label}, i) => (
        <CheckBox checked={leftSide.includes(key)} key={`chkbox-left-${i}`} onClick={handleCheckboxChange(setLeftSide, leftSide)} value={key} label={label} />
    ));

    const RightSideControlls = chosen.map((l, i) => (
        <CheckBox checked={rightSide.includes(l)} key={`chkbox-left-${i}`} onClick={handleCheckboxChange(setRightSide, rightSide)} value={l} label={dlv(items.find(i => i.key === l), 'label')} />
    ));

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleApply = () => {
        handleClose();
        onApply(chosen);
    }

    const handleResetToDefault = () => {
        handleClose();
        onApply(defaultValue);
    }

    const handleLeftMove = () => {
        setChosen(chosen.filter(c => !rightSide.includes(c)));
        setRightSide([]);
    }

    const handleRightMove = () => {
        setChosen([...chosen, ...leftSide]);
        setLeftSide([]);
    }

    return (
        <React.Fragment>
            <IconButton onClick={handleOpen}>
                <MoreVertIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    <Text>{title}</Text>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Box direction={HORIZONTAL} style={{ justifyContent: 'space-between' }}>
                        <Box>{LeftSideControlls}</Box>
                        <Box>
                            <IconButton onClick={handleLeftMove} disabled={rightSide.length === 0}>
                                <ArrowBackIosIcon />
                            </IconButton>
                            <IconButton onClick={handleRightMove} disabled={leftSide.length === 0}>
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </Box>
                        <Box>{RightSideControlls}</Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <SecondaryCTABtn label="Reset to Default" onClick={handleResetToDefault} />
                    <SecondaryCTABtn label="Apply" onClick={handleApply} />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
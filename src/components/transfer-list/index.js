import React from 'react';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from '@material-ui/icons/ArrowBack';
import dlv from 'dlv';
import Text from '../text';
import IconButton from '../button/icon-button';
import { MoreVertIcon, CloseIcon } from '../icons';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import CheckBox from '../checkbox';
import Box, { HORIZONTAL } from '../containers/box';
import { exists } from '../../utils/basics';
import Grid, { GRID_CONTAINER, GRID_ITEM } from '../containers/grid';
import { makeStyles } from '../../provider/theme';
import PrimaryCTABtn from '../button/primary-cta';

const styles = makeStyles(
    () => ({
        colLabel: {
            fontSize: '14px',
            fontWeight: 400
        },
        iconBtn: {
            border: '1px solid #CCCCCC',
            borderRadius: 8,
            padding: 8,
            width: 32,
            height: 32,

            '&:hover': {
                backgroundColor: '#CEE7FF'
            },

            '&:first-child': {
                marginBottom: 8
            }
        }
    })
);

const formatLabel = label => label.split(' ').reduce((acc, str) => {
    acc.push(`${str.slice(0, 1).toUpperCase()}${str.slice(1).toLowerCase()}`);
    return acc;
}, []).join(' ');

export default function TransferList({ title, items, selected, defaultValue, onApply }) {
    const classes = styles();
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
        <CheckBox color="default" checked={leftSide.includes(key)} key={`chkbox-left-${i}`} onClick={handleCheckboxChange(setLeftSide, leftSide)} value={key} label={formatLabel(label)} />
    ));

    const RightSideControlls = chosen.map((l, i) => (
        <CheckBox color="default" checked={rightSide.includes(l)} key={`chkbox-left-${i}`} onClick={handleCheckboxChange(setRightSide, rightSide)} value={l} label={formatLabel(dlv(items.find(i => i.key === l), 'label'))} />
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
        setChosen(defaultValue);
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
            <Dialog open={open} onClose={handleClose} PaperProps={{ style: { width: '80%', maxWidth: 700 } }}>
                <DialogTitle>
                    <Box direction={HORIZONTAL} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>{title}</Text>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent dividers>
                    <Grid spacing={3} variant={GRID_CONTAINER}>
                        <Grid variant={GRID_ITEM} xs>
                            <Box mb={2}><Text className={classes.colLabel}>Available fields</Text></Box>
                            <Box>{LeftSideControlls}</Box>
                        </Grid>
                        <Grid variant={GRID_ITEM} xs={1}>
                            <Box style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <IconButton onClick={handleLeftMove} disabled={rightSide.length === 0} className={classes.iconBtn}>
                                    <ArrowBack />
                                </IconButton>
                                <IconButton onClick={handleRightMove} disabled={leftSide.length === 0} className={classes.iconBtn}>
                                    <ArrowForward />
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid variant={GRID_ITEM} xs>
                            <Box mb={2}><Text className={classes.colLabel}>Visible fields</Text></Box>
                            <Box>{RightSideControlls}</Box>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <PrimaryCTABtn onClick={handleClose} label="Cancel" style={{ width: 140 }} />
                    <PrimaryCTABtn label="Reset to Default" onClick={handleResetToDefault} style={{ width: 140 }} />
                    <PrimaryCTABtn label="Apply" onClick={handleApply} style={{ width: 140 }} />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
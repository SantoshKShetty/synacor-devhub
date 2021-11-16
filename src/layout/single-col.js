import React from 'react';
import { makeStyles } from '../provider/theme';
import Box, { HORIZONTAL } from '../components/box';
import { generateComponent } from '../utils/component';

const useStyles = makeStyles({
    singleColLayout: {
        justifyContent: 'center'
    }
});

export default function SingleColumnLayout({ logo, children }) {
    const classes = useStyles();

    return (
        <Box type={HORIZONTAL} className={classes.singleColLayout}>
            {/** Logo */ generateComponent(logo)}
            {children}
        </Box>
    );
}
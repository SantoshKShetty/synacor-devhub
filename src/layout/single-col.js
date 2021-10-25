import React from 'react';
import { makeStyles } from '../provider/theme';
import Box, { HORIZONTAL } from '../components/box';

const useStyles = makeStyles({
    singleColLayout: {
        justifyContent: 'center'
    }
});

export default function SingleColumnLayout({ children }) {
    const classes = useStyles();

    return (
        <Box type={HORIZONTAL} className={classes.singleColLayout}>
            {children}
        </Box>
    );
}
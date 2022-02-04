import React from 'react';
import { makeStyles } from '../provider/theme';
import Box from '../components/box';
import { generateComponent } from '../utils/component';

const useStyles = makeStyles({
    singleColLayout: {
        '& > div': {
            margin: '0 auto'
        }
    }
});

export default function SingleColumnLayout({ logo, children }) {
    const classes = useStyles();

    return (
        <Box className={classes.singleColLayout}>
            <Box>
                {generateComponent(logo)}
                {children}
            </Box>
        </Box>
    );
}
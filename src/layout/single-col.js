import React from 'react';
import { makeStyles } from '../provider/theme';
import Box from '../components/box';
import { generateComponent } from '../utils/component';

const useStyles = makeStyles(
    ({ spacing }) => ({
        singleColLayout: {
            padding: `${spacing(4)}px 0`,

            '@media screen and (min-height: 660px)': {
                padding: 0,
                height: '100vh',
                justifyContent: 'center'
            },

            '& > div': {
                margin: '0 auto',
                width: '80%',
                maxWidth: 300
            }
        }
    })
);

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
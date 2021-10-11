import React from 'react';
import Box, { HORIZONTAL } from '../components/box';
import { makeStyles } from '../provider/theme';

const useStyles = makeStyles(
    ({ breakpoints }) => ({
        splitColLayout: {
            [breakpoints.down('sm')]: {
                flexDirection: 'column-reverse'
            },

            '& > div': {
                boxSizing: 'border-box',

                '&:first-child': {
                    color: '#003C79',
                    backgroundColor: '#CEE7FF',

                    [breakpoints.up('md')]: {
                        height: '100vh',
                        width: '45%',
                        minWidth: 500,
                        paddingLeft: 110,
                        paddingRight: 80,
                        justifyContent: 'center'
                    }
                },

                '&:last-child': {
                    [breakpoints.up('md')]: {
                        paddingLeft: 88
                    }
                }
            }
        }
    })
);

export default function SplitColumnLayout({ children }) {
    const classes = useStyles();

    return (
        <Box type={HORIZONTAL} className={classes.splitColLayout}>
            {children}
        </Box>
    );
}
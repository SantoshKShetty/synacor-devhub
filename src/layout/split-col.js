import React from 'react';
import Box, { HORIZONTAL } from '../components/box';
import { makeStyles } from '../provider/theme';

const useStyles = makeStyles(
    ({ palette: { custom = {} }, breakpoints }) => ({
        splitColLayout: {
            [breakpoints.down('sm')]: {
                flexDirection: 'column-reverse'
            },

            '& > div': {
                boxSizing: 'border-box'
            }
        },
        leftCol: {
            color: custom.splitColLayout.leftCol.txtColor,
            backgroundColor: custom.splitColLayout.leftCol.bgColor,

            [breakpoints.up('md')]: {
                height: '100vh',
                width: '45%',
                minWidth: 500,
                paddingLeft: 110,
                paddingRight: 80,
                justifyContent: 'center'
            }
        },
        rightCol: {
            [breakpoints.up('md')]: {
                marginLeft: 88
            }
        }
    })
);

export default function SplitColumnLayout({ children }) {
    const classes = useStyles();
    const [LeftColComponent = null, RightColComponent = null] = children;

    return (
        <Box type={HORIZONTAL} className={classes.splitColLayout}>
            <Box className={classes.leftCol}>
                {LeftColComponent}
            </Box>
            <Box className={classes.rightCol}>
                {RightColComponent}
            </Box>
        </Box>
    );
}
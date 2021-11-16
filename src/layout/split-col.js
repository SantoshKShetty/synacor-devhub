import React from 'react';
import Box, { HORIZONTAL } from '../components/box';
import { makeStyles } from '../provider/theme';
import { generateComponent } from '../utils/component';

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
            color: custom.splitColLayout.leftCol.color,
            backgroundColor: custom.splitColLayout.leftCol.bgColor,

            [breakpoints.up('md')]: {
                height: '100vh',
                width: '45%',
                minWidth: 500,
                position: 'fixed',
                paddingLeft: 110,
                paddingRight: 80,
                justifyContent: 'center'
            }
        },
        rightCol: {
            [breakpoints.up('md')]: {
                padding: '120px 0',
                marginLeft: '50%',
                flexGrow: 1
            }
        }
    })
);

export default function SplitColumnLayout({ logo, children }) {
    const classes = useStyles();
    const [LeftColComponent = null, RightColComponent = null] = children;

    return (
        <Box type={HORIZONTAL} className={classes.splitColLayout}>
            <Box className={classes.leftCol}>
                {/** Logo in desktop/tablet devices */ generateComponent(logo)}
                {LeftColComponent}
            </Box>
            <Box className={classes.rightCol}>
                {/** Logo in mobile device */ generateComponent(logo)}
                {RightColComponent}
            </Box>
        </Box>
    );
}
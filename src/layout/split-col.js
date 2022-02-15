import React from 'react';
import Box, { HORIZONTAL } from '../components/box';
import { makeStyles } from '../provider/theme';
import { generateComponent } from '../utils/component';

const useStyles = makeStyles(
    ({ palette, breakpoints, spacing }) => ({
        splitColLayout: {
            [breakpoints.down('sm')]: {
                flexDirection: 'column-reverse'
            },

            '& > div': {
                boxSizing: 'border-box'
            }
        },
        leftCol: {
            color: palette.custom.splitColLayout.leftCol.color,
            backgroundColor: palette.custom.splitColLayout.leftCol.bgColor,

            [breakpoints.up('md')]: {
                height: '100vh',
                width: '42%',
                minWidth: 460,
                position: 'fixed',
                padding: `${spacing(3.75)}px ${spacing(10)}px ${spacing(3.75)}px ${spacing(13.75)}px`
            }
        },
        rightCol: {
            [breakpoints.up('md')]: {
                padding: '120px 0',
                marginLeft: '47%',
                flexGrow: 1
            }
        },
        nonMobileLogo: {
            [breakpoints.down('sm')]: {
                display: 'none'
            }
        },
        mobileLogo: {
            [breakpoints.up('md')]: {
                display: 'none'
            }
        }
    })
);

export default function SplitColumnLayout({ logo, children }) {
    const classes = useStyles();
    const [LeftColComponent = null, RightColComponent = null] = children;

    return (
        <Box direction={HORIZONTAL} className={classes.splitColLayout}>
            <Box className={classes.leftCol}>
                <Box className={classes.nonMobileLogo}>
                    {generateComponent(logo)}
                </Box>
                {LeftColComponent}
            </Box>
            <Box className={classes.rightCol}>
                <Box className={classes.mobileLogo}>
                    {generateComponent(logo)}
                </Box>
                {RightColComponent}
            </Box>
        </Box>
    );
}
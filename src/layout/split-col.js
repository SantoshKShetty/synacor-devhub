import React from 'react';
import Box, { HORIZONTAL } from '../components/containers/box';
import { makeStyles } from '../provider/theme';
import { generateComponent } from '../utils/component';

const useStyles = makeStyles(
    ({ palette, breakpoints, spacing }) => ({
        splitColLayout: {
            [breakpoints.down('sm')]: {
                flexDirection: 'column-reverse'
            },

            '& > div': {
                boxSizing: 'border-box',

                [breakpoints.down('sm')]: {
                    padding: '5%'
                }
            }
        },
        leftCol: {
            color: palette.custom.layout.split.leftCol.content.color,
            backgroundColor: palette.custom.layout.split.leftCol.bgColor,

            [breakpoints.up('md')]: {
                height: '100vh',
                width: '42%',
                minWidth: 460,
                position: 'fixed',
                padding: `${spacing(3.75)}px ${spacing(8.75)}px ${spacing(3.75)}px ${spacing(11.25)}px`
            },

            [breakpoints.up('lg')]: {
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
            marginBottom: spacing(4),

            [breakpoints.up('md')]: {
                display: 'none'
            }
        }
    })
);

function SplitColumnLayout({ logo, children }) {
    const classes = useStyles();
    const [ LeftCol = null, RightCol = null ] = children;

    return (
        <Box direction={HORIZONTAL} className={classes.splitColLayout}>
            <Box className={classes.leftCol}>
                <Box className={classes.nonMobileLogo}>
                    {generateComponent(logo)}
                </Box>
                {LeftCol}
            </Box>
            <Box className={classes.rightCol}>
                <Box className={classes.mobileLogo}>
                    {generateComponent(logo)}
                </Box>
                {RightCol}
            </Box>
        </Box>
    );
}

export default React.memo(SplitColumnLayout);
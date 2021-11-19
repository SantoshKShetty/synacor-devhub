import React from 'react';
import { makeStyles } from '../provider/theme';
import Box, { HORIZONTAL } from '../components/box';

const useStyles = makeStyles(
    () => ({
        headerContainer: {
            height: 56,
            justifyContent: 'center',
            borderBottom: '1px solid #D8D8D8'
        },
        bodyContainer: {
            height: 'calc(100vh - 56px)'
        },
        leftColContainer: {
            borderRight: '1px solid #D8D8D8',
            width: 240,
            overflow: 'auto'
        },
        rightColContainer: {
            overflow: 'auto',
            flexGrow: 1,
            alignItems: 'center',
            padding: '24px 0'
        }
    })
);

export default function DashboardLayout({ children }) {
    const classes = useStyles();
    const [Header = null, LeftCol = null, RightCol = null] = children;

    return (
        <React.Fragment>
            <Box className={classes.headerContainer}>
                {Header}
            </Box>
            <Box className={classes.bodyContainer} type={HORIZONTAL}>
                <Box className={classes.leftColContainer}>
                    {LeftCol}
                </Box>
                <Box className={classes.rightColContainer}>
                    {RightCol}
                </Box>
            </Box>
        </React.Fragment>
    );
}
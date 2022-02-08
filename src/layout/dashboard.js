import React from 'react';
import { makeStyles } from '../provider/theme';
import Box, { HORIZONTAL } from '../components/box';

const useStyles = makeStyles(
    ({ spacing, palette }) => {
        const headerHeight = 56;
        const containerBorderColor = palette.custom.dashboardLayout.containerBorderColor;

        return {
            headerContainer: {
                height: `${headerHeight}px`,
                justifyContent: 'center',
                borderBottom: `1px solid ${containerBorderColor}`,
                padding: `0 ${spacing(4)}px`,
                alignItems: 'center',
                justifyContent: 'space-between',
                boxSizing: 'border-box'
            },
            bodyContainer: {
                height: `calc(100vh - ${headerHeight}px)`
            },
            leftColContainer: {
                borderRight: `1px solid ${containerBorderColor}`,
                width: `${spacing(30)}px`,
                overflow: 'auto',
                padding: `${spacing(2)}px ${spacing(1)}px`
            },
            rightColContainer: {
                overflow: 'auto',
                flexGrow: 1,
                alignItems: 'center',
                padding: `${spacing(3)}px`
            }
        };
    }
);

export default function DashboardLayout({ children }) {
    const classes = useStyles();
    const [Header = null, LeftCol = null, RightCol = null] = children;

    return (
        <React.Fragment>
            <Box className={classes.headerContainer} direction={HORIZONTAL}>
                {Header}
            </Box>
            <Box className={classes.bodyContainer} direction={HORIZONTAL}>
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
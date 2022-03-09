import React from 'react';
import { makeStyles } from '../provider/theme';
import Box, { HORIZONTAL } from '../components/containers/box';
import { generateComponent } from '../utils/component';

const useStyles = makeStyles(
    ({ spacing, palette }) => {
        const headerHeight = 56;
        const borderColor = palette.custom.layout.dashboard.borderColor;

        return {
            headerContainer: {
                height: `${headerHeight}px`,
                justifyContent: 'center',
                borderBottom: `1px solid ${borderColor}`,
                padding: `0 ${spacing(4)}px`,
                alignItems: 'center',
                justifyContent: 'space-between',
                boxSizing: 'border-box'
            },
            bodyContainer: {
                height: `calc(100vh - ${headerHeight}px)`
            },
            leftColContainer: {
                borderRight: `1px solid ${borderColor}`,
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

function DashboardLayout({ logo, header, leftCol, children }) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Box className={classes.headerContainer} direction={HORIZONTAL}>
                {logo && generateComponent(logo)}
                {header && generateComponent(header)}
            </Box>
            <Box className={classes.bodyContainer} direction={HORIZONTAL}>
                <Box className={classes.leftColContainer}>
                    {generateComponent(leftCol)}
                </Box>
                <Box className={classes.rightColContainer}>
                    {children}
                </Box>
            </Box>
        </React.Fragment>
    );
}

export default React.memo(DashboardLayout);
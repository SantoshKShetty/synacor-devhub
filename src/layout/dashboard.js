import React from 'react';
import { makeStyles } from '../provider/theme';
import Box from '../components/box';

const useStyles = makeStyles(
    () => ({
        header: {
            height: 56,
            justifyContent: 'center',
            borderBottom: '1px solid #D8D8D8'
        },
        body: {
            height: 'calc(100vh - 56px)'
        },
        leftCol: {
            borderRight: '1px solid #D8D8D8'
        },
        rightCol: {

        }
    })
);

export default function DashboardLayout({ genericInfo, children }) {
    const classes = useStyles();
    const [Header = null, LeftCol = null, RightCol = null] = children;

    return (
        <React.Fragment>
            <Box className={classes.header}>
                {React.cloneElement(
                    React.Children.only(Header), { ...genericInfo }
                )}
            </Box>
            <Box className={classes.body}>
                <Box className={classes.leftCol}>{LeftCol}</Box>
                <Box className={classes.rightCol}>{RightCol}</Box>
            </Box>
        </React.Fragment>
    );
}
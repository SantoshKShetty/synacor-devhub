import React from 'react';
import { makeStyles } from '../../provider/theme';

const styles = makeStyles(
    ({ breakpoints }) => ({
        form: {
            [breakpoints.up('md')]: {
                width: 340
            }
        }
    })
);

export default function Form({ children, ...props }) {
    const classes = styles();

    return (
        <form {...props} className={classes.form}>
            {children}
        </form>
    )
}
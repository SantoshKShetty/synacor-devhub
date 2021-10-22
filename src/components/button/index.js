import React from 'react';
import ReactButton from '@material-ui/core/Button';
import cn from 'classnames';
import { makeStyles } from '../../provider/theme';

const styles = makeStyles(
    ({ palette, shape, spacing }) => ({
        button: {
            fontSize: '1rem',
            borderRadius: shape.borderRadius * 4,
            padding: `${spacing(1.5)}px 0`,
            boxShadow: palette.custom.button.shadow
        }
    })
);

export default function Button({ label, className, ...props }) {
    const classes = styles();

    return (
        <ReactButton {...props} className={cn(classes.button, className)}>
            {label}
        </ReactButton>
    );
}
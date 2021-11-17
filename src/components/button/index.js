import React from 'react';
import ReactButton from '@material-ui/core/Button';
import cn from 'classnames';
import { makeStyles } from '../../provider/theme';

const styles = makeStyles(
    ({ palette, shape, spacing }) => ({
        button: {
            backgroundColor: palette.custom.button.default.bgColor,
            color: palette.custom.button.default.color,
            boxShadow: palette.custom.button.default.shadow,
            border: `1px solid ${palette.custom.button.default.borderColor}`,
            fontSize: '1rem',
            borderRadius: shape.borderRadius * 2,
            padding: `${spacing(1.5)}px 0`,

            '&:hover': {
                backgroundColor: palette.custom.button.bgColorHover
            }
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
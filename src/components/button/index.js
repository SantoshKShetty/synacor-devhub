import React from 'react';
import ReactButton from '@material-ui/core/Button';
import cn from 'classnames';
import { makeStyles } from '../../provider/theme';
import { generateComponent } from '../../utils/component';
import { isReactComponent } from '../../utils/basics';
import Text from '../text';

const styles = makeStyles(
    ({ palette, shape, spacing }) => ({
        button: {
            backgroundColor: palette.custom.button.default.bgColor,
            color: palette.custom.button.default.color,
            boxShadow: palette.custom.button.default.shadow,
            border: `1px solid ${palette.custom.button.default.borderColor}`,
            fontSize: '1rem',
            borderRadius: shape.borderRadius * 2,
            padding: `${spacing(1.5)}px`,
            textTransform: 'none',

            '&:hover': {
                backgroundColor: palette.custom.button.bgColorHover
            }
        },
        labelTxt: {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            fontWeight: 'inherit'
        }
    })
);

export default function Button({ label, className, startIcon, endIcon, ...props }) {
    const classes = styles();
    const Icons = {
        ...startIcon && {
            startIcon: isReactComponent(startIcon) ? startIcon : generateComponent(startIcon)
        },
        ...endIcon && {
            endIcon: isReactComponent(endIcon) ? endIcon : generateComponent(endIcon)
        }
    };

    return (
        <ReactButton {...props} className={cn(classes.button, className)} {...Icons}>
            <Text className={classes.labelTxt}>{label}</Text>
        </ReactButton>
    );
}
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
            height: 40,
            padding: `${spacing(1)}px ${spacing(1.5)}px`,
            backgroundColor: palette.custom.button.default.bgColor,
            border: `1px solid ${palette.custom.button.default.borderColor}`,
            borderRadius: shape.borderRadius * 2,
            textTransform: 'none',

            '&:hover': {
                backgroundColor: palette.custom.button.bgColorHover
            }
        },
        labelTxt: {
            fontSize: '0.825rem',
            fontWeight: 400,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
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
import React from 'react';
import cn from 'classnames';
import Button from '../';
import { makeStyles } from '../../../provider/theme';

const styles = makeStyles(
    ({ palette, spacing }) => ({
        socialSignBtn: {
            backgroundColor: palette.custom.button.socialSign.bgColor,
            color: palette.custom.button.socialSign.color,
            boxShadow: palette.custom.button.socialSign.shadow,
            border: 'none',
            textTransform: 'uppercase',
            justifyContent: 'start',
            paddingLeft: spacing(3),

            '&:hover': {
                backgroundColor: palette.custom.button.socialSign.bgColorHover
            }
        }
    })
)

export default function SocialSigningBtn({ className, ...props }) {
    const classes = styles();

    return <Button {...props} className={cn(classes.socialSignBtn, className)} />
}
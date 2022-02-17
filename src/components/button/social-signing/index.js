import React from 'react';
import cn from 'classnames';
import Button from '../';
import { makeStyles } from '../../../provider/theme';

const styles = makeStyles(
    ({ palette, spacing }) => ({
        socialSignBtn: {
            backgroundColor: palette.custom.button.socialSign.bgColor,
            color: palette.text.secondary,
            boxShadow: palette.custom.button.socialSign.shadow,
            border: 'none',
            textTransform: 'uppercase',
            justifyContent: 'start',
            paddingLeft: spacing(3),
            maxWidth: 320,
            height: 44,

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
import React from 'react';
import cn from 'classnames';
import Button from '../';
import { makeStyles } from '../../../provider/theme';

const styles = makeStyles(
    ({ palette, spacing }) => ({
        socialSignBtn: {
            color: palette.custom.button.socialSign.color,
            justifyContent: 'start',
            paddingLeft: spacing(3)
        }
    })
)

export default function SocialSigningBtn({ className, ...props }) {
    const classes = styles();

    return <Button {...props} className={cn(classes.socialSignBtn, className)} />
}
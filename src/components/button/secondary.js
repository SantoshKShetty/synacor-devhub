import React from 'react';
import Button from '.';
import { makeStyles } from '../../provider/theme';

const styles = makeStyles(
    ({ palette, spacing, typography }) => ({
        secondaryBtn: {
            width: 'fit-content',
            height: 40,
            padding: `0 ${spacing(4)}px`,
            fontWeight: typography.fontWeightBold,
            color: palette.text.secondary,
            borderColor: palette.custom.button.secondaryBtn.borderColor,
            backgroundColor: palette.custom.button.secondaryBtn.bgColor,

            '&:hover': {
                backgroundColor: palette.custom.button.secondaryBtn.bgColorHover
            }
        }
    })
)

export default function SecondaryBtn(props) {
    const classes = styles();
    return <Button {...props} className={classes.secondaryBtn} />
}
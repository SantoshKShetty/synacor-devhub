import React from 'react';
import Button from '.';
import { makeStyles } from '../../provider/theme';

const styles = makeStyles(
    ({ palette }) => ({
        secondaryBtn: {
            backgroundColor: palette.custom.button.secondaryBtn.bgColor,
            color: palette.text.secondary,
            border: `1px solid ${palette.custom.button.secondaryBtn.borderColor}`,

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
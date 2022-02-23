import React from 'react';
import Button from '..';
import { makeStyles } from '../../../provider/theme';

const styles = makeStyles(
    ({ palette }) => ({
        secondaryCta: {
            backgroundColor: palette.custom.button.secondaryCTA.bgColor,
            color: palette.text.secondary,
            border: `1px solid ${palette.custom.button.secondaryCTA.borderColor}`,

            '&:hover': {
                backgroundColor: palette.custom.button.secondaryCTA.bgColorHover
            }
        }
    })
)

export default function SecondaryCTABtn(props) {
    const classes = styles();

    return <Button {...props} className={classes.secondaryCta} />
}
import React from 'react';
import Button from '../';
import { makeStyles } from '../../../provider/theme';

const styles = makeStyles(
    ({ palette }) => ({
        primaryCta: {
            backgroundColor: palette.custom.button.primaryCTA.bgColor,
            color: palette.custom.button.primaryCTA.color,
            textTransform: 'capitalize',

            '&:hover': {
                backgroundColor: palette.custom.button.primaryCTA.bgColorHover
            }
        }
    })
)

export default function PrimaryCTABtn(props) {
    const classes = styles();

    return <Button {...props} className={classes.primaryCta} />
}
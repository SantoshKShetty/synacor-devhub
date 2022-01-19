import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../';
import { makeStyles } from '../../../provider/theme';

const styles = makeStyles(
    ({ palette, spacing }) => ({
        primaryCta: {
            backgroundColor: palette.custom.button.primaryCTA.bgColor,
            color: palette.custom.button.primaryCTA.color,
            border: 'none',
            textTransform: 'capitalize',
            maxWidth: 'max-content',
            padding: `${spacing(0.625)}px ${spacing(6)}px`,

            '&:hover': {
                backgroundColor: palette.custom.button.primaryCTA.bgColorHover
            }
        }
    })
)

export default function PrimaryCTABtn({ routeTo, ...props }) {
    const classes = styles();

    // Temporary logic to move from flow to flow.
    const history = useHistory();
    const handleClick = () => history.push(routeTo);

    return <Button {...props} className={classes.primaryCta} {...routeTo && { onClick: handleClick }} />
}
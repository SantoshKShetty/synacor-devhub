import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../';
import { makeStyles } from '../../../provider/theme';

const styles = makeStyles(
    ({ palette }) => ({
        primaryCta: {
            backgroundColor: palette.custom.button.primaryCTA.bgColor,
            width: '190px',
            height: '32px',
            maxWidth: 'revert',

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
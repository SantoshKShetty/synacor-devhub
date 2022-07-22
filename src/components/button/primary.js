import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '.';
import { makeStyles } from '../../provider/theme';

const styles = makeStyles(
    ({ palette, spacing, typography }) => ({
        primaryBtn: {
            width: 'fit-content',
            height: 40,
            padding: `0 ${spacing(4)}px`,
            fontWeight: typography.fontWeightBold,
            color: palette.custom.button.primaryBtn.color,
            borderColor: palette.custom.button.primaryBtn.borderColor,
            backgroundImage: palette.custom.button.primaryBtn.bgImage,
        }
    })
)

export default function PrimaryBtn({ routeTo, onClick, ...props }) {
    const classes = styles();

    // Temporary logic to move from flow to flow.
    const history = useHistory();
    const handleClick = () => {
        onClick && onClick();
        routeTo && history.push(routeTo);
    }

    return <Button {...props} className={classes.primaryBtn} onClick={handleClick } />
}
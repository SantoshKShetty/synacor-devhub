import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '.';
import { makeStyles } from '../../provider/theme';

const styles = makeStyles(
    ({ palette }) => ({
        primaryBtn: {
            backgroundColor: palette.custom.button.primaryBtn.bgColor,
            width: '190px',
            height: '32px',

            '&:hover': {
                backgroundColor: palette.custom.button.primaryBtn.bgColorHover
            }
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
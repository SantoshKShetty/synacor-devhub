import React from 'react';
import cn from 'classnames';
import { makeStyles } from '../../provider/theme';
import Menu from '../menu';

const styles = makeStyles(
    ({ shape, spacing }) => ({
        headerMenuIcon: {
            height: 'fit-content'
        },
        headerMenuMultiIcon: {
            padding: `${spacing(0.75)}px ${spacing(0.875)}px`,
            borderRadius: shape.borderRadius * 10
        }
    })
);

export default function HeaderMenu({ opensBy, ...props }) {
    const classes = styles();
    const opener = {
        ...opensBy,
        className: cn(
            classes.headerMenuIcon,
            opensBy?.children?.length > 1 && classes.headerMenuMultiIcon
        )
    };

    return <Menu {...props} opensBy={opener} />;
}
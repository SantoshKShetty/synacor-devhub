import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ReactLink from '@material-ui/core/Link';
import cn from 'classnames';
import { isActiveLink } from '../../utils/route';
import { makeStyles } from '../../provider/theme';

const styles = makeStyles(
    ({ palette }) => ({
        link: {
            color: palette.custom.link.default.color
        }
    })
);

const ACTIVE_LINK_CLASSNAME = 'activeLink';

export default function Link({ href, label, className, ...props }) {
    const classes = styles();
    const routerLinkProps = href && !/^https?:/.test(href) && {
        to: href,
        component: RouterLink
    } || {};

	return (
        <ReactLink
            {...props}
            {...routerLinkProps}
            className={cn(classes.link, className, isActiveLink(href) && ACTIVE_LINK_CLASSNAME)}
        >
            {label}
        </ReactLink>
	);
}
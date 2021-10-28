import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ReactLink from '@material-ui/core/Link';

export default function Link({ href, label }) {
    const routerLinkProps = href && !/^https?:/.test(href) && {
        to: href,
        component: RouterLink
    } || {};

	return (
        <ReactLink {...routerLinkProps}>
            {label}
        </ReactLink>
	);
}
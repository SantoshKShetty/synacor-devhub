import React from 'react';
import ReactTypography from "@material-ui/core/Typography";

export default function Text({ variant = 'body1', children, ...props }) {
    return (
        <ReactTypography {...props} variant={variant}>
            {children}
        </ReactTypography>
    );
}
import React from 'react';
import ReactButton from '@material-ui/core/Button';

export default function Button({ label, ...props }) {
    return (
        <ReactButton {...props}>
            {label}
        </ReactButton>
    );
}
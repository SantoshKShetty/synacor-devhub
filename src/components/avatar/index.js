import React from 'react';
import ReactAvatar from '@material-ui/core/Avatar';
import Text from '../text';

export default function Avatar({ label, ...props }) {
    return (
        <ReactAvatar {...props}>
            {label ? <Text>{label}</Text> : null}
        </ReactAvatar>
    );
}
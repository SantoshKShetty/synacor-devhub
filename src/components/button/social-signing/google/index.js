import React from 'react';
import SocialSigningBtn from '../';
import { CheckIcon } from '../../../icons';

export default function GoogleSignBtn(props) {
    return (
        <SocialSigningBtn {...props} startIcon={<CheckIcon />} />
    );
}
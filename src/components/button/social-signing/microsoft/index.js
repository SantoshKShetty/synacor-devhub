import React from 'react';
import SocialSigningBtn from '../';
import { CheckIcon } from '../../../icons';

export default function MicrosoftSignBtn(props) {
    return (
        <SocialSigningBtn
            {...props}
            startIcon={<CheckIcon />}
        />
    );
}
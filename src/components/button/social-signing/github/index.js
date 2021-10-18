import React from 'react';
import SocialSigningBtn from '../';
import { CheckIcon } from '../../../icons';

export default function GithubSignBtn(props) {
    return (
        <SocialSigningBtn {...props} startIcon={<CheckIcon />} />
    );
}
import React from 'react';
import SocialSigningBtn from '../';
import { GitHubIcon } from '../../../icons';

export default function GithubSignBtn(props) {
    return (
        <SocialSigningBtn
            {...props}
            startIcon={<GitHubIcon style={{ fontSize: 24 }} />}
        />
    );
}
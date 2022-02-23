import React from 'react';
import SocialSigningBtn from '../';
import { GitHubIcon } from '../../../icons';
import { makeStyles } from '../../../../provider/theme';

const styles = makeStyles(
    ({ palette }) => ({
        icon: {
            color: palette.text.primary
        }
    })
)

export default function GithubSignBtn(props) {
    const classes = styles();

    return (
        <SocialSigningBtn
            {...props}
            startIcon={<GitHubIcon className={classes.icon} style={{ fontSize: 24 }} />}
        />
    );
}
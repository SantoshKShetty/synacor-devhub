import React from 'react';
import cn from 'classnames';
import Button from '.';
import { makeStyles } from '../../provider/theme';
import { GitHubIcon } from '../icons';
import { isReactComponent } from '../../utils/basics';

const styles = makeStyles(
    ({ palette, spacing }) => ({
        socialSigningBtn: {
            backgroundColor: palette.custom.button.socialSigningBtn.bgColor,
            color: palette.text.secondary,
            boxShadow: palette.custom.button.socialSigningBtn.shadow,
            border: 'none',
            textTransform: 'uppercase',
            justifyContent: 'start',
            paddingLeft: spacing(3),
            maxWidth: 320,
            height: 44,

            '&:hover': {
                backgroundColor: palette.custom.button.socialSigningBtn.bgColorHover
            }
        },
        btnIcon: {
            color: palette.text.primary
        }
    })
)

function SocialSigningBtn({ className, startIcon, ...props }) {
    const classes = styles();
    const StartIcon = isReactComponent(startIcon) ? React.cloneElement(React.Children.only(startIcon), { className: classes.btnIcon }) : startIcon;

    return <Button {...props} className={cn(classes.socialSigningBtn, className)} startIcon={StartIcon} />
}

export function GithubSigningBtn(props) {
    return (
        <SocialSigningBtn {...props} startIcon={<GitHubIcon style={{ fontSize: 24 }} />} />
    );
}

export function GoogleSigningBtn(props) {
    return (
        <SocialSigningBtn {...props} />
    );
}

export function MicrosoftSigningBtn(props) {
    return (
        <SocialSigningBtn {...props} />
    );
}
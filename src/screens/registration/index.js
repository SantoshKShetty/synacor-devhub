import React from 'react';
import SplitColumnLayout from '../../layout/split-col';
import Text from '../../components/text';
import { makeStyles } from '../../provider/theme';
import { List, ListItem, ListItemIcon, ListItemText } from '../../components/list';
import { CheckIcon } from '../../components/icons';
import BrandLogo from '../../components/brand-logo';
import Box from '../../components/box';

const leftColStyles = makeStyles({
    pageTitle: {
        fontSize: 32,
        fontWeight: 900
    }
})

const LeftCol = () => {
    const classes = leftColStyles();

    return (
        <React.Fragment>
            <BrandLogo />
            <Text className={classes.pageTitle}>
                Try our identity as a Service (IdaaS) it’s free and only takes a minute!
            </Text>
            <List dense={true}>
                {[
                    '7,000 Monthly Active Users',
                    'Email/Password Login',
                    '3 Social Login Providers',
                    'User Data Storage',
                    'Customizable Login Interfaces'
                ].map((item, key) => (
                    <ListItem key={key}>
                        <ListItemIcon><CheckIcon /></ListItemIcon>
                        <ListItemText primary={item} />
                    </ListItem>
                ))}
            </List>
            <Text>
                Trusted by fortune 500 companies and their 100+ million users
            </Text>
            <Box width={390} height={113}></Box>
        </React.Fragment>
    )
};

const RightCol = () => (
    <React.Fragment>
        <h2>Right rail</h2>
        <p>7,000 Monthly Active Users,Email/Password Login,3 Social Login Providers,User Data Storage,Customizable Login Interfaces
        Trusted by fortune 500 compa</p>
    </React.Fragment>
);

export default function RegistrationScreen() {
    return (
        <SplitScreenLayout>
            <LeftCol />
            <RightCol />
        </SplitScreenLayout>
    );
};
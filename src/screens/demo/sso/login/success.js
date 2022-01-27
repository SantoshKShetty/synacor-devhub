import React from 'react';
import Text from '../../../../components/text';
import Box, { HORIZONTAL } from '../../../../components/box';

export default function DemoSSOLoginSuccess({ logo = {}, Layout }) {
    return (
        <Layout logo={logo}>
            <Box type={HORIZONTAL} style={{ alignItems: 'center', height: '100vh' }}>
                <Text variant="h5">
                    {sessionStorage.getItem('loggedUser')} Logged in successfully
                </Text>
            </Box>
        </Layout>
    )
}
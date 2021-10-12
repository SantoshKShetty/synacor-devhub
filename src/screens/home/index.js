import React from "react";
import Box from '../../components/box';

const InfoSection = () => (
    <Box>
        <h1>This is Left column...</h1>
    </Box>
);

const FormSection = () => (
    <Box>
        <h1>This is Right column...</h1>
    </Box>
);

export default function HomeScreen({ info, Layout, descriptor }) {
    return (
        <Layout info={info}>
            <InfoSection />
            <FormSection />
        </Layout>
    );
};
import React from "react";
import Form from "../components/form";

function RegistrationScreen({ info, Layout }) {
    const { logo, screenInfo, form } = info;

    return (
        <Layout logo={logo} screenInfo={screenInfo}>
            <Form form={form} />
        </Layout>
    );
};

export default React.memo(RegistrationScreen);
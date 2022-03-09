import React from "react";
import Form from "../components/form";

function LoginScreen({ info, Layout }) {
    const { logo, form } = info;

    return (
        <Layout logo={logo}>
            <Form form={form} />
        </Layout>
    );
}

export default React.memo(LoginScreen);
import React from "react";
import Form from "../components/form";
import { useAuth } from "../provider/auth";

function LoginScreen({ info, Layout }) {
    const { logo, form } = info;
    const { signIn } = useAuth();

    return (
        <Layout logo={logo}>
            <Form form={form} onSubmit={signIn} />
        </Layout>
    );
}

export default React.memo(LoginScreen);
import React from "react";
import Form from "../components/form";
import Text from "../components/text";
import { useAuth } from "../provider/auth";

const TENANT_LOGIN_API = 'http://tenant-service01.cloudid.ci.opal.synacor.com:4080/login';

function LoginScreen({ info, Layout }) {
    const { logo, form } = info;
    const { signIn } = useAuth();
    const [error, setError] = React.useState(null);

    const handleSubmit = formData => {
        setError(null);

        const { compName, ...restData } = formData;

        fetch(`${TENANT_LOGIN_API}/${compName}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(restData)
        }).then(res => {
            if (!res.ok) return Promise.reject({ message: res.statusText });
            return res.json();
        }).then(data => {
            sessionStorage.setItem('ORG', compName); // Need to remove this later.
            signIn(data);
        }).catch(e => {
            setError(e.message)
        });
    }

    return (
        <Layout logo={logo}>
            <Form form={form} onSubmit={handleSubmit} />
            {error && <Text color="error" variant="caption">{error}</Text>}
        </Layout>
    );
}

export default React.memo(LoginScreen);
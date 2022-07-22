import React from "react";
import Text from "../components/text";
import { CALLBACK_TYPES, ELEM_REF_ATTR } from "../constants/events-registry";
import useEventsRegistry from "../hooks/events-registry";
import { useAuth } from "../provider/auth";
import { generateComponent } from "../utils/component";

const TENANT_LOGIN_API = 'http://tenant-service01.cloudid.ci.opal.synacor.com:4080/login';

function LoginScreen({ genericInfo, screenInfo, Layout }) {
    const { logo } = genericInfo;
    const [error, setError] = React.useState(null);

    const { registerEvents } = useEventsRegistry();

    const { signIn } = useAuth();

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

    const eventsToRegister = [
        {
            [ELEM_REF_ATTR.ID]: 'LOGIN_FORM',
            events: {
                onSubmit: [CALLBACK_TYPES.DEFAULT_RETURN, handleSubmit]
            }
        }
    ];

    registerEvents(eventsToRegister)

    return (
        <Layout logo={logo}>
            {generateComponent(screenInfo)}
            {error && <Text color="error" variant="caption">{error}</Text>}
        </Layout>
    );
}

export default React.memo(LoginScreen);
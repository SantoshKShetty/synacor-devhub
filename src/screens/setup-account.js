import React from "react";
import { useHistory, useLocation } from 'react-router-dom';
import Form from "../components/form";
import Text from "../components/text";
import { exists } from "../utils/basics";

const TENANT_REGISTER_API = 'http://tenant-service01.cloudid.ci.opal.synacor.com:4080/tenants';

function SetupAccountScreen({ info, Layout }) {
    const { logo, screenInfo, form } = info;
    const location = useLocation();
    const history = useHistory();
    const [error, setError] = React.useState(null);

    const handleSubmit = formData => {
        const prevFormData = location?.state || {};
        const { compName, ...restData } = { ...prevFormData, ...formData };

        setError(null);

        fetch(`${TENANT_REGISTER_API}/${compName}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(restData)
        }).then(res => {
            if (!res.ok) return Promise.reject({ message: res.statusText });
            history.push('/register/success');
        }).catch(e => {
            setError(e.message)
        })
    }

    return (
        <Layout logo={logo} screenInfo={screenInfo}>
            <Form form={form} onSubmit={handleSubmit} />
            {error && <Text color="error" variant="caption">{error}</Text>}
        </Layout>
    );
};

export default React.memo(SetupAccountScreen);
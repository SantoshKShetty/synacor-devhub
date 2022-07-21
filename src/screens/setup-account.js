import React from "react";
import { useHistory, useLocation } from 'react-router-dom';
import Text from "../components/text";
import { CALLBACK_TYPES, ELEM_REF_ATTR } from "../constants/events-registry";
import useEventsRegistry from "../hooks/events-registry";
import { isArray, isObject } from "../utils/basics";
import { generateComponent } from "../utils/component";

const TENANT_REGISTER_API = 'http://tenant-service01.cloudid.ci.opal.synacor.com:4080/tenants';

function SetupAccountScreen({ genericInfo, screenInfo, Layout }) {
    const { logo } = genericInfo;
    const [ leftCol, rightCol ] = isObject(screenInfo) ? [screenInfo] : isArray(screenInfo) ? screenInfo : [];
    const [error, setError] = React.useState(null);

    const { registerEvents } = useEventsRegistry();

    const location = useLocation();
    const history = useHistory();

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

    const eventsToRegister = [
        {
            [ELEM_REF_ATTR.ID]: 'SETUP_ACC_FORM',
            events: {
                onSubmit: [CALLBACK_TYPES.DEFAULT_RETURN, handleSubmit]
            }
        }
    ];

    registerEvents(eventsToRegister)

    return (
        <Layout logo={logo}>
            {generateComponent(leftCol)}
            <React.Fragment>
                {generateComponent(rightCol)}
                {error && <Text color="error" variant="caption">{error}</Text>}
            </React.Fragment>
        </Layout>
    );
};

export default React.memo(SetupAccountScreen);
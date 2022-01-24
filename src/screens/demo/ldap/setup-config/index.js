import React from 'react';
import Form from '../../../../components/form';
import { generateComponent, composeComponents } from '../../../../utils/component';
import Box, { HORIZONTAL } from '../../../../components/box';
import PrimaryCTABtn from '../../../../components/button/primary-cta';
import SecondaryCTABtn from '../../../../components/button/secondary-cta';

const InfoSection = ({ screenInfo = [] }) => screenInfo.map(
    (data, i) => generateComponent({
        ...data,
        key: `intro-sec-component-${i}`
    })
);

const FormSection = ({ form: { controls } }) => {
    const [states, setStates] = React.useState({});
    const [status, setStatus] = React.useState({ code: null, msg: null });
    const ldapConnectorUrl = 'http://ldap-agent01.cloudid.ci.opal.synacor.com:9090';

    const handleChange = fieldName => event => {
        const val = event.target.value;

        fieldName && states[fieldName] !== val && setStates({
            ...states,
            [fieldName]: val
        });
    }

    const setSessionData = obj => {
        Object.entries(obj).map(([key, val]) => {
            sessionStorage.setItem(key, val);
        })
    }

    const clearSessionData = keys => {
        keys.map(k => {
            sessionStorage.removeItem(k)
        });
    }

    const testConnection = () => {
        setStatus({ code: null, msg: null });

        fetch(`${ldapConnectorUrl}/ldap/testLdapConnection`, {
            method: 'POST',
            body: JSON.stringify(states),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            return res.json();
        }).then(({ code, msg }) => {
            setStatus({ code, msg });
        }).catch(e => {
            setStatus({ code: 500, msg: e });
        });
    }

    const saveConnection = () => {
        setStatus({ code: null, msg: null });
        clearSessionData(['ldapUsersApiEndpoint']);

        fetch(`${ldapConnectorUrl}/ldap/saveLdapConnection`, {
            method: 'POST',
            body: JSON.stringify(states),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            return res.json();
        }).then(({ code, msg }) => {
            setSessionData({
                ldapUsersApiEndpoint: `${ldapConnectorUrl}/ldap/users`
            });

            setStatus({ code, msg });
        }).catch(e => {
            setStatus({ code: 500, msg: e });
        });
    }

    return (
        <Form>
            {controls.map(
                (data, i) => generateComponent({
                    ...data,
                    handleChange,
                    key: `form-sec-component-${i}`
                })
            )}
            {status.msg && (
                <Box
                    {...{
                        mt: 4,
                        ...status.code && { color: status.code === 200 ? 'green' : 'red' }
                    }}
                    
                    >
                    {status.msg}
                </Box>
            )}
            <Box type={HORIZONTAL} {...{ mt: 4, justifyContent: 'space-between' }}>
                <SecondaryCTABtn label="Test" onClick={testConnection} />
                <PrimaryCTABtn label="Save" onClick={saveConnection} />
            </Box>
        </Form>
    );
};

export default function DemoSetConfig({ info, Layout }) {
    const { logo, screenInfo, form } = info;

    return composeComponents(
        Layout && [Layout, { logo }]
    )(
        <React.Fragment>
            <InfoSection screenInfo={screenInfo} />
            <FormSection form={form} />
        </React.Fragment>
    );
};
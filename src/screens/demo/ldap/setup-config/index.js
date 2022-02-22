import React from 'react';
import Form from '../../../../components/form';
import { generateComponent } from '../../../../utils/component';
import Box, { HORIZONTAL } from '../../../../components/containers/box';
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

    const testConnection = () => {
        fetch(`${ldapConnectorUrl}/ldap/testLdapConnection`, {
            method: 'POST',
            body: JSON.stringify(states),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (!res.ok) {
                throw Error(res.statusText);
            }
            return res.json();
        }).then(data => {
            console.log(data)
        }).catch(e => {
            console.log(e)
        });
    }

    const saveConnection = () => {
        fetch(`${ldapConnectorUrl}/ldap/saveLdapConnection`, {
            method: 'POST',
            body: JSON.stringify(states),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (!res.ok) {
                throw Error(res.statusText);
            }
            return res.json();
        }).then(data => {
            console.log(data)
        }).catch(e => {
            console.log(e)
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

    return (
        <Layout logo={logo}>
            <InfoSection screenInfo={screenInfo} />
            <FormSection form={form} />
        </Layout>
    );
};
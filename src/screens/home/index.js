import React from "react";
import { useHistory } from 'react-router-dom';
import { generateComponent } from "../../utils/component";
import Box from "../../components/box";
import Form from "../../components/form";
import PrimaryCTABtn from "../../components/button/primary-cta";

const InfoSection = ({ screenInfo = [] }) => screenInfo.map(
    (data, i) => generateComponent({
        ...data,
        key: `intro-sec-component-${i}`
    })
);

const FormSection = ({ form: { controls } }) => {
    const [states, setStates] = React.useState({});
    const [status, setStatus] = React.useState({ code: null, msg: null });
    const cometDConnectorUrl = 'http://cometd-service01.cloudid.ci.opal.synacor.com:5090';
    const history = useHistory();

    const handleChange = fieldName => event => {
        const val = event.target.value;

        fieldName && states[fieldName] !== val && setStates({
            ...states,
            [fieldName]: val
        });
    }

    const handleLogin = () => {
        setStatus({ code: null, msg: null });

        fetch(`${cometDConnectorUrl}/ldap/auth`, {
            method: 'POST',
            body: JSON.stringify(states),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (!res.ok) {
                return Promise.reject({ message: res.statusText });
            }
            history.push('/dashboard');
        }).catch(e => {
            setStatus({ code: 500, msg: e.message })
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
            <Box>
                <PrimaryCTABtn label="Save" onClick={handleLogin} />
            </Box>
        </Form>
    );
};

export default function HomeScreen({ info, Layout }) {
    const { logo, screenInfo, form } = info;

    return (
        <Layout logo={logo}>
            <InfoSection screenInfo={screenInfo} />
            <FormSection form={form} />
        </Layout>
    );
};
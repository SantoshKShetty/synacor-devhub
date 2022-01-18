import React from 'react';
import Form from '../../../../components/form';
import PrimaryCTABtn from '../../../../components/button/primary-cta';
import Box from '../../../../components/box';
import { generateComponent } from '../../../../utils/component';

const InfoSection = ({ screenInfo = [] }) => screenInfo.map(
    (data, i) => generateComponent({
        ...data,
        key: `intro-sec-component-${i}`
    })
);

const FormSection = ({ form: { controls } }) => {
    const [states, setStates] = React.useState({});

    const handleChange = fieldName => event => {
        const val = event.target.value;

        fieldName && states[fieldName] !== val && setStates({
            ...states,
            [fieldName]: val
        });
    }

    const handleLogin = () => {
        console.log(states)
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
            <Box>
                <PrimaryCTABtn label="Login" onClick={handleLogin} />
            </Box>
        </Form>
    );
};

export default function DemoSSOLogin({ info, Layout }) {
    const { logo, screenInfo, form } = info;

    return (
        <Layout logo={logo}>
            <InfoSection screenInfo={screenInfo} />
            <FormSection form={form} />
        </Layout>
    );
};
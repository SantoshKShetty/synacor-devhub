import React from "react";
import { generateComponent } from "../../utils/component";
import Form from "../../components/form";

const InfoSection = ({ screenInfo = [] }) => generateComponent(screenInfo, {
    keyPrefix: 'intro-sec-component'
})

const FormSection = ({ form: { controls } }) => (
    <Form>
        {generateComponent(controls, {
            keyPrefix: 'form-sec-component'
        })}
    </Form>
)

export default function LoginScreen({ info, Layout }) {
    const { logo, screenInfo, form } = info;

    return (
        <Layout logo={logo}>
            <InfoSection screenInfo={screenInfo} />
            <FormSection form={form} />
        </Layout>
    );
};
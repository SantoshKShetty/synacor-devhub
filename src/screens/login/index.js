import React from "react";
import { generateComponent } from "../../utils/component";
import Form from "../../components/form";

const InfoSection = ({ screenInfo = [] }) => screenInfo.map(
    (data, i) => generateComponent({
        ...data,
        key: `intro-sec-component-${i}`
    })
);

const FormSection = ({ form: { controls } }) => {
    return (
        <Form>
            {controls.map(
                (data, i) => generateComponent({
                    ...data,
                    key: `form-sec-component-${i}`
                })
            )}
        </Form>
    );
};

export default function LoginScreen({ info, Layout }) {
    const { logo, screenInfo, form } = info;

    return (
        <Layout logo={logo}>
            <InfoSection screenInfo={screenInfo} />
            <FormSection form={form} />
        </Layout>
    );
};
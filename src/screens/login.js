import React from "react";
import { generateComponent } from "../utils/component";
import Form from "../components/form";

const InfoSection = ({ screenInfo = [] }) => generateComponent(screenInfo)

const FormSection = ({ form: { controls } }) => (
    <Form>
        {generateComponent(controls)}
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
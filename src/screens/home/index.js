import React from "react";
import { generateComponent } from "../../utils/component";

const InfoSection = ({ screenInfo = [] }) => screenInfo.map(
    (data, i) => generateComponent({
        ...data,
        key: `intro-sec-component-${i}`
    })
);

const FormSection = ({ form: { controls } }) => controls.map(
    (data, i) => generateComponent({
        ...data,
        key: `form-sec-component-${i}`
    })
);

export default function HomeScreen({ genericInfo, Layout, descriptor }) {
    const { screenInfo, form } = descriptor;

    return (
        <Layout genericInfo={genericInfo}>
            <InfoSection screenInfo={screenInfo} />
            <FormSection form={form} />
        </Layout>
    );
};
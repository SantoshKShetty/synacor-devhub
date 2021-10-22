import React from "react";
import { generateComponent } from "../../utils/component";
import Form from "../../components/form";
import { makeStyles } from "../../provider/theme";

const InfoSection = ({ screenInfo = [] }) => screenInfo.map(
    (data, i) => generateComponent({
        ...data,
        key: `intro-sec-component-${i}`
    })
);

const styles = makeStyles(
    ({ breakpoints }) => ({
        form: {
            [breakpoints.up('md')]: {
                width: 340
            }
        }
    })
);

const FormSection = ({ form: { controls } }) => {
    const classes = styles();

    return (
        <Form className={classes.form}>
            {controls.map(
                (data, i) => generateComponent({
                    ...data,
                    key: `form-sec-component-${i}`
                })
            )}
        </Form>
    );
};

export default function HomeScreen({ genericInfo, Layout, descriptor }) {
    const { screenInfo, form } = descriptor;

    return (
        <Layout genericInfo={genericInfo}>
            <InfoSection screenInfo={screenInfo} />
            <FormSection form={form} />
        </Layout>
    );
};
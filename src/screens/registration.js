import React from "react";
import { useHistory } from 'react-router-dom';
import Form from "../components/form";

function RegistrationScreen({ info, Layout }) {
    const { logo, screenInfo, form } = info;
    const history = useHistory();

    const handleSubmit = formData => {
        history.push('/setup', formData);
    }

    return (
        <Layout logo={logo} screenInfo={screenInfo}>
            <Form form={form} onSubmit={handleSubmit} />
        </Layout>
    );
};

export default React.memo(RegistrationScreen);
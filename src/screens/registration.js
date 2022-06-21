import React from "react";
import { useHistory } from 'react-router-dom';
import { isArray, isObject } from "../utils/basics";
import { generateComponent } from "../utils/component";

function RegistrationScreen({ genericInfo, screenInfo, Layout }) {
    const { logo } = genericInfo;
    const [ leftCol, rightCol ] = isObject(screenInfo) ? [screenInfo] : isArray(screenInfo) ? screenInfo : [];

    const history = useHistory();

    const handleSubmit = formData => {
        history.push('/setup', formData);
    }

    return (
        <Layout logo={logo}>
            {generateComponent(leftCol)}
            {generateComponent(rightCol)}
        </Layout>
    );
};

export default React.memo(RegistrationScreen);
import React from "react";
import { useHistory } from 'react-router-dom';
import { CALLBACK_TYPES, ELEM_REF_ATTR } from "../constants/events-registry";
import useEventsRegistry from "../hooks/events-registry";
import { isArray, isObject } from "../utils/basics";
import { generateComponent } from "../utils/component";

function RegistrationScreen({ genericInfo, screenInfo, Layout }) {
    const { logo } = genericInfo;
    const [ leftCol, rightCol ] = isObject(screenInfo) ? [screenInfo] : isArray(screenInfo) ? screenInfo : [];

    const { registerEvents } = useEventsRegistry();

    const history = useHistory();

    const handleSubmit = formData => {
        history.push('/setup', formData);
    }

    const eventsToRegister = [
        {
            [ELEM_REF_ATTR.ID]: 'REGISTRATION_FORM',
            events: {
                onSubmit: [CALLBACK_TYPES.DEFAULT_RETURN, handleSubmit]
            }
        }
    ];

    registerEvents(eventsToRegister)

    return (
        <Layout logo={logo}>
            {generateComponent(leftCol)}
            {generateComponent(rightCol)}
        </Layout>
    );
};

export default React.memo(RegistrationScreen);
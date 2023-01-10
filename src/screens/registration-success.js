import React from "react";
import { CALLBACK_TYPES, ELEM_REF_ATTR } from "../constants/events-registry";
import useEventsRegistry from "../hooks/events-registry";
import useModal from "../hooks/modal";
import { generateComponent } from "../utils/component";
import { LoginModal } from "./registration";

function RegisterSuccess({ genericInfo, screenInfo, Layout }) {
    const { logo } = genericInfo;
    const { registerEvents } = useEventsRegistry();
    const [loginModalOpen, openModal, closeModal] = useModal();

    const handleSignInBtnClick = () => {
        openModal();
    }

    const eventsToRegister = [
        {
            [ELEM_REF_ATTR.ID]: 'SIGN_IN_BTN',
            events: {
                onClick: [CALLBACK_TYPES.DEFAULT_RETURN, handleSignInBtnClick]
            }
        }
    ];

    registerEvents(eventsToRegister)

    return (
        <Layout logo={logo}>
            {generateComponent(screenInfo)}
            {loginModalOpen && <LoginModal onClose={closeModal} />}
        </Layout>
    );
}

export default React.memo(RegisterSuccess);
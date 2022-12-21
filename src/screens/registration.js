import React from "react";
import { useHistory } from 'react-router-dom';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import PrimaryBtn from "../components/button/primary";
import Box, { HORIZONTAL } from "../components/containers/box";
import Text from "../components/text";
import TextField from "../components/textfield";
import { CALLBACK_TYPES, ELEM_REF_ATTR } from "../constants/events-registry";
import useEventsRegistry from "../hooks/events-registry";
import useModal from "../hooks/modal";
import { isArray, isObject } from "../utils/basics";
import { generateComponent } from "../utils/component";
import { removeCompNameFromSession, setCompNameToSession, useAuth } from "../provider/auth";
import { CircularProgress } from "@material-ui/core";

export function LoginModal({ onClose }) {
    const [companyName, setCompanyName] = React.useState(null);
    const [submitInProgress, setSubmitInProgress] = React.useState(false);
    const [error, setError] = React.useState(false);

    const { initialize, login } = useAuth();

    const handleCompanyName = event => {
        setCompanyName(event.target.value);
    }

    const handleTryToLogin = () => {
        setSubmitInProgress(true);
        setError(false);
        setCompNameToSession(companyName);

        initialize(companyName).catch(e => {
            console.error(e);
            setSubmitInProgress(false);
            setError(true);
            removeCompNameFromSession();
        })
    }

    return (
        <Dialog open onClose={onClose} maxWidth="xs">
            <DialogTitle>To Login...</DialogTitle>
            <DialogContent>
                <Text>Please provide your Company Name with which you've registered on CloudID</Text>
                <Box style={{padding: '10px 0 30px'}}>
                    <TextField
                        label="Company Name"
                        onChange={handleCompanyName}
                        disabled={submitInProgress}
                        {...error && {
                            error: true, helperText: 'Company not found!'
                        }} />
                </Box>
                <Box direction={HORIZONTAL} style={{ paddingBottom: 20, justifyContent: 'center'}}>
                    <PrimaryBtn label="Go" onClick={handleTryToLogin} disabled={submitInProgress} />
                    {submitInProgress && <CircularProgress style={{ marginLeft: 16 }} /> }
                </Box>  
            </DialogContent>
        </Dialog>
    )
}

function RegistrationScreen({ genericInfo, screenInfo, Layout }) {
    const { logo } = genericInfo;
    const [ leftCol, rightCol ] = isObject(screenInfo) ? [screenInfo] : isArray(screenInfo) ? screenInfo : [];
    const [loginModalOpen, openModal, closeModal] = useModal();

    const { registerEvents } = useEventsRegistry();

    const history = useHistory();

    const handleSubmit = formData => {
        history.push('/setup', formData);
    }

    const handleSignInBtnClick = () => {
        openModal();
    }

    const eventsToRegister = [
        {
            [ELEM_REF_ATTR.ID]: 'REGISTRATION_FORM',
            events: {
                onSubmit: [CALLBACK_TYPES.DEFAULT_RETURN, handleSubmit]
            }
        },
        {
            [ELEM_REF_ATTR.ID]: 'SIGN_IN_BTN',
            events: {
                onClick: [CALLBACK_TYPES.DEFAULT_RETURN, handleSignInBtnClick]
            }
        }
    ];

    registerEvents(eventsToRegister)

    return (
        <React.Fragment>
            <Layout logo={logo}>
                {generateComponent(leftCol)}
                {generateComponent(rightCol)}
            </Layout>
            {loginModalOpen && <LoginModal onClose={closeModal} />}
        </React.Fragment>
    );
};

export default React.memo(RegistrationScreen);
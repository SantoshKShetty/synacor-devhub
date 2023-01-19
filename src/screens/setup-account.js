import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { useHistory, useLocation } from 'react-router-dom';
import Text from "../components/text";
import { CALLBACK_TYPES, ELEM_REF_ATTR } from "../constants/events-registry";
import useEventsRegistry from "../hooks/events-registry";
import { isArray, isObject } from "../utils/basics";
import { generateComponent } from "../utils/component";
import Box, { HORIZONTAL } from "../components/containers/box";
import { CircularProgress } from "@material-ui/core";
import SecondaryBtn from "../components/button/secondary";
import useModal from "../hooks/modal";

const TENANT_REGISTER_API = '{{CLOUD_ID_API}}/nologin/tenants';

const LoadingFeedback = () => (
    <Backdrop open style={{ color: '#fff', zIndex: 1 }}>
        <CircularProgress color="inherit" />
    </Backdrop>
)

const MsgDialog = ({ msg, onClose }) => (
    <Dialog open onClose={onClose} maxWidth="xs">
        <DialogTitle>There was an error</DialogTitle>
        <DialogContent>
            <Box style={{padding: '10px 0 30px'}}>
                <Text color="error">{msg}</Text>
            </Box>
            <Box direction={HORIZONTAL} style={{ paddingBottom: 20, justifyContent: 'center'}}>
                <SecondaryBtn label="Close" onClick={onClose} />
            </Box>
        </DialogContent>
    </Dialog>
)

function SetupAccountScreen({ genericInfo, screenInfo, Layout }) {
    const { logo } = genericInfo;
    const [ leftCol, rightCol ] = isObject(screenInfo) ? [screenInfo] : isArray(screenInfo) ? screenInfo : [];
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [modalOpen, openModal , closeModal] = useModal();

    const { registerEvents } = useEventsRegistry();

    const location = useLocation();
    const history = useHistory();

    const handleSubmit = formData => {
        const prevFormData = location?.state || {};
        const { compName, ...restData } = { ...prevFormData, ...formData };

        setLoading(true);
        setError(null);

        fetch(`${TENANT_REGISTER_API}/${compName}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(restData)
        })
        .then(res => res.ok ? res.json() : Promise.reject({ message: res.statusText }))
        .then(res => {
            if (res.statusCode === 'CREATED') {
                history.push('/register/success');
            } else {
                return Promise.reject({ message: res.message });
            }
        }).catch(e => {
            setLoading(false);
            setError(e.message);
            openModal();
        })
    }

    const eventsToRegister = [
        {
            [ELEM_REF_ATTR.ID]: 'SETUP_ACC_FORM',
            events: {
                onSubmit: [CALLBACK_TYPES.DEFAULT_RETURN, handleSubmit]
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
            {loading ? <LoadingFeedback /> : error && modalOpen && <MsgDialog msg={error} onClose={closeModal} />}
        </React.Fragment>
    );
};

export default React.memo(SetupAccountScreen);
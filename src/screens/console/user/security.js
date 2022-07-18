import React from 'react';
import jwt_decode from "jwt-decode";
import { generateComponent } from '../../../utils/component';
import useEventsRegistry from '../../../hooks/events-registry';
import { CALLBACK_TYPES, ELEM_REF_ATTR } from '../../../constants/events-registry';
import { useAuth } from '../../../provider/auth';
import { exists } from "../../../utils/basics";

export default function UserSecurity({ screenInfo }) {
    const { getAccessToken } = useAuth();
    const { registerEvents } = useEventsRegistry();
    const [status, setStatus] = React.useState(null);

    const handleChangePwd = ({ password }) => {
        const accessToken = getAccessToken();
        const user = jwt_decode(accessToken)?.preferred_username;

        if (exists(user)) {
            fetch(
                `http://tenant-service01.cloudid.ci.opal.synacor.com:4080/orgs/${sessionStorage.getItem('ORG') || '{{ORG}}'}/keycloak/users/${user}/reset-password`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Bearer: accessToken
                    },
                    body: JSON.stringify({ password })
                }
            ).then(res => {
                if (!res.ok) return Promise.reject({ message: res.statusText });
                setStatus('Password updated successfully!')
            }).catch(e => {
                setStatus(e.message)
            })
        }
    }

    const eventsToRegister = [
        {
            [ELEM_REF_ATTR.ID]: 'UPDATE_PWD_FORM',
            events: {
                onSubmit: [CALLBACK_TYPES.DEFAULT_RETURN, handleChangePwd]
            }
        }
    ];

    registerEvents(eventsToRegister)

    if (status) alert(status)

    return screenInfo && generateComponent(screenInfo)
}
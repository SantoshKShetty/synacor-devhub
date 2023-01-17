import React from 'react';
import { generateComponent } from '../../../utils/component';
import useEventsRegistry from '../../../hooks/events-registry';
import { CALLBACK_TYPES, ELEM_REF_ATTR } from '../../../constants/events-registry';
import { getCompNameFromSession, useAuth } from '../../../provider/auth';
import { exists } from "../../../utils/basics";

export default function UserSecurity({ screenInfo }) {
    const { getAccessToken, getRefreshToken, getParsedAccessToken } = useAuth();
    const { registerEvents } = useEventsRegistry();

    const handleChangePwd = ({ password }) => {
        const user = getParsedAccessToken()?.preferred_username;

        if (exists(user)) {
            fetch(
                `{{CLOUD_ID_API}}/tenants/${getCompNameFromSession()}/users/${user}/reset-password`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        accessToken: getAccessToken(),
                        refreshToken: getRefreshToken()
                    },
                    body: JSON.stringify({ password })
                }
            ).then(res => {
                if (!res.ok) return Promise.reject({ message: res.statusText });
                alert('Password updated successfully!')
            }).catch(e => {
                alert(e.message)
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

    return screenInfo && generateComponent(screenInfo)
}
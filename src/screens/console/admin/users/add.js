import React from 'react';
import { useHistory } from 'react-router-dom';
import Text from '../../../../components/text';
import { CALLBACK_TYPES, ELEM_REF_ATTR } from '../../../../constants/events-registry';
import useEventsRegistry from '../../../../hooks/events-registry';
import { getCompNameFromSession, useAuth } from '../../../../provider/auth';
import { generateComponent } from '../../../../utils/component';

const CREATE_USER_API = `{{CLOUD_ID_API}}/tenants/${getCompNameFromSession()}/users`;

export default function AdminAddUser({ screenInfo }) {
    const [error, setError] = React.useState(null);
    const { getAccessToken, getRefreshToken } = useAuth();
    const history = useHistory();
    const { registerEvents } = useEventsRegistry();

    const handleSubmit = data => {
        const { user, ...restData } = data;

        setError(null);

        fetch(`${CREATE_USER_API}/${user}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                accessToken: getAccessToken(),
                refreshToken: getRefreshToken()
            },
            body: JSON.stringify(restData)
        }).then(res => {
            if (!res.ok) return Promise.reject({ message: res.statusText });
            alert(`User ${user} added successfully`)
            history.push('/admin/users')
        }).catch(e => {
            setError(e.message)
        })
    };

    const eventsToRegister = [
        {
            [ELEM_REF_ATTR.ID]: 'ADD_USER_FORM',
            events: {
                onSubmit: [CALLBACK_TYPES.DEFAULT_RETURN, handleSubmit]
            }
        }
    ];

    registerEvents(eventsToRegister)

    return (
        <React.Fragment>
            {generateComponent(screenInfo)}
            {error && <Text color="error" variant="caption">{error}</Text>}
        </React.Fragment>
    );
}
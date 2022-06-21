import React from 'react';
import { useHistory } from 'react-router-dom';
import Text from '../../../../components/text';
import { useAuth } from '../../../../provider/auth';
import { generateComponent } from '../../../../utils/component';

const CREATE_USER_API = `http://tenant-service01.cloudid.ci.opal.synacor.com:4080/orgs/${sessionStorage.getItem('ORG') || '{{ORG}}'}/keycloak/users`;

export default function AdminAddUser({ screenInfo }) {
    const [error, setError] = React.useState(null);
    const { getAccessToken } = useAuth();
    const history = useHistory();

    const handleSubmit = data => {
        const { user, ...restData } = data;

        setError(null);

        fetch(`${CREATE_USER_API}/${user}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Bearer: getAccessToken()
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

    return (
        <React.Fragment>
            {generateComponent(screenInfo)}
            {error && <Text color="error" variant="caption">{error}</Text>}
        </React.Fragment>
    );
}
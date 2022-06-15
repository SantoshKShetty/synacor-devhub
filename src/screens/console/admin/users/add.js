import React from 'react';
import { useHistory } from 'react-router-dom';
import Form from '../../../../components/form';
import Text from '../../../../components/text';
import { useAuth } from '../../../../provider/auth';

const CREATE_USER_API = `http://tenant-service01.cloudid.ci.opal.synacor.com:4080/orgs/${sessionStorage.getItem('ORG') || '{{ORG}}'}/keycloak/users`;

export default function AdminAddUser({ info: { form } = {} }) {
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
            <Form
                form={form}
                style={{ width: '80%', padding: '0 10% 0 0', boxSizing: 'border-box', maxWidth: 700 }}
                onSubmit={handleSubmit}
            />
            {error && <Text color="error" variant="caption">{error}</Text>}
        </React.Fragment>
    );
}
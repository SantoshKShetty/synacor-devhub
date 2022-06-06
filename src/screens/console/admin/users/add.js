import React from 'react';
import Form from '../../../../components/form';

export default function AdminAddUser({ info: { form } = {} }) {
    const handleSubmit = data => {
        console.log('data is; ', data)
    };

    return (
        <Form
            form={form}
            style={{ width: '80%', padding: '0 10% 0 0', boxSizing: 'border-box', maxWidth: 700 }}
            onSubmit={handleSubmit}
        />
    );
}
import React from 'react';
import Form from '../../../../components/form';

export default function AdminAddUser({ info: { form } = {} }) {
    return <Form form={form} style={{ width: '80%', padding: '0 10% 0 0', boxSizing: 'border-box', maxWidth: 700 }} />
}
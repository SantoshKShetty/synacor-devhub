import React from 'react';
import { generateComponent } from '../../../../utils/component';
import Form from '../../../../components/form';

const FormSection = ({ form: { controls } }) => (
    <Form style={{ width: '80%', padding: '0 10% 0 0', boxSizing: 'border-box', maxWidth: 700 }}>
        {generateComponent(controls)}
    </Form>
)

export default function AddUser({ info: { form } = {} }) {
    return <FormSection form={form} />
}
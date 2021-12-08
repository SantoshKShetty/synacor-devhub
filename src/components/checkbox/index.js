import React from 'react';
import ReactCheckbox from '@material-ui/core/Checkbox';
import ReactFormControlLabel from '@material-ui/core/FormControlLabel';

export default function CheckBox({ label, ...props }) {
    const CheckboxComponet = <ReactCheckbox {...props} />;

    return label ? <ReactFormControlLabel control={CheckboxComponet} label={label} /> : CheckboxComponet;
}
import React from 'react';
import ReactToggleButton from '@material-ui/lab/ToggleButton';
import ReactToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from '@material-ui/core/Typography';
import dlv from 'dlv';
import { generateComponent } from '../../utils/component';

export default function ToggleButtonGroup({ items, defaultValue, baseKey, ...props }) {
    const [selected, setSelected] = React.useState(defaultValue);

    const handleChange = (event, val) => setSelected(val);

    const onSelectRender = dlv(items.find(({ value }) => value === selected), 'onSelectRender');

    return (
        <React.Fragment>
            <ReactToggleButtonGroup {...props} value={selected} onChange={handleChange}>
                {items && items.map(
                    ({ value, label }, i) => (
                        <ReactToggleButton key={`${baseKey}-${i}`} value={value}>
                            <Typography>{label}</Typography>
                        </ReactToggleButton>
                    )
                )}
            </ReactToggleButtonGroup>
            {onSelectRender && onSelectRender.map(
                (item, i) => generateComponent({ ...item, key: `${baseKey}-toggle-onselect-render-${i}` })
            )}
        </React.Fragment>
    );
}
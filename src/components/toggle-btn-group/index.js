import React from 'react';
import ReactToggleButton from '@material-ui/lab/ToggleButton';
import ReactToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import dlv from 'dlv';
import Text from '../text';
import { generateComponent } from '../../utils/component';
import { makeStyles } from '../../provider/theme';

const styles = makeStyles(
    ({ palette, shape, spacing }) => ({
        toggleBtn: {
            borderRadius: shape.borderRadius * 3,
            color: palette.text.primary,
            borderColor: palette.custom.button.toggleBtn.borderColor,
            textTransform: 'capitalize',

            '&.Mui-selected': {
                color: palette.text.primary,
                backgroundColor: palette.custom.button.toggleBtn.bgColorActive,
                borderColor: palette.custom.button.toggleBtn.borderColor
            }
        },
        labelWithIcon: {
            marginLeft: spacing(1.5)
        }
    })
);

export default function ToggleButtonGroup({ items, defaultValue, baseKey, onChange, ...props }) {
    const classes = styles();
    const [selected, setSelected] = React.useState(defaultValue);

    // On Select, render the children who belong to that specific selected button.
    const onSelectRender = dlv(items.find(({ value }) => value === selected), 'onSelectRender', []).map(item => ({
        ...item,
        key: `${baseKey}-ontoggle-render`
    }));

    const handleChange = (event, val) => {
        setSelected(val);
        onChange(val);
    }

    return (
        <React.Fragment>
            <ReactToggleButtonGroup {...props} value={selected} onChange={handleChange}>
                {items && items.map(
                    ({ value, label, icon }, i) => (
                        <ReactToggleButton key={`${baseKey}-${i}`} value={value} className={classes.toggleBtn}>
                            {icon && generateComponent(icon)}
                            <Text {...icon && { className: classes.labelWithIcon }}>{label}</Text>
                        </ReactToggleButton>
                    )
                )}
            </ReactToggleButtonGroup>
            {generateComponent(onSelectRender)}
        </React.Fragment>
    );
}
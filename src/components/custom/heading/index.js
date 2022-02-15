import React from 'react';
import { makeStyles } from '../../../provider/theme';
import Text from '../../text';

const styles = makeStyles(
    () => ({
        screenDesc: {
            fontSize: 40,
            fontWeight: 900
        },
        screenTitle: {
            fontSize: 24,
            fontWeight: 400
        },
        sectionTitle: {
            fontSize: 24,
            fontWeight: 300
        }
    })
)

export default function Heading({ variant, label, ...props }) {
    const classes = styles();

    return (
        <Text {...props} {...variant && { className: classes[variant] }}>
            {label}
        </Text>
    );
}
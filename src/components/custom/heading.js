import React from 'react';
import { makeStyles } from '../../provider/theme';
import Text from '../text';

const styles = makeStyles(
    () => ({
        screenDesc: {
            fontSize: '2.5rem',
            fontWeight: 900,

            '@media (max-width: 1340px)': {
                fontSize: '2.2rem'
            },

            '@media (max-width: 1240px)': {
                fontSize: '2rem'
            },

            '@media (max-width: 1200px)': {
                fontSize: '1.8rem'
            }
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
import React from 'react';
import ReactAccordion from '@material-ui/core/Accordion';
import ReactAccordionSummary from '@material-ui/core/AccordionSummary';
import ReactAccordionDetails from '@material-ui/core/AccordionDetails';
import Text from '../text';
import { generateComponent } from '../../utils/component';
import { isReactComponent } from '../../utils/basics';

export default function Accordion({ label, items, expandIcon, className, baseKey, ...props }) {
    const ExpandIcon = expandIcon && (isReactComponent(expandIcon) ? expandIcon : generateComponent(expandIcon));

    return (
        <ReactAccordion {...props} className={className}>
            {label && (
                <ReactAccordionSummary {...ExpandIcon && { expandIcon: ExpandIcon } }>
                    <Text>{label}</Text>
                </ReactAccordionSummary>
            )}
            {items && (
                <ReactAccordionDetails>
                    {items.map((item, i) => (
                        isReactComponent(item) ? item : generateComponent({ ...item, key: `${baseKey}-${i}` })
                    ))}
                </ReactAccordionDetails>
            )}
        </ReactAccordion>
    );
}
import React from 'react';
import ReactAccordion from '@material-ui/core/Accordion';
import ReactAccordionSummary from '@material-ui/core/AccordionSummary';
import ReactAccordionDetails from '@material-ui/core/AccordionDetails';
import * as Icons from '../icons';
import Text from '../text';
import { generateComponent } from '../../utils/component';

export default function Accordion({ label, items, expandIcon = 'ExpandMoreIcon', className, baseKey, ...props }) {
    const ExpandIcon = Icons[expandIcon] || null;

    return (
        <ReactAccordion {...props} className={className}>
            {label && (
                <ReactAccordionSummary expandIcon={<ExpandIcon />}>
                    <Text>{label}</Text>
                </ReactAccordionSummary>
            )}
            {items && (
                <ReactAccordionDetails>
                    {items.map((item, i) => generateComponent({
                        ...item, key: `${baseKey}-${i}`
                    }))}
                </ReactAccordionDetails>
            )}
        </ReactAccordion>
    );
}
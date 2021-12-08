import React from 'react';
import { isReactComponent, isObject, deepClone, isArray } from "../../utils/basics";
import { generateComponent } from "../../utils/component";

export function createMenuOpener({ opensBy, isMenuOpen, onClick, selectedItemsLabel }) {
    if (isReactComponent(opensBy)) {
        return React.cloneElement(opensBy, { onClick });
    } else if (isObject(opensBy)) {
        /**
         * Below `deep cloning` is necessary because we're modifying `Icon['icon']`.
         * Without cloning, we would be modifying `children` by reference, resulting in unexpected results.
         */
        const { children, label, ...rest } = deepClone(opensBy);
        const Icon = children && children.find(c => c.type === 'icon');

        if (Icon && isArray(Icon['icon'])) {
            Icon['icon'] = isMenuOpen && Icon['icon'][1] || Icon['icon'][0];
        }

        return generateComponent({
            ...rest,
            label: [label, selectedItemsLabel].filter(Boolean).join(': '),
            children,
            events: { onClick }
        });
    }
}
import React from 'react';
import mergeOptions from 'merge-options';
import { getConfigResource } from '../utils/resource-path';

/**
 * Component `DescriptorLoader` is a thin wrapper that wraps around every screen component given for a route.
 * This wrapper generalizes the idea of downloading screen specific config `descriptor` file.
 
 * @param {string} descriptor - descriptor file name
 * @param {Object} children - `Screen` component for that specific `url`.
 * @param {Object} genericInfo - An object we got already from `config/index.json` file.
 * @returns - Wrapped component for every `Screen` with downloaded `descriptor` object passed as prop to `Screen`.
 */
export default function DescriptorLoader({ descriptor, children, genericInfo }) {
    const [desc, setDesc] = React.useState(null);

    React.useEffect(() => {
        fetch(getConfigResource(descriptor))
            .then(d => d.json())
            .then(d => setDesc(d))
            .catch(e => console.log(`Error downloading descriptor ${descriptor} due to: ${e}`));
    }, []);

    return desc && React.cloneElement(
        React.Children.only(children), {
            info: mergeOptions(genericInfo, desc)
        }
    );
}
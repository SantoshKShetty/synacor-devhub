import React from 'react';
import { getConfigResource } from '../utils/resource-path';
import { fetchJsonResource } from '../utils/fetch';

/**
 * Component `DescriptorLoader` is a thin wrapper that wraps around every screen component given for a route.
 * This wrapper generalizes the idea of downloading screen specific config `descriptor` file.
 
 * @param {string} descriptor - descriptor file name
 * @param {Object} children - `Screen` component for that specific `url`.
 * @returns - Wrapped component for every `Screen` with downloaded `descriptor` object passed as prop to `Screen`.
 */
export default function DescriptorLoader({ descriptor, children }) {
    const [desc, setDesc] = React.useState(null);

    React.useEffect(() => {
        fetchJsonResource(getConfigResource(descriptor))
            .then(d => setDesc(d))
            .catch(e => console.log(e));
    }, []);

    return desc && React.cloneElement(
        React.Children.only(children), {
            screenInfo: desc
        }
    );
}
import React from 'react';
import { getConfigResource } from '../../utils/resource-path';

const context = React.createContext({});

export default function ConfigProvider(props) {
    const [config, setConfig] = React.useState();

    React.useEffect(() => {
        fetch(getConfigResource())
            .then(r => r.json())
            .then(data => setConfig(data));
    }, []);

    return config ? <context.Provider {...props} value={config} /> : null;
}

export function useConfig() {
    return React.useContext(context);
}
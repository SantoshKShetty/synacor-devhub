import React from 'react';
import mergeOptions from 'merge-options';
import { getConfigResource } from '../utils/resource-path';
import { useAuth } from './auth';
import { exists, isArray, isString } from '../utils/basics';
import DESCRIPTOR_FOLDERS from '../constants/descriptor-folders';
import { fetchJsonResource } from '../utils/fetch';

const downloadConfigs = (configPaths, entryFile) => {
    if (!isArray(configPaths)) return Promise.reject('`configPaths` must be an array of string of folder paths');

    if (!isString(entryFile)) return Promise.reject('`entryFile` should be string.')

    return Promise.all(configPaths.map(path => {
        const resource = `${path}/${entryFile}`;
        return fetchJsonResource(getConfigResource(resource)).catch(e => console.log(e))
    }));
}

const mergeConfigs = configs => {
    if (configs.length === 1) return configs.pop();

    // `routes2` will override `routes1`. Same goes for `rest1` and `rest2`.
    const { routes: routes1, ...rest1 } = configs[0];
    const { routes: routes2, ...rest2 } = configs[1];

    const restOptions = mergeOptions(rest1, rest2);

    if (isArray(routes1) && isArray(routes2)) {
        const genericRoutes = [];

        const routes = routes1.reduce((acc, route) => {
            // `route.path` would be either `string` or `array of strings`.
            // To Do:- find ways to handle `array of strings` case in a better way.
            if (isString(route.path)) {
                // Check if `route.path` present in routes2 (the overriding set) as well.
                const route2Indx = routes2.findIndex(({ path }) => isString(path) && route.path);

                if (route2Indx !== -1) {
                    // We've an entry for `route.path` in the overriding set. Let' consider `routes2`'s entry.

                    if (route.path.includes('*')) genericRoutes.push(routes2[route2Indx]); // A generic route
                    else acc.push(routes2[route2Indx]); // A normal route.

                    routes2[route2Indx] = null; // Unset the index so that, we don't put the same twice.
                } else {
                    // We've don't have any entry for `route.path` in the overriding set. Let' consider `routes1`'s entry.

                    if (route.path.includes('*')) genericRoutes.push(route); // A generic route
                    else acc.push(route); // A normal route.
                }
            } else {
                acc.push(route);
            }

            return acc;
        }, []);

        return { ...restOptions, routes: [ ...routes, ...routes2.filter(Boolean), ...genericRoutes ] }
    } else {
        return { ...restOptions, routes: [ routes1, routes2 ].filter(Boolean).reduce((acc, routes) => { acc.push(...routes); return acc; }, []) }
    }
}

const context = React.createContext({});

export default function ConfigProvider(props) {
    const [config, setConfig] = React.useState();

    const { hasUserLoggedIn, isAdminUser } = useAuth();
    const isLoggedIn = hasUserLoggedIn();

    React.useEffect(() => {
        const configPaths = !isLoggedIn ?
            [DESCRIPTOR_FOLDERS.DEFAULT]
                : isAdminUser() ? [DESCRIPTOR_FOLDERS.USER, DESCRIPTOR_FOLDERS.ADMIN]
                : [DESCRIPTOR_FOLDERS.USER];

        downloadConfigs(configPaths, 'index.json').then(
            data => setConfig(
                mergeConfigs(data.filter(exists))
            )
        ).catch(e => console.log(e));
    }, [isLoggedIn]);

    return config ? <context.Provider {...props} value={config} /> : null;
}

export function useConfig() {
    return React.useContext(context);
}
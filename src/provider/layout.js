import React, { lazy } from 'react';

// Mapping of lookup id's against lazy loaded layouts (chunks)
const LAYOUTS = {
    SingleColumn: lazy(() => import(
        /* webpackChunkName: "single-col-layout" */
        '../layout/single-col'
    )),
    SplitColumn: lazy(() => import(
        /* webpackChunkName: "split-col-layout" */
        '../layout/split-col'
    )),
    Dashboard: lazy(() => import(
        /* webpackChunkName: "dashboard-layout" */
        '../layout/dashboard'
    ))
};

const context = React.createContext({});

export default function LayoutProvider(props) {
    return <context.Provider {...props} value={{ ...LAYOUTS }} />;
}

export function useLayout() {
    return React.useContext(context);
}
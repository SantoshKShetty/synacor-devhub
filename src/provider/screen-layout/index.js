import React, { lazy } from 'react';

// Mapping of lookup id's against lazy loaded screens (chunks)
const SCREENS = {
    Home: lazy(() => import (
        /* webpackChunkName: "home-screen" */
        '../../screens/home'
    )),
    Register: lazy(() => import (
        /* webpackChunkName: "registration-screen" */
        '../../screens/registration'
    )),
    AccountSetup: lazy(() => import (
        /* webpackChunkName: "setup-account-screen" */
        '../../screens/setup-account'
    )),
    Login: lazy(() => import (
        /* webpackChunkName: "login-screen" */
        '../../screens/login'
    )),
    Dashboard: lazy(() => import (
        /* webpackChunkName: "dashboard-screen" */
        '../../screens/dashboard'
    ))
};


// Mapping of lookup id's against lazy loaded layouts (chunks)
const LAYOUTS = {
    SingleColumn: lazy(() => import (
        /* webpackChunkName: "single-col-layout" */
        '../../layout/single-col'
    )),
    SplitColumn: lazy(() => import (
        /* webpackChunkName: "split-col-layout" */
        '../../layout/split-col'
    )),
    Dashboard: lazy(() => import (
        /* webpackChunkName: "dashboard-layout" */
        '../../layout/dashboard'
    ))
};

const context = React.createContext({});

export default function ScreenAndLayoutProvider(props) {
    return <context.Provider {...props} value={{ layouts: LAYOUTS, screens: SCREENS }} />;
}

export function useScreenAndLayout() {
    return React.useContext(context);
}
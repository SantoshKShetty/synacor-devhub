import React, { lazy } from 'react';

// Mapping of lookup id's against lazy loaded screens (chunks)
const SCREENS = {
    Home: lazy(() => import(
        /* webpackChunkName: "home-screen" */
        '../../screens/home'
    )),
    Register: lazy(() => import(
        /* webpackChunkName: "registration-screen" */
        '../../screens/registration'
    )),
    AccountSetup: lazy(() => import(
        /* webpackChunkName: "setup-account-screen" */
        '../../screens/setup-account'
    )),
    Login: lazy(() => import(
        /* webpackChunkName: "login-screen" */
        '../../screens/login'
    )),
    Dashboard: lazy(() => import(
        /* webpackChunkName: "dashboard-screen" */
        '../../screens/dashboard'
    ))
};

// Mapping of lookup id's against lazy loaded sub-screens (chunks)
const SUB_SCREENS = {
};

const context = React.createContext({});

export default function ScreenProvider(props) {
    return <context.Provider {...props} value={[SCREENS, SUB_SCREENS]} />;
}

export function useScreen() {
    return React.useContext(context);
}
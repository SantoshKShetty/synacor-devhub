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
    )),
    DemoSetupLDAPConfig: lazy(() => import(
        /* webpackChunkName: "demo-setup-ldap-config-screen" */
        '../../screens/demo/ldap/setup-config'
    )),
    DemoSSOLogin: lazy(() => import(
        /* webpackChunkName: "demo-sso-login-screen" */
        '../../screens/demo/sso/login'
    )),
    DemoSSOLoginSuccess: lazy(() => import(
        /* webpackChunkName: "demo-sso-login-success-screen" */
        '../../screens/demo/sso/login/success'
    ))
};

// Mapping of lookup id's against lazy loaded sub-screens (chunks)
const SUB_SCREENS = {
    UsersList: lazy(() => import(
        /* webpackChunkName: "users-list-subscreen" */
        '../../screens/dashboard/sections/users'
    ))
};

const context = React.createContext({});

export default function ScreenProvider(props) {
    return <context.Provider {...props} value={[SCREENS, SUB_SCREENS]} />;
}

export function useScreen() {
    return React.useContext(context);
}
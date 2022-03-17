import React, { lazy } from 'react';

// Mapping of lookup id's against lazy loaded screens (chunks)
const SCREENS = {
    Home: lazy(() => import(
        /* webpackChunkName: "home-screen" */
        '../screens/home'
    )),
    Register: lazy(() => import(
        /* webpackChunkName: "registration-screen" */
        '../screens/registration'
    )),
    AccountSetup: lazy(() => import(
        /* webpackChunkName: "setup-account-screen" */
        '../screens/setup-account'
    )),
    Login: lazy(() => import(
        /* webpackChunkName: "login-screen" */
        '../screens/login'
    )),
    Console: lazy(() => import(
        /* webpackChunkName: "console-screen" */
        '../screens/console'
    )),
};

// Mapping of lookup id's against lazy loaded sub-screens (chunks)
const SUB_SCREENS = {
    UsersMain: lazy(() => import(
        /* webpackChunkName: "users-main-subscreen" */
        '../screens/console/users'
    )),
    AddUser: lazy(() => import(
        /* webpackChunkName: "add-user-subscreen" */
        '../screens/console/users/add'
    )),
    UserDetails: lazy(() => import(
        /* webpackChunkName: "users-details-subscreen" */
        '../screens/console/users/details'
    )),
};

const context = React.createContext({});

export default function ScreenProvider(props) {
    return <context.Provider {...props} value={[SCREENS, SUB_SCREENS]} />;
}

export function useScreen() {
    return React.useContext(context);
}
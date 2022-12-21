import React, { lazy } from 'react';

// Mapping of lookup id's against lazy loaded screens (chunks)
const SCREENS = {
    Register: lazy(() => import(
        /* webpackChunkName: "registration-screen" */
        '../screens/registration'
    )),
    RegisterSuccess: lazy(() => import(
        /* webpackChunkName: "registration-success-screen" */
        '../screens/registration-success'
    )),
    AccountSetup: lazy(() => import(
        /* webpackChunkName: "setup-account-screen" */
        '../screens/setup-account'
    )),
    Console: lazy(() => import(
        /* webpackChunkName: "console-screen" */
        '../screens/console'
    )),
};

// Mapping of lookup id's against lazy loaded sub-screens (chunks)
const SUB_SCREENS = {
    AdminUsersList: lazy(() => import(
        /* webpackChunkName: "admin-users-list-subscreen" */
        '../screens/console/admin/users'
    )),
    AdminAddUser: lazy(() => import(
        /* webpackChunkName: "admin-add-user-subscreen" */
        '../screens/console/admin/users/add'
    )),
    AdminUsersDetails: lazy(() => import(
        /* webpackChunkName: "admin-users-details-subscreen" */
        '../screens/console/admin/users/details'
    )),
    UserApplications: lazy(() => import(
        /* webpackChunkName: "user-apps-subscreen" */
        '../screens/console/user/apps'
    )),
    UserProfile: lazy(() => import(
        /* webpackChunkName: "user-profile-subscreen" */
        '../screens/console/user/profile'
    )),
    UserSecurity: lazy(() => import(
        /* webpackChunkName: "user-security-subscreen" */
        '../screens/console/user/security'
    )),
};

const context = React.createContext({});

export default function ScreenProvider(props) {
    return <context.Provider {...props} value={[SCREENS, SUB_SCREENS]} />;
}

export function useScreen() {
    return React.useContext(context);
}
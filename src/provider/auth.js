import React from 'react';
import AuthService from '../services/auth';
import { exists } from '../utils/basics';

const TEMP_REALM_NAME = 'companyNameTemp';

export function getCompNameFromSession() {
    return sessionStorage.getItem(TEMP_REALM_NAME);
}

export function setCompNameToSession(name) {
    sessionStorage.setItem(TEMP_REALM_NAME, name);
}

export function removeCompNameFromSession() {
    sessionStorage.removeItem(TEMP_REALM_NAME);
}

function readCompanyNameFromUri() {
    const path = window.location.pathname;
    const matches = path?.match(/^\/realms\/(.+)\/loginsuccess$/);
    return matches && matches.length >= 2 && matches[1];
}

const context = React.createContext();

export default function AuthProvider(props) {
    const [authReady, setAuthReady] = React.useState(false);
    const authService = new AuthService();

    const initialize = (payload, options) => authService.initialize(payload, options)

    const login = () => authService.login()

    const logout = () => {
        removeCompNameFromSession();
        authService.logout()
    }

    const getAccessToken = () => authService.getAccessToken()

    const getParsedAccessToken = () => authService.getParsedAccessToken()

    const getRefreshToken = () => authService.getRefreshToken()

    const getParsedRefreshToken = () => authService.getParsedRefreshToken()

    const hasUserLoggedIn = () => Boolean(getAccessToken())

    const hasRoles = roles => roles.some(role => authService.hasRealmRole(role))

    const hasAdminUserRoles = () => hasRoles(['admin'])

    const hasNormalUserRoles = () => hasRoles(['user']) && !hasRoles(['admin'])

    const contextData = React.useMemo(() => ({
        initialize,
        login,
        logout,
        hasUserLoggedIn,
        hasAdminUserRoles,
        hasNormalUserRoles,
        getAccessToken,
        getParsedAccessToken,
        getRefreshToken,
        getParsedRefreshToken
    }), []);


    if (!authReady) {
        let realm = getCompNameFromSession();

        if (!exists(realm)) {
            realm = readCompanyNameFromUri();
            if (exists(realm)) setCompNameToSession(realm);
        }

        // If companyName is found, try to initialize the Service. If successful and require login, do so.
        // Otherwise, we render default page - (non-auth pages like `/register`).
        if (exists(realm)) {
            initialize({ realm })
                .then(authenticated => {
                    authenticated ? setAuthReady(true) : login()
                })
                .catch(e => {
                    console.error(e);
                    setAuthReady(false);
                });
        } else {
            setAuthReady(true);
        }
    }

    return authReady && <context.Provider {...props} value={contextData} />
}

export function useAuth() {
    return React.useContext(context);
}
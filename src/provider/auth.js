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

const context = React.createContext();

export default function AuthProvider(props) {
    const [authReady, setAuthReady] = React.useState(false);
    const authService = new AuthService();

    const companyNameStored = getCompNameFromSession();

    if (!authReady) {
        if (exists(companyNameStored)) {
            authService.initialize({
                realm: companyNameStored
            }).then(authenticated => {
                if (!authenticated) login();
                else setAuthReady(true);
            }).catch(e => {
                console.error(e);
                setAuthReady(false);
            });
        } else {
            setAuthReady(true);
        }
    }

    const initialize = realm => authService.initialize(realm)

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

    return authReady && <context.Provider {...props} value={contextData} />
}

export function useAuth() {
    return React.useContext(context);
}
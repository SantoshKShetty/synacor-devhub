import Keycloak from "keycloak-js";

const KEYCLOAK_DEFAULT_PAYLOAD = {
    url: '{{KEYCLOAK_URL}}/auth/',
    realm: null,
    clientId: 'account'
};

const KEYCLOAK_DEFAULT_OPTIONS = {
    onLoad: 'login-required'
};

export default function AuthService() {
    let instance = null;

    const initialize = (payload = {}, options = {}) => {
        instance = new Keycloak({ ...KEYCLOAK_DEFAULT_PAYLOAD, ...payload });
        return instance.init({ ...KEYCLOAK_DEFAULT_OPTIONS, ...options });
    }

    const login = () => instance?.login()

    const logout = () => instance?.logout()

    const getAccessToken = () => instance?.token

    const getParsedAccessToken = () => instance?.tokenParsed

    const getRefreshToken = () => instance?.refreshToken

    const getParsedRefreshToken = () => instance?.refreshTokenParsed

    const hasRealmRole = role => instance?.hasRealmRole(role)

    return {
        initialize,
        login,
        logout,
        getAccessToken,
        getParsedAccessToken,
        getRefreshToken,
        getParsedRefreshToken,
        hasRealmRole
    }
}
import Keycloak from "keycloak-js";

export default function AuthService() {
    let instance = null;

    const initialize = realm => {
        instance = new Keycloak({
            url: '{{KEYCLOAK_URL}}/auth/',
            realm,
            clientId: 'syn-devhub'
        });

        return instance.init({
            onLoad: 'login-required'
        });
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
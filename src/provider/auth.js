import React from 'react';

function getLoggedUser() {
    const user = sessionStorage.getItem('loggedUser');
    return user ? JSON.parse(user) : user;
}

function setLoggedUser(user) {
    sessionStorage.setItem('loggedUser', JSON.stringify(user));
}

function deleteLoggedUser() {
    sessionStorage.removeItem('loggedUser')
}

const context = React.createContext();

export default function AuthProvider(props) {
    const [user, setUser] = React.useState(getLoggedUser);

    const signIn = userData => {
        setLoggedUser(userData);
        setUser(userData);
    }

    const signOut = () => {
        deleteLoggedUser();
        setUser(null);
    }

    const hasUserLoggedIn = () => Boolean(user)

    const isAdminUser = () => user.isAdmin

    const isNormalUser = () => !user.isAdmin

    const getAccessToken = () => hasUserLoggedIn() && user.access_token

    const contextData = React.useMemo(() => ({
        signIn, signOut, hasUserLoggedIn, isAdminUser, isNormalUser, getAccessToken
    }), [user]);

    return <context.Provider {...props} value={contextData} />
}

export function useAuth() {
    return React.useContext(context);
}
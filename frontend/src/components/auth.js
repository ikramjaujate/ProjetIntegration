export function isLoggedIn() {
    return localStorage.getItem("accessToken") !== null && localStorage.getItem("accessToken") !== "undefined";
}

export function deleteTokens() {
    localStorage.removeItem("accessToken");

}

export function requiredAuth(nextState, replace) {
    if (!isLoggedIn()) {
        replace({
            pathname: '/',
            state: {nextPathname: nextState.location.pathname}
        })
    }
}
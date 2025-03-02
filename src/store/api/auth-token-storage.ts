const accessTokenKey = "access-token";
const refreshTokenKey = "refresh-token";

export function getAccessToken() {
    return localStorage.getItem(accessTokenKey);
}

export function setAccessToken(accessToken: string) {
    localStorage.setItem(accessTokenKey, accessToken);
}

export function resetAccessToken() {
    localStorage.removeItem(accessTokenKey);
}

export function getRefreshToken() {
    return localStorage.getItem(refreshTokenKey);
}

export function setRefreshToken(refreshToken: string) {
    localStorage.setItem(refreshTokenKey, refreshToken);
}

export function resetRefreshToken() {
    localStorage.removeItem(refreshTokenKey);
}

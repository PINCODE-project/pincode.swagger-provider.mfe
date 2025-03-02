export class AuthTokenStorage {
    private static accessTokenKey = "access-token";
    private static refreshTokenKey = "refresh-token";

    static getAccessToken() {
        return localStorage.getItem(AuthTokenStorage.accessTokenKey);
    }

    static setAccessToken(accessToken: string) {
        localStorage.setItem(AuthTokenStorage.accessTokenKey, accessToken);
    }

    static resetAccessToken() {
        localStorage.removeItem(AuthTokenStorage.accessTokenKey);
    }

    static getRefreshToken() {
        return localStorage.getItem(AuthTokenStorage.refreshTokenKey);
    }

    static setRefreshToken(refreshToken: string) {
        localStorage.setItem(AuthTokenStorage.refreshTokenKey, refreshToken);
    }

    static resetRefreshToken() {
        localStorage.removeItem(AuthTokenStorage.refreshTokenKey);
    }
}

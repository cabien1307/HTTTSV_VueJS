import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const TokenKey = "token";

export function getToken() {
    return Cookies.get(TokenKey);
}

export function setToken(token) {
    return Cookies.set(TokenKey, token, { expires: 1 });
}

export function removeToken() {
    return Cookies.remove(TokenKey);
}

export function getUser() {
    if (!getToken()) {
        return null;
    }
    return jwt_decode(getToken());
}

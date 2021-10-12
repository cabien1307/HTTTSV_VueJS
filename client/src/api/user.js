import callAPI from "../utils/callAPI";

export function signUp(data) {
    return callAPI({
        url: "/user/sign-up",
        method: "POST",
        data: data,
    });
}

export function signIn(data) {
    return callAPI({
        url: "user/sign-in",
        method: "POST",
        data: data,
    });
}

export function authGoogle(data) {
    return callAPI({
        url: "user/auth/google",
        method: "POST",
        data,
    });
}

export function getUserInfo(userID) {
    return callAPI({
        url: `user/${userID}/getByID`,
        method: "GET",
    });
}

export function updateProfile(userID, data) {
    return callAPI({
        url: `user/${userID}/update`,
        method: "PATCH",
        data,
    });
}

export function fetchAllTeacher() {
    return callAPI({
        url: `user/role`,
        method: "GET",
    });
}

export function updateRole(userID, data) {
    return callAPI({
        url: `/user/${userID}/update-role`,
        method: "PATCH",
        data,
    });
}

export function deleteUser(userID) {
    return callAPI({
        url: `/user/${userID}/delete`,
        method: "DELETE",
    });
}

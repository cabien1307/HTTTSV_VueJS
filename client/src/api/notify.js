import callAPI from "../utils/callAPI";

export function fetchAllNotify() {
    return callAPI({
        url: `/notification`,
        method: "GET",
    });
}

export function deleteNotifify(notifyID, data) {
    return callAPI({
        url: `notification/${notifyID}`,
        method: "DELETE",
        data,
    });
}

export function fetchNotifyById(notifyID) {
    return callAPI({
        url: `notification/${notifyID}`,
        method: "GET",
    });
}

export function createNotify(userID, data) {
    return callAPI({
        url: `notification/${userID}/create`,
        method: "POST",
        data,
    });
}

export function updateNotify(notifyID, data) {
    return callAPI({
        url: `notification/${notifyID}`,
        method: "PATCH",
        data,
    });
}

export function uploadFile(data) {
    return callAPI({
        url: "attachment",
        method: "POST",
        data,
        headers: { "Content-Type": "multipart/form-data" },
    });
}

export function unread(userID) {
    return callAPI({
        url: `notification/${userID}/unread`,
        method: "GET",
    });
}

export function readNotify(notifyID, data) {
    return callAPI({
        url: `notification/${notifyID}/read`,
        method: "PATCH",
        data,
    });
}

export function fetchAllNotifyByFaculty(slug) {
    return callAPI({
        url: `notification/${slug}/faculty`,
        method: "GET",
    });
}

export function fetchLatestNotification() {
    return callAPI({
        url: `notification/new`,
        method: "GET",
    });
}

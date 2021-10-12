import callAPI from "../utils/callAPI";

export function createComment(data) {
    return callAPI({
        url: `comment`,
        method: "POST",
        data,
    });
}

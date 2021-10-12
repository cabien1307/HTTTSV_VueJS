import callAPI from "../utils/callAPI";

export function fetchPost() {
    return callAPI({
        url: `post`,
        method: "GET",
    });
}

export function fetchPostByID(postID) {
    return callAPI({
        url: `/post/${postID}`,
        method: "GET",
    });
}

export function setLiked(postID, userID) {
    return callAPI({
        url: `post/${postID}/liked`,
        method: "PUT",
        data: userID,
    });
}

export function updatePost(postID, data) {
    return callAPI({
        url: `post/${postID}`,
        method: "PATCH",
        data,
    });
}

export function createPost(data) {
    return callAPI({
        url: `post`,
        method: "POST",
        data,
    });
}

export function uploadImg(data) {
    return callAPI({
        url: "upload",
        method: "POST",
        data,
        headers: { "Content-Type": "multipart/form-data" },
    });
}

export function deletePost(postID, data) {
    return callAPI({
        url: `post/${postID}`,
        method: "DELETE",
        data,
    });
}

export function getTimeLine(userID) {
    return callAPI({
        url: `post/${userID}/timeline`,
        method: "GET",
    });
}

export function getPostOfFacultyBySlug(slug) {
    return callAPI({
        url: `post/faculty/${slug}`,
        method: "GET",
    });
}

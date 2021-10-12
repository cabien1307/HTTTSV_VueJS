import callAPI from "../utils/callAPI";

export function getAllFaculties() {
    return callAPI({
        url: "faculty",
        method: "GET",
    });
}

export function getInfoFaculty(slug) {
    return callAPI({
        url: `faculty/${slug}`,
        method: "GET",
    });
}

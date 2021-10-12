import {
    createPost,
    deletePost,
    fetchPost,
    fetchPostByID,
    setLiked,
    updatePost,
    getTimeLine,
    getPostOfFacultyBySlug,
} from "../../api/post";
import { createComment } from "../../api/comment";

const regex = new RegExp(/^[0-9a-fA-F]{24}$/);

function checkRegex(str) {
    return regex.test(str);
}

const state = {
    posts: [],
};

const mutations = {
    FETCH_POSTS: (state, payload) => {
        state.posts = payload;
    },
    FETCH_POST_BY_ID: (state, payload) => {
        state.posts = payload;
    },
    SET_LIKE: (state, payload) => {
        state.posts = payload;
    },
    CREAT_COMMENT: (state, payload) => {
        state.posts = payload;
    },
    CREATE_POST: (state, payload) => {
        state.posts = payload;
    },
    UPDATE_POST: (state, payload) => {
        state.posts = payload;
    },
    DELETE_POST: (state, payload) => {
        state.posts = payload;
    },
    TIME_LINE: (state, payload) => {
        state.posts = payload;
    },
    GET_POST_OF_FACULTY: (state, payload) => {
        state.posts = payload;
    },
};

const actions = {
    async fetchPosts({ commit }) {
        const res = await fetchPost();
        commit("FETCH_POSTS", res.data);
    },
    async fetchPostByID({ commit }, postID) {
        const res = await fetchPostByID(postID);
        commit("FETCH_POST_BY_ID", res.data);
    },

    async setLike({ commit }, { postID, userID, key }) {
        await setLiked(postID, userID);
        if (key) {
            if (checkRegex(key)) {
                const res = await getTimeLine(key);
                commit("SET_LIKE", res.data);
            } else {
                const res = await getPostOfFacultyBySlug(key);
                commit("SET_LIKE", res.data);
            }
        } else {
            const res = await fetchPost();
            commit("SET_LIKE", res.data);
        }
    },

    async createComment({ commit }, { data, key }) {
        await createComment(data);

        if (key) {
            if (checkRegex(key)) {
                const res = await getTimeLine(key);
                commit("CREAT_COMMENT", res.data);
            } else {
                const res = await getPostOfFacultyBySlug(key);
                commit("CREAT_COMMENT", res.data);
            }
        } else {
            const res = await fetchPost();
            commit("CREAT_COMMENT", res.data);
        }
    },

    async createPost({ commit }, { data, key }) {
        await createPost(data);

        if (key) {
            const res = await getTimeLine(key);
            commit("CREATE_POST", res.data);
        } else {
            const res = await fetchPost();
            commit("CREATE_POST", res.data);
        }
    },

    async updatePost({ commit }, { data, key }) {
        await updatePost(data.params, data.body);

        if (key) {
            const res = await getTimeLine(key);
            commit("UPDATE_POST", res.data);
        } else {
            const res = await fetchPost();
            commit("UPDATE_POST", res.data);
        }
    },

    async deletePost({ commit }, { data, key }) {
        await deletePost(data.postID, data.body);

        if (key) {
            const res = await getTimeLine(key);
            commit("DELETE_POST", res.data);
        } else {
            const res = await fetchPost();
            commit("DELETE_POST", res.data);
        }
    },

    async getPostTimeLine({ commit }, userID) {
        const res = await getTimeLine(userID);
        commit("TIME_LINE", res.data);
    },

    async fetchPostOfFacultyBySlug({ commit }, slug) {
        const res = await getPostOfFacultyBySlug(slug);
        commit("GET_POST_OF_FACULTY", res.data);
    },
};

export default {
    state,
    mutations,
    actions,
};

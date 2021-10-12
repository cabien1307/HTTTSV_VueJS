import { getToken, removeToken, setToken } from "../../utils/auth";
import {
    fetchAllTeacher,
    getUserInfo,
    updateProfile,
    updateRole,
    deleteUser,
} from "../../api/user";

const state = {
    isAuth: getToken(),
    userInfo: "",
    teachers: [],
};
const mutations = {
    LOG_OUT: (state) => {
        state.isAuth = getToken();
        state.userInfo = "";
    },
    LOG_IN: (state) => {
        state.isAuth = getToken();
    },
    GET_USER: (state, user) => {
        state.userInfo = user;
    },
    UPDATE_PROFILE: (state, user) => {
        state.userInfo = user;
    },
    GET_TEACHER: (state, teacher) => {
        state.teachers = teacher;
    },
    UPDATE_ROLE: (state, data) => {
        state.teachers = data;
    },
    DELETE_USER: (state, teacher) => {
        state.teachers = teacher;
    },
};

const actions = {
    login({ commit }, token) {
        setToken(token);
        commit("LOG_IN");
    },
    logout({ commit }) {
        removeToken();
        commit("LOG_OUT");
    },
    async getUserInfo({ commit }, userID) {
        const res = await getUserInfo(userID);
        commit("GET_USER", res.data);
    },

    async updateProfile({ commit }, { userID, data }) {
        const res = await updateProfile(userID, data);
        commit("UPDATE_PROFILE", res.data.data);
    },

    async getTeacher({ commit }) {
        const res = await fetchAllTeacher();
        commit("GET_TEACHER", res.data);
    },

    async updateRole({ commit }, { userID, data }) {
        await updateRole(userID, data);
        const res = await fetchAllTeacher();
        commit("UPDATE_ROLE", res.data);
    },

    async deleteUser({ commit }, userID) {
        await deleteUser(userID);
        const res = await fetchAllTeacher();
        commit("DELETE_USER", res.data);
    },
};

export default {
    namespaces: true,
    state,
    mutations,
    actions,
};

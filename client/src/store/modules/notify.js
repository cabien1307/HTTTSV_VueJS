import {
    createNotify,
    deleteNotifify,
    fetchAllNotify,
    fetchNotifyById,
    updateNotify,
    unread,
    readNotify,
    fetchAllNotifyByFaculty,
    fetchLatestNotification,
} from "../../api/notify";

const state = {
    listNotify: [],
    notifyDetail: null,
    unread: 0,
};

const mutations = {
    GET_ALL_NOTIFY: (state, data) => {
        state.listNotify = data;
    },
    GET_NOTIFY_BY_ID: (state, data) => {
        state.notifyDetail = data;
    },
    CREATE_NOTIFY: (state, data) => {
        state.listNotify = data;
    },
    UPDATE_NOTIFY: (state, data) => {
        state.listNotify = data;
    },
    DELETE_NOTIFY: (state, data) => {
        state.listNotify = data;
    },
    UNREAD: (state, data) => {
        state.unread = data;
    },
    READ: (state, data) => {
        state.listNotify = data;
    },
    GET_NOTIFY_BY_FACULTY: (state, data) => {
        state.listNotify = data;
    },
    GET_LATEST_NOTIFY: (state, data) => {
        state.notifyDetail = data;
    },
};

const actions = {
    async getAllNotify({ commit }) {
        const res = await fetchAllNotify();
        commit("GET_ALL_NOTIFY", res.data);
    },
    async getNotifyByID({ commit }, notifyID) {
        const res = await fetchNotifyById(notifyID);
        commit("GET_NOTIFY_BY_ID", res.data);
    },

    async createNotify({ commit }, { userID, data }) {
        await createNotify(userID, data);
        const res = await fetchAllNotify();
        commit("CREATE_NOTIFY", res.data);
    },

    async updateNotify({ commit }, { notifyID, data }) {
        await updateNotify(notifyID, data);
        const res = await fetchAllNotify();
        commit("UPDATE_NOTIFY", res.data);
    },

    async deleteNotifify({ commit }, { notifyID, data }) {
        await deleteNotifify(notifyID, data);
        const res = await fetchAllNotify();
        commit("DELETE_NOTIFY", res.data);
    },

    async unRead({ commit }, userID) {
        const res = await unread(userID);
        commit("UNREAD", res.data);
    },

    async readNotify({ commit }, { notifyID, data }) {
        await readNotify(notifyID, data);
        const resAll = await fetchAllNotify();
        commit("READ", resAll.data);
        const res = await unread(data.userID);
        commit("UNREAD", res.data);
    },

    async getNotifyByFaculty({ commit }, slug) {
        const res = await fetchAllNotifyByFaculty(slug);
        commit("GET_NOTIFY_BY_FACULTY", res.data);
    },

    async getLatestNotify({ commit }) {
        const res = await fetchLatestNotification();
        commit("GET_LATEST_NOTIFY", res.data);
    },
};

export default {
    state,
    mutations,
    actions,
};

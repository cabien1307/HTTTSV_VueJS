import { getAllFaculties, getInfoFaculty } from "../../api/faculty";

const state = {
    faculties: [],
    infoFaculty: null,
};

const mutations = {
    FETCH_ALL_FACULTIES: (state, data) => {
        state.faculties = data;
    },
    GET_INFO_FACULTY: (state, data) => {
        state.infoFaculty = data;
    },
};

const actions = {
    async fetchAllFaculties({ commit }) {
        const res = await getAllFaculties();
        commit("FETCH_ALL_FACULTIES", res.data);
    },

    async fetchFacultyInfo({ commit }, slug) {
        const res = await getInfoFaculty(slug);
        commit("GET_INFO_FACULTY", res.data);
    },
};

export default {
    state,
    mutations,
    actions,
};

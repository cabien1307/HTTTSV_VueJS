import { createStore } from "vuex";
import getters from "./getter";
import post from "./modules/post";
import user from "./modules/user";
import faculty from "./modules/faculty";
import notify from "./modules/notify";

export default createStore({
    state: {},
    getters,
    mutations: {},
    actions: {},
    modules: {
        post,
        user,
        faculty,
        notify,
    },
});

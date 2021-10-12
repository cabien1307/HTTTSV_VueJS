import axios from "axios";
// import router from "../router/";
// import $ from "jquery";

const callAPI = axios.create({
    baseURL: process.env.VUE_APP_API,
});

callAPI.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default callAPI;

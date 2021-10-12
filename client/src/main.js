import { createApp } from "vue";
import App from "./App.vue";
import GAuth from "vue3-google-oauth2";

import router from "./router";
import store from "./store";
import "./assets/style/tailwind.css";
import "./assets/style/style.css";
import { registerGlobalComponents } from "./utils/import";

const app = createApp(App);

const gAuthOptions = {
    clientId:
        "48931884027-lm7slmrp7mtbr7ft3chseqt1qo262mne.apps.googleusercontent.com",
    scope: "email",
    prompt: "consent",
    fetch_basic_profile: true,
};

registerGlobalComponents(app);

app.use(GAuth, gAuthOptions);
app.use(store);
app.use(router);
app.mount("#app");

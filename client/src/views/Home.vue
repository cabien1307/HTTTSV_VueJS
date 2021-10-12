<template>
    <div
        class="
            w-10/12
            xl:w-10/12
            lg:w-11/12
            md:w-11/12
            sm:w-11/12
            xs:w-11/12
            absolute
            right-0
            px-1
            grid grid-cols-12
            gap-3
            py-5
            md:py-0
            sm:py-0
            xs:py-0
        "
    >
        <!-- Main -->

        <div
            class="
                content
                col-span-7
                xl:col-span-7
                lg:col-span-12
                md:col-span-12
                sm:col-span-12
                xs:col-span-12
            "
        >
            <Toast v-if="showToast" :toast="toast" />

            <!-- New Notify -->
            <NewNotify
                v-if="bagde && getNotifyDetail"
                :notify="getNotifyDetail"
            />

            <!-- Form post -->
            <FormPost v-if="getUser.role === 1 || getUser.role === 2" />

            <!-- List post -->
            <div
                class="
                    list-posts
                    mx-7
                    my-5
                    xl:mx-auto
                    lg:mx-2
                    md:mx-2
                    sm:mx-1
                    xs:mx-1
                "
                v-if="getAllPost"
            >
                <Post
                    v-for="post in getAllPost"
                    :key="post._id"
                    :post="post"
                    @showToast="showToastMsg"
                />
            </div>

            <div
                v-else
                class="
                    list-posts
                    mx-7
                    my-5
                    xl:mx-auto
                    lg:mx-2
                    md:mx-2
                    sm:mx-1
                    xs:mx-1
                "
            >
                <img
                    :src="require('../assets/images/post.svg')"
                    alt=""
                    class="w-1/2 h-auto object-cover mx-auto"
                />
                <h1 class="text-center text-xl mt-2 text-red-500 font-semibold">
                    Publish new post to see something !
                </h1>
            </div>
        </div>

        <!-- Notification -->
        <Notify />
    </div>
</template>

<script>
import Post from "../components/Post.vue";
import FormPost from "../components/FormPost.vue";
import Notify from "../components/Notify.vue";
import Toast from "../components/Toast.vue";
import NewNotify from "../components/NewNotify.vue";

import io from "socket.io-client";

import { mapGetters } from "vuex";
export default {
    components: {
        Post,
        FormPost,
        Notify,
        Toast,
        NewNotify,
    },
    computed: {
        ...mapGetters(["getAllPost", "getUser", "getNotifyDetail"]),
    },
    data() {
        return {
            showToast: false,
            toast: {
                status: null,
                msg: "",
            },
            socket: io("http://localhost:5000"),
            bagde: false,
        };
    },
    methods: {
        handleToast(status, msg) {
            this.showToast = true;
            this.toast = {
                status: status,
                msg: msg,
            };
        },
        showToastMsg(value) {
            this.handleToast(value.status, value.msg);
            setTimeout(() => {
                this.showToast = false;
            }, 3000);
        },
    },
    mounted() {
        this.socket.on("broadcast-notify", () => {
            this.$store.dispatch("getLatestNotify");
            this.bagde = true;
            setTimeout(() => {
                this.bagde = false;
            }, 10000);
        });
    },
};
</script>

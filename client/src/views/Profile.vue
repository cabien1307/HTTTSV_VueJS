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
            grid grid-cols-12
        "
    >
        <div
            class="
                col-span-12
                xl:col-span-12
                lg:col-span-12
                md:col-span-12
                sm:col-span-12
                xs:col-span-12
            "
        >
            <!-- New Notify -->
            <NewNotify
                v-if="bagde && getNotifyDetail"
                :notify="getNotifyDetail"
            />
        </div>
        <!-- Avatar -->
        <ProfileImage :user="user ? user : getUser" />

        <!-- Introduction -->
        <div
            class="
                introduction
                col-span-4
                xl:col-span-4
                lg:col-span-5
                md:col-span-12
                sm:col-span-12
                xs:col-span-12
                py-4
                rounded-lg
                px-5
            "
        >
            <EditForm :user="user ? user : getUser" />
        </div>

        <!-- Main -->
        <div
            class="
                content
                col-span-8
                px-5
                mt-2
                xl:col-span-8
                lg:col-span-7
                md:col-span-12
                sm:col-span-12
                xs:col-span-12
            "
        >
            <!-- Form post -->
            <FormPost v-if="params === getUser._id" />
            <!-- List post -->
            <div
                v-if="getAllPost.length > 0"
                class="
                    list-posts
                    xl:mx-1
                    lg:mx-3
                    md:mx-2
                    sm:mx-1
                    xs:mx-1
                    md:my-0
                    sm:my-0
                    xs:my-0
                "
            >
                <Post v-for="post in getAllPost" :key="post._id" :post="post" />
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
    </div>
</template>

<script>
import Post from "../components/Post.vue";
import FormPost from "../components/FormPost.vue";
import EditForm from "../components/EditForm.vue";
import ProfileImage from "../components/ProfileImage.vue";
import NewNotify from "../components/NewNotify.vue";
import { mapGetters } from "vuex";
import { getUserInfo } from "../api/user";
import io from "socket.io-client";

export default {
    components: {
        Post,
        FormPost,
        EditForm,
        ProfileImage,
        NewNotify,
    },
    data() {
        return {
            user: null,
            params: this.$route.params.id,
            socket: io("http://localhost:5000"),
            bagde: false,
        };
    },
    computed: {
        ...mapGetters(["getAllPost", "getUser", "getNotifyDetail"]),
    },
    created() {
        if (this.params === this.getUser._id) {
            return false;
        } else {
            getUserInfo(this.params).then((res) => {
                this.user = res.data;
            });
        }
    },
    watch: {
        $route(to) {
            if (to.params.id) {
                getUserInfo(to.params.id).then((res) => {
                    this.user = res.data;
                });
                this.$store.dispatch("getPostTimeLine", to.params.id);
            }
        },
        getUser() {
            this.$store.dispatch("getPostTimeLine", this.$route.params.id);
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

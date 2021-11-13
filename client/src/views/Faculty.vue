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
        <div class="w-full col-span-12 mb-3 bg-gray-100">
            <!-- Image cover faculty -->
            <div class="w-full">
                <img
                    :src="
                        getInfoFaculty.coverPic
                            ? PF + getInfoFaculty.coverPic
                            : PF + 'halong.jpg'
                    "
                    alt=""
                    class="w-full h-80 object-cover"
                />
            </div>

            <!-- Info faculty -->
            <div class="w-full py-5 flex space-x-4">
                <img
                    :src="getInfoFaculty.profilePic"
                    alt=""
                    class="
                        w-40
                        h-40
                        rounded-full
                        border-4
                        -mt-16
                        ml-16
                        border-gray-900
                        bg-gray-100
                    "
                />
                <div class="w-full">
                    <h1 class="mt-2 text-3xl font-semibold text-primary">
                        {{ getInfoFaculty.name }}
                    </h1>

                    <ul class="social flex space-x-4 text-sm text-gray-800">
                        <li>
                            <i class="mr-2 fas fa-phone"></i>
                            <span>{{ getInfoFaculty.phone }}</span>
                        </li>
                        <li>
                            <i class="mr-2 fab fa-facebook-f"></i>
                            <span>{{ getInfoFaculty.facebook }}</span>
                        </li>
                        <li>
                            <i class="mr-2 fas fa-mail-bulk"></i>
                            <span>{{ getInfoFaculty.email }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Main -->
        <div class="col-span-7">
            <div class="list-posts mx-7 my-5" v-if="getAllPost.length > 0">
                <Post v-for="post in getAllPost" :key="post.id" :post="post" />
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
                    This faculty doesn's notification ! Please wait for news!
                </h1>
            </div>
        </div>
        <Notify />
    </div>
</template>
<script>
import Post from "../components/Post.vue";
import Notify from "../components/Notify.vue";
import { mapGetters } from "vuex";
import NewNotify from "../components/NewNotify.vue";
import io from "socket.io-client";
export default {
    components: {
        Post,
        Notify,
        NewNotify,
    },
    computed: {
        ...mapGetters([
            "getAllPost",
            "getInfoFaculty",
            "getNotifyDetail",
            "getNotifyByFaculty",
        ]),
    },
    data() {
        return {
            PF: process.env.VUE_APP_PUBLIC_FOLDER,
            socket: io("http://localhost:5000"),
            bagde: false,
        };
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

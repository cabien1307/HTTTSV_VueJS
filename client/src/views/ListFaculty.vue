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
            gap-10
            px-10
            py-1
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
        <div
            class="
                col-span-3
                xl:col-span-3
                lg:col-span-4
                md:col-span-6
                sm:col-span-6
                xs:col-span-12
                w-full
                h-full
                mx-auto
                rounded-md
                shadow-lg
                px-2
                py-5
            "
            v-for="faculty in getAllFaculties"
            :key="faculty.id"
        >
            <div class="img w-full h-1/2">
                <img
                    :src="PF + faculty.profilePic"
                    class="w-4/5 h-full object-cover mx-auto"
                    :alt="faculty.img"
                />
            </div>
            <div class="text-center px-2 h-1/2">
                <div class="content h-3/5">
                    <router-link
                        :to="`/faculty/${faculty.slug}`"
                        class="
                            my-2
                            text-xl
                            font-semibold
                            text-primary
                            cursor-pointer
                            hover:text-red-500
                        "
                        >{{ faculty.name }}</router-link
                    >
                </div>
                <router-link :to="`/faculty/${faculty.slug}`"
                    ><button
                        class="
                            px-10
                            py-1
                            text-white
                            font-semibold
                            bg-primary
                            rounded-md
                            shadow-md
                            hover:bg-blue-500
                        "
                    >
                        GO
                    </button></router-link
                >
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import NewNotify from "../components/NewNotify.vue";
import io from "socket.io-client";
export default {
    computed: {
        ...mapGetters(["getAllFaculties", "getNotifyDetail"]),
    },
    data() {
        return {
            PF: process.env.VUE_APP_PUBLIC_FOLDER,
            socket: io("http://localhost:5000"),
            bagde: false,
        };
    },
    components: {
        NewNotify,
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

<style scoped>
.content a {
    word-wrap: break-word;
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
</style>

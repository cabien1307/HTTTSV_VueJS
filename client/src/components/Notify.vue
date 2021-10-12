<template>
    <div
        class="
            notify
            col-span-5
            xl:col-span-5
            lg:hidden
            md:hidden
            sm:hidden
            xs:hidden
            mr-4
            overflow-y-scroll
        "
    >
        <!-- Title -->
        <div class="title text-4xl font-semibold flex items-center">
            <i class="fas fa-newspaper mr-4 border-b-2 py-3 border-red-600"></i>
            <router-link to="/notification">
                <h1 class="text-red-500 cursor-pointer">
                    Notifications
                </h1></router-link
            >
        </div>
        <!-- List notify -->
        <div class="list-notify w-full mt-4" v-if="getAllNotify.length > 0">
            <ul>
                <li v-for="(notify, index) in getAllNotify" :key="index">
                    <router-link
                        :to="'/notification-detail/' + notify._id"
                        class="
                            flex flex-col
                            px-5
                            py-5
                            my-3
                            h-32
                            bg-gray-200
                            justify-between
                        "
                    >
                        <h1 class="text-base font-bold hover:text-red-600">
                            {{ notify.title }} - {{ notify.faculty.name }}
                        </h1>
                        <p class="date-time italic cursor-text">
                            Created at:{{
                                new Date(notify.createdAt).toLocaleDateString()
                            }}
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>

        <div v-else>
            <h1 class="text-xl font-semibold mt-5">
                {{
                    $route.params.slug
                        ? "This faculty don't have any notification."
                        : "We don't have any notification."
                }}
            </h1>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters(["getAllNotify"]),
    },
};
</script>

<style scoped>
.date-time {
    font-size: 13px;
}
.notify {
    height: calc(100vh - 50px);
    overflow-y: scroll;
}
::-webkit-scrollbar {
    width: 5px;
}
::-webkit-scrollbar-track {
    background-color: #e1e1e1;
}
::-webkit-scrollbar-thumb {
    background-color: teal;
}
::-webkit-scrollbar-corner {
    background: rgba(0, 0, 0, 0.5);
}
</style>

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
        v-if="getNotifyDetail"
    >
        <!-- Breadcumb -->
        <div
            class="
                col-span-12
                flex
                justify-between
                items-center
                px-5
                shadow-md
                rounded-lg
                mx-2
                my-3
                xl:mx-5
                lg:mx-3
                md:mx-3
                sm:mx-3
                xs:mr-0
            "
        >
            <div class="title-page">
                <h1
                    class="
                        text-4xl
                        font-semibold
                        py-2
                        xl:text-4xl
                        lg:text-3xl
                        md:text-2xl
                        sm:hidden
                        xs:hidden
                    "
                >
                    Notification detail
                </h1>
            </div>
            <BreadCumb />
        </div>

        <!-- Content -->
        <div
            class="
                col-span-12
                mx-5
                xl:mx-5
                lg:mx-3
                md:mx-3
                sm:mx-3
                xs:mr-0
                my-3
                bg-gray-200
                h-full
                flex flex-col
                rounded-md
                shadow-md
            "
        >
            <h1
                class="
                    text-center text-4xl
                    py-5
                    px-7
                    my-3
                    text-primary
                    font-bold
                "
            >
                {{ getNotifyDetail.title }} -
                {{ getNotifyDetail.faculty["name"] }}
            </h1>
            <div class="content my-3">
                <p
                    class="
                        flex
                        justify-end
                        px-5
                        italic
                        text-base text-blue-700
                        underline
                    "
                >
                    {{ getNotifyDetail.faculty["name"] }} |Date Created
                    {{
                        new Date(getNotifyDetail.createdAt).toLocaleDateString()
                    }}
                </p>
                <div class="main px-7 py-7 flex flex-col">
                    <p>
                        {{ getNotifyDetail.content }}
                    </p>

                    <span class="text-red-600 text-base my-2"
                        >If the attached file cannot be read, please contact the
                        technical team via TDTU Software Engineering fanpage
                        <a
                            class="underline text-primary"
                            target="blank"
                            href="https://www.facebook.com/tdtsoftware/"
                            >(here)</a
                        >.</span
                    >

                    <div
                        class="
                            box-attachment
                            w-full
                            h-auto
                            bg-green-300
                            px-5
                            py-3
                            rounded-md
                            border-2 border-blue-900
                        "
                        v-if="
                            getNotifyDetail.attachment
                                ? getNotifyDetail.attachment.length > 0
                                : false
                        "
                    >
                        <h1 class="font-bold mb-3 text-lg">
                            List of file attachment:
                        </h1>
                        <ol class="list-decimal space-y-2 px-3">
                            <li
                                class="w-full"
                                v-for="item in getNotifyDetail.attachment"
                                :key="item"
                            >
                                <a
                                    class="
                                        italic
                                        text-sm text-gray-700
                                        font-semibold
                                    "
                                    :href="PF + item"
                                    target="blank"
                                >
                                    {{ item }}
                                </a>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BreadCumb from "../components/Breadcumb.vue";
import { mapGetters } from "vuex";

export default {
    components: {
        BreadCumb,
    },
    computed: {
        ...mapGetters(["getNotifyDetail", "getUser"]),
    },
    data() {
        return {
            PF: process.env.VUE_APP_FILE,
        };
    },
    mounted() {
        this.$store.dispatch("readNotify", {
            notifyID: this.$route.params.id,
            data: {
                userID: this.getUser._id,
            },
        });
    },
};
</script>

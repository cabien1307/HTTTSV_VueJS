<template>
    <form
        @submit.prevent="updateInfo"
        class="detail w-full mt-3 relative px-3 pb-10 pt-3 rounded-lg"
    >
        <h1
            class="
                text-4xl
                font-bold
                my-3
                xl:text-left
                lg:text-center
                md:text-center
                sm:text-center
            "
        >
            Introduction
        </h1>
        <i
            v-if="isEdit"
            class="
                fas
                fa-times-circle
                absolute
                top-12
                right-0
                text-xl text-black
                cursor-pointer
            "
            title="Close"
            @click="isEdit = !isEdit"
        ></i>
        <ul class="flex flex-col space-y-4 text-xl">
            <li class="flex items-center">
                <div class="key w-1/3">
                    <i
                        class="
                            w-1/3
                            xl:w-1/3
                            lg:w-1/3
                            md:w-1/6
                            sm:w-1/6
                            fas
                            fa-user
                        "
                    ></i>
                    <span class="text-base italic">Name:</span>
                </div>
                <div class="value">
                    <h1
                        class="text-xl font-semibold"
                        :class="[isEdit ? 'hidden' : '']"
                    >
                        {{ user.username }}
                    </h1>
                    <input
                        v-if="isEdit"
                        type="text"
                        class="
                            focus:outline-none
                            text-base
                            px-5
                            py-2
                            border-b-2 border-gray-800
                            w-60
                        "
                        :value="user.username"
                        name="username"
                    />
                </div>
            </li>
            <li class="flex items-center">
                <div class="key w-1/3">
                    <i
                        class="
                            w-1/3
                            xl:w-1/3
                            lg:w-1/3
                            md:w-1/6
                            sm:w-1/6
                            fas
                            fa-birthday-cake
                        "
                    ></i>
                    <span class="text-base italic">Birth:</span>
                </div>
                <div class="value">
                    <h1
                        class="text-xl font-semibold"
                        :class="[isEdit ? 'hidden' : '']"
                    >
                        {{ moment(user.birthday).format("YYYY-MM-DD") }}
                    </h1>
                    <input
                        v-if="isEdit"
                        type="date"
                        class="
                            focus:outline-none
                            text-sm
                            px-3
                            py-2
                            border-b-2 border-gray-800
                            w-60
                        "
                        @input="onDateSelected"
                        :value="moment(user.birthday).format('YYYY-MM-DD')"
                        name="birthday"
                    />
                </div>
            </li>
            <li class="flex items-center">
                <div class="key w-1/3">
                    <i
                        class="
                            w-1/3
                            xl:w-1/3
                            lg:w-1/3
                            md:w-1/6
                            sm:w-1/6
                            fas
                            fa-graduation-cap
                        "
                    ></i>
                    <span class="text-base italic">Faculty:</span>
                </div>
                <div class="value">
                    <h1
                        class="text-xl font-semibold"
                        :class="[isEdit ? 'hidden' : '']"
                        v-if="user.role === 2"
                    >
                        {{ user.faculty ? user.faculty.name : "" }}
                    </h1>
                    <select
                        class="
                            w-full
                            focus:outline-none focus:ring-2 focus:ring-primary
                            py-1
                            rounded-md
                            px-2
                            text-center
                        "
                        v-if="user.role === 1"
                    >
                        <option value="" disabled hidden selected>
                            ---List role---
                        </option>

                        <option
                            v-for="faculty in getUser.listRolePost"
                            :key="faculty._id"
                            :value="faculty._id"
                            disabled
                        >
                            {{ faculty.name }}
                        </option>
                    </select>

                    <select
                        class="
                            w-60
                            focus:outline-none focus:ring-2 focus:ring-primary
                            py-1
                            rounded-md
                            px-2
                            text-center
                        "
                        v-if="user.role === 2 && isEdit"
                        name="faculty"
                    >
                        <option value="" disabled hidden selected>
                            ---List faculty---
                        </option>

                        <option
                            v-for="faculty in getAllFaculties"
                            :key="faculty._id"
                            :value="faculty._id"
                        >
                            {{ faculty.name }}
                        </option>
                    </select>
                </div>
            </li>
            <li class="flex items-center" v-if="getUser.role === 2">
                <div class="key w-1/3">
                    <i
                        class="
                            w-1/3
                            xl:w-1/3
                            lg:w-1/3
                            md:w-1/6
                            sm:w-1/6
                            fas
                            fa-book-open
                        "
                    ></i>
                    <span class="text-base italic">Major:</span>
                </div>
                <div class="value">
                    <h1
                        class="text-xl font-semibold"
                        :class="[isEdit ? 'hidden' : '']"
                    >
                        {{ user.major }}
                    </h1>
                    <input
                        v-if="isEdit"
                        type="text"
                        class="
                            focus:outline-none
                            border-b-2 border-gray-800
                            w-60
                            text-base
                            px-5
                            py-2
                        "
                        :value="user.major"
                        name="major"
                    />
                </div>
            </li>
            <li class="flex items-center" v-if="getUser.role === 2">
                <div class="key w-1/3">
                    <i
                        class="
                            w-1/3
                            xl:w-1/3
                            lg:w-1/3
                            md:w-1/6
                            sm:w-1/6
                            fas
                            fa-user-graduate
                        "
                    ></i>
                    <span class="text-base italic">Class:</span>
                </div>
                <div class="value">
                    <h1
                        class="text-xl font-semibold"
                        :class="[isEdit ? 'hidden' : '']"
                    >
                        {{ user.class }}
                    </h1>
                    <input
                        v-if="isEdit"
                        type="text"
                        class="
                            focus:outline-none
                            border-b-2 border-gray-800
                            w-60
                            text-base
                            px-5
                            py-2
                        "
                        :value="user.class"
                        name="class"
                    />
                </div>
            </li>
        </ul>
        <!-- btn edit -->
        <div v-if="$route.params.id === getUser._id">
            <button
                v-if="isEdit"
                class="
                    text-lg
                    font-semibold
                    w-full
                    mt-5
                    px-5
                    py-2
                    bg-blue-200
                    rounded-xl
                    hover:bg-blue-300
                "
            >
                Update
            </button>
            <button
                v-else
                @click="editMode"
                class="
                    text-lg
                    font-semibold
                    w-full
                    mt-5
                    px-5
                    py-2
                    bg-gray-200
                    rounded-xl
                    hover:bg-gray-300
                "
            >
                Edit detail
            </button>
        </div>
    </form>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
export default {
    computed: {
        ...mapGetters(["getUser", "getAllFaculties"]),
    },
    props: {
        user: {
            type: Object,
        },
    },
    data() {
        return {
            isEdit: false,
        };
    },
    methods: {
        updateInfo(e) {
            var data = {
                username: e.target.elements.username.value,
                birthday: e.target.elements.birthday.value,
            };
            if (this.getUser.role === 2) {
                data.faculty = e.target.elements.faculty.value;
                data.major = e.target.elements.major.value;
                data.class = e.target.elements.class.value;
            }
            Object.keys(data).forEach((key) => {
                if (data[key] === "") {
                    delete data[key];
                }
            });
            this.$store.dispatch("updateProfile", {
                userID: this.$route.params.id,
                data: data,
            });
            this.isEdit = !this.isEdit;
        },
        editMode() {
            this.isEdit = !this.isEdit;
        },
        moment,
    },
};
</script>

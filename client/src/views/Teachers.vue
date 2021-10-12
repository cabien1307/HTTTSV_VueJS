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
            px-3
        "
    >
        <!-- Breadcumb -->
        <div
            class="
                col-span-12
                flex
                justify-between
                items-center
                px-5
                py-2
                rounded-lg
                shadow-md
                h-16
                my-1
            "
        >
            <h1 class="text-xl font-semibold">Teacher Permission</h1>
            <Breadcumb />
        </div>

        <!-- Content -->
        <div
            class="
                col-start-3 col-end-11
                xl:col-start-3 xl:col-end-11
                lg:col-start-2 lg:col-end-12
                md:col-start-2 md:col-end-12
                sm:col-start-2 sm:col-end-12
                xs:col-start-2 xs:col-end-12
            "
        >
            <Toast v-if="showToast" :toast="toast" />
            <!-- Table -->
            <table class="w-full border-2 table-auto my-3">
                <tr
                    class="
                        text-lg text-center text-gray-500
                        border-b-2
                        bg-gray-30
                        h-10
                    "
                >
                    <th class="px-1">#</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Operator</th>
                </tr>
                <tr
                    class="text-center h-14 text-gray-700"
                    v-for="(teacher, index) in getTeachers"
                    :key="index"
                >
                    <td>{{ index + 1 }}</td>
                    <td>{{ teacher.username }}</td>
                    <td>
                        {{ teacher.role === 0 ? "ADMIN" : "TEACHER" }}
                    </td>
                    <td>
                        <button
                            class="
                                w-16
                                py-1.5
                                bg-blue-500
                                text-white
                                rounded-sm
                                text-sm
                                hover:bg-blue-400
                            "
                            @click="showModal(index)"
                        >
                            Edit
                        </button>
                        <button
                            class="
                                w-16
                                py-1.5
                                bg-red-500
                                hover:bg-red-400
                                rounded-sm
                                ml-3
                                text-white text-sm
                            "
                            @click="deleteUser(index)"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            </table>
        </div>

        <!-- Modal -->
        <form
            class="
                col-start-4 col-end-10
                xl:col-start-4 xl:col-end-10
                lg:col-start-2 lg:col-end-12
                md:col-start-2 md:col-end-12
                sm:col-start-2 sm:col-end-12
                xs:col-start-2 xs:col-end-12
                w-full
                my-3
                px-5
                py-5
                bg-gray-50
                absolute
                top-16
                text-sm
            "
            v-show="isShow"
            @submit.prevent="updateRole"
        >
            <!-- Header -->
            <div class="flex justify-between items-center border-b-2 pb-3">
                <h1 class="text-xl">Edit role</h1>
                <i
                    class="
                        fas
                        fa-times
                        text-xl
                        cursor-pointer
                        hover:text-gray-600
                    "
                    @click="closeModal"
                ></i>
            </div>
            <!-- Main -->
            <div class="border-b-2 py-2">
                <label for="name" class="flex items-center py-2">
                    <h1 class="w-1/5 font-bold text-gray-700">ID:</h1>
                    <input
                        id="name"
                        type="text"
                        class="
                            w-full
                            px-3
                            py-1.5
                            border-2
                            focus:outline-none
                            focus:ring-1
                            focus:border-blue-300
                            rounded-md
                            text-gray-700
                        "
                        v-model="user._id"
                        disabled
                    />
                </label>

                <label for="name" class="flex items-center py-2">
                    <h1 class="w-1/5 font-bold text-gray-700">Name:</h1>
                    <input
                        id="name"
                        type="text"
                        class="
                            w-full
                            px-3
                            py-1.5
                            border-2
                            focus:outline-none
                            focus:ring-1
                            focus:border-blue-300
                            rounded-md
                            text-gray-700
                        "
                        v-model="user.username"
                    />
                </label>

                <div class="checkboxOptions flex py-2" v-if="user.role === 1">
                    <h1 class="w-1/5 font-bold text-gray-700">Options:</h1>
                    <div class="w-full py-1.5 text-gray-700 space-y-1">
                        <label
                            class="input-group"
                            v-for="(faculty, index) in getAllFaculties"
                            :key="index"
                        >
                            <input
                                type="checkbox"
                                :value="faculty._id"
                                v-model="formData.listRolePost"
                                :checked="
                                    formData.listRolePost === faculty._id
                                        ? true
                                        : false
                                "
                            />
                            <span class="checkmark"></span>
                            {{ faculty.name }}
                        </label>
                    </div>
                </div>
            </div>
            <!-- Footer -->
            <div class="pt-5 text-white font-semibold">
                <div class="btn flex justify-end space-x-2">
                    <button
                        class="
                            px-5
                            py-2
                            rounded-md
                            hover:bg-green-400
                            bg-green-500
                        "
                        type="submit"
                    >
                        Apply
                    </button>
                    <button
                        class="px-5 py-2 rounded-md hover:bg-red-400 bg-red-500"
                        type="button"
                        @click="closeModal"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import Breadcumb from "../components/Breadcumb.vue";
import { mapGetters } from "vuex";
import Toast from "../components/Toast.vue";

export default {
    components: {
        Breadcumb,
        Toast,
    },
    computed: {
        ...mapGetters(["getAllFaculties", "getTeachers"]),
    },
    data() {
        return {
            formData: {
                username: "",
                listRolePost: [],
            },
            user: "",
            isShow: false,
            showToast: false,
            toast: {
                status: null,
                msg: "",
            },
        };
    },

    methods: {
        updateRole() {
            this.formData.username = this.user.username;

            if (this.user.role === 0) {
                delete this.formData["listRolePost"];
                this.$store.dispatch("updateProfile", {
                    userID: this.user._id,
                    data: this.formData,
                });
            } else {
                this.$store.dispatch("updateRole", {
                    userID: this.user._id,
                    data: this.formData,
                });
            }

            this.closeModal();
            this.handleToast(true, `Update success ! That's great !`);
        },
        getUserById(id) {
            this.user = this.getTeachers[id];
            this.formData.listRolePost = this.user.listRolePost;
        },
        showModal(id) {
            this.isShow = true;
            this.getUserById(id);
        },
        closeModal() {
            this.formData.listRolePost = [];
            this.isShow = false;
        },
        deleteUser(id) {
            if (
                confirm(
                    `Are you sure to delete ${this.getTeachers[id].username} ???`
                )
            ) {
                this.$store.dispatch("deleteUser", this.getTeachers[id]._id);
                this.handleToast(
                    true,
                    `Delete success ! Account has already deleted !`
                );
            } else {
                this.handleToast(
                    false,
                    `Delete failure ! Something went wrong !`
                );
            }
        },
        handleToast(status, msg) {
            this.showToast = true;
            this.toast = {
                status: status,
                msg: msg,
            };
        },
    },
};
</script>

<style scoped>
td,
th {
    border: 1px solid #e1e1e1;
}
/* The input-group */
.input-group {
    display: block;
    position: relative;
    padding-left: 35px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/* Hide the browser's default checkbox */
.input-group input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

/* Create a custom checkbox */
.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 15px;
    width: 15px;
    background-color: #eee;
}

/* On mouse-over, add a grey background color */
.input-group:hover input ~ .checkmark {
    background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.input-group input:checked ~ .checkmark {
    background-color: #2196f3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

/* Show the checkmark when checked */
.input-group input:checked ~ .checkmark:after {
    display: block;
}

/* Style the checkmark/indicator */
.input-group .checkmark:after {
    left: 6px;
    top: 4px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}
</style>

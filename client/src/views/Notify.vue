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
                header
                col-span-12
                flex
                justify-between
                items-center
                px-5
                shadow-md
                rounded-lg
                mx-2
                my-3
            "
        >
            <Toast v-if="showToast" :toast="toast" />
            <div
                class="
                    title-page
                    flex
                    items-center
                    space-x-3
                    py-2
                    text-gray-800
                "
            >
                <!-- Show when teacher and !showForm -->
                <i
                    class="
                        fas
                        fa-plus
                        cursor-pointer
                        hover:text-green-500
                        text-3xl text-gray-800
                    "
                    title="New notification"
                    @click="showForm"
                    v-if="!isShowForm && isTeacher"
                ></i>
                <h1
                    class="
                        text-4xl text-gray-800
                        xl:text-3xl
                        lg:text-lg
                        md:text-lg
                        sm:text-lg
                        xs:hidden
                    "
                >
                    List Notification
                </h1>
                <div
                    class="
                        absolute
                        w-3/5
                        left-1/2
                        transform
                        top-24
                        -translate-x-1/2
                        bg-green-200
                        rounded-md
                        shadow-md
                        text-base
                    "
                    v-if="isShowForm"
                >
                    <div class="title flex justify-between px-5 py-3 text-3xl">
                        <h1>Add notification</h1>
                        <i
                            class="
                                fas
                                fa-times
                                cursor-pointer
                                hover:text-red-500
                            "
                            @click="isShowForm = false"
                        ></i>
                    </div>
                    <form @submit.prevent="createNotify" class="px-5 py-3">
                        <div class="form-group py-2 flex flex-col">
                            <label class="text-lg font-semibold" for="title"
                                >Title:</label
                            >
                            <input
                                id="title"
                                class="
                                    px-5
                                    py-3
                                    rounded-md
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-60
                                    text-primary
                                    font-semibold
                                "
                                type="text"
                                placeholder="Enter title..."
                                v-model="title"
                            />
                        </div>
                        <div class="form-group py-2 flex flex-col">
                            <label class="text-lg font-semibold" for="title"
                                >Faculty:</label
                            >
                            <select
                                class="
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-600
                                    px-5
                                    py-2
                                    rounded-sm
                                "
                                v-model="faculty"
                            >
                                <option value="" selected disabled hidden>
                                    ---Select faculty---
                                </option>
                                <option
                                    v-for="item in getUser.listRolePost"
                                    :key="item"
                                    :value="item._id"
                                >
                                    {{ item.name }}
                                </option>
                            </select>
                        </div>
                        <div class="form-group py-2 flex flex-col">
                            <label class="text-lg font-semibold" for="content"
                                >Content:</label
                            >
                            <textarea
                                class="
                                    px-5
                                    py-3
                                    rounded-md
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-60
                                    text-gray-900
                                "
                                id="content"
                                placeholder="Content here..."
                                rows="5"
                                v-model="content"
                            ></textarea>
                        </div>

                        <div
                            class="form-group py-2 flex flex-col"
                            v-if="!isEdit"
                        >
                            <label class="text-lg font-semibold" for="title"
                                >Attachment:</label
                            >
                            <input
                                id="title"
                                multiple="multiple"
                                class="px-5 py-3 rounded-md focus:outline-none"
                                type="file"
                                @change="onFileChange"
                            />
                        </div>
                        <div class="form-group flex justify-center">
                            <button
                                class="
                                    px-5
                                    py-2
                                    rounded-md
                                    bg-blue-500
                                    text-white
                                    font-semibold
                                    hover:bg-blue-400
                                "
                            >
                                {{ isEdit ? "UPDATE" : "ADD" }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Breadcumb />
        </div>

        <div class="list-notification col-span-12 mx-5 my-4 flex flex-col">
            <!-- Filter -->
            <form class="flex justify-between items-center px-5 py-3">
                <div class="input-form w-4/5 flex space-x-5">
                    <input
                        type="text"
                        class="
                            focus:outline-none
                            bg-gray-200
                            rounded-3xl
                            text-base
                            px-5
                            py-2
                            w-2/5
                        "
                        placeholder="Search by notification name...."
                    />
                    <input
                        type="text"
                        class="
                            focus:outline-none
                            bg-gray-200
                            rounded-3xl
                            text-base
                            px-5
                            py-2
                            w-2/5
                        "
                        placeholder="Search by notification subject...."
                    />
                </div>
                <div class="btn-submit">
                    <button
                        class="
                            px-5
                            py-2
                            bg-blue-500
                            rounded-md
                            text-white
                            font-semibold
                            space-x-1
                        "
                    >
                        <i class="fas fa-search"></i>
                        <span class="sm:hidden xs:hidden">Search</span>
                    </button>
                </div>
            </form>
            <!-- Pagination -->
            <Pagination
                :totalPages="totalPages"
                :perPage="perPage"
                :currentPage="currentPage"
                @pagechanged="onPageChange"
            />
            <!-- List of notify -->
            <div class="list mt-2">
                <ul>
                    <li
                        v-for="(item, index) in listItem"
                        :key="index"
                        class="
                            px-3
                            py-2
                            flex flex-col
                            justify-between
                            space-y-2
                            rounded-lg
                            my-2
                        "
                        :class="[
                            index % 2 === 0 ? 'bg-gray-100' : 'bg-blue-100',
                        ]"
                    >
                        <div class="title flex items-center space-x-2">
                            <router-link
                                :to="'/notification-detail/' + item._id"
                                class="
                                    title-name
                                    text-xl text-primary
                                    font-semibold
                                    hover:text-red-500
                                "
                            >
                                {{ item.title }} - {{ item.faculty.name }}
                            </router-link>
                            <!-- Option read/ edit/ delete -->
                            <!-- isTeacher -->
                            <div
                                class="option flex items-center space-x-1"
                                v-if="
                                    isTeacher &&
                                    $store.getters.getUser._id === item.userID
                                "
                            >
                                <i
                                    class="
                                        fas
                                        fa-edit
                                        text-blue-500
                                        cursor-pointer
                                    "
                                    title="Edit"
                                    @click="editNotify(item._id)"
                                ></i>
                                <i
                                    class="
                                        fas
                                        fa-trash
                                        text-red-500
                                        cursor-pointer
                                    "
                                    title="Delete"
                                    @click="deleteNotify(item._id)"
                                ></i>
                            </div>
                            <!-- Student -->
                            <div
                                class="option flex items-center space-x-1"
                                v-else
                            >
                                <i class="fas fa-star text-yellow-500"></i>
                                <i
                                    v-if="!item.read.includes(getUser._id)"
                                    class="fab fa-readme text-red-500"
                                    title="Unread"
                                ></i>
                            </div>
                        </div>

                        <p class="italic text-sm">
                            Please see the details in the attached file
                        </p>

                        <div
                            class="
                                desc
                                flex
                                justify-between
                                xl:flex-row
                                lg:flex-grow
                                md:flex-col
                                sm:flex-col
                            "
                        >
                            <router-link
                                :to="'/notification-detail/' + item._id"
                                class="text-primary"
                                >Notification details file</router-link
                            >
                            <span class="text-sm italic text-gray-500"
                                >{{ item.faculty.name }} | Date Created
                                {{
                                    new Date(
                                        item.createdAt
                                    ).toLocaleDateString()
                                }}</span
                            >
                        </div>
                    </li>
                </ul>
            </div>

            <!-- Pagination -->
            <Pagination
                :totalPages="totalPages"
                :perPage="perPage"
                :currentPage="currentPage"
                @pagechanged="onPageChange"
            />
        </div>
    </div>
</template>

<script>
import Breadcumb from "../components/Breadcumb.vue";
import Pagination from "../components/Pagination.vue";
import Toast from "../components/Toast.vue";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { uploadFile } from "../api/notify";
import io from "socket.io-client";

export default {
    setup() {
        const socket = io("http://localhost:5000");

        const store = useStore();

        var listNotifications = computed(() => store.getters.getAllNotify);

        watch(
            () => store.getters.getAllNotify,
            () => {
                changeContent();
            }
        );

        var listItem = ref([]);
        let perPage = ref(5);
        let totalPages =
            Math.round(listNotifications.value.length / perPage.value) === 0
                ? Math.round(listNotifications.value.length / perPage.value) + 1
                : Math.round(listNotifications.value.length / perPage.value);
        var currentPage = ref(1);
        var start = ref(0);
        var end = ref(perPage.value);

        var isShowForm = ref(false);
        var isTeacher = store.getters.getUser.role === 1;
        var isEdit = ref(false);

        var title = ref("");
        var content = ref("");
        var faculty = ref("");
        var file = ref("");
        var idItemEdit = ref("");

        const getUser = store.getters.getUser;

        // Toast
        var showToast = ref(false);
        var toast = ref({
            status: null,
            msg: "",
        });

        function handleToast(status, msg) {
            showToast.value = true;
            toast.value = {
                status: status,
                msg: msg,
            };
        }

        function showForm() {
            isShowForm.value = !isShowForm.value;
            title.value = "";
            content.value = "";
            faculty.value = "";
        }

        function changeContent() {
            listItem.value = [];
            listNotifications.value.map((item, index) => {
                if (index >= start.value && index < end.value) {
                    listItem.value.push(item);
                }
            });
        }
        changeContent();

        function createNotify() {
            const newNotify = {
                title: title.value,
                content: content.value,
                faculty: faculty.value,
            };
            if (file.value) {
                const data = new FormData();
                const filename = Date.now() + file.value.name;

                data.append("name", filename);
                data.append("file", file.value);

                newNotify.attachment = filename;

                uploadFile(data);

                // Create
                store.dispatch("createNotify", {
                    userID: store.getters.getUser._id,
                    data: newNotify,
                });
                handleToast(true, "Create notify success! Have a nice day!");
                socket.emit("new-notify");
            } else {
                // Update
                if (isEdit.value) {
                    newNotify.userID = store.getters.getUser._id;
                    store.dispatch("updateNotify", {
                        notifyID: idItemEdit.value,
                        data: newNotify,
                    });
                    handleToast(
                        true,
                        "Update success! Lorem Ipsum is simply dummy text !"
                    );
                } else {
                    // Create
                    store.dispatch("createNotify", {
                        userID: store.getters.getUser._id,
                        data: newNotify,
                    });
                    handleToast(
                        true,
                        "Create notify success! Have a nice day!"
                    );
                    socket.emit("new-notify");
                }
            }
            showForm();
        }

        function editNotify(id) {
            idItemEdit.value = id;
            isEdit.value = true;
            isShowForm.value = true;
            // Get API notification detail by id

            const found = listNotifications.value.find(
                (idItem) => idItem._id === id
            );
            title.value = found.title;
            faculty.value = found.faculty._id;
            content.value = found.content;
        }

        function deleteNotify(id) {
            if (confirm("Are you sure to delete this notification ?")) {
                const data = {
                    userID: store.getters.getUser._id,
                };
                store.dispatch("deleteNotifify", {
                    notifyID: id,
                    data,
                });
                handleToast(
                    true,
                    "Delete success! Do you want to create new notify!"
                );
            } else {
                handleToast(false, "Delete failure! Something went wrong !");
                return false;
            }
        }

        function onPageChange(page) {
            currentPage.value = page.crtPage;
            start.value = (page.crtPage - 1) * perPage.value;
            end.value = page.crtPage * perPage.value;
            changeContent();
        }

        function onFileChange(e) {
            file.value = e.target.files[0];
        }

        return {
            onPageChange,
            currentPage,
            listItem,
            perPage,
            totalPages,
            isShowForm,
            showForm,
            isTeacher,
            editNotify,
            deleteNotify,
            title,
            content,
            faculty,
            isEdit,
            getUser,
            createNotify,
            onFileChange,
            showToast,
            toast,
        };
    },
    components: {
        Breadcumb,
        Pagination,
        Toast,
    },
};
</script>

<style scoped>
.title-name {
    word-wrap: break-word;
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}
</style>

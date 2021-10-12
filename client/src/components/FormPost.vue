<template>
    <form
        @submit.prevent="createPost"
        class="
            form
            mx-7
            my-1
            xl:mx-1
            lg:mx-3
            md:mx-2
            sm:mx-1
            xs:mx-1
            md:my-0
            sm:my-0
            xs:my-0
            py-2
            flex flex-col
            justify-between
            rounded-xl
            shadow-lg
        "
    >
        <!-- Preview image before share -->
        <div class="previewContainer relative mb-2 px-3" v-if="urlImg">
            <img :src="urlImg" class="w-full object-cover" />
            <i
                class="
                    fas
                    fa-times-circle
                    absolute
                    top-0
                    right-3
                    text-2xl text-white
                    cursor-pointer
                "
                @click="closePreview"
            ></i>
        </div>

        <div class="content flex justify-between px-3">
            <img
                :src="
                    getUser.authType === 'local'
                        ? getUser.profilePic
                            ? PF + getUser.profilePic
                            : PF + 'profile_pic.svg'
                        : getUser.authType === 'google' &&
                          getUser.profilePic.includes('https://')
                        ? getUser.profilePic
                        : PF + getUser.profilePic
                "
                class="w-12 h-12 rounded-full"
                alt=""
            />
            <input
                type="text"
                class="
                    flex-1
                    mx-4
                    px-3
                    focus:outline-none
                    border-b-2 border-gray-700
                "
                :placeholder="`What's on your mind ${$store.getters.getUser.username} ?`"
                v-model="title"
            />
        </div>
        <div class="img-post mt-2 px-3">
            <input
                type="file"
                multiple="multiple"
                id="isPhotoId"
                @change="onFileChange"
                accept=".png,.jpeg,.jpg,.jfif"
                hidden
            />
            <ul class="flex justify-around items-center">
                <li>
                    <label for="isPhotoId">
                        <i class="fas fa-photo-video text-red-600 mx-2"></i>
                        <span class="md:hidden sm:hidden xs:hidden">
                            Photo or video</span
                        >
                    </label>
                </li>
                <div class="flex" v-if="getUser.role === 2">
                    <li
                        v-for="(icon, index) in list_icons"
                        :key="index"
                        class="
                            cursor-pointer
                            py-2
                            px-5
                            rounded-xl
                            hover:bg-blue-100
                        "
                    >
                        <label
                            :for="[
                                icon.name === 'Photo or video' ? isPhotoId : '',
                            ]"
                        >
                            <i :class="icon.icon" class="mx-2"></i>
                            <span class="md:hidden sm:hidden xs:hidden">
                                {{ icon.name }}</span
                            >
                        </label>
                    </li>
                </div>

                <li v-else-if="getUser.role === 1 || getUser.role === 0">
                    <select
                        class="
                            w-full
                            focus:outline-none focus:ring-2 focus:ring-primary
                            py-1
                            rounded-md
                            px-2
                        "
                        v-model="faculty"
                        required
                    >
                        <option value="" disabled hidden selected>
                            ---Select faculty---
                        </option>

                        <option
                            v-for="facultyRole in getUser.listRolePost"
                            :key="facultyRole._id"
                            :value="facultyRole._id"
                        >
                            {{ facultyRole.name }}
                        </option>
                    </select>
                </li>

                <li class="cursor-pointer py-2">
                    <button
                        class="
                            py-2
                            px-5
                            text-white
                            font-semibold
                            rounded-lg
                            shadow-lg
                            bg-green-500
                            hover:bg-green-400
                        "
                        type="submit"
                    >
                        Share
                    </button>
                </li>
            </ul>
        </div>
    </form>
</template>

<script>
import { reactive, ref } from "vue";
import { LIST_ICONS_POST } from "../constant/index";
import { mapGetters, useStore } from "vuex";
import { uploadImg } from "../api/post";
import { useRoute } from "vue-router";
export default {
    computed: {
        ...mapGetters(["getUser"]),
    },
    setup() {
        var urlImg = ref(null);
        var img = ref(null);
        const list_icons = LIST_ICONS_POST;
        var isPhotoId = ref("isPhotoId");

        var newPost = reactive({
            userID: "",
            title: "",
            faculty: "",
        });

        const route = useRoute();

        const title = ref("");
        const faculty = ref("");
        const store = useStore();

        const PF = process.env.VUE_APP_PUBLIC_FOLDER;

        function onFileChange(e) {
            const file = e.target.files[0];
            img.value = file;
            urlImg.value = window.URL.createObjectURL(file);
        }

        function closePreview() {
            urlImg.value = null;
        }

        async function createPost() {
            if (!title.value) {
                return false;
            } else {
                newPost = {
                    userID: store.state.user.userInfo._id,
                    title: title.value,
                };
                if (faculty.value) {
                    newPost.faculty = faculty.value;
                }

                // console.log(newPost);
                if (urlImg.value) {
                    const fileName = Date.now() + img.value.name;

                    const data = new FormData();
                    data.append("name", fileName);
                    data.append("file", img.value);

                    newPost.img = fileName;
                    try {
                        uploadImg(data);
                        store.dispatch("createPost", {
                            data: newPost,
                            key: route.params.id,
                        });

                        closePreview();
                        title.value = "";
                        faculty.value = "";
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    store.dispatch("createPost", {
                        data: newPost,
                        key: route.params.id,
                    });
                    title.value = "";
                    faculty.value = "";
                }
            }
        }
        return {
            onFileChange,
            closePreview,
            urlImg,
            list_icons,
            isPhotoId,
            PF,
            createPost,
            title,
            faculty,
        };
    },
};
</script>

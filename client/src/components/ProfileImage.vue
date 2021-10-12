<template>
    <!-- Avatar -->
    <div class="col-span-12 h-auto pb-24 border-b-2">
        <div class="coverPic relative right-0 xs:px-2">
            <!-- Cover picture -->
            <img
                :src="
                    user.authType === 'local'
                        ? user.coverPic
                            ? PF + user.coverPic
                            : PF + 'phongnha.jpg'
                        : user.coverPic
                        ? PF + user.coverPic
                        : PF + 'tdtu.jpg'
                "
                class="w-full object-cover h-80 xs:ml-4"
                alt=""
            />

            <!-- Preview Cover -->
            <div class="absolute top-0 w-full" v-if="urlCoverPic">
                <img
                    class="w-full object-cover h-80 xs:ml-4"
                    :src="urlCoverPic"
                    alt=""
                />
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
            <!-- Update cover picture -->
            <form
                @submit.prevent="updateCoverPic"
                v-if="$route.params.id === getUser._id"
                class="
                    update-cover
                    absolute
                    right-2
                    bottom-2
                    flex
                    py-2
                    px-4
                    bg-white
                    rounded-lg
                    items-center
                    text-base
                    font-semibold
                    cursor-pointer
                "
            >
                <label
                    class="flex items-center cursor-pointer"
                    for="isCoverId"
                    v-if="!urlCoverPic"
                >
                    <i class="fas fa-camera mr-2"></i>
                    <h3>Update cover picture</h3>
                </label>
                <button
                    v-else
                    type="submit"
                    class="flex items-center space-x-2 font-semibold"
                >
                    <i class="fas fa-check cursor-pointer" title="Update"></i>
                    <h3>Update</h3>
                </button>
                <input
                    type="file"
                    multiple="multiple"
                    id="isCoverId"
                    @change="onCoverChange"
                    accept=".png,.jpeg,.jpg,.jfif"
                    hidden
                />
            </form>

            <!-- Profile picture -->
            <div
                class="
                    profilePic
                    absolute
                    bottom-0
                    left-1/2
                    transform
                    -translate-x-1/2
                    translate-y-1/4
                    w-44
                    h-44
                    rounded-full
                "
            >
                <img
                    class="w-44 h-44 rounded-full object-cover border-4"
                    :src="
                        user.authType === 'local'
                            ? user.profilePic
                                ? PF + user.profilePic
                                : PF + 'profile_pic.svg'
                            : user.authType === 'google' &&
                              user.profilePic.includes('https://')
                            ? user.profilePic
                            : PF + user.profilePic
                    "
                    alt=""
                />

                <!-- Preview profile -->
                <div class="absolute top-0" v-if="urlProfilePic">
                    <img
                        class="w-44 h-44 object-cover rounded-full"
                        :src="urlProfilePic"
                        alt=""
                    />
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

                <!--Form Update profile picture -->
                <form
                    v-if="$route.params.id === getUser._id"
                    @submit.prevent="updateProfilePic"
                    class="
                        update-profile
                        absolute
                        right-4
                        bottom-2
                        text-xl
                        w-9
                        h-9
                        bg-gray-300
                        hover:bg-gray-100
                        rounded-full
                        flex
                        justify-center
                        items-center
                        cursor-pointer
                    "
                >
                    <label for="isProfileId" v-if="!urlProfilePic">
                        <i class="fas fa-camera cursor-pointer"></i>
                    </label>
                    <button v-else type="submit">
                        <i
                            class="fas fa-check cursor-pointer"
                            title="Update"
                        ></i>
                    </button>

                    <input
                        type="file"
                        multiple="multiple"
                        id="isProfileId"
                        @change="onProfileChange"
                        accept=".png,.jpeg,.jpg,.jfif"
                        hidden
                    />
                </form>
            </div>
            <!-- Name of user -->
            <h1
                class="
                    text-center text-3xl
                    font-semibold
                    w-full
                    absolute
                    -bottom-20
                    xl:-bottom-20
                    lg:-bottom-20
                    md:-bottom-24
                    sm:-bottom-28
                    xs:-bottom-28
                    left-1/2
                    transform
                    -translate-x-1/2
                "
            >
                {{ user.username }}
            </h1>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { uploadImg } from "../api/post";
export default {
    props: {
        user: {
            type: Object,
        },
    },
    computed: {
        ...mapGetters(["getUser"]),
    },
    data() {
        return {
            PF: process.env.VUE_APP_PUBLIC_FOLDER,
            urlProfilePic: null,
            profilePic: null,
            urlCoverPic: null,
            coverPic: null,
        };
    },

    methods: {
        closePreview() {
            this.urlProfilePic = null;
            this.urlCoverPic = null;
        },
        onProfileChange(e) {
            const file = e.target.files[0];
            this.profilePic = file;
            this.urlProfilePic = window.URL.createObjectURL(file);
        },
        onCoverChange(e) {
            const file = e.target.files[0];
            this.coverPic = file;
            this.urlCoverPic = window.URL.createObjectURL(file);
        },

        updateCoverPic() {
            if (this.coverPic) {
                const fileName = Date.now() + this.coverPic.name;
                const data = new FormData();

                data.append("name", fileName);
                data.append("file", this.coverPic);

                const newCoverPic = {
                    coverPic: fileName,
                };

                uploadImg(data);
                this.$store.dispatch("updateProfile", {
                    userID: this.$route.params.id,
                    data: newCoverPic,
                });

                this.urlCoverPic = null;
            }
        },

        updateProfilePic() {
            if (this.profilePic) {
                const fileName = Date.now() + this.profilePic.name;
                const data = new FormData();

                data.append("name", fileName);
                data.append("file", this.profilePic);

                const newProfilePic = {
                    profilePic: fileName,
                };

                uploadImg(data);
                this.$store.dispatch("updateProfile", {
                    userID: this.$route.params.id,
                    data: newProfilePic,
                });

                this.urlProfilePic = null;
            }
        },
    },
};
</script>

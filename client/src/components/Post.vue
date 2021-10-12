<template>
    <div class="wrapper w-full shadow-lg rounded-lg my-5">
        <!-- Img createdAt -->
        <div
            class="
                top
                flex
                justify-between
                items-center
                mx-2
                px-3
                py-2
                relative
            "
        >
            <div class="profile h-12 flex justify-between items-center">
                <img
                    :src="
                        post.userID.authType === 'local'
                            ? post.userID.profilePic
                                ? PF + post.userID.profilePic
                                : PF + 'profile_pic.svg'
                            : post.userID.authType === 'google' &&
                              post.userID.profilePic.includes('https://')
                            ? post.userID.profilePic
                            : PF + post.userID.profilePic
                    "
                    alt=""
                    class="
                        w-12
                        h-12
                        rounded-full
                        object-cover
                        border-2
                        shadow-lg
                    "
                />
                <div class="owner ml-2">
                    <router-link
                        :to="`/profile/${post.userID._id}`"
                        class="owner-post text-base font-semibold"
                        >{{ post.userID.username }}
                    </router-link>
                    <p class="text-sm italic">{{ timeAgo(post.createdAt) }}</p>

                    <!-- If teacher then show -->
                    <div class="text-xs font-mono" v-if="post.faculty">
                        <i class="fas fa-university"></i>
                        <span class="ml-2">{{ post.faculty.name }}</span>
                    </div>
                </div>
            </div>

            <!-- Check post of user is a current user -->
            <div v-if="getUser._id === post.userID._id" class="space-x-2">
                <i
                    class="fas fa-edit cursor-pointer text-blue-500"
                    @click="isEditForm"
                ></i>
                <i
                    class="fas fa-trash cursor-pointer text-red-600"
                    @click="deletePost"
                ></i>
            </div>
        </div>

        <!-- Content -->
        <div class="content my-2 mx-2">
            <h1 v-if="!isEdit" class="ml-3 mb-2 font-semibold">
                {{ post.title }}
            </h1>
            <form v-else @submit.prevent="updateTitle">
                <div class="title flex">
                    <input
                        type="text"
                        class="
                            px-3
                            py-2
                            bg-gray-300
                            w-full
                            focus:outline-none
                            rounded-2xl
                            my-2
                        "
                        v-model="titleUpdated"
                    />
                    <i
                        class="fas fa-times cursor-pointer hover:text-red-500"
                        @click="isEdit = false"
                    ></i>
                </div>
                <button
                    type="submit"
                    class="
                        px-2
                        py-1
                        text-white text-sm
                        font-semibold
                        bg-blue-500
                        hover:bg-blue-400
                        rounded-md
                        mb-2
                        float-right
                        mx-2
                    "
                >
                    UPDATE
                </button>
            </form>
            <div class="img-post w-full" v-if="post.img">
                <img
                    class="w-full h-auto rounded-lg"
                    :src="PF + post.img"
                    alt=""
                />
            </div>
        </div>

        <!-- Interact -->
        <div class="interact mx-2">
            <div class="interact-info border-b-2 py-2">
                <!-- Like heart comment detail-->
                <div class="like flex justify-between">
                    <div class="btn-like px-2 flex items-center">
                        <i
                            @click="handleLiked"
                            class="
                                cursor-pointer
                                w-6
                                h-6
                                text-sm text-white
                                flex
                                justify-center
                                items-center
                                rounded-full
                                fas
                                fa-thumbs-up
                                bg-blue-600
                            "
                        ></i>
                        <i
                            @click="handleLiked"
                            class="
                                cursor-pointer
                                w-6
                                h-6
                                mr-2
                                text-sm text-white
                                flex
                                justify-center
                                items-center
                                rounded-full
                                fas
                                fa-heart
                                bg-red-600
                            "
                        ></i>
                        <p>{{ post.likes.length }} others</p>
                    </div>
                    <div class="count-comment mr-3">
                        <p>{{ post.comments.length }} comments</p>
                    </div>
                </div>
            </div>

            <!-- Button like comment -->
            <div class="interact-btn flex justify-between py-1">
                <button
                    class="mx-2 px-12 py-2 hover:bg-gray-100"
                    @click="handleLiked(post._id)"
                    :class="[isLiked ? 'text-blue-800' : '']"
                >
                    <div class="icon">
                        <i class="far fa-thumbs-up"></i>
                        Like
                    </div>
                </button>
                <button
                    @click="isShowCommentBox"
                    class="mx-2 px-12 py-2 hover:bg-gray-100"
                >
                    <i class="fas fa-comment-alt"></i> Comments
                </button>
            </div>

            <!-- Comment -->
            <div class="comments px-2 border-t-2" v-if="isShowComment">
                <!-- Write commet -->
                <div class="write-comment flex mb-5 mt-2">
                    <img
                        :src="
                            getUser
                                ? getUser.authType === 'local'
                                    ? getUser.profilePic
                                        ? PF + getUser.profilePic
                                        : PF + 'profile_pic.svg'
                                    : getUser.authType === 'google' &&
                                      getUser.profilePic.includes('https://')
                                    ? getUser.profilePic
                                    : PF + getUser.profilePic
                                : false
                        "
                        alt=""
                        class="avt w-10 h-10 rounded-full shadow-md"
                    />

                    <input
                        @keyup.enter.prevent="comment"
                        type="text"
                        class="
                            flex-1
                            ml-3
                            border-none
                            bg-gray-100
                            focus:outline-none
                            rounded-3xl
                            px-5
                        "
                        placeholder="Write your comment..."
                        v-model="contentComment"
                    />
                </div>
                <!-- List comment -->
                <div class="list-comments pb-2">
                    <ul>
                        <li
                            class="my-5 pl-2"
                            v-for="comment in post.comments"
                            :key="comment._id"
                            :class="[
                                comment.userID._id === getUser._id
                                    ? 'border-l-2 border-green-500'
                                    : '',
                            ]"
                        >
                            <div class="user-commemt flex items-center">
                                <img
                                    class="w-8 h-8 mr-4 rounded-full"
                                    :src="
                                        comment.userID.authType === 'local'
                                            ? comment.userID.profilePic
                                                ? PF + comment.userID.profilePic
                                                : PF + 'profile_pic.svg'
                                            : comment.userID.authType ===
                                                  'google' &&
                                              comment.userID.profilePic.includes(
                                                  'https://'
                                              )
                                            ? comment.userID.profilePic
                                            : PF + comment.userID.profilePic //If wether gg/fb type
                                    "
                                    alt=""
                                />
                                <div
                                    class="
                                        content
                                        px-3
                                        py-2
                                        bg-blue-100
                                        rounded-xl
                                        relative
                                        w-auto
                                        mb-1
                                    "
                                >
                                    <div>
                                        <h5
                                            class="text-base font-semibold pr-5"
                                        >
                                            {{ comment.userID.username }}
                                        </h5>
                                        <!-- Comment -->
                                        <p class="text-sm">
                                            {{ comment.content }}
                                        </p>
                                    </div>
                                    <span
                                        class="
                                            absolute
                                            italic
                                            text-xs
                                            right-0
                                            -bottom-4
                                        "
                                    >
                                        {{ timeAgo(comment.createdAt) }}
                                    </span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { format } from "timeago.js";
import { mapGetters } from "vuex";
export default {
    props: {
        post: Object,
    },
    computed: {
        ...mapGetters(["getUser"]),
    },
    data() {
        return {
            isLiked: this.post.likes.includes(
                this.$store.state.user.userInfo._id
            ),
            isEdit: false,
            isShowComment: false,
            contentComment: "",
            titleUpdated: this.post.title,
            PF: process.env.VUE_APP_PUBLIC_FOLDER,
            params: this.$route.params.id,
        };
    },
    methods: {
        handleLiked(id) {
            const data = {
                userID: this.getUser._id,
            };
            if (this.isLiked) {
                this.setLikeAjax(id, data);
            } else {
                this.setLikeAjax(id, data);
            }
        },

        setLikeAjax(postID, userID) {
            this.$store.dispatch("setLike", {
                postID,
                userID,
                key: this.params,
            });
            this.isLiked = !this.isLiked;
        },

        isEditForm() {
            this.isEdit = !this.isEdit;
        },

        comment(e) {
            e.preventDefault();
            if (!this.contentComment) {
                return false;
            } else {
                const data = {
                    postID: this.post._id,
                    userID: this.$store.getters.getUser._id,
                    content: this.contentComment,
                };

                this.$store.dispatch("createComment", {
                    data,
                    key: this.params,
                });
                this.contentComment = "";
            }
        },

        isShowCommentBox() {
            this.isShowComment = !this.isShowComment;
        },

        updateTitle() {
            const params = this.post._id;
            const data = {
                params: params,
                body: {
                    userID: this.getUser._id,
                    title: this.titleUpdated,
                },
            };

            this.$store.dispatch("updatePost", { data, key: this.params });
            this.isEdit = false;
        },

        deletePost() {
            const data = {
                postID: this.post._id,
                body: {
                    userID: this.getUser._id,
                },
            };
            if (confirm("Are you sure to delete this post !")) {
                this.$store.dispatch("deletePost", { data, key: this.params });
            } else {
                return false;
            }
            this.$emit("showToast", {
                status: true,
                msg: "Delete success! You just deleted one of your post !",
            });
        },
    },
    setup() {
        // countLiked.value = post.value.liked;
        function timeAgo(time) {
            return format(time);
        }
        return {
            timeAgo,
        };
    },
};
</script>

<style scoped>
.content {
    position: relative;
}
.content::before {
    content: "";
}

.my-comment {
    border-left: 2px solid teal;
}
.isLiked {
    color: blue;
    font-weight: 500;
}
</style>

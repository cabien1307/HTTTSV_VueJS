<template>
    <div>
        <Loading v-if="isPending" />
        <div
            v-else
            class="
                navbar
                fixed
                top-0
                left-0
                bottom-0
                px-4
                w-2/12
                xl:w-2/12
                lg:w-16
                md:w-16
                sm:w-16
                xs:w-16
                flex flex-col
                justify-between
            "
        >
            <!-- Sidebar top -->
            <div class="top-sidebar w-full mt-2 flex flex-col justify-around">
                <!-- Brand -->
                <div
                    class="
                        nav-brand
                        w-full
                        flex
                        justify-between
                        items-center
                        px-2
                        py-5
                        border-b-2
                    "
                >
                    <img
                        :src="require('../assets/images/education.svg')"
                        alt=""
                        class="w-1/2 h-auto xl:w-full xl:h-auto"
                    />
                </div>

                <!-- Main menu -->
                <div class="nav-menu mt-3 flex flex-col">
                    <router-link
                        to="/"
                        class="item-nav px-2 text-white text-base py-2 my-2"
                    >
                        <i class="w-10 fas fa-home"></i>
                        <span
                            class="
                                xl:inline-block
                                lg:hidden
                                md:hidden
                                sm:hidden
                                xs:hidden
                            "
                            >Home</span
                        >
                    </router-link>
                    <router-link
                        to="/faculties"
                        class="item-nav px-2 text-white text-base py-2 my-2"
                    >
                        <i class="w-10 fas fa-university"></i>
                        <span
                            class="
                                xl:inline-block
                                lg:hidden
                                md:hidden
                                sm:hidden
                                xs:hidden
                            "
                            >Faculties</span
                        >
                    </router-link>
                    <router-link
                        v-if="getUser.role === 0"
                        to="/teachers"
                        class="item-nav px-2 text-white text-base py-2 my-2"
                    >
                        <i class="w-10 fas fa-chalkboard-teacher"></i>
                        <span
                            class="
                                xl:inline-block
                                lg:hidden
                                md:hidden
                                sm:hidden
                                xs:hidden
                            "
                            >Teachers</span
                        >
                    </router-link>

                    <router-link
                        to="/change-password"
                        class="item-nav px-2 text-white text-base py-2 my-2"
                    >
                        <i class="w-10 fas fa-key"></i>
                        <span
                            class="
                                xl:inline-block
                                lg:hidden
                                md:hidden
                                sm:hidden
                                xs:hidden
                            "
                            >Change password</span
                        >
                    </router-link>

                    <router-link
                        to="/register"
                        class="item-nav px-2 text-white text-base py-2 my-2"
                        v-if="getUser.role === 0"
                    >
                        <i class="w-10 fas fa-user-plus"></i>
                        <span
                            class="
                                xl:inline-block
                                lg:hidden
                                md:hidden
                                sm:hidden
                                xs:hidden
                            "
                            >Add user</span
                        >
                    </router-link>

                    <router-link
                        to="/about"
                        class="item-nav px-2 text-white text-base py-2 my-2"
                    >
                        <i class="w-10 fas fa-info-circle"></i>
                        <span
                            class="
                                xl:inline-block
                                lg:hidden
                                md:hidden
                                sm:hidden
                                xs:hidden
                            "
                            >About</span
                        >
                    </router-link>
                </div>
            </div>

            <!-- Sidebar bottom -->
            <div class="bottom mb-14 w-full flex flex-col justify-between">
                <div class="nav-setting flex flex-col border-t-2">
                    <!-- Notification -->
                    <router-link
                        v-if="getUser.role === 1 || getUser.role === 2"
                        to="/notification"
                        class="item-nav px-2 text-white text-base py-2 my-2"
                    >
                        <i class="fas fa-bell w-10 relative">
                            <span
                                v-if="getUser.role === 2"
                                class="
                                    count
                                    absolute
                                    -top-2
                                    right-4
                                    font-semibold
                                    w-4
                                    h-4
                                    bg-red-500
                                    rounded-full
                                    text-white
                                    flex
                                    justify-center
                                    items-center
                                "
                                >{{ getUnread }}</span
                            >
                        </i>
                        <span
                            class="
                                xl:inline-block
                                lg:hidden
                                md:hidden
                                sm:hidden
                                xs:hidden
                            "
                        >
                            Notifications
                        </span>
                    </router-link>
                    <!-- Profile -->
                    <router-link
                        v-if="getUser.role === 2 || getUser.role === 1"
                        :to="`/profile/${getUser._id}`"
                        class="profile w-full flex items-center cursor-pointer"
                    >
                        <img
                            :src="
                                getUser
                                    ? getUser.authType === 'local'
                                        ? getUser.profilePic
                                            ? PF + getUser.profilePic
                                            : PF + 'profile_pic.svg'
                                        : getUser.authType === 'google' &&
                                          getUser.profilePic.includes(
                                              'https://'
                                          )
                                        ? getUser.profilePic
                                        : PF + getUser.profilePic
                                    : false
                            "
                            alt=""
                            class="w-8 h-8 rounded-full"
                        />
                        <div
                            class="
                                info
                                xl:inline-block
                                lg:hidden
                                md:hidden
                                sm:hidden
                                xs:hidden
                            "
                        >
                            <h3 class="text-white text-base font-semibold ml-1">
                                {{ getUser.username }}
                            </h3>
                            <p class="text-white italic">
                                {{ getUser.email }}
                            </p>
                        </div>
                    </router-link>

                    <!-- Logout -->
                    <button
                        class="
                            px-2
                            text-red-500 text-base
                            py-2
                            my-2
                            w-full
                            text-left
                        "
                        @click="handleLogout"
                    >
                        <i class="w-10 fas fa-sign-out-alt"></i>
                        <span
                            class="
                                xl:inline-block
                                lg:hidden
                                md:hidden
                                sm:hidden
                                xs:hidden
                            "
                            >Logout</span
                        >
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Loading from "./Loading.vue";
export default {
    data() {
        return {
            isPending: false,
            PF: process.env.VUE_APP_PUBLIC_FOLDER,
        };
    },

    computed: {
        ...mapGetters(["getUser", "getUnread"]),
    },
    methods: {
        ...mapActions(["logout"]),
        async handleLogout() {
            try {
                this.isPending = true;
                if (this.getUser.authType !== "local") {
                    await this.$gAuth.signOut();
                }
                setTimeout(() => {
                    this.isPending = false;
                    this.$store.dispatch("logout");
                    this.$router.push({ name: "Login" });
                    window.location.reload();
                }, 2000);
            } catch (error) {
                console.log(error);
            }
        },
    },
    components: {
        Loading,
    },
    mounted() {
        if (this.getUser._id) {
            this.$store.dispatch("unRead", this.getUser._id);
        } else {
            return false;
        }
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.router-link-exact-active,
.router-link-exact-active h3,
.router-link-exact-active p {
    color: #6c9edb;
}

.info p {
    font-size: 13px;
    text-align: center;
}

.count {
    font-size: 10px;
}
.navbar {
    background-color: #304156;
}
.item-nav:hover {
    background-color: #142336;
    border-radius: 6px;
}
</style>

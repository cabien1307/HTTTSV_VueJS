<template>
    <div class="container mx-auto">
        <Loading v-if="isPending" />
        <div
            v-else
            class="
                mx-auto
                grid grid-cols-12 grid-rows-2
                gap-3
                px-10
                py-6
                rounded-2xl
                h-screen
            "
        >
            <div
                class="
                    col-span-5
                    xl:col-span-5
                    lg:col-span-5
                    md:hidden
                    sm:hidden
                    xs:hidden
                    flex flex-col
                    justify-around
                    mt-40
                "
            >
                <div class="w-11/12 mx-auto">
                    <img
                        src="../assets/images/login.svg"
                        alt=""
                        class="w-full"
                    />
                </div>
                <h1 class="mt-10 text-5xl font-semibold text-center">
                    Welcome back !
                </h1>
            </div>
            <div
                class="
                    col-span-7
                    xl:col-span-7
                    lg:col-span-7
                    md:col-span-12
                    sm:col-span-12
                    xs:col-span-12
                "
            >
                <form
                    @submit.prevent="submit"
                    class="flex space-y-6 flex-col justify-start"
                >
                    <div class="intro">
                        <h1
                            class="
                                text-5xl text-center
                                font-semibold
                                text-primary
                            "
                        >
                            Login
                        </h1>
                        <p class="text-center font-semibold text-lg">
                            Login to try our amazing services !
                        </p>
                    </div>

                    <!-- Social login -->
                    <div class="row w-3/5 mx-auto btn-social">
                        <div class="flex justify-around my-3">
                            <router-link to="/">
                                <i
                                    class="
                                        fab
                                        fa-facebook-f
                                        text-4xl
                                        font-semibold
                                        hover:text-primary
                                        cursor-pointer
                                    "
                                ></i>
                            </router-link>
                            <button @click="googleLogin" type="button">
                                <i
                                    class="
                                        fab
                                        fa-google
                                        text-4xl
                                        font-semibold
                                        hover:text-primary
                                        cursor-pointer
                                    "
                                ></i>
                            </button>
                            <router-link to="/">
                                <i
                                    class="
                                        fab
                                        fa-twitter
                                        text-4xl
                                        font-semibold
                                        hover:text-primary
                                        cursor-pointer
                                    "
                                ></i>
                            </router-link>
                        </div>
                        <p
                            class="
                                text-center text-xl
                                cursor-pointer
                                hover:underline
                            "
                        >
                            Or use your email account ?
                        </p>
                    </div>

                    <!-- Email -->
                    <div class="row flex flex-col justify-between input">
                        <label
                            class="ml-5 text-left font-bold text-lg mb-2"
                            for="email"
                            >Email:</label
                        >
                        <input
                            id="email"
                            class="
                                mr-5
                                w-11/12
                                mx-auto
                                py-3
                                border-b-2
                                px-10
                                rounded-3xl
                                text-xl text-primary
                                focus:outline-none
                                bg-blue-100
                                shadow-lg
                                font-semibold
                            "
                            type="email"
                            placeholder="example@gmail.com"
                            v-model="body.email"
                            required
                        />
                    </div>

                    <!-- Password -->
                    <div class="row flex flex-col justify-between input">
                        <label
                            class="ml-5 text-left font-bold text-lg mb-2"
                            for="passoword"
                            >Password:</label
                        >
                        <input
                            id="passoword"
                            class="
                                mr-5
                                w-11/12
                                mx-auto
                                py-3
                                border-b-2
                                px-10
                                rounded-3xl
                                text-xl text-primary
                                focus:outline-none
                                bg-blue-100
                                shadow-lg
                                font-semibold
                            "
                            placeholder="Enter your password..."
                            type="password"
                            v-model="body.password"
                            required
                        />
                    </div>

                    <!-- Remember me -->
                    <div
                        class="
                            row
                            flex
                            justify-between
                            items-center
                            px-4
                            remember-forgot
                        "
                    >
                        <label for="rememberMe" class="text-lg">
                            <input
                                type="checkbox"
                                name=""
                                id="rememberMe"
                                class="
                                    h-4
                                    w-4
                                    checked:bg-blue-600
                                    checked:border-transparent
                                "
                            />
                            Remember me
                        </label>

                        <h3
                            class="
                                cursor-pointer
                                text-lg
                                italic
                                font-semibold
                                hover:text-red-700
                            "
                        >
                            Forget password ?
                        </h3>
                    </div>

                    <!-- Error -->
                    <div class="row message" v-if="errors.length">
                        <p
                            class="
                                text-center text-red-500
                                font-semibold
                                text-lg
                            "
                            v-for="error in errors"
                            :key="error"
                        >
                            {{ error }}
                        </p>
                    </div>

                    <!-- btn login -->
                    <div
                        class="
                            row
                            mx-auto
                            btn-login
                            md:w-11/12
                            sm:w-11/12
                            xs:w-11/12
                        "
                    >
                        <button
                            class="
                                px-20
                                rounded-3xl
                                py-3
                                text-lg text-white
                                font-semibold
                                bg-primary
                                hover:bg-blue-600
                                md:w-full
                                sm:w-full
                                xs:w-full
                            "
                        >
                            Login
                        </button>
                    </div>

                    <!-- Register -->
                    <div class="row text-center register-form">
                        <h1>
                            Not a member ?
                            <router-link
                                to="/register"
                                class="
                                    cursor-pointer
                                    italic
                                    hover:text-primary
                                    text-lg
                                    font-semibold
                                "
                                >Register now ?</router-link
                            >
                        </h1>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Loading from "../components/Loading.vue";
import { signIn, authGoogle } from "../api/user";
import { mapActions } from "vuex";
export default {
    data() {
        return {
            body: {
                email: "",
                password: "",
            },
            errors: [],
            isPending: false,
            FB: {},
            model: {},
            scope: {},
        };
    },
    methods: {
        ...mapActions(["login"]),
        async submit() {
            this.errors = [];
            this.isPending = true;
            try {
                const res = await signIn(this.body);
                const token = res.headers.authorization;

                this.$store.dispatch("login", token);

                setTimeout(() => {
                    this.isPending = false;
                    this.$router.push("/");
                }, 3000);
            } catch (error) {
                setTimeout(() => {
                    this.clearForm();
                    this.isPending = false;
                }, 3000);
                this.errors.push("Incorrect username/password !");
            }
        },
        clearForm() {
            this.body = {
                email: "",
                password: "",
            };
        },

        async googleLogin() {
            const profile = await this.$gAuth.signIn();
            this.isSignIn = this.$gAuth.isAuthorized;
            const data = {
                access_token: profile.getAuthResponse().access_token,
            };
            this.errors = [];
            this.isPending = true;
            try {
                const res = await authGoogle(data);
                const token = res.headers.authorization;
                this.$store.dispatch("login", token);

                setTimeout(() => {
                    this.isPending = false;
                    this.$router.push("/");
                }, 3000);
            } catch (error) {
                if (error) {
                    this.errors.push("Something went wrong !");
                }
            }
        },

        handleSdkInit({ FB, scope }) {
            this.FB = FB;
            this.scope = scope;
        },
    },
    components: {
        Loading,
    },
};
</script>

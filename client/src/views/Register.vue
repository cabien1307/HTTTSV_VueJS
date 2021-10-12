<template>
    <div class="container my-2.5 mx-auto">
        <Loading v-if="isPending" />
        <div
            v-else
            class="
                w-4/5
                mx-auto
                grid grid-cols-12
                gap-3
                grid-rows-2
                px-10
                py-2
                rounded-2xl
                h-screen
            "
        >
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
                <Toast v-if="showToast" :toast="toast" />
                <form
                    @submit.prevent="register"
                    class="flex space-y-3.5 flex-col justify-start"
                >
                    <div class="row intro">
                        <h1
                            class="
                                text-4xl text-center
                                font-semibold
                                text-primary
                            "
                        >
                            Register
                        </h1>
                        <p class="text-center font-semibold text-base">
                            To keep connected with us please login with your
                            personal info !
                        </p>
                    </div>

                    <!-- Username -->
                    <div class="row flex flex-col justify-between input">
                        <label
                            class="ml-5 text-left font-bold text-base mb-1"
                            for="username"
                            >Username:</label
                        >
                        <input
                            id="username"
                            class="
                                mr-5
                                w-11/12
                                mx-auto
                                py-2
                                border-b-2
                                px-7
                                rounded-3xl
                                text-lg text-primary
                                focus:outline-none
                                bg-blue-100
                                shadow-lg
                                font-semibold
                            "
                            type="text"
                            placeholder="nguyenvana"
                            v-model="formSubmit.username"
                            required
                        />
                    </div>

                    <!-- Email -->
                    <div class="row flex flex-col justify-between input">
                        <label
                            class="ml-5 text-left font-bold text-base mb-1"
                            for="email"
                            >Email:</label
                        >
                        <input
                            id="email"
                            class="
                                mr-5
                                w-11/12
                                mx-auto
                                py-2
                                border-b-2
                                px-7
                                rounded-3xl
                                text-lg text-primary
                                focus:outline-none
                                bg-blue-100
                                shadow-lg
                                font-semibold
                            "
                            type="email"
                            placeholder="example@gmail.com"
                            v-model="formSubmit.email"
                            required
                        />
                    </div>

                    <!-- Password -->
                    <div class="row flex flex-col justify-between input">
                        <label
                            class="ml-5 text-left font-bold text-base mb-1"
                            for="passoword"
                            >Password:</label
                        >
                        <input
                            id="passoword"
                            class="
                                mr-5
                                w-11/12
                                mx-auto
                                py-2
                                border-b-2
                                px-7
                                rounded-3xl
                                text-lg text-primary
                                focus:outline-none
                                bg-blue-100
                                shadow-lg
                                font-semibold
                            "
                            type="password"
                            placeholder="Enter your password..."
                            v-model="formSubmit.password"
                            required
                            ref="password"
                        />
                    </div>

                    <!-- Confirm password -->
                    <div class="row flex flex-col justify-between input">
                        <label
                            class="ml-5 text-left font-bold text-base mb-1"
                            for="confirm-passoword"
                            >Comfirm Password:</label
                        >
                        <input
                            id="confirm-passoword"
                            class="
                                mr-5
                                w-11/12
                                mx-auto
                                py-2
                                border-b-2
                                px-7
                                rounded-3xl
                                text-lg text-primary
                                focus:outline-none
                                bg-blue-100
                                shadow-lg
                                font-semibold
                            "
                            type="password"
                            placeholder="Confirm your password..."
                            v-model="formSubmit.confirmPassword"
                            required
                            ref="confirmPassword"
                        />
                    </div>

                    <!-- Faculty -->
                    <div
                        class="row flex flex-col justify-between input"
                        v-if="$store.state.user.isAuth"
                    >
                        <label
                            class="ml-5 text-left font-bold text-base mb-1"
                            for="faculty"
                            >Faculty:</label
                        >
                        <select
                            class="
                                mr-5
                                w-11/12
                                mx-auto
                                py-2
                                border-b-2
                                px-7
                                rounded-3xl
                                text-lg text-primary
                                focus:outline-none
                                bg-blue-100
                                focus:bg-white
                                shadow-lg
                                font-semibold
                            "
                            id="faculty"
                            v-model="formSubmit.listRolePost"
                            required
                        >
                            <option value="" disabled hidden selected>
                                ---Select faculty---
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

                    <!-- Check term -->
                    <div
                        class="
                            row
                            flex
                            justify-between
                            items-center
                            px-4
                            term-conditions
                        "
                    >
                        <label
                            for="rememberMe"
                            class="text-lg flex items-center mx-auto"
                        >
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
                                required
                            />
                            <h3
                                class="
                                    cursor-pointer
                                    ml-4
                                    text-lg
                                    italic
                                    font-semibold
                                "
                            >
                                I read and agree to <b>terms and conditions.</b>
                            </h3>
                        </label>
                    </div>

                    <!-- Error -->
                    <div class="row message text-center" v-if="errors.length">
                        <b>Please correct the following error(s):</b>
                        <p
                            class="
                                text-center text-red-500
                                font-semibold
                                text-base
                            "
                            v-for="(error, index) in errors"
                            :key="index"
                        >
                            {{ error }}
                        </p>
                    </div>

                    <!-- Submit -->
                    <div
                        class="
                            row
                            mx-auto
                            btn-register
                            md:w-11/12
                            sm:w-11/12
                            xs:w-11/12
                        "
                    >
                        <button
                            class="
                                px-20
                                rounded-3xl
                                py-2
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

                    <div class="row text-center btn-login" v-if="!getUser.role">
                        <h1>
                            Already have an account ?
                            <router-link
                                to="/login"
                                class="
                                    cursor-pointer
                                    italic
                                    hover:text-primary
                                    text-lg
                                    font-semibold
                                "
                            >
                                Login now !</router-link
                            >
                        </h1>
                    </div>
                </form>
                <div
                    v-if="$store.state.user.isAuth"
                    class="
                        flex
                        justify-center
                        md:w-11/12
                        sm:w-11/12
                        xs:w-11/12
                        mt-4
                    "
                >
                    <router-link to="/">
                        <button
                            class="
                                px-20
                                rounded-md
                                py-2
                                text-lg text-white
                                font-semibold
                                bg-green-500
                                hover:bg-blue-600
                                md:w-full
                                sm:w-full
                                xs:w-full
                            "
                        >
                            Back to Home
                        </button></router-link
                    >
                </div>
            </div>

            <div
                class="
                    col-span-5
                    xl:col-span-5
                    lg:col-span-5
                    md:hidden
                    sm:hidden
                    xs:hidden
                    flex flex-col
                    mt-20
                    bg
                "
            >
                <h1 class="mt-10 text-5xl font-semibold text-center mb-10">
                    Hello, friend !
                </h1>
                <div class="w-11/12 mx-auto">
                    <img
                        src="../assets/images/register.svg"
                        alt=""
                        class="w-full object-cover"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { signUp, authGoogle } from "../api/user";
import Loading from "../components/Loading.vue";
import Toast from "../components/Toast.vue";
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            formSubmit: {
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
                role: 2,
                listRolePost: "",
            },
            errors: [],
            isPending: false,
            showToast: false,
            toast: {
                status: null,
                msg: "",
            },
        };
    },
    computed: {
        ...mapGetters(["getUser", "getAllFaculties"]),
    },
    methods: {
        clearForm(e, toast) {
            this.formSubmit = {
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            };
            this.toast = {
                status: toast.status,
                msg: toast.msg,
            };
            e.target.reset();
            setTimeout(() => {
                this.isPending = false;
            }, 3000);

            setTimeout(() => {
                this.showToast = false;
            }, 7777);
        },

        async register(e) {
            this.errors = [];

            if (
                this.formSubmit.password.length < 6 ||
                this.formSubmit.confirmPassword.length > 20
            ) {
                this.errors.push(
                    "Password must be at least 6 character and between 6 to 20 !"
                );
                this.$refs.password.focus();
            }
            if (this.formSubmit.password !== this.formSubmit.confirmPassword) {
                this.errors.push("Password doesn't not match !");
                this.$refs.confirmPassword.focus();
            }

            if (!this.errors.length) {
                this.isPending = true;
                this.showToast = true;

                delete this.formSubmit["confirmPassword"];

                if (this.$store.state.user.isAuth) {
                    this.formSubmit["role"] = 1;
                } else {
                    delete this.formSubmit["listRolePost"];
                }

                try {
                    await signUp(this.formSubmit);
                    this.clearForm(e, {
                        status: true,
                        msg:
                            this.getUser.role === 0
                                ? "Register success ! Welcome to this system !"
                                : "Register success ! Welcome to become member !",
                    });
                } catch (error) {
                    if (error.response.status === 401) {
                        this.errors.push(
                            "Email has already existed ! Please try again with other email !"
                        );
                    }
                    this.clearForm(e, {
                        status: false,
                        msg: "Register failure ! Please check your email !",
                    });
                }
            }
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
                setTimeout(() => {
                    this.isPending = false;
                    this.$store.dispatch("login", token);
                    this.$router.push({ name: "Home" });
                }, 3000);
            } catch (error) {
                if (error) {
                    this.errors.push("Something went wrong !");
                }
            }
        },
    },
    components: {
        Loading,
        Toast,
    },
};
</script>

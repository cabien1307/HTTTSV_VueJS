import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";
import { getUser } from "../utils/auth";

const routes = [
    {
        path: "/",
        name: "Home",
        meta: {
            title: "Home",
            requiresAuth: true,
        },
        component: () =>
            import(/* webpackChunkName: "Home" */ "../views/Home.vue"),
        beforeEnter: (to, from, next) => {
            store.dispatch("fetchPosts");
            store.dispatch("getUserInfo", getUser().sub);
            store.dispatch("getAllNotify");
            next();
        },
    },
    {
        path: "/login",
        name: "Login",
        meta: {
            layout: "auth",
            title: "Login",
        },
        component: () =>
            import(/* webpackChunkName: "Login" */ "../views/Login.vue"),
    },
    {
        path: "/register",
        name: "Register",
        meta: {
            layout: "auth",
            title: "Register",
        },
        component: () =>
            import(/* webpackChunkName: "Register" */ "../views/Register.vue"),
        beforeEnter: (to, from, next) => {
            if (store.state.user.isAuth) {
                store.dispatch("fetchAllFaculties");
            }

            next();
        },
    },
    {
        path: "/teachers",
        name: "Teachers",
        meta: {
            title: "Teachers",
        },
        component: () =>
            import(/* webpackChunkName: "Teachers" */ "../views/Teachers.vue"),
        beforeEnter: (to, from, next) => {
            store.dispatch("getUserInfo", getUser().sub);
            store.dispatch("fetchAllFaculties");
            store.dispatch("getTeacher");
            next();
        },
    },
    {
        path: "/notification",
        name: "Notification",
        meta: {
            title: "Notifications",
            requiresAuth: true,
        },
        component: () =>
            import(
                /* webpackChunkName: "Notification" */ "../views/Notify.vue"
            ),
        beforeEnter: (to, from, next) => {
            store.dispatch("getUserInfo", getUser().sub);
            store.dispatch("fetchAllFaculties");
            store.dispatch("getAllNotify");
            next();
        },
    },
    {
        path: "/notification-detail/:id",
        name: "Notification-detail",
        meta: {
            title: "Notification detail",
            requiresAuth: true,
        },
        component: () =>
            import(
                /* webpackChunkName: "Notification-detail" */ "../views/NotificationDetail.vue"
            ),
        beforeEnter: (to, from, next) => {
            store.dispatch("getUserInfo", getUser().sub);
            store.dispatch("getNotifyByID", to.params.id);
            next();
        },
    },
    {
        path: "/faculties",
        name: "Faculties",
        meta: {
            title: "Faculties",
            requiresAuth: true,
        },
        component: () =>
            import(
                /* webpackChunkName: "Faculties" */ "../views/ListFaculty.vue"
            ),
        beforeEnter: (to, from, next) => {
            store.dispatch("fetchAllFaculties");
            store.dispatch("getUserInfo", getUser().sub);
            next();
        },
    },
    {
        path: "/faculty/:slug",
        name: "Faculty",
        meta: {
            title: "Faculty",
            requiresAuth: true,
        },
        component: () =>
            import(/* webpackChunkName: "Faculty" */ "../views/Faculty.vue"),
        beforeEnter: (to, from, next) => {
            store.dispatch("fetchPostOfFacultyBySlug", to.params.slug);
            store.dispatch("fetchFacultyInfo", to.params.slug);
            store.dispatch("fetchPostOfFacultyBySlug", to.params.slug);
            store.dispatch("getNotifyByFaculty", to.params.slug);
            store.dispatch("getUserInfo", getUser().sub);
            next();
        },
    },
    {
        path: "/profile/:id",
        name: "Profile",
        meta: {
            title: "Profile",
            requiresAuth: true,
        },
        component: () =>
            import(
                /* webpackChunkName: "Profile/:id" */ "../views/Profile.vue"
            ),
        beforeEnter: (to, from, next) => {
            store.dispatch("getPostTimeLine", to.params.id);
            store.dispatch("fetchAllFaculties");
            store.dispatch("getUserInfo", getUser().sub);
            next();
        },
    },
    {
        path: "/about",
        name: "About",
        meta: {
            title: "About",
        },
        component: () =>
            import(/* webpackChunkName: "About" */ "../views/About.vue"),
    },
    {
        path: "/change-password",
        name: "ChangePassword",
        meta: {
            title: "Change password",
            requiresAuth: true,
        },
        component: () =>
            import(
                /* webpackChunkName: "ChangePassword" */ "../views/ChangePassword.vue"
            ),
    },
    {
        path: "/logout",
        name: "Logout",
        component: () =>
            import(/* webpackChunkName: "Logout" */ "../views/Logout.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        meta: {
            layout: "auth",
            title: "NotFound",
        },
        component: () =>
            import(/* webpackChunkName: "NotFound" */ "../views/NotFound.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    // Set title page
    window.document.title = to.meta && to.meta.title ? to.meta.title : "Cabien";

    if (to.meta.requiresAuth) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.state.user.isAuth) {
            next({
                name: "Login",
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;

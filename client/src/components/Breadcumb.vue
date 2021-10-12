<template>
    <ul
        class="
            breadcumb
            flex
            justify-around
            space-x-3
            xl:space-x-3
            lg:space-x-2
            md:space-x-1
            sm:space-x-1
            text-sm
            font-semibold
            py-3
        "
    >
        <li>
            <router-link class="text-primary hover:underline" to="/">
                <i class="fas fa-home"></i>
                HOME</router-link
            >
        </li>
        <li
            v-if="
                $route.meta.title === 'Notifications' ||
                $route.meta.title === 'Notification detail'
            "
        >
            <router-link class="text-primary hover:underline" to="/notification"
                >LIST OF NOTIFICATIONS</router-link
            >
        </li>
        <li v-if="$route.meta">{{ $route.meta.title }}</li>
    </ul>
</template>

<style scoped>
.breadcumb li + li::before {
    padding: 8px;
    color: black;
    content: "/\00a0";
}
</style>

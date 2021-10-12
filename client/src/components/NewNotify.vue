<template>
    <router-link
        :to="`/notification-detail/${notify._id}`"
        class="
            bagde
            flex
            mx-0
            my-2
            xl:mx-0
            lg:mx-0
            md:mx-0
            sm:mx-1
            xs:mx-1
            md:my-2
            sm:my-2
            xs:my-2
            px-3
            h-20
            rounded-md
            shadow-md
            justify-center
            items-center
            bg-primary
            text-white text-lg
            w-full
            cursor-pointer
        "
    >
        <i class="fas fa-info-circle mr-5 text-2xl"></i>
        <h1>
            <i class="text-gray-100">{{ notify.faculty.name }}</i> has just
            posted an announcement: <strong>{{ notify.title }}</strong>
        </h1>
    </router-link>
</template>

<script>
export default {
    props: {
        notify: {
            type: Object,
        },
    },
};
</script>

<style scoped>
@keyframes sildeInLeft {
    from {
        opacity: 0;
        transform: translateX(calc(100% + 32px));
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes fadeOut {
    to {
        opacity: 0;
    }
}
.bagde {
    animation: sildeInLeft ease-in 0.8s, fadeOut linear 5s 6s forwards;
}
</style>

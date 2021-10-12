<template>
    <div
        class="
            toast
            fixed
            right-7
            top-7
            flex
            space-x-4
            items-center
            px-4
            py-5
            border-l-4
            rounded-sm
            shadow-md
            z-10
            bg-white
        "
        :class="[toast.status ? 'border-green-500' : 'border-red-500']"
    >
        <!-- Type tost -->

        <i
            class="fas text-3xl"
            :class="[
                toast.status
                    ? 'fa-check-circle text-green-500 '
                    : 'fa-skull-crossbones text-red-500 ',
            ]"
        ></i>
        <!-- Msg -->
        <div>
            <h1
                class="text-xl font-semibold"
                :class="[toast.status ? ' text-green-500 ' : ' text-red-500 ']"
            >
                {{ toast.status ? "Awesome !" : "Failure !!" }}
            </h1>
            <p class="text-base text-gray-700 italic">
                {{ toast.msg }}
            </p>
        </div>
        <!-- Close -->
        <i class="fas fa-times text-lg text-gray-300 cursor-pointer"></i>
    </div>
</template>

<script>
export default {
    props: {
        toast: {
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
.toast {
    animation: sildeInLeft ease-in 0.5s, fadeOut linear 1s 2s forwards;
}
</style>

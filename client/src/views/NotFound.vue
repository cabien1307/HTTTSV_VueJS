<template>
    <div class="w-full h-screen grid grid-cols-12 bg-gray-300 gap-3">
        <div
            class="
                main
                col-start-3 col-end-7
                my-auto
                md:hidden
                sm:hidden
                xs:hidden
            "
        >
            <!-- Image -->
            <img
                class="w-full h-auto object-cover"
                :src="require('../assets/images/404.svg')"
                alt=""
            />
        </div>
        <!-- Message -->
        <div
            class="
                main
                col-start-7 col-end-11
                md:col-span-12
                sm:col-span-12
                xs:col-span-12
                my-auto
                flex flex-col
                items-center
                text-center
                space-y-5
            "
        >
            <!-- Image -->
            <h1 class="text-9xl title text-primary font-bold">404</h1>
            <h3 class="text-7xl font-semibold">Ooops !!</h3>
            <h5 class="text-2xl text-red-600 font-semibold">
                This page doesn's exist or is unavailavle !
            </h5>
            <div
                class="
                    social
                    flex
                    justify-around
                    font-semibold
                    text-4xl
                    w-1/2
                    cursor-pointer
                "
            >
                <i class="hover:text-primary fab fa-facebook-f"></i>
                <i class="hover:text-primary fab fa-google"></i>
                <i class="hover:text-primary fab fa-twitter"></i>
            </div>
            <router-link to="/">
                <button
                    class="
                        my-5
                        px-7
                        py-3
                        bg-primary
                        text-white text-xl
                        font-semibold
                        rounded-md
                        hover:bg-blue-500
                    "
                >
                    Back Home
                </button>
            </router-link>
        </div>
    </div>
</template>

<style scoped>
.title {
    font-family: "Pacifico", cursive;
}
</style>

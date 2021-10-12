<template>
    <div
        class="
            w-10/12
            xl:w-10/12
            lg:w-11/12
            md:w-11/12
            sm:w-11/12
            xs:w-11/12
            absolute
            right-0
            grid grid-cols-12 grid-row-3
            h-screen
            gap-10
            px-10
            mt-40
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
                xl:mt-10
                lg:mt-10
            "
        >
            <img
                src="../assets/images/change-password.svg"
                alt=""
                class="w-11/12 mx-auto"
            />

            <h1 class="mt-10 text-4xl font-semibold text-center">
                User account setting !
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
            <form action="" class="flex space-y-6 flex-col justify-start">
                <h1
                    class="
                        text-5xl text-center
                        font-semibold
                        text-primary
                        xl:mt-10
                        lg:mt-10
                        md:mt-10
                        sm:mt-10
                        xs:mt-10
                    "
                >
                    Change password
                </h1>

                <div class="row flex flex-col justify-between input">
                    <label
                        class="ml-5 text-left font-bold text-lg mb-2"
                        for="old-passoword"
                        >Old password:</label
                    >
                    <input
                        id="old-passoword"
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
                        type="password"
                    />
                </div>
                <div class="row flex flex-col justify-between input">
                    <label
                        class="ml-5 text-left font-bold text-lg mb-2"
                        for="new-passoword"
                        >New password:</label
                    >
                    <input
                        id="new-passoword"
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
                        type="password"
                    />
                </div>
                <div class="row flex flex-col justify-between input">
                    <label
                        class="ml-5 text-left font-bold text-lg mb-2"
                        for="confirm-passoword"
                        >Confirm password:</label
                    >
                    <input
                        id="confirm-passoword"
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
                        type="password"
                    />
                </div>

                <div class="row message">
                    <p class="text-center text-red-500 font-semibold text-lg">
                        Password doesn't match !
                    </p>
                </div>

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
                        Confirm
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

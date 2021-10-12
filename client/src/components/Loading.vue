<template>
    <div class="w-full min-h-screen flex justify-center items-center">
        <h1 class="text-7xl font-bold flex">
            <span>L</span>
            <span>o</span>
            <span>a</span>
            <span>d</span>
            <span>i</span>
            <span>n</span>
            <span>g</span>
            <span>...</span>
        </h1>
    </div>
</template>

<style scoped>
h1 span {
    animation: animate 3s linear infinite;
}

h1 span:nth-child(1) {
    animation-delay: 0s;
}
h1 span:nth-child(2) {
    animation-delay: 0.1s;
}
h1 span:nth-child(3) {
    animation-delay: 0.2s;
}
h1 span:nth-child(4) {
    animation-delay: 0.3s;
}
h1 span:nth-child(5) {
    animation-delay: 0.4s;
}
h1 span:nth-child(6) {
    animation-delay: 0.5s;
}
h1 span:nth-child(7) {
    animation-delay: 0.6s;
}
h1 span:nth-child(8) {
    animation-delay: 0.7s;
}

@keyframes animate {
    0%,
    100% {
        color: #555;
        filter: blur(1px);
        text-shadow: 0 0 10px #0199ad, 0 0 20px #0199ad, 0 0 40px #0199ad,
            0 0 80px #0199ad, 0 0 120px #0199ad, 0 0 200px #0199ad,
            0 0 300px #0199ad, 0 0 350px #0199ad;
    }
    25%,
    75% {
        color: #fff;
        filter: blur(0);
        text-shadow: none;
    }
}
</style>

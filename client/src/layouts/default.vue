<template>
    <!-- <h1>Auth layout</h1> -->

    <div>
        <Sidebar />
        <slot />
    </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
export default {
    components: { Sidebar },
};
</script>

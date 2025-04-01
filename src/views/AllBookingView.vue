<script setup lang="ts">
import { useRouter } from 'vue-router';
import Navbar from "../views/Navbar.vue";
import Sidebar from "../views/Sidebar.vue";

const router = useRouter();

const userId = localStorage.getItem("userIdLogin");

if (userId !== "admin") {
    router.push('/home');
}
</script>

<template>

</template>

<style scoped>

</style>
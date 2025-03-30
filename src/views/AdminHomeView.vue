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
    <div class="layout">
    <Navbar />
    <div class="main-container">
      <Sidebar />
      <div class="content">
        
      </div>
    </div>
  </div>
</template>

<style scoped>
    .layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.main-container {
  display: flex;
  flex: 1; 
  overflow: hidden;
}

.content {
  flex-grow: 1; 
  display: flex;
  padding-left: 180px; /*padding from sidebar*/
  justify-content: center;
  background-color: rgb(254, 172, 99);
  color: black;
}

.navbar {
  height: 60px;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
}
</style>
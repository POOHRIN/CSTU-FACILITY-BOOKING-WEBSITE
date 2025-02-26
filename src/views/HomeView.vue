<script setup lang="ts">
import Navbar from "../views/Navbar.vue";
import Sidebar from "../views/Sidebar.vue";
</script>

<template>
  <div class="layout">
    <Navbar />
    <div class="main-container">
      <Sidebar />
      <div class="content">
        <router-view />
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
  padding-left: 18vw;
  justify-content: center;
  background-color: rgb(214, 214, 214);
  color: black;
}

.navbar {
  height: 60px;
  background-color: #333;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
}
</style>
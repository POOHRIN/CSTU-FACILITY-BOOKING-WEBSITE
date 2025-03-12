<script setup lang="ts">
import { useRoute } from "vue-router";
import Navbar from "../views/Navbar.vue";
import Sidebar from "../views/Sidebar.vue";
import Image1 from "@/assets/Test1.jpg";
import Image2 from "@/assets/Test2.jpg";

const route = useRoute();

</script>

<template>
  <div class="layout">
    <Navbar />
    <div class="main-container">
      <Sidebar />
      <div class="content">
        <div class="image-container" v-show="route.path === '/home'">
          <img :src="Image1" alt="Test Image 1" class="image"/>
          <img :src="Image2" alt="Test Image 2" class="image"/>
        </div>
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

.image-container {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.image {
  width: 200px; 
  height: auto;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
}

</style>
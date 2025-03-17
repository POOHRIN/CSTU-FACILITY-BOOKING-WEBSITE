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
          <div class="image-wrapper">
            <span class="image-text">Meeting Room</span>
            <img :src="Image1" alt="Meeting Room" class="image" />
        </div>
        <div class="image-wrapper">
          <span class="image-text">Activity Room</span>
          <img :src="Image2" alt="Activity Room" class="image" />
        </div>
          
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
  margin-left: -188px;
}

.image {
  width: 900px; 
  height: 900px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
}

.image-wrapper {
  position: relative;
  width: 50%; 
}

.image-text {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  font-weight: bold;
  color: black;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 5px 10px;
  border-radius: 5px;
}
</style>
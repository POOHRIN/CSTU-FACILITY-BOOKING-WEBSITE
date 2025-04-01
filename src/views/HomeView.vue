<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import Navbar from "../views/Navbar.vue";
import Sidebar from "../views/Sidebar.vue";
import Image1 from "@/assets/Test1.jpg";
import Image2 from "@/assets/Test2.jpg";

const route = useRoute();
const router = useRouter();
const userId = localStorage.getItem("userIdLogin");

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
            <router-link to="/home/meeting-room">
              <img :src="Image1" alt="Meeting Room" class="image" />
            </router-link>
          </div>
          <div class="image-wrapper">
            <span class="image-text">Activity Room</span>
            <router-link to="/home/activity-room">
              <img :src="Image2" alt="Activity Room" class="image" />
            </router-link>
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

.image-container {
  display: flex;
  width: 100%;
  padding-right: 1.5vw;
}

.image{
  width: 98%; 
  height: 98%;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  margin: 1vmax;
}

.image-wrapper{
  position: relative;
  width: 98%; 
  height: 98%;
}

.image-text {
  position: absolute;
  top: 5vh;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  font-weight: bold;
  color: black;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 5px 10px;
  border-radius: 5px;
}

.image-wrapper img {
  transition: opacity 0.1s ease-in-out;
}

.image-wrapper:hover img {
  opacity: 0.7; 
}

</style>
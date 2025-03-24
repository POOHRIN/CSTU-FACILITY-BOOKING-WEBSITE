<script setup lang="ts">
import { ref } from "vue";

const meetingRooms = ref([
  { name: "ห้องประชุม 1", path: "ห้องประชุม 1" },
  { name: "ห้องประชุม 2", path: "ห้องประชุม 2" },
  { name: "LC2 - 301", path: "LC2 - 301" },
  { name: "LC2 - 302", path: "LC2 - 302" },
  { name: "LC2 - 303", path: "LC2 - 303" },
  { name: "LC2 - 304", path: "LC2 - 304" },
  { name: "LC2 - 305", path: "LC2 - 305" },
  { name: "LC2 - 314", path: "LC2 - 314" },
  { name: "LC2 - 315", path: "LC2 - 315" },
  { name: "LC2 - 316", path: "LC2 - 316" }
]);
</script>

<template>
  <div class="meeting-room-container">
    <div class="meeting-room-list">
      <router-link 
        v-for="(room, index) in meetingRooms" 
        :key="index" 
        :to="`/home/meeting-room/${room.path}`" 
        class="room-card">
        {{ room.name }}
      </router-link>
    </div>
  </div>
</template>
  
<style scoped>
.meeting-room-container {
  width: 1775px; 
  display: flex;
  flex-direction: column;
  background-color: rgb(254, 172, 99);
  padding: 40px;
  height: 100vh;
  margin-left: -200px; 
  overflow-y: auto; 
  overflow-x: hidden; 
}

.meeting-room-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%; 
}

.room-card {
  background: #f0f0f0;
  padding: 60px; 
  border-radius: 15px;
  text-align: center;
  font-size: 26px; 
  /*font-weight: bold;*/
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.15);
  color: black;
  transition: background-color 0.3s ease;
}

.room-card:hover {
  background-color: rgb(193, 193, 193);
}
</style>

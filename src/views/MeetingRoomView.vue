<script setup lang="ts">
import { ref } from "vue";

const meetingRooms = ref([
  { name: "ห้องประชุมชั้น 2 : ห้องประชุม 1", path: "ห้องประชุม-1" },
  { name: "ห้องประชุมชั้น 2 : ห้องประชุม 2", path: "ห้องประชุม-2" },
  { name: "ห้องประชุมชั้น 3 : ห้อง 301", path: "301" },
  { name: "ห้องประชุมชั้น 3 : ห้อง 302", path: "302" },
  { name: "ห้องประชุมชั้น 3 : ห้อง 303", path: "303" },
  { name: "ห้องประชุมชั้น 3 : ห้อง 304", path: "304" },
  { name: "ห้องประชุมชั้น 3 : ห้อง 305", path: "305" },
  { name: "ห้องประชุมชั้น 3 : ห้อง 314", path: "314" },
  { name: "ห้องประชุมชั้น 3 : ห้อง 315", path: "315" },
  { name: "ห้องประชุมชั้น 3 : ห้อง 316", path: "316" }
]);
</script>

<template>
  <div class="meeting-room-container">
    <h2 class="header">Meeting Room</h2>
    <div class="meeting-room-list">
      <router-link 
        v-for="(room, index) in meetingRooms" 
        :key="index" 
        :to="`/meeting-room/${room.path}`" 
        class="room-card">
        {{ room.name }}
      </router-link>
    </div>
  </div>
</template>
  
  <style scoped>
  .meeting-room-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(254, 172, 99);
    padding: 20px;
    height: 100vh;
  }
  
  .header {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: black;
  }
  
  .meeting-room-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 80%;
  }
  
  .room-card {
    background: rgb(211, 211, 211);
    padding: 15px;
    border-radius: 10px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    color: black;
  }
  .room-card:hover {
  background-color: rgb(200, 200, 200);
}
  
  </style>  
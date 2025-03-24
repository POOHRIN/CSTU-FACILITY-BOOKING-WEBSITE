<script setup lang="ts">
import { ref } from "vue";

const activityRooms = ref([
  { name: "ห้องกิจกรรม 1", path: "ห้องกิจกรรม 1" }
]);
</script>

<template>
  <div class="activity-room-container">
    <div class="activity-room-list">
      <router-link 
        v-for="(room, index) in activityRooms" 
        :key="index" 
        :to="`/home/activity-room/${room.path}`" 
        class="room-card">
        {{ room.name }}
      </router-link>
    </div>
  </div>
</template>
  
<style scoped>
.activity-room-container {
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

.activity-room-list {
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

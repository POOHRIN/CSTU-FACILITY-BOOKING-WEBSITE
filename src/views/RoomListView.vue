<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { activityRoomList, meetingRoomList } from "@/roomList";

const route = useRoute();
const router = useRouter();

const userId = localStorage.getItem("userIdLogin");

const activityRooms = ref(activityRoomList);
const meetingRooms = ref(meetingRoomList);
</script>

<template>
  <div class="room-container">
    <div class="room-list" v-show="route.path === '/home/activity-room'">
      <router-link v-for="(room, index) in activityRooms" :key="index" :to="`/home/activity-room/${room.path}`"
        class="room-card">
        {{ room.name }}
      </router-link>
    </div>
    <div class="room-list" v-show="route.path === '/home/meeting-room'">
      <router-link v-for="(room, index) in meetingRooms" :key="index" :to="`/home/meeting-room/${room.path}`"
        class="room-card">
        {{ room.name }}
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.room-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgb(254, 172, 99);
  padding: 1vmax;
  height: auto;
  overflow-y: auto;
  overflow-x: hidden;
}

.room-list {
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
  font-size: 1.8vmax;
  font-weight: bold;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.15);
  color: black;
  transition: background-color 0.3s ease;
}

.room-card:hover {
  background-color: rgb(193, 193, 193);
}

@media (max-width: 600px) {
  .room-list {
    max-height: 100vh;
    overflow-y: auto;
    gap: 10px;
  }

  .room-card {
    min-width: 100%; /* Ensure it takes full width */
    flex-shrink: 0;
  }
}
</style>

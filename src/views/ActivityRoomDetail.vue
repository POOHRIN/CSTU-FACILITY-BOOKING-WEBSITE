<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const roomId = route.params.roomId; 
</script>

<template>
  <div class="room-detail-container">
    <h2>รายละเอียดห้องกิจกรรม</h2>
    <p>คุณกำลังดูข้อมูลของ : <strong>{{ roomId }}</strong></p>
  </div>
</template>

<style scoped>
.room-detail-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: white;
  text-align: center;
  margin: 0;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.25rem;
}
</style>

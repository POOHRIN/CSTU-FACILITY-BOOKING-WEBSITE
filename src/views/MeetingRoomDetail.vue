<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const roomId = route.params.roomId; 

const selectedDate = ref("");

const room = ref({
  name: `คุณกำลังดูข้อมูลของ : ${roomId}`,
  capacity: "5 - 30",
  facilities: [
    { icon: "✏️", text: "White Board & Marker" },
    { icon: "📶", text: "WIFI" },
  ],
  bookings: [
    { time: "09:00 - 11:00", status: "expired" },
    { time: "12:00 - 14:00", status: "available" },
    { time: "15:00 - 17:00", status: "available" },
  ],
});
</script>

<template>
  <div class="container">
    <div class="room-card">
      <h2 class="room-name">{{ room.name }}</h2>

      <input type="date" v-model="selectedDate" class="date-picker" />

      <div class="booking-status">
        <span
          v-for="(booking, index) in room.bookings"
          :key="index"
          :class="['booking-tag', booking.status]"
        >
          📅 {{ booking.time }}
        </span>
      </div>

      <p class="capacity">👥 {{ room.capacity }}</p>

      <ul class="facilities">
        <li v-for="(facility, index) in room.facilities" :key="index">
          {{ facility.icon }} {{ facility.text }}
        </li>
      </ul>

      <button class="booking-btn">Booking</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 50px); 
  min-height: 800px; 
  padding: 20px;
  margin-left: 20px;
}


.room-card {
  background: rgb(211, 211, 211);
  padding: 30px;
  border-radius: 15px;
  width: 1700px;
  height: 85vh ;
  margin-left: -200px; 
  box-shadow: 4px 6px 12px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.date-picker {
  font-size: 20px;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.room-name {
  font-size: 32px;
  /*font-weight: bold;*/
  margin-bottom: 15px;
}

.booking-status {
  font-size: 24px;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;
}

.booking-tag {
  font-size: 24px;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 16px;
}

.booking-tag.expired {
  background-color: #e57373;
  color: white;
  font-size: 24px;
  cursor: default;
}

.booking-tag.available {
  background-color: #4caf50;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

.capacity {
  font-size: 24px;
  margin-bottom: 10px;
}

.facilities {
  list-style: none;
  padding: 0;
  font-size: 24px;
  margin-bottom: 15px;
}

.facilities li {
  margin-bottom: 8px;
}

.booking-btn {
  background: #9e9e9e;
  color: black;
  padding: 16px 28px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  font-size: 24px;
  transition: 0.3s;
}

.booking-tag.available:hover {
  background-color: #38803a;
}

.booking-btn:hover {
  background: #616161;
  color: white;
}
</style>

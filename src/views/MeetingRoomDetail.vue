<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const roomId = route.params.roomId; 

const room = ref({
  name: `คุณกำลังดูข้อมูลของ : ${roomId}`,
  capacity: "1 - 5",
  facilities: [
    { icon: "📺", text: "TV" },
    { icon: "✏️", text: "White Board & Marker" },
    { icon: "📶", text: "WIFI" },
  ],
  bookings: [
    { time: "12:00 - 15:00", status: "expired" },
    { time: "12:00 - 15:00", status: "available" },
  ],
});
</script>

<template>
  <div class="container">
    <div class="room-card">
      <h2 class="room-name">{{ room.name }}</h2>

      <div class="booking-status">
        <span class="expired-tag">Expired</span>
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
  height: calc(100vh - 50px); /* ลดช่องว่างจาก navbar น้อยลง */
  min-height: 800px; /* กำหนดขั้นต่ำของความสูง */
  padding: 20px;
  margin-left: 20px;
}


.room-card {
  background: #e0e0e0;
  padding: 30px;
  border-radius: 15px;
  width: 1700px;
  height: 85vh ;
  margin-left: -200px; 
  box-shadow: 4px 6px 12px rgba(0, 0, 0, 0.2);
  text-align: center;
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
  font-weight: bold;
}

.booking-tag.expired {
  background-color: #e57373;
  color: white;
  font-size: 24px;
}

.booking-tag.available {
  background-color: #4caf50;
  color: white;
  font-size: 24px;
}

.expired-tag {
  font-size: 24px;
  background-color: #757575;
  color: white;
  padding: 8px 14px;
  border-radius: 8px;
  font-weight: bold;
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
  font-weight: bold;
  transition: 0.3s;
}

.booking-btn:hover {
  background: #616161;
  color: white;
}
</style>

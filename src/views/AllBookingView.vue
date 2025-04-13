<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { activityRoomList, meetingRoomList } from "@/roomList";
import type { BookingData } from "./bookingData";

const bookings = ref<BookingData[]>([]);
const roomList = [...activityRoomList, ...meetingRoomList];
const selectedRoom = ref("all");
const selectedStatus = ref("all");

const fetchAllBookings = async () => {
  const q = query(collection(db, "bookings"), orderBy("date", "asc"));
  const snapshot = await getDocs(q);
  bookings.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as BookingData[];
};

onMounted(fetchAllBookings);

const filteredBookings = computed(() => {
  return bookings.value.filter(booking => {
    const matchRoom = selectedRoom.value === "all" || booking.room === selectedRoom.value;
    const matchStatus = selectedStatus.value === "all" || booking.status === selectedStatus.value;
    return matchRoom && matchStatus;
  });
});

const roomConvert = (roomPath: string) => {
  return roomList.find(r => r.path === roomPath)?.name || "Unknown Room";
};

</script>

<template>
    <div class="admin-booking-container">
      <div class="filters">
        <select v-model="selectedRoom">
          <option value="all">ทุกห้อง</option>
          <option v-for="room in roomList" :key="room.path" :value="room.path">
            {{ room.name }}
          </option>
        </select>
  
        <select v-model="selectedStatus">
          <option value="all">ทุกสถานะ</option>
          <option value="booking">กำลังจอง</option>
          <option value="cancelled">ยกเลิกแล้ว</option>
        </select>
      </div>
  
      <div class="booking-table">
        <table>
          <thead>
            <tr class="header">
              <th>ชื่อห้อง</th>
              <th>ผู้จอง</th>
              <th>วันที่</th>
              <th>เวลา</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="booking in filteredBookings" :key="booking.id">
              <td>{{ roomConvert(booking.room) }}</td>
              <td>{{ booking.user_id }}</td>
              <td>{{ new Date(booking.date).toLocaleDateString("th-TH") }}</td>
              <td>{{ booking.start_time }} - {{ booking.end_time }} น.</td>
              <td :class="booking.status">{{ booking.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>

<style scoped>
.admin-booking-container {
  padding: 20px;
  background-color: #f0f4f8;
  border-radius: 12px;
  margin-top: 20px;
  color: #333;
  font-size: 18px;
  max-height: 88vh;
  overflow-y: auto;
  position: absolute;
  left: 11vw;
  width: calc(100% - 12vw);
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.filters select {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.booking-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 16px;
}

th, td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.booking {
  color: green;
  font-weight: bold;
}

.cancelled {
  color: red;
  font-weight: bold;
}

.header {
  font-size: 22px;
  font-weight: bold;
  color: #111;
}

</style>

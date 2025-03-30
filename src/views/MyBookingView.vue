<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, onMounted, computed } from "vue";
import { query, collection, where, getDocs, orderBy } from "firebase/firestore";
import type { BookingData } from "./bookingData";
import { db } from "../firebase";
import { activityRoomList, meetingRoomList } from "@/roomList";

const userId = localStorage.getItem("userIdLogin");
const bookings = ref<BookingData[]>([]);
const roomList = [...activityRoomList, ...meetingRoomList];

const router = useRouter();

if (userId == "admin") {
    router.push('/admin-home');
}

const fetchBookings = async () => {
  try {
    const q = query(
      collection(db, "bookings"),
      where("user_id", "==", userId ),
      orderBy("date", "asc") 
    );

    const querySnapshot = await getDocs(q);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset to start of the day

    bookings.value = querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
      }) as BookingData)
      .filter(booking => {
        const bookingDate = new Date(booking.date);
        bookingDate.setHours(0, 0, 0, 0); // Reset to start of the day
        return bookingDate >= today;
      });

  } catch (error) {
    console.error("Error fetching filtered bookings:", error);
  }
};

onMounted(() => {
  fetchBookings();
});

const roomConvert = (room: string) => {
  const roomObj = roomList.find(r => r.path === room);
  return roomObj ? roomObj.name : "Unknown Room";
};

const dateConvert = (dateStr: string) => {
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  return formattedDate.replace(" ", "/").replace(" ", "/");
}
</script>

<template>
  <div class="book-container">
    <div class="book-list">
      <div 
        v-for="booking in bookings" 
        :key="booking.id"
        class="book-card">
        <p class="book-room">{{ roomConvert(booking.room) }}</p>
        <p class="book-time">{{ dateConvert(booking.date) }} {{ booking.start_time }}น. - {{ booking.end_time }}น.</p> 
      </div>
    </div>
  </div>
</template>

<style scoped>
.book-container {
  width: 100%; 
  display: flex;
  flex-direction: column;
  background-color: rgb(254, 172, 99);
  padding: 1vmax;
  height: auto;
  overflow-y: auto; 
  overflow-x: hidden; 
}

.book-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.book-card {
  background: #f0f0f0;
  padding: 2vmax; 
  border-radius: 15px;
  text-align: center;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.15);
  color: black;
  transition: background-color 0.3s ease;
  justify-content: baseline;
  text-align: left;
}

.book-room{
    font-weight: bold;
    font-size: 1.8vmax;
}

.book-time{
    font-size: 1vmax;
}
</style>
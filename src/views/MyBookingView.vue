<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { query, collection, where, getDocs } from "firebase/firestore";
import type { BookingData } from "./bookingData";
import { db } from "../firebase";

const userId = localStorage.getItem("userIdLogin");
const bookings = ref<BookingData[]>([]);

const fetchBookings = async () => {
  try {
    const q = query(
      collection(db, "bookings"),
      where("user_id", "==", userId )
    );

    const querySnapshot = await getDocs(q);
    bookings.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as BookingData[];
  } catch (error) {
    console.error("Error fetching filtered bookings:", error);
  }
};

fetchBookings();
</script>

<template>
  <div class="book-container">
    <div class="book-list">
      <div 
        v-for="booking in bookings" 
        :key="booking.id"
        class="book-card">
        <p class="book-room">{{ booking.room }}</p>
        <p class="book-time">{{ booking.start_time }} to {{ booking.end_time }}</p> 
      </div>
    </div>
  </div>
</template>

<style scoped>
.book-container {
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

.book-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%; 
}

.book-card {
  background: #f0f0f0;
  padding: 2.3vmax; 
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
    font-size: 2vw;
}

.book-time{
    font-size: 1.2  vw;
}
</style>
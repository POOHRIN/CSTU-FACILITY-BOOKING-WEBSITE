<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, onMounted, computed } from "vue";
import { query, collection, where, getDocs, orderBy, doc, updateDoc } from "firebase/firestore";
import type { BookingData } from "@/types/bookingData";
import { db } from "@/services/firebase";
import { activityRoomList, meetingRoomList } from "@/roomList";

const userId = localStorage.getItem("userIdLogin");
const bookings = ref<BookingData[]>([]);
const roomList = [...activityRoomList, ...meetingRoomList];

const router = useRouter();

if (userId == "admin") {
  router.push('/home');
}

const fetchBookings = async () => {
  try {
    const q = query(
      collection(db, "bookings"),
      where("user_id", "==", userId),
      orderBy("date", "asc")
    );

    const querySnapshot = await getDocs(q);
    const now = new Date();
    now.setMilliseconds(0);

    bookings.value = querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
      }) as BookingData)
      .filter(booking => {
        const bookingDate = new Date(booking.date);
        bookingDate.setHours(0, 0, 0, 0);

        const [hours, minutes] = booking.end_time.split(":").map(Number);
        const bookingEndDateTime = new Date(booking.date);
        bookingEndDateTime.setHours(hours, minutes, 0, 0);

        return (
          bookingDate >= new Date().setHours(0, 0, 0, 0) &&
          bookingEndDateTime > now
        );
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

const showCancelButton = (booking: BookingData) => {
  const bookingDate = new Date(booking.date);
  bookingDate.setHours(0, 0, 0, 0); // Reset to start of the day
  return booking.status !== 'cancelled' && bookingDate > new Date();
};

const cancelBooking = async (bookingId: string, bookingRoom: string, bookingDate: string, bookingStart: string, bookingEnd) => {
  const confirmCancel = window.confirm(`คุณต้องการที่จะยกเลิกการจองใช่ไหม`);
  if (confirmCancel) {
    try {
      const bookingRef = doc(db, "bookings", bookingId);
      await updateDoc(bookingRef, { status: "cancelled" });
      console.log("Booking cancelled successfully.");
      alert(`ยกเลิกการจองห้อง ${bookingRoom} 
      วันที่ ${bookingDate} 
      เวลา ${bookingStart} - ${bookingEnd} 
      สำเร็จ`);
      fetchBookings();
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  } else {
    console.log("Cancellation aborted.");
  }
};
</script>

<template>
  <div class="book-container">
    <div class="book-list">
      <div v-for="booking in bookings" :key="booking.id" class="book-card"
        :class="{ 'cancelled-card': booking.status === 'cancelled' }">
        <p class="book-room">{{ roomConvert(booking.room) }}</p>
        <p class="book-time">{{ dateConvert(booking.date) }} {{ booking.start_time }}น. - {{ booking.end_time }}น.</p>
        <button v-if="showCancelButton(booking)" class="cancel-btn"
          @click="cancelBooking(booking.id, roomConvert(booking.room), dateConvert(booking.date), booking.start_time, booking.end_time)">
          ยกเลิกการจอง
        </button>
        <div v-if="booking.status === 'cancelled'" class="cancelled-overlay">
          <div v-if="booking.status === 'cancelled'" class="cancelled-text">
            ยกเลิกการจอง
          </div>
        </div>
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
  text-align: left;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.15);
  color: black;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.book-room {
  font-weight: bold;
  font-size: 1.8vmax;
}

.book-time {
  font-size: 1vmax;
}

.cancel-btn {
  background: rgb(255, 141, 141);
  color: rgb(154, 0, 0);
  border: none;
  padding: 0.8vmax 1.2vmax;
  border-radius: 8px;
  font-size: 1vmax;
  cursor: pointer;
  position: absolute;
  right: 1.5vmax;
  bottom: 1.5vmax;
  transition: background 0.3s ease;
  right: 2vmax;
  top: 50%;
  transform: translateY(-50%);
}

.cancel-btn:hover {
  background: rgb(154, 0, 0);
  color: rgb(255, 141, 141);
}

.cancelled-card {
  position: relative;
  pointer-events: none;
}

.cancelled-overlay {
  position: absolute;
  background-color: rgb(255, 141, 141, 0.5);
  border-radius: 15px;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  text-align: center;
  z-index: 10;
}

.cancelled-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-20deg);
  font-size: 2vmax;
  font-weight: bold;
  color: rgb(154, 0, 0);
  padding: 10px 20px;
  border-radius: 10px;
  text-align: center;
  width: 80%;
  height: auto;
  white-space: nowrap;
  box-sizing: border-box;
}
</style>
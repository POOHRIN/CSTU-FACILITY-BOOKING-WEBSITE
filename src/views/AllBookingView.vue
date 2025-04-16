<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { query, collection, where, getDocs, orderBy, doc, updateDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
import { activityRoomList, meetingRoomList } from "@/roomList";
import type { BookingData } from "@/types/bookingData";

const bookings = ref<BookingData[]>([]);
const roomList = [...activityRoomList, ...meetingRoomList];
const selectedRoom = ref("all");
const selectedStatus = ref("all");

const dateConvert = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const fetchAllBookings = async () => {
  try {
    const q = query(
      collection(db, "bookings"), 
      orderBy("date", "asc")
    );

    const snapshot = await getDocs(q);
    const now = new Date();
    now.setMilliseconds(0);

    bookings.value = snapshot.docs
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

const cancelBooking = async (bookingId: string, bookingUserId: string, bookingRoom: string, bookingDate: string, bookingStart: string, bookingEnd) => {
  const confirmCancel = window.confirm(`คุณต้องการที่จะยกเลิกการจองใช่ไหม`);
  if (confirmCancel) {
    try {
      const bookingRef = doc(db, "bookings", bookingId);
      await updateDoc(bookingRef, { status: "cancelled" });
      console.log("Booking cancelled successfully.");
      alert(`ยกเลิกการจองห้อง ${bookingRoom} 
      ของ ${bookingUserId} 
      วันที่ ${bookingDate} 
      เวลา ${bookingStart} - ${bookingEnd} 
      สำเร็จ`);
      fetchAllBookings(); 
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  } else {
    console.log("Cancellation aborted.");
  }
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
              <th> </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="booking in filteredBookings" :key="booking.id">
              <td>{{ roomConvert(booking.room) }}</td>
              <td>{{ booking.user_id }}</td>
              <td>{{ new Date(booking.date).toLocaleDateString("th-TH") }}</td>
              <td>{{ booking.start_time }} - {{ booking.end_time }} น.</td>
              <td :class="booking.status">{{ booking.status }}</td>
              <td>
                <button @click="cancelBooking(booking.id, roomConvert(booking.room), booking.user_id, dateConvert(booking.date),booking.start_time, booking.end_time)" v-if="booking.status === 'booking'">ยกเลิกการจอง</button>
              </td>
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

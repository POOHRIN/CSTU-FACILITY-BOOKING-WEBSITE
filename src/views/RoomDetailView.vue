<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { watch } from "vue";
import { activityRoomList, meetingRoomList } from "@/roomList";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { db } from "../firebase";
import type { BookingData } from "./bookingData";

const route = useRoute();
const router = useRouter();
const userId = localStorage.getItem("userIdLogin");

// Room and Date Setup
const roomId = route.params.roomId; 
const roomList = [...activityRoomList, ...meetingRoomList];
const room = ref(roomList.find(r => r.path === roomId) || { name: "Unknown Room" });

const selectedDate = ref("");
const minDate = ref(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]);

// Fetch bookings
const bookings = ref<BookingData[]>([]);
const fetchBookings = async () => {
  if (!selectedDate.value) return;

  try {
    const q = query(
      collection(db, "bookings"),
      where("room", "==", roomId),
      where("date", "==", selectedDate.value)
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

watch(selectedDate, () => {
  fetchBookings();
});

// Time selection logic
const startTime = ref(null);
const endTime = ref(null);

const times = [];
let hour = 8;
let minute = 30;
while (hour < 18 || (hour === 18 && minute === 0)) {
  times.push(`${String(hour).padStart(2, "0")}:${minute === 30 ? "30" : "00"}`);
  minute = minute === 30 ? 0 : 30;
  if (minute === 0) hour++;
}

const allEndTimes = [];
hour = 9;
minute = 0;
while (hour < 19) {  
  allEndTimes.push(`${String(hour).padStart(2, "0")}:${minute === 30 ? "30" : "00"}`);
  minute = minute === 30 ? 0 : 30;
  if (minute === 0) hour++;
}

const bookedTimes = computed(() => {
  const disabledTimes = new Set<string>();

  bookings.value.forEach(booking => {
    let [startHour, startMinute] = booking.start_time.split(":").map(Number);
    let [endHour, endMinute] = booking.end_time.split(":").map(Number);

    while (startHour < endHour || (startHour === endHour && startMinute < endMinute)) {
      disabledTimes.add(`${String(startHour).padStart(2, "0")}:${startMinute === 30 ? "30" : "00"}`);
      startMinute += 30;
      if (startMinute === 60) {
        startMinute = 0;
        startHour++;
      }
    }
  });

  return disabledTimes;
});

const disableEndTimes = computed(() => {
  if (!startTime.value) return new Set();

  let firstBookingAfterStart = null;
  const disabledSet = new Set<string>();

  const validBookings = bookings.value.filter(booking => booking.start_time > startTime.value);

  if (validBookings.length > 0) {
    validBookings.sort((a, b) => a.start_time.localeCompare(b.start_time));
    firstBookingAfterStart = validBookings[0];
  }

  if (firstBookingAfterStart) {
    let [firstEndHour, firstEndMinute] = firstBookingAfterStart.end_time.split(":").map(Number);
    let firstEndTime = `${String(firstEndHour).padStart(2, "0")}:${firstEndMinute === 30 ? "30" : "00"}`;

    allEndTimes.forEach(time => {
      if (time >= firstEndTime) {
        disabledSet.add(time);
      }
    });
  }

  allEndTimes.forEach(time => {
    if (time <= startTime.value) {
      disabledSet.add(time);
    }
  });

  return disabledSet;
});

// Add booking to database
const addBooking = async (booking: BookingData) => {
  try {
    await addDoc(collection(db, "bookings"), booking);
    console.log("Booking added:", booking);
  } catch (error) {
    console.error("Error adding booking:", error);
  }
};

const bookRoom =  async () => {

  if (!selectedDate.value || !startTime.value || !endTime.value) {
    alert("Please select all fields before booking!");
    return;
  }

  const newBooking: BookingData = {
    user_id: userId, 
    room: String(roomId), 
    date: selectedDate.value,
    start_time: startTime.value,
    end_time: endTime.value,
  };

  try {
    await addBooking(newBooking);
    alert("Booking Successful!");
    router.push("/"); 
    window.location.reload();
  } catch (error) {
    console.error("Error adding booking:", error);
    alert("Booking failed. Try again.");
  }
};
</script>


<template>
  <div class="container">
    <div class="room-card">
      <h2 class="room-name">{{ room.name }}</h2>

      <input type="date" v-model="selectedDate" class="date-picker" :min="minDate" id="date"/>

      <div class="time-picker" >
        <div class="time-row">
          <select v-model="startTime" :disabled="!selectedDate" class="time-dropdown">
            <option 
              v-for="time in times" 
              :key="time" 
              :value="time" 
              :disabled="bookedTimes.has(time)"
              :class="{'disabled-option': bookedTimes.has(time)}"
            >
              {{ time }}
            </option>
          </select>
        </div>

        <div class="time-row">
          <label>to</label>
          <select v-model="endTime" :disabled="!startTime" class="time-dropdown">
            <option 
              v-for="time in allEndTimes" 
              :key="time" 
              :value="time"
              :disabled="disableEndTimes.has(time)"
              :class="{'disabled-option': disableEndTimes.has(time)}"
            >
              {{ time }}
            </option>
        </select>
        </div>
      </div>

      <div class="button-wrapper">
        <button class="booking-btn" :disabled="!startTime || !endTime" @click="bookRoom">Book Now</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
}

.room-card {
  background: #f0f0f0;
  padding: 2vmax;
  border-radius: 15px;
  width: 450px;
  box-shadow: 4px 6px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
}

.room-name {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.date-picker {
  margin-bottom: 2vh;
  font-size: 16px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
  outline: none;
  transition: 0.3s;
  text-align: center;
}

.date-picker:hover {
  border-color: #007bff;
}

.time-picker {
  margin-bottom: 2vh;
  padding: 20px;
  border-radius: 10px;
}

.time-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 5px;
  color: #444;
}

.time-dropdown {
  font-size: 16px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
  background: white;
  cursor: pointer;
  transition: 0.3s;
  text-align: center;
}

.time-dropdown:hover {
  border-color: #007bff;
}

.time-dropdown:disabled {
  background: #e9ecef;
  cursor: not-allowed;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

.booking-btn {
  background: #007bff;
  color: white;
  padding: 14px 20px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  width: 100%;
  transition: 0.3s;
}

.booking-btn:hover {
  background: #0056b3;
}

.booking-btn:disabled {
  background: #d3d3d3;
  color: #777;
  cursor: not-allowed;
}
label {
  text-align: center;
  margin: 2vh 0;
  font-weight: bold;
}
.disabled-option{
  color: rgb(146, 146, 146);
  background-color: #d4d4d4;
}
</style>

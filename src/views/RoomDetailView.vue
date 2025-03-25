<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import Datepicker from 'vue3-datepicker';
import VueTimepicker from 'vue-timepicker';
import { activityRoomList, meetingRoomList } from "@/roomList";

const route = useRoute();

//Room
const roomId = route.params.roomId; 
const roomList = [...activityRoomList, ...meetingRoomList];
const room = ref(roomList.find(r => r.path === roomId) || { name: "Unknown Room" });

//Date
const selectedDate = ref("");
const minDate = ref(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]); 

//Time
const startTime = ref(null);
const endTime = ref(null);

const times: string[] = [];
let hour = 8;
let minute = 30;
while (hour < 18 || (hour === 18 && minute === 0)) {  // Max start time 18:00
  times.push(`${String(hour).padStart(2, "0")}:${minute === 30 ? "30" : "00"}`);
  minute = minute === 30 ? 0 : 30;
  if (minute === 0) hour++;
}

const allEndTimes: string[] = [];
hour = 8;
minute = 30;
while (hour < 19) {  
  allEndTimes.push(`${String(hour).padStart(2, "0")}:${minute === 30 ? "30" : "00"}`);
  minute = minute === 30 ? 0 : 30;
  if (minute === 0) hour++;
}

const filteredEndTimes = ref<string[]>([]);

const updateEndTimeOptions = () => {
  if (!startTime.value) {
    endTime.value = null;
    filteredEndTimes.value = [];
    return;
  }

  const startTimeIndex = allEndTimes.indexOf(startTime.value);
  filteredEndTimes.value = allEndTimes.slice(startTimeIndex + 1); // Ensure end time > start time

  if (endTime.value && allEndTimes.indexOf(endTime.value) <= startTimeIndex) {
    endTime.value = null;
    errorMessage.value = "End time must be greater than start time";
  } else {
    errorMessage.value = "";
  }
};
</script>

<template>
  <div class="container">
    <div class="room-card">
      <h2 class="room-name">{{ room.name }}</h2>

      <input type="date" v-model="selectedDate" class="date-picker" :min="minDate" />

      <div class="time-picker" >
        <div class="time-row">
          <select v-model="startTime" @change="updateEndTimeOptions" :disabled="!selectedDate" class="time-dropdown">
            <option v-for="time in times" :key="time" :value="time">{{ time }}</option>
          </select>
        </div>

        <div class="time-row">
          <label>to</label>
          <select v-model="endTime" :disabled="!startTime" class="time-dropdown">
            <option v-for="time in filteredEndTimes" :key="time" :value="time">{{ time }}</option>
          </select>
        </div>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>

      <div class="button-wrapper">
        <button class="booking-btn" :disabled="!startTime || !endTime">Book Now</button>
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
</style>

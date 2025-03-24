<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import Datepicker from 'vue3-datepicker';
import VueTimepicker from 'vue-timepicker';

const route = useRoute();
const roomId = route.params.roomId; 

const room = ref({
  name: `${roomId}`,
});

const selectedDate = ref("");
const minDate = ref(new Date().toISOString().split("T")[0]); 

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
while (hour < 19) {  // Max end time 18:30
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
/* Center everything */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
}

/* Room Card */
.room-card {
  background: #f0f0f0;
  padding: 2vmax;
  border-radius: 15px;
  width: 450px;
  box-shadow: 4px 6px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
}

/* Room Title */
.room-name {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

/* Date Picker */
.date-picker {
  margin-bottom: 2vw;
  font-size: 16px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
  outline: none;
  transition: 0.3s;
}

.date-picker:hover {
  border-color: #007bff;
}

/* Time Picker Section */
.time-picker {
  margin-bottom: 2vh;
  padding: 20px;
  border-radius: 10px;
}

/* Label */
.time-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  text-align: left;
}

.time-row {
  font-weight: bold;
  margin-bottom: 5px;
  color: #444;
}

/* Time Dropdown */
.time-dropdown {
  font-size: 16px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
  background: white;
  cursor: pointer;
  transition: 0.3s;
}

.time-dropdown:hover {
  border-color: #007bff;
}

/* Disable End Time Dropdown */
.time-dropdown:disabled {
  background: #e9ecef;
  cursor: not-allowed;
}

/* Error Message */
.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

/* Booking Button */
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

/* Disabled Booking Button */
.booking-btn:disabled {
  background: #d3d3d3;
  color: #777;
  cursor: not-allowed;
}
label {
  text-align: center;
  margin: 1vh 0;
  font-weight: bold;
}
</style>

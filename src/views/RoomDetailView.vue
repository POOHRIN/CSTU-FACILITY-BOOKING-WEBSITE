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

// Declare reactive variables using ref
const startTime = ref(null);
const endTime = ref(null);

// Generate available times between 08:30 and 18:30 in 30-minute intervals
const times = [];
let hour = 8;
let minute = 30;
while (hour < 19) {
  if (minute === 30) {
    times.push(`${String(hour).padStart(2, '0')}:30`);
  } else {
    times.push(`${String(hour).padStart(2, '0')}:00`);
  }
  minute = minute === 30 ? 0 : 30;
  if (minute === 0) hour++;
}

// Filtered end times based on the selected start time
const filteredEndTimes = ref(times);

// Update the filtered end times when the start time changes
const updateEndTimeOptions = () => {
  if (!startTime.value) return;
  const startTimeIndex = times.indexOf(startTime.value);
  filteredEndTimes.value = times.slice(startTimeIndex + 1); // Ensure end time is greater than start time

  // Reset end time if it's invalid (less than or equal to the start time)
  if (endTime.value && times.indexOf(endTime.value) <= startTimeIndex) {
    endTime.value = null; // Reset end time
    errorMessage.value = "End time must be greater than start time"; // Set error message
  } else {
    errorMessage.value = ""; // Clear the error message if valid
  }
};
</script>

<template>
  <div class="container">
    <div class="room-card">
      <h2 class="room-name">{{ room.name }}</h2>

      <input type="date" v-model="selectedDate" class="date-picker" :min="minDate" />

      <div class="time-picker" v-if="selectedDate">
        <select v-model="startTime" @change="updateEndTimeOptions">
          <option v-for="time in times" :key="time" :value="time">{{ time }}</option>
        </select>
    
        <label for="end-time" class="picker">to</label>
        <select v-model="endTime">
          <option v-for="time in filteredEndTimes" :key="time" :value="time">{{ time }}</option>
        </select>
      </div>

      <div class="button-wrapper">
        <button class="booking-btn">Booking</button>
      </div>
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
  position: relative;
  background: rgb(211, 211, 211);
  padding: 30px;
  border-radius: 15px;
  width: 1700px;
  height: 85vh ;
  margin-left: -200px; 
  box-shadow: 4px 6px 12px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-size: 2vb;
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
  font-weight: bold;
  margin-bottom: 15px;
}

.capacity {
  font-size: 24px;
  margin-bottom: 10px;
  left: 50%;
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
  bottom: 2vh;
}

.booking-btn:hover {
  background: #616161;
  color: white;
}

.button-wrapper {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 20px;
  width: 100%;
}

.picker {
  margin: 0 1.5vw;
}
</style>

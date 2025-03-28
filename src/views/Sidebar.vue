<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted, computed } from "vue";
import { query, collection, where, getDocs } from "firebase/firestore";
import type { BookingData } from "./bookingData";
import { db } from "../firebase";

const userId = localStorage.getItem("userIdLogin");
const bookings = ref<BookingData[]>([]);
const myBookingCount = ref(0);

const fetchBookingsSide = async () => {
  try {
    const q = query(
      collection(db, "bookings"),
      where("user_id", "==", userId)
    );

    const querySnapshot = await getDocs(q);
    bookings.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as BookingData[];

    myBookingCount.value = querySnapshot.size;
  } catch (error) {
    console.error("Error fetching filtered bookings:", error);
  }
};

onMounted(() => {
  fetchBookingsSide();
});

const route = useRoute();

const isActive = (path: string) => route.path === path;
</script>

<template>
  <aside class="sidebar">
    <ul>
      <li class="home">
        <router-link 
          to="/home" 
          :class="{ active: isActive('/home'), disabled: isActive('/home') }">
          Home
        </router-link>
      </li>
    </ul>
    <ul class="facility">
      <li>
        <router-link 
          to="/home/meeting-room" 
          :class="{ active: isActive('/home/meeting-room'), disabled: isActive('/home/meeting-room') }">
          Meeting Room
        </router-link>
      </li>
      <li>
        <router-link 
          to="/home/activity-room" 
          :class="{ active: isActive('/home/activity-room'), disabled: isActive('/home/activity-room') }">
          Activity Room
        </router-link>
      </li>
    </ul>
    <ul>
      <li>
        <router-link 
          to="/home/guideline" 
          :class="{ active: isActive('/home/guideline'), disabled: isActive('/home/guideline') }">
          Guideline
        </router-link>
      </li>
    </ul>
    <ul>
      <li>
        <router-link 
          to="/home/my-booking" 
          :class="{ active: isActive('/home/my-booking'), disabled: isActive('/home/my-booking') }">
          My Booking
          <span :class="{'booking-count': true, 'red': myBookingCount === 0, 'green': myBookingCount >= 1}">
            {{ myBookingCount }}
          </span>
        </router-link>
      </li>
    </ul>
  </aside>
</template>
  
<style scoped>
.sidebar {
  width: 180px;
  height: 100%;
  background-color: rgb(217,217,217);
  color: black;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: fixed; 
  top: 60px; 
  left: 0;
  bottom: 0;
  z-index: 9999;
}
.sidebar a {
  color: black;
  text-decoration: none;
  padding: 10px;
}
.sidebar a:hover {
  background: rgb(193, 193, 193);
  padding: 5px 10px;  
  border-radius: 5px;
}

.sidebar ul {
  padding: 0;
  list-style: none;
}

.sidebar ul:not(:last-child) {
  border-bottom: 1px solid black;
  margin-bottom: 10px;
  padding-bottom: 10px;
}
.sidebar ul, .sidebar li{
  padding: 1.6vh 0;
}

.active {
  background-color: rgb(193, 193, 193);
  cursor: default;
  color: black;
  padding: 5px 10px;  
  border-radius: 5px;
}

.disabled {
  pointer-events: none;
}

.booking-count {
  display: inline-block;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  text-align: center;
  line-height: 25px;
  margin-left: 10px;
  font-weight: bold;
  vertical-align: middle;
}

.red {
  background-color: rgb(226, 104, 104);
  color: rgb(255, 0, 0);
}

.green {
  background-color: rgb(127, 202, 127);
  color: rgb(1, 103, 1);
  line-height: 1;
}
</style>
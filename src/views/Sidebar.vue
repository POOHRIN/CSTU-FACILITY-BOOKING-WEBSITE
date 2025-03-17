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
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();

    const isActive = (path) => route.path === path;

    return { isActive };
  }
};
</script>
  
<style scoped>
.sidebar {
  width: auto;
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
</style>